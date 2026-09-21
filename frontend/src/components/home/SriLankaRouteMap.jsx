'use client';

import React from 'react';
import { Compass } from 'lucide-react';

export default function SriLankaRouteMap({ activeDay, onSelectDay }) {
  // Destination node coordinates on a 500 x 600 viewbox
  const nodes = [
    {
      day: 1,
      name: 'Colombo',
      x: 105,
      y: 360,
      image: '/images/colombo.jpg',
      labelOffset: { x: -62, y: 5 },
    },
    {
      day: 2,
      name: 'Sigiriya',
      x: 235,
      y: 180,
      image: '/images/sigiriya.jpg',
      labelOffset: { x: 30, y: 5 },
    },
    {
      day: 3,
      name: 'Kandy',
      x: 220,
      y: 270,
      image: '/images/kandy.jpg',
      labelOffset: { x: 28, y: 4 },
    },
    {
      day: 4,
      name: 'Ella',
      x: 265,
      y: 335,
      image: '/images/ella.jpg',
      labelOffset: { x: 26, y: 4 },
    },
    {
      day: 5,
      name: 'Yala',
      x: 320,
      y: 395,
      image: '/images/yala.jpg',
      labelOffset: { x: 25, y: 8 },
    },
    {
      day: 6,
      name: 'Galle',
      x: 170,
      y: 450,
      image: '/images/galle.jpg',
      labelOffset: { x: -35, y: 22 },
    },
  ];

  // Route path connecting Colombo -> Sigiriya -> Kandy -> Ella -> Yala -> Galle -> Colombo
  const routeD = 'M 105 360 Q 140 240 235 180 Q 215 225 220 270 Q 240 300 265 335 Q 300 360 320 395 Q 260 440 170 450 Q 120 420 105 360';

  return (
    <div className="relative w-full max-w-[480px] mx-auto select-none">
      {/* Top right cursive annotation */}
      <div className="absolute top-2 right-4 text-right z-20">
        <span className="font-handwriting text-[#145365] text-2xl sm:text-3xl font-bold tracking-wide drop-shadow-sm rotate-[4deg] block">
          One island
        </span>
        <span className="font-handwriting text-[#145365] text-xl sm:text-2xl font-bold tracking-wide -mt-1 block">
          A million stories
        </span>
      </div>

      {/* Compass Rose */}
      <div className="absolute top-24 right-6 text-slate-400/80 z-10 flex flex-col items-center">
        <span className="text-[10px] font-bold text-slate-500 mb-0.5">N</span>
        <Compass className="w-8 h-8 text-teal-700/60 stroke-[1.5]" />
      </div>

      {/* Bottom right cursive annotation */}
      <div className="absolute bottom-6 right-2 text-right z-20">
        <div className="font-handwriting text-[#145365] text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm rotate-[-3deg]">
          <p>Explore</p>
          <p>Plan</p>
          <p>Experience</p>
          <p className="text-[#E86339] mt-0.5">Repeat ♡</p>
        </div>
      </div>

      {/* SVG Map Container */}
      <svg
        viewBox="0 0 460 540"
        className="w-full h-auto drop-shadow-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="islandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4EEDF" />
            <stop offset="60%" stopColor="#C2E7D1" />
            <stop offset="100%" stopColor="#B3DFC4" />
          </linearGradient>

          <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0F766E" floodOpacity="0.15" />
          </filter>

          {/* Pattern / Clip paths for circular pins */}
          {nodes.map((node) => (
            <pattern
              key={`pattern-${node.day}`}
              id={`pin-img-${node.day}`}
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href={node.image}
                x="0"
                y="0"
                width="40"
                height="40"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          ))}
        </defs>

        {/* Realistic Sri Lanka Island Silhouette Outline */}
        <path
          d="M 230 45 
             C 255 70, 275 110, 285 160 
             C 295 210, 320 260, 335 310 
             C 345 350, 340 395, 325 425 
             C 310 455, 270 480, 230 495 
             C 190 500, 160 485, 140 465 
             C 115 440, 110 390, 105 340 
             C 98 290, 110 240, 125 190 
             C 140 140, 175 90, 205 55 
             Z"
          fill="url(#islandGrad)"
          filter="url(#shadow)"
          stroke="#93C5AA"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Subtle terrain topography contours */}
        <path
          d="M 180 180 Q 235 150 250 220 Q 270 290 240 360 Q 190 380 160 330 Z"
          fill="#A4D1B7"
          opacity="0.4"
        />
        <path
          d="M 200 230 Q 240 210 250 260 Q 255 310 220 330 Z"
          fill="#8FC5A5"
          opacity="0.35"
        />

        {/* Travel Route Line */}
        <path
          d={routeD}
          stroke="#0F766E"
          strokeWidth="3.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Destination Nodes */}
        {nodes.map((node) => {
          const isSelected = activeDay === node.day;
          return (
            <g
              key={node.name}
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => onSelectDay && onSelectDay(node.day)}
            >
              {/* Outer Glow / Halo */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? 26 : 22}
                fill="#ffffff"
                stroke={isSelected ? '#E86339' : '#0F766E'}
                strokeWidth={isSelected ? '3.5' : '2'}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
              />

              {/* Destination Image Fill */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? 22 : 18}
                fill={`url(#pin-img-${node.day})`}
              />

              {/* Destination Label */}
              <text
                x={node.x + node.labelOffset.x}
                y={node.y + node.labelOffset.y}
                className="text-[12px] font-extrabold fill-slate-800 tracking-tight"
                style={{
                  textShadow: '0 1px 3px rgba(255,255,255,0.9), 0 0 2px white',
                }}
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
