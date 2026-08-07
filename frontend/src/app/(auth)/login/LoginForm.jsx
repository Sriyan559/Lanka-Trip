'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { sanitizeInternalRedirect } from '@/lib/authRedirect';
import { firstFieldError, withoutFieldError } from '@/lib/formErrors';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('redirect');

  const { login } = useAuth();

  const [form, setForm] = useState({ _el_id: '', _el_pw: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    searchParams.get('reason') === 'session_expired'
      ? 'Your session expired. Please sign in again.'
      : '',
  );
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const apiField = e.target.name === '_el_id' ? 'email' : 'password';
    setError('');
    setFieldErrors((current) => withoutFieldError(current, apiField));
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const loginInput = form._el_id.trim();
    const passwordInput = form._el_pw;

    if (!loginInput || !passwordInput) {
      setError('Please enter your email/username and password.');
      return;
    }

    setFieldErrors({});
    setLoading(true);
    try {
      const data = await login({
        email: loginInput,
        password: passwordInput,
      });

      toast.success('Signed in successfully');

      const authenticatedUser = data?.user;
      const isUserAdmin =
        authenticatedUser?.role === 'admin' ||
        authenticatedUser?.role === 'super_admin' ||
        authenticatedUser?.is_admin === true;

      const fallbackRoute = isUserAdmin ? '/admin/catalogue' : '/';
      const targetDestination = sanitizeInternalRedirect(rawRedirect, fallbackRoute);

      router.replace(targetDestination);
      router.refresh();
    } catch (err) {
      setFieldErrors(err?.errors || {});
      setError(err?.message || 'Unable to sign in with the provided credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4 selection:bg-slate-200">
      <div className="w-full max-w-md">

        {/* Logo Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <span className="text-white font-serif font-bold text-lg">SL</span>
            </div>
            <span className="text-2xl font-bold text-slate-900 font-serif tracking-tight">
              SL Beauty
            </span>
          </Link>
          <p className="text-slate-500 text-xs mt-1.5 font-medium tracking-wide">
            Premium Beauty Ecommerce Marketplace
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 sm:p-10 border border-slate-100">
          <h1 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">
            Sign In to Your Account
          </h1>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5" role="alert">
              <AlertCircle size={16} className="text-rose-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs font-medium text-rose-700 leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">

            {/* Email or Username */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
                Email or Username
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-email"
                  type="text"
                  name="_el_id"
                  autoComplete="username"
                  value={form._el_id}
                  onChange={handleChange}
                  placeholder="Email address or username"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all"
                />
              </div>
              {firstFieldError(fieldErrors, 'email') && (
                <p className="mt-1 text-xs text-rose-600">
                  {firstFieldError(fieldErrors, 'email')}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-pw" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-pw"
                  type={showPw ? 'text' : 'password'}
                  name="_el_pw"
                  autoComplete="current-password"
                  value={form._el_pw}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {firstFieldError(fieldErrors, 'password') && (
                <p className="mt-1 text-xs text-rose-600">
                  {firstFieldError(fieldErrors, 'password')}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black hover:bg-slate-900 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2 active:scale-[0.99]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Registration Links */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-slate-900 hover:underline">
              Register Free
            </Link>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <Link href="/register?role=supplier" className="text-xs font-bold text-slate-900 hover:text-burgundy transition-colors inline-flex items-center gap-1">
              Become a Brand Partner &rarr;
            </Link>
          </div>
        </div>

        {/* Footer Policy Text */}
        <p className="text-center text-[11px] text-slate-400 mt-6">
          By signing in you agree to our{' '}
          <Link href="/terms" className="underline hover:text-slate-600 transition-colors">Terms</Link> &amp;{' '}
          <Link href="/privacy" className="underline hover:text-slate-600 transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
