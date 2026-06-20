import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { TypewriterText } from "../components/TypewriterText";

export function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const shiftX = useTransform(mouseX, [-1, 1], [-15, 15]);
  const shiftY = useTransform(mouseY, [-1, 1], [-15, 15]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12">
      <motion.div 
        key="content"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl w-full text-center space-y-16 z-10 select-none"
      >
        <div className="space-y-6">
          <motion.h1
            id="app-brand-name"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
            style={{ x: shiftX, y: shiftY }}
            className="font-custom text-5xl sm:text-9xl font-normal tracking-wide sm:tracking-[0.15em] text-black dark:text-white leading-none text-cyber-glow flex flex-col items-center gap-4"
          >
            <span>Chatica</span>
            <span className="font-mono text-sm tracking-[0.35em] text-neutral-500 uppercase font-bold">by Flazzy</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-24 h-[1px] bg-neutral-300 dark:bg-neutral-800 mx-auto"
        />

        <div className="space-y-6">
          <motion.div
            id="app-main-title"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-custom text-3xl sm:text-5xl font-normal tracking-wide text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-4xl mx-auto flex justify-center"
          >
            <TypewriterText text="Privacy by Default." delay={0.6} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-sm sm:text-base text-neutral-600 dark:text-neutral-500 tracking-widest uppercase max-w-2xl mx-auto text-center"
          >
            Zero-knowledge architecture. No metadata. Total sovereignty.
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase">Scroll to Inspect</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent"
        />
      </motion.div>
    </div>
  );
}
