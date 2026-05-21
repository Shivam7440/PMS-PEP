import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../store/slices/themeSlice';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import {
  User,
  Lock,
  Bell,
  Palette,
  ShieldCheck,
  Camera,
  Mail,
  Globe,
  Check
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.mode);

  const tabs = [
    { name: 'Profile', icon: User },
    { name: 'Security', icon: Lock },
    { name: 'Notifications', icon: Bell },
    { name: 'Appearance', icon: Palette },
    { name: 'Billing', icon: ShieldCheck },
  ];

  const AppearanceOption = ({ theme, label, description }) => (
    <button
      onClick={() => dispatch(setTheme(theme))}
      className={`
        flex flex-col text-left p-6 rounded-[2rem] border-2 transition-all group
        ${currentTheme === theme
          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20'
          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-800'}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-900 border border-slate-200'}`}>
          <Palette size={20} />
        </div>
        {currentTheme === theme && (
          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            <Check size={14} strokeWidth={3} />
          </div>
        )}
      </div>
      <h4 className="font-black text-slate-900 dark:text-slate-100 mb-1">{label}</h4>
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{description}</p>
    </button>
  );

  const activeTabIcon = tabs.find(t => t.name === activeTab)?.icon || Palette;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Settings</h1>
          <p className="text-slate-400 dark:text-slate-500 font-medium">Manage your personal preferences and account security</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[13px] font-black tracking-tight transition-all
                  ${activeTab === tab.name
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-slate-800'}
                `}
              >
                <tab.icon size={18} />
                {tab.name}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 transition-colors">
            {activeTab === 'Profile' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-8">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-3xl shadow-2xl">
                      JD
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl text-indigo-600 dark:text-indigo-400 hover:scale-110 transition-all">
                      <Camera size={20} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-1">John Doe</h3>
                    <p className="text-slate-400 dark:text-slate-500 font-medium mb-4">Project Manager @ ClickLite</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Change Photo</Button>
                      <Button size="sm" variant="ghost" className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30">Remove</Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" defaultValue="John Doe" />
                  <Input label="Job Title" defaultValue="Project Manager" />
                  <Input label="Email Address" defaultValue="john@clicklite.com" />
                  <Input label="Location" defaultValue="San Francisco, CA" icon={Globe} />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Bio</label>
                  <textarea
                    className="w-full h-32 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none dark:text-slate-200"
                    placeholder="Tell us about yourself..."
                    defaultValue="Passionate project architect focusing on team efficiency and scalable design patterns."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-50 dark:border-slate-800">
                  <Button variant="secondary">Cancel</Button>
                  <Button variant="primary" className="px-10">Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'Appearance' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-1">Appearance</h3>
                  <p className="text-slate-400 dark:text-slate-500 font-medium">Customize how ClickLite looks on your device</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AppearanceOption
                    theme="light"
                    label="Light Mode"
                    description="Standard bright interface"
                  />
                  <AppearanceOption
                    theme="dark"
                    label="Dark Mode"
                    description="Easier on the eyes in low light"
                  />
                </div>
              </div>
            )}

            {activeTab !== 'Profile' && activeTab !== 'Appearance' && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                  {React.createElement(activeTabIcon, { size: 32 })}
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{activeTab} Settings</h3>
                <p className="text-slate-400 dark:text-slate-500 font-medium max-w-xs">
                  This module is currently being optimized for your experience.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
