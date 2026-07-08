import React, { useState, useEffect } from "react";
import {
  ArrowUp,
  Download,
  CheckCircle,
  X,
  Sparkles,
  PhoneCall,
  Laptop,
  Check,
  ShieldCheck,
  Heart,
  Globe,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import { Project, Testimonial, ContactSubmission, AgencySettings, FullAgencyData } from "./types";

export default function App() {
  const [data, setData] = useState<FullAgencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Custom Demo Modal Form State
  const [demoName, setDemoName] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const [demoBiz, setDemoBiz] = useState("");
  const [demoMsg, setDemoMsg] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  // Brochure download status indicator
  const [isDownloading, setIsDownloading] = useState(false);

  // Load state from backend
  const fetchData = async () => {
    try {
      const response = await fetch("/api/data");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (err) {
      console.error("Failed to load initial agency details:", err);
    } finally {
      // Force loading animation to show for at least 1 second for premium feel
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update document body and localstorage when dark mode toggles
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  // Handle scroll trigger for Scroll-to-Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll back to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Trigger Demo Modal Submit
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoEmail || !demoMsg) return;
    setDemoLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: demoName,
          email: demoEmail,
          businessName: demoBiz,
          message: `[FREE DEMO REQUEST]: ${demoMsg}`,
        }),
      });

      if (response.ok) {
        setDemoSuccess(true);
        setDemoName("");
        setDemoEmail("");
        setDemoBiz("");
        setDemoMsg("");
        fetchData(); // Refresh inquiries count in admin
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDemoLoading(false);
    }
  };

  // REAL Download Agency Profile / Credentials file
  const handleDownloadProfile = () => {
    setIsDownloading(true);

    const headlineText = data?.settings?.headline || "Modern Websites That Help Businesses Grow.";
    const subheadlineText = data?.settings?.subheadline || "We design fast, responsive, and conversion-focused websites for businesses.";

    const content = `===========================================================
      PEAK PIXEL STUDIO - PREMIUM AGENCY CREDENTIALS
===========================================================
Established: 2025
Headquarters: Silicon Valley, California
Website Scope: Global Web Design & Custom Development
Contact Desk: ${data?.settings?.contactEmail || "hello@peakpixelstudio.com"}

CORE CAPABILITIES:
-----------------------------------------------------------
1. Business Website Design (Custom corporate showcases)
2. Interactive Landing Pages (Maximizing conversion funnel)
3. Specialized Web Portals (Medical Groups & Real Estate Brokerages)
4. Fullstack Integrations (React, Node, Express, Secure DB)
5. Search Engine Optimization (Semantic tags, Lighthouse 95+ score)
6. Site Maintenance (Subsecond keeper loops, weekly updates)

OUR FOUR-STEP PROTOCOL:
-----------------------------------------------------------
Step 1: DISCOVERY  • Audit competitor metrics, specify goals.
Step 2: DESIGN     • Wireframes, responsive Figma grids, eye-safe layouts.
Step 3: CODE       • Clean React, performance-focused Tailwind CSS, APIs.
Step 4: LAUNCH     • Lighthouse checks, SEO XML sitemaps, rollout launch.

VERIFIED RESULTS & METRICS:
-----------------------------------------------------------
- Lighthouse Performance: 99/100 Average
- Lighthouse Accessibility: 100/100 Certified
- Mobile-First Compatibility: 100% Fluid Scaling
- Average Load Time: < 1.2 Seconds Core Load

PORTFOLIO HIGHLIGHTS:
-----------------------------------------------------------
${(data?.projects || []).map((p, idx) => `${idx + 1}. ${p.title} (${p.client})
   Category: ${p.category}
   Tech Specs: ${p.technologies.join(", ")}
   Industry: ${p.industry}
   Features:
   ${(p.features || []).map(f => `  - ${f}`).join("\n")}
`).join("\n-----------------------------------------------------------\n")}

CONNECT WITH OUR AGENTS:
-----------------------------------------------------------
Instagram: ${data?.settings?.instagramUrl || "https://instagram.com"}
LinkedIn: ${data?.settings?.linkedinUrl || "https://linkedin.com"}
GitHub: ${data?.settings?.githubUrl || "https://github.com"}

(c) 2026 Peak Pixel Studio. All Rights Reserved.
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Peak-Pixel-Agency-Profile.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  const handleOpenDemoModal = () => {
    setDemoSuccess(false);
    setShowDemoModal(true);
  };

  // Preloader / Premium Entrance Animation
  if (loading || !data) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#111111] transition-colors duration-300">
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-blue-600/25 mx-auto"
          >
            P
          </motion.div>
          <div className="space-y-2">
            <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white tracking-tight">
              Peak Pixel Studio
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-mono">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Compiling high-speed layout grids...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { settings, projects, testimonials, submissions } = data;

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-gray-900 dark:text-gray-100 transition-colors duration-300 relative font-sans">
      
      {/* Header Sticky Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        onOpenDemoModal={handleOpenDemoModal}
      />

      {/* Main Core View Router */}
      <AnimatePresence mode="wait">
        {isAdminMode ? (
          <motion.div
            key="admin-workspace"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <AdminPanel
              settings={settings}
              projects={projects}
              testimonials={testimonials}
              submissions={submissions}
              onRefreshData={fetchData}
            />
          </motion.div>
        ) : (
          <motion.div
            key="public-pages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Sections */}
            <Hero
              headline={settings.headline}
              subheadline={settings.subheadline}
              projects={projects}
              onOpenDemo={handleOpenDemoModal}
              onViewPortfolio={() => {
                const el = document.getElementById("portfolio");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />

            <About />

            <Services />

            <Portfolio projects={projects} />

            <Process />

            <Testimonials testimonials={testimonials} />

            <Contact
              contactEmail={settings.contactEmail}
              contactPhone={settings.contactPhone}
              instagramUrl={settings.instagramUrl}
              linkedinUrl={settings.linkedinUrl}
              githubUrl={settings.githubUrl}
              onSubmissionSuccess={fetchData}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Grid */}
      <footer className="bg-gray-950 text-white pt-16 pb-12 text-left relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10">
            
            {/* Footer Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base">
                  P
                </div>
                <span className="font-display font-bold text-lg tracking-tight">
                  Peak<span className="text-blue-500">Pixel</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 font-light max-w-sm">
                Peak Pixel Studio is an elite web design and development studio dedicated to helping modern businesses build ultra-fast, search-optimized, and conversion-ready websites.
              </p>
              
              {/* Download Resume / Agency Profile Credentials */}
              <div className="pt-2">
                <button
                  onClick={handleDownloadProfile}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer border border-white/5"
                  id="footer-download-credentials-btn"
                >
                  <Download className={`w-3.5 h-3.5 ${isDownloading ? "animate-bounce" : ""}`} />
                  <span>{isDownloading ? "Saving Booklet..." : "Download Credentials Booklet"}</span>
                </button>
              </div>
            </div>

            {/* Footer Navigation Columns */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  { id: "home", label: "Home Base" },
                  { id: "about", label: "Who We Are" },
                  { id: "services", label: "Core Capabilities" },
                  { id: "portfolio", label: "Case Studies" },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        setIsAdminMode(false);
                        setTimeout(() => {
                          const el = document.getElementById(link.id);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="hover:text-blue-400 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Solutions Columns */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Business Solutions
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Business Website Design</li>
                <li>Custom Portal Redesigns</li>
                <li>Lighthouse Speed Audits</li>
                <li>Fullstack API Solutions</li>
              </ul>
            </div>
          </div>

          {/* Footer Metadata Baseline */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-light">
            <div>
              &copy; {new Date().getFullYear()} Peak Pixel Studio. All Rights Reserved.
            </div>
            
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              {/* Hidden trigger to help developers login quickly */}
              <button
                onClick={() => {
                  setIsAdminMode(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:text-gray-400 flex items-center gap-1"
                id="footer-admin-shorthand"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Control Room Login</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION UTILITIES */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={handleScrollToTop}
              className="p-3 bg-white dark:bg-[#111111] hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white rounded-xl shadow-xl border border-gray-200/60 dark:border-white/10 transition-colors cursor-pointer"
              aria-label="Scroll to top of page"
              id="floating-scroll-top-btn"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating "Get Free Demo" Badge */}
        {!isAdminMode && (
          <button
            onClick={handleOpenDemoModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-2xl shadow-blue-600/30 font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer"
            id="floating-quick-demo-btn"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">Get Free Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>
        )}
      </div>

      {/* MODAL: FREE DEMO INTAKE FORM */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm"
            id="demo-intake-modal-overlay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-[#111111] rounded-3xl p-6 md:p-8 max-w-lg w-full border border-gray-200 dark:border-white/10 shadow-2xl relative text-left"
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                id="close-demo-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!demoSuccess ? (
                  <form onSubmit={handleDemoSubmit} className="space-y-5" key="demo-form">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                        <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                        Complimentary Consultation
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Request a Free Design Demo</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                        Provide your details below, and our development team will prepare a high-speed interactive homepage mock preview for your business.
                      </p>
                    </div>

                    <div className="space-y-4 pt-1">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={demoName}
                          onChange={(e) => setDemoName(e.target.value)}
                          placeholder="Mike Reynolds"
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={demoEmail}
                            onChange={(e) => setDemoEmail(e.target.value)}
                            placeholder="mike@antech.com"
                            className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Business Name</label>
                          <input
                            type="text"
                            value={demoBiz}
                            onChange={(e) => setDemoBiz(e.target.value)}
                            placeholder="Antech Electric"
                            className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Redesign Focus / Industry Goal *</label>
                        <textarea
                          rows={3}
                          required
                          value={demoMsg}
                          onChange={(e) => setDemoMsg(e.target.value)}
                          placeholder="We want to move our physical electrical contracting catalog online and enable real-time booking forms..."
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={demoLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      id="demo-modal-submit-btn"
                    >
                      {demoLoading ? (
                        <span>Processing Demo Request...</span>
                      ) : (
                        <>
                          <span>Submit Demo Request</span>
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center flex flex-col items-center justify-center space-y-4"
                    key="demo-success"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shadow-inner">
                      <CheckCircle className="w-8 h-8" />
                    </div>

                    <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white">
                      Demo Request Logged!
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed font-light">
                      Thanks for requesting a preview! Our engineering agents have logged your requirements and will reach out with a direct custom preview URL shortly.
                    </p>

                    <button
                      onClick={() => setShowDemoModal(false)}
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl text-xs shadow-md cursor-pointer"
                      id="demo-success-done-btn"
                    >
                      Got It
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
