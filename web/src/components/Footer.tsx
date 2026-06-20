import { motion } from "motion/react";
import { Github, MessageSquare, Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-neutral-900/50 py-16 relative z-10 w-full bg-white/50 dark:bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
        
        {/* Brand & Action Buttons in a cohesive layout */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 border-b border-black/5 dark:border-neutral-900/30 pb-10">
          
          {/* Logo element */}
          <div className="flex flex-col text-center md:text-left select-none">
            <span className="font-sans font-bold tracking-[0.25em] text-black dark:text-white text-base">
              CHATICA
            </span>
            <span className="font-mono text-[9px] tracking-[0.35em] text-neutral-500 dark:text-neutral-450 uppercase mt-0.5">
              BY FLAZZY
            </span>
          </div>

          {/* User Requested Buttons (Discord, Github, Status) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            
            {/* Discord */}
            <motion.a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full border border-black/10 dark:border-neutral-800 bg-white/40 dark:bg-neutral-950/45 hover:bg-black/5 dark:hover:bg-neutral-900/50 transition-colors flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm"
            >
              <MessageSquare size={13} className="text-neutral-500 dark:text-neutral-400" />
              <span>Discord</span>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full border border-black/10 dark:border-neutral-800 bg-white/40 dark:bg-neutral-950/45 hover:bg-black/5 dark:hover:bg-neutral-900/50 transition-colors flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm"
            >
              <Github size={13} className="text-neutral-500 dark:text-neutral-450" />
              <span>Github</span>
            </motion.a>

            {/* Status Link */}
            <motion.a
              href="https://status.flazzy.de"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full border border-black/10 dark:border-neutral-800 bg-white/40 dark:bg-neutral-950/45 hover:bg-black/5 dark:hover:bg-neutral-900/50 transition-colors flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm cursor-pointer"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neutral-500 dark:bg-neutral-400"></span>
              </span>
              <Activity size={13} className="text-neutral-500 dark:text-neutral-400" />
              <span>Status</span>
            </motion.a>

          </div>

        </div>

      </div>
    </footer>
  );
}
