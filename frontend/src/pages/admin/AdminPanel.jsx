import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/ui/Button';
import {
  Shield,
  Users,
  FileText,
  Settings,
  MoreVertical,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react';

const users = [
  { id: 1, name: 'Admin User', email: 'admin@clicklite.com', role: 'Super Admin', status: 'Active', joined: 'Jan 2025' },
  { id: 2, name: 'Sarah Wilson', email: 'sarah@clicklite.com', role: 'Project Manager', status: 'Active', joined: 'Feb 2025' },
  { id: 3, name: 'David Chen', email: 'david@clicklite.com', role: 'Member', status: 'Suspended', joined: 'May 2025' },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('Users');

  return (
    <MainLayout>
      <div className="p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl flex-shrink-0">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Console</h1>
              <p className="text-slate-400 font-medium">System-level management and oversight</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">
              <FileText size={18} className="mr-2" />
              System Logs
            </Button>
            <Button variant="primary">
              <Settings size={18} className="mr-2" />
              Global Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Users', value: '1,248', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Active Projects', value: '412', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'System Health', value: '99.9%', icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              {['Users', 'Projects', 'Permissions', 'Logs'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Universal search..."
                className="pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all w-full md:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Profile</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Joined</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 mb-0.5">{user.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className="text-xs font-bold text-slate-700">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-medium text-slate-400">{user.joined}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-slate-300 hover:text-indigo-600 rounded-xl">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPanel;
