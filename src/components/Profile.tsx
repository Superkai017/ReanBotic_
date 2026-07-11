import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Medal, Printer, QrCode, FileText, CheckCircle2, Star, Sparkles, LogOut, ShieldCheck, Mail, Calendar } from 'lucide-react';
import { UserState } from '../types';
import { ACHIEVEMENTS } from '../data';

interface ProfileProps {
  user: UserState;
  onLogout: () => void;
}

export default function Profile({ user, onLogout }: ProfileProps) {
  const [showCertificate, setShowCertificate] = useState(false);

  // Total course completion calculations
  const totalLessons = 5;
  const completedCount = user.completedLessons.length;
  const hasFinishedCourse = completedCount >= 1; // Unlocked once at least one lesson completes!

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Overview Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Huge Student Avatar */}
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-blue-500/10 border-2 border-white dark:border-slate-800">
              🎓
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{user.name}</h2>
              <p className="text-xs text-slate-400 font-mono flex items-center justify-center sm:justify-start gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {user.email}
              </p>
              <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start pt-1">
                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/10 text-[9px] font-bold rounded-md">
                  🏫 {user.educationLevel || 'University Student'}
                </span>
                <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/10 text-[9px] font-bold rounded-md">
                  🔥 {user.streak}d Streak
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="px-5 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Sign Out Account
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Unlocked Badges Panel (Col Span 2) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-left">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base md:text-lg mb-5 flex items-center gap-1.5">
              <Medal className="w-5 h-5 text-blue-500" />
              Academic Badges
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map((badge) => {
                // Mock unlocking rules
                const isUnlocked = badge.id === 'ach-1' || (badge.id === 'ach-2' && completedCount >= 2);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 border rounded-2xl flex items-center gap-4 transition duration-200 ${isUnlocked ? 'border-slate-100 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-950/10' : 'border-slate-50 dark:border-slate-950 opacity-40'}`}
                  >
                    <div className="text-3xl filter drop-shadow">{badge.icon}</div>
                    <div className="space-y-1">
                      <span className="block font-bold text-xs text-slate-800 dark:text-white">{badge.title}</span>
                      <span className="block text-[10px] text-slate-400 leading-normal">{badge.description}</span>
                      {isUnlocked && (
                        <span className="inline-block text-[9px] text-emerald-500 font-extrabold font-mono uppercase tracking-widest pt-0.5">UNLOCKED ✓</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certificate Generator Card */}
        <div className="space-y-6 text-left">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-3 relative z-10">
              <div className="p-3 bg-white/10 rounded-2xl w-fit">
                <FileText className="w-6 h-6 text-blue-200" />
              </div>
              <h3 className="font-bold text-lg leading-tight">Course Certificate of Completion</h3>
              <p className="text-xs text-blue-100 leading-normal">
                Finish at least <strong>1 topic lesson</strong> under Level 1 to claim and print your official Reanbotic verification credential!
              </p>
            </div>

            <div className="space-y-3 pt-6 relative z-10">
              {hasFinishedCourse ? (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-2xl shadow-xl transition-all cursor-pointer text-center"
                >
                  Generate Certificate
                </button>
              ) : (
                <div className="w-full py-3.5 bg-slate-800/40 text-slate-500 text-xs font-bold rounded-2xl text-center border border-slate-700/30">
                  🔒 Locked: Complete 1 lesson
                </div>
              )}
              <span className="block text-[9px] text-blue-200 text-center font-mono">Verified via QR-Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable full-screen printable Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto print:p-0 print:bg-white print:static print:z-auto">
          <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-2xl border-8 border-double border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:rounded-none relative text-slate-900 font-serif flex flex-col justify-between">
            
            {/* Top Close / Print controls */}
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-100 print:hidden font-sans">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Academic Credential Frame</span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Printable Frame core details */}
            <div className="border-4 border-slate-900 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden bg-slate-50/50 print:bg-white print:border-8 print:p-16">
              
              {/* Background watermark stamp */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />

              {/* Logo Header */}
              <div className="space-y-1.5 font-sans">
                <span className="font-extrabold text-xl tracking-tight uppercase bg-slate-900 text-white px-3 py-1 rounded-md">REANBOTIC</span>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold font-mono">ACADEMY OF EMBEDDED ENGINEERING</p>
              </div>

              {/* Frame title */}
              <div className="space-y-2 pt-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-slate-900 font-serif">Certificate of Completion</h2>
                <div className="w-36 h-1 bg-amber-500 mx-auto" />
                <p className="text-xs text-slate-400 italic">This credential officially certifies that</p>
              </div>

              {/* Student Name */}
              <div className="py-4">
                <span className="text-3xl sm:text-4xl font-extrabold border-b-2 border-slate-900 pb-1.5 px-8 inline-block italic font-serif">
                  {user.name}
                </span>
              </div>

              {/* Success target statements */}
              <div className="max-w-lg mx-auto space-y-1 leading-relaxed text-sm text-slate-600">
                <p>has successfully completed the complete theoretical syllabus and interactive virtual lab training for</p>
                <p className="font-bold text-slate-900 text-base py-1">Level 1: Electronics & Arduino Fundamentals</p>
                <p>demonstrating mastery of breadboard layouts, current limiting series resistors, and basic digital toggling microcode logic.</p>
              </div>

              {/* Bottom Stamp, Signatures, and Verification */}
              <div className="grid grid-cols-3 gap-6 items-end pt-10 font-sans">
                {/* QR block */}
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <div className="p-1.5 border border-slate-200 bg-white rounded-lg">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider font-mono">VERIFY CREDENTIAL</span>
                </div>

                {/* Seal Block */}
                <div className="flex justify-center items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow border-4 border-white flex items-center justify-center relative rotate-12">
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-white/60" />
                    <span className="font-bold text-[9px] text-white text-center tracking-widest leading-none font-serif uppercase">OFFICIAL<br />SEAL</span>
                  </div>
                </div>

                {/* Signatures block */}
                <div className="flex flex-col items-center text-center">
                  <div className="italic text-lg text-slate-800 font-serif border-b border-slate-300 pb-1 w-full max-w-[140px]">
                    S. Rithy
                  </div>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-1 block">ACADEMY PRESIDENT</span>
                </div>
              </div>
            </div>

            {/* Frame metadata footer */}
            <div className="pt-6 flex justify-between items-center text-xs text-slate-400 font-sans">
              <span>Date: July 10, 2026</span>
              <span>Credential ID: REANB-2026-94812</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
