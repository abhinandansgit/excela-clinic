import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Microscope,
  MessageCircle,
  MapPin
} from "lucide-react";
import confetti from "canvas-confetti";
import { generateDoctorSlots, generateTestSlots } from "../utils/slotEngine";

export default function BookingModal({
  isOpen,
  onClose,
  doctors = [],
  tests = [],
  bookings = [],
  onAddBooking,
  initialType = "doctor",
  initialTargetId = null,
  clinicConfig = {}
}) {
  const [bookingType, setBookingType] = useState(initialType || "doctor");
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    initialTargetId || (doctors[0] ? doctors[0].id : "")
  );
  const [selectedTestId, setSelectedTestId] = useState(
    initialTargetId || (tests[0] ? tests[0].id : "")
  );

  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Form Fields
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientReason, setPatientReason] = useState("");
  const [formError, setFormError] = useState("");

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Prevent background body scrolling when Booking Modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (initialType) setBookingType(initialType);
    if (initialTargetId) {
      if (initialType === "doctor") setSelectedDoctorId(initialTargetId);
      if (initialType === "test") setSelectedTestId(initialTargetId);
    }
  }, [initialType, initialTargetId, isOpen]);

  // Reset slot when date or target changes
  useEffect(() => {
    setSelectedSlot(null);
    setFormError("");
  }, [selectedDate, selectedDoctorId, selectedTestId, bookingType]);

  if (!isOpen) return null;

  const currentDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];
  const currentTest = tests.find(t => t.id === selectedTestId) || tests[0];

  // Calculate live available slots based on Admin settings and current bookings
  const relevantBookings = bookings.filter(b => {
    const matchesTarget = bookingType === "doctor"
      ? b.targetId === selectedDoctorId
      : b.targetId === selectedTestId;
    return matchesTarget && b.date === selectedDate;
  });

  const availableSlots = bookingType === "doctor"
    ? generateDoctorSlots(currentDoctor, relevantBookings, selectedDate)
    : generateTestSlots(currentTest, relevantBookings, selectedDate);

  const isTargetAvailable = bookingType === "doctor"
    ? currentDoctor?.todayAvailable
    : currentTest?.todayAvailable;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setFormError("Please select an available 15-minute time slot.");
      return;
    }
    if (!patientName.trim()) {
      setFormError("Please provide patient full name.");
      return;
    }
    if (!patientPhone.trim() || patientPhone.replace(/[^0-9]/g, "").length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const tokenNum = "EXC-" + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: tokenNum,
      type: bookingType,
      targetId: bookingType === "doctor" ? currentDoctor.id : currentTest.id,
      targetName: bookingType === "doctor" ? currentDoctor.name : currentTest.name,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      date: selectedDate,
      time: selectedSlot.time,
      reason: patientReason.trim() || (bookingType === "doctor" ? "General Consultation" : "Routine Diagnostic Test"),
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    onAddBooking(newBooking);
    setConfirmedBooking(newBooking);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {}
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setSelectedSlot(null);
    setPatientName("");
    setPatientPhone("");
    setPatientReason("");
    setFormError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in duration-200 overflow-x-hidden">
      <div className="bg-[#FAFBF9] rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden border border-[#C9A84C]/50 shadow-2xl relative flex flex-col max-w-full animate-scale-up">
        {/* Header */}
        <div className="sticky top-0 bg-[#16291E] text-white p-6 rounded-t-[2rem] z-20 flex items-center justify-between border-b border-[#C9A84C]/30 w-full overflow-x-hidden">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E7CF86] uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Direct Slot Reservation</span>
            </div>
            <h3 className="font-serif text-2xl text-white font-bold tracking-tight mt-0.5">
              {confirmedBooking ? "Appointment Confirmed" : "Book Your Individual Slot"}
            </h3>
          </div>

          <button
            onClick={handleReset}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 w-full max-w-full overflow-x-hidden">
          {confirmedBooking ? (
            /* Confirmation Token Card */
            <div className="flex flex-col items-center text-center w-full max-w-full overflow-x-hidden">
              <div className="w-16 h-16 rounded-full bg-[#E5F6E8] text-[#1E7E34] flex items-center justify-center border-2 border-[#94D4A4] mb-4 shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-xs uppercase tracking-widest font-bold text-[#7A5B1C]">
                Digital Token
              </span>
              <h4 className="font-serif text-3xl font-bold text-[#14261B] mt-1 mb-2">
                {confirmedBooking.id}
              </h4>

              <p className="text-xs text-[#526D5D] max-w-md mb-6">
                Your reservation is confirmed. Please present this token at the reception desk.
              </p>

              {/* Booking Summary Box */}
              <div className="w-full max-w-full bg-white rounded-2xl p-5 border border-[#DCE7DF] shadow-sm text-left mb-6 space-y-3 overflow-x-hidden">
                <div className="flex justify-between items-center py-1.5 border-b border-[#EAF1EB] gap-2">
                  <span className="text-xs text-[#5B7967] shrink-0">Consultant / Test:</span>
                  <span className="text-xs font-bold text-[#15271C] truncate">{confirmedBooking.targetName}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#EAF1EB] gap-2">
                  <span className="text-xs text-[#5B7967] shrink-0">Date &amp; Slot:</span>
                  <span className="text-xs font-bold text-[#C9A84C] bg-[#FAF8F2] px-2.5 py-0.5 rounded-md border border-[#E7CF86]/40 truncate">
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#EAF1EB] gap-2">
                  <span className="text-xs text-[#5B7967] shrink-0">Patient Name:</span>
                  <span className="text-xs font-semibold text-[#15271C] truncate">{confirmedBooking.patientName}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 gap-2">
                  <span className="text-xs text-[#5B7967] shrink-0">Clinic Address:</span>
                  <span className="text-[11px] font-medium text-[#15271C] text-right truncate">
                    AIIMS Road, Patrapada, Bhubaneswar
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-full">
                <a
                  href={`https://wa.me/${(clinicConfig.whatsapp || "").replace(/[^0-9]/g, "")}?text=Hello%20Excela%20Clinic,%20I%20have%20booked%20slot%20${confirmedBooking.id}%20for%20${encodeURIComponent(confirmedBooking.patientName)}%20on%20${confirmedBooking.date}%20at%20${confirmedBooking.time}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs tracking-wide shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>

                <button
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#16291E] hover:bg-[#223F2D] text-[#F3E7C4] font-semibold text-xs tracking-wide transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form Flow */
            <form onSubmit={handleBookingSubmit} className="space-y-6 w-full max-w-full overflow-x-hidden">
              {/* Category Switcher: Doctor Consultation vs Diagnostic Test */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#EBEFEA] border border-[#D5E1D7] w-full max-w-full">
                <button
                  type="button"
                  onClick={() => setBookingType("doctor")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    bookingType === "doctor"
                      ? "bg-[#16291E] text-[#F3E7C4] shadow-sm"
                      : "text-[#3D5647] hover:text-[#16291E]"
                  }`}
                >
                  <Stethoscope className="w-4 h-4 shrink-0" />
                  <span className="truncate">Doctor Consultation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingType("test")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    bookingType === "test"
                      ? "bg-[#16291E] text-[#F3E7C4] shadow-sm"
                      : "text-[#3D5647] hover:text-[#16291E]"
                  }`}
                >
                  <Microscope className="w-4 h-4 shrink-0" />
                  <span className="truncate">Diagnostic Test</span>
                </button>
              </div>

              {/* Target Selector */}
              {bookingType === "doctor" ? (
                <div className="w-full max-w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1D3325] mb-2">
                    Specialist
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-full">
                    {doctors.map(doc => (
                      <button
                        type="button"
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer overflow-hidden ${
                          selectedDoctorId === doc.id
                            ? "border-[#C9A84C] bg-[#FAF8F2] shadow-sm ring-1 ring-[#C9A84C]"
                            : "border-[#D8E4DA] bg-white hover:border-[#B4CCB8]"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#C9A84C]/40 bg-white">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#14261B] truncate">{doc.name}</div>
                          <div className="text-[10px] text-[#557760] truncate">{doc.role}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-full">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1D3325] mb-2">
                    Diagnostic Test
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-full">
                    {tests.map(t => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setSelectedTestId(t.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer overflow-hidden ${
                          selectedTestId === t.id
                            ? "border-[#C9A84C] bg-[#FAF8F2] shadow-sm ring-1 ring-[#C9A84C]"
                            : "border-[#D8E4DA] bg-white hover:border-[#B4CCB8]"
                        }`}
                      >
                        <div className="text-xs font-bold text-[#14261B] truncate">{t.name}</div>
                        <div className="text-[10px] text-[#557760] truncate">{t.category}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Date Selection */}
              <div className="w-full max-w-full">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1D3325] shrink-0">
                    Date
                  </label>
                  <span className="text-[11px] text-[#71937A] truncate">Today is {todayStr}</span>
                </div>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full max-w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5E3D8] text-sm text-[#182C1F] focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              {/* 15-Minute Slot Grid */}
              <div className="w-full max-w-full">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1D3325] shrink-0">
                    Available Slots
                  </label>
                  <span className="text-[11px] text-[#71937A] truncate">
                    {isTargetAvailable ? `${availableSlots.filter(s => s.isAvailable).length} slots open` : "Off schedule"}
                  </span>
                </div>

                {!isTargetAvailable ? (
                  <div className="p-4 rounded-xl bg-[#FDF4F4] border border-[#F0CECE] text-[#9E3333] text-xs flex items-center gap-2 w-full max-w-full">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Selected specialist is not consulting on this date. Please choose another date.</span>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E7CF86]/50 text-[#7A5B1C] text-xs w-full max-w-full">
                    No active slots configured for this date.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto overflow-x-hidden p-1 w-full max-w-full">
                    {availableSlots.map((slot, idx) => {
                      const isSelected = selectedSlot && selectedSlot.time === slot.time;

                      return (
                        <button
                          type="button"
                          key={idx}
                          disabled={!slot.isAvailable}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer overflow-hidden ${
                            isSelected
                              ? "bg-[#172B1F] text-[#F3E7C4] border border-[#C9A84C] shadow-md"
                              : slot.isAvailable
                              ? "bg-white text-[#1A2C20] border border-[#D5E3D9] hover:border-[#C9A84C] hover:bg-[#F6FAF7]"
                              : slot.isBooked
                              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed line-through"
                              : "bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed"
                          }`}
                        >
                          <div className="truncate">{slot.time}</div>
                          <div className="text-[9px] font-normal opacity-70 truncate">
                            {slot.isBooked ? "Booked" : slot.isPast ? "Passed" : "15 min"}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Patient Details */}
              <div className="space-y-3 pt-2 w-full max-w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-full">
                  <div className="w-full max-w-full">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D3325] mb-1">
                      Full Name *
                    </label>
                    <div className="relative w-full max-w-full">
                      <User className="w-4 h-4 text-[#86A789] absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Patient name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full max-w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#D5E3D8] text-xs sm:text-sm text-[#182C1F] focus:outline-none focus:border-[#C9A84C]"
                      />
                    </div>
                  </div>

                  <div className="w-full max-w-full">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D3325] mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative w-full max-w-full">
                      <Phone className="w-4 h-4 text-[#86A789] absolute left-3 top-3" />
                      <input
                        type="tel"
                        placeholder="10-digit mobile"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full max-w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#D5E3D8] text-xs sm:text-sm text-[#182C1F] focus:outline-none focus:border-[#C9A84C]"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-full">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D3325] mb-1">
                    Reason / Symptom (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Consultation reason"
                    value={patientReason}
                    onChange={(e) => setPatientReason(e.target.value)}
                    className="w-full max-w-full px-3 py-2 rounded-xl bg-white border border-[#D5E3D8] text-xs sm:text-sm text-[#182C1F] focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-[#FDF4F4] border border-[#F0CECE] text-[#9E3333] text-xs flex items-center gap-2 w-full max-w-full">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full max-w-full py-4 rounded-2xl bg-gradient-to-r from-[#172B1F] via-[#24422F] to-[#172B1F] text-[#F3E7C4] hover:text-white border border-[#C9A84C]/60 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>Confirm</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
