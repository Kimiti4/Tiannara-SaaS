import React, { useState } from 'react';
import { 
  User, Bell, Shield, Palette, Key, CreditCard, 
  Save, Trash2, Edit2, Check, X, AlertTriangle,
  Mail, Globe, Lock, Eye, EyeOff, Smartphone
} from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    usage: true,
    billing: true,
    security: true
  });

  const [profile, setProfile] = useState({
    name: 'Test User',
    email: 'test@example.com',
    company: 'My Company',
    role: 'Developer',
    tier: 'starter'
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'billing', label: 'Billing & Tier', icon: CreditCard }
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Profile Avatar */}
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-bold text-white">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
            <p className="text-gray-400">{profile.email}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
              {profile.tier.toUpperCase()} Plan
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
        <h3 className="text-xl font-semibold text-white">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input 
              type="text" 
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
            <input 
              type="text" 
              value={profile.company}
              onChange={(e) => setProfile({...profile, company: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
            <select 
              value={profile.role}
              onChange={(e) => setProfile({...profile, role: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
            >
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Security Settings</h2>

      {/* Password Change */}
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
          <Lock className="w-5 h-5 text-purple-400" />
          <span>Change Password</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Enter current password"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input 
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input 
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg transition-all">
          Update Password
        </button>
      </div>

      {/* API Keys */}
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
          <Key className="w-5 h-5 text-purple-400" />
          <span>API Keys</span>
        </h3>
        
        <div className="space-y-4">
          {[
            { name: 'Production Key', key: 'tk_prod_••••••••abc123', created: '2026-05-01', active: true },
            { name: 'Development Key', key: 'tk_dev_••••••••xyz789', created: '2026-05-05', active: true }
          ].map((apiKey, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{apiKey.name}</div>
                <code className="text-gray-400 text-sm">{apiKey.key}</code>
                <div className="text-gray-500 text-xs mt-1">Created {apiKey.created}</div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-300 text-sm">
                  Copy
                </button>
                <button className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-400 border border-red-500/30 text-sm flex items-center space-x-1">
                  <Trash2 className="w-4 h-4" />
                  <span>Revoke</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all">
          + Generate New API Key
        </button>
      </div>

      {/* Two-Factor Auth */}
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>Two-Factor Authentication</span>
            </h3>
            <p className="text-gray-400 mt-2">Add an extra layer of security to your account</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:shadow-lg transition-all">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Notification Preferences</h2>

      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
        {[
          { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email', icon: Mail },
          { id: 'push', label: 'Push Notifications', desc: 'Browser push notifications', icon: Smartphone },
          { id: 'usage', label: 'Usage Alerts', desc: 'Notify when approaching API limits', icon: BarChart3 },
          { id: 'billing', label: 'Billing Updates', desc: 'Payment confirmations and invoices', icon: CreditCard },
          { id: 'security', label: 'Security Alerts', desc: 'Login attempts and security events', icon: Shield }
        ].map((notif) => (
          <div key={notif.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center space-x-4">
              <notif.icon className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-white font-medium">{notif.label}</div>
                <div className="text-gray-400 text-sm">{notif.desc}</div>
              </div>
            </div>
            <button 
              onClick={() => setNotifications({...notifications, [notif.id]: !notifications[notif.id]})}
              className={`w-14 h-8 rounded-full transition-all relative ${
                notifications[notif.id] ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                notifications[notif.id] ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Appearance Settings</h2>

      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Dark', 'Light', 'System'].map((theme) => (
              <button 
                key={theme}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500 transition-all text-center"
              >
                <div className="text-white font-medium mb-2">{theme}</div>
                <div className="text-gray-400 text-sm">Preview</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Language</h3>
          <select className="w-full md:w-1/2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Accessibility</h3>
          <div className="space-y-3">
            {[
              { label: 'High contrast mode', enabled: false },
              { label: 'Reduced motion', enabled: false },
              { label: 'Screen reader support', enabled: true }
            ].map((option, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <span className="text-white">{option.label}</span>
                <button className={`w-14 h-8 rounded-full transition-all relative ${
                  option.enabled ? 'bg-purple-600' : 'bg-gray-600'
                }`}>
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                    option.enabled ? 'left-7' : 'left-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Billing & Subscription</h2>

      {/* Current Plan */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Starter Plan</h3>
            <p className="text-gray-300">$49/month • Renews on June 11, 2026</p>
          </div>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all">
            Manage Subscription
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-gray-400 text-sm mb-1">Current Tier</div>
            <div className="text-2xl font-bold text-white">Starter</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-gray-400 text-sm mb-1">Monthly Limit</div>
            <div className="text-2xl font-bold text-white">5K req/mo</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-gray-400 text-sm mb-1">Next Billing Date</div>
            <div className="text-2xl font-bold text-white">Jun 11</div>
          </div>
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Upgrade Plan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500">
            <div className="text-sm text-purple-400 font-semibold mb-2">MOST POPULAR</div>
            <h4 className="text-xl font-bold text-white mb-2">Professional</h4>
            <p className="text-gray-400 mb-4">$199/month</p>
            <ul className="space-y-2 mb-6 text-gray-300 text-sm">
              <li>✓ 50,000 API requests/month</li>
              <li>✓ Priority processing</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Team collaboration</li>
              <li>✓ 99.5% SLA guarantee</li>
            </ul>
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg transition-all">
              Upgrade to Professional
            </button>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-xl font-bold text-white mb-2">Enterprise</h4>
            <p className="text-gray-400 mb-4">Contact Sales</p>
            <ul className="space-y-2 mb-6 text-gray-300 text-sm">
              <li>✓ Unlimited API access</li>
              <li>✓ Dedicated infrastructure</li>
              <li>✓ Custom workflows</li>
              <li>✓ 24/7 support</li>
              <li>✓ Compliance tooling</li>
            </ul>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Payment Method</h3>
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

      {/* Billing History */}
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: 'May 11, 2026', amount: '$49.00', status: 'Paid', invoice: 'INV-2026-001' },
            { date: 'Apr 11, 2026', amount: '$49.00', status: 'Paid', invoice: 'INV-2026-002' },
            { date: 'Mar 11, 2026', amount: '$49.00', status: 'Paid', invoice: 'INV-2026-003' }
          ].map((invoice, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div>
                <div className="text-white font-medium">{invoice.invoice}</div>
                <div className="text-gray-400 text-sm">{invoice.date}</div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-green-400 text-sm">{invoice.status}</span>
                <span className="text-white font-semibold">{invoice.amount}</span>
                <button className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-300 text-sm">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
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
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Settings</h1>
        
        {/* Settings Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {activeSection === 'profile' && renderProfile()}
          {activeSection === 'security' && renderSecurity()}
          {activeSection === 'notifications' && renderNotifications()}
          {activeSection === 'appearance' && renderAppearance()}
          {activeSection === 'billing' && renderBilling()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;