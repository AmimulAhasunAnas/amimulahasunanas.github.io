import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { 
  Shield, 
  Lock, 
  Terminal as TerminalIcon, 
  Cpu, 
  Network, 
  Search, 
  AlertTriangle, 
  Database,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Activity,
  Zap,
  Globe,
  Server,
  Eye,
  Download,
  Command
} from "lucide-react";
import { PERSONAL_INFO, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATIONS, PROJECTS } from "../constants";
import { MatrixBackground, InteractiveTerminal, CustomCursor } from "./CyberComponents";

const SectionHeader = ({ title, subtitle, number }: { title: string; subtitle?: string; number?: string }) => (
  <div className="mb-16 relative">
    <div className="flex items-center gap-4 mb-4">
      {number && <span className="text-cyber-green font-mono text-sm opacity-50">{number}</span>}
      <div className="h-px flex-1 bg-white/10"></div>
      <span className="micro-label">{subtitle || "Module_01"}</span>
    </div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-cyber-dark/80 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center rounded-sm group-hover:border-cyber-green/50 transition-colors">
              <Shield className="text-cyber-green w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tighter text-white leading-none text-lg">ANAS<span className="text-cyber-green">.</span>SEC</span>
            <span className="text-[7px] font-mono text-white/40 uppercase tracking-[0.4em] mt-1">Security_Node_v2.4</span>
          </div>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-12">
          {["About", "Skills", "Experience", "Projects", "Contact"].map((item, i) => (
            <motion.a 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 hover:text-cyber-green transition-all duration-300 relative group"
            >
              <span className="text-cyber-green/30 mr-2">0{i+1}</span>
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-green transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(0,255,157,0.5)]"></span>
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-sm">
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-1 h-3 rounded-full ${i === 3 ? 'bg-white/10' : 'bg-cyber-green/40'}`}></div>
              ))}
            </div>
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">Signal: Stable</span>
          </div>
          <a 
            href={PERSONAL_INFO.cvUrl} 
            download="MD_AMIMUL_AHASUN_ANAS_CV.pdf"
            className="hidden md:flex items-center gap-2 px-5 py-2 border border-cyber-green/30 text-cyber-green text-[9px] font-mono uppercase tracking-widest hover:bg-cyber-green hover:text-cyber-dark transition-all rounded-sm"
          >
            <Download size={12} />
            CV_DL
          </a>
          <a href="#contact" className="btn-cyber !py-2 !px-5 !text-[9px]">
            <Zap size={14} />
            Connect
          </a>
        </div>
      </div>
    </nav>
  );
};

export const Hero = () => {
  const [text, setText] = useState("");
  const [showTerminal, setShowTerminal] = useState(false);
  const fullText = "Initializing security protocols... Access granted. Welcome, Analyst.";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <MatrixBackground />
      <div className="scanline"></div>
      
      {/* Decorative HUD Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyber-green/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyber-blue/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 left-0 w-full h-full cyber-grid opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/10 mb-10 rounded-sm"
          >
            <div className="relative">
              <Activity size={14} className="text-cyber-green" />
              <div className="absolute inset-0 bg-cyber-green blur-sm opacity-50 animate-pulse"></div>
            </div>
            <span className="text-cyber-green font-mono text-[9px] uppercase tracking-[0.4em]">Operational Status: Active</span>
          </motion.div>
          
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-display font-bold mb-10 leading-[0.85] tracking-tighter text-white">
            {PERSONAL_INFO.name.split(' ').map((word, i) => (
              <span key={i} className={i >= 2 ? "text-cyber-green block glitch-hover" : "block glitch-hover"}>
                {word}
              </span>
            ))}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-xl mb-14 font-light leading-relaxed border-l border-white/10 pl-8"
          >
            {PERSONAL_INFO.profile}
          </motion.p>
          
          <div className="flex flex-wrap gap-8 items-center">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects" 
              className="btn-cyber"
            >
              <Eye size={16} />
              View Operations
            </motion.a>
            
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setShowTerminal(true)}
                className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 hover:text-cyber-green transition-all group"
              >
                <Command size={14} className="group-hover:rotate-12 transition-transform" />
                Terminal_Access
              </button>
              
              <div className="h-8 w-px bg-white/10"></div>
              
              <div className="flex items-center gap-6">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-white/20 hover:text-cyber-green transition-all duration-300 hover:-translate-y-1">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white/20 hover:text-cyber-green transition-all duration-300 hover:-translate-y-1">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative hidden lg:block">
          <AnimatePresence mode="wait">
            {!showTerminal ? (
              <motion.div
                key="visual"
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative perspective-1000"
              >
                <div className="terminal-window cyber-glow border-cyber-green/20 relative z-10">
                  <div className="terminal-header">
                    <div className="flex gap-2">
                      <div className="terminal-dot bg-cyber-red/40"></div>
                      <div className="terminal-dot bg-yellow-500/40"></div>
                      <div className="terminal-dot bg-cyber-green/40"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="micro-label !text-white/20">system_monitor.exe</span>
                    </div>
                  </div>
                  <div className="p-10 font-mono text-[11px] space-y-8 min-h-[420px] bg-black/20">
                    <div className="text-cyber-green/60 italic leading-relaxed">
                      {text}<span className="inline-block w-2 h-4 bg-cyber-green ml-1 animate-pulse"></span>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4 items-center">
                        <span className="text-cyber-green/30">01</span>
                        <span className="text-white/60 uppercase tracking-widest">Identity_Check</span>
                        <div className="h-px flex-1 bg-white/5"></div>
                      </div>
                      <div className="pl-8 space-y-2 text-gray-500">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span>SUBJECT:</span>
                          <span className="text-white font-medium">{PERSONAL_INFO.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span>DESIGNATION:</span>
                          <span className="text-white font-medium">{PERSONAL_INFO.title}</span>
                        </div>
                      </div>

                      <div className="flex gap-4 items-center">
                        <span className="text-cyber-green/30">02</span>
                        <span className="text-white/60 uppercase tracking-widest">Security_Scan</span>
                        <div className="h-px flex-1 bg-white/5"></div>
                      </div>
                      <div className="pl-8 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] uppercase tracking-widest">
                            <span className="text-white/40">Firewall_Integrity</span>
                            <span className="text-cyber-green">98%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "98%" }}
                              transition={{ duration: 2, delay: 1 }}
                              className="h-full bg-cyber-green shadow-[0_0_10px_rgba(0,255,157,0.5)]"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] uppercase tracking-widest">
                            <span className="text-white/40">Threat_Neutralization</span>
                            <span className="text-cyber-blue">94%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "94%" }}
                              transition={{ duration: 2, delay: 1.2 }}
                              className="h-full bg-cyber-blue shadow-[0_0_10px_rgba(0,210,255,0.5)]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* HUD Decorative Overlays */}
                <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-cyber-green/10 rounded-tr-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-cyber-green/10 rounded-bl-3xl pointer-events-none"></div>
                <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 flex flex-col gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-1 bg-white/5 rounded-full">
                      <motion.div 
                        animate={{ x: [0, 40, 0] }}
                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                        className="w-4 h-full bg-cyber-green/20 rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <InteractiveTerminal onClose={() => setShowTerminal(false)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export const Skills = () => (
  <section id="skills" className="py-32 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Technical Arsenal" subtitle="Capabilities" number="01" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Main Technical Skills - Large Bento Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 lg:col-span-2 lg:row-span-2 cyber-card group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield size={160} />
          </div>
          <h3 className="text-2xl font-display font-bold mb-10 flex items-center gap-4">
            <div className="w-10 h-10 bg-cyber-green/10 flex items-center justify-center rounded-sm">
              <Lock className="text-cyber-green" size={20} />
            </div>
            Core Competencies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {SKILLS.technical.map((skill, i) => (
              <div key={skill} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70 font-mono tracking-tight">{skill}</span>
                  <span className="text-[10px] text-cyber-green font-mono">{(95 - i * 3)}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${95 - i * 3}%` }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                    className="h-full bg-cyber-green shadow-[0_0_10px_rgba(0,255,157,0.3)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools - Bento Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 cyber-card group"
        >
          <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-cyber-blue/10 flex items-center justify-center rounded-sm">
              <Cpu className="text-cyber-blue" size={20} />
            </div>
            Security Stack
          </h3>
          <div className="flex flex-wrap gap-3">
            {SKILLS.tools.map((tool, i) => (
              <motion.span 
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 bg-white/[0.03] border border-white/5 text-[10px] font-mono text-white/60 uppercase tracking-widest rounded-sm hover:border-cyber-blue/40 hover:text-cyber-blue transition-all cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* System Stats - Decorative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-cyber-green/5 border border-cyber-green/10 p-8 rounded-sm flex flex-col justify-between group hover:bg-cyber-green/10 transition-all"
        >
          <Activity className="text-cyber-green mb-4" size={32} />
          <div>
            <div className="text-3xl font-display font-bold text-white mb-1">99.9%</div>
            <div className="micro-label">Uptime_Guaranteed</div>
          </div>
        </motion.div>

        {/* Network Status - Decorative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-cyber-blue/5 border border-cyber-blue/10 p-8 rounded-sm flex flex-col justify-between group hover:bg-cyber-blue/10 transition-all"
        >
          <Globe className="text-cyber-blue mb-4" size={32} />
          <div>
            <div className="text-3xl font-display font-bold text-white mb-1">Global</div>
            <div className="micro-label">Threat_Intelligence</div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export const Experience = () => (
  <section id="experience" className="py-32 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Operational History" subtitle="Experience" number="02" />
      
      <div className="space-y-12 relative">
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-cyber-green/40 via-white/5 to-transparent hidden md:block"></div>
        
        {EXPERIENCE.map((exp, i) => (
          <motion.div 
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative md:pl-16 group"
          >
            <div className="absolute left-0 top-2 w-3 h-3 bg-cyber-green rounded-full -translate-x-1/2 hidden md:block shadow-[0_0_15px_rgba(0,255,157,0.8)] group-hover:scale-150 transition-transform"></div>
            
            <div className="cyber-card !p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <Briefcase size={160} />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div>
                  <span className="micro-label mb-3 block text-cyber-green">{exp.period}</span>
                  <h3 className="text-4xl font-display font-bold text-white group-hover:text-cyber-green transition-colors leading-tight">{exp.role}</h3>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-sm">
                      <Globe size={12} className="text-cyber-blue" />
                      <span className="text-[10px] font-mono text-cyber-blue uppercase tracking-widest">{exp.company}</span>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-2 bg-white/[0.03] border border-white/10 rounded-sm self-start">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Status: Verified</span>
                </div>
              </div>
              
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
                {exp.highlights.map((highlight, j) => (
                  <li key={j} className="flex gap-5 text-[15px] text-gray-400 leading-relaxed group/item">
                    <ChevronRight size={18} className="text-cyber-green mt-1 shrink-0 group-hover/item:translate-x-1 transition-transform" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Projects = () => (
  <section id="projects" className="py-32 relative bg-white/[0.01]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Active Operations" subtitle="Portfolio" number="03" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {PROJECTS.map((project, i) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="cyber-card group relative overflow-hidden flex flex-col !p-12"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Activity size={160} />
            </div>
            
            <div className="mb-10">
              <div className="flex justify-between items-start mb-4">
                <span className="micro-label text-cyber-green">{project.period}</span>
                <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest">OP_ID: #00{i+1}</span>
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-6 group-hover:text-cyber-green transition-colors leading-tight">{project.title}</h3>
              <p className="text-base text-gray-400 leading-relaxed mb-10 border-l-2 border-cyber-green/20 pl-8">
                {project.description}
              </p>
            </div>

            {project.impact && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {project.impact.map((item, j) => (
                  <div key={j} className="p-5 bg-white/[0.03] border border-white/5 rounded-sm group/stat hover:bg-white/[0.05] transition-all">
                    <div className="text-cyber-green font-mono text-xl font-bold mb-2 group-hover/stat:scale-110 transition-transform origin-left">
                      {item.match(/\d+%/)?.[0] || "100%"}
                    </div>
                    <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] leading-tight">
                      {item.replace(/\d+%/, "").trim()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-wrap gap-4">
                {project.tools?.map(tool => (
                  <span key={tool} className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">{tool}</span>
                ))}
              </div>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center rounded-full text-cyber-green hover:bg-cyber-green hover:text-cyber-dark transition-all">
                <ExternalLink size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Certifications = () => (
  <section className="py-32 bg-cyber-gray/20">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Verified Credentials" subtitle="Certifications" number="04" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div 
            key={cert}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="cyber-card !p-6 text-center group hover:!bg-cyber-blue/5 hover:!border-cyber-blue/20"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-cyber-blue/10 transition-colors">
              <Award className="text-white/20 group-hover:text-cyber-blue transition-colors" size={24} />
            </div>
            <span className="text-[10px] font-mono text-white/40 group-hover:text-white transition-colors uppercase tracking-[0.15em] leading-relaxed block">
              {cert}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Education = () => (
  <section className="py-32">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Academic Foundation" subtitle="Education" number="05" />
      
      <div className="grid md:grid-cols-3 gap-8">
        {EDUCATION.map((edu, i) => (
          <motion.div 
            key={edu.institution}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="cyber-card relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-green/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-cyber-green/10 transition-all"></div>
            <span className="text-[10px] font-mono text-cyber-green mb-4 block tracking-widest">{edu.period}</span>
            <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight">{edu.institution}</h3>
            <p className="text-xs text-gray-500 mb-6 font-mono uppercase tracking-wider">{edu.degree}</p>
            <div className="flex items-center justify-between mt-auto">
              <div className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue text-[10px] font-mono border border-cyber-blue/20">
                {edu.result}
              </div>
              <BookOpen size={16} className="text-white/10" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Contact = () => (
  <section id="contact" className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-cyber-green/[0.02] pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <SectionHeader title="Establish Connection" subtitle="Contact" number="06" />
      
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-5xl font-display font-bold text-white mb-8 leading-tight">
            Ready to secure <span className="text-cyber-green">critical</span> infrastructure.
          </h3>
          <p className="text-gray-400 text-xl font-light leading-relaxed mb-12">
            Available for strategic security roles where analytical precision and proactive defense are paramount.
          </p>
          
          <div className="grid gap-6">
            {[
              { icon: Mail, label: "Secure_Email", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}`, color: "cyber-green" },
              { icon: Phone, label: "Direct_Line", value: PERSONAL_INFO.mobile, href: `tel:${PERSONAL_INFO.mobile}`, color: "cyber-blue" },
              { icon: Linkedin, label: "Network_Node", value: "LinkedIn Profile", href: PERSONAL_INFO.linkedin, color: "white" }
            ].map((item, i) => (
              <a 
                key={i}
                href={item.href}
                target={item.icon === Linkedin ? "_blank" : undefined}
                rel={item.icon === Linkedin ? "noreferrer" : undefined}
                className="flex items-center gap-8 p-6 glass-card group hover:bg-white/[0.05] transition-all"
              >
                <div className={`w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-${item.color}/10 transition-all duration-500`}>
                  <item.icon className={`text-white/20 group-hover:text-white transition-all duration-500`} size={24} />
                </div>
                <div>
                  <span className="micro-label !text-white/20 mb-1 block">{item.label}</span>
                  <span className="text-lg font-mono text-white group-hover:text-cyber-green transition-colors">{item.value}</span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="cyber-card !p-16 flex flex-col items-center text-center relative z-10">
            <div className="w-48 h-48 rounded-full border border-cyber-green/20 flex items-center justify-center mb-12 relative">
              <div className="absolute inset-0 border-2 border-cyber-green rounded-full animate-[spin_15s_linear_infinite] border-t-transparent border-r-transparent opacity-40"></div>
              <div className="absolute inset-4 border border-cyber-blue/20 rounded-full animate-[spin_10s_linear_reverse_infinite] border-b-transparent border-l-transparent"></div>
              <Shield size={64} className="text-cyber-green drop-shadow-[0_0_15px_rgba(0,255,157,0.5)]" />
            </div>
            
            <h4 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-tighter">Transmission_Ready</h4>
            <p className="text-sm text-white/40 font-mono uppercase tracking-[0.2em] mb-10">Verification: AES-256_ENCRYPTED</p>
            
            <a 
              href={PERSONAL_INFO.cvUrl} 
              download="MD_AMIMUL_AHASUN_ANAS_CV.pdf"
              className="btn-cyber w-full group !py-4"
            >
              <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              Download_Full_CV
            </a>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyber-green/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyber-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-cyber-dark relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyber-green/10 flex items-center justify-center rounded-sm">
              <Shield className="text-cyber-green" size={16} />
            </div>
            <span className="text-xl font-display font-bold tracking-tighter text-white">
              ANAS<span className="text-cyber-green">.</span>SEC
            </span>
          </div>
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
            &copy; 2026 MD. AMIMUL AHASUN ANAS | ALL RIGHTS RESERVED
          </p>
        </div>

        <div className="flex gap-12">
          {[
            { label: "System_Status", value: "Operational", color: "cyber-green" },
            { label: "Encryption", value: "AES-256", color: "cyber-blue" },
            { label: "Location", value: "Dhaka, BD", color: "white" }
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center md:items-end">
              <span className="text-[8px] font-mono text-white/10 uppercase tracking-[0.2em] mb-1">{stat.label}</span>
              <span className={`text-[10px] font-mono text-${stat.color} uppercase tracking-widest`}>{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          {[Linkedin, Mail, Globe].map((Icon, i) => (
            <a 
              key={i} 
              href="#" 
              className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-cyber-green hover:border-cyber-green/30 transition-all"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-white/[0.02] flex justify-center">
        <div className="text-[8px] font-mono text-white/5 uppercase tracking-[0.5em]">
          Digital_Signature: 0x7F4A92B1C3E5D7F8A0B2C4D6E8F0A2B4
        </div>
      </div>
    </div>
    
    {/* Decorative blur */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyber-green/20 to-transparent"></div>
  </footer>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-cyber-dark text-white selection:bg-cyber-green selection:text-cyber-dark">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
