import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { ClientMessage } from '../types';
import { Mail, Phone, Clock, Trash2, CheckCircle, Search, Filter, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminMessages() {
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientMessage));
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'messages');
    });

    return () => unsubscribe();
  }, []);

  const toggleStatus = async (msg: ClientMessage) => {
    try {
      const newStatus = msg.status === 'new' ? 'read' : 'new';
      await updateDoc(doc(db, 'messages', msg.id), { status: newStatus });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `messages/${msg.id}`);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesFilter = filter === 'all' || m.status === filter;
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.requirement.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 px-6 md:px-12 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h1 className="text-4xl font-bold flex items-center gap-4">
            <MessageSquare className="w-10 h-10 text-brand-primary" />
            Client Messages
          </h1>
          
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 rounded-2xl glass-dark border border-slate-800 w-full focus:border-brand-primary outline-none"
                />
            </div>
            <div className="flex bg-slate-900 rounded-2xl p-1 border border-slate-800">
                {['all', 'new', 'read'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
                {filteredMessages.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-dark p-24 text-center rounded-[3rem] border border-slate-800"
                    >
                        <MessageSquare className="w-16 h-16 text-slate-800 mx-auto mb-4" />
                        <p className="text-slate-500 text-lg">No messages found matching your criteria.</p>
                    </motion.div>
                ) : filteredMessages.map((msg) => (
                    <motion.div 
                        layout
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`glass-dark p-8 rounded-[2.5rem] border transition-all ${msg.status === 'new' ? 'border-brand-primary shadow-2xl shadow-brand-primary/5' : 'border-slate-800'}`}
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-grow">
                                <div className="flex items-center gap-4 mb-4">
                                    <h3 className="text-2xl font-bold">{msg.name}</h3>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${msg.status === 'new' ? 'bg-brand-primary text-white' : 'bg-slate-800 text-slate-500'}`}>
                                        {msg.status}
                                    </span>
                                </div>
                                
                                <div className="flex flex-wrap gap-6 text-sm text-slate-400 mb-6">
                                    <a href={`mailto:${msg.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="w-4 h-4 text-brand-primary" /> {msg.email}</a>
                                    {msg.phone && <a href={`tel:${msg.phone}`} className="flex items-center gap-2 hover:text-white"><Phone className="w-4 h-4 text-brand-primary" /> {msg.phone}</a>}
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-primary" /> {msg.createdAt?.toDate ? format(msg.createdAt.toDate(), 'MMMM d, yyyy h:mm a') : 'Just now'}</span>
                                </div>
                                
                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 text-slate-300 leading-relaxed">
                                    {msg.requirement}
                                </div>
                            </div>
                            
                            <div className="flex md:flex-col gap-3 justify-end md:justify-start">
                                <button 
                                    onClick={() => toggleStatus(msg)}
                                    className={`p-4 rounded-2xl border flex items-center justify-center transition-all ${msg.status === 'new' ? 'bg-green-500/10 border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                                    title={msg.status === 'new' ? 'Mark as Read' : 'Mark as New'}
                                >
                                    <CheckCircle className="w-6 h-6" />
                                </button>
                                <button 
                                    onClick={() => deleteMessage(msg.id)}
                                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                    title="Delete Message"
                                >
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
