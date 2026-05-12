"""
Test API Gateway Endpoints

Quick verification that all gateway components work together.
"""

import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

def test_gateway_imports():
    """Test that all gateway modules can be imported."""
    print("Testing gateway imports...")
    
    try:
        from tiannara_api.gateway.auth import (
            create_jwt_token,
            verify_jwt_token,
            check_permission,
            check_tier_quota
        )
        print("✅ Auth module imported successfully")
    except Exception as e:
        print(f"❌ Auth module import failed: {e}")
        return False
    
    try:
        from tiannara_api.gateway.routing import (
            register_engine,
            get_engine,
            ROUTE_MAP
        )
        print("✅ Routing module imported successfully")
    except Exception as e:
        print(f"❌ Routing module import failed: {e}")
        return False
    
    try:
        from tiannara_api.gateway.orchestrator import orchestrator
        print("✅ Orchestrator module imported successfully")
    except Exception as e:
        print(f"❌ Orchestrator module import failed: {e}")
        return False
    
    try:
        from tiannara_api.gateway.usage_tracker import usage_tracker
        print("✅ Usage tracker module imported successfully")
    except Exception as e:
        print(f"❌ Usage tracker module import failed: {e}")
        return False
    
    try:
        from tiannara_api.gateway.rate_limit import rate_limiter
        print("✅ Rate limiter module imported successfully")
    except Exception as e:
        print(f"❌ Rate limiter module import failed: {e}")
        return False
    
    return True


def test_auth_functionality():
    """Test authentication functions."""
    print("\nTesting auth functionality...")
    
    from tiannara_api.gateway.auth import create_jwt_token, verify_jwt_token, check_permission
    
    # Test JWT token creation
    try:
        token_data = {"user_id": "test_user", "tier": "pro"}
        token = create_jwt_token(token_data)
        print(f"✅ JWT token created: {token[:50]}...")
    except Exception as e:
        print(f"❌ JWT token creation failed: {e}")
        return False
    
    # Test JWT token verification
    try:
        decoded = verify_jwt_token(token)
        assert decoded["user_id"] == "test_user"
        assert decoded["tier"] == "pro"
        print("✅ JWT token verification successful")
    except Exception as e:
        print(f"❌ JWT token verification failed: {e}")
        return False
    
    # Test permission checking
    try:
        assert check_permission("starter", "predict") == True
        assert check_permission("starter", "reason") == False
        assert check_permission("pro", "reason") == True
        assert check_permission("enterprise", "anything") == True
        print("✅ Permission checking working correctly")
    except Exception as e:
        print(f"❌ Permission checking failed: {e}")
        return False
    
    return True


def test_routing():
    """Test request routing."""
    print("\nTesting request routing...")
    
    from tiannara_api.gateway.routing import ROUTE_MAP, register_engine, get_engine
    
    # Check route map
    try:
        assert "/api/predict" in ROUTE_MAP
        assert "/api/reason" in ROUTE_MAP
        assert "/api/analyze" in ROUTE_MAP
        assert "/api/causal" in ROUTE_MAP
        print(f"✅ Route map has {len(ROUTE_MAP)} routes configured")
    except Exception as e:
        print(f"❌ Route map validation failed: {e}")
        return False
    
    # Test engine registration
    try:
        class MockEngine:
            name = "test_engine"
            version = "1.0.0"
        
        register_engine("test_engine", MockEngine())
        engine = get_engine("/api/predict")  # Should return None since not registered
        print("✅ Engine registration working")
    except Exception as e:
        print(f"❌ Engine registration failed: {e}")
        return False
    
    return True


def test_orchestrator():
    """Test workflow orchestrator."""
    print("\nTesting orchestrator...")
    
    from tiannara_api.gateway.orchestrator import orchestrator
    
    try:
        # Test simple orchestration
        result = orchestrator.orchestrate(
            request={"data": [1, 2, 3]},
            engine_sequence=["engine1", "engine2"]
        )
        
        assert "flow_id" in result
        assert "result" in result
        assert "latency_ms" in result
        assert "steps" in result
        print(f"✅ Orchestration completed in {result['latency_ms']}ms")
    except Exception as e:
        print(f"❌ Orchestration failed: {e}")
        return False
    
    try:
        # Test caching
        orchestrator.cache_result("test_key", {"value": 42})
        cached = orchestrator.check_cache("test_key")
        assert cached is not None
        assert cached["value"] == 42
        print("✅ Caching system working")
    except Exception as e:
        print(f"❌ Caching failed: {e}")
        return False
    
    return True


def test_usage_tracker():
    """Test usage tracking."""
    print("\nTesting usage tracker...")
    
    from tiannara_api.gateway.usage_tracker import usage_tracker
    
    try:
        # Log some requests
        usage_tracker.log_request(
            api_key="test_key",
            endpoint="/api/v1/predict",
            method="POST",
            status_code=200,
            latency_ms=45.5
        )
        
        # Get metrics
        metrics = usage_tracker.get_usage_metrics("test_key")
        assert metrics["total_requests"] == 1
        assert metrics["successful_requests"] == 1
        print(f"✅ Usage tracking working - {metrics['total_requests']} request logged")
    except Exception as e:
        print(f"❌ Usage tracking failed: {e}")
        return False
    
    try:
        # Get global metrics
        global_metrics = usage_tracker.get_global_metrics()
        assert "total_requests" in global_metrics
        assert "avg_latency_ms" in global_metrics
        print("✅ Global metrics collection working")
    except Exception as e:
        print(f"❌ Global metrics failed: {e}")
        return False
    
    return True


def test_rate_limiter():
    """Test rate limiting."""
    print("\nTesting rate limiter...")
    
    from tiannara_api.gateway.rate_limit import rate_limiter
    
    try:
        # Test starter tier (5000 req/hr)
        allowed, info = rate_limiter.check_rate_limit("test_starter", tier="starter")
        assert allowed == True
        assert info["limit"] == 5000
        assert "remaining" in info
        print(f"✅ Rate limiter working - {info['remaining']} requests remaining")
    except Exception as e:
        print(f"❌ Rate limiter failed: {e}")
        return False
    
    try:
        # Test enterprise tier (unlimited)
        allowed, info = rate_limiter.check_rate_limit("test_enterprise", tier="enterprise")
        assert allowed == True
        assert info["limit"] == -1
        print("✅ Enterprise unlimited access working")
    except Exception as e:
        print(f"❌ Enterprise tier check failed: {e}")
        return False
    
    return True


def main():
    """Run all tests."""
    print("="*80)
    print("TIANNARA API GATEWAY - COMPONENT TESTS")
    print("="*80)
    
    results = []
    
    # Run tests
    results.append(("Imports", test_gateway_imports()))
    results.append(("Authentication", test_auth_functionality()))
    results.append(("Routing", test_routing()))
    results.append(("Orchestrator", test_orchestrator()))
    results.append(("Usage Tracker", test_usage_tracker()))
    results.append(("Rate Limiter", test_rate_limiter()))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {name}")
    
    print("="*80)
    print(f"Total: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All gateway components working correctly!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} component(s) need attention")
        return 1


if __name__ == "__main__":
    sys.exit(main())
