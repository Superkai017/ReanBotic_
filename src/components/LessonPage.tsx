import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, Send, Sparkles, AlertCircle, CheckCircle2, Bookmark, Flame, Gem, Heart, Timer, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { LessonContent, ChatMessage, UserState } from '../types';
import { LESSONS } from '../data';

interface LessonPageProps {
  lessonId: string;
  user: UserState;
  onBack: () => void;
  onCompleteLesson: (lessonId: string, gotPerfect: boolean) => void;
  onHeartsDamaged: () => void;
}

export default function LessonPage({ lessonId, user, onBack, onCompleteLesson, onHeartsDamaged }: LessonPageProps) {
  const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];

  // UI Tabs & States
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');
  const [bookmarked, setBookmarked] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Infographic States
  const [ledAnodeActive, setLedAnodeActive] = useState(true); // LED anode highlight
  const [ohmsVoltage, setOhmsVoltage] = useState(5); // V slider
  const [ohmsResistance, setOhmsResistance] = useState(250); // R slider

  // Quiz States
  const [selectedOption, setSelectedOption] = useState<string>(''); // For MCQ & Fill-Blank
  const [wordTokens, setWordTokens] = useState<string[]>([]); // Current ordered word list for arrangement
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // AI Chat States
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: `Hi! I'm Reanbotic AI, your robotics tutor. Let's learn about "${lesson.title}" together! Ask me anything, or click a prompt below.`, timestamp: '12:00' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Active Lesson Timer ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Timer output
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Setup Word Arrangement quiz tokens if applicable
  useEffect(() => {
    if (lesson.quiz.type === 'word-arrangement') {
      // Shuffle options for arrangement
      setWordTokens([]);
      setSelectedOption('');
    } else {
      setSelectedOption('');
    }
    setQuizSubmitted(false);
    setActiveTab('learn');
  }, [lessonId]);

  // Handle Token selection in Word Arrangement
  const handleSelectToken = (word: string) => {
    if (wordTokens.includes(word)) {
      setWordTokens(wordTokens.filter((w) => w !== word));
    } else {
      setWordTokens([...wordTokens, word]);
    }
  };

  // Submit Quiz evaluation
  const handleCheckAnswer = () => {
    let correct = false;

    if (lesson.quiz.type === 'word-arrangement') {
      const correctArr = lesson.quiz.correctAnswer as string[];
      correct = wordTokens.length === correctArr.length && wordTokens.every((w, i) => w === correctArr[i]);
    } else {
      correct = selectedOption === lesson.quiz.correctAnswer;
    }

    setIsAnswerCorrect(correct);
    setQuizSubmitted(true);

    if (!correct) {
      onHeartsDamaged();
    }
  };

  const handleContinue = () => {
    const perfectScore = isAnswerCorrect;
    onCompleteLesson(lesson.id, perfectScore);
    onBack();
  };

  // Handle AI Predefined prompt click
  const handleAiPromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput('');
    setIsAiTyping(true);

    // AI thinking pause simulation
    setTimeout(() => {
      let aiResponse = '';
      const promptLower = text.toLowerCase();

      if (promptLower.includes('led')) {
        aiResponse = "An LED (Light Emitting Diode) is a semiconductor that emits light when current flows. Remember its polarities! The longer leg (Anode) connects to positive, while the shorter leg (Cathode) connects to ground/negative. Always add a series resistor (like 220 Ohms) to limit the current, otherwise, it will burn out!";
      } else if (promptLower.includes('resistor') || promptLower.includes('ohms')) {
        aiResponse = "A resistor is like a squeeze on a water hose! It limits the rate of flow of electrons. Measured in Ohms (Ω). We use them to safeguard LEDs from exploding or to configure voltage dividers in sensors.";
      } else if (promptLower.includes('voltage')) {
        aiResponse = "Voltage is electrical pressure! Imagine it as the gravity pushing water down a pipe. In electronics, 5V is standard for Arduino. The larger the voltage, the harder it pushes current through resistors.";
      } else if (promptLower.includes('analog') || promptLower.includes('digital')) {
        aiResponse = "Digital represents binary states: HIGH (5V) or LOW (0V). Like a standard light switch. Analog is continuous, taking any value in a range. Arduino reads analog sensors as values between 0 and 1023.";
      } else {
        aiResponse = `That is an excellent hardware question! In "${lesson.title}", remember that the fundamental goal is safe and systematic routing. Always double check polarities, calculate your resistances using Ohm's Law (V = I * R), and ensure you've programmed the pins to OUTPUT or INPUT mode correctly.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsAiTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-80px)] pb-12 relative text-slate-800 dark:text-slate-200">
      
      {/* Left panel: Module tree checklist */}
      <div className="w-full lg:w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-sm text-left shrink-0">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-500 mb-6 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          Back to Modules
        </button>

        <h3 className="font-extrabold text-xs text-blue-500 uppercase tracking-widest mb-3">Unit Lessons</h3>
        <nav className="space-y-1.5">
          {LESSONS.map((les) => {
            const isCompleted = user.completedLessons.includes(les.id);
            const isCurrent = les.id === lessonId;
            return (
              <button
                key={les.id}
                onClick={() => { if (les.id !== lessonId) onBack(); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${isCurrent ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-400'}`}
              >
                <span className="truncate max-w-[130px]">{les.title}</span>
                <span className="text-[10px] font-bold">
                  {isCompleted ? '✓ Done' : isCurrent ? '⚡ Active' : '🔒'}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Middle Panel: Main explanations / Interactive simulations */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm relative min-h-[600px]">
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50 dark:border-slate-950">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
              <Timer className="w-4 h-4 text-slate-400" />
              <span>{formatTime(seconds)}</span>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs font-extrabold text-slate-400">XP Reward: +50 XP</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-1.5 rounded-lg border transition cursor-pointer ${bookmarked ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-500 border-amber-200' : 'border-slate-100 dark:border-slate-800 hover:text-amber-500'}`}
              title="Bookmark Lesson"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
            </button>
            <div className="flex bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl p-0.5 text-xs font-bold">
              <button
                onClick={() => setActiveTab('learn')}
                className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'learn' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}
              >
                1. Learn
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'quiz' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}
              >
                2. Test
              </button>
            </div>
          </div>
        </div>

        {/* Inner core workspace */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'learn' ? (
              <motion.div
                key="learn-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Introduction & Headers */}
                <div className="text-left space-y-2">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{lesson.conceptTitle}</span>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{lesson.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{lesson.introduction}</p>
                </div>

                {/* INTERACTIVE INFOGRAPHIC / SIMULATOR WIDGET */}
                <div className="bg-slate-50 dark:bg-slate-950/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-900 flex flex-col items-center">
                  <span className="text-xs text-slate-400 font-mono self-start uppercase tracking-wider mb-4">🔬 Interactive Infographic</span>
                  
                  {lesson.visualType === 'led' && (
                    <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
                      {/* LED circuit animation graphic */}
                      <div className="relative w-48 h-48 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                        {/* CSS Flowing particle electron lines representing Current */}
                        <div className="absolute left-6 right-6 bottom-12 h-0.5 bg-slate-300 dark:bg-slate-800">
                          <motion.div
                            className="h-full bg-yellow-400 w-4"
                            animate={{ x: [0, 150, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                          />
                        </div>

                        {/* Polarity neon lines */}
                        <svg viewBox="0 0 100 120" className="w-24 h-24 relative z-10">
                          {/* Anode leg */}
                          <line x1="40" y1="60" x2="40" y2="100" stroke={ledAnodeActive ? '#ef4444' : '#64748b'} strokeWidth="4" strokeLinecap="round" />
                          {/* Cathode leg */}
                          <line x1="60" y1="60" x2="60" y2="90" stroke={!ledAnodeActive ? '#3b82f6' : '#64748b'} strokeWidth="4" strokeLinecap="round" />

                          {/* LED Bulb base */}
                          <rect x="30" y="56" width="40" height="6" rx="1" fill="#dc2626" />
                          {/* LED Dome bulb */}
                          <path d="M 30,56 C 30,10 70,10 70,56 Z" fill="#ef4444" fillOpacity={ledAnodeActive ? '0.95' : '0.4'} className="transition duration-300" />

                          {/* Neon glow effect overlay */}
                          {ledAnodeActive && (
                            <circle cx="50" cy="35" r="15" fill="#f87171" fillOpacity="0.3" className="animate-pulse" />
                          )}
                        </svg>
                      </div>

                      {/* Control Toggle */}
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => setLedAnodeActive(true)}
                          className={`flex-1 p-3 border rounded-2xl text-xs font-bold transition cursor-pointer ${ledAnodeActive ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                          Anode Leg (+) Connected
                        </button>
                        <button
                          onClick={() => setLedAnodeActive(false)}
                          className={`flex-1 p-3 border rounded-2xl text-xs font-bold transition cursor-pointer ${!ledAnodeActive ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                          Backward Reverse Polarity
                        </button>
                      </div>

                      <p className="text-xs text-slate-400 italic text-center">
                        {ledAnodeActive
                          ? '✅ Current flows forward! The LED glows with brilliant neon luminance.'
                          : '❌ Backward connection blocks current flow. The LED remains completely dark.'}
                      </p>
                    </div>
                  )}

                  {lesson.visualType === 'resistor' && (
                    <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
                      {/* Interactive Resistor illustration */}
                      <div className="relative w-full h-32 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center">
                        {/* Wire line */}
                        <div className="absolute left-6 right-6 h-1 bg-slate-400 rounded" />

                        {/* Resistor body */}
                        <div className="relative w-40 h-16 bg-amber-100 dark:bg-amber-950 border-4 border-amber-200 dark:border-amber-900 rounded-xl flex justify-around items-center px-4">
                          <div className="w-3.5 h-full bg-red-600" title="1st Band" />
                          <div className="w-3.5 h-full bg-red-600" title="2nd Band" />
                          <div className="w-3.5 h-full bg-brown-600 bg-amber-800" title="Multiplier Band" />
                          <div className="w-3.5 h-full bg-yellow-500" title="Tolerance Band" />
                        </div>
                      </div>

                      <div className="text-left w-full space-y-2">
                        <span className="block font-bold text-sm">Resistor Color Code Quick Guide:</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          A <strong>220 Ohm (Ω)</strong> resistor consists of four colored bands: <strong>Red (2)</strong>, <strong>Red (2)</strong>, <strong>Brown (x10)</strong>, and <strong>Gold (±5%)</strong>. Always check band values to protect LEDs!
                        </p>
                      </div>
                    </div>
                  )}

                  {lesson.visualType === 'voltage' && (
                    <div className="flex flex-col items-center space-y-6 w-full max-w-sm text-left">
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full space-y-4 shadow-sm">
                        <div className="text-center font-extrabold text-lg text-blue-600 dark:text-blue-400">
                          Ohm's Law Solver: V = I × R
                        </div>

                        {/* Sliders */}
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-400">
                              <span>Voltage (V):</span>
                              <span className="text-slate-800 dark:text-white font-mono">{ohmsVoltage} Volts</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="12"
                              value={ohmsVoltage}
                              onChange={(e) => setOhmsVoltage(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-400">
                              <span>Resistance (R):</span>
                              <span className="text-slate-800 dark:text-white font-mono">{ohmsResistance} Ohms</span>
                            </div>
                            <input
                              type="range"
                              min="100"
                              max="1000"
                              step="50"
                              value={ohmsResistance}
                              onChange={(e) => setOhmsResistance(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Output Math calculation */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-900">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-1">Calculated Current (I = V / R)</span>
                          <span className="font-mono font-bold text-2xl text-emerald-500">
                            {((ohmsVoltage / ohmsResistance) * 1000).toFixed(1)} milliamperes
                          </span>
                          <p className="text-[10px] text-slate-400 mt-1 italic">
                            ({ohmsVoltage}V / {ohmsResistance}Ω = {(ohmsVoltage / ohmsResistance).toFixed(4)} Amperes)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {lesson.visualType === 'breadboard' && (
                    <div className="flex flex-col items-center space-y-4 w-full max-w-sm text-left">
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full space-y-3 shadow-sm">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Pinout Highlights:</h4>
                        <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2.5">
                          <li className="flex gap-2 items-start">
                            <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-950 text-red-500 font-bold rounded text-[9px] font-mono">5V & 3.3V</span>
                            <span>Main power rails providing physical DC voltages to pins and breadboards.</span>
                          </li>
                          <li className="flex gap-2 items-start">
                            <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-500 font-bold rounded text-[9px] font-mono">GND</span>
                            <span>The reference Ground (0V). Standard currents must exit here to complete circuits safely.</span>
                          </li>
                          <li className="flex gap-2 items-start">
                            <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 font-bold rounded text-[9px] font-mono">D0 - D13</span>
                            <span>Digital Input/Output pins. Toggled via <code>digitalWrite()</code> software sketches.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {lesson.visualType === 'multimeter' && (
                    <div className="flex flex-col items-center space-y-4 w-full max-w-sm text-left">
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full space-y-3 shadow-sm">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Arduino Code Execution Path:</h4>
                        <div className="relative space-y-6 pl-4 border-l-2 border-blue-500">
                          <div className="relative">
                            <div className="absolute -left-5.5 top-0 w-3 h-3 rounded-full bg-blue-600" />
                            <span className="block font-bold text-xs text-slate-800 dark:text-white">setup() [Runs once at boot]</span>
                            <span className="block text-[10px] text-slate-400">Sets pin directions, initial serial print states.</span>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-5.5 top-0 w-3 h-3 rounded-full bg-indigo-500" />
                            <span className="block font-bold text-xs text-slate-800 dark:text-white">loop() [Repeats endlessly]</span>
                            <span className="block text-[10px] text-slate-400">Checks sensors, runs logic, changes actuators.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Structured Text explanations: Why, How, Common Mistakes */}
                <div className="grid sm:grid-cols-2 gap-6 text-left">
                  <div className="p-5 border border-slate-50 dark:border-slate-900/60 bg-slate-50/20 dark:bg-slate-950/10 rounded-2xl space-y-2">
                    <span className="block font-bold text-sm text-slate-800 dark:text-white">❓ What is it & Why use it?</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{lesson.whatIsIt}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1.5">{lesson.whyUseIt}</p>
                  </div>

                  <div className="p-5 border border-slate-50 dark:border-slate-900/60 bg-slate-50/20 dark:bg-slate-950/10 rounded-2xl space-y-2">
                    <span className="block font-bold text-sm text-slate-800 dark:text-white">🛠️ How it works & Real applications</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{lesson.howItWorks}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1.5">{lesson.realWorldApp}</p>
                  </div>
                </div>

                {/* Common Mistakes Banner */}
                <div className="bg-red-50 dark:bg-red-950/20 p-5 border border-red-500/10 rounded-3xl text-left flex gap-4 items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-red-800 dark:text-red-400">Common Student Mistakes:</h4>
                    <p className="text-xs text-red-600 dark:text-red-300 mt-1 whitespace-pre-line leading-relaxed">
                      {lesson.commonMistakes}
                    </p>
                  </div>
                </div>

                {/* Bottom navigation tab switches */}
                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-850">
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/10 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    Take Topic Quiz
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* QUIZ TESTING STATE */
              <motion.div
                key="quiz-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 text-left"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest font-mono">STEP 2: LESSON CHALLENGE</span>
                  <h3 className="text-xl font-extrabold text-slate-950 dark:text-white mt-1">Test Your Understanding:</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{lesson.quiz.prompt}</p>
                </div>

                {/* MCQ / Fill blank options lists */}
                {lesson.quiz.type !== 'word-arrangement' ? (
                  <div className="space-y-3 pt-2">
                    {lesson.quiz.options.map((opt) => {
                      const isSelected = selectedOption === opt;
                      return (
                        <button
                          key={opt}
                          disabled={quizSubmitted}
                          onClick={() => setSelectedOption(opt)}
                          className={`w-full p-4 border rounded-2xl flex items-center justify-between text-left text-xs font-semibold transition cursor-pointer ${isSelected ? 'border-blue-600 bg-blue-500/5 text-slate-900 dark:text-white' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'}`}
                        >
                          <span>{opt}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-700'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Word arrangement drag list simulation */
                  <div className="space-y-6 pt-2">
                    {/* Selected words line display */}
                    <div className="min-h-16 p-4 bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl flex flex-wrap gap-2.5 items-center">
                      {wordTokens.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">Select ordered tokens below...</span>
                      ) : (
                        wordTokens.map((t) => (
                          <span key={t} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5">
                            {t}
                          </span>
                        ))
                      )}
                    </div>

                    {/* Word selections options list */}
                    <div className="flex flex-wrap gap-2.5">
                      {lesson.quiz.options.map((tok) => {
                        const isPlaced = wordTokens.includes(tok);
                        return (
                          <button
                            key={tok}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectToken(tok)}
                            className={`px-4 py-2.5 border rounded-2xl text-xs font-bold transition cursor-pointer ${isPlaced ? 'opacity-40 border-slate-100 dark:border-slate-900' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 text-slate-700 dark:text-slate-300'}`}
                          >
                            {tok}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Submitting checker triggers bottom drawer */}
                {!quizSubmitted ? (
                  <div className="flex justify-end pt-6 border-t border-slate-150 dark:border-slate-850">
                    <button
                      onClick={handleCheckAnswer}
                      disabled={lesson.quiz.type === 'word-arrangement' ? wordTokens.length === 0 : !selectedOption}
                      className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold rounded-2xl shadow transition cursor-pointer"
                    >
                      Check Answer
                    </button>
                  </div>
                ) : (
                  /* Answer evaluated feedback card drawer */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mt-6 ${isAnswerCorrect ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500/20 text-emerald-800 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-950/20 border-red-500/20 text-red-800 dark:text-red-400'}`}
                  >
                    <div className="space-y-1">
                      <span className="font-extrabold text-sm block">
                        {isAnswerCorrect ? '✓ Correct! Awesome work.' : '✗ Incorrect Answer'}
                      </span>
                      <p className="text-xs leading-normal opacity-80">{lesson.quiz.explanation}</p>
                    </div>

                    <button
                      onClick={handleContinue}
                      className={`px-5 py-3 rounded-xl font-bold text-xs shrink-0 cursor-pointer text-white flex items-center gap-1 shadow transition ${isAnswerCorrect ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/10' : 'bg-red-600 hover:bg-red-500 shadow-red-500/10'}`}
                    >
                      {isAnswerCorrect ? 'Claim Rewards' : 'Continue'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right panel: AI Assistant tutor chat pane */}
      <div className="w-full lg:w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[500px] lg:h-[620px] text-left shrink-0">
        <div className="p-4 border-b border-slate-50 dark:border-slate-950 bg-slate-50 dark:bg-slate-950/40 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
          <div>
            <span className="block font-bold text-xs text-slate-800 dark:text-white">Reanbotic AI</span>
            <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-mono">ROBOTICS TUTOR</span>
          </div>
        </div>

        {/* Message streams */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-3.5 rounded-2xl text-xs max-w-[90%] leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/5' : 'bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-bl-none text-slate-700 dark:text-slate-350'}`}>
                {m.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isAiTyping && (
            <div className="flex gap-1.5 items-center pl-2">
              <span className="text-[10px] font-semibold text-slate-400 animate-pulse">AI is typing...</span>
            </div>
          )}
        </div>

        {/* Custom quick prompt suggestions (Only displays if chat is short) */}
        {messages.length <= 3 && (
          <div className="p-3 bg-slate-50/60 dark:bg-slate-950/20 border-t border-slate-50 dark:border-slate-950 space-y-1.5">
            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest block mb-1 px-1">Suggested prompts:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Why isn\'t my LED working?',
                'What is a resistor?',
                'Explain voltage simply.',
                'Difference analog vs digital?',
              ].map((p) => (
                <button
                  key={p}
                  onClick={() => handleAiPromptClick(p)}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-400/30 text-[10px] text-slate-600 dark:text-slate-400 rounded-lg transition text-left cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Typing message bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(userInput);
          }}
          className="p-3 border-t border-slate-50 dark:border-slate-950 bg-white dark:bg-slate-900 flex gap-2 items-center"
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask AI tutor anything..."
            className="flex-1 bg-slate-50 dark:bg-slate-950/60 border border-slate-150 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
