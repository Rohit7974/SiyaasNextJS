"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (!token || !user) {
        router.push("/auth");
      }
    } catch (e) {
      router.push("/auth");
    }
  }, [router]);

  return (
    <div>
      <Header />
      <main className="pt-24">
        <AdminPanel />
      </main>
      <Footer />
    </div>
  );
}
