import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  ShieldAlert,
  Cpu,
  Lock,
  Zap,
  Terminal,
  Activity,
  Search,
  Key
} from 'lucide-react';

type GameState = 'IDLE' | 'PLAYING' | 'WON' | 'LOST';

interface GameProps {
  onWin: () => void;
  onLose: () => void;
}

// 1. Bit Flip: Match target decimal
const BitFlip = ({ onWin }: GameProps) => {
  const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [target, setTarget] = useState(0);

  useEffect(() => {
    setTarget(Math.floor(Math.random() * 255) + 1);
  }, []);

  const currentVal = bits.reduce((acc, bit, i) => acc + (bit * Math.pow(2, 7 - i)), 0);

  useEffect(() => {
    if (currentVal === target && target !== 0) {
      setTimeout(onWin, 500);
    }
  }, [currentVal, target, onWin]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Target_Decimal</p>
        <p className="text-3xl font-display font-bold text-cyber-green">{target}</p>
      </div>
      <div className="flex gap-2">
        {bits.map((bit, i) => (
          <button
            key={i}
            onClick={() => {
              const newBits = [...bits];
              newBits[i] = bit === 0 ? 1 : 0;
              setBits(newBits);
            }}
            className={`w-8 h-12 border flex items-center justify-center font-mono text-lg transition-all ${
              bit === 1 
                ? 'bg-cyber-green/20 border-cyber-green text-cyber-green shadow-[0_0_10px_rgba(0,255,157,0.3)]' 
                : 'bg-white/5 border-white/10 text-white/20'
            }`}
          >
            {bit}
          </button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Current_Value</p>
        <p className={`text-xl font-mono ${currentVal === target ? 'text-cyber-green' : 'text-cyber-blue'}`}>{currentVal}</p>
      </div>
    </div>
  );
};

// 2. Pattern Lock: Repeat sequence
const PatternLock = ({ onWin, onLose }: GameProps) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const newSeq = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9));
    setSequence(newSeq);
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < newSeq.length) {
        setActiveIndex(newSeq[i]);
        setTimeout(() => setActiveIndex(null), 400);
        i++;
      } else {
        clearInterval(interval);
        setIsShowing(false);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleInput = (idx: number) => {
    if (isShowing) return;
    const nextInput = [...userInput, idx];
    setUserInput(nextInput);

    if (nextInput[nextInput.length - 1] !== sequence[nextInput.length - 1]) {
      onLose();
      return;
    }

    if (nextInput.length === sequence.length) {
      onWin();
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <button
          key={i}
          onClick={() => handleInput(i)}
          className={`w-12 h-12 border flex items-center justify-center rounded-sm transition-all ${
            activeIndex === i || userInput.includes(i) && sequence[userInput.indexOf(i)] === i
              ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
              : 'bg-white/5 border-white/10 text-white/20'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${activeIndex === i ? 'bg-cyber-green animate-ping' : 'bg-current'}`}></div>
        </button>
      ))}
    </div>
  );
};

// 3. Memory Leak: Match pairs
const MemoryLeak = ({ onWin }: GameProps) => {
  const icons = [ShieldAlert, Lock, Zap, Terminal, Activity, Search, Key, Cpu];
  const [cards, setCards] = useState<{ id: number; icon: any; flipped: boolean; matched: boolean }[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }));
    setCards(deck);
  }, []);

  const handleFlip = (idx: number) => {
    if (selected.length === 2 || cards[idx].flipped || cards[idx].matched) return;

    const newCards = [...cards];
    newCards[idx].flipped = true;
    setCards(newCards);

    const newSelected = [...selected, idx];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (cards[first].icon === cards[second].icon) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setSelected([]);
        if (newCards.every(c => c.matched)) onWin();
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setSelected([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {cards.map((card, i) => (
        <button
          key={i}
          onClick={() => handleFlip(i)}
          className={`w-10 h-10 border flex items-center justify-center rounded-sm transition-all duration-500 ${
            card.flipped || card.matched
              ? 'bg-cyber-green/10 border-cyber-green/50 text-cyber-green rotate-y-180'
              : 'bg-white/5 border-white/10 text-transparent'
          }`}
        >
          <card.icon size={16} />
        </button>
      ))}
    </div>
  );
};

// 4. Firewall Breach: Click packets
const Firewall = ({ onWin, onLose }: GameProps) => {
  const [packets, setPackets] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPackets(prev => [
        ...prev,
        { id: Date.now(), x: Math.random() * 80 + 10, y: -10 }
      ]);
    }, 1000);

    const moveInterval = setInterval(() => {
      setPackets(prev => {
        const next = prev.map(p => ({ ...p, y: p.y + 2 }));
        if (next.some(p => p.y > 100)) {
          onLose();
          return [];
        }
        return next;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(moveInterval);
    };
  }, [onLose]);

  const removePacket = (id: number) => {
    setPackets(prev => prev.filter(p => p.id !== id));
    setScore(s => {
      if (s + 1 >= 10) onWin();
      return s + 1;
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-48 bg-black/20 border border-white/5 overflow-hidden">
      <div className="absolute top-2 right-2 text-[10px] font-mono text-cyber-green">Blocked: {score}/10</div>
      {packets.map(p => (
        <button
          key={p.id}
          onClick={() => removePacket(p.id)}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          className="absolute w-4 h-4 bg-red-500/50 border border-red-500 rounded-full animate-pulse flex items-center justify-center"
        >
          <ShieldAlert size={8} className="text-white" />
        </button>
      ))}
      <div className="absolute bottom-0 w-full h-1 bg-cyber-green/20"></div>
    </div>
  );
};

// 5. Hash Match
const HashMatch = ({ onWin, onLose }: GameProps) => {
  const hashes = ['0x7F4A', '0x92B1', '0xC3E5', '0xD7F8', '0xA0B2', '0xC4D6', '0xE8F0', '0xA2B4'];
  const [target, setTarget] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const t = hashes[Math.floor(Math.random() * hashes.length)];
    setTarget(t);
    setOptions([...hashes].sort(() => Math.random() - 0.5).slice(0, 4));
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-4 bg-white/5 border border-white/10 rounded-sm font-mono text-cyber-blue">
        Source_Hash: <span className="text-white">{target}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => opt === target ? onWin() : onLose()}
            className="p-3 border border-white/10 hover:border-cyber-green/50 hover:bg-cyber-green/5 font-mono text-xs transition-all"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// 6. Port Scan
const PortScan = ({ onWin }: GameProps) => {
  const [ports, setPorts] = useState<number[]>([]);
  const [openPort, setOpenPort] = useState(-1);

  useEffect(() => {
    setPorts(Array.from({ length: 16 }, (_, i) => 80 + i));
    setOpenPort(Math.floor(Math.random() * 16));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2">
      {ports.map((port, i) => (
        <button
          key={port}
          onClick={() => i === openPort && onWin()}
          className={`p-2 border font-mono text-[10px] transition-all ${
            i === openPort 
              ? 'border-cyber-green/50 text-cyber-green animate-pulse' 
              : 'border-white/5 text-white/20'
          }`}
        >
          {port}
        </button>
      ))}
    </div>
  );
};

// 7. Logic Bomb
const LogicBomb = ({ onWin, onLose }: GameProps) => {
  const [problem, setProblem] = useState({ a: 0, b: 0, res: 0 });
  const [input, setInput] = useState('');

  useEffect(() => {
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);
    setProblem({ a, b, res: a + b });
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-mono text-cyber-blue">
        {problem.a} + [ ? ] = {problem.res}
      </div>
      <input
        type="number"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (parseInt(e.target.value) === problem.res - problem.a) onWin();
        }}
        className="w-20 bg-white/5 border border-white/10 p-2 text-center font-mono outline-none focus:border-cyber-green"
      />
    </div>
  );
};

// 8. Hex Decoder
const HexDecoder = ({ onWin }: GameProps) => {
  const [hex, setHex] = useState('');
  const [target, setTarget] = useState(0);
  const [input, setInput] = useState('');

  useEffect(() => {
    const val = Math.floor(Math.random() * 255);
    setTarget(val);
    setHex(val.toString(16).toUpperCase());
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl font-display font-bold text-cyber-blue">0x{hex}</div>
      <p className="text-[10px] font-mono text-white/40 uppercase">Convert_to_Decimal</p>
      <input
        type="number"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (parseInt(e.target.value) === target) onWin();
        }}
        className="w-24 bg-white/5 border border-white/10 p-2 text-center font-mono outline-none focus:border-cyber-green"
      />
    </div>
  );
};

// 9. Signal Intercept
const SignalIntercept = ({ onWin, onLose }: GameProps) => {
  const [pos, setPos] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos(p => {
        if (p >= 100) setDir(-1);
        if (p <= 0) setDir(1);
        return p + (dir * 2);
      });
    }, 20);
    return () => clearInterval(interval);
  }, [dir]);

  const handleIntercept = () => {
    if (pos >= 45 && pos <= 55) onWin();
    else onLose();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="relative w-full h-8 bg-white/5 border border-white/10 rounded-full overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 w-[10%] h-full bg-cyber-green/20 border-x border-cyber-green/50"></div>
        <motion.div 
          style={{ left: `${pos}%` }}
          className="absolute top-0 w-1 h-full bg-cyber-green shadow-[0_0_10px_#00ff9d]"
        ></motion.div>
      </div>
      <button onClick={handleIntercept} className="btn-cyber !py-2 px-8">INTERCEPT</button>
    </div>
  );
};

// 10. Cipher Break
const CipherBreak = ({ onWin }: GameProps) => {
  const words = ['KEY', 'NET', 'SEC', 'BOT', 'VPN', 'WEB'];
  const [target, setTarget] = useState('');
  const [cipher, setCipher] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const w = words[Math.floor(Math.random() * words.length)];
    setTarget(w);
    setCipher(w.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 1)).join(''));
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl font-display font-bold text-cyber-blue tracking-widest">{cipher}</div>
      <p className="text-[10px] font-mono text-white/40 uppercase">Shift_Key: -1</p>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          const val = e.target.value.toUpperCase();
          setInput(val);
          if (val === target) onWin();
        }}
        className="w-32 bg-white/5 border border-white/10 p-2 text-center font-mono outline-none focus:border-cyber-green uppercase"
      />
    </div>
  );
};

export const CyberConsole = () => {
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [completedGames, setCompletedGames] = useState<number[]>([]);

  const games = [
    { title: 'Bit_Flip', icon: Cpu, component: BitFlip },
    { title: 'Pattern_Lock', icon: Lock, component: PatternLock },
    { title: 'Memory_Leak', icon: Activity, component: MemoryLeak },
    { title: 'Firewall', icon: ShieldAlert, component: Firewall },
    { title: 'Hash_Match', icon: Search, component: HashMatch },
    { title: 'Port_Scan', icon: Terminal, component: PortScan },
    { title: 'Logic_Bomb', icon: Zap, component: LogicBomb },
    { title: 'Hex_Decoder', icon: Cpu, component: HexDecoder },
    { title: 'Signal_Intercept', icon: Activity, component: SignalIntercept },
    { title: 'Cipher_Break', icon: Key, component: CipherBreak },
  ];

  const handleWin = useCallback(() => {
    setGameState('WON');
    if (activeGame !== null && !completedGames.includes(activeGame)) {
      setCompletedGames(prev => prev.includes(activeGame!) ? prev : [...prev, activeGame!]);
    }
  }, [activeGame, completedGames]);

  const handleLose = useCallback(() => {
    setGameState('LOST');
  }, []);

  const reset = () => {
    setGameState('IDLE');
    setActiveGame(null);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-cyber-dark border border-white/10 rounded-sm overflow-hidden shadow-2xl relative">
      {/* Console Header */}
      <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gamepad2 className="text-cyber-green" size={18} />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">Cyber_Console_v1.0</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
          <div className="w-2 h-2 rounded-full bg-cyber-green shadow-[0_0_5px_#00ff9d]"></div>
        </div>
      </div>

      {/* Screen Area */}
      <div className="p-8 min-h-[300px] flex flex-col items-center justify-center relative bg-black/40">
        <AnimatePresence mode="wait">
          {gameState === 'IDLE' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full grid grid-cols-2 gap-3"
            >
              {games.map((game, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveGame(i);
                    setGameState('PLAYING');
                  }}
                  className={`p-4 border flex flex-col items-center gap-2 transition-all group ${
                    completedGames.includes(i)
                      ? 'border-cyber-green/30 bg-cyber-green/5 text-cyber-green'
                      : 'border-white/5 hover:border-white/20 text-white/40 hover:text-white'
                  }`}
                >
                  <game.icon size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-mono uppercase tracking-widest">{game.title}</span>
                  {completedGames.includes(i) && <CheckCircle2 size={10} className="absolute top-1 right-1" />}
                </button>
              ))}
            </motion.div>
          )}

          {gameState === 'PLAYING' && activeGame !== null && (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full flex flex-col items-center"
            >
              <div className="mb-8 text-center">
                <h3 className="text-[10px] font-mono text-cyber-green uppercase tracking-[0.4em] mb-2">
                  {games[activeGame].title}
                </h3>
                <div className="h-px w-12 bg-cyber-green/30 mx-auto"></div>
              </div>
              
              {React.createElement(games[activeGame].component, {
                onWin: handleWin,
                onLose: handleLose
              })}
            </motion.div>
          )}

          {gameState === 'WON' && (
            <motion.div 
              key="win"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mb-2">
                <Trophy className="text-cyber-green" size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-cyber-green uppercase italic">Access_Granted</h3>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Security_Protocol_Bypassed</p>
              <button onClick={reset} className="btn-cyber mt-4 !py-2 px-8">CONTINUE</button>
            </motion.div>
          )}

          {gameState === 'LOST' && (
            <motion.div 
              key="lost"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-2">
                <ShieldAlert className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-red-500 uppercase italic">Breach_Failed</h3>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">System_Lockdown_Initiated</p>
              <button onClick={reset} className="btn-cyber mt-4 !py-2 px-8 !border-red-500/50 !text-red-500 hover:!bg-red-500/10">RETRY</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Console Footer */}
      <div className="bg-white/5 p-4 border-t border-white/10 flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Progress</span>
            <span className="text-[10px] font-mono text-cyber-green">{completedGames.length}/10</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Rank</span>
            <span className="text-[10px] font-mono text-cyber-blue">
              {completedGames.length === 10 ? 'ELITE_HACKER' : completedGames.length > 5 ? 'OPERATIVE' : 'NOVICE'}
            </span>
          </div>
        </div>
        <button 
          onClick={reset}
          className="p-2 text-white/20 hover:text-cyber-green transition-colors"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Decorative scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20"></div>
    </div>
  );
};
