import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          className={`
            w-full px-5 py-3.5 bg-white/50 dark:bg-slate-900/50 border rounded-2xl text-sm 
            transition-all duration-300 outline-none
            dark:text-white dark:placeholder:text-slate-600
            ${error
              ? 'border-rose-500/50 focus:ring-4 focus:ring-rose-500/10'
              : 'border-white/20 dark:border-white/5 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 group-hover:border-white/40 dark:group-hover:border-white/10'
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-[10px] font-bold text-rose-500 pl-1 uppercase tracking-wider">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
