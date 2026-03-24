import { motion } from "motion/react";

interface LiveIndicatorProps {
  count: number;
  timeframe?: string;
}

export function LiveIndicator({ count, timeframe = "dernière heure" }: LiveIndicatorProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2 h-2 bg-red-500 rounded-full"
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="text-sm font-medium text-red-400">En direct</span>
      </div>
      
      <div className="w-px h-4 bg-red-500/30" />
      
      <span className="text-sm text-gray-300">
        +{count} billets vendus dans la {timeframe}
      </span>
    </motion.div>
  );
}
