import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, User, ArrowRight, CheckCircle, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8004/api/v1';

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState('form'); // 'form', 'otp-verify'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    tier: 'starter'
  });
  const [otpCode, setOtpCode] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for interactive background
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Request OTP during signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed');
      }
      
      setSuccessMessage(data.message);
      setStep('otp-verify');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and complete registration
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp_code: otpCode
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Verification failed');
      }
      
      // Store JWT token
      localStorage.setItem('tiannara_token', data.token);
      localStorage.setItem('tiannara_user', JSON.stringify(data.user));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }
      
      // Store JWT token
      localStorage.setItem('tiannara_token', data.token);
      localStorage.setItem('tiannara_user', JSON.stringify(data.user));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/request-otp?email=${encodeURIComponent(formData.email)}`, {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to resend OTP');
      }
      
      setSuccessMessage('New verification code sent!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6">
      {/* Unique Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic Gradient Mesh */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 20% 30%, rgba(147, 51, 234, 0.2) 0, transparent 50%),
              radial-gradient(at 80% 70%, rgba(59, 130, 246, 0.2) 0, transparent 50%),
              radial-gradient(at 50% 50%, rgba(236, 72, 153, 0.15) 0, transparent 50%)
            `,
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />

        {/* Floating Geometric Shapes */}
        <div 
          className="absolute top-20 right-20 w-64 h-64 border-2 border-purple-500/20 rounded-3xl rotate-45 animate-pulse"
          style={{ 
            transform: `rotate(45deg) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.4s ease-out'
          }}
        />
        <div 
          className="absolute bottom-20 left-20 w-48 h-48 border-2 border-blue-500/20 rounded-full animate-pulse"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.4s ease-out'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl rotate-12 animate-pulse"
          style={{ 
            animationDelay: '2s',
            transform: `rotate(12deg) translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
            transition: 'transform 0.4s ease-out'
          }}
        />

        {/* Particle Effect Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Blur Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
          style={{ 
            animationDelay: '1.5s',
            transform: `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 mb-4 shadow-2xl shadow-purple-500/50">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400">
            {isLogin ? 'Sign in to continue building' : 'Start building intelligent applications'}
          </p>
        </div>

        {/* Form Card */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          <form onSubmit={isLogin ? handleLogin : (step === 'form' ? handleSignup : handleVerifyOTP)} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-300 text-sm font-medium">Error</p>
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              </div>
            )}
          
            {/* Success Message */}
            {successMessage && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-green-200 text-sm">{successMessage}</p>
              </div>
            )}
            {!isLogin && step === 'form' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* OTP Verification Step */}
            {!isLogin && step === 'otp-verify' && (
              <div>
                <div className="text-center mb-6">
                  <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Verify Your Email</h3>
                  <p className="text-gray-400 text-sm">
                    We sent a 6-digit code to <span className="text-purple-300 font-medium">{formData.email}</span>
                  </p>
                </div>
                                
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-center text-2xl tracking-widest font-mono placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="000000"
                  maxLength={6}
                  required
                  autoFocus
                />
                                
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="mt-4 w-full py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            )}
            
            {/* Password Field (only show on form step or login) */}
            {(step === 'form' || isLogin) && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Tier Selection (only on signup form step) */}
            {!isLogin && step === 'form' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Select Plan
                </label>
                <div className="space-y-3">
                  {[
                    { tier: 'starter', name: 'Starter', price: 'Free', features: '5K req/hr' },
                    { tier: 'pro', name: 'Pro', price: '$49/mo', features: '50K req/hr', popular: true }
                  ].map((plan) => (
                    <label
                      key={plan.tier}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.tier === plan.tier
                          ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tier"
                        value={plan.tier}
                        checked={formData.tier === plan.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="hidden"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.tier === plan.tier
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-500'
                        }`}>
                          {formData.tier === plan.tier && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{plan.name}</span>
                            {plan.popular && (
                              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs text-white">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="text-gray-400 text-sm">{plan.features}</div>
                        </div>
                      </div>
                      <div className="text-white font-semibold">{plan.price}</div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isLogin ? 'Signing In...' : (step === 'otp-verify' ? 'Verifying...' : 'Creating Account...')}</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : (step === 'otp-verify' ? 'Verify Code' : 'Create Account')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-500 text-sm">
            By signing up, you agree to our{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
          </p>
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
