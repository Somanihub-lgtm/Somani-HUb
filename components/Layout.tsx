import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { EditableText, Button } from './Shared';
import { Menu, X, Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, MessageCircle, Settings, Save, RefreshCw } from 'lucide-react';
import { generateSeoTags } from '../services/geminiService';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isEditMode, toggleEditMode, content, resetContent, updateContent } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSEOGenerate = async () => {
    const res = await generateSeoTags(JSON.stringify(content));
    if(res.title) updateContent('meta_title', res.title);
    if(res.description) updateContent('meta_description', res.description);
    alert("SEO Tags Generated!");
  }

  const handleLogoUpload = () => {
    const url = prompt("Enter Logo Image URL:");
    if(url) updateContent('logo_image', url);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="relative group">
            {content.logo_image ? (
                <img src={content.logo_image} alt="Somani Hub" className="h-10 md:h-12 w-auto object-contain" />
            ) : (
                <div className="text-2xl font-serif font-bold tracking-tight text-emerald-950 flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center border-2 border-gold-500 shadow-lg">
                        <span className="text-gold-400 font-bold text-xl">S</span>
                    </div>
                    <span className="hidden sm:inline">Somani Hub</span>
                </div>
            )}
            {isEditMode && (
                <button 
                    onClick={(e) => { e.preventDefault(); handleLogoUpload(); }} 
                    className="absolute -right-8 -top-2 bg-neutral-800 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 text-xs"
                    title="Change Logo"
                >
                    <Settings size={12} />
                </button>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium hover:text-emerald-700 transition-colors ${location.pathname === link.path ? 'text-emerald-850 font-bold border-b-2 border-gold-500' : 'text-neutral-600'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact">
              <button className="bg-emerald-850 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-950 transition-colors border border-gold-500/30">
                Book Consultation
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-emerald-950" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 py-4 px-4 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-lg font-medium text-emerald-950"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* WhatsApp Sticky */}
      <a 
        href={`https://wa.me/${content.whatsapp_number}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-transform hover:scale-110 flex items-center gap-2 border-2 border-white"
      >
        <MessageCircle size={24} />
      </a>

      {/* Edit Mode Controls */}
      <div className="fixed bottom-6 left-6 z-50 flex gap-2">
        <button 
          onClick={toggleEditMode}
          className={`p-3 rounded-full shadow-2xl transition-all ${isEditMode ? 'bg-gold-500 text-black' : 'bg-neutral-900 text-white'}`}
          title="Toggle Edit Mode"
        >
          {isEditMode ? <Save size={24} /> : <Settings size={24} />}
        </button>
        {isEditMode && (
          <>
             <button 
              onClick={handleSEOGenerate}
              className="p-3 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700"
              title="Generate SEO Tags with AI"
            >
              <div className="text-xs font-bold">SEO</div>
            </button>
            <button 
              onClick={resetContent}
              className="p-3 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700"
              title="Reset Content"
            >
              <RefreshCw size={24} />
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white pt-16 pb-8 border-t-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
             <div className="text-2xl font-serif font-bold tracking-tight text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-900 rounded-lg flex items-center justify-center border border-gold-500">
                  <span className="text-gold-400 font-bold">S</span>
                </div>
                Somani Hub
             </div>
             <p className="text-emerald-100/80 text-sm leading-relaxed">
               <EditableText contentKey="home_hero_subtitle" value={content.home_hero_subtitle} className="block" />
             </p>
             <div className="flex gap-4 pt-2">
               <a href="#" className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all"><Facebook size={16} /></a>
               <a href="#" className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all"><Instagram size={16} /></a>
               <a href="#" className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all"><Linkedin size={16} /></a>
               <a href="#" className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-all"><Youtube size={16} /></a>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-400 font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-emerald-100/80 text-sm">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">Services</Link></li>
              <li><Link to="/courses" className="hover:text-gold-400 transition-colors">Courses</Link></li>
              <li><Link to="/blog" className="hover:text-gold-400 transition-colors">Blog</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gold-400 font-bold mb-4 uppercase tracking-wider text-sm">Services</h3>
            <ul className="space-y-2 text-emerald-100/80 text-sm">
              <li>SEO Optimization</li>
              <li>Social Media Marketing</li>
              <li>Performance Ads</li>
              <li>Web Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-400 font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4 text-emerald-100/80 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="shrink-0 text-gold-500" />
                <EditableText contentKey="contact_address" value={content.contact_address} />
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="shrink-0 text-gold-500" />
                <EditableText contentKey="contact_phone" value={content.contact_phone} />
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="shrink-0 text-gold-500" />
                <EditableText contentKey="contact_email" value={content.contact_email} />
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-emerald-800 text-center text-xs text-emerald-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Somani Hub. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
             <Link to="/terms" className="hover:text-gold-400">Terms & Conditions</Link>
             <Link to="/privacy" className="hover:text-gold-400">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};