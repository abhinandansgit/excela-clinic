import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Calendar,
  Menu,
  X,
  Sparkles
} from "lucide-react";

export default function Navbar({
  onOpenBooking,
  doctors = [],
  clinicConfig = {}
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Doctors", href: "#doctors" },
    { name: "Treatments", href: "#treatments" },
    { name: "Diagnostics", href: "#diagnostics" },
    { name: "The Clinic", href: "#ambiance" },
    { name: "Location", href: "#location" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
        {/* Top Micro-Bar */}
        <div className="bg-[#0E1A12] text-[#DFE7E1] text-xs py-1.5 px-4 border-b border-[#C9A84C]/20 transition-all relative z-50">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            {/* Location & Timings */}
            <div className="flex items-center gap-4 text-[11px] md:text-xs">
              <span className="flex items-center gap-1.5 text-[#E7CF86] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span className="hidden sm:inline">AIIMS Road, Patrapada, Bhubaneswar</span>
                <span className="sm:hidden">Patrapada, Bhubaneswar</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5 text-white/70">
                <Clock className="w-3.5 h-3.5 text-[#8BA793]" />
                <span>{clinicConfig.timing || "8:00 AM – 9:00 PM Daily"}</span>
              </span>
            </div>

            {/* Quick WhatsApp Contact */}
            <div className="flex items-center gap-3 text-[11px] md:text-xs ml-auto">
              <a
                href={`https://wa.me/${(clinicConfig.whatsapp || "").replace(/[^0-9]/g, "")}?text=Hello%20Excela%20Clinic,%20I%20would%20like%20to%20inquire%20about%20appointment%20slots.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#9FE3B1] hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="hidden sm:inline">WhatsApp Inquiries</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Floating Glass Navbar */}
        <div className="px-3 sm:px-6 pt-2 pb-1">
          <nav
            className={`max-w-7xl mx-auto rounded-2xl md:rounded-full transition-all duration-500 border ${
              scrolled
                ? "bg-[#14251B]/95 backdrop-blur-xl border-[#C9A84C]/40 shadow-2xl shadow-black/30 py-2.5 px-4 sm:px-6 text-white"
                : "bg-white/90 backdrop-blur-lg border-[#DDE7DF] hover:border-[#C9A84C]/50 shadow-xl shadow-[#122217]/5 py-3 px-4 sm:px-6 text-[#1A2C20]"
            }`}
          >
            <div className="flex justify-between items-center">
              {/* Logo */}
              <a href="#" className="flex items-center shrink-0">
                <Logo size={scrolled ? "sm" : "md"} light={scrolled} />
              </a>

              {/* Desktop Nav Items */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                {navLinks.map((link) => {
                  const isActive = activeHash === link.href;

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setActiveHash(link.href)}
                      className={`text-[12px] uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full transition-all duration-300 relative group ${
                        scrolled
                          ? isActive
                            ? "text-[#F4E8C9] bg-white/10 border border-[#C9A84C]/40"
                            : "text-white/80 hover:text-[#F4E8C9] hover:bg-white/5"
                          : isActive
                          ? "text-[#182C1F] bg-[#F0F6F2] border border-[#C9A84C]/50 font-bold"
                          : "text-[#283F30] hover:text-[#C9A84C] hover:bg-[#F4F8F5]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#C9A84C] rounded-full transition-all duration-300 group-hover:w-1/2" />
                    </a>
                  );
                })}
              </div>

              {/* Action CTAs */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => onOpenBooking()}
                  className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-[#172B1F] via-[#24422F] to-[#172B1F] text-[#F4E8C9] hover:text-white border border-[#C9A84C]/60 hover:border-[#C9A84C] shadow-lg shadow-[#172B1F]/20 hover:shadow-xl hover:shadow-[#C9A84C]/25 transition-all duration-300 hover:scale-[1.03] cursor-pointer group"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Book Appointment</span>
                </button>
              </div>

              {/* Mobile Navigation Toggle */}
              <div className="lg:hidden flex items-center gap-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#172B1F] text-[#F4E8C9] border border-[#C9A84C]/50 shadow-sm"
                >
                  Book
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-xl border transition-all ${
                    scrolled
                      ? "text-white border-white/20 hover:bg-white/10"
                      : "text-[#1B2F22] border-[#D5E3D8] hover:bg-[#F0F6F2]"
                  }`}
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown (Clean links only, no Book button inside) */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-3 pt-3 border-t border-[#C9A84C]/30 animate-in slide-in-from-top duration-300">
                <div className="flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        setActiveHash(link.href);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-sm font-semibold tracking-wide py-2.5 px-4 rounded-xl border transition-colors ${
                        scrolled
                          ? "text-white hover:bg-white/10 border-white/10"
                          : "text-[#1C3023] hover:bg-[#F0F6F2] border-[#E2EDE5]"
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Full-Screen Backdrop Blur Overlay when Mobile Menu is Open */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-[#0A180E]/70 backdrop-blur-xl animate-in fade-in duration-300 lg:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}
