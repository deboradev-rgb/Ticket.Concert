import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { CountdownTimer } from '../components/CountdownTimer';
import { SimpleMenuBar } from '../components/SimpleMenuBar';
import { 
  Calendar,
  MapPin,
  Clock,
  Music2,
  Star,
  Users,
  TrendingUp,
  ChevronDown,
  Sparkles,
  Award,
  Radio,
  Menu, 
  X,
  Play,
  Lock,
  Instagram,
  Facebook,
  Youtube,
   Car,          // ← ajout
  Smartphone,   // ← ajout
  Ticket,
  Twitter,
  ChevronLeft,   // ← ajout
  ChevronRight,
} from "lucide-react";
import { InteractiveTicketSelector } from "../components/InteractiveTicketSelector";
import { LiveNotification } from "../components/LiveNotification";
import { Toaster } from "sonner";
import gang2 from '../assets/gang2.jpg';
import gang3 from '../assets/gang3.jpg';
import gang4 from '../assets/gang4.jpg';
import gang5 from '../assets/gang5.jpg';
import gang6 from '../assets/gang6.jpg';
import gang7 from '../assets/gang7.jpg';

// Image ticket (à adapter selon ton chemin réel)
import ticketImg from "../assets/ticket.jpg";
import splashImage from '../assets/10.jpg';
import logo from '../assets/logo.png';
import interviewVideo from '../assets/interview.mp4';
import beatVideo from '../assets/beat.mp4';
import concertVideo from '../assets/concert.mp4';

// Données FAQ
const FAQ_DATA = [
  { question: "Comment recevoir mon billet après achat ?", answer: "Votre billet sera envoyé immédiatement par email sous forme de QR code." },
  { question: "Les billets sont-ils remboursables ?", answer: "Les billets ne sont pas remboursables, mais ils sont transférables." },
  { question: "Peut-on acheter plusieurs catégories ?", answer: "Oui, vous pouvez combiner plusieurs catégories de billets." },
  { question: "Y a-t-il un dress code pour le Carré Or ?", answer: "Une tenue correcte et élégante est recommandée." },
  { question: "Comment accéder au Meet & Greet ?", answer: "Les détails vous seront communiqués par email 48h avant." },
  { question: "Que faire si mon QR code ne fonctionne pas ?", answer: "Présentez votre pièce d'identité et votre email." },
  { question: "Puis-je offrir un billet en cadeau ?", answer: "Absolument ! Vous pouvez transférer le billet après l'achat." },
  { question: "Y aura-t-il d'autres artistes ?", answer: "Oui, la programmation complète sera annoncée." }
];

const notifications = [
  "Quelqu'un vient d'acheter 2 billets VIP",
  "3 billets Premium vendus à Cotonou",
  "Un fan vient de réserver 5 places Standard",
  "2 billets Carré Or ajoutés au panier",
  "Dernière vente : 1 billet Premium à Abidjan",
  "4 billets Standard vendus maintenant",
  "Nouveau achat VIP depuis Yamoussoukro",
  "5 billets Premium réservés il y a 2min",
];

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 h-0.5 rounded-full bg-[#B50C00]/30"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ y: [0, -40, 0], opacity: [0, 0.4, 0] }}
        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
      />
    ))}
  </div>
);

// ... (imports remain unchanged)

export default function Home() {
  const [currentNotification, setCurrentNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // États pour la billetterie
  
  const ticketsRef = useRef(null);
const isTicketsInView = useInView(ticketsRef, { 
  once: true, 
  amount: 0.1,
  rootMargin: "-50px 0px -50px 0px"   // déclenche 50px avant que la section n’entre dans l’écran
});

// Dans le composant Home
const [showTicketSplash, setShowTicketSplash] = useState(true);
const [showTickets, setShowTickets] = useState(false);
const splashTimerStarted = useRef(false);


useEffect(() => {
  const timer = setTimeout(() => {
    setShowTicketSplash(false);
    setShowTickets(true);
  }, 2000); // 2 secondes
  return () => clearTimeout(timer);
}, []);

// Déclenchement automatique du splash (indépendant du scroll)


const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);
  const timerStarted = useRef(false);

  // ========== CARROUSEL ARTISTE ==========
  const artistImages = [gang2, gang3, gang4, gang5, gang6, gang7];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % artistImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + artistImages.length) % artistImages.length);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // Splash screen
  const [showSplash, setShowSplash] = useState(true);

  // Notifications en direct
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, Math.random() * 5000 + 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll en haut à chaque rechargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Déclenchement du splash ticket
 useEffect(() => {
  console.log("🔄 isTicketsInView =", isTicketsInView);
  if (isTicketsInView && !timerStarted.current) {
    timerStarted.current = true;
    console.log("🎟️ Déclenchement du splash billetterie");
    const timer = setTimeout(() => {
      setShowTicketSplash(false);
      setShowTickets(true);
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [isTicketsInView]);
  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          >
            <motion.img
              src={splashImage}
              alt="10 ans du Gang"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton flottant "Prendre mon billet" */}
<motion.button
  onClick={() => document.getElementById("billetterie")?.scrollIntoView({ behavior: "smooth" })}
  className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-[#B50C00] text-white text-sm font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 2, duration: 0.5 }}
>
  <Ticket className="w-4 h-4" />
  <span>Prendre mon billet</span>
</motion.button>

{/* Bouton menu mobile (hamburger) */}
<button
  onClick={() => setIsMobileNavOpen(true)}
  className="md:hidden fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-[#B50C00]/80 backdrop-blur-sm flex items-center justify-center text-white shadow-lg"
>
  <Menu className="w-5 h-5" />
</button>

{/* Overlay menu mobile */}
<AnimatePresence>
  {isMobileNavOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
    >
      <button
        onClick={() => setIsMobileNavOpen(false)}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="flex flex-col items-center gap-8">
        {[
          { label: 'Événement', href: '#hero' },
          { label: 'Artiste', href: '#artiste' },
          { label: 'Billets', href: '#billetterie' },
          { label: 'Infos', href: '#infos' },
          { label: 'FAQ', href: '#faq' }
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(link.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
              setIsMobileNavOpen(false);
            }}
            className="text-2xl text-white hover:text-[#B50C00] transition-colors uppercase tracking-wider font-medium"
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>
          
          {/* Logo fixe en bas à droite */}
<motion.img
  src={logo}
  alt="VANO BABY"
  className="fixed bottom-4 right-4 z-50 w-14 md:w-20 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
  onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 0.8, x: 0 }}
  transition={{ delay: 2, duration: 0.5 }}
  whileHover={{ scale: 1.05 }}
/>
      {!showSplash && (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
          <Toaster theme="dark" richColors />
          <LiveNotification message={currentNotification} show={showNotification} />
                           <SimpleMenuBar />.
      {/* ==================== SECTION HERO ==================== */}
<section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Image de fond plus sombre */}
  <div className="absolute inset-0">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1501612780327-45045538702b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-[#B50C00]/20 via-transparent to-[#B50C00]/20"
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  </div>

  {/* Contenu texte (identique) */}
  <div className="relative z-10 container mx-auto px-4 py-20 max-w-7xl">
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Live Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B50C00]/20 border border-[#B50C00]/40 mb-6"
        animate={{ boxShadow: ["0 0 20px rgba(181,12,0,0.3)", "0 0 40px rgba(181,12,0,0.5)", "0 0 20px rgba(181,12,0,0.3)"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-2 h-2 bg-[#B50C00] rounded-full"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-sm font-medium text-red-400">ÉVÉNEMENT EN DIRECT</span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent leading-tight"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        10 ANS<br />DU GANG
      </motion.h1>

      {/* Nom artiste */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B50C00]" />
        <p className="text-3xl md:text-5xl font-bold text-[#B50C00]">VANO BABY</p>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B50C00]" />
      </motion.div>

      {/* Détails événement */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-6 text-gray-300 mb-12 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-[#B50C00]" /><span>04 Avril 2026</span></div>
        <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-[#B50C00]" /><span>À partir de 16h</span></div>
        <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#B50C00]" /><span>Majestic de Wologuèdè</span></div>
      </motion.div>

      {/* Compte à rebours */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <CountdownTimer />
      </motion.div>

      {/* CTA Bouton */}
      <motion.button
        className="px-10 py-5 bg-gradient-to-r from-[#B50C00] to-red-600 rounded-2xl font-bold text-xl shadow-2xl mt-8"
        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(181,12,0,0.6)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        onClick={() => document.getElementById("billetterie")?.scrollIntoView({ behavior: "smooth" })}
      >
        Réserver ma place maintenant
      </motion.button>

      {/* Texte informatif */}
      <motion.p
        className="text-sm text-gray-400 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        ⚡ Places limitées • 🔥 Vente en cours • ✨ Ne rate pas ce moment historique
      </motion.p>
    </motion.div>
  </div>

  {/* Flèche de défilement */}
  <motion.div
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    onClick={() => document.getElementById("artiste")?.scrollIntoView({ behavior: "smooth" })}
  >
    <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors">
      <span className="text-sm">Découvrir</span>
      <ChevronDown className="w-6 h-6" />
    </div>
  </motion.div>
</section>

   {/* ==================== SECTION ARTISTE (MODERNISÉE) ==================== */}
<section id="artiste" className="relative py-20 md:py-32 overflow-hidden bg-[#0B0E16]">
  <FloatingParticles />

  <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      {/* Colonne image : carrousel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative group"
        style={{ perspective: 1000 }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={artistImages[currentImageIndex]}
              alt={`Vano Baby ${currentImageIndex + 1}`}
              className="w-full h-[500px] object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <motion.div
            className="absolute bottom-6 left-6 px-4 py-2 rounded-full z-10"
            style={{
              background: 'rgba(11, 14, 22, 0.8)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#738694'
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 rounded-full bg-[#B50C00] mr-2"
            />
            Depuis 2016 · Cotonou, Bénin
          </motion.div>

          <div className="absolute bottom-6 right-6 flex gap-2 z-10">
            <button onClick={prevImage} className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#B50C00] transition-colors">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={nextImage} className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#B50C00] transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {artistImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'w-6 bg-[#B50C00]' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Colonne texte */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
          <Music2 className="w-4 h-4 text-[#B50C00]" />
          <span className="text-sm text-gray-400 uppercase tracking-wider">L'Artiste</span>
        </div>

        {/* Titre réduit et stylisé */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-[#B50C00] to-[#FF4D4D] bg-clip-text text-transparent">
            Vano Baby
          </span>
          <br />
          <span className="text-2xl md:text-3xl text-gray-300 font-medium">
            une décennie à la tête du Gang
          </span>
        </h2>

        {/* Description raccourcie et plus percutante */}
        <div className="space-y-4 text-gray-300 text-base leading-relaxed mb-8">
          <p>
            Depuis 2016, <span className="text-[#B50C00] font-semibold">Vano Baby</span> impose son style unique sur la scène béninoise. Des textes percutants, une énergie scénique incomparable.
          </p>
          <p>
            De "Gang" à ses derniers succès, il a marqué toute une génération. Ce concert célèbre <strong>10 ans de carrière</strong> et une fidélité indéfectible à son public.
          </p>
          <p className="text-white font-medium">
            Une soirée historique au Majestic de Wologuèdè : performances exclusives, surprises et ambiance électrique.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { value: '10+', label: 'Années', icon: Music2 },
            { value: '50K+', label: 'Fans', icon: Users },
            { value: '1', label: 'Nuit unique', icon: Star }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + idx * 0.1 }}
                className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
              >
                <Icon className="w-6 h-6 text-[#B50C00] mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-[#B50C00] to-red-600 rounded-xl font-bold shadow-lg flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById("billetterie")?.scrollIntoView({ behavior: "smooth" })}
        >
          Je veux ma place
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
            →
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  </div>
</section>

    {/* ==================== SECTION BILLETTERIE MODERNISÉE ==================== */}
<section
  id="billetterie"
  className="relative py-20 px-4 bg-gradient-to-b from-transparent via-[#B50C00]/5 to-transparent overflow-hidden"
>
  <FloatingParticles />
  <div className="container mx-auto max-w-7xl">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B50C00]/10 border border-[#B50C00]/30 mb-4">
        <Sparkles className="w-4 h-4 text-[#B50C00]" />
        <span className="text-sm text-gray-400">Choisis ton expérience</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-bold mb-4">Billetterie</h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        4 catégories de billets pour tous les budgets. Dépêche-toi, ça part vite ! 🚀
      </p>
    </motion.div>

    <AnimatePresence mode="wait">
      {showTicketSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center min-h-[500px]"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <img
              src={ticketImg}
              alt="Ticket"
              className="w-64 md:w-96 rounded-2xl shadow-2xl border border-white/10"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-gray-400 text-sm"
          >
            Préparez votre expérience...
          </motion.p>
          <div className="w-64 mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B50C00] to-red-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}

      {showTickets && (
        <motion.div
          key="tickets"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#B50C00]/20 via-transparent to-[#B50C00]/20 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          <div className="relative">
            <InteractiveTicketSelector />
          </div>
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Dernières places disponibles – ne tarde pas !
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</section>

    {/* ==================== SECTION HYPE ==================== */}
<section id="hype" className="relative py-20 px-4 overflow-hidden">
  <div className="container mx-auto max-w-7xl">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
        <TrendingUp className="w-4 h-4 text-[#B50C00]" />
        <span className="text-sm text-gray-400">Ils sont déjà prêts</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-bold mb-4">La hype monte...</h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Rejoins des milliers de fans pour célébrer 10 ans de succès
      </p>
    </motion.div>

    {/* Statistiques (inchangées) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {[
        { icon: Users, value: "4,656+", label: "Fans confirmés", color: "emerald" },
        { icon: Star, value: "68%", label: "Places déjà vendues", color: "orange" },
        { icon: Radio, value: "En direct", label: "Ventes en temps réel", color: "red" },
      ].map((stat, index) => (
        <motion.div
          key={index}
          className="relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className={`w-16 h-16 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/30 flex items-center justify-center mx-auto mb-4`}>
              <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
            </div>
            <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Grille de vidéos */}
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { src: interviewVideo, title: "Interview Exclusive", desc: "Vano Baby se confie sur 10 ans de carrière" },
        { src: beatVideo, title: "Beat Making", desc: "Dans les coulisses de la création musicale" },
        { src: concertVideo, title: "Live Concert", desc: "Les meilleurs moments du concert anniversaire" }
      ].map((video, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer"
          onClick={() => setSelectedVideo({ src: video.src, title: video.title })}
        >
          <video
            src={video.src}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#B50C00] flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <span className="text-white font-bold uppercase tracking-wider text-sm">Voir plus</span>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg">{video.title}</h3>
            <p className="text-[#738694] text-sm">{video.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

    {/* ==================== SECTION INFOS PRATIQUES (MODERNISÉE) ==================== */}
<section id="infos" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#0D1019] to-[#080A10]">
  {/* Motif de fond : grille subtile */}
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
  </div>

  <FloatingParticles />

  <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
    {/* Badge et titre comme les autres sections */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B50C00]/10 border border-[#B50C00]/30 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B50C00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B50C00]"></span>
        </span>
        <span className="text-sm text-gray-400 uppercase tracking-wider">Infos pratiques</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-white via-[#B50C00] to-[#FF4D4D] bg-clip-text text-transparent">
          Tout ce qu'il<br />faut savoir
        </span>
      </h2>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
      {/* Colonne gauche : informations pratiques */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="space-y-5">
          {[
            {
              icon: MapPin,
              title: 'Lieu',
              content: 'Majestic de Wologuèdè (ex Canal Olympia Wologuèdè)\nCotonou, Bénin',
            },
            {
              icon: Calendar,
              title: 'Date & Heure',
              content: 'Samedi 04 Avril 2026\nOuverture des portes à 16h00',
            },
            {
              icon: Car,
              title: 'Accès',
              content: 'Parking disponible sur place\nTransports en commun à proximité',
            },
            {
              icon: Ticket,
              title: 'Retrait billets',
              content: 'QR Code envoyé par email\nPrésentez-le directement à l\'entrée',
            }
            
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  x: 8,
                  borderColor: '#B50C00',
                  transition: { duration: 0.2 }
                }}
                className="group relative p-6 rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Gradient animé au survol */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#B50C00]/0 via-[#B50C00]/5 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <div className="relative flex gap-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#B50C00]/10 border border-[#B50C00]/30 flex items-center justify-center"
                  >
                    <Icon className="w-5 h-5 text-[#B50C00]" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400 whitespace-pre-line leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Colonne droite : carte interactive améliorée (Google Maps) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <motion.div
          className="relative rounded-3xl overflow-hidden h-[600px] group shadow-2xl"
          whileHover={{ scale: 1.02, rotateY: 2 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Lueur externe au survol */}
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-[#B50C00] to-red-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"
          />
          
          {/* Google Maps iframe centré sur le Majestic de Wologuèdè */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.492159804894!2d2.396166!3d6.410!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1021b8f6b3b2b2b3%3A0x7b2c6f2c8c2f2c2f!2sMajestic%20de%20Wologu%C3%A8d%C3%A8!5e0!3m2!1sfr!2sbj!4v1710000000000!5m2!1sfr!2sbj"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte Majestic de Wologuèdè"
            className="w-full h-full relative z-10"
          />

          {/* Overlay gradient pour améliorer la lisibilité */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent z-20" />

          {/* Badge animé avec le nom du lieu */}
          <motion.div
            className="absolute top-6 left-6 px-4 py-2 rounded-full z-30 backdrop-blur-md"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#FFFFFF',
              letterSpacing: '0.05em'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 rounded-full bg-[#B50C00] mr-2"
            />
            MAJESTIC DE WOLOGUÈDÈ · COTONOU
          </motion.div>

          {/* Bouton Google Maps animé */}
          <motion.a
            href="https://maps.google.com/?q=Majestic+de+Wologuèdè+Cotonou+Bénin"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 px-5 py-2.5 rounded-full z-30 flex items-center gap-2 backdrop-blur-md"
            style={{
              background: 'rgba(181, 12, 0, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
            whileHover={{ scale: 1.05, background: '#B50C00' }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="w-4 h-4" />
            Ouvrir dans Google Maps
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Badge d'info parking */}
          <motion.div
            className="absolute bottom-6 left-6 px-3 py-1.5 rounded-full z-30 backdrop-blur-sm"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#CCCCCC',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            📍 Parking gratuit pour billets Premium et +
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>
      {/* ==================== SECTION FAQ ==================== */}
      <section id="faq" className="relative py-20 px-4 bg-[#0B0E16]">
        <FloatingParticles />
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-xl text-gray-400">Cliquez sur une question pour voir la réponse</p>
          </motion.div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.08]"
              >
                <motion.button
                  onClick={() => setOpenFaqIndex(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="text-white font-medium text-base md:text-lg pr-4">{faq.question}</span>
                  <motion.div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-[#B50C00]/20 transition-colors">
                    <ChevronDown className="w-5 h-5 text-[#B50C00]" />
                  </motion.div>
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 text-sm">
              Vous n'avez pas trouvé votre réponse ?
              <button className="ml-2 text-[#B50C00] hover:text-[#FF4D4D] transition-colors font-medium">Contactez-nous</button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal FAQ */}
      <AnimatePresence>
        {openFaqIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpenFaqIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#0B0E16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[#B50C00]/10 to-transparent">
                <h3 className="text-white font-display text-xl md:text-2xl pr-8">{FAQ_DATA[openFaqIndex]?.question}</h3>
                <button onClick={() => setOpenFaqIndex(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B50C00]/20 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="p-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {FAQ_DATA[openFaqIndex]?.answer}
                </motion.div>
              </div>
              <div className="p-6 pt-0 flex justify-end">
                <button onClick={() => setOpenFaqIndex(null)} className="px-6 py-2 rounded-lg bg-[#B50C00] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#B50C00]/80 transition-colors">
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal vidéo */}
<AnimatePresence>
  {selectedVideo && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={() => setSelectedVideo(null)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedVideo(null)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#B50C00] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-white font-bold text-xl">{selectedVideo.title}</h3>
          <p className="text-[#738694] text-sm">Vano Baby · 10 ans du Gang</p>
        </div>

        <video
          src={selectedVideo.src}
          className="w-full h-auto max-h-[80vh] object-contain"
          controls
          autoPlay
          playsInline
        />

        <div className="p-4 bg-gradient-to-t from-black to-transparent">
          <p className="text-[#738694] text-sm">
            {selectedVideo.title === "Interview Exclusive" && "Vano Baby revient sur 10 ans de carrière, ses inspirations et ses projets futurs."}
            {selectedVideo.title === "Beat Making" && "Découvrez les coulisses de la création des beats qui font danser tout le Bénin."}
            {selectedVideo.title === "Live Concert" && "Extrait du concert exceptionnel qui a réuni plus de 15 000 fans au Majestic de Wologuèdè."}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Footer CTA */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            className="p-12 rounded-3xl bg-gradient-to-br from-[#B50C00]/20 to-red-600/10 backdrop-blur-xl border border-[#B50C00]/30"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ne rate pas ce moment historique</h2>
            <p className="text-xl text-gray-300 mb-8">Plus de 4 600 personnes ont déjà réservé leur place. Et toi ?</p>
            <motion.button
              className="px-10 py-5 bg-gradient-to-r from-[#B50C00] to-red-600 rounded-2xl font-bold text-xl shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(181,12,0,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("billetterie")?.scrollIntoView({ behavior: "smooth" })}
            >
              Réserver ma place maintenant
            </motion.button>
            <p className="text-sm text-gray-400 mt-6">⚡ Réservation instantanée • 🔒 Paiement sécurisé • ✅ Confirmation immédiate</p>
          </motion.div>
        </div>
      </section>

      {/* Footer amélioré */}
      <motion.footer
        className="relative py-20 border-t overflow-hidden"
        style={{ background: '#080A10', borderColor: 'rgba(255, 255, 255, 0.06)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <FloatingParticles />
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(181, 12, 0, 0.05)" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
        </svg>

        <div className="relative z-10 container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <motion.div className="text-2xl mb-3 flex items-center gap-2 cursor-pointer group" style={{ fontFamily: "var(--font-display)", color: '#FFFFFF' }} whileHover={{ scale: 1.05 }}>
                VANO BABY
                <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: '#B50C00' }} animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              </motion.div>
              <motion.p className="text-sm mb-6" style={{ fontFamily: "var(--font-body)", color: '#526371' }} animate={{ x: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                10 ans du Gang — L'histoire continue.
              </motion.p>
              <div className="flex items-center gap-4">
                {[
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Youtube, label: 'YouTube' },
                  { Icon: Twitter, label: 'Twitter' }
                ].map(({ Icon, label }, index) => (
                  <motion.a
                    key={label}
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden group"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#738694' }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.2, color: '#FFFFFF', borderColor: '#B50C00' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.span className="absolute inset-0 bg-[#B50C00]" initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 2, opacity: 0.2 }} transition={{ duration: 0.3 }} style={{ borderRadius: 'inherit' }} />
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <Icon className="w-4 h-4 relative z-10" />
                    </motion.div>
                    <motion.span className="absolute -top-8 text-xs bg-[#B50C00] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap" initial={{ y: 10 }} whileHover={{ y: 0 }}>
                      {label}
                    </motion.span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <motion.h3 className="text-sm uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-mono)", color: '#738694' }} animate={{ x: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                Liens
              </motion.h3>
              <div className="space-y-2">
                {['Mentions légales', 'CGV', 'Contact', 'Presse'].map((link, index) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="block text-sm transition-colors relative group overflow-hidden"
                    style={{ fontFamily: "var(--font-body)", color: '#526371' }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 10, color: '#FFFFFF' }}
                  >
                    <span className="relative z-10">{link}</span>
                    <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B50C00]" whileHover={{ width: '100%' }} transition={{ duration: 0.3 }} />
                    <motion.span className="absolute inset-0 bg-[#B50C00] opacity-0 group-hover:opacity-10" style={{ borderRadius: '4px' }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
              <motion.div
                className="p-6 rounded-xl relative overflow-hidden group"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                whileHover={{ scale: 1.05, borderColor: '#B50C00' }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'radial-gradient(circle at center, rgba(181,12,0,0.1), transparent)' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative">
                  <motion.div className="flex items-center gap-2 mb-3" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <motion.div animate={{ rotate: [0, 360, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                      <Lock className="w-5 h-5" style={{ color: '#B50C00' }} />
                    </motion.div>
                    <span className="text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: '#FFFFFF' }}>
                      Paiements sécurisés
                    </span>
                  </motion.div>
                  <motion.p className="text-xs" style={{ fontFamily: "var(--font-body)", color: '#526371' }} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                    Billetterie officielle · Transactions 100% sécurisées
                  </motion.p>
                </div>
                <motion.div className="absolute inset-0 border-2 border-[#B50C00] rounded-xl opacity-0 group-hover:opacity-100" initial={{ scale: 0.8 }} whileHover={{ scale: 1 }} transition={{ duration: 0.3 }} />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="pt-8 border-t text-center text-xs"
            style={{ borderColor: 'rgba(255,255,255,0.06)', fontFamily: "var(--font-mono)", color: '#526371' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <motion.span animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
              © 2026 Vano Baby. Tous droits réservés. Billet numérique officiel.
            </motion.span>
          </motion.div>
        </div>
      </motion.footer>
        </div>
      )}
    </>
  );
}
   
    