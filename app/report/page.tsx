// app/report/page.tsx
"use client";

import React, { useState } from "react";

export default function ReportProblemPage() {
  const [lang, setLang] = useState<"en" | "fil">("en");
  const isEn = lang === "en";

  // Form State
  const [barangay, setBarangay] = useState("Dolores (Poblacion)");
  const [category, setCategory] = useState("busted_streetlight");
  const [landmark, setLandmark] = useState("");
  const [phone, setPhone] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categories list
  const categories = [
    { id: "busted_streetlight", icon: "💡", en: "Busted Streetlight", fil: "Sirang Streetlight" },
    { id: "clogged_drainage", icon: "🌊", en: "Clogged Drainage / Flooding", fil: "Baradong Kanal / Baha" },
    { id: "uncollected_garbage", icon: "🗑️", en: "Uncollected Garbage", fil: "Tambak na Basura" },
    { id: "road_pothole", icon: "🕳️", en: "Road Pothole / Hazard", fil: "Lubak sa Kalsada" },
    { id: "illegal_obstruction", icon: "🚧", en: "Road Obstruction", fil: "Harang sa Kalsada" },
    { id: "other", icon: "⚠️", en: "Other Concern", fil: "Iba Pang Problema" },
  ];

  const barangays = [
    "Dolores (Poblacion)",
    "San Isidro",
    "San Juan",
    "Santa Ana",
    "Muzon"
  ];

  // Photo Capture Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // GPS Auto-detector
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus(isEn ? "GPS not supported on this device" : "Hindi suportado ang GPS sa device na ito");
      return;
    }
    setGpsStatus(isEn ? "Acquiring GPS coordinates..." : "Hinahanap ang GPS coordinates...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsStatus(
          `GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)} (Taytay, Rizal)`
        );
      },
      () => {
        setGpsStatus(isEn ? "Location access denied. Please type landmark below." : "Hindi ma-access ang GPS. Pakisulat ang landmark sa ibaba.");
      }
    );
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant ticket dispatch
    setTimeout(() => {
      const randomTicket = "TAY-" + Math.floor(1000 + Math.random() * 9000);
      setSubmittedTicket(randomTicket);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between">
      <div>
        {/* Top Utility Bar */}
        <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-[11px] sm:text-xs">
              {isEn ? "Citizen Incident Dispatch • Taytay, Rizal" : "Pag-uulat ng Problema • Bayan ng Taytay"}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="bg-slate-800 p-0.5 rounded-md border border-slate-700 flex items-center">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                isEn ? "bg-amber-400 text-slate-950 shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("fil")}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                !isEn ? "bg-amber-400 text-slate-950 shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              FIL
            </button>
          </div>
        </div>

        {/* Clean Header with Seal and Back Button */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-3 text-left">
              <img
                src="/IMG_0970.jpeg"
                alt="Pamahalaang Bayan ng Taytay Official Seal"
                className="w-10 h-10 object-contain flex-shrink-0 drop-shadow-sm"
              />
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 leading-tight">
                  {isEn ? "Municipality of Taytay" : "Pamahalaang Bayan ng Taytay"}
                </div>
                <h1 className="text-base font-black text-slate-950 tracking-tight leading-none">
                  {isEn ? "Incident Report Form" : "Form ng Pag-uulat"}
                </h1>
              </div>
            </div>

            <a
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-blue-950 px-2.5 py-1.5 rounded-md transition hover:bg-slate-100 flex items-center gap-1 border border-slate-200"
            >
              <span>←</span>
              <span>{isEn ? "Back" : "Bumalik"}</span>
            </a>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-xl mx-auto px-4 py-6">
          {submittedTicket ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-200">
                ✓
              </div>

              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                {isEn ? "Report Successfully Logged" : "Matagumpay na Naitala"}
              </span>

              <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                {isEn ? "Thank you, Taytayeño!" : "Salamat, Taytayeño!"}
              </h2>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {isEn
                  ? "Your issue has been routed directly to the Municipal Engineering Office (MEO) & MENRO for inspection and crew dispatch."
                  : "Ang inyong ulat ay naipadala na sa Municipal Engineering Office (MEO) at MENRO upang maaksyunan ng dispatch crew."}
              </p>

              {/* Official Tracking Ticket Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-6 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {isEn ? "Tracking Ticket Number" : "Numero ng Ulat"}
                </div>
                <div className="text-2xl font-black text-blue-950 font-mono mt-1">
                  #{submittedTicket}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center justify-center gap-1">
                  <span>⏱️</span>
                  <span>{isEn ? "Standard SLA: Within 72 Hours" : "Target na Aksyon: Bago lumampas 72 oras"}</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 mb-6 leading-relaxed">
                {isEn
                  ? `An automated SMS update will be sent to +63 ${phone || "your number"} once crews are dispatched on site.`
                  : `Makakatanggap ka ng SMS update sa +63 ${phone || "iyong cellphone"} oras na lumabas ang crew.`}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedTicket(null);
                    setPhotoPreview(null);
                    setLandmark("");
                    setPhone("");
                    setGpsStatus(null);
                  }}
                  className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-xl shadow transition text-xs sm:text-sm"
                >
                  {isEn ? "Submit Another Report" : "Mag-ulat ng Isa Pang Problema"}
                </button>
                <a
                  href="/"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl transition text-xs block text-center"
                >
                  {isEn ? "Return to Main Portal" : "Bumalik sa Portal"}
                </a>
              </div>
            </div>
          ) : (
            /* THE INCIDENT REPORTING FORM */
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-950 tracking-tight">
                  {isEn ? "Submit an Incident" : "I-ulat ang Problema"}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  {isEn
                    ? "Fill in the details below. Mandatory photos help crews bring the correct repair equipment."
                    : "Punan ang mga detalye. Nakakatulong ang litrato upang maihanda ng crew ang tamang kagamitan."}
                </p>
              </div>

              {/* STEP 1: PHOTO CAPTURE */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? "1. Photo Evidence (Required)" : "1. Litrato ng Problema (Kailangan)"}
                </label>
                
                {photoPreview ? (
                  <div className="relative rounded-xl overflow-hidden border-2 border-emerald-500 bg-slate-900">
                    <img src={photoPreview} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-2 right-2 bg-slate-950/80 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow"
                    >
                      {isEn ? "Change Photo" : "Palitan"}
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-300 hover:border-blue-950 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition">
                    <div className="text-3xl mb-2">📸</div>
                    <span className="text-xs font-bold text-slate-900">
                      {isEn ? "Tap to Take Photo or Upload" : "Pindutin para Kunan ng Litrato"}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">
                      {isEn ? "Live camera or image gallery" : "Kamera o Gallery"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      required
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* STEP 2: CATEGORY SELECTION */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? "2. Category of Problem" : "2. Uri ng Problema"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition text-xs font-semibold ${
                        category === cat.id
                          ? "border-blue-950 bg-blue-50 text-blue-950 font-bold shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="leading-tight">{isEn ? cat.en : cat.fil}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: BARANGAY SELECTION */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? "3. Select Barangay in Taytay" : "3. Piliin ang Barangay sa Taytay"}
                </label>
                <select
                  value={barangay}
                  onChange={(e) => setBarangay(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-3.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
                >
                  {barangays.map((b) => (
                    <option key={b} value={b}>
                      Brgy. {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* STEP 4: LOCATION & LANDMARK */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {isEn ? "4. Exact Location / Landmark" : "4. Lokasyon o Landmark"}
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="text-[10px] font-bold text-blue-950 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 transition flex items-center gap-1"
                  >
                    <span>📍</span>
                    <span>{isEn ? "Auto-Detect GPS" : "Kuhanin ang GPS"}</span>
                  </button>
                </div>

                {gpsStatus && (
                  <div className="text-[11px] font-mono text-blue-950 bg-blue-50 p-2 rounded-lg border border-blue-200">
                    {gpsStatus}
                  </div>
                )}

                <input
                  type="text"
                  required
                  placeholder={
                    isEn
                      ? "e.g., Corner Rizal Ave, in front of Puregold"
                      : "hal. Kanto ng Rizal Ave, tapat ng Puregold"
                  }
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
              </div>

              {/* STEP 5: CITIZEN MOBILE NUMBER (FOR SMS UPDATES) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? "5. Mobile Number for SMS Tracking" : "5. Cellphone Number para sa SMS Update"}
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs sm:text-sm font-bold">
                    +63
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="917 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-r-xl py-3 px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-950 font-mono"
                  />
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {isEn
                    ? "Protected under RA 10173 (Data Privacy Act). Used strictly to text you when the repair is resolved."
                    : "Protektado ng Data Privacy Act. Gagamitin lamang para mag-text kapag naayos na ang problema."}
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black py-4 px-4 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{isEn ? "Transmitting to City Hall..." : "Ipinapadala sa Munisipyo..."}</span>
                ) : (
                  <>
                    <span>{isEn ? "Submit Incident Report" : "Ipasa ang Ulat sa Munisipyo"}</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          )}
        </main>
      </div>

      {/* Minimal Footer */}
      <footer className="bg-slate-950 text-slate-500 py-6 px-4 text-center text-xs border-t border-slate-800">
        <p className="font-semibold text-slate-400">ALCMNTR GOVTECH SYSTEMS</p>
        <p className="text-[11px] mt-1">
          {isEn ? "Official Civic Dispatch Engine. All rights reserved." : "Opisyal na Civic Dispatch Engine. All rights reserved."}
        </p>
      </footer>
    </div>
  );
}
