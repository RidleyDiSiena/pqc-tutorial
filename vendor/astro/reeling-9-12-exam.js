// PQC Wonderland: texts for the classroom (tab reeling), lessons 9 to 12 and the exam. See README.md.
// Lessons 1-4 and 5-8 live in their own modules; index.js merges the three under tabs.reeling.

// The exam's feedback is textContent: '✓ ' or '✗ (<answer>) ' and then the why. One pattern per why that holds lore.
const fb = (why, to) => [new RegExp('^(✓|✗ \\([^)]*\\)) ' + why + '$'), '$1 ' + to];
// An exam question is '<n>. <text>'; the Normal and Expert exams reuse Advanced questions under other numbers.
const qq = (text, to) => [new RegExp('^(\\d+)\\. ' + text + '$'), '$1. ' + to];

export default {
  tabs: {
    reeling: {
      static: {
        // ---- lesson 9: SLH-DSA ----
        '#rw-l9 > summary': '<span class="num">9</span>SLH-DSA, the hypertree (FIPS 205)<span class="sub">stateless hash-based signatures</span>',
        '#rw-l9 p.line': 'A hypertree of one-time keys so tall that a pseudorandom leaf is never used twice: no state, only hash functions, and large signatures.',
        '#rw-l9 .idea': '<h4>The idea</h4><p>Stack one-time signature keys into a tree so tall, with so many leaves, that choosing a leaf at random will never pick the same key twice. Nobody has to keep count of which keys were used. The price is size: every signature carries a path down through every layer of the tree.</p><p><b>What it is for.</b> SLH-DSA (FIPS 205) is the signature that trusts nothing but hash functions: the spare, in case lattice problems ever turn out to be easy.</p>',
        '#rw-l9 p.plain': '<b>In plain terms.</b> SLH-DSA (FIPS 205) stacks WOTS+ one-time keys into XMSS trees and those into a hypertree so tall that a pseudorandomly chosen leaf is never used twice, so the signer keeps no state. A few-time FORS signature at the leaf signs the message digest. Its security rests on hash functions alone (SHA-2 or SHAKE); the price is signatures of 7856 to 49 856 bytes.',
        '#rw-l9 .turtle[data-modes="ax"] > pre': 'parameters (n, h, d, a, k, w):  FORS: k trees of height a, the digest picks one leaf in each  →  k·(a+1)·n bytes\nthe FORS public key is signed by a WOTS+ leaf of an XMSS tree of height h\' = h/d; d layers make a hypertree of height h\nstateless: the leaf index comes from H_msg(R, PK.seed, PK.root, M), R = PRF_msg(SK.prf, opt_rand, M); with h = 63 no used-leaf record is needed\nsignature = n + k(a+1)n + d·(len·n + h\'·n)         pk = PK.seed ‖ PK.root = 2n,  sk = 4n',
        '#rw-l9 .lbody > .board > h4, #rw-l9 .lbody > .lcol > .board > h4': 'The board · the signature layout, to scale',
        '#rw-l9 .lbody > p[data-modes="nax"], #rw-l9 .lbody > .lcol > p[data-modes="nax"]': '<b>Where it bites.</b> Size. A 7856-byte signature in every certificate and every handshake is the price of assuming only hash functions. The deterministic variant plus fault injection is the hazard. The FIPS 205 · SLH-DSA tab runs the real thing.',
        '#rw-bench9 > h4': 'The bench · Twelve sizes, and Verify by hand, FIPS 205 Algorithms 20 and 24',

        // ---- lesson 10: Falcon ----
        '#rw-l10 > summary': '<span class="num">10</span>FN-DSA / Falcon and trapdoor sampling <span class="draft">FIPS 206 draft</span><span class="sub">a short lattice vector, sampled rather than rounded</span>',
        '#rw-l10 p.line': 'Falcon signs by finding a lattice point near the hashed message with a secret good basis, and samples that point from a Gaussian so the basis never shows in the signatures.',
        '#rw-l10 .idea': '<h4>The idea</h4><p>Falcon also signs by finding a lattice point near the message\'s own point, using a secret good basis (a short, nearly orthogonal set of vectors). If it always rounded to the nearest corner, the little rounding errors would slowly trace out the shape of the secret basis. So it picks its point at random from a small round cloud, which has no corners to give away.</p><p><b>What it is for.</b> FN-DSA (the FIPS 206 draft) has the smallest lattice signatures, which matters when every certificate carries one.</p>',
        '#rw-l10 p.plain': '<b>In plain terms.</b> Falcon (the FIPS 206 draft, FN-DSA) signs with a secret good basis of an NTRU lattice: it finds a short (s₁, s₂) with s₁ + s₂·h ≡ c, the hashed and salted message. It samples that point from a discrete Gaussian around the target rather than rounding, because rounding errors would trace out the secret basis (the 2006 attack on NTRUSign). The verifier recomputes s₁ from the public h and checks only that (s₁, s₂) is short.',
        '#rw-l10 .lbody > .board > h4, #rw-l10 .lbody > .lcol > .board > h4': 'The board · lesson 1\'s lattice, signed',
        '#rw-l10 .lbody > p[data-modes="nax"], #rw-l10 .lbody > .lcol > p[data-modes="nax"]': '<b>Where it bites.</b> Floating-point side channels, and the draft status: noble implements round-3 Falcon; the parameter names and encodings will be re-checked when FIPS 206 is final. The FIPS 206 · FN-DSA tab is this lesson animated.',
        '#rw-bench10 > h4': 'The bench · Falcon\'s Verify by hand (specification v1.2, Algorithm 16; FIPS 206 is a draft)',

        // ---- lesson 11: security levels ----
        '#rw-l11 > summary': '<span class="num">11</span>Security levels, Shor and Grover<span class="sub">what a quantum computer breaks, and by how much</span>',
        '#rw-l11 p.line': 'Shor\'s algorithm breaks RSA and elliptic curves outright; Grover\'s only halves the exponent of a brute-force search, and NIST\'s five levels are sized for that.',
        '#rw-l11 .idea': '<h4>The idea</h4><p>A large quantum computer would break today\'s public-key algorithms, RSA and elliptic curves, outright, with Shor\'s algorithm. Against everything else it only helps a little: Grover\'s algorithm halves the strength of AES keys and hashes, as if they were half as long. The new schemes are sized with that in mind, in five levels of strength.</p><p><b>What it is for.</b> Picking the right level for a key or a certificate, and knowing why secrets recorded today should move first.</p>',
        '#rw-l11 p.plain': '<b>In plain terms.</b> Shor\'s algorithm (period finding) breaks RSA, ECDSA, ECDH and X25519 outright, in polynomial time. Grover\'s only square-roots an unstructured search, so a 128-bit key keeps about 64 bits of quantum strength. NIST\'s five levels are pegged to AES-128/192/256 key search (1, 3, 5) and SHA-256/384 collision search (2, 4): ML-KEM-512/768/1024 claim 1/3/5, ML-DSA-44/65/87 claim 2/3/5. Recorded traffic can be decrypted later, so the KEM migrates before the signatures.',
        '#rw-l11 .lbody > .board > h4, #rw-l11 .lbody > .lcol > .board > h4': 'The board',
        '#rw-bench11 > h4': 'The bench · NIST\'s categories in gates',

        // ---- lesson 12: HQC ----
        '#rw-l12 > summary': '<span class="num">12</span>Codes, and HQC <span class="draft">round 4 · FIPS 207 not yet drafted</span><span class="sub">a KEM from error-correcting codes: the message survives the noisy channel</span>',
        '#rw-l12 p.line': 'HQC hides a codeword under sparse noise; the key holder cancels most of it and an error-correcting code removes the rest, so the problem is decoding a random code, not a lattice.',
        '#rw-l12 .idea': '<h4>The idea</h4><p>HQC hides a message by sending it through deliberate noise: about a third of the bits arrive flipped. An error-correcting code, the kind that lets a scratched disc still play, puts the message back together. Only the holder of the secret key can cancel enough of the noise for the code to work; anyone else sees about half the bits wrong, which no code can repair.</p><p><b>What it is for.</b> HQC is NIST\'s spare key-agreement scheme. It is built on codes instead of lattices, so one breakthrough cannot fell both.</p>',
        '#rw-l12 p.plain': '<b>In plain terms.</b> HQC (round 4; FIPS 207 to come) hides a codeword C(m) under sparse noise in a quasi-cyclic code over F₂: u = r₁ + h·r₂, v = C(m) + s·r₂ + e. The key holder computes v − u·y, which cancels the dense h terms and leaves the sparse noise x·r₂ − r₁·y + e; it flips about a third of the bits, and a concatenated Reed–Solomon (outer) and duplicated Reed–Muller (inner) code still corrects it. Without y the noise is dense and the message is unreadable.',
        '#rw-l12 .check p.cap': 'Real HQC: make a key, encapsulate a secret and decapsulate it; then flip one bit of the ciphertext and watch the answer turn to an unrelated key.',
        '#rw-bench12 > h4': 'The bench · Ten KATs, and why the decoder listens to sums',

        // ---- lesson 13: Q-day ----
        '#rw-l13 > summary': '<span class="num">13</span>Q-day, and harvest now, decrypt later<span class="sub">when a quantum computer could break today\'s keys</span>',
        '#rw-l13 p.line': 'Nobody can date a cryptographically relevant quantum computer (CRQC); data recorded today is exposed the day one runs.',
        '#rw-l13 .idea': '<h4>The idea</h4><p>No quantum computer today is large enough to break RSA or elliptic-curve keys, and nobody knows the year one will be. The machines of 2026 are hundreds to thousands of times too small. But traffic encrypted today can be recorded today and decrypted the day such a machine exists. So the question is not only “when?” but “how long must this data stay confidential, and how long will it take to replace the keys that protect it?”</p><p><b>What it is for.</b> Deciding what to move to post-quantum keys first, without guessing a date.</p>',
        '#rw-bench13 > h4': 'The bench · The resource arithmetic',

        // ---- the exam ----
        '#rw-lx > summary': '<span class="num">Exam</span>The exam<span class="sub" data-modes="bn">seventeen questions, marked on the page</span><span class="sub" data-modes="a">nineteen questions, marked on the page</span><span class="sub" data-modes="x">twenty-two questions, marked on the page</span>',
        '#rw-lx p.line': 'Seventeen to twenty-two questions on the thirteen lessons; some are answered by what you did on the boards.',
      },

      exact: {
        'The White Queen\'s ledger · how far off is the jam?': 'The ledger · how far off is a CRQC?',
        // the statement and board headings (shared with the other lessons' modules; the same value)
        'The Turtle\'s statement, short': 'The statement, short',
        'The Turtle\'s statement': 'The statement',
        'The Turtle\'s statement · HQC-PKE': 'The statement · HQC-PKE',
        'The Gryphon\'s board': 'The board',

        // lesson 9
        'Pick another parameter set in the timetable.': 'Pick another parameter set on the board.',

        // lesson 10
        'Alice names a target': 'Pick a target',
        'The verifier checks only that the step is short. Alice can check it; she cannot take one.': 'The verifier checks only that the step is short. Anyone can check it; only the holder of the good basis can take one.',
        ': the secret map\'s shape appears.': ': the secret basis\'s shape appears.',

        // lesson 11
        'the Jabberwock has a quantum computer': 'the adversary has a quantum computer',
        'Untick it again: the old locks stand once more, for now.': 'Untick it again: RSA and the curves stand once more, for now.',
        'Answer question 11 of the exam: which locks fall to Shor?': 'Answer question 11 of the exam: which algorithms fall to Shor?',

        // lesson 12: the boards
        'The Gryphon\'s board 1 · the ring with no sizes, n = 29': 'Board 1 · the ring with no sizes, n = 29',
        'The Gryphon\'s board 2 · Grief: RM(1, 3), each bit said three times, decoded by the Hadamard transform': 'Board 2 · the inner code: RM(1, 3), each bit sent three times, decoded by the Hadamard transform',
        'The Gryphon\'s board 3 · Laughing and Grief together: a toy HQC with n = 131': 'Board 3 · both codes together: a toy HQC with n = 131',
        'The Gryphon\'s board 4 · the salted Fujisaki–Okamoto transform, with board 3 inside': 'Board 4 · the salted Fujisaki–Okamoto transform, with board 3 inside',
        'The pool splashes': 'Add channel noise',
        'Dry': 'Clear the noise',
        'click a mark to flip it': 'click a bit to flip it',
        'The Knave decodes without y': 'Mallory decodes without y',
        'the Knave flips one bit of u': 'Mallory flips one bit of u',
        'Let the pool splash, more flips each time, until the tale decodes wrong.': 'Add channel noise, more flips each time, until the message decodes wrong.',
        // lesson 12: the toy KEM ledger
        'The Knave': 'Mallory',
        'One bit of u changes u·y by a rotated copy of y, a handful of marks: the tale may still decode. It does not matter.': 'One bit of u changes u·y by a rotated copy of y, a handful of bits: the message may still decode. It does not matter.',
        'c crosses the table unchanged': 'c crosses the channel unchanged',
        'Re-telling the tale he heard gives exactly the ciphertext he received.': 'Re-encrypting the m he decoded gives exactly the ciphertext he received.',
        'The re-told tale differs from what arrived: someone touched it. He does not say so.': 'The re-encryption differs from what arrived: someone touched it. He does not say so.',
        'Equal to the Hatter\'s K.': 'Equal to Alice\'s K.',
        'Not the Hatter\'s K, and not an error: implicit rejection.': 'Not Alice\'s K, and not an error: implicit rejection.',
        'Hatter\'s K': 'Alice\'s K',
        // lesson 12: the real-HQC note (the fragment after <code>pqlab.hqc</code>)
        ', which reproduces all 300 of the reference\'s known-answer tests. The second button reproduces the first three here (the reference implementation v5.0.0). Not constant time: a classroom, not a KEM to use.': ', which reproduces all 300 of the reference\'s known-answer tests. The second button reproduces the first three here (the reference implementation v5.0.0). Not constant time: a classroom, not a KEM to use.',

        // the exam: options that hold lore (the radio's value keeps the original, so grading is untouched)
        'She subtracts sᵀ·u and only the small eᵀ·r is left to round away': 'He subtracts sᵀ·u and only the small eᵀ·r is left to round away',
        'The Cat is not allowed to do arithmetic': 'Eve is not allowed to do arithmetic',
        'nothing until the Hatter arrives': 'nothing until Alice sends again',
        'The good map has more trees': 'The good basis has more lattice points',
        'They mark exactly the same trees; the good map just makes the nearest one easy to find': 'They generate exactly the same points; the good basis just makes the nearest one easy to find',
        'The bad map is a different orchard': 'The bad basis is a different lattice',
        'Only the bad map is safe to use': 'Only the bad basis is safe to use',
        'With the lies, nobody can work the sums backwards without the secret': 'With the errors, nobody can work the sums backwards without the secret',
        'always rounding to the nearest corner would slowly give away the secret map': 'always rounding to the nearest corner would slowly give away the secret basis',
      },

      patterns: [
        fb('Harvest now, decrypt later\\. The White Queen remembers the future: what you post to-day is opened the day the machine arrives\\.', 'Harvest now, decrypt later: traffic recorded today is decrypted the day a CRQC runs.'),
        // lesson 9: the board's readout (one text node; the compare text may follow)
        [/2\^h = 2\^(\d+) cups and nobody counts them/, '2^h = 2^$1 one-time leaves, and no record of which were used is kept'],
        [/^(\d+) SHAKE256 calls to sign; the digest chose cup (\d+) of tree (\d+) on layer 0, then each layer signs the root below it\. The lit cell is the cup used \(of 512 per tree, 64 cells shown\); the boxes are the authentication path, bottom to top\.$/, '$1 SHAKE256 calls to sign; the digest chose leaf $2 of tree $3 on layer 0, then each layer signs the root below it. The lit cell is the one-time key used (of 512 per tree, 64 cells shown); the boxes are the authentication path, bottom to top.'],

        // lesson 12: board 2 and board 3 readouts
        [/^sent (\d{4}) as 8 marks said three times; (\d+) of 24 flipped\./, 'sent $1 as 8 bits, each sent three times; $2 of 24 flipped.'],
        [/Too many marks blotted: another codeword is now closer\./, 'Too many bits flipped: another codeword is now closer.'],
        [/Without y the Knave cannot cancel s·r₂: (\d+) of 120 marks are wrong, about half, and the tale is noise\./, 'Without y, Mallory cannot cancel s·r₂: $1 of 120 bits are wrong, about half, and the message is noise.'],
        [/\bThe same m the Hatter chose\b/, 'The same m Alice chose'],
        // lesson 12: the ledger's verdict (the self-check reads its first words: keep "Implicit rejection")
        [/^Implicit rejection\. The tale decoded (correctly|wrongly), the re-encryption differed, and the Knave got K̄\.$/, 'Implicit rejection. The message decoded $1, the re-encryption differed, and Mallory got K̄.'],

        // the exam's score line
        [/^(\d+) of (\d+) smoke rings\. The Caterpillar nods, slowly, and says nothing\.$/, '$1 of $2 correct. Full marks.'],
        [/^(\d+) of (\d+) smoke rings\. The Caterpillar exhales\. “Not yet\.”$/, '$1 of $2 correct. Nearly: look at the ones marked wrong.'],
        [/^(\d+) of (\d+) smoke rings\. “Explain yourself!”$/, '$1 of $2 correct. Go back to the lessons marked wrong and try again.'],

        // the exam's questions (Advanced; Normal and Expert reuse some under other numbers)
        qq('With the Red Queen\'s map u₁ = \\(3, 4\\), u₂ = \\(4, 7\\), Babai\'s rounding for the target t = \\(1, 0\\) lands on', 'With the bad basis u₁ = (3, 4), u₂ = (4, 7), Babai\'s rounding for the target t = (1, 0) lands on'),
        qq('Why can Alice decode t = A·s \\+ e when the Cat, who reads the same sheet, cannot\\?', 'Why can Bob, who holds s, decode t = A·s + e when Eve, who reads the same public values, cannot?'),
        qq('The Knave adds 1 to one coefficient of the ML-KEM ciphertext\\. Decaps returns', 'Mallory adds 1 to one coefficient of the ML-KEM ciphertext. Decaps returns'),
        qq('On the lesson 7 board: sign two messages with one cup, then forge a third that the verifier accepts\\.', 'On the lesson 7 board: sign two messages with one one-time key, then forge a third that the verifier accepts.'),
        qq('On the lesson 1 board, with the Red Queen\'s map: find a target where Babai\'s rounding misses the true nearest point\\.', 'On the lesson 1 board, with the bad basis: find a target where Babai\'s rounding misses the true nearest point.'),
        qq('On the lesson 2 board: widen the Caterpillar\'s lies until even Alice decodes the wrong bit\\.', 'On the lesson 2 board: widen the errors until even Bob, holding the secret, decodes the wrong bit.'),
        qq('On the lesson 10 board: make the Rabbit\'s watch leak its secret shape \\(2000 Babai steps\\)\\.', 'On the lesson 10 board: make the signer\'s rounding leak the shape of the secret basis (2000 Babai steps).'),
        // Beginner
        qq('The good map and the Red Queen\'s map of lesson 1: which is true\\?', 'The good basis and the bad basis of lesson 1: which is true?'),
        qq('Why does the Caterpillar tell a small lie in every sum\\?', 'Why does the key maker add a small error to every sum?'),
        qq('What does the NTT, the step through the looking glass, make faster\\?', 'What does the NTT (the number-theoretic transform) make faster?'),
        qq('On the lesson 1 board, with the Red Queen\'s map: find a spot where her map picks the wrong tree\\.', 'On the lesson 1 board, with the bad basis: find a target where it picks the wrong point.'),
        qq('On the lesson 7 board: sign two messages with one cup, then forge a third\\.', 'On the lesson 7 board: sign two messages with one one-time key, then forge a third.'),
        qq('On the lesson 2 board: widen the lies until even Alice reads the wrong bit\\.', 'On the lesson 2 board: widen the errors until even the key holder reads the wrong bit.'),
        // Expert
        qq('On lesson 1\'s bench: reduce the Red Queen\'s basis to two vectors of norm √5\\.', 'On lesson 1\'s bench: reduce the bad basis to two vectors of norm √5.'),

        // the exam's feedback
        fb('Without s, eliminating the unknowns multiplies the lies until they fill the page\\.', 'Without s, eliminating the unknowns multiplies the errors until they swamp the answer.'),
        fb('X⁸ ≡ −1 ≡ 16 mod 17: the coil folds back with a sign flip\\.', 'X⁸ ≡ −1 ≡ 16 mod 17: the ring wraps round with a sign flip.'),
        fb('Once \\|eᵀ·r\\| passes q/4, the wobble crosses into the other half of the dial\\.', 'Once |eᵀ·r| passes q/4, the error crosses into the other half of the ring.'),
        fb('Same country, different map\\. The whole trick of lattice cryptography is keeping the good map secret\\.', 'Same lattice, different basis. The whole trick of lattice cryptography is keeping the good basis secret.'),
        fb('Working backwards makes the lies grow until they swamp the answer\\. Alice, holding the secret, only has to round off a wobble\\.', 'Working backwards makes the errors grow until they swamp the answer. The key holder only has to round off a small deviation.'),
        fb('Through the glass, multiplying is one number at a time\\.', 'In the transformed domain, multiplying is one coefficient at a time.'),
        fb('A padlock anyone may use, a box only the owner can open\\.', 'Anyone may seal a secret to the public key; only the holder of the private key can open it.'),
        fb('A fingerprint, not a lock: there is no key that turns it back\\.', 'A fingerprint, not encryption: there is no key that turns it back.'),
        fb('Both notes are shown wherever the messages differ, and anyone may mix them\\.', 'Both secret values are revealed wherever the messages differ, and anyone may combine them.'),
        fb('The Cheshire Cat\'s grin: change any leaf and the root changes\\.', 'Change any leaf and the root changes.'),
        fb('The Mouse\'s tale survives the pool of tears: codes, not lattices\\.', 'The message survives the noisy channel because a code corrects it: codes, not lattices.'),
        fb('Her long, thin map rounds to the wrong corner more often than not\\.', 'The long, thin basis rounds to the wrong corner more often than not.'),
        fb('Two signatures show both notes wherever the messages differ\\.', 'Two signatures reveal both secret values wherever the messages differ.'),
        fb('Too much lying and the wobble crosses the halfway mark: even the secret cannot help\\.', 'Too much error and the deviation crosses the halfway mark: even the secret cannot help.'),
        fb('256 bits × 32 bytes\\. Lesson 7\'s cups, at full size; WOTS\\+ shrinks it with hash chains\\.', '256 bits × 32 bytes. Lesson 7\'s one-time keys, at full size; WOTS+ shrinks it with hash chains.'),
        fb('X⁸ ≡ −1, and −1 is 16 mod 17\\. Lesson 3\'s coil folds back with a sign flip\\.', 'X⁸ ≡ −1, and −1 is 16 mod 17. Lesson 3\'s ring wraps round with a sign flip.'),
      ],

      names: [
        [/\bthe White Queen's ledger\b/g, 'the ledger'],
        // lesson 10's readout: the signer holds the good basis, the verifier only the public one
        [/\bthe Rabbit's step\b/g, 'the signer\'s step'],
        [/\bAlice with the Queen's map\b/g, 'the verifier with the public basis'],
        // lesson 12: the noisy channel and its bits
        [/\bwhere the tale starts to arrive wrong\b/g, 'where the message starts to decode wrong'],
        [/\bthe Knave\b/g, 'Mallory'], [/\bThe Knave\b/g, 'Mallory'], [/\bKnave\b/g, 'Mallory'],
        [/\bthe Hatter's K\b/g, 'Alice\'s K'],
        // the self-check's verdicts and the mode check (structure words untouched)
        [/\bthe Turtle's statements\b/g, 'the statements'], [/\bno Turtle's statement\b/g, 'no statement'],
        [/\bthe Jabberwock\b/g, 'the adversary'],
      ],
    },
  },
};
