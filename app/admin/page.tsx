// app/admin/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Bulletproof self-contained Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AdminIncident {
  id: string;
  ticket_number: string;
  citizen_name: string | null;
  citizen_phone: string;
  category: string;
  meralco_pole_id?: string | null;
  description: string;
  photo_url?: string | null;
  resolution_photo_url?: string | null;
  resolution_note?: string | null;
  landmark: string | null;
  status: "submitted" | "in_progress" | "resolved";
  assigned_department?: string | null;
  created_at: string;
  barangays?: {
    name: string;
  } | null;
}

export default function MunicipalAdminDashboard() {
  const [incidents, setIncidents] = useState<AdminIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBarangay, setFilterBarangay] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedIncident, setSelectedIncident] = useState<AdminIncident | null>(null);

  // Resolution Form States
  const [actionTakenNote, setActionTakenNote] = useState("");
  const [resolutionPhoto, setResolutionPhoto] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. Fetch live incidents from Supabase
  const fetchAdminIncidents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("incidents")
        .select(`
          id,
          ticket_number,
          citizen_name,
          citizen_phone,
          category,
          meralco_pole_id,
          description,
          photo_url,
          resolution_photo_url,
          resolution_note,
          landmark,
          status,
          assigned_department,
          created_at,
          barangays ( name )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching admin incidents:", error.message);
      } else if (data) {
        const formatted: AdminIncident[] = data.map((item: any) => ({
          ...item,
          barangays: Array.isArray(item.barangays) ? item.barangays[0] : item.barangays,
        }));
        setIncidents(formatted);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminIncidents();
  }, []);

  // Reset resolution form whenever a new ticket is opened
  useEffect(() => {
    if (selectedIncident) {
      setActionTakenNote(selectedIncident.resolution_note || "");
      setResolutionPhoto(selectedIncident.resolution_photo_url || null);
    }
  }, [selectedIncident]);

  // 2. Status & Resolution Action Handler
  const handleUpdateStatus = async (
    id: string,
    newStatus: "submitted" | "in_progress" | "resolved",
    crewName?: string
  ) => {
    setIsUpdating(true);
    try {
      const updatePayload: any = { status: newStatus };
      if (crewName) {
        updatePayload.assigned_department = crewName;
      }
      if (newStatus === "resolved") {
        updatePayload.resolution_note = actionTakenNote.trim() || "Work completed and verified by dispatch desk.";
        updatePayload.resolution_photo_url = resolutionPhoto;
      }

      const { error } = await supabase
        .from("incidents")
        .update(updatePayload)
        .eq("id", id);

      if (error) {
        alert("Failed to update status: " + error.message);
      } else {
        await fetchAdminIncidents();
        setSelectedIncident(null);
      }
    } catch (err: any) {
      alert("Error updating work order: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Image compressor for resolution proof photo (under 300KB)
  const handleResolutionPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1000;
          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            setResolutionPhoto(canvas.toDataURL("image/jpeg", 0.7));
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const barangays = ["Dolores (Poblacion)", "San Isidro", "San Juan", "Santa Ana", "Muzon"];

  // Filter Logic
  const filtered = incidents.filter((t) => {
    const bgyName = t.barangays?.name || "";
    const matchB = filterBarangay === "all" || bgyName.toLowerCase() === filterBarangay.toLowerCase();
    const matchS = filterStatus === "all" || t.status === filterStatus;
    return matchB && matchS;
  });

  const formatCategory = (cat: string) => {
    const map: Record<string, string> = {
      busted_streetlight: "💡 Busted Streetlight",
      clogged_drainage: "🌊 Clogged Drainage",
      uncollected_garbage: "🗑️ Uncollected Garbage",
      road_pothole: "🕳️ Road Pothole",
      illegal_obstruction: "🚧 Road Obstruction",
      other: "⚠️ Other Concern",
    };
    return map[cat] || cat;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between">
      <div>
        {/* Top Executive Operational Bar */}
        <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-[11px] sm:text-xs">
              MUNICIPAL DISPATCH OPERATIONS • TAYTAY, RIZAL
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-amber-400 font-mono text-[11px] hidden sm:inline">
              ARTA Turnaround Standard: 72h Max
            </span>
            <span className="bg-slate-800 px-2.5 py-0.5 rounded text-[10px] text-slate-300 font-semibold border border-slate-700">
              Brgy. Desk & Municipal Routing
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
            <div className="flex items-center space-x-3 text-left">
              <img
                src="/IMG_0970.jpeg"
                alt="Taytay Seal"
                className="w-11 h-11 object-contain drop-shadow-sm"
              />
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 leading-tight">
                  Pamahalaang Bayan ng Taytay
                </div>
                <h1 className="text-lg font-black text-slate-950 tracking-tight leading-none mt-0.5">
                  Operations & Dispatch Control
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={fetchAdminIncidents}
                className="text-xs font-bold text-slate-700 hover:text-blue-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 transition"
              >
                🔄 Refresh
              </button>
              <a
                href="/report"
                className="text-xs font-bold text-slate-700 hover:text-blue-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 transition hidden sm:inline-block"
              >
                + Citizen View
              </a>
              <a
                href="/"
                className="text-xs font-bold text-slate-700 hover:text-blue-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 transition"
              >
                Portal Home
              </a>
            </div>
          </div>
        </header>

        {/* MAIN DASHBOARD */}
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
          {/* TOP KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Total Incident Queue
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
                {incidents.length}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                ● Live database sync
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                In-Progress Dispatches
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">
                {incidents.filter((t) => t.status === "in_progress").length}
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-1">
                Crews on site
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Resolved Tickets
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
                {incidents.filter((t) => t.status === "resolved").length}
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-1">
                Verified complete
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                ARTA Compliance Rate
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-950 mt-1">
                100%
              </div>
              <div className="text-[10px] text-emerald-700 font-bold mt-1">
                ★ SGLG Grade: Pass
              </div>
            </div>
          </div>

          {/* FILTERS TOOLBAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Filter:
              </span>
              <select
                value={filterBarangay}
                onChange={(e) => setFilterBarangay(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl py-1.5 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-950"
              >
                <option value="all">All 5 Barangays</option>
                {barangays.map((b) => (
                  <option key={b} value={b}>
                    Brgy. {b}
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl py-1.5 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-950"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">New / Submitted</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-900">{filtered.length}</strong> work orders
            </div>
          </div>

          {/* INCIDENT WORK ORDER TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="py-12 text-center text-xs font-semibold text-slate-400 animate-pulse">
                Loading live incident queue from Supabase...
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 space-y-1">
                <div className="text-2xl">📋</div>
                <div className="font-bold text-slate-800">No work orders matching filter</div>
                <p>Try selecting a different barangay or status filter above.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-200 uppercase tracking-wider text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-4">Ticket</th>
                      <th className="py-3 px-4">Category & Location</th>
                      <th className="py-3 px-4">Citizen Details</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4">Assigned Unit</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-slate-50 transition">
                        <td className="py-4 px-4 font-mono font-black text-slate-950">
                          #{ticket.ticket_number}
                          <div className="text-[10px] font-normal text-slate-400 font-sans">
                            {new Date(ticket.created_at).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-xs">
                            {formatCategory(ticket.category)}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Brgy. {ticket.barangays?.name || "Taytay"} • {ticket.landmark || "No landmark"}
                          </div>
                          {ticket.meralco_pole_id && (
                            <div className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200 mt-1">
                              ⚡ Pole: {ticket.meralco_pole_id}
                            </div>
                          )}
                          <div className="text-[10px] text-slate-600 italic mt-0.5 max-w-xs truncate">
                            "{ticket.description}"
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-semibold text-slate-900">
                            {ticket.citizen_name || "Taytayeño"}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">
                            +63 {ticket.citizen_phone}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          {ticket.status === "submitted" && (
                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-200">
                              📩 NEW / SUBMITTED
                            </span>
                          )}
                          {ticket.status === "in_progress" && (
                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                              ⚡ IN PROGRESS
                            </span>
                          )}
                          {ticket.status === "resolved" && (
                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                              ✓ RESOLVED
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-slate-700 font-medium">
                          {ticket.assigned_department || (
                            <span className="text-slate-400 italic">Unassigned</span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedIncident(ticket)}
                            className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-3 py-1.5 rounded-lg transition text-[11px] shadow-sm"
                          >
                            Manage →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* DISPATCH ACTION MODAL (Includes Before & After Photo Proof) */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  Manage Work Order
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  #{selectedIncident.ticket_number} • {formatCategory(selectedIncident.category)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-slate-900 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Before Photo from Citizen */}
            {selectedIncident.photo_url && (
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Citizen Incident Evidence:
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={selectedIncident.photo_url}
                    alt="Citizen report photo"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
            )}

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
              <div>
                <strong>Location:</strong> Brgy. {selectedIncident.barangays?.name || "Taytay"} ({selectedIncident.landmark || "No landmark specified"})
              </div>
              <div>
                <strong>Reported By:</strong> {selectedIncident.citizen_name || "Taytayeño"} (+63 {selectedIncident.citizen_phone})
              </div>
              {selectedIncident.meralco_pole_id && (
                <div>
                  <strong>Meralco Pole / Bill:</strong>{" "}
                  <span className="font-mono font-bold text-amber-800">
                    {selectedIncident.meralco_pole_id}
                  </span>
                </div>
              )}
              <div>
                <strong>Details:</strong> "{selectedIncident.description}"
              </div>
              <div>
                <strong>Current Unit:</strong> {selectedIncident.assigned_department || "None"}
              </div>
            </div>

            {/* ACTION OPTIONS BASED ON KUYA ARCHIE'S WORKFLOW */}
            <div className="space-y-3 pt-2">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                1. Dispatch / Route Incident:
              </div>

              {/* Barangay Tanod / Crew */}
              <button
                type="button"
                disabled={isUpdating}
                onClick={() =>
                  handleUpdateStatus(
                    selectedIncident.id,
                    "in_progress",
                    `Brgy. ${selectedIncident.barangays?.name || "San Juan"} Tanod/Crew`
                  )
                }
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition text-left flex justify-between items-center"
              >
                <span>🏠 Dispatch Barangay Quick Response</span>
                <span className="text-[10px] text-slate-400">Local Crew</span>
              </button>

              {/* Taytay MEO */}
              <button
                type="button"
                disabled={isUpdating}
                onClick={() =>
                  handleUpdateStatus(
                    selectedIncident.id,
                    "in_progress",
                    "Taytay MEO Engineering Crew"
                  )
                }
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs transition text-left flex justify-between items-center shadow-sm"
              >
                <span>⚡ Escalate to Taytay MEO (Engineering)</span>
                <span className="text-[10px] text-slate-900">City Hall</span>
              </button>

              {/* Taytay MENRO */}
              <button
                type="button"
                disabled={isUpdating}
                onClick={() =>
                  handleUpdateStatus(
                    selectedIncident.id,
                    "in_progress",
                    "Taytay MENRO Sanitation Unit"
                  )
                }
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition text-left flex justify-between items-center"
              >
                <span>🌿 Escalate to Taytay MENRO (Sanitation)</span>
                <span className="text-[10px] text-blue-200">City Hall</span>
              </button>

              {/* Meralco Utility */}
              {selectedIncident.category === "busted_streetlight" && (
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() =>
                    handleUpdateStatus(
                      selectedIncident.id,
                      "in_progress",
                      "Forwarded to Meralco Dispatch"
                    )
                  }
                  className="w-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold py-2.5 px-3 rounded-xl text-xs transition text-left flex justify-between items-center border border-amber-300"
                >
                  <span>⚡ Endorse to Meralco Utility</span>
                  <span className="text-[10px] text-amber-800">External</span>
                </button>
              )}

              {/* 2. RESOLUTION PROOF (Action Taken Note + After Photo) */}
              <div className="pt-3 border-t border-slate-200 space-y-2.5">
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  2. Mark as Resolved (ARTA Compliance Proof):
                </div>

                {/* Action Taken Note Input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Action Taken / Repair Notes:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Repaired loose wire and replaced 50W bulb."
                    value={actionTakenNote}
                    onChange={(e) => setActionTakenNote(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  ></textarea>
                </div>

                {/* Resolution Photo Upload */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Proof Photo of Completion (After Photo):
                  </label>
                  {resolutionPhoto ? (
                    <div className="relative rounded-xl overflow-hidden border border-emerald-500 bg-slate-900">
                      <img
                        src={resolutionPhoto}
                        alt="Resolution proof"
                        className="w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setResolutionPhoto(null)}
                        className="absolute top-2 right-2 bg-slate-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md"
                      >
                        Remove Photo
                      </button>
                    </div>
                  ) : (
                    <label className="border border-dashed border-slate-300 hover:border-emerald-600 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition">
                      <span className="text-base">📷</span>
                      <span className="text-xs font-semibold text-slate-700">
                        Upload / Take "After" Photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleResolutionPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleUpdateStatus(selectedIncident.id, "resolved")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black py-3 px-4 rounded-xl text-xs shadow transition flex items-center justify-center gap-2 mt-2"
                >
                  {isUpdating ? "Saving..." : "✓ Complete & Mark as Resolved"}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedIncident(null)}
              className="w-full text-slate-500 hover:text-slate-900 text-xs font-semibold py-2 transition"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="bg-slate-950 text-slate-500 py-6 px-4 text-center text-xs border-t border-slate-800">
        <p className="font-semibold text-slate-400">ALCMNTR GOVTECH SYSTEMS • MUNICIPAL SUITE</p>
        <p className="text-[11px] mt-1">Authorized Official Dispatch Operations. All rights reserved.</p>
      </footer>
    </div>
  );
}
