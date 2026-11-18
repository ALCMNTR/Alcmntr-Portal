// app/report/page.tsx
"use client";

import React, { useState } from "react";

// Mock Database of Existing Community Reports (For Duplicate Detection & Transparency Feed)
interface CommunityIncident {
  id: string;
  ticketNumber: string;
  fullName: string;
  category: string;
  barangay: string;
  landmark: string;
  description: string;
  status: "submitted" | "in_progress" | "resolved";
  timeAgo: string;
}

const INITIAL_REPORTS: CommunityIncident[] = [
  {
    id: "1",
    ticketNumber: "TAY-1042",
    fullName: "Roberto Cruz",
    category: "busted_streetlight",
    barangay: "San Juan",
    landmark: "Corner Manila East Rd near Puregold",
    description: "Poste ng ilaw patay-sindi, delikado sa mga motorista tuwing gabi.",
    status: "in_progress",
    timeAgo: "3 hours ago",
  },
  {
    id: "2",
    ticketNumber: "TAY-1040",
    fullName: "Maria Santos",
    category: "uncollected_garbage",
    barangay: "Dolores (Poblacion)",
    landmark: "Rizal Ave, tapat ng Barangay Hall",
    description: "Tambak na scrap fabric at commercial waste mula weekend tiangge.",
    status: "resolved",
    timeAgo: "1 day ago",
  },
  {
    id: "3",
    ticketNumber: "TAY-1039",
    fullName: "Danilo Reyes",
    category: "clogged_drainage",
    barangay: "Muzon",
    landmark: "Purok 4, malapit sa creek",
    description: "Baradong kanal sanhi ng plastic waste, tumataas ang tubig kapag umuulan.",
    status: "in_progress",
    timeAgo: "5 hours ago",
  },
  {
    id: "4",
    ticketNumber: "TAY-1038",
    fullName: "Elena Gomez",
    category: "road_pothole",
    barangay: "Santa Ana",
    landmark: "Highway intersection",
    description: "Malalim na lubak sa gitna ng kalsada, sumasayad ang mga tricycle.",
    status: "resolved",
    timeAgo: "2 days ago",
  },
];

export default function ReportProblemPage() {
  const [lang, setLang] = useState<"en" | "fil">("en");
  const isEn = lang === "en";

  // Navigation Sub-tab: Form vs. Community Feed
  const [activeTab, setActiveTab] = useState<"form" | "tracker">("form");
  const [feedFilter, setFeedFilter] = useState<"all" | "in_progress" | "resolved">("in_progress");

  // Form State
  const [fullName, setFullName] = useState("");
  const [barangay, setBarangay] = useState("San Juan");
  const [category, setCategory] = useState("busted_streetlight");
  const [description, setDescription] = useState("");
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

  const barangays = ["Dolores (Poblacion)", "San Isidro", "San Juan", "Santa Ana", "Muzon"];

  // DUPLICATE DETECTION LOGIC: Checks if an active ticket exists with the same category and barangay
  const duplicateAlert = INITIAL_REPORTS.find(
    (report) =>
      report.category === category &&
      report.barangay === barangay &&
      report.status !== "resolved"
  );

  // Photo Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // GPS Auto-detector
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus(isEn ? "GPS not supported on device" : "Hindi suportado ang GPS");
      return;
    }
    setGpsStatus(isEn ? "Acquiring GPS coordinates..." : "Hinahanap ang GPS coordinates...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsStatus(`GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      },
      () => {
        setGpsStatus(isEn ? "Location access denied. Please type landmark." : "Hindi ma-access ang GPS. Pakisulat ang landmark.");
      }
    );
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomTicket = "TAY-" + Math.floor(1000 + Math.random() * 9000);
      setSubmittedTicket(randomTicket);
      setIsSubmitting(false);
    }, 1000);
  };

  const filteredFeed = INITIAL_REPORTS.filter((r) => {
    if (feedFilter === "all") return true;
    return r.status === feedFilter;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between">
      <div>
        {/* Top Utility Bar */}
        <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-[11px] sm:text-xs">
              {isEn ? "Taytay Citizen Action & Public Tracker" : "Aksyon at Ulat ng Bayan • Taytay, Rizal"}
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

        {/* Clean Header */}
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
                  {isEn ? "Public Incident Portal" : "Portal ng Pag-uulat"}
                </h1>
              </div>
            </div>

            <a
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-blue-950 px-2.5 py-1.5 rounded-md transition hover:bg-slate-100 flex items-center gap-1 border border-slate-200"
            >
              <span>←</span>
              <span>{isEn ? "Home" : "Home"}</span>
            </a>
          </div>
        </header>

        {/* SUB-NAVIGATION TABS (Report vs. Public Community Feed) */}
        <div className="max-w-xl mx-auto px-4 pt-4">
          <div className="grid grid-cols-2 bg-slate-200 p-1 rounded-xl text-xs font-bold text-center">
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={`py-2.5 rounded-lg transition-all ${
                activeTab === "form"
                  ? "bg-white text-slate-950 shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📝 {isEn ? "Submit a Problem" : "Mag-ulat ng Problema"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tracker")}
              className={`py-2.5 rounded-lg transition-all ${
                activeTab === "tracker"
                  ? "bg-white text-slate-950 shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🔍 {isEn ? "Community Tracker" : "Subaybayan ang Ulat"}
            </button>
          </div>
        </div>

        {/* MAIN BODY */}
        <main className="max-w-xl mx-auto px-4 py-6">
          {activeTab === "tracker" ? (
            /* TAB 2: PUBLIC COMMUNITY INCIDENT TRACKER */
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    {isEn ? "Community Problem Tracker" : "Subaybayan ang mga Problema"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isEn ? "Real-time municipal work orders in Taytay" : "Kasalukuyang inaaksyunan ng munisipyo"}
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex gap-1 bg-slate-200 p-1 rounded-lg text-[10px] font-bold">
                  <button
                    onClick={() => setFeedFilter("in_progress")}
                    className={`px-2.5 py-1 rounded transition ${
                      feedFilter === "in_progress"
                        ? "bg-amber-400 text-slate-950 shadow-sm"
                        : "text-slate-600"
                    }`}
                  >
                    {isEn ? "In Progress" : "Inaaksyunan"}
                  </button>
                  <button
                    onClick={() => setFeedFilter("resolved")}
                    className={`px-2.5 py-1 rounded transition ${
                      feedFilter === "resolved"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-600"
                    }`}
                  >
                    {isEn ? "Resolved" : "Nagawa Na"}
                  </button>
                  <button
                    onClick={() => setFeedFilter("all")}
                    className={`px-2.5 py-1 rounded transition ${
                      feedFilter === "all"
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600"
                    }`}
                  >
                    {isEn ? "All" : "Lahat"}
                  </button>
                </div>
              </div>

              {/* Incidents List */}
              <div className="space-y-3">
                {filteredFeed.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2.5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-slate-900">
                          #{report.ticketNumber}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          Brgy. {report.barangay}
                        </span>
                      </div>

                      {/* Status Badge */}
                      {report.status === "in_progress" && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          ⚡ IN PROGRESS
                        </span>
                      )}
                      {report.status === "resolved" && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                          ✓ RESOLVED
                        </span>
                      )}
                      {report.status === "submitted" && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                          📩 SUBMITTED
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-slate-800 leading-snug">
                      "{report.description}"
                    </p>

                    <div className="text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
                      <span>📍 {report.landmark}</span>
                      <span className="text-[10px] text-slate-400">{report.timeAgo}</span>
                    </div>

                    {/* Verified Citizen Byline */}
                    <div className="text-[10px] text-slate-400 flex justify-between items-center">
                      <span>Reported by: {report.fullName}</span>
                      <span className="text-emerald-700 font-bold">● Public Works Logged</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : submittedTicket ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-200">
                ✓
              </div>

              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                {isEn ? "Report Successfully Logged" : "Matagumpay na Naitala"}
              </span>

              <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                {isEn ? "Thank you, " + fullName + "!" : "Salamat, " + fullName + "!"}
              </h2>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {isEn
                  ? "Your report has been entered into the municipal dispatch queue for inspection and repair."
                  : "Ang inyong ulat ay naipasok na sa sistema ng munisipyo upang maaksyunan ng dispatch crew."}
              </p>

              {/* Ticket Card with Status Progression */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {isEn ? "Official Ticket Reference" : "Numero ng Ulat"}
                </div>
                <div className="text-2xl font-black text-blue-950 font-mono mt-1">
                  #{submittedTicket}
                </div>

                {/* 3-Step Lifecycle Visual Indicator */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-200 text-center">
                  <div className="space-y-1">
                    <div className="w-4 h-4 rounded-full bg-blue-600 mx-auto text-[10px] text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="text-[9px] font-bold text-blue-900">SUBMITTED</div>
                    <div className="text-[8px] text-slate-400">Completed</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-4 h-4 rounded-full bg-amber-400 mx-auto text-[10px] text-slate-900 flex items-center justify-center font-bold animate-pulse">
                      2
                    </div>
                    <div className="text-[9px] font-bold text-amber-700">IN PROGRESS</div>
                    <div className="text-[8px] text-slate-400">Dispatching</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-4 h-4 rounded-full bg-slate-200 mx-auto text-[10px] text-slate-500 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div className="text-[9px] font-bold text-slate-400">RESOLVED</div>
                    <div className="text-[8px] text-slate-400">Final Proof</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 mb-6 leading-relaxed">
                {isEn
                  ? `Automated SMS notifications will be dispatched to +63 ${phone} throughout the repair process.`
                  : `Makakatanggap ka ng libreng SMS text sa +63 ${phone} sa bawat galaw ng repair team.`}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("tracker")}
                  className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-xl shadow transition text-xs sm:text-sm"
                >
                  {isEn ? "View on Community Tracker" : "Tingnan sa Community Tracker"}
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
            /* TAB 1: INCIDENT REPORTING FORM */
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6"
            >
              <div>
                <h2 className="text-xl font-black text-slate-950 tracking-tight">
                  {isEn ? "Report a Problem" : "Mag-ulat ng Problema"}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  {isEn
                    ? "Submit civic infrastructure issues directly to Taytay public works departments."
                    : "Iparating ang mga sirang pasilidad diretso sa mga tanggapan ng munisipyo."}
                </p>
              </div>

              {/* CITIZEN FULL NAME */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? "Citizen Full Name *" : "Buong Pangalan ng Residente *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? "e.g., Juan Dela Cruz" : "hal. Juan Dela Cruz"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-950 font-medium"
                />
              </div>

              {/* STEP 1: PHOTO CAPTURE */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? "Photo Evidence (Required) *" : "Litrato ng Problema (Kailangan) *"}
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
                      {isEn ? "Live camera or gallery" : "Kamera o Gallery"}
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
                  {isEn ? "Category of Problem *" : "Uri ng Problema *"}
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
                  {isEn ? "Select Barangay in Taytay *" : "Piliin ang Barangay sa Taytay *"}
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

              {/* LIVE SMART DUPLICATE DETECTION ALERT */}
              {duplicateAlert && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-xs text-amber-900 space-y-1.5 animate-pulse">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>⚠️</span>
                    <span>
                      {isEn
                        ? "Potential Duplicate Incident Detected"
                        : "May Naitala Nang Parehong Ulat"}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    {isEn
                      ? `Ticket #${duplicateAlert.ticketNumber} for a similar issue in Brgy. ${barangay} is already under review. You can still submit if this is a separate location.`
                      : `Ang Ticket #${duplicateAlert.ticketNumber} sa Brgy. ${barangay} ay kasalukuyan nang inaaksyunan ng munisipyo.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("tracker")}
                    className="text-[11px] font-bold text-blue-950 underline pt-1 block"
                  >
                    {isEn ? "→ View existing report on Tracker" : "→ Tingnan ang ulat sa Tracker"}
                  </button>
                </div>
              )}

              {/* STEP 4: DETAILED DESCRIPTION */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? "Detailed Description *" : "Detalyadong Paliwanag *"}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={
                    isEn
                      ? "Describe the issue in detail (e.g., how big the pothole is, or how long the light has been out)..."
                      : "Ilarawan ang problema (hal. gaano kalalim ang lubak, o gaano na katagal patay ang ilaw)..."
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
                ></textarea>
              </div>

              {/* STEP 5: LOCATION & LANDMARK */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {isEn ? "Exact Location / Landmark *" : "Eksaktong Lokasyon o Landmark *"}
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

              {/* STEP 6: MOBILE NUMBER (FOR SMS UPDATES) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isEn ? "Mobile Phone Number (+63) *" : "Cellphone Number para sa SMS Update *"}
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
                    ? "Protected under RA 10173. Encrypted and strictly utilized for municipal dispatch status notifications."
                    : "Protektado ng Data Privacy Act. Gagamitin lamang para mag-text kapag naayos na ang ulat."}
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black py-4 px-4 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{isEn ? "Dispatching Report to MEO..." : "Ipinapadala sa Munisipyo..."}</span>
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

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-6 px-4 text-center text-xs border-t border-slate-800">
        <p className="font-semibold text-slate-400">ALCMNTR GOVTECH SYSTEMS</p>
        <p className="text-[11px] mt-1">
          {isEn
            ? "Official Civic Dispatch Engine. All rights reserved."
            : "Opisyal na Civic Dispatch Engine. All rights reserved."}
        </p>
      </footer>
    </div>
  );
}
