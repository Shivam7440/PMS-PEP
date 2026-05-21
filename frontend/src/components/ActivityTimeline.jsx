import React from 'react';
import { MessageSquare, CheckCircle, UserPlus, FileText } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Sarah Wilson',
    type: 'comment',
    text: 'reviewed the homepage mockup and suggested changes',
    time: '2 hours ago',
    icon: MessageSquare,
    iconColor: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  },
  {
    id: 2,
    user: 'David Chen',
    type: 'upload',
    text: 'uploaded 4 new assets to the "Design System" folder',
    time: '4 hours ago',
    icon: FileText,
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50'
  },
  {
    id: 3,
    user: 'System',
    type: 'complete',
    text: 'Task "Primary Color Palette" marked as completed',
    time: 'Yesterday',
    icon: CheckCircle,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    id: 4,
    user: 'Alex Rivera',
    type: 'join',
    text: 'joined the "Frontend" technical team',
    time: '2 days ago',
    icon: UserPlus,
    iconColor: 'text-rose-500',
    bgColor: 'bg-rose-50'
  }
];

const ActivityTimeline = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-px before:bg-slate-100">
        {activities.map((activity) => (
          <div key={activity.id} className="relative flex items-start gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${activity.bgColor} ${activity.iconColor} z-10 shadow-sm border-2 border-white`}>
              <activity.icon size={18} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800">{activity.user}</span> {activity.text}
              </p>
              <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
