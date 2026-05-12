import { motion } from 'motion/react';
import { Code2, Cpu, Palette, MessageSquare, Phone, Mail, FileText, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-secondary/20 blur-[120px] rounded-full animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold tracking-wider uppercase mb-6"
          >
            Freelance Web & AI Dev
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl font-serif leading-[1.05] mb-8 text-white">
            Turning Ideas<br/>
            <span className="italic text-gradient">Into Digital</span><br/>
            Reality.
          </h1>
          
          <p className="text-lg text-slate-400 mb-10 max-w-sm leading-relaxed">
            B.Tech Student specialized in crafting modern websites, custom AI chatbots, and unique brand identities for forward-thinking clients.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="px-10 py-4 rounded-xl accent-gradient text-white font-bold shadow-xl shadow-brand-primary/20"
            >
              Hire Me Now
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/resume.pdf"
              target="_blank"
              className="px-10 py-4 rounded-xl glass text-white font-bold flex items-center gap-3 transition-all"
            >
              <FileText className="w-5 h-5" />
              Resume
            </motion.a>
          </div>
          
          <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">5+</span>
              <span className="text-sm text-slate-500 uppercase tracking-widest">Active Services</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold">100%</span>
              <span className="text-sm text-slate-500 uppercase tracking-widest">Client Focus</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden glass p-4 group">
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" 
              alt="Tech Workspace" 
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            
            {/* Floating Cards */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 -left-10 glass-dark p-4 rounded-2xl border border-white/5 shadow-2xl"
            >
              <Cpu className="text-brand-primary w-8 h-8 mb-2" />
              <p className="font-bold text-sm">AI Powered</p>
            </motion.div>
            
            <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-10 -right-10 glass-dark p-4 rounded-2xl border border-white/5 shadow-2xl"
            >
              <Palette className="text-brand-accent w-8 h-8 mb-2" />
              <p className="font-bold text-sm">Expert Design</p>
            </motion.div>
          </div>
          
          {/* Background Ring */}
          <div className="absolute -inset-4 border-2 border-brand-primary/20 rounded-[40px] -z-10 animate-[spin_20s_linear_infinite]" />
        </motion.div>
      </div>
    </section>
  );
}
