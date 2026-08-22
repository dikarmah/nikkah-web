"use client"
import { useState } from "react"

export default function Inscription() {
  const [email, setEmail] = useState("")
  const [ok, setOk] = useState(false)
  const [erreur, setErreur] = useState("")

  const handlePayer = () => {
    // 1. Si vide -> on bloque
    if (!email.trim()) {
      setErreur("Entre ton email ou ton numéro WhatsApp d'abord")
      setOk(false)
      return
    }
    // 2. Si pas de @ et pas assez long pour un numéro -> on bloque
    if (!email.includes("@") && email.trim().length < 8) {
      setErreur("Email invalide - ajoute un @ ou un numéro complet")
      setOk(false)
      return
    }

    // 3. Tout est bon -> on affiche le message
    setErreur("")
    setOk(true)
  }

  return (
    <main className="min-h-screen bg-[#FFFBE8] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Inscription NIKKAH</h1>
        <p className="text-center text-sm mb-6">Paiement Wave / Orange Money - 5000F</p>
        
        <input 
          type="text" 
          placeholder="Email ou numéro WhatsApp"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-2"
        />

        {erreur && <p className="text-red-600 text-sm text-center mb-2">{erreur}</p>}

        <button onClick={handlePayer} className="w-full bg-[#FCD34D] font-bold py-3 rounded-full">
          Payer 5000F et commencer
        </button>

        {ok && (
          <p className="mt-4 bg-green-100 text-green-800 font-bold p-4 rounded-xl text-center border-2 border-green-500">
            Mabrouk ! Compte créé pour {email} ! ✅
          </p>
        )}

        <a href="/" className="block text-center mt-4 text-sm underline">Retour accueil</a>
      </div>
    </main>
  )
}