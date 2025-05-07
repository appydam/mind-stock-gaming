import { memo } from "react";
import MorphCard from "@/components/ui/MorphCard";
import { TrendingUp, TrendingDown, Trophy, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StatCardsProps {
  totalProfit: number;
  activeContestNumber: number;
  completedContestsNumber: number;
  realProfit?: number;
  virtualProfit?: number;
}

const StatCards = memo(
  ({
    totalProfit,
    activeContestNumber,
    completedContestsNumber,
    realProfit = 0,
    virtualProfit = 0,
  }: StatCardsProps) => {
    // Animation variants for card entrance
    const cardVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
      },
    };

    const renderProfitCard = (profit: number, label: string, index: number) => (
      <motion.div
        key={`${label}-${index}`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: index * 0.1 }}
      >
        <MorphCard
          className="p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
          aria-label={`${label}: ₹${Math.abs(profit).toFixed(2)}`}
          role="region"
        >
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            {label}
          </h3>
          <div className="flex items-center gap-3">
            {profit >= 0 ? (
              <TrendingUp
                className="h-5 w-5 text-green-500 flex-shrink-0"
                aria-hidden="true"
              />
            ) : (
              <TrendingDown
                className="h-5 w-5 text-red-500 flexspread-0"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xl font-bold tracking-tight ${
                profit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              ₹{Math.abs(profit).toFixed(2)}
            </span>
          </div>
        </MorphCard>
      </motion.div>
    );

    const cards = [
      realProfit !== undefined && virtualProfit !== undefined
        ? [
            renderProfitCard(realProfit, "Real Money P&L", 0),
            renderProfitCard(virtualProfit, "Virtual Money P&L", 1),
          ]
        : [renderProfitCard(totalProfit, "Total P&L", 0)],
      <motion.div
        key="active-contests"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <MorphCard
          className="p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
          aria-label={`Active Contests: ${activeContestNumber}`}
          role="region"
        >
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Active Contests
          </h3>
          <div className="flex items-center gap-3">
            <Trophy
              className="h-5 w-5 text-amber-500 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {activeContestNumber}
            </span>
          </div>
        </MorphCard>
      </motion.div>,
      <motion.div
        key="completed-contests"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <MorphCard
          className="p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
          aria-label={`Completed Contests: ${completedContestsNumber}`}
          role="region"
        >
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Completed Contests
          </h3>
          <div className="flex items-center gap-3">
            <Calendar
              className="h-5 w-5 text-blue-500 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {completedContestsNumber}
            </span>
          </div>
        </MorphCard>
      </motion.div>,
    ].flat();

    return (
      <AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {cards}
        </div>
      </AnimatePresence>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.totalProfit === nextProps.totalProfit &&
      prevProps.activeContestNumber === nextProps.activeContestNumber &&
      prevProps.completedContestsNumber === nextProps.completedContestsNumber &&
      prevProps.realProfit === nextProps.realProfit &&
      prevProps.virtualProfit === nextProps.virtualProfit
    );
  }
);

StatCards.displayName = "StatCards";

export default StatCards;