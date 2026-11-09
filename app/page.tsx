// app/page.tsx
'use client';

import React, { useState } from 'react';

export default function MunicipalPortalLanding() {
  const [lang, setLang] = useState<'en' | 'fil'>('en');

  const content = {
    en: {
      statutoryTop: "Official Civic Gateway • Municipality of Taytay, Rizal",
      complianceTag: "RA 11032 Compliant",
      lguSub: "Municipal Government of Taytay",
      portalTitle: "Citizen Action Portal",
      aboutNav: "About",
      heroBadge: "Taytay Municipal Public Services",
      heroHeading: "Direct Public Service for Taytayeños.",
      heroSub: "The official municipal gateway to submit community issues directly to local government offices for fast resolution.",
      
      cardBadge: "LIVE CITIZEN DISPATCH",
      cardTitle: "Report a Problem",
      cardDesc: "Notice a broken streetlight, clogged canal, or uncollected garbage? Take a photo and report it straight to City Hall.",
      step1: "1. Take a live photo",
      step2: "2. Pinpoint your location",
      step3: "3. Receive SMS text updates",
      cardBtn: "Report a Problem Now",
      
      aboutHeading: "About This Platform",
      aboutText: "Engineered by Alcmntr to provide citizens with a direct, transparent channel to report municipal issues and track resolution in real-time, in full compliance with the Philippine Ease of Doing Business Act.",
      footerText: "Powered by Alcmntr GovTech Engine. All rights reserved."
    },
    fil: {
      statutoryTop: "Opisyal na Civic Gateway • Bayan ng Taytay, Rizal",
      complianceTag: "Alinsunod sa RA 11032",
      lguSub: "Pamahalaang Bayan ng Taytay",
      portalTitle: "Citizen Action Portal",
      aboutNav: "Tungkol sa Amin",
      heroBadge: "Serbisyong Publiko ng Bayan ng Taytay",
      heroHeading: "Direktang Serbisyong Publiko sa Taytay.",
      heroSub: "Ang opisyal na portal ng munisipyo upang maiparating ang mga problema sa komunidad diretso sa kinauukulan para sa agarang aksyon.",
      
      cardBadge: "DIREKTONG AKSYON",
      cardTitle: "Mag-ulat ng Problema",
      cardDesc: "May sirang ilaw, baradong kanal, o tambak na basura? Kunan ng litrato at i-report agad sa Munisipyo.",
      step1: "1. Kunan ng litrato",
      step2: "2. I-confirm ang lokasyon",
      step3: "3. Tumanggap ng SMS update",
      cardBtn: "Mag-ulat ng Problema Ngayon",
      
      aboutHeading: "Tungkol sa Platform",
      aboutText: "Binuo ng Alcmntr upang mabigyan ang bawat residente ng mabilis at malinaw na paraan upang i-report ang mga problema sa komunidad at masubaybayan ang aksyon ng pamahalaan.",
      footerText: "Pinapatakbo ng Alcmntr GovTech Engine. All rights reserved."
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between">
      <div>
        {/* 1. TOP STATUTORY BAR (FULL WIDTH) */}
        <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800 w-full">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide text-[11px] sm:text-xs">{t.statutoryTop}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden md:inline text-slate-400 text-[11px]">{t.complianceTag}</span>
            
            {/* Language Switcher */}
            <div className="bg-slate-800 p-0.5 rounded-md border border-slate-700 flex items-center">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('fil')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  lang === 'fil'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                FIL
              </button>
            </div>
          </div>
        </div>

        {/* 2. HEADER (PUSHED TO FAR LEFT WITH OFFICIAL TAYTAY SEAL) */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm w-full">
          <div className="w-full px-4 sm:px-8 py-3 flex justify-between items-center">
            {/* Left Aligned Brand Block */}
            <div className="flex items-center space-x-3 text-left">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Taytay_Rizal_seal.png/240px-Taytay_Rizal_seal.png"
                alt="Official Seal of Taytay, Rizal"
                className="w-11 h-11 object-contain drop-shadow-sm flex-shrink-0"
              />
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 leading-tight">
                  {t.lguSub}
                </div>
                <h1 className="text-lg font-black text-slate-950 tracking-tight leading-none mt-0.5">
                  {t.portalTitle}
                </h1>
              </div>
            </div>

            {/* Right Aligned Navigation */}
            <nav>
              <a 
                href="#about" 
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-950 px-3 py-1.5 rounded-md transition hover:bg-slate-100"
              >
                {t.aboutNav}
              </a>
            </nav>
          </div>
        </header>

        {/* 3. HERO INTRO */}
        <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 text-center border-b border-slate-800">
          <div className="max-w-xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-3">
              {t.heroBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-white">
              {t.heroHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              {t.heroSub}
            </p>
          </div>
        </section>

        {/* 4. COMPACT PORTRAIT RECTANGLE CARD */}
        <main className="max-w-sm mx-auto px-4 py-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 border border-amber-200">
              🚨
            </div>

            <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-2">
              {t.cardBadge}
            </span>

            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {t.cardTitle}
            </h3>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t.cardDesc}
            </p>

            {/* 3 Action Steps */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 my-4 text-left space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>{t.step1}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>{t.step2}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>{t.step3}</span>
              </div>
            </div>

            <button 
              type="button"
              className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>{t.cardBtn}</span>
              <span>→</span>
            </button>
          </div>
        </main>

        {/* 5. ABOUT SECTION */}
        <section id="about" className="max-w-xl mx-auto px-4 py-8 text-center border-t border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t.aboutHeading}</h4>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
            {t.aboutText}
          </p>
        </section>
      </div>

      {/* 6. MINIMAL FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-6 px-4 text-center text-xs border-t border-slate-800">
        <p className="font-semibold text-slate-400">ALCMNTR GOVTECH SYSTEMS</p>
        <p className="text-[11px] mt-1">{t.footerText}</p>
      </footer>
    </div>
  );
}
