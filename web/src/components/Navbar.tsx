import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [activeSection, setActiveSection] = useState("terminal");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScrollAndSection = () => {
      // 1. Update scrolled header trigger
      setIsScrolled(window.scrollY > 15);

      // 2. Real-time section detection on scroll position
      const sections = ["terminal", "platform", "pulse", "faq", "download"];
      
      // Select last item automatically if user reaches near-bottom constraint
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 65;
      if (isAtBottom) {
        setActiveSection("download");
        return;
      }

      // Check offset boundaries
      // 180px gives a perfect responsive offset timing aligned nicely with top of screens
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollAndSection, { passive: true });
    // Run initial trigger to lock correct starting section
    handleScrollAndSection();

    return () => {
      window.removeEventListener("scroll", handleScrollAndSection);
    };
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const navItems = [
    { name: "Terminal", id: "terminal" },
    { name: "Platform", id: "platform" },
    { name: "Pulse", id: "pulse" },
    { name: "FAQ", id: "faq" },
    { name: "Download", id: "download" }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setIsMobileMenuOpen(false);
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out select-none ${
          isScrolled 
            ? "py-3 bg-white/75 dark:bg-black/60 border-b border-black/[0.06] dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl" 
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo / Brand container */}
          <button 
            onClick={() => scrollTo("terminal")} 
            className="flex items-center space-x-3.5 group cursor-pointer text-left" 
            id="navbar-logo-container"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Outer pulsing ring glow */}
              <div className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10 rounded-2xl blur-md group-hover:bg-amber-500/25 dark:group-hover:bg-amber-500/20 transition-all duration-500 scale-90 group-hover:scale-125" />
              <div className="relative w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center transition-all duration-300 group-hover:border-black dark:group-hover:border-white group-hover:scale-105">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 transition-all duration-500 text-black dark:text-white"
                >
                  <path d="M 50 10 L 86 20 L 86 66 L 50 92 L 14 66 L 14 20 Z" stroke="currentColor" strokeWidth="12" strokeLinejoin="round" />
                  <path d="M 36 84 V 36 H 86" stroke="currentColor" strokeWidth="12" strokeLinejoin="round" />
                  <path d="M 36 58 H 68" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-black tracking-[0.25em] text-black dark:text-white text-base transition-colors duration-300">
                  CHATICA
                </span>
                <span className="inline-block px-1.5 py-0.5 rounded-full text-[7px] font-mono font-bold tracking-normal uppercase bg-amber-550/10 dark:bg-amber-550/20 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  BETA
                </span>
              </div>
              <span className="font-mono text-[8px] tracking-[0.4em] text-neutral-500 dark:text-neutral-450 uppercase -mt-0.5">
                BY FLAZZY
              </span>
            </div>
          </button>

          {/* Center Navigation Links - Floating Capsule Look with high-contrast indicator */}
          <nav className="hidden md:flex items-center p-1 bg-neutral-200/50 dark:bg-neutral-950/60 border border-neutral-300/40 dark:border-neutral-800/80 rounded-full shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative px-5 py-2 rounded-full cursor-pointer group transition-all duration-300"
                >
                  {/* Fluid slider high-contrast background capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-bg"
                      className="absolute inset-0 bg-black dark:bg-white shadow-[0_3px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.15)] rounded-full"
                      transition={{ type: "spring", bounce: 0.14, duration: 0.55 }}
                    />
                  )}
                  {/* Subtle tiny navigation dot for non-active components on hover */}
                  {!isActive && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black dark:bg-white opacity-0 group-hover:opacity-40 transition-opacity" />
                  )}
                  <span className={`relative z-10 text-[10px] font-mono uppercase tracking-widest font-bold transition-colors duration-300 ${
                    isActive 
                      ? "text-white dark:text-black font-extrabold" 
                      : "text-neutral-600 dark:text-neutral-450 hover:text-black dark:hover:text-white"
                  }`}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
          
          {/* Action buttons (Right) */}
          <div className="hidden md:flex items-center space-x-3.5">
            {/* Theme switcher */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme} 
              className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-black/20 dark:hover:border-white/20 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
              title={theme === "dark" ? "Wechseln zu Light Mode" : "Wechseln zu Dark Mode"}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            
            {/* Action beta download button */}
            <button onClick={() => scrollTo("download")} className="cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase text-white dark:text-black bg-black dark:bg-white hover:bg-neutral-900 dark:hover:bg-neutral-100 shadow-sm border border-transparent dark:border-white/10 transition-all duration-300 flex items-center gap-1.5"
              >
                <span>Download</span>
                <ArrowUpRight size={12} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.div>
            </button>
          </div>

          {/* Toggle Button for Mobile Navigation Menu */}
          <div className="flex md:hidden items-center space-x-3">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900/60"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* Floating full-screen cover slide-down mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[72px] z-45 bg-white/95 dark:bg-black/95 backdrop-blur-xl md:hidden flex flex-col justify-between py-12 px-6 border-b border-black/5 dark:border-white/5 shadow-2xl"
          >
            <div className="space-y-8 pt-6 select-none">
              <span className="block font-mono text-[9px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Sektion Navigation
              </span>
              <div className="flex flex-col space-y-4">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="text-left py-2 flex items-center justify-between group cursor-pointer"
                    >
                      <span className={`font-sans font-black text-2xl tracking-normal transition-colors ${
                        isActive ? "text-amber-500" : "text-neutral-905 dark:text-neutral-100 hover:text-amber-500"
                      }`}>
                        {item.name}
                      </span>
                      <ArrowUpRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity text-amber-500`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile menu bottom action summary */}
            <div className="space-y-6 pt-8 border-t border-black/5 dark:border-white/5">
              <button 
                onClick={() => scrollTo("download")} 
                className="w-full py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-mono font-bold text-xs uppercase tracking-widest text-center shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Download client beta</span>
                <ArrowUpRight size={14} />
              </button>
              
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                <span>By Flazzy • chatica.secure</span>
                <span>v1.0.4</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
