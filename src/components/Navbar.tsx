import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collection', href: '#collection' },
    { name: 'Notes', href: '#notes' },
    { name: 'Values', href: '#values' },
    { name: 'Story', href: '#story' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="h-10 md:h-12 w-auto flex items-center justify-center relative">
              <img
                src="/logo/logo1.png"
                alt="SENTAURA Logo"
                className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-serif tracking-[0.25em] text-cream uppercase transition-colors duration-300 group-hover:text-primary">
                SENTAURA
              </span>
              <span className="text-[7px] tracking-[0.2em] text-accent uppercase font-sans">
                Haute Parfumerie
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-sans font-bold tracking-[0.2em] text-muted hover:text-primary transition-colors uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#collection"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[9px] font-sans font-bold tracking-[0.2em] uppercase border border-primary text-primary bg-transparent hover:bg-primary hover:text-black transition-all duration-300"
            >
              Explore Collection
            </a>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-cream hover:text-primary transition-colors p-1"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col"
          >
            {/* Header in mobile menu */}
            <div className="flex justify-between items-center px-6 py-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <img
                  src="/logo/logo1.png"
                  alt="SENTAURA Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="text-sm font-serif tracking-[0.25em] text-cream uppercase">
                  SENTAURA
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-cream hover:text-primary transition-colors p-1"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links block */}
            <div className="flex-1 flex flex-col justify-center px-8 space-y-6">
              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  key={link.name}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-serif text-cream hover:text-primary transition-colors tracking-wide uppercase flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Credit */}
            <div className="p-8 border-t border-white/5 flex flex-col gap-4 text-center">
              <a
                href="#collection"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 text-[10px] font-sans font-bold tracking-[0.2em] uppercase bg-primary text-black hover:bg-accent transition-colors"
              >
                Explore Collection
              </a>
              <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-muted">
                Built by Ameer Ashiq
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
