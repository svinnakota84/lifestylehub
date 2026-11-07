export interface JournalArticle { id: string; category: string; title: string; subtitle: string; image: string; minutes: string; paragraphs: string[] }
export const FREE_ARTICLES: JournalArticle[] = [
  { id:'food', category:'NOURISH', title:'Good food. Less overthinking.', subtitle:'A colourful bowl, a few familiar ingredients, and a little room to make it yours.', image:'/images/food.jpg', minutes:'3 MIN READ', paragraphs:[
    'A useful everyday meal starts with ingredients you already enjoy. Think of a bowl as a flexible template rather than a strict recipe: vegetables, a grain or other staple, a protein you like, and a dressing.',
    'For a simple chickpea bowl, combine drained chickpeas, cooked rice, chopped cucumber and tomatoes. Add olive oil and lemon to taste. Use ingredients that suit your preferences and any dietary restrictions.',
    'Make it local: rice can become millet, couscous or quinoa. Chickpeas can become beans or tofu. Seasonal vegetables help the same idea work in different kitchens around the world.',
    'Members can explore the complete recipe collection, follow cooking steps, organise a seven-day meal plan and build a grocery list from their selections.'
  ]},
  { id:'move', category:'MOVE', title:'Make a little space to move.', subtitle:'Start with something that fits your day. Keep the ambitious plans for another morning.', image:'/images/move.jpg', minutes:'3 MIN READ', paragraphs:[
    'Movement can begin with a short walk, a gentle stretch or a break from sitting. Choose something comfortable for your experience and surroundings.',
    'Try a simple starting ritual: put on comfortable shoes, decide on a short route, and leave the phone in your pocket. Your first goal is showing up, not chasing a number.',
    'Build gradually and stop if you feel pain, dizziness or unusual discomfort. If you have a health condition, are pregnant or are returning after injury, seek advice from a qualified professional before starting a new routine.',
    'Plus and Complete members can use the workout library, interval timers and activity log to bring a little structure to their own pace.'
  ]},
  { id:'style', category:'EXPRESS', title:'Wear more of what feels like you.', subtitle:'Personal style begins with paying attention to the pieces you already reach for.', image:'/images/style.jpg', minutes:'4 MIN READ', paragraphs:[
    'A wardrobe does not need a complete reinvention to feel fresh. Begin with three pieces you enjoy wearing and notice their colours, textures and shapes.',
    'Create one small outfit formula: a favourite base, a layer, and a detail that adds personality. Repeat it with different colours rather than buying a whole new look.',
    'Comfort, climate, culture and individual taste matter more than a trend. Use style suggestions as inspiration, never as rules about how a body should look.',
    'Plus and Complete members can explore the interactive silhouette and colour studio and save ideas for their next outfit.'
  ]}
];
