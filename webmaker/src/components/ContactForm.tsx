import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', requirement: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] mb-4">Get In Touch</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8">Let's build something <span className="text-gradient">amazing.</span></h3>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            Ready to start your next project? Fill out the form or reach out directly through the channels below. I'm always excited to hear new ideas!
          </p>

          <div className="space-y-6">
            <a href="tel:9880212500" className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-[1.25rem] bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                <Phone className="text-brand-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Phone Number</p>
                <p className="text-xl font-bold">+91 9880212500</p>
              </div>
            </a>
            
            <a href="https://wa.me/919880212500" className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-[1.25rem] bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                <MessageSquare className="text-green-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">WhatsApp Chat</p>
                <p className="text-xl font-bold">+91 9880212500</p>
              </div>
            </a>
            
            <a href="mailto:nafisaasoti@gmail.com" className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-[1.25rem] bg-brand-secondary/10 flex items-center justify-center group-hover:bg-brand-secondary transition-colors">
                <Mail className="text-brand-secondary group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Email Address</p>
                <p className="text-xl font-bold">nafisaasoti@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        <div className="relative">
          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-3xl border border-emerald-500/30 text-center h-full flex flex-col items-center justify-center"
            >
              <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
              <h4 className="text-2xl font-serif italic mb-2">Message Sent!</h4>
              <p className="text-slate-400 mb-8">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="text-brand-primary font-bold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-3xl border border-white/5 relative z-10">
              <h3 className="text-2xl font-serif italic text-white mb-8">Start a Conversation</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-primary outline-none transition-all placeholder:text-slate-600"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <input 
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-primary outline-none transition-all placeholder:text-slate-600"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-primary outline-none transition-all placeholder:text-slate-600"
                  placeholder="Phone Number (Optional)"
                />
              </div>
              
              <div className="mb-6">
                <textarea 
                  required
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 h-32 focus:border-brand-primary outline-none transition-all resize-none placeholder:text-slate-600"
                  placeholder="Briefly describe your project requirements..."
                />
              </div>

              <button 
                disabled={loading}
                className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Send Project Request
              </button>
            </form>
          )}
          
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/10 blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-secondary/10 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
