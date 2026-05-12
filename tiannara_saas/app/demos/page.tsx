import Link from 'next/link'
import { Brain, Play, Zap, TrendingUp, Code, CheckCircle } from 'lucide-react'

const demos = [
  {
    id: 'prediction',
    title: 'Market Prediction',
    description: 'Predict market trends using historical data and causal analysis',
    icon: TrendingUp,
    color: 'from-purple-500 to-cyan-500',
    difficulty: 'Beginner',
    duration: '5 min',
    features: ['Time series forecasting', 'Pattern recognition', 'Confidence scoring'],
  },
  {
    id: 'nlp-analysis',
    title: 'Sentiment Analysis',
    description: 'Analyze text sentiment and extract key insights from documents',
    icon: Brain,
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Beginner',
    duration: '3 min',
    features: ['Sentiment scoring', 'Entity extraction', 'Topic modeling'],
  },
  {
    id: 'causal-inference',
    title: 'Causal Inference',
    description: 'Identify causal relationships in complex datasets',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    difficulty: 'Intermediate',
    duration: '8 min',
    features: ['Causal graph construction', 'Intervention analysis', 'Counterfactual reasoning'],
  },
  {
    id: 'algorithm-classification',
    title: 'Data Classification',
    description: 'Classify data points using advanced algorithmic approaches',
    icon: Code,
    color: 'from-blue-500 to-indigo-500',
    difficulty: 'Intermediate',
    duration: '6 min',
    features: ['Multi-class classification', 'Feature engineering', 'Model selection'],
  },
  {
    id: 'logic-reasoning',
    title: 'Logical Reasoning',
    description: 'Solve complex logical problems with step-by-step reasoning',
    icon: CheckCircle,
    color: 'from-pink-500 to-rose-500',
    difficulty: 'Advanced',
    duration: '10 min',
    features: ['Rule-based reasoning', 'Constraint satisfaction', 'Proof generation'],
  },
]

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Tiannara</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="text-slate-400 hover:text-white transition-colors">Docs</Link>
            <Link href="/login" className="text-slate-400 hover:text-white transition-colors">Sign In</Link>
            <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Try Tiannara{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Interactive Demos
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Experience the power of Tiannara Core with hands-on demos. No signup required for basic trials.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No credit card needed</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Instant access</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Real AI results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Cards */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo) => (
              <div
                key={demo.id}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${demo.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <demo.icon className="w-7 h-7 text-white" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white">{demo.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    demo.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    demo.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {demo.difficulty}
                  </span>
                </div>

                <p className="text-slate-400 mb-4">{demo.description}</p>

                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Play className="w-4 h-4" />
                  <span>{demo.duration}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {demo.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-slate-800 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Try Demo
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to build with Tiannara?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Sign up today and get 5,000 free API requests to start building your AI-powered applications.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
            >
              Start Free Trial
              <Zap className="w-5 h-5" />
            </Link>
            <Link
              href="/docs"
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500">© 2026 Tiannara. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
