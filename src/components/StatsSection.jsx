import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { TRANSITION_EASE } from "../constants/motion";

function CounterItem({ value, suffix, label }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  const [displayNum, setDisplayNum] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const num = parseFloat(value);
    const controls = animate(0, num, {
      duration: 1.8,
      ease: TRANSITION_EASE,
      onUpdate(latest) {
        setDisplayNum(latest);
      }
    });

    return () => controls.stop();
  }, [isInView, value]);

  const isDecimal = value.includes(".");
  const formattedText = isDecimal
    ? displayNum.toFixed(1)
    : Math.floor(displayNum).toLocaleString();

  return (
    <div ref={nodeRef} className="flex flex-col items-center text-center px-4 py-2">
      <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14261B] tracking-tight">
        {isInView ? formattedText : "0"}
        {suffix}
      </div>
      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#557760] mt-1">
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { value: "15", suffix: "+ Years", label: "Specialist Experience" },
    { value: "10000", suffix: "+", label: "Patients Consulted" },
    { value: "99.4", suffix: "%", label: "Diagnostic Accuracy" },
    { value: "2", suffix: " Consultants", label: "Senior OPD Faculty" }
  ];

  return (
    <section className="py-6 sm:py-8 bg-[#F0F5F2] border-y border-[#E0ECE2] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-[#D8E5DC]">
          {stats.map((stat, idx) => (
            <CounterItem key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
