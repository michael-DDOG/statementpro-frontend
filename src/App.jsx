import { useState, useEffect, useCallback } from 'react';

// API Configuration
const API_URL = 'http://18.218.29.238';

// Icons as SVG components
const Icons = {
  Upload: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  File: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Loader: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Crown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
      <path d="M3 20h18"/>
    </svg>
  ),
  AlertCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
};

// Auth Modal Component
function AuthModal({ onClose, onLogin, onRegister, error, setError }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await onLogin(email, password);
      } else {
        await onRegister(name, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-emerald-100 mt-1">
            {isLogin ? 'Sign in to continue' : 'Start converting statements today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <Icons.AlertCircle />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="John Doe"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Icons.Loader />
                <span>Please wait...</span>
              </>
            ) : (
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white"
        >
          <Icons.X />
        </button>
      </div>
    </div>
  );
}

// Pricing Modal Component
function PricingModal({ onClose, onUpgrade, currentPlan }) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: ['5 conversions/month', 'PDF upload', 'Excel export', 'Email support'],
      cta: 'Current Plan',
      disabled: true,
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      features: ['Unlimited conversions', 'Bulk upload (10 files)', 'Excel & CSV export', 'Priority support', 'No watermarks'],
      cta: 'Upgrade to Pro',
      disabled: false,
      highlight: true,
    },
    {
      name: 'Business',
      price: '$29.99',
      period: '/month',
      features: ['Everything in Pro', 'Unlimited bulk upload', 'API access', 'Custom integrations', 'Dedicated support'],
      cta: 'Contact Sales',
      disabled: false,
      highlight: false,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center relative">
          <h2 className="text-3xl font-bold">Upgrade Your Plan</h2>
          <p className="text-emerald-100 mt-2">Choose the plan that works best for you</p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <Icons.X />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-6 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-emerald-50 to-teal-50 border-2 border-emerald-500 relative'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <Icons.Check />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => !plan.disabled && onUpgrade(plan.name.toLowerCase())}
                disabled={plan.disabled || currentPlan === plan.name.toLowerCase()}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
                    : plan.disabled
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {currentPlan === plan.name.toLowerCase() ? 'Current Plan' : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Transaction Table Component
function TransactionTable({ data, onExport }) {
  const [selectedFormat, setSelectedFormat] = useState('xlsx');

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Extracted Transactions</h3>
          <p className="text-sm text-gray-500">{data.length} transactions found</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="xlsx">Excel (.xlsx)</option>
            <option value="csv">CSV (.csv)</option>
          </select>
          <button
            onClick={() => onExport(selectedFormat)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all"
          >
            <Icons.Download />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.slice(0, 20).map((tx, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{tx.date}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{tx.description}</td>
                <td className={`px-4 py-3 text-sm font-medium text-right whitespace-nowrap ${
                  tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    tx.type === 'credit' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                  ${tx.balance?.toFixed(2) || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 20 && (
          <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">
            Showing 20 of {data.length} transactions. Export to see all.
          </div>
        )}
      </div>
    </div>
  );
}

// History Modal Component
function HistoryModal({ onClose, conversions, onRedownload }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[80vh]">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Conversion History</h2>
            <p className="text-emerald-100 mt-1">Your recent file conversions</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <Icons.X />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {conversions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Icons.History />
              <p className="mt-2">No conversions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {conversions.map((conversion, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Icons.File />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{conversion.fileName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(conversion.createdAt).toLocaleDateString()} • {conversion.transactionCount} transactions
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRedownload(conversion)}
                    className="text-emerald-600 hover:text-emerald-700 p-2"
                  >
                    <Icons.Download />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  // State Management
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversions, setConversions] = useState([]);
  const [conversionCount, setConversionCount] = useState(0);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setConversionCount(parsedUser.conversions || 0);
        fetchConversions(token);
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fetch conversion history
  const fetchConversions = async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/conversions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setConversions(data.conversions || []);
      }
    } catch (err) {
      console.error('Failed to fetch conversions:', err);
    }
  };

  // Authentication handlers
  const handleLogin = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setConversionCount(data.user.conversions || 0);
      setShowAuth(false);
      setError(null);
      fetchConversions(data.token);
    }
  };

  const handleRegister = async (name, email, password) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setConversionCount(0);
      setShowAuth(false);
      setError(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setConversionCount(0);
    setFiles([]);
    setExtractedData(null);
    setConversions([]);
    setSuccess(null);
  };

  // File handling
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === 'application/pdf' || file.type.startsWith('image/')
    );

    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    } else {
      setError('Please upload PDF or image files only');
    }
  }, [user]);

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles) => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    // Check conversion limits for free users
    const maxConversions = user.plan === 'free' ? 5 : Infinity;
    const remainingConversions = maxConversions - conversionCount;

    if (user.plan === 'free' && newFiles.length > remainingConversions) {
      setError(`You can only convert ${remainingConversions} more file(s) this month. Upgrade for unlimited conversions!`);
      setShowPricing(true);
      return;
    }

    setFiles((prev) => [
      ...prev,
      ...newFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        name: file.name,
        size: file.size,
      })),
    ]);
    setError(null);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAllFiles = () => {
    setFiles([]);
    setExtractedData(null);
    setSuccess(null);
  };

  // Process files
  const processFiles = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    setExtractedData(null);

    const token = localStorage.getItem('token');

    try {
      for (let fileObj of files) {
        // Update status to processing
        setFiles((prev) =>
          prev.map((f) => (f.id === fileObj.id ? { ...f, status: 'processing' } : f))
        );

        const formData = new FormData();
        formData.append('file', fileObj.file);

        const response = await fetch(`${API_URL}/api/convert`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          // Update file status to completed
          setFiles((prev) =>
            prev.map((f) => (f.id === fileObj.id ? { ...f, status: 'completed' } : f))
          );

          // Store extracted data
          setExtractedData({
            fileName: data.data.fileName,
            transactions: data.data.transactions,
            bank: data.data.bank,
            currency: data.data.currency,
          });

          // Update user conversion count
          const newCount = conversionCount + 1;
          setConversionCount(newCount);
          const updatedUser = { ...user, conversions: newCount };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));

          setSuccess(`Successfully extracted ${data.data.transactions.length} transactions!`);
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === fileObj.id ? { ...f, status: 'error' } : f))
          );
          throw new Error(data.error || 'Conversion failed');
        }
      }

      // Refresh conversion history
      fetchConversions(token);
    } catch (err) {
      setError(err.message || 'An error occurred during conversion');
    } finally {
      setIsProcessing(false);
    }
  };

  // Export functionality
  const handleExport = async (format) => {
    if (!extractedData || !extractedData.transactions) return;

    const { transactions, fileName } = extractedData;

    if (format === 'csv') {
      // Generate CSV
      const headers = ['Date', 'Description', 'Amount', 'Type', 'Balance'];
      const rows = transactions.map((tx) => [
        tx.date,
        `"${tx.description.replace(/"/g, '""')}"`,
        tx.amount,
        tx.type,
        tx.balance || '',
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      downloadBlob(blob, `${fileName.replace('.pdf', '')}_transactions.csv`);
    } else {
      // For Excel, we'll use a simple approach (you can enhance with xlsx library)
      // Creating a basic HTML table that Excel can open
      let tableHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head><meta charset="UTF-8"></head>
        <body>
        <table border="1">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Balance</th>
          </tr>
      `;

      transactions.forEach((tx) => {
        tableHtml += `
          <tr>
            <td>${tx.date}</td>
            <td>${tx.description}</td>
            <td>${tx.amount}</td>
            <td>${tx.type}</td>
            <td>${tx.balance || ''}</td>
          </tr>
        `;
      });

      tableHtml += '</table></body></html>';

      const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
      downloadBlob(blob, `${fileName.replace('.pdf', '')}_transactions.xls`);
    }
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Upgrade handler
  const handleUpgrade = async (plan) => {
    if (!user) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      setError('Failed to create checkout session');
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">StatementPro</span>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button
                    onClick={() => setShowHistory(true)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Icons.History />
                    <span className="hidden sm:inline">History</span>
                  </button>

                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                    <Icons.User />
                    <span className="text-sm font-medium text-gray-700">{user.name || user.email}</span>
                    {user.plan === 'pro' && (
                      <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">PRO</span>
                    )}
                  </div>

                  {user.plan === 'free' && (
                    <button
                      onClick={() => setShowPricing(true)}
                      className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:from-amber-500 hover:to-orange-600 transition-all"
                    >
                      <Icons.Crown />
                      <span>Upgrade</span>
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Convert Bank Statements to Excel
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your PDF bank statements and get clean, organized Excel files in seconds.
            Supports all major banks.
          </p>
        </div>

        {/* Usage Counter for Free Users */}
        {user && user.plan === 'free' && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icons.AlertCircle />
              <div>
                <p className="font-medium text-amber-800">Free Plan: {5 - conversionCount} conversions remaining</p>
                <p className="text-sm text-amber-600">Upgrade to Pro for unlimited conversions</p>
              </div>
            </div>
            <button
              onClick={() => setShowPricing(true)}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-all"
            >
              Upgrade Now
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <Icons.AlertCircle />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto">
              <Icons.X />
            </button>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <Icons.Check />
            <span>{success}</span>
            <button onClick={() => setSuccess(null)} className="ml-auto">
              <Icons.X />
            </button>
          </div>
        )}

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
          }`}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".pdf,image/*"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <div className={`text-gray-400 ${isDragging ? 'text-emerald-500' : ''}`}>
              <Icons.Upload />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragging ? 'Drop your files here' : 'Drag & drop your bank statements'}
              </p>
              <p className="text-gray-500 mt-1">or click to browse • PDF and images supported</p>
            </div>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Files to Convert ({files.length})</h3>
              <button
                onClick={clearAllFiles}
                className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"
              >
                <Icons.Trash />
                Clear All
              </button>
            </div>

            <div className="divide-y divide-gray-200">
              {files.map((fileObj) => (
                <div
                  key={fileObj.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        fileObj.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-600'
                          : fileObj.status === 'error'
                          ? 'bg-red-100 text-red-600'
                          : fileObj.status === 'processing'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {fileObj.status === 'processing' ? <Icons.Loader /> : <Icons.File />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{fileObj.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(fileObj.size)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        fileObj.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : fileObj.status === 'error'
                          ? 'bg-red-100 text-red-700'
                          : fileObj.status === 'processing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {fileObj.status === 'completed'
                        ? 'Completed'
                        : fileObj.status === 'error'
                        ? 'Failed'
                        : fileObj.status === 'processing'
                        ? 'Processing...'
                        : 'Pending'}
                    </span>
                    <button
                      onClick={() => removeFile(fileObj.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Icons.X />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={processFiles}
                disabled={isProcessing || files.every((f) => f.status === 'completed')}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Icons.Loader />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Convert {files.filter((f) => f.status === 'pending').length} File(s)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Extracted Data Table */}
        {extractedData && extractedData.transactions && (
          <div className="mt-8">
            <TransactionTable data={extractedData.transactions} onExport={handleExport} />
          </div>
        )}

        {/* Features Section */}
        {files.length === 0 && !extractedData && (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Convert statements in seconds with our advanced AI technology',
              },
              {
                icon: '🏦',
                title: 'All Major Banks',
                description: 'Support for Chase, Bank of America, Wells Fargo, and 100+ more',
              },
              {
                icon: '🔒',
                title: 'Secure & Private',
                description: 'Your files are encrypted and deleted after processing',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-semibold text-gray-900">StatementPro</span>
            </div>
            <p className="text-gray-500 text-sm">© 2024 StatementPro. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          error={error}
          setError={setError}
        />
      )}

      {showPricing && (
        <PricingModal
          onClose={() => setShowPricing(false)}
          onUpgrade={handleUpgrade}
          currentPlan={user?.plan || 'free'}
        />
      )}

      {showHistory && (
        <HistoryModal
          onClose={() => setShowHistory(false)}
          conversions={conversions}
          onRedownload={(conversion) => {
            // Handle re-download logic
            console.log('Re-download:', conversion);
          }}
        />
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
