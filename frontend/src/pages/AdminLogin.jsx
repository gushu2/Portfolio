import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, isAdmin } = useAuth()
  const navigate = useNavigate()

  if (isAdmin) { navigate('/admin'); return null }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.username, form.password)
      toast.success('Welcome back.')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem',
    background: '#0d0d0d', border: '1px solid #2a2a2a',
    color: '#f0ece4', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif',
    outline: 'none', transition: 'border-color 0.2s'
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="/gushu-logo.png" alt="GUSHU_BHAT" style={{ height: '80px', width: 'auto', objectFit: 'contain', margin: '0 auto 0.75rem', display: 'block' }} />
          <p style={{
            fontSize: '0.65rem', letterSpacing: '0.25em', color: '#5a5550',
            textTransform: 'uppercase', fontFamily: 'Inter, sans-serif'
          }}>Admin Access</p>
        </div>

        <div style={{ border: '1px solid #1a1a1a', padding: '2.5rem', background: '#0a0a0a' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Username */}
            <div style={{ position: 'relative' }}>
              <User size={15} color="#5a5550" style={{
                position: 'absolute', left: '1rem', top: '50%',
                transform: 'translateY(-50%)', pointerEvents: 'none'
              }} />
              <input
                type="text" placeholder="Username" required
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#c9a96e'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>

            {/* Password */}
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="#5a5550" style={{
                position: 'absolute', left: '1rem', top: '50%',
                transform: 'translateY(-50%)', pointerEvents: 'none'
              }} />
              <input
                type={showPass ? 'text' : 'password'} placeholder="Password" required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                style={{ ...inputStyle, paddingRight: '3rem' }}
                onFocus={e => e.target.style.borderColor = '#c9a96e'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'}
              />
              <button type="button" onClick={() => setShowPass(s => !s)}
                style={{
                  position: 'absolute', right: '1rem', top: '50%',
                  transform: 'translateY(-50%)', color: '#5a5550',
                  background: 'none', border: 'none', cursor: 'pointer'
                }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <button type="submit" disabled={loading}
              style={{
                padding: '0.9rem', background: loading ? '#2a2a2a' : '#c9a96e',
                color: '#000', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', fontWeight: 500,
                transition: 'background 0.3s', marginTop: '0.5rem'
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#e8c98a' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#c9a96e' }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontSize: '0.7rem', color: '#3a3530', fontFamily: 'Inter, sans-serif'
        }}>
          This area is restricted to authorized personnel only.
        </p>
      </motion.div>
    </div>
  )
}
