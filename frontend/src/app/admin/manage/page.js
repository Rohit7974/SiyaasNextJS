"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ManageProducts from '@/components/AdminManage';

export default function AdminManagePage(){
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (!token || !user) {
        router.push('/auth');
      }
    } catch (e) {
      router.push('/auth');
    }
  }, [router]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Admin — Manage Products</h1>
        <ManageProducts />
      </div>
    </div>
  );
}
