import React from "react";
import { motion } from "framer-motion";
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
import { CARD_STAGGER_VARIANT, TRANSITION_EASE } from "../constants/motion";

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
    <section id="ambiance" className="py-24 sm:py-32 md:py-36 bg-[#FAF9F6] border-b border-[#E2EDE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: TRANSITION_EASE }}
          className="max-w-2xl mb-16 text-left"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#82631D] uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-[#C9A84C]" />
            <span>Patient Comfort Standards</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#122217] tracking-tight">
            Clinic Infrastructure &amp; Amenities
          </h2>
          <p className="text-sm sm:text-base text-[#4C6856] mt-3 font-normal leading-relaxed">
            Designed to ensure patient comfort, privacy, and seamless medical visits.
          </p>
        </motion.div>

        {/* Practical Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CLINIC_AMENITIES.map((amenity, index) => {
            const Icon = iconMap[amenity.icon] || CheckCircle2;

            return (
              <motion.div
                key={amenity.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: TRANSITION_EASE }}
                variants={CARD_STAGGER_VARIANT}
                whileHover={{ y: -3 }}
                className="clinic-card p-5 sm:p-6 rounded-xl text-left flex flex-col justify-between hover:shadow-xl hover:border-[#C9A84C]/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F4F8F5] flex items-center justify-center text-[#C9A84C] mb-4 border border-[#E0ECE2] group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                </div>

                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#16291E] mb-1">
                    {amenity.title}
                  </div>

                  <div className="text-xs text-[#557760] font-normal leading-relaxed">
                    {amenity.short}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
