import React, { useState, useEffect } from 'react';
import { 
  Activity, Server, Database, Cpu, TrendingUp, AlertCircle, 
  CheckCircle2, XCircle, Zap, Brain, BarChart3, Clock,
  ArrowUpRight, ArrowDownRight, Play, Pause, RefreshCw,
  Terminal, GitBranch, Layers, Shield, Users, Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalRequests: 0,
    requestsChange: 0,
    activeUsers: 0,
    usersChange: 0,
    avgLatency: 0,
    latencyChange: 0,
    successRate: 0,
    errorRate: 0,
    uptime: 99.98
  });

  const [domainEngines, setDomainEngines] = useState([
    { name: 'Predict', status: 'running', version: 'v1.5.3', requests: 0, health: 100 },
    { name: 'Analyze', status: 'running', version: 'v1.4.8', requests: 0, health: 100 },
    { name: 'Reason', status: 'running', version: 'v1.6.1', requests: 0, health: 100 },
    { name: 'NLP', status: 'running', version: 'v1.3.9', requests: 0, health: 100 }
  ]);

  const [systemHealth, setSystemHealth] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0
  });

  const [orchestrationFlows, setOrchestrationFlows] = useState([
    { id: 1, name: 'Data Ingestion Pipeline', status: 'active', duration: '2m 34s' },
    { id: 2, name: 'Model Training Workflow', status: 'queued', duration: '-' },
    { id: 3, name: 'Analytics Processing', status: 'completed', duration: '15m 12s' },
    { id: 4, name: 'Report Generation', status: 'failed', duration: '45s' }
  ]);

  const [logs, setLogs] = useState([]);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [showRestartModal, setShowRestartModal] = useState(false);

  // Fetch real-time metrics
  useEffect(() => {
    fetchAdminMetrics();
    const interval = setInterval(fetchAdminMetrics, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchAdminMetrics = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        // Fallback to mock data for demo
        setMockMetrics();
        return;
      }

      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8004/api/v1'
      const response = await fetch(`${API_BASE_URL}/admin/metrics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setMetrics(data.metrics);
        setDomainEngines(data.engines);
        setSystemHealth(data.system_health);
        setOrchestrationFlows(data.flows);
        setLogs(data.recent_logs || []);
      } else {
        setMockMetrics();
      }
    } catch (error) {
      console.error('Failed to fetch admin metrics:', error);
      setMockMetrics();
    }
  };

  const setMockMetrics = () => {
    setMetrics({
      totalRequests: 1247893,
      requestsChange: 12.5,
      activeUsers: 3421,
      usersChange: 8.3,
      avgLatency: 87,
      latencyChange: -5.2,
      successRate: 99.7,
      errorRate: 0.3,
      uptime: 99.98
    });

    setDomainEngines(prev => prev.map(engine => ({
      ...engine,
      requests: Math.floor(Math.random() * 50000) + 10000
    })));

    setSystemHealth({
      cpu: Math.floor(Math.random() * 30) + 40,
      memory: Math.floor(Math.random() * 20) + 60,
      disk: Math.floor(Math.random() * 15) + 55,
      network: Math.floor(Math.random() * 25) + 50
    });
  };

  const handleRestartEngine = (engineName) => {
    setSelectedEngine(engineName);
    setShowRestartModal(true);
  };

  const confirmRestart = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8004/api/v1'
      await fetch(`${API_BASE_URL}/admin/engines/${selectedEngine}/restart`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Update engine status
      setDomainEngines(prev => 
        prev.map(e => e.name === selectedEngine ? { ...e, status: 'restarting' } : e)
      );
      
      setShowRestartModal(false);
      addLog(`Engine restart initiated: ${selectedEngine}`);
    } catch (error) {
      console.error('Failed to restart engine:', error);
    }
  };

  const addLog = (message) => {
    const newLog = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
      case 'active':
      case 'completed':
        return 'text-green-400';
      case 'restarting':
        return 'text-yellow-400';
      case 'stopped':
      case 'failed':
        return 'text-red-400';
      case 'queued':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getHealthColor = (health) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Tiannara Core</h1>
          <p className="text-gray-400">Internal Operations Dashboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={fetchAdminMetrics}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
            <span className="text-green-400 text-sm font-medium">● System Operational</span>
          </div>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total API Requests */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <span className={`flex items-center text-sm ${metrics.requestsChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {metrics.requestsChange >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {Math.abs(metrics.requestsChange)}%
            </span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{metrics.totalRequests.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Total API Requests</div>
        </div>

        {/* Active Users */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className={`flex items-center text-sm ${metrics.usersChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {metrics.usersChange >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {Math.abs(metrics.usersChange)}%
            </span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{metrics.activeUsers.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Active Users</div>
        </div>

        {/* Avg Latency */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-500/20">
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
            <span className={`flex items-center text-sm ${metrics.latencyChange <= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {metrics.latencyChange <= 0 ? <ArrowDownRight className="w-4 h-4 mr-1" /> : <ArrowUpRight className="w-4 h-4 mr-1" />}
              {Math.abs(metrics.latencyChange)}%
            </span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{metrics.avgLatency}ms</div>
          <div className="text-gray-400 text-sm">Avg Latency</div>
        </div>

        {/* Success Rate */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-500/20">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm">+0.2%</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{metrics.successRate}%</div>
          <div className="text-gray-400 text-sm">Success Rate</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain Engines Status */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Domain Engine Status</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">All Systems</span>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
          </div>

          <div className="space-y-4">
            {domainEngines.map((engine) => (
              <div key={engine.name} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${engine.status === 'running' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                    <span className="text-white font-semibold">{engine.name}</span>
                    <span className="text-gray-400 text-sm">{engine.version}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${getStatusColor(engine.status)}`}>{engine.status}</span>
                    <button
                      onClick={() => handleRestartEngine(engine.name)}
                      className="px-3 py-1 text-xs bg-white/10 rounded hover:bg-white/20 transition-colors"
                    >
                      Restart
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-400">
                    Requests: <span className="text-white font-medium">{engine.requests.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Health:</span>
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getHealthColor(engine.health)} transition-all`}
                        style={{ width: `${engine.health}%` }}
                      />
                    </div>
                    <span className="text-white font-medium">{engine.health}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health Monitor */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">System Health</h2>
          
          <div className="space-y-6">
            {/* CPU Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">CPU Usage</span>
                </div>
                <span className="text-white font-semibold">{systemHealth.cpu}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${systemHealth.cpu > 80 ? 'bg-red-500' : systemHealth.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${systemHealth.cpu}%` }}
                />
              </div>
            </div>

            {/* Memory Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Memory</span>
                </div>
                <span className="text-white font-semibold">{systemHealth.memory}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${systemHealth.memory > 80 ? 'bg-red-500' : systemHealth.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${systemHealth.memory}%` }}
                />
              </div>
            </div>

            {/* Disk Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Server className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-300">Disk</span>
                </div>
                <span className="text-white font-semibold">{systemHealth.disk}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${systemHealth.disk > 80 ? 'bg-red-500' : systemHealth.disk > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${systemHealth.disk}%` }}
                />
              </div>
            </div>

            {/* Network */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Network I/O</span>
                </div>
                <span className="text-white font-semibold">{systemHealth.network}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${systemHealth.network > 80 ? 'bg-red-500' : systemHealth.network > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${systemHealth.network}%` }}
                />
              </div>
            </div>

            {/* Uptime */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Uptime</span>
                <span className="text-green-400 font-semibold">{metrics.uptime}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orchestration Flows & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Orchestration Flows */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Orchestration Flows</h2>
            <GitBranch className="w-6 h-6 text-purple-400" />
          </div>

          <div className="space-y-3">
            {orchestrationFlows.map((flow) => (
              <div key={flow.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Layers className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">{flow.name}</div>
                      <div className="text-gray-400 text-sm">Duration: {flow.duration}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    flow.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    flow.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                    flow.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {flow.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Logs */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Logs</h2>
            <Terminal className="w-6 h-6 text-purple-400" />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No recent logs</div>
            ) : (
              logs.slice(0, 20).map((log, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/30 font-mono text-sm">
                  <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                  <span className={`ml-2 ${
                    log.level === 'ERROR' ? 'text-red-400' :
                    log.level === 'WARN' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {log.level}
                  </span>
                  <span className="ml-2 text-gray-300">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Restart Modal */}
      {showRestartModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Restart Engine</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to restart the <span className="text-white font-semibold">{selectedEngine}</span> engine? 
              This will temporarily interrupt service.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRestartModal(false)}
                className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmRestart}
                className="flex-1 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-white"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
