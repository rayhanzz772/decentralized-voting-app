// Network configurations for different Ethereum networks
export const NETWORKS = {
  ETHEREUM_MAINNET: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID',
    blockExplorer: 'https://etherscan.io',
  },
  GOERLI: {
    chainId: 5,
    name: 'Goerli Testnet',
    rpcUrl: 'https://goerli.infura.io/v3/YOUR-PROJECT-ID',
    blockExplorer: 'https://goerli.etherscan.io',
  },
  SEPOLIA: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR-PROJECT-ID',
    blockExplorer: 'https://sepolia.etherscan.io',
  },
  POLYGON: {
    chainId: 137,
    name: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
  },
  POLYGON_MUMBAI: {
    chainId: 80001,
    name: 'Polygon Mumbai Testnet',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
  },
};

// Helper function to get network by chain ID
export const getNetworkByChainId = (chainId) => {
  return Object.values(NETWORKS).find(network => network.chainId === chainId);
};

// Helper function to format blockchain explorer URL for a transaction
export const getTxExplorerUrl = (txHash, chainId) => {
  const network = getNetworkByChainId(chainId);
  if (!network) return '';
  return `${network.blockExplorer}/tx/${txHash}`;
};

// Helper function to format blockchain explorer URL for an address
export const getAddressExplorerUrl = (address, chainId) => {
  const network = getNetworkByChainId(chainId);
  if (!network) return '';
  return `${network.blockExplorer}/address/${address}`;
};
