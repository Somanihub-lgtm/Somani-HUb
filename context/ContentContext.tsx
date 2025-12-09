import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, ContentContextType } from '../types';

const defaultContent: SiteContent = {
  meta_title: "Somani Hub - Digital Marketing Agency & Institute",
  meta_description: "Premier digital marketing services and top-tier training courses. Elevate your brand with Somani Hub.",
  contact_email: "somanihub@gmail.com",
  contact_phone: "+91 76980 03085",
  contact_address: "1312/13/3 Sahyaba Chambers, Shyamlani Pol, Ahmedabad",
  whatsapp_number: "917698003085",
  logo_image: "", // Empty defaults to CSS logo

  home_hero_title: "We Grow Brands. We Build Marketers.",
  home_hero_subtitle: "Somani Hub — Your Partner for Digital Success & Expert Marketing Training.",
  home_hero_cta_primary: "Free Social Media Audit",
  home_hero_cta_secondary: "Join Course",
  home_hero_image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2574",

  about_title: "About Somani Hub",
  about_text: "We help businesses grow with result-driven marketing strategies while training the next generation of digital leaders. Our dual focus ensures we stay at the cutting edge of industry trends.",
  about_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2670",

  why_us_title: "Why Choose Somani Hub?",
  why_us_items: [
    "Real-world Live Projects",
    "1:1 Expert Mentorship",
    "Online Flexible Learning",
    "Result-Driven Strategies",
    "Lifetime Support",
    "Affordable Pricing"
  ],

  metric_1_value: "72%",
  metric_1_label: "Faster Growth for Clients",
  metric_2_value: "200+",
  metric_2_label: "Students Trained",
  metric_3_value: "2+",
  metric_3_label: "Years Experience",

  services_json: JSON.stringify([
    { id: '1', title: 'Social Media Marketing', description: 'Engage your audience with viral content and community management strategies.', icon: 'Share2' },
    { id: '2', title: 'Performance Marketing', description: 'High-ROI campaigns on Google & Meta that drive real leads and sales.', icon: 'TrendingUp' },
    { id: '3', title: 'Website Development', description: 'Stunning, fast, and SEO-optimized websites that convert visitors into customers.', icon: 'Laptop' },
    { id: '4', title: 'Branding', description: 'Create a unique identity that resonates with your target audience.', icon: 'PenTool' },
    { id: '5', title: 'Content & Ads', description: 'Persuasive copywriting and creative ad designs that capture attention.', icon: 'Megaphone' },
    { id: '6', title: 'Marketing Strategy', description: 'Comprehensive roadmaps tailored to your business goals.', icon: 'Target' },
  ]),

  courses_json: JSON.stringify([
    { 
      id: '1', 
      title: 'Digital Marketing Masterclass', 
      description: 'Master SEO, SEM, SMM, and Email Marketing with our comprehensive 3-month program.', 
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

  testimonials_json: JSON.stringify([
    { id: '1', name: 'Sajjan Kumar', role: 'Director, Bharat Parcel Service Pvt Ltd', quote: 'Somani Hub transformed our logistics brand visibility. Their strategies helped us reach new partners effectively.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', rating: 5 },
    { id: '2', name: 'Sanjay Soni', role: 'Owner, SN Jewels', quote: 'Exceptional social media marketing! Our jewelry collections are getting amazing traction online thanks to their team.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', rating: 5 },
    { id: '3', name: 'Anjali Mehta', role: 'Student', quote: 'The digital marketing course is practical and career-focused. I got placed within a month of completion.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', rating: 5 },
  ]),

  case_studies_json: JSON.stringify([
    {
      id: '1',
      brand: 'Veda Organics',
      category: 'D2C Skincare',
      image: 'https://images.unsplash.com/photo-1556228720-19293452bd01?auto=format&fit=crop&q=80&w=1000',
      problem: 'Low brand awareness and high Customer Acquisition Cost (CAC) on Facebook Ads.',
      idea: 'Leverage influencer marketing with micro-influencers in tier-2 cities combined with retargeting.',
      execution: 'Partnered with 50+ regional content creators for authentic storytelling and user-generated content.',
      achievement: '300% ROAS and 50k new active customers in 3 months.'
    },
    {
      id: '2',
      brand: 'TechLearn India',
      category: 'EdTech Startup',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
      problem: 'High dropout rate in free webinars and low conversion to paid courses.',
      idea: 'Implement an automated email nurturing sequence with value-first content.',
      execution: 'Designed a 7-day email drip campaign with free resources, case studies, and student success stories.',
      achievement: 'Conversion rate increased from 2% to 8%, generating ₹50 Lakhs in revenue.'
    },
    {
      id: '3',
      brand: 'Urban Tiffin',
      category: 'Food Delivery Service',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000',
      problem: 'Stagnant local orders despite high food quality and customer satisfaction.',
      idea: 'Hyper-local SEO and Google My Business (GMB) optimization.',
      execution: 'Optimized GMB profiles with keywords, encouraged customer reviews, and ran geo-targeted "near me" ads.',
      achievement: '#1 Ranking in local search, daily orders doubled within 45 days.'
    }
  ]),

  blogs_json: JSON.stringify([
    { id: '1', title: 'The Future of SEO in 2024', excerpt: 'Discover the latest trends in search engine optimization and how AI is changing the landscape.', date: 'Oct 12, 2023', author: 'Somani Team', image: 'https://images.unsplash.com/photo-1481487484168-9b930d5b7d9f?auto=format&fit=crop&q=80&w=1470', category: 'SEO' },
    { id: '2', title: 'Social Media Hacks for Small Business', excerpt: 'Learn how to leverage organic reach on Instagram and LinkedIn without spending a fortune on ads.', date: 'Sep 28, 2023', author: 'Jane Doe', image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=1470', category: 'Social Media' },
  ]),

  faqs_json: JSON.stringify([
    { question: "What services do you offer?", answer: "We offer 360-degree digital marketing solutions including SEO, Social Media Marketing, PPC Ads, Website Development, and Branding." },
    { question: "Is the digital marketing course suitable for beginners?", answer: "Yes! Our course is designed to take you from absolute beginner to advanced practitioner with practical, hands-on training." },
    { question: "Do you provide placement assistance?", answer: "Absolutely. We provide 100% placement support, interview preparation, and resume building for all our certified students." },
    { question: "How can I get a quote for my business?", answer: "Simply click on 'Free Social Media Audit' or contact us via WhatsApp to discuss your business needs." },
  ])
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('somani_content_v7'); // bumped version to force new defaults
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContent({ ...defaultContent, ...parsed });
      } catch (e) {
        console.error("Failed to load content", e);
      }
    }
  }, []);

  const updateContent = (key: keyof SiteContent, value: string) => {
    const newContent = { ...content, [key]: value };
    setContent(newContent);
    localStorage.setItem('somani_content_v7', JSON.stringify(newContent));
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  
  const resetContent = () => {
    if(confirm("Are you sure you want to reset all content to default?")) {
        setContent(defaultContent);
        localStorage.setItem('somani_content_v7', JSON.stringify(defaultContent));
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
