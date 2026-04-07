import { motion } from "motion/react";
import { 
  Shield, 
  Lock, 
  Terminal, 
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
  Code
} from "lucide-react";
import { PERSONAL_INFO, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATIONS, PROJECTS } from "../constants";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-2 mb-2"
    >
      <div className="h-px w-8 bg-cyber-green"></div>
      <span className="text-cyber-green font-mono text-xs uppercase tracking-widest">{subtitle || "System Module"}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-mono uppercase"
    >
      {title}
    </motion.h2>
  </div>
);

export const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-cyber-dark/80 backdrop-blur-lg border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2"
      >
        <Shield className="text-cyber-green w-6 h-6" />
        <span className="font-mono font-bold tracking-tighter text-white">ANAS.SYS</span>
      </motion.div>
      <div className="hidden md:flex items-center gap-8">
        {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-cyber-green transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
      <a href="#contact" className="btn-cyber text-[10px]">Initialize Contact</a>
    </div>
  </nav>
);

export const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 matrix-bg pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/20 mb-6">
          <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></div>
          <span className="text-cyber-green font-mono text-[10px] uppercase tracking-widest">System Online: Active Analyst</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono mb-6 leading-none">
          {PERSONAL_INFO.name.split(' ').map((word, i) => (
            <span key={i} className={i >= 2 ? "text-cyber-green block" : "block"}>{word} </span>
          ))}
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mb-10 font-light leading-relaxed">
          {PERSONAL_INFO.profile}
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="btn-cyber">View Operations</a>
          <div className="flex items-center gap-4 px-4">
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-cyber-green transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-500 hover:text-cyber-green transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative hidden lg:block"
      >
        <div className="terminal-window cyber-glow">
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500/50"></div>
            <div className="terminal-dot bg-yellow-500/50"></div>
            <div className="terminal-dot bg-green-500/50"></div>
            <span className="ml-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">analyst_terminal.sh</span>
          </div>
          <div className="p-6 font-mono text-sm space-y-4">
            <div className="flex gap-2">
              <span className="text-cyber-green">$</span>
              <span className="text-white">whoami</span>
            </div>
            <div className="text-gray-500 pl-4">
              {PERSONAL_INFO.name}<br/>
              {PERSONAL_INFO.title}<br/>
              Specialization: SIEM / EDR / Threat Hunting
            </div>
            <div className="flex gap-2">
              <span className="text-cyber-green">$</span>
              <span className="text-white">ls skills/core</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pl-4 text-cyber-blue/70">
              {SKILLS.technical.slice(0, 6).map(s => (
                <div key={s} className="flex items-center gap-2">
                  <ChevronRight size={12} />
                  <span>{s.split(' ')[0]}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <span className="text-cyber-green">$</span>
              <span className="text-white animate-pulse">_</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyber-green/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyber-blue/5 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  </section>
);

export const Skills = () => (
  <section id="skills" className="py-24 bg-cyber-gray/30">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Technical Arsenal" subtitle="Capabilities" />
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-mono mb-8 flex items-center gap-3">
            <Cpu className="text-cyber-green" />
            Core Concepts
          </h3>
          <div className="space-y-4">
            {SKILLS.technical.map((skill, i) => (
              <motion.div 
                key={skill}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-cyber-green/30 transition-all"
              >
                <span className="text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                <div className="h-1 w-12 bg-white/10 group-hover:bg-cyber-green transition-all"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-mono mb-8 flex items-center gap-3">
            <Terminal className="text-cyber-blue" />
            Security Stack
          </h3>
          <div className="flex flex-wrap gap-3">
            {SKILLS.tools.map((tool, i) => (
              <motion.span 
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-cyber-blue/5 border border-cyber-blue/20 text-cyber-blue text-xs font-mono rounded-sm hover:bg-cyber-blue/20 transition-all cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const Experience = () => (
  <section id="experience" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Operational History" subtitle="Experience" />
      
      <div className="space-y-12">
        {EXPERIENCE.map((exp, i) => (
          <motion.div 
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-0"
          >
            <div className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-cyber-green font-mono text-sm">
                {exp.period}
              </div>
              <div className="terminal-window">
                <div className="terminal-header justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-cyber-green" />
                    <span className="text-xs font-mono text-white">{exp.role}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/30">{exp.company}</span>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                        <span className="text-cyber-green mt-1.5 shrink-0">
                          <ChevronRight size={14} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Projects = () => (
  <section id="projects" className="py-24 bg-cyber-gray/30">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Critical Projects" subtitle="Operations" />
      
      <div className="grid lg:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group terminal-window cyber-border hover:border-cyber-green/40 transition-all"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-cyber-green/10 rounded-lg">
                  <Code className="text-cyber-green" size={24} />
                </div>
                <span className="text-[10px] font-mono text-cyber-green/50 uppercase tracking-widest">{project.period}</span>
              </div>
              <h3 className="text-xl font-mono mb-4 group-hover:text-cyber-green transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              {project.impact && (
                <div className="space-y-3 mb-6">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block">Mission Impact</span>
                  <div className="grid grid-cols-1 gap-2">
                    {project.impact.map((imp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-cyber-blue/80 bg-cyber-blue/5 p-2 border border-cyber-blue/10">
                        <div className="w-1 h-1 bg-cyber-blue rounded-full"></div>
                        {imp}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.tools && (
                <div className="flex flex-wrap gap-2">
                  {project.tools.map(tool => (
                    <span key={tool} className="text-[10px] font-mono px-2 py-1 bg-white/5 text-gray-400 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Certifications = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Verified Credentials" subtitle="Certifications" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div 
            key={cert}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="p-4 bg-white/5 border border-white/5 hover:border-cyber-blue/30 transition-all text-center group"
          >
            <Award className="mx-auto mb-3 text-gray-600 group-hover:text-cyber-blue transition-colors" size={20} />
            <span className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors uppercase tracking-wider leading-tight block">
              {cert}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Education = () => (
  <section className="py-24 bg-cyber-gray/30">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader title="Academic Foundation" subtitle="Education" />
      
      <div className="grid md:grid-cols-3 gap-8">
        {EDUCATION.map((edu, i) => (
          <motion.div 
            key={edu.institution}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-6 bg-white/5 border-l-2 border-cyber-green/30"
          >
            <span className="text-[10px] font-mono text-cyber-green mb-2 block">{edu.period}</span>
            <h3 className="text-sm font-mono text-white mb-2 leading-tight">{edu.institution}</h3>
            <p className="text-xs text-gray-500 mb-4">{edu.degree}</p>
            <div className="text-[10px] font-mono text-cyber-blue bg-cyber-blue/10 inline-block px-2 py-1">
              {edu.result}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Contact = () => (
  <section id="contact" className="py-24 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-green/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
      <SectionHeader title="Establish Connection" subtitle="Contact" />
      
      <div className="terminal-window p-8 md:p-12 cyber-glow">
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-cyber-green/10 flex items-center justify-center group-hover:bg-cyber-green/20 transition-colors">
                <Mail className="text-cyber-green" size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase block">Email</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-mono text-white hover:text-cyber-green transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center group-hover:bg-cyber-blue/20 transition-colors">
                <Phone className="text-cyber-blue" size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase block">Mobile</span>
                <a href={`tel:${PERSONAL_INFO.mobile}`} className="text-sm font-mono text-white hover:text-cyber-blue transition-colors">
                  {PERSONAL_INFO.mobile}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Linkedin className="text-white" size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase block">LinkedIn</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-sm font-mono text-white hover:text-cyber-green transition-colors">
                  View Profile
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:items-end gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
            <p className="text-xs font-mono text-gray-500 text-center md:text-right">
              Ready to contribute to challenging and innovative security environments.
            </p>
            <button className="btn-cyber w-full">Download CV</button>
          </div>
        </div>
      </div>
      
      <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
          &copy; 2026 MD. AMIMUL AHASUN ANAS. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">
          <span>Status: Secure</span>
          <span>Encrypted: AES-256</span>
        </div>
      </footer>
    </div>
  </section>
);
