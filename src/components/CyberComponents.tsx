import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, ChevronRight } from 'lucide-react';

export const MatrixBackground = ({ color = '#00ff9d' }: { color?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\';
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    // Helper to convert hex to rgb
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 255, b: 157 };
    };

    let frameId: number;
    let lastTime = 0;
    const fps = 30; // Reverting to 30 FPS for classic feel
    const interval = 1000 / fps;

    const draw = (timestamp: number) => {
      frameId = requestAnimationFrame(draw);

      const delta = timestamp - lastTime;
      if (delta < interval) return;
      lastTime = timestamp - (delta % interval);

      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)'; // Slightly darker trail
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono"`;

      const rgb = hexToRgb(colorRef.current);

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Main character
        const opacity = Math.random() * 0.5 + 0.3;
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        ctx.fillText(text, x, y);

        // Glowing head (brighter character at the bottom of the drop)
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
          ctx.fillText(text, x, y);
          ctx.shadowBlur = 0; // Reset shadow
        }

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    frameId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      // Preserve existing drops if possible, or reset
      const oldDrops = [...drops];
      drops.length = newColumns;
      for (let i = 0; i < newColumns; i++) {
        drops[i] = oldDrops[i] || 1;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-60 z-[-1]"
    />
  );
};

interface TerminalProps {
  onClose?: () => void;
}

export const InteractiveTerminal = ({ onClose }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string | React.ReactNode }[]>([
    { type: 'output', content: 'ANAS.SEC [Version 2.0.4]' },
    { type: 'output', content: 'Secure connection established. Type "help" for available commands.' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    const newHistory = [...history, { type: 'input' as const, content: cmd }];

    let output: string | React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        output = 'Available commands: about, skills, experience, projects, clear, exit, whoami';
        break;
      case 'whoami':
        output = 'User: Guest_Analyst | Permissions: Read-Only | Location: Remote_Node';
        break;
      case 'about':
        output = 'MD. AMIMUL AHASUN ANAS - Cyber Security Analyst. Specialized in SIEM, EDR, and Threat Hunting.';
        break;
      case 'skills':
        output = 'SIEM (QRadar, Splunk), EDR (Wazuh, SentinelOne), VAPT, Threat Hunting, Network Security.';
        break;
      case 'projects':
        output = 'Recent Ops: Pubali Bank SIEM, Berger Splunk Deployment, Prime Bank SOAR Implementation.';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        if (onClose) onClose();
        return;
      case '':
        break;
      default:
        output = `Command not found: ${cleanCmd}. Type "help" for assistance.`;
    }

    if (output) {
      setHistory([...newHistory, { type: 'output', content: output }]);
    } else {
      setHistory(newHistory);
    }
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="terminal-window w-full max-w-2xl h-[400px] flex flex-col font-mono text-sm"
    >
      <div className="terminal-header">
        <div className="flex gap-1.5">
          <div className="terminal-dot bg-red-500/50"></div>
          <div className="terminal-dot bg-yellow-500/50"></div>
          <div className="terminal-dot bg-green-500/50"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-[10px] text-white/30 uppercase tracking-widest flex items-center justify-center gap-2">
            <TerminalIcon size={12} />
            Secure_Terminal_v2.0
          </span>
        </div>
        <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto space-y-2 custom-scrollbar bg-black/40"
      >
        {history.map((item, i) => (
          <div key={i} className={item.type === 'input' ? 'text-white' : 'text-cyber-green'}>
            {item.type === 'input' && <span className="text-cyber-blue mr-2">guest@anas.sec:~$</span>}
            {item.content}
          </div>
        ))}
        <div className="flex items-center text-white">
          <span className="text-cyber-blue mr-2">guest@anas.sec:~$</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
            className="bg-transparent border-none outline-none flex-1 text-white"
          />
        </div>
      </div>
    </motion.div>
  );
};

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      style={{ 
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className={`w-full h-full border border-cyber-green transition-all duration-300 ${isHovering ? 'scale-150 rotate-45 bg-cyber-green/20' : 'scale-100 rotate-0'}`}>
        <div className="absolute top-0 left-0 w-1 h-1 bg-cyber-green"></div>
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyber-green"></div>
      </div>
    </div>
  );
};
