import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Microscope
} from "lucide-react";
import { CARD_STAGGER_VARIANT, TRANSITION_EASE } from "../constants/motion";

export default function DiagnosticsSection({ tests = [], onBookTest }) {
  return (
    <section id="diagnostics" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E2EDE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: TRANSITION_EASE }}
          className="max-w-2xl mb-12 text-left"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#82631D] uppercase tracking-widest mb-3">
            <Microscope className="w-4 h-4 text-[#C9A84C]" />
            <span>Pathology &amp; Ultrasound Suite</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#122217] tracking-tight">
            On-Site Diagnostics &amp; Imaging
          </h2>
          <p className="text-sm sm:text-base text-[#4C6856] mt-3 font-normal leading-relaxed">
            Automated laboratory testing and high-resolution 3D/4D Ultrasound Scans with direct digital report delivery.
          </p>
        </motion.div>

        {/* Tests & Scans Grid (Clean 2-column layout without side image block) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {tests.map((test, index) => (
            <motion.div
              key={test.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: TRANSITION_EASE }}
              variants={CARD_STAGGER_VARIANT}
              whileHover={{ y: -3 }}
              className="clinic-card rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-5 hover:shadow-xl hover:border-[#C9A84C]/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold text-[#82631D] uppercase tracking-wider">
                    {test.category}
                  </span>
                  <span className="text-xs text-[#557760] font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>{test.turnaround}</span>
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#14261B]">
                  {test.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#4E6657] mt-1 font-normal leading-relaxed">
                  {test.description}
                </p>

                {/* Test Inclusions */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {test.items.slice(0, 5).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] text-[#284232] bg-[#F4F8F5] px-2.5 py-0.5 rounded-md border border-[#E0ECE2]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8EFEA] flex items-center justify-end">
                <button
                  onClick={() => onBookTest(test.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E1A12] hover:bg-[#182C1E] text-[#F4E8C9] hover:text-white border border-[#C9A84C]/50 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Book Test Slot</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
