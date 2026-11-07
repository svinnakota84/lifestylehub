import React, { useState, useEffect } from 'react';
import {
  Activity,
  Flame,
  Heart,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Shield,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronRight,
  Calculator,
} from 'lucide-react';
import { CARDIO_ROUTINES } from '../data/cardioData';
import { CardioRoutine } from '../types';

interface CardioWorkoutsPageProps {
  onLogWorkout: (routineId: string, minutes: number, calories: number) => void;
  completedWorkoutIds: string[];
}

export const CardioWorkoutsPage: React.FC<CardioWorkoutsPageProps> = ({
  onLogWorkout,
  completedWorkoutIds,
}) => {
  const [activeRoutine, setActiveRoutine] = useState<CardioRoutine>(CARDIO_ROUTINES[0]);
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(CARDIO_ROUTINES[0].intervals[0].durationSec);
  const [timerRunning, setTimerRunning] = useState(false);
  const [userAge, setUserAge] = useState<number>(32);

  // Interval timer tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerRunning && timerSecondsLeft === 0) {
      // Advance to next interval
      if (currentIntervalIndex < activeRoutine.intervals.length - 1) {
        const nextIdx = currentIntervalIndex + 1;
        setCurrentIntervalIndex(nextIdx);
        setTimerSecondsLeft(activeRoutine.intervals[nextIdx].durationSec);
      } else {
        setTimerRunning(false);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSecondsLeft, currentIntervalIndex, activeRoutine]);

  const handleSelectRoutine = (routine: CardioRoutine) => {
    setActiveRoutine(routine);
    setCurrentIntervalIndex(0);
    setTimerSecondsLeft(routine.intervals[0].durationSec);
    setTimerRunning(false);
  };

  const handleReset = () => {
    setTimerRunning(false);
    setCurrentIntervalIndex(0);
    setTimerSecondsLeft(activeRoutine.intervals[0].durationSec);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Fat burn heart rate target based on age
  const maxHR = 220 - userAge;
  const fatBurnMin = Math.round(maxHR * 0.6);
  const fatBurnMax = Math.round(maxHR * 0.7);

  const activeInterval = activeRoutine.intervals[currentIntervalIndex];
  const isFinished = currentIntervalIndex === activeRoutine.intervals.length - 1 && timerSecondsLeft === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C19A6B]">
              Fat-Oxidation Science
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Unlocked & Ready
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1918] mt-1 tracking-tight">
            Simple Cardio for Weight Loss
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Discover why low-intensity steady-state (LISS) and gentle bodyweight intervals burn significantly more fat than grueling high-cortisol workouts. No joint pain, no burnout.
          </p>
        </div>

        {/* Heart Rate Calculator Capsule */}
        <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
            <Heart className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <span>Your Fat-Burn Zone:</span>
              <span className="text-rose-600 font-mono">{fatBurnMin} - {fatBurnMax} BPM</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
              <span>Age:</span>
              <input
                type="number"
                min="16"
                max="95"
                value={userAge}
                onChange={(e) => setUserAge(Number(e.target.value) || 30)}
                className="w-10 px-1 py-0.5 text-center bg-stone-100 rounded border border-stone-300 font-mono text-stone-800"
              />
              <span>yrs (Zone 2: 60-70% Max)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Weight Loss Mechanism Box */}
      <div className="mt-6 p-5 rounded-3xl bg-[#F3EFEA] border border-[#E8E2D8] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-[#1A1918] text-[#E6D59A] flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-luxury font-bold text-base text-stone-900">
              Why Simple Cardio Shrinks Visceral Fat Faster
            </h3>
            <p className="text-xs text-stone-700 mt-1 leading-relaxed max-w-3xl">
              Unlike grueling sprints that flood the body with cortisol (a stress hormone that triggers sugar cravings and forces the liver to hold onto abdominal fat), gentle rhythmic cardio operates at the exact respiratory quotient where <strong>free fatty acids supply up to 85% of total caloric fuel</strong>.
            </p>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-stone-800 bg-white/80 px-3 py-2 rounded-xl border border-stone-200 whitespace-nowrap">
          Zero Joint Stress Guarantee
        </div>
      </div>

      {/* Main Interactive Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Workout Selector List (Left 5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 px-1">
            Curated Low-Stress Fat-Burn Protocols
          </h2>

          {CARDIO_ROUTINES.map((routine) => {
            const isSelected = activeRoutine.id === routine.id;
            const isCompleted = completedWorkoutIds.includes(routine.id);

            return (
              <div
                key={routine.id}
                onClick={() => handleSelectRoutine(routine)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A1918] text-[#FAF7F2] shadow-xl border-stone-900 ring-2 ring-[#E6D59A]/40'
                    : 'bg-white text-stone-900 border-[#E8E2D8] hover:border-stone-400 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#E6D59A]/20 text-[#E6D59A]'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {routine.category}
                    </span>
                    <h3 className="font-serif-luxury font-bold text-base sm:text-lg mt-1.5 leading-snug">
                      {routine.title}
                    </h3>
                  </div>
                  {isCompleted && (
                    <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <div
                  className={`flex items-center gap-3 text-xs mt-3 pt-3 border-t ${
                    isSelected ? 'border-stone-800 text-stone-300' : 'border-stone-100 text-stone-500'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {routine.durationMin} min
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> ~{routine.caloriesBurn} kcal
                  </span>
                  <span>•</span>
                  <span className="text-[#C19A6B] font-semibold">{routine.level}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Workout Companion & Timer (Right 7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-8 shadow-lg flex flex-col justify-between">
          <div>
            {/* Active Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C19A6B]">
                  Active Training Companion
                </span>
                <h3 className="font-serif-luxury font-bold text-2xl text-stone-900 mt-1">
                  {activeRoutine.title}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Target: {activeRoutine.targetBPMZone} • Equipment: {activeRoutine.equipment}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-semibold">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeRoutine.jointSafety}</span>
              </div>
            </div>

            {/* Visual Timer Display */}
            <div className="my-6 p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C19A6B]">
                Interval {currentIntervalIndex + 1} of {activeRoutine.intervals.length}
              </span>
              <h4 className="text-lg font-serif-luxury font-bold text-stone-900 mt-1">
                {activeInterval.phase}
              </h4>
              <p className="text-xs text-stone-600 max-w-md mt-1 leading-relaxed">
                {activeInterval.description}
              </p>

              {/* Big Timer Digits */}
              <div className="text-6xl sm:text-7xl font-mono font-bold text-[#1A1918] my-4 tracking-tighter">
                {formatTime(timerSecondsLeft)}
              </div>

              {/* Timer Progress Indicator */}
              <div className="w-full max-w-xs h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1A1918] transition-all duration-300"
                  style={{
                    width: `${
                      ((activeInterval.durationSec - timerSecondsLeft) /
                        activeInterval.durationSec) *
                      100
                    }%`,
                  }}
                />
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handleReset}
                  className="p-3 rounded-full bg-stone-200 text-stone-700 hover:bg-stone-300 transition"
                  title="Reset Routine"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="px-8 py-3.5 rounded-full bg-[#1A1918] text-[#F5EFEB] hover:bg-black font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  {timerRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Workout</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-[#E6D59A]" />
                      <span>{isFinished ? 'Workout Complete!' : 'Start Cardio'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Weight Loss Physiology Explanation */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Info className="w-4 h-4 text-amber-600" />
                <span>The Fat Loss Mechanism Behind This Routine</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                {activeRoutine.whyItBurnsFat}
              </p>
            </div>

            {/* Injury-Free Form Checklist */}
            <div className="mt-4 p-4 bg-white rounded-2xl border border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                Precision Form Cues
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {activeRoutine.formTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C19A6B] font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Complete & Log CTA */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              Burning approx. {activeRoutine.caloriesBurn} kcal • {activeRoutine.durationMin} active minutes
            </span>
            <button
              onClick={() => {
                onLogWorkout(activeRoutine.id, activeRoutine.durationMin, activeRoutine.caloriesBurn);
              }}
              className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Log {activeRoutine.durationMin}m to Progress Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
