// src/components/Stats.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Stats = ({ candidates, totalVotes, votingStatus }) => {
  const [animatedVotes, setAnimatedVotes] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  // Find winner (candidate with most votes)
  const winner = candidates.reduce((prev, current) => 
    (current.voteCount > prev.voteCount) ? current : prev
  , candidates[0] || {});

  // Calculate participation rate (dummy calculation)
  const participationRate = totalVotes > 0 ? Math.min(100, (totalVotes / 1000) * 100) : 0;

  // Animate vote counts
  useEffect(() => {
    candidates.forEach((candidate) => {
      const start = animatedVotes[candidate.id] || 0;
      const end = candidate.voteCount;
      const duration = 1000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);

        setAnimatedVotes(prev => ({ ...prev, [candidate.id]: current }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    });
  }, [candidates]);

  // Show confetti when voting ends and there's a winner
  useEffect(() => {
    if (votingStatus === 'ended' && winner.voteCount > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [votingStatus, winner]);

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center space-x-3">
          <span>Live Statistics</span>
        </h2>
        <p className="text-gray-400">Real-time voting analytics</p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Votes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative bg-gradient-to-br from-[#1a1f2e]/80 to-[#0f1419]/80 backdrop-blur-xl border border-[#3d444d]/50 rounded-2xl p-6 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          <div className="relative">
            <p className="text-sm text-gray-400 mb-1">Total Votes Cast</p>
            <motion.div
              key={totalVotes}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-white"
            >
              {totalVotes}
            </motion.div>
            <div className="mt-2 flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <span className="text-xs text-gray-400">Live updates</span>
            </div>
          </div>
        </motion.div>

        {/* Participation Rate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gradient-to-br from-[#1a1f2e]/80 to-[#0f1419]/80 backdrop-blur-xl border border-[#3d444d]/50 rounded-2xl p-6 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-teal-500" />
          <div className="relative">
            <p className="text-sm text-gray-400 mb-1">Participation Rate</p>
            <div className="text-4xl font-bold text-white">{participationRate.toFixed(1)}%</div>
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${participationRate}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-green-500 to-teal-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Current Leader */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative bg-gradient-to-br from-[#1a1f2e]/80 to-[#0f1419]/80 backdrop-blur-xl border border-[#3d444d]/50 rounded-2xl p-6 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500" />
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 1, x: '50%' }}
                  animate={{
                    y: [0, -200],
                    opacity: [1, 0],
                    x: [
                      '50%',
                      `${50 + (Math.random() - 0.5) * 100}%`
                    ],
                    rotate: [0, Math.random() * 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                  className="absolute top-0"
                  style={{ left: `${Math.random() * 100}%` }}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    ['bg-yellow-400', 'bg-blue-400', 'bg-pink-400', 'bg-green-400'][i % 4]
                  }`} />
                </motion.div>
              ))}
            </div>
          )}
          <div className="relative">
            <p className="text-sm text-gray-400 mb-1">
              {votingStatus === 'ended' ? 'Winner' : 'Current Leader'}
            </p>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="text-xl font-bold text-white truncate">
                {winner.name || 'No votes yet'}
              </div>
            </div>
            {winner.voteCount > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {winner.voteCount} votes ({((winner.voteCount / totalVotes) * 100).toFixed(1)}%)
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Vote Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative bg-gradient-to-br from-[#1a1f2e]/80 to-[#0f1419]/80 backdrop-blur-xl border border-[#3d444d]/50 rounded-2xl p-6"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Vote Distribution</span>
          </h3>
          <p className="text-sm text-gray-400">Percentage breakdown by candidate</p>
        </div>

        <div className="space-y-4">
          {candidates.map((candidate, index) => {
            const percentage = totalVotes > 0 ? (candidate.voteCount / totalVotes) * 100 : 0;
            const colors = [
              { from: 'from-blue-500', to: 'to-purple-500', text: 'text-blue-400' },
              { from: 'from-green-500', to: 'to-teal-500', text: 'text-green-400' },
              { from: 'from-orange-500', to: 'to-red-500', text: 'text-orange-400' },
              { from: 'from-indigo-500', to: 'to-pink-500', text: 'text-indigo-400' },
            ];
            const color = colors[index % colors.length];

            return (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${color.from} ${color.to}`} />
                    <span className="text-sm font-medium text-white">{candidate.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-400">{animatedVotes[candidate.id] || 0} votes</span>
                    <span className={`text-sm font-bold ${color.text}`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${color.from} ${color.to} relative`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {candidates.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>No candidates yet</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Stats;
