import { useState } from 'react';

const CandidateCard = ({ candidate, onVote, isVoting, hasVoted }) => {
  const { id, name, voteCount } = candidate;
  const [isHovered, setIsHovered] = useState(false);

  const handleVote = () => {
    if (!hasVoted && !isVoting) {
      onVote(id);
    }
  };

  return (
    <div 
      className="bg-background-light rounded-xl p-6 border border-background-lighter hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Candidate Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'bg-primary' : 'bg-background-lighter'
          }`}>
            <svg 
              className="w-7 h-7 text-white" 
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
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-400">Candidate #{id}</p>
          </div>
        </div>
      </div>

      {/* Vote Count Display */}
      <div className="bg-background rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-400 mb-1">Total Votes</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">{voteCount}</span>
          <span className="text-gray-400">votes</span>
        </div>
      </div>

      {/* Vote Button */}
      <button
        onClick={handleVote}
        disabled={hasVoted || isVoting}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          hasVoted
            ? 'bg-background-lighter text-gray-400 cursor-not-allowed'
            : isVoting
            ? 'bg-primary/50 text-white cursor-wait'
            : 'bg-primary hover:bg-primary-dark text-white hover:shadow-lg hover:shadow-primary/50 transform hover:-translate-y-0.5'
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
      </button>

      {/* Already Voted Message */}
      {hasVoted && (
        <p className="text-center text-xs text-accent mt-2">
          ✓ You have already cast your vote
        </p>
      )}
    </div>
  );
};

export default CandidateCard;
