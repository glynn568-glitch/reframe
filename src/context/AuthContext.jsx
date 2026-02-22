import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

const FREE_LIMIT = 5

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const isPro = profile?.subscription_status === 'pro'

  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data)
    return data
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/tool' },
    })
    if (error) throw error
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  // Returns true if export is allowed, false if limit hit
  async function tryExport() {
    if (!user || !profile) return false
    if (isPro) return true

    const today = new Date().toISOString().split('T')[0]
    const isNewDay = profile.last_export_date !== today

    const currentCount = isNewDay ? 0 : (profile.daily_exports || 0)
    if (currentCount >= FREE_LIMIT) return false

    const newCount = currentCount + 1
    const { error } = await supabase
      .from('profiles')
      .update({ daily_exports: newCount, last_export_date: today })
      .eq('id', user.id)

    if (error) return false

    setProfile(prev => ({ ...prev, daily_exports: newCount, last_export_date: today }))
    return true
  }

  function getDailyCount() {
    if (!profile) return 0
    const today = new Date().toISOString().split('T')[0]
    if (profile.last_export_date !== today) return 0
    return profile.daily_exports || 0
  }

  const value = {
    user,
    profile,
    isPro,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    tryExport,
    getDailyCount,
    FREE_LIMIT,
    fetchProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
