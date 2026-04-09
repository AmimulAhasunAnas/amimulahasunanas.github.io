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
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { CustomCursor } from "./components/CyberComponents";
import { useState, useEffect } from "react";
import { Shield } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-cyber-green/30 selection:text-cyber-green cyber-grid">
      <CustomCursor />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-cyber-dark flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-2 border-dashed border-cyber-green/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-cyber-green rounded-full border-t-transparent border-r-transparent"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="text-cyber-green animate-pulse" size={40} />
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 font-mono text-xs text-cyber-green tracking-[0.5em] uppercase"
            >
              Scanning System...
            </motion.div>
            <div className="mt-4 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-cyber-green shadow-[0_0_10px_rgba(0,255,65,0.5)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
