import React from "react";
import {
  Calendar,
  Clock,
  Microscope
} from "lucide-react";

export default function DiagnosticsSection({ tests = [], onBookTest }) {
  return (
    <section id="diagnostics" className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E2EDE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 text-left animate-fade-in-up">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6D27] uppercase tracking-widest mb-3">
            <Microscope className="w-4 h-4 text-[#C9A84C]" />
            <span>Pathology &amp; Ultrasound Suite</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#122217] tracking-tight">
            On-Site Diagnostics &amp; Imaging
          </h2>
          <p className="text-sm sm:text-base text-[#4C6856] mt-3 font-normal leading-relaxed">
            Automated laboratory testing and high-resolution 3D/4D Ultrasound Scans with direct digital report delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Diagnostics Suite Image */}
          <div className="lg:col-span-5 animate-fade-in-up">
            <div className="rounded-2xl overflow-hidden border border-[#C9A84C]/40 shadow-md bg-[#14261B] group">
              <img
                src="/assets/diagnostics.jpg"
                alt="Excela Diagnostics & Ultrasound Room"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Tests & Scans Available */}
          <div className="lg:col-span-7 flex flex-col gap-4 animate-fade-in-up">
            {tests.map((test) => (
              <div
                key={test.id}
                className="clinic-card clinic-card-hover rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[11px] font-semibold text-[#8C6D27] uppercase tracking-wider">
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

                <div className="shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => onBookTest(test.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#14251B] hover:bg-[#1F382A] text-[#F4E8C9] hover:text-white border border-[#C9A84C]/50 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>Book Test Slot</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
