"use client";

import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { Menu, Navigation, Wifi, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">NavegaVis</span>
          </div>

          {/* Menu para desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary"
            >
              Simulação
            </Link>
            <Link
              href="/dashboard/coleta-sinais"
              className="text-sm font-medium hover:text-primary flex items-center"
            >
              <Wifi className="h-4 w-4 mr-1" />
              Coleta de Sinais
            </Link>
          </nav>

          {/* Botão do menu mobile */}
          <button
            className="md:hidden text-gray-700 hover:text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu mobile expansível */}
        {menuOpen && (
          <div className="md:hidden border-t">
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              <Link
                href="/"
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium py-2 hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                Simulação
              </Link>
              <Link
                href="/dashboard/coleta-sinais"
                className="text-sm font-medium py-2 hover:text-primary flex items-center"
                onClick={() => setMenuOpen(false)}
              >
                <Wifi className="h-4 w-4 mr-1" />
                Coleta de Sinais
              </Link>
            </div>
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
