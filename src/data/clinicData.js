// Default Clinic Data & Schedules for Excela Clinic

export const INITIAL_CLINIC_CONFIG = {
  name: "Excela Clinic",
  tagline: "Premier Multi-Specialty Care & Advanced Diagnostics",
  subtitle: "A serene healing space crafted for compassionate gynecology, gastroenterology, and precision diagnostics.",
  address: "Block B 101, In front of Vipul Plaza, AIIMS Road, Sijua, Patrapada, Bhubaneswar, Odisha 751019",
  landmark: "Directly opposite Vipul Plaza, AIIMS Road",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Excela+Clinic+Block+B+101+Infront+of+Vipul+Plaza+AIIMS+Road+Patrapada+Bhubaneswar",
  mapEmbedUrl: "https://maps.google.com/maps?q=Excela+Clinic,+Block+B+101,+Infront+of+Vipul+Plaza,+AIIMS+Road,+Sijua,+Patrapada,+Bhubaneswar,+Odisha+751019&t=&z=16&ie=UTF8&iwloc=&output=embed",
  phone: "+91 94370 28945",
  whatsapp: "+919437028945",
  email: "care@excelaclinic.com",
  timing: "08:00 AM – 09:00 PM (Monday – Sunday)",
  adminPin: "excela123"
};

export const INITIAL_DOCTORS = [
  {
    id: "dr-chinmayee",
    name: "Dr. Chinmayee Kar",
    role: "Senior Obstetrician & Gynecologist",
    qualifications: "MBBS, MS (Obstetrics & Gynecology)",
    experience: "12+ Years Clinical Excellence",
    image: "/assets/dr-chinmayee.jpg",
    bio: "Specializing in compassionate women's healthcare, high-risk pregnancy management, painless childbirth, and minimally invasive gynecological laparoscopic care.",
    badge: "Women's Health Specialist",
    slotDurationMinutes: 15,
    todayAvailable: true,
    todayStartTime: "10:00",
    todayEndTime: "14:00",
    todayEveningStartTime: "17:30",
    todayEveningEndTime: "20:30",
    treatments: [
      { id: "normal-delivery", name: "Normal Delivery & C-Section", tag: "Maternity" },
      { id: "high-risk-pregnancy", name: "High-Risk Pregnancy Care", tag: "Antenatal" },
      { id: "infertility-ivf", name: "Infertility & IVF Counseling", tag: "Fertility" },
      { id: "pcod-pcos", name: "PCOD / PCOS Holistic Care", tag: "Endocrine" },
      { id: "prenatal-antenatal", name: "Prenatal & Antenatal Checkups", tag: "Maternity" },
      { id: "menstrual-disorders", name: "Menstrual Disorders & Pain", tag: "Gynecology" },
      { id: "laparoscopy", name: "Minimally Invasive Laparoscopic Surgery", tag: "Surgical" },
      { id: "hysterectomy", name: "Advanced Hysterectomy Procedures", tag: "Surgical" },
      { id: "pap-smear", name: "Cervical Cancer Screening (Pap Smear)", tag: "Preventive" },
      { id: "family-planning", name: "Family Planning & Contraception", tag: "Wellness" },
      { id: "adolescent-gyn", name: "Adolescent Gynecological Health", tag: "Adolescent" }
    ]
  },
  {
    id: "prof-ayaskanta",
    name: "Prof. (Dr.) Ayaskanta Singh",
    role: "Senior Consultant Gastroenterologist & Hepatologist",
    qualifications: "MBBS (Gold Medalist), MD, DM (Gastroenterology)",
    experience: "18+ Years Academic & Clinical Leadership",
    image: "/assets/dr-ayaskanta.jpg",
    bio: "Renowned Professor and Gold Medalist gastroenterologist offering expert diagnosis and advanced therapeutic care for complex liver, gastrointestinal, and pancreatic conditions.",
    badge: "Gold Medalist • Professor",
    slotDurationMinutes: 15,
    todayAvailable: true,
    todayStartTime: "17:00",
    todayEndTime: "21:00",
    todayEveningStartTime: "",
    todayEveningEndTime: "",
    treatments: [
      { id: "liver-disease", name: "Liver Disease & Cirrhosis Management", tag: "Hepatology" },
      { id: "peptic-ulcer-gerd", name: "Peptic Ulcers, Acid Reflux & GERD", tag: "Gastric" },
      { id: "hepatitis", name: "Hepatitis B & C Specialized Protocols", tag: "Hepatology" },
      { id: "pancreatic-disorders", name: "Pancreatitis & Pancreatic Disorders", tag: "Pancreas" },
      { id: "gallbladder-bile", name: "Gallbladder & Bile Duct Disorders", tag: "Biliary" },
      { id: "jaundice-management", name: "Acute & Chronic Jaundice Evaluation", tag: "Liver" },
      { id: "general-gastro", name: "Comprehensive Gastro Consultation", tag: "Consultation" },
      { id: "endoscopy-screening", name: "Endoscopy & Colonoscopy Assessment", tag: "Diagnostic" }
    ]
  }
];

export const INITIAL_TESTS = [
  {
    id: "blood-panel",
    name: "Complete Blood & Pathology Panel",
    category: "Pathology",
    description: "CBC, HbA1c, Thyroid (TSH, T3, T4), Liver & Kidney Function Tests, Lipid Profile, Hormones.",
    duration: "10 min sample collection",
    turnaround: "Reports in 2 - 4 hours",
    todayAvailable: true,
    startTime: "08:00",
    endTime: "19:00",
    items: ["Complete Blood Count (CBC)", "Thyroid Profile (T3, T4, TSH)", "HbA1c & Fasting Blood Sugar", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Lipid & Cardiac Profile"]
  },
  {
    id: "ultrasound-sonography",
    name: "Advanced Ultrasound & Sonography (USG)",
    category: "Imaging",
    description: "High-resolution 3D/4D Obstetric, Pelvic, Whole Abdomen, Follicular Study & Doppler.",
    duration: "15 min scan slot",
    turnaround: "Instant Report with Doctor Consultation",
    todayAvailable: true,
    startTime: "09:00",
    endTime: "18:00",
    items: ["Obstetric 3D/4D Pregnancy Scan", "Pelvic & Gynecology USG", "Whole Abdomen & KUB", "Follicular Monitoring", "Anomaly Scan", "Upper GI Sonogram"]
  },
  {
    id: "urine-stool",
    name: "Urine & Stool Specialized Diagnostics",
    category: "Clinical Pathology",
    description: "Routine examination, microscopic inspection, occult blood, culture and sensitivity testing.",
    duration: "5 min sample drop / test",
    turnaround: "Same-day digital reports",
    todayAvailable: true,
    startTime: "08:00",
    endTime: "20:00",
    items: ["Urine Routine & Microscopy", "Urine Culture & Sensitivity", "Stool Routine & Occult Blood", "Pregnancy Urine Test (UPT)"]
  }
];

export const CLINIC_AMENITIES = [
  {
    id: "pathology",
    title: "In-House Pathology Lab",
    short: "Automated analyzers for instant and accurate diagnostic results.",
    icon: "FlaskConical"
  },
  {
    id: "minor-ot",
    title: "Minor Procedure Suite",
    short: "Sterile day-care suite for minor gynecological & clinical procedures.",
    icon: "ShieldPlus"
  },
  {
    id: "emergency",
    title: "Emergency Readiness",
    short: "Immediate clinical stabilization and direct referral coordination.",
    icon: "HeartPulse"
  },
  {
    id: "wheelchair",
    title: "Wheelchair Accessible",
    short: "Step-free ramp entry, wide doorways, and accessible patient suites.",
    icon: "Accessibility"
  },
  {
    id: "wifi",
    title: "Lounge Wi-Fi & Ambiance",
    short: "Peaceful acoustic waiting lounge with high-speed complimentary Wi-Fi.",
    icon: "Wifi"
  },
  {
    id: "parking",
    title: "Dedicated Parking",
    short: "Spacious car and two-wheeler parking directly in front of clinic.",
    icon: "Car"
  },
  {
    id: "ac",
    title: "Climate & Air Purity",
    short: "Central climate control with high-grade HEPA filtered ventilation.",
    icon: "Wind"
  },
  {
    id: "privacy",
    title: "Acoustic Privacy Cabins",
    short: "Soundproof consultation cabins with frosted glass architectural design.",
    icon: "Lock"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "BK-1001",
    type: "doctor",
    targetId: "dr-chinmayee",
    targetName: "Dr. Chinmayee Kar",
    patientName: "Sunita Mohanty",
    patientPhone: "+91 98610 44210",
    date: new Date().toISOString().split("T")[0],
    time: "10:30 AM",
    reason: "Antenatal Routine Checkup",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "BK-1002",
    type: "doctor",
    targetId: "prof-ayaskanta",
    targetName: "Prof. (Dr.) Ayaskanta Singh",
    patientName: "Debasis Pattnaik",
    patientPhone: "+91 94371 88200",
    date: new Date().toISOString().split("T")[0],
    time: "05:15 PM",
    reason: "Fatty Liver & Acid Reflux Consultation",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: "BK-1003",
    type: "test",
    targetId: "ultrasound-sonography",
    targetName: "Advanced Ultrasound & Sonography (USG)",
    patientName: "Rashmita Jena",
    patientPhone: "+91 70081 99234",
    date: new Date().toISOString().split("T")[0],
    time: "11:15 AM",
    reason: "Pelvic USG & Follicular Scan",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 1800000).toISOString()
  }
];
