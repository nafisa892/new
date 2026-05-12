import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Loader2, LogOut, ChevronLeft } from 'lucide-react';

export default function AdminLayout() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      // Check if admin email matches
      if (u && u.email === 'nafisaasoti@gmail.com') {
        setUser(u);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950 p-6">
        <div className="glass-dark p-12 rounded-[3rem] border border-slate-800 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
          <p className="text-slate-400 mb-8">Access restricted to Nafisa Asoti only.</p>
          <button 
            onClick={login}
            className="w-full py-4 rounded-2xl bg-brand-primary text-white font-bold flex items-center justify-center gap-3"
          >
            Sign in with Google
          </button>
          <Link to="/" className="mt-8 inline-block text-sm text-slate-500 hover:text-white flex items-center justify-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Back to Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark py-4 px-6 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold text-gradient">NAFISA. ADMIN</Link>
            <div className="hidden md:flex gap-6 items-center border-l border-slate-800 pl-6">
                <Link to="/admin" className={`text-sm ${location.pathname === '/admin' ? 'text-brand-primary font-bold' : 'text-slate-400'}`}>Dashboard</Link>
                <Link to="/admin/messages" className={`text-sm ${location.pathname === '/admin/messages' ? 'text-brand-primary font-bold' : 'text-slate-400'}`}>Messages</Link>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500 hidden sm:block">{user.email}</p>
            <button onClick={logout} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700">
                <LogOut className="w-5 h-5" />
            </button>
        </div>
      </nav>
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}
