import React, { useState } from "react";
import {
  X,
  Lock,
  Clock,
  Save,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  Phone,
  Trash2,
  Download,
  Filter,
  RefreshCw,
  Search,
  Check,
  Stethoscope,
  Microscope,
  Power
} from "lucide-react";

export default function AdminPanelModal({
  isOpen,
  onClose,
  doctors = [],
  tests = [],
  bookings = [],
  clinicConfig = {},
  onUpdateDoctors,
  onUpdateTests,
  onUpdateBookings,
  onResetData,
  isStandalonePage = false
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(isStandalonePage);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");

  // Working copy of doctor schedules
  const [doctorSchedules, setDoctorSchedules] = useState(doctors);
  const [testSchedules, setTestSchedules] = useState(tests);

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState("schedules"); // "schedules" | "bookings" | "tests"

  // Booking search & filter
  const [bookingFilter, setBookingFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [saveToast, setSaveToast] = useState(false);

  // Sync state when modal opens & lock background body scroll
  React.useEffect(() => {
    setDoctorSchedules(doctors);
    setTestSchedules(tests);
    if (isStandalonePage) setIsAuthenticated(true);

    if (isOpen && !isStandalonePage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [doctors, tests, isOpen, isStandalonePage]);

  if (!isOpen && !isStandalonePage) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPin = clinicConfig.adminPin || "excela123";
    if (enteredPin === correctPin) {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Invalid Admin PIN. (Default is excela123)");
    }
  };

  const handleSaveSchedules = () => {
    onUpdateDoctors(doctorSchedules);
    onUpdateTests(testSchedules);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleDoctorChange = (doctorId, field, value) => {
    setDoctorSchedules(prev =>
      prev.map(doc => doc.id === doctorId ? { ...doc, [field]: value } : doc)
    );
  };

  const handleTestChange = (testId, field, value) => {
    setTestSchedules(prev =>
      prev.map(t => t.id === testId ? { ...t, [field]: value } : t)
    );
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking? The slot will be instantly available for other patients.")) {
      const updated = bookings.map(b =>
        b.id === bookingId ? { ...b, status: "Cancelled" } : b
      );
      onUpdateBookings(updated);
    }
  };

  const handleCompleteBooking = (bookingId) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, status: "Completed" } : b
    );
    onUpdateBookings(updated);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = bookingFilter === "all" || b.status === bookingFilter || b.targetId === bookingFilter;
    const matchesQuery = !searchQuery.trim() ||
      b.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.patientPhone.includes(searchQuery) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const exportCSV = () => {
    const headers = ["Token ID,Type,Target,Patient Name,Phone,Date,Time Slot,Reason,Status"];
    const rows = bookings.map(b =>
      `"${b.id}","${b.type}","${b.targetName}","${b.patientName}","${b.patientPhone}","${b.date}","${b.time}","${b.reason}","${b.status}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Excela_Bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const content = (
    <div className="bg-[#FAFBF9] rounded-[2rem] w-full max-w-4xl border border-[#C9A84C]/50 shadow-2xl relative flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="bg-[#16271D] text-white p-5 sm:p-6 z-20 flex items-center justify-between border-b border-[#C9A84C]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-[#E7CF86]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#E7CF86]">
              Clinic Front-Desk Operations
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
              Admin &amp; Doctor Daily Timings Control
            </h3>
          </div>
        </div>

        {!isStandalonePage && (
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8">
          {!isAuthenticated ? (
            /* PIN Gate */
            <div className="max-w-sm mx-auto py-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#EFF5F1] text-[#1E3326] flex items-center justify-center mx-auto mb-4 border border-[#D5E3D8]">
                <Lock className="w-7 h-7 text-[#C9A84C]" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#14261B] mb-2">
                Receptionist & Doctor Access
              </h4>
              <p className="text-xs text-[#526B5C] mb-6">
                Enter your administrative PIN to manage today's consultation hours, doctor leave status, and view booked patient slots.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter PIN (Default: excela123)"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#D5E3D8] text-center tracking-widest text-base font-bold text-[#14261B] focus:outline-none focus:border-[#C9A84C]"
                  autoFocus
                />

                {pinError && (
                  <div className="text-xs text-[#A83232] font-semibold flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{pinError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#172B1F] hover:bg-[#254231] text-[#F3E7C4] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Unlock Portal
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Workspace */
            <div className="space-y-6">
              {/* Tab Selector */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2ECE5] pb-4">
                <div className="flex gap-2 p-1 rounded-xl bg-[#EBEFEA] border border-[#D5E1D7]">
                  <button
                    onClick={() => setAdminTab("schedules")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      adminTab === "schedules"
                        ? "bg-[#16271D] text-[#F3E7C4] shadow-sm"
                        : "text-[#3D5647] hover:text-[#16271D]"
                    }`}
                  >
                    Doctor Daily Hours
                  </button>

                  <button
                    onClick={() => setAdminTab("tests")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      adminTab === "tests"
                        ? "bg-[#16271D] text-[#F3E7C4] shadow-sm"
                        : "text-[#3D5647] hover:text-[#16271D]"
                    }`}
                  >
                    Test Lab Timings
                  </button>

                  <button
                    onClick={() => setAdminTab("bookings")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      adminTab === "bookings"
                        ? "bg-[#16271D] text-[#F3E7C4] shadow-sm"
                        : "text-[#3D5647] hover:text-[#16271D]"
                    }`}
                  >
                    <span>Patient Bookings</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#C9A84C] text-[#142319] font-bold">
                      {bookings.filter(b => b.status === "Confirmed").length}
                    </span>
                  </button>
                </div>

                {saveToast && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E6F4EA] text-[#137333] text-xs font-bold animate-in fade-in">
                    <Check className="w-4 h-4" />
                    <span>Live Public Slots Updated!</span>
                  </div>
                )}
              </div>

              {/* TAB 1: Doctor Daily Schedules */}
              {adminTab === "schedules" && (
                <div className="space-y-6">
                  <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#E7CF86]/50 text-xs text-[#7A5B1C]">
                    <strong>How this works:</strong> Adjust the start and end times for each doctor below. The public booking page will <strong>instantly regenerate precision 15-minute slots</strong> within those exact hours.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctorSchedules.map(doc => {
                      return (
                        <div
                          key={doc.id}
                          className="bg-white rounded-2xl p-6 border border-[#DAE6DE] shadow-sm flex flex-col justify-between"
                        >
                          <div>
                            {/* Doctor Header & Toggle */}
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EDF3EF]">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#C9A84C]/40 bg-white shrink-0">
                                  <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="w-full h-full object-cover object-top"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[#14261B]">{doc.name}</h4>
                                  <p className="text-[11px] text-[#557760]">{doc.role}</p>
                                </div>
                              </div>

                              {/* Toggle active / on-leave */}
                              <button
                                type="button"
                                onClick={() => handleDoctorChange(doc.id, "todayAvailable", !doc.todayAvailable)}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                                  doc.todayAvailable
                                    ? "bg-[#E5F6E8] text-[#1E7E34] border border-[#94D4A4]"
                                    : "bg-gray-100 text-gray-500 border border-gray-300"
                                }`}
                              >
                                <Power className="w-3 h-3" />
                                <span>{doc.todayAvailable ? "Active Today" : "On Leave"}</span>
                              </button>
                            </div>

                            {/* Time Controls */}
                            {doc.todayAvailable ? (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C3225] mb-1">
                                    Primary Consultation Shift (Morning / Afternoon)
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <span className="text-[10px] text-gray-500">From</span>
                                      <input
                                        type="time"
                                        value={doc.todayStartTime}
                                        onChange={(e) => handleDoctorChange(doc.id, "todayStartTime", e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-[#F6FAF7] border border-[#D5E3D8] text-xs font-semibold text-[#182C1F]"
                                      />
                                    </div>
                                    <div>
                                      <span className="text-[10px] text-gray-500">To</span>
                                      <input
                                        type="time"
                                        value={doc.todayEndTime}
                                        onChange={(e) => handleDoctorChange(doc.id, "todayEndTime", e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-[#F6FAF7] border border-[#D5E3D8] text-xs font-semibold text-[#182C1F]"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Optional Evening Shift */}
                                <div>
                                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C3225] mb-1">
                                    Evening Consultation Shift (Optional)
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <span className="text-[10px] text-gray-500">From</span>
                                      <input
                                        type="time"
                                        value={doc.todayEveningStartTime || ""}
                                        onChange={(e) => handleDoctorChange(doc.id, "todayEveningStartTime", e.target.value)}
                                        placeholder="--:--"
                                        className="w-full px-3 py-2 rounded-xl bg-[#F6FAF7] border border-[#D5E3D8] text-xs font-semibold text-[#182C1F]"
                                      />
                                    </div>
                                    <div>
                                      <span className="text-[10px] text-gray-500">To</span>
                                      <input
                                        type="time"
                                        value={doc.todayEveningEndTime || ""}
                                        onChange={(e) => handleDoctorChange(doc.id, "todayEveningEndTime", e.target.value)}
                                        placeholder="--:--"
                                        className="w-full px-3 py-2 rounded-xl bg-[#F6FAF7] border border-[#D5E3D8] text-xs font-semibold text-[#182C1F]"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="p-3 rounded-xl bg-[#F4F8F5] border border-[#DDE7E1] text-[11px] text-[#4A6655] flex items-center justify-between">
                                  <span>Slot Interval:</span>
                                  <span className="font-bold text-[#14261B]">15 Minutes per patient</span>
                                </div>
                              </div>
                            ) : (
                              <div className="p-6 text-center text-gray-400 text-xs">
                                Doctor is marked on leave today. Public booking will display "Not Available Today" for this doctor.
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveSchedules}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#172B1F] hover:bg-[#254231] text-[#F3E7C4] text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#C9A84C]" />
                      <span>Save & Apply Live Schedules</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Diagnostics Lab Timings */}
              {adminTab === "tests" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {testSchedules.map(t => (
                      <div key={t.id} className="bg-white rounded-2xl p-5 border border-[#DAE6DE] shadow-sm">
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#EDF3EF]">
                          <span className="text-xs font-bold text-[#14261B] truncate">{t.name}</span>
                          <button
                            type="button"
                            onClick={() => handleTestChange(t.id, "todayAvailable", !t.todayAvailable)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              t.todayAvailable ? "bg-[#E5F6E8] text-[#1E7E34]" : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {t.todayAvailable ? "Open" : "Closed"}
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] text-gray-500">Sample/Scan Hours</span>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <input
                                type="time"
                                value={t.startTime}
                                onChange={(e) => handleTestChange(t.id, "startTime", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-[#F6FAF7] border border-[#D5E3D8] text-xs text-[#182C1F]"
                              />
                              <input
                                type="time"
                                value={t.endTime}
                                onChange={(e) => handleTestChange(t.id, "endTime", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-[#F6FAF7] border border-[#D5E3D8] text-xs text-[#182C1F]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveSchedules}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#172B1F] hover:bg-[#254231] text-[#F3E7C4] text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#C9A84C]" />
                      <span>Save Diagnostic Hours</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Patient Bookings Ledger */}
              {adminTab === "bookings" && (
                <div className="space-y-4">
                  {/* Ledger Filters & Search */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white p-3 rounded-2xl border border-[#DAE6DE]">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search patient, phone, token ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#F6FAF7] text-xs text-[#182C1F] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={bookingFilter}
                        onChange={(e) => setBookingFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-[#F6FAF7] border border-[#D5E3D8] text-xs text-[#182C1F] focus:outline-none"
                      >
                        <option value="all">All Appointments</option>
                        <option value="Confirmed">Confirmed Only</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="dr-chinmayee">Dr. Chinmayee Kar</option>
                        <option value="prof-ayaskanta">Prof. Ayaskanta Singh</option>
                      </select>

                      <button
                        onClick={exportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#172B1F] text-[#F3E7C4] text-xs font-semibold hover:bg-[#254231] transition-colors cursor-pointer"
                        title="Download CSV for Reception"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Bookings List Table */}
                  <div className="bg-white rounded-2xl border border-[#DAE6DE] overflow-hidden">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F4F8F5] text-[#284232] font-bold uppercase tracking-wider border-b border-[#DAE6DE] sticky top-0">
                          <tr>
                            <th className="p-3">Token</th>
                            <th className="p-3">Patient Details</th>
                            <th className="p-3">Specialist / Service</th>
                            <th className="p-3">Slot Time</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Desk Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBF1ED]">
                          {filteredBookings.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="p-8 text-center text-gray-400">
                                No appointments found for this filter.
                              </td>
                            </tr>
                          ) : (
                            filteredBookings.map(b => (
                              <tr key={b.id} className="hover:bg-[#F9FCFA] transition-colors">
                                <td className="p-3 font-mono font-bold text-[#C9A84C]">
                                  {b.id}
                                </td>
                                <td className="p-3">
                                  <div className="font-bold text-[#14261B]">{b.patientName}</div>
                                  <div className="text-[10px] text-gray-500">{b.patientPhone}</div>
                                </td>
                                <td className="p-3">
                                  <div className="font-semibold text-[#182C1F]">{b.targetName}</div>
                                  <div className="text-[10px] text-gray-400 truncate max-w-xs">{b.reason}</div>
                                </td>
                                <td className="p-3 whitespace-nowrap">
                                  <div className="font-bold text-[#1E3326]">{b.time}</div>
                                  <div className="text-[10px] text-gray-400">{b.date}</div>
                                </td>
                                <td className="p-3">
                                  <span
                                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                      b.status === "Confirmed"
                                        ? "bg-[#E5F6E8] text-[#1E7E34]"
                                        : b.status === "Completed"
                                        ? "bg-blue-50 text-blue-700"
                                        : "bg-red-50 text-red-600 line-through"
                                    }`}
                                  >
                                    {b.status}
                                  </span>
                                </td>
                                <td className="p-3 text-right whitespace-nowrap">
                                  {b.status === "Confirmed" && (
                                    <div className="inline-flex items-center gap-1.5">
                                      <button
                                        onClick={() => handleCompleteBooking(b.id)}
                                        className="p-1.5 rounded-lg bg-[#E6F4EA] text-[#137333] hover:bg-[#D2EBD9] transition-colors cursor-pointer"
                                        title="Mark as Completed"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleCancelBooking(b.id)}
                                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                                        title="Cancel & Release Slot"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
  );

  if (isStandalonePage) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-h-[92vh] overflow-y-auto w-full flex justify-center">
        {content}
      </div>
    </div>
  );
}
