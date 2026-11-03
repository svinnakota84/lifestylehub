import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Scale, FileText, CheckCircle2, X, Download } from 'lucide-react';
import { LEGAL_SHIELD_SECTIONS } from '../data/legalShieldData';
import { LegalConsentRecord } from '../types';

interface LegalShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  consentRecord?: LegalConsentRecord | null;
}

export const LegalShieldModal: React.FC<LegalShieldModalProps> = ({
  isOpen,
  onClose,
  consentRecord,
}) => {
  const [activeTab, setActiveTab] = useState<string>(LEGAL_SHIELD_SECTIONS[0].id);

  if (!isOpen) return null;

  const currentSection =
    LEGAL_SHIELD_SECTIONS.find((s) => s.id === activeTab) || LEGAL_SHIELD_SECTIONS[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#FAF7F2] text-[#1A1918] shadow-2xl border border-[#E8E2D8] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D8] bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1A1918] text-[#E6D59A]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif-luxury font-bold">Legal Shield & Medical Protection</h2>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Fully Enforceable
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Binding Terms of Service, PAR-Q Physical Release, Medical Disclaimers & Arbitration
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Consent Badge Status if user already agreed */}
        {consentRecord?.hasConsented && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Digitally Executed:</strong> Consented by <em>{consentRecord.signatureName || 'Authorized Subscriber'}</em> on{' '}
                {consentRecord.termsAcceptedDate || 'Active Session'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
              Audit ID: LH-{consentRecord.ipMock || 'SEC-8942'}
            </span>
          </div>
        )}

        {/* Content Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-72 bg-[#F3EFEA] border-b md:border-b-0 md:border-r border-[#E8E2D8] p-3 overflow-y-auto space-y-1.5 max-h-48 md:max-h-none">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              Clauses & Waivers
            </div>
            {LEGAL_SHIELD_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex flex-col gap-0.5 ${
                  activeTab === sec.id
                    ? 'bg-[#1A1918] text-[#F5EFEB] shadow-sm font-semibold'
                    : 'text-stone-700 hover:bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{sec.title}</span>
                </div>
                <span
                  className={`text-[10px] ${
                    activeTab === sec.id ? 'text-[#E6D59A]' : 'text-stone-500'
                  }`}
                >
                  {sec.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Detailed Legal Content Viewer */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C19A6B]">
                  {currentSection.badge}
                </span>
                <h3 className="text-xl font-serif-luxury font-bold text-stone-900 mt-1">
                  {currentSection.title}
                </h3>
              </div>
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            </div>

            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium leading-relaxed">
              <strong>Core Protection Summary:</strong> {currentSection.summary}
            </div>

            <div className="space-y-3.5 text-xs text-stone-700 leading-relaxed font-normal">
              {currentSection.content.map((paragraph, idx) => (
                <p key={idx} className={paragraph.startsWith('THE') || paragraph.startsWith('YOU') || paragraph.startsWith('CLASS') || paragraph.startsWith('MANDATORY') ? 'font-semibold text-stone-900 bg-stone-50 p-2.5 rounded-lg border-l-2 border-[#1A1918]' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Governing Law: Delaware & Standard Consumer AAA Arbitration
              </span>
              <span>Updated: Nov 2026</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E8E2D8] flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-stone-600 max-w-md">
            By accessing or subscribing to LifestyleHub, all users expressly consent to these binding terms, waiving collective legal action and assuming inherent exercise/dietary risks.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#1A1918] hover:bg-black text-white text-xs font-semibold shadow-sm transition"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
