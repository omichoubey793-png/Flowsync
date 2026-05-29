import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className = "w-12 h-12" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${className}`}
    >
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse-glow" />
      
      {/* Main Logo */}
      <svg viewBox="0 0 100 100" className="w-full h-full relative drop-shadow-2xl">
        <defs>
          {/* Gradient */}
          <linearGradient id="dogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          
          {/* Glow Filter */}
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Circle with Gradient */}
        <circle 
          cx="50" 
          cy="50" 
          r="46" 
          fill="url(#dogGradient)"
          filter="url(#glowFilter)"
          className="drop-shadow-lg"
        />

        {/* Dog Face Design */}
        <g transform="translate(50, 52)">
          {/* Left Ear */}
          <ellipse 
            cx="-20" 
            cy="-18" 
            rx="14" 
            ry="20" 
            fill="#7F1D1D"
            transform="rotate(-15)"
            className="drop-shadow-md"
          />
          
          {/* Right Ear */}
          <ellipse 
            cx="20" 
            cy="-18" 
            rx="14" 
            ry="20" 
            fill="#7F1D1D"
            transform="rotate(15)"
            className="drop-shadow-md"
          />
          
          {/* Face Base */}
          <ellipse 
            cx="0" 
            cy="5" 
            rx="26" 
            ry="28" 
            fill="#FEE2E2"
            className="drop-shadow-lg"
          />
          
          {/* Eyes */}
          <ellipse cx="-10" cy="-2" rx="5" ry="6" fill="#1F2937" />
          <ellipse cx="10" cy="-2" rx="5" ry="6" fill="#1F2937" />
          
          {/* Eye Highlights */}
          <circle cx="-8" cy="-4" r="2" fill="white" />
          <circle cx="12" cy="-4" r="2" fill="white" />
          
          {/* Nose */}
          <ellipse cx="0" cy="14" rx="6" ry="5" fill="#1F2937" />
          <ellipse cx="0" cy="13" rx="2.5" ry="1.5" fill="#374151" />
          
          {/* Smile/Mouth */}
          <path 
            d="M -8 22 Q 0 30 8 22" 
            stroke="#1F2937" 
            strokeWidth="2.5" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Sync Waves Below */}
          <g transform="translate(0, 38)">
            <path
              d="M -32 0 Q -16 -8 0 0 Q 16 8 32 0"
              stroke="#DC2626"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M -40 10 Q -20 2 0 10 Q 20 18 40 10"
              stroke="#DC2626"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>
        </g>

        {/* Sparkle Stars */}
        <g className="animate-pulse">
          <circle cx="78" cy="18" r="2.5" fill="white" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="85" cy="30" r="1.5" fill="white" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="15" cy="25" r="1.5" fill="white" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </motion.div>
  );
};

export default Logo;