import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const TARGET_DATE = new Date('2026-04-04T16:00:00'); // 4 avril 2026 à 16h

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-4 md:gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-white/[0.08] backdrop-blur-md rounded-xl px-4 py-3 min-w-[80px] border border-white/10">
            <span className="text-3xl md:text-4xl font-mono font-bold text-white">
              {unit.value.toString().padStart(2, '0')}
            </span>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{unit.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};