# Tiannara SaaS Platform

**Customer-facing AI reasoning platform with subscription management and payment integration.**

---

## ��� **Overview**

Tiannara SaaS is the customer-facing layer of the Tiannara ecosystem, providing:
- User authentication & authorization (OAuth 2.0, SAML)
- Subscription management & billing (Stripe, Lemon Squeezy)
- Dashboard & analytics
- API key management
- Team workspaces & RBAC
- Integration with Tiannara Core AI engine via REST API

---

## ���️ **Architecture**

```
┌─────────────────────┐    HTTP/API Calls     ┌──────────────────────┐
│   Tiannara SaaS     │ ◀──────────────────▶  │   Tiannara Core      │
│                     │                       │                      │
│ • Next.js Frontend  │                       │ • Reasoning Engine   │
│ • FastAPI Backend   │                       │ • Domain Modules     │
│ • Payment/Billing   │                       │ • AI Features        │
│ • User Auth         │                       │ • Evolution System   │
│ • Admin Dashboard   │                       │ • Research Tracks    │
└─────────────────────┘                       └──────────────────────┘
```

**Key Point**: SaaS communicates with Core via HTTP API calls (`core_proxy.py`), NOT code imports. This allows independent deployment.

---

## ��� **Project Structure**

```
Tiannara-SaaS/
├── tiannara_api/           # FastAPI backend
│   ├── routes/
│   │   ├── auth.py        # Authentication endpoints
│   │   ├── payment.py     # Payment processing
│   │   ├── core_proxy.py  # Bridge to Tiannara Core
│   │   ├── users.py       # User management
│   │   └── ...
│   ├── main.py            # Application entry point
│   └── schemas.py         # Pydantic models
│
├── tiannara_gui/          # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   └── lib/               # Utility functions
│
├── docs/deployment/       # Deployment guides
├── Procfile               # Railway deployment config
├── runtime.txt            # Python version
├── requirements.txt       # Python dependencies
└── .env.template          # Environment variables template
```

---

## ��� **Quick Start**

### **Prerequisites**
- Python 3.11+
- Node.js 18+
- PostgreSQL database
- Stripe account (or Lemon Squeezy)
- Tiannara Core API running (separate deployment)

### **Backend Setup**

1. **Install dependencies**:
```bash
cd tiannara_api
pip install -r requirements.txt
```

2. **Configure environment**:
```bash
cp .env.template .env
# Edit .env with your credentials
```

3. **Run backend**:
```bash
uvicorn tiannara_api.main:app --reload --port 8000
```

### **Frontend Setup**

1. **Install dependencies**:
```bash
cd tiannara_gui
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open browser**: http://localhost:3000

---

## ��� **Environment Variables**

Create `.env` file from `.env.template`:

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/tiannara_saas

# Payment Providers
PAYMENT_PROVIDER=lemon_squeezy  # or 'stripe'
STRIPE_SECRET_KEY=sk_test_...
LEMON_SQUEEZY_API_KEY=eyJwcm9k...

# Tiannara Core Integration
CORE_API_URL=http://localhost:8001  # Core API endpoint
CORE_API_KEY=your-core-api-key      # Optional

# Email Service
RESEND_API_KEY=re_...

# JWT Authentication
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

See [.env.template](.env.template) for complete list.

---

## ��� **Payment Integration**

Supports multiple payment providers:

- **Lemon Squeezy** (Recommended): No business registration required, handles taxes/VAT
- **Stripe**: Individual accounts allowed, lower fees

Configure in `.env`:
```bash
PAYMENT_PROVIDER=lemon_squeezy  # Default provider
```

Override per transaction:
```bash
curl -X POST http://localhost:8000/api/v1/payment/subscribe \
  -d '{"plan": "starter", "provider": "stripe"}'
```

See [PAYMENT_INTEGRATION_ANSWERS.md](PAYMENT_INTEGRATION_ANSWERS.md) for details.

---

## ��� **Core API Integration**

SaaS communicates with Tiannara Core via REST API:

```python
# Example: Submit reasoning task
response = requests.post(
    f"{CORE_API_URL}/api/v1/reason",
    headers={"Authorization": f"Bearer {CORE_API_KEY}"},
    json={
        "task": "analyze_market_trends",
        "data": {...}
    }
)
```

Available endpoints in [tiannara_api/routes/core_proxy.py](tiannara_api/routes/core_proxy.py):
- `POST /api/v1/core/reason` - Submit reasoning tasks
- `GET /api/v1/core/domains` - List domain engines
- `POST /api/v1/core/predict` - Get ML predictions
- `GET /api/v1/core/status` - Health check

---

## ��� **Deployment**

### **Option 1: Railway (Recommended)**

1. Create project on [Railway](https://railway.app)
2. Connect GitHub repository
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy automatically

See [DEPLOY_NOW.md](DEPLOY_NOW.md) for step-by-step guide.

### **Option 2: Docker**

```bash
docker-compose up -d
```

### **Option 3: Manual VPS**

See [docs/deployment/DEPLOYMENT_QUICK_START.md](docs/deployment/DEPLOYMENT_QUICK_START.md)

---

## ��� **Testing**

```bash
# Backend tests
cd tiannara_api
pytest

# Frontend tests
cd tiannara_gui
npm test
```

---

## ��� **Documentation**

- **Deployment Guide**: [DEPLOY_NOW.md](DEPLOY_NOW.md)
- **Payment Setup**: [docs/deployment/PAYMENT_SETUP_GUIDE.md](docs/deployment/PAYMENT_SETUP_GUIDE.md)
- **Repository Separation**: [SAAS_REPOSITORY_SEPARATION.md](SAAS_REPOSITORY_SEPARATION.md)
- **Complete Integration**: [docs/deployment/COMPLETE_PAYMENT_INTEGRATION.md](docs/deployment/COMPLETE_PAYMENT_INTEGRATION.md)

---

## ��� **Security**

- OAuth 2.0 SSO (Google, Microsoft, GitHub)
- SAML 2.0 for enterprise identity providers
- JWT-based authentication
- Role-based access control (RBAC)
- Audit logging
- Rate limiting
- CORS protection

---

## ��� **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## ��� **License**

Proprietary - See LICENSE file

---

## ��� **Support**

- Documentation: [docs/](docs/)
- Issues: [GitHub Issues](https://github.com/Kimiti4/Tiannara-SaaS/issues)
- Email: support@tiannara.ai

---

**Built with ❤️ by the Tiannara Team**
