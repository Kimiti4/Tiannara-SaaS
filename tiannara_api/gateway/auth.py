"""
API Gateway Authentication

Handles:
- API key authentication
- JWT token validation
- User tier checking (Starter/Pro/Enterprise)
- Permission-based access control
"""

import logging
from typing import Optional, Dict, Any
from datetime import datetime, timedelta

from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader, HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

logger = logging.getLogger(__name__)

# Security schemes
API_KEY_HEADER = APIKeyHeader(name="X-API-Key", auto_error=False)
JWT_BEARER = HTTPBearer(auto_error=False)

# JWT Configuration
JWT_SECRET = "tiannara-core-secret-change-in-production"  # TODO: Move to env vars
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Tier-based quotas
TIER_QUOTAS = {
    "starter": 5000,
    "pro": 50000,
    "enterprise": -1,  # Unlimited
}

# Permission definitions
PERMISSIONS = {
    "starter": ["read", "predict", "analyze"],
    "pro": ["read", "predict", "analyze", "reason", "evolve", "causal"],
    "enterprise": ["*"],  # All permissions
}


def create_jwt_token(data: Dict[str, Any], expires_hours: int = JWT_EXPIRATION_HOURS) -> str:
    """Create a JWT token for authenticated users."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=expires_hours)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def verify_jwt_token(token: str) -> Dict[str, Any]:
    """Verify and decode a JWT token."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError as e:
        logger.error(f"JWT verification failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_api_key(api_key: str = Security(API_KEY_HEADER)):
    """
    Validate API key from header.
    
    In production, this should query the database.
    For now, returns the key for validation in downstream logic.
    """
    if not api_key:
        return None
    
    # TODO: Query database to validate API key and get user info
    # For now, accept any non-empty key
    return api_key


def get_jwt_credentials(credentials: Optional[HTTPAuthorizationCredentials] = Security(JWT_BEARER)):
    """
    Validate JWT credentials from Authorization header.
    """
    if not credentials:
        return None
    
    return verify_jwt_token(credentials.credentials)


def check_tier_quota(tier: str, current_usage: int) -> bool:
    """
    Check if user has remaining quota based on their tier.
    
    Returns:
        True if quota available, False if exceeded
    """
    quota = TIER_QUOTAS.get(tier, 0)
    
    # Enterprise has unlimited quota
    if quota == -1:
        return True
    
    return current_usage < quota


def check_permission(user_tier: str, required_permission: str) -> bool:
    """
    Check if user tier has required permission.
    
    Args:
        user_tier: User's subscription tier
        required_permission: Permission being requested
        
    Returns:
        True if permission granted, False otherwise
    """
    user_permissions = PERMISSIONS.get(user_tier, [])
    
    # Enterprise has all permissions
    if "*" in user_permissions:
        return True
    
    return required_permission in user_permissions


class AuthenticationError(Exception):
    """Custom authentication error."""
    pass
