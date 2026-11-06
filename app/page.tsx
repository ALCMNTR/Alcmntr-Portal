// app/page.tsx
import React from 'react';

export default function MunicipalPortalLanding() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 1. TOP STATUTORY & ACCESSIBILITY BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Official Civic Gateway • Bayan ng Taytay, Lalawigan ng Rizal</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">Statutory Compliance: RA 11032 (ARTA) | RA 10173 (DPA)</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-400 font-mono">EN | FIL</span>
        </div>
      </div>

      {/* 2. EXECUTIVE MUNICIPAL HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-950 text-amber-400 flex items-center justify-center font-bold text-lg shadow-inner border-2 border-amber-400">
              TR
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">Pamahalaang Bayan ng Taytay</div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Citizen Action Portal</h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              Powered by <strong className="ml-1 text-slate-900">Alcmntr</strong>
            </span>
            <a 
              href="#module-1" 
              className="bg-blue-950 hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition shadow"
            >
              Access Services
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs sm:text-sm mb-6">
            <span>✨ Digitizing Local Governance for 300,000+ Taytayeños</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            Mabilis, Transparent, at <br className="hidden sm:inline"/>
            <span className="text-amber-400">Modernong Serbisyo Publiko.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ang opisyal na digital gateway ng Pamahalaang Bayan. Mag-ulat ng sirang kalsada, mag-inquire gamit ang AI, at mag-asikaso ng mga serbisyo nang walang mahabang pila.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#module-1" 
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm sm:text-base hover:bg-amber-300 transition shadow-lg shadow-amber-400/20"
            >
              🚨 Mag-ulat ng Insidente (Incident Report)
            </a>
            <a 
              href="#about" 
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-800 text-white font-semibold text-sm sm:text-base hover:bg-slate-700 border border-slate-700 transition"
            >
              Tungkol sa Sistema (About Us)
            </a>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE CORE SERVICES (MODULE 1 SPOTLIGHT) */}
      <section id="module-1" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
                🟢 Live Module 01 • Active
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Geo-Targeted Citizen Incident Reporting</h3>
              <p className="text-sm text-slate-600 mt-1">
                Kunan ng litrato ang sirang streetlight, baradong kanal, o tambak na basura. Direktang maruruta sa Municipal Engineering Office (MEO) at MENRO.
              </p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition shadow flex items-center justify-center gap-2 whitespace-nowrap">
              <span>Buksan ang Reporting Form</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 font-medium">Covered Barangays</div>
              <div className="text-lg font-bold text-slate-900 mt-1">All 5 Barangays</div>
              <div className="text-xs text-slate-400 mt-0.5">Dolores to Muzon</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 font-medium">Target Response (ARTA)</div>
              <div className="text-lg font-bold text-slate-900 mt-1">Under 72 Hours</div>
              <div className="text-xs text-slate-400 mt-0.5">SGLG Criteria Aligned</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 font-medium">Verification Standard</div>
              <div className="text-lg font-bold text-slate-900 mt-1">Photo + GPS</div>
              <div className="text-xs text-slate-400 mt-0.5">Anti-Spam Verified</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-500 font-medium">Citizen Notification</div>
              <div className="text-lg font-bold text-slate-900 mt-1">Automated SMS</div>
              <div className="text-xs text-slate-400 mt-0.5">Real-time status tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FUTURE MODULES ROADMAP */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-900">Digital Modernization Roadmap</h3>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Paparating na mga Serbisyo (Coming Soon)</h2>
          <p className="text-sm text-slate-600 mt-2">
            Ang buong sistema ng pamamahala ay isinasaayos upang gawing 100% digital at walang red tape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-blue-100 text-blue-900 text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg">
              Module 02
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center text-xl mb-4">
                🤖
              </div>
              <h4 className="font-bold text-slate-900 text-lg">24/7 AI Policy Chatbot</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Automated na pagsagot sa requirements para sa Business Permit, Barangay Clearance, at mga lokal na ordinansa nang walang pila.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400 flex items-center gap-1">
              <span>⏳ In Development</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg">
              Module 03
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center text-xl mb-4">
                💳
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Document Vault & E-Payments</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Digital issuance ng Community Tax Certificate (Cedula) at Real Property Tax (Amilyar) gamit ang GCash, Maya, at LandBank.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400 flex items-center gap-1">
              <span>⏳ In Development</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-purple-100 text-purple-900 text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg">
              Module 04
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center text-xl mb-4">
                📅
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Appointment & Fast Queuing</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Pag-book ng 15-minutong window sa mga tanggapan ng munisipyo na may priority lanes para sa Senior Citizens at PWDs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400 flex items-center gap-1">
              <span>⏳ In Development</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-900 text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg">
              Module 05
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-800 flex items-center justify-center text-xl mb-4">
                📢
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Public Announcement Portal</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Opisyal at agarang anunsyo para sa suspensyon ng klase sa bagyo, mga libreng gamot sa health center, at public advisories.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400 flex items-center gap-1">
              <span>⏳ In Development</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT THE ARCHITECTURE SECTION */}
      <section id="about" className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Tungkol sa Teknolohiya</h3>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Modernong Sistema para sa Bayan</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            Ang arkitekturang ito ay binuo ng <strong className="text-slate-900">Alcmntr</strong> upang maging sandigan ng lokal na pamahalaan sa transparency, automation, at bilis ng aksyon alinsunod sa <strong>Republic Act No. 11032</strong> (Ease of Doing Business Act).
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-500 font-semibold">
            <div className="flex items-center gap-1.5">
              <span>🛡️</span> Data Privacy Act of 2012 Encrypted
            </div>
            <div className="flex items-center gap-1.5">
              <span>⚡</span> High-Availability Serverless Node
            </div>
            <div className="flex items-center gap-1.5">
              <span>🏆</span> DILG SGLG Criteria Aligned
            </div>
          </div>
        </div>
      </section>

      {/* 7. EXECUTIVE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white tracking-wider">ALCMNTR GOVTECH</span>
            <span className="text-slate-600">•</span>
            <span>Enterprise Municipal Platform</span>
          </div>
          <div className="text-slate-500">
            Engineered for Philippine Local Government Units. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
