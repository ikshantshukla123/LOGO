// components/modals/UserInfoModal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; mobile: string }) => void;
  type: "cart" | "buy";
}

export default function UserInfoModal({ isOpen, onClose, onSubmit, type }: UserInfoModalProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!mobile.trim() || !/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    
    // Call the onSubmit function passed from parent
    try {
      await onSubmit({ name, mobile });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md mx-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                {type === "cart" ? "Add to Cart" : "Buy Now"}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                We need your details to proceed
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mobile Number *
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400">
                +91
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 10) setMobile(value);
                }}
                placeholder="10-digit mobile number"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={10}
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              We'll send order updates via WhatsApp/SMS
            </p>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">
              By providing your details, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                type === "cart" ? "Add to Cart" : "Proceed to Payment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}