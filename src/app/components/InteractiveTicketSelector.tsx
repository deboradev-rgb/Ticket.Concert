import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ShoppingCart, Flame, AlertTriangle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { addSale } from "../lib/salesStore"; // import de la fonction d'enregistrement

interface TicketType {
  id: string;
  name: string;
  price: number;
  remaining: number; // percentage
  features: string[];
  icon: any;
  color: string;
  badgeText: string;
}

const ticketTypes: TicketType[] = [
  {
    id: "standard",
    name: "Standard",
    price: 5000,
    remaining: 60,
    features: ["Accès général", "Places assises", "Vue dégagée", "Ambiance garantie"],
    icon: ShoppingCart,
    color: "emerald",
    badgeText: "Meilleur rapport qualité/prix",
  },
  {
    id: "premium",
    name: "Premium",
    price: 15000,
    remaining: 30,
    features: ["Places prioritaires", "Meilleure vue", "Goodies exclusifs", "Parking gratuit", "Accès coupe-file"],
    icon: Flame,
    color: "orange",
    badgeText: "🔥 Populaire",
  },
  {
    id: "vip",
    name: "VIP",
    price: 50000,
    remaining: 15,
    features: ["Première rangée", "Meet & Greet", "Photo souvenir", "Boissons offertes", "Lounge VIP", "Merchandising"],
    icon: AlertTriangle,
    color: "yellow",
    badgeText: "⚠️ Plus que 15%",
  },
  {
    id: "carre-or",
    name: "Carré Or",
    price: 100000,
    remaining: 5,
    features: ["Zone exclusive", "Table privée", "Service premium", "Champagne offert", "Accès backstage", "Expérience ultime"],
    icon: Sparkles,
    color: "amber",
    badgeText: "✨ Expérience unique",
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    button: "bg-emerald-500 hover:bg-emerald-600",
    glow: "shadow-emerald-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    button: "bg-orange-500 hover:bg-orange-600",
    glow: "shadow-orange-500/20",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    button: "bg-yellow-500 hover:bg-yellow-600",
    glow: "shadow-yellow-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    button: "bg-amber-500 hover:bg-amber-600",
    glow: "shadow-amber-500/20",
  },
};

export function InteractiveTicketSelector() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    standard: 0,
    premium: 0,
    vip: 0,
    "carre-or": 0,
  });

  const handleQuantityChange = (ticketId: string, delta: number) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(0, Math.min(10, prev[ticketId] + delta));
      if (newQuantity > prev[ticketId]) {
        const ticket = ticketTypes.find(t => t.id === ticketId);
        toast.success(`${ticket?.name} ajouté au panier`, {
          duration: 2000,
        });
      }
      return {
        ...prev,
        [ticketId]: newQuantity,
      };
    });
  };

  const calculateTotal = () => {
    return ticketTypes.reduce((total, ticket) => {
      return total + (ticket.price * quantities[ticket.id]);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

 // Inside InteractiveTicketSelector component
const handlePurchase = () => {
  const totalQuantity = getTotalTickets();
  if (totalQuantity === 0) {
    toast.error('Veuillez sélectionner au moins un billet');
    return;
  }

  // Build items array for the sale
  const items = ticketTypes
    .filter(ticket => quantities[ticket.id] > 0)
    .map(ticket => ({
      category: ticket.id,
      quantity: quantities[ticket.id],
      price: ticket.price,
    }));

  // Record the sale
  addSale(items);

  // Reset quantities
  setQuantities({
    standard: 0,
    premium: 0,
    vip: 0,
    'carre-or': 0,
  });

  const totalPrice = calculateTotal();
  toast.success(`✅ ${totalQuantity} billet(s) réservé(s) pour ${totalPrice.toLocaleString()} FCFA`);
};

  const total = calculateTotal();
  const totalTickets = getTotalTickets();

  return (
    <div className="space-y-6">
      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ticketTypes.map((ticket, index) => {
          const Icon = ticket.icon;
          const colors = colorClasses[ticket.color as keyof typeof colorClasses];
          const quantity = quantities[ticket.id];

          return (
            <motion.div
              key={ticket.id}
              className={`relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border ${colors.border} p-6 ${colors.glow}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${colors.bg} border ${colors.border}`}>
                <span className={`text-xs font-medium ${colors.text}`}>
                  {ticket.badgeText}
                </span>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>

                {/* Name & Price */}
                <h3 className="text-2xl font-bold text-white mb-1">{ticket.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">
                    {ticket.price.toLocaleString("fr-FR")}
                  </span>
                  <span className="text-lg text-gray-400 ml-2">FCFA</span>
                </div>

                {/* Stock Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Places restantes</span>
                    <span className={colors.text}>{ticket.remaining}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${colors.text.replace('text-', 'bg-')}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${ticket.remaining}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    />
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-1.5 mb-6">
                  {ticket.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className={`w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-4">
                  <span className="text-sm text-gray-300">Quantité</span>
                  <div className="flex items-center gap-3">
                    <motion.button
                      className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} disabled:opacity-30 disabled:cursor-not-allowed`}
                      onClick={() => handleQuantityChange(ticket.id, -1)}
                      disabled={quantity === 0}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={quantity}
                        className="text-xl font-bold text-white w-8 text-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {quantity}
                      </motion.span>
                    </AnimatePresence>

                    <motion.button
                      className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} disabled:opacity-30 disabled:cursor-not-allowed`}
                      onClick={() => handleQuantityChange(ticket.id, 1)}
                      disabled={quantity >= 10}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Subtotal */}
                {quantity > 0 && (
                  <motion.div
                    className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Sous-total</span>
                      <span className={`text-lg font-bold ${colors.text}`}>
                        {(ticket.price * quantity).toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky Total Bar */}
      <AnimatePresence>
        {totalTickets > 0 && (
          <motion.div
            className="sticky bottom-6 z-40"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <div className="bg-gradient-to-r from-[#B50C00] to-red-600 rounded-2xl p-6 shadow-2xl border border-red-500/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-red-100 mb-1">Votre sélection</p>
                  <p className="text-2xl font-bold text-white">
                    {totalTickets} billet{totalTickets > 1 ? "s" : ""} • {total.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <motion.button
                  className="px-8 py-4 bg-white text-[#B50C00] rounded-xl font-bold text-lg shadow-xl whitespace-nowrap"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePurchase}
                >
                  Réserver {totalTickets} billet{totalTickets > 1 ? "s" : ""} →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}