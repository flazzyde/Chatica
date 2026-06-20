# CHATICA BY FLAZZY 🛡️

> **Take Back Your Privacy. It's Yours by Right.**

CHATICA is an ultra-premium, dark-themed, 100% serverless, private client-to-client playground architecture. It utilizes local sandbox storage buffers, zero cloud tracking, and client-side Tor browser detection to maximize security without reliance on insecure centralized cloud APIs.

---

## Key Features ⚡

1. **Local Tor Detection (Zero Client Air-Leaks)**
   - Custom client-side heuristic profile mapping (fingerprinting plugins, WebGL rendering info, UTC system clocks, and Firefox-like attributes).
   - Generates responsive security prompts for onboarding users directly onto secure onion connections.
   - **No remote web requests are made to check your IP status.**

2. **System Pulse Feed**
   - Live simulated developmental loop tracking.
   - Chronological list of GPG-verified releases (`v1.0.4-beta`, `v1.0.1-beta`, etc.).
   - Secure onion and clearnet status integration.

3. **Interactive Terminal Terminal Playground**
   - Rich mock shell built using full state isolation and zero persistent tracking.
   - Custom peer-to-peer simulator command structures.

4. **Modern UI Design**
   - High-contrast elements crafted with custom Tailwind CSS and Framer Motion (`motion/react`).
   - Integrated dark mode switcher and navigation bar with automatic dynamic scroll syncing.

---

## Tech Stack 🛠️

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion (`motion/react`)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Local Development 🚀

To install dependencies and start the local development server:

```bash
# 1. Install packages
npm install

# 2. Run in development mode
npm run dev

# 3. Compile and build the production bundle
npm run build
```

---

## Security Philosophy 🔒

CHATICA rejects standard databases, heavy backend frameworks, and logging APIs. Everything resolves natively in your browser sandbox, allowing total sovereignty.
