// src/components/AdminRenameCandidates.jsx
import { useMemo, useState } from 'react';
import { useWallet } from '../context/WalletContext';

const LS_KEY = 'candidateLabels';
const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS?.toLowerCase?.();

const DEFAULT_NAMES = ['Candidate A', 'Candidate B', 'Candidate C'];

/**
 * Admin-only component for renaming candidates (UI labels only)
 * Set VITE_ADMIN_ADDRESS in .env to restrict access
 * If not set, component is visible to all users
 */
export default function AdminRenameCandidates() {
  const { account } = useWallet();
  
  // Check if current user is admin
  const isAdmin = useMemo(() => {
    if (!ADMIN_ADDRESS) return true; // No admin set = show to everyone
    if (!account) return false;
    return account.toLowerCase() === ADMIN_ADDRESS;
  }, [account]);

  // Load saved names from localStorage
  const [names, setNames] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return [...DEFAULT_NAMES];
    
    try {
      const parsed = JSON.parse(saved);
      return [
        parsed[0] || DEFAULT_NAMES[0],
        parsed[1] || DEFAULT_NAMES[1],
        parsed[2] || DEFAULT_NAMES[2],
      ];
    } catch {
      return [...DEFAULT_NAMES];
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  // Don't render if not admin
  if (!isAdmin) return null;

  const handleSave = () => {
    setIsSaving(true);
    
    // Save to localStorage
    const labelsMap = {
      0: names[0].trim() || DEFAULT_NAMES[0],
      1: names[1].trim() || DEFAULT_NAMES[1],
      2: names[2].trim() || DEFAULT_NAMES[2],
    };
    
    localStorage.setItem(LS_KEY, JSON.stringify(labelsMap));
    
    // Reload page to apply changes
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleReset = () => {
    if (confirm('Reset candidate names to defaults?')) {
      setNames([...DEFAULT_NAMES]);
      localStorage.removeItem(LS_KEY);
    }
  };

  return (
    <div className="bg-background-light border border-background-lighter rounded-xl p-6 mt-8 max-w-3xl mx-auto shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-bold text-white flex items-center space-x-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Admin: Customize Candidate Labels</span>
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            Changes are UI-only. On-chain candidate IDs (0, 1, 2) remain unchanged.
          </p>
        </div>
      </div>

      {/* Input fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {names.map((name, index) => (
          <div key={index}>
            <label className="block text-xs text-gray-400 mb-1.5">
              Candidate {index} Label
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                const newNames = [...names];
                newNames[index] = e.target.value;
                setNames(newNames);
              }}
              placeholder={DEFAULT_NAMES[index]}
              maxLength={50}
              className="w-full bg-background rounded-lg border border-background-lighter px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleReset}
          disabled={isSaving}
          className="text-sm text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
        >
          Reset to Defaults
        </button>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/50"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Save & Refresh</span>
            </>
          )}
        </button>
      </div>

      {/* Info banner */}
      <div className="mt-4 bg-primary/10 border border-primary/30 rounded-lg p-3">
        <p className="text-xs text-primary-light flex items-start space-x-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>Note:</strong> These labels are stored locally and only affect how candidates appear in your browser. 
            The blockchain contract still references candidates by their numeric IDs (0, 1, 2).
          </span>
        </p>
      </div>
    </div>
  );
}
