import React from 'react';
import { WifiOff, Database } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      aria-label="Offline status notice"
      className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center justify-between sm:justify-start gap-3 rounded-2xl bg-[#1A1918] text-[#F5EFEB] px-4 py-3 text-xs shadow-2xl border border-[#E6D59A]/30 backdrop-blur-md animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <WifiOff className="w-4 h-4 text-amber-400" />
        <div>
          <p className="font-semibold text-white">Offline Mode Active</p>
          <p className="text-[11px] text-stone-300">Meal plans, cardio routines & styling guides are 100% cached offline.</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#E6D59A] bg-white/10 px-2 py-1 rounded-md">
        <Database className="w-3 h-3" />
        <span>Service Worker Synced</span>
      </div>
    </aside>
  );
};
