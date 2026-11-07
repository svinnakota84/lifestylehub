import React, { useEffect, useState } from 'react';
import { api } from '../services/stripeService';
interface Props<T> { kind: string; children: (data: T) => React.ReactNode; onOpenPlans: () => void }
export function MemberContent<T>({ kind, children, onOpenPlans }: Props<T>) {
  const [data, setData] = useState<T | null>(null); const [error, setError] = useState(''); const [retry, setRetry] = useState(0);
  useEffect(() => {
    let canceled = false;
    setData(null); setError('');
    api<T>(`content?kind=${encodeURIComponent(kind)}`).then(value => { if (!canceled) setData(value); }).catch(err => { if (!canceled) setError(err.message); });
    return () => { canceled = true; };
  }, [kind, retry]);
  if (error) return <div className="max-w-xl mx-auto p-8 space-y-4 text-center"><p role="alert">{error}</p><button className="underline mr-4" onClick={() => setRetry(v => v + 1)}>Try again</button><button className="underline" onClick={onOpenPlans}>View membership plans</button></div>;
  if (!data) return <p role="status" className="text-center p-12">Verifying membership…</p>;
  return <>{children(data)}</>;
}
