'use client';

import Image from 'next/image';

export default function HeaderAIAdvisorButton({ onOpen, mobile = false }) {
  return (
    <div className="header-ai-advisor-wrap">
      <button
        type="button"
        className={`header-ai-advisor-button ${mobile ? 'header-ai-advisor-button--mobile' : ''}`}
        aria-label="Open SL Beauty AI Advisor"
        aria-describedby={mobile ? undefined : 'header-ai-advisor-tooltip'}
        title="SL Beauty AI Advisor"
        onClick={onOpen}
      >
        <Image
          src="/images/ai-advisor/diamond-icon.png"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          priority={false}
          className="header-ai-advisor-icon"
        />
      </button>
      {!mobile && <span id="header-ai-advisor-tooltip" role="tooltip" className="header-ai-advisor-tooltip">SL Beauty AI Advisor</span>}

      <style jsx global>{`
        .header-ai-advisor-wrap { position: relative; display: inline-flex; flex: 0 0 auto; }
        .header-ai-advisor-button {
          position: relative; isolation: isolate; display: inline-flex; width: 44px; height: 44px;
          flex: 0 0 44px; align-items: center; justify-content: center; overflow: visible;
          border: 0; border-radius: 999px; background: transparent; cursor: pointer;
          transition: transform .18s ease, background-color .18s ease;
        }
        .header-ai-advisor-button::before {
          content: ''; position: absolute; inset: 5px; z-index: 0; border-radius: inherit;
          background: radial-gradient(circle, rgba(255,255,255,.98) 0%, rgba(120,220,255,.62) 38%, rgba(96,90,255,.22) 70%, transparent 100%);
          filter: blur(7px); opacity: .88; animation: headerDiamondGlow 2.6s ease-in-out infinite; pointer-events: none;
        }
        .header-ai-advisor-button::after {
          content: ''; position: absolute; top: 5px; right: 6px; z-index: 3; width: 5px; height: 5px;
          border-radius: 999px; background: #fff; box-shadow: -22px 20px 0 -1px rgba(255,255,255,.85), 0 24px 0 -2px rgba(145,224,255,.95);
          animation: headerDiamondSparkle 2.2s ease-in-out infinite; pointer-events: none;
        }
        .header-ai-advisor-icon { position: relative; z-index: 2; display: block; width: 31px; height: 31px; object-fit: contain; filter: drop-shadow(0 0 4px rgba(96,205,255,.8)); }
        .header-ai-advisor-button:hover { background: #f7f7f7; transform: translateY(-1px); }
        .header-ai-advisor-button:active { transform: scale(.96); }
        .header-ai-advisor-button:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
        .header-ai-advisor-tooltip {
          position: absolute; top: calc(100% + 8px); left: 50%; z-index: 260; width: max-content;
          transform: translate(-50%, -3px); border-radius: 6px; background: #171717; padding: 6px 8px;
          color: #fff; font-size: 11px; font-weight: 600; line-height: 1; opacity: 0; visibility: hidden;
          pointer-events: none; transition: opacity .15s ease, transform .15s ease, visibility .15s;
        }
        .header-ai-advisor-wrap:hover .header-ai-advisor-tooltip,
        .header-ai-advisor-wrap:focus-within .header-ai-advisor-tooltip { opacity: 1; visibility: visible; transform: translate(-50%, 0); }
        .header-ai-advisor-button--mobile { width: 42px; height: 42px; flex-basis: 42px; }
        .header-ai-advisor-button--mobile .header-ai-advisor-icon { width: 28px; height: 28px; }
        .header-ai-advisor-button--mobile::before { inset: 7px; opacity: .72; }
        @keyframes headerDiamondGlow { 0%,100% { opacity:.68; transform:scale(.92); } 50% { opacity:1; transform:scale(1.08); } }
        @keyframes headerDiamondSparkle { 0%,100% { opacity:.3; transform:scale(.75); } 50% { opacity:1; transform:scale(1.12); } }
        @media (hover: none) { .header-ai-advisor-tooltip { display: none; } }
        @media (prefers-reduced-motion: reduce) {
          .header-ai-advisor-button, .header-ai-advisor-button::before, .header-ai-advisor-button::after, .header-ai-advisor-tooltip { animation: none; transition: none; }
          .header-ai-advisor-button::before { opacity: .9; transform: none; }
          .header-ai-advisor-button::after { opacity: .8; transform: none; }
        }
      `}</style>
    </div>
  );
}
