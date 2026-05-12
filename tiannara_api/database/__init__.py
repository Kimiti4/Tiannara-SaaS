"""
Database Configuration for Tiannara

PostgreSQL database setup and session management.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Database URL from environment variable
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:eYJPc922pkA2DFT@localhost:5432/tiannara"
)

# Create engine with connection pooling
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    echo=False  # Set to True for SQL debugging
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


def get_db():
    """Get database session (dependency for FastAPI routes)."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database - create all tables."""
    # Import models to register them with Base
    from tiannara_api.database.models import User
    
    Base.metadata.create_all(bind=engine)
    print("✅ Database initialized successfully!")
