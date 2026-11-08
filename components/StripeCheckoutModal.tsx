import React, { useEffect, useState } from 'react';
import { X, Lock } from 'lucide-react';
import type { PlanDetails, SubscriptionState } from '../types';
import { beginCheckout } from '../services/stripeService';

interface Props {
  plan: PlanDetails | null; isOpen: boolean; onClose: () => void;
  onSuccess: (sub: SubscriptionState) => void; onOpenLegalShield: () => void;
}
export const StripeCheckoutModal: React.FC<Props> = ({plan, isOpen, onClose, onOpenLegalShield}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { if (isOpen) { setName(''); setEmail(''); setAccepted(false); setError(''); } }, [isOpen, plan?.id]);
  if (!isOpen || !plan) return null;
  async function submit(e: React.FormEvent) {
    e.preventDefault(); if (!plan || !accepted || busy) return;
    setBusy(true); setError('');
    try { await beginCheckout({plan: plan.id, name: name.trim(), email: email.trim(), termsAccepted: accepted}); }
    catch (e) { setError(e instanceof Error ? e.message : 'Checkout is unavailable. No payment has been taken.'); }
    finally { setBusy(false); }
  }
  return <div className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center overflow-y-auto">
    <section role="dialog" aria-modal="true" aria-labelledby="checkout-heading" className="bg-[#FAF7F2] rounded-3xl p-7 w-full max-w-lg shadow-xl">
      <button aria-label="Close checkout" onClick={onClose} className="float-right p-2"><X /></button>
      <p className="text-xs uppercase tracking-widest text-stone-500">YOUR OWN FRESH START</p>
      <h2 id="checkout-heading" className="text-3xl mt-3">{plan.name}</h2>
      <p className="mt-2">${plan.price.toFixed(2)} USD / month</p>
      <p className="my-4 text-sm text-stone-600">Secure checkout activation is pending. This form does not collect card details or activate a subscription.</p>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm">Your full name<input required autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="block w-full border rounded-xl p-3 mt-1 bg-white" /></label>
        <label className="block text-sm">Your email<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="block w-full border rounded-xl p-3 mt-1 bg-white" /></label>
        <p className="text-xs text-stone-600">When enabled, Stripe will charge USD. Your card issuer may convert to your card currency and apply fees. Acceptance depends on your issuer and supported payment methods.</p>
        <button type="button" onClick={onOpenLegalShield} className="underline text-sm">Read terms, privacy & wellness disclaimer</button>
        <label className="flex gap-3 text-sm"><input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} required />I have reviewed the terms and understand the monthly recurring USD price. Consent is not preselected.</label>
        {error && <p role="alert" className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm">{error}</p>}
        <button disabled={busy} type="submit" className="w-full bg-stone-900 text-white rounded-full p-4 flex justify-center gap-2 disabled:opacity-50"><Lock size={18}/>{busy ? 'Checking connection…' : 'Check secure checkout availability'}</button>
      </form>
    </section>
  </div>;
};
