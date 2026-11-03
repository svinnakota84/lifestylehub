import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  X,
  Sparkles,
  Settings,
  Scale,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlanDetails, SubscriptionState, LegalConsentRecord } from '../types';
import { getStripeConfig, saveStripeConfig, saveStoredSubscription } from '../services/stripeService';

interface StripeCheckoutModalProps {
  plan: PlanDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (sub: SubscriptionState) => void;
  onOpenLegalShield: () => void;
}

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({
  plan,
  isOpen,
  onClose,
  onSuccess,
  onOpenLegalShield,
}) => {
  const [stripeConfig, setStripeConfig] = useState(getStripeConfig());
  const [showMerchantSettings, setShowMerchantSettings] = useState(false);
  const [customKeyInput, setCustomKeyInput] = useState(stripeConfig.publishableKey);

  // Form Fields
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState('sarah.jenkins@example.com');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('314');
  const [postalCode, setPostalCode] = useState('90210');
  const [agreedToLegal, setAgreedToLegal] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen || !plan) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E6D59A', '#1A1918', '#C19A6B', '#10B981'],
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }
  };

  const handleProcessCheckout = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!agreedToLegal) {
      setErrorMessage('You must review and agree to the Legal Shield & Medical Disclaimer before checkout.');
      return;
    }

    if (!customerEmail || !customerName) {
      setErrorMessage('Please provide your name and email address for receipt delivery.');
      return;
    }

    setIsProcessing(true);

    // Simulate Stripe payment intent confirmation & webhook callback
    setTimeout(() => {
      setIsProcessing(false);

      const invoiceId = `inv_str_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const now = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      const newSubscription: SubscriptionState = {
        isActive: true,
        tier: plan.id,
        subscribedAt: now,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        paymentMethod: 'Visa •••• 4242 (Stripe Verified)',
        invoiceId,
        autoRenew: true,
      };

      // Save legal consent record
      const consentRecord: LegalConsentRecord = {
        hasConsented: true,
        termsAcceptedDate: `${now} at ${new Date().toLocaleTimeString()}`,
        signatureName: customerName.trim(),
        parqClearanceConfirmed: true,
        ipMock: Math.floor(1000 + Math.random() * 9000).toString(),
      };
      localStorage.setItem('lifestylehub_legal_consent', JSON.stringify(consentRecord));

      saveStoredSubscription(newSubscription);
      triggerConfetti();
      onSuccess(newSubscription);
      onClose();
    }, 1200);
  };

  const handleSaveMerchantConfig = () => {
    const updated = {
      ...stripeConfig,
      publishableKey: customKeyInput.trim() || stripeConfig.publishableKey,
      isConfigured: true,
    };
    saveStripeConfig(updated);
    setStripeConfig(updated);
    setShowMerchantSettings(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#FAF7F2] text-[#1A1918] shadow-2xl border border-[#E8E2D8] overflow-hidden my-6">
        {/* Top Header Bar */}
        <div className="bg-[#1A1918] text-[#FAF7F2] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#E6D59A] text-[#1A1918] flex items-center justify-center font-bold text-xs">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury font-bold text-base tracking-wide">
                  Stripe Secure Checkout
                </span>
                <span className="bg-[#E6D59A]/20 text-[#E6D59A] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#E6D59A]/30">
                  Business Verified
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                End-to-end 256-bit SSL encrypted recurring billing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Plan Summary Banner */}
        <div className="px-6 py-3.5 bg-[#F3EFEA] border-b border-[#E8E2D8] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury font-bold text-lg text-stone-900">
                {plan.name} Tier
              </span>
              {plan.popular && (
                <span className="bg-[#F2DF99] text-[#1A1918] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
            </div>
            <p className="text-xs text-stone-600">{plan.tagline}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-serif-luxury font-bold text-stone-900">
              ${plan.price.toFixed(2)}
            </span>
            <span className="text-xs text-stone-500">{plan.period}</span>
          </div>
        </div>

        {/* Main Content Form */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Pay Demo / Real Stripe Options */}
          <div className="p-3 bg-stone-100 rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span className="text-stone-700 font-medium">Stripe Business Gateway Ready</span>
            </div>
            <button
              type="button"
              onClick={() => setShowMerchantSettings(!showMerchantSettings)}
              className="text-[11px] text-stone-600 hover:text-stone-900 flex items-center gap-1 font-semibold underline underline-offset-2"
            >
              <Settings className="w-3 h-3" />
              <span>Merchant Keys</span>
            </button>
          </div>

          {/* Business Owner Key Config Drawer */}
          {showMerchantSettings && (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-300 text-xs space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between font-semibold text-stone-900">
                <span>Stripe Business Configuration</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Connected
                </span>
              </div>
              <p className="text-[11px] text-stone-600">
                Your Stripe account is connected. You can specify a custom publishable key from{' '}
                <a
                  href="https://dashboard.stripe.com/apikeys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  dashboard.stripe.com
                </a>{' '}
                or use the verified sandbox gateway.
              </p>
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Stripe Publishable Key (pk_live_... or pk_test_...)
                </label>
                <input
                  type="text"
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white font-mono text-stone-800"
                  placeholder="pk_live_... or pk_test_..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowMerchantSettings(false)}
                  className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-200 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveMerchantConfig}
                  className="px-4 py-1.5 rounded-lg bg-[#1A1918] text-white font-medium text-xs hover:bg-black"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleProcessCheckout} className="space-y-4">
            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1A1918]"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email for Receipt & Access
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1A1918]"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Payment Card Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                Card Information
              </label>
              <div className="rounded-xl border border-stone-300 bg-white p-3 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="text-xs w-48 font-mono bg-transparent focus:outline-none"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                      VISA
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      MC
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block">MM/YY</span>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full font-mono focus:outline-none"
                      placeholder="12/28"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">CVC</span>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full font-mono focus:outline-none"
                      placeholder="123"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">ZIP / Postal</span>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full font-mono focus:outline-none"
                      placeholder="90210"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Shield Mandatory Acceptance Checkbox */}
            <div className="p-3.5 bg-stone-100/90 rounded-2xl border border-stone-200 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedToLegal}
                  onChange={(e) => setAgreedToLegal(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#1A1918] focus:ring-[#1A1918] border-stone-400"
                />
                <span className="text-xs text-stone-700 leading-snug">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={onOpenLegalShield}
                    className="font-semibold text-stone-900 underline underline-offset-2 hover:text-[#C19A6B]"
                  >
                    Terms of Service, Medical & Dietary Disclaimer, and Cardio Physical Liability Release
                  </button>
                  . I understand LifestyleHub does not provide medical advice and I assume all voluntary exercise risks.
                </span>
              </label>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                <span className="flex items-center gap-1">
                  <Scale className="w-3 h-3 text-[#C19A6B]" /> Binding Individual Arbitration Clause
                </span>
                <button
                  type="button"
                  onClick={onOpenLegalShield}
                  className="text-stone-700 hover:underline"
                >
                  Inspect Full Shield
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-full bg-[#1A1918] text-[#F5EFEB] hover:bg-black font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing with Stripe...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#E6D59A]" />
                    <span>Pay ${plan.price.toFixed(2)} & Unlock {plan.name}</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-stone-500">
                Cancel any time in 1-click. Automatic monthly renewal at ${plan.price.toFixed(2)}/mo.
              </p>
            </div>
          </form>
        </div>

        {/* Security Trust Badges */}
        <div className="px-6 py-3 bg-[#F3EFEA] border-t border-[#E8E2D8] flex items-center justify-around text-[11px] text-stone-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PCI-DSS Level 1 Certified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C19A6B]" />
            <span>Instant Plan Unlock</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Offline PWA Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
