import React, { useState } from "react";
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  Settings,
  Briefcase,
  Quote,
  MessageSquare,
  Globe,
  Save,
  Check,
  X,
  Mail,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project, Testimonial, ContactSubmission, AgencySettings } from "../types";

interface AdminPanelProps {
  settings: AgencySettings;
  projects: Project[];
  testimonials: Testimonial[];
  submissions: ContactSubmission[];
  onRefreshData: () => void;
}

export default function AdminPanel({
  settings,
  projects,
  testimonials,
  submissions,
  onRefreshData,
}: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(localStorage.getItem("adminToken"));
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"settings" | "projects" | "testimonials" | "submissions">("settings");

  // Save changes states
  const [settingsForm, setSettingsForm] = useState<AgencySettings>({ ...settings });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Edit/Add Project States
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: "",
    client: "",
    description: "",
    longDescription: "",
    category: "Business Website Design",
    image: "",
    tags: [],
    demoUrl: "",
    githubUrl: "",
    features: [],
    technologies: [],
    industry: "",
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");

  // Edit/Add Testimonial States
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    name: "",
    role: "",
    company: "",
    text: "",
    rating: 5,
    avatar: "",
  });
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  // Sync state if prop changes
  React.useEffect(() => {
    setSettingsForm({ ...settings });
  }, [settings]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("adminToken", data.token);
      } else {
        setLoginError(data.error || "Password incorrect.");
      }
    } catch (err) {
      setLoginError("Could not reach backend.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
  };

  const updateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveSuccess(false);

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsForm),
      });
      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  // PROJECT ACTIONS
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    const projectData = {
      ...projectForm,
      id: editingProjectId || undefined,
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      if (response.ok) {
        resetProjectForm();
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (response.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setProjectForm({ ...p });
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: "",
      client: "",
      description: "",
      longDescription: "",
      category: "Business Website Design",
      image: "",
      tags: [],
      demoUrl: "",
      githubUrl: "",
      features: [],
      technologies: [],
      industry: "",
    });
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setProjectForm((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput.trim()],
    }));
    setTagInput("");
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setProjectForm((prev) => ({
      ...prev,
      features: [...(prev.features || []), featureInput.trim()],
    }));
    setFeatureInput("");
  };

  const addTech = () => {
    if (!techInput.trim()) return;
    setProjectForm((prev) => ({
      ...prev,
      technologies: [...(prev.technologies || []), techInput.trim()],
    }));
    setTechInput("");
  };

  // TESTIMONIAL ACTIONS
  const saveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    const testData = {
      ...testimonialForm,
      id: editingTestimonialId || undefined,
    };

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      });
      if (response.ok) {
        resetTestimonialForm();
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const response = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (response.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditTestimonial = (t: Testimonial) => {
    setEditingTestimonialId(t.id);
    setTestimonialForm({ ...t });
  };

  const resetTestimonialForm = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({
      name: "",
      role: "",
      company: "",
      text: "",
      rating: 5,
      avatar: "",
    });
  };

  // SUBMISSION ACTIONS
  const updateSubmissionStatus = async (id: string, status: "new" | "read" | "contacted") => {
    try {
      const response = await fetch(`/api/contact/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Remove this client contact entry?")) return;
    try {
      const response = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (response.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // If token is absent, display sleek locks screen
  if (!token) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-[#111111] px-4">
        <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Admin Control Room</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
              This panel is protected by access controls. Enter password to manage homepage content, projects and leads.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-xs text-red-600 dark:text-red-400 font-bold rounded-xl border border-red-100 dark:border-red-900/10">
                {loginError}
              </div>
            )}
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: admin123)"
                className="w-full text-center bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/70"
                id="admin-login-password-input"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              id="admin-login-submit-btn"
            >
              {loginLoading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>

          <div className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
            Default credentials: <span className="font-bold underline">admin123</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-gray-50 dark:bg-[#111111] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header with Logouts */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 dark:border-white/10 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
              <Unlock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Agency Control Panel</h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                Authenticated Admin Session • Peak Pixel Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRefreshData}
              className="p-2.5 rounded-xl bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-white/10 transition-colors cursor-pointer"
              title="Sync state from data file"
              id="admin-refresh-data-btn"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 transition-all cursor-pointer"
              id="admin-logout-btn"
            >
              Lock Panel
            </button>
          </div>
        </div>

        {/* Outer Grid: Left Tabs, Right Form views */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column Tabs Selector */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            {[
              { id: "settings", label: "Homepage & SEO", icon: Settings },
              { id: "projects", label: "Case Studies Manager", icon: Briefcase },
              { id: "testimonials", label: "Client Testimonials", icon: Quote },
              { id: "submissions", label: "Lead Inquiries", icon: MessageSquare, count: submissions.length },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-between p-4 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10"
                      : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200/50 dark:border-white/5"
                  }`}
                  id={`admin-tab-btn-${tab.id}`}
                >
                  <div className="flex items-center gap-3">
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                      activeTab === tab.id ? "bg-white text-blue-600" : "bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column Core Workspace */}
          <div className="lg:col-span-9 bg-white dark:bg-white/5 p-6 md:p-8 rounded-3xl border border-gray-200/60 dark:border-white/5">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: HOMEPAGE SETTINGS */}
              {activeTab === "settings" && (
                <motion.div
                  key="settings-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">Homepage & SEO Content Control</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Edit general copy headings, email links, and core page metadata indices.</p>
                  </div>

                  <form onSubmit={updateSettings} className="space-y-5">
                    {saveSuccess && (
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-xs text-emerald-600 dark:text-emerald-400 font-bold rounded-xl border border-emerald-100 dark:border-emerald-900/10 flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Agency settings updated and saved to server-data.json successfully!</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Hero Title Heading</label>
                        <input
                          type="text"
                          required
                          value={settingsForm.headline}
                          onChange={(e) => setSettingsForm((prev) => ({ ...prev, headline: e.target.value }))}
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Hero Subtitle</label>
                        <input
                          type="text"
                          required
                          value={settingsForm.subheadline}
                          onChange={(e) => setSettingsForm((prev) => ({ ...prev, subheadline: e.target.value }))}
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Agency Contact Email</label>
                        <input
                          type="email"
                          required
                          value={settingsForm.contactEmail}
                          onChange={(e) => setSettingsForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Agency Contact Phone</label>
                        <input
                          type="text"
                          value={settingsForm.contactPhone || ""}
                          onChange={(e) => setSettingsForm((prev) => ({ ...prev, contactPhone: e.target.value }))}
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                          placeholder="e.g. +91 9173038705"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Instagram URL</label>
                        <input
                          type="text"
                          value={settingsForm.instagramUrl}
                          onChange={(e) => setSettingsForm((prev) => ({ ...prev, instagramUrl: e.target.value }))}
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">LinkedIn Profile Link</label>
                        <input
                          type="text"
                          value={settingsForm.linkedinUrl}
                          onChange={(e) => setSettingsForm((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">GitHub Profile Link</label>
                        <input
                          type="text"
                          value={settingsForm.githubUrl}
                          onChange={(e) => setSettingsForm((prev) => ({ ...prev, githubUrl: e.target.value }))}
                          className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-white/5 pt-5 space-y-4">
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                        <Globe className="w-4 h-4" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Search Engine Optimization (SEO) Config</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">SEO Page Title Tag</label>
                          <input
                            type="text"
                            required
                            value={settingsForm.seoTitle}
                            onChange={(e) => setSettingsForm((prev) => ({ ...prev, seoTitle: e.target.value }))}
                            className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">SEO Meta Description Tag</label>
                          <textarea
                            rows={2}
                            required
                            value={settingsForm.seoDescription}
                            onChange={(e) => setSettingsForm((prev) => ({ ...prev, seoDescription: e.target.value }))}
                            className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={saveLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-md"
                        id="admin-settings-save-btn"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saveLoading ? "Saving..." : "Save Config Details"}</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* TAB 2: PROJECTS MANAGER */}
              {activeTab === "projects" && (
                <motion.div
                  key="projects-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-8"
                >
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">Case Studies & Projects Catalog</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-light">Create, edit, specify technology metrics and publish digital solutions.</p>
                  </div>

                  {/* Add / Edit Form */}
                  <div className="bg-gray-50 dark:bg-[#111111]/40 p-6 rounded-2xl border border-gray-200/50 dark:border-white/5">
                    <h3 className="font-display font-semibold text-base text-gray-950 dark:text-white mb-4">
                      {editingProjectId ? `Editing: ${projectForm.title}` : "Add New Client Case Study"}
                    </h3>

                    <form onSubmit={saveProject} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Project Name / Title</label>
                          <input
                            type="text"
                            required
                            placeholder="Antech Electric"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Client Corporation</label>
                          <input
                            type="text"
                            required
                            placeholder="Antech Electric Inc."
                            value={projectForm.client}
                            onChange={(e) => setProjectForm((prev) => ({ ...prev, client: e.target.value }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Industry Sector</label>
                          <input
                            type="text"
                            required
                            placeholder="Construction & Contracting"
                            value={projectForm.industry}
                            onChange={(e) => setProjectForm((prev) => ({ ...prev, industry: e.target.value }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Category / Type</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm((prev) => ({ ...prev, category: e.target.value }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          >
                            <option value="Business Website Design">Business Website Design</option>
                            <option value="Website Redesign">Website Redesign</option>
                            <option value="Landing Page">Landing Page</option>
                            <option value="Portfolio Website">Portfolio Website</option>
                            <option value="Healthcare Website">Healthcare Website</option>
                            <option value="Real Estate Website">Real Estate Website</option>
                            <option value="Local Business Website">Local Business Website</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Screenshot Cover URL (or use Preset)</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. https://images.unsplash.com/photo-1558211583-d26f610c1eb1"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm((prev) => ({ ...prev, image: e.target.value }))}
                          className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                        />
                        <div className="flex gap-2 mt-1.5 flex-wrap">
                          <button
                            type="button"
                            onClick={() => setProjectForm(prev => ({ ...prev, image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&w=1200&q=80" }))}
                            className="text-[9px] font-mono text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded border border-blue-200 dark:border-blue-900/30"
                          >
                            Preset: Contracting
                          </button>
                          <button
                            type="button"
                            onClick={() => setProjectForm(prev => ({ ...prev, image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80" }))}
                            className="text-[9px] font-mono text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded border border-blue-200 dark:border-blue-900/30"
                          >
                            Preset: Medical
                          </button>
                          <button
                            type="button"
                            onClick={() => setProjectForm(prev => ({ ...prev, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80" }))}
                            className="text-[9px] font-mono text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded border border-blue-200 dark:border-blue-900/30"
                          >
                            Preset: Realty
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Live Demo Link</label>
                          <input
                            type="text"
                            placeholder="#demo-link"
                            value={projectForm.demoUrl}
                            onChange={(e) => setProjectForm((prev) => ({ ...prev, demoUrl: e.target.value }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">GitHub Link (optional)</label>
                          <input
                            type="text"
                            placeholder="https://github.com/..."
                            value={projectForm.githubUrl}
                            onChange={(e) => setProjectForm((prev) => ({ ...prev, githubUrl: e.target.value }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Short Description (for project card)</label>
                        <input
                          type="text"
                          required
                          placeholder="Modern service website for an electrical contractor..."
                          value={projectForm.description}
                          onChange={(e) => setProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Long Description (for detail modal)</label>
                        <textarea
                          rows={3}
                          placeholder="Provide a massive, detailed review explaining client problem, our design solutions..."
                          value={projectForm.longDescription}
                          onChange={(e) => setProjectForm((prev) => ({ ...prev, longDescription: e.target.value }))}
                          className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs resize-none"
                        />
                      </div>

                      {/* Tag, Feature, Tech Builders */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200/50 dark:border-white/5 pt-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Keywords / tags ({projectForm.tags?.length || 0})</label>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              placeholder="React"
                              className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-2 py-1 text-xs"
                            />
                            <button type="button" onClick={addTag} className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 px-3.5 py-1 text-xs font-semibold rounded-lg">+</button>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {projectForm.tags?.map((t, i) => (
                              <span key={i} className="text-[9px] font-mono bg-blue-50/60 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded flex items-center gap-1">
                                <span>{t}</span>
                                <button type="button" onClick={() => setProjectForm(prev => ({ ...prev, tags: prev.tags?.filter((_, idx) => idx !== i) }))} className="hover:text-red-500 font-bold font-sans">×</button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Key Features ({projectForm.features?.length || 0})</label>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={featureInput}
                              onChange={(e) => setFeatureInput(e.target.value)}
                              placeholder="Live Booking Form"
                              className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-2 py-1 text-xs"
                            />
                            <button type="button" onClick={addFeature} className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 px-3.5 py-1 text-xs font-semibold rounded-lg">+</button>
                          </div>
                          <div className="flex flex-col gap-1 mt-1.5 text-left text-[9px] text-gray-500 max-h-24 overflow-y-auto">
                            {projectForm.features?.map((f, i) => (
                              <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-[#111111]/60 p-1.5 rounded">
                                <span className="truncate w-40">{f}</span>
                                <button type="button" onClick={() => setProjectForm(prev => ({ ...prev, features: prev.features?.filter((_, idx) => idx !== i) }))} className="text-red-500 font-semibold px-1">×</button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Core Tech Specs ({projectForm.technologies?.length || 0})</label>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={techInput}
                              onChange={(e) => setTechInput(e.target.value)}
                              placeholder="Tailwind CSS"
                              className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-2 py-1 text-xs"
                            />
                            <button type="button" onClick={addTech} className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 px-3.5 py-1 text-xs font-semibold rounded-lg">+</button>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {projectForm.technologies?.map((t, i) => (
                              <span key={i} className="text-[9px] font-mono bg-purple-50/60 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded flex items-center gap-1">
                                <span>{t}</span>
                                <button type="button" onClick={() => setProjectForm(prev => ({ ...prev, technologies: prev.technologies?.filter((_, idx) => idx !== i) }))} className="hover:text-red-500 font-bold font-sans">×</button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="flex justify-between pt-3">
                        {editingProjectId && (
                          <button
                            type="button"
                            onClick={resetProjectForm}
                            className="bg-gray-200 dark:bg-white/5 hover:bg-gray-300 hover:text-black text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                          >
                            Cancel Edit
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={saveLoading}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl text-xs shadow ml-auto"
                        >
                          {editingProjectId ? "Update Published Project" : "Publish Case Study"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active List */}
                  <div className="space-y-3">
                    <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white">Active Case Studies ({projects.length})</h3>
                    <div className="border border-gray-200/60 dark:border-white/10 rounded-2xl overflow-hidden divide-y divide-gray-200/60 dark:divide-white/10">
                      {projects.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-4 bg-white dark:bg-transparent">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-100 dark:border-gray-800" />
                            <div>
                              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{p.title}</h4>
                              <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                                {p.client} • <span className="text-blue-500">{p.category}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEditProject(p)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProject(p.id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-500 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* TAB 3: TESTIMONIALS MANAGER */}
              {activeTab === "testimonials" && (
                <motion.div
                  key="testimonials-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-8"
                >
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">Client Testimonials Manager</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Edit, add, and organize client praise star ratings.</p>
                  </div>

                  {/* Add / Edit Form */}
                  <div className="bg-gray-50 dark:bg-[#111111]/40 p-6 rounded-2xl border border-gray-200/50 dark:border-white/5">
                    <h3 className="font-display font-semibold text-base text-gray-950 dark:text-white mb-4">
                      {editingTestimonialId ? `Editing Testimonial` : "Add Client Testimonial"}
                    </h3>

                    <form onSubmit={saveTestimonial} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Author Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Mike Reynolds"
                            value={testimonialForm.name}
                            onChange={(e) => setTestimonialForm((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Role / Job Title</label>
                          <input
                            type="text"
                            required
                            placeholder="CEO & Founder"
                            value={testimonialForm.role}
                            onChange={(e) => setTestimonialForm((prev) => ({ ...prev, role: e.target.value }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Company Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Antech Electric"
                            value={testimonialForm.company}
                            onChange={(e) => setTestimonialForm((prev) => ({ ...prev, company: e.target.value }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Star Rating</label>
                          <select
                            value={testimonialForm.rating}
                            onChange={(e) => setTestimonialForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                            className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                          >
                            <option value={5}>5 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={3}>3 Stars</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Avatar Image URL (optional)</label>
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/photo-..."
                          value={testimonialForm.avatar}
                          onChange={(e) => setTestimonialForm((prev) => ({ ...prev, avatar: e.target.value }))}
                          className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Testimonial Quote Text</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Peak Pixel Studio completely turned our online presence around..."
                          value={testimonialForm.text}
                          onChange={(e) => setTestimonialForm((prev) => ({ ...prev, text: e.target.value }))}
                          className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs resize-none"
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex justify-between">
                        {editingTestimonialId && (
                          <button
                            type="button"
                            onClick={resetTestimonialForm}
                            className="bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-xs font-semibold"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl text-xs shadow ml-auto"
                        >
                          {editingTestimonialId ? "Update Testimonial" : "Publish Testimonial"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active List */}
                  <div className="space-y-3">
                    <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white">Published Feedback ({testimonials.length})</h3>
                    <div className="border border-gray-200/60 dark:border-white/10 rounded-2xl overflow-hidden divide-y divide-gray-200/60 dark:divide-white/10">
                      {testimonials.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-4 bg-white dark:bg-transparent text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs uppercase">
                              {t.name.slice(0, 2)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{t.name}</h4>
                              <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                                {t.role}, <span className="text-blue-500 font-semibold">{t.company}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEditTestimonial(t)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteTestimonial(t.id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-500 hover:text-red-500 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* TAB 4: CLIENT INQUIRIES */}
              {activeTab === "submissions" && (
                <motion.div
                  key="submissions-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">Business Lead Inquiries</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-light">Inspect client messages, manage status, and delete spam records.</p>
                  </div>

                  <div className="space-y-4">
                    {submissions.length === 0 ? (
                      <div className="py-12 text-center text-gray-400">
                        <Mail className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <h4 className="font-bold">No leads recorded</h4>
                        <p className="text-xs mt-0.5">Submit the public contact form on the home screen to test submission logging.</p>
                      </div>
                    ) : (
                      submissions.map((sub) => (
                        <div
                          key={sub.id}
                          className={`p-6 rounded-2xl border transition-colors text-left relative ${
                            sub.status === "new"
                              ? "bg-blue-50/50 dark:bg-blue-950/10 border-blue-100 dark:border-blue-950/30"
                              : "bg-white dark:bg-transparent border-gray-200/60 dark:border-white/10"
                          }`}
                        >
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            {/* Action Indicators */}
                            <button
                              onClick={() => deleteSubmission(sub.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                              title="Remove submission record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-3.5">
                            {/* Card Top Header */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                              <span className="font-semibold text-sm text-gray-900 dark:text-white">{sub.name}</span>
                              {sub.businessName && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-0.5 rounded-md font-medium">
                                  {sub.businessName}
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                                {new Date(sub.timestamp).toLocaleString()}
                              </span>
                            </div>

                            {/* Email link */}
                            <div className="text-xs text-blue-600 dark:text-blue-400 font-mono font-medium">
                              <a href={`mailto:${sub.email}`} className="hover:underline flex items-center gap-1">
                                <span>{sub.email}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            {/* Message text */}
                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-white/5 p-3.5 rounded-xl border border-gray-100 dark:border-white/5 italic">
                              "{sub.message}"
                            </p>

                            {/* Status controls */}
                            <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Lead status:</span>
                                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase ${
                                  sub.status === "new"
                                    ? "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                                    : sub.status === "read"
                                    ? "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                                    : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                                }`}>
                                  {sub.status}
                                </span>
                              </div>

                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => updateSubmissionStatus(sub.id, "read")}
                                  className={`px-3 py-1 text-[10px] font-semibold rounded-lg border transition-all ${
                                    sub.status === "read"
                                      ? "bg-amber-500 text-white border-amber-500"
                                      : "bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10"
                                  }`}
                                >
                                  Read
                                </button>
                                <button
                                  onClick={() => updateSubmissionStatus(sub.id, "contacted")}
                                  className={`px-3 py-1 text-[10px] font-semibold rounded-lg border transition-all ${
                                    sub.status === "contacted"
                                      ? "bg-emerald-500 text-white border-emerald-500"
                                      : "bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10"
                                  }`}
                                >
                                  Contacted
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
