// src/hooks/useVoting.js
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getContract, getSigner } from '../lib/contract';

/**
 * Custom hook for voting operations
 * Loads candidates dynamically from the smart contract
 * @param {Object} options
 * @param {string|null} options.account - Connected wallet address
 * @param {number} options.pollInterval - Auto-refresh interval in ms (default: 10000)
 * @returns {Object} Voting state and functions
 */
export function useVoting({ account, pollInterval = 10000 }) {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Fetches candidates from contract and their vote counts
   */
  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const signer = await getSigner();
      const contract = getContract(signer);

      // Check if current account has voted
      if (account) {
        const voted = await contract.hasVoted(account);
        setHasVoted(Boolean(voted));
      }

      // Fetch candidates from contract (getCandidates returns array of {name, voteCount})
      const data = await contract.getCandidates();
      
      // Transform contract data to UI format
      const transformedCandidates = data.map((candidate, index) => ({
        id: index,
        name: candidate.name,
        voteCount: Number(candidate.voteCount)
      }));

      setCandidates(transformedCandidates);
    } catch (err) {
      console.error('Refresh error:', err);
      toast.error('Failed to load voting data');
    } finally {
      setRefreshing(false);
    }
  }, [account]);

  /**
   * Submits a vote transaction
   * @param {number} candidateId - Candidate ID (0, 1, or 2)
   */
  const vote = useCallback(async (candidateId) => {
    if (hasVoted) {
      toast.error('You have already voted!');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Submitting your vote...');

    try {
      const signer = await getSigner();
      const contract = getContract(signer);

      // Submit transaction
      const tx = await contract.vote(candidateId);
      toast.loading('Waiting for blockchain confirmation...', { id: toastId });
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      toast.success('Vote recorded successfully!', { id: toastId });
      setHasVoted(true);
      
      // Refresh data after successful vote
      await refresh();
      
      return receipt;
    } catch (err) {
      console.error('Vote error:', err);
      
      const code = err?.code;
      const message = String(err?.message || '').toLowerCase();
      
      if (code === 'ACTION_REJECTED' || code === 4001) {
        toast.error('Transaction rejected by user', { id: toastId });
      } else if (message.includes('already') || message.includes('voted')) {
        toast.error('You have already voted!', { id: toastId });
        setHasVoted(true);
      } else if (message.includes('invalid') || message.includes('candidate')) {
        toast.error('Invalid candidate selection', { id: toastId });
      } else {
        toast.error('Failed to submit vote. Please try again.', { id: toastId });
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [hasVoted, refresh]);

  // Auto-refresh on mount and interval
  useEffect(() => {
    refresh();
    
    if (pollInterval > 0) {
      const intervalId = setInterval(refresh, pollInterval);
      return () => clearInterval(intervalId);
    }
  }, [refresh, pollInterval]);

  return {
    candidates,
    hasVoted,
    loading,
    refreshing,
    vote,
    refresh,
  };
}
