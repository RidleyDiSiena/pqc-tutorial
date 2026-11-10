// PQC Wonderland: Crypto 4 Kids. Eight short, playful pages on the same ideas as the Tutorial (secret codes, the magic padlock
// that is ML-KEM, the wobbly-number puzzle under the lattice schemes, the super stamp that is ML-DSA, the fingerprint machine and
// SLH-DSA, HQC's noisy message, X-Wing's two locks) and a quiz. The page imports this the first time the section opens and calls
// mount(PQ, go): PQ is the bundled noble module (the padlock and the stamp run the real ML-KEM-768 and ML-DSA-44), go(hash) opens
// a tab. Stickers for finished activities are kept in localStorage (rabbit-hole-kids); without storage they last for the visit.

const $ = id => document.getElementById(id);
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rnd = n => { const b = new Uint32Array(1); crypto.getRandomValues(b); return b[0] % n; };   // 0 .. n-1
const pick = a => a[rnd(a.length)];
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => new Promise(r => setTimeout(r, window.__RH_FAST || calm() ? Math.min(ms, 120) : ms));
const hexBlocks = (u8, n = 24) => [...u8.slice(0, n)].map(b => `<i style="--h:${Math.round(b * 360 / 256)}"></i>`).join('');
const nice = n => n.toLocaleString('en-US');

// ---------- stickers ----------
export const STICKERS = [
  ['k-hello', '🔤', 'Code cracker'], ['k-padlock', '📦', 'Padlock pro'], ['k-wobble', '🎲', 'Wobble wizard'], ['k-stamp', '✍️', 'Stamp checker'],
  ['k-print', '🔍', 'Fingerprint finder'], ['k-noisy', '🌩️', 'Storm fixer'], ['k-twolocks', '🚪', 'Door guard'], ['k-quiz', '🏅', 'Secret agent'],
];
const KEY = 'rabbit-hole-kids';
let got = new Set();
try { got = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) {}
function stickerRow(){ const el = $('kid-stickers'); if (!el) return;
  el.innerHTML = `<span class="ks-lbl">Your stickers <b>${got.size}/${STICKERS.length}</b></span>` + STICKERS.map(([id, e, name]) =>
    `<span class="ks${got.has(id) ? ' on' : ''}" title="${esc(got.has(id) ? name : name + ': not yet!')}" role="img" aria-label="${esc(name + (got.has(id) ? ', earned' : ', not earned yet'))}">${got.has(id) ? e : '?'}</span>`).join(''); }
function earn(id){ if (got.has(id)) return; got.add(id); try { localStorage.setItem(KEY, JSON.stringify([...got])); } catch (e) {}
  stickerRow(); const s = STICKERS.find(x => x[0] === id); toast(`${s[1]} New sticker: <b>${esc(s[2])}</b>!`); }
function toast(html){ let t = $('kid-toast'); if (!t){ t = document.createElement('div'); t.id = 'kid-toast'; t.className = 'kid-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.innerHTML = html; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3200); }
function confetti(host){ if (calm()) return; const box = document.createElement('div'); box.className = 'kid-confetti'; box.setAttribute('aria-hidden', 'true');
  box.innerHTML = Array.from({ length: 36 }, (_, i) => `<i style="--x:${rnd(100)}%;--d:${(0.8 + rnd(10) / 10).toFixed(1)}s;--r:${rnd(360)}deg;--h:${i * 37 % 360}"></i>`).join('');
  host.appendChild(box); setTimeout(() => box.remove(), 2400); }

// ---------- the shared bits of every page ----------
const big = (emoji, text) => `<div class="kid-big"><span class="kid-big-e" aria-hidden="true">${emoji}</span><p><b>The big idea:</b> ${text}</p></div>`;
const fact = text => `<p class="kid-fact"><span aria-hidden="true">⭐</span> <b>Fun fact:</b> ${text}</p>`;
const grown = (name, links) => `<p class="kid-grown"><span aria-hidden="true">🎓</span> <b>Grown-ups call it</b> ${name}. ${links.map(([h, l]) => `<a href="#${h}">${esc(l)} →</a>`).join(' ')}</p>`;
const next = (h, l) => `<p class="kid-next"><a href="#${h}" class="kid-btn">Next: ${l} ▸</a></p>`;
const tryBox = (title, inner) => `<div class="kid-try"><h3><span aria-hidden="true">🕹️</span> ${title}</h3>${inner}</div>`;

const CAST = [['👧', 'Alice', 'Has a secret to share.'], ['👦', 'Bob', 'Alice\'s best friend.'], ['🕵️', 'Sneaky Eve', 'Loves to snoop on messages.'], ['🤖', 'Q-Bot', 'A quantum computer: a brand-new kind of super-fast puzzle solver.']];

const PAGES = {
  'k-hello': () => `
    <h2><span aria-hidden="true">🔐</span> Secret Codes!</h2>
    ${big('🤫', 'Cryptography (say it: <i>krip-TOG-ruh-fee</i>) is the science of keeping secrets. Every time you send a message, watch a video or play a game online, secret codes are keeping it safe.')}
    <h3 class="kid-h">Meet the gang</h3>
    <div class="kid-cast">${CAST.map(([e, n, d]) => `<div class="kid-who"><span class="kid-who-e" aria-hidden="true">${e}</span><b>${n}</b><span>${d}</span></div>`).join('')}</div>
    <h3 class="kid-h">Uh oh, here comes Q-Bot</h3>
    <p class="kid-p">Today's secret codes are like locks made from really hard number puzzles. Normal computers would need <b>millions of years</b> to solve them. But scientists are building <b>quantum computers</b>, like Q-Bot, that think in a totally new way. A big enough Q-Bot could solve some of those puzzles in just a few hours! <span aria-hidden="true">😱</span></p>
    <p class="kid-p">So scientists invented <b>new locks</b> with puzzles that even Q-Bot can't solve. They're called <b>post-quantum cryptography</b>, or <b>PQC</b>: secret codes that stay safe <i>after</i> quantum computers arrive.</p>
    <p class="kid-p kid-why"><span aria-hidden="true">🕵️</span> <b>Why switch now, before Q-Bot is ready?</b> Sneaky Eve can copy locked messages <i>today</i> and hide them in a drawer, waiting for Q-Bot to open them later. If we use new locks now, her drawer full of copies stays useless forever!</p>
    ${tryBox('Your secret decoder wheel', `
      <p>This is one of the oldest codes ever: <b>shift every letter</b> along the alphabet. With a shift of 3, A becomes D, B becomes E, and so on. Julius Caesar used it over 2,000 years ago!</p>
      <div class="kid-row"><label>Your message <input id="kc-msg" class="kid-in" maxlength="60" value="MEET ME AT THE TREEHOUSE" autocomplete="off"></label>
        <label>Shift <input id="kc-shift" type="range" min="1" max="25" value="3"> <b id="kc-n" class="kid-num">3</b></label></div>
      <div class="kid-wheel" id="kc-wheel" aria-hidden="true"></div>
      <p class="kid-out">Secret code: <b id="kc-out" class="kid-code"></b></p>
      <div class="kid-challenge"><p><b>Challenge!</b> Bob sent you this. Can you crack it? Move each letter <b>back</b> along the alphabet by the shift (with shift 1, B becomes A). The wheel above can help!</p>
        <p class="kid-code kid-big-code" id="kc-puzzle"></p>
        <div class="kid-row"><label>Bob said: <input id="kc-guess" class="kid-in" maxlength="40" autocomplete="off" placeholder="type the real words"></label><button type="button" class="kid-btn" id="kc-check">Check</button></div>
        <p class="kid-say" id="kc-say" aria-live="polite"></p></div>
      <p class="kid-note"><span aria-hidden="true">🤖</span> There are only 25 shifts, so any computer (not even Q-Bot!) cracks this code in a blink. Real codes use puzzles with more answers than there are grains of sand on every beach on Earth.</p>`)}
    ${fact('The word "cryptography" comes from Greek words meaning "hidden writing".')}
    ${next('k-padlock', 'The Magic Padlock')}`,

  'k-padlock': () => `
    <h2><span aria-hidden="true">📦</span> The Magic Padlock</h2>
    ${big('🔓', 'Alice gives out <b>open padlocks</b> that anyone can click shut, but only <b>Alice\'s key</b> can open them. That way Bob can send her a secret without ever meeting her!')}
    <p class="kid-p">Alice and Bob live far apart. Bob wants to send Alice a secret, but Sneaky Eve looks at <i>every</i> package in the mail. What can they do?</p>
    ${tryBox('Send a secret past Sneaky Eve', `
      <div class="kid-row"><label>Bob's secret <select id="kp-secret" class="kid-in"><option>🍕 Pizza party on Friday!</option><option>🐶 The new puppy is called Biscuit</option><option>🎂 Mum's surprise cake is in the garage</option><option>🦖 The password is DINO-ROAR</option></select></label></div>
      <div class="kid-stage" id="kp-stage">
        <div class="kid-actor" id="kp-alice"><span class="kid-actor-e">👧</span><b>Alice</b><span class="kid-hold" id="kp-a-hold">🔑 🔓</span></div>
        <div class="kid-lane"><span class="kid-parcel" id="kp-parcel" aria-hidden="true"></span><div class="kid-actor kid-eve" id="kp-eve"><span class="kid-actor-e">🕵️</span><b>Sneaky Eve</b><span class="kid-hold" id="kp-e-say"></span></div></div>
        <div class="kid-actor" id="kp-bob"><span class="kid-actor-e">👦</span><b>Bob</b><span class="kid-hold" id="kp-b-hold"></span></div>
      </div>
      <p class="kid-cap" id="kp-cap" aria-live="polite">Press <b>Next step</b> to start.</p>
      <div class="kid-row"><button type="button" class="kid-btn" id="kp-go">Next step ▸</button><button type="button" class="kid-btn ghost" id="kp-reset">Start again</button></div>`)}
    ${tryBox('Now do it for real!', `
      <p>Your computer can make a <b>real</b> quantum-safe padlock right now, the same kind your phone and web browser are starting to use. It's made of numbers, not metal:</p>
      <button type="button" class="kid-btn" id="kp-real">Make a real padlock ⚡</button>
      <div id="kp-real-out" class="kid-real" aria-live="polite"></div>`)}
    ${fact('Your web browser may already use this kind of padlock when you visit websites. You just can\'t see it!')}
    ${grown('<b>ML-KEM</b> (a "key encapsulation mechanism", FIPS 203). <b>HQC</b> is another magic padlock, built from a different puzzle.', [['drinkme', 'See the real scene'], ['glossary/ml-kem', 'Glossary']])}
    ${next('k-wobble', 'The Wobbly Number Game')}`,

  'k-wobble': () => `
    <h2><span aria-hidden="true">🎲</span> The Wobbly Number Game</h2>
    ${big('〰️', 'The new locks hide a secret number inside a math puzzle, then add a tiny <b>wobble</b> (a little bit of mess) so the puzzle is super hard to undo.')}
    <p class="kid-p">Here's a puzzle: <b>secret × 7 = 42</b>. Easy! The secret is 6. You just divide.</p>
    <p class="kid-p">Now add a wobble: <b>secret × 7, plus a wobble, = 43</b>. The wobble is a tiny number: −1, 0 or +1. Is the secret still 6? Probably… but you have to think harder! Now imagine <b>hundreds</b> of secret numbers mixed together, each puzzle with its own wobble. That's what the real locks do, and nobody (not even Q-Bot) knows a fast way to untangle them.</p>
    ${tryBox('Crack the secret!', `
      <div class="kid-modes" role="group" aria-label="How hard"><button type="button" class="kid-mode" data-m="0" aria-pressed="false">😊 No wobble</button><button type="button" class="kid-mode" data-m="1" aria-pressed="true">🤔 Wobbly</button><button type="button" class="kid-mode" data-m="2" aria-pressed="false">🤯 Two secrets</button></div>
      <ul class="kid-clues" id="kw-clues"></ul>
      <div class="kid-row" id="kw-ins"></div>
      <div class="kid-row"><button type="button" class="kid-btn" id="kw-check">Check</button><button type="button" class="kid-btn ghost" id="kw-new">New puzzle</button><button type="button" class="kid-btn ghost" id="kw-show">Show me</button></div>
      <p class="kid-say" id="kw-say" aria-live="polite"></p>`)}
    <p class="kid-p">Real ML-KEM puzzles mix <b>768 secret numbers</b> together. If you tried one guess every second, you'd still be guessing long after the Sun burns out. <span aria-hidden="true">☀️</span></p>
    ${fact('Mathematicians call this kind of puzzle "Learning With Errors". The errors are the wobbles!')}
    ${grown('<b>lattice cryptography</b> and <b>Learning With Errors (LWE)</b>', [['reeling/simple/2', 'Lesson 2: LWE'], ['glossary/lwe', 'Glossary']])}
    ${next('k-stamp', 'The Super Stamp')}`,

  'k-stamp': () => `
    <h2><span aria-hidden="true">✍️</span> The Super Stamp</h2>
    ${big('🖋️', 'A <b>digital signature</b> is like a magic stamp. Only Alice can make it, but <b>anyone</b> can check it. If someone changes even one letter, the stamp stops working!')}
    <p class="kid-p">Bob gets a note that says it's from Alice. But Sneaky Eve is good at copying handwriting. How can Bob be sure? Alice adds her super stamp. Bob uses Alice's <b>stamp checker</b> (anyone can have one) to see if it's real.</p>
    ${tryBox('Stamp a note, then try to fake it', `
      <label class="kid-block">Alice's note <textarea id="ks-note" class="kid-in" rows="2" maxlength="200">Dear Bob, meet me at the treehouse at 4 o'clock. From Alice</textarea></label>
      <div class="kid-row"><button type="button" class="kid-btn" id="ks-sign">1. Alice stamps it ✍️</button><button type="button" class="kid-btn" id="ks-eve" disabled>2. Sneaky Eve changes it 🕵️</button><button type="button" class="kid-btn" id="ks-check" disabled>3. Bob checks the stamp 🔍</button></div>
      <div id="ks-stamp" class="kid-real"></div>
      <p class="kid-verdict" id="ks-say" aria-live="polite"></p>
      <p class="kid-note">You can edit the note yourself too. Change one letter, a space, anything, then press Check!</p>`)}
    <p class="kid-p">The stamp on this page is <b>real</b>: your computer just made a quantum-safe signature. Q-Bot can't fake it either.</p>
    ${fact('Signatures check that apps and games you download really came from the people who made them, and that nobody slipped in anything nasty.')}
    ${grown('<b>ML-DSA</b> (FIPS 204). <b>FN-DSA</b> (Falcon) makes smaller stamps with fancier maths', [['whoareyou', 'See the real scene'], ['pocketwatch', 'Falcon'], ['glossary/ml-dsa', 'Glossary']])}
    ${next('k-print', 'The Fingerprint Machine')}`,

  'k-print': () => `
    <h2><span aria-hidden="true">🔍</span> The Fingerprint Machine</h2>
    ${big('🫆', 'A <b>hash</b> is a machine that turns <i>any</i> message into a short fingerprint. Same message, same fingerprint, every time. Change one tiny thing, and the fingerprint changes completely!')}
    <p class="kid-p">It's like a smoothie blender. <span aria-hidden="true">🍓🍌🥤</span> Put in the same fruit, get the same smoothie. But you can never <b>un-blend</b> a smoothie to get the strawberry back! You can't run the fingerprint machine backwards either.</p>
    ${tryBox('Feed the machine', `
      <label class="kid-block">Type anything <input id="kh-a" class="kid-in" maxlength="80" value="I love pancakes" autocomplete="off"></label>
      <p class="kid-out">Fingerprint: <span class="kid-print" id="kh-pa"></span></p>
      <label class="kid-block">Now change just one letter <input id="kh-b" class="kid-in" maxlength="80" value="I love pancakez" autocomplete="off"></label>
      <p class="kid-out">Fingerprint: <span class="kid-print" id="kh-pb"></span></p>
      <p class="kid-say" id="kh-same" aria-live="polite"></p>`)}
    ${tryBox('Fingerprint hunt', `
      <p>Make a fingerprint that <b>starts with</b> <span class="kid-target" id="kh-target"></span>. You can't plan it: you just have to keep trying words!</p>
      <div class="kid-row"><input id="kh-hunt" class="kid-in" maxlength="40" placeholder="try a word" autocomplete="off" aria-label="Try a word"><button type="button" class="kid-btn" id="kh-try">Try it</button><button type="button" class="kid-btn ghost" id="kh-auto">Let the computer try 🤖</button></div>
      <p class="kid-out">Got: <span class="kid-print" id="kh-hp"></span> <span class="kid-tries" id="kh-tries"></span></p>
      <p class="kid-say" id="kh-hsay" aria-live="polite"></p>`)}
    <h3 class="kid-h"><span aria-hidden="true">🌳</span> A stamp made only of fingerprints</h3>
    <p class="kid-p">One of the new super stamps is built from nothing but fingerprints, stacked up in a giant tree with millions of one-use stamps hanging off the branches. Fingerprint machines are so well understood that this is one of the <b>most trusted</b> stamps of all. The catch? Its stamps are big: about 8,000 bytes, three times bigger than ML-DSA's.</p>
    ${fact('Matching all eight emojis of a fingerprint here by luck would take about 280 trillion tries. Matching a real fingerprint would take longer than the age of the universe!')}
    ${grown('a <b>hash function</b> (like SHA-256), and the tree stamp is <b>SLH-DSA</b> (FIPS 205)', [['tumtum', 'See the real scene'], ['reeling/simple/6', 'Lesson 6: Hashes'], ['glossary/hash-function', 'Glossary']])}
    ${next('k-noisy', 'The Noisy Message')}`,

  'k-noisy': () => `
    <h2><span aria-hidden="true">🌩️</span> The Noisy Message</h2>
    ${big('📢', 'If a message might get messed up on the way, say everything <b>more than once</b>. Then the person listening can fix the mistakes!')}
    <p class="kid-p">Have you played the telephone game? A message gets whispered along and comes out all wrong. Here's a trick: say each letter <b>three times</b>. If one of the three gets muddled, the other two still agree, and they win the vote!</p>
    ${tryBox('Send a message through the storm', `
      <div class="kid-row"><label>Message <input id="kn-msg" class="kid-in" maxlength="10" value="HELLO" autocomplete="off"></label>
        <label>Storm <input id="kn-storm" type="range" min="1" max="4" value="2"> <b id="kn-sname" class="kid-num">Windy</b></label></div>
      <div class="kid-row"><button type="button" class="kid-btn" id="kn-send">Send it 🌩️</button><button type="button" class="kid-btn" id="kn-fix" disabled>Fix it with votes 🗳️</button></div>
      <div class="kid-triples" id="kn-out" aria-live="polite"></div>
      <p class="kid-say" id="kn-say" aria-live="polite"></p>`)}
    <p class="kid-p">Here's the clever twist in <b>HQC</b>, one of the new padlocks: Alice's lock <b>adds the storm on purpose</b>! The secret is hidden under so much noise that Sneaky Eve sees only a mess. Alice knows a secret shortcut that calms the storm just enough, and then her repeats fix the rest.</p>
    ${fact('Phones, Wi-Fi, DVDs and even space probes millions of kilometres away use mistake-fixing codes like this every day.')}
    ${grown('<b>error-correcting codes</b>, and the padlock is <b>HQC</b> (FIPS 207, coming soon)', [['pooloftears', 'See the real scene'], ['reeling/simple/12', 'Lesson 12: HQC'], ['glossary/hqc', 'Glossary']])}
    ${next('k-twolocks', 'Two Locks Are Better')}`,

  'k-twolocks': () => `
    <h2><span aria-hidden="true">🚪</span> Two Locks Are Better Than One</h2>
    ${big('🔒', 'Why choose between the old lock and the new lock? Put <b>both</b> on the door! A thief has to break <b>both</b> to get in.')}
    <p class="kid-p">The <b>old lock</b> has kept us safe for 40 years, but Q-Bot will be able to pick it one day. The <b>new lock</b> stops Q-Bot, but it's brand new. What if someone finds a sneaky trick nobody has thought of yet? Using both is like wearing a bike helmet <i>and</i> knee pads. <span aria-hidden="true">🚲</span></p>
    ${tryBox('Guard the treasure', `
      <div class="kid-door" id="kt-door">
        <div class="kid-lock" id="kt-old"><span class="kid-lock-e">🔒</span><b>Old lock</b><span>Today's maths</span></div>
        <div class="kid-treasure" id="kt-chest"><span aria-hidden="true">🧰</span><span id="kt-state">Safe!</span></div>
        <div class="kid-lock" id="kt-new"><span class="kid-lock-e">🔒</span><b>New lock</b><span>Quantum-safe</span></div>
      </div>
      <div class="kid-row"><button type="button" class="kid-btn" id="kt-q">🤖 Q-Bot picks the old lock</button><button type="button" class="kid-btn" id="kt-t">🧠 Someone finds a trick for the new lock</button><button type="button" class="kid-btn ghost" id="kt-reset">Fix the locks</button></div>
      <p class="kid-say" id="kt-say" aria-live="polite">Both locks are shut. The treasure is safe.</p>`)}
    <p class="kid-p">Scientists call this a <b>hybrid</b>. Lots of websites already use a hybrid right now while everyone moves over to the new locks.</p>
    ${fact('Experts think the new locks are very strong. Hybrids are just being extra careful, like double-knotting your shoelaces.')}
    ${grown('a <b>hybrid</b>, such as <b>X-Wing</b> (ML-KEM plus X25519)', [['bothpills', 'See the real scene'], ['glossary/hybrid', 'Glossary']])}
    ${next('k-quiz', 'Secret Agent Quiz')}`,

  'k-quiz': () => `
    <h2><span aria-hidden="true">🏅</span> Secret Agent Quiz</h2>
    ${big('🕶️', 'Answer the questions to become an official <b>Quantum-Safe Secret Agent</b>. You can try as many times as you like!')}
    <div id="kq-body" class="kid-quiz"></div>`,
};

const QUIZ = [
  ['What is cryptography?', ['The science of keeping secrets', 'A kind of dinosaur', 'Drawing with crayons'], 0, 'It means "hidden writing"!'],
  ['Who is Q-Bot?', ['A quantum computer that could crack old codes', 'Alice\'s cat', 'A new video game'], 0, 'A big quantum computer could break some of today\'s locks.'],
  ['Why switch to new locks <i>now</i>?', ['Sneaky Eve can save messages today and open them when Q-Bot is ready', 'The old locks are rusty', 'New locks are a nicer colour'], 0, 'Copy now, crack later: so we lock things up with new locks today.'],
  ['With the magic padlock, who can <b>open</b> the box?', ['Only Alice, with her key', 'Anyone who finds the padlock', 'Sneaky Eve'], 0, 'Anyone can click it shut, but only Alice has the key.'],
  ['What makes the wobbly number puzzle hard?', ['A tiny wobble mixed into lots of secret numbers', 'It is written in French', 'There is no answer'], 0, 'Lots of secrets plus wobbles: even Q-Bot gets lost.'],
  ['Eve changes one word in a stamped note. What happens?', ['The stamp check fails', 'The stamp still works', 'The note catches fire'], 0, 'Change anything, and the stamp no longer matches.'],
  ['What can you NOT do with a fingerprint machine (a hash)?', ['Run it backwards to get the message', 'Get the same fingerprint for the same message', 'Use it on any message'], 0, 'Like a smoothie: you can\'t un-blend it!'],
  ['Why put two locks on the door?', ['A thief must break both to get in', 'Two locks look cooler', 'To use up spare locks'], 0, 'That is a hybrid: extra careful!'],
];

// ---------- the games ----------
function wireHello(){
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', shift = (s, k) => s.toUpperCase().replace(/[A-Z]/g, c => A[(A.indexOf(c) + k + 26) % 26]);
  const draw = () => { const k = +$('kc-shift').value; $('kc-n').textContent = k; $('kc-out').textContent = shift($('kc-msg').value, k);
    $('kc-wheel').innerHTML = [...A].map(c => `<span><b>${c}</b>${shift(c, k)}</span>`).join(''); };
  $('kc-shift').addEventListener('input', draw); $('kc-msg').addEventListener('input', draw); draw();
  const P = pick(['I LIKE PIZZA', 'SECRET AGENT', 'HELLO ALICE', 'TACO TUESDAY', 'BOOK CLUB AT TEN']), K = 1 + rnd(5);
  $('kc-puzzle').textContent = shift(P, K) + `   (shift ${K})`;
  const check = () => { const g = $('kc-guess').value.toUpperCase().replace(/[^A-Z]/g, ''), ok = g === P.replace(/[^A-Z]/g, '');
    $('kc-say').innerHTML = ok ? '🎉 <b>You cracked it!</b> You\'re a real code breaker.' : g ? '🤔 Not quite. Try moving each letter <b>back</b> by the shift.' : '';
    if (ok){ earn('k-hello'); confetti($('kc-say').closest('.kid-try')); } };
  $('kc-check').addEventListener('click', check); $('kc-guess').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
}

function wirePadlock(PQ){
  const S = { step: 0 }, P = $('kp-parcel'), cap = $('kp-cap');
  const set = (where, emoji) => { P.className = 'kid-parcel at-' + where; P.textContent = emoji; };
  const secret = () => $('kp-secret').value;
  const STEPS = [
    async () => { set('a', '🔓'); $('kp-a-hold').textContent = '🔑'; cap.innerHTML = '<b>Step 1.</b> Alice mails Bob an <b>open padlock</b>. She keeps the only key 🔑 safe at home.'; await wait(50); set('b', '🔓'); },
    async () => { $('kp-b-hold').textContent = '📦 ' + secret().split(' ')[0]; set('b', '📦'); cap.innerHTML = `<b>Step 2.</b> Bob puts his secret, “${esc(secret().slice(3))}”, in a box and <b>clicks Alice's padlock shut</b>. Click! Now even Bob can't open it.`; },
    async () => { set('e', '📦🔒'); $('kp-b-hold').textContent = ''; cap.innerHTML = '<b>Step 3.</b> The box travels to Alice… and Sneaky Eve grabs it!'; await wait(700);
      $('kp-eve').classList.add('shake'); $('kp-e-say').textContent = '😤 Locked!'; cap.innerHTML = '<b>Step 3.</b> Sneaky Eve pulls and twists, but she has no key. <b>She can\'t open it!</b>'; await wait(600); $('kp-eve').classList.remove('shake'); },
    async () => { set('a', '📦🔒'); $('kp-e-say').textContent = ''; await wait(500); set('a', secret().split(' ')[0]); cap.innerHTML = `<b>Step 4.</b> Alice opens the box with her key. 🎉 “${esc(secret().slice(3))}” Only Alice and Bob know the secret!`;
      earn('k-padlock'); confetti($('kp-stage')); },
  ];
  const reset = () => { S.step = 0; set('a', ''); P.textContent = ''; $('kp-a-hold').textContent = '🔑 🔓'; $('kp-b-hold').textContent = ''; $('kp-e-say').textContent = ''; cap.innerHTML = 'Press <b>Next step</b> to start.'; $('kp-go').textContent = 'Next step ▸'; $('kp-go').disabled = false; };
  $('kp-go').addEventListener('click', async () => { if (S.step >= STEPS.length) return reset(); const b = $('kp-go'); b.disabled = true; await STEPS[S.step++](); b.disabled = false; if (S.step >= STEPS.length) b.textContent = 'Play again ↻'; });
  $('kp-reset').addEventListener('click', reset); $('kp-secret').addEventListener('change', reset); reset();
  $('kp-real').addEventListener('click', () => { const K = PQ.ml_kem768, a = K.keygen(), box = K.encapsulate(a.publicKey), opened = K.decapsulate(box.cipherText, a.secretKey);
    const same = opened.every((v, i) => v === box.sharedSecret[i]);
    $('kp-real-out').innerHTML = `
      <p><span aria-hidden="true">🔓</span> <b>Alice's open padlock</b> is ${nice(a.publicKey.length)} bytes, a long list of numbers. Here are its first few as colours: <span class="kid-hex">${hexBlocks(a.publicKey)}</span></p>
      <p><span aria-hidden="true">📦</span> <b>Bob's locked box</b> is ${nice(box.cipherText.length)} bytes: <span class="kid-hex">${hexBlocks(box.cipherText)}</span></p>
      <p><span aria-hidden="true">🤫</span> <b>The secret inside</b>, as Bob made it: <span class="kid-hex">${hexBlocks(box.sharedSecret, 32)}</span></p>
      <p><span aria-hidden="true">🔑</span> <b>The secret Alice got out</b>: <span class="kid-hex">${hexBlocks(opened, 32)}</span></p>
      <p class="kid-verdict ${same ? 'ok' : 'bad'}">${same ? '✅ The colours match! Alice and Bob now share the same secret, and Eve only ever saw the padlock and the locked box.' : '❌ Something went wrong.'}</p>
      <p class="kid-note">Press the button again: every padlock is brand new, so all the colours change.</p>`; earn('k-padlock'); });
}

function wireWobble(){
  const S = { m: 1 }, FRUIT = ['🍎', '🍌'];
  const make = () => { S.n = S.m === 2 ? 2 : 1; S.s = Array.from({ length: S.n }, () => 1 + rnd(S.m === 2 ? 5 : 9));
    S.clues = Array.from({ length: S.m === 2 ? 4 : 3 }, () => { const a = Array.from({ length: S.n }, () => (S.m === 2 ? 2 : 3) + rnd(S.m === 2 ? 8 : 7)), e = S.m === 0 ? 0 : rnd(3) - 1;
      return { a, e, b: a.reduce((t, v, i) => t + v * S.s[i], 0) + e }; });
    const nm = i => S.n === 1 ? '❓' : FRUIT[i];
    $('kw-clues').innerHTML = S.clues.map(c => `<li>${c.a.map((v, i) => `${nm(i)} × ${v}`).join(' + ')}${S.m ? ' <span class="kid-wob">+ wobble</span>' : ''} = <b>${c.b}</b></li>`).join('');
    $('kw-ins').innerHTML = S.s.map((_, i) => `<label>${S.n === 1 ? 'The secret ❓' : FRUIT[i]} = <input class="kid-in kid-small" type="number" inputmode="numeric" min="1" max="9" data-i="${i}"></label>`).join('') +
      `<span class="kid-hint">${S.m === 0 ? 'Hint: just divide!' : S.m === 1 ? 'The wobble is −1, 0 or +1, and the secret is 1 to 9.' : 'Each fruit is 1 to 5. The wobble is −1, 0 or +1.'}</span>`;
    $('kw-say').textContent = '';
    document.querySelectorAll('.kid-mode').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.m === S.m))); };
  // a guess is right when it fits every clue (the wobble at most 1); with two secrets another pair can fit too, and that counts
  const fits = g => S.clues.every(c => Math.abs(c.b - c.a.reduce((t, v, i) => t + v * g[i], 0)) <= (S.m ? 1 : 0));
  const check = () => { const g = [...$('kw-ins').querySelectorAll('input')].map(i => +i.value); if (g.some(v => !v)) { $('kw-say').textContent = 'Type a number in every box first!'; return; }
    if (fits(g)){ const exact = g.every((v, i) => v === S.s[i]);
      $('kw-say').innerHTML = exact ? `🎉 <b>Cracked it!</b> ${S.m === 2 ? 'Two secrets at once. Wow!' : S.m === 1 ? 'Wobbles didn\'t fool you!' : 'Nice dividing!'}` : `🎉 <b>That works with every clue!</b> (I was thinking of ${S.s.join(' and ')}, but yours fits too. Wobbles make puzzles slippery!)`;
      if (S.m) earn('k-wobble'); confetti($('kw-say').closest('.kid-try')); }
    else $('kw-say').innerHTML = `🤔 Not quite. Try each clue: your numbers should land <b>${S.m ? 'within 1 of' : 'exactly on'}</b> the answer.`; };
  document.querySelectorAll('.kid-mode').forEach(b => b.addEventListener('click', () => { S.m = +b.dataset.m; make(); }));
  $('kw-check').addEventListener('click', check); $('kw-new').addEventListener('click', make);
  $('kw-ins').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  $('kw-show').addEventListener('click', () => { $('kw-say').innerHTML = `The secret was <b>${S.s.map((v, i) => (S.n === 1 ? '' : FRUIT[i] + ' = ') + v).join(', ')}</b>. The wobbles were ${S.clues.map(c => (c.e > 0 ? '+' : '') + c.e).join(', ')}.`; });
  make();
}

function wireStamp(PQ){
  const D = PQ.ml_dsa44, enc = new TextEncoder(), S = {};
  const say = (html, cls = '') => { const v = $('ks-say'); v.className = 'kid-verdict ' + cls; v.innerHTML = html; };
  $('ks-sign').addEventListener('click', () => { S.k = S.k || D.keygen(); S.signed = $('ks-note').value; S.sig = D.sign(enc.encode(S.signed), S.k.secretKey);
    $('ks-stamp').innerHTML = `<p><span aria-hidden="true">🖋️</span> <b>Alice's stamp</b> is ${nice(S.sig.length)} bytes long, a whole page of secret squiggles. The first few, as colours: <span class="kid-hex">${hexBlocks(S.sig, 32)}</span></p>`;
    $('ks-eve').disabled = false; $('ks-check').disabled = false; say('Stamped! Now Bob can check it… or Sneaky Eve can try to change it.'); });
  $('ks-eve').addEventListener('click', () => { const t = $('ks-note'), v = t.value;
    const next = /\b4\b/.test(v) ? v.replace(/\b4\b/, '5') : /treehouse/.test(v) ? v.replace('treehouse', 'swamp') : v + ' PS: give Eve your sweets.';
    t.value = next; t.classList.remove('flash'); void t.offsetWidth; t.classList.add('flash'); say('🕵️ Sneaky Eve changed the note! Can Bob tell?'); });
  $('ks-check').addEventListener('click', () => { if (!S.sig) return; const ok = D.verify(S.sig, enc.encode($('ks-note').value), S.k.publicKey);
    if (ok){ say('✅ <b>The stamp is real!</b> Alice wrote this, and nobody changed a thing.', 'ok'); }
    else { say('❌ <b>Fake!</b> The stamp doesn\'t match. Someone changed the note after Alice stamped it.', 'bad'); if ($('ks-note').value !== S.signed) { earn('k-stamp'); } } });
}

const EMO = [...'🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🐔🐧🐦🦄🐝🐛🦋🐌🐞🐢🐍🦖🐙🦀🐠🐬🐳🌵🌲🌻🍄🌈⭐🌙⚡🔥🍎🍌🍇🍉🍓🍒🍕🍔🍩🍪🎂🍦⚽🏀🎸🎈🎁🚀🚲⛵🏰💎🎩'];   // 64, so a byte picks one evenly
function printOf(PQ, text){ const d = PQ.sha256(new TextEncoder().encode(text)); return Array.from({ length: 8 }, (_, i) => EMO[d[i] % EMO.length]); }
function wirePrint(PQ){
  const show = (inp, out) => { const p = printOf(PQ, $(inp).value); $(out).innerHTML = p.map(e => `<span>${e}</span>`).join(''); return p.join(''); };
  const both = () => { const a = show('kh-a', 'kh-pa'), b = show('kh-b', 'kh-pb');
    $('kh-same').innerHTML = $('kh-a').value === $('kh-b').value ? '🟰 Same words, same fingerprint. Every single time.' : a === b ? 'Whoa, the same fingerprint! That almost never happens.' : '👀 One tiny change, and the fingerprint is totally different!'; };
  $('kh-a').addEventListener('input', both); $('kh-b').addEventListener('input', both); both();
  const S = { n: 0, target: pick(['🐱', '🦄', '🍕', '🚀', '🐸', '🌈']) };
  $('kh-target').textContent = S.target;
  const hit = w => { S.n++; const p = printOf(PQ, w); $('kh-hp').innerHTML = p.map(e => `<span>${e}</span>`).join(''); $('kh-tries').textContent = `try ${nice(S.n)}`; return p[0] === S.target; };
  const win = w => { $('kh-hsay').innerHTML = `🎉 <b>Found one!</b> “${esc(w)}” works, after ${nice(S.n)} ${S.n === 1 ? 'try' : 'tries'}. Now imagine matching <b>all eight</b> emojis!`; earn('k-print'); confetti($('kh-hsay').closest('.kid-try')); S.n = 0; };
  const tryIt = () => { const w = $('kh-hunt').value.trim(); if (!w) return; if (hit(w)) win(w); else $('kh-hsay').textContent = 'Nope! Try another word. Even one letter changes everything.'; };
  $('kh-try').addEventListener('click', tryIt); $('kh-hunt').addEventListener('keydown', e => { if (e.key === 'Enter') tryIt(); });
  $('kh-auto').addEventListener('click', async () => { const b = $('kh-auto'); b.disabled = true; const words = ['cat', 'dog', 'sun', 'pie', 'zoo', 'fox', 'map', 'owl', 'bee', 'jam'];
    for (let i = 0; i < 2000; i++){ const w = pick(words) + rnd(1000); $('kh-hunt').value = w; if (hit(w)){ win(w); break; } if (i % 4 === 0) await wait(30); }
    b.disabled = false; });
}

function wireNoisy(){
  const NAMES = ['', 'Breezy', 'Windy', 'Stormy', 'Hurricane!'], RATE = [0, 0.06, 0.12, 0.22, 0.38], A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', S = {};
  const sname = () => { $('kn-sname').textContent = NAMES[+$('kn-storm').value]; }; $('kn-storm').addEventListener('input', sname); sname();
  $('kn-send').addEventListener('click', () => { const msg = $('kn-msg').value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 10) || 'HELLO'; $('kn-msg').value = msg; const r = RATE[+$('kn-storm').value];
    S.msg = msg; S.got = [...msg].map(c => [0, 1, 2].map(() => { if (Math.random() >= r) return { c, bad: false }; let x; do x = A[rnd(26)]; while (x === c); return { c: x, bad: true }; }));
    $('kn-out').innerHTML = S.got.map(t => `<div class="kid-tri">${t.map(x => `<span class="${x.bad ? 'bad' : ''}">${x.c}</span>`).join('')}</div>`).join('');
    $('kn-say').innerHTML = `Bob hears each letter three times. The <span class="kid-bad">red</span> ones got muddled by the storm. Can the votes fix them?`; $('kn-fix').disabled = false; });
  $('kn-fix').addEventListener('click', () => { if (!S.got) return; $('kn-fix').disabled = true;
    const fixed = S.got.map(t => { const n = {}; t.forEach(x => { n[x.c] = (n[x.c] || 0) + 1; }); const [c, k] = Object.entries(n).sort((a, b) => b[1] - a[1])[0]; return k >= 2 ? c : '?'; });
    $('kn-out').querySelectorAll('.kid-tri').forEach((el, i) => el.insertAdjacentHTML('beforeend', `<b class="${fixed[i] === S.msg[i] ? 'ok' : 'bad'}">${fixed[i]}</b>`));
    const ok = fixed.join('') === S.msg, wrong = fixed.filter((c, i) => c !== S.msg[i]).length;
    $('kn-say').innerHTML = ok ? `✅ Bob got <b>${S.msg}</b>, perfectly fixed! ${S.got.flat().some(x => x.bad) ? 'The votes beat the storm.' : '(The storm missed every letter this time. Try a bigger storm!)'}`
      : `😬 Bob got <b>${fixed.join('')}</b>. ${wrong} letter${wrong > 1 ? 's' : ''} had two or more muddles, so the vote lost. Real codes repeat things in smarter ways to survive big storms.`;
    if (ok && S.got.flat().some(x => x.bad)){ earn('k-noisy'); confetti($('kn-say').closest('.kid-try')); } });
}

function wireTwoLocks(){
  const S = { old: false, nw: false }, chest = $('kt-chest');
  const draw = () => { $('kt-old').classList.toggle('open', S.old); $('kt-new').classList.toggle('open', S.nw);
    $('kt-old').querySelector('.kid-lock-e').textContent = S.old ? '🔓' : '🔒'; $('kt-new').querySelector('.kid-lock-e').textContent = S.nw ? '🔓' : '🔒';
    const lost = S.old && S.nw; chest.classList.toggle('lost', lost); $('kt-state').textContent = lost ? 'Gone!' : 'Safe!'; chest.querySelector('span').textContent = lost ? '💨' : '🧰';
    $('kt-say').innerHTML = lost ? '😱 Both locks broken: the thief got in! That would need Q-Bot <b>and</b> a brand-new trick at the same time, which is very, very unlikely.'
      : S.old ? '🤖 Q-Bot picked the old lock… but the <b>new lock</b> still holds. The treasure is safe! 🎉'
      : S.nw ? '🧠 Someone found a trick for the new lock… but the <b>old lock</b> still holds. The treasure is safe! 🎉'
      : 'Both locks are shut. The treasure is safe.';
    if (S.old !== S.nw) earn('k-twolocks'); };
  $('kt-q').addEventListener('click', () => { S.old = true; draw(); }); $('kt-t').addEventListener('click', () => { S.nw = true; draw(); });
  $('kt-reset').addEventListener('click', () => { S.old = S.nw = false; draw(); });
}

function wireQuiz(){
  const S = { i: 0, score: 0, order: [] };
  const start = () => { S.i = 0; S.score = 0; S.order = QUIZ.map(q => { const idx = q[1].map((_, k) => k); for (let k = idx.length - 1; k > 0; k--){ const j = rnd(k + 1); [idx[k], idx[j]] = [idx[j], idx[k]]; } return idx; }); ask(); };
  const ask = () => { const [q, opts, right, why] = QUIZ[S.i], ord = S.order[S.i];
    $('kq-body').innerHTML = `<p class="kid-qn">Question ${S.i + 1} of ${QUIZ.length} <span class="kid-stars" aria-label="${S.score} stars">${'⭐'.repeat(S.score)}</span></p>
      <h3 class="kid-q">${q}</h3><div class="kid-opts">${ord.map(k => `<button type="button" class="kid-opt" data-k="${k}">${opts[k]}</button>`).join('')}</div><p class="kid-say" id="kq-say" aria-live="polite"></p>`;
    $('kq-body').querySelectorAll('.kid-opt').forEach(b => b.addEventListener('click', () => {
      const ok = +b.dataset.k === right; $('kq-body').querySelectorAll('.kid-opt').forEach(o => { o.disabled = true; if (+o.dataset.k === right) o.classList.add('ok'); }); if (!ok) b.classList.add('bad');
      if (ok) S.score++;
      $('kq-say').innerHTML = `${ok ? '🎉 <b>Yes!</b>' : '🙈 <b>Not that one.</b>'} ${why} <button type="button" class="kid-btn" id="kq-next">${S.i + 1 < QUIZ.length ? 'Next question ▸' : 'See my result 🏅'}</button>`;
      $('kq-next').addEventListener('click', () => { S.i++; S.i < QUIZ.length ? ask() : done(); }); $('kq-next').focus(); })); };
  const done = () => { const all = S.score === QUIZ.length, pass = S.score >= 6;
    $('kq-body').innerHTML = `<p class="kid-qn">You got <b>${S.score} out of ${QUIZ.length}</b> <span class="kid-stars">${'⭐'.repeat(S.score)}</span></p>` + (pass ? `
      <div class="kid-badge" id="kq-badge"><span class="kid-badge-e" aria-hidden="true">🕶️</span><p class="kid-badge-t">Official</p><h3>Quantum-Safe Secret Agent</h3>
        <p class="kid-badge-n" id="kq-name">Agent ???</p><p class="kid-badge-s">knows magic padlocks, wobbly numbers, super stamps, fingerprints, storms and double locks</p></div>
      <div class="kid-row"><label>Your agent name <input id="kq-in" class="kid-in" maxlength="24" placeholder="type your name" autocomplete="off"></label><button type="button" class="kid-btn ghost" id="kq-again">Play again</button></div>
      <p class="kid-say">${all ? 'A perfect score! Q-Bot is shaking in its circuits. 🤖' : 'Great job! Get all 8 for a perfect score, if you dare.'}</p>`
      : `<p class="kid-say">So close! You need 6 to earn your badge. Have another look at the pages, then try again. You can do it! 💪</p><button type="button" class="kid-btn" id="kq-again">Try again</button>`);
    $('kq-again').addEventListener('click', start);
    if (pass){ $('kq-in').addEventListener('input', e => { $('kq-name').textContent = 'Agent ' + (e.target.value.trim() || '???'); }); earn('k-quiz'); confetti($('kq-badge')); } };
  start();
}

export function mount(PQ, go){
  for (const [id, html] of Object.entries(PAGES)){ const el = $('kb-' + id.slice(2)); if (el) el.innerHTML = html(); }
  stickerRow();
  const w = [wireHello, () => wirePadlock(PQ), wireWobble, () => wireStamp(PQ), () => wirePrint(PQ), wireNoisy, wireTwoLocks, wireQuiz];
  for (const f of w){ try { f(); } catch (e) { console.warn('kids:', e); } }
  // in-section links go through the page's router so the tab, the deck and the hash stay in step
  document.querySelectorAll('.kids a[href^="#"]').forEach(a => a.addEventListener('click', ev => { if (ev.metaKey || ev.ctrlKey || ev.shiftKey) return; ev.preventDefault(); go(a.getAttribute('href').slice(1)); }));
}
