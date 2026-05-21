import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  Trash2,
  Paperclip,
  ChevronRight,
  MessageSquare,
  User,
  Flag,
  Calendar as CalendarIcon,
  Sparkles,
  Zap,
  Shield,
  Layout,
  UserPlus
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteTaskAsync, clearSelectedTask } from '../store/slices/taskSlice';
import Button from './ui/Button';

const TaskDetailDrawer = ({ task, isOpen, onClose }) => {
  const dispatch = useDispatch();
  if (!task) return null;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      dispatch(deleteTaskAsync(task._id));
      onClose();
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const priorityColors = {
    High: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    Medium: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    Low: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  };

  const assignee = task.assignees?.[0] || { username: 'Unassigned', avatar: null };
  const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl shadow-[-20px_0_50px_rgba(0,0,0,0.2)] z-[70] overflow-y-auto custom-scrollbar border-l border-white/10"
          >
            <div className="flex flex-col h-full relative">
              {/* Ambient decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between p-10 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white ai-glow shadow-lg shadow-brand-500/20">
                    <Layout size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Objective ID: #{task.id?.slice(-4) || 'META'}</span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-none mt-1">Synchronization Parameters</h2>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDelete}
                    className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all border border-transparent hover:border-rose-500/20"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-3 text-slate-400 hover:text-brand-500 hover:bg-brand-500/10 rounded-2xl transition-all border border-transparent hover:border-brand-500/20"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-10 space-y-12 relative z-10">
                {/* Title and Badge */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 bg-brand-500/10 text-brand-500 text-[10px] font-black rounded-xl uppercase tracking-widest border border-brand-500/20 shadow-sm">
                      {task.status}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Clock size={12} />
                      Last Sync: 2h ago
                    </span>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                    {task.title}
                  </h2>
                </div>

                {/* Attributes Grid */}
                <div className="grid grid-cols-2 gap-8 p-10 bg-white/50 dark:bg-white/5 rounded-[3rem] border border-white/20 dark:border-white/5 shadow-inner">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Prime Agent</p>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-[10px] text-white font-black overflow-hidden shadow-lg border border-white/20`}>
                            {assignee.avatar ? <img src={assignee.avatar} alt="avatar" /> : getInitials(assignee.username)}
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">{assignee.username}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                        <Zap size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Priority Level</p>
                        <span className={`text-[10px] font-black px-4 py-2 rounded-xl border uppercase tracking-[0.2em] shadow-sm flex items-center gap-2 ${priorityColors[task.priority] || priorityColors.Medium}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                        <CalendarIcon size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Sync Deadline</p>
                        <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Environment</p>
                        <span className="text-sm font-black text-brand-500 uppercase tracking-widest">PROD_SYNC</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-2">
                      Tactical Description
                    </h3>
                    <button className="text-brand-500 text-[10px] font-black uppercase tracking-widest hover:text-brand-400 transition-colors flex items-center gap-1">
                      <Sparkles size={12} />
                      Improve with AI
                    </button>
                  </div>
                  <div className="p-8 bg-slate-50 dark:bg-white/2 rounded-[2.5rem] border border-white/10 group transition-all hover:bg-white dark:hover:bg-white/5 hover:border-brand-500/20">
                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {task.description || "No tactical data synchronized. Initialize requirements to begin optimization."}
                    </p>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-2">
                      Neural Feed
                      <span className="text-[10px] px-2.5 py-1 bg-brand-500/10 text-brand-500 border border-brand-500/20 rounded-lg ml-2 tracking-normal">0</span>
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-[10px] text-white font-black flex-shrink-0 ai-glow">
                        {getInitials(assignee.username)}
                      </div>
                      <div className="flex-1 bg-white dark:bg-white/5 p-6 rounded-[1.5rem] border border-white/10 text-sm italic text-slate-400 dark:text-slate-500 font-medium">
                        Awaiting neural input from agents...
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-10 border-t border-white/5 bg-slate-50/50 dark:bg-white/2 flex items-center justify-between relative z-10 backdrop-blur-md">
                <button className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest hover:text-brand-500 transition-all group">
                  <Paperclip size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>Attachments</span>
                </button>
                <div className="flex items-center gap-4">
                  <Button
                    variant="secondary"
                    className="px-8 py-4 bg-white/50 dark:bg-white/5 border-white/10 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  >
                    Archive
                  </Button>
                  <Button
                    className="px-10 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-brand-500/30 ai-glow active:scale-95 transition-all"
                  >
                    Commence Sync
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskDetailDrawer;
