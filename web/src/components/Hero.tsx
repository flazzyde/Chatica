import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, EyeOff, Hash, Key, Cpu, Zap, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DotmSquare4 } from './DotmSquare4';

interface HeroProps {
  setActiveSection: (sec: string) => void;
  nodeStatus: {
    location: string;
    nodeId: string;
    ping: number;
  };
}

export default function Hero({ setActiveSection, nodeStatus }: HeroProps) {
  const [scrambleText, setScrambleText] = useState("YOUR RIGHT TO PRIVACY");
  const targetText = "IT'S YOURS BY RIGHT.";
  const initialText = "X03K$ L9#R% *U-98&S!";

  // Cryptographic Scramble Effect
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    
    const startScramble = () => {
      clearInterval(interval);
      iteration = 0;
      interval = setInterval(() => {
        setScrambleText((prev) => 
          targetText
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return targetText[index];
              }
              const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789{}[]|;:,.<>?";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        if (iteration >= targetText.length) {
          clearInterval(interval);
        }
        iteration += 0.35;
      }, 30);
    };

    startScramble();
    const cycle = setInterval(startScramble, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(cycle);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      {/* Background Graphic Decor */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-white/[0.02] rounded-full filter blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            
            {/* Top Security Pill */}
            <div className="self-center lg:self-start inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 mb-6">
              <ShieldCheck className="h-4 w-4 text-white animate-pulse" />
              <span className="font-mono text-xs tracking-wider text-white capitalize">
                End-to-End Encrypted Peer-to-Peer Protocol
              </span>
            </div>

            {/* Platform Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 leading-tight">
              Take Back Your Privacy. <br />
              <span className="text-white decoration-white underline decoration-wavy underline-offset-8">
                {scrambleText}
              </span>
            </h1>

            {/* Subtitle Slogan */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-slate-400 text-lg sm:text-xl font-sans font-light mt-4 mb-8 leading-relaxed">
              Flazz Chat delivers immediate, uncompromised, and server-agnostic secure messaging. 
              No databases, no tracking cookies, and absolutely no metadata trails. It is your sovereignty, protected by right.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <button
                id="hero-go-chat"
                onClick={() => setActiveSection('sandbox')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-display font-semibold text-black hover:bg-neutral-200 transition-all shadow-md active:scale-95"
              >
                <span>Launch Demo Chatroom</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                id="hero-go-lab"
                onClick={() => setActiveSection('lab')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/80 hover:border-neutral-500 px-6 py-3.5 text-sm font-display font-medium text-white transition-all active:scale-95"
              >
                <Key className="h-4 w-4 text-neutral-400" />
                <span>Test Security Labs</span>
              </button>
            </div>

            {/* Live Infrastructure Panel */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-neutral-800 pt-8 text-left">
              <div id="stat-enc" className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white">4096-bit</span>
                <span className="font-mono text-[10px] text-neutral-550 tracking-wider">RSA KEY LATHES</span>
              </div>
              <div id="stat-meta" className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white">0%</span>
                <span className="font-mono text-[10px] text-neutral-550 tracking-wider">METADATA TRACES</span>
              </div>
              <div id="stat-routing" className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white">Onion</span>
                <span className="font-mono text-[10px] text-neutral-550 tracking-wider">P2P ROUTING</span>
              </div>
              <div id="stat-audit" className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white">Audited</span>
                <span className="font-mono text-[10px] text-neutral-550 tracking-wider">FORMAL VERIFIED</span>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Holographic Device Container */}
            <div className="w-full max-w-[380px] p-1 rounded-3xl bg-gradient-to-b from-white/20 via-neutral-900 to-black shadow-md relative">
              <div className="rounded-[22px] bg-neutral-950 p-6 overflow-hidden">
                
                {/* Visual Terminal Panel Header */}
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-750" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-800" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-600 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400">
                    <Activity className="h-3 w-3 text-white animate-pulse" />
                    <span>SECURE_PIPE_v3.1</span>
                  </div>
                </div>

                {/* Packet Transmission Visual flow */}
                <div className="space-y-4 font-mono text-xs">
                  
                  <div className="rounded-lg bg-neutral-900 p-2 border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 flex justify-between">
                      <span>SECURE LOCAL INITIATION</span>
                      <span>[ Zurich-CH ]</span>
                    </div>
                    <div className="text-white mt-1">Generating ephemeral AES-256 Key</div>
                    <div className="text-neutral-400 mt-0.5 text-[9px] truncate">
                      K_DF: 8fbc923de1a50bc44c9d...
                    </div>
                  </div>

                  <div className="flex justify-center my-2">
                    <div className="h-8 w-px bg-white/40 animate-pulse" />
                  </div>

                  {/* Dot Matrix interactive crypto grid */}
                  <div className="flex flex-col items-center justify-center py-3 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                    <DotmSquare4
                      size={108}
                      dotSize={16}
                      speed={2}
                      pattern="full"
                      colorPreset="solid-theme"
                      animated={true}
                      bloom={true}
                      opacityBase={0.1}
                      opacityMid={0.2}
                      opacityPeak={1}
                    />
                    <span className="font-mono text-[9px] text-white mt-2 uppercase tracking-widest animate-pulse">
                      Entropy Seed Pulse Matrix
                    </span>
                  </div>

                  <div className="flex justify-center my-2">
                    <div className="h-8 w-px bg-white/20 animate-pulse" />
                  </div>

                  <div className="rounded-lg bg-neutral-900 p-2 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400 flex justify-between">
                      <span>SOVEREIGN DECRYPTION</span>
                      <span>[ REYKJAVIK-IS ]</span>
                    </div>
                    <div className="text-white font-medium mt-1">"Privacy restored. Chat ready."</div>
                    <div className="text-[9px] text-neutral-550 mt-1">Handshake complete in {nodeStatus.ping}ms</div>
                  </div>

                  {/* interactive entropy trigger indicator */}
                  <div className="pt-2 text-center">
                    <button
                      id="hero-force-handshake"
                      onClick={() => setActiveSection('sandbox')}
                      className="inline-flex items-center gap-1.5 text-[10px] text-white hover:opacity-80 transition-opacity"
                    >
                      <Zap className="h-3 w-3 animate-bounce" />
                      <span>Click to Test Real Handshake Engine</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Outer Abstract Absolute Floating Tags */}
            <div className="absolute -top-6 -left-12 hidden md:block bg-neutral-900 border border-neutral-850 rounded-xl p-3 shadow-xl flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-white" />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-neutral-550">IP ADDRESS</span>
                <span className="font-display text-xs font-semibold text-white">STRICTLY SCRUBBED</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-12 hidden md:block bg-neutral-900 border border-neutral-850 rounded-xl p-3 shadow-xl flex items-center gap-2">
              <Hash className="h-4 w-4 text-white" />
              <div className="flex flex-col w-28">
                <span className="font-mono text-[9px] text-neutral-550">P2P DATA HASH</span>
                <span className="font-mono text-[10px] font-semibold text-white truncate">
                  {nodeStatus.nodeId}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
