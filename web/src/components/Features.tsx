import { Shield, EyeOff, Radio, Lock, Fingerprint, RefreshCw, Cpu, Database } from 'lucide-react';

export default function Features() {
  const highlights = [
    {
      icon: <Fingerprint className="h-6 w-6 text-white" />,
      title: 'Zero Knowledge Architecture',
      description: 'Your cryptological keys are derived locally directly inside your browser container. Flazz servers never obtain, index, or archive key buffers.',
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-white" />,
      title: 'Perfect Forward Secrecy (PFS)',
      description: 'Every individual session produces automated ephemeral AES ciphers. Even if a future key is captured, old chat messages remain completely secure.',
    },
    {
      icon: <EyeOff className="h-6 w-6 text-white" />,
      title: 'Rigorous Metadata Scrubbing',
      description: 'We dismantle local hardware signatures, timestamps, and routed IP packets on transit. No telemetry, no logs, and no traces remain on disc.',
    },
    {
      icon: <Radio className="h-6 w-6 text-white" />,
      title: 'Decentralized Onion Hops',
      description: 'Encrypted message packets bounce dynamically across 3 separate onion-route node networks in Zurich, Reykjavik, and Singapore.',
    },
    {
      icon: <Database className="h-6 w-6 text-white" />,
      title: 'Pure Ephemeral RAM Sockets',
      description: 'Messages exist purely in transient, un-persisted memory blocks. Instant purge buttons allow absolute immediate local cache purging.',
    },
    {
      icon: <Cpu className="h-6 w-6 text-white" />,
      title: 'Asymmetric Key handshakes',
      titleAccent: '4096-bit',
      description: 'Rigorous DH parameters provide premium grade shield barriers against external network sniffers and quantum verification algorithms.',
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Engineered for <span className="text-white underline decoration-white decoration-wavy underline-offset-4">Absolute Sovereignty</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm font-sans font-light leading-relaxed">
          Flazz Chat is not a standard SaaS messaging client. It is a cryptographic suite built upon the standard assertion that privacy is a fundamental human right.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-black p-6 shadow-md hover:border-white/20 hover:shadow-sm transition-all group duration-300"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-300">
              {item.icon}
            </div>
            
            <h3 className="font-display text-base font-bold text-white flex items-center gap-1.5 mb-2">
              <span>{item.title}</span>
              {item.titleAccent && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-white border border-neutral-700">
                  {item.titleAccent}
                </span>
              )}
            </h3>
            
            <p className="text-slate-400 font-sans font-light text-xs leading-relaxed flex-1">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Extra bottom banner */}
      <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-neutral-900 via-black to-neutral-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-mono text-[10px] text-white font-bold uppercase tracking-widest block mb-1">
            OPEN SOURCE INDEPENDENT AUDIT
          </span>
          <h4 className="font-display text-xl font-bold text-white mb-2">
            Formally Verified Codebases
          </h4>
          <p className="text-slate-400 font-sans text-xs max-w-xl font-light leading-relaxed">
            Our asymmetric models have received formal security verification seals from Swiss Cryptographic research partners. You can host your own peer node locally using our Docker templates.
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1.5 font-mono text-xs font-semibold text-white bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5">
          <Shield className="h-4 w-4 text-white animate-pulse" />
          <span>FIPS 140-3 LAB PASSED</span>
        </div>
      </div>

    </section>
  );
}
