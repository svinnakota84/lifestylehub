import React, {useEffect, useState} from 'react';
import {LIFESTYLE_ISSUES} from '../data/lifestyleTrendsData';
import type {SubscriptionState} from '../types';
import {askCoach} from '../services/stripeService';

export function DailyLiving({subscription, onOpenPlans}: {subscription: SubscriptionState | null; onOpenPlans: () => void}) {
  const [day, setDay] = useState(() => new Date().toISOString().slice(0,10));
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { const timer = window.setInterval(() => setDay(new Date().toISOString().slice(0,10)), 60000); return () => clearInterval(timer); }, []);
  const index = Math.floor(Date.parse(day) / 86400000);
  const selections = (['food','fashion','exercise'] as const).map((key, i) => ({key, item: LIFESTYLE_ISSUES[key].items[(index + i) % LIFESTYLE_ISSUES[key].items.length]}));
  async function submit(e: React.FormEvent) {
    e.preventDefault(); if (!subscription?.isActive || busy) return;
    setBusy(true); setAnswer('');
    try { setAnswer(await askCoach(question.trim())); } catch { setAnswer('Private AI coaching is not connected yet. No personalized plan has been generated.'); }
    finally { setBusy(false); }
  }
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
    <details className="rounded-3xl bg-[#1F1C18] text-[#FAF7F2] p-6" open>
      <summary className="cursor-pointer text-xl font-display">Your daily edit <span className="text-xs text-[#EED989]">{day} · UTC</span></summary>
      <p className="text-xs text-stone-300 mt-2">Automatically selected each day from our existing editorial library. These are curated ideas, not live news or newly researched daily reports.</p>
      <div className="grid md:grid-cols-3 gap-5 mt-5">{selections.map(({key,item}) => <article key={key} className="border border-white/20 rounded-2xl p-4"><p className="text-xs uppercase tracking-widest text-[#EED989]">{key === 'exercise' ? 'Lifestyle & movement' : key}</p><h3 className="text-xl mt-2">{item.title}</h3></article>)}</div>
    </details>
    <details className="border border-stone-200 bg-white rounded-3xl p-6 mt-4">
      <summary className="cursor-pointer font-semibold">Your wellness coach · activation pending</summary>
      <p className="text-sm text-stone-600 my-3">Private AI coaching requires a server-verified paid membership and a connected AI service. General food, movement and style guidance only; it does not replace a doctor or registered dietitian. Do not submit medical records or payment details.</p>
      {!subscription?.isActive ? <button onClick={onOpenPlans} className="underline text-sm">Explore membership plans</button> : <form onSubmit={submit} className="space-y-3"><label className="block text-sm">What would you like help with?<textarea required maxLength={2000} value={question} onChange={e=>setQuestion(e.target.value)} className="block border rounded-xl w-full p-3" placeholder="For example, ideas for a simple vegetarian lunch" /></label><button disabled={busy} className="rounded-full bg-stone-900 text-white py-3 px-5">{busy ? 'Checking coach…' : 'Ask your coach'}</button></form>}
      {answer && <p role="status" className="mt-3 whitespace-pre-wrap text-sm">{answer}</p>}
    </details>
  </section>;
}
