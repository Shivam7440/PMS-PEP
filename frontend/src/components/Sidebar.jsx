import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  Users,
  Calendar,
  Bell,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Briefcase, label: 'Projects', path: '/projects' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Users, label: 'Teams', path: '/teams' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const getInitials = (username) => {
    if (!username) return '??';
    return username.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={`flex flex-col h-screen glass-sidebar text-slate-400 transition-all duration-500 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'} sticky top-0 z-50`}>
      <div className="flex items-center justify-between h-20 px-6 border-b border-white/5">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white font-black text-sm ai-glow">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase">ClickLite</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white font-black text-sm mx-auto ai-glow">
            <Sparkles size={18} />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-10 p-2 rounded-xl bg-brand-600 text-white shadow-2xl hover:bg-brand-500 transition-all border border-white/10"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center w-full px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
              ${isActive
                ? 'bg-brand-600/10 text-white'
                : 'hover:bg-white/5 hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={`flex-shrink-0 transition-colors ${isActive ? 'text-brand-500' : 'group-hover:text-brand-400'}`} />
                {!isCollapsed && <span className="ml-4 font-semibold text-[14px] tracking-tight">{item.label}</span>}
                {!isCollapsed && item.label === 'Notifications' && unreadCount > 0 && (
                  <span className="ml-auto w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-lg flex items-center justify-center ai-glow">{unreadCount}</span>
                )}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-brand-600 rounded-r-full ai-glow" />
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-8 mb-2">
          {!isCollapsed && <p className="px-4 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Enterprise</p>}
          <NavLink
            to="/admin"
            className={({ isActive }) => `
              flex items-center w-full px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
              ${isActive ? 'bg-brand-600/10 text-white' : 'hover:bg-white/5 hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                <ShieldCheck size={20} className={`flex-shrink-0 transition-colors ${isActive ? 'text-brand-500' : 'group-hover:text-brand-400'}`} />
                {!isCollapsed && <span className="ml-4 font-semibold text-[14px] tracking-tight">Admin Panel</span>}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-brand-600 rounded-r-full ai-glow" />
                )}
              </>
            )}
          </NavLink>
        </div>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className={`p-4 rounded-[2rem] bg-white/5 flex items-center gap-4 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-lg ai-glow">
            {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full rounded-2xl object-cover" /> : getInitials(user?.username)}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.username || 'Guest'}</p>
              <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest mt-0.5">{user?.role || 'Contributor'}</p>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
