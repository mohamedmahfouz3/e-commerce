import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string
}

interface AuthState {
  user: User | null
  loading: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
  })
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/accessToken')
        const data = await res.json()

        if (data.accessToken) {
          const userRes = await fetch('/api/auth/user', {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          })
          const userData = await userRes.json()
          setState({ user: userData, loading: false })
        } else {
          setState({ user: null, loading: false })
        }
      } catch (error) {
        setState({ user: null, loading: false })
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.err) {
        toast.error(data.err)
        return false
      }

      setState({ user: data.user, loading: false })
      toast.success('Login successful!')
      router.push('/')
      return true
    } catch (error) {
      toast.error('An error occurred during login')
      return false
    }
  }

  const logout = () => {
    Cookies.remove('refreshtoken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    setState({ user: null, loading: false })
    toast.success('Logged out successfully!')
    router.push('/')
  }

  return {
    user: state.user,
    loading: state.loading,
    login,
    logout,
  }
} 