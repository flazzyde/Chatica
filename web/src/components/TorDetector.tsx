import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, ArrowRight, X, AlertCircle, Copy, Check } from "lucide-react";

export function TorDetector() {
  const [isTorDetected, setIsTorDetected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 100% PRIVATE, LOCAL CLIENT-SIDE HEURISTICS DETERMINATION
    // Checks standard fingerprint restrictions typical only for Tor Browser instances
    const runLocalHeuristics = () => {
      try {
        // Tor always forces the UTC timezone on the JS runtime to stop regional tracking
        const isUTC = Intl.DateTimeFormat().resolvedOptions().timeZone === "UTC";
        
        // Tor Browser consistently declares zero navigator plugins in user-agent profiling
        const noPlugins = navigator.plugins && navigator.plugins.length === 0;
        
        // Tor Browser hides Chrome-specific system globals, exhibiting generic Firefox attributes
        const isFirefoxLike = !("chrome" in window) && navigator.userAgent.toLowerCase().includes("gecko");

        // WebGL capability & unmasked render context checks
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl");
        let hasTorGpuFingerprint = false;
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            // Tor Browser clamps WebGL renderer info to empty strings or typical software rendering defaults
            if (!renderer || renderer === "" || renderer.includes("SwiftShader") || renderer.includes("Microsoft")) {
              hasTorGpuFingerprint = true;
            }
          }
        }

        // Additional signal: Tor forces typical default window dimensions on start (usually multiples of 200x100)
        const isStandardTorRatio = (window.innerWidth % 200 === 0 && window.innerHeight % 100 === 0) || 
                                   (window.outerWidth === window.innerWidth && window.outerHeight === window.innerHeight);

        const detected = isUTC && (noPlugins || isFirefoxLike || hasTorGpuFingerprint || isStandardTorRatio || window.location.hostname.endsWith(".onion"));
        
        if (detected) {
          setIsTorDetected(true);
          setShowModal(true);
        }
      } catch (err) {
        console.warn("Offline Tor detector heuristics failed:", err);
      }
    };

    // Delay executing search diagnostics slightly to let page assets settle smoothly
    const timer = setTimeout(() => {
      runLocalHeuristics();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyOnion = () => {
    navigator.clipboard.writeText("chatica5ov7xyzvsqm4g7m62vsh6q2rghfzkv6h3f76tor.onion");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isTorDetected && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur Overlay: Fully blocks interactions to emphasize privacy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Large Sovereignty Security Central Popup Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 md:p-10 text-left select-none z-10"
          >
            {/* Color Accent Indicator Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

            {/* Header section */}
            <div className="flex items-start justify-between gap-6 mb-8 mt-2">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <ShieldAlert size={28} className="animate-pulse" />
                </div>
                <div>
                  <h2 className="font-sans font-extrabold text-xl md:text-2xl tracking-normal text-neutral-900 dark:text-white uppercase">
                    Tor Browser Detected
                  </h2>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-amber-600 dark:text-amber-400 mt-1 font-bold">
                    🛡️ Status: 100% Private Offline Sovereignty
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 px-2.5 rounded-xl border border-black/5 dark:border-neutral-900 hover:bg-black/5 dark:hover:bg-neutral-900 text-neutral-400 hover:text-black dark:hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Detailed Body Copy */}
            <div className="space-y-5 font-sans text-neutral-600 dark:text-neutral-300 text-[13px] md:text-sm leading-relaxed">
              <p>
                Our client-side security diagnostics have detected that you are browsing this platform via an encrypted Tor Browser session. This signature actively protects your metadata from traditional network eavesdropping.
              </p>
              <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-3 font-mono text-xs text-neutral-500 dark:text-neutral-450">
                <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-sans font-bold text-xs uppercase tracking-wider">
                  <AlertCircle size={14} className="text-amber-500" />
                  Protection against Clearnet Exit-Node Sniffing
                </div>
                <p className="leading-relaxed">
                  Connecting to a clearnet HTTPS site still exposes your destination domain via local DNS parameters and exit-node proxies. For absolute censorship immunity and zero leak safety, please use our secure Onion Service interface.
                </p>
              </div>
            </div>

            {/* Onion address copypasta area */}
            <div className="mt-8 space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-550">
                Official Darknet Onion Address
              </label>
              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-neutral-150/40 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-900 overflow-hidden font-mono text-xs w-full">
                <span className="text-amber-600 dark:text-amber-400 select-all font-bold truncate flex-1 leading-none">
                  chatica5ov7xyzvsqm4g7m62vsh6q2rghfzkv6h3f76tor.onion
                </span>
                <button
                  onClick={handleCopyOnion}
                  className="p-2 rounded-xl bg-white dark:bg-neutral-950 border border-black/10 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-neutral-500 hover:text-black dark:hover:text-white shrink-0 cursor-pointer"
                  title="Copy Onion Address"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 pt-6 border-t border-black/5 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-550 uppercase">
                Zero Cloud-APIs • 100% Client-Side
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl border border-black/15 dark:border-neutral-800 hover:bg-black/5 dark:hover:bg-neutral-900 transition-colors text-xs font-mono tracking-widest uppercase font-bold text-neutral-700 dark:text-neutral-300 cursor-pointer text-center"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    window.location.href = "http://chatica5ov7xyzvsqm4g7m62vsh6q2rghfzkv6h3f76tor.onion";
                  }}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-mono font-black text-xs tracking-widest uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Launch Onion</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
