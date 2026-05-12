"""
Database Models for Tiannara

SQLAlchemy ORM models for PostgreSQL database.
"""
from sqlalchemy import Column, String, Boolean, Integer, DateTime, Text, ARRAY
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

from tiannara_api.database import Base


class User(Base):
    """User model for authentication and management."""
    
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: f"user_{uuid.uuid4().hex[:16]}")
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    tier = Column(String, default="starter")  # starter, professional, enterprise
    is_verified = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    total_requests = Column(Integer, default=0)
    api_keys = Column(ARRAY(String), default=[])
    
    def to_dict(self):
        """Convert user to dictionary (excluding sensitive data)."""
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "tier": self.tier,
            "is_verified": self.is_verified,
            "is_admin": self.is_admin,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "total_requests": self.total_requests,
        }
