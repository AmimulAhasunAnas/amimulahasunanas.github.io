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
  Download
} from "lucide-react";
import { PERSONAL_INFO, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATIONS, PROJECTS } from "../constants";

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
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-cyber-dark/90 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center rounded-sm">
            <Shield className="text-cyber-green w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tighter text-white leading-none">ANAS.SEC</span>
            <span className="text-[8px] font-mono text-cyber-green uppercase tracking-[0.2em] mt-1">Security Analyst</span>
          </div>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-10">
          {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 hover:text-cyber-green transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-green transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse"></div>
            <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Network: Secure</span>
          </div>
          <a href="#contact" className="btn-cyber !py-2 !px-4">
            <Zap size={14} />
            <span className="hidden sm:inline">Connect</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export const Hero = () => {
  const [text, setText] = useState("");
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
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden cyber-grid">
      <div className="scanline"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyber-green/5 border border-cyber-green/20 mb-8 rounded-sm">
            <Activity size={14} className="text-cyber-green" />
            <span className="text-cyber-green font-mono text-[10px] uppercase tracking-[0.3em]">Operational Status: Active</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-[0.85] tracking-tighter text-white">
            {PERSONAL_INFO.name.split(' ').map((word, i) => (
              <span key={i} className={i >= 2 ? "text-cyber-green block" : "block"}>
                {word}
              </span>
            ))}
          </h1>
          
          <p className="text-xl text-gray-400 max-w-xl mb-12 font-light leading-relaxed border-l-2 border-white/10 pl-6">
            {PERSONAL_INFO.profile}
          </p>
          
          <div className="flex flex-wrap gap-6 items-center">
            <a href="#projects" className="btn-cyber">
              <Eye size={16} />
              View Operations
            </a>
            <div className="flex items-center gap-6">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-white/30 hover:text-cyber-green transition-all duration-300 hover:scale-110">
                <Linkedin size={22} />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white/30 hover:text-cyber-green transition-all duration-300 hover:scale-110">
                <Mail size={22} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="terminal-window cyber-glow border-cyber-green/20">
            <div className="terminal-header">
              <div className="flex gap-1.5">
                <div className="terminal-dot bg-cyber-red/50"></div>
                <div className="terminal-dot bg-yellow-500/50"></div>
                <div className="terminal-dot bg-cyber-green/50"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="micro-label !text-white/20">root@anas-sec:~</span>
              </div>
            </div>
            <div className="p-8 font-mono text-xs space-y-6 min-h-[360px]">
              <div className="text-cyber-green/60 italic mb-4">
                {text}<span className="animate-pulse">|</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-cyber-green opacity-50">#</span>
                  <span className="text-white/80">fetch --identity</span>
                </div>
                <div className="pl-6 border-l border-white/5 space-y-1 text-gray-500">
                  <div className="flex justify-between">
                    <span>NAME:</span>
                    <span className="text-white">{PERSONAL_INFO.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROLE:</span>
                    <span className="text-white">{PERSONAL_INFO.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LOC:</span>
                    <span className="text-white">Dhaka, BD</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-cyber-green opacity-50">#</span>
                  <span className="text-white/80">scan --vulnerabilities</span>
                </div>
                <div className="pl-6 space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-cyber-green"
                      />
                    </div>
                    <span className="text-[10px] text-cyber-green">95% SECURE</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <span className="text-cyber-green animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hardware decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 border-t border-r border-cyber-green/20"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b border-l border-cyber-green/20"></div>
          <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex flex-col gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1 h-1 bg-cyber-green/30 rounded-full"></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Skills = () => (
  <section id="skills" className="py-32 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Technical Arsenal" subtitle="Capabilities" number="01" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          {SKILLS.technical.map((skill, i) => (
            <motion.div 
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="cyber-card group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center group-hover:bg-cyber-green/10 transition-colors">
                  <Lock size={14} className="text-white/20 group-hover:text-cyber-green transition-colors" />
                </div>
                <span className="text-[9px] font-mono text-white/10 group-hover:text-cyber-green/30 transition-colors uppercase">Module_{i+1}</span>
              </div>
              <h4 className="text-white font-mono text-sm group-hover:text-cyber-green transition-colors">{skill}</h4>
              <div className="mt-4 h-0.5 w-full bg-white/5 overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full bg-cyber-green/30"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-cyber-gray/60 border border-white/5 p-8 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <TerminalIcon size={40} className="text-white/5" />
          </div>
          <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-3">
            <Cpu className="text-cyber-blue" size={20} />
            Security Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.tools.map((tool, i) => (
              <motion.span 
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                viewport={{ once: true }}
                className="px-3 py-1.5 bg-cyber-blue/5 border border-cyber-blue/10 text-cyber-blue text-[10px] font-mono rounded-sm hover:bg-cyber-blue/20 transition-all cursor-default uppercase tracking-wider"
              >
                {tool}
              </motion.span>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="micro-label">System Integrity</span>
              <span className="text-[10px] font-mono text-cyber-green">99.9%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[99.9%] bg-cyber-green"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const Experience = () => (
  <section id="experience" className="py-32 bg-cyber-gray/20">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Operational History" subtitle="Experience" number="02" />
      
      <div className="relative">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block"></div>
        
        <div className="space-y-20">
          {EXPERIENCE.map((exp, i) => (
            <motion.div 
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2 flex flex-col justify-center">
                <div className={`flex flex-col ${i % 2 === 0 ? "md:items-start" : "md:items-end"}`}>
                  <span className="text-cyber-green font-mono text-xs mb-2 tracking-[0.2em]">{exp.period}</span>
                  <h3 className="text-2xl font-display font-bold text-white mb-1">{exp.role}</h3>
                  <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-6">{exp.company}</span>
                </div>
              </div>

              <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-cyber-dark border-2 border-cyber-green rounded-full z-10 hidden md:block"></div>

              <div className="md:w-1/2">
                <div className="cyber-card !p-8 relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Activity size={16} className="text-cyber-green animate-pulse" />
                  </div>
                  <ul className="space-y-4">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="flex gap-4 text-sm text-gray-400 leading-relaxed">
                        <ChevronRight size={16} className="text-cyber-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const Projects = () => (
  <section id="projects" className="py-32">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Critical Projects" subtitle="Operations" number="03" />
      
      <div className="grid lg:grid-cols-2 gap-10">
        {PROJECTS.map((project, i) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-cyber-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
            <div className="cyber-card h-full relative z-10 !p-10 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-cyber-green/10 transition-all duration-500">
                  <Code className="text-white/20 group-hover:text-cyber-green transition-colors" size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="micro-label !text-white/10">Project_ID</span>
                  <span className="text-[10px] font-mono text-cyber-green/50">#00{i+1}</span>
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-cyber-green transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>
              
              {project.impact && (
                <div className="space-y-4 mb-8">
                  <span className="micro-label">Mission Impact</span>
                  <div className="grid gap-2">
                    {project.impact.map((imp, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-[11px] text-cyber-blue/80 bg-cyber-blue/5 p-3 border border-cyber-blue/10 rounded-sm">
                        <Zap size={12} className="text-cyber-blue" />
                        {imp}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tools?.map(tool => (
                  <span key={tool} className="text-[9px] font-mono px-2.5 py-1 bg-white/5 text-white/40 rounded-sm uppercase tracking-wider">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
  <section id="contact" className="py-32 relative overflow-hidden bg-cyber-gray/20">
    <div className="absolute top-0 left-0 w-full h-full cyber-grid opacity-20"></div>
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <SectionHeader title="Establish Connection" subtitle="Contact" number="06" />
      
      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">
        <div className="space-y-8">
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Ready to contribute to challenging and innovative security environments. Let's discuss how I can help secure your infrastructure.
          </p>
          
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}`, color: "cyber-green" },
              { icon: Phone, label: "Mobile", value: PERSONAL_INFO.mobile, href: `tel:${PERSONAL_INFO.mobile}`, color: "cyber-blue" },
              { icon: Linkedin, label: "LinkedIn", value: "View Profile", href: PERSONAL_INFO.linkedin, color: "white" }
            ].map((item, i) => (
              <a 
                key={i}
                href={item.href}
                target={item.icon === Linkedin ? "_blank" : undefined}
                rel={item.icon === Linkedin ? "noreferrer" : undefined}
                className="flex items-center gap-6 p-4 bg-white/5 border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center group-hover:bg-${item.color}/10 transition-colors`}>
                  <item.icon className={`text-white/20 group-hover:text-white transition-colors`} size={20} />
                </div>
                <div>
                  <span className="micro-label !text-white/20">{item.label}</span>
                  <span className="text-sm font-mono text-white block mt-0.5">{item.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="hidden lg:block w-px h-64 bg-white/5"></div>

        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-cyber-green/20 flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 border-2 border-cyber-green rounded-full animate-[spin_10s_linear_infinite] border-t-transparent border-r-transparent"></div>
            <Shield size={48} className="text-cyber-green" />
          </div>
          <h3 className="text-xl font-display font-bold text-white mb-6">Secure Transmission</h3>
          <a 
            href={PERSONAL_INFO.cvUrl} 
            download="MD_AMIMUL_AHASUN_ANAS_CV.pdf"
            className="btn-cyber w-full group"
          >
            <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            Download CV
          </a>
          <span className="mt-6 micro-label">Verification: AES-256</span>
        </div>
      </div>
      
      <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
            &copy; 2026 MD. AMIMUL AHASUN ANAS
          </span>
          <span className="text-[8px] font-mono text-white/10 uppercase tracking-[0.2em]">
            Digital Signature: 0x7F4A...B2E1
          </span>
        </div>
        
        <div className="flex gap-8">
          {[
            { label: "Status", value: "Secure", color: "cyber-green" },
            { label: "Latency", value: "12ms", color: "cyber-blue" },
            { label: "Uptime", value: "99.9%", color: "white" }
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-end">
              <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">{stat.label}</span>
              <span className={`text-[10px] font-mono text-${stat.color} uppercase`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  </section>
);
