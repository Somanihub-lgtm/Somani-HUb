
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, ContentContextType } from '../types';

const defaultContent: SiteContent = {
  meta_title: "Somani Hub - Digital Marketing Agency & Institute",
  meta_description: "Premier digital marketing services and top-tier training courses. Elevate your brand with Somani Hub.",
  contact_email: "somanihub@gmail.com",
  contact_phone: "+91 76980 03085",
  contact_address: "1312/13/3 Sahyaba Chambers, Shyamlani Pol, Ahmedabad",
  whatsapp_number: "917698003085",
  logo_image: "",

  home_hero_title: "We Grow Brands. We Build Marketers.",
  home_hero_subtitle: "Somani Hub — Your Partner for Digital Success & Expert Marketing Training.",
  home_hero_cta_primary: "Free Audit",
  home_hero_cta_secondary: "Join Course",
  home_hero_image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2574",

  about_title: "About Somani Hub",
  about_text: "We help businesses grow with result-driven marketing strategies while training the next generation of digital leaders.",
  about_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2670",

  why_us_title: "Why Choose Us?",
  why_us_items: [
    "Live Projects",
    "Expert Mentorship",
    "Flexible Learning",
    "Proven Results",
    "Placement Support",
    "Lifetime Access"
  ],

  metric_1_value: "72%",
  metric_1_label: "Average Growth",
  metric_2_value: "500+",
  metric_2_label: "Experts Trained",
  metric_3_value: "5+",
  metric_3_label: "Years Experience",

  services_json: JSON.stringify([
    { id: '1', title: 'Social Media Marketing', description: 'Engage your audience with viral strategies.', icon: 'Share2' },
    { id: '2', title: 'Performance Marketing', description: 'High-ROI campaigns on Google & Meta.', icon: 'TrendingUp' },
    { id: '3', title: 'Web Development', description: 'Conversion-optimized websites.', icon: 'Laptop' },
  ]),

  courses_json: JSON.stringify([
    { 
      id: '1', 
      title: 'Digital Marketing Masterclass', 
      description: 'Master SEO, SEM, SMM, and Email Marketing with our comprehensive program.', 
      duration: '3 Months', 
      level: 'Beginner to Pro', 
      image: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.webp' 
    },
    { 
      id: '2', 
      title: 'Agency Internship Program', 
      description: 'Gain work experience on live client projects and build your portfolio.', 
      duration: '6 Months', 
      level: 'Intermediate', 
      image: 'https://media.giphy.com/media/3o7TKr3nzbh5WgCFxe/giphy.webp' 
    },
  ]),

  testimonials_json: JSON.stringify([]),
  
  case_studies_json: JSON.stringify([
    {
      id: '1',
      brand: 'Veda Organics',
      category: 'D2C Skincare',
      image: 'https://images.unsplash.com/photo-1556228720-19293452bd01?auto=format&fit=crop&q=80&w=1000',
      problem: 'High customer acquisition costs.',
      idea: 'Micro-influencer storytelling.',
      execution: 'Partnered with 50 creators.',
      achievement: '300% ROAS Improvement'
    },
  ]),

  blogs_json: JSON.stringify([]),
  faqs_json: JSON.stringify([
    { question: "What services do you offer?", answer: "We offer SEO, SMM, PPC, and Web Dev." },
  ])
};

const CACHE_KEY = 'somani_content_v9_stable';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CACHE_KEY); 
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContent(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to load content", e);
      }
    }
  }, []);

  const updateContent = (key: keyof SiteContent, value: string) => {
    setContent(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(CACHE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  
  const resetContent = () => {
    if(confirm("Reset all content to defaults?")) {
        setContent(defaultContent);
        localStorage.removeItem(CACHE_KEY);
        window.location.reload();
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, isEditMode, toggleEditMode, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within ContentProvider");
  return context;
};
