export interface TrendItem {
  id: string;
  title: string;
  kicker: string;
  description: string;
  momentum: 'Rising' | 'Peaking' | 'Staying';
  tags: string[];
  image: string;
  metaLabels: string[];
  metaValues: string[];
}

export interface IssueSection {
  slug: 'fashion' | 'food' | 'exercise';
  label: string;
  issue: string;
  headline: string;
  intro: string;
  accent: string;
  accentHex: string;
  promo: string;
  items: TrendItem[];
}

export const LIFESTYLE_ISSUES: Record<string, IssueSection> = {
  fashion: {
    slug: 'fashion',
    label: 'Fashion',
    issue: '01',
    headline: 'Dress like you mean it.',
    intro:
      "Soft tailoring, warm neutrals and a wardrobe that's resold, repaired and rewound. Here's what's on rails and on the street this season.",
    accent: 'bg-[#C05A3E]',
    accentHex: '#C05A3E',
    promo: 'Turn these fashion trends into confident color combinations for your body type.',
    items: [
      {
        id: 'cloud-dancer-whites',
        title: 'Cloud Dancer Whites',
        kicker: 'Colour of the year',
        description:
          'Soft, chalky off-white has replaced stark optic white. Head-to-toe tonal looks in cream, ecru and oat read calm and expensive without a logo in sight.',
        momentum: 'Peaking',
        tags: ['Minimalism', 'Quiet Luxury', 'Tonal Dressing'],
        image:
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Vibe', 'Key Piece'],
        metaValues: ['Quiet luxury', 'Chunky oat knit'],
      },
      {
        id: 'boho-grown-up',
        title: 'Boho, Grown Up',
        kicker: 'Revival',
        description:
          'Suede fringe, lace insets and flowing maxi skirts are back — this time paired with sharp outerwear and clean leather, not festival glitter.',
        momentum: 'Peaking',
        tags: ['Suede', 'Layering', 'Parisian'],
        image:
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Vibe', 'Key Piece'],
        metaValues: ['Romantic Tailored', 'Suede jacket'],
      },
      {
        id: 'barrel-leg-denim',
        title: 'Barrel-Leg Denim',
        kicker: 'Silhouette',
        description:
          'The curved, horseshoe leg has unseated the skinny and is challenging the straight. Balance the volume with a fitted knit or a cropped jacket.',
        momentum: 'Rising',
        tags: ['Denim', 'Architecture', 'Everyday'],
        image:
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Cut', 'Pair With'],
        metaValues: ['Horseshoe curve', 'Fitted bodysuit'],
      },
      {
        id: 'circular-closets',
        title: 'Circular Closets',
        kicker: 'Sustainability',
        description:
          'Resale, rental and repair have gone mainstream. Shoppers check resale value before buying, and visible mending has become a style choice.',
        momentum: 'Staying',
        tags: ['Vintage', 'Investment', 'Longevity'],
        image:
          'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Trend', 'Action'],
        metaValues: ['Archival vintage', 'Visible mending'],
      },
      {
        id: 'butter-yellow-burgundy',
        title: 'Butter Yellow & Burgundy',
        kicker: 'Palette',
        description:
          'Two unlikely partners dominating accessories: buttery pastel bags and deep oxblood shoes. One hit of either upgrades a neutral outfit.',
        momentum: 'Rising',
        tags: ['Color Duo', 'Accessories', 'High Contrast'],
        image:
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Palette', 'Key Piece'],
        metaValues: ['Butter + Oxblood', 'Burgundy loafer'],
      },
    ],
  },
  food: {
    slug: 'food',
    label: 'Food',
    issue: '02',
    headline: 'Eat for the gut, cook for the table.',
    intro:
      "Fibre is the new protein, heat is getting sweeter, and the drinks menu is going zero-proof. The flavours and habits defining kitchens right now.",
    accent: 'bg-[#8B5E3C]',
    accentHex: '#8B5E3C',
    promo: 'Love these food trends? Get them as a weekly meal plan with simple healthy cooking guides.',
    items: [
      {
        id: 'fibre-maxxing',
        title: 'Fibre-Maxxing',
        kicker: 'Nutrition',
        description:
          "After years of protein everything, fibre is the macro everyone's chasing. Beans, lentils, chia, oats and whole grains are piled into every bowl for gut health and longer-lasting fullness.",
        momentum: 'Rising',
        tags: ['Gut Health', 'Fullness', 'Prebiotics'],
        image:
          'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Target', 'Key Food'],
        metaValues: ['35g+ daily', 'Legumes & Seeds'],
      },
      {
        id: 'swicy-everything',
        title: 'Swicy Everything',
        kicker: 'Flavour',
        description:
          'Sweet heat — hot honey, chilli crisp, gochujang caramel, mango-habanero — is moving from pizza toppings into salads, cocktails and desserts.',
        momentum: 'Peaking',
        tags: ['Sweet Heat', 'Condiments', 'Umami'],
        image:
          'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Flavour', 'Pantry Staple'],
        metaValues: ['Hot Honey + Chili Crisp', 'Gochujang'],
      },
      {
        id: 'protein-smaller-plates',
        title: 'Protein, Smaller Plates',
        kicker: 'Portions',
        description:
          'Nutrient-dense, protein-forward dishes in smaller portions — cottage cheese bowls, tinned fish toasts, Greek yoghurt everything — built for appetites that are changing.',
        momentum: 'Rising',
        tags: ['High Protein', 'Micro Meals', 'Digestive Ease'],
        image:
          'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Portion', 'Hero Item'],
        metaValues: ['Small & Dense', 'Tinned fish & Greek yogurt'],
      },
      {
        id: 'fermented-at-home',
        title: 'Fermented at Home',
        kicker: 'Gut health',
        description:
          'Kimchi, kefir, kombucha and quick pickles are being made in home kitchens. A jar on the counter is the new sourdough starter.',
        momentum: 'Staying',
        tags: ['Probiotics', 'DIY Kitchen', 'Live Cultures'],
        image:
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Prep', 'Effort'],
        metaValues: ['3-5 Days', 'Low / Set & Forget'],
      },
      {
        id: 'zero-proof-rituals',
        title: 'Zero-Proof Rituals',
        kicker: 'Drinks',
        description:
          "Functional sodas, botanical spritzes and adaptogen tonics have turned 'not drinking tonight' into a full menu, not a glass of water.",
        momentum: 'Peaking',
        tags: ['Sober Curious', 'Adaptogens', 'Botanicals'],
        image:
          'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Base', 'Benefit'],
        metaValues: ['Sparkling Botanicals', 'Better Sleep'],
      },
    ],
  },
  exercise: {
    slug: 'exercise',
    label: 'Fitness',
    issue: '03',
    headline: 'Train for the next forty years.',
    intro:
      'Longevity beats aesthetics. Strength, steady cardio and recovery have replaced punishing workouts — and fitness is now a social plan.',
    accent: 'bg-[#556B2F]',
    accentHex: '#556B2F',
    promo: 'Turn these fitness trends into simple cardio routines to burn fat and build lifelong stamina.',
    items: [
      {
        id: 'zone2-walking-pads',
        title: 'Zone 2 & Walking Pads',
        kicker: 'Cardio',
        description:
          'Low-intensity, conversational-pace cardio builds an aerobic base with little wear and tear. Incline walks and under-desk treadmills make it easy to stack minutes.',
        momentum: 'Peaking',
        tags: ['Fat Burn', 'Joint Friendly', 'Mitochondria'],
        image:
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Cadence', 'Target'],
        metaValues: ['Conversational Pace', '120-130 BPM'],
      },
      {
        id: 'strength-for-longevity',
        title: 'Strength for Longevity',
        kicker: 'Training',
        description:
          'Lifting heavy is for everyone. Muscle mass and bone density are the new health markers, with two to three full-body sessions a week as the baseline.',
        momentum: 'Staying',
        tags: ['Bone Density', 'Full Body', 'Metabolic Rate'],
        image:
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Frequency', 'Primary Lift'],
        metaValues: ['3x per week', 'Compound Squat / Hinge'],
      },
      {
        id: 'hybrid-racing',
        title: 'Hybrid Racing',
        kicker: 'Competition',
        description:
          'Fitness races mixing running with sled pushes, wall balls and rowing are drawing huge fields. Training blocks combine engine and strength in one plan.',
        momentum: 'Rising',
        tags: ['Endurance', 'HYROX', 'Athletic Conditioning'],
        image:
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Discipline', 'Focus'],
        metaValues: ['Run + Sled + Erg', 'Aerobic Capacity'],
      },
      {
        id: 'reformer-pilates',
        title: 'Reformer Pilates',
        kicker: 'Studio',
        description:
          'Still the most-booked class format. Controlled, spring-loaded resistance builds deep core strength and posture — and at-home mini reformers are booming.',
        momentum: 'Peaking',
        tags: ['Core Stability', 'Spine Health', 'Posture'],
        image:
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Resistance', 'Core Focus'],
        metaValues: ['Spring Loaded', 'Deep Transverse'],
      },
      {
        id: 'run-clubs-recovery',
        title: 'Run Clubs & Recovery',
        kicker: 'Community',
        description:
          'Run clubs are the new social scene, often ending with coffee, a sauna or a cold plunge. Recovery and mobility are now scheduled, not skipped.',
        momentum: 'Rising',
        tags: ['Social Fitness', 'Cold Plunge', 'Community'],
        image:
          'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80',
        metaLabels: ['Social Vibe', 'Post-Run'],
        metaValues: ['Easy 5K + Coffee', 'Sauna / Contrast Therapy'],
      },
    ],
  },
};
