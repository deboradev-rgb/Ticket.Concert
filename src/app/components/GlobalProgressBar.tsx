import { motion } from "motion/react";

interface GlobalProgressBarProps {
  percentage: number;
  label?: string;
}

export function GlobalProgressBar({ percentage, label = "des billets vendus" }: GlobalProgressBarProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400">Progression globale</span>
        <span className="text-lg font-bold text-red-400">{percentage}%</span>
      </div>

      <div className="relative h-4 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.08]">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        >
          {/* Animated shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1,
            }}
          />
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-y-0 left-0 blur-xl bg-gradient-to-r from-red-600 to-orange-500 opacity-50"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">{label}</p>
    </motion.div>
  );
}
