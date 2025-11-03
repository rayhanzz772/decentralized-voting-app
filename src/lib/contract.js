// src/lib/contract.js
import { Contract, BrowserProvider } from 'ethers';
import VotingABI from '../VotingABI.json';

const ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

/**
 * Validates that contract address is configured
 * @throws {Error} if address is missing or placeholder
 */
export function assertContractAddress() {
  if (!ADDRESS || ADDRESS === '0xYourContractAddressHere') {
    throw new Error('VITE_CONTRACT_ADDRESS is not set. Add it to your .env file.');
  }
}

/**
 * Creates a read-only provider from MetaMask
 * @returns {Promise<BrowserProvider>}
 * @throws {Error} if window.ethereum is not available
 */
export async function getProvider() {
  if (!window.ethereum) {
    throw new Error('No Web3 provider found. Please install MetaMask.');
  }
  return new BrowserProvider(window.ethereum);
}

/**
 * Gets a signer (for write operations)
 * @returns {Promise<Signer>}
 */
export async function getSigner() {
  const provider = await getProvider();
  return provider.getSigner();
}

/**
 * Creates a contract instance
 * @param {Signer|Provider} signerOrProvider - ethers v6 signer or provider
 * @returns {Contract}
 */
export function getContract(signerOrProvider) {
  assertContractAddress();
  return new Contract(ADDRESS, VotingABI.abi, signerOrProvider);
}

/**
 * Gets current chain ID
 * @returns {Promise<number>}
 */
export async function getChainId() {
  const provider = await getProvider();
  const network = await provider.getNetwork();
  return Number(network.chainId);
}

/**
 * Checks if user is on Sepolia testnet (11155111)
 * @returns {Promise<boolean>}
 */
export async function isSepoliaNetwork() {
  try {
    const chainId = await getChainId();
    return chainId === 11155111;
  } catch {
    return false;
  }
}
