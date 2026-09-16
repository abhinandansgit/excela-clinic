import React, { useState, useEffect } from "react";
import { Phone, Calendar, MessageCircle } from "lucide-react";

export default function FloatingMobileDock({ onOpenBooking, clinicConfig = {} }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      
      // Footer proximity threshold (500px from page bottom or inside footer)
      const nearFooter = windowHeight + scrollY >= fullHeight - 480;

      // Expand after scrolling past Hero top (120px) AND not near footer
      if (scrollY > 120 && !nearFooter) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const phoneHref = `tel:${(clinicConfig.phone || "").replace(/[^0-9+]/g, "")}`;
  const whatsappHref = `https://wa.me/${(clinicConfig.whatsapp || "").replace(/[^0-9]/g, "")}`;

  return (
    <div className="md:hidden fixed bottom-4 right-4 z-40 flex items-center justify-end">
      <div
        className={`flex items-center p-1.5 rounded-full bg-[#0E1B13]/95 backdrop-blur-xl border border-[#C9A84C]/50 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "w-[calc(100vw-2rem)] max-w-sm pl-2" : "w-13"
        }`}
      >
        {/* Left Pop-out Action Buttons (Book Slot & WhatsApp) */}
        <div
          className={`flex items-center gap-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded
              ? "flex-1 opacity-100 max-w-[320px] translate-x-0"
              : "w-0 opacity-0 max-w-0 translate-x-10 pointer-events-none"
          }`}
        >
          {/* Book Slot CTA */}
          <button
            onClick={() => onOpenBooking("doctor")}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E3C472] text-[#112015] text-xs font-bold uppercase tracking-wider shadow-md shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            <Calendar className="w-3.5 h-3.5 text-[#112015]" />
            <span className="truncate">Book Slot</span>
          </button>

          {/* WhatsApp CTA */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shrink-0 active:scale-95 transition-transform"
            aria-label="WhatsApp Contact"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>
        </div>

        {/* Anchor Phone Call Button (Always on right end) */}
        <a
          href={phoneHref}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
            isExpanded
              ? "bg-white/10 text-[#E3C472] border border-white/15 ml-1"
              : "bg-gradient-to-r from-[#C9A84C] to-[#E3C472] text-[#0E1B13] shadow-lg scale-105"
          }`}
          aria-label="Call Excela Clinic Desk"
        >
          <Phone className={`w-4 h-4 ${isExpanded ? "" : "fill-current"}`} />
        </a>
      </div>
    </div>
  );
}
