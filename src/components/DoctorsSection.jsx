import React, { useState } from "react";
import {
  Clock,
  Calendar,
  ChevronRight,
  GraduationCap,
  Award
} from "lucide-react";

export default function DoctorsSection({ doctors = [], onBookDoctor }) {
  const [expandedDoctors, setExpandedDoctors] = useState({});

  const toggleDoctorExpand = (docId) => {
    setExpandedDoctors(prev => ({ ...prev, [docId]: !prev[docId] }));
  };

  return (
    <section id="doctors" className="py-20 sm:py-28 md:py-32 bg-[#FFFFFF] border-b border-[#E2EDE5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left animate-fade-in-up">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6D27] uppercase tracking-widest mb-3">
            <Award className="w-4 h-4 text-[#C9A84C]" />
            <span>Senior Medical Faculty</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#122217] tracking-tight">
            Consultant Specialists
          </h2>
          <p className="text-sm sm:text-base text-[#4C6856] mt-3 font-normal leading-relaxed">
            Direct OPD consultations with distinguished medical experts at Excela Clinic, Bhubaneswar.
          </p>
        </div>

        {/* Two Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {doctors.map((doctor) => {
            const isExpanded = expandedDoctors[doctor.id];
            const visibleFocus = isExpanded ? doctor.treatments : doctor.treatments.slice(0, 5);
            const hiddenCount = doctor.treatments.length - 5;

            return (
              <div
                key={doctor.id}
                className="clinic-card clinic-card-hover rounded-2xl p-6 sm:p-9 flex flex-col justify-between animate-fade-in-up"
              >
                <div>
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {/* Portrait Image */}
                    <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden border border-[#C9A84C]/40 shrink-0 bg-[#F4F8F5] shadow-xs group">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-[#557760] mb-1 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#C9A84C]" />
                        <span>{doctor.qualifications}</span>
                      </div>

                      <h3 className="font-serif text-2xl text-[#122217] font-semibold tracking-tight">
                        {doctor.name}
                      </h3>

                      <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A84C] mt-1 mb-3">
                        {doctor.role}
                      </p>

                      <div className="text-xs text-[#284232] font-medium bg-[#F4F8F5] px-3 py-1.5 rounded-lg inline-block border border-[#E0ECE2] mb-3">
                        {doctor.experience} Clinical Practice
                      </div>

                      <p className="text-xs sm:text-sm text-[#46604F] leading-relaxed font-normal">
                        {doctor.bio}
                      </p>
                    </div>
                  </div>

                  {/* Treatments Focus Areas */}
                  <div className="mt-6 pt-5 border-t border-[#E8EFEA]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#1C3224]">
                        Specialized Clinical Focus
                      </div>

                      {doctor.treatments.length > 5 && (
                        <button
                          type="button"
                          onClick={() => toggleDoctorExpand(doctor.id)}
                          className="text-xs font-bold text-[#8C6D27] hover:text-[#14251B] transition-colors cursor-pointer"
                        >
                          {isExpanded ? "See Less" : `See All (${doctor.treatments.length})`}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {visibleFocus.map((item) => (
                        <span
                          key={item.id}
                          className="px-3 py-1 rounded-md text-xs font-medium bg-[#F6FAF7] text-[#1E3326] border border-[#DAE7DE]"
                        >
                          {item.name}
                        </span>
                      ))}

                      {!isExpanded && hiddenCount > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleDoctorExpand(doctor.id)}
                          className="px-3 py-1 rounded-md text-xs font-semibold bg-[#FAF8F2] text-[#7A5C1B] border border-[#E7CF86]/50 hover:bg-[#F3EDDA] transition-colors cursor-pointer"
                        >
                          +{hiddenCount} more
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-8 pt-5 border-t border-[#E8EFEA] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#4A6453]">
                    <Clock className="w-4 h-4 text-[#C9A84C]" />
                    <span>
                      {doctor.todayAvailable
                        ? "Consultations available today"
                        : "Schedule updated daily"}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookDoctor(doctor.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#14251B] hover:bg-[#1F382A] text-[#F4E8C9] hover:text-white border border-[#C9A84C]/50 text-xs font-bold uppercase tracking-wider shadow-xs transition-all cursor-pointer group"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>Book Consultation</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#C9A84C] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
