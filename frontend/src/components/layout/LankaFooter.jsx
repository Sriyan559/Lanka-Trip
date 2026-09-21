'use client';

import React from 'react';
import Link from 'next/link';
import { Palmtree, Sun, Waves, Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LankaFooter({ footerData }) {
  const handleLinkClick = (e, label, isAvailable, href) => {
    if (!isAvailable || href.startsWith('#')) {
      if (href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      e.preventDefault();
      toast(`Page "${label}" is scheduled for Phase 2.`, {
        icon: '🌴',
      });
    }
  };

  const usefulLinks = footerData?.usefulLinks || [
    { label: 'About Us', href: '#about', isAvailable: false },
    { label: 'How It Works', href: '#how-it-works', isAvailable: false },
    { label: 'Blog', href: '#blog', isAvailable: false },
    { label: 'Travel Tips', href: '#tips', isAvailable: false },
    { label: 'Help Center', href: '#help', isAvailable: false },
  ];

  const travelerLinks = footerData?.travelerLinks || [
    { label: 'Destinations', href: '#destinations', isAvailable: true },
    { label: 'Planner', href: '#planner', isAvailable: true },
    { label: 'Stays', href: '#services', isAvailable: true },
    { label: 'Drivers', href: '#services', isAvailable: true },
    { label: 'Guides', href: '#services', isAvailable: true },
    { label: 'Activities', href: '#services', isAvailable: true },
  ];

  const partnerLinks = footerData?.partnerLinks || [
    { label: 'List Your Property', href: '#partner-stays', isAvailable: false },
    { label: 'Become a Driver', href: '#partner-drivers', isAvailable: false },
    { label: 'Join as a Guide', href: '#partner-guides', isAvailable: false },
    { label: 'Partner With Us', href: '#partner-all', isAvailable: false },
  ];

  const contact = footerData?.contact || {
    email: 'hello@lankatripplanner.com',
    phone: '+94 77 123 4567',
    address: 'Colombo, Sri Lanka',
  };

  return (
    <footer className="relative bg-[#082B34] text-white pt-16 pb-8 border-t border-teal-900/50 overflow-hidden">
      {/* Background Palm Silhouette Accents */}
      <div 
        className="absolute -right-10 -bottom-10 w-96 h-96 opacity-10 pointer-events-none bg-contain bg-no-repeat"
        style={{
          backgroundImage: `radial-gradient(circle, #2dd4bf 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 pb-12 border-b border-teal-800/40">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center text-teal-300">
                <Sun className="w-6 h-6 text-amber-300 absolute -top-1 -right-0.5" />
                <Palmtree className="w-7 h-7 text-emerald-400 relative z-10 -ml-1 mt-0.5" />
                <Waves className="w-8 h-4 text-cyan-300 absolute bottom-0 right-0" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-tight">
                  LankaTrip
                </span>
                <span className="text-xs font-bold tracking-wider text-teal-300 uppercase -mt-0.5">
                  Planner
                </span>
              </div>
            </Link>

            <p className="text-xs text-teal-100/70 tracking-wide font-medium">
              Explore • Plan • Experience • Support Sri Lanka
            </p>
          </div>

          {/* Col 2: Useful Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs text-teal-100/80">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.label, link.isAvailable, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: For Travelers */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              For Travelers
            </h4>
            <ul className="space-y-2 text-xs text-teal-100/80">
              {travelerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.label, link.isAvailable, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: For Partners */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              For Partners
            </h4>
            <ul className="space-y-2 text-xs text-teal-100/80">
              {partnerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.label, link.isAvailable, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Get In Touch + Cursive Note */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-xs text-teal-100/80">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors truncate">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{contact.address}</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5 text-teal-200">
              <span className="w-6 h-6 rounded-full bg-teal-900/80 hover:bg-teal-700 flex items-center justify-center cursor-pointer transition-colors text-xs font-bold">
                f
              </span>
              <span className="w-6 h-6 rounded-full bg-teal-900/80 hover:bg-teal-700 flex items-center justify-center cursor-pointer transition-colors text-xs font-bold">
                ig
              </span>
              <span className="w-6 h-6 rounded-full bg-teal-900/80 hover:bg-teal-700 flex items-center justify-center cursor-pointer transition-colors text-xs font-bold">
                yt
              </span>
              <span className="w-6 h-6 rounded-full bg-teal-900/80 hover:bg-teal-700 flex items-center justify-center cursor-pointer transition-colors text-xs font-bold">
                in
              </span>
            </div>

            {/* Cursive Handwriting Accent */}
            <div className="pt-4 select-none">
              <span className="font-handwriting text-white text-2xl font-bold leading-tight drop-shadow-md rotate-[-3deg] block">
                Good <br />
                Journeys <br />
                <span className="text-white">Do Good ♡</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-200/60">
          <p>© 2024 LankaTrip Planner. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a 
              href="#privacy" 
              onClick={(e) => { e.preventDefault(); toast('Privacy Policy will be updated in Phase 2.'); }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a 
              href="#terms" 
              onClick={(e) => { e.preventDefault(); toast('Terms of Service will be updated in Phase 2.'); }}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
