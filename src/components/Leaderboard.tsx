import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Medal, Globe, Flame, ShieldAlert } from 'lucide-react';
import { MOCK_LEADERBOARD } from '../data';
import { UserState } from '../types';

interface LeaderboardProps {
  user: UserState;
}

export default function Leaderboard({ user }: LeaderboardProps) {
  // Dynamically inject user's active XP and resort rankings
  const updatedLeaderboard = MOCK_LEADERBOARD.map((item) => {
    if (item.isSelf) {
      return { ...item, xp: user.xp, name: user.name };
    }
    return item;
  }).sort((a, b) => b.xp - a.xp);

  // Recalculate rank order positions
  const finalLeaderboard = updatedLeaderboard.map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div className="text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Student Ranking Leaderboard</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Compete weekly with thousands of global students. Reach top 10 positions in the <strong>Diamond League</strong> to win gems!
          </p>
        </div>

        <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/10 font-bold text-xs rounded-xl flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-500" />
          Diamond League Active
        </div>
      </div>

      {/* Rankings Grid Layout */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main List (Col Span 2) */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400 border-b border-slate-50 dark:border-slate-950 pb-3 mb-4">
              <span>RANKING</span>
              <span>STUDENT DETAILS</span>
              <span>TOTAL STUDY XP</span>
            </div>

            <div className="space-y-2">
              {finalLeaderboard.map((student) => {
                const isSelf = student.isSelf;
                return (
                  <div
                    key={student.name}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition duration-200 ${isSelf ? 'border-blue-500 bg-blue-500/5 shadow-md shadow-blue-500/5' : 'border-slate-50 dark:border-slate-950 bg-slate-50/30 dark:bg-slate-950/10 hover:border-slate-200'}`}
                  >
                    {/* Rank & Profile badge */}
                    <div className="flex gap-4 items-center">
                      {/* Rank position numbers or medal vector */}
                      <div className="w-8 flex justify-center">
                        {student.rank === 1 ? (
                          <span className="text-xl">🥇</span>
                        ) : student.rank === 2 ? (
                          <span className="text-xl">🥈</span>
                        ) : student.rank === 3 ? (
                          <span className="text-xl">🥉</span>
                        ) : (
                          <span className="font-mono font-bold text-xs text-slate-400">{student.rank}</span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-lg shadow-sm">
                        {student.avatar}
                      </div>

                      {/* Name Details */}
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-bold text-xs sm:text-sm ${isSelf ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            {student.name}
                          </span>
                          {isSelf && (
                            <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-bold rounded">YOU</span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                          <span>{student.country} Location</span>
                        </span>
                      </div>
                    </div>

                    {/* XP count numbers */}
                    <div className="font-mono font-extrabold text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      {student.xp} XP
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar League status details */}
        <div className="space-y-6 text-left">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
            <Award className="w-8 h-8 text-amber-500 mb-4" />
            <h4 className="font-bold text-sm">Diamond League Rules</h4>
            <ul className="mt-4 space-y-3.5 text-xs text-slate-400 leading-relaxed">
              <li className="flex gap-2 items-start">
                <span className="text-emerald-400 font-bold">1.</span>
                <span>The weekly competition resets every Sunday at 23:59 UTC.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-emerald-400 font-bold">2.</span>
                <span>Top 3 students receive a bonus reward of <strong>300 Gems</strong> each!</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-emerald-400 font-bold">3.</span>
                <span>The bottom 3 students are demoted to the Ruby division. Keep studying!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
