import test from 'node:test';
import assert from 'node:assert/strict';
import { MEMBER_RECIPES, MEMBER_ROUTINES, MEMBER_PALETTES, MEMBER_STYLING, MEAL_COLLECTIONS, OUTFIT_LOOKS, CLASSIC_ISSUES } from '../data/memberExpansion';
test('member collections use unique IDs and contain complete recipe instructions',()=>{
  assert.equal(new Set(MEMBER_RECIPES.map(recipe=>recipe.id)).size,MEMBER_RECIPES.length);
  assert.equal(new Set(MEMBER_ROUTINES.map(routine=>routine.id)).size,MEMBER_ROUTINES.length);
  assert.equal(new Set(OUTFIT_LOOKS.map(look=>look.id)).size,OUTFIT_LOOKS.length);
  for(const recipe of MEMBER_RECIPES){assert.ok(recipe.ingredients.length>=3);assert.ok(recipe.instructions.length>=3);}
});
test('every meal collection resolves to existing recipes and is nonempty',()=>{
  const ids=new Set(MEMBER_RECIPES.map(recipe=>recipe.id));
  for(const collection of MEAL_COLLECTIONS){assert.ok(collection.recipeIds.length>0);assert.ok(collection.recipeIds.every(id=>ids.has(id)),collection.id);}
});
test('new movement timers have positive phases and match displayed duration',()=>{
  for(const routine of MEMBER_ROUTINES.slice(4)){assert.ok(routine.intervals.every(phase=>phase.durationSec>0));assert.equal(routine.intervals.reduce((sum,phase)=>sum+phase.durationSec,0),routine.durationMin*60,routine.id);assert.equal(routine.caloriesBurn,0);}
});
test('styling expansion preserves all five shape collections and valid colour swatches',()=>{
  assert.equal(MEMBER_STYLING.length,5);assert.equal(MEMBER_PALETTES.length,8);
  for(const palette of MEMBER_PALETTES)assert.ok(palette.colors.every(colour=>/^#[0-9a-f]{6}$/i.test(colour.hex)));
});
test('all three Classic editorial editions contain eight distinct entries',()=>{
  for(const issue of Object.values(CLASSIC_ISSUES)){assert.equal(issue.items.length,8);assert.equal(new Set(issue.items.map(item=>item.id)).size,8);}
});
