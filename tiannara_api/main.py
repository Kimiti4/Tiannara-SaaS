from __future__ import annotations

import sys
import os
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from tiannara_api.middleware.rate_limiter import RateLimitMiddleware
from tiannara_api.middleware.security_headers import SecurityHeadersMiddleware
from tiannara_api.middleware.input_validation import InputValidationMiddleware
from tiannara_api.middleware.enhanced_rate_limiter import EnhancedRateLimiter
from tiannara_api.metrics import init_metrics
from tiannara_api.logging_config import LoggingMiddleware, setup_logging

from tiannara_api.routes.autonomous import router as autonomous_router
from tiannara_api.routes.discovery import router as discovery_router
from tiannara_api.routes.evolution import router as evolution_router
from tiannara_api.routes.memory import router as memory_router
from tiannara_api.routes.modules import router as modules_router
from tiannara_api.routes.status import router as status_router
from tiannara_api.routes.autonomy import router as autonomy_router  # New import
from tiannara_api.routes.explanations import router as explanations_router  # EU AI Act compliance
from tiannara_api.routes.payment import router as payment_router  # Payment processing
from tiannara_api.routes.efficiency import router as efficiency_router  # Efficiency features
from tiannara_api.routes.monitoring import router as monitoring_router  # Issue detection & monitoring
from tiannara_api.routes.autonomous_testing import router as autonomous_testing_router  # Autonomous testing
from tiannara_api.routes.auth import router as auth_router  # Authentication with OTP
from tiannara_api.routes.sso import router as sso_router  # SSO (OAuth 2.0 / SAML)
from tiannara_api.routes.workspaces import router as workspaces_router  # Team workspaces
from tiannara_api.routes.audit import router as audit_router  # Audit logging
from tiannara_api.routes.analytics import router as analytics_router  # Advanced analytics
from tiannara_api.routes.white_label import router as white_label_router  # White-label branding
from tiannara_api.routes.mapek_security import router as mapek_security_router  # MAPE-K security loop
from tiannara_api.routes.admin import router as admin_router  # Admin dashboard & monitoring
from tiannara_api.routes.usage import router as usage_router  # Usage metrics & analytics
from tiannara_api.routes.moderation import router as moderation_router  # Content moderation for JamiiLink
from tiannara_api.routes.core_proxy import router as core_proxy_router  # Core AI proxy
from tiannara_core.autonomous.orchestrator import Orchestrator
from tiannara_core.discovery.engine import DiscoveryEngine
from tiannara_core.evolution.evolution import evolve as run_evolution
from tiannara_core.evolution.evolution_loop import EvolutionLoop
from tiannara_core.memory.discovery_memory import DiscoveryMemory
from tiannara_core.memory.experience_db import ExperienceDB
from tiannara_core.memory.knowledge_store import KnowledgeStore
from tiannara_core.mission.alignment import AlignmentScorer
from tiannara_core.mission.constitution import TiannaraConstitution
from tiannara_core.modules.base import ModuleBase, ModuleManifest
from tiannara_core.modules.registry import ModuleRegistry
from tiannara_core.safety.gate import SafetyGate
from tiannara_core.safety.policy import SafetyPolicy


APP_VERSION = "1.3.0-phase5"

# Initialize structured logging
logger = setup_logging(
    level=os.getenv("LOG_LEVEL", "INFO"),
    log_file=os.getenv("LOG_FILE", "logs/tiannara.log")
)

app = FastAPI(title="Tiannara API", version=APP_VERSION)

# Initialize Prometheus metrics (must be before other middleware)
init_metrics(app)

# Add security middleware (order matters - security first!)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(InputValidationMiddleware)
app.add_middleware(EnhancedRateLimiter)

# Add logging middleware
app.add_middleware(LoggingMiddleware)

# Add legacy rate limiting (will be replaced by EnhancedRateLimiter)
# app.add_middleware(RateLimitMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CallableModule(ModuleBase):
    def __init__(self, *, name: str, version: str, risk_tier: str, permissions: list[str], description: str, run_fn):
        super().__init__(
            ModuleManifest(
                name=name,
                version=version,
                risk_tier=risk_tier,
                permissions=permissions,
                description=description,
            )
        )
        self._run_fn = run_fn

    def run(self, payload):
        return self._run_fn(payload)


def build_safety_gate() -> SafetyGate:
    return SafetyGate(
        constitution=TiannaraConstitution(),
        policy=SafetyPolicy(),
        scorer=AlignmentScorer(),
        min_alignment=0.35,
    )


REGISTRY = ModuleRegistry()
SAFETY_GATE = build_safety_gate()
DISCOVERY_ENGINE = DiscoveryEngine(store=KnowledgeStore(), gate=SAFETY_GATE)
DISCOVERY_MEMORY = DiscoveryMemory()
EXPERIENCE_DB = ExperienceDB()
EVOLUTION_LOOP = EvolutionLoop()
AUTONOMOUS_ORCHESTRATOR = Orchestrator(
    store=KnowledgeStore(),
    gate=SAFETY_GATE,
    memory=EXPERIENCE_DB,
    evolution=EVOLUTION_LOOP,
)

REGISTRY.register(
    CallableModule(
        name="discovery",
        version="1.0",
        risk_tier="low",
        permissions=["read_user_text"],
        description="Scientific discovery engine for claims, hypotheses, and experiment design.",
        run_fn=lambda payload: DISCOVERY_ENGINE.analyze(
            question=payload.get("question", ""),
            text=payload.get("text"),
            source=payload.get("source", "user_input"),
        ),
    )
)
REGISTRY.register(
    CallableModule(
        name="evolution",
        version="1.0",
        risk_tier="low",
        permissions=["simulate_parameter_search"],
        description="Evolution loop with adversarial simulation and graph or neural genomes.",
        run_fn=lambda payload: run_evolution(
            question=payload.get("question", "Optimize prosthetic grip stability"),
            population_size=payload.get("population_size", 24),
            generations=payload.get("generations", 12),
            fitness_function=payload.get("fitness_function", "grip_stability"),
            genome_type=payload.get("genome_type", "neural"),
        ),
    )
)
REGISTRY.register(
    CallableModule(
        name="autonomous",
        version="1.0",
        risk_tier="medium",
        permissions=["read_user_text", "simulate_parameter_search", "write_memory"],
        description="DEAA cycle with distributed evolution, adversarial environments, memory, and LLM-guided meta mutation.",
        run_fn=lambda payload: AUTONOMOUS_ORCHESTRATOR.run_cycle(
            question=payload.get("question", "Optimize prosthetic grip stability"),
            text=payload.get("text"),
            source=payload.get("source", "module_runner"),
            population_size=payload.get("population_size", 24),
            generations=payload.get("generations", 12),
            fitness_function=payload.get("fitness_function", "grip_stability"),
            workers=payload.get("workers", 4),
            genome_type=payload.get("genome_type", "mixed"),
        ),
    )
)

app.include_router(status_router)
app.include_router(modules_router)
app.include_router(discovery_router)
app.include_router(evolution_router)
app.include_router(autonomous_router)
app.include_router(memory_router)
app.include_router(autonomy_router)  # Adding the autonomy router
app.include_router(explanations_router, prefix="/api/v1")  # EU AI Act compliance
app.include_router(payment_router, prefix="/api/v1")  # Payment processing
app.include_router(efficiency_router, prefix="/api/v1")  # Efficiency features (email, reports, code)
app.include_router(monitoring_router, prefix="/api/v1")  # Issue detection & auto-resolution
app.include_router(autonomous_testing_router)  # Autonomous testing system
app.include_router(auth_router, prefix="/api/v1")  # Authentication with OTP verification
app.include_router(sso_router, prefix="/api/v1")  # SSO (OAuth 2.0 / SAML)
app.include_router(workspaces_router, prefix="/api/v1")  # Team workspaces
app.include_router(audit_router, prefix="/api/v1")  # Audit logging
app.include_router(analytics_router, prefix="/api/v1")  # Advanced analytics
app.include_router(white_label_router, prefix="/api/v1")  # White-label branding
app.include_router(mapek_security_router, prefix="/api/v1")  # MAPE-K security loop
app.include_router(admin_router, prefix="/api/v1")  # Admin dashboard & monitoring
app.include_router(usage_router, prefix="/api/v1")  # Usage metrics & analytics
app.include_router(moderation_router)  # Content moderation for JamiiLink (already has /api/v1 prefix)
app.include_router(core_proxy_router, prefix="/api/v1")  # Core AI proxy (bridges to Tiannara Core)


@app.on_event("startup")
async def startup_event():
    """
    Initialize application on server startup.
    - Initialize admin user (for development)
    """
    print("✅ Metrics collection enabled at /metrics")
    
    # Initialize admin user for development/testing
    import hashlib
    import secrets
    from datetime import datetime, timezone
    
    # Import database session
    from tiannara_api.database import SessionLocal
    from tiannara_api.database.models import User
    
    db = SessionLocal()
    try:
        admin_email = "admin@tiannara.com"
        
        # Check if admin exists in database
        admin_user = db.query(User).filter(User.email == admin_email).first()
        
        if not admin_user:
            # Create admin user in database
            salt = secrets.token_hex(16)
            password_hash = f"{salt}:{hashlib.sha256(f'{salt}admin123'.encode()).hexdigest()}"
            
            new_admin = User(
                id=f"admin_{secrets.token_hex(8)}",
                email=admin_email,
                name="Admin User",
                password_hash=password_hash,
                tier="enterprise",
                is_verified=True,
                is_admin=True,
                is_active=True,
                created_at=datetime.now(timezone.utc),
                total_requests=0,
                api_keys=[]
            )
            
            db.add(new_admin)
            db.commit()
            print("✅ Admin user created in database: admin@tiannara.com / admin123")
        else:
            print("ℹ️  Admin user already exists in database")
    finally:
        db.close()


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "version": APP_VERSION,
        "service": "Tiannara API"
    }
