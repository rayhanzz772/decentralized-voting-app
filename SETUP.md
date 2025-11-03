# 🗳️ VoteChain - Decentralized Voting DApp

A modern, minimalist React frontend for a decentralized voting system built with Web3 technology. This application allows users to securely cast votes for candidates on the blockchain using their Web3 wallets.

![VoteChain](https://img.shields.io/badge/Web3-Voting-blue)
![React](https://img.shields.io/badge/React-19.x-61dafb)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)
![ethers.js](https://img.shields.io/badge/ethers.js-6.x-blue)

## ✨ Features

- 🔐 **Secure Wallet Connection**: MetaMask and WalletConnect-compatible wallets
- ⛓️ **Blockchain Integration**: Direct interaction with Ethereum smart contracts
- 🎨 **Modern UI**: Clean, minimalist design with Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🔔 **Toast Notifications**: Real-time feedback for all user actions
- ✅ **Vote Tracking**: Prevents double voting with on-chain verification
- 🔄 **Live Updates**: Real-time vote count updates
- 🎯 **Network Management**: Smart network detection and switching

## 🚀 Tech Stack

- **React** - Frontend framework with hooks
- **ethers.js** - Ethereum library for Web3 interactions
- **Tailwind CSS** - Utility-first CSS framework
- **react-hot-toast** - Beautiful notification system
- **Vite** - Next-generation frontend tooling

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension or another Web3 wallet
- A deployed Voting smart contract (with address)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd web3-voting-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your smart contract**
   
   Open `src/App.jsx` and update the contract address:
   ```javascript
   const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE';
   ```

   Alternatively, create a `.env` file in the root directory:
   ```env
   VITE_CONTRACT_ADDRESS=0xYourContractAddressHere
   ```

4. **Verify your contract ABI**
   
   Make sure `src/VotingABI.json` contains your contract's ABI. The expected interface includes:
   - `vote(uint candidateId)` - Cast a vote
   - `getVotes(uint candidateId) view returns (uint)` - Get vote count
   - `hasVoted(address voter) view returns (bool)` - Check if address voted

## 🎮 Usage

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

3. **Connect your wallet**
   
   - Click "Connect Wallet" in the top right
   - Approve the connection in your Web3 wallet
   - Ensure you're on the correct network

4. **Vote for a candidate**
   
   - Browse the three candidates
   - Click "Vote Now" on your preferred candidate
   - Confirm the transaction in your wallet
   - Wait for blockchain confirmation

## 📁 Project Structure

```
web3-voting-frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Navigation with wallet connection
│   │   ├── CandidateCard.jsx       # Individual candidate card
│   │   └── ConnectWalletPrompt.jsx # Wallet connection prompt
│   ├── context/
│   │   └── WalletContext.jsx       # Wallet state management
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # Application entry point
│   ├── index.css                    # Global styles with Tailwind
│   └── VotingABI.json               # Smart contract ABI
├── public/
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── vite.config.js                   # Vite configuration
└── package.json
```

## 🎨 Customization

### Changing Candidates

Edit the `candidates` array in `src/App.jsx`:
```javascript
const [candidates, setCandidates] = useState([
  { id: 0, name: 'Your Candidate 1', voteCount: 0 },
  { id: 1, name: 'Your Candidate 2', voteCount: 0 },
  { id: 2, name: 'Your Candidate 3', voteCount: 0 },
]);
```

### Styling & Colors

Modify `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    DEFAULT: '#6366f1',  // Change primary color
    dark: '#4f46e5',
    light: '#818cf8',
  },
  // ... more colors
}
```

## 🔧 Smart Contract Interface

Your smart contract should implement these functions:

```solidity
// Vote for a candidate
function vote(uint candidateId) external;

// Get vote count for a candidate
function getVotes(uint candidateId) external view returns (uint);

// Check if an address has voted
function hasVoted(address voter) external view returns (bool);
```

## 🐛 Troubleshooting

### "Please install MetaMask" error
- Install MetaMask extension from [metamask.io](https://metamask.io)
- Refresh the page after installation

### "Contract Not Configured" message
- Update `CONTRACT_ADDRESS` in `src/App.jsx`
- Ensure the address is valid and the contract is deployed

### Transactions failing
- Check you're on the correct network
- Ensure you have enough ETH for gas fees
- Verify the contract address is correct

### Wallet not connecting
- Make sure MetaMask is unlocked
- Check that you've approved the connection
- Try refreshing the page

## 🚢 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📝 Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_CONTRACT_ADDRESS=0xYourContractAddress
VITE_NETWORK_ID=1  # 1 for mainnet, 5 for Goerli, etc.
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Web3 integration via [ethers.js](https://docs.ethers.org/)
- Icons from [Heroicons](https://heroicons.com/)

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ for decentralized democracy**
