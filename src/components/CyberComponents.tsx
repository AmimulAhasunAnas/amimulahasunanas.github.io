import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, ChevronRight } from 'lucide-react';

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef('#00ff9d');
  const colors = ['#00ff9d', '#00d4ff', '#ff0055', '#ffcc00', '#9d00ff'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono"`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Add varying opacity for depth - increased for better visibility
        const opacity = Math.random() * 0.4 + 0.6;
        
        // Parse hex to RGB for opacity support
        const hex = colorRef.current;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 20);
    
    // Color change interval
    let colorIndex = 0;
    const colorInterval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      colorRef.current = colors[colorIndex];
    }, 5000);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      drops.length = newColumns;
      drops.fill(1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40 z-0"
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
