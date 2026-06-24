import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

// Use system font stack — replace with next/font/google when deploying
// to a network-connected environment (sandbox restricts external fetches).

export const metadata = {
  title: {
    default: 'EcomLanka — Sri Lanka B2B Export Marketplace',
    template: '%s | EcomLanka',
  },
  description:
    'Connect with verified Sri Lankan exporters. Source quality tea, spices, gems, textiles, rubber products and more.',
  keywords: ['Sri Lanka exports', 'B2B marketplace', 'Ceylon tea', 'spices', 'gems', 'rubber'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'EcomLanka',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-sans">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: { fontSize: '14px' },
                success: { iconTheme: { primary: '#155e2c', secondary: '#fff' } },
                error:   { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
