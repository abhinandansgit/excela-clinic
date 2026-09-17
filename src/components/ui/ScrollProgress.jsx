import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C9A84C] via-[#E7CF86] to-[#C9A84C] z-[60] origin-left shadow-[0_0_10px_rgba(201,168,76,0.5)] pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
