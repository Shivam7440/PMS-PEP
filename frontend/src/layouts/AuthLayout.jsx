import React from 'react';
import { Sparkles } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden">
      {/* Dynamic ambient background */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-600/15 dark:bg-brand-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/15 dark:bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white mb-6 ai-glow shadow-xl shadow-brand-500/20">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs">{subtitle}</p>
        </div>

        <div className="glass-card p-10 rounded-[3rem]">
          {children}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
            Securely Managed by ClickLite AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
