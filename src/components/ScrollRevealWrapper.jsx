import React from "react";
import { motion } from "framer-motion";
import { FADE_IN_UP_VARIANT, TRANSITION_EASE } from "../constants/motion";

export default function ScrollRevealWrapper({
  children,
  className = "",
  delay = 0
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: TRANSITION_EASE
      }}
      variants={FADE_IN_UP_VARIANT}
      className={className}
    >
      {children}
    </motion.div>
  );
}
