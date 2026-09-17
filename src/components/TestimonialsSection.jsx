import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, HeartHandshake } from "lucide-react";
import { TRANSITION_EASE } from "../constants/motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priyanka Sahoo",
    location: "Khandagiri, Bhubaneswar",
    doctor: "Dr. Chinmayee Kar",
    role: "Obstetrics Patient",
    rating: 5,
    quote:
      "Dr. Chinmayee Kar handled my high-risk pregnancy with incredible care and expertise. Her patient and reassuring demeanor made all the difference during my delivery. Excela Clinic is clean, comfortable, and well-managed."
  },
  {
    id: 2,
    name: "Ramesh Chandra Das",
    location: "Patrapada, Bhubaneswar",
    doctor: "Prof. (Dr.) Ayaskanta Singh",
    role: "Gastroenterology Patient",
    rating: 5,
    quote:
      "Prof. Ayaskanta Singh diagnosed my chronic liver ailment accurately after months of uncertainty elsewhere. The treatment plan was clear, effective, and the diagnostic reports were delivered promptly on my phone."
  },
  {
    id: 3,
    name: "Sunita Mohanty",
    location: "Nayapalli, Bhubaneswar",
    doctor: "Excela Diagnostic Suite",
    role: "Ultrasound & Pathology Patient",
    rating: 5,
    quote:
      "The 4D USG scan experience at Excela Clinic was smooth and detailed. The ultrasound doctor explained everything clearly during the scan, and the lab staff were gentle and professional."
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: TRANSITION_EASE }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4, ease: TRANSITION_EASE }
    })
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E2EDE5] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#82631D] uppercase tracking-widest mb-3">
            <HeartHandshake className="w-4 h-4 text-[#C9A84C]" />
            <span>Patient Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#122217] tracking-tight">
            Trusted by Families across Odisha
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-[#E0ECE2] shadow-xl shadow-[#122217]/5 min-h-[320px] flex flex-col justify-between">
          <Quote className="w-12 h-12 text-[#C9A84C]/20 absolute top-8 left-8 pointer-events-none" />

          <div className="relative overflow-hidden min-h-[180px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col justify-between"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#182C1F] italic leading-relaxed mb-8">
                  "{currentTestimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#EAF2EC]">
                  <div>
                    <h4 className="font-bold text-base text-[#122217]">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-xs text-[#557760]">
                      {currentTestimonial.role} &bull; {currentTestimonial.location}
                    </p>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-[#82631D] bg-[#FAF8F2] px-3 py-1.5 rounded-full border border-[#E7CF86]/50 self-start sm:self-auto">
                    {currentTestimonial.doctor}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between pt-8 mt-4 border-t border-[#EAF2EC]/50">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-8 bg-[#C9A84C]"
                      : "w-2 bg-[#D0DFD4] hover:bg-[#A8C4B0]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#DDE7DF] hover:border-[#C9A84C] bg-white hover:bg-[#F4F8F5] text-[#192A1F] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-[#192A1F]" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#DDE7DF] hover:border-[#C9A84C] bg-white hover:bg-[#F4F8F5] text-[#192A1F] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-[#192A1F]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
