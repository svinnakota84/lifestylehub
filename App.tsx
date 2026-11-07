import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
  Sliders,
  BookOpen,
} from 'lucide-react';
import { Navigation, NavTab } from './components/Navigation';
import { TrendsHomeSection } from './components/TrendsHomeSection';
import { EditorialIssueView } from './components/EditorialIssueView';
import { PricingPlans } from './components/PricingPlans';
import { DietPlansPage } from './components/DietPlansPage';
import { CardioWorkoutsPage } from './components/CardioWorkoutsPage';
import { FashionConfidencePage } from './components/FashionConfidencePage';
import { PersonalizedDashboard } from './components/PersonalizedDashboard';
import { StripeCheckoutModal } from './components/StripeCheckoutModal';
import { LegalShieldModal } from './components/LegalShieldModal';
import { OfflineIndicator } from './components/OfflineIndicator';

import { PlanDetails, SubscriptionState, UserProgressData, LegalConsentRecord } from './types';
import { PRICING_PLANS } from './data/pricingPlans';
import { LIFESTYLE_ISSUES } from './data/lifestyleTrendsData';
import { api, getAccount, openBillingPortal, ApiError, type AccountUser } from './services/stripeService';
import { getUser, logout, handleAuthCallback } from '@netlify/identity';
import { AuthModal, type AuthMode } from './components/AuthModal';
import { MemberContent } from './components/MemberContent';
import type { Recipe, CardioRoutine, BodyShapeStyling, ColorSeasonPalette } from './types';

const DEFAULT_PROGRESS: UserProgressData = {
  currentWeight: 154.2,
  targetWeight: 140.0,
  startWeight: 162.0,
  weightHistory: [
    { date: 'Oct 12', weight: 162.0 },
    { date: 'Oct 19', weight: 159.5 },
    { date: 'Oct 26', weight: 156.8 },
    { date: 'Nov 02', weight: 154.2 },
  ],
  waterGlasses: 5,
  waterDate: new Date().toDateString(),
  cardioMinutesToday: 25,
  caloriesBurnedToday: 185,
  completedWorkoutIds: ['zone2-fat-burn-walk'],
  completedRecipeIds: ['lemon-herb-crispy-salmon'],
  streakDays: 6,
  confidenceScore: 9,
  dailyAffirmation: 'Consistency in simple habits builds unshakeable energy and confidence.',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('trends');
  const [fashionSubView, setFashionSubView] = useState<'trends' | 'studio'>('trends');
  const [exerciseSubView, setExerciseSubView] = useState<'trends' | 'workout'>('trends');
  const [foodSubView, setFoodSubView] = useState<'trends' | 'recipes'>('trends');

  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanDetails | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [user, setUser] = useState<AccountUser | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [inviteToken, setInviteToken] = useState<string>();
  const [accountError, setAccountError] = useState('');
  const [checkingAccount, setCheckingAccount] = useState(true);
  const [progress, setProgress] = useState<UserProgressData>(DEFAULT_PROGRESS);
  const [consentRecord] = useState<LegalConsentRecord | null>(null);
  const mounted = useRef(true);
  const accountRequest = useRef(0);
  const refreshAccount = useCallback(async () => {
    const version = ++accountRequest.current;
    try {
      const identity = await getUser();
      if (!mounted.current || version !== accountRequest.current) return;
      if (!identity) { setUser(null); setSubscription(null); return; }
      const account = await getAccount();
      if (!mounted.current || version !== accountRequest.current) return;
      setUser(account.user); setSubscription(account.subscription); setAccountError('');
    } catch (err) {
      if (!mounted.current || version !== accountRequest.current) return;
      setSubscription(null);
      if (err instanceof ApiError && err.status === 401) setUser(null);
      setAccountError(err instanceof Error ? err.message : 'Account verification failed.');
    } finally { if (mounted.current && version === accountRequest.current) setCheckingAccount(false); }
  }, []);
  useEffect(() => {
    mounted.current = true;
    // Legacy demo records never grant access and are removed on migration.
    try { ['lifestylehub_subscription_state_v1', 'lifestylehub_stripe_settings_v1', 'lifestylehub_legal_consent', 'lifestylehub_progress_v1'].forEach(key => localStorage.removeItem(key)); } catch { /* Browser storage may be disabled. */ }
    (async () => {
      try {
        const result = await handleAuthCallback();
        if (result?.type === 'recovery') setAuthMode('reset');
        if (result?.type === 'invite' && result.token) { setInviteToken(result.token); setAuthMode('invite'); }
        await refreshAccount();
        const params = new URLSearchParams(window.location.search);
        if (params.get('checkout') === 'success' && params.get('session_id')) {
          const outcome = await api<{ pending?: boolean; subscription: SubscriptionState | null }>('checkout-status', { sessionId: params.get('session_id') });
          if (outcome.pending) setAccountError('Payment is still being confirmed. Use Refresh account shortly.');
          else { setSubscription(outcome.subscription); setActiveTab('dashboard'); }
        } else if (params.get('checkout') === 'canceled') { setActiveTab('plans'); setAccountError('Checkout canceled. No membership was activated.'); }
        if (params.has('checkout') || params.has('billing')) window.history.replaceState({}, '', window.location.pathname);
      } catch (err) { setAccountError(err instanceof Error ? err.message : 'Account verification failed.'); setCheckingAccount(false); }
    })();
    const check = () => { void refreshAccount(); };
    const timer = window.setInterval(check, 60000);
    window.addEventListener('focus', check);
    window.addEventListener('offline', check);
    return () => { mounted.current = false; window.clearInterval(timer); window.removeEventListener('focus', check); window.removeEventListener('offline', check); };
  }, [refreshAccount]);
  useEffect(() => {
    setProgress(DEFAULT_PROGRESS);
    if (!user) return;
    try {
      const saved = localStorage.getItem(`lifestylehub_progress_${user.id}`);
      if (saved) setProgress(JSON.parse(saved));
    } catch { /* Invalid progress never affects account or billing state. */ }
  }, [user?.id]);
  const updateProgress = (updater: (previous: UserProgressData) => UserProgressData) => {
    setProgress(previous => {
      const next = updater(previous);
      if (user) { try { localStorage.setItem(`lifestylehub_progress_${user.id}`, JSON.stringify(next)); } catch { /* Storage may be disabled. */ } }
      return next;
    });
  };
  const handleSelectPlan = (plan: PlanDetails) => {
    if (!user) { setAuthMode('signup'); return; }
    if (subscription?.isActive) { void manageBilling(); return; }
    setSelectedPlanForCheckout(plan);
  };
  async function manageBilling() {
    setAccountError('');
    try { await openBillingPortal(); } catch (err) { setAccountError(err instanceof Error ? err.message : 'Billing could not be opened.'); }
  }
  async function signOut() {
    ++accountRequest.current;
    setSubscription(null); setUser(null); setSelectedPlanForCheckout(null); setActiveTab('trends'); setProgress(DEFAULT_PROGRESS);
    try { await logout(); } catch { setAccountError('Sign-out could not reach the server. Close this browser on shared devices.'); }
  }
  const handleUpdateWeight = (newWeight: number) => {
    const todayLabel = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    updateProgress((prev) => ({
      ...prev,
      currentWeight: newWeight,
      weightHistory: [...prev.weightHistory, { date: todayLabel, weight: newWeight }],
    }));
  };

  const handleToggleWater = (glassIndex: number) => {
    updateProgress((prev) => {
      const current = prev.waterGlasses;
      const next = glassIndex < current ? glassIndex : glassIndex + 1;
      return { ...prev, waterGlasses: next };
    });
  };

  const handleUpdateConfidence = (score: number) => {
    updateProgress((prev) => ({ ...prev, confidenceScore: score }));
  };

  const handleLogWorkout = (routineId: string, minutes: number, calories: number) => {
    updateProgress((prev) => ({
      ...prev,
      cardioMinutesToday: prev.cardioMinutesToday + minutes,
      caloriesBurnedToday: prev.caloriesBurnedToday + calories,
      completedWorkoutIds: prev.completedWorkoutIds.includes(routineId)
        ? prev.completedWorkoutIds
        : [...prev.completedWorkoutIds, routineId],
    }));
    setActiveTab('dashboard');
  };

  const handleLogMeal = (recipeId: string) => {
    updateProgress((prev) => ({
      ...prev,
      completedRecipeIds: prev.completedRecipeIds.includes(recipeId)
        ? prev.completedRecipeIds
        : [...prev.completedRecipeIds, recipeId],
      streakDays: prev.streakDays + 1,
    }));
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1C18] flex flex-col justify-between selection:bg-[#EED989] selection:text-[#1F1C18]">
      {/* Top Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        subscription={subscription}
      />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-3 flex flex-wrap items-center justify-end gap-4 text-sm border-b border-stone-200">
        {checkingAccount ? <span role="status">Checking account…</span> : user ? <><span>{user.email}</span><button className="underline" onClick={() => void refreshAccount()}>Refresh account</button>{subscription && <button className="underline" onClick={() => void manageBilling()}>Manage billing</button>}<button className="underline" onClick={() => void signOut()}>Sign out</button></> : <button className="underline font-semibold" onClick={() => setAuthMode('login')}>Sign in / Create account</button>}
      </div>
      {accountError && <div role="alert" className="max-w-7xl mx-auto px-6 py-3 text-sm text-amber-900">{accountError}</div>}
      {/* Main App Content Viewport */}
      <main className="flex-1 pb-24 lg:pb-12">
        {/* TAB 0: TRENDS 2026 HOME */}
        {activeTab === 'trends' && (
          <TrendsHomeSection
            onNavigate={setActiveTab}
            onOpenPlans={() => setActiveTab('plans')}
          />
        )}

        {/* TAB 1: FASHION (ISSUE 01) */}
        {activeTab === 'fashion' && (
          <div>
            {/* View Sub-Toggle */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
              <div className="inline-flex p-1 bg-[#F3EFEA] rounded-full border border-[#E8E2D8]">
                <button
                  onClick={() => setFashionSubView('trends')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    fashionSubView === 'trends'
                      ? 'bg-[#1F1C18] text-[#FAF7F2] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Fashion Trends & Looks</span>
                </button>
                <button
                  onClick={() => setFashionSubView('studio')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    fashionSubView === 'studio'
                      ? 'bg-[#1F1C18] text-[#FAF7F2] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-[#EED989]" />
                  <span>Body Silhouettes & Colors</span>
                </button>
              </div>
            </div>

            {fashionSubView === 'trends' ? (
              <EditorialIssueView
                issue={LIFESTYLE_ISSUES.fashion}
                onOpenActionSuite={() => setFashionSubView('studio')}
                actionSuiteTitle="Body Shapes & Color Combinations"
                actionSuiteSubtitle="Match tailored cuts and 4 seasonal color palettes to your exact body silhouette to boost everyday confidence."
              />
            ) : (
              <MemberContent<{ styling: BodyShapeStyling[]; palettes: ColorSeasonPalette[] }> key={`${user?.id}-${subscription?.tier}-styling`} kind="styling" onOpenPlans={() => setActiveTab('plans')}>{data => <FashionConfidencePage styling={data.styling} palettes={data.palettes} />}</MemberContent>
            )}
          </div>
        )}

        {/* TAB 2: FOOD (ISSUE 02) */}
        {activeTab === 'diets' && (
          <div>
            {/* View Sub-Toggle */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
              <div className="inline-flex p-1 bg-[#F3EFEA] rounded-full border border-[#E8E2D8]">
                <button
                  onClick={() => setFoodSubView('trends')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    foodSubView === 'trends'
                      ? 'bg-[#1F1C18] text-[#FAF7F2] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Food Trends 2026</span>
                </button>
                <button
                  onClick={() => setFoodSubView('recipes')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    foodSubView === 'recipes'
                      ? 'bg-[#1F1C18] text-[#FAF7F2] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#EED989]" />
                  <span>Healthy Cooking Recipes & Timer</span>
                </button>
              </div>
            </div>

            {foodSubView === 'trends' ? (
              <EditorialIssueView
                issue={LIFESTYLE_ISSUES.food}
                onOpenActionSuite={() => setFoodSubView('recipes')}
                actionSuiteTitle="Simple & Healthy Cooking Kitchen"
                actionSuiteSubtitle="Step-by-step recipes, precision cooking timers, prebiotic fiber-maxxing tracks, and interactive grocery checklists."
              />
            ) : (
              <MemberContent<{ recipes: Recipe[] }> key={`${user?.id}-${subscription?.tier}-recipes`} kind="recipes" onOpenPlans={() => setActiveTab('plans')}>{data => <DietPlansPage recipes={data.recipes} onLogMeal={handleLogMeal} completedRecipeIds={progress.completedRecipeIds} />}</MemberContent>
            )}
          </div>
        )}

        {/* TAB 3: FITNESS & EXERCISE (ISSUE 03) */}
        {activeTab === 'cardio' && (
          <div>
            {/* View Sub-Toggle */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
              <div className="inline-flex p-1 bg-[#F3EFEA] rounded-full border border-[#E8E2D8]">
                <button
                  onClick={() => setExerciseSubView('trends')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    exerciseSubView === 'trends'
                      ? 'bg-[#1F1C18] text-[#FAF7F2] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Fitness Trends 2026</span>
                </button>
                <button
                  onClick={() => setExerciseSubView('workout')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    exerciseSubView === 'workout'
                      ? 'bg-[#1F1C18] text-[#FAF7F2] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-[#EED989]" />
                  <span>Simple Cardio Fat-Burn Timers</span>
                </button>
              </div>
            </div>

            {exerciseSubView === 'trends' ? (
              <EditorialIssueView
                issue={LIFESTYLE_ISSUES.exercise}
                onOpenActionSuite={() => setExerciseSubView('workout')}
                actionSuiteTitle="Simple Cardio Weight Loss Protocols"
                actionSuiteSubtitle="Zone 2 fat oxidation walks, living-room zero-jump circuits, interval countdown timers, and age-based BPM calculators."
              />
            ) : (
              <MemberContent<{ routines: CardioRoutine[] }> key={`${user?.id}-${subscription?.tier}-workouts`} kind="workouts" onOpenPlans={() => setActiveTab('plans')}>{data => <CardioWorkoutsPage routines={data.routines} onLogWorkout={handleLogWorkout} completedWorkoutIds={progress.completedWorkoutIds} />}</MemberContent>
            )}
          </div>
        )}

        {/* TAB 4: PERSONAL DASHBOARD */}
        {activeTab === 'dashboard' && (user ?
          <PersonalizedDashboard
            progress={progress}
            subscription={subscription}
            onUpdateWeight={handleUpdateWeight}
            onToggleWater={handleToggleWater}
            onUpdateConfidence={handleUpdateConfidence}
            onOpenPlans={() => subscription?.isActive ? void manageBilling() : setActiveTab('plans')}
            onOpenLegalShield={() => setIsLegalModalOpen(true)}
          /> : <div className="p-12 text-center"><p className="mb-4">Sign in to open your personal dashboard.</p><button className="underline" onClick={() => setAuthMode('login')}>Sign in</button></div>
        )}

        {/* TAB 5: PLANS & PRICING */}
        {activeTab === 'plans' && (
          <PricingPlans
            currentSubscription={subscription}
            onSelectPlan={handleSelectPlan}
            onOpenLegalShield={() => setIsLegalModalOpen(true)}
          />
        )}

        {/* TAB 6: LEGAL SHIELD */}
        {activeTab === 'legal' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <div className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <div>
                  <h2 className="text-2xl font-display font-light text-stone-900">
                    Legal Shield & Corporate Protection
                  </h2>
                  <p className="text-xs text-stone-500">
                    Comprehensive enforceable waivers, medical disclaimers, and mandatory AAA arbitration.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">1. Non-Medical Education Only</h4>
                  <p>LifestyleHub content does not constitute medical advice or clinical dietetics. Users must consult a licensed physician prior to caloric deficits or physical exercise.</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">2. Cardiovascular Risk Assumption</h4>
                  <p>In accordance with PAR-Q standards, users voluntarily assume all inherent risks of physical cardio and release the company from all personal injury claims.</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">3. Mandatory Individual Arbitration</h4>
                  <p>All claims must be resolved individually through binding AAA arbitration. All class actions and jury trials are waived.</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">4. Maximum Liability Cap</h4>
                  <p>Total company liability is capped strictly at total fees paid during the prior 3 months or $50.00 USD.</p>
                </div>
              </div>

              <button
                onClick={() => setIsLegalModalOpen(true)}
                className="px-6 py-3 rounded-full bg-[#1F1C18] text-[#FAF7F2] text-xs font-semibold hover:bg-black transition cursor-pointer"
              >
                Inspect Full Legal Shield & Signed Certificate
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-[#E8E2D8] bg-[#FAF7F2] py-8 px-4 sm:px-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-medium text-stone-900 text-sm">Lifestyle Hub</span>
            <span>•</span>
            <span>Fashion, Food & Fitness Trends 2026</span>
            <span>•</span>
            <span className="text-stone-500">Membership verified online</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('trends')}
              className="hover:text-stone-900 transition"
            >
              Trends 2026
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className="hover:text-stone-900 transition"
            >
              Pricing Plans
            </button>
            <button
              onClick={() => setIsLegalModalOpen(true)}
              className="hover:text-stone-900 underline underline-offset-2 transition"
            >
              Medical Disclaimer & Terms
            </button>

          </div>
        </div>
      </footer>

      {/* Global Modals & Indicators */}
      {authMode && <AuthModal key={authMode} initialMode={authMode} inviteToken={inviteToken} onClose={() => setAuthMode(null)} onSuccess={refreshAccount} />}
      <StripeCheckoutModal key={selectedPlanForCheckout?.id || 'closed'}
        plan={selectedPlanForCheckout}
        isOpen={!!selectedPlanForCheckout}
        onClose={() => setSelectedPlanForCheckout(null)}
        onOpenLegalShield={() => setIsLegalModalOpen(true)}
      />

      <LegalShieldModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        consentRecord={consentRecord}
      />

      <OfflineIndicator />
    </div>
  );
}
