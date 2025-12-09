export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating?: number;
}

export interface CaseStudyItem {
  id: string;
  brand: string;
  category: string;
  image: string;
  problem: string;
  idea: string;
  execution: string;
  achievement: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  // General
  meta_title: string;
  meta_description: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  whatsapp_number: string;
  logo_image: string;
  
  // Home Hero
  home_hero_title: string;
  home_hero_subtitle: string;
  home_hero_cta_primary: string;
  home_hero_cta_secondary: string;
  home_hero_image: string;

  // About Section
  about_title: string;
  about_text: string;
  about_image: string;

  // Why Choose Us
  why_us_title: string;
  why_us_items: string[];

  // Metrics
  metric_1_value: string;
  metric_1_label: string;
  metric_2_value: string;
  metric_2_label: string;
  metric_3_value: string;
  metric_3_label: string;

  // Dynamic Lists (Simple storage for demo, in a real app these might be separate collections)
  // We will store stringified JSON for lists in this simplified CMS architecture
  services_json: string; 
  courses_json: string;
  testimonials_json: string;
  case_studies_json: string;
  blogs_json: string;
  faqs_json: string;
}

export interface ContentContextType {
  content: SiteContent;
  updateContent: (key: keyof SiteContent, value: string) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  resetContent: () => void;
}