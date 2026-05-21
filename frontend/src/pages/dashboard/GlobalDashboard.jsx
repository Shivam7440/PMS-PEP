import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/slices/projectSlice';
import { fetchAssignedTasks } from '../../store/slices/taskSlice';

import MainLayout from '../../layouts/MainLayout';
import MetricCard from '../../components/MetricCard';
import ProjectOverview from '../../components/ProjectOverview';
import Button from '../../components/ui/Button';

import {
  FolderKanban,
  ListTodo,
  CalendarClock,
  Plus,
  Search
} from 'lucide-react';

const GlobalDashboard = () => {
  const dispatch = useDispatch();

  const { items: projects } = useSelector((state) => state.projects);
  const { assignedTasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'Active'
  });

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchAssignedTasks());
  }, [dispatch]);

  const activeProjects = projects.filter(p => p.status === 'Active');

  const metrics = [
    { title: 'Projects', value: projects.length, icon: FolderKanban },
    { title: 'Active', value: activeProjects.length, icon: CalendarClock },
    { title: 'My Tasks', value: assignedTasks.length, icon: ListTodo },
  ];

  return (
    <MainLayout>
      <div className="p-8 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Workspace Overview</h1>
              <p className="text-slate-500">
                Welcome back, {user?.username || 'User'}
              </p>
            </div>

            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus size={18} />
              New Project
            </Button>
          </div>

          {/* SEARCH BAR */}
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl shadow flex items-center gap-3">
            <Search size={16} />
            <input
              placeholder="Search projects, tasks…"
              className="flex-1 outline-none bg-transparent"
            />
            <span className="text-xs text-slate-400">⌘K</span>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            <ProjectOverview />

            {/* TASKS */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-4">Assigned Tasks</h3>

              {assignedTasks.length > 0 ? (
                <div className="space-y-3">
                  {assignedTasks.slice(0,5).map(task => (
                    <div
                      key={task._id}
                      className="p-4 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-slate-500">
                        {task.project?.name || 'Project'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">No tasks assigned</p>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* ACTIVITY */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-4">Recent Activity</h3>

              <ul className="space-y-2 text-sm text-slate-500">
                <li>Project created</li>
                <li>Task updated</li>
                <li>Deadline approaching</li>
              </ul>
            </div>

            {/* QUICK ACTION */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-4">Quick Actions</h3>

              <Button
                className="w-full"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create Project
              </Button>
            </div>

            {/* SUMMARY */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-2">Summary</h3>
              <p className="text-sm text-slate-500">
                {assignedTasks.length} pending tasks across {activeProjects.length} active projects.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* NEW PROJECT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg p-8 rounded-3xl shadow-xl space-y-6">

            <h2 className="text-xl font-bold">Create New Workspace</h2>

            <input
              placeholder="Project name"
              className="w-full border rounded-xl p-3"
              value={form.name}
              onChange={(e)=>setForm({...form,name:e.target.value})}
            />

            <textarea
              placeholder="Description"
              className="w-full border rounded-xl p-3"
              value={form.description}
              onChange={(e)=>setForm({...form,description:e.target.value})}
            />

            <select
              className="w-full border rounded-xl p-3"
              value={form.status}
              onChange={(e)=>setForm({...form,status:e.target.value})}
            >
              <option>Active</option>
              <option>Planning</option>
            </select>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={()=>setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                Create
              </Button>
            </div>

          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default GlobalDashboard;