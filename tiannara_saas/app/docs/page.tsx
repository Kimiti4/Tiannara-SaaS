import Link from 'next/link'
import { Brain, Book, Code, Zap } from 'lucide-react'

export default function Docs() {
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
            <Link href="/login" className="text-slate-400 hover:text-white transition-colors">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Getting Started</h3>
                <ul className="space-y-2">
                  <li><a href="#introduction" className="block text-slate-300 hover:text-white transition-colors">Introduction</a></li>
                  <li><a href="#authentication" className="block text-slate-300 hover:text-white transition-colors">Authentication</a></li>
                  <li><a href="#quickstart" className="block text-slate-300 hover:text-white transition-colors">Quick Start</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">API Reference</h3>
                <ul className="space-y-2">
                  <li><a href="#algorithm" className="block text-slate-300 hover:text-white transition-colors">Algorithm Engine</a></li>
                  <li><a href="#logic" className="block text-slate-300 hover:text-white transition-colors">Logic Engine</a></li>
                  <li><a href="#nlp" className="block text-slate-300 hover:text-white transition-colors">NLP Engine</a></li>
                  <li><a href="#causal" className="block text-slate-300 hover:text-white transition-colors">Causal Engine</a></li>
                  <li><a href="#prediction" className="block text-slate-300 hover:text-white transition-colors">Prediction Engine</a></li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-12">
            {/* Introduction */}
            <section id="introduction">
              <h1 className="text-4xl font-bold text-white mb-4">API Documentation</h1>
              <p className="text-lg text-slate-400 mb-6">
                Welcome to the Tiannara Core API. Build intelligent applications with our five specialized domain engines.
              </p>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Book className="w-5 h-5 text-purple-400" />
                  Base URL
                </h3>
                <code className="text-sm text-green-400 bg-slate-950 px-3 py-2 rounded-lg block">
                  https://api.tiannara.ai/v1
                </code>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication">
              <h2 className="text-2xl font-bold text-white mb-4">Authentication</h2>
              <p className="text-slate-400 mb-4">
                All API requests require authentication using an API key. Include your key in the Authorization header:
              </p>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <pre className="text-sm text-slate-300 overflow-x-auto">
                  <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
                </pre>
              </div>
            </section>

            {/* Quick Start */}
            <section id="quickstart">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
              <p className="text-slate-400 mb-4">Make your first API call in minutes:</p>
              
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5 text-cyan-400" />
                  Python Example
                </h3>
                <pre className="text-sm text-slate-300 overflow-x-auto">
                  <code>{`import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.post(
    "https://api.tiannara.ai/v1/predict",
    headers=headers,
    json={"data": [1, 2, 3, 4, 5]}
)

print(response.json())`}</code>
                </pre>
              </div>
            </section>

            {/* Algorithm Engine */}
            <section id="algorithm">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-purple-400" />
                Algorithm Engine
              </h2>
              <p className="text-slate-400 mb-4">
                Pattern recognition, anomaly detection, and mathematical optimization.
              </p>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-300 mb-2">POST /v1/algorithm</h3>
                <pre className="text-sm text-slate-300 overflow-x-auto">
                  <code>{`{
  "operation": "pattern_recognition",
  "data": [1, 2, 3, 4, 5]
}`}</code>
                </pre>
              </div>
            </section>

            {/* More engines would follow... */}
            <section className="pt-8 border-t border-slate-800">
              <p className="text-slate-400 text-center">
                Full documentation for all 5 engines coming soon.{' '}
                <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Sign up to get early access
                </Link>
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
