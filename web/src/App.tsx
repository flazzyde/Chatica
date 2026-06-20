import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Platform } from "./pages/Platform";
import { Pulse } from "./pages/Pulse";
import { FaqPage } from "./pages/FaqPage";
import { Download } from "./pages/Download";
import { Footer } from "./components/Footer";
import { ParticlesBg } from "./components/ParticlesBg";
import { TorDetector } from "./components/TorDetector";
import { motion } from "motion/react";
import { useRef } from "react";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black relative overflow-x-hidden">
      {/* Background Interactive Particles.js Style Layer */}
      <ParticlesBg />

      {/* Under-the-hood real Tor user detection banner */}
      <TorDetector />

      {/* Dedicated Steady Film Grain Background Overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none film-grain" />

      {/* Global Pulsing Heartbeat Background Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none animate-monitor-heartbeat bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(255,255,255,0.06)_100%)] mix-blend-multiply dark:mix-blend-screen" />

      {/* Navigation Bar */}
      <Navbar />

      <div className="relative z-10 w-full flex flex-col">
        <section id="terminal">
          <Home />
        </section>
        
        <section id="platform">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: -3 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Platform />
          </motion.div>
        </section>

        <section id="pulse">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Pulse />
          </motion.div>
        </section>
        
        <section id="faq">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 3 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <FaqPage />
          </motion.div>
        </section>
        
        <section id="download">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Download />
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

