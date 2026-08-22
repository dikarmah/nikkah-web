"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Inscription(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ok, setOk] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async () => {
    if(!email.includes("@") || password.length < 6){ setError("Email invalide ou mot de passe < 6 caractères"); return }
    const { error } = await supabase.auth.signUp({ email, password })
    if(error) setError(error.message)
    else setOk(true)
  }

  return (
    <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-">
        <h1 className="text-3xl font-bold text-center">Inscription</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">C'est rapide et facile - 5000F</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-3 rounded-lg mb-3"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Nouveau mot de passe (min 6)" className="w-full border p-3 rounded-lg mb-3"/>
        {error && <p className="bg-red-100 text-red-600 p-2 rounded text-sm mb-3">{error}</p>}
        {ok && <p className="bg-green-100 text-green-700 p-3 rounded font-bold text-center mb-3">Mabrouk! Vérifie ton email pour confirmer ✅</p>}
        <button onClick={handleSignup} className="w-full bg-[#FCD34D] font-bold py-3 rounded-lg">S'inscrire - 5000F</button>
        <a href="/connexion" className="block text-center text-sm text-blue-600 mt-4">Déjà un compte? Se connecter</a>
      </div>
    </main>
  )
}