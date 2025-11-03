const ConnectWalletPrompt = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/50">
          <svg 
            className="w-12 h-12 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-4">
          Connect Your Wallet
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          To participate in the voting process, please connect your Web3 wallet. 
          Make sure you're on the correct network before voting.
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {[
            'Secure blockchain voting',
            'One vote per address',
            'Transparent results',
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 text-left bg-background-light rounded-lg p-3 border border-background-lighter"
            >
              <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg 
                  className="w-4 h-4 text-accent" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* Arrow pointing up */}
        <div className="flex flex-col items-center text-gray-500">
          <svg 
            className="w-6 h-6 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
          <p className="text-sm mt-2">Click "Connect Wallet" above to get started</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletPrompt;
