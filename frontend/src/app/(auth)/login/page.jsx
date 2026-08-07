/**
 * app/(auth)/login/page.jsx
 *
 * Restored original Login route structure with Suspense boundary.
 */

import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata = { title: 'Sign In | SL Beauty Platform' };

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-8 h-8 border-4 border-burgundy-700 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
