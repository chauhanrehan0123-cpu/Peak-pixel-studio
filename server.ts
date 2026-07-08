import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { FullAgencyData, Project, Testimonial, ContactSubmission, AgencySettings } from "./src/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE_PATH = path.join(process.cwd(), "server-data.json");

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

// Standard mock data to initialize if server-data.json doesn't exist
const initialData: FullAgencyData = {
  settings: {
    headline: "Modern Websites That Help Businesses Grow.",
    subheadline: "We design fast, responsive, and conversion-focused websites for businesses worldwide.",
    contactEmail: "Rehanchauhan0123@gmail.com",
    contactPhone: "+91 9173038705",
    instagramUrl: "https://www.instagram.com/peakpixelstudio?igsh=OW5hZ2NmMWRyYWFm",
    linkedinUrl: "https://linkedin.com/company/peakpixelstudio",
    githubUrl: "https://github.com/peakpixelstudio",
    seoTitle: "Peak Pixel Studio | Premium Web Design & Development Agency",
    seoDescription: "Peak Pixel Studio builds minimal, elegant, conversion-focused websites with ultra-fast performance, modern UI/UX design, and SEO optimization."
  },
  projects: [
    {
      id: "antech-electric",
      title: "Antech Electric",
      client: "Antech Electric Inc.",
      description: "Modern, high-converting service website for a leading regional electrical contractor, complete with a visual service gallery, emergency dispatcher, and dynamic contact funnel.",
      longDescription: "Antech Electric needed to transition from a traditional word-of-mouth business to a digitally discoverable service leader. We designed and built a highly responsive platform featuring a real-time service booking system, structured gallery of industrial and residential projects, an active emergency callout dispatcher, and an intuitive admin panel for managing work orders and gallery uploads.",
      category: "Local Business Website",
      image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&w=1200&q=80",
      tags: ["React", "Tailwind CSS", "Emergency Funnel", "Service Gallery"],
      demoUrl: "#demo-antech",
      githubUrl: "https://github.com/peakpixelstudio/antech-electric",
      features: [
        "Interactive emergency booking system with rapid SMS dispatch alerts.",
        "Fully responsive service gallery categorized by residential, commercial, and industrial segments.",
        "Secure customer testimonial board with quick star ratings.",
        "Admin control dashboard to manage active service areas and work requests.",
        "Speed-optimized image lazy-loading to secure high page-performance."
      ],
      technologies: ["React 19", "Tailwind CSS v4", "Motion Animation", "Framer Motion", "Google Maps Embed API"],
      industry: "Construction & Contracting"
    },
    {
      id: "samrat-shutters",
      title: "Samrat Rolling Shutters",
      client: "Samrat Manufacturing",
      description: "Premium manufacturing B2B catalog and portfolio demonstrating heavy-duty rolling shutters, industrial doors, and custom hardware accessories with quotation builder.",
      longDescription: "Samrat Rolling Shutters is a premium industrial manufacturing company. We re-engineered their physical catalog into an interactive digital showcase. The platform features an architectural product catalog, detailed engineering specification downloads, a secure request-a-quote calculator that translates requirements into prompt email requests, and a showcase of prominent installations across nationwide factories.",
      category: "Business Website Design",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
      tags: ["B2B Catalog", "Quote Builder", "SEO Optimized", "Responsive Grid"],
      demoUrl: "#demo-samrat",
      githubUrl: "https://github.com/peakpixelstudio/samrat-rolling-shutters",
      features: [
        "Comprehensive architectural product catalog with structured specifications.",
        "Interactive Quote Builder allowing buyers to request size custom-quotes instantly.",
        "Elegant project showcase featuring past large-scale industrial installations.",
        "High-contrast specifications checker with accessible layout guidelines.",
        "Fast-loading downloadable blueprint manuals and material safety PDFs."
      ],
      technologies: ["React 19", "Tailwind CSS", "Motion API", "Responsive Data Grids", "PDF Generator Helper"],
      industry: "Manufacturing"
    },
    {
      id: "smilecare-dental",
      title: "SmileCare Dental",
      client: "SmileCare Clinic Group",
      description: "Modern patient-first healthcare experience with real-time dental booking, specialist doctor profiles, and treatment pricing guides.",
      longDescription: "SmileCare Clinic wanted to streamline the patient booking experience and reduce phone queue bottlenecks. We built a soothing, professional healthcare platform prioritizing comfort and structure. It highlights clinical specializations, detailed bio-cards for attending doctors, a highly accessible interactive treatment pricing index, and an automated booking calendar that routes patient intake details directly to the clinic administration.",
      category: "Healthcare Website",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      tags: ["Healthcare UI", "Appointment System", "ADA Compliant", "Doctor Bios"],
      demoUrl: "#demo-smilecare",
      githubUrl: "https://github.com/peakpixelstudio/smilecare-dental",
      features: [
        "Intuitive booking form capturing primary symptoms, preferred slot, and contact details.",
        "Interactive, animated treatment guides explaining services with glassmorphism cards.",
        "Polished, professional doctor profiles highlighting expertise and certifications.",
        "Comprehensive patient information hub with post-appointment guidelines.",
        "Optimized semantic markup satisfying strict accessibility requirements (ADA/WCAG)."
      ],
      technologies: ["React 19", "Tailwind CSS", "Lucide Icons", "Motion Staggers", "Local Calendar State Router"],
      industry: "Healthcare"
    },
    {
      id: "primenest-realty",
      title: "PrimeNest Realty",
      client: "PrimeNest Luxury Brokerage",
      description: "Elegant boutique real estate platform featuring custom property filtering, map integrations, luxury agent cards, and physical viewing schedulers.",
      longDescription: "PrimeNest Realty represents high-net-worth clients seeking luxury properties. We designed an immersive, premium real estate interface emphasizing photography, architectural layouts, and streamlined inquiries. The app supports custom client search, elegant property cards mapping interior details (beds, baths, square footage), dynamic filter criteria, agent profiles, and a booking modal for planning private on-site viewings.",
      category: "Real Estate Website",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      tags: ["Luxury Listings", "Advanced Filters", "Viewing Schedulers", "Interactive Map"],
      demoUrl: "#demo-primenest",
      githubUrl: "https://github.com/peakpixelstudio/primenest-realty",
      features: [
        "Advanced property list browser with real-time filtering by price, location, and property type.",
        "Gorgeous, immersive image lightboxes emphasizing interior architecture details.",
        "Direct agent contact forms tied specifically to individual listing cards.",
        "Interactive schedule planner to schedule a physical walkthrough or video tour.",
        "Responsive, premium typography featuring custom modern tracking and editorial spacing."
      ],
      technologies: ["React 19", "Tailwind CSS v4", "Motion Slide-ups", "Custom Listing Context Hooks", "Map Embed Layouts"],
      industry: "Real Estate"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Mike Reynolds",
      role: "Founder & CEO",
      company: "Antech Electric",
      text: "Peak Pixel Studio delivered a masterpiece. Our digital inquiries jumped by 150% within two months of launch. The service booking funnel is incredibly smooth, and we receive comments on our web design constantly. Highly professional!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-2",
      name: "Sanjay Samrat",
      role: "Managing Director",
      company: "Samrat Rolling Shutters",
      text: "We needed to move our massive physical B2B catalog online, and Peak Pixel Studio executed perfectly. The interactive quote calculator has saved our sales team countless hours, and our SEO rankings for industrial shutters have surged.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-3",
      name: "Dr. Sarah Jenkins",
      role: "Chief Dental Surgeon",
      company: "SmileCare Group",
      text: "The patient booking interface is a game changer. We have seen a 40% reduction in phone intake calls because patients find the web reservation system so easy to use. The aesthetic is clean, soothing, and premium.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-4",
      name: "David Miller",
      role: "Principal Broker",
      company: "PrimeNest Realty",
      text: "High-end real estate demands high-end presentation. The portfolio and listing pages Peak Pixel Studio built for us are stunning. Clients frequently remark on the speed and luxurious layout of our platform.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    }
  ],
  submissions: [
    {
      id: "sub-1",
      name: "Jessica Chen",
      email: "jessica@redefineinc.com",
      businessName: "Redefine Marketing",
      message: "Hi, we love your design portfolio! We are looking to redesign our B2B SaaS landing page this quarter. We'd love to get a free demo and discuss pricing.",
      timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), // 4 hours ago
      status: "new"
    },
    {
      id: "sub-2",
      name: "Marcus Brody",
      email: "marcus@brodybuilders.com",
      businessName: "Brody Custom Homes",
      message: "I saw the PrimeNest Realty website and was super impressed. We need a modern, high-speed website to showcase our custom builds. Please contact me at your earliest convenience.",
      timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // 1 day ago
      status: "read"
    }
  ]
};

// Ensure data file exists or initialize it
function loadData(): FullAgencyData {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }
    const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(content) as FullAgencyData;
  } catch (err) {
    console.error("Error reading data file:", err);
    return initialData;
  }
}

function saveData(data: FullAgencyData) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving data file:", err);
  }
}

// REST endpoints
app.get("/api/data", (req, res) => {
  const data = loadData();
  res.json(data);
});

// Admin Authentication endpoint
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === "admin123") {
    res.json({ success: true, token: "peak-pixel-secret-token" });
  } else {
    res.status(401).json({ success: false, error: "Invalid admin password." });
  }
});

// Submit a contact form (Public)
app.post("/api/contact", (req, res) => {
  const { name, email, businessName, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, and message are mandatory." });
  }

  const data = loadData();
  const newSubmission: ContactSubmission = {
    id: generateId(),
    name,
    email,
    businessName: businessName || "",
    message,
    timestamp: new Date().toISOString(),
    status: "new"
  };

  data.submissions.unshift(newSubmission);
  saveData(data);
  res.status(201).json({ success: true, submission: newSubmission });
});

// Update submission status (Admin)
app.post("/api/contact/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!status || !["new", "read", "contacted"].includes(status)) {
    return res.status(400).json({ error: "Invalid status state." });
  }

  const data = loadData();
  const submission = data.submissions.find(s => s.id === id);
  if (!submission) {
    return res.status(404).json({ error: "Submission not found." });
  }

  submission.status = status;
  saveData(data);
  res.json({ success: true, submission });
});

// Delete contact submission (Admin)
app.delete("/api/contact/:id", (req, res) => {
  const { id } = req.params;
  const data = loadData();
  const initialLength = data.submissions.length;
  data.submissions = data.submissions.filter(s => s.id !== id);
  
  if (data.submissions.length === initialLength) {
    return res.status(404).json({ error: "Submission not found." });
  }
  
  saveData(data);
  res.json({ success: true, message: "Submission removed." });
});

// Update General Settings (Admin)
app.post("/api/settings", (req, res) => {
  const newSettings = req.body as AgencySettings;
  if (!newSettings || !newSettings.headline || !newSettings.subheadline) {
    return res.status(400).json({ error: "Headline and subheadline are required." });
  }

  const data = loadData();
  data.settings = { ...data.settings, ...newSettings };
  saveData(data);
  res.json({ success: true, settings: data.settings });
});

// Add or edit a Project (Admin)
app.post("/api/projects", (req, res) => {
  const inputProject = req.body as Project;
  if (!inputProject.title || !inputProject.client || !inputProject.description) {
    return res.status(400).json({ error: "Project Title, Client, and Short Description are required." });
  }

  const data = loadData();
  
  if (inputProject.id) {
    // Edit existing project
    const index = data.projects.findIndex(p => p.id === inputProject.id);
    if (index === -1) {
      return res.status(404).json({ error: "Project not found to edit." });
    }
    data.projects[index] = { ...data.projects[index], ...inputProject };
    saveData(data);
    res.json({ success: true, project: data.projects[index] });
  } else {
    // Add new project
    const newProject: Project = {
      ...inputProject,
      id: "project-" + generateId(),
      isCustom: true,
      tags: inputProject.tags || [],
      features: inputProject.features || [],
      technologies: inputProject.technologies || []
    };
    data.projects.push(newProject);
    saveData(data);
    res.status(201).json({ success: true, project: newProject });
  }
});

// Delete a Project (Admin)
app.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const data = loadData();
  const initialLength = data.projects.length;
  data.projects = data.projects.filter(p => p.id !== id);

  if (data.projects.length === initialLength) {
    return res.status(404).json({ error: "Project not found." });
  }

  saveData(data);
  res.json({ success: true, message: "Project deleted successfully." });
});

// Add or edit a Testimonial (Admin)
app.post("/api/testimonials", (req, res) => {
  const inputTestimonial = req.body as Testimonial;
  if (!inputTestimonial.name || !inputTestimonial.text || !inputTestimonial.role) {
    return res.status(400).json({ error: "Name, text, and role are required for testimonials." });
  }

  const data = loadData();

  if (inputTestimonial.id) {
    // Edit existing testimonial
    const index = data.testimonials.findIndex(t => t.id === inputTestimonial.id);
    if (index === -1) {
      return res.status(404).json({ error: "Testimonial not found to edit." });
    }
    data.testimonials[index] = { ...data.testimonials[index], ...inputTestimonial };
    saveData(data);
    res.json({ success: true, testimonial: data.testimonials[index] });
  } else {
    // Add new testimonial
    const newTestimonial: Testimonial = {
      ...inputTestimonial,
      id: "test-" + generateId()
    };
    data.testimonials.push(newTestimonial);
    saveData(data);
    res.status(201).json({ success: true, testimonial: newTestimonial });
  }
});

// Delete a Testimonial (Admin)
app.delete("/api/testimonials/:id", (req, res) => {
  const { id } = req.params;
  const data = loadData();
  const initialLength = data.testimonials.length;
  data.testimonials = data.testimonials.filter(t => t.id !== id);

  if (data.testimonials.length === initialLength) {
    return res.status(404).json({ error: "Testimonial not found." });
  }

  saveData(data);
  res.json({ success: true, message: "Testimonial deleted successfully." });
});

// Set up Vite dev middleware or serve static built files
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Peak Pixel Studio server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
