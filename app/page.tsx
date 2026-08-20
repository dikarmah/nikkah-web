"use client";
import { useState, useEffect } from "react";
export default function Home() {
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [c, setC] = useState({ m: 0, mar: 0 });
  useEffect(() => {
    let i=0; const it=setInterval(()=>{i++; if(i<=60) setC({m:i*1000, mar:i*39}); else clearInterval(it);}, 40);
    return ()=>clearInterval(it);
  }, []);
  return (
    <main className="min-h-screen bg-[#FFFBEB] text-[#0A1A0F]">
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto"><span className="font-bold tracking-widest">NIKKAH</span><a href="#cta" className="bg-[#0A1A0F] text-white px-6 py-2 rounded-full text-sm">S'inscrire</a></nav>
      <section className="bg-[#0A1A0F] text-white py-24 px-6 text-center rounded-b-">
        <h1 className="text-6xl md:text-7xl font-serif font-bold tracking-widest">NIKKAH</h1>
        <p className="text-[#D4AF37] tracking-[0.6em] mt-2 text-sm">ABIDJAN</p>
        <h2 className="text-3xl md:text-5xl mt-12 max-w-3xl mx-auto font-serif leading-tight">Le mariage halal, respectueux et sincère.</h2>
        <p className="mt-6 text-white/60 max-w-xl mx-auto">Pas de swipes. Vérification CNI. Validation du wali. Pour les musulmans d'Abidjan et de la diaspora.</p>
        <a href="/inscription" className="inline-block mt-10 bg-[#D4AF37] text-black px-10 py-4 rounded-full font-bold shadow-xl">Commencer - 5000F</a>
        <p className="mt-4 text-xs text-white/40">Paiement Wave / Orange Money - 2 min</p>
      </section>
      <section className="py-8 grid grid-cols-3 gap-6 text-center max-w-4xl mx-auto px-6 -mt-10 bg-white rounded- shadow-xl border">
        <div><p className="text-2xl md:text-3xl font-bold text-[#064e3b]">{c.m.toLocaleString()}+</p><p className="text- opacity-60 uppercase tracking-widest">Membres vérifiés</p></div>
        <div><p className="text-2xl md:text-3xl font-bold text-[#064e3b]">{c.mar}</p><p className="text- opacity-60 uppercase tracking-widest">Mariages</p></div>
        <div><p className="text-2xl md:text-3xl font-bold text-[#064e3b]">4.8/5</p><p className="text- opacity-60 uppercase tracking-widest">Sur Trustpilot</p></div>
      </section>
      <section className="py-20 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {[{t:"Vérifié à Abidjan", d:"Chaque profil avec CNI + selfie live. Zéro faux compte."},{t:"100% Halal", d:"Pas de chat seul. Le wali est notifié dès le 1er contact."},{t:"Sérieux uniquement", d:"Objectif mariage. Pas de temps perdu. Filtrage par piété."}].map((f,i)=>(<div key={i} className="bg-white p-6 rounded-2xl border"><p className="font-bold">{f.t}</p><p className="text-sm opacity-60 mt-2">{f.d}</p></div>))}
      </section>
      <section className="py-10 px-6 max-w-3xl mx-auto">
        <h3 className="text-3xl text-center font-serif mb-10">Questions fréquentes</h3>
        {[
          {q:"Comment vous vérifiez les profils?", r:"CNI ivoirienne + selfie vidéo + numéro Wave/OM au même nom. Équipe à Cocody qui valide manuellement."},
          {q:"Pourquoi 5000F?", r:"Paiement unique pour filtrer les non-sérieux. Pas d'abonnement. Tu payes une fois."},
          {q:"Vous êtes présents où?", r:"Abidjan d'abord (Cocody, Yopougon, Marcory...), puis Bouaké, Yamoussoukro et diaspora France."},
        ].map((f,i)=>(
          <div key={i} className="border-b py-5">
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex justify-between font-bold text-left">{f.q} <span>{open===i?"-":"+"}</span></button>
            {open===i && <p className="mt-3 opacity-70 text-sm leading-relaxed">{f.r}</p>}
          </div>
        ))}
      </section>
      <section id="cta" className="bg-[#0A1A0F] py-20 text-center px-6 rounded-t- mt-10">
        <h3 className="text-3xl md:text-4xl text-white font-serif max-w-xl mx-auto">Prêt pour ton Nikkah? Qu'Allah facilite.</h3>
        {!done? (
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-3 max-w-lg mx-auto">
            <input placeholder="Ton WhatsApp +225..." className="px-6 py-4 rounded-full w-full text-black outline-none" />
            <button onClick={()=>setDone(true)} className="bg-[#D4AF37] px-8 py-4 rounded-full font-bold whitespace-nowrap">Rejoindre</button>
          </div>
        ) : <div className="mt-8 bg-[#D4AF37] p-6 rounded-2xl max-w-lg mx-auto"><p className="font-bold">Mabrouk! On t'écrit sur WhatsApp dans 5 min inch'Allah.</p></div>}
      </section>
    </main>
  )
}