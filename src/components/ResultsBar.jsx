// src/components/ResultsBar.jsx
/**
 * Live voting results with animated progress bars
 * Shows vote counts and percentages for each candidate
 */
export default function ResultsBar({ candidates, refreshing }) {
  const total = candidates.reduce((sum, c) => sum + (c.voteCount || 0), 0) || 1;

  return (
    <div className="bg-[#151b23] border border-[#3d444d] rounded-xl p-6 mt-8 max-w-3xl mx-auto shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-bold text-white">Live Results</h4>
        {refreshing && (
          <div className="flex items-center space-x-2 text-primary text-sm">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span>Updating...</span>
          </div>
        )}
      </div>

      {/* Results bars */}
      <div className="space-y-4">
        {candidates.map((candidate) => {
          const percentage = total > 0 ? Math.round((candidate.voteCount / total) * 100) : 0;
          
          return (
            <div key={candidate.id}>
              {/* Candidate name and stats */}
              <div className="flex justify-between items-baseline text-sm mb-2">
                <span className="text-gray-300 font-medium">{candidate.name}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">{candidate.voteCount} votes</span>
                  <span className="text-primary font-semibold">{percentage}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total votes */}
      <div className="mt-6 pt-4 border-t border-background-lighter">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Total Votes Cast</span>
          <span className="text-white font-bold text-lg">{total}</span>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Results update automatically every 10 seconds
      </p>
    </div>
  );
}
