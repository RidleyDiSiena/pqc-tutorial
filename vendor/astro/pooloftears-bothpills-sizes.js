// PQC Wonderland: texts for the Pool of Tears (tab pooloftears: HQC-KEM, the FIPS 207 to come), Both Pills (tab bothpills:
// X-Wing, the X25519 + ML-KEM-768 hybrid) and the Sizes Wall (tab sizes). See README.md.
//
// Cast. Pool of Tears: the Mouse (sender) is Alice, Alice (recipient, holds the seed) is Bob, the Cheshire Cat is Mallory: its
// role card says "may touch" and the toggle lets it flip a bit of u on the wire, so it is the active adversary even when the
// toggle is off and it only watches. Both Pills: the March Hare (sender) is Alice, Alice (recipient, holds both component keys)
// is Bob, the Jabberwock is Eve with a quantum computer: it observes ct and computes with whatever component it has broken, it
// never alters anything. The "tale" is the plaintext m; the "pills" / "mushroom halves" are the two component KEMs of the hybrid.
export default {
  tabs: {
    // ============================ THE POOL OF TEARS → HQC-KEM, a code-based KEM ============================
    pooloftears: {
      actors: { 'hq-a-cat': 'hostile' },
      static: {
        '.tab-btn[data-tab="pooloftears"] .fun': 'Code-based KEM',
        '#tab-pooloftears > .lede': {
          b: "HQC-KEM is a key-encapsulation mechanism (a way to send a secret key sealed to someone's public key) built on error-correcting codes rather than lattices. Alice's message to Bob is hidden under deliberate noise; only the holder of the secret key can calm it enough for the code to correct what is left, and by design about a third of the bits Bob decodes arrive wrong. NIST chose HQC on 11 March 2025 as the spare KEM beside ML-KEM, so that one breakthrough cannot break both. Its standard will be FIPS 207, HQC-KEM, and it is not yet drafted. This tab runs the real algorithm (the page's own port of the reference, checked against the published test vectors in lesson 12) and says, below, what is known of the standard to come.",
          a: "HQC-KEM is a code-based KEM: the message is encoded with a concatenated Reed–Muller and Reed–Solomon code and hidden under a dense product of sparse vectors; only the holder of the sparse secret y can cancel enough of it for the decoder to work, and about a third of the bits Bob decodes are wrong before correction. NIST selected HQC on 11 March 2025 (NIST IR 8545) as the spare key-encapsulation mechanism, built on codes rather than lattices, so that one breakthrough cannot fell both. Its standard will be FIPS 207, HQC-KEM, not yet drafted. This tab runs the real thing (the page's own port of the round 4 reference, checked against the published test vectors in lesson 12) and says, below, what is known of the standard to come.",
          x: "HQC-KEM (round 4 specification, 2025-08-22): quasi-cyclic codes over F₂[X]/(Xⁿ − 1) with n a primitive prime; ek = seed<sub>ek</sub> ‖ s where s = x + h·y and x, y have weight ω; ct = u ‖ v ‖ salt with u = r₁ + h·r₂ and v = C.Encode(m) + Truncate(s·r₂ + e). Bob computes v − u·y = C.Encode(m) + x·r₂ − r₁·y + e, so the error the concatenated Reed–Muller/Reed–Solomon code must correct is sparse-times-sparse, with decryption failure rate 2⁻¹²⁸, 2⁻¹⁹² or 2⁻²⁵⁶ by level; implicit rejection follows FIPS 203's re-encryption pattern. NIST selected HQC on 11 March 2025 (NIST IR 8545) as the second KEM, on a hardness assumption (quasi-cyclic syndrome decoding) unrelated to ML-KEM's module-LWE. FIPS 207 has no Initial Public Draft yet; this tab runs the page's own port of the reference v5.0.0, checked against the published KATs in lesson 12, and lists below what NIST has said of the standard to come.",
        },
        '#tab-pooloftears > .sizes:not([aria-label]) > h3': 'What crosses the wire, beside ML-KEM at the same level',
        '#tab-pooloftears > .sizes:not([aria-label]) > p': {
          b: "Code-based keys and ciphertexts are large: the public key is a dense vector of n bits, and the ciphertext is about twice the key. HQC pays in bytes for resting on a different hard problem than ML-KEM. In bytes:",
          a: "Codes pay in bytes for what they save in assumptions. The ciphertext is about twice the key, and the key is a dense vector of n bits. In bytes:",
          x: "ek = seed<sub>ek</sub> ‖ s is 32 + ⌈n/8⌉ bytes; ct = u ‖ v ‖ salt is ⌈n/8⌉ + ⌈n₁n₂/8⌉ + 16, about twice the key. The round 4 dk is ek ‖ seed<sub>dk</sub> ‖ σ ‖ seed<sub>KEM</sub>; FIPS 207 is inclined to permit the 32-byte seed alone. In bytes:",
        },
      },
      exact: {
        // markup
        'The Pool of Tears': 'HQC-KEM, a code-based KEM',
        "Alice's key": "Bob's key",
        "The Mouse's tale": "Alice's message",
        'The Cheshire Cat spoils one letter on the way': 'Mallory flips one bit of the ciphertext on the way',
        'The Mouse': 'Alice',
        'Sender · tells the tale': "Sender · encapsulates to Bob's key",
        'The Cheshire Cat': 'Mallory',
        'In the pool · sees everything, may touch': 'On the wire · sees everything, may touch',
        'Alice': 'Bob',
        'the tale, m': 'the message, m',
        'letters wrong in the pool': 'bits in error before decoding',
        '“Mine is a long and a sad tale!”': 'HQC-KEM: a message under code noise.',
        'Press Play, or Step through one line of the tale at a time.': 'Press Play, or Step through one message at a time.',
        // script: captions and steps
        'Alice grows a key from one seed.': 'Bob derives a key pair from one seed.',
        'She leaves ek by the pool.': 'Bob publishes ek.',
        "Alice's ek (copied)": "Bob's ek (copied)",
        'K is the secret the two will share. θ seeds the sparse vectors of the storm, so the same tale and salt always make the same ciphertext: that is what lets Alice check it later.': {
          b: "K is the secret key Alice and Bob will share. θ is the randomness for the noise, and it comes from the message itself, so the same message and salt always produce the same ciphertext: that is what lets Bob check it later.",
          a: "K is the secret the two will share. θ seeds the sparse vectors of the noise, so the same message and salt always make the same ciphertext: that is what lets Bob check it later.",
          x: "K ‖ θ = G(H(ek) ‖ m ‖ salt) with G = SHA3-512: K is the shared secret and θ seeds the XOF that samples r₁, r₂ and e, so Encaps is a deterministic function of (ek, m, salt). That determinism is what the Fujisaki–Okamoto re-encryption check in Decaps relies on; the salt keeps two encapsulations of the same m from colliding.",
        },
        'He shouts it across the pool: Encaps.': 'Alice encapsulates: Encaps.',
        'ct, through the pool': 'ct, over the wire',
        'The pool of tears, and a paw in it.': "The channel, with Mallory's hand in it.",
        'The pool of tears.': "The channel: the construction's own noise.",
        'Observes ct on the wire': 'Observes ct on the wire',
        'The re-encryption check fails: implicit rejection.': 'The re-encryption check fails: implicit rejection.',
        'K′ differs from K on an honest wire: something is wrong.': 'K′ differs from K on an honest wire: something is wrong.',
        "The check is not about the tale but about the wire: FIPS 203 does the same, and FIPS 207 is expected to keep it. No error is raised; whatever Alice does next with K̄ simply fails to match the Mouse, which is where a protocol catches it.": {
          b: "The check is not about the message but about the wire: anything changed in transit, even one bit, makes Bob's key a random one. FIPS 203 does the same, and FIPS 207 is expected to keep it. No error is raised; whatever Bob does next with K̄ simply fails to match Alice, which is where a protocol catches it.",
          a: "The check is not about the message but about the wire: FIPS 203 does the same, and FIPS 207 is expected to keep it. No error is raised; whatever Bob does next with K̄ simply fails to match Alice, which is where a protocol catches it.",
          x: "The check is not about the message but about the wire: Decaps re-encrypts m′ with the salt from ct and compares the result with ct, the Fujisaki–Okamoto transform with implicit rejection, as in FIPS 203 §7.3, and FIPS 207 is expected to keep it. K̄ = J(H(ek) ‖ σ ‖ ct) is indistinguishable from a real key, so no error is raised and no decryption oracle is exposed; whatever Bob does next with K̄ simply fails to match Alice, which is where a protocol catches it.",
        },
        "The Cat's paw was caught: a random key for Alice, no tale, no error. Untick the Cat to see it read.": "Mallory's change was caught: a random key for Bob, no message, no error. Untick Mallory to see Bob read it.",
        'Encaps did not give the K from G': 'Encaps did not give the K from G',
      },
      patterns: [
        // key generation
        [/^32 random bytes become h \(a dense vector of (\d+) bits\), x and y \(weight (\d+) each\), and s = x \+ h·y\. ek is seed_ek ‖ s; everything secret regrows from seed_KEM\.$/, {
          b: "From 32 random bytes Bob derives a public vector h of $1 bits and two sparse secret vectors x and y (only $2 one-bits each). The public key is h's seed and s = x + h·y; the secret is the seed alone.",
          a: "32 random bytes become h (a dense vector of $1 bits), x and y (weight $2 each), and s = x + h·y. ek is seed_ek ‖ s; everything secret regrows from seed_KEM.",
          x: "seed_ek, seed_dk ← I(seed_PKE); h ← XOF(seed_ek), dense in F₂[X]/(Xⁿ − 1), n = $1; x, y ← XOF(seed_dk), each of weight $2; s = x + h·y. ek = seed_ek ‖ s; everything secret regrows from the 32-byte seed_KEM.",
        }],
        [/^Round 4 keeps dk = ek ‖ seed_dk ‖ σ ‖ seed_KEM, (\d+) bytes; FIPS 207 is inclined to permit the 32-byte seed alone and forbid caching the rest, which changes what is stored, not what is computed\. n = (\d+) \(a primitive prime\), ω = (\d+); (\d+) ms in BigInt\.$/, {
          b: "Bob's whole secret key grows from 32 random bytes. The round 4 format stores more ($1 bytes: the public key and the seeds beside it); FIPS 207 is inclined to allow the 32-byte seed alone, which changes what is stored, not what is computed. Key generation took $4 ms here, in JavaScript BigInt arithmetic.",
          a: "Round 4 keeps dk = ek ‖ seed_dk ‖ σ ‖ seed_KEM, $1 bytes; FIPS 207 is inclined to permit the 32-byte seed alone and forbid caching the rest, which changes what is stored, not what is computed. n = $2 (a primitive prime), ω = $3; $4 ms in BigInt.",
          x: "dk = ek ‖ seed_dk ‖ σ ‖ seed_KEM ($1 bytes) in the round 4 format; σ is the implicit-rejection secret that J(H(ek) ‖ σ ‖ ct) consumes. FIPS 207 is inclined to permit the 32-byte seed_KEM alone and forbid caching the expansion, deliberately differing from FIPS 203, which allows both. The ring is F₂[X]/(Xⁿ − 1) with n = $2 a primitive prime, chosen so that (Xⁿ − 1)/(X − 1) is irreducible over F₂; x and y have weight ω = $3. $4 ms in BigInt.",
        }],
        // publishing ek
        [/^ek is public: the Cat copies it too, and it does him no good\. h is regrown from its first 32 bytes; s is the other (\d+)\.$/, "ek is public: Mallory copies it too, and it does him no good. h is regrown from its first 32 bytes; s is the other $1."],
        [/^Alice's ek (\d+) B$/, "Bob's ek $1 B"],
        // the message
        [/^The Mouse writes his tale: “(.*)”\.$/, 'Alice writes her message: “$1”.'],
        [/^m is exactly k = (\d+) bytes \(padded with spaces\), with a 16-byte salt beside it\. K ‖ θ = G\(H\(ek\) ‖ m ‖ salt\): the shared key and the randomness of the storm both come from the tale\.$/, {
          b: "The message m is exactly k = $1 bytes (padded with spaces), with a 16-byte random salt beside it. Hashing the public key, the message and the salt gives both the shared key K and the randomness θ for the noise.",
          a: "m is exactly k = $1 bytes (padded with spaces), with a 16-byte salt beside it. K ‖ θ = G(H(ek) ‖ m ‖ salt): the shared key and the randomness of the noise both come from the message.",
          x: "m is exactly k = $1 bytes (the Reed–Solomon code's dimension, padded with spaces), with a 16-byte salt beside it. K ‖ θ = G(H(ek) ‖ m ‖ salt), G = SHA3-512: the shared key and the seed of the sparse vectors both derive from the message, which makes Encaps deterministic in (m, salt).",
        }],
        // encapsulation
        [/^C\.Encode is a concatenated code: Reed–Solomon over (\d+) symbols, each symbol then a Reed–Muller codeword of (\d+) bits, (\d+) bits in all\. The message is hidden under s·r₂ \+ e, dense times sparse plus sparse: unreadable without y\. (\d+) ms\.$/, {
          b: "The message is first encoded with an error-correcting code (so that wrong bits can be repaired later), $3 bits in all, then hidden under noise that looks random to anyone without Bob's secret y. $4 ms.",
          a: "C.Encode is a concatenated code: Reed–Solomon over $1 symbols, each symbol then a Reed–Muller codeword of $2 bits, $3 bits in all. The message is hidden under s·r₂ + e, dense times sparse plus sparse: unreadable without y. $4 ms.",
          x: "C.Encode is a concatenated code: a shortened Reed–Solomon code over F₂₅₆ with $1 symbols, each symbol then a duplicated first-order Reed–Muller RM(1,7) codeword of $2 bits, $3 bits in all; v keeps the first n₁n₂ bits of C.Encode(m) + s·r₂ + e. r₁, r₂ (weight ω_r) and e (weight ω_e) come from XOF(θ). The message is hidden under s·r₂ + e, dense times sparse plus sparse: recovering it from (u, v) without y is the quasi-cyclic syndrome decoding problem. $4 ms.",
        }],
        // the channel
        [/^Even with an honest wire, (\d+) of the (\d+) bits Alice will decode arrive wrong \(([\d.]+)%\): that is the construction's own storm, x·r₂ − r₁·y \+ e, and the code is built to correct it with failure probability below (\S+)\.$/, {
          b: "Even with an honest wire, $1 of the $2 bits Bob will decode arrive wrong ($3%): that noise is part of the construction itself, and the code is built to correct it with failure probability below $4.",
          a: "Even with an honest wire, $1 of the $2 bits Bob will decode arrive wrong ($3%): that is the construction's own noise, x·r₂ − r₁·y + e, and the code is built to correct it with failure probability below $4.",
          x: "Even with an honest wire, $1 of the $2 bits Bob will decode arrive wrong ($3%): v − u·y − C.Encode(m) = x·r₂ − r₁·y + e, three products of sparse vectors, counted here for real. The decoder is built to correct it with decryption failure rate below $4 for this parameter set.",
        }],
        [/^Even with an honest wire, (\d+) of the (\d+) bits Alice will decode arrive wrong \(([\d.]+)%\): that is the construction's own storm, x·r₂ − r₁·y \+ e, and the code is built to correct it with failure probability below (\S+)\. The Cat has flipped one more bit, in u\.$/, {
          b: "Even with an honest wire, $1 of the $2 bits Bob will decode arrive wrong ($3%): that noise is part of the construction itself, and the code is built to correct it with failure probability below $4. Mallory has flipped one more bit, in u.",
          a: "Even with an honest wire, $1 of the $2 bits Bob will decode arrive wrong ($3%): that is the construction's own noise, x·r₂ − r₁·y + e, and the code is built to correct it with failure probability below $4. Mallory has flipped one more bit, in u.",
          x: "Even with an honest wire, $1 of the $2 bits Bob will decode arrive wrong ($3%): v − u·y − C.Encode(m) = x·r₂ − r₁·y + e, three products of sparse vectors, counted here for real. The decoder is built to correct it with decryption failure rate below $4 for this parameter set. Mallory has flipped one more bit, in u.",
        }],
        [/^Everything on the wire is public and the Cat learns nothing from it: recovering m from \(u, v\) without y is the quasi-cyclic syndrome decoding problem\. One flipped bit in u changes u·y in about ω = (\d+) places, which the code would still correct; but Alice re-encrypts what she decodes and compares with what arrived, and one bit is enough to fail that\.$/, {
          b: "Everything on the wire is public, and Mallory learns nothing from it. Flipping one bit of u only adds a little more noise, which the code would still correct; but Bob re-encrypts what he decodes and compares it with what arrived, and one changed bit is enough to fail that check.",
          a: "Everything on the wire is public and Mallory learns nothing from it: recovering m from (u, v) without y is the quasi-cyclic syndrome decoding problem. One flipped bit in u changes u·y in about ω = $1 places, which the code would still correct; but Bob re-encrypts what he decodes and compares with what arrived, and one bit is enough to fail that.",
          x: "Everything on the wire is public and Mallory learns nothing from it: recovering m from (u, v) without y is the quasi-cyclic syndrome decoding problem. One flipped bit in u changes u·y in about ω = $1 places (one monomial times y, weight ω), which the code would still correct; but Decaps re-encrypts m′ with the salt from ct′ and compares with ct′, and one bit is enough to fail that: K̄ = J(H(ek) ‖ σ ‖ ct′) instead of K.",
        }],
        // decapsulation
        [/^Alice reads: “(.*)”\.$/, 'Bob reads: “$1”.'],
        [/^v − u·y cancels the h terms; C\.Decode corrects the (\d+) wrong bits; re-encrypting m′ with the same salt gives back exactly the ct that arrived, so K′ = K\.$/, {
          b: "Bob's secret y cancels most of the noise; the code corrects the $1 bits still wrong; re-encrypting the recovered message with the same salt gives back exactly the ciphertext that arrived, so Bob knows it was not altered and K′ = K.",
          a: "v − u·y cancels the h terms; C.Decode corrects the $1 wrong bits; re-encrypting m′ with the same salt gives back exactly the ct that arrived, so K′ = K.",
          x: "v − u·y = C.Encode(m) + x·r₂ − r₁·y + e: the h terms cancel; C.Decode corrects the $1 wrong bits; K′ ‖ θ′ = G(H(ek) ‖ m′ ‖ salt), re-encrypting m′ with θ′ and the same salt gives back exactly the ct that arrived, so K′ = K rather than J(H(ek) ‖ σ ‖ ct).",
        }],
        [/^K′ (==|!=) K\. The decoder did the work: Reed–Muller first \((\d+) symbols of (\d+) bits, majority logic\), then Reed–Solomon over the symbols \(corrects up to (\d+) wrong symbols\)\. (\d+) ms\.$/, {
          b: "K′ $1 K. Bob's secret cancelled most of the noise, the error-correcting code repaired the rest, and re-encrypting the recovered message gave back exactly the ciphertext that arrived. $5 ms.",
          a: "K′ $1 K. The decoder did the work: Reed–Muller first ($2 symbols of $3 bits, majority logic), then Reed–Solomon over the symbols (corrects up to $4 wrong symbols). $5 ms.",
          x: "K′ $1 K. The decoder did the work: the inner duplicated Reed–Muller code first ($2 symbols of $3 bits: majority logic over the repetitions, then first-order Reed–Muller decoding), then the outer Reed–Solomon code over the symbols (corrects up to δ = $4 wrong symbols). Then re-encrypt m′ with the salt from ct and compare: equal, so K′ = K. $5 ms.",
        }],
        [/^The tale survives the pool\. Alice and the Mouse share K; (\d+) bits corrected\.$/, 'The message survives the noise. Alice and Bob share K; $1 bits corrected.'],
        [/^Alice decoded “(.*)”, re-encrypted it with the salt, and the result is not the ct that arrived\. She gets K̄ = J\(H\(ek\) ‖ σ ‖ ct\) instead, a key that looks random and says nothing\.$/, 'Bob decoded “$1”, re-encrypted it with the salt, and the result is not the ct that arrived. He gets K̄ = J(H(ek) ‖ σ ‖ ct) instead, a key that looks random and says nothing.'],
        // texts the script assembles from two literals
        [/^Everything on the wire is public and the Cat learns nothing from it: recovering m from \(u, v\) without y is the quasi-cyclic syndrome decoding problem\. A quantum computer does not help him either: no quantum algorithm is known to decode a random code faster than Grover's square root\.$/, {
          b: "Everything on the wire is public, and Mallory learns nothing from it: without Bob's secret y the message is buried under noise he cannot undo. A quantum computer does not help him either; no known quantum algorithm decodes a random code much faster than a classical one.",
          a: "Everything on the wire is public and Mallory learns nothing from it: recovering m from (u, v) without y is the quasi-cyclic syndrome decoding problem. A quantum computer does not help him either: no quantum algorithm is known to decode a random code faster than Grover's square root.",
          x: "Everything on the wire is public and Mallory learns nothing from it: recovering m from (u, v) without y is the quasi-cyclic syndrome decoding problem (the 2-DQCSD and 3-DQCSD assumptions of the submission), the problem behind McEliece's 1978 system. A quantum computer does not help him either: no quantum algorithm is known to decode a random code faster than Grover's square-root speed-up over information-set decoding.",
        }],
        [/^The decoder even read the tale correctly: one flipped bit is well within the code's reach\. The check is not about the tale but about the wire: FIPS 203 does the same, and FIPS 207 is expected to keep it\. No error is raised; whatever Alice does next with K̄ simply fails to match the Mouse, which is where a protocol catches it\.$/, {
          b: "The decoder even read the message correctly: one flipped bit is well within the code's reach. But the check is not about the message, it is about the wire: anything changed in transit makes Bob's key a random one. FIPS 203 does the same, and FIPS 207 is expected to keep it. No error is raised; whatever Bob does next with K̄ simply fails to match Alice, which is where a protocol catches it.",
          a: "The decoder even read the message correctly: one flipped bit is well within the code's reach. The check is not about the message but about the wire: FIPS 203 does the same, and FIPS 207 is expected to keep it. No error is raised; whatever Bob does next with K̄ simply fails to match Alice, which is where a protocol catches it.",
          x: "The decoder even read the message correctly: one flipped bit is well within the code's reach. The check is not about the message but about the wire: Decaps re-encrypts m′ with the salt from ct′ and compares the result with ct′, the Fujisaki–Okamoto transform with implicit rejection, as in FIPS 203 §7.3, and FIPS 207 is expected to keep it. K̄ = J(H(ek) ‖ σ ‖ ct′) is indistinguishable from a real key, so no error is raised and no decryption oracle is exposed; whatever Bob does next with K̄ simply fails to match Alice, which is where a protocol catches it.",
        }],
        // errors
        [/^Something went wrong in the pool: (.*)$/, 'Something went wrong in the protocol: $1'],
      ],
      names: [
        [/\bAlice's\b/g, "Bob's"], [/\bAlice\b/g, 'Bob'],
        [/\bThe Mouse's\b/g, "Alice's"], [/\bthe Mouse's\b/g, "Alice's"], [/\bThe Mouse\b/g, 'Alice'], [/\bthe Mouse\b/g, 'Alice'],
        [/\bThe Cheshire Cat's\b/g, "Mallory's"], [/\bthe Cheshire Cat's\b/g, "Mallory's"], [/\bThe Cheshire Cat\b/g, 'Mallory'], [/\bthe Cheshire Cat\b/g, 'Mallory'],
        [/\bThe Cat's\b/g, "Mallory's"], [/\bthe Cat's\b/g, "Mallory's"], [/\bThe Cat\b/g, 'Mallory'], [/\bthe Cat\b/g, 'Mallory'],
        [/\bthe pool of tears\b/g, 'the channel'], [/\bThe pool of tears\b/g, 'The channel'], [/\bthe pool\b/g, 'the channel'],
        [/\bhis tale\b/g, 'her message'], [/\bthe tale\b/g, 'the message'], [/\bThe tale\b/g, 'The message'], [/\bthe storm\b/g, 'the noise'],
      ],
    },

    // ============================ BOTH PILLS → X-Wing, a hybrid KEM ============================
    bothpills: {
      actors: { 'bp-a-jabber': 'hostile' },
      static: {
        '.tab-btn[data-tab="bothpills"] .fun': 'Hybrid KEM',
        '#tab-bothpills > h2': 'X-Wing, a hybrid KEM',
        '#tab-bothpills > .lede': {
          b: "A hybrid KEM joins two key-encapsulation mechanisms (ways to send a secret key sealed to someone's public key): X25519, the classical one everyone has trusted for years, and ML-KEM-768, the post-quantum one nobody has broken yet. Alice seals a secret to Bob with both at once, and only someone who breaks <b>both</b> learns anything. Eve, who has a quantum computer, tries.",
          a: "A hybrid KEM: X25519 and ML-KEM-768 in one envelope (X-Wing, a CFRG draft). Alice encapsulates to both of Bob's component keys and combines the two shared secrets with one hash; the result stays secret as long as either component holds, so only someone who breaks <b>both</b> learns anything. Eve, who has a quantum computer, tries one component, the other, or both; you choose which has fallen.",
          x: "X-Wing (draft-connolly-cfrg-xwing-kem): one 32-byte seed expanded with SHAKE256 into an ML-KEM-768 seed and an X25519 key; pk = ek<sub>M</sub> ‖ pk<sub>X</sub>, ct = ct<sub>M</sub> ‖ ct<sub>X</sub>, ss = SHA3-256(ss<sub>M</sub> ‖ ss<sub>X</sub> ‖ ct<sub>X</sub> ‖ pk<sub>X</sub> ‖ label). The X25519 ciphertext and key are hashed in because raw Diffie–Hellman does not bind them; ML-KEM's FO transform already binds ct<sub>M</sub>. The selector also offers the QSF combiner of draft-irtf-cfrg-hybrid-kems with P-256 or P-384. Only an adversary who recovers <b>both</b> component secrets can compute ss; Eve, with a quantum computer, breaks the component you choose, and the ledger shows what her guess is worth.",
        },
        '#tab-bothpills > .sizes > h3': 'What the hybrid costs',
        '#tab-bothpills > .sizes > p': {
          b: "A hybrid costs exactly the sum of its two components: the combiner adds no bytes on the wire. In bytes:",
          a: "A hybrid is the sum of its components plus nothing: pk = ek_M ‖ pk_T and ct = ct_M ‖ ct_T; the combiner adds no bytes on the wire. In bytes:",
          x: "pk = ek_M ‖ pk_T and ct = ct_M ‖ ct_T are plain concatenations; the combiner's other inputs (ct_T, pk_T, the label) are already on the wire or fixed, so it adds nothing. The secret key is one 32-byte seed for both components. In bytes:",
        },
      },
      exact: {
        // markup
        'The mushroom': 'The hybrid',
        'The Jabberwock has broken': 'Eve has broken',
        'nothing yet': 'nothing yet',
        'the classical side (he has a quantum computer)': 'the classical component (she has a quantum computer)',
        'the ML-KEM side (someone found a flaw in the lattice)': 'the ML-KEM component (someone found a flaw in the lattice)',
        'both sides of the mushroom': 'both components',
        'The March Hare': 'Alice',
        'Sender · seals for Alice': "Sender · encapsulates to Bob's key",
        'The Jabberwock': 'Eve',
        'Attacker · with a quantum computer': 'Eavesdropper · with a quantum computer',
        'Alice': 'Bob',
        'Recipient · holds both halves': 'Recipient · holds both component keys',
        '“One side will make you grow taller, and the other side will make you grow shorter.”': 'X-Wing: X25519 and ML-KEM-768 in one KEM.',
        '; the page recomputes every half by hand and compares.': '; the page recomputes each component by hand and compares.',
        // script: captions and steps
        'Alice takes a bite from each side of the mushroom.': 'Bob derives both component keys from one seed.',
        'seed (the whole secret key)': 'seed (the whole secret key)',
        'She hands the March Hare her public key. The Jabberwock copies it, of course.': 'He hands Alice his public key. Eve copies it, of course.',
        'Both halves are public. Neither half is a secret, and knowing both tells the Jabberwock nothing yet.': {
          b: "Both component keys are public. Neither is a secret, and knowing both tells Eve nothing yet.",
          a: "Both component keys are public. Neither half of pk is a secret, and knowing both tells Eve nothing yet.",
          x: "Both component keys are public: ek_M (ML-KEM encapsulation key) and pk_T (the X25519 or NIST-curve public key). Neither is a secret, and knowing both tells Eve nothing yet; pk_T is later hashed into the combiner, so it also binds the exchange.",
        },
        "Alice's pk (copied)": "Bob's pk (copied)",
        'The Hare seals two envelopes at once.': 'Alice encapsulates to both component keys at once.',
        'Encaps both halves: ct = ct_M ‖ ct_T': 'Encaps both components: ct = ct_M ‖ ct_T',
        'He stirs the two secrets together.': 'She combines the two secrets.',
        'ss = SHA3-256(ss_M ‖ ss_T ‖ ct_T ‖ pk_T ‖ label). Drop either secret and the hash is a different 32 bytes. The classical ciphertext and key go in too, so that half is bound to this exchange.': {
          b: "The two secrets are hashed together into one 32-byte key. Leave either one out and the result is a completely different key, so an attacker needs both.",
          a: "ss = SHA3-256(ss_M ‖ ss_T ‖ ct_T ‖ pk_T ‖ label). Drop either secret and the hash is a different 32 bytes. The classical ciphertext and key go in too, so that component is bound to this exchange.",
          x: "ss = SHA3-256(ss_M ‖ ss_T ‖ ct_T ‖ pk_T ‖ label), the combiner of the X-Wing draft (QSF uses the same shape with its own label). Drop either secret and the hash is a different 32 bytes. ct_T and pk_T go in because raw Diffie–Hellman does not bind the shared secret to the keys; ct_M is left out because ML-KEM's FO transform already binds it to ss_M.",
        },
        'The Jabberwock watches the envelope go by.': 'Eve watches the ciphertext go by.',
        "The Jabberwock runs Shor's algorithm on ct_T and pk_T. He has ss_T.": "Eve runs Shor's algorithm on ct_T and pk_T. She has ss_T.",
        'The Jabberwock has found a flaw in the lattice. He has ss_M.': 'Eve has found a flaw in the lattice. She has ss_M.',
        'The Jabberwock has broken both sides of the mushroom.': 'Eve has broken both components.',
        "With both halves in hand, the combiner is just a hash. He computes Alice's secret exactly.": "With both secrets in hand, the combiner is just a hash. She computes Bob's secret exactly.",
        'He plugs in what he has and zeros for the rest. SHA3-256 of the wrong input is 32 bytes of nothing.': 'She plugs in what she has and zeros for the rest. SHA3-256 of the wrong input is 32 bytes of nothing.',
        'Observes ct; computes SHA3-256 with two unknown halves': 'Observes ct; computes SHA3-256 with two unknown secrets',
        'Both halves known: the hybrid is fully broken. A hybrid buys insurance against one failure, not two.': {
          b: "Both secrets known: the hybrid is fully broken. A hybrid protects against one of its components failing, not both.",
          a: "Both component secrets known: the hybrid is fully broken. A hybrid buys insurance against one failure, not two.",
          x: "Both component secrets known: with ss_M and ss_T, ct_T and pk_T from the wire and the public label, the combiner is a public function and Eve computes ss exactly. A hybrid is IND-CCA as long as one component is; it buys insurance against one failure, not two.",
        },
        'his guess': 'her guess',
        'Alice opens both envelopes with her one seed and reaches the same 32 bytes.': 'Bob decapsulates both components with his one seed and reaches the same 32 bytes.',
        "Alice's secret does not match the Hare's.": "Bob's secret does not match Alice's.",
        'Decaps re-expands the seed, decapsulates ct_M with dk_M, multiplies ct_T by sk_T, and runs the same hash. Neither half alone would have got her here.': {
          b: "Bob re-derives both component keys from his seed, opens the ML-KEM ciphertext with one and completes the Diffie–Hellman with the other, then runs the same hash. Neither component alone would have got him here.",
          a: "Decaps re-expands the seed, decapsulates ct_M with dk_M, multiplies ct_T by sk_T, and runs the same hash. Neither component alone would have got him here.",
          x: "Decaps re-expands the 32-byte seed with SHAKE256 into (seed_M, sk_T), runs ML-KEM Decaps(dk_M, ct_M) for ss_M (implicit rejection inside), computes ss_T = DH(sk_T, ct_T), and evaluates the same SHA3-256 combiner over ss_M ‖ ss_T ‖ ct_T ‖ pk_T ‖ label. Neither component alone would have got him here.",
        },
        'Something is wrong: the honest parties disagree.': 'Something is wrong: the honest parties disagree.',
        'Both sides broken; the Jabberwock has the secret. Hybrids are insurance against one break, not two.': 'Both components broken; Eve has the secret. Hybrids are insurance against one break, not two.',
        'Sealed with both pills. Nothing broken, nothing learned.': 'Sealed with both components. Nothing broken, nothing learned.',
      },
      patterns: [
        // key generation
        [/^One 32-byte seed\. SHAKE256 stretches it into an ML-KEM seed \(64 B\) and (.+); the two public halves are simply laid end to end\.$/, {
          b: "One 32-byte seed. A hash (SHAKE256) stretches it into an ML-KEM seed (64 B) and $1; the two public keys are simply laid end to end.",
          a: "One 32-byte seed. SHAKE256 stretches it into an ML-KEM seed (64 B) and $1; the two public component keys are simply laid end to end.",
          x: "One 32-byte seed. SHAKE256 stretches it into an ML-KEM seed (64 B, d ‖ z for ML-KEM.KeyGen_internal) and $1; pk = ek_M ‖ pk_T, a plain concatenation.",
        }],
        [/^Recomputed by hand: (\S+) KeyGen\(seed_M\) gives ek_M \((true|false)\); (\S+) base-point multiply gives pk_T \((true|false)\)\. (.+)$/, {
          b: "The page checked the library's work: deriving the $1 key from the first part of the expansion gives the same ek_M ($2), and multiplying the $3 base point by the second part gives the same pk_T ($4). $5",
          a: "Recomputed by hand: $1 KeyGen(seed_M) gives ek_M ($2); $3 base-point multiply gives pk_T ($4). $5",
          x: "Recomputed by hand: $1 KeyGen(seed_M) gives ek_M ($2); $3 base-point multiply gives pk_T ($4). $5",
        }],
        [/^Alice's pk (\d+) B$/, "Bob's pk $1 B"],
        // encapsulation
        [/^Recomputed by hand from the same (\d+) random bytes; matches the library's ciphertext: (true|false)\.$/, {
          b: "The page redid the encapsulation itself from the same $1 random bytes and got the same ciphertext as the library: $2.",
          a: "Recomputed by hand from the same $1 random bytes; matches the library's ciphertext: $2.",
          x: "Recomputed by hand from the same $1 random bytes (32 for ML-KEM's m, the rest for the ephemeral classical key); ct_M ‖ ct_T matches the library's ciphertext: $2.",
        }],
        // the combiner
        [/^Hand-computed combiner equals the library's shared secret: (true|false)\. The label is the domain separator(.*)\.$/, {
          b: "The page recomputed the hash itself and got the same 32 bytes as the library: $1. The label at the end is a fixed string that marks this hash as this hybrid's, so the same inputs in another scheme give a different key.",
          a: "Hand-computed combiner equals the library's shared secret: $1. The label is the domain separator$2.",
          x: "SHA3-256 over ss_M ‖ ss_T ‖ ct_T ‖ pk_T ‖ label, hand-computed, equals the library's ss: $1. ct_M and ek_M are omitted because ML-KEM's FO transform already binds ct_M to ss_M; the classical values are hashed in because raw Diffie–Hellman does not bind them. The label is the domain separator$2.",
        }],
        // Eve
        [/^Recovers (.+); computes the combiner with what he has$/, 'Recovers $1; computes the combiner with what she has'],
        [/^Missing both secrets\. His guess is unrelated to Alice's ss\.$/, "Missing both secrets. Her guess is unrelated to Bob's ss."],
        [/^Missing (ss_M: 256|ss_T: \d+) bits he cannot guess\. His guess is unrelated to Alice's ss\.$/, {
          b: "Missing $1 bits she cannot guess. One component held, so her guess is unrelated to Bob's secret.",
          a: "Missing $1 bits she cannot guess. Her guess is unrelated to Bob's ss.",
        }],
        // decapsulation
        [/^ss′ equals the Hare's ss: (true|false)\. The Jabberwock's guess equals it: (true|false)\.$/, {
          b: "Bob's secret equals Alice's: $1. Eve's guess equals it: $2.",
          a: "ss′ equals Alice's ss: $1. Eve's guess equals it: $2.",
        }],
        [/^Something went wrong in the protocol: hand-derived halves disagree with the library$/, 'Something went wrong in the protocol: hand-derived components disagree with the library'],
        [/^Sealed\. The (\S+) side fell and the other side held; the secret is still Alice's\.$/, "Sealed. The $1 component fell and the other held; the secret is still Bob's."],
      ],
      names: [
        [/\bAlice's\b/g, "Bob's"], [/\bAlice\b/g, 'Bob'],
        [/\bThe March Hare's\b/g, "Alice's"], [/\bthe March Hare's\b/g, "Alice's"], [/\bThe March Hare\b/g, 'Alice'], [/\bthe March Hare\b/g, 'Alice'],
        [/\bThe Hare's\b/g, "Alice's"], [/\bthe Hare's\b/g, "Alice's"], [/\bThe Hare\b/g, 'Alice'], [/\bthe Hare\b/g, 'Alice'],
        [/\bThe Jabberwock's\b/g, "Eve's"], [/\bthe Jabberwock's\b/g, "Eve's"], [/\bThe Jabberwock\b/g, 'Eve'], [/\bthe Jabberwock\b/g, 'Eve'],
        [/\bboth sides of the mushroom\b/g, 'both components'], [/\bthe mushroom\b/g, 'the hybrid'], [/\bboth pills\b/g, 'both components'],
      ],
    },

    // ============================ THE SIZES WALL → Sizes to scale ============================
    sizes: {
      static: {
        '.tab-btn[data-tab="sizes"] .fun': 'Sizes to scale',
        '#tab-sizes > h2': 'Sizes to scale',
        '#tab-sizes > .lede': {
          b: "Every public key, ciphertext and signature drawn to scale: what FIPS 203 (ML-KEM), 204 (ML-DSA) and 205 (SLH-DSA) produce, next to the classical objects they replace, the FIPS 206 draft (FN-DSA, Falcon) and HQC-KEM, the FIPS 207 to come (round 4 sizes). Beside them are two conservative KEMs NIST did not pick but ISO has: FrodoKEM and Classic McEliece, whose public keys are so large they have their own switch. No crypto runs on this tab; these are the sizes the specifications give. Switch the scale to square root or logarithmic to see the small ones.",
          a: "Everything FIPS 203, 204 and 205 produce, drawn to scale next to the classical objects they replace, the FIPS 206 draft (FN-DSA, Falcon) and HQC-KEM, the FIPS 207 to come (round 4 sizes), plus FrodoKEM (plain LWE) and Classic McEliece (Goppa codes), standardised by ISO rather than NIST. No crypto runs on this tab; these are the specification sizes.",
          x: "Specification sizes, drawn to scale: ML-KEM encapsulation keys and ciphertexts (FIPS 203), ML-DSA public keys and signatures (FIPS 204), SLH-DSA public keys and signatures (FIPS 205, the s and f variants), FN-DSA from the Falcon submission (padded signature lengths, to be confirmed against FIPS 206) and HQC-KEM from the round 4 specification (22 August 2025, Table 6), next to the raw classical encodings they replace (RFC 7748 and RFC 8032 keys, uncompressed NIST points, RSA moduli, raw ECDSA and RSA signatures), and two ISO/IEC 18033-2 Amd 2 KEMs: FrodoKEM in standard mode (salted ciphertexts) and Classic McEliece without plaintext confirmation (public key mt·⌈k/8⌉, ciphertext ⌈mt/8⌉). No crypto runs on this tab.",
        },
      },
      exact: {
        'The Sizes Wall': 'Sizes to scale',
      },
      patterns: [],
      names: [
        [/\bthe Pool of Tears\b/g, 'the HQC-KEM tab'],
      ],
    },
  },
};
