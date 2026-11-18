// app/report/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  const [feedFilter, setFeedFilter] = useState<"all" | "in_progress" | "resolved">("in_progress");
  const [liveIncidents, setLiveIncidents] = useState<CommunityIncident[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // FETCH DATA: Every time the tracker tab opens, it force-refreshes
  const fetchIncidents = async () => {
    const { data, error } = await supabase
      .from("incidents")
      .select("id, ticket_number, category, landmark, description, status, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLiveIncidents(data as CommunityIncident[]);
    } else {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "tracker") {
      fetchIncidents();
    }
  }, [activeTab]);

  // Form State
  const [fullName, setFullName] = useState("");
  const [barangay, setBarangay] = useState("San Juan");
  const [category, setCategory] = useState("busted_streetlight");
  const [description, setDescription] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const taytayId = "a0000000-0000-0000-0000-000000000001";
    const { data: brgy } = await supabase.from("barangays").select("id").eq("name", barangay).single();

    const { data, error } = await supabase.from("incidents").insert([
      {
        municipality_id: taytayId,
        barangay_id: brgy?.id,
        category: category,
        description: `[Reported by: ${fullName}] ${description}`,
        landmark: landmark,
        citizen_phone: phone,
        latitude: 14.5794,
        longitude: 121.1303,
        status: "submitted",
        priority: "medium",
      },
    ]).select().single();

    if (error) {
      alert("Submission Error: " + error.message);
    } else {
      setSubmittedTicket(data.ticket_number);
      fetchIncidents(); // Refresh feed immediately
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b py-3 px-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-base font-black">Portal ng Pag-uulat</h1>
        <a href="/" className="text-xs font-bold border px-3 py-1.5 rounded-lg">Home</a>
      </header>

      {/* Tabs */}
      <div className="max-w-xl mx-auto px-4 pt-4">
        <div className="grid grid-cols-2 bg-slate-200 p-1 rounded-xl text-xs font-bold text-center">
          <button onClick={() => setActiveTab("form")} className={`py-2.5 rounded-lg ${activeTab === "form" ? "bg-white shadow" : ""}`}>Form</button>
          <button onClick={() => setActiveTab("tracker")} className={`py-2.5 rounded-lg ${activeTab === "tracker" ? "bg-white shadow" : ""}`}>Tracker</button>
        </div>
      </div>

      <main className="max-w-xl mx-auto px-4 py-6">
        {activeTab === "tracker" ? (
          <div className="space-y-3">
             {liveIncidents.map((r) => (
               <div key={r.id} className="bg-white p-4 rounded-xl border space-y-1 text-xs">
                 <div className="font-bold">#{r.ticket_number} - {r.category}</div>
                 <div>{r.description}</div>
               </div>
             ))}
          </div>
        ) : (
          /* Simplified Form */
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border space-y-4">
            <input type="text" required placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-lg text-xs" />
            <textarea required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-lg text-xs"></textarea>
            <input type="text" required placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-lg text-xs" />
            <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg text-xs font-bold">Submit</button>
          </form>
        )}
      </main>
    </div>
  );
}
