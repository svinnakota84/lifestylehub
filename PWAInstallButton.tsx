import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Installed App</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-2 rounded-full bg-[#1A1918] text-[#F5EFEB] hover:bg-black transition-all shadow-sm font-medium ${
          compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs sm:text-sm'
        }`}
        title="Install LifestyleHub as an App"
      >
        <Download className="w-3.5 h-3.5 text-[#E6D59A]" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-2 rounded-full bg-[#1A1918] text-[#F5EFEB] hover:bg-black transition-all shadow-sm font-medium ${
            compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs sm:text-sm'
          }`}
          title="Add to iOS Home Screen"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#E6D59A]" />
          <span>Add to Phone</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-[#FAF7F2] p-6 shadow-2xl border border-[#E8E2D8] text-[#1A1918]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#C19A6B]" />
                  <h3 className="font-serif-luxury font-semibold text-lg">Install on iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-stone-700">
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1918] text-[#FAF7F2] text-xs font-bold flex items-center justify-center">1</span>
                  <p>
                    Tap the <strong>Share</strong> button (box with an arrow pointing up) in Safari’s bottom toolbar.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1918] text-[#FAF7F2] text-xs font-bold flex items-center justify-center">2</span>
                  <p>
                    Scroll down and tap <strong>Add to Home Screen</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1918] text-[#FAF7F2] text-xs font-bold flex items-center justify-center">3</span>
                  <p>
                    Tap <strong>Add</strong> in the top right corner. LifestyleHub will launch with offline support!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-full bg-[#1A1918] py-2.5 text-xs font-semibold text-white hover:bg-black transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop / browser install button
  return (
    <button
      onClick={() => {
        alert('To install LifestyleHub:\n1. On Chrome/Edge: Click the install icon in your address bar.\n2. On mobile: Tap browser menu -> "Add to Home screen" or "Install App".');
      }}
      className={`flex items-center gap-1.5 rounded-full border border-stone-300 bg-white/80 hover:bg-white text-stone-700 font-medium transition ${
        compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs'
      }`}
      title="Install App Information"
    >
      <Smartphone className="w-3.5 h-3.5 text-stone-500" />
      <span>Install App</span>
    </button>
  );
};
