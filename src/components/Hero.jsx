import React from "react";
import {
  Calendar,
  Clock,
  ArrowRight,
  Microscope,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";

export default function Hero({ onOpenBooking, doctors = [], tests = [] }) {
  const drChinmayee = doctors.find(d => d.id === "dr-chinmayee") || doctors[0];
  const profAyaskanta = doctors.find(d => d.id === "prof-ayaskanta") || doctors[1];

  const formatDoctorTiming = (doc) => {
    if (!doc || !doc.todayAvailable) return "Not Available Today";
    const parts = [];
    if (doc.todayStartTime && doc.todayEndTime) {
      parts.push(`${formatTime(doc.todayStartTime)} – ${formatTime(doc.todayEndTime)}`);
    }
    if (doc.todayEveningStartTime && doc.todayEveningEndTime) {
      parts.push(`${formatTime(doc.todayEveningStartTime)} – ${formatTime(doc.todayEveningEndTime)}`);
    }
    return parts.length > 0 ? parts.join(" & ") : "Available by Slot";
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${m < 10 ? "0" + m : m} ${period}`;
  };

  return (
    <section className="relative pt-44 sm:pt-48 md:pt-52 pb-20 md:pb-32 bg-sage-gradient overflow-hidden border-b border-[#E2EDE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Essential Clinic Info & Booking CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left animate-fade-in-up">
            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#122217] leading-[1.18] tracking-tight mb-6">
              Premier Healthcare in <br className="hidden sm:inline" />
              <span className="text-[#C9A84C]">Obstetrics, Gastroenterology</span> &amp; Diagnostics.
            </h1>

            {/* Clinical Statement */}
            <p className="text-base sm:text-lg text-[#3D5747] leading-relaxed max-w-xl mb-10 font-normal">
              Senior consultant-led care by <strong className="font-semibold text-[#162B1F]">Dr. Chinmayee Kar</strong> (Gynecology &amp; Obstetrics) and <strong className="font-semibold text-[#162B1F]">Prof. (Dr.) Ayaskanta Singh</strong> (Gastroenterology &amp; Hepatology).
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex justify-center items-center gap-2.5 px-8 py-4 rounded-xl bg-[#14251B] hover:bg-[#1F382A] text-[#F4E8C9] hover:text-white border border-[#C9A84C]/50 shadow-md hover:shadow-lg transition-all text-xs uppercase tracking-wider font-bold cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-[#C9A84C]" />
                <span>Book Direct Slot</span>
                <ArrowRight className="w-4 h-4 text-[#C9A84C] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenBooking("test")}
                className="inline-flex justify-center items-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-[#F2F7F3] text-[#192D21] border border-[#D5E3D8] text-xs uppercase tracking-wider font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Microscope className="w-4 h-4 text-[#C9A84C]" />
                <span>Diagnostics &amp; Scans</span>
              </button>
            </div>

            {/* Today's Doctor Consultation Schedule Card */}
            <div className="w-full bg-white rounded-2xl p-6 sm:p-7 border border-[#E0ECE2] shadow-sm animate-scale-up">
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#EAF2EC]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-xs font-bold text-[#14261B] uppercase tracking-wider">
                    Today's OPD Schedule
                  </span>
                </div>
                <span className="text-[11px] text-[#557760] font-medium">
                  Real-time Desk Status
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dr. Chinmayee Kar Status */}
                <div className="p-4 rounded-xl bg-[#F7FAF8] border border-[#E2EDE5] flex items-center justify-between transition-colors hover:border-[#C9A84C]/40">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/dr-chinmayee.jpg"
                      alt="Dr. Chinmayee Kar"
                      className="w-10 h-10 rounded-lg object-cover object-top border border-[#C9A84C]/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#14261B]">Dr. Chinmayee Kar</div>
                      <div className="text-[11px] text-[#557760]">Obstetrics &amp; Gyn</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[11px] font-bold ${drChinmayee?.todayAvailable ? "text-[#1B7032]" : "text-[#9C3838]"}`}>
                      {drChinmayee?.todayAvailable ? "Available Today" : "Not Today"}
                    </div>
                    <div className="text-[10px] text-[#557760]">
                      {formatDoctorTiming(drChinmayee)}
                    </div>
                  </div>
                </div>

                {/* Prof. Dr. Ayaskanta Singh Status */}
                <div className="p-4 rounded-xl bg-[#F7FAF8] border border-[#E2EDE5] flex items-center justify-between transition-colors hover:border-[#C9A84C]/40">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/dr-ayaskanta.jpg"
                      alt="Prof. Dr. Ayaskanta Singh"
                      className="w-10 h-10 rounded-lg object-cover object-top border border-[#C9A84C]/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#14261B]">Prof. Dr. Ayaskanta Singh</div>
                      <div className="text-[11px] text-[#557760]">Gastroenterology</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[11px] font-bold ${profAyaskanta?.todayAvailable ? "text-[#1B7032]" : "text-[#9C3838]"}`}>
                      {profAyaskanta?.todayAvailable ? "Available Today" : "Not Today"}
                    </div>
                    <div className="text-[10px] text-[#557760]">
                      {formatDoctorTiming(profAyaskanta)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Excela Clinic Reception Portrait */}
          <div className="lg:col-span-5 flex justify-center animate-fade-in-up">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-[#C9A84C]/50 shadow-2xl bg-[#122318] group">
              <img
                src="/assets/clinic-interior.jpg"
                alt="Excela Clinic Reception Suite"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
