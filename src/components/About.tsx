import React from "react";
import { Check, Shield, Zap, Compass, Users2, Trophy, BarChart3, Star } from "lucide-react";
import { motion } from "motion/react";

interface StatItemProps {
  number: string;
  label: string;
  desc: string;
}

function StatCard({ number, label, desc }: StatItemProps) {
  return (
    <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200/60 dark:border-white/5 hover:border-blue-500/30 transition-all shadow-sm">
      <div className="font-display text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
        {number}
      </div>
      <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{label}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 leading-normal">{desc}</div>
    </div>
  );
}

export default function About() {
  const lighthouseStats = [
    { label: "Performance", score: 99, color: "text-emerald-500", progressColor: "stroke-emerald-500" },
    { label: "Accessibility", score: 100, color: "text-emerald-500", progressColor: "stroke-emerald-500" },
    { label: "Best Practices", score: 100, color: "text-emerald-500", progressColor: "stroke-emerald-500" },
    { label: "SEO Score", score: 100, color: "text-emerald-500", progressColor: "stroke-emerald-500" },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative bg-white dark:bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* About Left Visual Gauges */}
          <div className="lg:col-span-5 flex flex-col space-y-8" id="about-gauges-panel">
            <div className="relative bg-gray-50 dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Verified Lighthouse Performance
                </span>
              </div>

              {/* Grid of Google Lighthouse Circular Gauges */}
              <div className="grid grid-cols-2 gap-6">
                {lighthouseStats.map((stat, i) => {
                  const strokeWidth = 8;
                  const radius = 34;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (stat.score / 100) * circumference;

                  return (
                    <div key={i} className="flex flex-col items-center p-4 bg-white dark:bg-[#111111]/40 rounded-2xl border border-gray-100 dark:border-white/5">
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        {/* Background Ring */}
                        <svg className="absolute w-full h-full -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            className="text-gray-100 dark:text-gray-800"
                          />
                          {/* Animated Active Ring */}
                          <motion.circle
                            cx="40"
                            cy="40"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            whileInView={{ strokeDashoffset }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`${stat.progressColor}`}
                          />
                        </svg>
                        <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
                          {stat.score}
                        </span>
                      </div>
                      <span className="font-semibold text-xs text-gray-700 dark:text-gray-300 mt-3 text-center">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 text-xs text-blue-700 dark:text-blue-300 font-medium flex items-start gap-2.5">
                <Zap className="w-4 h-4 shrink-0 text-blue-600" />
                <span>Our framework architecture compiles directly to high-performance static layers to guarantee a near-instant core load speed.</span>
              </div>
            </div>
          </div>

          {/* About Right Context */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-blue-600 dark:bg-blue-500" />
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Who We Are
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white" id="about-heading">
              Crafting Digital Masterpieces That Convert Visitors Into Clients.
            </h2>

            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed" id="about-description-1">
              Peak Pixel Studio is an elite, responsive-focused web design and development studio dedicated to scaling commercial online presence. We engineer lightweight, visually arresting, and high-performance websites that represent your brand with technical authority and aesthetic elegance.
            </p>

            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed" id="about-description-2">
              By combining meticulous Swiss layout styling, mobile-first optimization grids, and robust backend integrations, we remove friction from digital touchpoints to secure high-value lead conversions for your business.
            </p>

            {/* List of Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2" id="about-pillars">
              {[
                { title: "Mobile-First Design", desc: "Crafted to look outstanding on every mobile screen size." },
                { title: "Ultra-Fast Loadtimes", desc: "SEO-optimized markup scoring 95+ on speed check tests." },
                { title: "Custom Admin Dashboards", desc: "Seamless content management designed explicitly for you." },
                { title: "Accessible UX Frameworks", desc: "Structured semantic HTML respecting universal accessibility." },
              ].map((pillar, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{pillar.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 4 Core Statistics Requested */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6" id="about-statistics-grid">
              <StatCard number="4+ Projects" label="Demo Work" desc="Antech, Samrat, SmileCare, PrimeNest." />
              <StatCard number="100%" label="Responsive" desc="Engineered for fluid smartphone & fluid desktop." />
              <StatCard number="Rank #1" label="SEO Optimized" desc="Clean semantic tag hierarchy and rich metadata." />
              <StatCard number="<1s Load" label="Fast Performance" desc="Aggressive assets compression & lazy loads." />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
