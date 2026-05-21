import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Clock, Target, Users, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

const ProjectOverview = () => {
  const { items: projects } = useSelector((state) => state.projects);
  const activeProject = projects.find(p => p.status === 'Active') || projects[0];

  if (!activeProject) {
    return (
      <div className="glass-card p-12 rounded-[3rem] flex items-center justify-center text-center">
        <div>
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Target size={32} />
          </div>
          <p className="text-slate-500 font-bold">No active projects to display</p>
          <Button variant="ghost" className="mt-4 text-brand-500">Create your first project</Button>
        </div>
      </div>
    );
  }

  const progress = activeProject.progress || 0;
  const deadline = activeProject.deadline ? new Date(activeProject.deadline).toLocaleDateString() : 'N/A';
  const startDate = new Date(activeProject.createdAt).toLocaleDateString();

  return (
    <div className="glass-card p-8 rounded-[3rem] transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -mr-32 -mt-32" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Live Tracking</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{activeProject.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl leading-relaxed">
            {activeProject.description || 'No description provided'}
          </p>
        </div>
        <div className="flex -space-x-3 isolate">
          {activeProject.members?.slice(0, 4).map((member, i) => (
            <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-300 ring-1 ring-slate-100 dark:ring-slate-800 overflow-hidden shadow-xl">
              {member.avatar ? <img src={member.avatar} alt="avatar" /> : member.username?.[0] || '?'}
            </div>
          ))}
          {activeProject.members?.length > 4 && (
            <div className="w-12 h-12 rounded-2xl border-4 border-white dark:border-slate-900 bg-brand-500 flex items-center justify-center text-xs font-black text-white shadow-xl">
              +{activeProject.members.length - 4}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 relative z-10">
        {[
          { label: 'Started', value: startDate, icon: Calendar, color: 'text-brand-500', bg: 'bg-brand-500/10' },
          { label: 'Target Date', value: deadline, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Contributors', value: activeProject.members?.length || 0, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center`}>
              <item.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-sm font-bold dark:text-slate-100 mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Project Velocity</span>
          <span className="text-sm font-black text-brand-600 dark:text-brand-400">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-white/5 h-4 rounded-full overflow-hidden p-1">
          <div
            className="bg-brand-600 dark:bg-brand-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(79,70,229,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="ghost" className="text-brand-600 dark:text-brand-400 font-bold flex items-center gap-2 group/btn">
          View Analytics
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectOverview;
