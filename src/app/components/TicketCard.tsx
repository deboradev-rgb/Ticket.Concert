import { motion } from "motion/react";
import { Check, Flame, AlertTriangle, X } from "lucide-react";

interface TicketCardProps {
  type: string;
  price: number;
  features: string[];
  status: "available" | "hot" | "limited" | "soldout";
  remaining?: number;
  badge?: string;
}

const statusConfig = {
  available: {
    badge: "Disponible",
    icon: Check,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    buttonText: "Acheter maintenant",
    buttonBg: "bg-emerald-500 hover:bg-emerald-600",
  },
  hot: {
    badge: "🔥 Hot",
    icon: Flame,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    buttonText: "Réserver vite",
    buttonBg: "bg-orange-500 hover:bg-orange-600",
  },
  limited: {
    badge: "⚠️ Presque complet",
    icon: AlertTriangle,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    buttonText: "Dépêche-toi !",
    buttonBg: "bg-yellow-500 hover:bg-yellow-600",
  },
  soldout: {
    badge: "❌ Sold out",
    icon: X,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    buttonText: "Épuisé",
    buttonBg: "bg-gray-600 cursor-not-allowed",
  },
};

export function TicketCard({ type, price, features, status, remaining, badge }: TicketCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border ${config.borderColor} p-6 transition-all duration-300`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={status !== "soldout" ? { 
        scale: 1.05,
        y: -10,
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${config.bgColor} border ${config.borderColor}`}>
        <span className={`text-xs font-medium ${config.color}`}>
          {badge || config.badge}
        </span>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${config.bgColor} flex items-center justify-center mb-4`}>
          <Icon className={`w-7 h-7 ${config.color}`} />
        </div>

        {/* Type */}
        <h3 className="text-2xl font-bold text-white mb-2">{type}</h3>

        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">
            {price.toLocaleString("fr-FR")}
          </span>
          <span className="text-lg text-gray-400 ml-2">FCFA</span>
        </div>

        {/* Remaining */}
        {remaining !== undefined && status !== "soldout" && (
          <motion.p
            className={`text-sm ${config.color} mb-4`}
            animate={status === "limited" ? {
              opacity: [1, 0.5, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Plus que {remaining} places disponibles
          </motion.p>
        )}

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
              <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white ${config.buttonBg} transition-all duration-200`}
          whileHover={status !== "soldout" ? { scale: 1.05 } : {}}
          whileTap={status !== "soldout" ? { scale: 0.95 } : {}}
          disabled={status === "soldout"}
        >
          {config.buttonText}
        </motion.button>
      </div>

      {/* Glow effect for hot status */}
      {status === "hot" && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 opacity-20 blur-2xl -z-10"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}
