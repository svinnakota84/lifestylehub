export type PlanTier = 'free' | 'essentials' | 'plus' | 'coach';

export interface PlanDetails {
  id: PlanTier;
  name: string;
  price: number;
  period: string;
  tagline: string;
  popular?: boolean;
  features: string[];
  buttonText: string;
}

export interface SubscriptionState {
  isActive: boolean;
  tier: PlanTier;
  subscribedAt: string | null;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  invoiceId: string;
  autoRenew: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Easy' | 'Moderate' | 'Quick';
  category: '15-Min Meals' | 'High-Protein' | 'Fiber-Maxxing' | 'Low-Cal Comfort' | '1-Pan Roasts';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  tags: string[];
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  simpleCookingHacks: string[];
  swaps: { original: string; healthierAlternative: string }[];
}

export interface CardioRoutine {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'All Levels';
  category: 'LISS Walking' | 'Low-Impact Home' | 'Fat-Burn HIIT' | 'Metabolic Stroll';
  durationMin: number;
  caloriesBurn: number;
  targetBPMZone: string;
  whyItBurnsFat: string;
  equipment: string;
  intervals: {
    phase: string;
    durationSec: number;
    description: string;
    targetHeartRate: string;
  }[];
  formTips: string[];
  jointSafety: string;
}

export type BodyShape = 'hourglass' | 'rectangle' | 'pear' | 'inverted_triangle' | 'apple';
export type Undertone = 'warm' | 'cool' | 'neutral';

export interface ColorSeasonPalette {
  season: string;
  undertone: Undertone;
  tagline: string;
  colors: {
    name: string;
    hex: string;
    textDark: boolean;
    role: 'Base' | 'Accent' | 'Contrast' | 'Neutral';
  }[];
  description: string;
  bestJewelry: string;
}

export interface BodyShapeStyling {
  shape: BodyShape;
  label: string;
  description: string;
  keyGoal: string;
  heroSilhouettes: string[];
  colorPlacementStrategy: string;
  outfitFormulas: {
    title: string;
    occasion: string;
    pieces: string[];
    paletteRecommendation: string;
    confidenceBooster: string;
  }[];
  dos: string[];
  avoid: string[];
}

export interface UserProgressData {
  currentWeight: number;
  targetWeight: number;
  startWeight: number;
  weightHistory: { date: string; weight: number }[];
  waterGlasses: number; // 0-8
  waterDate: string;
  cardioMinutesToday: number;
  caloriesBurnedToday: number;
  completedWorkoutIds: string[];
  completedRecipeIds: string[];
  streakDays: number;
  confidenceScore: number; // 1-10
  dailyAffirmation: string;
}

export interface LegalConsentRecord {
  hasConsented: boolean;
  termsAcceptedDate: string | null;
  signatureName: string;
  parqClearanceConfirmed: boolean;
  ipMock: string;
}
