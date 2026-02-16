'use client';

import React, { useState } from 'react';
import AuthModal from '@/components/AuthModal';

const AuthDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#1f2937] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Authentication Modal
        </h1>
        <p className="text-[#9ca3af] mb-8 text-lg">
          Click the button below to see the sign in and sign up modal in action
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-gradient-to-r from-[#f59e0b] to-amber-500 text-black font-semibold rounded-md hover:from-amber-400 hover:to-amber-600 transition duration-300 transform hover:scale-105"
        >
          Open Auth Modal
        </button>

        {/* Modal Component */}
        <AuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default AuthDemo;
