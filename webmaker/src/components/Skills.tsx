import { motion } from 'motion/react';
import { Code2, Palette, Cpu, Globe, Rocket, Zap } from 'lucide-react';

const skills = [
  { name: 'Web Designing', icon: Palette, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { name: 'Frontend Development', icon: Code2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'AI Chatbot Development', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Logo Designing', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'AI-based Features', icon: Cpu, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { name: 'Custom Solutions', icon: Rocket, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
];

import { MessageSquare } from 'lucide-react';

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] mb-4">My Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Skills & Tech Stack</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I specialize in core digital services that help businesses stand out and automate their processes using modern AI tools.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.3)' }}
              className="glass p-6 rounded-2xl border border-white/5 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 mx-auto">
                <skill.icon className={cn("w-6 h-6", skill.color)} />
              </div>
              <h4 className="text-xs font-semibold text-slate-300 tracking-wide uppercase">{skill.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { cn } from '../lib/utils';
