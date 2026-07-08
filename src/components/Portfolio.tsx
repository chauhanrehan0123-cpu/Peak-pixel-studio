import React, { useState } from "react";
import { Search, ExternalLink, Github, Layers, SlidersHorizontal, Eye, X, ArrowUpRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

interface PortfolioProps {
  projects: Project[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filtering & Searching logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="portfolio" className="py-20 md:py-28 relative bg-white dark:bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-blue-600" />
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Our Work
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white" id="portfolio-heading">
              Case Studies of Scaled Digital Experiences
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-light">
              Explore how we design and build responsive websites that help local businesses, medical groups, B2B manufacturers, and real estate brokerages scale up operations.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="mt-4 md:mt-0 font-mono text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200/50 dark:border-white/5">
            Showing <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredProjects.length}</span> of {projects.length} Projects
          </div>
        </div>

        {/* Search and Filters Controls */}
        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200/60 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between mb-10" id="portfolio-controls">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by industry, technology, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/70 dark:focus:border-blue-500/70"
              id="portfolio-search-input"
            />
          </div>

          {/* Filter Categories Chips */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-start md:justify-end overflow-x-auto pb-1 md:pb-0 scrollbar-none" id="portfolio-filter-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-white dark:bg-[#111111]/60 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-200/50 dark:border-white/5"
                }`}
                id={`filter-chip-${cat.replace(/\s+/g, "-").toLowerCase()}`}
              >
                {cat === "all" ? "All Sectors" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="portfolio-projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group relative bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-200/50 dark:border-white/5 overflow-hidden flex flex-col justify-between hover:shadow-xl dark:hover:bg-white/[0.07] transition-all duration-300"
                id={`project-card-${project.id}`}
              >
                {/* Project Image & Badge Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Backdrop tint on hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/90 text-gray-900 rounded-full px-5 py-3 text-xs font-semibold tracking-tight shadow-lg flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
                      id={`project-card-quick-view-${project.id}`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Case Details</span>
                    </button>
                  </div>

                  {/* Industry tag absolute */}
                  <div className="absolute top-4 left-4 bg-white/95 dark:bg-[#111111]/95 text-gray-900 dark:text-white font-mono text-[9px] font-bold tracking-wider px-3 py-1.5 rounded-full shadow-md uppercase">
                    {project.category}
                  </div>
                </div>

                {/* Project Metadata Body */}
                <div className="p-6 text-left flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                        {project.client}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-2.5 font-light line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/5">
                    {/* Tech Badges List */}
                    <div className="flex flex-wrap gap-1 mb-5">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="font-mono text-[9px] font-medium bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="font-mono text-[9px] text-gray-400 px-2 py-0.5">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View Button Triggers */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                        id={`project-card-link-view-${project.id}`}
                      >
                        <span>Case Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600/10 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
                          id={`project-card-link-demo-${project.id}`}
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white">No projects found</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                Try revising your query or resetting filters to view our standard case studies catalog.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                id="reset-portfolio-filters-btn"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Modal for Individual Project Details */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm"
              id="portfolio-case-modal"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-white dark:bg-[#111111] rounded-3xl overflow-hidden max-w-4xl w-full border border-gray-200 dark:border-white/10 shadow-2xl relative max-h-[90vh] flex flex-col text-left"
              >
                {/* Modal Header & Close Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                    id="close-case-modal-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="overflow-y-auto p-0 flex-grow">
                  {/* Hero Cover Image */}
                  <div className="relative aspect-[16/9] w-full bg-gray-900">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                      <span className="font-mono text-[10px] font-bold text-blue-400 tracking-widest uppercase mb-1">
                        {selectedProject.client}
                      </span>
                      <h2 className="font-display font-bold text-2xl md:text-4xl text-white">
                        {selectedProject.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Column: Context details */}
                    <div className="md:col-span-7 space-y-6">
                      <div>
                        <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Project Overview
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                          {selectedProject.longDescription || selectedProject.description}
                        </p>
                      </div>

                      {selectedProject.features && selectedProject.features.length > 0 && (
                        <div>
                          <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                            Key Product Features
                          </h4>
                          <ul className="space-y-2.5">
                            {selectedProject.features.map((feat, i) => (
                              <li key={i} className="flex gap-2.5 text-xs text-gray-600 dark:text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                                <span className="leading-normal">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Spec cards */}
                    <div className="md:col-span-5 space-y-6">
                      {/* Specs card */}
                      <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <div className="space-y-4">
                          <div>
                            <span className="block font-mono text-[10px] font-bold text-gray-400 uppercase">Sector / Type</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedProject.category}</span>
                          </div>
                          <div>
                            <span className="block font-mono text-[10px] font-bold text-gray-400 uppercase">Industry Focus</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedProject.industry}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tech stack card */}
                      <div>
                        <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="font-mono text-[10px] font-medium bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border border-blue-100/30 dark:border-blue-900/30 px-3 py-1 rounded-lg"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="pt-4 flex flex-col gap-2.5 border-t border-gray-100 dark:border-white/5">
                        {selectedProject.demoUrl && (
                          <a
                            href={selectedProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 rounded-xl text-center text-sm font-semibold shadow-md flex items-center justify-center gap-2"
                            id="case-modal-live-demo-btn"
                          >
                            <span>Launch Live Demo</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white py-3 rounded-xl text-center text-sm font-semibold border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2"
                            id="case-modal-github-btn"
                          >
                            <Github className="w-4 h-4" />
                            <span>Inspect Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
