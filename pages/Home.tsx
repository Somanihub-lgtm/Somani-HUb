import React from 'react';
import { Section, EditableText, EditableImage, Button, Card, FAQAccordion, TestimonialSlider, Reveal } from '../components/Shared';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ServiceItem, CourseItem, FAQItem, CaseStudyItem } from '../types';

export const Home: React.FC = () => {
  const { content, updateContent } = useContent();
  
  // Parse JSON data
  const services: ServiceItem[] = JSON.parse(content.services_json);
  const courses: CourseItem[] = JSON.parse(content.courses_json);
  const faqs: FAQItem[] = JSON.parse(content.faqs_json);
  const caseStudies: CaseStudyItem[] = JSON.parse(content.case_studies_json);

  // Helper for list updating if needed in future
  const handleUpdateWhyUs = (index: number, val: string) => {
     const newItems = [...content.why_us_items];
     newItems[index] = val;
     // @ts-ignore
     updateContent('why_us_items', newItems);
  }

  const handleUpdateCaseStudy = (index: number, key: keyof CaseStudyItem, val: string) => {
     const newCases = [...caseStudies];
     // @ts-ignore
     newCases[index][key] = val;
     updateContent('case_studies_json', JSON.stringify(newCases));
  }

  const featuredCourse = courses[0]; // Assuming first course is main one for highlight

  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 z-0">
            <EditableImage 
               contentKey="home_hero_image" 
               src={content.home_hero_image} 
               alt="Hero Background" 
               className="w-full h-full object-cover opacity-50 animate-scale-in"
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
                 <Button variant="gold" className="w-full md:w-auto text-lg px-8 py-4 shadow-gold-500/20">
                   <EditableText contentKey="home_hero_cta_primary" value={content.home_hero_cta_primary} />
                 </Button>
              </Link>
              <Link to="/courses">
                 <Button variant="outline" className="w-full md:w-auto text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-black">
                   <EditableText contentKey="home_hero_cta_secondary" value={content.home_hero_cta_secondary} />
                 </Button>
              </Link>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 border-t border-white/10 mt-12 backdrop-blur-sm bg-white/5 rounded-2xl p-6">
               <Reveal delay={200} className="text-center">
                 <div className="text-3xl font-bold text-gold-400">50+</div>
                 <div className="text-xs uppercase tracking-wider text-emerald-200">Successful Projects</div>
               </Reveal>
               <Reveal delay={400} className="text-center border-l border-white/10">
                 <div className="text-3xl font-bold text-gold-400">200+</div>
                 <div className="text-xs uppercase tracking-wider text-emerald-200">Students Trained</div>
               </Reveal>
               <Reveal delay={600} className="col-span-2 md:col-span-1 text-center md:border-l border-white/10">
                 <div className="text-3xl font-bold text-gold-400">100%</div>
                 <div className="text-xs uppercase tracking-wider text-emerald-200">Practical Skills</div>
               </Reveal>
            </div>
         </Reveal>
      </div>

      {/* 2. About Preview Card */}
      <Reveal className="relative z-20 -mt-16 max-w-6xl mx-auto px-4">
         <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border-b-4 border-gold-500">
            <div className="md:w-1/2">
               <h3 className="text-gold-600 font-bold uppercase tracking-wider mb-2 text-sm">Who We Are</h3>
               <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-4">Bridging the Gap Between Business & Education</h2>
               <p className="text-neutral-600 mb-6 leading-relaxed">
                 At Somani Hub, we wear two hats with pride. We are a results-obsessed digital agency helping brands scale, and a dedicated training institute molding the next generation of marketing experts.
               </p>
               <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                    <Icons.CheckCircle className="text-gold-500" size={18}/> Agency Services
                 </div>
                 <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                    <Icons.CheckCircle className="text-gold-500" size={18}/> Expert Training
                 </div>
               </div>
            </div>
            <div className="md:w-1/2 w-full">
               <Link to="/about">
                 <div className="bg-emerald-50 rounded-xl p-6 hover:bg-emerald-100 transition-colors cursor-pointer group flex justify-between items-center border border-emerald-100">
                    <div>
                      <h4 className="font-bold text-emerald-950 text-lg mb-1">Learn More About Us</h4>
                      <p className="text-sm text-neutral-500">Discover our story and vision</p>
                    </div>
                    <div className="bg-white p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
                      <Icons.ArrowRight className="text-gold-500"/>
                    </div>
                 </div>
               </Link>
            </div>
         </div>
      </Reveal>

      {/* 3. Services Grid */}
      <Section className="bg-neutral-50">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-600 font-bold tracking-widest uppercase text-sm">Our Expertise</span>
          <h2 className="text-4xl font-serif font-bold text-emerald-950 mt-2">Premium Digital Services</h2>
          <p className="text-neutral-600 mt-4">Data-driven strategies designed to maximize your ROI and elevate your brand presence.</p>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            // @ts-ignore
            const Icon = Icons[s.icon] || Icons.Zap;
            return (
              <Reveal key={idx} delay={idx * 100}>
                <Card className="group hover:-translate-y-2 border-t-4 border-transparent hover:border-gold-500 h-full">
                  <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-emerald-900 text-gold-400 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                        <Icon size={28} />
                      </div>
                      <Icons.ArrowUpRight className="text-neutral-300 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-950 mb-3 group-hover:text-emerald-700 transition-colors">{s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-6">{s.description}</p>
                  <Link to="/services">
                      <button className="text-sm font-bold text-emerald-900 border-b border-emerald-900 pb-1 hover:text-gold-600 hover:border-gold-600 transition-all">Explore Service</button>
                  </Link>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 4. Course Highlight Section */}
      <section className="bg-emerald-950 text-white py-20 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/30 skew-x-12 transform translate-x-20"></div>
         <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <Reveal className="order-2 md:order-1">
               <span className="text-gold-400 font-bold tracking-widest uppercase text-sm mb-2 block">Featured Course</span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Master Digital Marketing</h2>
               <p className="text-emerald-100/80 text-lg mb-8">
                 Become a certified expert with our comprehensive training program. Live projects, agency-style learning environment, and guaranteed placement support.
               </p>
               
               <div className="space-y-4 mb-8">
                  {['100% Practical Training', 'Google & Meta Certifications', 'Placement Assistance', 'Lifetime Access to Tools'].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-black">
                         <Icons.Check size={14} strokeWidth={3}/>
                       </div>
                       <span className="font-medium">{feat}</span>
                    </div>
                  ))}
               </div>

               <Link to="/courses">
                 <Button variant="gold" className="w-full md:w-auto">Enroll Now - Start Your Career</Button>
               </Link>
            </Reveal>
            
            <Reveal delay={200} className="order-1 md:order-2 relative">
               <div className="absolute -inset-4 bg-gold-500 rounded-2xl transform rotate-2"></div>
               <EditableImage 
                 contentKey="course_highlight_img" 
                 src={featuredCourse?.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1470"} 
                 alt="Digital Marketing Course" 
                 className="rounded-2xl shadow-2xl relative z-10 w-full h-[400px]" 
               />
               <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 max-w-xs animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-2 mb-2">
                     <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                           <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white"/>
                        ))}
                     </div>
                     <span className="text-emerald-950 font-bold text-sm">+200 Students</span>
                  </div>
                  <p className="text-xs text-neutral-500">Rated 4.9/5 by our alumni</p>
               </div>
            </Reveal>
         </div>
      </section>

      {/* 5. Why Choose Us Grid */}
      <Section>
         <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald-950">Why Choose Somani Hub?</h2>
         </Reveal>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {content.why_us_items.map((item, i) => (
               <Reveal key={i} delay={i * 100} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-neutral-100">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 mb-4 group-hover:bg-gold-400 group-hover:text-white transition-colors">
                     {/* Random icon selection for demo visual variety */}
                     {i === 0 ? <Icons.Briefcase size={32}/> : i === 1 ? <Icons.Users size={32}/> : i === 2 ? <Icons.Monitor size={32}/> : <Icons.Star size={32}/>}
                  </div>
                  <h4 className="font-bold text-lg text-emerald-950">
                    <EditableText contentKey={`why_us_${i}`} value={item} onSave={(v) => handleUpdateWhyUs(i, v)}/>
                  </h4>
               </Reveal>
            ))}
         </div>
      </Section>

      {/* 6. Success Metrics (Dark Theme) */}
      <div className="bg-neutral-900 py-20 border-t-4 border-gold-500">
         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            <Reveal className="p-4">
               <h3 className="text-5xl font-bold text-gold-400 mb-2 font-serif">
                 <EditableText contentKey="metric_1_value" value={content.metric_1_value} />
               </h3>
               <p className="text-white uppercase tracking-widest text-sm">
                 <EditableText contentKey="metric_1_label" value={content.metric_1_label} />
               </p>
            </Reveal>
            <Reveal delay={200} className="p-4">
               <h3 className="text-5xl font-bold text-gold-400 mb-2 font-serif">
                 <EditableText contentKey="metric_2_value" value={content.metric_2_value} />
               </h3>
               <p className="text-white uppercase tracking-widest text-sm">
                 <EditableText contentKey="metric_2_label" value={content.metric_2_label} />
               </p>
            </Reveal>
            <Reveal delay={400} className="p-4">
               <h3 className="text-5xl font-bold text-gold-400 mb-2 font-serif">
                 <EditableText contentKey="metric_3_value" value={content.metric_3_value} />
               </h3>
               <p className="text-white uppercase tracking-widest text-sm">
                 <EditableText contentKey="metric_3_label" value={content.metric_3_label} />
               </p>
            </Reveal>
         </div>
      </div>

      {/* 7. Success Stories & Case Studies (Replaces TestimonialSlider) */}
      <Section className="bg-emerald-50/50">
         <Reveal className="text-center mb-16">
            <span className="text-gold-600 font-bold uppercase tracking-widest text-sm">Real Results</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald-950 mt-2">Success Stories & Case Studies</h2>
            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">See how we solve complex marketing challenges and deliver tangible growth for Indian brands.</p>
         </Reveal>
         
         <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {caseStudies.map((cs, idx) => (
               <Reveal key={idx} delay={idx * 150}>
                  <Card className="h-full flex flex-col p-0 overflow-hidden border border-neutral-200">
                     {/* Image */}
                     <div className="h-48 relative overflow-hidden">
                        <EditableImage 
                           src={cs.image} 
                           alt={cs.brand} 
                           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                           onSave={(v) => handleUpdateCaseStudy(idx, 'image', v)}
                        />
                        <div className="absolute top-4 right-4 bg-emerald-950 text-gold-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                           {cs.category}
                        </div>
                     </div>
                     
                     {/* Content */}
                     <div className="p-6 flex-grow flex flex-col space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-emerald-950">
                           <EditableText value={cs.brand} contentKey={`cs_brand_${idx}`} onSave={(v) => handleUpdateCaseStudy(idx, 'brand', v)}/>
                        </h3>
                        
                        <div className="space-y-3 text-sm">
                           <div>
                              <strong className="text-emerald-800 block uppercase text-xs tracking-wider mb-1">Problem:</strong>
                              <p className="text-neutral-600 leading-snug">
                                 <EditableText value={cs.problem} contentKey={`cs_prob_${idx}`} onSave={(v) => handleUpdateCaseStudy(idx, 'problem', v)} multiline/>
                              </p>
                           </div>
                           
                           <div>
                              <strong className="text-emerald-800 block uppercase text-xs tracking-wider mb-1">Idea:</strong>
                              <p className="text-neutral-600 leading-snug">
                                 <EditableText value={cs.idea} contentKey={`cs_idea_${idx}`} onSave={(v) => handleUpdateCaseStudy(idx, 'idea', v)} multiline/>
                              </p>
                           </div>

                           <div>
                              <strong className="text-emerald-800 block uppercase text-xs tracking-wider mb-1">Execution:</strong>
                              <p className="text-neutral-600 leading-snug">
                                 <EditableText value={cs.execution} contentKey={`cs_exec_${idx}`} onSave={(v) => handleUpdateCaseStudy(idx, 'execution', v)} multiline/>
                              </p>
                           </div>
                        </div>

                        {/* Achievement Box */}
                        <div className="mt-auto pt-4 border-t border-neutral-100">
                           <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-4 rounded-lg shadow-md relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                 <Icons.TrendingUp size={48} />
                              </div>
                              <strong className="text-gold-400 text-xs uppercase tracking-wider block mb-1">Achievement</strong>
                              <p className="font-bold leading-tight">
                                 <EditableText value={cs.achievement} contentKey={`cs_achieve_${idx}`} onSave={(v) => handleUpdateCaseStudy(idx, 'achievement', v)} multiline/>
                              </p>
                           </div>
                        </div>
                     </div>
                  </Card>
               </Reveal>
            ))}
         </div>
      </Section>

      {/* 8. FAQ Accordion */}
      <Section>
         <div className="grid md:grid-cols-2 gap-12">
            <Reveal>
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald-950 mb-6">Frequently Asked Questions</h2>
               <p className="text-neutral-600 mb-8">
                 Have questions about our services or courses? Find answers to common queries here. For more details, feel free to contact us.
               </p>
               <Link to="/contact">
                  <Button>Contact Support</Button>
               </Link>
            </Reveal>
            <Reveal delay={200}>
               <FAQAccordion items={faqs} />
            </Reveal>
         </div>
      </Section>

      {/* Final CTA Strip */}
      <Reveal className="bg-gradient-to-r from-emerald-900 to-emerald-950 py-16 text-center text-white">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-6">Ready to Grow Your Business or Career?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link to="/contact">
                  <Button variant="gold" className="w-full sm:w-auto">Get Started Now</Button>
               </Link>
               <a href={`https://wa.me/${content.whatsapp_number}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-emerald-900">
                     Chat on WhatsApp
                  </Button>
               </a>
            </div>
         </div>
      </Reveal>
    </>
  );
};