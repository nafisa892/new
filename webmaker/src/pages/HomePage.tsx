import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Github, Twitter, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "AI Chat Solution",
    category: "AI Development",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=800&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Modern E-commerce",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Corporate Branding",
    category: "Logo Design",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    link: "#"
  }
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Startup Founder",
    text: "Nafisa delivered a beautiful website with AI features that actually works fine. Highly professional!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
  },
  {
    name: "Priya Patel",
    role: "Marketing Manager",
    text: "The logo design was exactly what we needed for our rebranding. Great communication.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  }
];

export default function HomePage() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      
      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative"
            >
                <div className="relative z-10 rounded-3xl overflow-hidden aspect-square glow-blue">
                    <img 
                        src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop" 
                        alt="Nafisa Asoti" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                </div>
                <div className="absolute -bottom-8 -right-8 glass p-8 rounded-2xl border border-white/10 z-20 shadow-2xl">
                    <p className="text-4xl font-serif italic text-white mb-1 tracking-tighter">B.Tech</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">In Progress</p>
                </div>
            </motion.div>

            <div>
                <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold tracking-wider uppercase mb-6 inline-block">The Persona</span>
                <h3 className="text-5xl font-serif leading-tight mb-8 text-white">A Designer who<br/><span className="italic text-gradient">Understands</span> Tech.</h3>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                    I am Nafisa Asoti, a B.Tech student who has combined her passion for technology with creative design. I don't just build sites; I build digital experiences that help your business grow.
                </p>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                    By leveraging AI-based features, I provide custom solutions that go beyond basic templates, ensuring your presence is intelligent, professional, and future-ready.
                </p>
                
                <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Location</h4>
                        <p className="text-white font-medium">India, Global Freelancing</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Status</h4>
                        <p className="text-emerald-400 font-medium flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                             Open to Projects
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Skills />
      
      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-16">
                <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold tracking-wider uppercase mb-4 inline-block">Portfolio</span>
                <h3 className="text-5xl font-serif italic text-white">Featured Projects</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div 
                        key={project.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative rounded-2xl overflow-hidden border border-white/5"
                    >
                        <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                            <p className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2">{project.category}</p>
                            <h4 className="text-2xl font-serif italic text-white mb-4">{project.title}</h4>
                            <a href={project.link} className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-all group-hover:gap-4">
                                View Case Study <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      <Services />

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
                <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold tracking-wider uppercase mb-4 inline-block">Testimonials</span>
                <h3 className="text-5xl font-serif italic text-gradient">Kind Words</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((t, index) => (
                    <div key={t.name} className="glass p-10 rounded-2xl relative">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-xl overflow-hidden grayscale">
                                <img src={t.image} alt={t.name} className="w-full h-full object-cover bg-white/5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-0.5">{t.name}</h4>
                                <p className="text-brand-primary text-[10px] font-bold uppercase tracking-widest">{t.role}</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed italic">
                            "{t.text}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <ContactForm />

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center font-bold text-white">N</div>
                    <span className="text-xl font-bold tracking-tight text-white">Nafisa Asoti</span>
                </div>

                <div className="flex flex-wrap justify-center gap-10 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
                    <a href="#services" className="hover:text-brand-primary transition-colors">Services</a>
                    <a href="#portfolio" className="hover:text-brand-primary transition-colors">Portfolio</a>
                    <a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a>
                </div>

                <div className="flex gap-4">
                    {[Instagram, Linkedin, Github, Twitter].map((Icon, i) => (
                        <a key={i} href="#" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:text-brand-primary transition-all">
                            <Icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-12 border-t border-white/5">
                <div className="flex gap-8">
                    <a href="tel:9880212500" className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-white">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 9880212500
                    </a>
                    <a href="mailto:nafisaasoti@gmail.com" className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-white">
                        <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span> nafisaasoti@gmail.com
                    </a>
                </div>
                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    © {new Date().getFullYear()} Nafisa Asoti. Handcrafted with Passion.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}
