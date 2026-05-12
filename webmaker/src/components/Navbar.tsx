import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code2, Cpu, Palette, MessageSquare, Phone, Mail, Instagram, Linkedin, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  if (isAdmin) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark py-4 px-6 flex justify-between items-center border-b border-slate-800">
        <Link to="/" className="text-xl font-bold text-gradient">Nafisa Asoti Admin</Link>
        <div className="flex gap-6 items-center">
          <Link to="/admin" className="text-sm hover:text-brand-primary">Dashboard</Link>
          <Link to="/admin/messages" className="text-sm hover:text-brand-primary">Messages</Link>
          <Link to="/admin/services" className="text-sm hover:text-brand-primary">Services</Link>
          <Link to="/admin/settings" className="text-sm hover:text-brand-primary">Settings</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 px-6 md:px-12",
      scrolled ? "glass py-4 shadow-2xl" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center font-bold text-white shadow-lg shadow-brand-primary/20">N</div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">Nafisa Asoti</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link 
            to="/admin" 
            className="px-5 py-2 rounded-full border border-brand-primary/30 text-brand-primary text-xs font-semibold hover:bg-brand-primary/10 transition-all"
          >
            Admin Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-dark border-t border-slate-800 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-300"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="mt-4 px-5 py-3 rounded-xl bg-brand-primary text-white text-center font-bold"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
