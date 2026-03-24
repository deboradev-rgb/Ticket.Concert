import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, Ticket, Calendar, MapPin, Music2, ChevronRight } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const navbarWidth = useTransform(scrollY, [0, 100], ['calc(100% - 2rem)', 'calc(100% - 0rem)']);
  const navbarY = useTransform(scrollY, [0, 100], [0, -10]);
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navbarBorderRadius = useTransform(scrollY, [0, 100], ['24px', '0px']);

  // Liens adaptés aux IDs de tes sections
  const navLinks = [
    { label: 'Événement', href: '#hero', icon: Calendar },
    { label: 'Billets', href: '#billetterie', icon: Ticket },
    { label: 'Artiste', href: '#artiste', icon: Music2 },
    { label: 'Accès', href: '#infos', icon: MapPin }
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
          // Ajuste le seuil selon tes besoins
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveLink(`#${currentSection}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

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
      {/* Glow en arrière‑plan */}
      <motion.div
        className="fixed top-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        style={{
          width: navbarWidth,
          height: '120px',
          background: 'radial-gradient(circle at 50% 0%, rgba(181, 12, 0, 0.2), transparent 70%)',
          filter: 'blur(40px)',
          opacity: isScrolled ? 0.3 : 0.6,
        }}
      />

      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        style={{
          y: navbarY,
          scale: navbarScale,
          borderRadius: navbarBorderRadius,
          width: navbarWidth,
          left: '50%',
          x: '-50%',
        }}
        className="fixed top-4 z-50 transition-all duration-300"
      >
        <motion.div
          className="relative overflow-hidden"
          style={{
            background: isScrolled 
              ? 'rgba(11, 14, 22, 0.9)' 
              : 'rgba(11, 14, 22, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: isScrolled 
              ? '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(181, 12, 0, 0.2)' 
              : 'none',
            borderRadius: 'inherit',
          }}
          animate={{
            borderColor: isScrolled 
              ? 'rgba(181, 12, 0, 0.3)' 
              : 'rgba(255, 255, 255, 0.06)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Ligne animée au survol */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(181, 12, 0, 0.3), transparent)',
              filter: 'blur(8px)',
              opacity: hoveredLink ? 0.5 : 0,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative px-6 md:px-8 lg:px-10 h-16 flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={(e) => scrollToSection(e, '#hero')}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#B50C00' }}
              />
              <span
                className="text-xl tracking-tight relative"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: '#FFFFFF'
                }}
              >
                VANO BABY
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5"
                  style={{ background: '#B50C00' }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </motion.div>

            {/* Navigation desktop */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden md:flex items-center gap-1"
            >
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = activeLink === link.href;
                const isHovered = hoveredLink === link.href;
                
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    onHoverStart={() => setHoveredLink(link.href)}
                    onHoverEnd={() => setHoveredLink(null)}
                    className="relative px-4 py-2 rounded-full overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'rgba(181, 12, 0, 0.1)',
                        borderRadius: 'inherit',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0"
                        style={{
                          background: 'rgba(181, 12, 0, 0.15)',
                          borderRadius: 'inherit',
                          border: '1px solid rgba(181, 12, 0, 0.3)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div className="relative flex items-center gap-2">
                      {Icon && (
                        <motion.div
                          animate={isHovered ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon 
                            className="w-4 h-4" 
                            style={{ 
                              color: isActive || isHovered ? '#B50C00' : '#738694'
                            }} 
                          />
                        </motion.div>
                      )}
                      <span
                        className="text-sm uppercase tracking-wider transition-colors"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: isActive || isHovered ? '#FFFFFF' : '#738694',
                          letterSpacing: '0.1em'
                        }}
                      >
                        {link.label}
                      </span>
                    </div>

                    <motion.div
                      className="absolute bottom-1 left-4 right-4 h-0.5"
                      style={{ background: '#B50C00' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Bouton CTA desktop */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={(e) => scrollToSection(e, '#billetterie')}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full uppercase text-[13px] tracking-wider relative overflow-hidden group"
              style={{
                background: '#B50C00',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <span>PRENDRE MON BILLET</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                style={{
                  boxShadow: '0 0 40px rgba(181, 12, 0, 0.5), 0 0 80px rgba(181, 12, 0, 0.2)',
                  borderRadius: 'inherit',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.button>

            {/* Bouton menu mobile */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center relative"
              style={{ color: '#FFFFFF' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: 'rgba(11, 14, 22, 0.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #B50C00 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '40px 40px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative flex flex-col items-center justify-center min-h-screen px-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-16"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 rounded-full"
                    style={{ background: '#B50C00' }}
                  />
                  <span
                    className="text-3xl"
                    style={{ fontFamily: 'var(--font-display)', color: '#FFFFFF' }}
                  >
                    VANO BABY
                  </span>
                </div>
              </motion.div>

              <div className="space-y-6 w-full max-w-xs">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="group flex items-center gap-4 p-4 rounded-2xl w-full transition-all"
                      style={{
                        background: activeLink === link.href 
                          ? 'rgba(181, 12, 0, 0.15)' 
                          : 'rgba(255, 255, 255, 0.03)',
                        border: activeLink === link.href
                          ? '1px solid rgba(181, 12, 0, 0.3)'
                          : '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        background: 'rgba(181, 12, 0, 0.1)',
                        borderColor: 'rgba(181, 12, 0, 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {Icon && (
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
                          <Icon className="w-5 h-5" style={{ color: '#B50C00' }} />
                        </motion.div>
                      )}
                      <span
                        className="text-xl uppercase tracking-wider flex-1 text-left"
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: activeLink === link.href ? '#FFFFFF' : '#738694',
                        }}
                      >
                        {link.label}
                      </span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="w-5 h-5" style={{ color: '#B50C00' }} />
                      </motion.div>
                    </motion.a>
                  );
                })}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                onClick={(e) => scrollToSection(e, '#billetterie')}
                className="mt-12 w-full max-w-xs px-8 py-5 rounded-2xl uppercase text-sm tracking-wider relative overflow-hidden group"
                style={{
                  background: '#B50C00',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="relative flex items-center justify-center gap-3">
                  <span>RÉSERVER MAINTENANT</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Ticket className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}