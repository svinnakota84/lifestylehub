import React from 'react';
import {
  Compass,
  UtensilsCrossed,
  Activity,
  Palette,
  CreditCard,
  Scale,
  LayoutDashboard,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { SubscriptionState } from '../types';

export type NavTab = 'trends' | 'dashboard' | 'diets' | 'cardio' | 'fashion' | 'plans' | 'legal';

interface NavigationProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  subscription: SubscriptionState | null;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  subscription,
}) => {
  const isOnline = useOnlineStatus();

  const navItems: { id: NavTab; label: string; num?: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'trends', label: 'Trends 2026', icon: Compass },
    { id: 'fashion', label: 'Fashion', num: '01', icon: Palette },
    { id: 'diets', label: 'Food', num: '02', icon: UtensilsCrossed },
    { id: 'cardio', label: 'Fitness', num: '03', icon: Activity },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'plans', label: 'Plans', icon: CreditCard },
    { id: 'legal', label: 'Legal Shield', icon: Scale },
  ];

  return (
    <>
      {/* Top Luxury Desktop & Tablet Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo - Exact Netlify brand favicon replica */}
          <div
            onClick={() => onSelectTab('trends')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1F1C18] text-[#EED989] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif text-xl font-bold">L</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-medium text-lg sm:text-xl text-[#1F1C18] tracking-tight">
                  Lifestyle Hub
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EED989] text-[#1F1C18] px-2 py-0.5 rounded-full">
                  2026
                </span>
              </div>
              <p className="text-[10px] text-stone-500 hidden sm:block">
                Fashion • Food • Fitness Trends
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F3EFEA] p-1.5 rounded-full border border-[#E8E2D8]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1F1C18] text-[#FAF7F2] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  {item.num && (
                    <span className={`text-[10px] font-mono opacity-60 ${isActive ? 'text-[#EED989]' : ''}`}>
                      {item.num}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools - Clean for Customers (No developer .zip button) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Connectivity Pill */}
            <div
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                isOnline
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-emerald-600" />
                  <span>Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-600" />
                  <span>Offline Ready</span>
                </>
              )}
            </div>

            {/* In-app PWA Install Button */}
            <PWAInstallButton compact />
          </div>
        </div>
      </header>

      {/* Fixed Bottom Navigation Bar for Mobile PWA (iOS / Android Native Feel) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-[#E8E2D8] pb-safe px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#1F1C18]' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-[#1F1C18] text-[#EED989]' : 'text-stone-500'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium mt-0.5 whitespace-nowrap">
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}

        {/* More / Plans Button for Mobile */}
        <button
          onClick={() => onSelectTab('plans')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            activeTab === 'plans' ? 'text-[#1F1C18]' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              activeTab === 'plans' ? 'bg-[#1F1C18] text-[#EED989]' : 'text-stone-500'
            }`}
          >
            <CreditCard className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium mt-0.5 whitespace-nowrap">
            Plans
          </span>
        </button>
      </nav>
    </>
  );
};
