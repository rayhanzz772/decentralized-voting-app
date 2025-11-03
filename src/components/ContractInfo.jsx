// src/components/ContractInfo.jsx
/**
 * Info banner showing that candidates are loaded from the smart contract
 */
export default function ContractInfo() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  
  if (!contractAddress || contractAddress === '0xYourContractAddressHere') {
    return null;
  }

  const shortAddress = `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`;

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-primary/10 border border-[#1f6feb] rounded-lg p-4 flex items-start space-x-3">
        <svg 
          className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
            clipRule="evenodd" 
          />
        </svg>
        <div className="flex-1">
          <p className="text-sm text-gray-300">
            Candidates and vote counts are loaded directly from the smart contract at{' '}
            <code className="text-primary font-mono text-xs bg-primary/10 px-2 py-1 rounded">
              {shortAddress}
            </code>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Auto-refreshes every 10 seconds • Network: Sepolia Testnet
          </p>
        </div>
      </div>
    </div>
  );
}
