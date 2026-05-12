'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOTP = async () => {
    // Validate form first
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    
    setError('')
    setIsLoading(true)
    
    try {
      // TODO: Call backend to send OTP
      // await apiClient.sendOTP(email)
      
      // Simulate OTP sent
      setOtpSent(true)
      setStep('otp')
      startCountdown()
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const startCountdown = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleResendOTP = async () => {
    if (countdown > 0) return
    
    setIsLoading(true)
    try {
      // TODO: Call backend to resend OTP
      startCountdown()
    } catch (err) {
      setOtpError('Failed to resend OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('')
    
    if (otpCode.length !== 6) {
      setOtpError('Please enter the complete 6-digit code')
      return
    }
    
    setOtpError('')
    setIsLoading(true)
    
    try {
      // TODO: Verify OTP with backend
      // await apiClient.verifyOTP(email, otpCode)
      
      // If OTP is valid, proceed with signup
      await signup(name, email, password)
    } catch (err) {
      setOtpError('Invalid OTP code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendOTP()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Tiannara</span>
          </Link>
        </div>

        {/* Signup Form */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          {step === 'form' ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
              <p className="text-slate-400 mb-8">Start building with Tiannara Core today</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="••••••••"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Must be at least 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="••••••••"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="w-4 h-4 mt-1 rounded border-slate-700 bg-slate-950 text-purple-600 focus:ring-purple-500" required />
                  <span className="text-sm text-slate-400">
                    I agree to the{' '}
                    <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</Link>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </>
          ) : (
            /* OTP Verification Step */
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
                <p className="text-slate-400">
                  We sent a 6-digit code to <span className="text-white font-medium">{email}</span>
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4 text-center">
                    Enter verification code
                  </label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        className="w-12 h-14 bg-slate-950 border border-slate-800 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:border-purple-500 transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && index > 0) {
                            const prevInput = document.getElementById(`otp-${index - 1}`)
                            prevInput?.focus()
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                {otpError && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                    <p className="text-sm text-red-400 text-center">{otpError}</p>
                  </div>
                )}

                <button
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.join('').length !== 6}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Create Account'}
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>

                <div className="text-center">
                  <p className="text-sm text-slate-400">
                    Didn't receive the code?{' '}
                    {countdown > 0 ? (
                      <span className="text-slate-500">Resend in {countdown}s</span>
                    ) : (
                      <button
                        onClick={handleResendOTP}
                        disabled={isLoading}
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors disabled:opacity-50"
                      >
                        Resend Code
                      </button>
                    )}
                  </p>
                </div>

                <button
                  onClick={() => setStep('form')}
                  className="w-full text-slate-400 hover:text-white text-sm transition-colors"
                >
                  ← Back to signup
                </button>
              </div>
            </>
          )}

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-slate-500 hover:text-white transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
