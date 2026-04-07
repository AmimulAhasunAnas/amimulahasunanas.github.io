import { 
  Navbar, 
  Hero, 
  Skills, 
  Experience, 
  Projects, 
  Certifications, 
  Education, 
  Contact 
} from "./components/Portfolio";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-cyber-green/30 selection:text-cyber-green cyber-grid">
      {/* Scanline Effect */}
      <div className="scanline fixed inset-0 pointer-events-none z-[99]"></div>
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyber-green z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Main Content */}
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

      {/* Floating Decorative Elements */}
      <div className="fixed bottom-10 right-10 z-50 pointer-events-none hidden lg:block">
        <div className="text-[10px] font-mono text-cyber-green/30 uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180">
          System Status: Optimal | Latency: 12ms | Encryption: Active
        </div>
      </div>
    </div>
  );
}
