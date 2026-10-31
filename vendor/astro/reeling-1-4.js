// PQC Wonderland: texts for the classroom (tab reeling), lessons 1 to 4: lattices and Babai rounding, LWE, the NTT, ML-KEM.
// Merged with reeling-5-8.js and reeling-9-12.js under tabs.reeling. See README.md.
//
// Cast in these lessons: the key holder (publishes t = A·s + e, decapsulates, re-encrypts) is Bob; the party who
// encapsulates and chooses m is Alice; the Cat who reads A and t is Eve; the Knave who flips a coefficient is Mallory.
// The Red Queen's map is the bad basis; the Caterpillar's lies are the error vector e.
export default {
  tabs: {
    reeling: {
      static: {
        // ---------------- lesson 1: lattices, two bases, Babai rounding ----------------
        '#rw-l1 > summary': '<span class="num">1</span>Lattices: vectors, bases and the nearest point<span class="sub">two bases, one lattice</span>',
        '#rw-l1 > .lbody > p.line, #rw-l1 > .lbody > .lcol > p.line': 'Many bases generate the same lattice; a short, nearly orthogonal one makes the nearest lattice point easy to find, a long skewed one does not.',
        '#rw-l1 .idea': '<h4>The idea</h4><p>A lattice is a regular grid of points: every point you can reach from the origin by whole-number steps along two fixed vectors, the basis. Two very different pairs of vectors can generate exactly the same grid. With a short, nearly square pair it is easy to say which grid point is nearest to any spot; with a long, skewed pair the obvious guess (round the coordinates) is often wrong.</p><p><b>What it is for.</b> Finding the nearest lattice point is easy with a good basis and, in hundreds of dimensions, hopeless with a bad one. ML-KEM and ML-DSA publish a bad basis and keep the good one secret.</p><p><b>On the board.</b> The bad basis describes the same lattice; it only makes the nearest point hard to find.</p>',
        '#rw-l1 p.plain': '<b>In plain terms.</b> A lattice L(B) is the set of all integer combinations of the columns of a basis B. Many bases generate the same lattice (they differ by a unimodular matrix). With a short, nearly orthogonal basis the closest-vector problem is solved by rounding the coordinates (Babai); with a long skewed basis rounding fails, and in hundreds of dimensions recovering a good basis from a bad one is the hard problem ML-KEM and ML-DSA rest on.',
        '#rw-l1 .board > h4': 'The board · drag the target, switch bases',
        '#rw-l1 > .lbody > p:nth-of-type(3), #rw-l1 > .lbody > .lcol > p:nth-of-type(3)': '<b>Same lattice, different basis.</b> u₁ = 2b₁ + b₂ and u₂ = 3b₁ + 2b₂, so the two bases generate exactly the same points (the change of basis has determinant 1). With the good basis, rounding the coordinates lands on the true nearest point every time. With the bad basis the fundamental parallelogram is long and thin, rounding is wrong more often than not, and the error is not small. Turning a bad basis into a good one is lattice reduction (LLL, BKZ); in two dimensions it is instant, in dimension 512 to 1024 (ML-KEM) or 1024 to 2048 (FN-DSA) it is the hard problem.',
        '#rw-l1 > .lbody > p:nth-of-type(4), #rw-l1 > .lbody > .lcol > p:nth-of-type(4)': '<b>Where it bites.</b> Lessons 2, 4 and 10 are this picture with more dimensions. The dimension on a screen stops at 3; in FIPS 203 it goes to 1024.',
        '#rw-bench1 > h4': 'The bench · Lagrange–Gauss reduction',
        '#rw-bench1 > p': 'In two dimensions a bad basis can always be reduced. Keep the shorter vector first; subtract from the longer the whole number of copies of the shorter nearest its projection, m = ⌈⟨u₁, u₂⟩ / ⟨u₁, u₁⟩⌋; swap if the order changed; stop when m = 0. Each step is unimodular, so the lattice and its determinant never change. Lagrange (1773) and Gauss (1801) had it; LLL is its higher-dimensional descendant, and BKZ, in turn, is what the lattice security estimates for ML-KEM and ML-DSA are about. In dimension 512 nobody knows how to finish.',

        // ---------------- lesson 2: arithmetic mod q, Learning With Errors ----------------
        '#rw-l2 > summary': '<span class="num">2</span>Arithmetic mod q, and Learning With Errors<span class="sub">a small error hides the secret</span>',
        '#rw-l2 > .lbody > p.line, #rw-l2 > .lbody > .lcol > p.line': 'Publish t = A·s + e with a small error e: without e, linear algebra recovers s at once; with it, elimination amplifies the error until it swamps everything.',
        '#rw-l2 .idea': '<h4>The idea</h4><p>Bob picks a secret vector s and publishes a set of equations about it, t = A·s + e, each with a small error added. Without the errors anyone could solve the equations and find s. With them, solving makes the errors grow until they swamp everything. Bob knows s, so he can subtract it and is left with only a small wobble, which he rounds off.</p><p><b>What it is for.</b> This is Learning With Errors (LWE), the hard problem under ML-KEM and ML-DSA.</p><p><b>On the board.</b> Eve can read A and t. Eve cannot read s.</p>',
        '#rw-l2 p.plain': '<b>In plain terms.</b> Learning With Errors (Regev): publish (A, t = A·s + e mod q) with A uniform and s, e small. Without e, Gaussian elimination recovers s at once; with it, every row operation multiplies the errors by the elimination coefficients until they are spread over the whole ring. The key holder subtracts sᵀ·u from v and has only the small term eᵀ·r left to round away; decryption is correct while |eᵀ·r| < q/4.',
        '#rw-l2 .board > h4': 'The board · q = 97, n = 4, m = 8',
        '#rw-l2 > .lbody > p:nth-of-type(3), #rw-l2 > .lbody > .lcol > p:nth-of-type(3)': '<b>Reading the public data.</b> Anyone can read A and t. Press Eliminate and Eve runs Gauss–Jordan on four rows of (A | t), one pivot at a time; the right-hand column shows what each row operation does to the four small errors riding along with t. Every step multiplies them by the elimination coefficients, until the noise fills the whole ring; Bob, holding s, subtracts his own copy and only a term of size eᵀ·r remains, which he rounds away. Widen the error and that term crosses q/4: too much noise and even Bob cannot decode.',
        '#rw-bench2 > h4': 'The bench · how much error is too much',
        '#rw-bench2 > p': 'The board\'s scheme, 500 times at every error width E from 1 to 30: eight samples, q = 97, the bit placed at 48. Bob reads the right bit while |eᵀ·r| stays under q/4; with r a 0/1 vector over eight samples, |eᵀ·r| ≤ 8E, so for E ≤ 3 he can never fail, and the bench must count no failures there. Beyond it the errors add up like a random walk and failures climb. ML-KEM makes the same trade with centred binomial noise and a 256-coefficient ring, and FIPS 203 states the result it buys.',

        // ---------------- lesson 3: the ring and the NTT ----------------
        '#rw-l3 > summary': '<span class="num">3</span>The ring Z_q[X]/(Xⁿ + 1), and the NTT<span class="sub">in the transform domain, multiplication is pointwise</span>',
        '#rw-l3 > .lbody > p.line, #rw-l3 > .lbody > .lcol > p.line': 'In the NTT domain, multiplying two polynomials of the ring is one multiplication per coefficient.',
        '#rw-l3 .idea': '<h4>The idea</h4><p>Multiplying two long lists of numbers the schoolbook way takes every number times every other number. Transform both lists first, and multiplying is one number at a time; transform back, and you have the same answer, far sooner.</p><p><b>What it is for.</b> Every real key in lessons 4 and 5 is a handful of these lists, 256 numbers each. The shortcut, called the NTT (number-theoretic transform), is why they are quick.</p><p><b>On the board.</b> The transform is only a change of representation: the same polynomial, written as its values at fixed points instead of as its coefficients.</p>',
        '#rw-l3 p.plain': '<b>In plain terms.</b> The schemes work in R_q = Z_q[X]/(Xⁿ + 1) with n = 256: a coefficient that runs off the end wraps round with its sign flipped. The number-theoretic transform (a discrete Fourier transform over Z_q) evaluates both polynomials at roots of unity, so their product is one multiply per coefficient, O(n log n) in all, which is why ML-KEM and ML-DSA are fast.',
        '#rw-l3 .board > h4': 'The board · q = 17, n = 8, ψ = 3 (order 16), ω = ψ² = 9',
        '#rw3-slice > p': 't̂ is stored already transformed, and A is never stored: it is regrown from ρ with SHAKE-128 every time. The same seed always expands to the same matrix.',
        '#rw-bench3 > h4': 'The bench · FIPS 203\'s own NTT, Algorithms 9 to 12',
        '#rw-bench3 > p': 'Exact to the coefficient: q = 3329 and ζ = 17, a primitive 256th root of unity, so ζ¹²⁸ = −1. Algorithm 9 (NTT) runs seven layers of butterflies, the i-th with ζ^BitRev₇(i); Algorithm 10 (NTT⁻¹) runs them back and multiplies by 3303 = 128⁻¹ mod q. Since q ≢ 1 (mod 512), X²⁵⁶ + 1 splits only into 128 quadratics X² − ζ^(2·BitRev₇(i)+1), so Algorithm 11 (MultiplyNTTs) multiplies in pairs, each pair by Algorithm 12 (BaseCaseMultiply). Algorithm 6 (ByteDecode₁₂) reads t̂ out of a real key.',

        // ---------------- lesson 4: ML-KEM, the FO transform ----------------
        '#rw-l4 > summary': '<span class="num">4</span>ML-KEM, the whole machine (FIPS 203)<span class="sub">the receiver re-encrypts and compares</span>',
        '#rw-l4 > .lbody > p.line, #rw-l4 > .lbody > .lcol > p.line': 'ML-KEM wraps an LWE encryption in the Fujisaki–Okamoto transform: the receiver re-encrypts what he decrypted and, if it differs from what he received, returns a pseudorandom key instead of an error.',
        '#rw-l4 .idea': '<h4>The idea</h4><p>Two strangers want the same secret key. Bob publishes a public key. Alice uses it to seal a fresh secret and sends the sealed message; only Bob, who holds the matching private key, can open it. If anyone tampers with the message on the way, Bob gets a random-looking key back, never an error, so the tamperer learns nothing.</p><p><b>What it is for.</b> ML-KEM (FIPS 203) is how browsers and servers now agree the key that protects a connection.</p><p><b>On the board.</b> Bob re-encrypts what he decrypted and compares it with what he received. If it does not match, he hands back a key that looks like any other and says nothing.</p>',
        '#rw-l4 p.plain': '<b>In plain terms.</b> ML-KEM wraps the LWE public-key encryption K-PKE in the Fujisaki–Okamoto transform: the encryption coins r are derived from the message m together with H(ek), so the receiver can re-encrypt m′ and check c′ = c. A tampered ciphertext gets the pseudorandom key K̄ = J(z ‖ c) back, never an error an attacker could learn from (implicit rejection); that is what makes the KEM IND-CCA secure.',
        '#rw-l4 .board > h4': 'The board · the six lines with q = 97, one nibble of m at a time',
        '#rw-l4 > .lbody > p:nth-of-type(3), #rw-l4 > .lbody > .lcol > p:nth-of-type(3)': '<b>Why Mallory never learns he failed.</b> Bob re-encrypts the message he decrypted and compares the result with the ciphertext he received. If they differ he does not say so; he answers with a pseudorandom key that looks like an answer. Randomise the wrong way (re-use m, or a bad RNG) and the same m gives the same c every time: the scheme collapses to the passive one.',
        '#rw-l4 .check p.cap': 'The real thing: generate a key, encapsulate a secret to it, decapsulate, then flip a byte of the ciphertext and decapsulate again.',
        '#rw-l4 > .lbody > p:nth-of-type(4), #rw-l4 > .lbody > .lcol > p:nth-of-type(4)': '<b>Where it bites.</b> KEM keys cannot sign, so no proof of possession by signature. A KEM key used for both KEM-auth and key transport is a decapsulation oracle. Both are on the KEM-based authentication tab.',
        '#rw-bench4 > h4': 'The bench · encapsulate and decapsulate by hand, Algorithms 14, 15, 17 and 18',
      },
      exact: {
        // the teachers' headings (all four lessons)
        'The Turtle\'s statement, short': 'The statement, short',
        'The Turtle\'s statement': 'The statement',
        'The Turtle\'s statement · the Fujisaki–Okamoto transform': 'The statement · the Fujisaki–Okamoto transform',

        // lesson 1: the board's control labels, the readout, the bench's reset button
        'Map': 'Basis',
        'Babai is wrong with this map': 'Babai is wrong with this basis',
        'The Red Queen\'s map': 'The bad basis',
        // lesson 1, Try this (rendered after load, split by <b>)
        'a few times with the good map.': 'a few times with the good basis.',
        'Switch the map to the Red Queen\'s, the long thin one.': 'Switch to the bad basis, the long thin one.',
        'Drag the target until her map picks the wrong tree.': 'Drag the target until rounding with the bad basis lands on the wrong point.',

        // lesson 2: controls, matrix labels, readouts
        'Lies in [−E, E], E =': 'Error in [−E, E], E =',
        'the Caterpillar tells the truth (e = 0)': 'no error (e = 0)',
        'Eliminate (what the Cat sees)': 'Eliminate (what Eve sees)',
        'A (8 × 4, one row per question)': 'A (8 × 4, one row per sample)',
        'e (the lies)': 'e (the error)',
        '(WRONG: the lies added up past q/4)': '(WRONG: the error terms added up past q/4)',
        'The Cat': 'Eve',
        'recovered exactly: there were no lies to amplify': 'recovered exactly: there was no error to amplify',
        'garbage: the lies were multiplied by the elimination coefficients': 'garbage: the error terms were multiplied by the elimination coefficients',
        // lesson 2, Try this
        ': a fresh set of sums, each with a small lie.': ': a fresh matrix A and t = A·s + e, each row with a small error added.',
        'the Caterpillar tells the truth': 'no error (e = 0)',
        ': with no lies, the Cat finds the secret.': ': with no error, Eve recovers the secret.',
        'Untick it, and slide the lies wider until even Alice reads the wrong bit.': 'Untick it, and widen the error until even Bob, who holds s, decodes the wrong bit.',

        // lesson 3: the two columns of the board
        'Schoolbook, then fold the coils (X⁸ ≡ −1)': 'Schoolbook, then reduce mod X⁸ + 1 (X⁸ ≡ −1)',
        'Through the looking glass: NTT, pointwise, back': 'NTT, pointwise multiply, inverse NTT',

        // lesson 4: the control label, the ledger's steps, the Try this list
        'the Knave flips one coefficient of c': 'Mallory flips one coefficient of c',
        'The Knave': 'Mallory',
        'c crosses the table unchanged': 'c crosses the wire unchanged',
        'Re-sealing from what he found gives exactly the envelope he received, so the coins were honest and K′ is the real key.': 'Re-encrypting the m′ he decrypted gives exactly the c he received, so the coins were honest and K′ is the real key.',
        'Re-sealing gives a different envelope: someone touched it. He does not say so.': 'Re-encryption gives a different c: someone changed it. He does not say so.',
        'Equal to the Hatter\'s K.': 'Equal to Alice\'s K.',
        'Not the Hatter\'s K, and not an error either: implicit rejection.': 'Not Alice\'s K, and not an error either: implicit rejection.',
        'Hatter\'s K': 'Alice\'s K',
        ': the Hatter\'s six lines, played honestly.': ': the six lines of ML-KEM, run honestly.',
        'the Knave flips one coefficient': 'Mallory flips one coefficient',
        ': nonsense comes back, and no error.': ': a pseudorandom key comes back, and no error.',
      },
      patterns: [
        // lesson 1 readout and bench
        [/^·\s+bad map wrong (\d+) of (\d+) targets so far$/, '·   bad basis wrong $1 of $2 targets so far'],
        [/^\.\s*The Red Queen's map is mended: two vectors of norm √5, as short as the good map's\.$/, '.\nThe bad basis is reduced: two vectors of norm √5, as short as the good basis.'],
        [/^X1 the Red Queen's map reduces in (\d+) steps to two vectors of norm √5, det 5, and a brute-force search agrees u₁ is shortest$/, 'X1 the bad basis reduces in $1 steps to two vectors of norm √5, det 5, and a brute-force search agrees u₁ is shortest'],
        // lesson 2: Eve's elimination and its step-by-step view
        [/^takes rows (.*) of the sheet, eliminates: s′ = \((.*)\) versus the real s = \((.*)\) →$/, 'takes rows $1 of (A | t), eliminates: s′ = ($2) versus the real s = ($3) →'],
        [/^start: four rows of the sheet: \[A \| t\]; the lies ride along$/, 'start: four rows of [A | t]; the error terms ride along'],
        [/^the last column is s′; beside it, what the four lies became: s′ − s = \((.*)\), nothing, because nobody lied$/, 'the last column is s′; beside it, what the four error terms became: s′ − s = ($1), nothing, because e = 0'],
        [/^the last column is s′; beside it, what the four lies became: s′ − s = \((.*)\), (spread across the whole ring|still small)$/, 'the last column is s′; beside it, what the four error terms became: s′ − s = ($1), $2'],
        // lesson 3: the seed in the key slice legend
        [/^ρ \(the spore\) (\d+) B(.*)$/, 'ρ (the seed) $1 B$2'],
        // lesson 4: the ledger and its verdict (the "Implicit rejection" prefix is read by the Try this check: keep it)
        [/^The same nibble the Hatter chose: (.*)$/, 'The same nibble Alice chose: $1'],
        [/^Implicit rejection\. The nibble decrypted (correctly|wrongly), the re-encryption differed, and the Knave got K̄: nonsense that looks like an answer\.$/, 'Implicit rejection. The nibble decrypted $1, the re-encryption differed, and Mallory got K̄: a pseudorandom key that looks like an answer.'],
      ],
      names: [
        [/\bThe Red Queen's map\b/g, 'The bad basis'], [/\bthe Red Queen's map\b/g, 'the bad basis'], [/\bthe Red Queen's basis\b/g, 'the bad basis'],
        [/\bthe good map's\b/g, 'the good basis'], [/\bthe good map\b/g, 'the good basis'], [/\bthe bad map\b/g, 'the bad basis'],
        [/\bThe Knave\b/g, 'Mallory'], [/\bthe Knave\b/g, 'Mallory'],
        [/\bthe Hatter chose\b/g, 'Alice chose'],
        [/ρ \(the spore\)/g, 'ρ (the seed)'],
        [/\bthe Caterpillar's lies\b/g, 'the error'], [/\bthe lies ride along\b/g, 'the error terms ride along'],
      ],
    },
  },
};
