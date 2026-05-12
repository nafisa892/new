import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc, getDocs, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../lib/firebase';
import { ClientMessage } from '../types';
import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, Trash2, CheckCircle, ExternalLink, MessageSquare, Eye, Users, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [stats, setStats] = useState({
    totalViews: 1240, // Placeholder for real analytics
    totalMessages: 0,
    newMessages: 0,
    topService: 'AI Chatbot'
  });

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientMessage));
      setMessages(msgs);
      setStats(prev => ({
        ...prev,
        totalMessages: snapshot.size,
        newMessages: msgs.filter(m => m.status === 'new').length
      }));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'messages');
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-24 px-6 md:px-12 pb-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Views', value: stats.totalViews, icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Client Requests', value: stats.totalMessages, icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { label: 'New Messages', value: stats.newMessages, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Top Service', value: stats.topService, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
          ].map((stat, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-dark p-6 rounded-3xl border border-slate-800"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Messages */}
            <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Recent Messages</h2>
                    <Link to="/admin/messages" className="text-brand-primary font-bold text-sm hover:underline">View All</Link>
                </div>
                
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="glass-dark p-12 text-center rounded-3xl border border-slate-800 text-slate-500">
                        No messages yet.
                    </div>
                  ) : messages.map((msg) => (
                    <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`glass-dark p-6 rounded-3xl border ${msg.status === 'new' ? 'border-brand-primary/50' : 'border-slate-800'}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">{msg.name}</h3>
                                <div className="flex gap-4 text-xs text-slate-500 mt-1">
                                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {msg.email}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {msg.createdAt?.toDate ? format(msg.createdAt.toDate(), 'MMM d, h:mm a') : 'Just now'}</span>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${msg.status === 'new' ? 'bg-brand-primary text-white' : 'bg-slate-800 text-slate-400'}`}>
                                {msg.status}
                            </div>
                        </div>
                        <p className="text-slate-300 text-sm line-clamp-2">{msg.requirement}</p>
                    </motion.div>
                  ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="space-y-4">
                    <Link to="/admin/services" className="w-full glass-dark p-6 rounded-3xl border border-slate-800 flex items-center justify-between group hover:border-brand-primary transition-all">
                        <div className="text-left">
                            <h3 className="font-bold">Manage Services</h3>
                            <p className="text-xs text-slate-500">Update prices & types</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-brand-primary" />
                    </Link>
                    <Link to="/admin/settings" className="w-full glass-dark p-6 rounded-3xl border border-slate-800 flex items-center justify-between group hover:border-brand-primary transition-all">
                        <div className="text-left">
                            <h3 className="font-bold">Site Settings</h3>
                            <p className="text-xs text-slate-500">Edit hero & about text</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-brand-primary" />
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
