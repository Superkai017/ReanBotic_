import React from 'react';
import { motion } from 'motion/react';
import { Bot, Cpu, Zap, Code, ShieldCheck, Play, ArrowRight, Layers, Users, BookOpen, Star, Sparkles } from 'lucide-react';
import { COURSE_LEVELS } from '../data';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Landing Header */}
      <header className="relative z-10 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Reanbotic</span>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest -mt-1">Learn. Build. Innovate.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#roadmap" className="text-sm text-slate-400 hover:text-white transition">Roadmap</a>
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition">Features</a>
            <button
              onClick={onStart}
              className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-300 rounded-full text-xs font-semibold mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            Next-Gen Gamified Robotics Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Build the Future Through <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">Robotics.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 mt-6 text-lg max-w-lg leading-relaxed"
          >
            Master Arduino, electronics, AI, IoT, and embedded programming through interactive gamified path modules, a virtual circuit sandbox, and instant AI tutor mentorship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={onStart}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 group active:scale-95 cursor-pointer"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#roadmap"
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
            >
              Explore Curriculum
            </a>
          </motion.div>

          {/* Social Proof / Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-900 grid grid-cols-3 gap-6"
          >
            <div>
              <span className="block text-2xl font-bold text-white">10k+</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">Virtual Circuits</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">98%</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">Success Rate</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">24/7</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">AI Assistance</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Interactive Illustration */}
        <div className="relative flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[420px] aspect-square bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Embedded grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

            {/* Float Arduino Header mock */}
            <div className="relative flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <span className="font-mono text-xs text-blue-400">BOARD: Arduino Uno</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded border border-emerald-500/20 text-[10px] font-mono">STATUS: SIMULATING</span>
            </div>

            {/* Robotic Arm Vector Illustration */}
            <div className="relative flex items-center justify-center my-6 h-48 z-10">
              <svg viewBox="0 0 200 200" className="w-48 h-48">
                {/* Circuit lines */}
                <path d="M 20,100 L 180,100" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 100,20 L 100,180" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />

                {/* Base */}
                <rect x="70" y="150" width="60" height="15" rx="4" fill="#334155" />
                <rect x="80" y="140" width="40" height="10" fill="#475569" />

                {/* Lower Arm */}
                <line x1="100" y1="140" x2="60" y2="90" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" />
                <circle cx="100" cy="140" r="8" fill="#1d4ed8" />

                {/* Upper Arm */}
                <line x1="60" y1="90" x2="130" y2="60" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
                <circle cx="60" cy="90" r="6" fill="#047857" />

                {/* Claw */}
                <g transform="translate(130, 60) rotate(-15)">
                  <path d="M 0,-6 Q 10,-12 15,-4" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 0,6 Q 10,12 15,4" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="4" fill="#d97706" />

                  {/* Sparkle */}
                  <circle cx="20" cy="0" r="2" fill="#38bdf8" className="animate-pulse" />
                </g>
              </svg>

              {/* Floating microchips */}
              <div className="absolute top-2 right-4 p-2 bg-slate-800 border border-slate-700 rounded-lg animate-bounce duration-1000">
                <Cpu className="w-5 h-5 text-indigo-400" />
              </div>

              <div className="absolute bottom-6 left-2 p-2 bg-slate-800 border border-slate-700 rounded-lg animate-bounce" style={{ animationDelay: '0.3s' }}>
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
            </div>

            {/* Mock coding prompt */}
            <div className="relative font-mono text-[10px] text-slate-400 bg-slate-950/80 p-3 rounded-lg border border-slate-800 z-10">
              <span className="text-emerald-400">digitalWrite</span>(LED_PIN, <span className="text-blue-400">HIGH</span>);<br />
              <span className="text-slate-500">// Glow LED at 1-second interval</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="bg-slate-900/40 border-y border-slate-900 py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white tracking-tight">Why Choose Reanbotic?</h2>
            <p className="text-slate-400 mt-4 text-base">We bridge the gap between abstract physics concepts and tangible physical computing with clean, friendly, step-by-step guidance.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              {
                icon: Layers,
                title: 'Interactive Learning',
                desc: 'Duolingo-style micro-steps that simplify breadboard routing, component physics, and circuit connections.',
                color: 'text-blue-400',
                bg: 'bg-blue-950/40',
              },
              {
                icon: Bot,
                title: 'AI Robotics Mentor',
                desc: 'An automated tutor designed to instantly troubleshoot wiring faults, trace compilation bugs, and explain logic.',
                color: 'text-emerald-400',
                bg: 'bg-emerald-950/40',
              },
              {
                icon: Cpu,
                title: 'Virtual Lab Sandbox',
                desc: 'A gorgeous drag-and-drop circuit simulator. Prototype systems with Arduino boards without buying hardware.',
                color: 'text-indigo-400',
                bg: 'bg-indigo-950/40',
              },
              {
                icon: Code,
                title: 'Embedded IDE',
                desc: 'Code Arduino sketches directly inside your browser. Run compilation checkers, upload codes, and check responses.',
                color: 'text-amber-400',
                bg: 'bg-amber-950/40',
              },
            ].map((f, i) => (
              <div key={i} className="bg-slate-950/60 border border-slate-900 hover:border-slate-800 p-6 rounded-2xl transition duration-300">
                <div className={`p-3 rounded-xl w-fit ${f.bg} mb-4`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-bold text-lg text-white">{f.title}</h3>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap Section */}
      <section id="roadmap" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">Your Robotics Journey</h2>
          <p className="text-slate-400 mt-3">From absolute electronics starter up to advanced autonomous navigation algorithms. Unlock levels step-by-step!</p>
        </div>

        <div className="relative">
          {/* Timeline Center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-900" />

          <div className="space-y-12">
            {COURSE_LEVELS.map((level, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={level.id} className="relative flex flex-col md:flex-row items-start md:items-center">
                  {/* Circle Pin */}
                  <div className="absolute left-6 md:left-1/2 w-6 h-6 rounded-full bg-slate-950 border-4 border-blue-600 -translate-x-3 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>

                  {/* Spacer or Content depending on left/right alignment */}
                  <div className={`pl-16 md:pl-0 w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:order-2 md:pl-12'}`}>
                    <div className="w-full max-w-md bg-slate-900/40 border border-slate-900 hover:border-slate-800 p-6 rounded-2xl transition group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Level {level.id}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${level.id === 1 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400'}`}>
                          {level.id === 1 ? 'UNLOCKED' : 'LOCKED 🔒'}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition">{level.title}</h3>
                      <p className="text-sm text-slate-400 mt-2 leading-relaxed">{level.description}</p>

                      <div className="mt-4 pt-4 border-t border-slate-900 flex items-center gap-4 text-xs font-mono text-slate-500">
                        <span>⏰ {level.estTime}</span>
                        <span>💎 +{level.xpReward} XP</span>
                        <span>⚡ {level.difficulty}</span>
                      </div>

                      {level.id === 1 && (
                        <button
                          onClick={onStart}
                          className="mt-4 px-4 py-2 w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Launch Level 1
                          <Play className="w-3 h-3 fill-white" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-900 py-24 px-6 text-center relative overflow-hidden z-10">
        <div className="max-w-xl mx-auto relative z-10">
          <Bot className="w-12 h-12 text-blue-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-white tracking-tight">Ready to Build the Robots of Tomorrow?</h2>
          <p className="text-slate-400 mt-4 text-base max-w-md mx-auto">No expensive lab kits required. Start prototyping and learning directly in your browser today.</p>
          <button
            onClick={onStart}
            className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 mx-auto cursor-pointer"
          >
            Create Your Free Account
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900/60 py-8 px-6 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Reanbotic Inc. Startup Hackathon MVP Prototype.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
            <span className="hover:text-slate-400 cursor-pointer">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
