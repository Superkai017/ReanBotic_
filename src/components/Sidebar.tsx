import React from 'react';
import { Bot, Home, BookOpen, Zap, FolderCode, Trophy, User, LogOut, Settings, Award, ShoppingBag } from 'lucide-react';
import { PageType } from '../types';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onLogout: () => void;
}

export default function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as PageType, label: 'Dashboard', icon: Home },
    { id: 'courses' as PageType, label: 'Course Path', icon: BookOpen },
    { id: 'simulator' as PageType, label: 'Circuit Lab', icon: Zap },
    { id: 'projects' as PageType, label: 'Projects', icon: FolderCode },
    { id: 'leaderboard' as PageType, label: 'Leaderboard', icon: Trophy },
    { id: 'profile' as PageType, label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar (Left side, fixed) */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 text-slate-500 dark:text-slate-450 p-6 h-screen sticky top-0 justify-between shrink-0 overflow-y-auto scrollbar-thin transition-colors">
        <div className="space-y-6">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="p-2 bg-blue-700 rounded-xl shadow-lg shadow-blue-600/10 text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">Reanbotic</span>
              <p className="text-[8px] text-blue-600 dark:text-blue-400 uppercase tracking-widest font-mono font-bold">LAB ENVIRONMENT</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id || (item.id === 'courses' && currentPage === 'level-1') || (item.id === 'courses' && currentPage === 'lesson');
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer group ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'}`}
                >
                  <item.icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Current Goal Widget */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-900">
            <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Current Goal</h3>
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-4 border border-slate-100 dark:border-slate-900/60">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Arduino Pro</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-extrabold">82%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[82%]"></div>
              </div>
            </div>
          </div>

          {/* Daily Quests Widget */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Daily Quests</h3>
            <div className="flex items-center gap-2.5 p-2 bg-blue-50/50 dark:bg-blue-950/10 rounded-lg border border-blue-100/40 dark:border-blue-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Complete 2 circuits</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 border border-slate-100 dark:border-slate-900 rounded-lg opacity-60">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-450">Spend 15 mins in Lab</span>
            </div>
          </div>
        </div>

        {/* Footer / Try Premium Callout */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-900 mt-4">
          <div className="bg-indigo-950 rounded-2xl p-4 text-white relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <p className="text-[9px] font-bold text-indigo-300 uppercase mb-0.5">Try Premium</p>
              <p className="text-xs font-bold mb-2.5 leading-tight">Unlock AI Mentor & Virtual Lab Pro</p>
              <button className="bg-white hover:bg-slate-100 text-indigo-950 text-[10px] font-bold py-1.5 px-3 rounded-lg w-full shadow shadow-indigo-900/20 transition cursor-pointer">
                GO AD-FREE
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-indigo-800 rounded-full blur-xl opacity-40"></div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Account
          </button>
          <div className="text-[9px] text-slate-400 dark:text-slate-600 font-mono text-center">
            v1.0.0 (MVP Hackathon)
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 px-2 py-1 flex justify-around items-center z-40 shadow-2xl transition-colors">
        {menuItems.map((item) => {
          const isActive = currentPage === item.id || (item.id === 'courses' && currentPage === 'level-1') || (item.id === 'courses' && currentPage === 'lesson');
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition cursor-pointer ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <item.icon className="w-4.5 h-4.5" />
              <span className="text-[9px] font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
