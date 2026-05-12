'use client'

import { useState } from 'react'
import { CreditCard, Check, Zap, Building2, ArrowRight } from 'lucide-react'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3'

const plans = [
  {
    name: 'Starter',
    price: 49,
    period: '/month',
    description: 'Perfect for experimentation and small projects',
    features: [
      '5,000 API requests/month',
      'All 5 domain engines',
      'Basic analytics',
      'Community support',
      '1 API key',
    ],
    current: true,
  },
  {
    name: 'Professional',
    price: 199,
    period: '/month',
    description: 'For growing applications and production workloads',
    features: [
      '50,000 API requests/month',
      'All 5 domain engines',
      'Advanced analytics & insights',
      'Priority email support',
      '5 API keys',
      'Custom workflows',
      'Webhook notifications',
    ],
    current: false,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: null,
    period: '',
    description: 'Contact sales for custom pricing',
    features: [
      'Unlimited API access',
      'Dedicated infrastructure',
      'Custom AI workflow deployment',
      '24/7 priority support',
      'Private deployment options',
      'Compliance tooling',
    ],
    current: false,
  },
]

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const currentUser = {
    name: 'John Doe',
    email: 'john@example.com',
    currentPlan: 'Starter',
    nextBillingDate: 'May 15, 2026',
    paymentMethod: '•••• 4242'
  }

  // Flutterwave configuration
  const fwConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-SANDBOXDEMO-X',
    tx_ref: `tiannara_${Date.now()}`,
    amount: selectedPlan !== null ? plans[selectedPlan].price : 0.01, // Minimum amount to avoid null
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: currentUser.email,
      phone_number: '',
      name: currentUser.name,
    },
    customizations: {
      title: 'Tiannara SaaS Subscription',
      description: `Upgrade to ${selectedPlan !== null ? plans[selectedPlan].name : ''} Plan`,
      logo: 'https://your-logo-url.png',
    },
    callback: (response: any) => {
      closePaymentModal()
      // TODO: Handle successful payment - update subscription in backend
      alert('Payment successful! Your plan has been upgraded.')
    },
    onClose: () => {
      // Payment modal closed
    },
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
        <p className="text-slate-400">Manage your subscription and payment methods</p>
      </div>

      {/* Current Subscription */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Current Plan</h2>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-purple-400">{currentUser.currentPlan}</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">Active</span>
            </div>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            Upgrade Plan
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
          <div>
            <p className="text-sm text-slate-400 mb-1">Next billing date</p>
            <p className="text-white font-medium">{currentUser.nextBillingDate}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Amount</p>
            <p className="text-white font-medium">$49.00/month</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Payment method</p>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-400" />
              <p className="text-white font-medium">{currentUser.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <h2 className="text-2xl font-bold text-white mb-6">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative bg-slate-900/50 border ${
              plan.popular ? 'border-purple-500' : 'border-slate-800'
            } rounded-xl p-6`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                {plan.price ? (
                  <>
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-400">{plan.period}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-white">Contact Sales</span>
                )}
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            {plan.current ? (
              <button
                disabled
                className="w-full bg-slate-800 text-slate-400 px-4 py-3 rounded-xl font-semibold cursor-not-allowed"
              >
                Current Plan
              </button>
            ) : plan.price ? (
              <button
                onClick={() => {
                  setSelectedPlan(index)
                  setShowUpgradeModal(true)
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
              >
                Upgrade to {plan.name}
              </button>
            ) : (
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors">
                Contact Sales
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Payment History */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Payment History</h2>
        <div className="space-y-4">
          {[
            { date: 'Apr 15, 2026', amount: '$49.00', status: 'Paid', invoice: '#INV-2026-004' },
            { date: 'Mar 15, 2026', amount: '$49.00', status: 'Paid', invoice: '#INV-2026-003' },
            { date: 'Feb 15, 2026', amount: '$49.00', status: 'Paid', invoice: '#INV-2026-002' },
          ].map((payment, idx) => (
            <div key={idx} className="flex items-center justify-between py-4 border-b border-slate-800 last:border-0">
              <div>
                <p className="text-white font-medium">{payment.invoice}</p>
                <p className="text-sm text-slate-400">{payment.date}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-white font-medium">{payment.amount}</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  {payment.status}
                </span>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Modal with Flutterwave */}
      {showUpgradeModal && selectedPlan !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">Upgrade to {plans[selectedPlan].name}</h2>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Plan</span>
                <span className="text-white font-semibold">{plans[selectedPlan].name}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Price</span>
                <span className="text-white font-semibold">${plans[selectedPlan].price}/month</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-400">Total today</span>
                <span className="text-2xl font-bold text-purple-400">${plans[selectedPlan].price}</span>
              </div>
            </div>

            <div className="space-y-3">
              <FlutterWaveButton {...fwConfig}>
                <div className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Pay with Flutterwave
                </div>
              </FlutterWaveButton>
              
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              Secure payment powered by Flutterwave. You can cancel anytime.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
