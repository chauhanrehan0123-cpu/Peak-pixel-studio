import React, { useState } from "react";
import { Mail, Instagram, Linkedin, Github, Send, CheckCircle2, Sparkles, Building2, MapPin, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  contactEmail: string;
  contactPhone?: string;
  instagramUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  onSubmissionSuccess?: () => void;
}

export default function Contact({
  contactEmail,
  contactPhone,
  instagramUrl,
  linkedinUrl,
  githubUrl,
  onSubmissionSuccess,
}: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Please fill in all mandatory fields (Name, Email, and Message).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, businessName, message }),
      });

      const resData = await response.json();
      if (response.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setBusinessName("");
        setMessage("");
        if (onSubmissionSuccess) onSubmissionSuccess();
      } else {
        setError(resData.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-gray-50 dark:bg-[#151515]">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Contact Left Information Card */}
          <div className="lg:col-span-5 text-left space-y-8" id="contact-details-panel">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-blue-600" />
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white" id="contact-heading">
                Let's Build Something Exceptional Together.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed font-light">
                Have a project in mind, need a design redesign, or want to audit your current platform load speeds? Drop us a line, and let's craft a digital product that performs.
              </p>
            </div>

            {/* Support Metrics */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Email Address</h4>
                  <a
                    href={`mailto:${contactEmail || "hello@peakpixelstudio.com"}`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-0.5 block"
                  >
                    {contactEmail || "hello@peakpixelstudio.com"}
                  </a>
                </div>
              </div>

              {contactPhone && (
                <div className="flex items-start gap-4" id="contact-phone-item">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Phone Support</h4>
                    <a
                      href={`tel:${contactPhone}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-0.5 block"
                    >
                      {contactPhone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Headquarters</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 block">
                    Silicon Valley, California / Available Worldwide
                  </span>
                </div>
              </div>
            </div>

            {/* Social Network Channels */}
            <div className="pt-6 border-t border-gray-200 dark:border-white/5">
              <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                Connect on Social Networks
              </h4>
              <div className="flex items-center gap-3" id="contact-social-links">
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-500 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all"
                    title="Instagram Profile"
                  >
                    <Instagram className="w-4.5 h-4.5" />
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-500 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all"
                    title="LinkedIn Page"
                  >
                    <Linkedin className="w-4.5 h-4.5" />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-500 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all"
                    title="GitHub Repository"
                  >
                    <Github className="w-4.5 h-4.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Right Form Box */}
          <div className="lg:col-span-7 w-full" id="contact-form-panel">
            <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-lg relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 text-left"
                  >
                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 text-xs text-red-600 dark:text-red-400 font-semibold rounded-xl border border-red-100 dark:border-red-950/30">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Jessica Chen"
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/70"
                          id="contact-form-name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jessica@redefineinc.com"
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/70"
                          id="contact-form-email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                        Business / Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Redefine Marketing"
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/70"
                          id="contact-form-business"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please describe your sitemap requirements, desired launch date, or redesign targets..."
                        className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/70 resize-none"
                        id="contact-form-message"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      id="contact-form-submit-btn"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Inquiry Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white">
                      Inquiry Sent Successfully!
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed font-light">
                      Thank you! Your project details have been logged on our desk. A design strategist will review your inquiry and follow up shortly.
                    </p>

                    <button
                      onClick={() => setSuccess(false)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-2 cursor-pointer"
                      id="contact-new-message-btn"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
