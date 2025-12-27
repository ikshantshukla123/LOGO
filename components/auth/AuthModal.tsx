"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight, Loader2, Smartphone, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export default function AuthModal() {
  const { isModalOpen, closeModal, login, view } = useAuthStore();
  const { syncCart } = useCartStore();

  // State
  const [step, setStep] = useState<"MOBILE" | "DETAILS">("MOBILE");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isModalOpen) {
      setStep("MOBILE");
      setMobile("");
      setName("");
      setIsNewUser(false);
    }
  }, [isModalOpen]);

  // --- LOGIC ---

  // Step 1: Check Mobile Number
  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit number");
      return;
    }

    setLoading(true);
    try {
      // Check if user exists
      const res = await fetch("/api/auth/check-user", {
        method: "POST",
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();

      if (data.exists) {
        // User exists -> Log them in directly
        await performLogin(data.user);
      } else {
        // User is new -> Move to Step 2 (Ask Name)
        setIsNewUser(true);
        setStep("DETAILS");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Register New User
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ mobile, name }),
      });
      const data = await res.json();
      
      if (res.ok) {
        await performLogin(data.user);
      }
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Helper: Finalize Login & Sync
  const performLogin = async (userData: any) => {
    login(userData);
    await syncCart();
    closeModal();
  };

  if (!isModalOpen) return null;

  // --- DYNAMIC TITLES BASED ON 'view' ---
  const getHeaderText = () => {
    if (view === 'cart') return "Login to add to bag";
    if (view === 'checkout') return "Login to Checkout";
    return "Welcome Back";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-3xl h-[500px] bg-black border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-zinc-800 rounded-full text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT SIDE: IMAGE (Hidden on mobile) */}
        <div className="hidden md:block w-1/2 relative h-full bg-zinc-900">
          <Image 
            src="/images/models/modaltwo.jpeg" // Make sure this path exists!
            alt="Login Banner"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">Urban Style</h3>
            <p className="text-sm text-zinc-300">Join the community and get exclusive access to drops.</p>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-zinc-950">
          
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2 block">
              {step === "MOBILE" ? "Step 1 of 2" : "Step 2 of 2"}
            </span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
              {step === "MOBILE" ? getHeaderText() : "What's your name?"}
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              {step === "MOBILE" 
                ? "Enter your mobile number to continue" 
                : "Looks like you're new here. Let's get you set up."}
            </p>
          </div>

          {/* STEP 1: MOBILE INPUT */}
          {step === "MOBILE" && (
            <form onSubmit={handleMobileSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Mobile Number</label>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 focus-within:border-white transition-colors">
                  <Smartphone className="w-5 h-5 text-zinc-500" />
                  <span className="text-zinc-400 font-medium">+91</span>
                  <input 
                    autoFocus
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) setMobile(val);
                    }}
                    placeholder="98765 43210"
                    className="bg-transparent border-none outline-none text-white w-full font-medium placeholder:text-zinc-600"
                    maxLength={10}
                  />
                </div>
              </div>

              <button 
                disabled={mobile.length < 10 || loading}
                className="w-full bg-white text-black h-12 rounded-lg font-bold uppercase tracking-widest hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}

          {/* STEP 2: NAME INPUT */}
          {step === "DETAILS" && (
            <form onSubmit={handleRegister} className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 focus-within:border-white transition-colors">
                  <User className="w-5 h-5 text-zinc-500" />
                  <input 
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-transparent border-none outline-none text-white w-full font-medium placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <button 
                disabled={name.length < 2 || loading}
                className="w-full bg-blue-600 text-white h-12 rounded-lg font-bold uppercase tracking-widest hover:bg-blue-500 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
              >
                 {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Finish Signup"}
              </button>
              
              <button 
                type="button"
                onClick={() => setStep("MOBILE")}
                className="w-full text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white mt-4"
              >
                Change Mobile Number
              </button>
            </form>
          )}

          {/* Footer Terms */}
          <div className="mt-auto pt-6 text-center">
            <p className="text-[10px] text-zinc-600">
              By continuing, you agree to our Terms of Service & Privacy Policy.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}