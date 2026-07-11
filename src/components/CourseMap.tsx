import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, ShieldAlert, ArrowRight, CheckCircle2, Circle, Lock, Star, Sparkles } from 'lucide-react';
import { COURSE_LEVELS } from '../data';
import { UserState } from '../types';

interface CourseMapProps {
  user: UserState;
  onNavigate: (page: any) => void;
}

export default function CourseMap({ user, onNavigate }: CourseMapProps) {
  const [lockedAlert, setLockedAlert] = useState<string | null>(null);

  const handleLevelClick = (levelId: number) => {
    if (levelId === 1) {
      onNavigate('level-1');
    } else {
      setLockedAlert(`Complete level ${levelId - 1} to unlock Level ${levelId}!`);
      setTimeout(() => setLockedAlert(null), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Robotics Learning Path</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Follow the structured linear tree path to earn XP, level up, and unlock advanced specialized robotics tracks.
          </p>
        </div>

        {/* Lock alerts */}
        {lockedAlert && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 py-2 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow"
          >
            <ShieldAlert className="w-4 h-4" />
            {lockedAlert}
          </motion.div>
        )}
      </div>

      {/* Gamified Timeline Path Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Core Linear roadmap layout (Column Span 2) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-8 relative">
            {/* Thread timeline indicator */}
            <div className="absolute left-[38px] top-12 bottom-12 w-1 bg-slate-100 dark:bg-slate-950 rounded" />

            {COURSE_LEVELS.map((level, idx) => {
              const isUnlocked = level.id === 1;
              return (
                <div
                  key={level.id}
                  onClick={() => handleLevelClick(level.id)}
                  className={`relative flex gap-6 items-start p-4 rounded-2xl border transition duration-300 cursor-pointer ${isUnlocked ? 'border-blue-500/10 hover:border-blue-500/30 bg-slate-50/50 dark:bg-slate-950/20' : 'border-slate-50 dark:border-slate-900/60 opacity-60'}`}
                >
                  {/* Pin / Circle Node */}
                  <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center border-4 ${isUnlocked ? 'bg-blue-600 border-blue-100 dark:border-blue-900 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-900 text-slate-400'}`}>
                    {isUnlocked ? (
                      <Star className="w-5 h-5 fill-white text-white" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </div>

                  {/* Level Details */}
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-blue-500 dark:text-blue-400">Level {level.id}</span>
                      {!isUnlocked && (
                        <span className="px-1.5 py-0.5 text-[8px] bg-slate-200 dark:bg-slate-800 text-slate-400 rounded font-semibold">LOCKED</span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base md:text-lg">{level.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">{level.description}</p>

                    <div className="flex flex-wrap gap-4 items-center pt-2 font-mono text-[10px] text-slate-400">
                      <span>⏱️ {level.estTime}</span>
                      <span>💎 +{level.xpReward} XP</span>
                      <span>⚡ {level.difficulty}</span>
                    </div>

                    {isUnlocked && (
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:translate-x-1 transition duration-200">
                        Enter level modules
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Info Section (Leaderboard and tips widget) */}
        <div className="space-y-8">
          {/* Helpful Guidelines */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
            <Sparkles className="w-8 h-8 text-blue-400 mb-4 animate-pulse" />
            <h4 className="font-bold text-base">Gamification Guidelines</h4>
            <ul className="mt-4 space-y-3 text-xs text-slate-400 leading-relaxed text-left">
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Completing lessons earns you up to <strong>+50 Study XP</strong> and <strong>+10 Gems</strong>.</span>
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Entering incorrect answers reduces your Hearts (Max 5/5). Hearts replenish in the Gem Shop.</span>
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Earn badges as you build mock wire networks in the Circuit Simulator sandbox.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
