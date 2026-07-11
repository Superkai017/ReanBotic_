import React, { useState } from 'react';
import { Flame, Gem, Heart, Bell, Moon, Sun, ChevronDown, User, LogOut, ShieldCheck, Trophy } from 'lucide-react';
import { UserState } from '../types';

interface HeaderProps {
  user: UserState;
  onNavigate: (page: any) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export default function Header({ user, onNavigate, darkMode, onToggleDarkMode, onLogout }: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'Your 5-day study streak is active! Keep it up! 🔥', time: '5m ago' },
    { id: 2, text: 'You unlocked the "Wildfire" Achievement Badge! 🏆', time: '1h ago' },
    { id: 3, text: 'System Update: ROS2 curriculum has been upgraded!', time: '1d ago' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95 backdrop-blur px-4 md:px-6 py-3 flex items-center justify-between flex-wrap gap-x-3 gap-y-2 transition-colors">
      {/* Course / Level dropdown indicator */}
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-950/40 rounded-lg text-blue-600 dark:text-blue-400 font-mono text-xs font-bold border border-blue-200 dark:border-blue-500/20">
          🤖 Level 1
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Arduino Fundamentals</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Gamified Core Stats Dashboard */}
      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/30 px-3 py-1.5 rounded-full border border-orange-100 dark:border-orange-900/40 text-orange-600 hover:scale-105 transition cursor-pointer" title="Daily Streak">
          <span className="text-sm">🔥</span>
          <span className="font-bold text-xs md:text-sm text-orange-750 dark:text-orange-400">{user.streak}</span>
        </div>

        {/* Gems */}
        <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/40 text-blue-600 hover:scale-105 transition cursor-pointer" title="Virtual Learning Gems">
          <span className="text-xs">💎</span>
          <span className="font-bold text-xs md:text-sm text-blue-750 dark:text-blue-400">{user.gems}</span>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/30 px-3 py-1.5 rounded-full border border-red-100 dark:border-red-900/40 text-red-500 hover:scale-105 transition cursor-pointer" title="Daily Hearts (Attempts)">
          <span className="text-xs">❤️</span>
          <span className="font-bold text-xs md:text-sm text-red-750 dark:text-red-400">{user.hearts}</span>
        </div>

        {/* XP Status Level */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-950/40 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-900/60 text-slate-700 dark:text-slate-300">
          <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none">LVL {user.level}</span>
            <div className="w-px h-3 bg-slate-200 dark:bg-slate-800" />
            <span className="font-bold leading-none">{user.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Dark Mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 transition-colors cursor-pointer"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-xl p-4 z-50 animate-fade-in text-slate-700 dark:text-slate-300">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-2 mb-2">Notifications</h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="text-xs flex flex-col gap-0.5">
                    <p className="leading-normal">{n.text}</p>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-900 cursor-pointer transition"
          >
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
              🎓
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[80px] truncate hidden sm:inline">{user.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-xl overflow-hidden z-50 text-slate-700 dark:text-slate-300">
              <div className="p-3 border-b border-slate-100 dark:border-slate-900 text-xs">
                <p className="font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                <p className="text-slate-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  onNavigate('profile');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <User className="w-4 h-4 text-slate-400" />
                Student Profile
              </button>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-medium flex items-center gap-2 text-red-600 dark:text-red-400 border-t border-slate-100 dark:border-slate-900 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
