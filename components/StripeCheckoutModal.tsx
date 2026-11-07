import React, { useState } from 'react';
import { X, Lock, AlertCircle } from 'lucide-react';
import type { PlanDetails } from '../types';
import { startCheckout } from '../services/stripeService';
interface Props { plan: PlanDetails | null; isOpen: boolean; onClose: () => void; onOpenLegalShield: () => void }
export const StripeCheckoutModal: React.FC<Props> = ({ plan, isOpen, onClose, onOpenLegalShield }) => {
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  if (!isOpen || !plan) return null;
  async function checkout(event: React.FormEvent) {
    event.preventDefault();
    if (!agreed || busy || !plan) return;
    setBusy(true); setError('');
    try { await startCheckout(plan.id); }
    catch (err) { setError(err instanceof Error ? err.message : 'Checkout could not be started.'); setBusy(false); }
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
    <form onSubmit={checkout} className="w-full max-w-lg rounded-3xl bg-[#FAF7F2] p-6 space-y-5">
      <div className="flex items-center justify-between"><h2 id="checkout-title" className="text-2xl font-bold">{plan.name} membership</h2><button type="button" onClick={onClose} aria-label="Close checkout"><X /></button></div>
      <p className="text-3xl">USD {plan.price.toFixed(2)}<span className="text-sm"> / month base price</span></p>
      <p className="text-sm text-stone-600">You’ll enter your card details on Stripe’s secure payment page. Your subscription renews monthly until canceled. Manage billing and cancellation from your account.</p>
      <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="mt-1" /><span>I agree to the <button type="button" onClick={onOpenLegalShield} className="underline">terms and medical disclaimer</button> and a recurring monthly subscription with a USD {plan.price.toFixed(2)} base price. Stripe will show the billing amount and currency before payment.</span></label>
      {error && <p role="alert" className="text-sm text-red-700 flex gap-2"><AlertCircle className="w-5 h-5 shrink-0" />{error}</p>}
      <button disabled={!agreed || busy} className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1A1918] text-white py-3 disabled:opacity-50"><Lock className="w-4 h-4" />{busy ? 'Opening Stripe…' : 'Continue to secure checkout'}</button>
    </form>
  </div>;
};
