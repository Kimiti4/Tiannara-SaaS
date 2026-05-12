import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Brain, Shield, BarChart3, Sparkles, CheckCircle, Play } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track scroll and mouse for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Mesh Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
              radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
              radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)
            `,
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        />
        
        {/* Floating Orbs */}
        <div 
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        />
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ 
            animationDelay: '2s',
            transform: `translate(-50%, -50%) translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        />

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full backdrop-blur-xl bg-black/20 border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Tiannara
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
              <button 
                onClick={() => navigate('/signup')}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div 
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">AI Infrastructure for the Future</span>
            </div>

            <h1 
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Intelligent AI
              </span>
              <br />
              <span className="text-white">Infrastructure</span>
            </h1>

            <p 
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
              style={{ transform: `translateY(${scrollY * 0.03}px)` }}
            >
              Prediction, reasoning, causal analysis, and NLP — all in one powerful API.
              Build smarter applications with tiered access and enterprise-grade reliability.
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            >
              <button 
                onClick={() => navigate('/signup')}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Building Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { value: '5+', label: 'AI Domains', icon: Brain },
                { value: '99.9%', label: 'Uptime SLA', icon: Shield },
                { value: '<50ms', label: 'Avg Latency', icon: Zap }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                  style={{ transform: `translateY(${scrollY * 0.02}px)` }}
                >
                  <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Powerful AI Capabilities
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need to build intelligent applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'ML Predictions',
                  description: 'Forecast future values with advanced machine learning models',
                  icon: BarChart3,
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Logical Reasoning',
                  description: 'Autonomous code generation and multi-step logical analysis',
                  icon: Brain,
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'NLP Analysis',
                  description: 'Sentiment analysis, entity extraction, and text summarization',
                  icon: Sparkles,
                  gradient: 'from-orange-500 to-red-500'
                },
                {
                  title: 'Causal Inference',
                  description: 'Discover causal relationships from observational data',
                  icon: Zap,
                  gradient: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Workflow Orchestration',
                  description: 'Chain multiple AI domains for complex tasks',
                  icon: CheckCircle,
                  gradient: 'from-indigo-500 to-purple-500'
                },
                {
                  title: 'Enterprise Security',
                  description: 'JWT auth, API keys, rate limiting, and tier-based access',
                  icon: Shield,
                  gradient: 'from-pink-500 to-rose-500'
                }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:shadow-lg transition-shadow`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                AI Decision Infrastructure
              </h2>
              <p className="text-xl text-gray-400">
                Build intelligent workflows without building AI from scratch
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Starter',
                  price: '$49',
                  period: '/month',
                  description: 'Build smarter workflows without building AI from scratch',
                  environment: 'Sandbox / Experimental',
                  features: [
                    '5,000 API requests/month',
                    'Core reasoning & workflow automation',
                    'AI-assisted analytics',
                    'Explainable decision outputs',
                    'Basic dashboard analytics',
                    'API access & documentation',
                    'Community support'
                  ],
                  useCases: [
                    'Marketing automation',
                    'Research assistance',
                    'Customer segmentation',
                    'Data analysis'
                  ],
                  cta: 'Start Free Trial',
                  popular: false,
                  gradient: 'from-gray-600 to-gray-700'
                },
                {
                  name: 'Professional',
                  price: '$199',
                  period: '/month',
                  description: 'Production-ready AI infrastructure for growing businesses',
                  environment: 'Production-Ready',
                  features: [
                    '50,000 API requests/month',
                    'Everything in Starter, plus:',
                    'Priority processing & faster response times',
                    'Advanced workflow orchestration',
                    'Real-time analytics dashboard',
                    'Team collaboration tools',
                    'Webhooks & integrations',
                    'SLA-backed uptime (99.5%)',
                    'Priority support (24hr response)'
                  ],
                  useCases: [
                    'Fraud detection systems',
                    'Workflow orchestration',
                    'Predictive analytics',
                    'AI-powered monitoring'
                  ],
                  cta: 'Start Professional',
                  popular: true,
                  gradient: 'from-purple-600 to-pink-600'
                },
                {
                  name: 'Enterprise',
                  price: 'Contact Sales',
                  period: '',
                  description: 'Enterprise AI infrastructure with compliance, explainability, and dedicated deployment support',
                  environment: 'Mission-Critical',
                  features: [
                    'Unlimited API access',
                    'Everything in Professional, plus:',
                    'Dedicated infrastructure options',
                    'Custom AI workflow deployment',
                    'Explainability & audit reporting',
                    'Compliance tooling & governance',
                    'Dedicated account manager',
                    '24/7 priority support',
                    'Private/on-premise deployment options'
                  ],
                  useCases: [
                    'Compliance & risk systems',
                    'Large-scale intelligence workflows',
                    'Custom enterprise integrations',
                    'Regulated industry applications'
                  ],
                  cta: 'Contact Sales',
                  popular: false,
                  gradient: 'from-blue-600 to-indigo-600'
                }
              ].map((plan, idx) => (
                <div 
                  key={idx}
                  className={`relative p-8 rounded-2xl ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500' 
                      : 'bg-white/5 border border-white/10'
                  } hover:transform hover:scale-105 transition-all`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  {plan.environment && (
                    <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-gray-300 mb-3">
                      {plan.environment}
                    </div>
                  )}
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center space-x-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.useCases && plan.useCases.length > 0 && (
                    <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-3">Common Use Cases:</h4>
                      <div className="flex flex-wrap gap-2">
                        {plan.useCases.map((useCase, uidx) => (
                          <span key={uidx} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => navigate('/signup')}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 border border-white/10 backdrop-blur-sm">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Build Smarter?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join developers building the next generation of AI-powered applications
              </p>
              <button 
                onClick={() => navigate('/signup')}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                Get Started Free →
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Brain className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-white">Tiannara</span>
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
              <div className="mt-4 md:mt-0 text-gray-500 text-sm">
                © 2026 Tiannara. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
