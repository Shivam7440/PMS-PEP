import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProjectOverview from '../../components/ProjectOverview';
import TeamSection from '../../components/TeamSection';
import ActivityTimeline from '../../components/ActivityTimeline';
import Button from '../../components/ui/Button';
import ProjectTasks from '../../components/ProjectTasks';
import ProjectBoard from '../../components/ProjectBoard';
import AddTaskModal from '../../components/AddTaskModal';
import {
  Plus,
  Share2,
  ChevronLeft,
  Layout,
  CheckCircle2,
  Users2,
  TrendingUp,
  Zap,
  LayoutDashboard,
  Brain,
  Sparkles
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectById, clearCurrentProject } from '../../store/slices/projectSlice';

const ProjectDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProject: project, loading } = useSelector((state) => state.projects);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
    return () => dispatch(clearCurrentProject());
  }, [dispatch, id]);

  const tabs = ['Overview', 'Tasks', 'Board', 'Team', 'Files', 'Settings'];

  return (
    <MainLayout>
      <div className="p-10 space-y-12 pb-24">
        {/* Project Header */}
        <div className="flex flex-col gap-10">
          <Link to="/projects" className="group flex items-center gap-2 text-brand-500 font-black text-[10px] uppercase tracking-[0.3em] hover:text-brand-400 transition-all">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Ecosystem
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-brand-600 rounded-[2.5rem] flex items-center justify-center text-white ai-glow shadow-2xl shadow-brand-500/20 flex-shrink-0 animate-float">
                <LayoutDashboard size={40} />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{project?.name || 'Synchronizing...'}</h1>
                  <span className="px-4 py-1.5 bg-brand-500/10 text-brand-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-brand-500/20">{project?.status || 'Active'}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">
                  {loading ? 'Initializing description protocols...' : (project?.description || 'No descriptive data synchronized for this node.')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                className="rounded-2xl py-4 px-8 bg-white/50 dark:bg-white/5 border-white/10 text-slate-600 dark:text-slate-300 backdrop-blur-md"
              >
                <Share2 size={18} className="mr-2" />
                Synchronize
              </Button>
              <Button
                variant="primary"
                className="rounded-2xl py-4 px-8 bg-brand-600 hover:bg-brand-500 text-white shadow-xl shadow-brand-500/20 ai-glow font-black text-sm uppercase tracking-widest flex items-center gap-2 group transition-all"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus size={22} className="group-rotate-90 transition-transform" />
                Initialize Task
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/40 dark:bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-sm w-fit group">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all
                  ${activeTab === tab
                    ? 'bg-brand-600 text-white shadow-xl shadow-brand-500/20 ai-glow'
                    : 'text-slate-400 dark:text-slate-500 hover:text-brand-500 hover:bg-white/50 dark:hover:bg-white/5'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="xl:col-span-2 space-y-12">
              <div className="glass-card rounded-[3rem] overflow-hidden border border-white/10">
                <ProjectOverview />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Completion Rate', value: '94%', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                  { label: 'Neural Velocity', value: '8.4 ops', icon: Zap, color: 'text-brand-500', bg: 'bg-brand-500/10' },
                  { label: 'Agent Density', value: '14 Active', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center transition-all hover:border-brand-500/30 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-brand-500/5 rounded-full blur-3xl -ml-12 -mt-12 pointer-events-none" />
                    <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-[1.5rem] flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:ai-glow`}>
                      <stat.icon size={32} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                      <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <div className="glass-card p-10 rounded-[3rem] border-white/10">
                <TeamSection projectId={id} members={project?.members} />
              </div>
              <div className="glass-card p-10 rounded-[3rem] border-white/10">
                <ActivityTimeline />
              </div>
            </div>
          </div>
        )}

        {/* Other tabs remain largely the same in structure but benefit from global style updates */}
        {activeTab === 'Team' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 glass-card p-10 rounded-[3rem] min-h-[600px]">
            <TeamSection projectId={id} members={project?.members} />
          </div>
        )}

        {activeTab === 'Tasks' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ProjectTasks projectId={id} />
          </div>
        )}

        {activeTab === 'Board' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ProjectBoard projectId={id} />
          </div>
        )}

        {!['Overview', 'Tasks', 'Board', 'Team'].includes(activeTab) && (
          <div className="glass-card flex flex-col items-center justify-center py-32 rounded-[4rem] text-center border-dashed group">
            <div className="w-24 h-24 bg-brand-500/10 text-brand-500 rounded-[2.5rem] flex items-center justify-center mb-8 ai-glow group-hover:scale-110 transition-transform">
              <Sparkles size={48} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Initializing Module</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-center max-w-sm mb-12 text-lg">
              We are currently optimizing the <span className="text-brand-500 font-black uppercase tracking-widest">{activeTab}</span> interface for this workspace.
            </p>
            <Button
              variant="secondary"
              className="bg-brand-600 hover:bg-brand-500 text-white py-4 px-12 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-500/20"
              onClick={() => setActiveTab('Overview')}
            >
              Return to Tactical View
            </Button>
          </div>
        )}
      </div>
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        projectId={id}
      />
    </MainLayout>
  );
};

export default ProjectDashboard;
