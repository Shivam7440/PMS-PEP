import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/ui/Button';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignedTasks } from '../../store/slices/taskSlice';

const CalendarPage = () => {
  const dispatch = useDispatch();
  const { assignedTasks } = useSelector((state) => state.tasks);
  const [currentDate, setCurrentDate] = useState(new Date());

  React.useEffect(() => {
    dispatch(fetchAssignedTasks());
  }, [dispatch]);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const totalDays = daysInMonth(month, year);
  const startDay = startDayOfMonth(month, year);

  const prevMonthDays = Array.from({ length: startDay }, (_, i) => ({ day: daysInMonth(month - 1, year) - startDay + i + 1, current: false }));
  const currentMonthDays = Array.from({ length: totalDays }, (_, i) => ({ day: i + 1, current: true }));
  const calendarDays = [...prevMonthDays, ...currentMonthDays];

  // Map real tasks to calendar
  const events = {};
  assignedTasks.forEach(task => {
    if (task.dueDate) {
      const date = new Date(task.dueDate);
      const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      if (!events[key]) events[key] = [];

      let color = 'bg-indigo-500';
      if (task.priority === 'High') color = 'bg-rose-500';
      if (task.priority === 'Medium') color = 'bg-amber-500';
      if (task.priority === 'Low') color = 'bg-emerald-500';

      events[key].push({
        title: task.title,
        project: task.project?.name || 'Task',
        color
      });
    }
  });

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const setToday = () => setCurrentDate(new Date());

  return (
    <MainLayout>
      <div className="p-8 space-y-8 h-full flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Project Calendar</h1>
            <p className="text-slate-400 font-medium">Track your deadlines and team milestones</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md">
              <ArrowUpRight size={18} className="mr-2" />
              Schedule
            </Button>
            <Button variant="primary" size="md">
              <Plus size={18} className="mr-2" />
              Add Milestone
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col flex-1">
          {/* Calendar Header */}
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{months[month]} <span className="text-slate-300 font-medium">{year}</span></h2>
              <div className="flex bg-slate-100/50 p-1 rounded-xl">
                <button
                  onClick={prevMonth}
                  className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600 shadow-sm shadow-transparent hover:shadow-indigo-500/10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600 shadow-sm shadow-transparent hover:shadow-indigo-500/10"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <button
                onClick={setToday}
                className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline"
              >
                Today
              </button>
            </div>

            <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
              {['Month', 'Week', 'Day'].map((v) => (
                <button key={v} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${v === 'Month' ? 'bg-white text-indigo-600 shadow-sm shadow-indigo-500/10' : 'text-slate-400 hover:text-slate-600'}`}>{v}</button>
              ))}
            </div>
          </div>

          {/* Grid Header */}
          <div className="grid grid-cols-7 border-b border-slate-50 bg-slate-50/30">
            {days.map(day => (
              <div key={day} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{day}</div>
            ))}
          </div>

          {/* Grid Body */}
          <div className="grid grid-cols-7 flex-1 overflow-y-auto min-h-0">
            {calendarDays.map((item, i) => {
              const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`;
              const dayEvents = events[dateKey] || [];

              return (
                <div key={i} className={`min-h-[140px] border-r border-b border-slate-50 p-3 group hover:bg-slate-50/50 transition-colors ${!item.current ? 'bg-slate-50/30 grayscale opacity-40' : ''}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-black ${item.current && item.day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center' : 'text-slate-800'}`}>
                      {item.day}
                    </span>
                    {dayEvents.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-60" />}
                  </div>
                  <div className="space-y-1.5">
                    {dayEvents.map((event, idx) => (
                      <div key={idx} className={`${event.color} p-2 rounded-xl text-white shadow-sm shadow-transparent hover:shadow-lg transition-all cursor-pointer`}>
                        <p className="text-[10px] font-black leading-tight mb-0.5 truncate">{event.title}</p>
                        <p className="text-[8px] font-bold opacity-70 truncate">{event.project}</p>
                      </div>
                    ))}
                    {item.current && (
                      <button className="w-full py-2 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-50 text-slate-300">
                        <Plus size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
