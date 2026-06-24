'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, User, Mail, Lock, Building, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const ROLES = [
  { value: 'buyer',    label: '🛒 Buyer',    desc: 'Source products from Sri Lankan exporters' },
  { value: 'supplier', label: '📦 Supplier',  desc: 'Sell your products to global buyers' },
];

export default function RegisterForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { register } = useAuth();

  const [role,  setRole]    = useState(searchParams.get('role') || 'buyer');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [form,    setForm]    = useState({
    name: '', company: '', email: '', phone: '',
    _el_pw: '', _el_pw2: '',
  });

  const set = (field) => (e) => {
    setError('');
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form._el_pw !== form._el_pw2) {
      setError('Passwords do not match.');
      return;
    }
    if (form._el_pw.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name:     form.name,
        company:  form.company,
        email:    form.email,
        phone:    form.phone,
        role,
        password:              btoa(form._el_pw),
        password_confirmation: btoa(form._el_pw2),
      });
      toast.success('Account created! Welcome to EcomLanka.');
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: 'name',    icon: User,     label: 'Full Name',       type: 'text',  placeholder: 'John Silva',          key: 'name' },
    { id: 'company', icon: Building, label: 'Company Name',    type: 'text',  placeholder: 'Lanka Exports Ltd.',   key: 'company' },
    { id: 'email',   icon: Mail,     label: 'Email Address',   type: 'email', placeholder: 'you@company.com',      key: 'email' },
    { id: 'phone',   icon: Phone,    label: 'Phone (optional)',type: 'tel',   placeholder: '+94 77 000 0000',       key: 'phone' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <Link href="/">
            <div className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold text-primary-800">EcomLanka</span>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-5">Create Your Free Account</h1>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  role === r.value
                    ? 'border-primary-700 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-sm text-gray-800">{r.label}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-snug">{r.desc}</div>
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ id, icon: Icon, label, type, placeholder, key }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id={id}
                    type={type}
                    value={form[key]}
                    onChange={set(key)}
                    placeholder={placeholder}
                    required={key !== 'phone'}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none"
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label htmlFor="reg-pw" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="reg-pw"
                  type={showPw ? 'text' : 'password'}
                  value={form._el_pw}
                  onChange={set('_el_pw')}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none"
                />
                <button type="button" tabIndex={-1} onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="reg-pw2" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="reg-pw2"
                  type={showPw ? 'text' : 'password'}
                  value={form._el_pw2}
                  onChange={set('_el_pw2')}
                  placeholder="Repeat password"
                  required
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary-800 hover:bg-primary-700 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account…
                </span>
              ) : `Create ${role === 'supplier' ? 'Supplier' : 'Buyer'} Account`}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-700 font-medium hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
