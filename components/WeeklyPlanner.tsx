import React, { useMemo, useState } from 'react';
import type { Recipe } from '../types';
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
export function WeeklyPlanner({ recipes, canExport }: { recipes: Recipe[]; canExport: boolean }) {
  const [selected, setSelected] = useState(() => DAYS.map((_, i) => recipes[i % recipes.length]?.id || ''));
  const grocery = useMemo(() => [...new Set(selected.flatMap(id => recipes.find(r => r.id === id)?.ingredients || []))], [selected, recipes]);
  const [checked, setChecked] = useState<string[]>([]);
  function exportPlan() {
    const quote = (text: string) => `"${text.replaceAll('"','""')}"`;
    const csv = ['Day,Meal', ...DAYS.map((day,i) => `${day},${quote(recipes.find(r => r.id === selected[i])?.title || '')}`)].join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href=url; a.download='lifestylehub-weekly-plan.csv'; a.click(); URL.revokeObjectURL(url);
  }
  return <section className="weekly-planner"><div className="section-heading"><div><span className="eyebrow">YOUR MEMBER TOOLKIT</span><h2>A week that works for you.</h2></div>{canExport && <button className="button secondary" onClick={exportPlan}>Export your week ↗</button>}</div><p>Choose one featured meal each day. Your grocery list updates as you go. This is a planning tool, not an individual nutrition prescription.</p><div className="planner-grid">{DAYS.map((day,i)=><label key={day}>{day}<select value={selected[i]} onChange={e=>setSelected(previous=>previous.map((value,j)=>j===i?e.target.value:value))}>{recipes.map(recipe=><option key={recipe.id} value={recipe.id}>{recipe.title}</option>)}</select></label>)}</div><details><summary>Your grocery list · {grocery.length} ingredients</summary><div className="grocery-grid">{grocery.map(item=><label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={()=>setChecked(prev=>prev.includes(item)?prev.filter(v=>v!==item):[...prev,item])}/><span>{item}</span></label>)}</div></details></section>;
}
