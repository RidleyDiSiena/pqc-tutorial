// PQC Wonderland: the global texts, outside the tab panels: the header, the deck, the three section blurbs, the lesson rail,
// the classroom's level pills, and the few names every tab shares. See README.md.
export default {
  global: {
    static: {
      'header > p': {
        b: 'Four sections: the post-quantum algorithms run live in your browser; the mathematics under them in thirteen lessons; a reference shelf: a glossary of every term and a card for each algorithm; and Crypto 4 Kids, the same ideas told for children with games to play. Nothing leaves the page.',
        a: 'Four sections: the FIPS 203, 204 and 205 algorithms, Falcon (the FIPS 206 draft), HQC and the X-Wing hybrid running in your browser; thirteen lessons on the mathematics under them and on Q-day; a reference shelf, with a glossary of every term and a card per algorithm on its mathematics and its standards; and Crypto 4 Kids, the same ideas told for children with games to play. Nothing is sent anywhere.',
        x: 'Four sections: ML-KEM, ML-DSA and SLH-DSA (FIPS 203, 204, 205), FN-DSA (the FIPS 206 draft), HQC (FIPS 207, to come) and X-Wing, each run on real parameter sets with every byte shown; thirteen lessons on lattices, LWE, the NTT, hash-based signatures, codes and the Q-day resource estimates, checked against the real algorithms; a reference shelf: a cross-linked glossary of every term the page uses, and a card per algorithm (FIPS 203 to 207, SP 800-208, X-Wing, FrodoKEM, Classic McEliece) with its mathematics, sizes and official references; and Crypto 4 Kids, the same ideas told for children with games to play. Nothing is sent anywhere.',
      },
      '#sec-tutorial .sec-blurb .fun': 'Algorithms',
      '#sec-tutorial .sec-blurb p': {
        b: 'Every scene runs the real algorithm in your browser, on real-size keys. Pick a scene, press Play, and watch what each party sends and checks.',
        a: 'Every scene runs the real FIPS 203, 204 and 205 algorithms in your browser, plus Falcon from the FIPS 206 draft, HQC and the X-Wing hybrid. Nothing is sent anywhere. Pick a scene, press Play, and watch the bytes.',
        x: 'Every scene runs the real FIPS 203, 204 and 205 algorithms (noble-post-quantum, vendored) plus Falcon from the FIPS 206 draft, the page\'s own HQC port and X-Wing, with WebCrypto for the classical parts. The ledger shows every object with its size and bytes. Nothing is sent anywhere.',
      },
      '#sec-classroom .sec-blurb > .fun': 'Mathematics',
      '#sec-classroom .sec-blurb > p': {
        b: 'Thirteen lessons and an exam on the mathematics behind the algorithms, and on when a quantum computer could break today\'s keys, on boards small enough to see. Depth sets how much detail each lesson shows.',
        a: 'Thirteen lessons and an exam on the mathematics under FIPS 203, 204, 205, the FIPS 206 draft and HQC (FIPS 207 to come), on boards small enough to see and checked against the real-size algorithms, and on Q-day: what breaking today\'s keys would take, and when to worry.',
        x: 'Thirteen lessons and an exam: lattices and CVP, LWE and module-LWE, the NTT, the Fujisaki–Okamoto transform, Fiat–Shamir with aborts, SHAKE, one-time and Merkle signatures, the SLH-DSA hypertree, Falcon\'s Gaussian sampling, security categories, QC-MDPC codes for HQC, and the Q-day arithmetic (published Shor and Grover resource estimates, Mosca\'s inequality). Every board is small enough to see; the Expert bench holds each one against the real-size algorithm or a reference KAT.',
      },
      '.rwmodes button[data-rwmode="b"] .fun': 'overview',
      '.rwmodes button[data-rwmode="n"] .fun': 'standard',
      '.rwmodes button[data-rwmode="a"] .fun': 'technical',
      '.rwmodes button[data-rwmode="x"] .fun': 'specification',
      '.tab-btn[data-lesson="rw-l1"] .fun': 'Lattices',
      '.tab-btn[data-lesson="rw-l7"] .fun': 'One-time keys',
    },
    exact: {
      'PQC Wonderland ▸ post-quantum tutorial ▸ stardate 1865.07.04 ▸': 'PQC Wonderland ▸ post-quantum tutorial ▸',
      'Class': 'Depth',
      '☕': '✓',
    },
    patterns: [],
    names: [
      [/\bthe Jabberwock's\b/g, "the quantum adversary's"], [/\bthe Jabberwock\b/g, 'the quantum adversary'], [/\bThe Jabberwock\b/g, 'The quantum adversary'], [/\bJabberwock\b/g, 'quantum adversary'],
      [/\bthe Knave of Hearts\b/g, 'Mallory'], [/\bThe Knave of Hearts\b/g, 'Mallory'], [/\bthe Knave's\b/g, "Mallory's"], [/\bthe Knave\b/g, 'Mallory'], [/\bThe Knave\b/g, 'Mallory'],
      [/\bTrent the Caterpillar\b/g, 'Trent'],
      [/\bthe Mock Turtle's\b/g, "the lesson's"], [/\bthe Mock Turtle\b/g, 'the lesson'],
    ],
  },
};
