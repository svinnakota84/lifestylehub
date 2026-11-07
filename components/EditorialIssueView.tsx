import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Sparkles, Check, Zap } from 'lucide-react';
import { IssueSection, TrendItem } from '../data/lifestyleTrendsData';

interface EditorialIssueViewProps {
  issue: IssueSection;
  onOpenActionSuite: () => void;
  actionSuiteTitle: string;
  actionSuiteSubtitle: string;
}

export const EditorialIssueView: React.FC<EditorialIssueViewProps> = ({
  issue,
  onOpenActionSuite,
  actionSuiteTitle,
  actionSuiteSubtitle,
}) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const heroItem = issue.items[0];
  const remainingItems = issue.items.slice(1);

  const getMomentumBadge = (momentum: 'Rising' | 'Peaking' | 'Staying') => {
    if (momentum === 'Peaking') {
      return (
        <span className="inline-flex items-center gap-1 bg-[#D0533C] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          <span>▲</span> PEAKING
        </span>
      );
    }
    if (momentum === 'Rising') {
      return (
        <span className="inline-flex items-center gap-1 bg-[#F2DF99] text-[#1F1C18] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          <span>↗</span> RISING
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-[#556B2F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
        <span>●</span> STAYING
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#E8E2D8]">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${issue.accent}`} />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500">
            Issue {issue.issue} — {issue.label} trends 2026
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-light text-[#1F1C18] mt-2 tracking-tight">
          {issue.headline}
        </h2>

        <p className="text-base sm:text-lg text-stone-600 mt-3 max-w-2xl leading-relaxed">
          {issue.intro}
        </p>

        {/* Promo Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-white border border-[#E8E2D8] flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#C05A3E]" />
            <span className="text-xs sm:text-sm font-medium text-stone-800">
              {issue.promo}
            </span>
          </div>
          <button
            onClick={onOpenActionSuite}
            className="px-5 py-2 rounded-full bg-[#1F1C18] hover:bg-black text-[#FAF7F2] text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{actionSuiteTitle}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EED989]" />
          </button>
        </div>
      </div>

      {/* Hero Featured Card (Exact layout from image_5713e0d5.png) */}
      <div className="mt-10 rounded-3xl bg-white border border-[#E8E2D8] p-6 sm:p-8 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Photography */}
          <div className="lg:col-span-7 h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
            <img
              src={heroItem.image}
              alt={heroItem.title}
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
            />
          </div>

          {/* Hero Right Editorial Content */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-stone-400">
                No. {heroItem.num}
              </span>
              {getMomentumBadge(heroItem.momentum)}
            </div>

            <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-400 block">
              {heroItem.kicker}
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 leading-tight">
              {heroItem.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {heroItem.description}
            </p>

            {heroItem.expandedDetails && (
              <p className="text-xs text-stone-500 italic bg-stone-50 p-3 rounded-xl border-l-2 border-stone-800 leading-relaxed">
                "{heroItem.expandedDetails}"
              </p>
            )}

            {/* Inset Metadata Box */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                  {issue.metaLabels[0]}
                </span>
                <strong className="text-stone-900 font-semibold">{heroItem.meta[0]}</strong>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                  {issue.metaLabels[1]}
                </span>
                <strong className="text-stone-900 font-semibold">{heroItem.meta[1]}</strong>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {heroItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg"
                >
                  #{tag.toLowerCase().replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Remaining Cards (Exact layout from image_28e1f645.png) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
        {remainingItems.map((item) => {
          const isExpanded = expandedCardId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Floating Badge */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-100 p-3">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      {getMomentumBadge(item.momentum)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pt-3 pb-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">
                    <span>{item.kicker}</span>
                    <span>NO. {item.num}</span>
                  </div>

                  <h3 className="text-2xl font-display font-medium text-stone-900 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expandable Read More */}
                  {item.expandedDetails && (
                    <div>
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="text-xs font-semibold text-stone-800 hover:text-[#C05A3E] flex items-center gap-1 transition"
                      >
                        <span>{isExpanded ? 'Show less' : 'Read more'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <p className="mt-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed animate-in fade-in">
                          {item.expandedDetails}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Inset Metadata Box */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs mt-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                        {issue.metaLabels[0]}
                      </span>
                      <strong className="text-stone-900 font-medium truncate block">
                        {item.meta[0]}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                        {issue.metaLabels[1]}
                      </span>
                      <strong className="text-stone-900 font-medium truncate block">
                        {item.meta[1]}
                      </strong>
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                      >
                        #{tag.toLowerCase().replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Switcher Card leading to Actionable Unlocked Tools */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-[#1F1C18] to-stone-900 text-[#FAF7F2] p-8 sm:p-10 shadow-xl border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#EED989]">
            Interactive Customer Suite
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-light text-white">
            {actionSuiteTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {actionSuiteSubtitle}
          </p>
        </div>

        <button
          onClick={onOpenActionSuite}
          className="px-8 py-3.5 rounded-full bg-[#EED989] hover:bg-[#e2ce7c] text-[#1F1C18] font-bold text-xs sm:text-sm transition shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <span>Open Interactive Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
