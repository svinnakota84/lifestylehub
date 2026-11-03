import React, { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Compass, ChevronRight, Check } from 'lucide-react';
import { LIFESTYLE_ISSUES, TrendItem } from '../data/lifestyleTrendsData';
import { NavTab } from './Navigation';

interface TrendsHomeSectionProps {
  onNavigate: (tab: NavTab) => void;
  onOpenPlans: () => void;
}

export const TrendsHomeSection: React.FC<TrendsHomeSectionProps> = ({
  onNavigate,
  onOpenPlans,
}) => {
  const [momentumFilter, setMomentumFilter] = useState<'All' | 'Rising' | 'Peaking' | 'Staying'>('All');

  const allTrends: { item: TrendItem; issueLabel: string; issueSlug: 'fashion' | 'food' | 'exercise' }[] = [
    ...LIFESTYLE_ISSUES.fashion.items.map((i) => ({ item: i, issueLabel: 'Fashion 01', issueSlug: 'fashion' as const })),
    ...LIFESTYLE_ISSUES.food.items.map((i) => ({ item: i, issueLabel: 'Food 02', issueSlug: 'food' as const })),
    ...LIFESTYLE_ISSUES.exercise.items.map((i) => ({ item: i, issueLabel: 'Fitness 03', issueSlug: 'exercise' as const })),
  ];

  const filteredTrends =
    momentumFilter === 'All'
      ? allTrends
      : allTrends.filter((t) => t.item.momentum === momentumFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Editorial Hero matching lifestylehub.netlify.app */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1C18] text-[#EED989] text-[11px] font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Trends 2026 Season</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-light text-[#1F1C18] tracking-tight leading-[1.1]">
          Fifteen trends worth knowing this season.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
          Sorted by whether they're rising, peaking, or here to stay — and translated into actionable meal plans, simple cardio fat-burn routines, and body-flattering color palettes.
        </p>

        {/* Hero Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('diets')}
            className="px-6 py-3.5 rounded-full bg-[#1F1C18] text-[#FAF7F2] text-xs sm:text-sm font-semibold hover:bg-black transition shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Start your diet plan here</span>
            <ArrowRight className="w-4 h-4 text-[#EED989]" />
          </button>

          <button
            onClick={() => onNavigate('fashion')}
            className="px-6 py-3.5 rounded-full border border-stone-300 bg-white hover:border-[#1F1C18] text-stone-800 text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            Start with fashion
          </button>

          <button
            onClick={() => onNavigate('cardio')}
            className="px-6 py-3.5 rounded-full border border-stone-300 bg-white hover:border-[#1F1C18] text-stone-800 text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            Browse fitness
          </button>
        </div>
      </div>

      {/* The 3 Editorial Issues Grid (Fashion 01, Food 02, Fitness 03) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16">
        {/* Issue 01: Fashion */}
        <div
          onClick={() => onNavigate('fashion')}
          className="group rounded-3xl bg-white border border-[#E8E2D8] p-7 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#C05A3E] tracking-widest uppercase">
                Issue 01 • Fashion
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#C05A3E]" />
            </div>

            <h3 className="text-2xl font-display font-medium text-stone-900 mt-3 group-hover:text-[#C05A3E] transition-colors">
              {LIFESTYLE_ISSUES.fashion.headline}
            </h3>

            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              {LIFESTYLE_ISSUES.fashion.intro}
            </p>

            <div className="mt-6 space-y-2 border-t border-stone-100 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Top Trends
              </span>
              {LIFESTYLE_ISSUES.fashion.items.slice(0, 3).map((item) => (
                <div key={item.id} className="text-xs text-stone-700 flex items-center justify-between">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-[10px] text-stone-400 font-mono">{item.momentum}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-[#C05A3E]">
            <span>Explore 5 Body Types & Palettes</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Issue 02: Food */}
        <div
          onClick={() => onNavigate('diets')}
          className="group rounded-3xl bg-white border border-[#E8E2D8] p-7 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#8B5E3C] tracking-widest uppercase">
                Issue 02 • Food
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5E3C]" />
            </div>

            <h3 className="text-2xl font-display font-medium text-stone-900 mt-3 group-hover:text-[#8B5E3C] transition-colors">
              {LIFESTYLE_ISSUES.food.headline}
            </h3>

            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              {LIFESTYLE_ISSUES.food.intro}
            </p>

            <div className="mt-6 space-y-2 border-t border-stone-100 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Top Trends
              </span>
              {LIFESTYLE_ISSUES.food.items.slice(0, 3).map((item) => (
                <div key={item.id} className="text-xs text-stone-700 flex items-center justify-between">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-[10px] text-stone-400 font-mono">{item.momentum}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-[#8B5E3C]">
            <span>Unlock Healthy Cooking Recipes</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Issue 03: Fitness */}
        <div
          onClick={() => onNavigate('cardio')}
          className="group rounded-3xl bg-white border border-[#E8E2D8] p-7 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#556B2F] tracking-widest uppercase">
                Issue 03 • Fitness
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#556B2F]" />
            </div>

            <h3 className="text-2xl font-display font-medium text-stone-900 mt-3 group-hover:text-[#556B2F] transition-colors">
              {LIFESTYLE_ISSUES.exercise.headline}
            </h3>

            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              {LIFESTYLE_ISSUES.exercise.intro}
            </p>

            <div className="mt-6 space-y-2 border-t border-stone-100 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Top Trends
              </span>
              {LIFESTYLE_ISSUES.exercise.items.slice(0, 3).map((item) => (
                <div key={item.id} className="text-xs text-stone-700 flex items-center justify-between">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-[10px] text-stone-400 font-mono">{item.momentum}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-[#556B2F]">
            <span>Explore Simple Fat-Burn Cardio</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Momentum Filter Section */}
      <div className="mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-400">
              The Curated Index
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-stone-900 mt-1">
              All 15 Trends in Detail
            </h2>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['All', 'Rising', 'Peaking', 'Staying'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setMomentumFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  momentumFilter === filter
                    ? 'bg-[#1F1C18] text-[#FAF7F2]'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 15 Trend Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredTrends.map(({ item, issueLabel, issueSlug }) => (
            <div
              key={item.id}
              onClick={() => onNavigate(issueSlug === 'exercise' ? 'cardio' : issueSlug === 'food' ? 'diets' : 'fashion')}
              className="group rounded-3xl bg-white border border-[#E8E2D8] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#1F1C18]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-mono px-2.5 py-1 rounded-full">
                    {issueLabel}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                    {item.momentum}
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C05A3E]">
                    {item.kicker}
                  </span>
                  <h4 className="text-lg font-display font-medium text-stone-900 mt-1 group-hover:text-[#C05A3E] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-700 font-semibold group-hover:text-[#C05A3E]">
                <span>Read & Unlock</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Banner: "Turn the trends into a plan you'll actually follow" */}
      <div className="mt-20 rounded-3xl bg-[#1F1C18] text-[#FAF7F2] p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-stone-800">
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#EED989]">
            Don't just read the trends — live them
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-light text-white leading-tight">
            Turn the trends into a plan you'll actually follow.
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Get personalized weekly meal recipes, simple fat-burning cardio routines, and flattering body-type color combinations cached offline in your pocket.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPlans}
              className="px-6 py-3.5 rounded-full bg-[#EED989] text-[#1F1C18] font-bold text-xs sm:text-sm hover:bg-[#e4ce79] transition shadow-md cursor-pointer"
            >
              Choose Your Plan (From $9.99/mo)
            </button>
            <span className="text-xs text-stone-400">
              Billed monthly through Stripe's secure checkout. Cancel anytime.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
