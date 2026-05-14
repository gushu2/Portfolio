import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#000', color: '#c9a96e',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', letterSpacing: '0.2em'
      }}>
        LOADING...
      </div>
    )
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />
}
