import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface RevenueCardLargeProps {
  value: number;
  label?: string;
}

export function RevenueCardLarge({ value, label = "Revenus nets" }: RevenueCardLargeProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 backdrop-blur-xl border border-emerald-500/30 p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-base text-gray-300">{label}</p>
          </div>
          
          <motion.div
            className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-xs font-medium text-emerald-400">+12.5%</span>
          </motion.div>
        </div>

        <div className="text-5xl font-bold text-emerald-400">
          {count.toLocaleString("fr-FR")} <span className="text-3xl">FCFA</span>
        </div>
      </div>
    </motion.div>
  );
}
