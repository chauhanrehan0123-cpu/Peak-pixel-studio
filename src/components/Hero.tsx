import React, { useState, useEffect } from "react";
import { ArrowRight, Laptop, Play, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

interface HeroProps {
  headline: string;
  subheadline: string;
  projects: Project[];
  onOpenDemo: () => void;
  onViewPortfolio: () => void;
}

export default function Hero({
  headline,
  subheadline,
  projects,
  onOpenDemo,
  onViewPortfolio,
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto scroll the mockup screens every 5 seconds
  useEffect(() => {
    if (projects.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects]);

  const activeProject = projects[currentSlide] || null;

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/20 via-transparent to-transparent dark:from-blue-950/5"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30 text-xs font-semibold tracking-wide"
              id="hero-top-badge"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Premium Web Design Agency 2026</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]"
              id="hero-headline"
            >
              {headline || "Modern Websites That Help Businesses Grow."}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed max-w-2xl"
              id="hero-subheadline"
            >
              {subheadline ||
                "We design fast, responsive, and conversion-focused websites for businesses worldwide."}
            </motion.p>

            {/* Key Value Props Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-1"
              id="hero-checklist"
            >
              {[
                "Lighthouse Speed 95+",
                "100% Tailored Designs",
                "Advanced SEO Config",
                "Conversion Optimized",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto"
              id="hero-cta-buttons"
            >
              <button
                onClick={onViewPortfolio}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-4 rounded-2xl text-base font-semibold tracking-tight shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                id="hero-view-portfolio-btn"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 px-8 py-4 rounded-2xl text-base font-semibold tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                id="hero-get-demo-btn"
              >
                <Play className="w-4.5 h-4.5 text-blue-600 fill-blue-600" />
                <span>Get a Free Demo</span>
              </button>
            </motion.div>
          </div>

          {/* Hero Right Laptop Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 10, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full max-w-[480px] relative"
              style={{ perspective: "1200px" }}
              id="laptop-mockup-wrapper"
            >
              {/* Laptop Screen Portion */}
              <div className="relative rounded-2xl border-4 border-[#1E293B] dark:border-[#334155] bg-[#0F172A] p-2.5 shadow-2xl transition-all">
                {/* Upper Camera Lens */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1e293b] z-10" />

                {/* Internal Screen Content */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-gray-900">
                  <AnimatePresence mode="wait">
                    {activeProject && (
                      <motion.div
                        key={activeProject.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex flex-col justify-between"
                      >
                        {/* Fake Browser Toolbar */}
                        <div className="bg-[#1E293B] dark:bg-[#1E293B]/90 h-6 flex items-center px-3 gap-1.5 border-b border-gray-800 shrink-0">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          </div>
                          <div className="bg-gray-800/60 text-[8px] text-gray-300 font-mono px-3 py-0.5 rounded-md mx-auto truncate w-44 text-center">
                            {activeProject.id}.peakpixel.com
                          </div>
                        </div>

                        {/* Project Page Visual */}
                        <div className="relative w-full h-full overflow-hidden group">
                          <img
                            src={activeProject.image}
                            alt={activeProject.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Gradient Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
                            <span className="font-mono text-[8px] font-bold text-blue-400 tracking-wider uppercase mb-0.5">
                              {activeProject.category}
                            </span>
                            <h3 className="font-display font-bold text-base text-white leading-tight">
                              {activeProject.title}
                            </h3>
                            <p className="text-[10px] text-gray-300 line-clamp-1 mt-0.5 font-light">
                              {activeProject.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Laptop Keyboard Deck Portion */}
              <div className="relative -mt-1 h-3.5 bg-gradient-to-b from-[#475569] to-[#334155] dark:from-[#334155] to-[#1E293B] rounded-b-xl border-t border-slate-400/30 shadow-xl max-w-[500px] mx-auto z-10 flex justify-center">
                <div className="w-16 h-1 bg-black/20 rounded-b-sm border-t border-slate-500/10" />
              </div>

              {/* Orbiting Badges */}
              <div className="absolute -top-6 -right-6 bg-emerald-500 text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 animate-bounce">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SEO Optimized</span>
              </div>

              <div className="absolute -bottom-4 -left-6 bg-blue-600 text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-blue-600/20 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5" />
                <span>100% Responsive</span>
              </div>
            </motion.div>

            {/* Laptop Controls / Index Dots */}
            {projects.length > 0 && (
              <div className="flex items-center gap-1.5 mt-6 z-20">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)}
                  className="p-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                  id="hero-prev-slide-btn"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentSlide
                        ? "bg-blue-600 w-5"
                        : "bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/30"
                    }`}
                    id={`hero-slide-dot-${idx}`}
                  />
                ))}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % projects.length)}
                  className="p-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                  id="hero-next-slide-btn"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
