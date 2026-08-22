"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const MAX_ATTEMPTS = 3
const LOCK_TIME = 60 * 1000 // 1 minute

export default function Connexion() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [lockUntil, setLockUntil] = useState<number | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedAttempts = localStorage.getItem("nikkah_attempts")
    const savedLock = localStorage.getItem("nikkah_lockUntil")
    if (savedAttempts) setAttempts(parseInt(savedAttempts))
    if (savedLock) {
      const lock = parseInt(savedLock)
      if (lock > Date.now()) setLockUntil(lock)
      else { localStorage.removeItem("nikkah_lockUntil"); localStorage.removeItem("nikkah_attempts") }
    }
  }, [])

  useEffect(() => {
    if (!lockUntil) return
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockUntil - Date.now()) / 1000)
      if (remaining <= 0) { setLockUntil(null); setAttempts(0); setCountdown(0); localStorage.clear() }
      else setCountdown(remaining)
    }, 1000)
    return () => clearInterval(interval)
  }, [lockUntil])

  const handleLogin = async () => {
    if (lockUntil && lockUntil > Date.now()) return
    if (!email.trim() ||!password.trim()) { setError("Entre email et mot de passe"); return }

    setLoading(true); setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      localStorage.setItem("nikkah_attempts", newAttempts.toString())

      if (newAttempts >= MAX_ATTEMPTS) {
        const lock = Date.now() + LOCK_TIME
        setLockUntil(lock)
        localStorage.setItem("nikkah_lockUntil", lock.toString())
        setError(`3 essais ratés. Attends 1 minute.`)
      } else {
        setError(`Mot de passe incorrect. Il te reste ${MAX_ATTEMPTS - newAttempts} essais.`)
      }
    } else {
      localStorage.clear()
      window.location.href = "/dashboard"
    }
    setLoading(false)
  }

  const handleReset = async () => {
    if (!email) { setError("Entre ton email d'abord pour réinitialiser"); return }
    await supabase.auth.resetPasswordForEmail(email)
    setError("Lien de réinitialisation envoyé par email!")
  }

  const isLocked = lockUntil && lockUntil > Date.now()

  return (
    <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-">
        <h1 className="text-3xl font-bold text-center text-[#FBBF24] mb-1">NIKKAH</h1>
        <p className="text-center text-gray-600 mb-6">Se connecter pour continuer</p>

        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email ou numéro" className="w-full border p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mot de passe" className="w-full border p-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>

        {error && <p className={`text-sm text-center p-2 rounded mb-3 ${error.includes("envoyé")? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{error}</p>}
        {isLocked && <p className="text-center font-bold text-red-600 mb-3">Réessaie dans {countdown}s</p>}

        <button onClick={handleLogin} disabled={loading ||!!isLocked} className="w-full bg-[#FCD34D] hover:bg-[#FBBF24] disabled:bg-gray-300 font-bold py-3 rounded-lg">
          {loading? "..." : isLocked? `Bloqué ${countdown}s` : "Se connecter"}
        </button>

        <button onClick={handleReset} className="w-full text-sm text-blue-600 hover:underline mt-3">Mot de passe oublié?</button>
        <hr className="my-5"/>
        <a href="/inscription" className="block w-fit mx-auto bg-[#42B72A] hover:bg-[#36A420] text-white font-bold py-3 px-6 rounded-lg text-center">Créer un compte</a>
        <p className="text-xs text-center text-gray-500 mt-4">Tentatives : {attempts}/{MAX_ATTEMPTS}</p>
      </div>
    </main>
  )
}