import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType, UserState } from './types';
import { INITIAL_USER } from './data';

// Components
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CourseMap from './components/CourseMap';
import LessonModule from './components/LessonModule';
import LessonPage from './components/LessonPage';
import Simulator from './components/Simulator';
import CodeEditor from './components/CodeEditor';
import Projects from './components/Projects';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';

export default function App() {
  const [page, setPage] = useState<PageType>('landing');
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('reanbotic_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [selectedLessonId, setSelectedLessonId] = useState<string>('les-led');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('reanbotic_dark');
    return saved ? JSON.parse(saved) : true; // Default to dark mode for modern tech aesthetic
  });

  // Persist User State
  useEffect(() => {
    localStorage.setItem('reanbotic_user', JSON.stringify(user));
  }, [user]);

  // Persist Theme Selection
  useEffect(() => {
    localStorage.setItem('reanbotic_dark', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Trigger XP Level calculations
  const handleGainXP = (amount: number) => {
    setUser((prev) => {
      const nextXp = prev.xp + amount;
      // Upgrades level every 400 XP
      const calculatedLevel = Math.floor(nextXp / 400) + 1;
      const leveledUp = calculatedLevel > prev.level;
      
      return {
        ...prev,
        xp: nextXp,
        level: calculatedLevel,
        // Award bonus gems on leveling up
        gems: prev.gems + (leveledUp ? 100 : 0),
      };
    });
  };

  const handleGainGems = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      gems: prev.gems + amount,
    }));
  };

  const handleHeartsDamaged = () => {
    setUser((prev) => {
      const nextHearts = Math.max(0, prev.hearts - 1);
      return {
        ...prev,
        hearts: nextHearts,
      };
    });
  };

  const handleAuthSuccess = (partial: Partial<UserState>) => {
    setUser((prev) => ({
      ...prev,
      name: partial.name || prev.name,
      email: partial.email || prev.email,
      educationLevel: partial.educationLevel || null,
    }));
    setPage('dashboard');
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setPage('lesson');
  };

  const handleCompleteLesson = (lessonId: string, gotPerfect: boolean) => {
    setUser((prev) => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const updatedList = alreadyCompleted ? prev.completedLessons : [...prev.completedLessons, lessonId];
      
      // Complete lesson awards +50 XP and +10 Gems. Perfect score awards +20 gems bonus!
      const xpReward = alreadyCompleted ? 10 : 50;
      const gemReward = alreadyCompleted ? 2 : gotPerfect ? 30 : 10;

      // Add a streak day if not already done
      const nextStreak = alreadyCompleted ? prev.streak : prev.streak + 1;

      // Upgrade levels
      const nextXp = prev.xp + xpReward;
      const calculatedLevel = Math.floor(nextXp / 400) + 1;

      return {
        ...prev,
        completedLessons: updatedList,
        xp: nextXp,
        gems: prev.gems + gemReward,
        level: calculatedLevel,
        streak: nextStreak,
      };
    });
  };

  const handlePurchaseHearts = () => {
    setUser((prev) => ({
      ...prev,
      gems: Math.max(0, prev.gems - 50),
      hearts: 5,
    }));
  };

  const handlePurchaseFreeze = () => {
    setUser((prev) => ({
      ...prev,
      gems: Math.max(0, prev.gems - 150),
    }));
  };

  const handleLogout = () => {
    setUser(INITIAL_USER);
    setPage('landing');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Main UI Renders
  if (page === 'landing') {
    return <LandingPage onStart={() => setPage('auth')} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
  }

  if (page === 'auth') {
    return <Auth onSuccess={handleAuthSuccess} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Global Sidebar Nav Layout */}
      <Sidebar currentPage={page} onNavigate={setPage} onLogout={handleLogout} />

      {/* Main workspace section */}
      <div className="flex-1 flex flex-col min-w-0 md:pb-0 pb-16">
        <Header
          user={user}
          onNavigate={setPage}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onLogout={handleLogout}
        />

        {/* Core application body contents with transitions */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {page === 'dashboard' && (
                <Dashboard
                  user={user}
                  onNavigate={setPage}
                  onPurchaseHearts={handlePurchaseHearts}
                  onPurchaseFreeze={handlePurchaseFreeze}
                />
              )}
              {page === 'courses' && (
                <CourseMap user={user} onNavigate={setPage} />
              )}
              {page === 'level-1' && (
                <LessonModule
                  user={user}
                  onNavigate={setPage}
                  onSelectLesson={handleSelectLesson}
                />
              )}
              {page === 'lesson' && (
                <LessonPage
                  lessonId={selectedLessonId}
                  user={user}
                  onBack={() => setPage('level-1')}
                  onCompleteLesson={handleCompleteLesson}
                  onHeartsDamaged={handleHeartsDamaged}
                />
              )}
              {page === 'simulator' && (
                <Simulator onGainXP={handleGainXP} onGainGems={handleGainGems} />
              )}
              {page === 'code-editor' && (
                <CodeEditor onGainXP={handleGainXP} onGainGems={handleGainGems} />
              )}
              {page === 'projects' && (
                <Projects onGainXP={handleGainXP} onGainGems={handleGainGems} />
              )}
              {page === 'leaderboard' && (
                <Leaderboard user={user} />
              )}
              {page === 'profile' && (
                <Profile user={user} onLogout={handleLogout} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
