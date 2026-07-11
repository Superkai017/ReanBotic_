import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Mail, Lock, User, Check, ArrowRight, Sparkles, Building, GraduationCap, Laptop, Cpu, Award } from 'lucide-react';
import { UserState } from '../types';

interface AuthProps {
  onSuccess: (user: Partial<UserState>) => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const [step, setStep] = useState<'form' | 'path-selection'>('form');
  const [formData, setFormData] = useState({
    name: 'Oudom Art',
    email: 'oudomart@gmail.com',
    password: 'password123',
    education: 'University' as 'University' | 'High School',
    agree: true,
  });

  const [selectedSpec, setSelectedSpec] = useState<string>('embed');
  const [highSchoolClicked, setHighSchoolClicked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) return;
    setStep('path-selection');
  };

  const handleCompleteWizard = () => {
    onSuccess({
      name: formData.name,
      email: formData.email,
      educationLevel: formData.education,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-slate-900/50 border border-slate-900 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative z-10"
          >
            {/* Header branding */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 mb-3">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Create Your Account</h2>
              <p className="text-sm text-slate-400 mt-1.5">Join Reanbotic and learn gamified robotics today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition"
                    placeholder="johndoe@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              {/* Education Level Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Education Level</label>
                <div className="grid grid-cols-2 gap-4">
                  {/* University option (Clickable) */}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, education: 'University' });
                      setHighSchoolClicked(false);
                    }}
                    className={`p-4 border rounded-2xl flex flex-col items-center gap-2 cursor-pointer transition text-left w-full ${formData.education === 'University' ? 'border-blue-500 bg-blue-950/20 text-white' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'}`}
                  >
                    <GraduationCap className={`w-6 h-6 ${formData.education === 'University' ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span className="font-semibold text-sm">University</span>
                  </button>

                  {/* High School Option (Blocked with coming soon!) */}
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => {
                        setHighSchoolClicked(true);
                      }}
                      className="p-4 border border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 rounded-2xl flex flex-col items-center gap-2 cursor-pointer transition text-left w-full relative overflow-hidden"
                    >
                      <Building className="w-6 h-6 text-slate-600" />
                      <span className="font-semibold text-sm text-slate-500">High School</span>
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded font-semibold">SOON</span>
                    </button>
                  </div>
                </div>

                {highSchoolClicked && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-amber-400 mt-2 text-center"
                  >
                    ⚠️ High School Curriculum is coming soon! Please use the active <strong>University Path</strong> for this prototype.
                  </motion.p>
                )}
              </div>

              {/* Terms agreement */}
              <div className="flex items-start gap-3">
                <input
                  id="agree-checkbox"
                  type="checkbox"
                  required
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-blue-600 border-slate-800 bg-slate-950 focus:ring-blue-500"
                />
                <label htmlFor="agree-checkbox" className="text-xs text-slate-400 leading-normal">
                  I agree to the Reanbotic Student Terms of Service, Privacy Policy, and honor guidelines.
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!formData.agree}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
              >
                Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        ) : (
          /* Step 2: Welcome and path selection */
          <motion.div
            key="path-selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl bg-slate-900/50 border border-slate-900 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative z-10 text-center"
          >
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full w-fit mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome, {formData.name}! 🎉</h2>
            <p className="text-slate-400 mt-2 text-base">Your account has been configured. Now, choose your robotics path:</p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {[
                {
                  id: 'embed',
                  icon: Cpu,
                  title: 'Embedded Specialist',
                  desc: 'Focus on registers, hardware wiring, microcontroller kernels, and real-time C++ routines.',
                },
                {
                  id: 'iot',
                  icon: Laptop,
                  title: 'IoT Cloud Architect',
                  desc: 'Focus on sensor telemetry, WiFi network bridges, ESP32 cloud arrays, and central dashboards.',
                },
                {
                  id: 'ai',
                  icon: Bot,
                  title: 'ROS2 / AI Developer',
                  desc: 'Focus on camera computer vision filters, SLAM lidar navigation, and machine learning neural controllers.',
                },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedSpec(p.id)}
                  className={`p-5 border rounded-2xl flex flex-col items-center text-center gap-3 cursor-pointer transition-all ${selectedSpec === p.id ? 'border-blue-500 bg-blue-950/20 text-white shadow-lg shadow-blue-500/5' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'}`}
                >
                  <div className={`p-3 rounded-xl ${selectedSpec === p.id ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-900 text-slate-500'}`}>
                    <p.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-white">{p.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">{p.desc}</p>
                </button>
              ))}
            </div>

            {/* Launch CTA */}
            <div className="mt-10 flex items-center justify-between border-t border-slate-900 pt-6">
              <span className="text-xs text-slate-500 font-mono">Current Path: University / Level 1 Fundamentals</span>
              <button
                onClick={handleCompleteWizard}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                Complete Registration & Launch App
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
