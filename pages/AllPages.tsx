import React from 'react';
import { Section, EditableText, EditableImage, Button, Card, Reveal, safeJSONParse } from '../components/Shared';
import { useContent } from '../context/ContentContext';
import { ServiceItem, CourseItem, BlogPost } from '../types';
import * as Icons from 'lucide-react';

// --- Page Header Component ---
const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="bg-emerald-950 py-20 text-center text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
    <Reveal>
      <h1 className="text-4xl md:text-5xl font-serif font-bold relative z-10">{title}</h1>
      {subtitle && <p className="mt-4 text-emerald-200 max-w-2xl mx-auto relative z-10">{subtitle}</p>}
    </Reveal>
  </div>
);

// --- About Page ---
export const About: React.FC = () => {
  const { content } = useContent();
  return (
    <>
      <PageHeader title="About Us" subtitle="Driving Digital Transformation Since 2015" />
      <Section>
        <Reveal className="prose prose-lg mx-auto text-neutral-600">
           <h3 className="text-2xl font-bold text-emerald-900 mb-4"><EditableText contentKey="about_title" value={content.about_title}/></h3>
           <p><EditableText contentKey="about_text" value={content.about_text} multiline /></p>
           <div className="my-8">
              <EditableImage src={content.about_image} contentKey="about_image" alt="Team" className="w-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow" />
           </div>
           <p>
             At Somani Hub, we believe in results. Our approach is data-driven, customer-centric, and creative. We don't just run ads; we build brands. 
             Our training institute has empowered over 1000 students to start their careers in digital marketing.
           </p>
        </Reveal>
      </Section>
    </>
  );
};

// --- Services Page ---
export const Services: React.FC = () => {
  const { content, updateContent } = useContent();
  const services: ServiceItem[] = safeJSONParse(content.services_json, []);

  const handleUpdateService = (index: number, key: keyof ServiceItem, val: string) => {
    const newServices = [...services];
    // @ts-ignore
    newServices[index][key] = val;
    updateContent('services_json', JSON.stringify(newServices));
  };

  return (
    <>
      <PageHeader title="Our Services" subtitle="Comprehensive Digital Solutions for Growth" />
      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, idx) => {
             // @ts-ignore
             const Icon = Icons[s.icon] || Icons.Activity;
             return (
              <Reveal key={idx} delay={idx * 100}>
                <Card className="flex flex-col h-full group hover:bg-emerald-50">
                  <div className="mb-4 text-gold-600 group-hover:scale-110 transition-transform"><Icon size={40}/></div>
                  <h3 className="text-2xl font-bold text-emerald-950 mb-3">
                    <EditableText value={s.title} contentKey={`s_t_${idx}`} onSave={(v) => handleUpdateService(idx, 'title', v)} />
                  </h3>
                  <p className="text-neutral-600 flex-grow">
                    <EditableText value={s.description} contentKey={`s_d_${idx}`} multiline onSave={(v) => handleUpdateService(idx, 'description', v)} />
                  </p>
                  <div className="mt-6 pt-6 border-t border-neutral-100">
                    <Button variant="outline" className="w-full text-sm">Learn More</Button>
                  </div>
                </Card>
              </Reveal>
             );
          })}
        </div>
      </Section>
    </>
  );
};

// --- Courses Page ---
export const Courses: React.FC = () => {
  const { content, updateContent } = useContent();
  const courses: CourseItem[] = safeJSONParse(content.courses_json, []);

  const handleUpdateCourse = (index: number, key: keyof CourseItem, val: string) => {
    const newCourses = [...courses];
    // @ts-ignore
    newCourses[index][key] = val;
    updateContent('courses_json', JSON.stringify(newCourses));
  };

  return (
    <>
      <PageHeader title="Academy & Training" subtitle="Master Digital Skills with Industry Experts" />
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          {courses.map((c, idx) => (
            <Reveal key={idx} delay={idx * 150} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-100 flex flex-col md:flex-row hover:shadow-2xl transition-all hover:-translate-y-1">
               <div className="md:w-1/3 relative">
                 <EditableImage 
                    src={c.image} 
                    alt={c.title} 
                    className="w-full h-full object-cover min-h-[200px]"
                    onSave={(v) => handleUpdateCourse(idx, 'image', v)}
                 />
                 <div className="absolute top-2 left-2 bg-gold-500 text-xs font-bold px-2 py-1 rounded text-black uppercase">
                   {c.level}
                 </div>
               </div>
               <div className="p-6 md:w-2/3 flex flex-col">
                 <h3 className="text-xl font-bold text-emerald-950 mb-2">
                    <EditableText value={c.title} contentKey={`c_t_${idx}`} onSave={(v) => handleUpdateCourse(idx, 'title', v)} />
                 </h3>
                 <p className="text-neutral-500 text-sm mb-4 flex-grow">
                    <EditableText value={c.description} contentKey={`c_d_${idx}`} multiline onSave={(v) => handleUpdateCourse(idx, 'description', v)} />
                 </p>
                 <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-semibold text-emerald-700 flex items-center gap-1">
                      <Icons.Clock size={14} /> {c.duration}
                    </span>
                    <Button variant="primary" className="text-xs px-4 py-2">Enroll Now</Button>
                 </div>
               </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
};

// --- Blog Page ---
export const Blog: React.FC = () => {
  const { content } = useContent();
  const blogs: BlogPost[] = safeJSONParse(content.blogs_json, []);

  return (
    <>
      <PageHeader title="Our Blog" subtitle="Insights, Tips, and Industry News" />
      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((b, idx) => (
             <Reveal key={idx} delay={idx * 100}>
               <article className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <div className="overflow-hidden">
                    <img src={b.image} alt={b.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                     <div className="flex justify-between items-center text-xs text-neutral-400 mb-3">
                        <span>{b.category}</span>
                        <span>{b.date}</span>
                     </div>
                     <h3 className="text-lg font-bold text-emerald-950 mb-2 hover:text-gold-600 transition-colors cursor-pointer">{b.title}</h3>
                     <p className="text-neutral-500 text-sm mb-4 line-clamp-3">{b.excerpt}</p>
                     <div className="flex justify-between items-center border-t border-neutral-50 pt-4">
                        <span className="text-xs font-medium text-emerald-800">By {b.author}</span>
                        <div className="flex gap-2">
                           <Icons.Share2 size={16} className="text-neutral-400 hover:text-emerald-600 cursor-pointer"/>
                        </div>
                     </div>
                  </div>
               </article>
             </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
};

// --- Contact Page ---
export const Contact: React.FC = () => {
  const { content } = useContent();
  return (
    <>
      <PageHeader title="Contact Us" subtitle="Get in Touch for a Free Consultation" />
      <Section>
        <Reveal className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden">
           <div className="bg-emerald-950 p-12 text-white flex flex-col justify-between">
              <div>
                 <h3 className="text-2xl font-serif font-bold mb-6">Contact Information</h3>
                 <p className="text-emerald-100 mb-8">Ready to start your digital journey? Fill out the form or reach us directly.</p>
                 
                 <div className="space-y-6">
                    <div className="flex gap-4 items-center group">
                       <Icons.Phone className="text-gold-400 group-hover:scale-110 transition-transform" />
                       <EditableText value={content.contact_phone} contentKey="contact_phone" />
                    </div>
                    <div className="flex gap-4 items-center group">
                       <Icons.Mail className="text-gold-400 group-hover:scale-110 transition-transform" />
                       <EditableText value={content.contact_email} contentKey="contact_email" />
                    </div>
                    <div className="flex gap-4 items-center group">
                       <Icons.MapPin className="text-gold-400 group-hover:scale-110 transition-transform" />
                       <EditableText value={content.contact_address} contentKey="contact_address" multiline />
                    </div>
                 </div>
              </div>
              <div className="mt-12">
                 <p className="font-bold text-gold-400 mb-4">Follow Us</p>
                 <div className="flex gap-4">
                    <Icons.Facebook className="cursor-pointer hover:text-gold-400 hover:scale-110 transition-all" />
                    <Icons.Instagram className="cursor-pointer hover:text-gold-400 hover:scale-110 transition-all" />
                    <Icons.Linkedin className="cursor-pointer hover:text-gold-400 hover:scale-110 transition-all" />
                 </div>
              </div>
           </div>
           
           <div className="p-12">
              <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-emerald-950 mb-2">First Name</label>
                      <input type="text" className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded focus:outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-emerald-950 mb-2">Last Name</label>
                      <input type="text" className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded focus:outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-emerald-950 mb-2">Email</label>
                    <input type="email" className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded focus:outline-none focus:border-emerald-500 transition-colors" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-emerald-950 mb-2">Service Interested In</label>
                    <select className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded focus:outline-none focus:border-emerald-500 transition-colors">
                       <option>Digital Marketing Services</option>
                       <option>Training Course</option>
                       <option>Web Development</option>
                       <option>Consultation</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-emerald-950 mb-2">Message</label>
                    <textarea rows={4} className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded focus:outline-none focus:border-emerald-500 transition-colors"></textarea>
                 </div>
                 <Button className="w-full">Send Message</Button>
              </form>
           </div>
        </Reveal>
      </Section>
    </>
  );
};

export const Privacy: React.FC = () => (
  <div className="max-w-4xl mx-auto py-20 px-4 prose">
    <h1>Privacy Policy</h1>
    <p>Last updated: October 2023</p>
    <p>Your privacy is important to us. It is Somani Hub's policy to respect your privacy regarding any information we may collect from you across our website.</p>
    <h3>1. Information We Collect</h3>
    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
    <h3>2. How We Use Information</h3>
    <p>We use the collected data for various purposes: to provide and maintain our Service, to notify you about changes to our Service, to provide customer support, and to gather analysis or valuable information so that we can improve the Service.</p>
  </div>
);

export const Terms: React.FC = () => (
  <div className="max-w-4xl mx-auto py-20 px-4 prose">
    <h1>Terms & Conditions</h1>
    <p>Last updated: October 2023</p>
    <p>By accessing the website at Somani Hub, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
    <h3>1. Use License</h3>
    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Somani Hub's website for personal, non-commercial transitory viewing only.</p>
    <h3>2. Disclaimer</h3>
    <p>The materials on Somani Hub's website are provided on an 'as is' basis. Somani Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
  </div>
);