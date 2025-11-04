// src/components/VoteModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/**
 * Glassmorphism confirmation modal for voting
 * Displays before submitting a vote transaction
 */
export default function VoteModal({ isOpen, onClose, candidate, onConfirm, isVoting }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isVoting) return; // Prevent closing while voting
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleConfirm = async () => {
    await onConfirm();
  };

  if (!candidate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            {/* Glassmorphism Card */}
            <div className="relative bg-gradient-to-br from-[#1a1f2e]/95 to-[#0f1419]/95 backdrop-blur-xl border border-[#3d444d]/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Accent Gradient Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              
              {/* Glow Effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                      <svg 
                        className="w-6 h-6 text-white" 
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
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Confirm Vote</h3>
                      <p className="text-sm text-gray-400">This action cannot be undone</p>
                    </div>
                  </div>
                  
                  {!isVoting && (
                    <button
                      onClick={handleClose}
                      className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Candidate Info */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-6">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-[#1a1f2e] flex items-center justify-center">
                        <svg 
                          className="w-8 h-8 text-white" 
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
                      </div>
                    </div>

                    {/* Candidate Details */}
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{candidate.name}</h4>
                      <p className="text-sm text-gray-400">Candidate #{candidate.id + 1}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        Current votes: {candidate.voteCount}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <svg 
                      className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-yellow-200 font-medium">Important</p>
                      <p className="text-xs text-yellow-300/80 mt-1">
                        Each wallet can only vote once. This transaction will be recorded on the blockchain.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleClose}
                    disabled={isVoting}
                    className="flex-1 px-6 py-3 rounded-lg font-medium text-gray-300 bg-white/5 border border-[#3d444d] hover:bg-white/10 hover:border-[#3d444d]/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isVoting}
                    className="flex-1 px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isVoting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Confirming...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Confirm Vote</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Transaction Info */}
                <p className="text-xs text-center text-gray-500 mt-4">
                  Gas fees will be charged by your wallet
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
