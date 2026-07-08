import React from "react";
import {
  Briefcase,
  RotateCw,
  Target,
  Layout,
  Heart,
  Home,
  MapPin,
  Search,
  Settings,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  deliverables: string[];
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      title: "Business Website Design",
      desc: "Full-scale corporate identity hubs engineered with crisp layout typography to command corporate authority and generate organic client leads.",
      icon: Briefcase,
      tag: "Enterprise",
      deliverables: ["Custom UI/UX Architecture", "Stakeholders Alignment Hubs", "Dynamic Business Leads Forms"],
    },
    {
      title: "Website Redesign",
      desc: "Breathe new commercial life into underperforming products. We modernise aesthetics, restructure navigations, and optimize checkout conversion.",
      icon: RotateCw,
      tag: "Evolution",
      deliverables: ["Comprehensive Tech Audit", "Aesthetic Modernization", "Retention Flow Restructuring"],
    },
    {
      title: "Landing Pages",
      desc: "Hyper-focused single-purpose landing pages crafted for high-performance marketing campaigns. Designed to maximize opt-ins and product signups.",
      icon: Target,
      tag: "Conversion",
      deliverables: ["A/B Ready Lead Capture", "Compelling Structural Visual Flow", "Ultra-Light Assets Footprints"],
    },
    {
      title: "Portfolio Websites",
      desc: "Elegant digital stages for artists, architects, and high-end design agencies. We showcase visual assets with pristine luxury-themed templates.",
      icon: Layout,
      tag: "Showcase",
      deliverables: ["Immersive Media Lightboxes", "Bespoke Case Studies Structure", "Fluid Page Transitions"],
    },
    {
      title: "Healthcare Websites",
      desc: "Patient-first clinical spaces focusing on clean, accessibility-compliant interfaces, easy appointment scheduling, and soothing UI aesthetics.",
      icon: Heart,
      tag: "Medical",
      deliverables: ["ADA-Compliant Appointments", "Physicians Credentials Boards", "HIPAA/Consent Security Structures"],
    },
    {
      title: "Real Estate Websites",
      desc: "Premium property hubs loaded with visual filters, interactive layout maps, high-res galleries, and seamless agent inquiry flows.",
      icon: Home,
      tag: "Property",
      deliverables: ["Interactive Map Listing Integrations", "Tour Scheduler Funnels", "High-Fidelity Virtual Image Carousels"],
    },
    {
      title: "Local Business Websites",
      desc: "Local service funnels designed to place regional contracting, electrical, or plumbing services at the top of local customer searches.",
      icon: MapPin,
      tag: "Regional",
      deliverables: ["Click-to-Call Core Callouts", "Geographical Coverage Mapping", "Fast Estimates Dispatcher Forms"],
    },
    {
      title: "SEO Optimization",
      desc: "Technical SEO audits, semantic markup schema setup, asset optimizations, and rich-snippet configurations to secure top organic ranks.",
      icon: Search,
      tag: "Discovery",
      deliverables: ["Semantic Tags Structuring", "Core Web Vitals Optimizations", "JSON-LD Schema Registries"],
    },
    {
      title: "Website Maintenance",
      desc: "Ongoing high-speed hosting monitoring, secure core patches, active security audits, and continuous content updates to keep your brand flawless.",
      icon: Settings,
      tag: "Durable",
      deliverables: ["24/7 Security Health Audits", "Weekly Assets/Database Backups", "Subsecond Speed Keepalive Watchers"],
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 relative bg-gray-50 dark:bg-[#151515]">
      {/* Background accents */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-blue-600" />
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Our Capabilities
            </span>
            <span className="w-8 h-[2px] bg-blue-600" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white" id="services-heading">
            Modern Solutions, Tailored for Commercial Results
          </h2>
          
          <p className="text-base text-gray-600 dark:text-gray-300 mt-4 leading-relaxed" id="services-subheadline">
            We don't build generic templates. Every single product we design is engineered from the ground up to achieve fast loading times and maximize business conversions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid">
          {services.map((svc, index) => {
            const IconComponent = svc.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white dark:bg-white/5 rounded-3xl border border-gray-200/50 dark:border-white/5 p-8 flex flex-col justify-between group hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-xl dark:hover:bg-white/[0.07] hover:shadow-blue-600/5 transition-all duration-300"
                id={`service-card-${index}`}
              >
                <div>
                  {/* Service Icon and Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {svc.tag}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {svc.title}
                  </h3>

                  {/* Service Desc */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 font-light">
                    {svc.desc}
                  </p>
                </div>

                {/* Service Deliverables */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-5 mt-auto">
                  <div className="font-mono text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                    Core Deliverables
                  </div>
                  <ul className="space-y-1.5">
                    {svc.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
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
