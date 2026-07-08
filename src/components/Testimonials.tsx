import React from "react";
import { Quote, Star, ArrowUpRight, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { Testimonial } from "../types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-20 md:py-28 relative bg-white dark:bg-[#111111]">
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-blue-600" />
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Client Feedback
            </span>
            <span className="w-8 h-[2px] bg-blue-600" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white" id="testimonials-heading">
            What Our Partners Say About Us
          </h2>
          
          <p className="text-base text-gray-600 dark:text-gray-300 mt-4 leading-relaxed" id="testimonials-subheadline">
            Read comments from independent business owners, healthcare directors, and real estate agents who transformed their commercial presence with Peak Pixel Studio.
          </p>
        </div>

        {/* Testimonials Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="testimonials-grid">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-200/50 dark:border-white/5 p-8 relative hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all flex flex-col justify-between"
              id={`testimonial-card-${test.id}`}
            >
              {/* Top Quote Icon and Star Rating */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Quote className="w-5 h-5 fill-current" />
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < test.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-200 dark:text-gray-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Quote Text */}
              <blockquote className="text-base text-gray-600 dark:text-gray-300 italic font-light leading-relaxed mb-8 flex-grow">
                "{test.text}"
              </blockquote>

              {/* Author Metadata Frame */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-gray-200/50 dark:border-white/5">
                {test.avatar ? (
                  <img
                    src={test.avatar}
                    alt={test.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-gray-100 dark:border-gray-800"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold uppercase select-none">
                    {test.name.slice(0, 2)}
                  </div>
                )}
                <div className="text-left">
                  <cite className="not-italic font-semibold text-sm text-gray-900 dark:text-white block">
                    {test.name}
                  </cite>
                  <span className="font-mono text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    {test.role}, <span className="text-blue-600 dark:text-blue-400">{test.company}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
