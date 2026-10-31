// PQC Wonderland: texts for the Tumtum Tree (tab tumtum: FIPS 205 SLH-DSA over a Merkle tree, with a Certificate
// Transparency flavour) and the Pocket Watch (tab pocketwatch: FIPS 206 draft FN-DSA / Falcon). See README.md.
//
// Cast. tumtum: the Cheshire Cat (log keeper) -> "the log" (control), the Jabberwock -> Mallory (hostile), Alice the
// auditor -> Bob. pocketwatch: the White Rabbit (signer) -> Alice, the Knave of Hearts (courier) -> Mallory (hostile),
// the Queen of Hearts (verifier) -> Bob. The Lamport "cups" are one-time keys: "key N" in labels, "ots-N" on the tree.

// The Pocket Watch's tamper target: the script's name -> the skin's name.
const PW_TARGETS = [['time', 'message'], ['signature', 'signature'], ['watch face', 'public key']];
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const perTarget = (make) => PW_TARGETS.map(([from, to]) => make(from, to));

export default {
  tabs: {
    // ============================= THE TUMTUM TREE =============================
    tumtum: {
      actors: { 'tt-a-cat': 'control', 'tt-a-jabber': 'hostile', 'tt-a-alice': 'crew' },
      static: {
        '.tab-btn[data-tab="tumtum"] .fun': 'Hash-based signatures',
        '#tab-tumtum > h2': 'Merkle trees and SLH-DSA',
        '#tab-tumtum > .lede': {
          b: 'A Merkle tree hashes many items in pairs, up to one root hash. To prove that one item is in the tree you need only the hashes beside the path from that item to the root, so a few hashes vouch for a whole list. A Certificate Transparency log works this way: the log hashes every certificate it has seen, publishes the root, and proves inclusion with three hashes for eight leaves. The same tree then turns a handful of one-time keys into a signature scheme, with one rule: each key is used once. SLH-DSA (FIPS 205) does the same with a tree of trees so large that the rule takes care of itself.',
          a: 'Merkle trees, then FIPS 205. A Certificate Transparency log keeps every certificate it has seen as the leaves of a Merkle tree, hashed as RFC 6962 prescribes; the auditor holds only the 32-byte root and checks an inclusion proof of log₂(n) sibling hashes. The same tree then holds eight Lamport one-time public keys under one root: a stateful hash-based signature whose whole security rests on never signing twice with the same leaf. SLH-DSA builds a hypertree of such trees out of WOTS+ chains and a FORS few-time key, and derives the leaf from the message digest, so it keeps no state.',
          x: 'Merkle trees, then FIPS 205. Leaf = H(0x00 ‖ data), node = H(0x01 ‖ left ‖ right) as in RFC 6962; the inclusion proof is checked with the RFC 9162 algorithm, walking from the leaf index to the root and combining with each sibling on the correct side. A Lamport one-time key holds two secrets per digest bit and the signature reveals one of each pair; a second signature with the same key reveals both halves of some positions, and a forgery becomes a search over messages whose digest selects only known preimages. SLH-DSA replaces Lamport with WOTS+ chains, puts a FORS few-time key at the bottom, and stacks d layers of XMSS trees into a hypertree; the leaf index comes from the randomized message digest, so the scheme is stateless and its security reduces to the hash function alone. Twelve parameter sets: SHA2 or SHAKE, n = 16, 24 or 32 bytes, and s (small signatures, slow signing) or f (fast signing, larger signatures).',
        },
        '#tab-tumtum .ledger > p.sub': 'SHA-256 from WebCrypto and noble; SLH-DSA from noble. Hashing follows RFC 6962: leaf = H(0x00 ‖ data), node = H(0x01 ‖ left ‖ right). The one-time keys are a toy Lamport scheme: 32-bit Lamport keys, real SHA-256. <span class="up">Newest step on top.</span>',
        '#tab-tumtum .sizes > p': {
          b: 'An inclusion proof for eight leaves is three hashes. A Lamport one-time signature is hundreds of hashes; an SLH-DSA signature is thousands, even though WOTS+ chains and a hypertree shrink what Lamport alone would need. In bytes:',
          a: 'An inclusion proof for eight leaves is three hashes. A Lamport signature is hundreds; SLH-DSA is thousands, because WOTS+ chains and a hypertree shrink what Lamport would need. In bytes:',
          x: 'An inclusion proof for eight leaves is log₂(8) = 3 hashes. A Lamport signature over a 256-bit digest is 256 preimages plus a 512-hash one-time public key and its authentication path; SLH-DSA replaces the preimages with WOTS+ chains (a few dozen hashes per signature, each chain shared by many digit positions) and the single tree with a hypertree, so it is thousands of bytes rather than tens of thousands. In bytes:',
        },
      },
      exact: {
        // controls
        "The Cat's cups": 'One-time keys',
        'each used once, then move one place on': 'each used once, then the state advances',
        'the same cup, again and again': 'the same key reused',
        'Let the Jabberwock alter the leaf': 'Let Mallory alter the leaf',
        // actors
        'The Cheshire Cat': 'The log',
        'Log keeper · Wonderland CT': 'CT log operator · Mission Control',
        'The Jabberwock': 'Mallory',
        'Tamperer · burbling': 'Tamperer · active adversary',
        'Alice': 'Bob',
        // caption at rest
        'Eight certificates rest under the Tumtum tree.': 'Eight certificates are the leaves of a Merkle tree.',
        'Press Play, or Step through one hash at a time.': 'Press Play, or Step through one hash at a time.',
        // scene 1: leaves
        'The Cat hashes each certificate into a leaf.': 'The log hashes each certificate into a leaf.',
        'leaf = SHA-256(0x00 ‖ certificate). The 0x00 prefix keeps leaves and inner nodes from ever colliding.': {
          b: 'leaf = SHA-256(0x00 ‖ certificate). The 0x00 in front marks a leaf, so a leaf hash can never be confused with an inner node.',
          a: 'leaf = SHA-256(0x00 ‖ certificate). The 0x00 prefix keeps leaves and inner nodes from ever colliding.',
          x: 'leaf = SHA-256(0x00 ‖ certificate), RFC 6962 §2.1. The 0x00 prefix domain-separates leaves from inner nodes (0x01), closing the second-preimage attack in which an inner node is presented as a leaf.',
        },
        'Hashes 8 certificates into leaves': 'Hashes 8 certificates into leaves',
        'RFC 6962 domain separation: a leaf hash can never be mistaken for a node hash.': {
          b: 'Leaves and inner nodes are hashed with different first bytes, so one can never be mistaken for the other.',
          a: 'RFC 6962 domain separation: a leaf hash can never be mistaken for a node hash.',
          x: 'RFC 6962 domain separation: leaves are prefixed 0x00 and inner nodes 0x01 before hashing, so no leaf hash can be mistaken for a node hash and no 64-byte leaf can masquerade as a pair of children.',
        },
        // scene 2: root
        'Pairs are hashed upward until one root remains: the grin.': 'Pairs are hashed upward until one root remains.',
        'node = SHA-256(0x01 ‖ left ‖ right). Alice is given only the 32-byte root.': 'node = SHA-256(0x01 ‖ left ‖ right). Bob is given only the 32-byte root.',
        'Builds the tree; publishes the 32-byte root': 'Builds the tree; publishes the 32-byte root',
        "Everything below the root is the Cat's to keep. The root alone commits to all eight leaves.": {
          b: 'The log keeps everything below the root. The root alone pins down all eight leaves: change any certificate and the root changes.',
          a: "Everything below the root is the log's to keep. The root alone commits to all eight leaves.",
          x: "Everything below the root is the log's to keep. The 32-byte root is a binding commitment to all eight leaves: producing a different leaf set with the same root is a second preimage of SHA-256.",
        },
        // scene 3: proof
        'The siblings along the path to the root. Dashed cyan: the proof. Lime: what Alice recomputes.': 'The siblings along the path to the root. Dashed cyan: the proof. Lime: what Bob recomputes.',
        'log2(8) = 3 hashes, 96 bytes, regardless of what the other seven certificates say.': {
          b: 'Three hashes, 96 bytes, and the other seven certificates never have to be shown.',
          a: 'log2(8) = 3 hashes, 96 bytes, regardless of what the other seven certificates say.',
          x: 'log2(8) = 3 hashes, 96 bytes; an inclusion proof is ⌈log2(n)⌉ hashes for a tree of n leaves, regardless of what the other leaves contain (RFC 9162 §2.1.3).',
        },
        // scene 4: tamper and verify
        'The Jabberwock burbles and changes one bit of the certificate.': 'Mallory changes one bit of the certificate.',
        'Alice still has the real root and the real proof.': 'Bob still has the real root and the real proof.',
        'Alters one bit of the certificate Alice was handed': 'Alters one bit of the certificate Bob was handed',
        'The leaf hash changes; every hash above it would too.': 'The leaf hash changes; every hash above it would too.',
        'Alice rebuilds the path and reaches the same grin.': 'Bob rebuilds the path and reaches the same root.',
        'Alice rebuilds the path and reaches a different root.': 'Bob rebuilds the path and reaches a different root.',
        'Three hashes and a comparison. She never saw the other seven certificates.': 'Three hashes and a comparison. He never saw the other seven certificates.',
        'The proof is honest and the root is honest; the certificate is not.': 'The proof is honest and the root is honest; the certificate is not.',
        'Walks from the leaf upward, combining with each sibling on the correct side, and compares against the published root.': {
          b: 'Hashes the certificate, combines it with each of the three sibling hashes in turn, and compares the result with the root he already holds.',
          a: 'Walks from the leaf upward, combining with each sibling on the correct side, and compares against the published root.',
          x: 'RFC 9162 §2.1.3.2: starting from the leaf hash with fn = leaf index and sn = tree size − 1, each proof hash is combined on the left when fn is odd or fn = sn, on the right otherwise, then fn and sn are right-shifted; the result must equal the published root with sn = 0.',
        },
        // scene 5: one-time keys under the tree
        'The same tree, but the leaves are now eight clean cups.': 'The same tree, but the leaves are now eight fresh one-time keys.',
        "Secrets are regrown from a 32-byte seed and the cup number; nothing but the seed and a counter is stored. This is Merkle's 1979 scheme, the ancestor of FIPS 205.": {
          b: 'The secrets are recomputed from a 32-byte seed and the key number, so only the seed and a counter are stored. This is Merkle\'s 1979 scheme, the ancestor of FIPS 205.',
          a: "Secrets are regrown from a 32-byte seed and the key index; nothing but the seed and a counter is stored. This is Merkle's 1979 scheme, the ancestor of FIPS 205.",
          x: "Each secret is SHA-256(seed ‖ key index ‖ position ‖ bit), so nothing but the 32-byte seed and the state counter is stored; the one-time public keys and the tree are recomputed on demand. This is Merkle's 1979 tree signature scheme, the ancestor of XMSS (RFC 8391) and FIPS 205.",
        },
        'cup 0 public key': 'key 0 public key',
        'root = public key': 'root = public key',
        // scene 6: first signature
        'The Cat signs “Take some more tea” with cup 0, then moves one place on.': 'The log signs “Take some more tea” with key 0, then advances the state.',
        'Lamport sign with cup 0; state 0 → 1': 'Lamport sign with key 0; state 0 → 1',
        // scene 7: verify
        'signature, cup 0': 'signature, key 0',
        'Alice hashes each revealed secret and climbs the path to the root.': 'Bob hashes each revealed secret and climbs the path to the root.',
        "Hash each of the 32 preimages once and compare with the cup's public key; hash the public key into a leaf; climb three siblings; compare with the 32-byte root she already holds.": "Hash each of the 32 preimages once and compare with the key's public half; hash that public key into a leaf; climb three siblings; compare with the 32-byte root he already holds.",
        'Only hashing, exactly like the inclusion proof. This is what SLH-DSA verification does, thousands of times.': {
          b: 'Nothing but hashing, exactly like checking the inclusion proof. SLH-DSA verification is the same work, thousands of times over.',
          a: 'Only hashing, exactly like the inclusion proof. This is what SLH-DSA verification does, thousands of times.',
          x: 'Only hashing, exactly like the inclusion proof: one hash per revealed preimage, one per leaf, one per tree level. SLH-DSA verification does the same across WOTS+ chains, a FORS tree and every layer of the hypertree.',
        },
        // scene 8: second message
        'Nobody was counting. The Cat signs two more messages with cup 0.': 'The state was not advanced. The log signs two more messages with key 0.',
        'The state counter did not move. Each new message picks a different side of some pairs, and every side it picks is revealed for good.': 'The state counter did not move. Each new message picks a different side of some pairs, and every side it picks is revealed for good.',
        'Signs two more messages with cup 0 (the state was not advanced)': 'Signs two more messages with key 0 (the state was not advanced)',
        'A stateful hash-based key has one rule. This is what breaking it looks like; nothing fails yet, both signatures verify.': {
          b: 'A stateful hash-based key has one rule: never sign twice with the same one-time key. This is what breaking it looks like; nothing fails yet, both signatures verify.',
          a: 'A stateful hash-based key has one rule. This is what breaking it looks like; nothing fails yet, both signatures verify.',
          x: 'A stateful hash-based key has one rule: the leaf index must never repeat (the state management problem that SP 800-208 constrains to hardware). This is what breaking it looks like; nothing fails yet, both signatures verify, and the leaked preimages are irrevocable.',
        },
        'A second message, a clean cup: cup 1, and move one place on.': 'A second message, a fresh one-time key: key 1, and the state advances.',
        'Six cups left. When they run out the key is finished; that is the price of statefulness.': 'Six one-time keys left. When they run out the key is finished; that is the price of statefulness.',
        'Lamport sign with cup 1; state 1 → 2': 'Lamport sign with key 1; state 1 → 2',
        'Each cup reveals exactly one preimage per position, once, and is then never touched again.': 'Each one-time key reveals exactly one preimage per position, once, and is then never touched again.',
        // scene 9: the forger
        'Only the digest the Cat signed is signable with those. Every other message needs a preimage he does not have.': 'Only the digest the log signed is signable with those. Every other message needs a preimage he does not have.',
        'Searches 20000 messages; none is signable → forgery fails': 'Searches 20000 messages; none is signable → forgery fails',
        'One signature per cup reveals exactly half of each pair: the half the real digest chose. A clean cup leaks nothing usable.': 'One signature per key reveals exactly half of each pair: the half the real digest chose. A one-time key used once leaks nothing usable.',
        // scene 10: SLH-DSA keygen
        'The public key is just a seed and a root. Under that root: a hypertree of Merkle trees over one-time keys.': {
          b: 'The public key is just a seed and a root. Under that root is a tree of trees, and at the bottom, one-time keys, exactly as before.',
          a: 'The public key is just a seed and a root. Under that root: a hypertree of Merkle trees over one-time keys.',
          x: 'pk = (PK.seed, PK.root), FIPS 205 §9.1. Under PK.root: d layers of XMSS trees of height h′ each, with WOTS+ one-time keys at every leaf and a FORS few-time key signed by the bottom layer.',
        },
        // scene 11: SLH-DSA sign
        'The Cat signs the log root with SLH-DSA. This may take a moment.': 'The log signs its root with SLH-DSA. This may take a moment.',
        'Each signature reveals a FORS few-time key, a chain of WOTS+ one-time signatures, and one authentication path per tree layer.': {
          b: 'Each signature contains a few-time key for the message, a chain of one-time signatures that vouch for it, and one path up each tree in the stack.',
          a: 'Each signature reveals a FORS few-time key, a chain of WOTS+ one-time signatures, and one authentication path per tree layer.',
          x: 'FIPS 205 §10.2: a randomizer R, the FORS signature on the message digest, then for each of the d layers a WOTS+ signature on the root below and that tree\'s authentication path. The leaf and FORS indices are taken from the randomized digest.',
        },
        // scene 12: SLH-DSA verify
        'Alice verifies: thousands of hashes, one root, the grin again.': 'Bob verifies: thousands of hashes, one root.',
        'The signature did not verify.': 'The signature did not verify.',
        'Verification rebuilds every authentication path up to PK.root, exactly like the inclusion proof, just 22 layers of it.': 'Verification rebuilds every authentication path up to PK.root, exactly like the inclusion proof, just 22 layers of it.',
        'Only hash functions were used anywhere in this scene. That is the whole security assumption of FIPS 205.': {
          b: 'Nothing but hash functions was used anywhere in this scene. That is the whole security assumption of FIPS 205: as long as the hash is sound, so is the signature.',
          a: 'Only hash functions were used anywhere in this scene. That is the whole security assumption of FIPS 205.',
          x: 'Only hash functions were used anywhere in this scene. FIPS 205\'s security reduces to the (second-)preimage and multi-target resistance of SHA2 or SHAKE; there is no structured algebraic problem, which is why SLH-DSA is the conservative choice next to ML-DSA.',
        },
        // verdicts
        'Something is wrong: the SLH-DSA signature failed.': 'Something is wrong: the SLH-DSA signature failed.',
        'Something is wrong: a tampered leaf verified.': 'Something is wrong: a tampered leaf verified.',
        'Caught: the altered certificate is not in the log. Cups clean, signature holds. Only hashes, all the way down.': 'Caught: the altered certificate is not in the log. Every one-time key used once, signature holds. Only hashes, all the way down.',
        "The log is intact, every cup was used once, and the Cat's signature holds. Only hashes, all the way down.": "The log is intact, every one-time key was used once, and the log's signature holds. Only hashes, all the way down.",
        // bars
        'Lamport signature, 32-bit toy (preimages + pk + path)': 'Lamport signature, 32-bit toy (preimages + pk + path)',
      },
      patterns: [
        // tree leaf labels
        [/^cup-(\d)$/, 'ots-$1'],
        // holds (white-space: pre-line; the script writes a newline)
        [/^Cat's pk (\S+)$/, "the log's pk $1"],
        [/^8 clean cups\s+pk = root 32 B$/, '8 one-time keys\npk = root 32 B'],
        [/^cup 0 spent\s+state → 1$/, 'key 0 spent\nstate → 1'],
        [/^cup 0: (VALID|INVALID)$/, 'key 0: $1'],
        [/^cup 0 used three times\s+state stuck at 1$/, 'key 0 used three times\nstate stuck at 1'],
        [/^cups 0, 1 spent\s+state → 2$/, 'keys 0, 1 spent\nstate → 2'],
        [/^(\d+) of (\d+) secrets\s+from cup 0$/, '$1 of $2 secrets\nfrom key 0'],
        // scene 3
        [/^Alice asks about (cert-0\d)\. The Cat hands her three hashes\.$/, 'Bob asks about $1. The log hands him three hashes.'],
        // scene 5
        [/^Each cup is a Lamport one-time key: (\d+) secrets, each hashed once to make a (\d+)-byte one-time public key\. The root of the tree is the Cat's public key, 32 bytes for all eight\.$/, {
          b: 'Each leaf is a Lamport one-time key: $1 secrets, each hashed once to make a $2-byte one-time public key. The root of the tree is the log\'s public key: 32 bytes stand for all eight.',
          a: 'Each leaf is a Lamport one-time key: $1 secrets, each hashed once to make a $2-byte one-time public key. The root of the tree is the log\'s public key, 32 bytes for all eight.',
          x: 'Each leaf is a Lamport one-time key: two secrets per digest bit, $1 in all, each hashed once to make a $2-byte one-time public key; the leaf is the hash of that public key. The root of the tree is the log\'s public key, 32 bytes for all eight.',
        }],
        // scene 6
        [/^SHA-256 of the message picks one of each pair: (\d+) secrets revealed, (\d+) kept\. The signature carries them, the cup's public key, and its 3-hash path to the root\. Then the counter advances\.$/,
          'SHA-256 of the message picks one of each pair: $1 secrets revealed, $2 kept. The signature carries them, the one-time public key, and its 3-hash path to the root. Then the counter advances.'],
        [/^Signature = (\d+) B of preimages \+ (\d+) B one-time public key \+ 96 B path\. The counter line is the whole security of the scheme\.$/, {
          b: 'Signature = $1 B of revealed secrets + $2 B one-time public key + 96 B path to the root. Advancing the counter is the whole security of the scheme.',
          a: 'Signature = $1 B of preimages + $2 B one-time public key + 96 B path. The counter line is the whole security of the scheme.',
          x: 'Signature = $1 B of preimages + $2 B one-time public key + 96 B authentication path (3 × 32). The state update is the whole security of the scheme: a signer that signs twice from the same leaf has broken it, whatever the hash.',
        }],
        // scene 9
        [/^The Jabberwock holds (\d+) of (\d+) secrets of cup 0\. He tries (\d+) messages and forges one\.$/, 'Mallory holds $1 of $2 secrets of key 0. He tries $3 messages and forges one.'],
        [/^“(.*)” hashes to a digest whose every bit he holds a preimage for\. He reuses cup 0's public key and path\. Alice's check: (VALID|INVALID)\.$/,
          '“$1” hashes to a digest whose every bit he holds a preimage for. He reuses key 0\'s public key and path. Bob\'s check: $2.'],
        [/^The Jabberwock holds (\d+) of (\d+) secrets of cup 0, one per position\. He cannot forge\.$/, 'Mallory holds $1 of $2 secrets of key 0, one per position. He cannot forge.'],
        // verdict
        [/^A reused cup: the Jabberwock signed “(.*)” with the Cat's key\. SLH-DSA picks the cup from the message digest in a tree of 2⁶³, so there is no counter to forget\.$/,
          'A reused one-time key: Mallory signed “$1” with the log\'s key. SLH-DSA picks the leaf from the message digest in a tree of 2⁶³, so there is no counter to forget.'],
      ],
      names: [
        [/\bThe Cheshire Cat\b/g, 'The log'], [/\bthe Cheshire Cat\b/g, 'the log'],
        [/\bThe Cat's\b/g, "The log's"], [/\bthe Cat's\b/g, "the log's"], [/\bThe Cat\b/g, 'The log'], [/\bthe Cat\b/g, 'the log'],
        [/\bThe Jabberwock\b/g, 'Mallory'], [/\bthe Jabberwock\b/g, 'Mallory'],
        [/\bAlice's\b/g, "Bob's"], [/\bAlice\b/g, 'Bob'],
        [/\bcups\b/g, 'one-time keys'], [/\bcup (\d)\b/g, 'key $1'], [/\bcup\b/g, 'one-time key'],
        [/\bWonderland CT\b/g, 'Certificate Transparency'],
        [/\bthe Tumtum tree\b/g, 'the tree'], [/\bThe Tumtum Tree\b/g, 'Merkle trees and SLH-DSA'],
      ],
    },

    // ============================= THE POCKET WATCH =============================
    pocketwatch: {
      actors: { 'pw-a-rabbit': 'crew', 'pw-a-knave': 'hostile', 'pw-a-queen': 'crew' },
      static: {
        '.tab-btn[data-tab="pocketwatch"] .fun': 'Falcon signatures',
        '#tab-pocketwatch > h2': 'FN-DSA, the Falcon signature <span class="draft">FIPS 206 draft</span>',
        '#tab-pocketwatch > .lede': {
          b: 'FN-DSA, also called Falcon, is a post-quantum signature; its standard, FIPS 206, is still a draft. Alice\'s secret key is a hidden "good map" of a lattice: with it she can find a lattice point close to any target. Anyone can hold the public key and check that a point is close to the target, but nobody without the secret can find such a point. The signature is that short step, and it is the smallest post-quantum signature there is.',
          a: 'FN-DSA, the Falcon signature, still a draft (FIPS 206). The secret key is a short basis of an NTRU lattice; the public key h generates the same lattice but gives no short basis. To sign, Alice hashes the message to a point c and uses the short basis to find a lattice point close to it; the signature is the short difference. Bob checks that the difference is short, which only a short basis could have produced. It is the smallest post-quantum signature there is, at the price of a floating-point Gaussian sampler in the signer.',
          x: 'FN-DSA (Falcon) is hash-and-sign over an NTRU lattice in the GPV framework; FIPS 206 is still a draft. sk = (f, g, F, G) with fG − gF = q, q = 12289; pk h = g·f⁻¹ mod q. Sign: c = SHAKE256(nonce ‖ message) in Z_q[x]/(xⁿ + 1); fast Fourier sampling over the short basis yields (s₁, s₂) with s₁ + s₂·h = c and ‖(s₁, s₂)‖² under the bound; only s₂ is sent, Golomb–Rice compressed, so the length varies (a padded variant fixes it). Verify recomputes s₁ = c − s₂·h and checks the norm. Falcon-512 (level 1, n = 512) and Falcon-1024 (level 5, n = 1024); the encodings may change before FIPS 206 is final.',
        },
        '#tab-pocketwatch .sizes > p': {
          b: 'Falcon next to the other post-quantum lattice signature, ML-DSA, and the classical signatures both replace. Drawn to scale, in bytes:',
          a: 'Falcon next to the lattice signature it competes with and the classical ones both replace. Drawn to scale, in bytes:',
          x: 'Falcon-512 and Falcon-1024 next to ML-DSA at the same security levels (44 and 87) and the classical signatures both replace; the padded Falcon length is the one a certificate or protocol would declare. Drawn to scale, in bytes:',
        },
      },
      exact: {
        // controls
        "Rabbit's watch": 'Parameter set',
        'The time': 'Message',
        "The Queen's old watch": 'Compare with',
        'none: Falcon alone': 'none: Falcon alone',
        'The Knave alters': 'Mallory alters',
        'nothing, for once': 'nothing',
        'the time': 'the message',
        'the watch face (public key)': 'the public key',
        // actors and cards
        'The White Rabbit': 'Alice',
        'Signer · owns the watch': 'Signer · holds the secret key',
        'The Knave of Hearts': 'Mallory',
        'Courier · not to be trusted': 'Courier · active adversary',
        'The Queen of Hearts': 'Bob',
        'Verifier · holds the watch face': 'Verifier · holds the public key',
        'What the Rabbit signed': 'What Alice signed',
        'What the Queen received': 'What Bob received',
        // caption at rest
        'The Rabbit is late.': 'Alice has a message to sign.',
        'Press Play, or Step through one message at a time.': 'Press Play, or Step through one message at a time.',
        // scene 1: keygen
        'The Rabbit winds his watch.': 'Alice generates a Falcon key pair.',
        'Inside the case: small polynomials f, g and their completion F, G with fG − gF = q. That is a short basis of an NTRU lattice. On the face: h = g·f⁻¹ mod 12289, which generates the same lattice and is useless for finding anything.': {
          b: 'The secret key is a set of small polynomials f, g, F, G that describe the lattice well (a short basis). The public key is h = g·f⁻¹ mod 12289: it describes the same lattice, but gives no help in finding short steps in it.',
          a: 'The secret key: small polynomials f, g and their completion F, G with fG − gF = q. That is a short basis of an NTRU lattice. The public key: h = g·f⁻¹ mod 12289, which generates the same lattice and is useless for finding anything short in it.',
          x: 'The secret key: f, g sampled small, then F, G solving the NTRU equation fG − gF = q (q = 12289), together a short basis of the NTRU lattice; the signer stores it in FFT form as a Falcon tree for fast Fourier sampling. The public key: h = g·f⁻¹ mod q, a generator of the same lattice that gives no short basis; recovering f, g from h is the NTRU problem.',
        },
        'White Rabbit': 'Alice',
        // scene 2: the request
        'What time is it?': 'Sign this',
        '“What time is it? And you will prove it.”': 'Bob asks Alice for a signed message.',
        'The Queen holds the watch face. She can check any step the Rabbit takes; she cannot take one herself.': 'Bob holds the public key. He can check any signature Alice makes; he cannot make one himself.',
        'Queen of Hearts': 'Bob',
        'Demands the time, signed': 'Asks for the message, signed',
        'Verification needs the message, the signature and the public key. The Queen has the last already.': 'Verification needs the message, the signature and the public key. Bob has the last already.',
        // scene 3: sign
        'SHAKE256(nonce ‖ time) becomes a point c. The watch, holding the short basis, samples a nearby lattice point and keeps the short difference (s₁, s₂) with s₁ + s₂·h = c. Only s₂ travels; s₁ is recomputed.': {
          b: 'The message and a random nonce are hashed to a point c. With the short basis Alice finds a lattice point near c and keeps the short difference (s₁, s₂). Only s₂ is sent; Bob can recompute s₁.',
          a: 'SHAKE256(nonce ‖ message) becomes a point c. The signer, holding the short basis, samples a nearby lattice point and keeps the short difference (s₁, s₂) with s₁ + s₂·h = c. Only s₂ travels; s₁ is recomputed.',
          x: 'c = SHAKE256(nonce ‖ message), a point in Z_q[x]/(xⁿ + 1). Fast Fourier sampling over the short basis draws a lattice point from a discrete Gaussian centred on c (rather than rounding, which would leak the basis) and keeps the short difference (s₁, s₂) with s₁ + s₂·h = c. Only s₂ travels, compressed; s₁ = c − s₂·h is recomputed by the verifier.',
        },
        // scene 4: twenty more
        'He signs it twenty more times, to be sure.': 'Alice signs the same message twenty more times.',
        'Signs the same time twenty more times': 'Signs the same message twenty more times',
        // scene 5 (optional): comparator
        'the comparator signature did not verify': 'the comparator signature did not verify',
        // scene 6: the courier
        'time + signature': 'message + signature',
        'carries it faithfully': 'carries it unchanged',
        'The Knave of Hearts carries it faithfully, for once.': 'Mallory carries it unchanged.',
        'He would like it known that he did not touch the tarts either.': 'A passive courier this time: the message, the signature and the public key arrive as sent.',
        'Knave of Hearts': 'Mallory',
        'Delivers the time and signature unchanged': 'Delivers the message and signature unchanged',
        'The Queen still verifies. Trust is not a courtesy in Wonderland.': {
          b: 'Bob verifies anyway. The courier is never trusted; the signature is what is checked.',
          a: 'Bob still verifies. The courier is never trusted; the signature is.',
          x: 'Bob still verifies. The channel is untrusted by assumption (EUF-CMA says nothing about who carried the bytes); only the signature and the public key are relied upon.',
        },
        'One bit. The Queen has never noticed a stolen tart, let alone this.': 'One bit. Nothing in the bytes shows it; only verification will.',
        // scene 7: verify
        '“Very well. You are late, but you are honest.”': 'Bob verifies the signature: valid.',
        '“OFF WITH HIS HEAD!”': 'Bob rejects the signature: invalid.',
        'The Queen recomputes s₁ = c − s₂·h mod q and measures the step. Short enough: only the short basis could have taken it.': {
          b: 'Bob recomputes s₁ from the message, s₂ and the public key and measures how short the step is. Short enough: only the holder of the secret key could have made it.',
          a: 'Bob recomputes s₁ = c − s₂·h mod q and measures the step. Short enough: only the short basis could have produced it.',
          x: 'Bob recomputes c = SHAKE256(nonce ‖ message) and s₁ = c − s₂·h mod q and checks ‖(s₁, s₂)‖² ≤ β². Short enough: without a short basis, finding such an (s₁, s₂) is the approximate closest-vector problem on the NTRU lattice.',
        },
        'A different time hashes to a different point c; the step from it is no longer short.': 'A different message hashes to a different point c; the step from it is no longer short.',
        'A damaged s₂ either fails to decode or gives a long step.': 'A damaged s₂ either fails to decode or gives a long step.',
        'A different face is a different lattice. The step does not land near anything.': 'A different public key is a different lattice. The step does not land near anything.',
        'Verify hashes (nonce ‖ time) to c, computes s₁ = c − s₂·h mod q, and accepts iff ‖(s₁, s₂)‖² is under the bound. Public and deterministic; no floating point needed to check.': {
          b: 'Verify hashes the nonce and the message to c, recomputes s₁ from s₂ and the public key, and accepts only if the step (s₁, s₂) is short. Anyone can run it, and it needs no floating point.',
          a: 'Verify hashes (nonce ‖ message) to c, computes s₁ = c − s₂·h mod q, and accepts iff ‖(s₁, s₂)‖² is under the bound. Public and deterministic; no floating point needed to check.',
          x: 'Verify decompresses s₂, hashes (nonce ‖ message) to c, computes s₁ = c − s₂·h mod q with integer NTT arithmetic, and accepts iff ‖(s₁, s₂)‖² ≤ β². Public and deterministic; the floating-point sampler lives only in the signer, so a verifier needs no floating point at all.',
        },
        'Something is wrong: a tampered copy verified.': 'Something is wrong: a tampered copy verified.',
        'Something is wrong: an honest signature failed.': 'Something is wrong: an honest signature failed.',
      },
      patterns: [
        // holds
        [/^Rabbit's pk (\d+) B$/, "Alice's pk $1 B"],
        ...perTarget((from, to) => [new RegExp(`^sets the ${esc(from)}\\s+back one bit$`), `flips one bit\nof the ${to}`]),
        // scene 3
        [/^He reads: “(.*)”, and signs it\.$/, 'Alice signs “$1”.'],
        [/^(Falcon-\d+) Sign\(sk, time\) → signature$/, '$1 Sign(sk, message) → signature'],
        [/^(\d+)-byte time, (\d+)-byte signature: 1 header byte, a 40-byte nonce, and s₂ compressed \(Golomb–Rice: the low 7 bits of each coefficient verbatim, the rest in unary\)\.$/, {
          b: '$1-byte message, $2-byte signature: 1 header byte, a 40-byte random nonce, and s₂ in a compressed form.',
          a: '$1-byte message, $2-byte signature: 1 header byte, a 40-byte nonce, and s₂ compressed (Golomb–Rice: the low 7 bits of each coefficient verbatim, the rest in unary).',
          x: '$1-byte message, $2-byte signature: 1 header byte (0x30 + log₂ n for the compressed encoding), a 40-byte nonce, and s₂ compressed (Golomb–Rice: a sign bit, the low 7 bits of each coefficient verbatim, the rest in unary). The compressed length depends on the sample, which is why it varies.',
        }],
        // scene 5: comparator
        [/^The Queen's old watch, wound alongside: (.*)\.$/, 'Signed alongside, for comparison: $1.'],
        [/^The same time signed with (.*): a (\d+)-byte face and a (\d+)-byte signature, next to Falcon's (\d+) and (\d+)\. Both are post-quantum; Falcon is the smaller of the two, at the price of floating-point sampling in the signer\.$/,
          'The same message signed with $1: a $2-byte public key and a $3-byte signature, next to Falcon\'s $4 and $5. Both are post-quantum; Falcon is the smaller of the two, at the price of floating-point sampling in the signer.'],
        [/^The same time signed with (.*): a (\d+)-byte face and a (\d+)-byte signature, next to Falcon's (\d+) and (\d+)\. A classical watch: smaller still, and Shor's algorithm reads its inner workings from the face\.$/,
          'The same message signed with $1: a $2-byte public key and a $3-byte signature, next to Falcon\'s $4 and $5. A classical signature: smaller still, and Shor\'s algorithm recovers its secret key from the public key.'],
        // scene 6: the courier
        ...perTarget((from, to) => [new RegExp(`^The Knave sets the ${esc(from)} back by one bit\\.$`), `Mallory flips one bit of the ${to}.`]),
        [/^Byte (\d+), bit (\d+)\. Nobody at court could tell by looking\.$/, 'Byte $1, bit $2. Nothing about the bytes gives it away.'],
        ...perTarget((from, to) => [new RegExp(`^Flips one bit of the ${esc(from)} in transit$`), `Flips one bit of the ${to} in transit`]),
        // scene 7: verify and verdict
        [/^(Falcon-\d+) Verify\(pk, time, signature\) → (true|false)$/, '$1 Verify(pk, message, signature) → $2'],
        [/^The watch proved the time\. (\d+) bytes did the work of a (\d+)-byte (ML-DSA-\d+) signature\.$/, 'The signature verified. $1 bytes did the work of a $2-byte $3 signature.'],
        ...perTarget((from, to) => [new RegExp(`^The Queen caught the Knave\\. One flipped bit in the ${esc(from)} and the step is no longer short\\.$`), `Bob caught the tampering. One flipped bit in the ${to} and the step is no longer short.`]),
        // bars
        [/^(.*) public key \(the old watch\)$/, '$1 public key (for comparison)'],
        [/^(.*) signature \(the old watch\)$/, '$1 signature (for comparison)'],
      ],
      names: [
        [/\bThe White Rabbit\b/g, 'Alice'], [/\bthe White Rabbit\b/g, 'Alice'], [/\bWhite Rabbit\b/g, 'Alice'],
        [/\bThe Rabbit's\b/g, "Alice's"], [/\bthe Rabbit's\b/g, "Alice's"], [/\bRabbit's\b/g, "Alice's"], [/\bThe Rabbit\b/g, 'Alice'], [/\bthe Rabbit\b/g, 'Alice'],
        [/\bThe Knave of Hearts\b/g, 'Mallory'], [/\bthe Knave of Hearts\b/g, 'Mallory'], [/\bKnave of Hearts\b/g, 'Mallory'], [/\bThe Knave\b/g, 'Mallory'], [/\bthe Knave\b/g, 'Mallory'],
        [/\bThe Queen of Hearts\b/g, 'Bob'], [/\bthe Queen of Hearts\b/g, 'Bob'], [/\bQueen of Hearts\b/g, 'Bob'],
        [/\bThe Queen's\b/g, "Bob's"], [/\bthe Queen's\b/g, "Bob's"], [/\bThe Queen\b/g, 'Bob'], [/\bthe Queen\b/g, 'Bob'],
        [/\bthe watch face\b/g, 'the public key'], [/\bwatch face\b/g, 'public key'], [/\bthe old watch\b/g, 'the comparison signature'],
        [/\bThe Pocket Watch\b/g, 'FN-DSA, the Falcon signature'],
        [/\bin Wonderland\b/g, 'here'],
      ],
    },
  },
};
