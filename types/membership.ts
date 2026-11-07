import type { IssueSection } from '../data/lifestyleTrendsData';
import type { Recipe, CardioRoutine, BodyShapeStyling, ColorSeasonPalette } from './index';
export interface MealCollection { id: string; name: string; description: string; recipeIds: string[] }
export interface OutfitLook { id: string; title: string; occasion: 'Everyday'|'Work'|'Weekend'|'Evening'; climate: string; pieces: string[]; colours: string[]; note: string }
export interface ClassicPayload {
  issue: IssueSection;
  recipes?: Recipe[];
  collections?: MealCollection[];
  routines?: CardioRoutine[];
  styling?: BodyShapeStyling[];
  palettes?: ColorSeasonPalette[];
  looks?: OutfitLook[];
}
