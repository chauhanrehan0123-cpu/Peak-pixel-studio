import React from "react";
import { Search, Compass, Palette, Code, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface StepItem {
  num: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  deliverables: string[];
}

export default function Process() {
  const steps: StepItem[] = [
    {
      num: "01",
      title: "Discovery",
      desc: "We research your business, inspect competitor systems, audit regional search demands, and draft your sitemap specification outline.",
      icon: Compass,
      accent: "text-blue-500 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/30",
      deliverables: ["Competitor Tech & SEO Audits", "Operational Sitemap Blueprints", "Functional Spec Agreements"],
    },
    {
      num: "02",
      title: "Design",
      desc: "Our design team translates your brand into premium wireframes, bespoke grid layouts, eye-safe typography sheets, and fully mockups.",
      icon: Palette,
      accent: "text-purple-500 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/30",
      deliverables: ["High-Fidelity Figma Concepts", "Interactive Navigation Prototypes", "Aesthetic Theme Signoffs"],
    },
    {
      num: "03",
      title: "Development",
      desc: "We build and code using high-speed React, compiling responsive grids with clean, modular, and performant Tailwind CSS utilities.",
      icon: Code,
      accent: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/30",
      deliverables: ["React Responsive Pages", "Durable Server-Side APIs", "Admin Portal Implementations"],
    },
    {
      num: "04",
      title: "Launch",
      desc: "We perform aggressive testing, inspect Lighthouse scores to guarantee a 95+ speed, configure SEO metadata, and deploy to production servers.",
      icon: CheckCircle,
      accent: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/30",
      deliverables: ["Lighthouse Speed Optimizations", "Dynamic XML Sitemap Registries", "Production Cold-Start Deployments"],
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 relative bg-gray-50 dark:bg-[#151515] overflow-hidden">
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-blue-600" />
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Our Methodology
            </span>
            <span className="w-8 h-[2px] bg-blue-600" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white" id="process-heading">
            How We Build Premium Websites
          </h2>
          
          <p className="text-base text-gray-600 dark:text-gray-300 mt-4 leading-relaxed" id="process-subheadline">
            Our disciplined four-phase delivery cycle removes speculation from product launches, ensuring we deliver projects on schedule and at peak technical execution.
          </p>
        </div>

        {/* Process Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative" id="process-timeline-container">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[64px] left-[10%] right-[10%] h-[2px] bg-gray-200 dark:bg-white/10 z-0 pointer-events-none" />

          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-3xl border border-gray-200/50 dark:border-white/5 p-6 flex flex-col justify-between relative z-10 hover:border-blue-500/30 transition-colors"
                id={`process-step-${idx}`}
              >
                <div>
                  {/* Step indicator header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-4xl text-gray-200 dark:text-white/10 select-none">
                      {step.num}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${step.accent}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6 font-light">
                    {step.desc}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-4 mt-auto">
                  <div className="font-mono text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">
                    Phase Milestones
                  </div>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                        <span className="w-1 h-1 rounded-full bg-blue-500" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
