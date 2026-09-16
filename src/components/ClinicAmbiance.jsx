import React from "react";
import {
  FlaskConical,
  ShieldPlus,
  HeartPulse,
  Accessibility,
  Wifi,
  Car,
  Wind,
  Lock,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { CLINIC_AMENITIES } from "../data/clinicData";

export default function ClinicAmbiance() {
  const iconMap = {
    FlaskConical: FlaskConical,
    ShieldPlus: ShieldPlus,
    HeartPulse: HeartPulse,
    Accessibility: Accessibility,
    Wifi: Wifi,
    Car: Car,
    Wind: Wind,
    Lock: Lock
  };

  return (
    <section id="ambiance" className="py-24 md:py-32 bg-[#F8FAF8] border-b border-[#E2EDE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 text-left animate-fade-in-up">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6D27] uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-[#C9A84C]" />
            <span>Patient Comfort Standards</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#122217] tracking-tight">
            Clinic Infrastructure &amp; Amenities
          </h2>
          <p className="text-sm sm:text-base text-[#4C6856] mt-3 font-normal leading-relaxed">
            Designed to ensure patient comfort, privacy, and seamless medical visits.
          </p>
        </div>

        {/* Practical Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
          {CLINIC_AMENITIES.map((amenity) => {
            const Icon = iconMap[amenity.icon] || CheckCircle2;

            return (
              <div
                key={amenity.id}
                className="clinic-card clinic-card-hover p-5 rounded-xl text-left flex flex-col justify-between"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F4F8F5] flex items-center justify-center text-[#C9A84C] mb-3 border border-[#E0ECE2]">
                  <Icon className="w-4 h-4" />
                </div>

                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#16291E] mb-1">
                    {amenity.title}
                  </div>

                  <div className="text-xs text-[#557760] font-normal leading-relaxed">
                    {amenity.short}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
