import React, { useState } from 'react';
import { WeeklyPlanner } from './WeeklyPlanner';
import { DietPlansPage } from './DietPlansPage';
import { FashionConfidencePage } from './FashionConfidencePage';
import type { Recipe, BodyShapeStyling, ColorSeasonPalette } from '../types';
import type { MealCollection, OutfitLook } from '../types/membership';
export function MemberFoodCollection({recipes,collections,canExport,onLogMeal}:{recipes:Recipe[];collections:MealCollection[];canExport:boolean;onLogMeal:(id:string)=>void}) {
  const [collectionId,setCollectionId]=useState('all');
  const collection=collections.find(item=>item.id===collectionId)||collections[0];
  const filtered=collection?recipes.filter(recipe=>collection.recipeIds.includes(recipe.id)):recipes;
  return <><div className="member-collection-intro"><span className="eyebrow">FOOD & DIET INSPIRATION</span><h2>More flavours. Your own way of eating.</h2><p>Choose a recipe collection, then plan your week. These are flexible food preferences, not medical diets or individual nutrition prescriptions. Portions and nutrition values are illustrative estimates.</p><div className="collection-pills" aria-label="Meal collections">{collections.map(item=><button key={item.id} aria-pressed={collectionId===item.id} onClick={()=>setCollectionId(item.id)}>{item.name}<span>{item.recipeIds.length}</span></button>)}</div><p className="collection-description">{collection?.description}</p></div><WeeklyPlanner key={collectionId} recipes={filtered} canExport={canExport}/><DietPlansPage recipes={filtered} onLogMeal={onLogMeal} completedRecipeIds={[]}/></>;
}
export function MemberStyleCollection({styling,palettes,looks}:{styling:BodyShapeStyling[];palettes:ColorSeasonPalette[];looks:OutfitLook[]}) {
  const [occasion,setOccasion]=useState('All');const filtered=looks.filter(look=>occasion==='All'||look.occasion===occasion);
  return <><div className="member-collection-intro"><span className="eyebrow">THE MEMBER LOOKBOOK</span><h2>A little more room to express yourself.</h2><p>Eight outfit ideas and eight colour palettes. Work with clothes you own, your climate and the way you like to dress.</p><div className="collection-pills" aria-label="Outfit occasions">{['All','Everyday','Work','Weekend','Evening'].map(value=><button key={value} aria-pressed={occasion===value} onClick={()=>setOccasion(value)}>{value}</button>)}</div></div><div className="outfit-grid">{filtered.map(look=><article className="outfit-card" key={look.id}><span className="eyebrow">{look.occasion} / {look.climate}</span><h3>{look.title}</h3><ul>{look.pieces.map(piece=><li key={piece}>{piece}</li>)}</ul><div className="outfit-colours">{look.colours.map(colour=><span key={colour}>{colour}</span>)}</div><p>{look.note}</p></article>)}</div><FashionConfidencePage styling={styling} palettes={palettes}/></>;
}
