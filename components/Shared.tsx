import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { generateTextEnhancement } from '../services/geminiService';
import { Edit2, Check, Sparkles, Loader2, Upload, Plus, Minus, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { FAQItem, TestimonialItem } from '../types';

interface EditableProps {
  contentKey: string; // The key in SiteContent, OR a raw value identifier if dealing with lists
  value: string; // The current text
  onSave?: (val: string) => void; // Optional override for lists
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

// Animation Wrapper
export const Reveal: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
};

export const EditableText: React.FC<EditableProps> = ({ contentKey, value, onSave, multiline, className, placeholder }) => {
  const { isEditMode, updateContent } = useContent();
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onSave) {
      onSave(e.target.value);
    } else {
      // Assuming contentKey is a valid key of SiteContent
      // @ts-ignore - dynamic key access
      updateContent(contentKey, e.target.value);
    }
  };

  const handleAI = async () => {
    if(!process.env.API_KEY) {
      alert("Please check setup. Missing API_KEY.");
      return;
    }
    setIsEnhancing(true);
    const newVal = await generateTextEnhancement(value, "Make this text more professional, persuasive, and concise for a luxury digital agency website.");
    if (onSave) {
      onSave(newVal);
    } else {
      // @ts-ignore
      updateContent(contentKey, newVal);
    }
    setIsEnhancing(false);
  };

  if (!isEditMode) {
    return <span className={className}>{value || placeholder}</span>;
  }

  return (
    <div className="relative group inline-block w-full">
      <div className="absolute -top-6 right-0 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 p-1 rounded">
        <button onClick={handleAI} disabled={isEnhancing} className="text-xs text-gold-400 flex items-center gap-1 hover:text-white">
          {isEnhancing ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12} />}
          AI Rewrite
        </button>
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={handleChange}
          className={`w-full bg-yellow-100/20 border border-yellow-500/50 p-1 rounded text-neutral-900 dark:text-white ${className}`}
          rows={4}
        />
      ) : (
        <input
          value={value}
          onChange={handleChange}
          className={`w-full bg-yellow-100/20 border border-yellow-500/50 p-1 rounded text-neutral-900 dark:text-white ${className}`}
        />
      )}
    </div>
  );
};

export const EditableImage: React.FC<{
  contentKey?: string;
  src: string;
  alt: string;
  className?: string;
  onSave?: (val: string) => void;
}> = ({ contentKey, src, alt, className, onSave }) => {
  const { isEditMode, updateContent } = useContent();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSave) {
      onSave(e.target.value);
    } else if (contentKey) {
      // @ts-ignore
      updateContent(contentKey, e.target.value);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />
      {isEditMode && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
           <div className="bg-white p-2 rounded shadow-lg w-3/4">
             <label className="block text-xs font-bold mb-1 text-black">Image URL</label>
             <input 
              value={src} 
              onChange={handleUrlChange}
              className="w-full text-xs p-1 border rounded text-black"
             />
           </div>
        </div>
      )}
    </div>
  );
};

export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => (
  <section id={id} className={`py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

export const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'outline' | 'gold' | 'black'; 
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className, onClick }) => {
  const baseStyle = "px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-emerald-850 text-white hover:bg-emerald-950",
    outline: "border-2 border-emerald-850 text-emerald-850 hover:bg-emerald-50",
    gold: "bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-400 hover:to-amber-500 shadow-amber-500/20",
    black: "bg-black text-white hover:bg-neutral-800 border border-neutral-700"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 p-6 ${className}`}>
    {children}
  </div>
);

export const FAQAccordion: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => (
        <div key={idx} className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <button 
            className="w-full flex justify-between items-center p-4 text-left font-bold text-emerald-950 hover:bg-emerald-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {item.question}
            {openIndex === idx ? <Minus size={20} className="text-gold-500"/> : <Plus size={20} className="text-gold-500"/>}
          </button>
          {openIndex === idx && (
             <div className="p-4 pt-0 text-neutral-600 border-t border-neutral-100 bg-neutral-50/50">
               {item.answer}
             </div>
          )}
        </div>
      ))}
    </div>
  );
}

export const TestimonialSlider: React.FC<{ items: TestimonialItem[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative max-w-4xl mx-auto px-12">
      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-emerald-900 hover:text-gold-500 z-10 transition-transform hover:scale-110">
        <ChevronLeft size={24} />
      </button>
      
      <div className="overflow-hidden">
         <div className="transition-all duration-500 ease-in-out transform" >
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gold-500/20 text-center">
               <div className="flex justify-center mb-6">
                 <img src={items[currentIndex].avatar} alt={items[currentIndex].name} className="w-20 h-20 rounded-full object-cover border-4 border-gold-100 animate-fade-in" />
               </div>
               <div className="flex justify-center gap-1 text-gold-500 mb-4">
                  {[...Array(items[currentIndex].rating || 5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
               </div>
               <p className="text-xl md:text-2xl font-serif text-emerald-950 italic mb-6">"{items[currentIndex].quote}"</p>
               <div>
                  <h4 className="font-bold text-lg">{items[currentIndex].name}</h4>
                  <p className="text-sm text-neutral-500 uppercase tracking-wider">{items[currentIndex].role}</p>
               </div>
            </div>
         </div>
      </div>

      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-emerald-900 hover:text-gold-500 z-10 transition-transform hover:scale-110">
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)} 
            className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? 'bg-gold-500' : 'bg-neutral-300'}`} 
          />
        ))}
      </div>
    </div>
  );
}