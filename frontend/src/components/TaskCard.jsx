import React from 'react';
import { MessageSquare, Calendar, MoreHorizontal, AlertCircle, Clock } from 'lucide-react';

const priorityColors = {
  High: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  Medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

const TaskCard = ({ task, onClick }) => {
  if (!task) return null;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';

  return (
    <div
      onClick={() => onClick(task)}
      className="glass-card p-5 rounded-3xl hover:border-brand-500/50 hover:bg-brand-500/5 transition-all cursor-pointer group mb-4 relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-brand-500 transition-all" />

      <div className="flex items-start justify-between mb-4">
        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border ${priorityColors[task.priority] || priorityColors.Medium}`}>
          {task.priority || 'Medium'}
        </span>
        <button className="text-slate-400 opacity-0 group-hover:opacity-100 hover:text-brand-500 transition-all p-1 hover:bg-white dark:hover:bg-slate-800 rounded-lg">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <h4 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 leading-snug mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {task.title}
      </h4>

      <div className="flex items-center gap-4 mb-5">
        <div className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest ${isOverdue ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500'}`}>
          <Clock size={14} className={isOverdue ? 'animate-pulse' : ''} />
          <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Deadline'}</span>
          {isOverdue && <AlertCircle size={12} className="ml-0.5" />}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex -space-x-2 isolate">
          {task.assignees?.map((assignee, idx) => (
            <div
              key={assignee._id || idx}
              className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-900 bg-brand-600 flex items-center justify-center text-[10px] font-black text-white shadow-sm ring-1 ring-slate-100 dark:ring-slate-800"
              title={assignee.username}
            >
              {assignee.username?.charAt(0).toUpperCase() || '?'}
            </div>
          ))}
          {(!task.assignees || task.assignees.length === 0) && (
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-dashed border-slate-300 dark:border-slate-700">
              <span className="text-[10px] font-black">?</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400">
            <MessageSquare size={14} />
            <span>{task.commentsCount || 0}</span>
          </div>
          {task.totalSubtasks > 0 && (
            <div className="text-[10px] font-black text-brand-500 bg-brand-500/10 px-2 py-1 rounded-lg border border-brand-500/20">
              {task.completedSubtasks}/{task.totalSubtasks}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
