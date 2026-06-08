import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-white/5 py-4">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left py-4 text-cream hover:text-primary transition-colors cursor-pointer group"
      >
        <span className="font-serif text-base md:text-lg tracking-wide uppercase font-light">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-muted group-hover:text-primary transition-colors"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pt-2 text-body text-xs md:text-sm font-light leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FAQS = [
  {
    question: 'What is the oil concentration of SENTAURA?',
    answer: 'SENTAURA is blended at an exceptional 25% fragrance oil loading, categorizing it as an Extrait de Parfum. This provides much greater performance, projection, and depth than typical Eau de Parfums or Eau de Toilettes.'
  },
  {
    question: 'How long does SENTAURA typically last?',
    answer: 'Due to our heavy concentration and premium fixatives, SENTAURA typically lasts 12+ hours on the skin. On fabrics, the scent profile of smoky birch and ambergris can last for several days.'
  },
  {
    question: 'How can I try the fragrance before opening the bottle?',
    answer: 'We include a complimentary 2ml sample vial of SENTAURA with every 100ml purchase. We invite you to test the sample first. If you decide it is not your signature, you can return the unopened 100ml bottle for a full refund.'
  },
  {
    question: 'Where are the SENTAURA ingredients sourced?',
    answer: 'Our raw materials are sourced from sustainable growers worldwide. Our Bergamot is sourced from southern Italy, and our Moroccan Jasmine is hand-harvested at dawn to preserve the pure quality of the fragrance oils.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 bg-black relative border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
            The Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-cream uppercase tracking-wide">
            Frequent Questions
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* FAQ Accordion List */}
        <div className="border-t border-white/5">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
