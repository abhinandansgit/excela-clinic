import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DoctorsSection from "./components/DoctorsSection";
import TreatmentsSection from "./components/TreatmentsSection";
import DiagnosticsSection from "./components/DiagnosticsSection";
import ClinicAmbiance from "./components/ClinicAmbiance";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import ManagePage from "./components/ManagePage";
import Preloader from "./components/Preloader";
import ScrollRevealWrapper from "./components/ScrollRevealWrapper";
import FloatingMobileDock from "./components/FloatingMobileDock";
import LenisProvider from "./components/ui/LenisProvider";
import ScrollProgress from "./components/ui/ScrollProgress";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import {
  INITIAL_CLINIC_CONFIG,
  INITIAL_DOCTORS,
  INITIAL_TESTS,
  INITIAL_BOOKINGS
} from "./data/clinicData";
import { Calendar, MessageCircle, Phone } from "lucide-react";

export default function App() {
  // Preloader state
  const [isLoading, setIsLoading] = useState(true);

  // Current route detection for /manage
  const [currentPath, setCurrentPath] = useState(() => {
    const p = window.location.pathname;
    const h = window.location.hash;
    return p === "/manage" || h === "#manage" ? "/manage" : "/";
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const p = window.location.pathname;
      const h = window.location.hash;
      if (p === "/manage" || h === "#manage") {
        setCurrentPath("/manage");
      } else {
        setCurrentPath("/");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigateToHome = () => {
    if (window.location.pathname === "/manage") {
      window.history.pushState({}, "", "/");
    }
    if (window.location.hash === "#manage") {
      window.location.hash = "";
    }
    setCurrentPath("/");
  };

  // Persistent clinic state
  const [clinicConfig, setClinicConfig] = useState(() => {
    const saved = localStorage.getItem("excela_clinic_config");
    return saved ? JSON.parse(saved) : INITIAL_CLINIC_CONFIG;
  });

  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem("excela_doctors");
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });

  const [tests, setTests] = useState(() => {
    const saved = localStorage.getItem("excela_tests");
    return saved ? JSON.parse(saved) : INITIAL_TESTS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("excela_bookings");
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Booking Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState("doctor");
  const [bookingTargetId, setBookingTargetId] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("excela_doctors", JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem("excela_tests", JSON.stringify(tests));
  }, [tests]);

  useEffect(() => {
    localStorage.setItem("excela_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("excela_clinic_config", JSON.stringify(clinicConfig));
  }, [clinicConfig]);

  // Booking handlers
  const handleOpenBooking = (type = "doctor", targetId = null) => {
    setBookingType(type);
    setBookingTargetId(targetId);
    setIsBookingOpen(true);
  };

  const handleBookDoctor = (doctorId) => {
    handleOpenBooking("doctor", doctorId);
  };

  const handleBookTest = (testId) => {
    handleOpenBooking("test", testId);
  };

  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateDoctors = (updatedDoctors) => {
    setDoctors(updatedDoctors);
  };

  const handleUpdateTests = (updatedTests) => {
    setTests(updatedTests);
  };

  const handleUpdateBookings = (updatedBookings) => {
    setBookings(updatedBookings);
  };

  const handleResetData = () => {
    setDoctors(INITIAL_DOCTORS);
    setTests(INITIAL_TESTS);
    setBookings(INITIAL_BOOKINGS);
    setClinicConfig(INITIAL_CLINIC_CONFIG);
    localStorage.removeItem("excela_doctors");
    localStorage.removeItem("excela_tests");
    localStorage.removeItem("excela_bookings");
    localStorage.removeItem("excela_clinic_config");
  };

  // If viewing /manage or #manage, render the dedicated Staff Portal Page
  if (currentPath === "/manage") {
    return (
      <ManagePage
        doctors={doctors}
        tests={tests}
        bookings={bookings}
        clinicConfig={clinicConfig}
        onUpdateDoctors={handleUpdateDoctors}
        onUpdateTests={handleUpdateTests}
        onUpdateBookings={handleUpdateBookings}
        onResetData={handleResetData}
        onNavigateHome={navigateToHome}
      />
    );
  }

  // Public Clinic Website with Loading Screen & Smooth Scroll Reveal System
  return (
    <LenisProvider>
      <ScrollProgress />
      <div className="min-h-screen bg-[#FAF9F6] text-[#192A1F] flex flex-col font-sans selection:bg-[#C9A84C]/30 selection:text-[#132218] relative">
        {/* Initial Page Loading Screen */}
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}

        {/* Navigation */}
        <Navbar
          onOpenBooking={() => handleOpenBooking("doctor")}
          doctors={doctors}
          clinicConfig={clinicConfig}
        />

        {/* Main Public Content with Smooth Scroll Reveal */}
        <main className="flex-1">
          <ScrollRevealWrapper>
            <Hero
              onOpenBooking={handleOpenBooking}
              doctors={doctors}
              tests={tests}
            />
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={100}>
            <DoctorsSection
              doctors={doctors}
              onBookDoctor={handleBookDoctor}
            />
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={100}>
            <StatsSection />
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={100}>
            <TreatmentsSection
              onBookDoctor={handleBookDoctor}
              onBookTest={handleBookTest}
            />
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={100}>
            <DiagnosticsSection
              tests={tests}
              onBookTest={handleBookTest}
            />
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={100}>
            <TestimonialsSection />
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={100}>
            <ClinicAmbiance />
          </ScrollRevealWrapper>

          <ScrollRevealWrapper delay={100}>
            <LocationSection
              clinicConfig={clinicConfig}
            />
          </ScrollRevealWrapper>
        </main>

        {/* Footer */}
        <Footer
          clinicConfig={clinicConfig}
          onOpenBooking={() => handleOpenBooking("doctor")}
        />

        {/* Sticky Animated Mobile Quick-Action Dock */}
        <FloatingMobileDock
          onOpenBooking={handleOpenBooking}
          clinicConfig={clinicConfig}
        />

        {/* Patient Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          doctors={doctors}
          tests={tests}
          bookings={bookings}
          onAddBooking={handleAddBooking}
          initialType={bookingType}
          initialTargetId={bookingTargetId}
          clinicConfig={clinicConfig}
        />
      </div>
    </LenisProvider>
  );
}

