import toast, { Toaster } from 'react-hot-toast';
import { WalletProvider, useWallet } from './context/WalletContext';
import { useVoting } from './hooks/useVoting';
import Header from './components/Header';
import CandidateCard from './components/CandidateCard';
import ConnectWalletPrompt from './components/ConnectWalletPrompt';
import ResultsBar from './components/ResultsBar';
import NetworkChecker from './components/NetworkChecker';
import ContractInfo from './components/ContractInfo';

function VotingDashboard() {
  const { account } = useWallet();
  const { candidates, hasVoted, loading, refreshing, vote, refresh } = useVoting({ account });

  if (!account) {
    return <ConnectWalletPrompt />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Contract Info Banner */}
      <ContractInfo />

      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Cast Your Vote
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Choose your preferred candidate below. Each wallet address can vote only once.
        </p>
        {hasVoted && (
          <div className="mt-4 inline-flex items-center space-x-2 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2">
            <svg 
              className="w-5 h-5 text-accent" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-accent font-medium">You have already voted</span>
          </div>
        )}
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onVote={vote}
            isVoting={loading}
            hasVoted={hasVoted}
          />
        ))}
      </div>

      {/* Refresh Button */}
      <div className="text-center mt-12">
        <button
          onClick={refresh}
          disabled={refreshing}
          className="inline-flex items-center space-x-2 bg-background-light hover:bg-background-lighter text-gray-300 px-6 py-3 rounded-lg transition-all duration-200 border border-background-lighter hover:border-primary/50 disabled:opacity-50"
        >
          <svg 
            className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          <span>Refresh Results</span>
        </button>
      </div>

      {/* Analytics Bar Chart */}
      <ResultsBar candidates={candidates} refreshing={refreshing} />
    </div>
  );
}

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-zinc-950">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#000000ff',
              color: '#fff',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
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
