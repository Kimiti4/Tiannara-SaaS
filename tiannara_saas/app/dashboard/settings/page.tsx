'use client'

import { useState } from 'react'
import { User, Mail, Bell, Shield, Globe, Save, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Inc',
    role: 'Developer',
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    usageWarnings: true,
    securityAlerts: true,
    productUpdates: false,
  })

  const [saved, setSaved] = useState(false)

  const handleSaveProfile = () => {
    // TODO: Implement actual profile update
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Profile Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Role
                  </label>
                  <select
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option>Developer</option>
                    <option>Data Scientist</option>
                    <option>Researcher</option>
                    <option>Manager</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>

              {saved && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-sm text-green-400">✓ Profile updated successfully</p>
                </div>
              )}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-800">
                <div>
                  <h3 className="text-white font-medium mb-1">Email Alerts</h3>
                  <p className="text-sm text-slate-400">Receive important alerts via email</p>
                </div>
                <ToggleSwitch
                  checked={notifications.emailAlerts}
                  onChange={() => setNotifications({ ...notifications, emailAlerts: !notifications.emailAlerts })}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-800">
                <div>
                  <h3 className="text-white font-medium mb-1">Usage Warnings</h3>
                  <p className="text-sm text-slate-400">Get notified when approaching API limits</p>
                </div>
                <ToggleSwitch
                  checked={notifications.usageWarnings}
                  onChange={() => setNotifications({ ...notifications, usageWarnings: !notifications.usageWarnings })}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-800">
                <div>
                  <h3 className="text-white font-medium mb-1">Security Alerts</h3>
                  <p className="text-sm text-slate-400">Important security notifications</p>
                </div>
                <ToggleSwitch
                  checked={notifications.securityAlerts}
                  onChange={() => setNotifications({ ...notifications, securityAlerts: !notifications.securityAlerts })}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="text-white font-medium mb-1">Product Updates</h3>
                  <p className="text-sm text-slate-400">News about new features and improvements</p>
                </div>
                <ToggleSwitch
                  checked={notifications.productUpdates}
                  onChange={() => setNotifications({ ...notifications, productUpdates: !notifications.productUpdates })}
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white">Security</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-slate-950 border border-slate-800 hover:border-purple-500 rounded-xl px-6 py-4 text-left transition-colors">
                <h3 className="text-white font-medium mb-1">Change Password</h3>
                <p className="text-sm text-slate-400">Update your account password</p>
              </button>

              <button className="w-full bg-slate-950 border border-slate-800 hover:border-purple-500 rounded-xl px-6 py-4 text-left transition-colors">
                <h3 className="text-white font-medium mb-1">Two-Factor Authentication</h3>
                <p className="text-sm text-slate-400">Add an extra layer of security</p>
              </button>

              <button className="w-full bg-slate-950 border border-slate-800 hover:border-purple-500 rounded-xl px-6 py-4 text-left transition-colors">
                <h3 className="text-white font-medium mb-1">Active Sessions</h3>
                <p className="text-sm text-slate-400">View and manage active login sessions</p>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Info */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Account</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-400 mb-1">Member since</p>
                <p className="text-white">April 2026</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Current plan</p>
                <p className="text-purple-400 font-medium">Starter</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">API keys</p>
                <p className="text-white">2 active</p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/5 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trash2 className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl font-semibold transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? 'bg-purple-600' : 'bg-slate-700'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
