import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Flame, Gem, Heart, Trophy, ChevronRight, Award, Compass, Zap, Sparkles, BookOpen, Clock, HeartHandshake, Cpu, ShoppingBag } from 'lucide-react';
import { UserState, LearningModule } from '../types';
import { ACHIEVEMENTS } from '../data';

interface DashboardProps {
  user: UserState;
  onNavigate: (page: any) => void;
  onPurchaseHearts: () => void;
  onPurchaseFreeze: () => void;
}

export default function Dashboard({ user, onNavigate, onPurchaseHearts, onPurchaseFreeze }: DashboardProps) {
  const [showShop, setShowShop] = useState(false);
  const [shopSuccess, setShopSuccess] = useState<string | null>(null);

  // Level 1 Progress Metrics
  const totalModules = 4;
  const completedCount = user.completedLessons.length; // Approximate module completions
  const completionPercent = Math.min(Math.round((completedCount / 5) * 100), 100);

  const handleBuyHearts = () => {
    if (user.gems < 50) {
      setShopSuccess('Insufficient gems! Complete quizzes to earn gems.');
      return;
    }
    if (user.hearts >= 5) {
      setShopSuccess('Your hearts are already full!');
      return;
    }
    onPurchaseHearts();
    setShopSuccess('Hearts successfully refilled! ❤️ +5');
    setTimeout(() => setShopSuccess(null), 3000);
  };

  const handleBuyFreeze = () => {
    if (user.gems < 150) {
      setShopSuccess('Insufficient gems!');
      return;
    }
    onPurchaseFreeze();
    setShopSuccess('Streak Freeze purchased! ❄️ Guard is active.');
    setTimeout(() => setShopSuccess(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 text-white rounded-3xl p-6 md:p-8 overflow-hidden border border-blue-600 dark:border-blue-850 shadow-xl shadow-blue-950/10">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/20 text-white border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
              🎓 UNIVERSITY PATH ACTIVE
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Welcome back, {user.name}! 👋</h1>
            <p className="text-blue-100 text-sm max-w-lg leading-relaxed">
              Your streak is running hot! Complete today's recommended lesson to maintain your streak and claim daily rewards.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onNavigate('courses')}
              className="px-5 py-3 bg-white hover:bg-slate-50 text-blue-700 text-sm font-bold rounded-xl transition shadow-lg shadow-blue-900/10 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Compass className="w-4 h-4 text-blue-700" />
              Explore Path Map
            </button>
            <button
              onClick={() => setShowShop(true)}
              className="px-5 py-3 bg-blue-800/40 hover:bg-blue-800/60 text-white text-sm font-semibold rounded-xl border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Gem className="w-4 h-4 text-cyan-300" />
              Visit Gem Shop
            </button>
          </div>
        </div>
      </div>

      {/* Main Widgets Container */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left column (Learning Progress & Active lesson) */}
        <div className="md:col-span-2 space-y-8">
          {/* Active recommended module */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/10 flex items-center justify-center shrink-0">
                <Cpu className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Recommended Active Lesson</span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Light-Emitting Diode (LED)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal max-w-sm">
                  Learn about polarity, anode/cathode pins, and how to safely limit currents using series resistors.
                </p>
                <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start pt-1 font-mono text-[10px] text-slate-400">
                  <span>⏱️ 10 mins</span>
                  <span>💎 +50 XP</span>
                  <span>🔥 Streak Multiplier Active</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('lesson')}
              className="w-full sm:w-auto px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm shrink-0"
            >
              Start Lesson
              <Play className="w-4 h-4 fill-white text-white" />
            </button>
          </div>

          {/* Quick Curriculum Roadmap Progress overview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Course Completion</h3>
                <p className="text-xs text-slate-400">Level 1: Electronics & Arduino Fundamentals</p>
              </div>
              <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{completionPercent}% Complete</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-50 dark:border-slate-900">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            {/* Stats list under progress */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-2xl border border-slate-100/50 dark:border-slate-900/60">
                <span className="block text-lg font-bold text-slate-800 dark:text-white">{completedCount} / 5</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Lessons Finished</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-2xl border border-slate-100/50 dark:border-slate-900/60">
                <span className="block text-lg font-bold text-slate-800 dark:text-white">{user.completedProjects.length} / 5</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Projects Built</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-2xl border border-slate-100/50 dark:border-slate-900/60">
                <span className="block text-lg font-bold text-slate-800 dark:text-white">{user.xp} XP</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Earned Points</span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onNavigate('simulator')}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:border-blue-500/30 transition cursor-pointer group"
            >
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 rounded-2xl border border-indigo-100 dark:border-indigo-500/10 w-fit mb-4">
                <Zap className="w-5 h-5 group-hover:scale-110 transition" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">Virtual Circuit Lab</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-normal">Drag-and-drop circuit simulator to test wiring setups dynamically.</p>
            </div>

            <div
              onClick={() => onNavigate('projects')}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:border-emerald-500/30 transition cursor-pointer group"
            >
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-500/10 w-fit mb-4">
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">Interactive Sandbox Projects</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-normal">Code Blink sketches, temperature threshold alerts, and buzzer sirens.</p>
            </div>
          </div>
        </div>

        {/* Right column (Streak Status, Achievement badging, Leaderboard snippet) */}
        <div className="space-y-8">
          {/* Daily Streak Status */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Streak Master</h3>
                  <p className="text-xs text-orange-100 mt-1">Study daily to keep the fire hot!</p>
                </div>
                <Flame className="w-10 h-10 text-white fill-white animate-pulse" />
              </div>

              <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 border border-white/10 mt-2">
                <div>
                  <span className="block text-2xl font-extrabold">{user.streak} Days</span>
                  <span className="text-[10px] text-orange-100 font-medium tracking-wide uppercase">Current Record</span>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-semibold">Active</span>
                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-500/20">SAFE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Badges widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white">Active Achievements</h3>
              <button onClick={() => onNavigate('profile')} className="text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center gap-0.5 hover:underline">
                View all
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {ACHIEVEMENTS.slice(0, 3).map((badge) => (
                <div key={badge.id} className="flex gap-3 items-center bg-slate-50 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-100/30 dark:border-slate-900/60">
                  <span className="text-2xl filter drop-shadow">{badge.icon}</span>
                  <div className="space-y-0.5">
                    <span className="block font-bold text-xs text-slate-800 dark:text-white">{badge.title}</span>
                    <span className="block text-[10px] text-slate-400 leading-none">{badge.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gem Shop Dialog Modal */}
      {showShop && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl p-6 text-slate-800 dark:text-slate-100 relative"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-500" />
                <h3 className="font-extrabold text-lg">Reanbotic Gem Shop</h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-500/10 text-cyan-500 rounded-full font-bold text-xs">
                <Gem className="w-3.5 h-3.5" />
                {user.gems} Gems
              </div>
            </div>

            {shopSuccess && (
              <div className={`p-3 rounded-xl mb-4 text-xs font-semibold text-center ${shopSuccess.includes('Refill') || shopSuccess.includes('Freeze') ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-500/20'}`}>
                {shopSuccess}
              </div>
            )}

            <div className="space-y-4">
              {/* Item 1: Refill Hearts */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl">
                <div className="flex gap-3 items-center">
                  <div className="text-2xl">❤️</div>
                  <div className="text-left">
                    <span className="block font-bold text-sm">Refill Hearts (5/5)</span>
                    <span className="text-[10px] text-slate-400">Restore maximum daily attempts.</span>
                  </div>
                </div>
                <button
                  onClick={handleBuyHearts}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1 shadow shadow-blue-500/10"
                >
                  <Gem className="w-3 h-3 text-cyan-200" />
                  50
                </button>
              </div>

              {/* Item 2: Streak Freeze */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl">
                <div className="flex gap-3 items-center">
                  <div className="text-2xl">❄️</div>
                  <div className="text-left">
                    <span className="block font-bold text-sm">Streak Freeze Shield</span>
                    <span className="text-[10px] text-slate-400">Protects streak if you skip a day.</span>
                  </div>
                </div>
                <button
                  onClick={handleBuyFreeze}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1 shadow shadow-blue-500/10"
                >
                  <Gem className="w-3 h-3 text-cyan-200" />
                  150
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowShop(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Close Shop
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
