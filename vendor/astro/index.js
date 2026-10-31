// PQC Wonderland, the astronaut skin: loads every dictionary module in this folder and merges them (see README.md).
// The page imports this lazily (index.html, "PQC WONDERLAND: the astronaut skin") and gets { tabs, global, statics, actors }.
// A module that fails to load is skipped with a console warning, so one bad file costs its texts, not the skin.
const FILES = ['header.js', 'teaparty.js', 'drinkme-whoareyou.js', 'tumtum-pocketwatch.js', 'pooloftears-bothpills-sizes.js',
  'reeling-1-4.js', 'reeling-5-8.js', 'reeling-9-12-exam.js'];
const empty = () => ({ exact: {}, patterns: [], names: [], static: {}, actors: {} });
function mergeInto(dst, src){ Object.assign(dst.exact, src.exact || {}); dst.patterns.push(...(src.patterns || [])); dst.names.push(...(src.names || [])); Object.assign(dst.static, src.static || {}); Object.assign(dst.actors, src.actors || {}); }
export default async function load(){
  const mods = await Promise.all(FILES.map(f => import('./' + f).then(m => m.default).catch(e => { console.warn('skin: ' + f + ' did not load', e); return null; })));
  const tabs = {}, global = empty();
  for (const m of mods){ if (!m) continue; for (const [tab, t] of Object.entries(m.tabs || {})){ if (!tabs[tab]) tabs[tab] = empty(); mergeInto(tabs[tab], t); } if (m.global) mergeInto(global, m.global); }
  const statics = [], actors = {};
  for (const t of [...Object.values(tabs), global]){ statics.push(...Object.entries(t.static)); Object.assign(actors, t.actors); }
  return { tabs, global, statics, actors, loaded: mods.filter(Boolean).length, files: FILES.length };
}
