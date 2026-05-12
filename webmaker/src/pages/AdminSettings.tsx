import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { doc, onSnapshot, setDoc, collection, writeBatch } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { SiteSettings } from '../types';
import { Save, RefreshCcw, ShieldCheck, Database, Loader2 } from 'lucide-react';

const defaultSettings: SiteSettings = {
  heroTitle: 'Transforming Ideas into Digital Reality.',
  heroSubtitle: "I'm Nafisa Asoti, a B.Tech student who has combined her passion for technology with creative design.",
  aboutText: "I am Nafisa Asoti, a B.Tech student who has combined her passion for technology with creative design. I don't just build sites; I build digital experiences that help your business grow.",
  email: 'nafisaasoti@gmail.com',
  phone: '9880212500',
  whatsapp: '9880212500'
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data() as SiteSettings);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), settings);
      alert('Settings saved!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/global');
    } finally {
      setSaving(false);
    }
  };

  const seedData = async () => {
    if (!window.confirm('This will populate services with default pricing listed in the prompt. Continue?')) return;
    setSeeding(true);
    try {
      const batch = writeBatch(db);
      
      const services = [
        { title: 'Simple Website Design', price: 500, description: 'Clean, modern single-page website.', order: 0 },
        { title: '3D Website with AI Features', price: 1000, description: 'Immersive experience with intelligent components.', order: 1 },
        { title: 'Logo Designing', price: 500, description: 'Unique brand identity design.', order: 2 },
        { title: 'AI Chatbot Development', price: 500, description: 'Smart customer service automation.', order: 3 }
      ];

      for (const s of services) {
        const newRef = doc(collection(db, 'services'));
        batch.set(newRef, s);
      }

      await batch.commit();
      alert('Default services seeded successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'services');
    } finally {
      setSeeding(false);
    }
  };

  if (loading) return null;

  return (
    <div className="pt-24 px-6 md:px-12 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold flex items-center gap-4">
                <RefreshCcw className="w-10 h-10 text-brand-primary" />
                Site Settings
            </h1>
            <button 
                onClick={seedData} 
                disabled={seeding}
                className="px-6 py-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-500 text-sm font-bold flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50"
            >
                {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                Seed Initial Services
            </button>
        </div>

        <form onSubmit={handleSave} className="glass-dark p-8 md:p-12 rounded-[3.5rem] border border-slate-800 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-3">Hero Title</label>
                    <input 
                        value={settings.heroTitle}
                        onChange={e => setSettings({...settings, heroTitle: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 focus:border-brand-primary outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-3">Email Contact</label>
                    <input 
                        value={settings.email}
                        onChange={e => setSettings({...settings, email: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 focus:border-brand-primary outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-3">WhatsApp/Phone</label>
                    <input 
                        value={settings.phone}
                        onChange={e => setSettings({...settings, phone: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 focus:border-brand-primary outline-none"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-3">About Text</label>
                    <textarea 
                        value={settings.aboutText}
                        onChange={e => setSettings({...settings, aboutText: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 h-40 focus:border-brand-primary outline-none resize-none"
                    />
                </div>
            </div>

            <button 
                disabled={saving}
                className="w-full py-5 rounded-2xl bg-brand-primary text-white font-bold flex items-center justify-center gap-3 hover:bg-brand-primary/90 transition-all disabled:opacity-50 shadow-xl shadow-brand-primary/20"
            >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes Locked
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4" /> Changes are published immediately to the live site.
            </div>
        </form>
      </div>
    </div>
  );
}
