import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      axios.post('/api/auth/verify', {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.valid) setIsAdmin(true)
        else localStorage.removeItem('adminToken')
      }).catch(() => localStorage.removeItem('adminToken'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    const res = await axios.post('/api/auth/login', { username, password })
    localStorage.setItem('adminToken', res.data.token)
    setIsAdmin(true)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setIsAdmin(false)
  }

  const getToken = () => localStorage.getItem('adminToken')

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
