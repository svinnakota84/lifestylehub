import React, { useState } from 'react';
import {
  Sparkles,
  Palette,
  User,
  Check,
  X as CloseIcon,
  Shirt,
  Heart,
  Copy,
  CheckCircle2,
  Compass,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { BodyShape, Undertone, ColorSeasonPalette, BodyShapeStyling } from '../types';

export const FashionConfidencePage: React.FC<{ styling: BodyShapeStyling[]; palettes: ColorSeasonPalette[] }> = ({ styling: BODY_SHAPE_STYLING, palettes: COLOR_SEASONS }) => {
  const [selectedShape, setSelectedShape] = useState<BodyShape>('hourglass');
  const [selectedUndertone, setSelectedUndertone] = useState<Undertone>('warm');
  const [selectedPalette, setSelectedPalette] = useState('');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Find active styling data
  const currentStyling =
    BODY_SHAPE_STYLING.find((b) => b.shape === selectedShape) || BODY_SHAPE_STYLING[0];

  const matchedPalettes = COLOR_SEASONS.filter(
    (c) => c.undertone === selectedUndertone || selectedUndertone === 'neutral'
  );
  const activePalette: ColorSeasonPalette = matchedPalettes.find(palette => palette.season === selectedPalette) || matchedPalettes[0] || COLOR_SEASONS[0];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C19A6B]">
              Aesthetic Body Alignment
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Unlocked & Offline Ready
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1918] mt-1 tracking-tight">
            Body Silhouettes & Color Harmonies
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Explore colour combinations and outfit proportions as creative possibilities. Your comfort, culture and preferences guide what you choose to wear.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-stone-700 bg-white border border-stone-200 px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-2xs">
            <Smile className="w-4 h-4 text-[#C19A6B]" />
            <span>Style on Your Terms</span>
          </span>
        </div>
      </div>

      {/* Body Shape Selector Bar */}
      <div className="mt-8">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
          Step 1: Select Your Body Architecture
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BODY_SHAPE_STYLING.map((shape) => {
            const isSelected = selectedShape === shape.shape;
            return (
              <button
                key={shape.shape}
                onClick={() => setSelectedShape(shape.shape)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1A1918] text-[#FAF7F2] border-stone-900 shadow-md ring-2 ring-[#E6D59A]/30'
                    : 'bg-white text-stone-900 border-[#E8E2D8] hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-serif-luxury">{shape.label}</span>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#E6D59A]" />}
                  </div>
                  <p
                    className={`text-[11px] mt-1 line-clamp-2 ${
                      isSelected ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    {shape.keyGoal}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skin Undertone Selector Bar */}
      <div className="mt-8">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
          Step 2: Explore a Colour Direction & Palette
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {(['warm', 'cool', 'neutral'] as Undertone[]).map((tone) => (
            <button
              key={tone}
              onClick={() => { setSelectedUndertone(tone); setSelectedPalette(''); }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold capitalize transition-all ${
                selectedUndertone === tone
                  ? 'bg-[#1A1918] text-[#FAF7F2] shadow-sm'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {tone === 'warm' && '☀️ Warm colours'}
              {tone === 'cool' && '❄️ Cool colours'}
              {tone === 'neutral' && '⚖️ Explore all colours'}
            </button>
          ))}
        </div>
      </div>

      <label className="block mt-4 text-xs font-semibold text-stone-700">Choose a palette
        <select aria-label="Choose a colour palette" value={activePalette.season} onChange={event => setSelectedPalette(event.target.value)} className="block mt-2 w-full sm:max-w-sm rounded-xl border border-stone-300 bg-white p-3 text-xs">
          {matchedPalettes.map(palette => <option key={palette.season} value={palette.season}>{palette.season}</option>)}
        </select>
      </label>

      {/* Main Two-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Color Season & Curated Swatches (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 shadow-sm">
            <div className="flex items-start justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C19A6B]">
                  Selected Colour Palette
                </span>
                <h3 className="font-serif-luxury font-bold text-2xl text-stone-900 mt-0.5">
                  {activePalette.season}
                </h3>
                <p className="text-xs text-stone-500 mt-1">{activePalette.tagline}</p>
              </div>
              <Palette className="w-5 h-5 text-[#C19A6B]" />
            </div>

            <p className="text-xs text-stone-600 mt-4 leading-relaxed">
              {activePalette.description}
            </p>

            <div className="mt-4 p-3 bg-[#FAF7F2] rounded-xl text-xs text-stone-700 flex items-center justify-between">
              <span className="text-stone-500">Accessory Ideas:</span>
              <strong className="text-stone-900">{activePalette.bestJewelry}</strong>
            </div>

            {/* Interactive Color Chips */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Harmonized Color Swatches (Tap to copy Hex)
                </span>
                {copiedHex && (
                  <span className="text-[11px] font-semibold text-emerald-700 animate-in fade-in">
                    Copied {copiedHex}!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {activePalette.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handleCopyHex(color.hex)}
                    style={{ backgroundColor: color.hex }}
                    className="h-20 rounded-xl p-2.5 flex flex-col justify-between text-left transition-transform hover:scale-102 shadow-xs cursor-pointer"
                  >
                    <span
                      className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded w-fit ${
                        color.textDark
                          ? 'bg-black/10 text-stone-900'
                          : 'bg-white/20 text-white backdrop-blur-xs'
                      }`}
                    >
                      {color.role}
                    </span>
                    <div className={color.textDark ? 'text-stone-900' : 'text-white'}>
                      <span className="text-[11px] font-bold block leading-tight">
                        {color.name}
                      </span>
                      <span className="text-[10px] font-mono opacity-80">{color.hex}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Color Placement Strategy for Selected Body Shape */}
          <div className="p-5 bg-gradient-to-br from-[#1A1918] to-stone-900 text-[#FAF7F2] rounded-3xl shadow-lg border border-stone-800 space-y-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#E6D59A]" />
              <h4 className="font-serif-luxury font-bold text-base text-[#FAF7F2]">
                Colour Placement Ideas for {currentStyling.label}
              </h4>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {currentStyling.colorPlacementStrategy}
            </p>
          </div>
        </div>

        {/* Right Column: Silhouette Architecture & Formulas (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Goal & Hero Silhouettes */}
          <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C19A6B]">
                  Tailoring Architecture
                </span>
                <h3 className="font-serif-luxury font-bold text-2xl text-stone-900 mt-0.5">
                  {currentStyling.label}
                </h3>
              </div>
              <Shirt className="w-5 h-5 text-stone-700" />
            </div>

            <div className="my-4 p-4 bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl">
              <span className="text-[10px] font-bold uppercase text-stone-400 block mb-0.5">
                Proportion Objective
              </span>
              <p className="text-xs sm:text-sm text-stone-800 font-medium">
                {currentStyling.keyGoal}
              </p>
            </div>

            <div className="space-y-3 mt-6">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                Hero Silhouettes (Guaranteed Flattering Cuts)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentStyling.heroSilhouettes.map((cut, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C19A6B] flex-shrink-0 mt-0.5" />
                    <span>{cut}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Outfit Formulas */}
            <div className="mt-8 space-y-4">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                Ready-to-Wear Outfit Formulas
              </h4>

              {currentStyling.outfitFormulas.map((outfit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2 hover:border-stone-400 transition"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif-luxury font-bold text-base text-stone-900">
                      {outfit.title}
                    </h5>
                    <span className="text-[10px] font-semibold bg-[#FAF7F2] text-stone-700 px-2 py-0.5 rounded-full border border-stone-200">
                      {outfit.occasion}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {outfit.pieces.map((piece, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-xs bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg"
                      >
                        {piece}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="text-[#C19A6B] font-medium">
                      Palette: {outfit.paletteRecommendation}
                    </span>
                    <span className="text-stone-500 italic">
                      "{outfit.confidenceBooster}"
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dos and Avoid Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-stone-100">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
                <h5 className="text-xs font-bold text-emerald-950 uppercase flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Always Say Yes To:</span>
                </h5>
                <ul className="space-y-1 text-xs text-emerald-900">
                  {currentStyling.dos.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-2xl space-y-2">
                <h5 className="text-xs font-bold text-rose-950 uppercase flex items-center gap-1.5">
                  <CloseIcon className="w-4 h-4 text-rose-700" />
                  <span>Bypass or Tailor:</span>
                </h5>
                <ul className="space-y-1 text-xs text-rose-900">
                  {currentStyling.avoid.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
