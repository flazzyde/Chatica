import { motion } from "motion/react";

const features = [
  {
    prefix: "01.",
    title: "Zero-Knowledge Encryption",
    description: "Every packet is individually cryptographically hashed. We don’t have the keys, we don't have the data. Built on post-quantum secure elliptic curve cryptography."
  },
  {
    prefix: "02.",
    title: "Ghost Routing",
    description: "Your IP is concealed through decentralized peer-to-peer relay nodes. Your location and identity are stripped from metadata before packets ever leave the device."
  },
  {
    prefix: "03.",
    title: "Total Sovereignty",
    description: "No central database holds your profile. Your identity is a local deterministic seed. Erase the local vault, and you mathematically cease to exist on the network."
  }
];

export function SecurityFeatures() {
  return (
    <div className="w-full max-w-6xl mx-auto py-32 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            {/* Subtle line indicator */}
            <div className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-700 mb-8 group-hover:w-full group-hover:bg-black dark:group-hover:bg-white transition-all duration-700 ease-in-out" />
            
            <div className="font-mono text-xs tracking-[0.3em] text-neutral-400 dark:text-neutral-600 mb-4">
              {feature.prefix}
            </div>
            
            <h3 className="font-custom text-2xl text-black dark:text-white mb-4 tracking-wide">
              {feature.title}
            </h3>
            
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-sm font-sans">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
