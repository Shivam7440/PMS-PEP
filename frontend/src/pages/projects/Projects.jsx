import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../store/slices/projectSlice';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/ui/Button';
import {
  LayoutGrid,
  List as ListIcon,
  Search,
  Plus,
  MoreVertical,
  Calendar,
  Layers,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import CreateProjectModal from '../../components/CreateProjectModal';

const ProjectCard = ({ project, viewType }) => {
  const statusColors = {
    Active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Delayed: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    Review: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Completed: 'bg-brand-500/10 text-brand-500 border-brand-500/20',
  };

  const progress = project.progress || 0;
  const membersCount = project.members?.length || 0;
  const deadline = project.deadline || project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A';

  if (viewType === 'grid') {
    return (
      <Link to={`/projects/${project._id}`} className="glass-card p-8 rounded-[2.5rem] hover:shadow-2xl hover:shadow-brand-500/5 transition-all group block relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-500/10 transition-colors" />

        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-500 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 ai-glow">
            <Layers size={28} />
          </div>
          <button className="p-2 text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-white/5 rounded-xl transition-all" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <MoreVertical size={20} />
          </button>
        </div>

        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 truncate tracking-tight">{project.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-8 h-10 font-medium">{project.description || 'No descriptive data provided'}</p>

        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-center text-[10px] font-black mb-1">
            <span className="text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Deployment Progress</span>
            <span className="text-brand-600 dark:text-brand-400">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-white/5 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-brand-600 dark:bg-brand-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between relative z-10 pt-6 border-t border-white/5">
          <div className="flex -space-x-2 isolate">
            {project.members?.slice(0, 3).map((member, i) => (
              <div key={i} className="w-9 h-9 rounded-xl border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-600 dark:text-slate-300 ring-1 ring-slate-100 dark:ring-slate-800 shadow-lg overflow-hidden">
                {member.avatar ? <img src={member.avatar} alt="avatar" /> : member.username?.[0] || '?'}
              </div>
            ))}
            {membersCount > 3 && (
              <div className="w-9 h-9 rounded-xl border-2 border-white dark:border-slate-900 bg-brand-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg ring-1 ring-brand-400">
                +{membersCount - 3}
              </div>
            )}
          </div>
          <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusColors[project.status] || statusColors.Active}`}>
            {project.status || 'Active'}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/projects/${project._id}`} className="glass-card p-5 rounded-3xl hover:bg-brand-500/5 transition-all flex items-center gap-8 block group relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-brand-500 transition-all" />
      <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-500 flex-shrink-0 group-hover:scale-110 transition-transform">
        <Layers size={24} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white truncate tracking-tight">{project.name}</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 truncate font-medium">{project.description || 'No descriptive data provided'}</p>
      </div>
      <div className="hidden md:block w-40">
        <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
          <div className="bg-brand-600 dark:bg-brand-500 h-full shadow-[0_0_8px_rgba(79,70,229,0.3)]" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-3 w-40">
        <Calendar size={16} className="text-slate-400" />
        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{deadline}</span>
      </div>
      <span className={`w-28 text-center px-2 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusColors[project.status] || statusColors.Active}`}>
        {project.status || 'Active'}
      </span>
      <button className="p-2 text-slate-400 hover:text-brand-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
        <MoreVertical size={20} />
      </button>
    </Link>
  );
};

const Projects = () => {
  const [viewType, setViewType] = useState('grid');
  const dispatch = useDispatch();
  const { items: projects, loading } = useSelector((state) => state.projects);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="p-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-500/10 text-brand-500 rounded-lg flex items-center justify-center">
                <Zap size={14} />
              </div>
              <p className="text-brand-500 dark:text-brand-400 font-black uppercase tracking-[0.3em] text-[10px]">Strategic Workspace</p>
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Global Projects</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Coordinate and synchronize your organization's objectives.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white/40 dark:bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-sm shadow-sm transition-all overflow-hidden group">
              <button
                onClick={() => setViewType('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewType === 'grid' ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' : 'text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-white/5'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-2.5 rounded-xl transition-all ${viewType === 'list' ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' : 'text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-white/5'}`}
              >
                <ListIcon size={20} />
              </button>
            </div>
            <Button
              className="bg-brand-600 hover:bg-brand-500 text-white shadow-xl shadow-brand-500/20 py-3.5 px-6 rounded-2xl flex items-center gap-2 ai-glow transition-transform active:scale-95 font-bold"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={22} />
              New Objective
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by keywords, tags, or agent name..."
              className="w-full pl-14 pr-6 py-4 bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-white/5 rounded-[2rem] text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all shadow-sm outline-none dark:text-white font-medium"
            />
          </div>
          <select className="px-6 py-4 bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-white/5 rounded-[2rem] text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest appearance-none focus:outline-none focus:ring-4 focus:ring-brand-500/10 shadow-sm transition-all cursor-pointer">
            <option>All Ecosystems</option>
            <option>Priority Alpha</option>
            <option>Completed</option>
            <option>Delayed Nodes</option>
          </select>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-24">
            <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent animate-spin rounded-full ai-glow" />
            <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Global Data...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-card flex flex-col items-center justify-center p-20 rounded-[4rem] border-dashed text-center">
            <div className="w-20 h-20 bg-brand-500/10 text-brand-500 rounded-[2.5rem] flex items-center justify-center mb-8 ai-glow animate-float">
              <Sparkles size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Ecosystem Empty</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-sm">No collaborative objectives found. Initialize your first project to begin AI-powered synchronization.</p>
            <Button
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 px-10 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-2 group"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Initialize Objective
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        ) : (
          <div className={`${viewType === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10' : 'flex flex-col gap-5'}`}>
            {projects.map(project => (
              <ProjectCard key={project._id} project={project} viewType={viewType} />
            ))}
          </div>
        )}
      </div>
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </MainLayout>
  );
};

export default Projects;
