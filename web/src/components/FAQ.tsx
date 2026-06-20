import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-black/10 dark:border-neutral-900/80">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className="font-custom text-lg text-neutral-800 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
          {question}
        </span>
        <div className="flex-shrink-0 ml-4 text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-sans max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqs = [
  {
    question: "Do you store any of my messages?",
    answer: "No. Our architecture is strictly zero-knowledge. Your messages are encrypted on your device and only decrypted on the recipient's device. We do not hold the keys to decrypt them, and messages are dropped from our relay servers the moment they are delivered."
  },
  {
    question: "How do you make money if you don't sell data?",
    answer: "We believe privacy is a fundamental human right, not a premium feature. Flazzy is funded through open-source grants, community donations, and optional premium features that do not compromise core privacy standards (such as custom themes or extended local storage vaults)."
  },
  {
    question: "Can authorities request my data?",
    answer: "They can request it, but we have nothing to hand over. Because we require no phone number, email, or personal identity to create an account, and we collect zero metadata, a subpoena would at best yield an encrypted blob of mathematically useless garbage."
  },
  {
    question: "Is the app completely open source?",
    answer: "Yes. Both our client applications and our relay protocols are 100% open source. We encourage independent security researchers to audit our code and verify our encryption implementations."
  },
  {
    question: "What happens if I lose my device?",
    answer: "Because we do not store your data in the cloud, losing your device means losing your local message vault unless you have securely backed up your local cryptographic seed phrase. This is the trade-off for true sovereignty."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-4xl mx-auto py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <h2 className="font-custom text-4xl sm:text-5xl text-black dark:text-white mb-6 tracking-tight">Intelligence Briefing</h2>
        <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">Frequently Asked Questions</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="border-t border-black/10 dark:border-neutral-900/80"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(index === openIndex ? null : index)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
