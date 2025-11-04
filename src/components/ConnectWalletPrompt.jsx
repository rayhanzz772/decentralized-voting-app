import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';

const ConnectWalletPrompt = () => {
  const { connectWallet, isConnecting } = useWallet();

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure Voting',
      description: 'Blockchain-powered security ensures your vote is tamper-proof',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'One Vote Per Address',
      description: 'Fair and transparent - each wallet can only vote once',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Live Results',
      description: 'Watch real-time vote counts and analytics as they happen',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'Instant transactions on the blockchain with minimal gas fees',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="relative min-h-[85vh] px-4 py-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6 font-display"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              VoteChain
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            The future of democratic voting on the blockchain. Secure, transparent, and decentralized.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={connectWallet}
            disabled={isConnecting}
            className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-2xl disabled:opacity-50 overflow-hidden group"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative flex items-center space-x-3">
              {isConnecting ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Connect Wallet to Start</span>
                </>
              )}
            </div>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-4 text-sm text-gray-500"
          >
            Supports MetaMask, WalletConnect, and other Web3 wallets
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-[#1a1f2e]/80 to-[#0f1419]/80 backdrop-blur-xl border border-[#3d444d]/50 rounded-2xl p-6 h-full overflow-hidden transition-all duration-300 hover:border-[#3d444d]/80 hover:shadow-2xl">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
                
                {/* Glow on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-xl`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="relative bg-gradient-to-br from-[#1a1f2e]/80 to-[#0f1419]/80 backdrop-blur-xl border border-[#3d444d]/50 rounded-3xl p-8 md:p-12"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
                className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2"
              >
                100%
              </motion.div>
              <p className="text-gray-400">Transparent & Secure</p>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
                className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  ⚡
                </motion.span>
              </motion.div>
              <p className="text-gray-400">Lightning Fast Transactions</p>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.2, type: "spring" }}
                className="text-5xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2"
              >
                24/7
              </motion.div>
              <p className="text-gray-400">Always Available</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="flex flex-col items-center mt-12 text-gray-500"
        >
          <p className="text-sm mb-2">Get started by connecting your wallet</p>
          <motion.svg
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
};

export default ConnectWalletPrompt;
