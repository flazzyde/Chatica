import { motion } from "motion/react";
import { Check, X, Minus } from "lucide-react";

interface Aspect {
  name: string;
  flazzy: boolean | "partial";
  signal: boolean | "partial";
  whatsapp: boolean | "partial";
  telegram: boolean | "partial";
  discord: boolean | "partial";
}

const comparisons: Aspect[] = [
  { name: "Encrypted Transit (TLS/HTTPS)", flazzy: true, signal: true, telegram: true, whatsapp: true, discord: true },
  { name: "E2E Encryption by Default", flazzy: true, signal: true, telegram: "partial", whatsapp: true, discord: false },
  { name: "Self-Destructing Messages", flazzy: true, signal: true, telegram: true, whatsapp: "partial", discord: false },
  { name: "Zero Ad-Trackers & Telemetry", flazzy: true, signal: true, telegram: "partial", whatsapp: false, discord: false },
  { name: "Open Source Client", flazzy: true, signal: true, telegram: "partial", whatsapp: false, discord: false },
  { name: "No Metadata Collection", flazzy: true, signal: true, telegram: false, whatsapp: false, discord: false },
  { name: "No Phone Number Required", flazzy: true, signal: "partial", telegram: false, whatsapp: false, discord: false },
  { name: "Hardware Screenshot Protection", flazzy: true, signal: false, telegram: false, whatsapp: false, discord: false },
  { name: "Decentralized Routing", flazzy: true, signal: false, telegram: false, whatsapp: false, discord: false },
  { name: "Zero-Knowledge Vault", flazzy: true, signal: false, telegram: false, whatsapp: false, discord: false },
];

function RenderIcon({ state, highlight }: { state: boolean | "partial", highlight?: boolean }) {
  if (state === true) {
    return <Check size={20} className={`mx-auto ${highlight ? "text-black dark:text-white" : "text-neutral-500 dark:text-neutral-300"}`} />;
  }
  if (state === false) {
    return <X size={20} className="mx-auto text-neutral-400 dark:text-neutral-800" />;
  }
  return <Minus size={20} className="mx-auto text-neutral-400 dark:text-neutral-500" />;
}

export function ComparisonMatrix() {
  return (
    <div className="w-full max-w-6xl mx-auto py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24"
      >
        <h2 className="font-custom text-4xl sm:text-6xl text-black dark:text-white mb-6 tracking-tight">The Illusion of Choice</h2>
        <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">Security Architecture Matrix Analysis</p>
      </motion.div>

      <div className="relative overflow-x-auto border border-black/10 dark:border-neutral-900 rounded-2xl bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="text-xs uppercase bg-black/5 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-500 border-b border-black/10 dark:border-neutral-900 sticky top-0 z-20">
            <tr>
              <th scope="col" className="px-6 py-6 font-mono tracking-widest w-1/3">Core Infrastructure / Feature</th>
              <th scope="col" className="px-6 py-6 text-center shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] bg-black/5 dark:bg-neutral-900/50 group relative cursor-default">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-black dark:text-white font-bold tracking-[0.2em]">CHATICA</span>
                  <svg width="18" height="20" viewBox="0 0 20 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 group-hover:text-green-400 transition-colors duration-500 drop-shadow-[0_0_8px_rgba(74,222,128,0)] group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                    {/* Shield Outline */}
                    <rect x="2" y="0" width="16" height="2" />
                    <rect x="0" y="2" width="2" height="12" />
                    <rect x="18" y="2" width="2" height="12" />
                    <rect x="2" y="14" width="2" height="2" />
                    <rect x="16" y="14" width="2" height="2" />
                    <rect x="4" y="16" width="2" height="2" />
                    <rect x="14" y="16" width="2" height="2" />
                    <rect x="6" y="18" width="2" height="2" />
                    <rect x="12" y="18" width="2" height="2" />
                    <rect x="8" y="20" width="4" height="2" />
                    
                    {/* Inner checkmark pixels */}
                    <rect x="4" y="10" width="2" height="2" />
                    <rect x="6" y="12" width="2" height="2" />
                    <rect x="8" y="14" width="2" height="2" />
                    <rect x="10" y="12" width="2" height="2" />
                    <rect x="12" y="10" width="2" height="2" />
                    <rect x="14" y="8" width="2" height="2" />
                  </svg>
                </div>
                
                {/* Floating tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50">
                  <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md border border-neutral-300 dark:border-neutral-700/50 text-black dark:text-white font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-2 rounded-md shadow-xl flex items-center gap-2 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-sm drop-shadow-[0_0_8px_rgba(34,197,94,1)] dark:drop-shadow-[0_0_8px_rgba(74,222,128,1)] animate-[pulse_2s_ease-in-out_infinite]"></span>
                    Verified Security
                  </div>
                </div>
              </th>
              <th scope="col" className="px-6 py-6 text-center">Signal</th>
              <th scope="col" className="px-6 py-6 text-center">Telegram</th>
              <th scope="col" className="px-6 py-6 text-center">WhatsApp</th>
              <th scope="col" className="px-6 py-6 text-center">Discord</th>
            </tr>
          </thead>
          <motion.tbody 
            className="divide-y divide-black/10 dark:divide-neutral-900/50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {comparisons.map((item, idx) => (
              <motion.tr
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20, rotateX: 10 },
                  visible: { opacity: 1, x: 0, rotateX: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="hover:bg-black/5 dark:hover:bg-neutral-900/30 transition-colors transform-gpu"
              >
                <td className="px-6 py-5 font-medium text-neutral-800 dark:text-neutral-300 pointer-events-none">
                  {item.name}
                </td>
                <td className="px-6 py-5 text-center bg-black/5 dark:bg-neutral-900/20 backdrop-blur-md border-x border-black/10 dark:border-neutral-900/50">
                  <RenderIcon state={item.flazzy} highlight />
                </td>
                <td className="px-6 py-5 text-center">
                  <RenderIcon state={item.signal} />
                </td>
                <td className="px-6 py-5 text-center">
                  <RenderIcon state={item.telegram} />
                </td>
                <td className="px-6 py-5 text-center">
                  <RenderIcon state={item.whatsapp} />
                </td>
                <td className="px-6 py-5 text-center">
                  <RenderIcon state={item.discord} />
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-center text-neutral-600 font-mono text-xs tracking-widest mt-8 uppercase"
      >
        * Metrics validated against current whitepapers & open protocols (2026)
      </motion.p>
    </div>
  );
}
