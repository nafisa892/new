import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Service } from '../types';
import { Plus, Trash2, Edit2, Check, X, Package, LayoutGrid } from 'lucide-react';

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', price: 0, description: '', icon: 'Zap' });

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('price', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const svcs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
      setServices(svcs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'services');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'services', editingId), formData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'services'), { ...formData, order: services.length });
        setIsAdding(false);
      }
      setFormData({ title: '', price: 0, description: '', icon: 'Zap' });
    } catch (error) {
      handleFirestoreError(error, editingId ? OperationType.UPDATE : OperationType.CREATE, 'services');
    }
  };

  const deleteService = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
    }
  };

  const startEdit = (svc: Service) => {
    setEditingId(svc.id);
    setFormData({ title: svc.title, price: svc.price, description: svc.description, icon: svc.icon });
    setIsAdding(true);
  };

  return (
    <div className="pt-24 px-6 md:px-12 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold flex items-center gap-4">
            <LayoutGrid className="w-10 h-10 text-brand-primary" />
            Manage Services
          </h1>
          <button 
            onClick={() => { setIsAdding(!isAdding); setEditingId(null); setFormData({ title: '', price: 0, description: '', icon: 'Zap' }); }}
            className="px-6 py-3 rounded-2xl bg-brand-primary text-white font-bold flex items-center gap-2"
          >
            {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {isAdding ? 'Cancel' : 'Add Service'}
          </button>
        </div>

        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="glass-dark p-8 rounded-[2.5rem] border border-brand-primary/30 mb-12 grid gap-6 md:grid-cols-2"
          >
            <div className="md:col-span-2">
                <h2 className="text-xl font-bold">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
            </div>
            <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Title</label>
                <input 
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 focus:border-brand-primary outline-none"
                    placeholder="e.g. Logo Design"
                />
            </div>
            <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Price (₹)</label>
                <input 
                    required
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 focus:border-brand-primary outline-none"
                    placeholder="200"
                />
            </div>
            <div className="md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Description</label>
                <textarea 
                    required
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 h-24 focus:border-brand-primary outline-none resize-none"
                    placeholder="Service details..."
                />
            </div>
            <div className="md:col-span-2">
                <button className="w-full py-4 rounded-xl bg-brand-primary text-white font-bold flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> {editingId ? 'Update Service' : 'Save Service'}
                </button>
            </div>
          </motion.form>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
                <div key={svc.id} className="glass-dark p-8 rounded-[2.5rem] border border-slate-800 group hover:border-brand-primary transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                            <Package className="text-brand-primary w-6 h-6" />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => startEdit(svc)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => deleteService(svc.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{svc.title}</h3>
                    <p className="text-2xl font-bold text-gradient mb-4">₹{svc.price}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{svc.description}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
