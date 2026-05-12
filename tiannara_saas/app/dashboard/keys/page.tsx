'use client'

import { useState } from 'react'
import { Key, Copy, Trash2, Plus, Eye, EyeOff, CheckCircle } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string
  requests: number
  status: 'active' | 'revoked'
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([
    {
      id: 'key_001',
      name: 'Production Key',
      key: 'tk_live_abc123def456ghi789jkl012mno345pqr',
      createdAt: '2 days ago',
      lastUsed: '5 minutes ago',
      requests: 12847,
      status: 'active'
    },
    {
      id: 'key_002',
      name: 'Development Key',
      key: 'tk_test_xyz789uvw456rst123opq890lmn567ijk',
      createdAt: '1 week ago',
      lastUsed: '2 hours ago',
      requests: 3421,
      status: 'active'
    }
  ])

  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return
    
    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: `tk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      createdAt: 'Just now',
      lastUsed: 'Never',
      requests: 0,
      status: 'active'
    }
    
    setKeys([newKey, ...keys])
    setNewKeyName('')
    setShowNewKeyModal(false)
  }

  const handleRevokeKey = (id: string) => {
    setKeys(keys.map(key => 
      key.id === id ? { ...key, status: 'revoked' as const } : key
    ))
  }

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisibleKeys(newVisible)
  }

  const copyToClipboard = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const maskKey = (key: string) => {
    return `${key.substring(0, 8)}••••••••••••••••••••${key.substring(key.length - 4)}`
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">API Keys</h1>
          <p className="text-slate-400">Manage your API keys and access credentials</p>
        </div>
        <button
          onClick={() => setShowNewKeyModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Key
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Key className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-blue-400 font-semibold mb-1">Keep your keys secure</h3>
            <p className="text-sm text-slate-400">
              Never share your API keys publicly. If a key is compromised, revoke it immediately and create a new one.
            </p>
          </div>
        </div>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {keys.map((apiKey) => (
          <div
            key={apiKey.id}
            className={`bg-slate-900/50 border ${apiKey.status === 'revoked' ? 'border-red-500/30' : 'border-slate-800'} rounded-xl p-6`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apiKey.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {apiKey.status === 'active' ? 'Active' : 'Revoked'}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <span>Created {apiKey.createdAt}</span>
                  <span>Last used {apiKey.lastUsed}</span>
                  <span>{apiKey.requests.toLocaleString()} requests</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title={visibleKeys.has(apiKey.id) ? 'Hide key' : 'Show key'}
                >
                  {visibleKeys.has(apiKey.id) ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Copy key"
                >
                  {copiedId === apiKey.id ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
                {apiKey.status === 'active' && (
                  <button
                    onClick={() => handleRevokeKey(apiKey.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Revoke key"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Key Display */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm">
              <code className={visibleKeys.has(apiKey.id) ? 'text-green-400' : 'text-slate-500'}>
                {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
              </code>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {keys.length === 0 && (
        <div className="text-center py-12">
          <Key className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No API keys yet</h3>
          <p className="text-slate-400 mb-6">Create your first API key to start using Tiannara Core</p>
          <button
            onClick={() => setShowNewKeyModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Your First Key
          </button>
        </div>
      )}

      {/* Create Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">Create New API Key</h2>
            <p className="text-slate-400 mb-6">Give your API key a descriptive name to help you identify it later.</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production App, Mobile App, Testing"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowNewKeyModal(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                disabled={!newKeyName.trim()}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-semibold transition-colors"
              >
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
