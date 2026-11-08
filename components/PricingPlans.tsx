import React from 'react';
import { Check, ShieldCheck, Zap, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRICING_PLANS } from '../data/pricingPlans';
import { PlanDetails, SubscriptionState } from '../types';

interface PricingPlansProps {
  currentSubscription: SubscriptionState | null;
  onSelectPlan: (plan: PlanDetails) => void;
  onOpenLegalShield: () => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({
  currentSubscription,
  onSelectPlan,
  onOpenLegalShield,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Editorial Header - Exactly matching user's design */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C19A6B]">
            Transparent Subscriptions
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury font-normal text-[#1A1918] mt-1 tracking-tight">
            Choose your plan
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xs md:text-right leading-relaxed">
          Monthly prices in USD. Checkout activation is pending.
        </p>
      </div>

      {/* RESOLVED ALERT: Completely removes the broken red banner from the screenshot */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-[#FAF7F2] to-amber-50 border border-emerald-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-emerald-950">
                Checkout connection pending
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Not accepting payments
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Payments and private member access require a secure server connection. No subscription is activated by this form.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLegalShield}
            className="text-xs font-medium text-stone-700 hover:text-stone-900 underline underline-offset-2 flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
            <span>Legal Shield & Disclaimers</span>
          </button>
        </div>
      </div>

      {/* Current Subscription Active Banner if already subscribed */}
      {currentSubscription?.isActive && (
        <div className="mt-4 p-4 rounded-2xl bg-[#1A1918] text-[#F5EFEB] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#E6D59A]" />
            <div>
              <p className="font-semibold text-xs sm:text-sm">
                Active Member: <span className="capitalize font-bold text-[#E6D59A]">{currentSubscription.tier}</span> Tier
              </p>
              <p className="text-[11px] text-stone-400">
                Invoice #{currentSubscription.invoiceId} • Subscribed {currentSubscription.subscribedAt} • All Health, Cardio & Fashion Pages Unlocked
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 font-medium px-3 py-1 rounded-full border border-emerald-400/30">
            Active Subscriber
          </span>
        </div>
      )}

      {/* Pricing Cards Grid - Faithful recreation of the 3 cards from screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isCurrentTier = currentSubscription?.isActive && currentSubscription.tier === plan.id;

          if (plan.popular) {
            // "Plus" Dark Card with Gold Badge (Center Hero Card)
            return (
              <div
                key={plan.id}
                className="relative rounded-3xl bg-[#1A1918] text-[#FAF7F2] p-7 sm:p-8 flex flex-col justify-between shadow-2xl border border-stone-800 transition-all duration-300 md:-translate-y-2"
              >
                {/* Most Popular Badge */}
                <div className="absolute -top-3 left-6">
                  <span className="bg-[#F2DF99] text-[#1A1918] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline justify-between pt-1">
                    <h3 className="text-2xl font-serif-luxury font-bold text-[#FAF7F2]">
                      {plan.name}
                    </h3>
                    <span className="text-xs text-[#E6D59A] font-medium flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> Full Suite
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 min-h-[32px]">{plan.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
                      ${plan.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-stone-400">{plan.period}</span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-stone-200">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#F2DF99] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Button */}
                <div className="mt-8 pt-4 border-t border-stone-800">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className="w-full py-3.5 px-4 rounded-full bg-[#F2DF99] hover:bg-[#ebd480] text-[#1A1918] font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{isCurrentTier ? 'Current Active Plan' : plan.buttonText}</span>
                  </button>
                  <p className="text-center text-[10px] text-stone-400 mt-2">
                    USD monthly pricing • Activation pending
                  </p>
                </div>
              </div>
            );
          }

          // Essentials and Coach (Light Editorial Cards)
          return (
            <div
              key={plan.id}
              className="rounded-3xl bg-white text-[#1A1918] p-7 sm:p-8 flex flex-col justify-between shadow-lg border border-[#E8E2D8] hover:shadow-xl transition-all duration-300"
            >
              <div>
                <h3 className="text-2xl font-serif-luxury font-bold text-stone-900">
                  {plan.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 min-h-[32px]">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-serif-luxury font-bold text-stone-900 tracking-tight">
                    ${plan.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-500">{plan.period}</span>
                </div>

                {/* Feature Checklist */}
                <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-stone-700">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-stone-700 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card CTA Button */}
              <div className="mt-8 pt-4 border-t border-stone-100">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className="w-full py-3.5 px-4 rounded-full bg-[#1A1918] hover:bg-black text-[#F5EFEB] font-semibold text-xs sm:text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E6D59A]" />
                  <span>{isCurrentTier ? 'Current Active Plan' : plan.buttonText}</span>
                </button>
                <p className="text-center text-[10px] text-stone-500 mt-2">
                  USD monthly pricing • Activation pending
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Footer */}
      <div className="mt-12 p-6 rounded-3xl bg-white border border-[#E8E2D8] flex flex-wrap items-center justify-between gap-6 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8]">
            <Lock className="w-5 h-5 text-stone-800" />
          </div>
          <div>
            <h4 className="font-semibold text-stone-900">Clear billing terms</h4>
            <p className="text-stone-500">
              Prices are in USD. Paid subscriptions are not enabled until secure checkout is connected.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenLegalShield}
            className="font-medium text-stone-900 underline underline-offset-2 hover:text-[#C19A6B]"
          >
            Review Terms & Medical Waiver
          </button>
        </div>
      </div>
    </section>
  );
};
