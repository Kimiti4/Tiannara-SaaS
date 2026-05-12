import { Activity, Zap, TrendingUp, Clock, Key, Brain, Cpu, MessageSquare, GitBranch, Calculator } from 'lucide-react'
import APIUsageSummaryWidget from '@/components/APIUsageSummaryWidget'

export default function DashboardOverview() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Monitor your API usage and manage your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="API Requests"
          value="12,847"
          change="+18.2%"
          trend="up"
          icon={Activity}
          color="purple"
        />
        <StatCard
          title="Success Rate"
          value="99.7%"
          change="+0.3%"
          trend="up"
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Avg Latency"
          value="142ms"
          change="-12ms"
          trend="down"
          icon={Clock}
          color="cyan"
        />
        <StatCard
          title="Active Keys"
          value="3"
          change=""
          trend="neutral"
          icon={Key}
          color="blue"
        />
      </div>

      {/* Usage Chart Placeholder */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Request Volume (Last 7 Days)</h3>
        <div className="h-64 flex items-center justify-center text-slate-500">
          Chart will be implemented with real data
        </div>
      </div>

      {/* AI-Generated Widget - API Usage Summary */}
      <APIUsageSummaryWidget />

      {/* Feature Tiles - Domain Engines */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Domain Engines</h2>
        <p className="text-sm text-slate-400 mb-6">Available engines for your Starter plan</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureTile
            name="Algorithm Engine"
            description="Pattern recognition and data classification"
            icon={Cpu}
            color="purple"
            available={true}
            tier="starter"
          />
          <FeatureTile
            name="Prediction Engine"
            description="Time series forecasting and trend analysis"
            icon={TrendingUp}
            color="cyan"
            available={true}
            tier="starter"
          />
          <FeatureTile
            name="NLP Engine"
            description="Text analysis and sentiment extraction"
            icon={MessageSquare}
            color="green"
            available={true}
            tier="starter"
          />
          <FeatureTile
            name="Causal Engine"
            description="Causal inference and relationship mapping"
            icon={GitBranch}
            color="orange"
            available={false}
            tier="professional"
          />
          <FeatureTile
            name="Logic Engine"
            description="Rule-based reasoning and problem solving"
            icon={Calculator}
            color="pink"
            available={false}
            tier="professional"
          />
          <FeatureTile
            name="Reverse Engineering"
            description="System analysis and behavior modeling"
            icon={Brain}
            color="red"
            available={false}
            tier="enterprise"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          title="Generate API Key"
          description="Create a new API key for your applications"
          icon={Key}
          href="/dashboard/keys"
        />
        <QuickActionCard
          title="View Documentation"
          description="Learn how to integrate Tiannara Core"
          icon={Zap}
          href="/docs"
        />
        <QuickActionCard
          title="Upgrade Plan"
          description="Increase your API request limits"
          icon={TrendingUp}
          href="/pricing"
        />
      </div>
    </div>
  )
}

function StatCard({ title, value, change, trend, icon: Icon, color }: any) {
  const colors = {
    purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/20',
    green: 'from-green-500/10 to-green-600/10 border-green-500/20',
    cyan: 'from-cyan-500/10 to-cyan-600/10 border-cyan-500/20',
    blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/20',
  }

  return (
    <div className={`bg-gradient-to-br ${colors[color as keyof typeof colors]} border rounded-xl p-6`}>
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-6 h-6 text-white opacity-80" />
        {change && (
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400'}`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  )
}

function QuickActionCard({ title, description, icon: Icon, href }: any) {
  return (
    <a
      href={href}
      className="block bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-purple-500/40 transition-colors group"
    >
      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </a>
  )
}

function FeatureTile({ name, description, icon: Icon, color, available, tier }: any) {
  const colors = {
    purple: 'from-purple-500 to-purple-600',
    cyan: 'from-cyan-500 to-cyan-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600',
    red: 'from-red-500 to-red-600',
  }

  return (
    <div className={`bg-slate-900/50 border ${available ? 'border-slate-800' : 'border-slate-800/50'} rounded-xl p-5 ${!available && 'opacity-60'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${colors[color as keyof typeof colors]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {!available && (
          <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded-full text-xs font-medium capitalize">
            {tier}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-white mb-1">{name}</h3>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      {available ? (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
          Available
        </span>
      ) : (
        <a href="/pricing" className="inline-flex items-center gap-1 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">
          Upgrade to unlock →
        </a>
      )}
    </div>
  )
}
