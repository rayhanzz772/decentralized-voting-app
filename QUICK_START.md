# 🚀 Quick Start Guide

## Immediate Next Steps

Your VoteChain DApp frontend is now ready! Here's what to do next:

### 1. Configure Your Smart Contract Address

**Option A: Using .env file (Recommended)**
```bash
cp .env.example .env
# Edit .env and add your contract address
VITE_CONTRACT_ADDRESS=0xYourActualContractAddress
```

**Option B: Direct in code**
Edit `src/App.jsx` line 11:
```javascript
const CONTRACT_ADDRESS = '0xYourActualContractAddress';
```

### 2. Verify Your Contract ABI

Ensure `src/VotingABI.json` contains your contract's ABI with these required functions:
- ✅ `vote(uint candidateId)`
- ✅ `getVotes(uint candidateId) view returns (uint)`
- ✅ `hasVoted(address voter) view returns (bool)`

### 3. Install & Run

```bash
npm install          # Install all dependencies
npm run dev          # Start development server
```

Visit: **http://localhost:5173** (or the port shown)

---

## 🎨 Components Overview

### `WalletContext` (src/context/WalletContext.jsx)
Global state management for:
- Wallet connection status
- User address & balance
- Provider & signer instances
- Network information

**Usage:**
```javascript
import { useWallet } from './context/WalletContext';

function MyComponent() {
  const { account, balance, connectWallet } = useWallet();
  // ...
}
```

### `Header` (src/components/Header.jsx)
Navigation bar with:
- VoteChain branding
- Connect/Disconnect wallet button
- Address display & balance

### `CandidateCard` (src/components/CandidateCard.jsx)
Individual candidate display with:
- Candidate name & ID
- Current vote count
- Vote button with loading states
- Already voted indicator

### `ConnectWalletPrompt` (src/components/ConnectWalletPrompt.jsx)
Welcome screen shown when wallet is not connected

### `VotingDashboard` (src/App.jsx)
Main application logic:
- Contract initialization
- Vote data fetching
- Transaction handling
- Error management

---

## 🎯 Key Functions

### In WalletContext:

```javascript
connectWallet()          // Connect user's Web3 wallet
disconnectWallet()       // Disconnect wallet
switchNetwork(chainId)   // Switch to different network
truncateAddress(addr)    // Format address (0x7F3a...C892)
```

### In VotingDashboard:

```javascript
fetchVotingData()        // Load votes & check if user voted
handleVote(candidateId)  // Submit vote transaction
```

---

## 🔧 Customization Guide

### Adding More Candidates

In `src/App.jsx`, update the initial state:
```javascript
const [candidates, setCandidates] = useState([
  { id: 0, name: 'Alice', voteCount: 0 },
  { id: 1, name: 'Bob', voteCount: 0 },
  { id: 2, name: 'Charlie', voteCount: 0 },
  { id: 3, name: 'Diana', voteCount: 0 },  // Add more
]);
```

### Changing Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR',
    dark: '#YOUR_DARKER_COLOR',
  },
}
```

### Modifying Toast Notifications

In `src/App.jsx`, adjust Toaster settings:
```javascript
<Toaster
  position="top-right"  // Change position
  toastOptions={{
    duration: 4000,     // Change duration
    // ...
  }}
/>
```

---

## 🐛 Common Issues & Solutions

### Issue: "Contract Not Configured"
**Solution:** Set `CONTRACT_ADDRESS` in `App.jsx` or `.env`

### Issue: Transactions failing
**Solutions:**
- Check you're on the correct network
- Verify contract address is correct
- Ensure sufficient ETH for gas

### Issue: Vote counts not updating
**Solution:** Click the "Refresh Results" button

### Issue: "Already Voted" but didn't vote
**Solution:** Check if the address was used before on the contract

---

## 📦 Project Structure Explained

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Top navigation
│   ├── CandidateCard.jsx  # Candidate voting card
│   └── ConnectWalletPrompt.jsx  # Wallet connection screen
├── context/            # React context providers
│   └── WalletContext.jsx  # Wallet state management
├── utils/              # Utility functions
│   └── networks.js     # Network configurations
├── App.jsx             # Main app & voting logic
├── main.jsx            # App entry point
├── index.css           # Global styles + Tailwind
└── VotingABI.json      # Smart contract ABI
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update `CONTRACT_ADDRESS` with mainnet address
- [ ] Test all voting scenarios
- [ ] Verify network detection works
- [ ] Test on mobile devices
- [ ] Run `npm run build`
- [ ] Test the production build locally
- [ ] Deploy to hosting (Vercel, Netlify, etc.)
- [ ] Update documentation with live URL

---

## 🔗 Useful Resources

- **ethers.js Docs:** https://docs.ethers.org/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Hooks:** https://react.dev/reference/react
- **MetaMask Docs:** https://docs.metamask.io/

---

## 📝 Testing Workflow

1. **Connect Wallet:** Test with MetaMask
2. **Check Network:** Switch to test network
3. **View Candidates:** Verify vote counts load
4. **Cast Vote:** Vote for a candidate
5. **Verify Transaction:** Check wallet for confirmation
6. **Check Vote Status:** Ensure "Already Voted" appears
7. **Refresh Data:** Test refresh button

---

## 💡 Pro Tips

- Use testnet (Goerli/Sepolia) during development
- Keep some test ETH in your wallet for gas
- Monitor console for detailed error messages
- Use the "Refresh Results" button after voting
- Test with multiple wallet accounts

---

**Need help? Check `SETUP.md` for detailed documentation!**
