import React, { useState } from 'react';
import {
  Utensils,
  Clock,
  Flame,
  Check,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Tag,
  Share2,
  X,
  AlertCircle,
} from 'lucide-react';
import { Recipe } from '../types';

interface DietPlansPageProps {
  recipes: Recipe[];
  onLogMeal: (recipeId: string) => void;
  completedRecipeIds: string[];
}

export const DietPlansPage: React.FC<DietPlansPageProps> = ({
  recipes: HEALTHY_RECIPES,
  onLogMeal,
  completedRecipeIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [showGroceryList, setShowGroceryList] = useState(false);

  // Cooking Timer state inside active recipe
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 min default
  const [timerActive, setTimerActive] = useState(false);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds]);

  const categories = ['All', '15-Min Meals', 'High-Protein', 'Fiber-Maxxing', 'Low-Cal Comfort', '1-Pan Roasts'];

  const filteredRecipes =
    selectedCategory === 'All'
      ? HEALTHY_RECIPES
      : HEALTHY_RECIPES.filter((r) => r.category === selectedCategory);

  const toggleIngredient = (ing: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ing]: !prev[ing],
    }));
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOpenRecipe = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    // Parse cook time if numeric, else 10 mins
    const match = recipe.cookTime.match(/\d+/);
    const minutes = match ? parseInt(match[0], 10) : 10;
    setTimerSeconds(minutes * 60);
    setTimerActive(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C19A6B]">
              Culinary Health Blueprint
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Unlocked & Cached
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1918] mt-1 tracking-tight">
            Simple & Healthy Diets
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
            Master the art of cooking nutrient-dense, high-protein, and fiber-rich meals with zero culinary complexity. Designed for sustained fat loss without hunger.
          </p>
        </div>

        <button
          onClick={() => setShowGroceryList(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-xs transition"
        >
          <ShoppingBag className="w-4 h-4 text-[#C19A6B]" />
          <span>Interactive Grocery Checklist</span>
          {Object.values(checkedIngredients).filter(Boolean).length > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#1A1918] text-[#F5EFEB] text-[10px] flex items-center justify-center font-bold">
              {Object.values(checkedIngredients).filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#1A1918] text-[#F5EFEB] shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-2">
        {filteredRecipes.map((recipe) => {
          const isCooked = completedRecipeIds.includes(recipe.id);

          return (
            <div
              key={recipe.id}
              className="group rounded-3xl bg-white border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Quick Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-[#1A1918]/80 backdrop-blur-md text-[#FAF7F2] text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {recipe.category}
                    </span>
                    {isCooked && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3" /> Logged Today
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{recipe.calories} kcal</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {recipe.cookTime} cook
                    </span>
                    <span>•</span>
                    <span className="text-[#C19A6B] font-semibold">{recipe.difficulty}</span>
                    <span>•</span>
                    <span className="font-semibold text-emerald-700">{recipe.protein}g protein</span>
                  </div>

                  <h3 className="text-lg font-serif-luxury font-bold text-stone-900 leading-snug group-hover:text-[#C19A6B] transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {recipe.subtitle}
                  </p>

                  {/* Macro Bars */}
                  <div className="grid grid-cols-4 gap-1.5 mt-4 p-2 bg-[#FAF7F2] rounded-xl text-center text-[10px]">
                    <div>
                      <span className="text-stone-400 block">Protein</span>
                      <strong className="text-stone-800 text-xs">{recipe.protein}g</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Carbs</span>
                      <strong className="text-stone-800 text-xs">{recipe.carbs}g</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Fat</span>
                      <strong className="text-stone-800 text-xs">{recipe.fat}g</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Fiber</span>
                      <strong className="text-emerald-700 text-xs">{recipe.fiber}g</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => handleOpenRecipe(recipe)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:text-[#C19A6B] transition"
                >
                  <span>View Step-by-Step Cooking Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cooking Modal / Step by Step view */}
      {activeRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#FAF7F2] text-[#1A1918] shadow-2xl border border-[#E8E2D8] overflow-hidden my-4">
            {/* Modal Header Bar */}
            <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-stone-900">
              <img
                src={activeRecipe.image}
                alt={activeRecipe.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918] via-transparent to-black/40" />

              <button
                onClick={() => setActiveRecipe(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#E6D59A] font-bold">
                  {activeRecipe.category} • {activeRecipe.cookTime}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mt-1">
                  {activeRecipe.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Cooking Timer Tool */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                    <Timer className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                      Active Cooking Timer
                    </h4>
                    <p className="text-xs text-stone-500">
                      Step timer for precision nutrient preservation
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-mono font-bold text-stone-900">
                    {formatTimer(timerSeconds)}
                  </span>
                  <button
                    onClick={() => setTimerActive(!timerActive)}
                    className="p-2 rounded-full bg-[#1A1918] text-white hover:bg-black transition"
                    title={timerActive ? 'Pause Timer' : 'Start Timer'}
                  >
                    {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setTimerActive(false);
                      const match = activeRecipe.cookTime.match(/\d+/);
                      const minutes = match ? parseInt(match[0], 10) : 10;
                      setTimerSeconds(minutes * 60);
                    }}
                    className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Simple Cooking Hacks Highlight */}
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>The Simple Cooking Rule (Effortless & Healthy)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-amber-950">
                  {activeRecipe.simpleCookingHacks.map((hack, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C19A6B] font-bold">✓</span>
                      <span>{hack}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredients Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif-luxury font-bold text-lg text-stone-900">
                    Ingredients Checklist (Tap to check off)
                  </h3>
                  <span className="text-xs text-stone-500">
                    {activeRecipe.ingredients.length} items
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeRecipe.ingredients.map((ing, idx) => {
                    const isChecked = !!checkedIngredients[ing];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleIngredient(ing)}
                        className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-stone-500 line-through'
                            : 'bg-white border-stone-200 text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <span className="pr-2">{ing}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                            isChecked
                              ? 'bg-emerald-600 text-white'
                              : 'border border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h3 className="font-serif-luxury font-bold text-lg text-stone-900 mb-3">
                  Step-by-Step Instructions
                </h3>
                <ol className="space-y-3 text-xs sm:text-sm text-stone-700">
                  {activeRecipe.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200">
                      <span className="w-6 h-6 rounded-full bg-[#1A1918] text-[#F5EFEB] text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Healthy Swaps & Customization */}
              {activeRecipe.swaps.length > 0 && (
                <div className="p-4 bg-white rounded-2xl border border-stone-200">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#C19A6B]" />
                    <span>Smart Nutrition Swaps</span>
                  </h4>
                  <div className="space-y-1.5 text-xs text-stone-600">
                    {activeRecipe.swaps.map((sw, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-stone-400 line-through">{sw.original}</span>
                        <span>➔</span>
                        <strong className="text-emerald-700">{sw.healthierAlternative}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-4 bg-white border-t border-[#E8E2D8] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-stone-500">
                Nutrient analysis: {activeRecipe.calories} kcal • {activeRecipe.protein}g protein • {activeRecipe.fiber}g fiber
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onLogMeal(activeRecipe.id);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#1A1918] hover:bg-black text-[#F5EFEB] text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-[#E6D59A]" />
                  <span>Log to Daily Nutrition Tracker</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grocery List Slide-over Drawer */}
      {showGroceryList && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C19A6B]" />
                  <h3 className="font-serif-luxury font-bold text-xl">My Grocery List</h3>
                </div>
                <button
                  onClick={() => setShowGroceryList(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-stone-500 mt-3">
                Items from recipes you have explored. Saved offline for supermarket access.
              </p>

              <div className="mt-4 space-y-2">
                {Object.keys(checkedIngredients).length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs">
                    No ingredients checked yet. Tap ingredients on any recipe to add them to this list.
                  </div>
                ) : (
                  Object.entries(checkedIngredients).map(([item, isChecked], idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(item)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-200 text-stone-400 line-through'
                          : 'bg-white border-stone-200 text-stone-800'
                      }`}
                    >
                      <span>{item}</span>
                      <Check className={`w-4 h-4 ${isChecked ? 'text-emerald-600' : 'text-stone-300'}`} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D8] space-y-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-full border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-100"
              >
                Print / Save Grocery List
              </button>
              <button
                onClick={() => setCheckedIngredients({})}
                className="w-full py-2 rounded-full text-stone-400 text-xs hover:text-stone-700"
              >
                Clear All Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
