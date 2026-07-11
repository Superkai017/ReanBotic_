import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Award, ArrowRight, Clipboard, ClipboardCheck, Sparkles, AlertCircle, Cpu, Sliders, Play } from 'lucide-react';
import { PROJECTS } from '../data';
import { ProjectCard } from '../types';

interface ProjectsProps {
  onGainXP: (amount: number) => void;
  onGainGems: (amount: number) => void;
}

export default function Projects({ onGainXP, onGainGems }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<ProjectCard | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [claimedProject, setClaimedProject] = useState<string[]>([]);

  const handleBuildClick = (proj: ProjectCard) => {
    setActiveProject(proj);
    setCopiedCode(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleClaimReward = (id: string, xp: number) => {
    if (claimedProject.includes(id)) return;
    setClaimedProject([...claimedProject, id]);
    onGainXP(xp);
    onGainGems(Math.round(xp / 5));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div className="text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Interactive Robotics Projects</h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Apply your knowledge to build concrete functional systems. Replicate these schematics in the physical world or write them in the IDE!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj) => {
          const isClaimed = claimedProject.includes(proj.id);
          return (
            <div
              key={proj.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header indicators */}
                <div className="flex justify-between items-center">
                  <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider ${proj.difficulty === 'Beginner' ? 'bg-blue-100 text-blue-500 border border-blue-200' : proj.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-500 border border-amber-200' : 'bg-red-100 text-red-500 border border-red-200'}`}>
                    {proj.difficulty}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">💎 +{proj.xp} XP</span>
                </div>

                <div className="text-left space-y-1.5">
                  <h3 className="font-extrabold text-base md:text-lg text-slate-900 dark:text-white leading-tight">{proj.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{proj.description}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-950 flex flex-col gap-2.5">
                <button
                  onClick={() => handleBuildClick(proj)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  Build Sketch Project
                  <ArrowRight className="w-4 h-4" />
                </button>
                {isClaimed ? (
                  <span className="text-[10px] text-center font-bold text-emerald-500">✓ Reward claimed successfully!</span>
                ) : (
                  <button
                    onClick={() => handleClaimReward(proj.id, proj.xp)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl text-[10px] font-extrabold text-slate-500 dark:text-slate-400 transition cursor-pointer"
                  >
                    Claim +{proj.xp} XP Reward
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable modal displaying complete sketch code and guidelines */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden relative text-slate-850 dark:text-slate-100 flex flex-col max-h-[85vh]"
          >
            {/* Header branding */}
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-start">
              <div className="text-left space-y-1">
                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest font-mono">PROJECT WORKSPACE EXPORT</span>
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white leading-tight">{activeProject.title}</h3>
                <p className="text-xs text-slate-400">Follow the code sequence to build the hardware project.</p>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold cursor-pointer border border-slate-100 dark:border-slate-850 transition"
              >
                Close
              </button>
            </div>

            {/* Inner Details Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              {/* Hardware Requirements */}
              <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-900/60">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  Required hardware list
                </h4>
                <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 list-disc pl-5">
                  <li>1x Arduino Uno R3 development board</li>
                  <li>1x half-size solderless breadboard</li>
                  <li>Male-to-male wire jumper cables</li>
                  {activeProject.id.includes('blink') && (
                    <>
                      <li>1x 5mm LED bulb</li>
                      <li>1x 220Ω resistor (Red, Red, Brown, Gold)</li>
                    </>
                  )}
                  {activeProject.id.includes('traffic') && (
                    <>
                      <li>3x 5mm LEDs (Red, Yellow, Green)</li>
                      <li>3x 220Ω resistors</li>
                    </>
                  )}
                  {activeProject.id.includes('temp') && (
                    <>
                      <li>1x Analog temperature sensor (TMP36)</li>
                      <li>1x Active buzzer siren</li>
                    </>
                  )}
                  {activeProject.id.includes('night') && (
                    <>
                      <li>1x LDR Phototransistor</li>
                      <li>1x 10kΩ resistor</li>
                    </>
                  )}
                  {activeProject.id.includes('dice') && (
                    <>
                      <li>1x Single digit 7-Segment display</li>
                      <li>1x Tactile push-button</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Code blocks with copy actions */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider font-mono">Arduino C++ Sketch</h4>
                  <button
                    onClick={() => handleCopyCode(activeProject.sampleCode)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-[10px] font-bold text-slate-500 flex items-center gap-1.5 cursor-pointer border border-slate-100 dark:border-slate-850"
                  >
                    {copiedCode ? (
                      <>
                        <ClipboardCheck className="w-3.5 h-3.5 text-emerald-500" />
                        Copied Sketch
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-3.5 h-3.5" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-900 overflow-x-auto">
                  <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                    {activeProject.sampleCode}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
