import React from 'react';

const MetricCard = ({ title, value, icon: Icon, color, trend, trendValue }) => {
  return (
    <div className="glass-card p-6 rounded-[2rem] hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 group-hover:scale-110 transition-transform`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}%
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
