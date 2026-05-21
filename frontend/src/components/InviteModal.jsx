import React, { useState } from 'react';
import { X, Mail, Shield, AlertCircle, Search, CheckCircle2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { inviteMemberAsync, addMemberToProjectAsync, fetchMembers } from '../store/slices/teamSlice';
import Button from './ui/Button';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const roles = ['Project Manager', 'Senior Designer', 'Frontend Lead', 'UX Researcher', 'Backend Developer', 'QA Engineer', 'Product Owner'];

const InviteModal = ({ isOpen, onClose, projectId }) => {
  const dispatch = useDispatch();
  const { members: allMembers, loading } = useSelector((state) => state.team);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchMembers());
    }
  }, [dispatch, isOpen]);

  if (!isOpen) return null;

  const filteredMembers = searchQuery.trim()
    ? allMembers.filter(m =>
      m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (projectId && selectedUserId) {
      await dispatch(addMemberToProjectAsync({ projectId, userId: selectedUserId }));
    } else if (email.trim()) {
      await dispatch(inviteMemberAsync({ email, role }));
    }

    // Reset and close
    setEmail('');
    setSearchQuery('');
    setSelectedUserId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
      <div
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Invite Teammate</h2>
              <p className="text-slate-500 text-sm font-medium">Add a new collaborator to your organization.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {projectId ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Search Organization Users</label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                    <input
                      type="text"
                      placeholder="Type name or email..."
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {searchQuery.trim() && (
                  <div className="max-h-48 overflow-y-auto bg-white border border-slate-100 rounded-2xl shadow-sm divide-y divide-slate-50">
                    {filteredMembers.length > 0 ? filteredMembers.map(member => (
                      <div
                        key={member._id}
                        onClick={() => {
                          setSelectedUserId(member._id);
                          setSearchQuery(member.username);
                        }}
                        className={`p-4 flex items-center justify-between cursor-pointer hover:bg-indigo-50 transition-colors ${selectedUserId === member._id ? 'bg-indigo-50' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                            {member.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 leading-none">{member.username}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{member.email}</p>
                          </div>
                        </div>
                        {selectedUserId === member._id && <CheckCircle2 size={18} className="text-indigo-600" />}
                      </div>
                    )) : (
                      <div className="p-8 text-center text-slate-400 text-xs font-medium">No users found</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                  <input
                    type="email"
                    required={!projectId}
                    placeholder="work@company.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Role</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                <select
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:bg-white focus:border-indigo-100 outline-none transition-all cursor-pointer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-2xl flex gap-3 items-start border border-indigo-100">
              <AlertCircle size={18} className="text-indigo-600 mt-0.5 shrink-0" />
              <p className="text-[11px] font-medium text-indigo-700 leading-normal">
                An invitation email will be sent to this address. They will gain access to organization projects once they accept.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1 py-4 rounded-2xl"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-[2] py-4 rounded-2xl shadow-lg shadow-indigo-100"
              >
                Send Invite
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
