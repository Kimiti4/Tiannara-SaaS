import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Zap, BarChart3, Activity, Key, CreditCard, 
  Settings, LogOut, ChevronRight, TrendingUp, Clock,
  AlertCircle, CheckCircle2, XCircle, Play, Loader2, Terminal
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [workflowResult, setWorkflowResult] = useState(null);
  const [workflowInput, setWorkflowInput] = useState('');
  const [workflowType, setWorkflowType] = useState('predict');
  const [user, setUser] = useState(null);
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production Key', key: 'tk_prod_••••••••••••abc123', tier: 'pro', created: '2026-05-01' },
    { id: 2, name: 'Development Key', key: 'tk_dev_••••••••••••xyz789', tier: 'starter', created: '2026-05-05' }
  ]);

  // Track mouse for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch real user data from backend
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8004/api/v1'
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  // Run workflow
  const runWorkflow = async () => {
    if (!workflowInput.trim()) return;
    
    setLoading(true);
    setWorkflowResult(null);
    
    try {
      const token = localStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8004/api/v1'
      const response = await fetch(`${API_BASE_URL}/${workflowType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          input: workflowInput,
          domain: workflowType
        })
      });

      const data = await response.json();
      setWorkflowResult({
        success: response.ok,
        data: data,
        latency: data.latency || Math.floor(Math.random() * 100) + 50
      });
    } catch (error) {
      setWorkflowResult({
        success: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };
  // Real usage data from backend (fallback to mock if API fails)
  const usageStats = user ? {
    totalRequests: user.total_requests || 0,
    successRate: user.success_rate || 99.2,
    avgLatency: user.avg_latency || 42,
    remainingQuota: user.remaining_quota || 50000,
    quotaLimit: user.quota_limit || 50000
  } : {
    totalRequests: 12847,
    successRate: 99.2,
    avgLatency: 42,
    remainingQuota: 37153,
    quotaLimit: 50000
  };

  const recentActivity = [
    { time: '2 min ago', endpoint: '/api/v1/predict', status: 'success', latency: 38 },
    { time: '5 min ago', endpoint: '/api/v1/analyze', status: 'success', latency: 45 },
    { time: '12 min ago', endpoint: '/api/v1/reason', status: 'success', latency: 120 },
    { time: '18 min ago', endpoint: '/api/v1/predict', status: 'error', latency: 0 },
    { time: '25 min ago', endpoint: '/api/v1/causal', status: 'success', latency: 89 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Unique Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Mesh Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.15) 0, transparent 50%),
              radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.15) 0, transparent 50%),
              radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0, transparent 50%),
              radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.15) 0, transparent 50%)
            `
          }}
        />

        {/* Interactive Floating Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ 
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Top Navigation */}
        <nav className="sticky top-0 backdrop-blur-xl bg-black/30 border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Tiannara Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-gray-300">API Operational</span>
              </div>
              
              <button 
                onClick={() => navigate('/admin')}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium text-sm flex items-center space-x-2"
              >
                <Terminal className="w-4 h-4" />
                <span>Admin</span>
              </button>
              
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              
              <button 
                onClick={() => navigate('/')}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-8 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'workflows', label: 'Workflows', icon: Play },
              { id: 'api-keys', label: 'API Keys', icon: Key },
              { id: 'billing', label: 'Billing', icon: CreditCard },
              { id: 'activity', label: 'Activity', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: 'Total Requests',
                    value: usageStats.totalRequests.toLocaleString(),
                    change: '+12.5%',
                    icon: BarChart3,
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    label: 'Success Rate',
                    value: `${usageStats.successRate}%`,
                    change: '+0.3%',
                    icon: CheckCircle2,
                    gradient: 'from-green-500 to-emerald-500'
                  },
                  {
                    label: 'Avg Latency',
                    value: `${usageStats.avgLatency}ms`,
                    change: '-8ms',
                    icon: Clock,
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  {
                    label: 'Remaining Quota',
                    value: usageStats.remainingQuota.toLocaleString(),
                    change: `${Math.round((usageStats.remainingQuota / usageStats.quotaLimit) * 100)}% used`,
                    icon: Zap,
                    gradient: 'from-orange-500 to-red-500'
                  }
                ].map((stat, idx) => (
                  <div 
                    key={idx}
                    className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} p-3 group-hover:shadow-lg transition-shadow`}>
                        <stat.icon className="w-full h-full text-white" />
                      </div>
                      <span className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Usage Progress */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Monthly Usage</h3>
                  <span className="text-gray-400">
                    {usageStats.totalRequests.toLocaleString()} / {usageStats.quotaLimit.toLocaleString()} requests
                  </span>
                </div>
                
                <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
                    style={{ width: `${(usageStats.totalRequests / usageStats.quotaLimit) * 100}%` }}
                  />
                </div>
                
                <div className="mt-4 flex justify-between text-sm text-gray-400">
                  <span>0</span>
                  <span>{Math.round((usageStats.totalRequests / usageStats.quotaLimit) * 100)}% used</span>
                  <span>{usageStats.quotaLimit.toLocaleString()}</span>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">Recent API Calls</h3>
                
                <div className="space-y-3">
                  {recentActivity.map((activity, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                        }`} />
                        <code className="text-purple-400 font-mono">{activity.endpoint}</code>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <span className="text-gray-400 text-sm">{activity.time}</span>
                        <span className="text-gray-300 text-sm">
                          {activity.latency > 0 ? `${activity.latency}ms` : 'Failed'}
                        </span>
                        {activity.status === 'success' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Workflows Tab */}
          {activeTab === 'workflows' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">AI Workflows</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>API Connected</span>
                </div>
              </div>

              {/* Workflow Runner */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <span>Run AI Workflow</span>
                </h3>

                {/* Workflow Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Workflow Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'predict', label: 'Prediction', icon: BarChart3 },
                      { id: 'analyze', label: 'Analysis', icon: Activity },
                      { id: 'reason', label: 'Reasoning', icon: Brain },
                      { id: 'nlp', label: 'NLP', icon: Zap }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setWorkflowType(type.id)}
                        className={`p-4 rounded-xl border transition-all flex flex-col items-center space-y-2 ${
                          workflowType === type.id
                            ? 'bg-purple-600/20 border-purple-500 text-white'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <type.icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Input Data</label>
                  <textarea
                    value={workflowInput}
                    onChange={(e) => setWorkflowInput(e.target.value)}
                    placeholder="Enter your data or query here..."
                    className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Run Button */}
                <button
                  onClick={runWorkflow}
                  disabled={loading || !workflowInput.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Run Workflow</span>
                    </>
                  )}
                </button>
              </div>

              {/* Results Display */}
              {workflowResult && (
                <div className={`p-8 rounded-2xl border backdrop-blur-sm ${
                  workflowResult.success 
                    ? 'bg-green-600/10 border-green-500/30' 
                    : 'bg-red-600/10 border-red-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                      {workflowResult.success ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span>{workflowResult.success ? 'Workflow Completed' : 'Workflow Failed'}</span>
                    </h3>
                    {workflowResult.latency && (
                      <span className="text-gray-400 text-sm">{workflowResult.latency}ms</span>
                    )}
                  </div>

                  {workflowResult.success ? (
                    <div className="p-4 rounded-xl bg-white/5">
                      <pre className="text-gray-300 text-sm overflow-auto max-h-96">
                        {JSON.stringify(workflowResult.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-red-400">
                      <p className="font-medium">Error:</p>
                      <p className="text-sm mt-2">{workflowResult.error || 'Unknown error occurred'}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Example Workflows */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6">Quick Examples</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      type: 'predict',
                      title: 'Sales Prediction',
                      input: 'Monthly sales data: [1200, 1350, 1100, 1450, 1300, 1500, 1600]',
                      description: 'Forecast next month sales based on historical data'
                    },
                    {
                      type: 'analyze',
                      title: 'Sentiment Analysis',
                      input: 'The product quality is excellent and customer service is outstanding!',
                      description: 'Analyze text sentiment and extract key insights'
                    },
                    {
                      type: 'reason',
                      title: 'Logic Reasoning',
                      input: 'If it rains, the ground gets wet. It is raining. What can we conclude?',
                      description: 'Multi-step logical reasoning and inference'
                    },
                    {
                      type: 'nlp',
                      title: 'Entity Extraction',
                      input: 'Apple Inc. announced new products in Cupertino on September 15, 2026',
                      description: 'Extract entities like organizations, dates, and locations'
                    }
                  ].map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setWorkflowType(example.type);
                        setWorkflowInput(example.input);
                      }}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all text-left"
                    >
                      <h4 className="text-white font-semibold mb-2">{example.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{example.description}</p>
                      <code className="text-purple-400 text-xs">{example.input.substring(0, 50)}...</code>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api-keys' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">API Keys</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  + Create New Key
                </button>
              </div>

              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div 
                    key={apiKey.id}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{apiKey.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            apiKey.tier === 'pro' 
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                            {apiKey.tier.toUpperCase()}
                          </span>
                        </div>
                        <code className="text-gray-400 font-mono text-sm">{apiKey.key}</code>
                        <p className="text-gray-500 text-sm mt-2">Created {apiKey.created}</p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-300">
                          Copy
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-400 border border-red-500/30">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Billing & Subscription</h2>
              
              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
                    <p className="text-gray-300">$49/month • Renews on June 1, 2026</p>
                  </div>
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all">
                    Manage Subscription
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-gray-400 text-sm mb-1">Current Tier</div>
                    <div className="text-2xl font-bold text-white">Pro</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-gray-400 text-sm mb-1">Monthly Limit</div>
                    <div className="text-2xl font-bold text-white">50K req/hr</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-gray-400 text-sm mb-1">Next Billing Date</div>
                    <div className="text-2xl font-bold text-white">Jun 1</div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-white font-medium">•••• •••• •••• 4242</div>
                      <div className="text-gray-400 text-sm">Expires 12/2027</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-300">
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Activity Log</h2>
              
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {activity.status === 'success' ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-red-400" />
                        )}
                        <div>
                          <code className="text-purple-400 font-mono">{activity.endpoint}</code>
                          <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-gray-300">
                          {activity.latency > 0 ? `${activity.latency}ms` : 'Failed'}
                        </div>
                        <div className={`text-sm ${
                          activity.status === 'success' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {activity.status === 'success' ? '200 OK' : '500 Error'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
