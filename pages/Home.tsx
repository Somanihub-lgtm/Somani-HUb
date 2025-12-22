
import React from 'react';
import { Section, EditableText, EditableImage, Button, Card, FAQAccordion, Reveal, safeJSONParse, SafeIcon } from '../components/Shared';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ServiceItem, CourseItem, FAQItem, CaseStudyItem } from '../types';

export const Home: React.FC = () => {
  const { content, updateContent } = useContent();
  
  const services: ServiceItem[] = safeJSONParse(content.services_json, []);
  const courses: CourseItem[] = safeJSONParse(content.courses_json, []);
  const faqs: FAQItem[] = safeJSONParse(content.faqs_json, []);
  const caseStudies: CaseStudyItem[] = safeJSONParse(content.case_studies_json, []);

  const handleUpdateWhyUs = (index: number, val: string) => {
     const newItems = [...content.why_us_items];
     newItems[index] = val;
     updateContent('why_us_items' as any, newItems as any);
  }

  const handleUpdateCaseStudy = (index: number, key: keyof CaseStudyItem, val: string) => {
     const newCases = [...caseStudies];
     // @ts-ignore
     newCases[index][key] = val;
     updateContent('case_studies_json', JSON.stringify(newCases));
  }

  const featuredCourse = courses.length > 0 ? courses[0] : null; 

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
         <div className="absolute inset-0 z-0">
            <EditableImage 
               contentKey="home_hero_image" 
               src={content.home_hero_image} 
               alt="Hero Background" 
               className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
         </div>

         <Reveal className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
            <div className="inline-block border border-gold-500/50 bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full text-gold-400 text-sm font-bold tracking-widest uppercase">
              Premium Digital Agency & Academy
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight drop-shadow-2xl">
              <EditableText contentKey="home_hero_title" value={content.home_hero_title} />
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-100/90 max-w-3xl mx-auto font-light leading-relaxed">
              <EditableText contentKey="home_hero_subtitle" value={content.home_hero_subtitle} multiline />
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
              <Link to="/contact">
                 <Button variant="gold" className="w-full md:w-auto text-lg px-8 py-4">
                   <EditableText contentKey="home_hero_cta_primary" value={content.home_hero_cta_primary} />
                 </Button>
              </Link>
              <Link to="/courses">
                 <Button variant="outline" className="w-full md:w-auto text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-black">
                   <EditableText contentKey="home_hero_cta_secondary" value={content.home_hero_cta_secondary} />
                 </Button>
              </Link>
            </div>
         </Reveal>
      </div>

      {/* Services Grid */}
      <Section className="bg-neutral-50">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-bold tracking-widest uppercase text-sm">Our Expertise</span>
          <h2 className="text-4xl font-serif font-bold text-emerald-950 mt-2">Premium Digital Services</h2>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <Card className="group hover:-translate-y-2 border-t-4 border-transparent hover:border-gold-500 h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-emerald-900 text-gold-400 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                      <SafeIcon name={s.icon} size={28} />
                    </div>
                    <Icons.ArrowUpRight className="text-neutral-300 group-hover:text-gold-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950 mb-3 group-hover:text-emerald-700 transition-colors">{s.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">{s.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Course Highlight Section */}
      <section className="bg-emerald-950 text-white py-20 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <Reveal className="order-2 md:order-1">
               <span className="text-gold-400 font-bold tracking-widest uppercase text-sm mb-2 block">Featured Course</span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Master Digital Marketing</h2>
               <div className="space-y-4 mb-8">
                  {['100% Practical Training', 'Live Agency Projects', 'Placement Support'].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-black">
                         <Icons.Check size={14} strokeWidth={3}/>
                       </div>
                       <span className="font-medium">{feat}</span>
                    </div>
                  ))}
               </div>
               <Link to="/courses">
                 <Button variant="gold" className="w-full md:w-auto">Enroll Now</Button>
               </Link>
            </Reveal>
            
            <Reveal delay={200} className="order-1 md:order-2">
               <div className="relative group">
                 <div className="absolute -inset-4 bg-gold-500 rounded-2xl transform rotate-2 opacity-20 group-hover:rotate-0 transition-transform"></div>
                 <EditableImage 
                   contentKey="course_highlight_img" 
                   src={featuredCourse?.image || "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.webp"} 
                   alt="Digital Marketing Course" 
                   className="rounded-2xl shadow-2xl relative z-10 w-full h-[400px]" 
                 />
               </div>
            </Reveal>
         </div>
      </section>

      {/* Case Studies */}
      <Section className="bg-emerald-50/30">
         <Reveal className="text-center mb-16">
            <span className="text-gold-600 font-bold uppercase tracking-widest text-sm">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald-950 mt-2">Success Stories</h2>
         </Reveal>
         
         <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {caseStudies.map((cs, idx) => (
               <Reveal key={idx} delay={idx * 150}>
                  <Card className="h-full flex flex-col p-0 overflow-hidden border border-neutral-200">
                     <div className="h-56 relative">
                        <EditableImage 
                           src={cs.image} 
                           alt={cs.brand} 
                           className="w-full h-full object-cover"
                           onSave={(v) => handleUpdateCaseStudy(idx, 'image', v)}
                        />
                        <div className="absolute top-4 right-4 bg-emerald-950 text-gold-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                           {cs.category}
                        </div>
                     </div>
                     <div className="p-6 flex-grow flex flex-col space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-emerald-950">
                           <EditableText value={cs.brand} contentKey={`cs_brand_${idx}`} onSave={(v) => handleUpdateCaseStudy(idx, 'brand', v)}/>
                        </h3>
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                           <strong className="text-emerald-800 text-xs uppercase block mb-1">Impact</strong>
                           <p className="text-sm font-bold text-emerald-950">
                              <EditableText value={cs.achievement} contentKey={`cs_achieve_${idx}`} onSave={(v) => handleUpdateCaseStudy(idx, 'achievement', v)}/>
                           </p>
                        </div>
                     </div>
                  </Card>
               </Reveal>
            ))}
         </div>
      </Section>

      <Section>
         <div className="grid md:grid-cols-2 gap-12">
            <Reveal>
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald-950 mb-6">Frequently Asked Questions</h2>
               <Link to="/contact">
                  <Button>Ask a Question</Button>
               </Link>
            </Reveal>
            <Reveal delay={200}>
               <FAQAccordion items={faqs} />
            </Reveal>
         </div>
      </Section>
    </>
  );
};
