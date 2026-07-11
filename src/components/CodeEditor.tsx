import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Upload, Code, RotateCcw, AlertCircle, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface CodeEditorProps {
  onGainXP: (amount: number) => void;
  onGainGems: (amount: number) => void;
}

export default function CodeEditor({ onGainXP, onGainGems }: CodeEditorProps) {
  // Preset list
  const sketchPresets = {
    blink: {
      name: 'LED Blink (Standard)',
      code: `// Arduino Blink LED Sketch
void setup() {
  // Set pin 13 as a digital output
  pinMode(13, OUTPUT);
}

void loop() {
  // Turn ON the LED pin 13
  digitalWrite(13, HIGH);
  delay(1000); // Wait 1 second
  
  // Turn OFF the LED
  digitalWrite(13, LOW);
  delay(1000); // Wait 1 second
}`,
      successLog: 'Sketch uses 924 bytes (2%) of program storage space.\nGlobal variables use 9 bytes (0%) of dynamic memory.\nUpload completed successfully on COM3.',
      outputSim: 'blink',
    },
    traffic: {
      name: 'Traffic Light Sequence',
      code: `// Traffic Light Sequence Controller
int redPin = 12;
int yellowPin = 11;
int greenPin = 10;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
}

void loop() {
  digitalWrite(redPin, HIGH);
  delay(3000);
  digitalWrite(redPin, LOW);
  
  digitalWrite(greenPin, HIGH);
  delay(3000);
  digitalWrite(greenPin, LOW);
  
  digitalWrite(yellowPin, HIGH);
  delay(1000);
  digitalWrite(yellowPin, LOW);
}`,
      successLog: 'Sketch uses 1204 bytes (3%) of program storage.\nUpload completed on COM3.',
      outputSim: 'traffic',
    },
    error: {
      name: 'Corrupted Sketch (Test Compiler)',
      code: `// Error Sketch - Missing Semicolons
void setup() {
  pinMode(13, OUTPUT) // Semicolon missing!
}

void loop() {
  digitalWrite(13, HIGH) // Semicolon missing!
  delay(1000);
}`,
      successLog: 'Compilation error: expected \';\' before \'}\' token on line 4.\nCompilation failed.',
      outputSim: 'error',
    }
  };

  const [activePreset, setActivePreset] = useState<keyof typeof sketchPresets>('blink');
  const [editorCode, setEditorCode] = useState(sketchPresets.blink.code);

  const [isCompiling, setIsCompiling] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [consoleLog, setConsoleLog] = useState<string>('Arduino IDE ready. Connect board and click [Verify/Compile].');

  // Simulation indicators
  const [ledState, setLedState] = useState<'off' | 'blink' | 'traffic' | 'error'>('off');

  const handleSelectPreset = (key: keyof typeof sketchPresets) => {
    setActivePreset(key);
    setEditorCode(sketchPresets[key].code);
    setConsoleLog('Loaded preset: ' + sketchPresets[key].name);
    setLedState('off');
  };

  const handleCompile = () => {
    setIsCompiling(true);
    setConsoleLog('avr-g++ -c -g -Os -Wall -fno-exceptions -ffunction-sections... compiling...');
    setLedState('off');

    setTimeout(() => {
      setIsCompiling(false);
      if (activePreset === 'error') {
        setConsoleLog(sketchPresets.error.successLog);
      } else {
        setConsoleLog(sketchPresets[activePreset].successLog + '\n\nCompilation succeeded. Ready to upload.');
      }
    }, 1500);
  };

  const handleUpload = () => {
    if (activePreset === 'error') {
      setConsoleLog('Cannot upload! Sketch contains compilation errors. Resolve errors first.');
      return;
    }

    setIsUploading(true);
    setConsoleLog('Writing flash memory: [████████████████] 100% written.\nVerifying flash...');

    setTimeout(() => {
      setIsUploading(false);
      setConsoleLog('Upload finished.\n\nRunning Arduino sketch core loop...\nPORT COM3 is open at 9600 baud.');
      setLedState(sketchPresets[activePreset].outputSim as any);
      onGainXP(150);
      onGainGems(30);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Embedded Code Editor (IDE)</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Write C++ Arduino code, test compiler checks, and upload programs to watch the virtual circuit respond in real-time.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Sketches:</span>
          <select
            value={activePreset}
            onChange={(e) => handleSelectPreset(e.target.value as any)}
            className="px-3.5 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {Object.entries(sketchPresets).map(([key, item]) => (
              <option key={key} value={key}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main IDE Split Frame */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Text Editor Container (Col Span 7) */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl min-h-[450px]">
          {/* Editor Header Panel */}
          <div className="px-5 py-3 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4.5 h-4.5 text-blue-400" />
              <span className="font-mono text-xs font-extrabold text-slate-300">main.ino (C++ Arduino Sketch)</span>
            </div>

            {/* Compile Upload CTA buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={isCompiling || isUploading}
                onClick={handleCompile}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold text-slate-300 rounded-lg flex items-center gap-1 cursor-pointer transition active:scale-95"
                title="Verify and Compile code"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Verify
              </button>
              <button
                disabled={isCompiling || isUploading}
                onClick={handleUpload}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer transition active:scale-95"
                title="Upload code to Arduino board"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Code
              </button>
            </div>
          </div>

          {/* Code Text Area with Line numbers */}
          <div className="flex-1 flex font-mono text-xs p-5 overflow-auto bg-slate-950">
            {/* Line margin */}
            <div className="text-slate-600 border-r border-slate-900 pr-4 select-none text-right space-y-1 w-8 shrink-0">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Text editor window */}
            <textarea
              value={editorCode}
              onChange={(e) => {
                setEditorCode(e.target.value);
                setLedState('off');
              }}
              className="flex-1 pl-4 bg-transparent text-slate-100 border-0 outline-none resize-none h-[280px] leading-relaxed focus:ring-0 focus:outline-none"
              spellCheck="false"
            />
          </div>

          {/* Bottom IDE terminal output */}
          <div className="bg-slate-950 border-t border-slate-900 p-4">
            <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-2 font-mono">IDE Console log</span>
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-900 font-mono text-[10px] text-slate-400 min-h-24 whitespace-pre-line leading-normal text-left">
              {consoleLog}
            </div>
          </div>
        </div>

        {/* Right Side: Virtual Board Output simulator (Col Span 5) */}
        <div className="lg:col-span-5 flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-left justify-between min-h-[450px]">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest font-mono">LAB ENVIRONMENT STATE</span>
            <h3 className="font-extrabold text-slate-950 dark:text-white text-lg">Virtual Board Status</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Uploading compiling code automatically runs the microprogram loop. Observe physical board indicators reacting dynamically.
            </p>

            {/* Board graphic container */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[220px]">
              
              {/* LED Blink Output Sim */}
              {ledState === 'blink' && (
                <div className="text-center space-y-3">
                  <div className="relative">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse duration-1000">
                      <div className="w-4 h-4 bg-white rounded-full animate-ping" />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-500 animate-pulse uppercase">OUTPUT: Digital Pin 13 BLINKING</span>
                </div>
              )}

              {/* Traffic light sequence output sim */}
              {ledState === 'traffic' && (
                <div className="flex gap-4 items-center bg-slate-900/90 p-4 rounded-full border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-red-500 shadow-md animate-pulse" style={{ animationDuration: '3s' }} />
                  <div className="w-8 h-8 rounded-full bg-yellow-500 shadow-md animate-pulse" style={{ animationDuration: '1s', animationDelay: '3s' }} />
                  <div className="w-8 h-8 rounded-full bg-emerald-500 shadow-md animate-pulse" style={{ animationDuration: '3s', animationDelay: '4s' }} />
                </div>
              )}

              {/* Standard idle state */}
              {ledState === 'off' && (
                <div className="text-slate-400 text-xs text-center flex flex-col gap-1.5 items-center">
                  <div className="w-12 h-12 rounded-full border-4 border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center">
                    💤
                  </div>
                  <span>Board connected but idle. Compile and upload a sketch to run.</span>
                </div>
              )}

              {/* Uploading progress overlay bar */}
              {isUploading && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-white z-20">
                  <Upload className="w-8 h-8 text-blue-400 animate-bounce mb-3" />
                  <span className="font-mono text-xs font-bold mb-1.5">Uploading binary sketch...</span>
                  <div className="w-full max-w-xs h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.8 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-950 pt-4 mt-4 text-xs font-mono text-slate-500">
            <span>🔌 PORT: USB COM3 (Arduino Uno)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
