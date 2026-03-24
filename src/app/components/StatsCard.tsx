import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface StatsCardProps {
  label: string;
  value: number | string;
  color: "green" | "yellow" | "red" | "gray";
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  animate?: boolean;
}

const colorMap = {
  green: {
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    border: "border-emerald-500/30",
  },
  yellow: {
    text: "text-amber-400",
    glow: "shadow-amber-500/20",
    border: "border-amber-500/30",
  },
  red: {
    text: "text-red-400",
    glow: "shadow-red-500/20",
    border: "border-red-500/30",
  },
  gray: {
    text: "text-gray-400",
    glow: "shadow-gray-500/10",
    border: "border-gray-500/20",
  },
};

export function StatsCard({ 
  label, 
  value, 
  color, 
  icon, 
  prefix = "", 
  suffix = "",
  animate = true 
}: StatsCardProps) {
  const [count, setCount] = useState(0);
  const numericValue = typeof value === "number" ? value : parseInt(value.toString().replace(/\D/g, ""), 10);
  const isNumeric = typeof value === "number" || !isNaN(numericValue);

  useEffect(() => {
    if (!animate || !isNumeric) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue, animate, isNumeric]);

  const displayValue = animate && isNumeric ? count : value;
  const formattedValue = typeof displayValue === "number" 
    ? displayValue.toLocaleString("fr-FR")
    : displayValue;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-6 transition-all duration-300 ${colorMap[color].glow}`}
      whileHover={{ 
        scale: 1.03,
        boxShadow: `0 0 30px ${colorMap[color].glow}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-gray-400">{label}</p>
          {icon && <div className={colorMap[color].text}>{icon}</div>}
        </div>
        
        <div className={`text-3xl font-bold ${colorMap[color].text}`}>
          {prefix}{formattedValue}{suffix}
        </div>

        {color === "red" && (
          <motion.div
            className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
