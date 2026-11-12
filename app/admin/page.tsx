// app/admin/page.tsx
"use client";

import React, { useState } from "react";

interface AdminTicket {
  id: string;
  ticketNumber: string;
  citizenName: string;
  citizenPhone: string;
  category: string;
  barangay: string;
  landmark: string;
  description: string;
  status: "submitted" | "in_progress" | "resolved";
  assignedCrew?: string;
  submittedAt: string;
}

const INITIAL_ADMIN_TICKETS: AdminTicket[] = [
  {
    id: "1",
    ticketNumber: "TAY-1042",
    citizenName: "Roberto Cruz",
    citizenPhone: "917 445 2211",
    category: "Busted Streetlight",
    barangay: "San Juan",
    landmark: "Corner Manila East Rd near Puregold",
    description: "Poste ng ilaw patay-sindi, delikado sa mga motorista tuwing gabi.",
    status: "in_progress",
    assignedCrew: "MEO Electrical Team Alpha",
    submittedAt: "3h ago",
  },
  {
    id: "2",
    ticketNumber: "TAY-1043",
    citizenName: "Andrea Lim",
    citizenPhone: "918 223 9988",
    category: "Road Pothole",
    barangay: "Dolores (Poblacion)",
    landmark: "J. Sumulong St, near Parish Church",
    description: "Malaking lubak na nagdudulot ng traffic at disgrasya sa mga motor.",
    status: "submitted",
    submittedAt: "25 mins ago",
  },
  {
    id: "3",
    ticketNumber: "TAY-1039",
    citizenName: "Danilo Reyes",
    citizenPhone: "920 112 3344",
    category: "Clogged Drainage",
    barangay: "Muzon",
    landmark: "Purok 4 creek overflow",
    description: "Baradong kanal sanhi ng plastic waste, tumataas ang tubig kapag umuulan.",
    status: "in_progress",
    assignedCrew: "MENRO Drainage Quick-Response",
    submittedAt: "5h ago",
  },
  {
    id: "4",
    ticketNumber: "TAY-1040",
    citizenName: "Maria Santos",
    citizenPhone: "915 889 0011",
    category: "Uncollected Garbage",
    barangay: "Santa Ana",
    landmark: "Market boundary alley",
    description: "Tambak na scrap fabric at commercial waste mula weekend market.",
    status: "resolved",
    assignedCrew: "CENRO Truck #4",
    submittedAt: "1d ago",
  },
];

export default function MunicipalAdminDashboard() {
  const [tickets, setTickets] = useState<AdminTicket[]>(INITIAL_ADMIN_TICKETS);
  const [filterBarangay, setFilterBarangay] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<AdminTicket | null>(null);

  // Status Action Handlers
  const handleDispatchCrew = (id: string, crewName: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "in_progress", assignedCrew: crewName } : t
      )
    );
    setSelectedTicket(null);
  };

  const handleResolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "resolved" } : t))
    );
    setSelectedTicket(null);
  };

  const barangays = ["Dolores (Poblacion)", "San Isidro", "San Juan", "Santa Ana", "Muzon"];

  // Filtered Tickets
  const filtered = tickets.filter((t) => {
    const matchB = filterBarangay === "all" || t.barangay === filterBarangay;
    const matchS = filterStatus === "all" || t.status === filterStatus;
    return matchB && matchS;
  });

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
            <span className="text-amber-400 font-mono text-[11px]">
              ARTA Turnaround Standard: 72h Max
            </span>
            <span className="bg-slate-800 px-2.5 py-0.5 rounded text-[10px] text-slate-300 font-semibold border border-slate-700">
              MEO / MENRO Dispatch
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
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
              <a
                href="/report"
                className="text-xs font-bold text-slate-700 hover:text-blue-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 transition"
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
                {tickets.length}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                ● Live sync active
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                In-Progress Dispatches
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">
                {tickets.filter((t) => t.status === "in_progress").length}
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-1">
                Crews on site
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Resolved This Week
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
                {tickets.filter((t) => t.status === "resolved").length}
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-1">
                Photo verified
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                ARTA Compliance Rate
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-950 mt-1">
                96.4%
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
              {/* Barangay Filter */}
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

              {/* Status Filter */}
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
              Showing <strong className="text-slate-900">{filtered.length}</strong> work tickets
            </div>
          </div>

          {/* INCIDENT WORK ORDER TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-200 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4">Ticket</th>
                    <th className="py-3 px-4">Category & Location</th>
                    <th className="py-3 px-4">Citizen Details</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4">Assigned Crew</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50 transition">
                      {/* Ticket Number */}
                      <td className="py-4 px-4 font-mono font-black text-slate-950">
                        #{ticket.ticketNumber}
                        <div className="text-[10px] font-normal text-slate-400 font-sans">
                          {ticket.submittedAt}
                        </div>
                      </td>

                      {/* Category & Barangay */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 text-xs">
                          {ticket.category}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Brgy. {ticket.barangay} • {ticket.landmark}
                        </div>
                        <div className="text-[10px] text-slate-600 italic mt-0.5 max-w-xs truncate">
                          "{ticket.description}"
                        </div>
                      </td>

                      {/* Citizen */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-900">
                          {ticket.citizenName}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          +63 {ticket.citizenPhone}
                        </div>
                      </td>

                      {/* Status */}
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

                      {/* Assigned Crew */}
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        {ticket.assignedCrew || (
                          <span className="text-slate-400 italic">Unassigned</span>
                        )}
                      </td>

                      {/* Quick Actions */}
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedTicket(ticket)}
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
          </div>
        </main>
      </div>

      {/* DISPATCH ACTION MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 animate-fade-in">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  Manage Work Order
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  #{selectedTicket.ticketNumber} • {selectedTicket.category}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-slate-900 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-700">
              <div><strong>Location:</strong> Brgy. {selectedTicket.barangay} ({selectedTicket.landmark})</div>
              <div><strong>Reported By:</strong> {selectedTicket.citizenName} (+63 {selectedTicket.citizenPhone})</div>
              <div><strong>Details:</strong> "{selectedTicket.description}"</div>
            </div>

            {/* ACTION OPTIONS */}
            <div className="space-y-2 pt-2">
              {selectedTicket.status === "submitted" && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleDispatchCrew(selectedTicket.id, "MEO Quick Response Crew #1")}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 px-4 rounded-xl text-xs shadow transition flex items-center justify-center gap-2"
                  >
                    <span>⚡ Dispatch MEO Engineering Crew</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDispatchCrew(selectedTicket.id, "MENRO Sanitation Unit")}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition"
                  >
                    <span>Dispatch MENRO Clean-up Unit</span>
                  </button>
                </div>
              )}

              {selectedTicket.status === "in_progress" && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleResolveTicket(selectedTicket.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-xl text-xs shadow transition flex items-center justify-center gap-2"
                  >
                    <span>✓ Mark as Resolved (Photo Verified)</span>
                  </button>
                  <p className="text-[10px] text-slate-500 text-center">
                    Automatically triggers completion SMS to the citizen.
                  </p>
                </div>
              )}

              {selectedTicket.status === "resolved" && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-xs text-center font-bold">
                  ✓ This incident is completed and verified for ARTA compliance.
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
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
