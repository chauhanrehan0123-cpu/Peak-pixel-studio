import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Lock, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  onOpenDemoModal: () => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  isAdminMode,
  setIsAdminMode,
  onOpenDemoModal,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "process", label: "Process" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracker for high-end indicator lights
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setIsAdminMode(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border-b border-gray-200/50 dark:border-white/10 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 group cursor-pointer"
              id="nav-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                P
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                Peak<span className="text-blue-600 dark:text-blue-500">Pixel</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`nav-item-${item.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  !isAdminMode && activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Utility buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Dark Mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
              id="theme-toggle-desktop"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin toggle gateway */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isAdminMode
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 animate-pulse"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-white/10"
              }`}
              id="admin-gateway-btn"
              title="Access agency admin dashboard"
            >
              {isAdminMode ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-white" />
                  Admin: On
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  Admin Room
                </>
              )}
            </button>

            {/* Conversion CTA */}
            <button
              onClick={onOpenDemoModal}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold tracking-tight shadow-md shadow-blue-600/15 hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200 cursor-pointer"
              id="navbar-cta-demo"
            >
              Get Free Demo
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
              id="theme-toggle-mobile"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`p-2 rounded-lg ${
                isAdminMode ? "text-emerald-500 bg-emerald-500/10" : "text-gray-500 dark:text-gray-400"
              }`}
              id="admin-toggle-mobile"
            >
              <Lock className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              id="hamburger-trigger"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-white/10"
            id="mobile-nav-drawer"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`mobile-nav-item-${item.id}`}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    !isAdminMode && activeSection === item.id
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 pb-2 border-t border-gray-200 dark:border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenDemoModal();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-semibold text-sm shadow-md"
                  id="mobile-nav-demo-btn"
                >
                  Get Free Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
