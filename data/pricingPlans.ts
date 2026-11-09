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
    tagline: 'AI wellness guidance, when activated.',
    features: [
      'Everything in Plus',
      'AI general wellness chat (activation pending)',
      'Daily curated inspiration',
      'Dietary preferences; medical care excluded',
      'Personalized body & style analysis',
      'AI is not a licensed clinician',
    ],
    buttonText: 'Start Coach',
  },
];
