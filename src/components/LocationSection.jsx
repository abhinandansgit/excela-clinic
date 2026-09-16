import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Building
} from "lucide-react";

export default function LocationSection({ clinicConfig = {} }) {
  return (
    <section id="location" className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E2EDE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#122217] tracking-tight">
            Clinic Location &amp; Contact
          </h2>
          <p className="text-sm sm:text-base text-[#4C6856] mt-3 font-normal leading-relaxed">
            Located in Patrapada, Bhubaneswar (AIIMS Road) — directly opposite Vipul Plaza.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Details Card */}
          <div className="lg:col-span-5 clinic-card p-7 sm:p-9 rounded-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Address Block */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F4F8F5] flex items-center justify-center text-[#C9A84C] shrink-0 border border-[#E0ECE2]">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-[#8C6D27]">
                    Address &amp; Landmark
                  </div>
                  <div className="text-sm font-serif font-bold text-[#14261B] mt-1 leading-snug">
                    {clinicConfig.address || "Block B 101, Infront of Vipul Plaza, AIIMS Rd, Sijua, Patrapada, Bhubaneswar, Odisha 751019"}
                  </div>
                  <div className="text-xs text-[#557760] mt-1">
                    Landmark: Directly opposite Vipul Plaza
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#E8EFEA]">
                <div className="w-10 h-10 rounded-lg bg-[#F4F8F5] flex items-center justify-center text-[#C9A84C] shrink-0 border border-[#E0ECE2]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-[#8C6D27]">
                    Operating Hours
                  </div>
                  <div className="text-sm font-bold text-[#14261B] mt-1">
                    {clinicConfig.timing || "08:00 AM – 09:00 PM (Daily)"}
                  </div>
                </div>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#E8EFEA]">
                <div className="w-10 h-10 rounded-lg bg-[#F4F8F5] flex items-center justify-center text-[#C9A84C] shrink-0 border border-[#E0ECE2]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-[#8C6D27]">
                    Telephone Inquiries
                  </div>
                  <div className="text-sm font-bold text-[#14261B] mt-1">
                    {clinicConfig.phone || "+91 674 247 0001"}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={clinicConfig.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Excela+Clinic+Block+B+101+Infront+of+Vipul+Plaza+AIIMS+Road+Patrapada+Bhubaneswar"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#14251B] hover:bg-[#1F382A] text-[#F4E8C9] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#C9A84C]" />
                <span>Get Directions</span>
              </a>

              <a
                href={`https://wa.me/${(clinicConfig.whatsapp || "").replace(/[^0-9]/g, "")}?text=Hello%20Excela%20Clinic,%20I%20need%20directions%20to%20your%20clinic.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#D5E3D8] shadow-sm bg-[#1B2F22] min-h-[360px] relative">
            <iframe
              title="Excela Clinic Location Map"
              src={clinicConfig.mapEmbedUrl || "https://maps.google.com/maps?q=Excela+Clinic,+Block+B+101,+Infront+of+Vipul+Plaza,+AIIMS+Road,+Sijua,+Patrapada,+Bhubaneswar,+Odisha+751019&t=&z=16&ie=UTF8&iwloc=&output=embed"}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
