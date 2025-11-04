// src/components/CandidateCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const CandidateCard = ({ candidate, onVote, isVoting, hasVoted }) => {
  const { id, name, voteCount, description, avatar } = candidate;
  const [isHovered, setIsHovered] = useState(false);

  const handleVote = () => {
    if (!hasVoted && !isVoting) {
      onVote(id);
    }
  };

  // Generate gradient based on candidate ID
  const gradients = [
    'from-blue-500 via-purple-500 to-pink-500',
    'from-green-500 via-teal-500 to-blue-500',
    'from-orange-500 via-red-500 to-pink-500',
    'from-indigo-500 via-purple-500 to-pink-500',
  ];
  const gradient = gradients[id % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: id * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glassmorphism Card */}
      <div className="relative bg-gradient-to-br from-[#1a1f2e]/80 to-[#0f1419]/80 backdrop-blur-xl border border-[#3d444d]/50 rounded-2xl p-6 shadow-2xl overflow-hidden transition-all duration-300 hover:border-[#3d444d]/80 hover:shadow-blue-500/10">
        
        {/* Accent Line Top */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
        
        {/* Glow Effect on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${gradient} rounded-full blur-3xl`}
        />

        {/* Candidate Header */}
        <div className="relative flex items-center space-x-4 mb-4">
          {/* Avatar with Gradient Border */}
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} p-0.5 flex-shrink-0 shadow-lg`}
          >
            <div className="w-full h-full rounded-full bg-[#1a1f2e] flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              )}
            </div>
          </motion.div>

          {/* Candidate Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate">{name}</h3>
            <p className="text-sm text-gray-400">Candidate #{id + 1}</p>
            <div className="flex items-center mt-1 text-xs text-blue-400">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Top Candidate</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="relative text-sm text-gray-400 mb-4 line-clamp-2">
          {description || `Experienced leader committed to positive change and innovation in our community.`}
        </p>

        {/* Vote Count Display */}
        <div className="relative bg-white/5 backdrop-blur-lg rounded-xl p-4 mb-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Total Votes</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-white">{voteCount}</span>
                <span className="text-sm text-gray-400">votes</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Vote Button */}
        <motion.button
          whileHover={{ scale: hasVoted || isVoting ? 1 : 1.02 }}
          whileTap={{ scale: hasVoted || isVoting ? 1 : 0.98 }}
          onClick={handleVote}
          disabled={hasVoted || isVoting}
          className={`relative w-full py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            hasVoted
              ? 'bg-green-500/20 text-green-400 cursor-not-allowed border border-green-500/30'
              : isVoting
              ? 'bg-blue-500/50 text-white cursor-wait'
              : `bg-gradient-to-r ${gradient} text-white hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5`
          }`}
        >
          {isVoting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : hasVoted ? (
            <>
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span>Already Voted</span>
            </>
          ) : (
            <>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span>Vote Now</span>
            </>
          )}
        </motion.button>

        {/* Already Voted Message */}
        {hasVoted && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center text-xs text-green-400 mt-3 flex items-center justify-center space-x-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>You have cast your vote</span>
          </motion.p>
        )}
      </div>

      {/* Hover Shine Effect */}
      <motion.div
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none rounded-2xl"
        style={{ transform: 'skewX(-20deg)' }}
      />
    </motion.div>
  );
};

export default CandidateCard;
