import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, Ticket, DollarSign, Tag, ArrowLeft, RefreshCw } from "lucide-react";
import { StatsCard } from "../components/StatsCard";
import { RevenueCardLarge } from "../components/RevenueCardLarge";
import { SparklineChart } from "../components/SparklineChart";
import { LiveIndicator } from "../components/LiveIndicator";
import { Link } from "react-router";
import { getSalesData, onSalesUpdate, resetSalesData, SalesData } from "../lib/salesStore";
import logo from "../assets/logo.png"; // <-- import du logo

const TOTAL_CAPACITY = 6791;

export default function AdminDashboard() {
  const [stats, setStats] = useState<SalesData>(() => getSalesData());
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const unsubscribe = onSalesUpdate((newData) => {
      setStats(newData);
    });
    return unsubscribe;
  }, []);

  const handleReset = () => {
    resetSalesData();
    setStats(getSalesData());
    setResetKey(prev => prev + 1);
  };

  const categories = [
    { name: "Standard", key: "standard", color: "bg-emerald-500" },
    { name: "Premium", key: "premium", color: "bg-orange-500" },
    { name: "VIP", key: "vip", color: "bg-yellow-500" },
    { name: "Carré Or", key: "carre-or", color: "bg-amber-500" },
  ];

  const totalSoldCategory = stats.totalSold > 0 ? stats.totalSold : 1;
  const distribution = categories.map(cat => ({
    ...cat,
    percentage: (stats.ticketsByCategory[cat.key as keyof typeof stats.ticketsByCategory] / totalSoldCategory) * 100,
  }));

  const averageBasket = stats.totalOrders > 0 ? stats.grossRevenue / stats.totalOrders : 0;
  const ticketsRemaining = Math.max(0, TOTAL_CAPACITY - stats.totalSold);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:bg-white/[0.08] mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au site
            </motion.button>
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard Admin</h1>
              <p className="text-gray-400">10 ans du Gang — Vano Baby</p>
            </div>
            <LiveIndicator count={Math.floor(Math.random() * 20) + 5} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            label="Tickets vendus"
            value={stats.totalSold}
            color="green"
            icon={<Ticket className="w-5 h-5" />}
            animate={true}
          />
          <StatsCard
            label="Revenus bruts"
            value={stats.grossRevenue}
            color="yellow"
            icon={<DollarSign className="w-5 h-5" />}
            suffix=" FCFA"
            animate={true}
          />
          <StatsCard
            label="Tickets restants"
            value={ticketsRemaining}
            color="red"
            icon={<Ticket className="w-5 h-5" />}
            animate={true}
          />
          <StatsCard
            label="Réductions"
            value={stats.discounts}
            color="gray"
            icon={<Tag className="w-5 h-5" />}
            suffix=" FCFA"
            animate={false}
          />
        </div>

        {/* Large Revenue Card */}
        <div className="mb-8">
          <RevenueCardLarge value={stats.netRevenue} />
        </div>

        {/* Charts Section */}
        <div key={`charts-${resetKey}`} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-300">Tendance des ventes</h3>
              {stats.salesHistory && stats.salesHistory.length >= 2 && (
                <span className="text-sm text-emerald-400">
                  {stats.salesHistory[stats.salesHistory.length - 1] > stats.salesHistory[stats.salesHistory.length - 2] ? "↗" : "↘"}
                </span>
              )}
            </div>
            <div className="w-full overflow-x-auto">
              <SparklineChart data={stats.salesHistory ?? []} />
            </div>
          </motion.div>

          <motion.div
            className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-300 mb-6">Répartition des ventes</h3>
            <div className="space-y-4">
              {distribution.map((item, index) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-white font-medium">{item.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          className="p-6 rounded-3xl bg-gradient-to-br from-[#B50C00]/10 to-red-500/5 backdrop-blur-xl border border-red-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Performance globale</h3>
              <p className="text-sm text-gray-400">Taux de conversion et métriques clés</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <p className="text-sm text-gray-400 mb-1">Taux de vente</p>
              <p className="text-3xl font-bold text-emerald-400">
                {stats.totalSold > 0 ? ((stats.totalSold / TOTAL_CAPACITY) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <p className="text-sm text-gray-400 mb-1">Panier moyen</p>
              <p className="text-3xl font-bold text-yellow-400">
                {averageBasket.toLocaleString()} FCFA
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <p className="text-sm text-gray-400 mb-1">Ventes/heure</p>
              <p className="text-3xl font-bold text-orange-400">
                {stats.totalOrders > 0 ? Math.floor(stats.totalOrders / 0.5) : 0}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer with reset button */}
        <motion.div
          className="mt-8 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-gray-400 mb-3">
            🔒 Dashboard privé • Données mises à jour en temps réel
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Réinitialiser les statistiques
          </button>
        </motion.div>

        {/* Logo fixe en bas à droite */}
        <motion.img
          src={logo}
          alt="VANO BABY"
          className="fixed bottom-4 right-4 z-50 w-14 md:w-20 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => window.location.href = '/'}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        />
      </div>
    </div>
  );
}