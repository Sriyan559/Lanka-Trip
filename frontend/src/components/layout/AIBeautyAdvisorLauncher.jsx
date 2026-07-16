'use client';

import React from 'react';

export default function AIBeautyAdvisorLauncher({ onClick, isOpen }) {
  if (isOpen) return null;

  return (
    <>
      <style jsx global>{`
        .ai-advisor-launcher {
          position: fixed;
          right: 24px;
          bottom: 24px;
          width: 64px;
          height: 64px;
          border-radius: 999px;
          background: radial-gradient(circle at 35% 25%, #ffffff 0%, #8ee8ff 18%, #3b82f6 45%, #111827 78%);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.35),
            0 0 18px rgba(96, 205, 255, 0.75),
            0 0 38px rgba(59, 130, 246, 0.5);
          animation: advisorGlow 2.8s ease-in-out infinite;
          cursor: pointer;
          z-index: 70;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          outline: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .ai-advisor-launcher:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow:
            0 0 0 1.5px rgba(255, 255, 255, 0.5),
            0 0 24px rgba(142, 232, 255, 0.95),
            0 0 48px rgba(59, 130, 246, 0.7);
        }

        .ai-advisor-launcher:focus-visible {
          outline: 3px solid #3b82f6;
          outline-offset: 4px;
        }

        /* Sparkles overlay */
        .ai-advisor-launcher::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background-image: 
            radial-gradient(circle at 20% 30%, #ffffff 1px, transparent 1px),
            radial-gradient(circle at 75% 40%, #ffffff 1px, transparent 1px),
            radial-gradient(circle at 40% 70%, #ffffff 1px, transparent 1px);
          background-size: 100% 100%;
          opacity: 0.8;
          animation: advisorSparkle 4s linear infinite;
          pointer-events: none;
        }

        @keyframes advisorGlow {
          0%, 100% {
            transform: translateY(0) scale(1);
            box-shadow:
              0 0 16px rgba(96, 205, 255, 0.55),
              0 0 30px rgba(59, 130, 246, 0.35);
          }
          50% {
            transform: translateY(-2px) scale(1.035);
            box-shadow:
              0 0 24px rgba(165, 243, 252, 0.9),
              0 0 48px rgba(99, 102, 241, 0.55);
          }
        }

        @keyframes advisorSparkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }

        @media (max-width: 768px) {
          .ai-advisor-launcher {
            right: 16px;
            bottom: calc(16px + env(safe-area-inset-bottom));
            width: 54px;
            height: 54px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-advisor-launcher {
            animation: none;
          }
          .ai-advisor-launcher::after {
            animation: none;
          }
        }
      `}</style>
      <button
        type="button"
        className="ai-advisor-launcher"
        onClick={onClick}
        aria-label="Open SL Beauty AI Advisor"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 sm:w-8 sm:h-8 select-none"
        >
          <defs>
            <linearGradient id="diamond-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#c2f0ff" />
              <stop offset="70%" stopColor="#60cdff" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
          </defs>
          <polygon points="32,6 50,22 32,38 14,22" fill="url(#diamond-glow-grad)" opacity="0.9" />
          
          <polygon points="32,38 50,22 32,58" fill="#1e40af" opacity="0.8" />
          <polygon points="32,38 14,22 32,58" fill="#172554" opacity="0.85" />
          <polygon points="32,38 32,58 23,45" fill="#1e3a8a" opacity="0.9" />
          <polygon points="32,38 32,58 41,45" fill="#1d4ed8" opacity="0.9" />

          <polygon points="32,6 50,22 32,38" fill="#ffffff" opacity="0.4" />
          <polygon points="32,6 14,22 32,38" fill="#e0f2fe" opacity="0.45" />
          
          <line x1="32" y1="6" x2="32" y2="38" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
          <line x1="14" y1="22" x2="50" y2="22" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
          <line x1="32" y1="38" x2="32" y2="58" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </button>
    </>
  );
}
