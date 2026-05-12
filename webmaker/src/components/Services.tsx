import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Loader2, Package } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Service } from '../types';
import { cn } from '../lib/utils';

const initialServices = [
  {
    title: 'Simple Website Design',
    price: 500,
    description: 'Clean, modern single-page website for personal or small business use.',
    features: ['Responsive Design', 'Speed Optimized', 'SEO Ready', 'Contact Integration'],
    popular: false
  },
  {
    title: '3D Website + AI features',
    price: 1000,
    description: 'Immersive experience with 3D elements and intelligent AI components.',
    features: ['Animated 3D Models', 'AI Assistant', 'Dynamic Loading', 'Custom Interactions'],
    popular: true
  },
  {
    title: 'Logo Designing',
    price: 500,
    description: 'Unique brand identity that conveys your message perfectly.',
    features: ['3 Unique Concepts', 'Vector Files', 'Unlimited Revisions', 'Social Media Kit'],
    popular: false
  },
  {
    title: 'AI Chatbot Development',
    price: 500,
    description: 'Smart chatbots for your website to handle customer queries 24/7.',
    features: ['NLP Integration', 'Custom Training', 'Multi-platform', 'Analytics Dashboard'],
    popular: false
  }
];

export default function Services() {
  const [services, setServices] = useState<any[]>(initialServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false); // Fallback to initial
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="services" className="py-24 bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] mb-4">Pricing Plans</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Service Packages</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Transparent pricing for high-quality digital solutions. No hidden costs. 
            Need something custom? Contact me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id || service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative p-6 rounded-3xl border transition-all duration-500 group",
                service.popular 
                  ? "bg-brand-primary/5 border-brand-primary/30" 
                  : "glass border-white/5 hover:border-brand-primary/30"
              )}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded bg-brand-primary/20 text-[10px] font-bold uppercase tracking-widest text-brand-primary border border-brand-primary/20">
                  Popular
                </div>
              )}
              
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6">
                 <Package className="w-6 h-6 text-brand-primary" />
              </div>

              <h4 className="text-xl font-bold mb-2 text-white">{service.title}</h4>
              <p className="text-slate-500 text-xs mb-6 h-12 line-clamp-3">
                {service.description}
              </p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-bold text-brand-primary italic">₹{service.price}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {(service.features || ['Responsive Design', 'Speed Optimized', 'SEO Ready', 'Contact Integration']).slice(0, 3).map((feature: string) => (
                  <li key={feature} className="flex items-center gap-3 text-[13px] text-slate-400">
                    <Check className="w-4 h-4 text-brand-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a
                href="#contact"
                className={cn(
                  "w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group transition-all",
                  service.popular 
                    ? "accent-gradient text-white shadow-lg shadow-brand-primary/20" 
                    : "bg-white/5 hover:bg-brand-primary/10 text-white"
                )}
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <div className="inline-block p-8 rounded-[3rem] glass-dark border border-slate-800 max-w-3xl">
                <h4 className="text-2xl font-bold mb-4">Custom Solutions</h4>
                <p className="text-slate-400 mb-6">
                    Have a unique project in mind that doesn't fit the packages above? I offer fully customizable services tailored to your specific requirements.
                </p>
                <a href="#contact" className="text-brand-primary font-bold hover:underline flex items-center justify-center gap-2">
                    Let's discuss your project <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
      </div>
    </section>
  );
}
