"use client";
import React, { useState } from "react";

export default function MunicipalPortalLanding() {
  const [lang, setLang] = useState<"en" | "fil">("en");
  const isEn = lang === "en";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* 1. TOP BAR */}
      <div className="bg-slate-950 text-slate-300 text-[10px] py-2 px-4 flex justify-between items-center border-b border-slate-800">
        <span>{isEn ? "Official Civic Gateway • Taytay, Rizal" : "Opisyal na Civic Gateway • Taytay, Rizal"}</span>
        <div className="bg-slate-800 rounded p-0.5 flex">
          <button onClick={() => setLang("en")} className={`px-2 ${isEn ? "bg-amber-400 text-black" : ""}`}>EN</button>
          <button onClick={() => setLang("fil")} className={`px-2 ${!isEn ? "bg-amber-400 text-black" : ""}`}>FIL</button>
        </div>
      </div>

      {/* 2. HEADER */}
      <header className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/IMG_0970.jpeg" alt="Seal" className="w-10 h-10 object-contain" />
          <div>
            <div className="text-[9px] uppercase font-bold text-slate-500">Pamahalaang Bayan</div>
            <h1 className="text-sm font-black uppercase">Citizen Portal</h1>
          </div>
        </div>
        <a href="/admin" className="text-[10px] font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg">Staff</a>
      </header>

      {/* 3. HERO */}
      <section className="bg-slate-900 text-white p-6 text-center">
        <h2 className="text-xl font-black mb-2">{isEn ? "Taytay Citizen Portal" : "Taytay Citizen Portal"}</h2>
        <p className="text-[11px] text-slate-300">{isEn ? "Fast, Direct, Responsive Governance." : "Mabilis na Serbisyo Publiko."}</p>
      </section>

      {/* 4. MAIN ACTION CARD */}
      <main className="max-w-xs mx-auto -mt-10 px-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl text-center border">
          <h3 className="font-black text-lg mb-2">{isEn ? "Report a Problem" : "Mag-ulat ng Problema"}</h3>
          <p className="text-[11px] text-slate-600 mb-4">{isEn ? "Snap a photo of any community issue." : "Kunan ng litrato ang anumang problema."}</p>
          <a href="/report" className="block w-full bg-blue-950 text-white font-bold py-3 rounded-xl text-xs">
            {isEn ? "Report Now →" : "I-report Ngayon →"}
          </a>
        </div>
      </main>
    </div>
  );
}
