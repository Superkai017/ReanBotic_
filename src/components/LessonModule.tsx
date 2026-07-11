import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, CheckCircle2, Circle, Clock, Award, BookOpen } from 'lucide-react';
import { LEVEL_1_MODULES, LESSONS } from '../data';
import { UserState } from '../types';

interface LessonModuleProps {
  user: UserState;
  onNavigate: (page: any) => void;
  onSelectLesson: (lessonId: string) => void;
}

export default function LessonModule({ user, onNavigate, onSelectLesson }: LessonModuleProps) {
  return (
    <div className="space-y-8 pb-12">
      {/* Header back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('courses')}
          className="p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl hover:text-blue-500 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">LEVEL 1 ROADMAP</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Electronics & Arduino Fundamentals</h1>
        </div>
      </div>

      {/* Modules List Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Module cards (Col Span 2) */}
        <div className="md:col-span-2 space-y-6">
          {LEVEL_1_MODULES.map((mod) => {
            // Find lessons belonging to this module
            const modLessons = LESSONS.filter((l) => l.moduleId === mod.id);
            const completedCount = modLessons.filter((l) => user.completedLessons.includes(l.id)).length;
            const progressPercent = modLessons.length > 0 ? Math.round((completedCount / modLessons.length) * 100) : 0;

            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5"
              >
                {/* Module description header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 dark:border-slate-950 pb-4">
                  <div className="space-y-1 text-left">
                    <span className="text-[9px] font-extrabold text-blue-500 dark:text-blue-400 font-mono uppercase tracking-wider">{mod.difficulty} Track</span>
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{mod.title}</h3>
                    <p className="text-xs text-slate-400 max-w-md">{mod.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center font-mono text-[10px] text-slate-400 shrink-0">
                    <span>⏱️ {mod.estTime}</span>
                    <span>⭐ {modLessons.length} lessons</span>
                  </div>
                </div>

                {/* Sub-lessons list */}
                <div className="space-y-3">
                  {modLessons.map((les) => {
                    const isCompleted = user.completedLessons.includes(les.id);
                    return (
                      <div
                        key={les.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-900 rounded-2xl gap-4 hover:border-blue-500/10 transition"
                      >
                        <div className="flex gap-3 items-start text-left">
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-800 dark:text-white">{les.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{les.conceptTitle}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectLesson(les.id)}
                          className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow ${isCompleted ? 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/10'}`}
                        >
                          {isCompleted ? 'Review' : 'Start Lesson'}
                          <Play className="w-3 h-3 fill-current" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Info Banner */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm text-left">
            <BookOpen className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="font-bold text-sm">Prerequisites Checked</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              This is the foundational level. All components are virtualized, so you can simulate and test configurations safely in real-time.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex gap-4 text-xs font-mono text-slate-500">
              <span>📚 4 Modules</span>
              <span>⚡ 5 lessons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
