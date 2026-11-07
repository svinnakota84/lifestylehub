import React, { useState } from 'react';
import { login, signup, requestPasswordRecovery, updateUser, acceptInvite } from '@netlify/identity';
import { X } from 'lucide-react';
export type AuthMode = 'login' | 'signup' | 'forgot' | 'reset' | 'invite';
interface Props { initialMode: AuthMode; inviteToken?: string; onClose: () => void; onSuccess: () => Promise<void> }
export function AuthModal({ initialMode, inviteToken, onClose, onSuccess }: Props) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [name, setName] = useState('');
  const [error, setError] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  const title = { login: 'Welcome back', signup: 'Create your account', forgot: 'Reset your password', reset: 'Choose a new password', invite: 'Accept your invitation' }[mode];
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError(''); setMessage('');
    try {
      if (mode === 'forgot') { await requestPasswordRecovery(email); setMessage('If an account exists for this email, you’ll receive a recovery link.'); }
      else if (mode === 'signup') { const created = await signup(email, password, { full_name: name }); if (created.confirmedAt) { await onSuccess(); onClose(); return; } setPassword(''); setMessage('Account created. Check your email to confirm your address, then sign in.'); }
      else {
        if (mode === 'reset') await updateUser({ password });
        else if (mode === 'invite' && inviteToken) await acceptInvite(inviteToken, password);
        else await login(email, password);
        await onSuccess(); onClose();
      }
    } catch (err) {
      setError(err instanceof Error && err.name === 'MissingIdentityError' ? 'Sign-in is not enabled on this deployment yet. Please try again later.' : 'We could not complete this request. Check your details and email confirmation, then try again.');
    } finally { setBusy(false); }
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="auth-title"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-[#FAF7F2] p-6 space-y-4">
    <div className="flex justify-between items-center"><h2 id="auth-title" className="text-2xl font-bold">{title}</h2><button type="button" aria-label="Close sign-in" onClick={onClose}><X /></button></div>
    {mode === 'signup' && <label className="block text-sm">Full name<input required value={name} maxLength={100} autoComplete="name" onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>}
    {!['reset', 'invite'].includes(mode) && <label className="block text-sm">Email<input type="email" required value={email} autoComplete="email" onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>}
    {mode !== 'forgot' && <label className="block text-sm">Password<input type="password" required minLength={mode === 'login' ? 1 : 12} maxLength={128} value={password} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border p-3" />{mode !== 'login' && <span className="text-xs text-stone-500">Use at least 12 characters.</span>}</label>}
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}{message && <p role="status" className="text-sm text-emerald-700">{message}</p>}
    <button disabled={busy} className="w-full rounded-full bg-[#1A1918] text-white py-3 disabled:opacity-50">{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Send recovery link' : 'Save password'}</button>
    {!['reset', 'invite'].includes(mode) && <div className="flex justify-between text-sm"><button type="button" className="underline" onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); setMessage(''); }}>{mode === 'signup' ? 'Sign in instead' : 'Create an account'}</button><button type="button" className="underline" onClick={() => { setMode(mode === 'forgot' ? 'login' : 'forgot'); setError(''); setMessage(''); }}>{mode === 'forgot' ? 'Back to sign in' : 'Forgot password?'}</button></div>}
  </form></div>;
}
