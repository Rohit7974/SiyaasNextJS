'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // ✅ Added
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => { // ✅ Made async
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const email = (formData.email || '').trim();
      const password = (formData.password || '').trim();

      // Use env vars with fallback so admin login works even when .env.local isn't loaded (e.g. client-side)
      const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@siyaas.com').trim();
      const ADMIN_PASSWORD = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123').trim();
      const ADMIN_TOKEN = (process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-token').trim();

      if (isLogin && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('token', ADMIN_TOKEN);
        localStorage.setItem('authToken', ADMIN_TOKEN);
        localStorage.setItem('user', JSON.stringify({ _id: 'admin', fullName: 'Admin', email: ADMIN_EMAIL }));
        alert('Admin login successful!');
        resetForm();
        onClose();
        router.push('/admin');
        return;
      }

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const payload = isLogin
        ? { email, password }
        : { fullName: formData.fullName?.trim(), email, password };

      const response = await fetch(`http://localhost:4000${endpoint}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || data.message || 'An error occurred' });
        return;
      }

     
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert(isLogin ? 'Login successful!' : 'Account created successfully!');
      resetForm();
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    });
    setErrors({});
  };

  const toggleAuthMode = () => {
    resetForm();
    setIsLogin(!isLogin);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

     
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
   
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition duration-300 text-2xl font-light z-10"
        >
          ×
        </button>

  
        <div className="px-8 pt-8 pb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLogin
              ? 'Sign in to your account'
              : 'Create your account to get started'}
          </p>
        </div>

     
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
       
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {errors.submit}
            </div>
          )}

  
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>
          )}

        
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

      
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ${
                  errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-200'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

        
          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-gray-50 border border-gray-300 rounded cursor-pointer accent-amber-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm text-amber-500 hover:text-amber-600 transition duration-300">
                Forgot password?
              </a>
            </div>
          )}

          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-300 transform hover:scale-105 mt-6 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

     
        <div className="px-8 pb-8 text-center border-t border-gray-200 pt-6">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-amber-500 font-semibold hover:text-amber-600 transition duration-300"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
