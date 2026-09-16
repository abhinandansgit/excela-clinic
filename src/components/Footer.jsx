import React from "react";
import Logo from "./Logo";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck
} from "lucide-react";

export default function Footer({ clinicConfig = {} }) {
  return (
    <footer className="bg-[#0E1A12] text-[#D0DFD4] pt-14 pb-10 border-t border-[#C9A84C]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-3">
            <Logo light size="md" layout="stacked" />
            <p className="text-xs sm:text-sm text-[#9BB5A2] leading-relaxed max-w-md font-normal pt-2">
              Premier multi-specialty facility specializing in Obstetrics, Gynecology, Gastroenterology, Hepatology, and on-site automated laboratory &amp; 3D/4D ultrasound diagnostics.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#E7CF86]">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-xs text-[#9BB5A2]">
              <li>
                <a href="#doctors" className="hover:text-white transition-colors">
                  Dr. Chinmayee Kar (Obs &amp; Gyn)
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white transition-colors">
                  Prof. (Dr.) Ayaskanta Singh (Gastro)
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white transition-colors">
                  High-Risk Pregnancy &amp; Childbirth
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white transition-colors">
                  Liver Disease &amp; Hepatitis Care
                </a>
              </li>
              <li>
                <a href="#diagnostics" className="hover:text-white transition-colors">
                  Ultrasound &amp; Pathology Tests
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#E7CF86]">
              Excela Clinic Location
            </h4>
            <div className="space-y-2.5 text-xs text-[#9BB5A2]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>
                  {clinicConfig.address || "Block B 101, Infront of Vipul Plaza, AIIMS Road, Sijua, Patrapada, Bhubaneswar, Odisha 751019"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>{clinicConfig.timing || "8:00 AM – 9:00 PM Daily"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>{clinicConfig.phone || "+91 674 247 0001"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#789682]">
          <div>
            © {new Date().getFullYear()} Excela Clinic. All rights reserved. Patrapada, Bhubaneswar.
          </div>
          <div className="flex items-center gap-4">
            <span>Specialty Gastro &amp; Liver Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
