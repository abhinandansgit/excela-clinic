import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TRANSITION_EASE } from "../../constants/motion";

export default function MagneticButton({
  children,
  onClick,
  className = "",
  variant = "primary", // "primary" | "secondary" | "gold"
  ...props
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    // Only apply magnetic offset for pointer devices, never on keyboard focus
    if (prefersReducedMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Limit max displacement to ~10px for subtle high-end feel
    const distanceX = (clientX - centerX) * 0.2;
    const distanceY = (clientY - centerY) * 0.2;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer overflow-hidden group focus-visible:outline-2 focus-visible:outline-[#C9A84C] focus-visible:outline-offset-2";

  const variantStyles =
    variant === "primary"
      ? "bg-[#0E1A12] text-[#F4E8C9] border border-[#C9A84C]/50 shadow-md shadow-[#0E1A12]/20"
      : variant === "gold"
      ? "bg-gradient-to-r from-[#C9A84C] to-[#E7CF86] text-[#0E1A12] border border-[#C9A84C] shadow-md shadow-[#C9A84C]/20 font-extrabold"
      : "bg-white text-[#192A1F] border border-[#DDE7DF] shadow-xs";

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.4 }}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {/* Fill-sweep background inset */}
      <span
        className={`absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left scale-x-0 group-hover:scale-x-100 ${
          variant === "primary"
            ? "bg-[#182C1E]"
            : variant === "gold"
            ? "bg-[#0E1A12]"
            : "bg-[#F0F5F1]"
        }`}
        aria-hidden="true"
      />

      {/* Text/Content Wrapper */}
      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
          variant === "gold" ? "group-hover:text-[#F4E8C9]" : ""
        }`}
      >
        {children}
      </span>
    </motion.button>
  );
}
