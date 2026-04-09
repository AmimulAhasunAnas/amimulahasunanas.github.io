import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  RotateCcw, 
  Play, 
  Trophy, 
  ChevronLeft, 
  ChevronRight,
  Hash,
  Brain,
  Zap,
  Lock,
  Binary,
  Grid,
  Type,
  Cpu,
  MousePointer2,
  Shield,
  Network,
  Database,
  Globe,
  Server,
  Key
} from 'lucide-react';

type GameType = 
  | 'memory' 
  | 'slide' 
  | 'pattern' 
  | 'math' 
  | 'code' 
  | 'scramble' 
  | 'cipher' 
  | 'path' 
  | 'logic' 
  | 'binary';

const GAMES: { id: GameType; name: string; icon: any; description: string }[] = [
  { id: 'memory', name: 'Memory_Match', icon: Brain, description: 'Find matching security pairs' },
  { id: 'slide', name: 'Number_Slide', icon: Hash, description: 'Order the encrypted fragments' },
  { id: 'pattern', name: 'Pattern_Recall', icon: Zap, description: 'Repeat the access sequence' },
  { id: 'math', name: 'Quick_Math', icon: Cpu, description: 'Solve the decryption keys' },
  { id: 'code', name: 'Code_Breaker', icon: Lock, description: 'Guess the 4-digit master key' },
  { id: 'scramble', name: 'Word_Scramble', icon: Type, description: 'Unscramble security terms' },
  { id: 'cipher', name: 'Cipher_Decode', icon: Key, description: 'Decrypt the Caesar shift' },
  { id: 'path', name: 'Grid_Path', icon: Grid, description: 'Navigate through the firewall' },
  { id: 'logic', name: 'Logic_Gate', icon: Binary, description: 'Solve the logic circuit' },
  { id: 'binary', name: 'Binary_Shift', icon: Binary, description: 'Convert decimal to binary' },
];

export const GameConsole = () => {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState<Record<string, number>>({});
  const [booting, setBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);

  useEffect(() => {
    const logs = [
      "Initializing Game_Engine_v4.2...",
      "Loading asset_manifest.json...",
      "Verifying security_puzzles...",
      "Establishing neural_link...",
      "System Ready."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setBootLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 500);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleGameEnd = (finalScore: number) => {
    if (activeGame) {
      setHighScores(prev => ({
        ...prev,
        [activeGame]: Math.max(prev[activeGame] || 0, finalScore)
      }));
    }
    setScore(finalScore);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-cyber-dark/60 border border-white/5 rounded-sm overflow-hidden backdrop-blur-xl">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <Gamepad2 className="text-cyber-green" size={20} />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">System_Entertainment_Module</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono text-white/20 uppercase">Current_Score:</span>
            <span className="text-xs font-mono text-cyber-green">{score}</span>
          </div>
          {activeGame && (
            <button 
              onClick={() => setActiveGame(null)}
              className="text-[10px] font-mono uppercase text-white/40 hover:text-white transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={14} /> Back_to_Menu
            </button>
          )}
        </div>
      </div>

      <div className="p-8 min-h-[400px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {booting ? (
            <motion.div 
              key="boot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md font-mono text-[10px] space-y-2 text-cyber-green/60"
            >
              {bootLogs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-white/20">[{new Date().toLocaleTimeString()}]</span>
                  <span>{log}</span>
                </div>
              ))}
              <div className="w-full h-1 bg-white/5 mt-8 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-cyber-green"
                />
              </div>
            </motion.div>
          ) : !activeGame ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full"
            >
              {GAMES.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className="group p-4 bg-white/[0.02] border border-white/5 rounded-sm hover:border-cyber-green/30 hover:bg-cyber-green/5 transition-all flex flex-col items-center text-center gap-3"
                >
                  <game.icon className="text-white/40 group-hover:text-cyber-green transition-colors" size={24} />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 group-hover:text-white">{game.name}</span>
                    <span className="text-[8px] font-mono text-white/20 group-hover:text-white/40">{game.description}</span>
                  </div>
                  {highScores[game.id] !== undefined && (
                    <div className="mt-auto pt-2 flex items-center gap-1">
                      <Trophy size={10} className="text-yellow-500/50" />
                      <span className="text-[8px] font-mono text-yellow-500/50">{highScores[game.id]}</span>
                    </div>
                  )}
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key={activeGame}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-full flex flex-col items-center"
            >
              <GameRenderer type={activeGame} onEnd={handleGameEnd} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const GameRenderer = ({ type, onEnd }: { type: GameType; onEnd: (score: number) => void }) => {
  switch (type) {
    case 'memory': return <MemoryGame onEnd={onEnd} />;
    case 'slide': return <SlideGame onEnd={onEnd} />;
    case 'pattern': return <PatternGame onEnd={onEnd} />;
    case 'math': return <MathGame onEnd={onEnd} />;
    case 'code': return <CodeGame onEnd={onEnd} />;
    case 'scramble': return <ScrambleGame onEnd={onEnd} />;
    case 'cipher': return <CipherGame onEnd={onEnd} />;
    case 'path': return <PathGame onEnd={onEnd} />;
    case 'logic': return <LogicGame onEnd={onEnd} />;
    case 'binary': return <BinaryGame onEnd={onEnd} />;
    default: return null;
  }
};

// 1. Memory Match
const MemoryGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const icons = [Shield, Lock, Cpu, Network, Database, Zap, Globe, Server];
  const [cards, setCards] = useState<{ id: number; icon: any; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const initialCards = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }));
    setCards(initialCards);
  }, []);

  const handleFlip = (id: number) => {
    if (flipped.length === 2 || cards[id].flipped || cards[id].matched) return;
    
    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setFlipped([]);
          if (matchedCards.every(c => c.matched)) onEnd(Math.max(0, 100 - moves * 5));
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(card => (
        <button
          key={card.id}
          onClick={() => handleFlip(card.id)}
          className={`w-16 h-16 rounded-sm border transition-all flex items-center justify-center ${
            card.flipped || card.matched 
              ? 'bg-cyber-green/20 border-cyber-green text-cyber-green' 
              : 'bg-white/[0.02] border-white/10 text-transparent'
          }`}
        >
          <card.icon size={24} />
        </button>
      ))}
    </div>
  );
};

// 2. Number Slide
const SlideGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const [grid, setGrid] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 0].sort(() => Math.random() - 0.5);
    setGrid(nums);
  }, []);

  const move = (idx: number) => {
    const emptyIdx = grid.indexOf(0);
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const emptyRow = Math.floor(emptyIdx / 3);
    const emptyCol = emptyIdx % 3;

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      const newGrid = [...grid];
      [newGrid[idx], newGrid[emptyIdx]] = [newGrid[emptyIdx], newGrid[idx]];
      setGrid(newGrid);
      setMoves(m => m + 1);
      if (newGrid.slice(0, 8).every((n, i) => n === i + 1)) onEnd(Math.max(0, 200 - moves * 2));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {grid.map((num, i) => (
        <button
          key={i}
          onClick={() => move(i)}
          className={`w-16 h-16 flex items-center justify-center font-mono text-xl border ${
            num === 0 ? 'bg-transparent border-transparent' : 'bg-white/[0.05] border-white/10 hover:border-cyber-green/50'
          }`}
        >
          {num !== 0 && num}
        </button>
      ))}
    </div>
  );
};

// 3. Pattern Recall
const PatternGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextRound = useCallback(() => {
    const next = Math.floor(Math.random() * 4);
    const newPattern = [...pattern, next];
    setPattern(newPattern);
    setUserPattern([]);
    playPattern(newPattern);
  }, [pattern]);

  const playPattern = async (p: number[]) => {
    setIsPlaying(true);
    for (const idx of p) {
      setActive(idx);
      await new Promise(r => setTimeout(r, 500));
      setActive(null);
      await new Promise(r => setTimeout(r, 200));
    }
    setIsPlaying(false);
  };

  const handleClick = (idx: number) => {
    if (isPlaying) return;
    const nextUserPattern = [...userPattern, idx];
    setUserPattern(nextUserPattern);
    
    if (idx !== pattern[nextUserPattern.length - 1]) {
      onEnd(pattern.length * 10);
      return;
    }

    if (nextUserPattern.length === pattern.length) {
      setTimeout(nextRound, 500);
    }
  };

  useEffect(() => {
    nextRound();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {[0, 1, 2, 3].map(i => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`w-24 h-24 border-2 transition-all ${
            active === i ? 'bg-cyber-green border-cyber-green scale-95' : 'bg-white/[0.02] border-white/10'
          }`}
        />
      ))}
    </div>
  );
};

// 4. Quick Math
const MathGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const [problem, setProblem] = useState({ a: 0, b: 0, op: '+', ans: 0 });
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentScore, setCurrentScore] = useState(0);

  const generate = useCallback(() => {
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let ans = 0;
    if (op === '+') ans = a + b;
    if (op === '-') ans = a - b;
    if (op === '*') ans = a * b;
    setProblem({ a, b, op, ans });
  }, []);

  useEffect(() => {
    generate();
    const timer = setInterval(() => setTimeLeft(t => {
      if (t <= 1) {
        clearInterval(timer);
        onEnd(currentScore);
      }
      return t - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [generate, onEnd, currentScore]);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(input) === problem.ans) {
      setCurrentScore(s => s + 10);
      setInput('');
      generate();
    } else {
      onEnd(currentScore);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-4xl font-mono">{problem.a} {problem.op} {problem.b} = ?</div>
      <form onSubmit={check}>
        <input
          autoFocus
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="bg-white/[0.05] border border-white/10 p-4 text-center text-2xl font-mono outline-none focus:border-cyber-green"
        />
      </form>
      <div className="text-cyber-green font-mono">Time: {timeLeft}s</div>
    </div>
  );
};

// 5. Code Breaker
const CodeGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const [target, setTarget] = useState('');
  const [guesses, setGuesses] = useState<{ code: string; result: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setTarget(Math.floor(1000 + Math.random() * 9000).toString());
  }, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length !== 4) return;
    
    let bulls = 0;
    let cows = 0;
    const tArr = target.split('');
    const iArr = input.split('');

    iArr.forEach((char, i) => {
      if (char === tArr[i]) {
        bulls++;
        tArr[i] = 'X';
        iArr[i] = 'Y';
      }
    });

    iArr.forEach((char, i) => {
      const idx = tArr.indexOf(char);
      if (idx !== -1) {
        cows++;
        tArr[idx] = 'X';
      }
    });

    const result = `${bulls}B ${cows}C`;
    setGuesses([{ code: input, result }, ...guesses]);
    setInput('');

    if (bulls === 4) onEnd(Math.max(0, 500 - guesses.length * 50));
    if (guesses.length >= 9) onEnd(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form onSubmit={check}>
        <input
          maxLength={4}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="bg-white/[0.05] border border-white/10 p-2 text-center text-xl font-mono outline-none focus:border-cyber-green"
          placeholder="4 DIGITS"
        />
      </form>
      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto w-full">
        {guesses.map((g, i) => (
          <div key={i} className="text-xs font-mono flex justify-between p-2 bg-white/[0.02]">
            <span>{g.code}</span>
            <span className="text-cyber-green">{g.result}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. Word Scramble
const ScrambleGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const words = ['FIREWALL', 'ENCRYPTION', 'MALWARE', 'PHISHING', 'NETWORK', 'SECURITY', 'DATABASE', 'TERMINAL'];
  const [word, setWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const w = words[Math.floor(Math.random() * words.length)];
    setWord(w);
    setScrambled(w.split('').sort(() => Math.random() - 0.5).join(''));
  }, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toUpperCase() === word) onEnd(100);
    else onEnd(0);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-3xl font-mono tracking-widest text-cyber-green">{scrambled}</div>
      <form onSubmit={check}>
        <input
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          className="bg-white/[0.05] border border-white/10 p-4 text-center text-xl font-mono outline-none focus:border-cyber-green"
        />
      </form>
    </div>
  );
};

// 7. Cipher Decode
const CipherGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const words = ['SECURITY', 'HACKER', 'FIREWALL', 'ENCRYPT', 'DECRYPT', 'PHISHING', 'MALWARE', 'NETWORK'];
  const [target, setTarget] = useState('');
  const [ciphered, setCiphered] = useState('');
  const [shift, setShift] = useState(0);
  const [input, setInput] = useState('');

  useEffect(() => {
    const w = words[Math.floor(Math.random() * words.length)];
    const s = Math.floor(Math.random() * 5) + 1;
    setTarget(w);
    setShift(s);
    setCiphered(w.split('').map(char => 
      String.fromCharCode(((char.charCodeAt(0) - 65 + s) % 26) + 65)
    ).join(''));
  }, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toUpperCase() === target) onEnd(150);
    else onEnd(0);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-xs font-mono text-white/40">Shift: {shift} (A {'->'} {String.fromCharCode(65 + shift)})</div>
      <div className="text-3xl font-mono tracking-widest text-cyber-green">{ciphered}</div>
      <form onSubmit={check}>
        <input
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          className="bg-white/[0.05] border border-white/10 p-4 text-center text-xl font-mono outline-none focus:border-cyber-green"
          placeholder="DECRYPT..."
        />
      </form>
    </div>
  );
};

// 8. Grid Path
const PathGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [grid, setGrid] = useState<number[][]>([]);
  const size = 5;

  useEffect(() => {
    const newGrid = Array(size).fill(0).map(() => Array(size).fill(0).map(() => Math.random() > 0.7 ? 1 : 0));
    newGrid[0][0] = 0;
    newGrid[size-1][size-1] = 0;
    setGrid(newGrid);
  }, []);

  const move = (dx: number, dy: number) => {
    const nx = pos.x + dx;
    const ny = pos.y + dy;
    if (nx >= 0 && nx < size && ny >= 0 && ny < size && grid[ny][nx] === 0) {
      setPos({ x: nx, y: ny });
      if (nx === size - 1 && ny === size - 1) onEnd(200);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-5 gap-1">
        {grid.map((row, y) => row.map((cell, x) => (
          <div key={`${x}-${y}`} className={`w-10 h-10 border ${
            pos.x === x && pos.y === y ? 'bg-cyber-green' : cell === 1 ? 'bg-red-500/20' : 'bg-white/[0.02]'
          }`} />
        )))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div /> <button onClick={() => move(0, -1)} className="p-2 border border-white/10">↑</button> <div />
        <button onClick={() => move(-1, 0)} className="p-2 border border-white/10">←</button>
        <button onClick={() => move(0, 1)} className="p-2 border border-white/10">↓</button>
        <button onClick={() => move(1, 0)} className="p-2 border border-white/10">→</button>
      </div>
    </div>
  );
};

// 9. Logic Gate
const LogicGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const [gate, setGate] = useState({ type: 'AND', a: 0, b: 0, ans: 0 });

  useEffect(() => {
    const types = ['AND', 'OR', 'XOR'];
    const type = types[Math.floor(Math.random() * types.length)];
    const a = Math.random() > 0.5 ? 1 : 0;
    const b = Math.random() > 0.5 ? 1 : 0;
    let ans = 0;
    if (type === 'AND') ans = a && b;
    if (type === 'OR') ans = a || b;
    if (type === 'XOR') ans = a ^ b;
    setGate({ type, a, b, ans });
  }, []);

  const check = (val: number) => {
    if (val === gate.ans) onEnd(50);
    else onEnd(0);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-8 text-2xl font-mono">
        <div className="flex flex-col gap-2">
          <div className="p-2 border border-white/10">{gate.a}</div>
          <div className="p-2 border border-white/10">{gate.b}</div>
        </div>
        <div className="px-6 py-4 border-2 border-cyber-green rounded-full">{gate.type}</div>
        <div className="text-4xl">?</div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => check(0)} className="px-8 py-4 border border-white/10 hover:border-cyber-green font-mono">0</button>
        <button onClick={() => check(1)} className="px-8 py-4 border border-white/10 hover:border-cyber-green font-mono">1</button>
      </div>
    </div>
  );
};

// 10. Binary Shift
const BinaryGame = ({ onEnd }: { onEnd: (score: number) => void }) => {
  const [num, setNum] = useState(0);
  const [input, setInput] = useState('');

  useEffect(() => {
    setNum(Math.floor(Math.random() * 31));
  }, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === num.toString(2)) onEnd(150);
    else onEnd(0);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-sm font-mono text-white/40">Convert to Binary:</div>
      <div className="text-6xl font-mono text-cyber-green">{num}</div>
      <form onSubmit={check}>
        <input
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          className="bg-white/[0.05] border border-white/10 p-4 text-center text-2xl font-mono outline-none focus:border-cyber-green"
          placeholder="0101..."
        />
      </form>
    </div>
  );
};
