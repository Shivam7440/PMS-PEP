import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../store/slices/authSlice';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Chrome, Github, ArrowRight, UserPlus, CheckCircle } from 'lucide-react';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [validationErrors, setValidationErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.password) newErrors.password = 'Password required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters';

    setValidationErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const result = await dispatch(register(formData));
      if (register.fulfilled.match(result)) {
        navigate('/');
      }
    }
  };

  return (
    <AuthLayout
      title="Create Identity"
      subtitle="Initialize your agent profile and join the next generation of project intelligence."
    >
      <form onSubmit={handleRegister} className="space-y-5">
        {error && (
          <div className="p-4 text-xs font-black text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-2xl uppercase tracking-widest animate-pulse">
            {error}
          </div>
        )}

        <Input
          label="Agent Alias"
          type="text"
          placeholder="johndoe_ai"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          error={validationErrors.username}
          autoComplete="username"
        />

        <Input
          label="Communication Node"
          type="email"
          placeholder="agent@intelligence.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={validationErrors.email}
          autoComplete="email"
        />

        <Input
          label="Encryption Key"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={validationErrors.password}
          autoComplete="new-password"
        />

        <div className="flex items-center gap-2 px-1 py-2">
          <CheckCircle size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Enhanced Security Protocol Active</span>
        </div>

        <Button
          type="submit"
          className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] ai-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          loading={loading}
        >
          Initialize Identity
          <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
        </Button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-400 tracking-[0.3em]">
            <span className="bg-white/0 px-4">Or join via</span>
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
          Already verified?{' '}
          <Link to="/login" className="text-brand-500 font-black uppercase tracking-widest hover:text-brand-400 transition-colors">
            Access Session
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
