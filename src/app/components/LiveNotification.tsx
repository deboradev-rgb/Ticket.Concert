import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart } from "lucide-react";

interface LiveNotificationProps {
  message: string;
  show: boolean;
}

export function LiveNotification({ message, show }: LiveNotificationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 left-6 z-50 max-w-sm"
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-red-400" />
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-white mb-1">Vente en direct</p>
                <p className="text-xs text-gray-300">{message}</p>
              </div>

              <motion.div
                className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"
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
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
