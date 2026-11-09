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
        {/* 1. TOP STATUTORY BAR */}
        <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800 w-full">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide text-[11px] sm:text-xs">{t.statutoryTop}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden md:inline text-slate-400 text-[11px]">{t.complianceTag}</span>
            
            {/* Working Language Switcher */}
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

        {/* 2. HEADER WITH AUTHENTIC UPLOADED TAYTAY SEAL */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm w-full">
          <div className="w-full px-4 sm:px-8 py-3 flex justify-between items-center">
            {/* Left-Aligned Brand Block */}
            <div className="flex items-center space-x-3 text-left">
              <img
                src="/IMG_0970.jpeg"
                alt="Pamahalaang Bayan ng Taytay Official Seal"
                className="w-12 h-12 object-contain flex-shrink-0 drop-shadow-sm"
              />
              <div>
                <div className="text-[10px] upp
