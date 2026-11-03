import { PlanDetails } from '../types';

export const PRICING_PLANS: PlanDetails[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    price: 9.99,
    period: '/month',
    tagline: 'A clear weekly plan to get you started.',
    features: [
      'Personalised weekly meal plan',
      'Auto-generated grocery list',
      'Calorie & protein targets',
      '200+ simple recipes',
      'Offline PWA cached access',
      'Basic progress dashboard',
    ],
    buttonText: 'Start Essentials',
  },
  {
    id: 'plus',
    name: 'Plus',
    price: 19.99,
    period: '/month',
    popular: true,
    tagline: 'Trend-led eating with more flexibility.',
    features: [
      'Everything in Essentials',
      'Fibre-maxxing & high-protein tracks',
      'Swap any meal in one tap',
      'Monthly progress check-in',
      'Workout pairing with Fitness plans',
      'Body-type color styling studio',
      'Interactive cardio fat-burn timer',
    ],
    buttonText: 'Start Plus',
  },
  {
    id: 'coach',
    name: 'Coach',
    price: 34.99,
    period: '/month',
    tagline: 'A real nutritionist in your corner.',
    features: [
      'Everything in Plus',
      '1:1 nutritionist chat guidance',
      'Plan rebuilt every two weeks',
      'Allergy & medical diet support',
      'Personalized body & style analysis',
      'Priority offline sync & VIP support',
    ],
    buttonText: 'Start Coach',
  },
];
