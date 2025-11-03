// src/components/NetworkChecker.jsx
import { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { getChainId } from '../lib/contract';

const SEPOLIA_CHAIN_ID = 11155111;
const NETWORK_NAME = 'Sepolia Testnet';

/**
 * Displays a warning banner if user is not on Sepolia network
 * Offers a button to switch networks automatically
 */
export default function NetworkChecker() {
  const { account } = useWallet();
  const [chainId, setChainId] = useState(null);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    if (account) {
      checkNetwork();
    }
  }, [account]);

  const checkNetwork = async () => {
    try {
      const id = await getChainId();
      setChainId(id);
    } catch (error) {
      console.error('Failed to get chain ID:', error);
    }
  };

  const switchToSepolia = async () => {
    setSwitching(true);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID in hex
      });
      
      // Wait a moment then recheck
      setTimeout(checkNetwork, 1000);
    } catch (error) {
      console.error('Failed to switch network:', error);
      
      // If network doesn't exist in wallet, try to add it
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'SEP',
                decimals: 18
              },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
          });
          setTimeout(checkNetwork, 1000);
        } catch (addError) {
          console.error('Failed to add network:', addError);
        }
      }
    } finally {
      setSwitching(false);
    }
  };

  // Don't show if not connected or on correct network
  if (!account || chainId === SEPOLIA_CHAIN_ID) {
    return null;
  }

  return (
    <div className="bg-yellow-500/10 border-l-4 border-yellow-500 px-6 py-4 mx-4 mt-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg 
            className="w-6 h-6 text-yellow-500 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <div>
            <h4 className="text-white font-semibold">Wrong Network Detected</h4>
            <p className="text-gray-300 text-sm mt-0.5">
              Please switch to <span className="text-yellow-400 font-medium">{NETWORK_NAME}</span> to use this DApp.
              {chainId && (
                <span className="text-gray-400 ml-1">(Currently on chain {chainId})</span>
              )}
            </p>
          </div>
        </div>
        
        <button
          onClick={switchToSepolia}
          disabled={switching}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ml-4"
        >
          {switching ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>Switching...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Switch Network</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
