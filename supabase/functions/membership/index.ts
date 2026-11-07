// Generated from server/supabase-entry.ts. Rebuild with npm run build:supabase.
// server/supabase-entry.ts
import { createClient } from "npm:@supabase/supabase-js@2.119.0";
import Stripe from "npm:stripe@23.1.0";

// data/recipesData.ts
var HEALTHY_RECIPES = [
  {
    id: "lemon-herb-crispy-salmon",
    title: "15-Min Sheet-Pan Lemon Herb Salmon & Charred Asparagus",
    subtitle: "High Omega-3, zero cleanup, crispy skin without heavy oils",
    prepTime: "5 min",
    cookTime: "10 min",
    difficulty: "Quick",
    category: "15-Min Meals",
    calories: 420,
    protein: 38,
    carbs: 8,
    fat: 26,
    fiber: 5,
    tags: ["Keto-Friendly", "Omega-3", "High-Protein", "Gut Health"],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate weeknight dinner: fresh salmon fillets roasted on high heat with crisp tender asparagus, seasoned with smoked sea salt, freshly cracked black pepper, garlic powder, and roasted lemon slices.",
    ingredients: [
      "2 wild salmon fillets (6 oz each, skin on)",
      "1 bundle fresh green asparagus, woody ends snapped off",
      "1 tbsp extra virgin olive oil or avocado oil",
      "1 organic lemon (half sliced, half for juicing)",
      "2 cloves garlic, finely minced",
      "1/2 tsp smoked paprika",
      "Flaky sea salt & coarse black pepper to taste"
    ],
    instructions: [
      "Preheat your oven to 425\xB0F (220\xB0C) and line a baking sheet with parchment paper.",
      "Pat salmon fillets completely dry with a paper towel (this guarantees maximum crispiness).",
      "Toss asparagus with half the olive oil, minced garlic, sea salt, and black pepper directly on the sheet pan.",
      "Place salmon skin-side down next to the vegetables. Brush with remaining olive oil and dust with smoked paprika.",
      "Layer thin lemon slices over the salmon fillets.",
      "Roast for 10-12 minutes until salmon flakes gently with a fork and asparagus tips are slightly caramelized.",
      "Squeeze fresh lemon juice over everything before serving."
    ],
    simpleCookingHacks: [
      "Paper towel trick: Always pat fish completely dry before roasting to lock in juices and avoid soggy textures.",
      "Oven caramelization: Slicing lemons and roasting them alongside creates a natural citrus reduction that replaces sugar-laden sauces."
    ],
    swaps: [
      { original: "Salmon", healthierAlternative: "Firm organic tofu steaks or wild cod" },
      { original: "Asparagus", healthierAlternative: "Broccolini or French green beans" }
    ]
  },
  {
    id: "fiber-max-mediterranean-chickpea-bowl",
    title: "Gut-Health Mediterranean Power Bowl (Fibre-Maxxing)",
    subtitle: "Packed with 16g prebiotic fiber to support microbiome & satiety",
    prepTime: "10 min",
    cookTime: "0 min",
    difficulty: "Easy",
    category: "Fiber-Maxxing",
    calories: 460,
    protein: 22,
    carbs: 56,
    fat: 16,
    fiber: 16,
    tags: ["Fiber-Maxxing", "Plant-Protein", "Heart-Healthy", "Anti-Inflammatory"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    description: "Rich in dietary fiber and resistant starches, this bowl stabilizes blood sugar and keeps you full for over 5 hours without post-meal fatigue.",
    ingredients: [
      "1 can (15 oz) chickpeas, rinsed and drained",
      "1 cup Persian cucumbers, diced",
      "1 cup ripe cherry tomatoes, halved",
      "1/3 cup Kalamata olives, pitted and sliced",
      "1/4 cup red onion, thinly sliced (soaked in cold water to tame bite)",
      "2 tbsp toasted pumpkin seeds (pepitas)",
      "2 tbsp crumbled Greek sheep\u2019s milk feta",
      "Dressing: 1.5 tbsp extra virgin olive oil, 1 tbsp raw apple cider vinegar, 1 tsp dried oregano, pinch of salt"
    ],
    instructions: [
      "In a wide shallow bowl, combine rinsed chickpeas, diced cucumbers, and juicy cherry tomatoes.",
      "Whisk dressing ingredients in a small ramekin until emulsified.",
      "Pour dressing over chickpeas and vegetables; toss thoroughly so the beans absorb the oregano and vinegar.",
      "Top with sliced Kalamata olives, soaked red onion, and crumbled feta.",
      "Sprinkle toasted pumpkin seeds for crunch and extra zinc and magnesium."
    ],
    simpleCookingHacks: [
      "Quick Onion Pickle Hack: Soaking sliced red onions in cold water or lemon juice for 5 minutes removes the pungent sulfur bite.",
      "Prebiotic boost: Eating legumes combined with raw vegetables feeds Bifidobacteria in your gut, decreasing cravings."
    ],
    swaps: [
      { original: "Chickpeas", healthierAlternative: "Black lentils or edamame" },
      { original: "Feta cheese", healthierAlternative: "Creamy avocado chunks (dairy-free)" }
    ]
  },
  {
    id: "golden-turmeric-chicken-skillet",
    title: "One-Skillet Golden Turmeric & Ginger Chicken Breast",
    subtitle: "Juicy tender chicken infused with anti-inflammatory aromatics",
    prepTime: "8 min",
    cookTime: "12 min",
    difficulty: "Easy",
    category: "High-Protein",
    calories: 390,
    protein: 44,
    carbs: 6,
    fat: 20,
    fiber: 3,
    tags: ["High-Protein", "Anti-Inflammatory", "Low-Carb", "Immunity"],
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    description: "Transform chicken breast into a melt-in-your-mouth feast using ginger, turmeric, and lime. Eliminates dryness forever.",
    ingredients: [
      "2 large pasture-raised chicken breasts (sliced horizontally into thin cutlets)",
      "1 tbsp cold-pressed avocado oil",
      "1 tsp ground turmeric powder",
      "1 tbsp fresh ginger, finely grated",
      "2 cloves garlic, finely minced",
      "1/2 cup organic low-sodium bone broth",
      "Juice of 1 fresh lime",
      "Fresh cilantro or flat-leaf parsley for garnish"
    ],
    instructions: [
      "Slice chicken breasts horizontally in half to create cutlets of uniform thickness (cooks evenly in half the time).",
      "Season cutlets with turmeric, sea salt, black pepper (crucial to activate turmeric curcumin), and grated ginger.",
      "Heat avocado oil in a cast iron or heavy stainless skillet over medium-high heat until shimmering.",
      "Sear chicken undisturbed for 4 minutes until a golden crust develops, flip and cook 3 minutes on the reverse side.",
      "Pour bone broth and fresh lime juice into the skillet to deglaze the pan drippings, simmering for 1 minute.",
      "Garnish with fresh cilantro and spoon the golden pan jus over the chicken."
    ],
    simpleCookingHacks: [
      "The Cutlet Technique: Never cook thick chicken breasts whole; slicing them into cutlets cooks them in 6 minutes and prevents drying out.",
      "Curcumin Activation: Always pair turmeric with a crack of black pepper\u2014piperine boosts turmeric absorption by 2,000%."
    ],
    swaps: [
      { original: "Chicken breast", healthierAlternative: "Organic turkey cutlets or extra-firm pressed tofu" }
    ]
  },
  {
    id: "sweet-potato-protein-waffles-bowl",
    title: "Caramelized Cinnamon Sweet Potato & Greek Yogurt Bowl",
    subtitle: "Natural energizing carbs with 30g slow-digesting casein protein",
    prepTime: "5 min",
    cookTime: "10 min",
    difficulty: "Quick",
    category: "Low-Cal Comfort",
    calories: 380,
    protein: 32,
    carbs: 48,
    fat: 6,
    fiber: 8,
    tags: ["Post-Workout", "High-Protein", "Sweet Tooth", "No Added Sugar"],
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
    description: "Curb sweet cravings naturally with roasted cinnamon sweet potato rounds topped with velvety high-protein Greek yogurt and berries.",
    ingredients: [
      "1 medium sweet potato, scrubbed and sliced into 1/4-inch rounds",
      "1 cup 0% or 2% plain Greek yogurt (or skyr)",
      "1/2 cup fresh or thawed wild blueberries",
      "1 tsp Ceylon cinnamon",
      "1 tbsp crushed walnuts or chia seeds",
      "1/2 tsp vanilla extract"
    ],
    instructions: [
      "Toss sweet potato rounds with a dusting of cinnamon and microwave for 3 minutes or air-fry for 8 minutes at 390\xB0F until tender and caramelized.",
      "Mix Greek yogurt with vanilla extract in a wide bowl.",
      "Arrange warm sweet potato rounds alongside the cool yogurt.",
      "Top with antioxidant-rich blueberries and sprinkle with walnuts or chia seeds."
    ],
    simpleCookingHacks: [
      "Microwave Steaming: Piercing and microwaving sweet potatoes before air frying cuts total cooking time from 40 minutes down to 8 minutes.",
      "Ceylon vs Cassia: Use true Ceylon cinnamon for gentle blood sugar regulation without coumarin toxicity."
    ],
    swaps: [
      { original: "Greek yogurt", healthierAlternative: "Coconut protein yogurt or silk tofu whip" },
      { original: "Sweet potato", healthierAlternative: "Roasted butternut squash cubes" }
    ]
  },
  {
    id: "roasted-sheet-pan-rainbow-veggies",
    title: "Sheet-Pan Rainbow Cruciferous Crunch & Tahini Drizzle",
    subtitle: "Detoxifying sulforaphane-rich roast with creamy sesame garlic sauce",
    prepTime: "10 min",
    cookTime: "18 min",
    difficulty: "Easy",
    category: "1-Pan Roasts",
    calories: 290,
    protein: 11,
    carbs: 24,
    fat: 18,
    fiber: 10,
    tags: ["Gut Health", "Cruciferous", "Vegan", "Meal Prep"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    description: "Purple cabbage, broccoli florets, and orange carrots roasted until nutty and sweet, drizzled with mineral-rich lemon tahini.",
    ingredients: [
      "2 cups broccoli florets, cut into bite-sized pieces",
      "2 cups purple cabbage, chopped into thick ribbons",
      "2 rainbow carrots, sliced into coins",
      "1 tbsp cold-pressed olive oil",
      "2 tbsp raw sesame tahini",
      "1 tbsp warm water (to thin dressing)",
      "1 tbsp fresh lemon juice",
      "1 pinch sea salt, garlic powder & cumin"
    ],
    instructions: [
      "Preheat oven to 425\xB0F (220\xB0C).",
      "Spread broccoli, cabbage, and carrots across a large sheet pan with room to breathe (crowding causes steaming instead of roasting).",
      "Drizzle with olive oil, salt, garlic powder, and cumin.",
      "Roast for 18 minutes, shaking the pan once halfway, until edges are beautifully charred and caramelized.",
      "Whisk tahini, lemon juice, warm water, and a pinch of salt until silky and pourable.",
      "Drizzle tahini over roasted veggies while piping hot."
    ],
    simpleCookingHacks: [
      "Cruciferous Hack: Chop broccoli 20 minutes before cooking to maximize sulforaphane production, a potent antioxidant enzyme.",
      "Space on Pan: Giving vegetables space allows moisture to evaporate rapidly, producing roasted sweetness instead of limp textures."
    ],
    swaps: [
      { original: "Tahini", healthierAlternative: "Whipped avocado lime dressing" }
    ]
  }
];

// data/cardioData.ts
var CARDIO_ROUTINES = [
  {
    id: "zone2-fat-burn-walk",
    title: "Zone 2 Metabolic Power Walk (LISS Fat Oxidation)",
    level: "Beginner",
    category: "LISS Walking",
    durationMin: 25,
    caloriesBurn: 185,
    targetBPMZone: "110 - 130 BPM (60-70% Max HR)",
    whyItBurnsFat: "Zone 2 cardio operates at the exact cellular intensity where mitochondria utilize free fatty acids as their primary fuel substrate instead of glucose. Unlike strenuous sprints that spike cortisol and drive intense appetite cravings, Zone 2 sustains high fat oxidation while keeping joint impact virtually zero.",
    equipment: "Comfortable sneakers, optional light handheld weights or walking outdoors/treadmill",
    jointSafety: "Zero-impact. Gentle on hips, knees, and ankles; preserves connective tissue.",
    formTips: [
      "Maintain an upright posture: pull your shoulders back and down, keeping ears aligned over shoulders.",
      "Brisk heel-to-toe stride with active arm swing bent at 90 degrees.",
      'The "Talk Test": You should be able to speak full sentences without gasping for air.'
    ],
    intervals: [
      {
        phase: "Warm-Up Stroll",
        durationSec: 180,
        description: "Easy rhythmic pace to lubricate synovial joints and elevate body temperature.",
        targetHeartRate: "95-105 BPM"
      },
      {
        phase: "Zone 2 Steady Tempo Pace",
        durationSec: 900,
        description: "Brisk, purposeful stride. Focus on rhythmic nasal breathing and engaging your glutes.",
        targetHeartRate: "115-128 BPM"
      },
      {
        phase: "Incline / Power Stride Surge",
        durationSec: 300,
        description: "Slightly accelerate cadence or add a slight hill/treadmill incline (3-4%) without breaking into a run.",
        targetHeartRate: "125-135 BPM"
      },
      {
        phase: "Cool-Down & Decompression",
        durationSec: 120,
        description: "Gentle walk with deep diaphragmatic belly breaths to lower sympathetic nervous activation.",
        targetHeartRate: "100 BPM"
      }
    ]
  },
  {
    id: "living-room-low-impact-shred",
    title: "Living Room Zero-Jump Cardio Burner",
    level: "Beginner",
    category: "Low-Impact Home",
    durationMin: 18,
    caloriesBurn: 165,
    targetBPMZone: "120 - 140 BPM",
    whyItBurnsFat: "Designed specifically for apartments and sensitive knees. Continuous multi-planar bodyweight movements recruit large muscle groups (quads, lats, glutes) to elevate metabolic rate for hours post-workout (EPOC effect) with zero jarring impact on joints.",
    equipment: "Yoga mat or carpeted floor, water bottle",
    jointSafety: "100% low-impact. No jumps, no burpees, no hard floor collisions.",
    formTips: [
      "Brace your core like someone is about to poke your stomach.",
      "Keep knees softly bent and aligned with your second toe during side steps.",
      "Control every movement; speed without control compromises posture."
    ],
    intervals: [
      {
        phase: "Shoulder Rolls & Torso Twist Reach",
        durationSec: 120,
        description: "Gentle rotational reaches and calf raises to awaken the core and calves.",
        targetHeartRate: "100-110 BPM"
      },
      {
        phase: "Low-Impact Step Jacks",
        durationSec: 180,
        description: "Step right foot out while sweeping arms overhead; return and repeat on left side. No jumping.",
        targetHeartRate: "120-130 BPM"
      },
      {
        phase: "Standing Knee-to-Elbow Marches",
        durationSec: 180,
        description: "Drive knee up toward opposite elbow, engaging obliques and hip flexors.",
        targetHeartRate: "125-135 BPM"
      },
      {
        phase: "Speed Skater Taps (Low Glide)",
        durationSec: 180,
        description: "Step laterally from side to side in a mini-squat, tapping back foot behind without bouncing.",
        targetHeartRate: "130-140 BPM"
      },
      {
        phase: "Standing Boxer Punches & Duck",
        durationSec: 180,
        description: "Quick jab-cross punches while keeping a light rhythmic knee bounce.",
        targetHeartRate: "125-135 BPM"
      },
      {
        phase: "Full Body Standing Stretch",
        durationSec: 120,
        description: "Reach high, side body bends, hamstring sweeps to finish.",
        targetHeartRate: "95-105 BPM"
      }
    ]
  },
  {
    id: "post-meal-glucose-walk",
    title: "Post-Meal 12-Minute Glucose Clearance Stroll",
    level: "All Levels",
    category: "Metabolic Stroll",
    durationMin: 12,
    caloriesBurn: 85,
    targetBPMZone: "100 - 115 BPM",
    whyItBurnsFat: "Contracting skeletal muscles immediately after eating translocates GLUT4 glucose transporters to cell surfaces independently of insulin. Clinical research shows a 10-15 minute walk within 30 minutes of a meal blunts postprandial blood sugar spikes by up to 35%, stopping excess carbs from being shunted into adipose fat storage.",
    equipment: "Any casual shoes, indoors or outdoors",
    jointSafety: "Extremely gentle; promotes digestion and reduces abdominal bloating.",
    formTips: [
      "Take relaxed, natural strides.",
      "Focus on nasal breathing (4 seconds in, 4 seconds out).",
      "Do this within 20 to 40 minutes after lunch or dinner."
    ],
    intervals: [
      {
        phase: "Digestive Stroll Phase 1",
        durationSec: 360,
        description: "Easy leisurely walk. Let the abdominal organs settle and activate venous return.",
        targetHeartRate: "95-105 BPM"
      },
      {
        phase: "Purposeful Stride Phase 2",
        durationSec: 360,
        description: "Slightly pick up speed to a comfortable clip. Engage your glutes on the push-off.",
        targetHeartRate: "105-115 BPM"
      }
    ]
  },
  {
    id: "micro-hiit-fat-burner",
    title: "15-Minute Micro-Cardio Tabata (Gentle Intervals)",
    level: "Intermediate",
    category: "Fat-Burn HIIT",
    durationMin: 15,
    caloriesBurn: 190,
    targetBPMZone: "135 - 155 BPM",
    whyItBurnsFat: "Alternates 30 seconds of moderate exertion with 30 seconds of active recovery. This protocol triggers mitochondrial biogenesis and stimulates catecholamines (epinephrine), which unlock stubborn visceral fat stores for energy while keeping total workout time under 15 minutes.",
    equipment: "Yoga mat, gym shoes",
    jointSafety: "Moderate; includes low-impact modifications for all movements.",
    formTips: [
      "Breathe through exertion\u2014never hold your breath.",
      "During recovery phases, do not sit down; keep walking slowly in place."
    ],
    intervals: [
      {
        phase: "Dynamic Warm-Up (Hip Openers & High Knees)",
        durationSec: 180,
        description: "Warm the major muscle groups and get heart rate up gradually.",
        targetHeartRate: "110-120 BPM"
      },
      {
        phase: "Fast Mountain Climbers / Incline Wall Climbers",
        durationSec: 150,
        description: "30s on, 30s walk in place. Drive knees forward with strong planks.",
        targetHeartRate: "140-150 BPM"
      },
      {
        phase: "Shadow Boxing Shuffle",
        durationSec: 150,
        description: "30s on, 30s walk in place. Quick combinations engage core and upper back.",
        targetHeartRate: "135-145 BPM"
      },
      {
        phase: "Bodyweight Squat to Heel Raise",
        durationSec: 150,
        description: "30s on, 30s walk in place. Drive through heels, raise on toes at top.",
        targetHeartRate: "130-145 BPM"
      },
      {
        phase: "Active Flush & Cooldown Walk",
        durationSec: 180,
        description: "Slow deep breathing, gentle arm drops, heart rate recovery.",
        targetHeartRate: "100-110 BPM"
      }
    ]
  }
];

// data/fashionData.ts
var COLOR_SEASONS = [
  {
    season: "Warm Autumn",
    undertone: "warm",
    tagline: "Rich, earthy, golden, and grounded",
    description: "Brings out rich golden and peach undertones. Avoid frosty cool pastels; embrace terracotta, rich camel, spiced olive, and burnt caramel.",
    bestJewelry: "Brushed yellow gold, brass, rich amber, and warm copper",
    colors: [
      { name: "Terracotta Rust", hex: "#C05A3E", textDark: false, role: "Accent" },
      { name: "Warm Camel", hex: "#C19A6B", textDark: false, role: "Base" },
      { name: "Deep Olive", hex: "#556B2F", textDark: false, role: "Base" },
      { name: "Spiced Mustard", hex: "#E1AD01", textDark: true, role: "Accent" },
      { name: "Warm Cream / Oat", hex: "#F5EFEB", textDark: true, role: "Neutral" },
      { name: "Espresso Bean", hex: "#362B28", textDark: false, role: "Contrast" }
    ]
  },
  {
    season: "Cool Winter",
    undertone: "cool",
    tagline: "High contrast, dramatic, jewel-toned, and crisp",
    description: "Thrives on high contrast and saturated cool jewel tones. Looks radiant in obsidian black, snowy crisp white, royal cobalt, and ruby berry.",
    bestJewelry: "Polished platinum, white gold, sterling silver, and diamonds",
    colors: [
      { name: "Royal Sapphire", hex: "#0F52BA", textDark: false, role: "Accent" },
      { name: "Obsidian Midnight", hex: "#111317", textDark: false, role: "Base" },
      { name: "Deep Berry Ruby", hex: "#9B111E", textDark: false, role: "Accent" },
      { name: "Cool Slate Grey", hex: "#708090", textDark: false, role: "Neutral" },
      { name: "Crisp Snow White", hex: "#F8F9FA", textDark: true, role: "Contrast" },
      { name: "Emerald Velvet", hex: "#046307", textDark: false, role: "Accent" }
    ]
  },
  {
    season: "Fresh Spring",
    undertone: "warm",
    tagline: "Luminous, clear, peachy, and revitalizing",
    description: "Radiates with luminous clarity. Warms up naturally with soft coral, buttermilk yellow, light sage green, and warm navy.",
    bestJewelry: "Polished light yellow gold, rose gold, and pearls",
    colors: [
      { name: "Living Coral", hex: "#FF6F61", textDark: false, role: "Accent" },
      { name: "Warm Honey Cream", hex: "#F9E4B7", textDark: true, role: "Neutral" },
      { name: "Light Sage Green", hex: "#9CAF88", textDark: true, role: "Base" },
      { name: "Sunlit Buttermilk", hex: "#FFF1BA", textDark: true, role: "Accent" },
      { name: "Warm Nautical Navy", hex: "#1B3B6F", textDark: false, role: "Base" },
      { name: "Apricot Peach", hex: "#FBCEB1", textDark: true, role: "Accent" }
    ]
  },
  {
    season: "Soft Summer",
    undertone: "cool",
    tagline: "Muted, elegant, smoky rose, and calming",
    description: "Softened with cool grey or blue undertones. Radiates effortless chic in dusty mauve, faded denim blue, soft rose taupe, and sea salt.",
    bestJewelry: "Brushed sterling silver, antique pewter, and rose gold",
    colors: [
      { name: "Dusty Mauve", hex: "#915C83", textDark: false, role: "Accent" },
      { name: "Smoky Slate Blue", hex: "#6C7A89", textDark: false, role: "Base" },
      { name: "Rose Taupe", hex: "#905D5D", textDark: false, role: "Neutral" },
      { name: "Sea Salt Off-White", hex: "#EEF0F2", textDark: true, role: "Contrast" },
      { name: "Muted Lavender Mist", hex: "#BDB0D0", textDark: true, role: "Accent" },
      { name: "Charcoal Plum", hex: "#4A3B4E", textDark: false, role: "Base" }
    ]
  }
];
var BODY_SHAPE_STYLING = [
  {
    shape: "hourglass",
    label: "Hourglass Proportion",
    description: "Bust and hips are harmoniously balanced with a defined waistline.",
    keyGoal: "Celebrate your natural waistline without hiding your organic symmetry.",
    heroSilhouettes: [
      "Wrap dresses & wrap tops that cinch naturally at the narrowest waist point",
      "High-waisted tailored wide-leg trousers paired with fitted bodysuits",
      "Fitted blazers with single-button closure at waist",
      "V-neck, sweetheart, and scoop necklines that elongate the neck"
    ],
    colorPlacementStrategy: "Wear monochromatic or tonal color palettes with contrasting waist detailing (e.g., a darker belt or color-blocked waist seam) to visually draw eyes to the center axis.",
    outfitFormulas: [
      {
        title: "Elevated Monochromatic Power Suit",
        occasion: "Executive / Workwear",
        pieces: ["Warm Camel belted tailored blazer", "Matching high-waisted fluid trousers", "Fitted ivory silk knit cami"],
        paletteRecommendation: "Warm Autumn: Camel + Oat + Espresso details",
        confidenceBooster: "Monochrome elongates the vertical line while the belted blazer anchors waist definition."
      },
      {
        title: "Effortless Wrap & Drape Weekend",
        occasion: "Casual & Dinner",
        pieces: ["Midi wrap dress in terracotta or slate blue", "Minimalist nude leather pointed mules", "Structured crossbody bag"],
        paletteRecommendation: "Terracotta Rust & Sand",
        confidenceBooster: "The wrap creates gentle dynamic movement as you walk, highlighting graceful posture."
      }
    ],
    dos: [
      "Embrace fitted or semi-fitted cuts that skim the body",
      "Use high-waisted pants that hit above the pelvic bone",
      "Choose soft, fluid fabrics that drape (modal, silk, fine merino, viscose)"
    ],
    avoid: [
      "Boxy, shapeless oversized shift dresses that mask waist symmetry",
      "Stiff heavy drop-shoulder coats without waist cinching",
      "Ruffles or heavy embellishments concentrated solely on the chest"
    ]
  },
  {
    shape: "pear",
    label: "Pear / Triangle Silhouette",
    description: "Hips and thighs are wider than shoulders, with an elegant neck, arms, and defined waist.",
    keyGoal: "Draw focus upward to the neckline and collarbones while creating fluid, elongated lines over hips.",
    heroSilhouettes: [
      "A-line skirts and dresses that skim the hips without clinging",
      "Boatneck, square-neck, and off-the-shoulder tops to visually broaden shoulders",
      "Dark-wash, clean-front straight or wide-leg pants",
      "Structured shoulder jackets that hit right at the hip bone"
    ],
    colorPlacementStrategy: "High-contrast rule: Place your brightest accent colors and patterns on the top half (torso, collar, sleeves), and wear grounding darker neutral bases on bottom (navy, espresso, charcoal).",
    outfitFormulas: [
      {
        title: "Luminous Top + Streamlined Tonal Bottom",
        occasion: "Smart Casual",
        pieces: ["Living Coral or Mustard boatneck ribbed sweater", "Dark espresso or raw denim straight trousers", "Pointed almond-toe boot"],
        paletteRecommendation: "Accent top + Neutral dark base",
        confidenceBooster: "The eye travels naturally to your smile and neckline, framing posture beautifully."
      },
      {
        title: "Modern A-Line Flow & Structured Crop Jacket",
        occasion: "Evening Social",
        pieces: ["Deep olive A-line bias skirt", "Fitted cream square-neck top", "Cropped structured blazer hitting at waist"],
        paletteRecommendation: "Deep Olive + Warm Cream + Gold accents",
        confidenceBooster: "Gives effortless Parisian chic with complete freedom of movement."
      }
    ],
    dos: [
      "Wear eye-catching statement earrings, scarves, and necklaces",
      "Select pants with a clean flat front and back pockets with minimal bulk",
      "Choose puff or gathered sleeve blouses to balance proportions"
    ],
    avoid: [
      "Skinny jeans in light pastel washes that bunch at the ankle",
      "Tops that terminate directly at the widest point of the hips",
      "Heavy cargo pockets or horizontal stripes across hips and thighs"
    ]
  },
  {
    shape: "rectangle",
    label: "Rectangle / Athletic Frame",
    description: "Shoulders, waist, and hips are aligned in a sleek, athletic vertical column.",
    keyGoal: "Create visual curves, dimensional volume, and dynamic diagonal lines.",
    heroSilhouettes: [
      "Belted trench coats and tie-waist paperbag trousers",
      "Pleated trousers, cowl necks, and bias-cut skirts",
      "Peplum tops and fit-and-flare dresses",
      "Asymmetric hemlines and one-shoulder statement tops"
    ],
    colorPlacementStrategy: "Color blocking and diagonal contrast: Pair contrasting top and bottom colors with a bold belt, or wear diagonally draped patterns to break straight lines into feminine curves.",
    outfitFormulas: [
      {
        title: "Architectural Layered Tailoring",
        occasion: "Smart Casual / Meetings",
        pieces: ["High-waisted paperbag trousers with belt", "Crisp white collared shirt with popped lapel", "Cashmere crewneck draped over shoulders"],
        paletteRecommendation: "Cool Slate + Crisp White + Royal Sapphire accent",
        confidenceBooster: "Crisp geometric layers create rich sculptural dimension on an athletic frame."
      },
      {
        title: "Asymmetric Fluid Drape",
        occasion: "Cocktails & Events",
        pieces: ["One-shoulder emerald or dusty mauve draped dress", "Delicate metallic strappy heels", "Sculptural cuff bracelet"],
        paletteRecommendation: "Emerald Velvet or Dusty Mauve",
        confidenceBooster: "Diagonal asymmetry highlights toned arms and collarbones effortlessly."
      }
    ],
    dos: [
      "Play with volume: puffy sleeves, ruffles, or pleating",
      "Use contrasting belts to carve out waist definition",
      "Layer jackets over cropped knit tops to build depth"
    ],
    avoid: [
      "Head-to-toe ultra-stiff linear tailoring with zero waist taper",
      "Straight vertical column dresses with no belt or waist break"
    ]
  },
  {
    shape: "inverted_triangle",
    label: "Inverted Triangle Frame",
    description: "Shoulders and chest are broad or athletic, tapering to a slender waist, hips, and toned legs.",
    keyGoal: "Soften the shoulder line and add volume and movement to the lower half.",
    heroSilhouettes: [
      "V-neck, halter, and deep scoop tops that draw gaze vertically inward",
      "Wide-leg Palazzo trousers, cargo pants, and pleated midi skirts",
      "Drop-waist and flared skater dresses",
      "Raglan sleeves and unpadded unconstructed soft knit jackets"
    ],
    colorPlacementStrategy: "Inverted contrast rule: Keep top garments in muted, darker, or matte monochrome tones (navy, slate, black), and feature bold prints, lighter colors, or texture on the lower half to anchor balance.",
    outfitFormulas: [
      {
        title: "Soft Drape Top + Palazzo Movement",
        occasion: "Daytime / Weekend Chic",
        pieces: ["Matte black or espresso deep V-neck knit", "High-waisted pleated wide-leg trousers in warm camel or cream", "Chunky woven slides"],
        paletteRecommendation: "Darker top + Lighter luminous bottom",
        confidenceBooster: "The flowing trousers create romantic movement, balancing athletic shoulders."
      },
      {
        title: "Vertical Elongator Outfit",
        occasion: "Dinner / Date Night",
        pieces: ["Halter-neck fluid satin top in dusty mauve", "Tailored flared trousers", "Long vertical pendant necklace"],
        paletteRecommendation: "Dusty Mauve + Charcoal Plum",
        confidenceBooster: "Halter line naturally narrows the visual width across the deltoids."
      }
    ],
    dos: [
      "Showcase your fantastic legs with slit skirts or tailored shorts",
      "Add volume to the hips with side pockets, pleats, or flares",
      "Choose soft sloping shoulder lines rather than structured pads"
    ],
    avoid: [
      "Puff shoulder tops, epaulettes, or boatnecks that widen shoulders",
      "Tops with horizontal necklines or heavy shoulder embellishments"
    ]
  },
  {
    shape: "apple",
    label: "Apple / Oval Silhouette",
    description: "Fuller torso and midsection with shapely legs, toned calves, and attractive bust.",
    keyGoal: "Elongate the vertical torso line and highlight slender arms and gorgeous legs.",
    heroSilhouettes: [
      "Empire waist and elevated A-line silhouettes that float gently over the midriff",
      "Open-front vertical duster cardigans and longline tailored blazers",
      "V-neck tunics with side slits paired with slim-fit ankle pants",
      "Wrap dresses that tie just below the bust line"
    ],
    colorPlacementStrategy: "Vertical column dressing: Wear an unbroken monochrome base inside (e.g. all-navy or all-black) with an open unbuttoned jacket or long cardigan in a complementary accent color to carve a slimming central vertical column.",
    outfitFormulas: [
      {
        title: "Vertical Column Duster & Ankle Slim Trouser",
        occasion: "Chic Everyday / Travel",
        pieces: ["Deep Navy V-neck top", "Matching Navy ankle-crop slim trousers", "Open lightweight longline duster in Warm Camel or Olive", "Pointed loafers"],
        paletteRecommendation: "Navy inner column + Camel outer duster",
        confidenceBooster: "Creates two clean vertical boundary lines that immediately elongate your figure."
      },
      {
        title: "Floating Empire Flutter Dress",
        occasion: "Brunch & Garden Events",
        pieces: ["Empire cut midi dress in jewel sapphire or terracotta", "Wedge espadrilles showing toned ankles", "Dainty layered gold necklaces"],
        paletteRecommendation: "Royal Sapphire or Terracotta",
        confidenceBooster: "Brings attention to the d\xE9colletage and calves while draping with zero constriction."
      }
    ],
    dos: [
      "Highlight legs with ankle-baring hemlines and elegant footwear",
      "Leave jackets, vests, and dusters unbuttoned for vertical lines",
      "Choose breathable, drape-heavy fabrics (viscose, fine linen blends)"
    ],
    avoid: [
      "Tight, clingy cling-wrap fabrics across the midriff",
      "High-rise stiff jeans with bulky button flys that dig into waist",
      "Wide belts worn tightly across the widest part of the stomach"
    ]
  }
];

// data/lifestyleTrendsData.ts
var LIFESTYLE_ISSUES = {
  fashion: {
    slug: "fashion",
    label: "Fashion",
    issue: "01",
    headline: "Dress like you mean it.",
    intro: "Soft tailoring, warm neutrals and a wardrobe that's resold, repaired and rewound. Here's what's on rails and on the street this season.",
    accent: "bg-[#C05A3E]",
    accentHex: "#C05A3E",
    metaLabels: ["WEAR IT", "INVEST"],
    promo: "Turn these fashion trends into confident color combinations for your body type.",
    items: [
      {
        id: "cloud-dancer-whites",
        num: "01",
        title: "Cloud Dancer Whites",
        kicker: "Colour of the year",
        description: "Soft, chalky off-white has replaced stark optic white. Head-to-toe tonal looks in cream, ecru and oat read calm and expensive without a logo in sight.",
        expandedDetails: "The trick is mixing textures: a ribbed knit against brushed cotton trousers, or shearling over silk. It works across every season and looks effortlessly timeless on any skin tone.",
        momentum: "Peaking",
        tags: ["Colour", "Minimal"],
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=75",
        meta: ["Tonal layering", "Wool-knit set"]
      },
      {
        id: "boho-grown-up",
        num: "02",
        title: "Boho, Grown Up",
        kicker: "Revival",
        description: "Suede fringe, lace insets and flowing maxi skirts are back \u2014 this time paired with sharp outerwear and clean leather, not festival glitter.",
        expandedDetails: "Grown-up boho prioritizes sumptuous materials: heavy caramel suede jackets, bias-cut silk skirts, and polished equestrian boots rather than synthetic festival fringe.",
        momentum: "Peaking",
        tags: ["Revival", "Texture"],
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=75",
        meta: ["Suede + crisp shirt", "Suede jacket"]
      },
      {
        id: "barrel-leg-denim",
        num: "03",
        title: "Barrel-Leg Denim",
        kicker: "Silhouette",
        description: "The curved, horseshoe leg has unseated the skinny and is challenging the straight. Balance the volume with a fitted knit or a cropped jacket.",
        expandedDetails: "The architectural balloon taper sculpts a dramatic silhouette. Wear with pointed ankle boots or low-profile loafers to show off the ankle break.",
        momentum: "Rising",
        tags: ["Denim", "Silhouette"],
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=75",
        meta: ["Ballet flat or loafer", "Dark rinse"]
      },
      {
        id: "circular-closets",
        num: "04",
        title: "Circular Closets",
        kicker: "Sustainability",
        description: "Resale, rental and repair have gone mainstream. Shoppers check resale value before buying, and visible mending has become a style choice.",
        expandedDetails: "High-end consignment and sashiko stitching are the new flex. Building a compact 20-piece capsule wardrobe that you love wearing repeatedly beats fast fashion.",
        momentum: "Staying",
        tags: ["Sustainable", "Mindset"],
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=75",
        meta: ["Buy pre-loved first", "Repair kit"]
      },
      {
        id: "butter-yellow-burgundy",
        num: "05",
        title: "Butter Yellow & Burgundy",
        kicker: "Palette",
        description: "Two unlikely partners dominating accessories: buttery pastel bags and deep oxblood shoes. One hit of either upgrades a neutral outfit.",
        expandedDetails: "Oxblood provides rich grounded weight, while pastel butter injects luminous warmth. Pair an oxblood penny loafer with a creamy butter-yellow wool scarf.",
        momentum: "Rising",
        tags: ["Colour", "Accessories"],
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=75",
        meta: ["One accent per look", "Burgundy loafer"]
      }
    ]
  },
  food: {
    slug: "food",
    label: "Food",
    issue: "02",
    headline: "Eat for the gut, cook for the table.",
    intro: "Fibre is the new protein, heat is getting sweeter, and the drinks menu is going zero-proof. The flavours and habits defining kitchens right now.",
    accent: "bg-[#8B5E3C]",
    accentHex: "#8B5E3C",
    metaLabels: ["PREP", "EFFORT"],
    promo: "Love these food trends? Get them as a weekly meal plan with simple healthy cooking guides.",
    items: [
      {
        id: "fibre-maxxing",
        num: "01",
        title: "Fibre-Maxxing",
        kicker: "Nutrition",
        description: "After years of protein everything, fibre is the macro everyone's chasing. Beans, lentils, chia, oats and whole grains are piled into every bowl for gut health and longer-lasting fullness.",
        expandedDetails: "Aiming for 35g+ of daily plant fiber feeds key Bifidobacteria in your colon, keeping hunger signals stabilized for 5+ hours while accelerating steady fat loss.",
        momentum: "Rising",
        tags: ["Gut health", "Plant-forward"],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=75",
        meta: ["20 mins", "Easy"]
      },
      {
        id: "swicy-everything",
        num: "02",
        title: "Swicy Everything",
        kicker: "Flavour",
        description: "Sweet heat \u2014 hot honey, chilli crisp, gochujang caramel, mango-habanero \u2014 is moving from pizza toppings into salads, cocktails and desserts.",
        expandedDetails: "Capsaicin from chilies boosts thermogenesis and metabolic rate, while natural honey or hot pomegranate molasses creates addictive savory complexity with zero refined sugar.",
        momentum: "Peaking",
        tags: ["Flavour", "Global"],
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=75",
        meta: ["10 mins", "Easy"]
      },
      {
        id: "protein-smaller-plates",
        num: "03",
        title: "Protein, Smaller Plates",
        kicker: "Portions",
        description: "Nutrient-dense, protein-forward dishes in smaller portions \u2014 cottage cheese bowls, tinned fish toasts, Greek yoghurt everything \u2014 built for appetites that are changing.",
        expandedDetails: "Micro-meals focusing on 30g+ of bioavailable protein with minimal culinary fuss. Think Portuguese sardines with lemon on seeded rye toast.",
        momentum: "Rising",
        tags: ["High-protein", "Quick"],
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=75",
        meta: ["15 mins", "Easy"]
      },
      {
        id: "fermented-at-home",
        num: "04",
        title: "Fermented at Home",
        kicker: "Gut health",
        description: "Kimchi, kefir, kombucha and quick pickles are being made in home kitchens. A jar on the counter is the new sourdough starter.",
        expandedDetails: "Unpasteurized live cultured ferments provide trillions of active probiotics that repair intestinal epithelial tight junctions and dramatically reduce systemic bloat.",
        momentum: "Staying",
        tags: ["Gut health", "DIY"],
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=75",
        meta: ["3 days", "Medium"]
      },
      {
        id: "zero-proof-rituals",
        num: "05",
        title: "Zero-Proof Rituals",
        kicker: "Drinks",
        description: "Functional sodas, botanical spritzes and adaptogen tonics have turned 'not drinking tonight' into a full menu, not a glass of water.",
        expandedDetails: "Replacing alcohol with ashwagandha, L-theanine, and tart cherry botanical spritzes delivers true evening relaxation without sleep disruption or dehydration.",
        momentum: "Peaking",
        tags: ["Drinks", "Mindful"],
        image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=75",
        meta: ["5 mins", "Easy"]
      }
    ]
  },
  exercise: {
    slug: "exercise",
    label: "Fitness",
    issue: "03",
    headline: "Train for the next forty years.",
    intro: "Longevity beats aesthetics. Strength, steady cardio and recovery have replaced punishing workouts \u2014 and fitness is now a social plan.",
    accent: "bg-[#556B2F]",
    accentHex: "#556B2F",
    metaLabels: ["TIME", "LEVEL"],
    promo: "Turn these fitness trends into simple cardio routines to burn fat and build lifelong stamina.",
    items: [
      {
        id: "strength-for-longevity",
        num: "01",
        title: "Strength for Longevity",
        kicker: "Training",
        description: "Lifting heavy is for everyone. Muscle mass and bone density are the new health markers, with two to three full-body sessions a week as the baseline.",
        expandedDetails: "Compound resistance movements stimulate myofibrillar hypertrophy and increase bone mineral density, insulating you against age-related frailty and insulin resistance.",
        momentum: "Staying",
        tags: ["Strength", "Longevity"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=75",
        meta: ["45 mins", "All levels"]
      },
      {
        id: "hybrid-racing",
        num: "02",
        title: "Hybrid Racing",
        kicker: "Competition",
        description: "Fitness races mixing running with sled pushes, wall balls and rowing are drawing huge fields. Training blocks combine engine and strength in one plan.",
        expandedDetails: "Hybrid conditioning builds both aerobic mitochondria and muscular resilience, creating well-rounded athletes who can run a 5K and push a 200lb sled with ease.",
        momentum: "Rising",
        tags: ["Hybrid", "Events"],
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=75",
        meta: ["60 mins", "Intermediate"]
      },
      {
        id: "zone2-walking-pads",
        num: "03",
        title: "Zone 2 & Walking Pads",
        kicker: "Cardio",
        description: "Low-intensity, conversational-pace cardio builds an aerobic base with little wear and tear. Incline walks and under-desk treadmills make it easy to stack minutes.",
        expandedDetails: "Keeping heart rate at 60-70% max (Zone 2) oxidizes free fatty acids directly without stimulating hunger ghrelin. Walking 30-45 minutes burns stubborn visceral fat safely.",
        momentum: "Peaking",
        tags: ["Cardio", "Low impact"],
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=75",
        meta: ["30\u201345 mins", "Beginner"]
      },
      {
        id: "reformer-pilates",
        num: "04",
        title: "Reformer Pilates",
        kicker: "Studio",
        description: "Still the most-booked class format. Controlled, spring-loaded resistance builds deep core strength and posture \u2014 and at-home mini reformers are booming.",
        expandedDetails: "Spring resistance engages deep stabilizing postural muscles that typical weightlifting misses, decompressing the spine and toning the transverse abdominis.",
        momentum: "Peaking",
        tags: ["Core", "Low impact"],
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=75",
        meta: ["50 mins", "All levels"]
      },
      {
        id: "run-clubs-recovery",
        num: "05",
        title: "Run Clubs & Recovery",
        kicker: "Community",
        description: "Run clubs are the new social scene, often ending with coffee, a sauna or a cold plunge. Recovery and mobility are now scheduled, not skipped.",
        expandedDetails: "Social runs at a conversational pace followed by infrared sauna and cold plunge therapy improve heart rate variability (HRV) and mental wellbeing.",
        momentum: "Rising",
        tags: ["Community", "Recovery"],
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=75",
        meta: ["40 mins", "Beginner"]
      }
    ]
  }
};

// data/memberExpansion.ts
var recipeSeeds = [
  { id: "masoor-dal-spinach", title: "Red Lentil & Spinach Dal", subtitle: "An Indian-inspired one-pot lentil bowl with warm spices.", prep: 10, cook: 25, category: "1-Pan Roasts", ingredients: ["70 g dry red lentils, rinsed", "200 ml water, plus more as needed", "1 small tomato, chopped", "30 g spinach", "1 tsp olive oil", "\xBC tsp cumin", "\xBC tsp turmeric", "Lemon juice to taste"], steps: ["Warm oil in a saucepan and stir in cumin and turmeric for 20 seconds.", "Add lentils, tomato and water. Bring to a simmer.", "Cook gently for 20\u201325 minutes, stirring and adding water until the lentils are soft.", "Stir in spinach until wilted. Finish with lemon and season to taste."], nutrition: [340, 19, 48, 7, 11], tags: ["Plant-forward", "Indian-inspired", "Lentils"] },
  { id: "tofu-vegetable-rice", title: "Ginger Tofu & Vegetable Rice", subtitle: "A colourful skillet with familiar, flexible ingredients.", prep: 10, cook: 15, category: "15-Min Meals", ingredients: ["150 g firm tofu, drained and cubed", "100 g cooked rice", "150 g mixed vegetables, chopped", "1 tsp grated ginger", "1 tsp neutral oil", "1 tsp reduced-sodium soy sauce", "Lime wedge"], steps: ["Heat oil in a skillet and cook tofu for 6\u20138 minutes, turning until lightly golden.", "Add vegetables and ginger. Cook until the vegetables reach your preferred texture.", "Add cooked rice and soy sauce. Stir until thoroughly heated.", "Serve with lime. Check sauce labels for ingredients that suit your dietary needs."], nutrition: [430, 24, 48, 16, 6], tags: ["Plant-forward", "Quick", "Tofu"] },
  { id: "black-bean-tacos", title: "Black Bean & Avocado Tacos", subtitle: "An easy bean filling with a fresh, bright finish.", prep: 10, cook: 10, category: "15-Min Meals", ingredients: ["120 g canned black beans, drained and rinsed", "2 small corn tortillas", "\xBC avocado, sliced", "1 small tomato, diced", "\xBC tsp cumin", "Lime juice", "A small handful of shredded lettuce"], steps: ["Warm beans with cumin and a splash of water for 5\u20137 minutes.", "Warm tortillas according to the pack instructions.", "Divide beans, lettuce, tomato and avocado between the tortillas.", "Finish with lime. Add chopped herbs if you have them."], nutrition: [390, 14, 53, 15, 14], tags: ["Plant-forward", "Quick", "Beans"] },
  { id: "overnight-berry-oats", title: "Berry & Yogurt Overnight Oats", subtitle: "Prepare a breakfast jar in a few quiet minutes.", prep: 8, cook: 0, category: "High-Protein", ingredients: ["40 g rolled oats", "100 g plain Greek yogurt", "80 ml milk or a suitable alternative", "60 g berries", "1 tsp chia seeds", "Cinnamon to taste"], steps: ["Mix oats, yogurt, milk and chia in a clean covered container.", "Refrigerate overnight, following storage guidance on your dairy products.", "Stir before eating and add a little more milk if you prefer a softer texture.", "Top with berries and cinnamon. Choose suitable dairy or plant-based ingredients for your needs."], nutrition: [330, 19, 44, 9, 8], tags: ["Breakfast", "Vegetarian", "Make-ahead"] },
  { id: "lemon-white-bean-salad", title: "Lemon White Bean & Herb Salad", subtitle: "A Mediterranean-inspired lunch with no stove required.", prep: 12, cook: 0, category: "Fiber-Maxxing", ingredients: ["150 g canned white beans, drained and rinsed", "\xBD cucumber, diced", "1 small tomato, diced", "1 tsp olive oil", "1 tbsp lemon juice", "A handful of chopped parsley", "1 slice whole-grain bread, optional"], steps: ["Combine beans, cucumber, tomato and parsley in a bowl.", "Whisk olive oil with lemon juice.", "Toss the dressing through the beans and vegetables.", "Serve with bread if desired. Keep refrigerated until ready to eat."], nutrition: [360, 17, 52, 9, 13], tags: ["Plant-forward", "Mediterranean-inspired", "No-cook"] },
  { id: "sweet-potato-black-bean-tray", title: "Sweet Potato & Black Bean Tray", subtitle: "Roasted vegetables and beans with a lime finish.", prep: 10, cook: 30, category: "1-Pan Roasts", ingredients: ["150 g sweet potato, diced", "100 g canned black beans, drained and rinsed", "\xBD red pepper, sliced", "1 tsp olive oil", "\xBC tsp smoked paprika", "Lime juice", "Fresh coriander, optional"], steps: ["Heat the oven to 200\xB0C / 390\xB0F.", "Toss sweet potato and pepper with oil and paprika on a baking tray.", "Roast for 25 minutes, turning once, until tender.", "Add beans for the final 5 minutes to heat through. Finish with lime and herbs."], nutrition: [380, 13, 64, 9, 14], tags: ["Plant-forward", "Tray meal", "Beans"] },
  { id: "peanut-sesame-noodles", title: "Sesame & Crunchy Vegetable Noodles", subtitle: "A fast noodle bowl with a tangy sesame dressing.", prep: 10, cook: 10, category: "15-Min Meals", ingredients: ["60 g dry noodles", "100 g shredded cabbage and carrots", "60 g shelled cooked edamame", "1 tsp sesame paste (tahini)", "1 tsp reduced-sodium soy sauce", "1 tbsp lime juice", "Water to loosen the dressing"], steps: ["Cook noodles according to the pack instructions and drain.", "Prepare edamame as directed on the pack.", "Whisk sesame paste, soy sauce, lime and a little water into a dressing.", "Toss the noodles with vegetables, edamame and dressing. Contains sesame and soy; choose ingredients accordingly."], nutrition: [420, 19, 61, 12, 9], tags: ["Plant-forward", "Quick", "Noodles"] },
  { id: "chickpea-spinach-wrap", title: "Chickpea, Yogurt & Spinach Wrap", subtitle: "A simple lunch with texture, greens and a little lemon.", prep: 12, cook: 0, category: "15-Min Meals", ingredients: ["100 g canned chickpeas, drained and rinsed", "1 whole-grain wrap", "2 tbsp plain yogurt", "A small handful of spinach", "\xBC cucumber, chopped", "1 tsp lemon juice", "Ground pepper to taste"], steps: ["Lightly mash chickpeas with yogurt, lemon and pepper.", "Spread the mixture down the centre of the wrap.", "Add spinach and cucumber.", "Fold in the sides and roll tightly. Refrigerate if not eating straight away."], nutrition: [410, 17, 61, 11, 12], tags: ["Vegetarian", "Quick", "Lunch"] },
  { id: "tomato-lentil-soup", title: "Tomato & Lentil Soup", subtitle: "A comforting pot of vegetables, lentils and herbs.", prep: 10, cook: 30, category: "Low-Cal Comfort", ingredients: ["60 g dry red lentils, rinsed", "200 g canned chopped tomatoes", "\xBD carrot, diced", "\xBC onion, diced", "1 tsp olive oil", "300 ml water or suitable reduced-sodium stock", "Dried oregano to taste"], steps: ["Warm oil in a saucepan and soften onion and carrot for 5 minutes.", "Add lentils, tomatoes, water or stock, and oregano.", "Simmer for 25\u201330 minutes until lentils and vegetables are soft. Add water as needed.", "Serve as is or blend carefully once it has cooled slightly."], nutrition: [320, 17, 48, 8, 12], tags: ["Plant-forward", "Soup", "Lentils"] },
  { id: "vegetable-poha", title: "Vegetable Poha with Peas", subtitle: "An Indian-inspired rice-flake dish for a flexible breakfast or lunch.", prep: 10, cook: 15, category: "15-Min Meals", ingredients: ["50 g thick poha (flattened rice)", "50 g peas", "\xBD small onion, chopped", "\xBD carrot, finely diced", "1 tsp neutral oil", "\xBC tsp mustard seeds", "A pinch of turmeric", "Lemon juice to taste"], steps: ["Rinse poha briefly in a sieve and let it soften; follow the pack guidance for its thickness.", "Warm oil in a pan, add mustard seeds carefully, then onion and carrot. Cook until softened.", "Add peas and turmeric with a small splash of water and cook until the peas are ready.", "Fold in poha and warm gently. Finish with lemon and season to taste."], nutrition: [320, 8, 54, 9, 6], tags: ["Plant-forward", "Indian-inspired", "Quick"] }
];
var MEMBER_RECIPES = [...HEALTHY_RECIPES, ...recipeSeeds.map((seed) => ({
  id: seed.id,
  title: seed.title,
  subtitle: seed.subtitle,
  prepTime: `${seed.prep} min`,
  cookTime: `${seed.cook} min`,
  difficulty: "Easy",
  category: seed.category,
  calories: seed.nutrition[0],
  protein: seed.nutrition[1],
  carbs: seed.nutrition[2],
  fat: seed.nutrition[3],
  fiber: seed.nutrition[4],
  tags: seed.tags,
  image: seed.tags.includes("Breakfast") ? "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80" : "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  description: `${seed.subtitle} Makes approximately one serving. Nutrition figures are illustrative estimates and vary with brands, amounts and substitutions. Check labels and allergens.`,
  ingredients: seed.ingredients,
  instructions: seed.steps,
  simpleCookingHacks: ["Read the ingredient list before starting.", "Adjust seasonings and portions to your own preferences."],
  swaps: [{ original: "Listed vegetables", healthierAlternative: "Use seasonal vegetables you enjoy; cooking times may change." }]
}))];
var MEAL_COLLECTIONS = [
  { id: "all", name: "All recipes", description: "Explore the complete collection, then build your own week.", recipeIds: MEMBER_RECIPES.map((r) => r.id) },
  { id: "plant-forward", name: "Plant-forward", description: "Meals built around beans, lentils, tofu, grains and vegetables. Check each recipe\u2019s ingredients and allergens.", recipeIds: ["masoor-dal-spinach", "tofu-vegetable-rice", "black-bean-tacos", "lemon-white-bean-salad", "sweet-potato-black-bean-tray", "peanut-sesame-noodles", "tomato-lentil-soup", "vegetable-poha"] },
  { id: "weeknight", name: "Weeknight quick", description: "Short recipes for busy days, including no-cook options. Prep and cook times are listed separately.", recipeIds: ["tofu-vegetable-rice", "black-bean-tacos", "lemon-white-bean-salad", "peanut-sesame-noodles", "chickpea-spinach-wrap", "vegetable-poha"] },
  { id: "indian", name: "Indian-inspired", description: "Lentils, rice flakes and warming spices, with room for your regional preferences.", recipeIds: ["masoor-dal-spinach", "vegetable-poha", "golden-turmeric-chicken-skillet"] },
  { id: "mediterranean", name: "Mediterranean-inspired", description: "Herbs, vegetables, legumes and a bright lemon finish. A recipe collection, not a prescribed diet.", recipeIds: ["lemon-white-bean-salad", "fiber-max-mediterranean-chickpea-bowl", "lemon-herb-crispy-salmon", "roasted-sheet-pan-rainbow-veggies"] }
];
var routineSeeds = [
  { id: "comfortable-ten-minute-walk", title: "10-Minute Comfortable Walk", minutes: 10, equipment: "Comfortable shoes and a clear, level route", phases: [["Easy start", 120, "Begin at a comfortable, unhurried pace."], ["Your walking rhythm", 360, "Walk at a pace that feels appropriate for you. Slow down whenever needed."], ["Easy finish", 120, "Gradually return to an easy pace."]] },
  { id: "desk-break-movement", title: "8-Minute Desk-Break Reset", minutes: 8, equipment: "A stable chair and clear space", phases: [["Settle and breathe", 120, "Sit or stand comfortably. Gently move your shoulders through a comfortable range."], ["Easy movement break", 240, "Alternate gentle seated or standing marching with pauses. Keep movements comfortable."], ["Unhurried finish", 120, "Move slowly and return to a comfortable resting position."]] },
  { id: "seated-movement-option", title: "10-Minute Seated Movement Option", minutes: 10, equipment: "A stable, non-wheeled chair", phases: [["Easy seated start", 120, "Sit upright with support as needed and begin comfortable ankle movements."], ["Gentle seated rhythm", 360, "Alternate easy seated marching and relaxed arm movements. Pause whenever needed."], ["Slow finish", 120, "Reduce movement gradually. This is a general option, not rehabilitation advice."]] },
  { id: "easy-indoor-march", title: "12-Minute Indoor March & Step", minutes: 12, equipment: "Clear floor space and comfortable footwear", phases: [["Easy march", 180, "Start with a small, comfortable march in place."], ["March and side-step", 360, "Alternate easy marching and small side-steps at your own pace."], ["Slow down", 180, "Reduce your pace gradually and stop when ready."]] },
  { id: "walk-and-pause", title: "15-Minute Walk & Pause", minutes: 15, equipment: "A clear, level walking route with places to rest", phases: [["Easy start", 180, "Walk gently and check how you feel."], ["Comfortable walk", 240, "Continue at a pace that suits you."], ["Optional rest", 60, "Pause or move slowly. Extend the rest if needed."], ["Comfortable return", 240, "Continue only if comfortable."], ["Easy finish", 180, "Slow down and finish at your own pace."]] },
  { id: "standing-mobility-break", title: "10-Minute Standing Mobility Break", minutes: 10, equipment: "A clear area and a stable support if needed", phases: [["Settle into movement", 120, "Stand comfortably near a stable support. Move within an easy range."], ["Small comfortable movements", 360, "Try gentle shoulder movements, heel lifts or small weight shifts. Skip anything uncomfortable."], ["Easy finish", 120, "Reduce movement and return to a comfortable resting position."]] }
];
var MEMBER_ROUTINES = [...CARDIO_ROUTINES.map((routine) => ({ ...routine, whyItBurnsFat: "Choose a duration and intensity that suit your experience. General movement routines do not predict individual weight-loss or calorie-burn outcomes.", jointSafety: "Adjust or skip uncomfortable movements. Stop for pain, dizziness or unusual discomfort. Seek qualified advice about suitability when needed." })), ...routineSeeds.map((seed) => ({ id: seed.id, title: seed.title, level: "Beginner", category: "Low-Impact Home", durationMin: seed.minutes, caloriesBurn: 0, targetBPMZone: "Comfortable effort; no prescribed BPM", whyItBurnsFat: "A general movement option to fit into your day. Start gradually and choose a pace appropriate for your experience. This routine does not promise a particular calorie burn or weight-loss result.", equipment: seed.equipment, jointSafety: "Use a comfortable range of motion. Stop for pain, dizziness or unusual discomfort. Ask a qualified professional about suitability if you have a condition, disability, pregnancy or injury.", formTips: ["Use a clear area and stable support where appropriate.", "Take breaks and adjust the duration to your needs.", "Skip movements that do not feel comfortable."], intervals: seed.phases.map(([phase, durationSec, description]) => ({ phase, durationSec, description, targetHeartRate: "Your comfortable pace" })) }))];
var EXTRA_PALETTES = [
  { season: "Earth & Linen", undertone: "warm", tagline: "Easy, earthy shades for everyday combinations.", colors: [{ name: "Linen", hex: "#E9DFC8", textDark: true, role: "Base" }, { name: "Terracotta", hex: "#B85B3D", textDark: false, role: "Accent" }, { name: "Olive", hex: "#586447", textDark: false, role: "Neutral" }, { name: "Saffron", hex: "#D7A746", textDark: true, role: "Contrast" }], description: "Use these colours as optional inspiration. Your comfort and preferences matter more than palette rules.", bestJewelry: "Try gold, brass, silver or whatever you enjoy wearing." },
  { season: "Coastal Slate", undertone: "cool", tagline: "Soft blues, chalk and a little sea-glass green.", colors: [{ name: "Chalk", hex: "#F1F1EB", textDark: true, role: "Base" }, { name: "Slate", hex: "#536A7A", textDark: false, role: "Neutral" }, { name: "Sea Glass", hex: "#9BBDB7", textDark: true, role: "Accent" }, { name: "Deep Blue", hex: "#233D56", textDark: false, role: "Contrast" }], description: "Build an outfit around a light base and introduce darker shades in layers or accessories.", bestJewelry: "Silver or mixed metals are optional starting points." },
  { season: "City Neutrals", undertone: "neutral", tagline: "Versatile tones that can follow you through the week.", colors: [{ name: "Oat", hex: "#D6CDBA", textDark: true, role: "Base" }, { name: "Ink", hex: "#282D30", textDark: false, role: "Contrast" }, { name: "Stone", hex: "#A8A59D", textDark: true, role: "Neutral" }, { name: "Soft White", hex: "#F7F4EC", textDark: true, role: "Accent" }], description: "Repeat these colours across different textures for a simple personal uniform.", bestJewelry: "Choose metals and accessories that reflect your own style." },
  { season: "Berry & Rose", undertone: "cool", tagline: "A gentle rose base with deeper berry accents.", colors: [{ name: "Dusty Rose", hex: "#D7B4BC", textDark: true, role: "Base" }, { name: "Berry", hex: "#753B54", textDark: false, role: "Accent" }, { name: "Charcoal", hex: "#393A43", textDark: false, role: "Neutral" }, { name: "Pearl", hex: "#EFE9E4", textDark: true, role: "Contrast" }], description: "Introduce a berry accessory or layer to change the feeling of a familiar outfit.", bestJewelry: "Pearl, silver or your favourite accessories can all work." }
];
var MEMBER_PALETTES = [...COLOR_SEASONS, ...EXTRA_PALETTES];
var MEMBER_STYLING = BODY_SHAPE_STYLING.map((style) => ({ ...style, outfitFormulas: [...style.outfitFormulas, { title: "Relaxed everyday layers", occasion: "Everyday", pieces: ["A comfortable base you already like", "An unstructured overshirt or light layer", "Footwear suited to your day"], paletteRecommendation: "Try City Neutrals or any palette you enjoy.", confidenceBooster: "Treat silhouette suggestions as options, not rules about your body." }, { title: "A simple evening switch", occasion: "Evening", pieces: ["Your favourite simple outfit", "A layer in a contrasting texture", "One accessory that feels personal"], paletteRecommendation: "Use a deeper accent from a favourite palette.", confidenceBooster: "Keep the fit and movement that make you feel comfortable." }] }));
var OUTFIT_LOOKS = [
  { id: "linen-weekend", title: "Linen weekend", occasion: "Weekend", climate: "Warm weather", pieces: ["Linen shirt", "Relaxed trousers", "Comfortable sandals"], colours: ["Linen", "Olive", "Terracotta"], note: "Adjust fabrics and coverage to your climate and preferences." },
  { id: "city-workday", title: "City workday", occasion: "Work", climate: "Layer-friendly", pieces: ["Simple knit or tee", "Unstructured jacket", "Tailored or relaxed trousers"], colours: ["Ink", "Oat", "Soft White"], note: "Adapt the level of formality to your workplace." },
  { id: "coastal-everyday", title: "Coastal everyday", occasion: "Everyday", climate: "Warm weather", pieces: ["Cotton base", "Lightweight shirt", "Your favourite denim"], colours: ["Chalk", "Slate", "Sea Glass"], note: "Use colour combinations as inspiration, not a shopping list." },
  { id: "berry-evening", title: "Berry evening", occasion: "Evening", climate: "All-season", pieces: ["A favourite dark base", "Berry-toned layer or accessory", "Footwear you enjoy wearing"], colours: ["Berry", "Charcoal", "Pearl"], note: "One accent can change an outfit without replacing the whole look." },
  { id: "cool-weather-layers", title: "Cool-weather layers", occasion: "Everyday", climate: "Cool weather", pieces: ["Comfortable base layer", "Textured knit", "Weather-appropriate outerwear"], colours: ["Stone", "Ink", "Oat"], note: "Choose warmth and comfort before any styling suggestion." },
  { id: "easy-friday", title: "Easy Friday", occasion: "Work", climate: "All-season", pieces: ["Plain shirt or tee", "A relaxed layer", "Comfortable trousers"], colours: ["Soft White", "Olive", "Ink"], note: "Repeat a familiar formula with a different texture." },
  { id: "market-morning", title: "Market morning", occasion: "Weekend", climate: "All-season", pieces: ["An easy top", "Comfortable bottoms", "Practical bag and shoes"], colours: ["Terracotta", "Linen", "Stone"], note: "Style can be practical and personal at the same time." },
  { id: "evening-textures", title: "Evening textures", occasion: "Evening", climate: "Cool weather", pieces: ["A soft knit or shirt", "A contrasting layer", "One favourite accessory"], colours: ["Deep Blue", "Pearl", "Dusty Rose"], note: "Use what you own before deciding whether you need something new." }
];
var CLASSIC_ISSUES = structuredClone(LIFESTYLE_ISSUES);
var additions = {
  food: [["Flexible plant-forward plates", "Build around beans, lentils, grains and vegetables, then adapt ingredients to your preferences.", "Explore the plant-forward meal collection and use the weekly planner to make it practical."], ["Weeknight food, with less friction", "Short ingredient lists and simple preparation can help a meal fit around a busy day.", "The quick collection includes no-cook bean salads, wraps and easy skillet ideas."], ["Familiar flavours, different kitchens", "Use local staples and seasonal vegetables to make an idea your own.", "Explore Indian-inspired and Mediterranean-inspired recipe collections without treating either as a prescribed diet."]],
  fashion: [["Your everyday outfit formula", "Repeat a comfortable combination with a different colour, texture or layer.", "The lookbook offers eight starting points for work, weekends and evenings."], ["Dress for your actual weather", "Warmth, breathability, coverage and comfort can guide an outfit before a trend does.", "Use climate notes in the lookbook to adapt ideas to your surroundings."], ["A palette you can play with", "Colour is a creative tool, not a rule about how you should look.", "Explore four additional palettes, then use the shades you enjoy most."]],
  exercise: [["Small movement windows", "A short, comfortable movement break can be a practical starting point.", "Choose a ten-minute walk, desk-break reset or indoor march and adjust it to your needs."], ["Seated options and your own pace", "Movement ideas should leave room for different experiences and abilities.", "The seated routine is a general educational option, not rehabilitation or individualized exercise advice."], ["Consistency without pressure", "Begin gradually, take breaks and notice which activities fit your day.", "Use interval timers as prompts rather than requirements, and stop for discomfort."]]
};
for (const [section, items] of Object.entries(additions)) {
  const issue = CLASSIC_ISSUES[section];
  issue.items.push(...items.map(([title, description, expandedDetails], index) => ({ id: `classic-${section}-extra-${index}`, num: String(issue.items.length + index + 1).padStart(2, "0"), title, kicker: "Member edit", description, expandedDetails, momentum: "Staying", tags: ["members", "self-guided"], image: section === "food" ? "/images/food.jpg" : section === "fashion" ? "/images/style.jpg" : "/images/move.jpg", meta: [section === "food" ? "Flexible meals" : section === "fashion" ? "Personal style" : "Your pace", "Members"] })));
}

// data/memberGuides.ts
var MEMBER_PROGRAMS = [
  { id: "everyday-foundations", title: "Everyday foundations", description: "Four weeks of small, repeatable food and movement habits.", weeks: [{ title: "Make room", steps: ["Choose one meal to plan in advance.", "Pick a comfortable movement break.", "Write down what made your routine easier."] }, { title: "Find your rhythm", steps: ["Plan three meals from your recipe library.", "Make one grocery list before shopping.", "Repeat a comfortable activity on two days."] }, { title: "Make it yours", steps: ["Swap one ingredient for a local seasonal option.", "Adjust your routine around work or family.", "Notice which habits you actually enjoy."] }, { title: "Keep what works", steps: ["Choose the two habits you want to keep.", "Plan your next week with realistic time slots.", "Review your notes without judging a missed day."] }] },
  { id: "kitchen-confidence", title: "Kitchen confidence", description: "A practical four-week path from an empty plan to a calmer kitchen.", weeks: [{ title: "Start simply", steps: ["Choose two familiar recipes.", "Read the ingredient lists before shopping.", "Set aside one short cooking window."] }, { title: "Build your basics", steps: ["Keep a list of staples you use often.", "Try a recipe with a different grain or legume.", "Write down an ingredient substitution you liked."] }, { title: "Reduce friction", steps: ["Prepare a grocery list from your weekly plan.", "Group pantry items before cooking.", "Use the recipe timer to work at a comfortable pace."] }, { title: "Create your rotation", steps: ["Keep your favourite recipes in your next plan.", "Leave room for a meal out or a flexible day.", "Export your week and adjust as needed."] }] },
  { id: "personal-style", title: "Your style, your way", description: "Four weeks of outfit exploration using what you already own.", weeks: [{ title: "Observe", steps: ["Pick three outfits you love wearing.", "Notice their recurring colours and textures.", "Choose comfort and personal preference as your starting point."] }, { title: "Experiment", steps: ["Explore one palette in the colour studio.", "Try a new combination using existing clothes.", "Photograph an outfit for your own reference."] }, { title: "Simplify", steps: ["Build two repeatable outfit formulas.", "Adapt them for your local weather.", "Set aside a piece to repair or restyle."] }, { title: "Repeat", steps: ["Keep the combinations that feel like you.", "Make a thoughtful list before buying anything.", "Use trends as optional inspiration."] }] }
];

// server/api.ts
var PLANS = {
  essentials: { name: "Essentials", amount: 999 },
  plus: { name: "Plus", amount: 1999 },
  coach: { name: "Complete", amount: 3499 }
};
var productId = (tier) => `lifestylehub_${tier}_v1`;
var lookupKey = (tier) => `lifestylehub_${tier}_monthly_usd_v1`;
var HttpError = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
var json = (body, status = 200) => Response.json(body, {
  status,
  headers: { "Cache-Control": "private, no-store", "Vary": "Cookie", "X-Content-Type-Options": "nosniff" }
});
function requireTier(value) {
  if (typeof value !== "string" || !Object.hasOwn(PLANS, value)) throw new HttpError(400, "Choose a valid membership plan.");
  return value;
}
function isMissingResource(error) {
  return error instanceof Error && "code" in error && error.code === "resource_missing";
}
async function ensurePrice(stripe2, tier) {
  const plan = PLANS[tier];
  const prices = await stripe2.prices.list({ active: true, lookup_keys: [lookupKey(tier)], limit: 1 });
  if (prices.data[0]) {
    const price2 = prices.data[0];
    if (price2.unit_amount !== plan.amount || price2.currency !== "usd" || price2.recurring?.interval !== "month" || price2.recurring.interval_count !== 1 || price2.product !== productId(tier)) {
      throw new HttpError(503, "The billing catalog needs attention. Please contact support.");
    }
    return price2.id;
  }
  try {
    await stripe2.products.retrieve(productId(tier));
  } catch (error) {
    if (!isMissingResource(error)) throw error;
    await stripe2.products.create({ id: productId(tier), name: `LifestyleHub ${plan.name}`, metadata: { app: "lifestylehub", tier } }, { idempotencyKey: `lh-product-${tier}-v1` });
  }
  const price = await stripe2.prices.create({ product: productId(tier), unit_amount: plan.amount, currency: "usd", recurring: { interval: "month" }, lookup_key: lookupKey(tier) }, { idempotencyKey: `lh-price-${tier}-v1` });
  return price.id;
}
function createApi(deps) {
  async function customerFor(user, create = false) {
    const store = deps.getStore();
    const key2 = `customers/${user.id}`;
    const saved = await store.get(key2, { type: "json" });
    if (saved) return saved.id;
    if (!create) return null;
    const customer = await deps.getStripe().customers.create({ email: user.email, name: user.name, metadata: { app: "lifestylehub", identity_user_id: user.id } }, { idempotencyKey: `lh-customer-${user.id}` });
    const result = await store.setJSON(key2, { id: customer.id }, { onlyIfNew: true });
    if (result.modified) return customer.id;
    const winner = await store.get(key2, { type: "json" });
    if (!winner) throw new HttpError(503, "Your billing account could not be saved. Please try again.");
    return winner.id;
  }
  async function membership(user, customer) {
    if (!customer) return null;
    const subscriptions = await deps.getStripe().subscriptions.list({ customer, status: "all", limit: 100, expand: ["data.latest_invoice"] });
    for (const sub of subscriptions.data) {
      if (sub.status !== "active" || sub.metadata.identity_user_id !== user.id || sub.metadata.app !== "lifestylehub") continue;
      const item = sub.items.data[0];
      const tier = Object.keys(PLANS).find((t) => item?.price.product === productId(t));
      const invoice = sub.latest_invoice;
      if (!tier || sub.items.data.length !== 1 || item.quantity !== 1 || item.price.unit_amount !== PLANS[tier].amount || item.price.currency !== "usd" || item.price.recurring?.interval !== "month" || item.price.recurring.interval_count !== 1 || item.current_period_end * 1e3 <= Date.now() || typeof invoice !== "object" || !invoice || invoice.status !== "paid") continue;
      return { isActive: true, tier, subscribedAt: new Date(sub.created * 1e3).toISOString(), customerName: user.name || "", customerEmail: user.email || "", paymentMethod: "Managed securely by Stripe", invoiceId: invoice.number || invoice.id, autoRenew: !sub.cancel_at_period_end, currentPeriodEnd: new Date(item.current_period_end * 1e3).toISOString() };
    }
    return null;
  }
  return async (request) => {
    try {
      const path = new URL(request.url).pathname.replace(/^\/(?:api|\.netlify\/functions\/api)\/?/, "");
      const routes = { me: "GET", checkout: "POST", portal: "POST", "checkout-status": "POST", content: "GET" };
      if (!routes[path]) throw new HttpError(404, "API endpoint not found.");
      if (request.method !== routes[path]) return new Response(null, { status: 405, headers: { Allow: routes[path], "Cache-Control": "no-store" } });
      if (request.method === "POST") {
        if (request.headers.get("origin") !== deps.origin) throw new HttpError(403, "Please submit this request from LifestyleHub.");
        if (!request.headers.get("content-type")?.startsWith("application/json")) throw new HttpError(415, "Expected JSON.");
        if (Number(request.headers.get("content-length") || 0) > 8192) throw new HttpError(413, "Request too large.");
      }
      const user = await deps.getUser();
      if (!user?.id || !user.email || !user.confirmedAt) throw new HttpError(401, "Sign in with a confirmed email address to continue.");
      const customer = await customerFor(user);
      const sub = await membership(user, customer);
      if (path === "me") return json({ user: { id: user.id, name: user.name || "", email: user.email }, subscription: sub });
      if (path === "content") {
        if (!sub) throw new HttpError(403, "An active paid membership is required.");
        const kind = new URL(request.url).searchParams.get("kind");
        if (kind === "recipes") return json({ recipes: MEMBER_RECIPES, collections: MEAL_COLLECTIONS });
        if (kind === "classic-food") return json({ issue: CLASSIC_ISSUES.food, recipes: MEMBER_RECIPES, collections: MEAL_COLLECTIONS });
        if (!["plus", "coach"].includes(sub.tier)) throw new HttpError(403, "This feature requires Plus or Complete membership.");
        if (kind === "workouts") return json({ routines: MEMBER_ROUTINES });
        if (kind === "classic-exercise") return json({ issue: CLASSIC_ISSUES.exercise, routines: MEMBER_ROUTINES });
        if (kind === "styling") return json({ styling: MEMBER_STYLING, palettes: MEMBER_PALETTES, looks: OUTFIT_LOOKS });
        if (kind === "classic-fashion") return json({ issue: CLASSIC_ISSUES.fashion, styling: MEMBER_STYLING, palettes: MEMBER_PALETTES, looks: OUTFIT_LOOKS });
        if (kind === "programs") {
          if (sub.tier !== "coach") throw new HttpError(403, "Four-week programs require Complete membership.");
          return json({ programs: MEMBER_PROGRAMS });
        }
        throw new HttpError(400, "Unknown member feature.");
      }
      const stripe2 = deps.getStripe();
      if (path === "portal") {
        if (!customer) throw new HttpError(409, "You do not have a billing account yet.");
        const configs = await stripe2.billingPortal.configurations.list({ active: true, limit: 100 });
        let config = configs.data.find((c) => c.metadata?.app === "lifestylehub");
        if (!config) config = await stripe2.billingPortal.configurations.create({ business_profile: { headline: "Manage your LifestyleHub membership" }, features: { customer_update: { enabled: true, allowed_updates: ["name", "address"] }, invoice_history: { enabled: true }, payment_method_update: { enabled: true }, subscription_cancel: { enabled: true, mode: "at_period_end" } }, metadata: { app: "lifestylehub" } }, { idempotencyKey: "lh-portal-v1" });
        const portal = await stripe2.billingPortal.sessions.create({ customer, configuration: config.id, return_url: `${deps.origin}/?billing=returned` });
        return json({ url: portal.url });
      }
      let body;
      try {
        const raw = await request.text();
        if (raw.length > 8192) throw new HttpError(413, "Request too large.");
        body = JSON.parse(raw);
        if (!body || Array.isArray(body) || typeof body !== "object") throw new Error();
      } catch (error) {
        if (error instanceof HttpError) throw error;
        throw new HttpError(400, "Invalid request.");
      }
      if (path === "checkout-status") {
        if (typeof body.sessionId !== "string" || !/^cs_(test_|live_)?[a-zA-Z0-9]+$/.test(body.sessionId)) throw new HttpError(400, "Invalid checkout session.");
        const session2 = await stripe2.checkout.sessions.retrieve(body.sessionId);
        if (!customer || session2.customer !== customer || session2.client_reference_id !== user.id || session2.mode !== "subscription") throw new HttpError(403, "This checkout belongs to a different account.");
        if (session2.status !== "complete" || session2.payment_status !== "paid" || !sub) return json({ pending: true, subscription: null }, 202);
        return json({ subscription: sub });
      }
      const tier = requireTier(body.tier);
      if (sub) throw new HttpError(409, "You already have a membership. Manage your existing subscription before starting another.");
      if (body.agreedToLegal !== true) throw new HttpError(400, "Please accept the terms before checkout.");
      const billingCustomer = customer || await customerFor(user, true);
      const open = await stripe2.checkout.sessions.list({ customer: billingCustomer, status: "open", limit: 100 });
      for (const previous of open.data) {
        if (previous.client_reference_id !== user.id) continue;
        if (previous.metadata?.tier === tier && previous.url) return json({ url: previous.url });
        await stripe2.checkout.sessions.expire(previous.id);
      }
      const price = await ensurePrice(stripe2, tier);
      const consentAt = (/* @__PURE__ */ new Date()).toISOString();
      const session = await stripe2.checkout.sessions.create({ mode: "subscription", adaptive_pricing: { enabled: false }, locale: "auto", customer: billingCustomer, client_reference_id: user.id, line_items: [{ price, quantity: 1 }], subscription_data: { billing_mode: { type: "flexible" }, metadata: { app: "lifestylehub", identity_user_id: user.id } }, metadata: { app: "lifestylehub", tier, identity_user_id: user.id, terms_version: "2026-11-07", terms_accepted_at: consentAt }, success_url: `${deps.origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${deps.origin}/?checkout=canceled` });
      if (!session.url) throw new HttpError(503, "Checkout is temporarily unavailable.");
      return json({ url: session.url });
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error("Membership request failed", { type: error instanceof Error ? error.name : "UnknownError" });
      return json({ error: "Account or billing services are unavailable. Please try again shortly." }, 503);
    }
  };
}

// server/supabase-handler.ts
function createSupabaseHandler(deps) {
  return async (request) => {
    const origin2 = request.headers.get("origin");
    const cors = { "Access-Control-Allow-Origin": deps.origin, "Access-Control-Allow-Headers": "authorization, apikey, content-type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Vary": "Origin", "Cache-Control": "private, no-store" };
    const json2 = (value, status = 200) => Response.json(value, { status, headers: cors });
    if (origin2 !== deps.origin) return json2({ error: "Origin not permitted." }, 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const path = new URL(request.url).pathname.split("/membership/")[1] || "";
    if (path === "config" && request.method === "GET") return json2({ authReady: true, membershipReady: deps.ready, billingCurrency: "USD" });
    if (!deps.ready && path !== "me") return json2({ error: "Secure billing services are not connected yet." }, 503);
    try {
      const token = request.headers.get("authorization")?.match(/^Bearer ([^\s]+)$/)?.[1];
      if (!token) return json2({ error: "Sign in to continue." }, 401);
      const { data, error } = await deps.admin.auth.getUser(token);
      if (error || !data.user?.email_confirmed_at) return json2({ error: "Sign in with a confirmed email." }, 401);
      const user = data.user;
      const { data: allowed, error: limitError } = await deps.admin.rpc("consume_membership_request", { p_user_id: user.id });
      if (limitError) throw limitError;
      if (!allowed) return json2({ error: "Too many requests. Try again shortly." }, 429);
      const store = {
        get: async (key2) => {
          if (key2 !== `customers/${user.id}`) throw new Error("Wrong account");
          const { data: data2, error: error2 } = await deps.admin.from("membership_customers").select("stripe_customer_id").eq("user_id", user.id).maybeSingle();
          if (error2) throw error2;
          return data2 ? { id: data2.stripe_customer_id } : null;
        },
        setJSON: async (key2, value) => {
          if (key2 !== `customers/${user.id}`) throw new Error("Wrong account");
          const { error: error2 } = await deps.admin.from("membership_customers").insert({ user_id: user.id, stripe_customer_id: value.id });
          if (error2?.code === "23505") return { modified: false };
          if (error2) throw error2;
          return { modified: true };
        }
      };
      const url = new URL(request.url);
      url.pathname = `/api/${path}`;
      const rewritten = new Request(url, { method: request.method, headers: request.headers, body: ["GET", "HEAD"].includes(request.method) ? void 0 : await request.text() });
      const response = await createApi({ origin: deps.origin, getUser: async () => ({ id: user.id, email: user.email, name: user.user_metadata?.full_name || "", confirmedAt: user.email_confirmed_at }), getStripe: deps.stripe, getStore: () => store })(rewritten);
      const headers = new Headers(response.headers);
      for (const [key2, value] of Object.entries(cors)) headers.set(key2, value);
      return new Response(response.body, { status: response.status, headers });
    } catch {
      return json2({ error: "Account or billing service unavailable. Please try again." }, 503);
    }
  };
}

// server/supabase-entry.ts
var origin = Deno.env.get("APP_ORIGIN") || "https://lifestyle.radiantsparkllc.com";
var key = Deno.env.get("STRIPE_SECRET_KEY") || "";
var admin = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"), { auth: { persistSession: false, autoRefreshToken: false } });
var stripe;
Deno.serve(createSupabaseHandler({ origin, admin, ready: /^(sk|rk)_(live|test)_/.test(key), stripe: () => stripe ||= new Stripe(key, { httpClient: Stripe.createFetchHttpClient(), maxNetworkRetries: 2, timeout: 1e4 }) }));
