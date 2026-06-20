import { motion } from "motion/react";
import { Download as DownloadIcon, Monitor, Smartphone, Terminal, ArrowDown } from "lucide-react";

export function Download() {
  const versions = [
    { title: "Windows", icon: <Monitor size={20} />, req: "Windows 10+", size: "84.2 MB", desc: "Native x64 Desktop Application", available: true },
    { title: "macOS", icon: <Monitor size={20} />, req: "macOS 11+", size: "78.6 MB", desc: "Universal Apple Silicon & Intel", available: false },
    { title: "Linux", icon: <Terminal size={20} />, req: "Ubuntu 22.04+", size: "91.1 MB", desc: "Sovereign AppImage & bin package", available: false },
    { title: "Android", icon: <Smartphone size={20} />, req: "Android 9.0+", size: "43.5 MB", desc: "Encrypted APK Package link", available: false },
    { title: "iOS", icon: <Smartphone size={20} />, req: "iOS 16.0+", size: "39.8 MB", desc: "Private TestFlight Link", available: false },
  ];

  return (
    <div className="py-32 px-6 sm:px-12 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center relative select-none">
      <div className="flex flex-col items-center text-center space-y-16">
        
        {/* Page Title Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-[9px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            V1.0.4-BETA DEPLOYED
          </div>
          <h1 className="font-custom text-4xl sm:text-7xl font-light tracking-tight text-black dark:text-white mt-4">
            Get <span className="font-bold">Chatica</span>
          </h1>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-450 max-w-lg mx-auto leading-relaxed">
            Download our sovereign clients. Your local keys are generated on-device during the initial sandbox initialization.
          </p>
        </motion.div>

        {/* Versions Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
        >
          {versions.map((v, i) => (
            <motion.div 
              key={v.title}
              whileHover={v.available ? { y: -6, transition: { duration: 0.25, ease: "easeOut" } } : undefined}
              className={`p-8 border rounded-3xl relative overflow-hidden group flex items-start flex-col justify-between min-h-[300px] transition-all duration-300 ${
                v.available 
                  ? "border-black/10 dark:border-neutral-900 bg-white/40 dark:bg-neutral-950/45 backdrop-blur-md shadow-sm hover:shadow-lg hover:border-black/20 dark:hover:border-neutral-800" 
                  : "border-dashed border-black/10 dark:border-neutral-900/60 bg-neutral-100/10 dark:bg-neutral-950/15 opacity-40 select-none cursor-not-allowed"
              }`}
            >
              {/* Card top elements */}
              <div className="w-full space-y-6">
                <div className="flex justify-between w-full items-center">
                  <div className={`p-3.5 rounded-2xl border transition-transform duration-300 ${
                    v.available 
                      ? "bg-black/[0.04] dark:bg-white/[0.04] border-black/5 dark:border-white/5 text-black dark:text-white group-hover:scale-105" 
                      : "bg-neutral-200/20 dark:bg-neutral-800/20 border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-505"
                  }`}>
                    {v.icon}
                  </div>
                  <div className="font-mono text-[9px] text-neutral-450 dark:text-neutral-500 uppercase tracking-widest px-2.5 py-1 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-full">
                    {v.available ? v.req : "CODENAME: NEPTUNE"}
                  </div>
                </div>

                <div className="text-left space-y-1.5">
                  <div className="flex items-baseline gap-2">
                    <h3 className={`font-sans font-bold text-2xl tracking-tight ${v.available ? "text-black dark:text-white" : "text-neutral-400 dark:text-neutral-500"}`}>{v.title}</h3>
                    <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">• {v.available ? v.size : "N/A"}</span>
                  </div>
                  <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {v.available ? v.desc : "Client under isolated secure compiles."}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full pt-8">
                <motion.button 
                  whileHover={v.available ? { scale: 1.01 } : undefined}
                  whileTap={v.available ? { scale: 0.99 } : undefined}
                  disabled={!v.available}
                  className={`w-full py-3 px-4 flex items-center justify-between font-mono text-xs tracking-widest uppercase font-bold rounded-2xl transition-all relative overflow-hidden group/btn ${
                    v.available 
                      ? "bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-900 dark:hover:bg-neutral-100 shadow-sm cursor-pointer" 
                      : "bg-neutral-100 dark:bg-neutral-900/50 text-neutral-400 dark:text-neutral-600 border border-black/5 dark:border-white/5 cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <DownloadIcon size={14} className={v.available ? "animate-pulse" : "opacity-40"} />
                    <span>{v.available ? "Download client" : "In Entwicklung"}</span>
                  </span>
                  
                  {v.available && (
                    <span className="p-1 rounded-lg bg-white/10 dark:bg-black/10 text-white dark:text-black">
                      <ArrowDown size={12} className="transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Decorative subtle ambient dot */}
              {v.available && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
