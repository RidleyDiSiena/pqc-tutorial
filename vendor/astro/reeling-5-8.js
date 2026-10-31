// PQC Wonderland: texts for the classroom (tab reeling), lessons 5 to 8: ML-DSA and rejection sampling, hash functions,
// one-time signatures (Lamport, WOTS+), Merkle trees. Lessons 1-4, 9-12 and the exam live in their own modules; index.js
// merges them under tabs.reeling. See README.md.
export default {
  tabs: {
    reeling: {
      static: {
        // ---------- lesson 5: ML-DSA, rejection sampling ----------
        '#rw-l5 > summary': '<span class="num">5</span>ML-DSA: signatures by rejection sampling (FIPS 204)<span class="sub">the signer discards every candidate that would leak</span>',
        '#rw-l5 > .lbody > p.line, #rw-l5 > .lbody > .lcol > p.line': 'ML-DSA hides its secret under a large random mask and discards every candidate signature that would let the mask slip, so the signatures it keeps carry no information about the key.',
        '#rw-l5 .idea': '<h4>The idea</h4><p>A signature proves who wrote a message. ML-DSA (FIPS 204) builds each signature from the secret key plus a large random mask. Some candidates would let a little of the secret show at the edges of the mask\'s range, so the signer throws those away and tries again, until what it publishes looks the same whatever the secret is.</p><p><b>What it is for.</b> ML-DSA signs certificates, software updates and the handshakes that open a secure connection.</p><p><b>What to notice.</b> Signing the same message twice gives two different signatures, both valid. The number of discarded attempts is not written into either; only the signing time varies.</p>',
        '#rw-l5 > .lbody > p.plain, #rw-l5 > .lbody > .lcol > p.plain': '<b>In plain terms.</b> ML-DSA (FIPS 204) is a Fiat–Shamir-with-aborts lattice signature: z = y + c·s₁, where y is a large uniform mask and c the sparse challenge derived from the message and the commitment w₁. A candidate whose z lies within β of the edge of the mask\'s range would be correlated with s₁, so the signer rejects it and samples a new y; the kept signatures are distributed independently of the secret, which is what the unforgeability (EUF-CMA) argument needs.',
        '#rw-l5 > .lbody > p:nth-of-type(3), #rw-l5 > .lbody > .lcol > p:nth-of-type(3)': {
          a: '<b>Why the abort.</b> The mask y hides s inside z, but only away from the edges of its range: near the edge, the value of z reveals c·s (the shoulders of the histogram, and the attacker only needs the signatures where c = 1, because c is public). The abort throws those away, and the kept distribution is the same flat line for every s. The price is repetition: 4.25 / 5.1 / 3.85 expected attempts per signature for ML-DSA-44 / 65 / 87.',
          x: '<b>Why the abort.</b> The mask y hides s inside z, but only away from the edges of its range: near the edge, the value of z reveals c·s (the shoulders of the histogram, and the attacker only needs the signatures where c = 1, because c is public). The abort throws those away, and the kept distribution is the same flat line for every s: with β = τ·η the largest ‖c·s₁‖∞ can be, a z that passes ‖z‖∞ < γ₁ − β is uniform on (−(γ₁ − β), γ₁ − β] whatever s₁ was. The second check, on LowBits(w − c·s₂), protects s₂ the same way. The price is repetition: FIPS 204 Table 1 expects 4.25 / 5.1 / 3.85 attempts per signature for ML-DSA-44 / 65 / 87.',
        },
        '#rw-l5 > .lbody > p:nth-of-type(4), #rw-l5 > .lbody > .lcol > p:nth-of-type(4)': '<b>Where it bites.</b> Deterministic signing plus a fault equals key recovery. The context string is part of M\', so a signature made for one context does not verify in another. The ML-DSA signing tab is this lesson animated, message by message.',

        // ---------- lesson 6: hash functions ----------
        '#rw-l6 > summary': '<span class="num">6</span>Hash functions: SHA-256, SHA-3 and SHAKE<span class="sub">a fixed-length fingerprint of any input</span>',
        '#rw-l6 > .lbody > p.line, #rw-l6 > .lbody > .lcol > p.line': 'A hash function turns any input into a fixed-length digest that is quick to compute, impossible in practice to invert, and changes about half its bits when one input bit changes.',
        '#rw-l6 .idea': '<h4>The idea</h4><p>A hash is a fingerprint for any message: quick to take, the same every time, and impossible to turn back into the message. Change one letter of the message and about half of the fingerprint changes.</p><p><b>What it is for.</b> Lessons 7, 8 and 9 build whole signature schemes out of nothing but fingerprints, and every post-quantum algorithm on this page uses one inside.</p>',
        '#rw-l6 > .lbody > p.plain, #rw-l6 > .lbody > .lcol > p.plain': '<b>In plain terms.</b> A hash function H: {0,1}* → {0,1}ⁿ maps any input to a fixed-length digest. Three properties: preimage resistance (no input for a given output), second-preimage resistance (no second input for a given one) and collision resistance (no two inputs with one digest). Collisions are the cheapest attack, at about 2ⁿ/² work by the birthday bound. FIPS 203–205 use SHA-256, SHA3-256 and the extendable-output functions SHAKE128 and SHAKE256.',
        '#rw-l6 > .lbody > p:nth-of-type(3), #rw-l6 > .lbody > .lcol > p:nth-of-type(3)': {
          a: '<b>Avalanche.</b> Any input, one fixed-width digest, and no way back from the digest to the input. Half the output bits flip when one input bit does: expected 128 of 256. That is what makes a digest a safe stand-in for the message it was taken from, and what the board above measures.',
          x: '<b>Avalanche.</b> Any input, one fixed-width digest, and no way back from the digest to the input. Half the output bits flip when one input bit does: expected 128 of 256. SHA-256 (FIPS 180-4) is a Merkle–Damgård iteration of a compression function over 512-bit blocks; SHA3-256 and SHAKE (FIPS 202) are Keccak sponges over a 1600-bit state, where the capacity (512 bits for SHA3-256 and SHAKE256, 256 for SHAKE128) sets the security level and SHAKE\'s output can be squeezed to any length.',
        },

        // ---------- lesson 7: one-time signatures ----------
        '#rw-l7 > summary': '<span class="num">7</span>One-time signatures: Lamport and WOTS+<span class="sub">a key that may sign only once</span>',
        '#rw-l7 > .lbody > p.line, #rw-l7 > .lbody > .lcol > p.line': 'A one-time signature key is safe for exactly one message; signing a second, different message with the same key hands anyone the material to forge a third.',
        '#rw-l7 .idea': '<h4>The idea</h4><p>A one-time signature key is a set of secret values, two for every bit of the message. Signing reveals one value from each pair. Sign once and you are safe. Sign two different messages and you have shown both values wherever they differ, and anyone may now mix them into a third message you never signed.</p><p><b>What it is for.</b> The building block of lessons 8 and 9, and the reason some signature keys must count every use: a used one-time key is spent.</p>',
        '#rw-l7 > .lbody > p.plain, #rw-l7 > .lbody > .lcol > p.plain': '<b>In plain terms.</b> A Lamport key holds two random secrets for every bit of the message digest and publishes their hashes; a signature reveals one secret of each pair, and the verifier hashes them and compares. One message per key is safe, since a forger would need a preimage. Two different messages reveal both secrets wherever they differ, so any mixture of the two is now signable. WOTS+ (FIPS 205 §5) shrinks the key with hash chains and a checksum, but stays strictly one-time.',
        '#rw-l7 > .lbody > p:nth-of-type(3), #rw-l7 > .lbody > .lcol > p:nth-of-type(3)': {
          a: '<b>A used key is spent.</b> A one-time key signs once; the second signature is the forgery on the board above. A scheme built from one-time keys must therefore keep count, and it runs out: the state is the list of keys already used, and losing the state is as bad as losing the key. The hash-based signature tab shows the eight-key version with a real forgery.',
          x: '<b>A used key is spent.</b> A one-time key signs once; the second signature is the forgery on the board above. A scheme built from one-time keys must therefore keep count, and it runs out: the state is the list of keys already used, and losing the state is as bad as losing the key. SP 800-208 LMS and XMSS keep that counter and are the cheaper for it; SLH-DSA (FIPS 205) avoids it by choosing the one-time key pseudorandomly from 2ʰ of them (h = 63 to 68 by parameter set), so that two picks of one key are negligible. The hash-based signature tab shows the eight-key version with a real forgery.',
        },

        // ---------- lesson 8: Merkle trees ----------
        '#rw-l8 > summary': '<span class="num">8</span>Merkle trees: inclusion and consistency proofs<span class="sub">one root commits to every leaf</span>',
        '#rw-l8 > .lbody > p.line, #rw-l8 > .lbody > .lcol > p.line': 'A Merkle tree hashes its leaves pairwise up to one root, so a short path of sibling hashes proves that a leaf is in the tree, and a second short proof shows that the tree only grew.',
        '#rw-l8 .idea': '<h4>The idea</h4><p>Fingerprint the leaves in pairs, then fingerprint the pairs, and so on up to one short fingerprint at the top: the root. Anyone who holds the root can be shown that a leaf is in the tree with only a few fingerprints along its path, without seeing the rest.</p><p><b>What it is for.</b> Certificate Transparency logs, which let anyone check what a certificate authority has issued; and the tall tree of lesson 9, where the leaves are one-time keys and the root is the public key.</p>',
        '#rw-l8 > .lbody > p.plain, #rw-l8 > .lbody > .lcol > p.plain': '<b>In plain terms.</b> A Merkle tree hashes leaves in pairs up to one root, with a prefix byte that keeps leaf hashes and node hashes apart (RFC 6962 / 9162). An inclusion proof hands over only the ⌈log₂ n⌉ sibling hashes on the path from one leaf to the root; a consistency proof shows that an older root is a prefix of the new tree, so a log can prove that it only grew and nothing was rewritten.',
        '#rw-l8 > .lbody > p:nth-of-type(3), #rw-l8 > .lbody > .lcol > p:nth-of-type(3)': '<b>Two readings of one tree.</b> The log proving that a leaf is present is the inclusion proof; the log proving that the tree only grew is the consistency proof. Without the 0x00 / 0x01 prefixes an inner node could be re-presented as a leaf (CVE-2012-2459, the Bitcoin duplicate-transaction bug). In one-time-key mode each click spends a leaf; the root does not change, and the counter is the only thing that stops a second signature from the same key.',
        '#rw-l8 > .lbody > p:nth-of-type(4), #rw-l8 > .lbody > .lcol > p:nth-of-type(4)': '<b>Two more readings.</b> Sort the leaves and a tree can prove what it does <em>not</em> contain: the two neighbours of a missing serial, each with its PATH, and the claim that their indices are adjacent. That is a sorted revocation tree, a revocation list the client never downloads. Cut the tree into aligned subtrees and a certificate can be an entry plus its PATH to a subtree everyone already holds, with no signature at all: Merkle Tree Certificates, draft-ietf-plants-merkle-tree-certs. Both tabs use this lesson\'s tree code unchanged.',
        '#rw-l8 > .lbody > p:nth-of-type(5), #rw-l8 > .lbody > .lcol > p:nth-of-type(5)': '<b>Where it bites.</b> Missing domain separation; proofs against the wrong tree size; an absence proof whose neighbours are not adjacent; a subtree nobody vouched for.',
      },
      exact: {
        // the teachers' headings (shared by every lesson; the same strings in the other classroom modules)
        'The Turtle\'s statement, short': 'The statement, short',
        'The Turtle\'s statement': 'The statement',
        'The Turtle\'s statement · Fiat–Shamir with aborts': 'The statement · Fiat–Shamir with aborts',
        'The Gryphon\'s board · one dimension: η = 2, γ₁ = 16, c ∈ {−1, 0, 1}, β = 2, 10 000 samples of z = y + c·s': 'The board · one dimension: η = 2, γ₁ = 16, c ∈ {−1, 0, 1}, β = 2, 10 000 samples of z = y + c·s',
        'The Gryphon\'s board · avalanche': 'The board · avalanche',
        'The Gryphon\'s board · 4-bit Lamport, SHA-256 shown as 4 bytes': 'The board · 4-bit Lamport, SHA-256 shown as 4 bytes',
        'The Gryphon\'s board · click a leaf': 'The board · click a leaf',
        'The Classics master\'s bench · Verify by hand, FIPS 204 Algorithm 8': 'The bench · Verify by hand, FIPS 204 Algorithm 8',
        'The Classics master\'s bench · The birthday bound, counted': 'The bench · The birthday bound, counted',
        'The Classics master\'s bench · Why WOTS+ needs its checksum': 'The bench · Why WOTS+ needs its checksum',
        'The Classics master\'s bench · Consistency by hand, RFC 9162 §2.1.4': 'The bench · Consistency by hand, RFC 9162 §2.1.4',

        // lesson 6: the birthday board
        'Throw a birthday party (16-bit digests)': 'Birthday search (16-bit digests)',
        'expected first collision after about 2⁸ guests, not 2¹⁶': 'expected first collision after about 2⁸ random inputs, not 2¹⁶',
        'guests until two shared a 16-bit digest:': 'random inputs until two shared a 16-bit digest:',

        // lesson 7: the Lamport board (a "clean cup" is a one-time key)
        'New cup': 'New key',
        'New cup. Sign 0101, then 1010, and then try forging.': 'New key. Sign 0101, then 1010, and then try forging.',
        '. Two signatures from one cup were enough.': '. Two signatures from one key were enough.',
        'with the cup.': 'with the key.',
        'with the same cup.': 'with the same key.',

        // lesson 8: the tree board
        'WOTS+ cups under the Hatter\'s key': 'WOTS+ one-time keys under Bob\'s key',
        'Switch the mode to cups and sign with one: a spent cup stays spent.': 'Switch the mode to one-time keys and sign with one: a spent key stays spent.',
        '. The Queen\'s List does this with real serials under a Signed Tree Head; skip a leaf and only the adjacency line notices.': '. The sorted revocation tree does this with real serials under a Signed Tree Head; skip a leaf and only the adjacency line notices.',
      },
      patterns: [
        // lesson 6: the birthday readout (second text node, after the <b>count</b>)
        [/^last (\d+) parties: (.*?)\s+mean (\d+)\s+\(√\(π\/2 · 2¹⁶\) ≈ 321; the room holds 65 536 meanings\)$/, 'last $1 searches: $2   mean $3   (√(π/2 · 2¹⁶) ≈ 321; there are 65 536 possible digests)'],
        // lesson 7: the second signature with one key
        [/^Two messages with one cup: every position now has (one|both) preimages revealed\.$/, 'Two messages with one key: every position now has $1 preimages revealed.'],
        // lesson 8: one-time-key mode of the tree
        [/^(\d+) clean cups under one 32-byte root \(the Hatter's public key\)\. Click a cup to sign with it\.$/, '$1 one-time keys under one 32-byte root (Bob\'s long-term public key). Click a key to sign with it.'],
        [/^Signed with cup (\d+): WOTS\+ signature \+ its (\d+)-hash path to the root\. State → cups spent: ([\d, ]+)\. The root does not change; the counter must\.$/, 'Signed with key $1: WOTS+ signature + its $2-hash path to the root. State → keys spent: $3. The root does not change; the counter must.'],
        [/^Cup (\d+) again\. The signature verifies just as well, and the Hatter has now revealed a second set of preimages from one cup: the counter was the only thing standing between him and lesson 7\.$/, 'Key $1 again. The signature verifies just as well, and Bob has now revealed a second set of preimages from one one-time key: the counter was the only thing standing between him and the forgery of lesson 7.'],
        [/^cup (\d+)$/, 'key $1'],
      ],
      names: [
        // lesson 8's statement (<pre>) and the bench readouts: the tabs this lesson feeds, by what they do
        [/the path is the proof a cup was one of the promised ones/g, 'the path is the proof that the one-time key was one of the committed leaves'],
        [/\bthe Tumtum Tree's own proof\b/g, 'the page\'s own consistency proof'],
        [/\bthe Tumtum Tree's proof\b/g, 'the page\'s consistency proof'],
        // the long tail: a clean cup is a one-time key; the Hatter signs, so he is Bob
        [/\bclean cups\b/g, 'one-time keys'], [/\bclean cup\b/g, 'one-time key'],
        [/\bcups\b/g, 'one-time keys'], [/\bCups\b/g, 'One-time keys'], [/\bcup\b/g, 'one-time key'], [/\bCup\b/g, 'One-time key'],
        [/\bthe Hatter's\b/g, 'Bob\'s'], [/\bthe Hatter\b/g, 'Bob'], [/\bThe Hatter\b/g, 'Bob'],
      ],
    },
  },
};
