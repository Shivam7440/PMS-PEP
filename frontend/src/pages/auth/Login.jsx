import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Chrome, Github, ArrowRight, Lock, User } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [validationErrors, setValidationErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    if (!formData.username) {
      setValidationErrors({ username: 'Identifier required' });
      return;
    }
    if (!formData.password) {
      setValidationErrors({ password: 'Password required' });
      return;
    }

    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <AuthLayout
      title="Access Workspace"
      subtitle="Enter your credentials to synchronize with your AI-powered project suite."
    >
      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div className="p-4 text-xs font-black text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-2xl uppercase tracking-widest animate-pulse">
            {error}
          </div>
        )}

        <Input
          label="Identity"
          type="text"
          placeholder="Username or Email"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          error={validationErrors.username}
          autoComplete="username"
        />

        <Input
          label="Security Key"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={validationErrors.password}
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <button type="button" className="text-[10px] font-black text-brand-500 uppercase tracking-widest hover:text-brand-400 transition-colors">
            Recover Access
          </button>
        </div>

        <Button
          type="submit"
          className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] ai-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          loading={loading}
        >
          Initialize Session
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-400 tracking-[0.3em]">
            <span className="bg-white/0 px-4">Or authenticate via</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="secondary" className="w-full py-3 bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl">
            <Chrome size={18} className="mr-2" />
            <span className="text-xs font-bold">Google</span>
          </Button>
          <Button variant="secondary" className="w-full py-3 bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl">
            <Github size={18} className="mr-2" />
            <span className="text-xs font-bold">Github</span>
          </Button>
        </div>

        <p className="text-center text-xs font-medium text-slate-500 pt-6">
          New to the enterprise?{' '}
          <Link to="/register" className="text-brand-500 font-black uppercase tracking-widest hover:text-brand-400 transition-colors">
            Register Agent
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
