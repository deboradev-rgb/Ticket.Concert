import { motion } from "motion/react";

interface SparklineChartProps {
  data: number[];      // array of cumulative sales values
  height?: number;
  width?: number;
  color?: string;
}

export function SparklineChart({ data, height = 80, width = 300, color = "#B50C00" }: SparklineChartProps) {
  if (!data || data.length < 2) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Pas encore de données
      </div>
    );
  }

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1; // avoid division by zero

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <motion.polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      {/* Optional: area fill under the line */}
      <motion.polygon
        fill={`${color}20`}
        points={`${points} ${width},${height} 0,${height}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
}