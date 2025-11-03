import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abiFile from "./VotingABI.json";

const contractABI = abiFile.abi;

function App() {
  const [account, setAccount] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [contract, setContract] = useState(null);

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Load contract
useEffect(() => {
  if (window.ethereum && account) {
    const setup = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const address = import.meta.env.VITE_CONTRACT_ADDRESS.trim();
      console.log("🚀 Creating contract with address:", address);

      if (!ethers.isAddress(address)) {
        console.error("❌ Invalid contract address format:", address);
        return;
      }

      const votingContract = new ethers.Contract(address, contractABI, signer);
      setContract(votingContract);
    };
    setup();
  }
}, [account]);


  // Get candidates
  const loadCandidates = async () => {
    if (contract) {
      const data = await contract.getCandidates();
      setCandidates(data);
    }
  };

  // Vote function
  const handleVote = async (index) => {
    if (contract) {
      const tx = await contract.vote(index);
      await tx.wait();
      alert("Vote successful!");
      loadCandidates();
    }
  };

  useEffect(() => {
    if (contract) loadCandidates();
  }, [contract]);

  return (
    <div style={{ padding: 20 }}>
      <h1>🗳️ Decentralized Voting DApp</h1>
      {account ? (
        <p>Connected as: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask</button>
      )}

      <h2>Candidates</h2>
      {candidates.length === 0 ? (
        <p>Loading candidates...</p>
      ) : (
        candidates.map((c, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <strong>{c.name}</strong> — {Number(c.voteCount)} votes
            <button style={{ marginLeft: 10 }} onClick={() => handleVote(i)}>
              Vote
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
