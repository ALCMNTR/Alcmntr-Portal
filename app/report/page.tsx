// app/report/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Direct, self-contained Supabase connection (zero path errors!)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CommunityIncident {
  id: string;
  ticket_number: string;
  category: string;
  landmark: string;
  description: string;
  status: string;
  created_at: string;
}

export default function ReportProblemPage() {
  const [lang, setLang] = useState<"en" | "fil">("en");
  const isEn = lang === "en";

  const [activeTab, setActiveTab] = useState<"form" | "tracker">("form");
  const [feedFilter, setFeedFilter] = useState<"all" | "active" | "resolved">("active");

  // Form State
  const [fullName, setFullName] = useState("");
  const [barangay, setBarangay] = useState("San Juan");
  const [category, setCategory] = useState("busted_streetlight");
  const [meralcoId, setMeralcoId] = useState("");
  const [escalationLevel, setEscalationLevel] = useState("barangay");
  const [description, setDescription] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phone, setPhone] = useState("");
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number>(14.5794);
  const [longitude, setLongitude] = useState<number>(121.1303);

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveIncidents, setLiveIncidents] = useState<CommunityIncident[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(false);

  const categories = [
    { id: "busted_streetlight", icon: "💡", en: "Streetlight / Utility Pole", fil: "Sirang Ilaw / Poste" },
    { id: "clogged_drainage", icon: "🌊", en: "Clogged Drainage / Flood", fil: "Baradong Kanal / Baha" },
    { id: "uncollected_garbage", icon: "🗑️", en: "Uncollected Garbage", fil: "Tambak na Basura" },
    { id: "road_pothole", icon: "🕳️", en: "Road Pothole / Hazard", fil: "Lubak sa Kalsada" },
    { id: "illegal_obstruction", icon: "🚧", en: "Road Obstruction", fil: "Harang sa Kalsada" },
    { id: "other", icon: "⚠️", en: "Other / Emergency", fil: "Iba Pang Problema" },
  ];

  const barangays = ["Dolores (Poblacion)", "San Isidro", "San Juan", "Santa Ana", "Muzon"];

  // Fetch live reports from Supabase
  const fetchIncidents = async () => {
    if (!supabaseUrl || !supabaseAnonKey) return;
    setLoadingFeed(true);
    const { data, error } = await supabase
      .from("incidents")
      .select("id, ticket_number, category, landmark, description, status, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLiveIncidents(data as CommunityIncident[]);
    }
    setLoadingFeed(false);
  };

  useEffect(() => {
    fetchIncidents();
  }, [activeTab, submittedTicket]);

  // GPS Auto-detector
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus(isEn ? "GPS not supported" : "Walang GPS");
      return;
    }
    setGpsStatus(isEn ? "Locking GPS..." : "Hinahanap ang GPS...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setGpsStatus(`GPS Locked: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      },
      () => {
        setGpsStatus(isEn ? "GPS denied. Please type landmark." : "Pakisulat ang landmark sa ibaba.");
      }
    );
  };

  // Submit to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl || !supabaseAnonKey) {
      alert("Missing Vercel Environment Variables! Check NEXT_PUBLIC_SUPABASE_URL and ANON_KEY.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Safely grab Taytay ID and Barangay ID
      const { data: muni } = await supabase
        .from("municipalities")
        .select("id")
        .eq("name", "Taytay")
        .limit(1)
        .maybeSingle();

      const { data: brgy } = await supabase
        .from("barangays")
        .select("id")
        .eq("name", barangay)
        .limit(1)
        .maybeSingle();

      if (!muni || !brgy) {
        alert("Database Error: Taytay or Barangay record not found in Supabase.");
        setIsSubmitting(false);
        return;
      }

      // Format description with Kuya Archie's required context (Reporter, Scope, Meralco ID)
      const poleNote = category === "busted_streetlight" && meralcoId ? ` [Meralco Pole/Bill: ${meralcoId}]` : "";
      const scopeTag = escalationLevel === "municipal" ? "[ESCALATE: MUNICIPAL]" : "[BRGY LEVEL]";
      const fullDescription = `${scopeTag} [By: ${fullName}]${poleNote} ${description}`;

      const { data, error } = await supabase
        .from("incidents")
        .insert([
          {
            municipality_id: muni.id,
            barangay_id: brgy.id,
            category: category,
            description: fullDescription,
            landmark: landmark,
            citizen_phone: phone,
            latitude: latitude,
            longitude: longitude,
            status: "submitted",
            priority: escalationLevel === "municipal" ? "high" : "medium",
            assigned_department: escalationLevel === "municipal" ? "Taytay MEO/MENRO" : `Brgy. ${barangay}`,
          },
        ])
        .select()
        .single();

      if (error) {
        alert("Could not save report: " + error.message);
      } else if (data) {
        setSubmittedTicket(data.ticket_number);
        await fetchIncidents();
      }
    } catch (err: any) {
      alert("Connection error: " + (err?.message || "Please try again."));
    }

    setIsSubmitting(false);
  };

  const filteredFeed = liveIncidents.filter((r) => {
    if (feedFilter === "all") return true;
    if (feedFilter === "active") return r.status !== "resolved";
    return r.status === "resolved";
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between">
      <div>
        {/* Top Utility Bar */}
        <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-[11px] sm:text-xs">
              {isEn ? "Taytay Citizen Dispatch • Live Cloud" : "Aksyon at Ulat ng Bayan • Taytay"}
            </span>
          </div>

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

        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-9 h-9 rounded-full bg-blue-950 text-amber-400 flex items-center justify-center font-black text-xs border border-amber-400">
                TR
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 leading-tight">
                  {isEn ? "Taytay, Rizal" : "Bayan ng Taytay"}
                </div>
                <h1 className="text-base font-black text-slate-950 tracking-tight leading-none">
                  {isEn ? "Report a Problem" : "Mag-ulat ng Problema"}
                </h1>
              </div>
            </div>

            <a
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-blue-950 px-2.5 py-1.5 rounded-md transition hover:bg-slate-100 flex items-center gap-1 border border-slate-200"
            >
              <span>←</span>
              <span>Home</span>
            </a>
          </div>
        </header>

        {/* Tabs */}
        <div className="max-w-xl mx-auto px-4 pt-4">
          <div className="grid grid-cols-2 bg-slate-200 p-1 rounded-xl text-xs font-bold text-center">
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={`py-2.5 rounded-lg transition-all ${
                activeTab === "form" ? "bg-white text-slate-950 shadow" : "text-slate-600"
              }`}
            >
              📝 {isEn ? "Submit Report" : "Mag-ulat"}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("tracker");
                fetchIncidents();
              }}
              className={`py-2.5 rounded-lg transition-all ${
                activeTab === "tracker" ? "bg-white text-slate-950 shadow" : "text-slate-600"
              }`}
            >
              🔍 {isEn ? `Tracker (${liveIncidents.length})` : `Tracker (${liveIncidents.length})`}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-xl mx-auto px-4 py-6">
          {activeTab === "tracker" ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    {isEn ? "Live Community Tracker" : "Live Community Tracker"}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    {loadingFeed ? "Syncing with Supabase..." : "Live records from cloud database"}
                  </p>
                </div>

                <div className="flex gap-1 bg-slate-200 p-1 rounded-lg text-[10px] font-bold">
                  <button
                    onClick={() => setFeedFilter("active")}
                    className={`px-2 py-1 rounded ${feedFilter === "active" ? "bg-amber-400 text-slate-950" : "text-slate-600"}`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFeedFilter("resolved")}
                    className={`px-2 py-1 rounded ${feedFilter === "resolved" ? "bg-emerald-600 text-white" : "text-slate-600"}`}
                  >
                    Resolved
                  </button>
                  <button
                    onClick={() => setFeedFilter("all")}
                    className={`px-2 py-1 rounded ${feedFilter === "all" ? "bg-slate-900 text-white" : "text-slate-600"}`}
                  >
                    All
                  </button>
                </div>
              </div>

              {filteredFeed.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                  {isEn ? "No reports found in this filter yet." : "Wala pang naitalang ulat dito."}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFeed.map((report) => (
                    <div key={report.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono font-black text-blue-950">#{report.ticket_number}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                          report.status === "resolved" ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 font-medium">{report.description}</p>
                      <div className="text-[11px] text-slate-500 flex justify-between pt-2 border-t border-slate-100">
                        <span>📍 {report.landmark}</span>
                        <span className="text-[10px] text-slate-400">{new Date(report.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : submittedTicket ? (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-200">
                ✓
              </div>
              <h2 className="text-xl font-black text-slate-950">
                {isEn ? "Report Saved to Cloud!" : "Matagumpay na Naitala!"}
              </h2>
              <p className="text-xs text-slate-600">
                {isEn
                  ? "Your official tracking number has been generated. No need to follow up manually on Facebook."
                  : "Nagawa na ang inyong tracking number. Hindi na kailangang mag-follow up sa Facebook."}
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Ticket Number</div>
                <div className="text-2xl font-mono font-black text-blue-950 mt-1">#{submittedTicket}</div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedTicket(null);
                    setActiveTab("tracker");
                  }}
                  className="w-full bg-blue-950 text-white font-bold py-3 rounded-xl text-xs"
                >
                  {isEn ? "View in Community Tracker →" : "Tingnan sa Community Tracker →"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedTicket(null);
                    setDescription("");
                    setLandmark("");
                    setMeralcoId("");
                  }}
                  className="w-full bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl text-xs"
                >
                  {isEn ? "Submit Another Report" : "Mag-ulat Ulit"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-5">
              <div>
                <h2 className="text-lg font-black text-slate-950">
                  {isEn ? "Submit Civic Issue" : "Mag-ulat ng Problema"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn ? "Powered by Alcmntr Cloud Dispatch" : "Diretso sa tanggapan ng Taytay"}
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {isEn ? "Your Full Name *" : "Buong Pangalan *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Juan Dela Cruz"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  {isEn ? "Issue Category *" : "Uri ng Problema *"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold ${
                        category === c.id ? "border-blue-950 bg-blue-50 text-blue-950 font-bold" : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>{c.icon}</span>
                      <span>{isEn ? c.en : c.fil}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Kuya Archie's Meralco Pole / Bill Field (Shows automatically for Streetlights/Poles!) */}
              {category === "busted_streetlight" && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
                  <label className="block text-[11px] font-bold text-amber-900">
                    ⚡ {isEn ? "Meralco Pole ID or Nearest Bill # (Optional)" : "Meralco Pole ID o Numero sa Bill (Optional)"}
                  </label>
                  <input
                    type="text"
                    placeholder={isEn ? "Helps fast-track Meralco/MEO dispatch" : "Para mapabilis ang endorsement sa Meralco"}
                    value={meralcoId}
                    onChange={(e) => setMeralcoId(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-lg p-2.5 text-xs"
                  />
                </div>
              )}

              {/* Barangay & Two-Tier Escalation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {isEn ? "Barangay *" : "Barangay *"}
                  </label>
                  <select
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold"
                  >
                    {barangays.map((b) => (
                      <option key={b} value={b}>Brgy. {b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {isEn ? "Severity Level *" : "Laki ng Problema *"}
                  </label>
                  <select
                    value={escalationLevel}
                    onChange={(e) => setEscalationLevel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold"
                  >
                    <option value="barangay">{isEn ? "Barangay Action (Local)" : "Barangay Level (Maliit)"}</option>
                    <option value="municipal">{isEn ? "Escalate to Municipal Hall (Major)" : "Taytay Munisipyo (Malaki)"}</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {isEn ? "Description *" : "Detalyadong Paliwanag *"}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={isEn ? "Describe the problem clearly..." : "Ilarawan nang malinaw ang sira..."}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs"
                ></textarea>
              </div>

              {/* Landmark + GPS */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    {isEn ? "Exact Landmark *" : "Eksaktong Landmark *"}
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="text-[10px] font-bold text-blue-950 bg-blue-100 px-2 py-1 rounded"
                  >
                    📍 {isEn ? "Lock GPS" : "Kuhanin GPS"}
                  </button>
                </div>
                {gpsStatus && <div className="text-[10px] font-mono text-blue-950 bg-blue-50 p-2 rounded">{gpsStatus}</div>}
                <input
                  type="text"
                  required
                  placeholder={isEn ? "e.g., Manila East Rd near Puregold" : "hal. Tapat ng Puregold"}
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {isEn ? "Mobile Number (+63) *" : "Cellphone Number *"}
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold">+63</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9171234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-r-xl p-3 text-xs font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black py-3.5 rounded-xl shadow-md text-xs sm:text-sm transition"
              >
                {isSubmitting ? "Saving to Cloud..." : isEn ? "Submit Report to Database →" : "Ipasa ang Ulat →"}
              </button>
            </form>
          )}
        </main>
      </div>

      <footer className="bg-slate-950 text-slate-500 py-6 px-4 text-center text-xs border-t border-slate-800">
        <p className="font-semibold text-slate-400">ALCMNTR GOVTECH SYSTEMS</p>
      </footer>
    </div>
  );
}
