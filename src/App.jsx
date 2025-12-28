import { useState, useEffect, useCallback } from 'react';

// ============================================
// CONFIGURATION
// ============================================
const API_URL = 'https://api.statementpro.net';
const SUPPORT_EMAIL = 'support@statementpro.net';
const MAX_FREE_CONVERSIONS = 3;
const MAX_BULK_FILES_FREE = 1;
const MAX_BULK_FILES_PRO = 10;

// ============================================
// ICONS
// ============================================
const Icons = {
  Upload: ({ size = 48 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  File: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Check: ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Loader: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  AlertCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  AlertTriangle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Zap: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Building: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Globe: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  CreditCard: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  RefreshCw: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  ShieldCheck: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  FileSpreadsheet: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>,
  Calculator: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/></svg>,
};

// ============================================
// QBO EXPORT HELPER
// ============================================
function generateQBOFile(transactions, fileName, bank = 'Generic Bank') {
  const now = new Date();
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'N/A') return now.toISOString().slice(0,10).replace(/-/g, '');
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return now.toISOString().slice(0,10).replace(/-/g, '');
    return d.toISOString().slice(0,10).replace(/-/g, '');
  };
  
  const dates = transactions.map(t => t.date).filter(d => d && d !== 'N/A').sort();
  const startDate = dates[0] ? formatDate(dates[0]) : formatDate(null);
  const endDate = dates[dates.length - 1] ? formatDate(dates[dates.length - 1]) : formatDate(null);
  
  let transactionsXml = '';
  transactions.forEach((tx, idx) => {
    const amount = parseFloat(tx.amount) || 0;
    const trnType = tx.type === 'credit' ? 'CREDIT' : 'DEBIT';
    const trnAmount = tx.type === 'credit' ? Math.abs(amount) : -Math.abs(amount);
    const desc = (tx.description || 'Transaction').replace(/[<>&"']/g, ' ').substring(0, 64);
    
    transactionsXml += `
<STMTTRN>
<TRNTYPE>${trnType}
<DTPOSTED>${formatDate(tx.date)}
<TRNAMT>${trnAmount.toFixed(2)}
<FITID>${formatDate(tx.date)}${idx + 1}
<NAME>${desc}
</STMTTRN>`;
  });
  
  const lastBalance = transactions[transactions.length - 1]?.balance || 0;
  
  return `OFXHEADER:100
DATA:OFXSGML
VERSION:102
SECURITY:NONE
ENCODING:USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID:NONE
NEWFILEUID:NONE

<OFX>
<SIGNONMSGSRSV1>
<SONRS>
<STATUS>
<CODE>0
<SEVERITY>INFO
</STATUS>
<DTSERVER>${formatDate(null)}
<LANGUAGE>ENG
</SONRS>
</SIGNONMSGSRSV1>
<BANKMSGSRSV1>
<STMTTRNRS>
<TRNUID>1001
<STATUS>
<CODE>0
<SEVERITY>INFO
</STATUS>
<STMTRS>
<CURDEF>USD
<BANKACCTFROM>
<BANKID>999999999
<ACCTID>999999999
<ACCTTYPE>CHECKING
</BANKACCTFROM>
<BANKTRANLIST>
<DTSTART>${startDate}
<DTEND>${endDate}${transactionsXml}
</BANKTRANLIST>
<LEDGERBAL>
<BALAMT>${parseFloat(lastBalance).toFixed(2)}
<DTASOF>${endDate}
</LEDGERBAL>
</STMTRS>
</STMTTRNRS>
</BANKMSGSRSV1>
</OFX>`;
}

// ============================================
// QIF EXPORT HELPER
// ============================================
function generateQIFFile(transactions) {
  let qif = '!Type:Bank\n';
  transactions.forEach(tx => {
    const amount = parseFloat(tx.amount) || 0;
    const date = tx.date ? new Date(tx.date) : new Date();
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    qif += `D${dateStr}\n`;
    qif += `T${amount.toFixed(2)}\n`;
    qif += `P${tx.description || 'Transaction'}\n`;
    if (tx.category) qif += `L${tx.category}\n`;
    qif += '^\n';
  });
  return qif;
}

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function App() {
  // Auth state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  
  // File upload state
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [processingStep, setProcessingStep] = useState(0);
  
  // UI state
  const [showPricing, setShowPricing] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showSampleOutput, setShowSampleOutput] = useState(false);
  const [statementType, setStatementType] = useState('bank');
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  // Check auth on mount
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  // Check for upgrade success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('upgrade') === 'success') {
      fetchUser();
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    
    try {
      const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setShowAuth(false);
      setAuthForm({ name: '', email: '', password: '' });
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setResults(null);
    setFiles([]);
  };

  const handleFileDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer?.files || e.target?.files || []);
    const validFiles = droppedFiles.filter(f => 
      f.type === 'application/pdf' || f.type.startsWith('image/')
    );
    
    const maxFiles = user?.plan === 'free' ? MAX_BULK_FILES_FREE : MAX_BULK_FILES_PRO;
    
    if (validFiles.length > maxFiles) {
      setError(`Free plan allows ${MAX_BULK_FILES_FREE} file at a time. Upgrade for bulk uploads!`);
      return;
    }
    
    const filesWithStatus = validFiles.map(f => ({
      file: f,
      name: f.name,
      size: f.size,
      status: 'ready' // ready, uploading, done, error
    }));
    
    setFiles(filesWithStatus);
    setError('');
    setResults(null);
  }, [user]);

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setError('');
  };

  const clearFiles = () => {
    setFiles([]);
    setResults(null);
    setError('');
  };

  const handleConvert = async () => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    // Check conversion limits
    if (user.plan === 'free' && user.conversions >= MAX_FREE_CONVERSIONS) {
      setError('Free conversion limit reached. Please upgrade for unlimited conversions.');
      setShowPricing(true);
      return;
    }

    // Get files that are ready to convert
    const readyFiles = files.filter(f => f.status === 'ready' || f.status === 'error');
    if (readyFiles.length === 0) {
      setError('No files to convert');
      return;
    }

    setUploading(true);
    setError('');
    setProcessingStep(1);

    try {
      // Process first file (single file for now)
      const fileToProcess = readyFiles[0];
      
      // Update file status
      setFiles(prev => prev.map((f, i) => 
        f.name === fileToProcess.name ? { ...f, status: 'uploading' } : f
      ));

      setProcessingStep(2);

      const formData = new FormData();
      formData.append('file', fileToProcess.file);
      formData.append('type', statementType);

      const res = await fetch(`${API_URL}/api/convert`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      setProcessingStep(3);

      const data = await res.json();

      // ============================================
      // CRITICAL FIX: Handle success: false from backend
      // ============================================
      if (!res.ok || data.success === false) {
        // Update file status to error
        setFiles(prev => prev.map(f => 
          f.name === fileToProcess.name ? { ...f, status: 'error' } : f
        ));

        // Show appropriate error message
        let errorMessage = data.error || 'Conversion failed';
        
        // Add suggestion if available
        if (data.suggestion) {
          errorMessage += `. ${data.suggestion}`;
        }

        // Handle specific error cases
        if (data.upgrade) {
          setShowPricing(true);
        }

        setError(errorMessage);
        setUploading(false);
        setProcessingStep(0);
        return;
      }

      // ============================================
      // SUCCESS: We have transactions
      // ============================================
      setProcessingStep(4);

      // Update file status to done
      setFiles(prev => prev.map(f => 
        f.name === fileToProcess.name ? { ...f, status: 'done' } : f
      ));

      // Refresh user to get updated conversion count
      await fetchUser();

      // Set results
      setResults({
        transactions: data.data.transactions,
        bank: data.data.bank,
        fileName: data.data.fileName,
        transactionCount: data.data.transactionCount,
        reconciliation: data.data.reconciliation,
        quality: data.data.quality,
        headerSummary: data.data.headerSummary
      });

      setError('');

    } catch (err) {
      console.error('Conversion error:', err);
      setError(err.message || 'Network error. Please try again.');
      setFiles(prev => prev.map(f => ({ ...f, status: 'error' })));
    } finally {
      setUploading(false);
      setProcessingStep(0);
    }
  };

  const handleUpgrade = async (plan) => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan })
      });

      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError('Failed to start checkout. Please try again.');
    }
  };

  const exportToExcel = () => {
    if (!results?.transactions?.length) return;
    
    import('xlsx').then(XLSX => {
      const ws = XLSX.utils.json_to_sheet(results.transactions.map(tx => ({
        Date: tx.date,
        Description: tx.description,
        Amount: tx.amount,
        Type: tx.type,
        Category: tx.category || '',
        Balance: tx.balance || ''
      })));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
      XLSX.writeFile(wb, `${results.fileName?.replace(/\.[^/.]+$/, '') || 'transactions'}.xlsx`);
    });
  };

  const exportToCSV = () => {
    if (!results?.transactions?.length) return;
    
    const headers = ['Date', 'Description', 'Amount', 'Type', 'Category', 'Balance'];
    const rows = results.transactions.map(tx => 
      [tx.date, `"${tx.description}"`, tx.amount, tx.type, tx.category || '', tx.balance || ''].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${results.fileName?.replace(/\.[^/.]+$/, '') || 'transactions'}.csv`;
    a.click();
  };

  const exportToQBO = () => {
    if (!results?.transactions?.length) return;
    
    if (user?.plan === 'free') {
      setShowPricing(true);
      return;
    }
    
    const qbo = generateQBOFile(results.transactions, results.fileName, results.bank);
    const blob = new Blob([qbo], { type: 'application/x-ofx' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${results.fileName?.replace(/\.[^/.]+$/, '') || 'transactions'}.qbo`;
    a.click();
  };

  const exportToQIF = () => {
    if (!results?.transactions?.length) return;
    
    if (user?.plan === 'free') {
      setShowPricing(true);
      return;
    }
    
    const qif = generateQIFFile(results.transactions);
    const blob = new Blob([qif], { type: 'application/qif' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${results.fileName?.replace(/\.[^/.]+$/, '') || 'transactions'}.qif`;
    a.click();
  };

  const isPro = user?.plan === 'pro' || user?.plan === 'business';

  // ============================================
  // CALCULATE READY FILES COUNT FOR CTA BUTTON
  // ============================================
  const readyFilesCount = files.filter(f => f.status === 'ready' || f.status === 'error').length;
  const hasFilesToConvert = readyFilesCount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">S</div>
              <span className="text-xl font-bold text-gray-900">StatementPro</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            </nav>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Icons.User />
                    {user.name || user.email?.split('@')[0]}
                  </span>
                  <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700">
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Convert Bank Statements to Excel
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your bank statement PDF or image and get a clean spreadsheet in seconds.
            Auto-categorized, reconciliation-ready.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icons.ShieldCheck />
            <span>256-bit encrypted</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icons.Trash />
            <span>Auto-deleted in 24hrs</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icons.Lock />
            <span>We never store your data</span>
          </div>
        </div>

        {/* Conversion Counter */}
        {user && (
          <div className={`flex items-center justify-center gap-3 mb-6 p-3 rounded-lg ${
            user.plan === 'free' && user.conversions >= MAX_FREE_CONVERSIONS 
              ? 'bg-red-50 border border-red-200'
              : 'bg-amber-50 border border-amber-200'
          }`}>
            <Icons.Zap />
            <span className="font-medium">
              {user.plan === 'free' 
                ? `Free Plan: ${MAX_FREE_CONVERSIONS - user.conversions} of ${MAX_FREE_CONVERSIONS} left`
                : `${user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan: Unlimited conversions`
              }
            </span>
            {user.plan === 'free' && (
              <button
                onClick={() => setShowPricing(true)}
                className="ml-2 bg-amber-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-amber-600"
              >
                Upgrade
              </button>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <Icons.AlertCircle />
            <div className="flex-1">
              <p className="text-red-800">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <Icons.X />
            </button>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          {/* Statement Type Selector */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setStatementType('bank')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                statementType === 'bank'
                  ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              🏦 Bank Statement
            </button>
            <button
              onClick={() => {
                if (!isPro) {
                  setShowPricing(true);
                  return;
                }
                setStatementType('credit');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                statementType === 'credit'
                  ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              💳 Credit Card {!isPro && <span className="text-xs bg-amber-500 text-white px-1 rounded">PRO</span>}
            </button>
          </div>

          {/* Drop Zone */}
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              files.length > 0 ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
            }`}
          >
            <Icons.Upload size={48} />
            <p className="mt-4 text-lg font-medium text-gray-700">Drag & drop bank statements</p>
            <p className="text-gray-500">or click to browse • Up to {isPro ? MAX_BULK_FILES_PRO : MAX_BULK_FILES_FREE} file(s)</p>
            <input
              type="file"
              onChange={handleFileDrop}
              accept=".pdf,image/*"
              className="hidden"
              id="file-input"
              multiple={isPro}
            />
            <label
              htmlFor="file-input"
              className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-emerald-700"
            >
              Select Files
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-700">Files ({files.length})</span>
                <button onClick={clearFiles} className="text-red-500 hover:text-red-700 flex items-center gap-1">
                  <Icons.Trash /> Clear
                </button>
              </div>
              <div className="space-y-2">
                {files.map((f, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icons.File />
                      <div>
                        <p className="font-medium text-gray-800">{f.name}</p>
                        <p className="text-sm text-gray-500">{(f.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {f.status === 'ready' && (
                        <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">Ready</span>
                      )}
                      {f.status === 'uploading' && (
                        <span className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded flex items-center gap-1">
                          <Icons.Loader /> Processing...
                        </span>
                      )}
                      {f.status === 'done' && (
                        <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded flex items-center gap-1">
                          <Icons.Check size={14} /> Done
                        </span>
                      )}
                      {f.status === 'error' && (
                        <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">Failed</span>
                      )}
                      <button onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-500">
                        <Icons.X />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Processing Steps */}
          {uploading && processingStep > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icons.Loader />
                <span className="font-medium text-blue-800">
                  {processingStep === 1 && 'Uploading file...'}
                  {processingStep === 2 && 'Analyzing document...'}
                  {processingStep === 3 && 'Extracting transactions...'}
                  {processingStep === 4 && 'Finalizing...'}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4].map(step => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded ${
                      step <= processingStep ? 'bg-blue-500' : 'bg-blue-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Convert Button - FIXED: Shows file count, not transaction count */}
          <button
            onClick={handleConvert}
            disabled={!hasFilesToConvert || uploading}
            className={`mt-6 w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              hasFilesToConvert && !uploading
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <Icons.Loader /> Processing...
              </span>
            ) : (
              `Convert ${readyFilesCount} File${readyFilesCount !== 1 ? 's' : ''}`
            )}
          </button>

          {/* Sample Output Link */}
          <p className="mt-4 text-center text-gray-500">
            <button onClick={() => setShowSampleOutput(true)} className="text-emerald-600 hover:underline">
              See sample output →
            </button>
          </p>
        </div>

        {/* Results Section */}
        {results && results.transactions && results.transactions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  ✅ Successfully extracted {results.transactionCount} transactions
                </h2>
                <p className="text-gray-600">from {results.bank || 'Unknown Bank'}</p>
                
                {/* Quality Score */}
                {results.quality && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      results.quality.grade === 'A' ? 'bg-emerald-100 text-emerald-700' :
                      results.quality.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      Quality: {results.quality.grade}
                    </span>
                    {results.reconciliation?.status === 'reconciled' && (
                      <span className="px-2 py-1 rounded text-sm font-medium bg-emerald-100 text-emerald-700">
                        ✓ Reconciled
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Export Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                >
                  <Icons.Download /> Export <Icons.ChevronDown />
                </button>
                {exportDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button onClick={() => { exportToExcel(); setExportDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      📊 Excel (.xlsx)
                    </button>
                    <button onClick={() => { exportToCSV(); setExportDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      📄 CSV (.csv)
                    </button>
                    <button 
                      onClick={() => { exportToQBO(); setExportDropdownOpen(false); }} 
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${!isPro ? 'text-gray-400' : ''}`}
                    >
                      💼 QuickBooks (.qbo) {!isPro && '🔒'}
                    </button>
                    <button 
                      onClick={() => { exportToQIF(); setExportDropdownOpen(false); }} 
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${!isPro ? 'text-gray-400' : ''}`}
                    >
                      📒 Quicken (.qif) {!isPro && '🔒'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Transaction Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.transactions.slice(0, 20).map((tx, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono">{tx.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{tx.description}</td>
                      <td className={`px-4 py-3 text-sm font-medium text-right font-mono ${
                        parseFloat(tx.amount) >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {parseFloat(tx.amount) >= 0 ? '+' : ''}${parseFloat(tx.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          tx.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{tx.category || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right font-mono">
                        {tx.balance ? `$${parseFloat(tx.balance).toFixed(2)}` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.transactions.length > 20 && (
                <div className="p-4 bg-gray-50 text-center text-gray-500">
                  Showing 20 of {results.transactions.length} transactions. Export to see all.
                </div>
              )}
            </div>

            {/* Convert Another */}
            <button
              onClick={clearFiles}
              className="mt-6 w-full py-3 border-2 border-emerald-500 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50"
            >
              Convert Another Statement
            </button>
          </div>
        )}

        {/* Features Section */}
        <section id="features" className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose StatementPro?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Icons.Zap />, title: 'Lightning Fast', desc: 'Convert statements in seconds, not hours of manual data entry' },
              { icon: <Icons.ShieldCheck />, title: '99% Accurate', desc: 'AI-powered extraction with auto-reconciliation verification' },
              { icon: <Icons.Calculator />, title: 'QuickBooks Ready', desc: 'Export directly to QBO format for seamless import' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 mb-12">Start free, upgrade when you need more</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Free</h3>
              <p className="text-gray-600 mt-2">For occasional use</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-gray-600"><Icons.Check size={16} /> 3 conversions/month</li>
                <li className="flex items-center gap-2 text-gray-600"><Icons.Check size={16} /> PDF & image upload</li>
                <li className="flex items-center gap-2 text-gray-600"><Icons.Check size={16} /> Excel & CSV export</li>
              </ul>
              <button className="mt-8 w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                Current Plan
              </button>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-2xl shadow-lg text-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="text-emerald-100 mt-2">For professionals</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-emerald-100">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2"><Icons.Check size={16} /> Unlimited conversions</li>
                <li className="flex items-center gap-2"><Icons.Check size={16} /> QuickBooks & Quicken export</li>
                <li className="flex items-center gap-2"><Icons.Check size={16} /> Credit card statements</li>
                <li className="flex items-center gap-2"><Icons.Check size={16} /> Bulk upload (10 files)</li>
                <li className="flex items-center gap-2"><Icons.Check size={16} /> Priority support</li>
              </ul>
              <button 
                onClick={() => handleUpgrade('pro')}
                className="mt-8 w-full py-3 bg-white text-emerald-600 rounded-lg font-bold hover:bg-emerald-50"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Business */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Business</h3>
              <p className="text-gray-600 mt-2">For teams & firms</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-gray-600"><Icons.Check size={16} /> Everything in Pro</li>
                <li className="flex items-center gap-2 text-gray-600"><Icons.Check size={16} /> Xero integration</li>
                <li className="flex items-center gap-2 text-gray-600"><Icons.Check size={16} /> API access</li>
                <li className="flex items-center gap-2 text-gray-600"><Icons.Check size={16} /> Team management</li>
                <li className="flex items-center gap-2 text-gray-600"><Icons.Check size={16} /> Dedicated support</li>
              </ul>
              <button 
                onClick={() => handleUpgrade('business')}
                className="mt-8 w-full py-3 border-2 border-emerald-500 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50"
              >
                Upgrade to Business
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-12 pb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
              <span className="font-bold text-gray-900">StatementPro</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <button onClick={() => setShowPrivacy(true)} className="hover:text-gray-700">Privacy Policy</button>
              <button onClick={() => setShowTerms(true)} className="hover:text-gray-700">Terms of Service</button>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-gray-700">Contact</a>
            </div>
          </div>
          <p className="mt-8 text-center text-gray-400 text-sm">
            © 2025 StatementPro. All rights reserved.
          </p>
        </footer>
      </main>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button onClick={() => setShowAuth(false)} className="text-gray-400 hover:text-gray-600">
                <Icons.X />
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
              >
                {authLoading ? 'Loading...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-emerald-600 font-medium hover:underline"
              >
                {authMode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h2>
              <button onClick={() => setShowPricing(false)} className="text-gray-400 hover:text-gray-600">
                <Icons.X />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pro */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold">Pro</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$9</span>
                  <span className="text-emerald-100">/month</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>✓ Unlimited conversions</li>
                  <li>✓ QuickBooks & Quicken export</li>
                  <li>✓ Credit card statements</li>
                  <li>✓ Bulk upload (10 files)</li>
                </ul>
                <button 
                  onClick={() => { handleUpgrade('pro'); setShowPricing(false); }}
                  className="mt-6 w-full py-2 bg-white text-emerald-600 rounded-lg font-bold"
                >
                  Upgrade to Pro
                </button>
              </div>

              {/* Business */}
              <div className="border-2 border-gray-200 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900">Business</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>✓ Everything in Pro</li>
                  <li>✓ Xero integration</li>
                  <li>✓ API access</li>
                  <li>✓ Team management</li>
                </ul>
                <button 
                  onClick={() => { handleUpgrade('business'); setShowPricing(false); }}
                  className="mt-6 w-full py-2 border-2 border-emerald-500 text-emerald-600 rounded-lg font-medium"
                >
                  Upgrade to Business
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sample Output Modal */}
      {showSampleOutput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sample Output</h2>
              <button onClick={() => setShowSampleOutput(false)} className="text-gray-400 hover:text-gray-600">
                <Icons.X />
              </button>
            </div>
            
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Description</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-600">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Type</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-600">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { date: '2025-11-01', desc: 'Opening Balance', amount: null, type: null, balance: 3240.55 },
                    { date: '2025-11-02', desc: 'Payroll Direct Deposit - ACME Corp', amount: 2750.00, type: 'credit', balance: 5990.55 },
                    { date: '2025-11-03', desc: 'WHOLE FOODS NYC #1234', amount: -86.42, type: 'debit', balance: 5904.13 },
                    { date: '2025-11-05', desc: 'CONED BILLPAY - Autopay', amount: -143.21, type: 'debit', balance: 5760.92 },
                    { date: '2025-11-21', desc: 'Mobile Check Deposit', amount: 450.00, type: 'credit', balance: 6198.92 },
                  ].map((tx, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono">{tx.date}</td>
                      <td className="px-4 py-3 text-gray-600">{tx.desc}</td>
                      <td className={`px-4 py-3 text-right font-mono ${tx.amount === null ? 'text-gray-400' : tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {tx.amount === null ? '—' : tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </td>
                      <td className="px-4 py-3">
                        {tx.type && <span className={`px-2 py-1 text-xs rounded-full ${tx.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{tx.type}</span>}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">${tx.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-800 mb-2">✨ Export Formats:</h4>
                <p className="text-sm text-emerald-700">Excel (.xlsx), CSV (.csv), QuickBooks (.qbo), Quicken (.qif)</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">📊 Auto-Features:</h4>
                <p className="text-sm text-blue-700">Categorization, Reconciliation, Quality Scoring</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
              <button onClick={() => setShowPrivacy(false)} className="text-gray-400 hover:text-gray-600">
                <Icons.X />
              </button>
            </div>
            <div className="prose prose-sm max-h-96 overflow-y-auto">
              <p>Last updated: December 2025</p>
              <h3>Data Collection</h3>
              <p>We collect only the minimum data necessary to provide our service: your email for account creation and the files you upload for conversion.</p>
              <h3>File Handling</h3>
              <p>Your uploaded files are processed immediately and automatically deleted within 24 hours. We do not store, share, or analyze your financial data beyond what's necessary for conversion.</p>
              <h3>Security</h3>
              <p>All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.</p>
              <h3>Contact</h3>
              <p>For privacy questions, contact us at {SUPPORT_EMAIL}</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
              <button onClick={() => setShowTerms(false)} className="text-gray-400 hover:text-gray-600">
                <Icons.X />
              </button>
            </div>
            <div className="prose prose-sm max-h-96 overflow-y-auto">
              <p>Last updated: December 2025</p>
              <h3>Service Description</h3>
              <p>StatementPro provides bank statement conversion services. We convert PDF and image files to spreadsheet formats.</p>
              <h3>Accuracy</h3>
              <p>While we strive for high accuracy, users should verify extracted data before use in financial applications.</p>
              <h3>Acceptable Use</h3>
              <p>Users agree to only upload their own financial documents or documents they have authorization to process.</p>
              <h3>Refunds</h3>
              <p>We offer a 30-day money-back guarantee for paid plans if you're not satisfied with the service.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
