import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      {/* Main links grid */}
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-gray-800 mb-3">{heading}</h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-primary-700 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Language options col */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Language Options</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {['Sinhala', 'Tamil', 'Arabic', 'Español', 'Français', 'Deutsch', 'Русский', '日本語', '한국어', 'Português'].map((lang) => (
                <button key={lang} className="text-left text-sm text-gray-500 hover:text-primary-700 transition-colors">
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App + social strip */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Free App:</span>
            <a
              href="#"
              className="flex items-center gap-1.5 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-gray-700"
            >
              🍎 App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-600"
            >
              ▶ Google Play
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Follow Us:</span>
            {[
              { Icon: Facebook, href: '#', label: 'Facebook' },
              { Icon: Twitter,  href: '#', label: 'Twitter'  },
              { Icon: Instagram,href: '#', label: 'Instagram'},
              { Icon: Youtube,  href: '#', label: 'YouTube'  },
              { Icon: Linkedin, href: '#', label: 'LinkedIn' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-7 h-7 flex items-center justify-center rounded bg-gray-200 text-gray-600 hover:bg-primary-800 hover:text-white transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-400 mb-2">
            {['Hot Products','Ceylon Tea','Gems & Jewelry','Rubber Products','Spices','Ayurvedic'].map((item) => (
              <Link key={item} href={`/search?q=${encodeURIComponent(item)}`} className="hover:text-primary-700">
                {item}
              </Link>
            ))}
          </div>
          <div className="text-center text-xs text-gray-400 flex flex-wrap justify-center gap-x-3">
            <span>© {year} EcomLanka · Sri Lanka B2B Export Marketplace</span>
            <Link href="/terms"   className="hover:text-primary-700">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary-700">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-primary-700">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
