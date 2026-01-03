'use client';

import { useState } from 'react';
import { ShoppingCart, Check, Building2, Mail, Copy } from 'lucide-react';

export default function PurchaseButton({ course }) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    paymentMethod: 'bank_transfer',
    transactionReference: '',
  });

  // ⚠️ CHANGE THESE TO YOUR ACTUAL PAYMENT DETAILS!
  const BANK_NAME = "First Bank of Nigeria";
  const ACCOUNT_NUMBER = "1234567890";
  const ACCOUNT_NAME = "Your School Name";
  const PAYMENT_EMAIL = "payments@yourschool.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/courses/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          courseId: course.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setShowForm(false);
        setFormData({
          userName: '',
          userEmail: '',
          paymentMethod: 'bank_transfer',
          transactionReference: '',
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error submitting purchase');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
      >
        <ShoppingCart size={20} />
        Purchase Course
      </button>
    );
  }

  return (
    <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Complete Your Purchase</h3>

      {/* BANK ACCOUNT DETAILS */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="text-green-700" size={24} />
          <h4 className="font-bold text-green-900 text-lg">Payment Details</h4>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs text-green-700 font-medium">BANK NAME</p>
            <div className="flex items-center justify-between bg-white rounded-md px-3 py-2 mt-1">
              <p className="font-semibold text-gray-800">{BANK_NAME}</p>
              <button
                onClick={() => copyToClipboard(BANK_NAME, 'bank')}
                className="text-green-600 hover:text-green-700 p-1"
              >
                {copied === 'bank' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs text-green-700 font-medium">ACCOUNT NUMBER</p>
            <div className="flex items-center justify-between bg-white rounded-md px-3 py-2 mt-1">
              <p className="font-bold text-gray-800 text-lg">{ACCOUNT_NUMBER}</p>
              <button
                onClick={() => copyToClipboard(ACCOUNT_NUMBER, 'account')}
                className="text-green-600 hover:text-green-700 p-1"
              >
                {copied === 'account' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs text-green-700 font-medium">ACCOUNT NAME</p>
            <div className="flex items-center justify-between bg-white rounded-md px-3 py-2 mt-1">
              <p className="font-semibold text-gray-800">{ACCOUNT_NAME}</p>
              <button
                onClick={() => copyToClipboard(ACCOUNT_NAME, 'name')}
                className="text-green-600 hover:text-green-700 p-1"
              >
                {copied === 'name' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs text-green-700 font-medium">AMOUNT TO PAY</p>
            <div className="bg-white rounded-md px-3 py-2 mt-1">
              <p className="font-bold text-green-700 text-2xl">{course.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT EMAIL */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="text-blue-700" size={20} />
          <h4 className="font-semibold text-blue-900">Send Payment Proof To:</h4>
        </div>
        <div className="flex items-center justify-between bg-white rounded-md px-3 py-2">
          <a 
            href={`mailto:${PAYMENT_EMAIL}`}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            {PAYMENT_EMAIL}
          </a>
          <button
            onClick={() => copyToClipboard(PAYMENT_EMAIL, 'email')}
            className="text-blue-600 hover:text-blue-700 p-1"
          >
            {copied === 'email' ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* PAYMENT INSTRUCTIONS */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-yellow-900 mb-2">📋 Payment Instructions:</h4>
        <ol className="text-sm text-yellow-800 space-y-2 list-decimal list-inside">
          <li>Transfer <strong>{course.price}</strong> to the account above</li>
          <li>Take a screenshot of your payment receipt</li>
          <li>Fill the form below with your details</li>
          <li>Email your payment proof to: <strong>{PAYMENT_EMAIL}</strong></li>
          <li>Admin will verify within 24 hours and grant access</li>
        </ol>
      </div>

      {/* STUDENT DETAILS FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.userEmail}
            onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            You'll receive access details at this email
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method *
          </label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="card">Card Payment</option>
            <option value="cash">Cash Deposit</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Reference (Optional)
          </label>
          <input
            type="text"
            value={formData.transactionReference}
            onChange={(e) => setFormData({ ...formData, transactionReference: e.target.value })}
            placeholder="e.g., TXN123456789"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the transaction ID from your bank receipt
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : (
              <>
                <Check size={20} />
                Submit Purchase
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}