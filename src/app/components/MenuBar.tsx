import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Ticket, ChevronRight } from 'lucide-react';

export function MenuBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');

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

      // Détection de la section active
      const sections = navLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (currentSection) setActiveLink(`#${currentSection}`);
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
    setActiveLink(href);
  };

  return (
    <>
      {/* Barre fixe */}
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
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={(e) => scrollToSection(e, '#hero')}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 rounded-full bg-[#B50C00]"
              />
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: '#FFFFFF' }}
              >
                VANO BABY
              </span>
            </div>

            {/* Liens desktop */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative text-sm uppercase tracking-wider transition-colors ${
                    activeLink === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="activeMenu"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B50C00]"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={(e) => scrollToSection(e, '#billetterie')}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#B50C00] text-white text-sm font-bold uppercase tracking-wider relative overflow-hidden group"
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
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
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

      {/* Menu mobile */}
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
                  className={`text-lg uppercase tracking-wider ${
                    activeLink === link.href ? 'text-white' : 'text-gray-400'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={(e) => scrollToSection(e, '#billetterie')}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#B50C00] text-white font-bold uppercase tracking-wider mt-4"
              >
                <Ticket className="w-4 h-4" />
                <span>Prendre mon billet</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}