import { motion } from "motion/react";
import { GitCommit, GitBranch, Terminal, Layers, Star, ArrowUpRight, Rss, Calendar, Key, AlertCircle } from "lucide-react";

export function Pulse() {
  const commits = [
    { hash: "7f30a41", author: "Flazzy", msg: "Refactored offline local heuristics for anti-leak detection", time: "2 hours ago" },
    { hash: "d19bc2e", author: "Flazzy", msg: "Updated client-side TLS tunnel payload descriptors", time: "1 day ago" },
    { hash: "5e482ff", author: "Flazzy", msg: "Optimized WebGL hardware-accelerated terminal canvas repaint loops", time: "2 days ago" },
    { hash: "c10931a", author: "Flazzy", msg: "Added sovereign Windows x64 binaries signing pipeline setup", time: "4 days ago" },
    { hash: "a09be2b", author: "Flazzy", msg: "Established localized state machines with zero external telemetry variables", time: "1 week ago" }
  ];

  const releases = [
    { version: "v1.0.4-beta", date: "June 18, 2026", note: "The Sovereign Release. Implemented full desktop rendering logic & offline localized keys configuration.", secure: "GPG SIGNED" },
    { version: "v1.0.1-beta", date: "May 29, 2026", note: "Sandbox initialization update. Implemented end-to-end local storage buffers for user terminal state.", secure: "GPG SIGNED" },
    { version: "v1.0.0-alpha", date: "May 10, 2026", note: "Genesis core architecture deployment. Complete p2p messaging sandbox.", secure: "GPG SIGNED" }
  ];

  const blogPosts = [
    {
      title: "Why Chatica rejects Cloud Storage entirely",
      excerpt: "Sovereignty cannot be negotiated. Read our detailed critique of modern web apps and why central servers are an unnecessary single point of failure.",
      date: "June 15, 2026",
      readTime: "4 min read"
    },
    {
      title: "Onion Routing & Peer Discovery Mechanics",
      excerpt: "A deep dive into how CHATICA clients safely communicate over Tor networks without revealing routing tables or machine hardware fingerprints.",
      date: "May 22, 2026",
      readTime: "8 min read"
    }
  ];

  return (
    <div className="py-28 px-6 sm:px-12 max-w-7xl mx-auto select-none">
      
      {/* Header section defining the feed core */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4 max-w-xl text-left">
          <h2 className="font-sans text-3xl sm:text-5xl font-light tracking-tight text-black dark:text-white">
            System <span className="font-bold">Pulse</span>
          </h2>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Real-time insights of our localized development loops, GPG-verified build history, and raw project updates.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-neutral-100/60 dark:bg-neutral-900/40 border border-neutral-250/20 dark:border-neutral-800/80 p-3 px-5 rounded-2xl shrink-0">
          <div className="text-left font-mono">
            <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Branch</span>
            <span className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
              <GitBranch size={12} className="text-amber-500" /> main
            </span>
          </div>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-2" />
          <div className="text-left font-mono">
            <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Commits</span>
            <span className="text-xs font-bold text-black dark:text-white">104 total</span>
          </div>
        </div>
      </div>

      {/* Grid of the Pulse feed metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Commits Feed (Git logs standard) (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <GitCommit size={16} className="text-amber-500" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-extrabold">
              Development Timeline
            </h3>
          </div>

          <div className="p-6 md:p-8 rounded-3xl border border-black/10 dark:border-neutral-900 bg-white/40 dark:bg-neutral-950/45 backdrop-blur-md space-y-6 shadow-sm">
            {commits.map((commit, idx) => (
              <motion.div 
                key={commit.hash}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex gap-4 text-left border-l border-neutral-200 dark:border-neutral-800 pl-4 relative"
              >
                {/* Active node dot indicator */}
                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full border border-neutral-300 dark:border-neutral-750 bg-white dark:bg-neutral-900 transition-all duration-300 group-hover:scale-125 group-hover:bg-amber-500 group-hover:border-amber-500" />
                
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between gap-2.5">
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-bold">
                      {commit.hash}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {commit.time}
                    </span>
                  </div>
                  <p className="font-sans text-neutral-700 dark:text-neutral-300 leading-snug text-xs sm:text-[13px] line-clamp-2">
                    {commit.msg}
                  </p>
                  <span className="block font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                    Author: {commit.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center/Right Columns (Span 7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Top: Releases (Build logs & signing) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 px-2">
              <Layers size={16} className="text-amber-500" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-extrabold">
                Verified Releases
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {releases.map((release, rIdx) => (
                <motion.div 
                  key={release.version}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: rIdx * 0.1 }}
                  className="p-6 rounded-2xl border border-black/5 dark:border-neutral-900 bg-white/20 dark:bg-neutral-950/20 backdrop-blur-sm hover:border-black/15 dark:hover:border-neutral-800 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left"
                >
                  <div className="space-y-1.5 flex-1 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className="font-sans font-extrabold text-lg text-black dark:text-white tracking-tight">
                        {release.version}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 bg-neutral-100 dark:bg-neutral-900/50 p-1 px-2.5 rounded-full border border-black/5 dark:border-white/5 font-semibold">
                        {release.date}
                      </span>
                    </div>
                    <p className="font-sans text-[13px] text-neutral-555 dark:text-neutral-400 leading-normal">
                      {release.note}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 p-2 px-3 rounded-xl border border-emerald-500/10 font-mono text-[9px] uppercase tracking-widest font-black shrink-0">
                    <Key size={10} className="animate-pulse" />
                    <span>{release.secure}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom: Dev Blog & Thoughts */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2.5 px-2">
              <Rss size={16} className="text-amber-500" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-extrabold">
                Dev Blog & Philisophy
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post, bIdx) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: bIdx * 0.15 }}
                  className="p-6 rounded-3xl border border-black/10 dark:border-neutral-900 bg-white/40 dark:bg-neutral-950/45 backdrop-blur-md hover:shadow-lg transition-all duration-300 group flex flex-col justify-between text-left min-h-[220px]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} /> {post.date}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-base text-black dark:text-white tracking-tight group-hover:text-amber-550 dark:group-hover:text-amber-400 transition-colors">
                        {post.title}
                      </h4>
                      <p className="font-sans text-xs text-neutral-500 dark:text-neutral-450 mt-1.5 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-black/5 dark:border-neutral-900/60 flex items-center justify-between text-black dark:text-white font-mono text-[10px] uppercase font-extrabold tracking-widest cursor-pointer group-hover:underline">
                    <span>Read Article</span>
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
