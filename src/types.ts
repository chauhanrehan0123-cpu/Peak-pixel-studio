export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  longDescription: string;
  category: string; // e.g. "Business Website", "Landing Page", "Healthcare Website", "Real Estate Website"
  image: string; // URL or CSS gradient description
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  technologies: string[];
  industry: string;
  isCustom?: boolean; // indicates if added via admin panel
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  businessName: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'contacted';
}

export interface AgencySettings {
  headline: string;
  subheadline: string;
  contactEmail: string;
  contactPhone?: string;
  instagramUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export interface FullAgencyData {
  projects: Project[];
  testimonials: Testimonial[];
  submissions: ContactSubmission[];
  settings: AgencySettings;
}
