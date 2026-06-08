import React from 'react';
import { Mail, Lock, Loader2, ShieldAlert } from 'lucide-react';

interface AuthScreenProps {
  loginEmail: string;
  setLoginEmail: (val: string) => void;
  loginPassword: string;
  setLoginPassword: (val: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  isLoggingIn: boolean;
}

export default function AuthScreen({
  loginEmail, setLoginEmail,
  loginPassword, setLoginPassword,
  handleLogin, isLoggingIn
}: AuthScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 relative overflow-hidden">
       <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
       
       <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/50 relative z-10">
           <div className="flex justify-center mb-6">
              <div className="w-20 h-20 transform hover:scale-105 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-full h-full drop-shadow-xl">
                   <rect x="8" y="28" width="48" height="22" fill="#0f172a" rx="4"/>
                   <rect x="12" y="10" width="40" height="18" fill="#3b82f6" rx="2"/>
                   <circle cx="20" cy="56" r="6" fill="#334155"/>
                   <circle cx="44" cy="56" r="6" fill="#334155"/>
                   <circle cx="20" cy="56" r="2" fill="#cbd5e1"/>
                   <circle cx="44" cy="56" r="2" fill="#cbd5e1"/>
                   <text x="32" y="44" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="900" fill="#f8fafc" textAnchor="middle">TMR</text>
                   <path d="M 6 28 L 12 10" stroke="#0f172a" strokeWidth="3" strokeLinecap="round"/>
                   <path d="M 58 28 L 52 10" stroke="#0f172a" strokeWidth="3" strokeLinecap="round"/>
                 </svg>
              </div>
           </div>
           
           <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">Aplikasi Data Pelaku Usaha Terpadu</h1>
              <p className="text-sm font-bold text-blue-600 mt-2 uppercase tracking-widest">UP TM Ragunan</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-5">
              <div>
                 <label className="block text-[11px] font-extrabold text-slate-500 mb-1.5 uppercase tracking-wider">Alamat Email Terdaftar</label>
                 <div className="relative">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold text-slate-700 text-sm" placeholder="Ketik email..." />
                 </div>
              </div>
              <div>
                 <label className="block text-[11px] font-extrabold text-slate-500 mb-1.5 uppercase tracking-wider">Kata Sandi (Password)</label>
                 <div className="relative">
                    <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold text-slate-700 text-sm" placeholder="••••••••" />
                 </div>
              </div>
              <button type="submit" disabled={isLoggingIn} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed">
                 {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk ke Sistem Terpadu"}
              </button>
           </form>

           <div className="mt-8 text-center border-t border-slate-100 pt-6">
              <p className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1.5">
                 <ShieldAlert className="w-3 h-3 text-emerald-500" /> Tersambung aman ke Firebase Auth
              </p>
           </div>
       </div>
    </div>
  );
}
