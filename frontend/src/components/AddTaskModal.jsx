import React, { useState, useEffect } from 'react';
import { X, User, Briefcase, AlertTriangle, Clock, Sparkles, Zap, Brain, Check, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAsync } from '../store/slices/taskSlice';
import { fetchMembers } from '../store/slices/teamSlice';
import { useParams } from 'react-router-dom';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['To Do', 'In Progress', 'Review', 'Done'];

const AI_SUGGESTIONS = [
  "Optimize database queries for performance",
  "Implement end-to-end encryption for chat",
  "Design responsive landing page",
  "Refactor authentication middleware",
  "Integrate payment gateway (Stripe/PayPal)"
];

const AddTaskModal = ({ isOpen, onClose, projectId: propProjectId, initialStatus }) => {
  const { id: urlProjectId } = useParams();
  const projectId = propProjectId || urlProjectId;
  const dispatch = useDispatch();
  const { members: teamMembers } = useSelector((state) => state.team);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchMembers());
      if (initialStatus) {
        setStatus(initialStatus);
      }
    }
  }, [isOpen, dispatch, initialStatus]);

  useEffect(() => {
    if (teamMembers.length > 0 && !assigneeId) {
      setAssigneeId(teamMembers[0]._id);
    }
  }, [teamMembers, assigneeId]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;

    const statusToColumn = {
      'To Do': 'todo',
      'In Progress': 'inprogress',
      'Review': 'review',
      'Done': 'done'
    };

    const taskData = {
      title,
      description,
      priority,
      status,
      dueDate,
      assignees: assigneeId ? [assigneeId] : [],
      project: projectId,
      columnId: statusToColumn[status] || 'todo'
    };

    await dispatch(addTaskAsync(taskData));
    setTitle('');
    setDescription('');
    setDueDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  const selectSuggestion = (s) => {
    setTitle(s);
    setShowAiSuggestions(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-500">
      <div
        className="glass-card w-full max-w-2xl rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:shadow-none overflow-hidden animate-in fade-in zoom-in duration-500 max-h-[92vh] flex flex-col relative border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient glow decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

        <div className="p-10 overflow-y-auto custom-scrollbar relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white ai-glow shadow-lg shadow-brand-500/20">
                <Zap size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">Initialize Objective</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">Global Synchronization Active</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-white/5 rounded-xl transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Objective Title</label>
                <button
                  type="button"
                  onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                  className="flex items-center gap-1.5 text-[10px] font-black text-brand-500 uppercase tracking-widest hover:text-brand-400 transition-colors"
                >
                  <Sparkles size={12} />
                  AI Suggestions
                </button>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  required
                  placeholder="e.g., Implement Advanced Query Logic"
                  className="w-full px-6 py-4 bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all shadow-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />

                {showAiSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-3 glass-card rounded-2xl p-2 z-50 border-brand-500/20 shadow-2xl animate-in fade-in slide-in-from-top-2">
                    <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Smart Suggestions</p>
                    {AI_SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectSuggestion(s)}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400 text-sm font-bold transition-all flex items-center justify-between group"
                      >
                        {s}
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Functional Description</label>
              <textarea
                placeholder="Define the scope and requirements for this objective..."
                className="w-full p-6 bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-white/5 rounded-[2rem] text-slate-900 dark:text-white font-medium placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500/50 outline-none transition-all min-h-[140px] resize-none shadow-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Agent Assignment</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-brand-500 transition-colors pointer-events-none" size={18} />
                  <select
                    className="w-full pl-12 pr-10 py-4 bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-white/5 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 appearance-none focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500/50 outline-none transition-all cursor-pointer shadow-sm"
                    value={assigneeId}
                    onChange={(e) => setAssigneeId(e.target.value)}
                  >
                    {teamMembers.map((member) => (
                      <option key={member._id} value={member._id} className="dark:bg-slate-900">
                        {member.username}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Clock size={16} className="opacity-0" /> {/* Spacer */}
                    <div className="border-t-2 border-r-2 border-slate-300 dark:border-slate-700 w-2 h-2 rotate-[135deg]" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Synchronization Deadline</label>
                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-brand-500 transition-colors pointer-events-none" size={18} />
                  <input
                    type="date"
                    required
                    className="w-full pl-12 pr-6 py-4 bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-white/5 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500/50 outline-none transition-all cursor-pointer shadow-sm"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Priority Matrix</label>
                  <div className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                    <Brain size={10} />
                    AI Recommended
                  </div>
                </div>
                <div className="flex gap-2">
                  {priorities.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${priority === p
                        ? 'bg-brand-600 border-brand-600 text-white ai-glow'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/10'
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Global Status</label>
                <div className="relative group">
                  <select
                    className="w-full px-6 py-4 bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-white/5 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 appearance-none focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500/50 outline-none transition-all cursor-pointer shadow-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s} className="dark:bg-slate-900">
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <div className="border-t-2 border-r-2 border-slate-300 dark:border-slate-700 w-2 h-2 rotate-[135deg]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex items-center gap-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1 py-4 bg-white/5 border-white/10 text-slate-400 hover:text-white rounded-[1.5rem]"
                onClick={onClose}
              >
                Abort
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-[2] py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] ai-glow shadow-xl shadow-brand-500/20"
              >
                Deploy Objective
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
