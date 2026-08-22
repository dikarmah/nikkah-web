"use client"
import { useState } from "react"

export default function Inscription() {
  const [email, setEmail] = useState("")
  const [ok, setOk] = useState(false)

  return (
    <main className="min-h-screen bg-[#FFFBE8] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Inscription NIKKAH</h1>
        <p className="text-center text-sm mb-6">Paiement Wave / Orange Money - 5000F</p>
        
        <input 
          type="email" 
          placeholder="Ton email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />
        <button 
          onClick={()=>setOk(true)}
          className="w-full bg-[#FCD34D] font-bold py-3 rounded-full"
        >
          Payer 5000F et commencer
        </button>
        {ok && <p className="mt-4 text-green-600 text-center">Compte créé pour {email} ! (Test Supabase à connecter)</p>}
        <a href="/" className="block text-center mt-4 text-sm underline">Retour accueil</a>
      </div>
    </main>
  )
}