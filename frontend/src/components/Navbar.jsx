import React from 'react';
import { useSelector } from 'react-redux';
import { Search, Bell, ChevronDown, Sparkles, HelpCircle, Command } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);

  const getInitials = (username) => {
    if (!username) return '??';
    return username.trim().split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="h-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 px-8 flex items-center justify-between transition-all">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative group w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-brand-500 transition-colors" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search anything... Type '/' for AI chat"
            className="w-full pl-12 pr-12 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-white/5 rounded-2xl text-sm focus:ring-4 focus:ring-brand-500/10 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500/50 transition-all outline-none dark:text-slate-200"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Command size={10} className="text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500">K</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-white/10">
          <ThemeToggle />
          <button className="p-2 text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-slate-900 rounded-xl transition-all">
            <HelpCircle size={20} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          <button className="p-2 text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-slate-900 rounded-xl relative transition-all group">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full group-hover:scale-125 transition-transform ai-glow"></span>
            )}
          </button>
        </div>

        <button className="flex items-center gap-3 pl-2 group transition-all">
          <div className="text-right hidden lg:block">
            <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100 leading-none">{user?.username || 'Guest'}</p>
            <p className="text-[10px] text-brand-500 mt-1 uppercase tracking-widest font-black">AI {user?.role || 'Pro'}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl p-0.5 bg-gradient-to-tr from-brand-500 to-purple-500 ai-glow transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-[0.85rem] bg-slate-900 flex items-center justify-center text-white font-black text-xs overflow-hidden border border-white/10">
              {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : getInitials(user?.username)}
            </div>
          </div>
          <ChevronDown size={14} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
