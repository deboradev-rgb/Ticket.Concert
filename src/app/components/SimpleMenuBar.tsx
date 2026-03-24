import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';

export function SimpleMenuBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Événement', href: '#hero' },
    { label: 'Artiste', href: '#artiste' },
    { label: 'Billets', href: '#billetterie' },
    { label: 'Infos', href: '#infos' },
    { label: 'FAQ', href: '#faq' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const section = document.getElementById(href.substring(1));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Barre fixe avec seulement le bouton CTA (desktop) et bouton menu (mobile) */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: isScrolled
            ? 'rgba(11, 14, 22, 0.9)'
            : 'rgba(11, 14, 22, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Espace vide à gauche pour l'équilibre */}
            <div className="w-10 md:w-auto"></div>

            {/* Bouton CTA (visible sur tous les écrans) */}
            <motion.button
              onClick={(e) => scrollToSection(e, '#billetterie')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#B50C00] text-white text-sm font-bold uppercase tracking-wider relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Prendre mon billet</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </motion.button>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Menu mobile (affiché seulement sur mobile) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[73px] z-40 md:hidden"
            style={{
              background: 'rgba(11, 14, 22, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="flex flex-col items-center py-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}