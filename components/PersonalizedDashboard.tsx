import React, { useState } from 'react';
import {
  TrendingDown,
  Droplets,
  Flame,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  Plus,
  Scale,
  Smile,
  ShieldCheck,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { UserProgressData, SubscriptionState } from '../types';

interface PersonalizedDashboardProps {
  progress: UserProgressData;
  subscription: SubscriptionState | null;
  onUpdateWeight: (newWeight: number) => void;
  onToggleWater: (glassIndex: number) => void;
  onUpdateConfidence: (score: number) => void;
  onOpenPlans: () => void;
  onOpenLegalShield: () => void;
}

export const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({
  progress,
  subscription,
  onUpdateWeight,
  onToggleWater,
  onUpdateConfidence,
  onOpenPlans,
  onOpenLegalShield,
}) => {
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [tempWeight, setTempWeight] = useState(progress.currentWeight.toString());

  // Calculations
  const totalWeightLossTarget = progress.startWeight - progress.targetWeight;
  const currentLost = progress.startWeight - progress.currentWeight;
  const progressPct =
    totalWeightLossTarget > 0
      ? Math.min(100, Math.max(0, Math.round((currentLost / totalWeightLossTarget) * 100)))
      : 0;

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(tempWeight);
    if (!isNaN(val) && val > 30 && val < 400) {
      onUpdateWeight(val);
      setShowWeightModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C19A6B]">
              Personalized Health Hub
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Offline Synced
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1918] mt-1 tracking-tight">
            Welcome back, {subscription?.customerName ? subscription.customerName.split(' ')[0] : 'Member'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
            "{progress.dailyAffirmation}"
          </p>
        </div>

        {/* Member Plan Pill */}
        <div className="flex items-center gap-2">
          <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1A1918] text-[#E6D59A] flex items-center justify-center font-bold text-xs">
              {subscription?.tier ? subscription.tier.charAt(0).toUpperCase() : 'F'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-luxury font-bold text-xs uppercase tracking-wider text-stone-900">
                  {subscription?.tier ? `${subscription.tier} Member` : 'Free Guest'}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <button
                onClick={onOpenPlans}
                className="text-[10px] text-[#C19A6B] hover:text-stone-900 font-semibold block"
              >
                {subscription?.isActive ? 'Manage Subscription' : 'Upgrade to Premium'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
        {/* Metric 1: Weight & Goal Progress */}
        <div className="p-5 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span className="font-bold uppercase tracking-wider text-stone-400">Current Weight</span>
              <Scale className="w-4 h-4 text-[#C19A6B]" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif-luxury font-bold text-stone-900">
                {progress.currentWeight}
              </span>
              <span className="text-xs text-stone-500">lbs</span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                {currentLost > 0 ? `-${currentLost.toFixed(1)} lbs` : 'On Track'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Goal: {progress.targetWeight} lbs ({progressPct}% achieved)</p>

            <div className="w-full bg-stone-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-[#1A1918] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setShowWeightModal(true)}
            className="mt-4 pt-3 border-t border-stone-100 text-xs font-semibold text-stone-900 hover:text-[#C19A6B] flex items-center justify-between cursor-pointer"
          >
            <span>Log Today's Weight</span>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Metric 2: Daily Cardio Minutes */}
        <div className="p-5 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span className="font-bold uppercase tracking-wider text-stone-400">Cardio Today</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif-luxury font-bold text-stone-900">
                {progress.cardioMinutesToday}
              </span>
              <span className="text-xs text-stone-500">mins</span>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full ml-auto">
                {progress.caloriesBurnedToday} kcal
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Daily LISS Goal: 25-30 minutes</p>

            <div className="w-full bg-stone-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (progress.cardioMinutesToday / 30) * 100)}%` }}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span>{progress.completedWorkoutIds.length} sessions logged</span>
            <span className="text-stone-800 font-semibold">Zone 2 Fat Burn</span>
          </div>
        </div>

        {/* Metric 3: Water Tracker */}
        <div className="p-5 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span className="font-bold uppercase tracking-wider text-stone-400">Hydration</span>
              <Droplets className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif-luxury font-bold text-stone-900">
                {progress.waterGlasses}
              </span>
              <span className="text-xs text-stone-500">/ 8 glasses</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Tap a glass to log hydration</p>

            {/* Interactive 8 glass droplets */}
            <div className="grid grid-cols-8 gap-1 mt-3">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
                const filled = idx < progress.waterGlasses;
                return (
                  <button
                    key={idx}
                    onClick={() => onToggleWater(idx)}
                    className={`h-7 rounded-md transition-all cursor-pointer flex items-center justify-center text-[10px] ${
                      filled
                        ? 'bg-cyan-500 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                    }`}
                    title={`Glass ${idx + 1}`}
                  >
                    <Droplets className="w-3 h-3" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span>{progress.waterGlasses >= 8 ? 'Goal Met!' : 'Hydration in progress'}</span>
            <span className="text-cyan-700 font-semibold">{progress.waterGlasses * 250} ml</span>
          </div>
        </div>

        {/* Metric 4: Streak & Mindset Score */}
        <div className="p-5 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span className="font-bold uppercase tracking-wider text-stone-400">Consistency Streak</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif-luxury font-bold text-stone-900">
                {progress.streakDays}
              </span>
              <span className="text-xs text-stone-500">days in a row</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Confidence Score: {progress.confidenceScore}/10
            </p>

            <div className="flex items-center gap-1.5 mt-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => onUpdateConfidence(num)}
                  className={`w-5 h-5 rounded-md text-[9px] font-bold transition flex items-center justify-center ${
                    progress.confidenceScore >= num
                      ? 'bg-purple-600 text-white'
                      : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                  }`}
                  title={`Rate confidence ${num}/10`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span>Mindset Affirmation</span>
            <span className="text-purple-700 font-semibold">Elevated</span>
          </div>
        </div>
      </div>

      {/* Membership & Security Health Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Membership Details */}
        <div className="p-6 rounded-3xl bg-[#1A1918] text-[#FAF7F2] md:col-span-2 flex flex-col justify-between shadow-xl border border-stone-800">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6D59A]">
                Subscription Status
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/30">
                Stripe Active
              </span>
            </div>

            <h3 className="text-2xl font-serif-luxury font-bold text-white mt-2">
              {subscription?.tier ? `${subscription.tier.toUpperCase()} PLAN` : 'ESSENTIALS PLAN'}
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Invoice #{subscription?.invoiceId || 'INV-LH-8942'} • Automatic monthly renewal • Cancel anytime with 1 tap.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-stone-800 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px]">Healthy Cooking</span>
                <strong className="text-white">200+ Recipes Unlocked</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Fat Burn Cardio</span>
                <strong className="text-white">Full LISS Suite Active</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Body & Colors</span>
                <strong className="text-white">5 Shapes & 4 Seasons</strong>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-stone-800">
            <span className="text-xs text-stone-400">Need to switch tiers or update payment method?</span>
            <button
              onClick={onOpenPlans}
              className="px-4 py-2 rounded-full bg-[#E6D59A] hover:bg-[#d8c583] text-[#1A1918] text-xs font-bold transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Change Plan Tier</span>
            </button>
          </div>
        </div>

        {/* Legal Shield Audit & Protection Status */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-stone-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="font-serif-luxury font-bold text-base">Legal Shield Audit</h4>
            </div>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Your account is protected with executed disclaimers:
            </p>

            <ul className="mt-4 space-y-2 text-xs text-stone-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Medical & Nutritional Non-Advice Acknowledged</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Cardio Physical Liability & PAR-Q Released</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Binding AAA Arbitration Clause Enforced</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenLegalShield}
            className="mt-6 w-full py-2.5 rounded-full border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs font-semibold transition"
          >
            View Signed Shield Certificate
          </button>
        </div>
      </div>

      {/* Log Weight Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#FAF7F2] p-6 shadow-2xl border border-[#E8E2D8] text-[#1A1918]">
            <h3 className="font-serif-luxury font-bold text-xl">Log Current Weight</h3>
            <p className="text-xs text-stone-500 mt-1">
              Track your gradual, steady fat loss progress.
            </p>

            <form onSubmit={handleSaveWeight} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={tempWeight}
                  onChange={(e) => setTempWeight(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 bg-white text-lg font-mono font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1A1918]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWeightModal(false)}
                  className="px-4 py-2 rounded-full text-xs text-stone-600 hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#1A1918] text-white text-xs font-bold hover:bg-black"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
