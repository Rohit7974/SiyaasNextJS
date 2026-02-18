"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function AdminPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      
      if (!token || !user) {
        router.push("/auth");
        setIsLoading(false);
        return;
      }
      
      // Verify user is admin
      const userData = JSON.parse(user);
      if (userData._id === "admin" || userData.role === "admin") {
        setIsAuthenticated(true);
      } else {
        router.push("/");
      }
    } catch (e) {
      router.push("/auth");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Header />
      <main className="pt-24">
        <AdminPanel searchParams={searchParams} />
      </main>
      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AdminPageContent />
    </Suspense>
  );
}
