import { useState, useEffect, useCallback } from 'react';

// ============================================
// CONFIGURATION
// ============================================
const API_URL = 'https://api.statementpro.net';

// ============================================
// ICONS
// ============================================
const Icons = {
  Upload: ({ size = 48 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  Check: ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Building: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/><path d="M16 6h.01"/>
      <path d="M12 6h.01"/><path d="M12 10h.01"/>
      <path d="M12 14h.01"/><path d="M16 10h.01"/>
      <path d="M16 14h.01"/><path d="M8 10h.01"/>
      <path d="M8 14h.01"/>
    </svg>
  ),
  Lock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  CreditCard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  RefreshCw: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
};

// ============================================
// AUTH MODAL
// ============================================
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
      if (isLogin) await onLogin(email, password);
      else await onRegister(name, email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
          <Icons.X />
        </button>
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-emerald-100 mt-1">{isLogin ? 'Sign in to continue' : 'Start your free trial today'}</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <Icons.AlertCircle /><span className="text-sm">{error}</span>
            </div>
          )}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="John Doe" required={!isLogin} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="••••••••" required minLength={6} />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Icons.Loader /><span>Please wait...</span></> : <span>{isLogin ? 'Sign In' : 'Start Free Trial'}</span>}
          </button>
          <div className="text-center">
            <button type="button" onClick={() => { setIsLogin(!isLogin); setError(null); }} className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              {isLogin ? "Don't have an account? Start free" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// PRICING MODAL
// ============================================
function PricingModal({ onClose, onUpgrade, currentPlan }) {
  const plans = [
    { name: 'Free', price: '$0', features: ['5 conversions/month', 'PDF upload', 'Excel export', 'Email support'], cta: 'Current Plan', disabled: true, highlight: false },
    { name: 'Pro', price: '$9', features: ['Unlimited conversions', 'Bulk upload (10 files)', 'Excel & CSV export', 'Priority support', 'API access'], cta: 'Upgrade to Pro', disabled: false, highlight: true },
    { name: 'Business', price: '$29', features: ['Everything in Pro', 'Unlimited bulk upload', 'Team collaboration', 'Custom integrations', 'Dedicated support'], cta: 'Contact Sales', disabled: false, highlight: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden my-8">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white"><Icons.X /></button>
          <h2 className="text-3xl font-bold">Choose Your Plan</h2>
          <p className="text-emerald-100 mt-2">Start free, upgrade when you need more</p>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-xl p-6 ${plan.highlight ? 'bg-gradient-to-b from-emerald-50 to-teal-50 border-2 border-emerald-500 relative' : 'bg-gray-50 border border-gray-200'}`}>
              {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4"><span className="text-4xl font-bold text-gray-900">{plan.price}</span><span className="text-gray-500">/month</span></div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f, i) => <li key={i} className="flex items-center gap-2 text-gray-600"><span className="text-emerald-500"><Icons.Check size={16} /></span><span className="text-sm">{f}</span></li>)}
              </ul>
              <button onClick={() => !plan.disabled && onUpgrade(plan.name.toLowerCase())} disabled={plan.disabled} className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all ${plan.highlight ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700' : plan.disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                {currentPlan === plan.name.toLowerCase() ? 'Current Plan' : plan.cta}
              </button>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6 text-center"><p className="text-sm text-gray-500">🔒 Secure payment • Cancel anytime • 30-day money-back guarantee</p></div>
      </div>
    </div>
  );
}

// ============================================
// TRANSACTION TABLE
// ============================================
function TransactionTable({ data, onExport }) {
  const [selectedFormat, setSelectedFormat] = useState('xlsx');
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div><h3 className="font-semibold text-gray-900">Extracted Transactions</h3><p className="text-sm text-gray-500">{data.length} transactions found</p></div>
        <div className="flex items-center gap-3">
          <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="xlsx">Excel (.xlsx)</option>
            <option value="csv">CSV (.csv)</option>
          </select>
          <button onClick={() => onExport(selectedFormat)} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700">
            <Icons.Download /><span>Export</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.slice(0, 20).map((tx, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{tx.date}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{tx.description}</td>
                <td className={`px-4 py-3 text-sm font-medium text-right ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </td>
                <td className="px-4 py-3"><span className={`px-2 py-1 text-xs font-medium rounded-full ${tx.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{tx.type}</span></td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">${tx.balance?.toFixed(2) || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 20 && <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">Showing 20 of {data.length} transactions. Export to see all.</div>}
      </div>
    </div>
  );
}

// ============================================
// FAQ ITEM
// ============================================
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 flex items-center justify-between text-left">
        <span className="font-medium text-gray-900">{question}</span>
        <span className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></span>
      </button>
      {isOpen && <div className="pb-5 text-gray-600">{answer}</div>}
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [conversionCount, setConversionCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setConversionCount(parsedUser.conversions || 0);
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setConversionCount(data.user.conversions || 0);
      setShowAuth(false);
      setError(null);
    }
  };

  const handleRegister = async (name, email, password) => {
    const response = await fetch(`${API_URL}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');
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
  };

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => { setIsDragging(false); }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf' || f.type.startsWith('image/'));
    if (droppedFiles.length > 0) addFiles(droppedFiles);
    else setError('Please upload PDF or image files only');
  }, [user]);

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    if (!user) { setShowAuth(true); return; }
    const maxConversions = user.plan === 'free' ? 5 : Infinity;
    const remaining = maxConversions - conversionCount;
    if (user.plan === 'free' && newFiles.length > remaining) {
      setError(`You can only convert ${remaining} more file(s). Upgrade for unlimited!`);
      setShowPricing(true);
      return;
    }
    setFiles(prev => [...prev, ...newFiles.map(file => ({ file, id: Math.random().toString(36).substr(2, 9), status: 'pending', name: file.name, size: file.size }))]);
    setError(null);
  };

  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id));
  const clearAllFiles = () => { setFiles([]); setExtractedData(null); setSuccess(null); };

  const processFiles = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem('token');

    try {
      for (let fileObj of files) {
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'processing' } : f));
        const formData = new FormData();
        formData.append('file', fileObj.file);
        const response = await fetch(`${API_URL}/api/convert`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
        const data = await response.json();

        if (data.success) {
          setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'completed' } : f));
          setExtractedData({ fileName: data.data.fileName, transactions: data.data.transactions });
          const newCount = conversionCount + 1;
          setConversionCount(newCount);
          const updatedUser = { ...user, conversions: newCount };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setSuccess(`Successfully extracted ${data.data.transactions.length} transactions!`);
        } else {
          setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'error' } : f));
          throw new Error(data.error || 'Conversion failed');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = (format) => {
    if (!extractedData?.transactions) return;
    const { transactions, fileName } = extractedData;

    if (format === 'csv') {
      const headers = ['Date', 'Description', 'Amount', 'Type', 'Balance'];
      const rows = transactions.map(tx => [tx.date, `"${tx.description.replace(/"/g, '""')}"`, tx.amount, tx.type, tx.balance || '']);
      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      downloadBlob(blob, `${fileName.replace('.pdf', '')}_transactions.csv`);
    } else {
      let html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><tr><th>Date</th><th>Description</th><th>Amount</th><th>Type</th><th>Balance</th></tr>`;
      transactions.forEach(tx => { html += `<tr><td>${tx.date}</td><td>${tx.description}</td><td>${tx.amount}</td><td>${tx.type}</td><td>${tx.balance || ''}</td></tr>`; });
      html += '</table></body></html>';
      const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
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

  const handleUpgrade = async (plan) => {
    if (!user) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/create-checkout-session`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ plan }) });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setError('Failed to create checkout session');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const scrollToConverter = () => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">StatementPro</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 text-sm font-medium">FAQ</a>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                    <Icons.User />
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.name || user.email?.split('@')[0]}</span>
                    {user.plan === 'pro' && <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">PRO</span>}
                  </div>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 text-sm font-medium">Sign Out</button>
                </>
              ) : (
                <>
                  <button onClick={() => setShowAuth(true)} className="text-gray-600 hover:text-gray-900 text-sm font-medium">Sign In</button>
                  <button onClick={() => setShowAuth(true)} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/20">Start Free</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icons.Shield /><span>Trusted by 10,000+ accountants & bookkeepers</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Convert Bank Statements to<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Excel </span>in Seconds
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Stop wasting hours manually entering transactions. Our AI extracts data from any bank statement PDF and exports to clean, organized Excel files.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={scrollToConverter} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 shadow-xl shadow-emerald-500/30">
              <span>Convert Statement Free</span><Icons.ArrowRight />
            </button>
            <button onClick={() => setShowPricing(true)} className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 hover:bg-gray-50">View Pricing</button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">{['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻'].map((e, i) => <div key={i} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm border-2 border-white">{e}</div>)}</div>
              <span className="text-sm ml-2">1,000+ users this week</span>
            </div>
            <div className="flex items-center gap-1">{[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400"><Icons.Star /></span>)}<span className="text-sm ml-1">4.9/5 rating</span></div>
          </div>
        </div>
      </section>

      {/* BANK LOGOS */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-8">WORKS WITH ALL MAJOR BANKS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {['Chase', 'Bank of America', 'Wells Fargo', 'Citi', 'Capital One', 'TD Bank', 'PNC', 'US Bank'].map(b => <span key={b} className="text-gray-900 font-semibold text-lg">{b}</span>)}
          </div>
        </div>
      </section>

      {/* CONVERTER */}
      <section id="converter" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Statement</h2>
            <p className="text-gray-600">Drag & drop or click to upload. We support PDF and image files.</p>
          </div>

          {user && user.plan === 'free' && (
            <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Icons.Zap /></div>
                <div><p className="font-medium text-amber-800">Free Plan: {5 - conversionCount} of 5 conversions left</p><p className="text-sm text-amber-600">Upgrade for unlimited</p></div>
              </div>
              <button onClick={() => setShowPricing(true)} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium">Upgrade</button>
            </div>
          )}

          {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2"><Icons.AlertCircle /><span>{error}</span><button onClick={() => setError(null)} className="ml-auto"><Icons.X /></button></div>}
          {success && <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-2"><Icons.Check /><span>{success}</span><button onClick={() => setSuccess(null)} className="ml-auto"><Icons.X /></button></div>}

          <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => document.getElementById('fileInput').click()} className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'}`}>
            <input id="fileInput" type="file" accept=".pdf,image/*" multiple onChange={handleFileInput} className="hidden" />
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full ${isDragging ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}><Icons.Upload size={40} /></div>
              <div><p className="text-lg font-semibold text-gray-700">{isDragging ? 'Drop your files here' : 'Drag & drop your bank statements'}</p><p className="text-gray-500 mt-1">or click to browse • PDF and images supported</p></div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Files ({files.length})</h3>
                <button onClick={clearAllFiles} className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"><Icons.Trash /><span>Clear</span></button>
              </div>
              <div className="divide-y divide-gray-200">
                {files.map(f => (
                  <div key={f.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${f.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : f.status === 'error' ? 'bg-red-100 text-red-600' : f.status === 'processing' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {f.status === 'processing' ? <Icons.Loader /> : <Icons.File />}
                      </div>
                      <div><p className="font-medium text-gray-900">{f.name}</p><p className="text-sm text-gray-500">{formatFileSize(f.size)}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${f.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : f.status === 'error' ? 'bg-red-100 text-red-700' : f.status === 'processing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {f.status === 'completed' ? 'Done' : f.status === 'error' ? 'Failed' : f.status === 'processing' ? 'Processing...' : 'Pending'}
                      </span>
                      <button onClick={() => removeFile(f.id)} className="text-gray-400 hover:text-red-500"><Icons.X /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button onClick={processFiles} disabled={isProcessing || files.every(f => f.status === 'completed')} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                  {isProcessing ? <><Icons.Loader /><span>Processing...</span></> : <span>Convert {files.filter(f => f.status === 'pending').length} File(s)</span>}
                </button>
              </div>
            </div>
          )}

          {extractedData?.transactions && <div className="mt-8"><TransactionTable data={extractedData.transactions} onExport={handleExport} /></div>}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose StatementPro?</h2>
            <p className="text-xl text-gray-600">Built for finance professionals who value their time.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Icons.Zap />, title: 'Lightning Fast', desc: 'Convert statements in seconds, not hours.', color: 'bg-yellow-100 text-yellow-600' },
              { icon: <Icons.Building />, title: 'All Major Banks', desc: 'Chase, Bank of America, Wells Fargo, and 100+ more.', color: 'bg-blue-100 text-blue-600' },
              { icon: <Icons.Lock />, title: 'Bank-Level Security', desc: 'Files encrypted and auto-deleted after conversion.', color: 'bg-emerald-100 text-emerald-600' },
              { icon: <Icons.RefreshCw />, title: '99.9% Accuracy', desc: 'AI trained on millions of statements.', color: 'bg-purple-100 text-purple-600' },
              { icon: <Icons.CreditCard />, title: 'Multiple Formats', desc: 'Export to Excel, CSV, or accounting software.', color: 'bg-pink-100 text-pink-600' },
              { icon: <Icons.Globe />, title: 'Works Worldwide', desc: '50+ currencies and multiple languages.', color: 'bg-indigo-100 text-indigo-600' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${f.color} rounded-xl flex items-center justify-center mb-6`}>{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Upload', desc: 'Drag & drop your PDF statement' },
              { step: '2', title: 'Convert', desc: 'AI extracts all transactions' },
              { step: '3', title: 'Export', desc: 'Download as Excel or CSV' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-emerald-500/30">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Professionals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'CPA', quote: 'StatementPro saved me 10+ hours every week. Essential tool.' },
              { name: 'Michael Rodriguez', role: 'Bookkeeper', quote: 'Pays for itself in the first week. Absolutely essential.' },
              { name: 'Emily Thompson', role: 'CFO', quote: 'The accuracy is incredible. Catches everything.' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">{[1,2,3,4,5].map(j => <Icons.Star key={j} />)}</div>
                <p className="text-gray-600 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">👤</div>
                  <div><p className="font-semibold text-gray-900">{t.name}</p><p className="text-sm text-gray-500">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Start free, upgrade when you need more</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Free', price: '$0', features: ['5 conversions/month', 'PDF upload', 'Excel export'], cta: 'Get Started', highlight: false },
              { name: 'Pro', price: '$9', features: ['Unlimited conversions', 'Bulk upload', 'Priority support', 'API access'], cta: 'Start Trial', highlight: true },
              { name: 'Business', price: '$29', features: ['Everything in Pro', 'Team features', 'Custom integrations'], cta: 'Contact Sales', highlight: false },
            ].map((p, i) => (
              <div key={i} className={`rounded-2xl p-8 ${p.highlight ? 'bg-gradient-to-b from-emerald-50 to-teal-50 border-2 border-emerald-500 relative shadow-xl' : 'bg-white border border-gray-200'}`}>
                {p.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold px-4 py-1 rounded-full">POPULAR</div>}
                <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                <div className="mt-6 mb-6"><span className="text-5xl font-bold text-gray-900">{p.price}</span><span className="text-gray-500">/mo</span></div>
                <ul className="space-y-3 mb-8">{p.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-gray-600"><span className="text-emerald-500"><Icons.Check size={16} /></span>{f}</li>)}</ul>
                <button onClick={() => p.highlight ? setShowPricing(true) : setShowAuth(true)} className={`w-full py-3 rounded-xl font-semibold ${p.highlight ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>{p.cta}</button>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-500 flex items-center justify-center gap-2"><Icons.Lock /><span>Secure payment • Cancel anytime • 30-day guarantee</span></p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">FAQ</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8">
            <FAQItem question="Which banks do you support?" answer="All major US banks including Chase, Bank of America, Wells Fargo, Citi, and 100+ more worldwide." />
            <FAQItem question="Is my data secure?" answer="Absolutely. We use 256-bit encryption. Files are auto-deleted within 24 hours." />
            <FAQItem question="What formats do you accept?" answer="PDF bank statements and images (JPG, PNG). You can also photograph paper statements." />
            <FAQItem question="Can I cancel anytime?" answer="Yes, cancel with one click. We also offer a 30-day money-back guarantee." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Save Hours?</h2>
          <p className="text-xl text-emerald-100 mb-8">Join 10,000+ professionals who trust StatementPro.</p>
          <button onClick={scrollToConverter} className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 shadow-xl">
            <span>Start Converting Free</span><Icons.ArrowRight />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-xl">S</span></div>
                <span className="text-xl font-bold text-white">StatementPro</span>
              </div>
              <p className="text-gray-500">The fastest way to convert bank statements to Excel.</p>
            </div>
            <div><h4 className="text-white font-semibold mb-4">Product</h4><ul className="space-y-2"><li><a href="#features" className="hover:text-white">Features</a></li><li><a href="#pricing" className="hover:text-white">Pricing</a></li><li><a href="#faq" className="hover:text-white">FAQ</a></li></ul></div>
            <div><h4 className="text-white font-semibold mb-4">Company</h4><ul className="space-y-2"><li><a href="#" className="hover:text-white">About</a></li><li><a href="#" className="hover:text-white">Blog</a></li><li><a href="#" className="hover:text-white">Contact</a></li></ul></div>
            <div><h4 className="text-white font-semibold mb-4">Legal</h4><ul className="space-y-2"><li><a href="#" className="hover:text-white">Privacy Policy</a></li><li><a href="#" className="hover:text-white">Terms of Service</a></li></ul></div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 StatementPro. All rights reserved.</p>
            <div className="flex items-center gap-4"><a href="#" className="hover:text-white"><Icons.Mail /></a></div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} onRegister={handleRegister} error={error} setError={setError} />}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} onUpgrade={handleUpgrade} currentPlan={user?.plan || 'free'} />}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

