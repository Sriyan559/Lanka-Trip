import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

export const metadata = {
  title: 'SL Beauty Platform - Enterprise Beauty Marketplace',
  description: 'Enterprise Beauty & Marketplace Platform',
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
