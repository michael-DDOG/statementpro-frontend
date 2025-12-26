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
// ICONS (compact)
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
  Link: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Key: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  XCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  ExternalLink: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
};

// ============================================
// QBO EXPORT HELPER - QuickBooks Format
// ============================================
function generateQBOFile(transactions, fileName, bank = 'Generic Bank') {
  const now = new Date();
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'N/A') return now.toISOString().slice(0,10).replace(/-/g, '');
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return now.toISOString().slice(0,10).replace(/-/g, '');
    return d.toISOString().slice(0,10).replace(/-/g, '');
  };
  
  // Get date range
  const dates = transactions.map(t => t.date).filter(d => d && d !== 'N/A').sort();
  const startDate = dates[0] ? formatDate(dates[0]) : formatDate(null);
  const endDate = dates[dates.length - 1] ? formatDate(dates[dates.length - 1]) : formatDate(null);
  
  // Build transactions XML
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
  
  // Get ending balance
  const lastBalance = transactions[transactions.length - 1]?.balance || 0;
  
  const qboContent = `OFXHEADER:100
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

  return qboContent;
}

// ============================================
// QIF EXPORT HELPER - Quicken Format
// ============================================
function generateQIFFile(transactions, fileName) {
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'N/A') return new Date().toLocaleDateString('en-US');
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toLocaleDateString('en-US');
    return d.toLocaleDateString('en-US');
  };

  let qifContent = '!Type:Bank\n';

  transactions.forEach((tx) => {
    const amount = parseFloat(tx.amount) || 0;
    const signedAmount = tx.type === 'credit' ? Math.abs(amount) : -Math.abs(amount);
    const desc = (tx.description || 'Transaction').substring(0, 64);

    qifContent += `D${formatDate(tx.date)}\n`;
    qifContent += `T${signedAmount.toFixed(2)}\n`;
    qifContent += `P${desc}\n`;
    if (tx.category) qifContent += `L${tx.category}\n`;
    qifContent += '^\n';
  });

  return qifContent;
}

// ============================================
// BALANCE VERIFICATION HELPER
// ============================================
function verifyBalances(transactions) {
  if (!transactions || transactions.length < 2) return { valid: true, errors: [] };

  const errors = [];
  let calculatedBalance = null;

  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];
    const currentBalance = parseFloat(tx.balance);
    const amount = parseFloat(tx.amount) || 0;

    if (isNaN(currentBalance)) continue;

    if (calculatedBalance !== null) {
      const signedAmount = tx.type === 'credit' ? Math.abs(amount) : -Math.abs(amount);
      const expectedBalance = calculatedBalance + signedAmount;
      const diff = Math.abs(expectedBalance - currentBalance);

      if (diff > 0.02) { // Allow 2 cent tolerance for rounding
        errors.push({
          row: i + 1,
          date: tx.date,
          expected: expectedBalance.toFixed(2),
          actual: currentBalance.toFixed(2),
          difference: (currentBalance - expectedBalance).toFixed(2)
        });
      }
    }

    calculatedBalance = currentBalance;
  }

  return {
    valid: errors.length === 0,
    errors,
    summary: {
      totalTransactions: transactions.length,
      openingBalance: parseFloat(transactions[0]?.balance) || 0,
      closingBalance: parseFloat(transactions[transactions.length - 1]?.balance) || 0,
      totalCredits: transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + Math.abs(parseFloat(t.amount) || 0), 0),
      totalDebits: transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + Math.abs(parseFloat(t.amount) || 0), 0)
    }
  };
}

// ============================================
// SAMPLE OUTPUT MODAL
// ============================================
function SampleOutputModal({ onClose }) {
  const sampleData = [
    { date: '2025-11-01', description: 'Opening Balance', amount: null, type: null, balance: 3240.55 },
    { date: '2025-11-02', description: 'Payroll Direct Deposit - ACME Corp', amount: 2750.00, type: 'credit', balance: 5990.55 },
    { date: '2025-11-03', description: 'WHOLE FOODS NYC #1234', amount: -86.42, type: 'debit', balance: 5904.13 },
    { date: '2025-11-05', description: 'CONED BILLPAY - Autopay', amount: -143.21, type: 'debit', balance: 5760.92 },
    { date: '2025-11-11', description: 'Monthly Maintenance Fee', amount: -12.00, type: 'debit', balance: 5748.92 },
    { date: '2025-11-21', description: 'Mobile Check Deposit', amount: 450.00, type: 'credit', balance: 6198.92 },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden my-8">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white"><Icons.X /></button>
          <h2 className="text-2xl font-bold">Sample Output Preview</h2>
          <p className="text-emerald-100 mt-1">See what your converted bank statement will look like</p>
        </div>
        <div className="p-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500"><Icons.FileSpreadsheet /><span>chase_statement_nov2025.pdf</span></div>
            <span className="text-emerald-600 text-sm font-medium">→ Converted</span>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
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
                {sampleData.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-mono">{tx.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{tx.description}</td>
                    <td className={`px-4 py-3 text-sm font-medium text-right font-mono ${tx.amount === null ? 'text-gray-400' : tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.amount === null ? '—' : tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                    </td>
                    <td className="px-4 py-3">{tx.type && <span className={`px-2 py-1 text-xs font-medium rounded-full ${tx.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{tx.type}</span>}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right font-mono">${tx.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 mb-2">✨ Export Formats:</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>✓ Excel (.xlsx)</li>
                <li>✓ CSV (.csv)</li>
                <li>✓ QuickBooks (.qbo) <span className="bg-emerald-200 text-emerald-800 text-xs px-1 rounded">NEW</span></li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">📊 Data Quality:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✓ ISO dates (YYYY-MM-DD)</li>
                <li>✓ Signed amounts (-/+)</li>
                <li>✓ Auto-categorized</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">Close</button>
          <button onClick={onClose} className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-600">Try It Now</button>
        </div>
      </div>
    </div>
  );
}

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
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"><Icons.X /></button>
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-emerald-100 mt-1">{isLogin ? 'Sign in to continue' : 'Start your free trial today'}</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2"><Icons.AlertCircle /><span className="text-sm">{error}</span></div>}
          {!isLogin && <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="John Doe" required={!isLogin} /></div>}
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="you@example.com" required /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="••••••••" required minLength={6} /></div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Icons.Loader /><span>Please wait...</span></> : <span>{isLogin ? 'Sign In' : 'Start Free Trial'}</span>}
          </button>
          <div className="text-center"><button type="button" onClick={() => { setIsLogin(!isLogin); setError(null); }} className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">{isLogin ? "Don't have an account? Start free" : 'Already have an account? Sign in'}</button></div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// PRICING MODAL - UPDATED with QBO feature
// ============================================
function PricingModal({ onClose, onUpgrade, currentPlan }) {
  const plans = [
    { name: 'Free', price: '$0', features: [`${MAX_FREE_CONVERSIONS} conversions/month`, 'Excel & CSV export', 'Balance verification'], cta: 'Current Plan', disabled: true, highlight: false },
    { name: 'Pro', price: '$9', features: ['Unlimited conversions', 'QuickBooks & Quicken export', 'Bulk upload (10 files)', 'Priority support'], cta: 'Upgrade to Pro', disabled: false, highlight: true },
    { name: 'Business', price: '$29', features: ['Everything in Pro', 'Xero integration', 'API access', 'Team features (5 seats)'], cta: 'Contact Sales', disabled: false, highlight: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden my-8">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white"><Icons.X /></button>
          <h2 className="text-3xl font-bold">Choose Your Plan</h2>
          <p className="text-emerald-100 mt-2">Perfect for accountants, loan officers, and finance teams</p>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-xl p-6 ${plan.highlight ? 'bg-gradient-to-b from-emerald-50 to-teal-50 border-2 border-emerald-500 relative' : 'bg-gray-50 border border-gray-200'}`}>
              {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4"><span className="text-4xl font-bold text-gray-900">{plan.price}</span><span className="text-gray-500">/month</span></div>
              <ul className="mt-6 space-y-3">{plan.features.map((f, i) => <li key={i} className="flex items-center gap-2 text-gray-600"><span className="text-emerald-500"><Icons.Check size={16} /></span><span className="text-sm">{f}</span></li>)}</ul>
              <button onClick={() => !plan.disabled && onUpgrade(plan.name.toLowerCase())} disabled={plan.disabled} className={`w-full mt-6 py-3 rounded-lg font-semibold ${plan.highlight ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' : plan.disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>{currentPlan === plan.name.toLowerCase() ? 'Current Plan' : plan.cta}</button>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6 text-center"><p className="text-sm text-gray-500">🔒 Secure payment • Cancel anytime • 30-day money-back guarantee</p></div>
      </div>
    </div>
  );
}

// ============================================
// PRIVACY & TERMS MODALS
// ============================================
function PrivacyPolicyModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden my-8">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white"><Icons.X /></button>
          <h2 className="text-2xl font-bold">Privacy Policy</h2>
        </div>
        <div className="p-6 max-h-96 overflow-y-auto text-gray-600 text-sm space-y-4">
          <p><strong>File Security:</strong> Your bank statements are processed securely and automatically deleted within 24 hours. We do not store, share, or sell your financial data.</p>
          <p><strong>Data Collection:</strong> We collect your email and payment info for account management. All transfers use 256-bit SSL encryption.</p>
          <p><strong>Third Parties:</strong> We use Stripe for payments and AWS for infrastructure. Both have enterprise-grade security.</p>
          <p><strong>Your Rights:</strong> You can request data deletion anytime at {SUPPORT_EMAIL}</p>
        </div>
        <div className="p-4 bg-gray-50 border-t"><button onClick={onClose} className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600">Close</button></div>
      </div>
    </div>
  );
}

function TermsOfServiceModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden my-8">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white"><Icons.X /></button>
          <h2 className="text-2xl font-bold">Terms of Service</h2>
        </div>
        <div className="p-6 max-h-96 overflow-y-auto text-gray-600 text-sm space-y-4">
          <p><strong>Service:</strong> StatementPro converts bank statements to Excel, CSV, and QuickBooks formats using OCR technology.</p>
          <p><strong>Accuracy:</strong> While we strive for high accuracy, please verify extracted data before use in financial decisions.</p>
          <p><strong>Payments:</strong> Subscriptions are billed monthly. Cancel anytime with our 30-day money-back guarantee.</p>
          <p><strong>Contact:</strong> Questions? Email {SUPPORT_EMAIL}</p>
        </div>
        <div className="p-4 bg-gray-50 border-t"><button onClick={onClose} className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600">Close</button></div>
      </div>
    </div>
  );
}

// ============================================
// XERO INTEGRATION MODAL
// ============================================
function XeroModal({ onClose, onConnect, isConnected, onDisconnect }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-[#13B5EA] to-[#0D94C7] text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white"><Icons.X /></button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#13B5EA] font-bold text-xl">X</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Xero Integration</h2>
              <p className="text-blue-100">Sync transactions directly to Xero</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          {isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Icons.CheckCircle />
                <div>
                  <p className="font-medium text-green-800">Connected to Xero</p>
                  <p className="text-sm text-green-600">Your account is linked</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">What you can do:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2"><Icons.Check size={16} /><span>Export transactions to Xero</span></li>
                  <li className="flex items-center gap-2"><Icons.Check size={16} /><span>Auto-match to bank feeds</span></li>
                  <li className="flex items-center gap-2"><Icons.Check size={16} /><span>Sync categories & accounts</span></li>
                </ul>
              </div>
              <button onClick={onDisconnect} className="w-full py-3 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50">Disconnect Xero</button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Connect your Xero account to:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2"><Icons.Check size={16} /><span>Export transactions directly to Xero</span></li>
                  <li className="flex items-center gap-2"><Icons.Check size={16} /><span>Auto-match with bank reconciliation</span></li>
                  <li className="flex items-center gap-2"><Icons.Check size={16} /><span>Sync categories & chart of accounts</span></li>
                </ul>
              </div>
              <button onClick={onConnect} className="w-full py-3 bg-[#13B5EA] text-white rounded-lg font-semibold hover:bg-[#0D94C7] flex items-center justify-center gap-2">
                <Icons.Link /><span>Connect to Xero</span>
              </button>
              <p className="text-xs text-gray-500 text-center">Requires Business plan. Secure OAuth connection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// API ACCESS MODAL
// ============================================
function APIModal({ onClose, apiKey, onGenerateKey, onRevokeKey }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-8">
        <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white"><Icons.X /></button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center"><Icons.Code /></div>
            <div>
              <h2 className="text-2xl font-bold">API Access</h2>
              <p className="text-gray-300">Integrate StatementPro into your apps</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* API Key Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Your API Key</h3>
            {apiKey ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-3 bg-gray-100 rounded-lg font-mono text-sm text-gray-800 overflow-x-auto">{apiKey}</code>
                  <button onClick={copyToClipboard} className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200" title="Copy">
                    {copied ? <Icons.Check size={16} /> : <Icons.Copy />}
                  </button>
                </div>
                <button onClick={onRevokeKey} className="text-sm text-red-600 hover:text-red-700">Revoke & Generate New Key</button>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-gray-600 mb-3">No API key generated yet</p>
                <button onClick={onGenerateKey} className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600">Generate API Key</button>
              </div>
            )}
          </div>

          {/* Endpoints */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">API Endpoints</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">POST</span>
                  <code className="text-sm font-mono">/api/v1/convert</code>
                </div>
                <p className="text-sm text-gray-600">Upload and convert a bank statement PDF</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">GET</span>
                  <code className="text-sm font-mono">/api/v1/conversions/:id</code>
                </div>
                <p className="text-sm text-gray-600">Retrieve conversion results by ID</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">GET</span>
                  <code className="text-sm font-mono">/api/v1/usage</code>
                </div>
                <p className="text-sm text-gray-600">Check your API usage and limits</p>
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">Rate Limits</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Business plan: 1,000 requests/day</li>
              <li>• Max file size: 10MB per request</li>
              <li>• Concurrent requests: 5</li>
            </ul>
          </div>

          {/* Docs Link */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <span className="text-gray-700">Need help integrating?</span>
            <a href="#" className="flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700">View Documentation <Icons.ExternalLink /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// TEAM MANAGEMENT MODAL
// ============================================
function TeamModal({ onClose, team, onInvite, onRemoveMember, onUpdateRole }) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [inviting, setInviting] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviting(true);
    await onInvite(inviteEmail, inviteRole);
    setInviteEmail('');
    setInviting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-8">
        <div className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white"><Icons.X /></button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Icons.Users /></div>
            <div>
              <h2 className="text-2xl font-bold">Team Management</h2>
              <p className="text-purple-100">Manage your team members and permissions</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Invite Form */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Invite Team Member</h3>
            <form onSubmit={handleInvite} className="flex gap-3">
              <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@company.com" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" required />
              <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" disabled={inviting} className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 disabled:opacity-50">
                {inviting ? 'Inviting...' : 'Invite'}
              </button>
            </form>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Team Members ({team?.length || 0})</h3>
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
              {team && team.length > 0 ? team.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                      {member.name?.charAt(0) || member.email?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name || member.email}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select value={member.role} onChange={(e) => onUpdateRole(member.id, e.target.value)} className="px-2 py-1 text-sm border border-gray-200 rounded" disabled={member.role === 'owner'}>
                      <option value="owner" disabled>Owner</option>
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                    </select>
                    {member.role !== 'owner' && (
                      <button onClick={() => onRemoveMember(member.id)} className="text-red-500 hover:text-red-600"><Icons.X /></button>
                    )}
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-gray-500">
                  <Icons.Users />
                  <p className="mt-2">No team members yet</p>
                  <p className="text-sm">Invite colleagues to collaborate</p>
                </div>
              )}
            </div>
          </div>

          {/* Permissions Info */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Role Permissions</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li><strong>Owner:</strong> Full access, billing, team management</li>
              <li><strong>Admin:</strong> Convert, export, invite members</li>
              <li><strong>Member:</strong> Convert and export only</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// BALANCE VERIFICATION DISPLAY
// ============================================
function BalanceVerificationPanel({ verification, onClose }) {
  if (!verification) return null;

  return (
    <div className="mt-4 p-4 rounded-lg border" style={{ borderColor: verification.valid ? '#10b981' : '#f59e0b', backgroundColor: verification.valid ? '#ecfdf5' : '#fffbeb' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {verification.valid ? <Icons.CheckCircle /> : <Icons.AlertCircle />}
          <span className="font-semibold" style={{ color: verification.valid ? '#059669' : '#d97706' }}>
            {verification.valid ? 'Balance Verified' : 'Balance Discrepancies Found'}
          </span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Icons.X /></button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
        <div className="text-center p-2 bg-white rounded">
          <p className="text-xs text-gray-500">Opening</p>
          <p className="font-semibold">${verification.summary.openingBalance.toFixed(2)}</p>
        </div>
        <div className="text-center p-2 bg-white rounded">
          <p className="text-xs text-gray-500">Closing</p>
          <p className="font-semibold">${verification.summary.closingBalance.toFixed(2)}</p>
        </div>
        <div className="text-center p-2 bg-white rounded">
          <p className="text-xs text-gray-500">Credits</p>
          <p className="font-semibold text-emerald-600">+${verification.summary.totalCredits.toFixed(2)}</p>
        </div>
        <div className="text-center p-2 bg-white rounded">
          <p className="text-xs text-gray-500">Debits</p>
          <p className="font-semibold text-red-600">-${verification.summary.totalDebits.toFixed(2)}</p>
        </div>
      </div>

      {!verification.valid && verification.errors.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-amber-800 mb-2">Discrepancies ({verification.errors.length}):</p>
          <div className="max-h-32 overflow-y-auto">
            {verification.errors.slice(0, 5).map((err, idx) => (
              <div key={idx} className="text-xs text-amber-700 py-1">
                Row {err.row} ({err.date}): Expected ${err.expected}, got ${err.actual} (diff: ${err.difference})
              </div>
            ))}
            {verification.errors.length > 5 && <p className="text-xs text-amber-600">...and {verification.errors.length - 5} more</p>}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// TRANSACTION TABLE - with QBO/QIF export and balance verification
// ============================================
function TransactionTable({ data, onExport, onUploadAnother, userPlan, bank, onVerifyBalance, verification, onClearVerification }) {
  const [selectedFormat, setSelectedFormat] = useState('xlsx');
  if (!data || data.length === 0) return null;

  const isPro = userPlan === 'pro' || userPlan === 'business';
  const isBusiness = userPlan === 'business';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900">Extracted Transactions</h3>
          <p className="text-sm text-gray-500">{data.length} transactions found</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onVerifyBalance} className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50" title="Verify Balances">
            <Icons.CheckCircle /><span className="hidden sm:inline">Verify</span>
          </button>
          <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="xlsx">Excel (.xlsx)</option>
            <option value="csv">CSV (.csv)</option>
            <option value="qbo">QuickBooks (.qbo) {!isPro && '🔒'}</option>
            <option value="qif">Quicken (.qif) {!isPro && '🔒'}</option>
          </select>
          <button
            onClick={() => onExport(selectedFormat)}
            disabled={(selectedFormat === 'qbo' || selectedFormat === 'qif') && !isPro}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              (selectedFormat === 'qbo' || selectedFormat === 'qif') && !isPro
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
            }`}
          >
            <Icons.Download /><span>Export</span>
          </button>
        </div>
      </div>

      {(selectedFormat === 'qbo' || selectedFormat === 'qif') && !isPro && (
        <div className="px-4 py-3 bg-amber-50 border-b border-amber-200 flex items-center gap-2 text-sm text-amber-800">
          <Icons.Calculator />
          <span>{selectedFormat === 'qbo' ? 'QuickBooks' : 'Quicken'} export is available on Pro plan. <button onClick={() => {}} className="underline font-medium">Upgrade for $9/mo</button></span>
        </div>
      )}

      {verification && <div className="px-4"><BalanceVerificationPanel verification={verification} onClose={onClearVerification} /></div>}
      
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
            {data.slice(0, 20).map((tx, idx) => {
              const amount = parseFloat(tx.amount) || 0;
              const balance = tx.balance !== null ? parseFloat(tx.balance) : null;
              const isCredit = tx.type === 'credit';
              return (
                <tr key={idx} className={`hover:bg-gray-50 ${tx.pending ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3 text-sm text-gray-900 font-mono">{tx.date || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{tx.description || '-'}{tx.pending && <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Pending</span>}</td>
                  <td className={`px-4 py-3 text-sm font-medium text-right font-mono ${isCredit ? 'text-emerald-600' : 'text-red-600'}`}>{isCredit ? '+' : ''}{amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `$${amount.toFixed(2)}`}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 text-xs font-medium rounded-full ${isCredit ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{tx.type || 'debit'}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-mono">{balance !== null ? `$${balance.toFixed(2)}` : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {data.length > 20 && <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">Showing 20 of {data.length} transactions. Export to see all.</div>}
      </div>
      <div className="p-4 bg-gray-50 border-t flex justify-center">
        <button onClick={onUploadAnother} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"><Icons.Plus /><span>Upload Another Statement</span></button>
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
// PROCESSING STEPS
// ============================================
function ProcessingSteps({ currentStep }) {
  const steps = ['Uploading', 'Analyzing', 'Extracting', 'Processing'];
  return (
    <div className="flex items-center justify-center gap-1 py-4">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${currentStep === i + 1 ? 'bg-emerald-100 text-emerald-700' : currentStep > i + 1 ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
            {currentStep > i + 1 ? '✓' : i + 1}. {step}
          </div>
          {i < steps.length - 1 && <div className={`w-4 h-0.5 ${currentStep > i + 1 ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
        </div>
      ))}
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
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showSampleOutput, setShowSampleOutput] = useState(false);
  const [showXero, setShowXero] = useState(false);
  const [showAPI, setShowAPI] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [conversionCount, setConversionCount] = useState(0);
  const [xeroConnected, setXeroConnected] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const [team, setTeam] = useState([]);
  const [balanceVerification, setBalanceVerification] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try { const u = JSON.parse(savedUser); setUser(u); setConversionCount(u.conversions || 0); } 
      catch { localStorage.removeItem('token'); localStorage.removeItem('user'); }
    }
  }, []);

  const handleLogin = async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setConversionCount(data.user.conversions || 0);
    setShowAuth(false);
  };

  const handleRegister = async (name, email, password) => {
    const res = await fetch(`${API_URL}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setConversionCount(0);
    setShowAuth(false);
  };

  const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); setConversionCount(0); setFiles([]); setExtractedData(null); };

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf' || f.type.startsWith('image/'));
    if (dropped.length > 0) addFiles(dropped);
    else setError('Please upload PDF or image files only');
  }, [user, conversionCount]);

  const handleFileInput = (e) => { const selected = Array.from(e.target.files); if (selected.length > 0) addFiles(selected); };

  const addFiles = (newFiles) => {
    if (!user) { setShowAuth(true); return; }
    
    const isPro = user.plan === 'pro' || user.plan === 'business';
    const maxFiles = isPro ? MAX_BULK_FILES_PRO : MAX_BULK_FILES_FREE;
    const maxConv = isPro ? Infinity : MAX_FREE_CONVERSIONS;
    const remaining = maxConv - conversionCount;
    
    // Check bulk upload limit
    if (newFiles.length > maxFiles) {
      setError(`You can upload up to ${maxFiles} file(s) at once. ${!isPro ? 'Upgrade to Pro for bulk upload!' : ''}`);
      if (!isPro) setShowPricing(true);
      return;
    }
    
    // Check conversion limit for free users
    if (!isPro && newFiles.length > remaining) {
      setError(`You can only convert ${remaining} more file(s). Upgrade for unlimited!`);
      setShowPricing(true);
      return;
    }
    
    setFiles(prev => [...prev, ...newFiles.map(f => ({ file: f, id: Math.random().toString(36).substr(2, 9), status: 'pending', name: f.name, size: f.size }))]);
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
        
        setProcessingStep(1);
        const formData = new FormData();
        formData.append('file', fileObj.file);
        
        setProcessingStep(2);
        const response = await fetch(`${API_URL}/api/convert`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
        
        setProcessingStep(3);
        const data = await response.json();
        
        setProcessingStep(4);

        if (data.success) {
          setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'completed' } : f));
          setExtractedData({ fileName: data.data.fileName, transactions: data.data.transactions, bank: data.data.bank });
          const newCount = conversionCount + 1;
          setConversionCount(newCount);
          const updatedUser = { ...user, conversions: newCount };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setSuccess(`Successfully extracted ${data.data.transactions.length} transactions from ${data.data.bank}!`);
        } else {
          setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'error' } : f));
          throw new Error(data.error || 'Conversion failed');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
      setProcessingStep(0);
    }
  };

  const handleExport = async (format) => {
    if (!extractedData?.transactions) return;
    const { transactions, fileName, bank } = extractedData;
    const baseName = fileName.replace(/\.(pdf|jpg|jpeg|png)$/i, '');
    const isPro = user?.plan === 'pro' || user?.plan === 'business';

    if (format === 'qbo') {
      if (!isPro) {
        setError('QuickBooks export requires Pro plan. Upgrade for $9/mo!');
        setShowPricing(true);
        return;
      }
      const qboContent = generateQBOFile(transactions, fileName, bank);
      const blob = new Blob([qboContent], { type: 'application/x-qbo' });
      downloadBlob(blob, `${baseName}_quickbooks.qbo`);
      return;
    }

    if (format === 'qif') {
      if (!isPro) {
        setError('Quicken export requires Pro plan. Upgrade for $9/mo!');
        setShowPricing(true);
        return;
      }
      const qifContent = generateQIFFile(transactions, fileName);
      const blob = new Blob([qifContent], { type: 'application/qif' });
      downloadBlob(blob, `${baseName}_quicken.qif`);
      return;
    }

    if (format === 'csv') {
      const headers = ['Date', 'Description', 'Amount', 'Type', 'Category', 'Balance'];
      const rows = transactions.map(tx => [tx.date, `"${(tx.description || '').replace(/"/g, '""')}"`, tx.amount, tx.type, tx.category || '', tx.balance || '']);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      downloadBlob(blob, `${baseName}_transactions.csv`);
    } else {
      try {
        const XLSX = await import('xlsx');
        const wsData = [['Date', 'Description', 'Amount', 'Type', 'Category', 'Balance'], ...transactions.map(tx => [tx.date, tx.description, tx.amount, tx.type, tx.category || '', tx.balance || ''])];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        ws['!cols'] = [{ wch: 12 }, { wch: 40 }, { wch: 12 }, { wch: 10 }, { wch: 15 }, { wch: 12 }];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
        XLSX.writeFile(wb, `${baseName}_transactions.xlsx`);
      } catch (err) {
        setError('Failed to export Excel. Try CSV instead.');
      }
    }
  };

  const downloadBlob = (blob, filename) => { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); };

  const handleUpgrade = async (plan) => {
    if (!user) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/create-checkout-session`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ plan }) });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { setError('Failed to create checkout session'); }
  };

  const formatFileSize = (bytes) => { if (bytes === 0) return '0 B'; const k = 1024; const sizes = ['B', 'KB', 'MB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]; };

  const scrollToConverter = () => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' });
  
  const handleUploadAnother = () => { setFiles([]); setExtractedData(null); setSuccess(null); setBalanceVerification(null); };

  // Balance Verification
  const handleVerifyBalance = () => {
    if (!extractedData?.transactions) return;
    const result = verifyBalances(extractedData.transactions);
    setBalanceVerification(result);
  };

  // Xero Integration
  const handleConnectXero = async () => {
    if (user?.plan !== 'business') {
      setError('Xero integration requires Business plan.');
      setShowPricing(true);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/integrations/xero/connect`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.authUrl) window.location.href = data.authUrl;
      else if (data.connected) setXeroConnected(true);
    } catch { setError('Failed to connect to Xero'); }
  };

  const handleDisconnectXero = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/integrations/xero/disconnect`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      setXeroConnected(false);
    } catch { setError('Failed to disconnect Xero'); }
  };

  // API Key Management
  const handleGenerateAPIKey = async () => {
    if (user?.plan !== 'business') {
      setError('API access requires Business plan.');
      setShowPricing(true);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/developer/keys`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.apiKey) setApiKey(data.apiKey);
    } catch { setError('Failed to generate API key'); }
  };

  const handleRevokeAPIKey = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/developer/keys`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setApiKey(null);
      handleGenerateAPIKey();
    } catch { setError('Failed to revoke API key'); }
  };

  // Team Management
  const handleInviteTeamMember = async (email, role) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/team/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email, role })
      });
      const data = await res.json();
      if (data.member) setTeam(prev => [...prev, data.member]);
      setSuccess(`Invitation sent to ${email}`);
    } catch { setError('Failed to invite team member'); }
  };

  const handleRemoveTeamMember = async (memberId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/team/members/${memberId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeam(prev => prev.filter(m => m.id !== memberId));
    } catch { setError('Failed to remove team member'); }
  };

  const handleUpdateMemberRole = async (memberId, role) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/team/members/${memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role })
      });
      setTeam(prev => prev.map(m => m.id === memberId ? { ...m, role } : m));
    } catch { setError('Failed to update role'); }
  };

  const testimonials = [
    { name: 'Jennifer M.', role: 'CPA', quote: 'Saved me hours during tax season. The QuickBooks export is a game changer!', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Robert K.', role: 'Loan Officer', quote: 'Cut my processing time in half. Accurate and fast.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Amanda L.', role: 'Business Owner', quote: 'Simple way to get statements into Excel. Love it!', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"><span className="text-white font-bold text-xl">S</span></div>
              <span className="text-xl font-bold text-gray-900">StatementPro</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  {user.plan === 'business' && (
                    <div className="hidden md:flex items-center gap-2">
                      <button onClick={() => setShowXero(true)} className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900" title="Xero Integration">
                        <Icons.Link /><span className="hidden lg:inline">Xero</span>
                      </button>
                      <button onClick={() => setShowAPI(true)} className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900" title="API Access">
                        <Icons.Code /><span className="hidden lg:inline">API</span>
                      </button>
                      <button onClick={() => setShowTeam(true)} className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900" title="Team Management">
                        <Icons.Users /><span className="hidden lg:inline">Team</span>
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                    <Icons.User />
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.name || user.email?.split('@')[0]}</span>
                    {user.plan === 'business' && <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">BIZ</span>}
                    {user.plan === 'pro' && <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">PRO</span>}
                  </div>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 text-sm">Sign Out</button>
                </>
              ) : (
                <>
                  <button onClick={() => setShowAuth(true)} className="text-gray-600 hover:text-gray-900 text-sm font-medium">Sign In</button>
                  <button onClick={() => setShowAuth(true)} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-emerald-500/20">Start Free</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6"><Icons.Shield /><span>Trusted by accountants & finance teams</span></div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Convert Bank Statements to<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"> Excel </span>in Seconds</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Stop manually entering transactions. Export to Excel, CSV, or QuickBooks with one click.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button onClick={scrollToConverter} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl shadow-emerald-500/30"><span>Convert Statement Free</span><Icons.ArrowRight /></button>
            <button onClick={() => setShowSampleOutput(true)} className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 hover:bg-gray-50"><Icons.Eye /><span>See Sample Output</span></button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Icons.Calculator /> QuickBooks Ready</span>
            <span>•</span>
            <div className="flex items-center gap-1">{[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400"><Icons.Star /></span>)}<span className="ml-1">4.9/5</span></div>
            <span>•</span>
            <span>1,000+ users</span>
          </div>
        </div>
      </section>

      {/* BANKS */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-8">WORKS WITH ALL MAJOR BANKS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {['Chase', 'Bank of America', 'Wells Fargo', 'Citi', 'Capital One', 'TD Bank'].map(b => <span key={b} className="text-gray-900 font-semibold text-lg">{b}</span>)}
          </div>
        </div>
      </section>

      {/* CONVERTER */}
      <section id="converter" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Statement</h2>
            <p className="text-gray-600">Drag & drop or click to upload. PDF and images supported.</p>
          </div>

          {/* TRUST BADGES */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2"><span className="text-emerald-500"><Icons.ShieldCheck /></span><span>256-bit encrypted</span></div>
            <div className="flex items-center gap-2"><span className="text-emerald-500"><Icons.Trash /></span><span>Auto-deleted in 24hrs</span></div>
            <div className="flex items-center gap-2"><span className="text-emerald-500"><Icons.Lock /></span><span>We never store your data</span></div>
          </div>

          {user && user.plan === 'free' && (
            <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Icons.Zap /></div>
                <div><p className="font-medium text-amber-800">Free Plan: {MAX_FREE_CONVERSIONS - conversionCount} of {MAX_FREE_CONVERSIONS} left</p><p className="text-sm text-amber-600">Upgrade for unlimited + QuickBooks export</p></div>
              </div>
              <button onClick={() => setShowPricing(true)} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium">Upgrade</button>
            </div>
          )}

          {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2"><Icons.AlertCircle /><span>{error}</span><button onClick={() => setError(null)} className="ml-auto"><Icons.X /></button></div>}
          {success && <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-2"><Icons.Check /><span>{success}</span><button onClick={() => setSuccess(null)} className="ml-auto"><Icons.X /></button></div>}

          {isProcessing && <ProcessingSteps currentStep={processingStep} />}

          <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => document.getElementById('fileInput').click()} className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'}`}>
            <input id="fileInput" type="file" accept=".pdf,image/*" multiple onChange={handleFileInput} className="hidden" />
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full ${isDragging ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}><Icons.Upload size={40} /></div>
              <div><p className="text-lg font-semibold text-gray-700">{isDragging ? 'Drop here' : 'Drag & drop bank statements'}</p><p className="text-gray-500 mt-1">or click to browse • Up to {user?.plan === 'pro' || user?.plan === 'business' ? MAX_BULK_FILES_PRO : MAX_BULK_FILES_FREE} file(s)</p></div>
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
                        {f.status === 'completed' ? 'Done' : f.status === 'error' ? 'Failed' : f.status === 'processing' ? 'Processing' : 'Ready'}
                      </span>
                      <button onClick={() => removeFile(f.id)} className="text-gray-400 hover:text-red-500"><Icons.X /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <button onClick={processFiles} disabled={isProcessing || files.every(f => f.status === 'completed')} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                  {isProcessing ? <><Icons.Loader /><span>Processing...</span></> : <span>Convert {files.filter(f => f.status === 'pending').length} File(s)</span>}
                </button>
              </div>
            </div>
          )}

          {extractedData?.transactions && (
            <div className="mt-8">
              <TransactionTable
                data={extractedData.transactions}
                onExport={handleExport}
                onUploadAnother={handleUploadAnother}
                userPlan={user?.plan}
                bank={extractedData.bank}
                onVerifyBalance={handleVerifyBalance}
                verification={balanceVerification}
                onClearVerification={() => setBalanceVerification(null)}
              />
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">Why StatementPro?</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Icons.Zap />, title: 'Lightning Fast', desc: 'Convert in seconds', color: 'bg-yellow-100 text-yellow-600' },
              { icon: <Icons.Calculator />, title: 'QuickBooks & Quicken', desc: 'Export to QBO & QIF', color: 'bg-green-100 text-green-600' },
              { icon: <Icons.Link />, title: 'Xero Integration', desc: 'Sync directly to Xero', color: 'bg-blue-100 text-blue-600' },
              { icon: <Icons.CheckCircle />, title: 'Balance Verification', desc: 'Auto-verify accuracy', color: 'bg-emerald-100 text-emerald-600' },
              { icon: <Icons.Code />, title: 'API Access', desc: 'Build custom integrations', color: 'bg-purple-100 text-purple-600' },
              { icon: <Icons.Users />, title: 'Team Features', desc: 'Collaborate with your team', color: 'bg-pink-100 text-pink-600' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className={`w-14 h-14 ${f.color} rounded-xl flex items-center justify-center mb-6`}>{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ step: '1', title: 'Upload', desc: 'Drag & drop your PDF' }, { step: '2', title: 'Convert', desc: 'AI extracts transactions' }, { step: '3', title: 'Export', desc: 'Download Excel, CSV, or QBO' }].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">{item.step}</div>
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
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">What Users Say</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">{[1,2,3,4,5].map(j => <Icons.Star key={j} />)}</div>
                <p className="text-gray-600 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
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
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2><p className="text-gray-600">4x cheaper than competitors. No page limits.</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Free', price: '$0', features: [`${MAX_FREE_CONVERSIONS} conversions/mo`, 'Excel & CSV export', 'Balance verification'], cta: 'Get Started', highlight: false },
              { name: 'Pro', price: '$9', features: ['Unlimited conversions', 'QuickBooks & Quicken export', 'Bulk upload (10 files)', 'Priority support'], cta: 'Start Trial', highlight: true },
              { name: 'Business', price: '$29', features: ['Everything in Pro', 'Xero integration', 'API access', 'Team features (5 seats)'], cta: 'Contact Sales', highlight: false },
            ].map((p, i) => (
              <div key={i} className={`rounded-2xl p-8 ${p.highlight ? 'bg-gradient-to-b from-emerald-50 to-teal-50 border-2 border-emerald-500 relative shadow-xl' : 'bg-white border border-gray-200'}`}>
                {p.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold px-4 py-1 rounded-full">POPULAR</div>}
                <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                <div className="mt-6 mb-6"><span className="text-5xl font-bold text-gray-900">{p.price}</span><span className="text-gray-500">/mo</span></div>
                <ul className="space-y-3 mb-8">{p.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-gray-600"><span className="text-emerald-500"><Icons.Check size={16} /></span>{f}</li>)}</ul>
                <button onClick={() => p.highlight ? setShowPricing(true) : setShowAuth(true)} className={`w-full py-3 rounded-xl font-semibold ${p.highlight ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">FAQ</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8">
            <FAQItem question="Which banks do you support?" answer="All major US banks including Chase, Bank of America, Wells Fargo, Citi, and 100+ more." />
            <FAQItem question="Can I import to QuickBooks or Quicken?" answer="Yes! Pro users can export to .QBO (QuickBooks) and .QIF (Quicken) formats which import directly into both platforms." />
            <FAQItem question="Do you integrate with Xero?" answer="Yes! Business plan users can connect their Xero account and sync transactions directly for bank reconciliation." />
            <FAQItem question="Is my data secure?" answer="Yes. 256-bit SSL encryption, files auto-deleted in 24 hours. We never store your bank data." />
            <FAQItem question="Do you have an API?" answer="Yes! Business plan includes API access with 1,000 requests/day for custom integrations." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Save Hours?</h2>
          <button onClick={scrollToConverter} className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl"><span>Start Converting Free</span><Icons.ArrowRight /></button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4"><div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-xl">S</span></div><span className="text-xl font-bold text-white">StatementPro</span></div>
              <p className="text-gray-500">Convert bank statements to Excel & QuickBooks.</p>
            </div>
            <div><h4 className="text-white font-semibold mb-4">Product</h4><ul className="space-y-2"><li><a href="#features" className="hover:text-white">Features</a></li><li><a href="#pricing" className="hover:text-white">Pricing</a></li></ul></div>
            <div><h4 className="text-white font-semibold mb-4">Legal</h4><ul className="space-y-2"><li><button onClick={() => setShowPrivacy(true)} className="hover:text-white">Privacy</button></li><li><button onClick={() => setShowTerms(true)} className="hover:text-white">Terms</button></li></ul></div>
            <div><h4 className="text-white font-semibold mb-4">Contact</h4><ul className="space-y-2"><li><a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white flex items-center gap-2"><Icons.Mail />{SUPPORT_EMAIL}</a></li></ul></div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">© 2024 StatementPro. All rights reserved.</div>
        </div>
      </footer>

      {/* MODALS */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} onRegister={handleRegister} error={error} setError={setError} />}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} onUpgrade={handleUpgrade} currentPlan={user?.plan || 'free'} />}
      {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfServiceModal onClose={() => setShowTerms(false)} />}
      {showSampleOutput && <SampleOutputModal onClose={() => setShowSampleOutput(false)} />}
      {showXero && <XeroModal onClose={() => setShowXero(false)} onConnect={handleConnectXero} isConnected={xeroConnected} onDisconnect={handleDisconnectXero} />}
      {showAPI && <APIModal onClose={() => setShowAPI(false)} apiKey={apiKey} onGenerateKey={handleGenerateAPIKey} onRevokeKey={handleRevokeAPIKey} />}
      {showTeam && <TeamModal onClose={() => setShowTeam(false)} team={team} onInvite={handleInviteTeamMember} onRemoveMember={handleRemoveTeamMember} onUpdateRole={handleUpdateMemberRole} />}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; } html { scroll-behavior: smooth; }`}</style>
    </div>
  );
}