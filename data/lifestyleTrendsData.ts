export interface TrendItem {
  id: string;
  num: string;
  title: string;
  kicker: string;
  description: string;
  expandedDetails?: string;
  momentum: 'Rising' | 'Peaking' | 'Staying';
  tags: string[];
  image: string;
  meta: [string, string];
}

export interface IssueSection {
  slug: 'fashion' | 'food' | 'exercise';
  label: string;
  issue: string;
  headline: string;
  intro: string;
  accent: string;
  accentHex: string;
  metaLabels: [string, string];
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
    metaLabels: ['WEAR IT', 'INVEST'],
    promo: 'Turn these fashion trends into confident color combinations for your body type.',
    items: [
      {
        id: 'cloud-dancer-whites',
        num: '01',
        title: 'Cloud Dancer Whites',
        kicker: 'Colour of the year',
        description:
          'Soft, chalky off-white has replaced stark optic white. Head-to-toe tonal looks in cream, ecru and oat read calm and expensive without a logo in sight.',
        expandedDetails:
          'The trick is mixing textures: a ribbed knit against brushed cotton trousers, or shearling over silk. It works across every season and looks effortlessly timeless on any skin tone.',
        momentum: 'Peaking',
        tags: ['Colour', 'Minimal'],
        image:
          'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=75',
        meta: ['Tonal layering', 'Wool-knit set'],
      },
      {
        id: 'boho-grown-up',
        num: '02',
        title: 'Boho, Grown Up',
        kicker: 'Revival',
        description:
          'Suede fringe, lace insets and flowing maxi skirts are back — this time paired with sharp outerwear and clean leather, not festival glitter.',
        expandedDetails:
          'Grown-up boho prioritizes sumptuous materials: heavy caramel suede jackets, bias-cut silk skirts, and polished equestrian boots rather than synthetic festival fringe.',
        momentum: 'Peaking',
        tags: ['Revival', 'Texture'],
        image:
          'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=75',
        meta: ['Suede + crisp shirt', 'Suede jacket'],
      },
      {
        id: 'barrel-leg-denim',
        num: '03',
        title: 'Barrel-Leg Denim',
        kicker: 'Silhouette',
        description:
          'The curved, horseshoe leg has unseated the skinny and is challenging the straight. Balance the volume with a fitted knit or a cropped jacket.',
        expandedDetails:
          'The architectural balloon taper sculpts a dramatic silhouette. Wear with pointed ankle boots or low-profile loafers to show off the ankle break.',
        momentum: 'Rising',
        tags: ['Denim', 'Silhouette'],
        image:
          'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=75',
        meta: ['Ballet flat or loafer', 'Dark rinse'],
      },
      {
        id: 'circular-closets',
        num: '04',
        title: 'Circular Closets',
        kicker: 'Sustainability',
        description:
          'Resale, rental and repair have gone mainstream. Shoppers check resale value before buying, and visible mending has become a style choice.',
        expandedDetails:
          'High-end consignment and sashiko stitching are the new flex. Building a compact 20-piece capsule wardrobe that you love wearing repeatedly beats fast fashion.',
        momentum: 'Staying',
        tags: ['Sustainable', 'Mindset'],
        image:
          'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=75',
        meta: ['Buy pre-loved first', 'Repair kit'],
      },
      {
        id: 'butter-yellow-burgundy',
        num: '05',
        title: 'Butter Yellow & Burgundy',
        kicker: 'Palette',
        description:
          'Two unlikely partners dominating accessories: buttery pastel bags and deep oxblood shoes. One hit of either upgrades a neutral outfit.',
        expandedDetails:
          'Oxblood provides rich grounded weight, while pastel butter injects luminous warmth. Pair an oxblood penny loafer with a creamy butter-yellow wool scarf.',
        momentum: 'Rising',
        tags: ['Colour', 'Accessories'],
        image:
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=75',
        meta: ['One accent per look', 'Burgundy loafer'],
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
    metaLabels: ['PREP', 'EFFORT'],
    promo: 'Love these food trends? Get them as a weekly meal plan with simple healthy cooking guides.',
    items: [
      {
        id: 'fibre-maxxing',
        num: '01',
        title: 'Fibre-Maxxing',
        kicker: 'Nutrition',
        description:
          "After years of protein everything, fibre is the macro everyone's chasing. Beans, lentils, chia, oats and whole grains are piled into every bowl for gut health and longer-lasting fullness.",
        expandedDetails:
          'Aiming for 35g+ of daily plant fiber feeds key Bifidobacteria in your colon, keeping hunger signals stabilized for 5+ hours while accelerating steady fat loss.',
        momentum: 'Rising',
        tags: ['Gut health', 'Plant-forward'],
        image:
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=75',
        meta: ['20 mins', 'Easy'],
      },
      {
        id: 'swicy-everything',
        num: '02',
        title: 'Swicy Everything',
        kicker: 'Flavour',
        description:
          'Sweet heat — hot honey, chilli crisp, gochujang caramel, mango-habanero — is moving from pizza toppings into salads, cocktails and desserts.',
        expandedDetails:
          'Capsaicin from chilies boosts thermogenesis and metabolic rate, while natural honey or hot pomegranate molasses creates addictive savory complexity with zero refined sugar.',
        momentum: 'Peaking',
        tags: ['Flavour', 'Global'],
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=75',
        meta: ['10 mins', 'Easy'],
      },
      {
        id: 'protein-smaller-plates',
        num: '03',
        title: 'Protein, Smaller Plates',
        kicker: 'Portions',
        description:
          'Nutrient-dense, protein-forward dishes in smaller portions — cottage cheese bowls, tinned fish toasts, Greek yoghurt everything — built for appetites that are changing.',
        expandedDetails:
          'Micro-meals focusing on 30g+ of bioavailable protein with minimal culinary fuss. Think Portuguese sardines with lemon on seeded rye toast.',
        momentum: 'Rising',
        tags: ['High-protein', 'Quick'],
        image:
          'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=75',
        meta: ['15 mins', 'Easy'],
      },
      {
        id: 'fermented-at-home',
        num: '04',
        title: 'Fermented at Home',
        kicker: 'Gut health',
        description:
          'Kimchi, kefir, kombucha and quick pickles are being made in home kitchens. A jar on the counter is the new sourdough starter.',
        expandedDetails:
          'Unpasteurized live cultured ferments provide trillions of active probiotics that repair intestinal epithelial tight junctions and dramatically reduce systemic bloat.',
        momentum: 'Staying',
        tags: ['Gut health', 'DIY'],
        image:
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=75',
        meta: ['3 days', 'Medium'],
      },
      {
        id: 'zero-proof-rituals',
        num: '05',
        title: 'Zero-Proof Rituals',
        kicker: 'Drinks',
        description:
          "Functional sodas, botanical spritzes and adaptogen tonics have turned 'not drinking tonight' into a full menu, not a glass of water.",
        expandedDetails:
          'Replacing alcohol with ashwagandha, L-theanine, and tart cherry botanical spritzes delivers true evening relaxation without sleep disruption or dehydration.',
        momentum: 'Peaking',
        tags: ['Drinks', 'Mindful'],
        image:
          'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=75',
        meta: ['5 mins', 'Easy'],
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
    metaLabels: ['TIME', 'LEVEL'],
    promo: 'Turn these fitness trends into simple cardio routines to burn fat and build lifelong stamina.',
    items: [
      {
        id: 'strength-for-longevity',
        num: '01',
        title: 'Strength for Longevity',
        kicker: 'Training',
        description:
          'Lifting heavy is for everyone. Muscle mass and bone density are the new health markers, with two to three full-body sessions a week as the baseline.',
        expandedDetails:
          'Compound resistance movements stimulate myofibrillar hypertrophy and increase bone mineral density, insulating you against age-related frailty and insulin resistance.',
        momentum: 'Staying',
        tags: ['Strength', 'Longevity'],
        image:
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=75',
        meta: ['45 mins', 'All levels'],
      },
      {
        id: 'hybrid-racing',
        num: '02',
        title: 'Hybrid Racing',
        kicker: 'Competition',
        description:
          'Fitness races mixing running with sled pushes, wall balls and rowing are drawing huge fields. Training blocks combine engine and strength in one plan.',
        expandedDetails:
          'Hybrid conditioning builds both aerobic mitochondria and muscular resilience, creating well-rounded athletes who can run a 5K and push a 200lb sled with ease.',
        momentum: 'Rising',
        tags: ['Hybrid', 'Events'],
        image:
          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=75',
        meta: ['60 mins', 'Intermediate'],
      },
      {
        id: 'zone2-walking-pads',
        num: '03',
        title: 'Zone 2 & Walking Pads',
        kicker: 'Cardio',
        description:
          'Low-intensity, conversational-pace cardio builds an aerobic base with little wear and tear. Incline walks and under-desk treadmills make it easy to stack minutes.',
        expandedDetails:
          'Keeping heart rate at 60-70% max (Zone 2) oxidizes free fatty acids directly without stimulating hunger ghrelin. Walking 30-45 minutes burns stubborn visceral fat safely.',
        momentum: 'Peaking',
        tags: ['Cardio', 'Low impact'],
        image:
          'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=75',
        meta: ['30–45 mins', 'Beginner'],
      },
      {
        id: 'reformer-pilates',
        num: '04',
        title: 'Reformer Pilates',
        kicker: 'Studio',
        description:
          'Still the most-booked class format. Controlled, spring-loaded resistance builds deep core strength and posture — and at-home mini reformers are booming.',
        expandedDetails:
          'Spring resistance engages deep stabilizing postural muscles that typical weightlifting misses, decompressing the spine and toning the transverse abdominis.',
        momentum: 'Peaking',
        tags: ['Core', 'Low impact'],
        image:
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=75',
        meta: ['50 mins', 'All levels'],
      },
      {
        id: 'run-clubs-recovery',
        num: '05',
        title: 'Run Clubs & Recovery',
        kicker: 'Community',
        description:
          'Run clubs are the new social scene, often ending with coffee, a sauna or a cold plunge. Recovery and mobility are now scheduled, not skipped.',
        expandedDetails:
          'Social runs at a conversational pace followed by infrared sauna and cold plunge therapy improve heart rate variability (HRV) and mental wellbeing.',
        momentum: 'Rising',
        tags: ['Community', 'Recovery'],
        image:
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=75',
        meta: ['40 mins', 'Beginner'],
      },
    ],
  },
};
