import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Sparkles, Activity } from "lucide-react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 5;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 200);
      } else {
        setProgress(current);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09150C] text-[#F3E7C4] transition-opacity duration-500 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Central Official Logo & Progress Counter */}
      <div className="flex flex-col items-center text-center px-6 max-w-sm w-full">
        {/* Official Excela Logo Component */}
        <div className="mb-8 transform scale-110 sm:scale-125">
          <Logo size="lg" light={true} layout="stacked" />
        </div>

        {/* Active Working Progress Bar */}
        <div className="w-full h-2 bg-[#172D1E] rounded-full overflow-hidden p-0.5 border border-[#C9A84C]/40 relative mb-3 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#C9A84C] via-[#F3E7C4] to-[#C9A84C] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status & Progress Indicator */}
        <div className="flex items-center justify-between w-full text-[11px] font-mono tracking-widest text-[#8AA894]">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#C9A84C] animate-spin" />
            <span>INITIALIZING MEDICAL SUITE</span>
          </span>
          <span className="font-bold text-[#E3C472]">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
