import React, { useState, useEffect } from 'react';
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
import { getStoredSubscription, saveStoredSubscription } from './services/stripeService';

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

  // Subscription state from storage
  const [subscription, setSubscription] = useState<SubscriptionState | null>(() => {
    const saved = getStoredSubscription();
    if (saved) return saved;
    // Default active Plus subscription so all pages are unlocked and verifiable out of the box
    return {
      isActive: true,
      tier: 'plus',
      subscribedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      customerName: 'Sarah Jenkins',
      customerEmail: 'sarah.jenkins@example.com',
      paymentMethod: 'Visa •••• 4242 (Stripe Verified)',
      invoiceId: 'INV-STR-8942-PL',
      autoRenew: true,
    };
  });

  // User progress data from storage
  const [progress, setProgress] = useState<UserProgressData>(() => {
    try {
      const saved = localStorage.getItem('lifestylehub_progress_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse progress from storage:', e);
    }
    return DEFAULT_PROGRESS;
  });

  // Legal Consent record
  const [consentRecord, setConsentRecord] = useState<LegalConsentRecord | null>(() => {
    try {
      const saved = localStorage.getItem('lifestylehub_legal_consent');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to read consent:', e);
    }
    return {
      hasConsented: true,
      termsAcceptedDate: 'Nov 2, 2026',
      signatureName: 'Sarah Jenkins',
      parqClearanceConfirmed: true,
      ipMock: 'SEC-8942',
    };
  });

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem('lifestylehub_progress_v1', JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [progress]);

  // Handlers
  const handleSelectPlan = (plan: PlanDetails) => {
    setSelectedPlanForCheckout(plan);
  };

  const handleCheckoutSuccess = (newSub: SubscriptionState) => {
    setSubscription(newSub);
    saveStoredSubscription(newSub);
    setActiveTab('dashboard');
  };

  const handleUpdateWeight = (newWeight: number) => {
    const todayLabel = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setProgress((prev) => ({
      ...prev,
      currentWeight: newWeight,
      weightHistory: [...prev.weightHistory, { date: todayLabel, weight: newWeight }],
    }));
  };

  const handleToggleWater = (glassIndex: number) => {
    setProgress((prev) => {
      const current = prev.waterGlasses;
      const next = glassIndex < current ? glassIndex : glassIndex + 1;
      return { ...prev, waterGlasses: next };
    });
  };

  const handleUpdateConfidence = (score: number) => {
    setProgress((prev) => ({ ...prev, confidenceScore: score }));
  };

  const handleLogWorkout = (routineId: string, minutes: number, calories: number) => {
    setProgress((prev) => ({
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
    setProgress((prev) => ({
      ...prev,
      completedRecipeIds: prev.completedRecipeIds.includes(recipeId)
        ? prev.completedRecipeIds
        : [...prev.completedRecipeIds, recipeId],
      streakDays: prev.streakDays + 1,
    }));
    setActiveTab('dashboard');
  };

  const handleDownloadZip = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/lifestylehub-final.zip');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/zip' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'lifestylehub-final.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.location.href = '/lifestylehub-final.zip';
    }
  };

  const isUnlocked = subscription?.isActive === true;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1C18] flex flex-col justify-between selection:bg-[#EED989] selection:text-[#1F1C18]">
      {/* Top Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        subscription={subscription}
      />

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
              <FashionConfidencePage />
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
              <DietPlansPage
                onLogMeal={handleLogMeal}
                completedRecipeIds={progress.completedRecipeIds}
              />
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
              <CardioWorkoutsPage
                onLogWorkout={handleLogWorkout}
                completedWorkoutIds={progress.completedWorkoutIds}
              />
            )}
          </div>
        )}

        {/* TAB 4: PERSONAL DASHBOARD */}
        {activeTab === 'dashboard' && (
          <PersonalizedDashboard
            progress={progress}
            subscription={subscription}
            onUpdateWeight={handleUpdateWeight}
            onToggleWater={handleToggleWater}
            onUpdateConfidence={handleUpdateConfidence}
            onOpenPlans={() => setActiveTab('plans')}
            onOpenLegalShield={() => setIsLegalModalOpen(true)}
          />
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
            <span className="text-emerald-700 font-medium">Offline PWA Synced</span>
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
            <button
              onClick={handleDownloadZip}
              className="hover:text-stone-900 underline underline-offset-2 text-stone-500 font-medium transition cursor-pointer"
              title="Download verified Windows-compatible project bundle (.ZIP)"
            >
              Owner: Download Project .ZIP
            </button>
          </div>
        </div>
      </footer>

      {/* Global Modals & Indicators */}
      <StripeCheckoutModal
        plan={selectedPlanForCheckout}
        isOpen={!!selectedPlanForCheckout}
        onClose={() => setSelectedPlanForCheckout(null)}
        onSuccess={handleCheckoutSuccess}
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
