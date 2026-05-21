import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../store/slices/teamSlice';
import { fetchProjects } from '../../store/slices/projectSlice';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/ui/Button';
import InviteModal from '../../components/InviteModal';
import CreateProjectModal from '../../components/CreateProjectModal';
import {
  Users,
  Search,
  UserPlus,
  MoreVertical,
  Mail,
  Shield,
  Clock,
  ChevronLeft,
  Layout,
  ArrowRight,
  Zap,
  Sparkles,
  Command
} from 'lucide-react';

const TeamManagement = () => {
  const dispatch = useDispatch();
  const { members: teamMembers, invitations, loading: teamLoading } = useSelector((state) => state.team);
  const { items: projects, loading: projectsLoading } = useSelector((state) => state.projects);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="p-10 space-y-12 h-full flex flex-col">
        {!selectedProject ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-brand-500/10 text-brand-500 rounded-lg flex items-center justify-center">
                    <Users size={14} />
                  </div>
                  <p className="text-brand-500 dark:text-brand-400 font-black uppercase tracking-[0.3em] text-[10px]">Neural Connector</p>
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Agent Directories</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Synchronize with specialized collaborator nodes across your ecosystem.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => setSelectedProject(project)}
                  className="glass-card p-10 rounded-[3rem] hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-brand-500/10 transition-colors" />
                  <div className="w-16 h-16 bg-brand-500/10 text-brand-500 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:ai-glow transition-all duration-500">
                    <Layout size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors uppercase tracking-tight leading-none">{project.name}</h3>
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 ai-glow" />
                      <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{project.members?.length || 0} Synchronized</span>
                    </div>
                    <ArrowRight size={20} className="text-slate-300 group-hover:text-brand-500 group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              ))}

              <div
                onClick={() => setIsCreateProjectModalOpen(true)}
                className="bg-white/5 dark:bg-white/2 border-2 border-dashed border-white/10 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center gap-6 hover:bg-white/10 hover:border-brand-500/30 transition-all group cursor-pointer"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-brand-500 transition-colors shadow-inner">
                  <UserPlus size={32} />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Initialize New Node</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col h-full overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-8">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-500 hover:shadow-xl transition-all border-white/10 group"
                >
                  <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-brand-500 ai-glow" />
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">{selectedProject.name} Nodes</h1>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Managing synchronization for {selectedProject.members?.length || 0} active agents</p>
                </div>
              </div>
              <Button
                className="bg-brand-600 hover:bg-brand-500 text-white shadow-xl shadow-brand-500/20 py-4 px-8 rounded-2xl flex items-center gap-2 ai-glow transition-transform active:scale-95 font-black uppercase tracking-widest text-xs"
                onClick={() => setIsInviteModalOpen(true)}
              >
                <UserPlus size={20} />
                Deploy Agent
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 flex-1 min-h-0">
              <div className="lg:col-span-3 space-y-8 flex flex-col h-full overflow-hidden">
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-all" size={20} />
                  <input
                    type="text"
                    placeholder="Query synchronized agents within this ecosystem..."
                    className="w-full pl-16 pr-6 py-4 bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-white/5 rounded-[2rem] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500/30 transition-all shadow-sm outline-none dark:text-white dark:placeholder:text-slate-600"
                  />
                </div>

                <div className="glass-card rounded-[3.5rem] border-white/10 overflow-hidden shadow-2xl flex-1 overflow-y-auto custom-scrollbar relative">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5 backdrop-blur-md border-b border-white/10">
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Collaborator Node</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Neural Role</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Sync Status</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(selectedProject.members || []).map((member) => (
                        <tr key={member._id} className="hover:bg-brand-500/5 transition-all group relative">
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-[1.25rem] bg-brand-600 flex items-center justify-center text-white font-black text-lg shadow-xl shadow-brand-500/20 overflow-hidden border-2 border-white/20 group-hover:scale-110 transition-transform">
                                {member.avatar ? <img src={member.avatar} alt="avatar" className="w-full h-full object-cover" /> : (member.username || '??').split(' ').map(n => n[0]).join('').toUpperCase()}
                              </div>
                              <div>
                                <p className="text-base font-black text-slate-900 dark:text-white leading-none mb-2 tracking-tight">{member.username}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight">{member.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className="text-[10px] font-black text-brand-500 bg-brand-500/10 border border-brand-500/20 px-4 py-2 rounded-xl uppercase tracking-[0.2em] shadow-sm">
                              {member.role || 'Neural Agent'}
                            </span>
                          </td>
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ai-glow shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                              <span className="text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Linked</span>
                            </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <button className="p-3 text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-brand-500/20">
                              <MoreVertical size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-brand-600 p-12 rounded-[3.5rem] text-white shadow-2xl shadow-brand-500/30 relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-[60px] group-hover:bg-white/20 transition-all duration-1000" />
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 ai-glow">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">Access Control</h3>
                  <p className="text-brand-100/90 text-[13px] font-medium leading-relaxed mb-10">
                    Surgical permission management at the ecosystem level ensures synchronized data integrity.
                  </p>
                  <Button className="bg-white text-brand-600 hover:bg-slate-100 py-4 w-full rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Synchronize Access</Button>
                </div>

                <div className="glass-card p-10 rounded-[3rem] border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
                  <div className="flex items-center gap-2 mb-10 px-1">
                    <Sparkles size={16} className="text-brand-500" />
                    <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Pending Links</h3>
                  </div>
                  <div className="space-y-6 text-center py-8">
                    <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-inner group-hover:scale-110 transition-transform">
                      <Command size={28} className="text-slate-400 dark:text-slate-700" />
                    </div>
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">Queue Clean</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        projectId={selectedProject?._id}
      />

      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
      />
    </MainLayout>
  );
};

export default TeamManagement;
