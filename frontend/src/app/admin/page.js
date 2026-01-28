"use client";

import React from "react";
import AdminPanel from "@/components/AdminPanel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminPage() {
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
