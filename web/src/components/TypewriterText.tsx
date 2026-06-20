import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

export function TypewriterText({ text, delay = 0 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;

    const typeChars = () => {
      if (charIndex <= text.length) {
        setDisplayedText(text.slice(0, charIndex));
        charIndex++;
        // Randomize typing speed slightly for realism, between 50ms and 150ms
        timeout = setTimeout(typeChars, Math.random() * 100 + 50);
      }
    };

    const startDelay = setTimeout(typeChars, delay * 1000);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return (
    <span className="inline-flex items-center">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ duration: 1, times: [0, 0.49, 0.5, 0.99, 1], repeat: Infinity }}
        className="inline-block w-[0.55em] h-[1em] bg-neutral-800 dark:bg-neutral-300 ml-2"
        style={{ marginBottom: "-0.1em" }}
      />
    </span>
  );
}
