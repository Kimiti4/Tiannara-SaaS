"""
Tiannara Core API Gateway

Main entry point for the API Gateway.
Handles routing, authentication, rate limiting, and observability.
"""

from __future__ import annotations

import logging
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Response, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from tiannara_api.gateway.auth import get_api_key, get_jwt_credentials, check_permission
from tiannara_api.gateway.routing import register_engine, get_engine, get_all_engines, ROUTE_MAP
from tiannara_api.gateway.rate_limit import RateLimiter
from tiannara_api.gateway.usage_tracker import UsageTracker
from tiannara_api.gateway.orchestrator import GatewayOrchestrator

# Import engines
from tiannara_api.engines.algorithm import AlgorithmEngine
from tiannara_api.engines.logic import LogicEngine
from tiannara_api.engines.nlp import NLPEngine
from tiannara_api.engines.causal import CausalEngine
from tiannara_api.engines.prediction import PredictionEngine

# Import existing routes for backward compatibility
from tiannara_api.routes.autonomous import router as autonomous_router
from tiannara_api.routes.discovery import router as discovery_router
from tiannara_api.routes.evolution import router as evolution_router
from tiannara_api.routes.memory import router as memory_router
from tiannara_api.routes.modules import router as modules_router
from tiannara_api.routes.status import router as status_router
from tiannara_api.routes.autonomy import router as autonomy_router

# Import gateway routes
from tiannara_api.routes.gateway_routes import router as gateway_router
from tiannara_api.routes.unified_endpoints import router as unified_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global instances
rate_limiter = RateLimiter()
usage_tracker = UsageTracker()
orchestrator = GatewayOrchestrator()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup: Register all engines
    logger.info("Starting Tiannara Core API Gateway...")
    
    # Initialize and register engines
    algorithm_engine = AlgorithmEngine()
    logic_engine = LogicEngine()
    nlp_engine = NLPEngine()
    causal_engine = CausalEngine()
    prediction_engine = PredictionEngine()
    
    register_engine("algorithm_engine", algorithm_engine)
    register_engine("logic_engine", logic_engine)
    register_engine("nlp_engine", nlp_engine)
    register_engine("causal_engine", causal_engine)
    register_engine("prediction_engine", prediction_engine)
    
    logger.info("All domain engines registered")
    logger.info("Tiannara Core API Gateway ready")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Tiannara Core API Gateway...")


# Create FastAPI app
app = FastAPI(
    title="Tiannara Core API Gateway",
    description="Internal API Gateway for Tiannara Core - AI Infrastructure",
    version="2.0.0-gateway",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Configure per environment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request processing middleware
@app.middleware("http")
async def process_request(request: Request, call_next):
    """Middleware to handle authentication, rate limiting, and logging."""
    start_time = time.time()
    
    # Skip gateway endpoints for auth/rate limiting
    if request.url.path.startswith("/api/v1/gateway"):
        response = await call_next(request)
        return response
    
    # Get API key
    api_key = request.headers.get("X-API-Key")
    
    if not api_key:
        # Allow unauthenticated requests for backward compatibility during migration
        # TODO: Enforce authentication in production
        pass
    else:
        # Check rate limit
        allowed, rate_info = rate_limiter.check_rate_limit(api_key, tier="starter")
        
        if not allowed:
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded",
                headers={
                    "X-RateLimit-Limit": str(rate_info["limit"]),
                    "X-RateLimit-Remaining": str(rate_info["remaining"]),
                    "X-RateLimit-Reset": str(rate_info["reset"]),
                },
            )
    
    # Process request
    try:
        response = await call_next(request)
        
        # Log request
        latency_ms = (time.time() - start_time) * 1000
        
        if api_key:
            usage_tracker.log_request(
                api_key=api_key,
                endpoint=request.url.path,
                method=request.method,
                status_code=response.status_code,
                latency_ms=latency_ms,
            )
        
        # Add headers
        response.headers["X-Response-Time"] = f"{latency_ms:.2f}ms"
        
        return response
    
    except Exception as e:
        latency_ms = (time.time() - start_time) * 1000
        logger.error(f"Request failed: {str(e)}")
        raise


# Include gateway routes
app.include_router(gateway_router, prefix="/api/v1")
app.include_router(unified_router, prefix="/api/v1")  # Unified domain endpoints

# Include existing routes for backward compatibility
app.include_router(status_router)
app.include_router(modules_router)
app.include_router(discovery_router)
app.include_router(evolution_router)
app.include_router(autonomous_router)
app.include_router(memory_router)
app.include_router(autonomy_router)


@app.get("/")
async def root():
    """Root endpoint - API information."""
    return {
        "name": "Tiannara Core API Gateway",
        "version": "2.0.0-gateway",
        "status": "operational",
        "documentation": "/docs",
    }


@app.get("/api/v1/gateway/engines/{engine_name}")
async def get_engine_info(engine_name: str):
    """Get information about a specific engine."""
    engines = get_all_engines()
    
    if engine_name not in engines:
        raise HTTPException(status_code=404, detail=f"Engine not found: {engine_name}")
    
    engine = engines[engine_name]
    return {
        "name": engine.name,
        "version": engine.version,
        "health": engine.get_health(),
        "metrics": engine.get_metrics(),
    }
