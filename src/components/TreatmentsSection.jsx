import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Stethoscope
} from "lucide-react";

export default function TreatmentsSection({ onBookDoctor, onBookTest }) {
  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowAll(false);
  };

  const treatmentCategories = [
    { id: "all", label: "All Treatments" },
    { id: "gyn", label: "Obstetrics & Gynecology" },
    { id: "gastro", label: "Gastroenterology & Liver" },
    { id: "diagnostics", label: "Diagnostics & Scans" }
  ];

  const allTreatments = [
    // Gynecology & Obstetrics (Dr. Chinmayee Kar)
    {
      id: "normal-delivery",
      category: "gyn",
      title: "Normal Delivery & C-Section",
      doctor: "Dr. Chinmayee Kar",
      tag: "Maternity",
      doctorId: "dr-chinmayee",
      highlight: "Comprehensive labor support, painless delivery options & surgical care."
    },
    {
      id: "high-risk-pregnancy",
      category: "gyn",
      title: "High-Risk Pregnancy Care",
      doctor: "Dr. Chinmayee Kar",
      tag: "Antenatal",
      doctorId: "dr-chinmayee",
      highlight: "Monitoring for gestational diabetes, hypertension & complex pregnancies."
    },
    {
      id: "pcod-pcos",
      category: "gyn",
      title: "PCOD / PCOS Management",
      doctor: "Dr. Chinmayee Kar",
      tag: "Endocrine",
      doctorId: "dr-chinmayee",
      highlight: "Hormonal balancing, lifestyle guidance, and ovulation induction."
    },
    {
      id: "infertility-ivf",
      category: "gyn",
      title: "Infertility Evaluation",
      doctor: "Dr. Chinmayee Kar",
      tag: "Fertility",
      doctorId: "dr-chinmayee",
      highlight: "Fertility assessment, follicular tracking, and conception guidance."
    },
    {
      id: "laparoscopy-hysterectomy",
      category: "gyn",
      title: "Minimally Invasive Surgery",
      doctor: "Dr. Chinmayee Kar",
      tag: "Laparoscopy",
      doctorId: "dr-chinmayee",
      highlight: "Keyhole surgery for ovarian cysts, fibroids, endometriosis & hysterectomy."
    },
    {
      id: "cervical-pap",
      category: "gyn",
      title: "Cervical Cancer Screening",
      doctor: "Dr. Chinmayee Kar",
      tag: "Preventive",
      doctorId: "dr-chinmayee",
      highlight: "On-site Pap smear, HPV testing & preventive gynecological health."
    },

    // Gastroenterology & Hepatology (Prof. Dr. Ayaskanta Singh)
    {
      id: "liver-disease",
      category: "gastro",
      title: "Liver Disease & Cirrhosis",
      doctor: "Prof. (Dr.) Ayaskanta Singh",
      tag: "Hepatology",
      doctorId: "prof-ayaskanta",
      highlight: "Diagnostic staging, fatty liver management & chronic cirrhosis therapy."
    },
    {
      id: "peptic-ulcer-gerd",
      category: "gastro",
      title: "GERD & Peptic Ulcer Therapy",
      doctor: "Prof. (Dr.) Ayaskanta Singh",
      tag: "Gastric Care",
      doctorId: "prof-ayaskanta",
      highlight: "Acid reflux management, H. pylori eradication & ulcer treatment."
    },
    {
      id: "hepatitis-management",
      category: "gastro",
      title: "Hepatitis B & C Management",
      doctor: "Prof. (Dr.) Ayaskanta Singh",
      tag: "Viral Liver",
      doctorId: "prof-ayaskanta",
      highlight: "Targeted antiviral protocols, viral load monitoring & liver protection."
    },
    {
      id: "pancreatic-biliary",
      category: "gastro",
      title: "Pancreatic & Biliary Care",
      doctor: "Prof. (Dr.) Ayaskanta Singh",
      tag: "Pancreas & Bile",
      doctorId: "prof-ayaskanta",
      highlight: "Chronic pancreatitis therapy, gallstone diagnosis & jaundice care."
    },
    {
      id: "jaundice-evaluation",
      category: "gastro",
      title: "Acute Jaundice Diagnostics",
      doctor: "Prof. (Dr.) Ayaskanta Singh",
      tag: "Hepatic Care",
      doctorId: "prof-ayaskanta",
      highlight: "Rapid differential diagnosis of obstructive vs hepatic jaundice."
    },

    // Diagnostics & Scans
    {
      id: "usg-sonography",
      category: "diagnostics",
      title: "3D/4D Obstetric & Abdomen USG",
      doctor: "Excela Diagnostic Suite",
      tag: "Ultrasound",
      isTest: true,
      highlight: "High-definition pregnancy scans, anomaly detection & pelvic imaging."
    },
    {
      id: "blood-pathology",
      category: "diagnostics",
      title: "Automated Pathology Lab",
      doctor: "Excela Pathology Lab",
      tag: "Laboratory",
      isTest: true,
      highlight: "Complete Blood Count, Thyroid, HbA1c, LFT, KFT with rapid report delivery."
    }
  ];

  const filtered = activeTab === "all"
    ? allTreatments
    : allTreatments.filter(t => t.category === activeTab);

  const visibleTreatments = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="treatments" className="py-20 sm:py-28 md:py-32 bg-[#F8FAF8] border-b border-[#E2EDE5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 text-left animate-fade-in-up">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6D27] uppercase tracking-widest mb-3">
            <Stethoscope className="w-4 h-4 text-[#C9A84C]" />
            <span>Outpatient Specializations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#122217] tracking-tight">
            Clinical Services &amp; Treatments
          </h2>
          <p className="text-sm sm:text-base text-[#4F6858] mt-3 font-normal leading-relaxed">
            Targeted consultations, surgical advice, and diagnostic protocols tailored for individual patient recovery.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-10 sm:mb-12 animate-fade-in-up">
          {treatmentCategories.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#14251B] text-[#F4E8C9] border border-[#C9A84C]/50 shadow-xs"
                  : "bg-white text-[#304838] border border-[#D5E3D8] hover:bg-[#F0F5F1]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Treatment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleTreatments.map(item => (
            <div
              key={item.id}
              className="clinic-card clinic-card-hover rounded-xl p-6 flex flex-col justify-between animate-fade-in-up"
            >
              <div>
                <div className="text-[11px] font-semibold text-[#8C6D27] uppercase tracking-wider mb-2">
                  {item.doctor}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#14261B] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4E6657] leading-relaxed font-normal mb-6">
                  {item.highlight}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8EFEA] flex items-center justify-between">
                <span className="text-xs text-[#5A7764] font-medium">
                  {item.tag}
                </span>

                <button
                  onClick={() => {
                    if (item.isTest) {
                      onBookTest();
                    } else {
                      onBookDoctor(item.doctorId);
                    }
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#14251B] hover:text-[#C9A84C] transition-colors cursor-pointer group"
                >
                  <span>Book Slot</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C9A84C] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Seamless See All / See Less Toggle */}
        {filtered.length > 6 && (
          <div className="mt-12 text-center animate-fade-in-up">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F2F7F3] text-[#14251B] border border-[#D5E3D8] hover:border-[#C9A84C]/60 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs group"
            >
              <span>{showAll ? "See Less" : `See All Treatments (${filtered.length})`}</span>
              <ChevronDown className={`w-4 h-4 text-[#C9A84C] transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
