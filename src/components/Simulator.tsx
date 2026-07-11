import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Play, RotateCcw, AlertTriangle, ShieldCheck, Sparkles, Plus, Trash, HelpCircle, ChevronRight, Check } from 'lucide-react';
import { SimItem, Connection } from '../types';

interface SimulatorProps {
  onGainXP: (amount: number) => void;
  onGainGems: (amount: number) => void;
}

export default function Simulator({ onGainXP, onGainGems }: SimulatorProps) {
  const [placedItems, setPlacedItems] = useState<SimItem[]>([
    { id: 'ard-1', type: 'arduino', name: 'Arduino Uno R3', x: 80, y: 140 },
    { id: 'bb-1', type: 'breadboard', name: 'Half-Size Breadboard', x: 380, y: 140 },
    { id: 'led-1', type: 'led', name: 'Red LED 5mm', x: 440, y: 100, color: 'red' },
  ]);

  const [connections, setConnections] = useState<Connection[]>([]);
  const [wireColor, setWireColor] = useState<string>('#ef4444'); // Red wire default
  const [activePin, setActivePin] = useState<{ id: string; pin: string } | null>(null);

  // Simulation running status
  const [isSimulating, setIsSimulating] = useState(false);
  const [simError, setSimError] = useState<string | null>(null);
  const [simSuccess, setSimSuccess] = useState<boolean>(false);

  // Toolbox item list
  const toolbox = [
    { type: 'resistor' as const, name: '220Ω Resistor', desc: 'Protects LEDs from burnout' },
    { type: 'buzzer' as const, name: 'Active Buzzer', desc: 'Emits a solid tone' },
    { type: 'button' as const, name: 'Tactile Button', desc: 'Closes circuit contacts' },
    { type: 'battery' as const, name: '9V DC Battery', desc: 'Independent power supply' },
  ];

  // Arduino Pins list for clicking
  const arduinoPins = [
    { name: 'D13', cx: 165, cy: 110, color: '#3b82f6' },
    { name: 'GND', cx: 145, cy: 220, color: '#1e293b' },
  ];

  // Breadboard Terminal points
  const breadboardPins = [
    { name: 'A10', cx: 440, cy: 190, color: '#10b981' }, // Connects to LED Anode
    { name: 'A9', cx: 460, cy: 190, color: '#10b981' },  // Connects to LED Cathode
  ];

  // Add Toolbox item to grid
  const handleAddItem = (type: any, name: string) => {
    const newItem: SimItem = {
      id: `${type}-${Date.now()}`,
      type,
      name,
      x: 380,
      y: 280,
    };
    setPlacedItems([...placedItems, newItem]);
  };

  // Handle Pin click to create bezier wire connection
  const handlePinClick = (id: string, pin: string) => {
    if (!activePin) {
      setActivePin({ id, pin });
    } else {
      // Connect first pin with second pin
      if (activePin.id === id) {
        // Can't connect to self
        setActivePin(null);
        return;
      }

      // Check duplicate connection
      const exists = connections.some(
        (c) =>
          (c.fromId === activePin.id && c.fromPin === activePin.pin && c.toId === id && c.toPin === pin) ||
          (c.fromId === id && c.fromPin === pin && c.toId === activePin.id && c.toPin === activePin.pin)
      );

      if (!exists) {
        const newConn: Connection = {
          id: `conn-${Date.now()}`,
          fromId: activePin.id,
          fromPin: activePin.pin,
          toId: id,
          toPin: pin,
          color: wireColor,
        };
        setConnections([...connections, newConn]);
      }
      setActivePin(null);
    }
  };

  // Run validation checks on Circuit Connections
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimError(null);
    setSimSuccess(false);

    setTimeout(() => {
      // Verify connections
      const hasD13ToLED = connections.some(
        (c) =>
          (c.fromPin === 'D13' && c.toPin === 'A10') ||
          (c.fromPin === 'A10' && c.toPin === 'D13')
      );

      const hasGNDToLED = connections.some(
        (c) =>
          (c.fromPin === 'GND' && c.toPin === 'A9') ||
          (c.fromPin === 'A9' && c.toPin === 'GND')
      );

      if (!hasD13ToLED) {
        setSimError('Wiring Fault: Floating Anode. LED is missing a connection to Arduino Pin D13.');
        setSimSuccess(false);
      } else if (!hasGNDToLED) {
        setSimError('Wiring Fault: Incomplete Return Path. LED Cathode must connect to Arduino Ground (GND).');
        setSimSuccess(false);
      } else {
        setSimSuccess(true);
        setSimError(null);
        onGainXP(100);
        onGainGems(20);
      }
    }, 1500);
  };

  const handleReset = () => {
    setConnections([]);
    setIsSimulating(false);
    setSimError(null);
    setSimSuccess(false);
    setActivePin(null);
  };

  const handleAutoWire = () => {
    setConnections([
      { id: 'conn-auto-1', fromId: 'ard-1', fromPin: 'D13', toId: 'bb-1', toPin: 'A10', color: '#ef4444' },
      { id: 'conn-auto-2', fromId: 'ard-1', fromPin: 'GND', toId: 'bb-1', toPin: 'A9', color: '#1e293b' },
    ]);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div className="text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Virtual Electronics Lab</h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Drag hardware or click board pins to route custom cables. Connect Pin D13 and GND to the breadboard rails to light up the LED!
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left column: Toolboxes */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-sm text-left flex flex-col gap-5">
          <div>
            <h3 className="font-extrabold text-xs text-blue-500 uppercase tracking-widest mb-3">Toolbox</h3>
            <div className="space-y-3">
              {toolbox.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleAddItem(item.type, item.name)}
                  className="w-full p-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900 hover:border-blue-500/10 hover:bg-slate-100/50 rounded-2xl text-left transition flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <span className="block font-bold text-xs text-slate-800 dark:text-white">{item.name}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{item.desc}</span>
                  </div>
                  <Plus className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-950 pt-4">
            <h3 className="font-extrabold text-xs text-blue-500 uppercase tracking-widest mb-3">Wire Color Selection</h3>
            <div className="flex gap-2.5">
              {[
                { hex: '#ef4444', label: 'Red (Power)' },
                { hex: '#1e293b', label: 'Black (Ground)' },
                { hex: '#3b82f6', label: 'Blue (Signal)' },
                { hex: '#eab308', label: 'Yellow (SDA)' },
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setWireColor(c.hex)}
                  className={`w-8 h-8 rounded-full border-2 transition cursor-pointer relative ${wireColor === c.hex ? 'border-blue-500' : 'border-transparent'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                >
                  {wireColor === c.hex && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Canvas Grid Panel (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl overflow-hidden shadow-inner relative min-h-[480px]">
          {/* Canvas header controls */}
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900 flex justify-between items-center z-10">
            <span className="font-mono text-xs font-bold text-slate-500">SCHEMATIC CANVAS</span>
            <div className="flex gap-2">
              <button
                onClick={handleAutoWire}
                className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-200 dark:border-blue-500/20 rounded-lg hover:bg-blue-100 transition cursor-pointer"
              >
                Auto-Wire Helper ⚡
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 bg-slate-50 dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 rounded-lg hover:text-red-500 transition cursor-pointer"
                title="Clear Connections"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="flex-1 relative overflow-hidden bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:20px_20px]">
            {/* SVG Wires Lines Drawer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
              {connections.map((c) => {
                // Find start point
                const fromNode = arduinoPins.find((p) => p.name === c.fromPin) || breadboardPins.find((p) => p.name === c.fromPin);
                const toNode = arduinoPins.find((p) => p.name === c.toPin) || breadboardPins.find((p) => p.name === c.toPin);

                if (!fromNode || !toNode) return null;

                // Bezier curve calculations
                const midX = (fromNode.cx + toNode.cx) / 2;
                const pathD = `M ${fromNode.cx} ${fromNode.cy} C ${midX} ${fromNode.cy - 40}, ${midX} ${toNode.cy - 40}, ${toNode.cx} ${toNode.cy}`;

                return (
                  <path
                    key={c.id}
                    d={pathD}
                    fill="none"
                    stroke={c.color}
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    className="drop-shadow-md"
                  />
                );
              })}

              {/* Active connection guide */}
              {activePin && (() => {
                const startPin = arduinoPins.find((p) => p.name === activePin.pin) || breadboardPins.find((p) => p.name === activePin.pin);
                if (!startPin) return null;
                return (
                  <circle cx={startPin.cx} cy={startPin.cy} r="10" fill="none" stroke={wireColor} strokeWidth="2" className="animate-ping" />
                );
              })()}
            </svg>

            {/* Placed components layout */}
            <div className="absolute inset-0 p-8 flex flex-col md:flex-row items-center justify-around gap-8 z-10 select-none">
              {/* Arduino Board Vector representation */}
              <div className="relative w-48 h-64 bg-emerald-900 border-4 border-emerald-950 rounded-2xl shadow-xl p-4 flex flex-col justify-between text-left">
                <div className="flex justify-between items-start">
                  <div className="bg-slate-800 border border-slate-700 rounded-md w-8 h-12 flex items-center justify-center font-mono text-[8px] text-white">USB</div>
                  <span className="font-mono text-[9px] text-emerald-300 font-extrabold rotate-90 mt-4 origin-left">ARDUINO UNO R3</span>
                </div>

                <div className="flex flex-col gap-4 font-mono">
                  {/* Digital Pins clickable indicators */}
                  <div className="space-y-1">
                    <span className="block text-[8px] text-emerald-400">DIGITAL I/O</span>
                    <div className="flex gap-1.5">
                      {arduinoPins.filter(p => p.name.startsWith('D')).map((pin) => (
                        <button
                          key={pin.name}
                          onClick={() => handlePinClick('ard-1', pin.name)}
                          className={`px-1.5 py-1 text-[8.5px] font-bold rounded cursor-pointer transition ${activePin?.pin === pin.name ? 'bg-yellow-400 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                          style={{ left: pin.cx, top: pin.cy }}
                        >
                          {pin.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ground Power indicators */}
                  <div className="space-y-1">
                    <span className="block text-[8px] text-emerald-400">POWER RAILS</span>
                    {arduinoPins.filter(p => p.name === 'GND').map((pin) => (
                      <button
                        key={pin.name}
                        onClick={() => handlePinClick('ard-1', pin.name)}
                        className={`w-fit px-2 py-1 text-[8.5px] font-bold rounded cursor-pointer transition ${activePin?.pin === pin.name ? 'bg-yellow-400 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                      >
                        {pin.name} (0V)
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Breadboard layout representation */}
              <div className="relative w-56 h-64 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-2xl shadow-xl p-4 flex flex-col justify-between">
                {/* Board tracks */}
                <div className="flex justify-between text-slate-400 font-mono text-[8px] border-b border-slate-100 dark:border-slate-950 pb-2">
                  <span>(+) Power</span>
                  <span>(-) Ground</span>
                </div>

                {/* Placed LED */}
                <div className="relative flex flex-col items-center justify-center my-4">
                  {/* Glowing LED animation */}
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-300 ${simSuccess ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-red-900/40'}`}>
                      {simSuccess && <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />}
                    </div>
                    {/* Metal leads */}
                    <div className="flex justify-center gap-4 h-6 w-full -mt-1">
                      <div className="w-0.5 bg-slate-400 h-full" />
                      <div className="w-0.5 bg-slate-400 h-full" />
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">LED Module</span>
                </div>

                {/* Connection Terminals columns A9 & A10 */}
                <div className="flex justify-center gap-8 font-mono">
                  {breadboardPins.map((pin) => (
                    <div key={pin.name} className="flex flex-col items-center gap-1">
                      <span className="text-[8px] text-slate-400">{pin.name}</span>
                      <button
                        onClick={() => handlePinClick('bb-1', pin.name)}
                        className={`w-7 h-7 rounded-lg border-2 border-dashed flex items-center justify-center text-[9px] font-bold cursor-pointer transition ${activePin?.pin === pin.name ? 'border-yellow-400 bg-yellow-400/10 text-yellow-500' : 'border-slate-300 dark:border-slate-800 text-slate-400 hover:border-slate-400'}`}
                      >
                        Pin
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Float sandbox labels */}
            {placedItems.filter(item => !['arduino', 'breadboard', 'led'].includes(item.type)).map((item) => (
              <div key={item.id} className="absolute left-1/2 bottom-4 -translate-x-1/2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg flex items-center gap-2 z-20">
                <span className="font-bold text-[10px] text-slate-700 dark:text-slate-300">{item.name} placed</span>
                <button
                  onClick={() => setPlacedItems(placedItems.filter(i => i.id !== item.id))}
                  className="text-red-500 text-xs font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Simulation validation status & results */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-sm text-left flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="font-extrabold text-xs text-blue-500 uppercase tracking-widest">Controls</h3>

            {/* Run Sim buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                Run Simulation
              </button>
              <button
                onClick={handleReset}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl transition cursor-pointer text-center text-xs"
              >
                Reset Canvas
              </button>
            </div>

            {/* Realtime compilation log outputs */}
            <div className="border-t border-slate-100 dark:border-slate-950 pt-4">
              <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2 font-mono">LAB DIAGNOSTICS</span>
              <div className="p-4 bg-slate-950 rounded-2xl font-mono text-[10px] text-slate-400 leading-normal min-h-24 border border-slate-900">
                {isSimulating && !simError && !simSuccess && (
                  <span className="text-blue-400 animate-pulse">⚙️ Compiling digital Blink sketch...<br />Evaluating electrical node paths...</span>
                )}
                {!isSimulating && connections.length === 0 && (
                  <span className="text-slate-600">🔌 No connections drawn yet. Select Pin D13 on Arduino board, and click Terminal A10 on breadboard to begin wire link.</span>
                )}
                {!isSimulating && connections.length > 0 && !simSuccess && !simError && (
                  <span className="text-slate-400">⚡ Nodes mapped correctly. Click [Run Simulation] to compile microcode.</span>
                )}
                {simError && (
                  <span className="text-red-500 flex gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {simError}
                  </span>
                )}
                {simSuccess && (
                  <span className="text-emerald-400 flex gap-1.5 flex-col">
                    <div className="flex gap-1.5 items-center">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <strong>CONGRATULATIONS!</strong>
                    </div>
                    <span>Circuit complete! Current is looping through Pin D13 &rarr; Red LED Anode &rarr; ground return GND. LED is successfully blinking.<br />🎉 +100 XP & +20 Gems claimed!</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-950 pt-4 mt-6">
            <h4 className="font-bold text-xs">Sandbox Challenge:</h4>
            <p className="text-[11px] text-slate-400 leading-normal mt-1">
              Connect <strong>Pin D13</strong> (active pulse) to <strong>A10</strong> (LED Anode), and <strong>GND</strong> to <strong>A9</strong> (LED Cathode) to complete the blinking program correctly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
