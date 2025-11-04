import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { WalletProvider, useWallet } from './context/WalletContext';
import { useVoting } from './hooks/useVoting';
import Header from './components/Header';
import CandidateCard from './components/CandidateCard';
import ConnectWalletPrompt from './components/ConnectWalletPrompt';
import ResultsBar from './components/ResultsBar';
import NetworkChecker from './components/NetworkChecker';
import ContractInfo from './components/ContractInfo';
import VoteModal from './components/VoteModal';
import Stats from './components/Stats';

function VotingDashboard() {
  const { account } = useWallet();
  const { candidates, hasVoted, loading, refreshing, vote, refresh } = useVoting({ account });
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  if (!contractAddress || contractAddress === '0xYourContractAddressHere') {
    return null;
  }

  const shortAddress = `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`;

  // Calculate total votes
  const totalVotes = candidates.reduce((sum, c) => sum + c.voteCount, 0);

  const handleVoteClick = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setSelectedCandidate(candidate);
      setShowModal(true);
    }
  };

  const handleConfirmVote = async () => {
    if (selectedCandidate) {
      await vote(selectedCandidate.id);
      setShowModal(false);
      setSelectedCandidate(null);
    }
  };

  const handleCancelVote = () => {
    setShowModal(false);
    setSelectedCandidate(null);
  };

  if (!account) {
    return <ConnectWalletPrompt />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container bg-[#0d1117] mx-auto px-4 py-8"
    >

      {/* Title Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12 mt-8"
      >
        <h2 className="text-5xl font-bold text-white mb-4 font-display">
          Cast Your Vote
        </h2>
        <p className="text-lg text-gray-300">
          Candidates and vote counts are loaded directly from the smart contract at{' '}
          <code className="text-primary font-mono text-xs bg-primary/10 px-2 py-1 rounded">
            {shortAddress}
          </code>
        </p>
        <AnimatePresence>
          {hasVoted && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="mt-4 inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2"
            >
              <svg
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-400 font-medium">You have already voted</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Candidates Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12"
      >
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onVote={handleVoteClick}
            isVoting={loading}
            hasVoted={hasVoted}
          />
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <Stats
          candidates={candidates}
          totalVotes={totalVotes}
          votingStatus="active"
        />
      </motion.div>

      {/* Vote Confirmation Modal */}
      <VoteModal
        isOpen={showModal}
        onClose={handleCancelVote}
        onConfirm={handleConfirmVote}
        candidate={selectedCandidate}
        isLoading={loading}
      />
    </motion.div>
  );
}

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-[#0d1117]">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #1a1f2e 0%, #0f1419 100%)',
              color: '#fff',
              border: '1px solid rgba(88, 166, 255, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              padding: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            },
            success: {
              iconTheme: {
                primary: '#3fb950',
                secondary: '#fff',
              },
              style: {
                border: '1px solid rgba(63, 185, 80, 0.3)',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
              style: {
                border: '1px solid rgba(239, 68, 68, 0.3)',
              },
            },
          }}
        />
        <Header />
        <NetworkChecker />
        <VotingDashboard />
      </div>
    </WalletProvider>
  );
}

export default App;
