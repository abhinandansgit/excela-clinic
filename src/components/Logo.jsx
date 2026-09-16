import React from "react";

export default function Logo({ size = "md", light = false, layout = "stacked", className = "" }) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <div className={`flex items-center justify-center select-none cursor-pointer group ${className}`}>
      {/* 
        Official Excela Clinic Logo Crest & Typography (Exact Stacked Style)
        Sunburst Red Crest with central 'E' + Purple Banner 'EXCELA CLINIC' + Red Subtitle 'GASTRO & LIVER CARE'
      */}
      {layout === "stacked" ? (
        <div className="flex flex-col items-center text-center">
          <svg
            viewBox="0 0 260 165"
            className={`${
              isSm ? "w-28 h-16" : isLg ? "w-56 h-36" : "w-34 h-20"
            } filter drop-shadow-sm transition-all duration-300 group-hover:scale-[1.03]`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EE2427" />
                <stop offset="100%" stopColor="#C41518" />
              </linearGradient>
              <linearGradient id="logoPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#54217E" />
                <stop offset="100%" stopColor="#3C125D" />
              </linearGradient>
            </defs>

            {/* Sunburst Rays (Red) */}
            <g fill="url(#logoRedGrad)">
              <polygon points="130,8 125,42 135,42" />
              <polygon points="110,13 115,45 124,42" />
              <polygon points="92,23 105,51 112,45" />
              <polygon points="78,39 97,58 103,51" />
              <polygon points="70,59 92,67 96,58" />
              <polygon points="66,80 91,74 92,66" />
              
              <polygon points="150,13 136,42 145,45" />
              <polygon points="168,23 148,45 155,51" />
              <polygon points="182,39 157,51 163,58" />
              <polygon points="190,59 164,58 168,67" />
              <polygon points="194,80 168,66 169,74" />
            </g>

            {/* Red Arch */}
            <path
              d="M 84,84 A 46,46 0 0,1 176,84 L 162,84 A 32,32 0 0,0 98,84 Z"
              fill="url(#logoRedGrad)"
            />

            {/* Central Letter 'E' inside arch */}
            <text
              x="130"
              y="79"
              fontFamily="'Cinzel', 'Times New Roman', 'Georgia', serif"
              fontSize="28"
              fontWeight="800"
              fill={light ? "#9B4BD8" : "#4A1D6E"}
              textAnchor="middle"
            >
              E
            </text>

            {/* Purple Banner with Rounded Corners */}
            <rect
              x="15"
              y="94"
              width="230"
              height="40"
              rx="6"
              fill={light ? "#56237D" : "url(#logoPurpleGrad)"}
            />
            {/* Banner Text: EXCELA CLINIC */}
            <text
              x="130"
              y="121"
              fontFamily="'Cinzel', 'Times New Roman', 'Georgia', serif"
              fontSize="19.5"
              fontWeight="700"
              letterSpacing="2.5"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              EXCELA CLINIC
            </text>

            {/* Red Subtitle: GASTRO & LIVER CARE */}
            <text
              x="130"
              y="155"
              fontFamily="'Inter', 'Arial', sans-serif"
              fontSize="11.5"
              fontWeight="800"
              letterSpacing="2.8"
              fill={light ? "#FF5A5D" : "url(#logoRedGrad)"}
              textAnchor="middle"
            >
              GASTRO &amp; LIVER CARE
            </text>
          </svg>
        </div>
      ) : (
        // Horizontal Layout Option
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 140 120"
              className={isSm ? "w-9 h-9" : isLg ? "w-13 h-13" : "w-11 h-11"}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="navLogoRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E52326" />
                  <stop offset="100%" stopColor="#BA1316" />
                </linearGradient>
              </defs>

              <g fill="url(#navLogoRed)">
                <polygon points="70,6 66,32 74,32" />
                <polygon points="53,10 58,35 65,32" />
                <polygon points="38,19 49,40 55,35" />
                <polygon points="26,32 42,47 47,40" />
                <polygon points="18,48 37,54 40,47" />
                <polygon points="15,66 36,60 37,53" />
                
                <polygon points="87,10 75,32 82,35" />
                <polygon points="102,19 85,35 91,40" />
                <polygon points="114,32 93,40 98,47" />
                <polygon points="122,48 100,47 103,54" />
                <polygon points="125,66 103,53 104,60" />
              </g>

              <path
                d="M 32,70 A 38,38 0 0,1 108,70 L 97,70 A 27,27 0 0,0 43,70 Z"
                fill="url(#navLogoRed)"
              />

              <text
                x="70"
                y="65"
                fontFamily="'Cinzel', 'Times New Roman', 'Georgia', serif"
                fontSize="24"
                fontWeight="800"
                fill="#4A1D6E"
                textAnchor="middle"
              >
                E
              </text>
            </svg>
          </div>

          <div className="flex flex-col">
            <div
              className={`inline-flex items-center justify-center px-3 py-1 rounded ${
                light ? "bg-[#512076]" : "bg-[#4A1D6E]"
              } shadow-sm border border-purple-900/30`}
            >
              <span
                className={`font-serif tracking-[0.22em] uppercase font-bold text-white ${
                  isSm ? "text-xs tracking-[0.16em]" : isLg ? "text-lg tracking-[0.24em]" : "text-sm md:text-base"
                }`}
              >
                EXCELA CLINIC
              </span>
            </div>
            
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`tracking-[0.2em] uppercase font-extrabold text-[9px] sm:text-[10px] ${
                  light ? "text-[#FF6B6E]" : "text-[#D92528]"
                }`}
              >
                GASTRO &amp; LIVER CARE
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


