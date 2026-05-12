# Tiannara GUI Dependencies

## Installed Packages

### Core Dependencies
- **react** - UI framework
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **lucide-react** - Icon library (✅ Just installed)

### Development Dependencies
- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - React plugin for Vite
- **eslint** - Code linting
- **tailwindcss** - Utility-first CSS framework
- **autoprefixer** - CSS vendor prefixing
- **postcss** - CSS processing

## Installation

```bash
cd tiannara_gui
npm install
```

## Recently Added

### lucide-react
Installed to support icon usage in SaaS frontend pages:
- LandingPage.jsx
- SaaSDashboard.jsx
- SignupPage.jsx

**Icons Used:**
- Brain, Zap, BarChart3, Activity, Key, CreditCard
- Settings, LogOut, ChevronRight, TrendingUp, Clock
- AlertCircle, CheckCircle2, XCircle, ArrowRight
- Sparkles, Play, Eye, EyeOff, User, Mail, Lock

## Running the App

```bash
npm run dev
```

Server will start on http://localhost:5173/ (or next available port)

## Available Pages

- **Landing Page**: http://localhost:5174/
- **Signup**: http://localhost:5174/signup
- **Login**: http://localhost:5174/login
- **Dashboard**: http://localhost:5174/dashboard
- **Legacy Dashboard**: http://localhost:5174/legacy/dashboard

## Troubleshooting

### Missing Module Errors
If you see "Failed to resolve import" errors:
```bash
npm install <package-name>
```

Example:
```bash
npm install lucide-react
```

### Port Already in Use
Vite automatically finds the next available port if 5173 is occupied.

### Clear Cache
If issues persist:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Package Versions

Check current versions:
```bash
npm list --depth=0
```

Update packages:
```bash
npm update
```

## Security

Run security audit:
```bash
npm audit
```

Fix vulnerabilities:
```bash
npm audit fix
```

---

**Last Updated**: May 9, 2026  
**Status**: ✅ All dependencies installed and working
