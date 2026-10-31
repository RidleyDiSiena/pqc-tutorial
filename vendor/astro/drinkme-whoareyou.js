// PQC Wonderland: texts for Drink Me (tab drinkme, FIPS 203 ML-KEM with key wrapping) and Who. Are. You? (tab whoareyou,
// FIPS 204 ML-DSA). See README.md. Cast: Drink Me: the Duchess's Cook (sender) → Alice, Alice (recipient) → Bob, the Cheshire
// Cat (eavesdropper) → Eve. Who. Are. You?: Trent the Caterpillar (signer) → Trent, Tweedledum & Tweedledee → Courier 1 and
// Courier 2, Alice (verifier) → Bob. Names fallbacks are ordered so Alice → Bob runs before Cook → Alice.
export default {
  tabs: {
    // ================================ DRINK ME ================================
    drinkme: {
      actors: { 'dm-a-cat': 'hostile' },
      static: {
        '.tab-btn[data-tab="drinkme"] .fun': 'Key encapsulation',
        '#tab-drinkme > h2': 'KEM encryption with key wrapping',
        '#tab-drinkme > .lede': {
          b: 'A KEM (key encapsulation mechanism) is a way to send a secret key sealed to someone\'s public key. Alice uses one to send Bob a message in three layers: the KEM produces a key, that key wraps a second key, and the second key encrypts the message. Eve sees every byte on the wire and can read none of it.',
          a: 'KEM encryption with key wrapping, the way CMS does it (RFC 9629). Alice encapsulates to Bob\'s ML-KEM public key, derives a key-encryption key from the shared secret with HKDF, wraps a fresh content-encryption key with AES-KW, and encrypts the message with AES-GCM under that CEK. The KEM never touches the message: it makes a key that wraps the key that locks the message. Eve, the eavesdropper, sees ct, the wrapped key and the body, and recovers nothing.',
          x: 'KEM encryption with key wrapping, the CMS KEMRecipientInfo construction (RFC 9629). Alice runs ML-KEM Encaps (FIPS 203) on Bob\'s encapsulation key to get (K, ct); KEK = HKDF-SHA-256(K, info), where info names the wrap algorithm and key length (CMSORIforKEMOtherInfo in real CMS); wrapped = AES-256-KW(KEK, CEK) (RFC 3394); body = AES-256-GCM(CEK, nonce, plaintext) with ct as associated data. The KEM\'s IND-CCA2 security and the AES-KW integrity check mean Eve, who sees every byte, recovers neither K, the KEK, the CEK nor the plaintext.',
        },
        '#tab-drinkme .sizes > h3': 'What crosses the wire',
        '#tab-drinkme .sizes > p': {
          b: 'The message is a few bytes. Almost everything sent is the KEM ciphertext. Drawn to scale, in bytes:',
          a: 'The message is a few bytes. Almost everything on the wire is the KEM ciphertext ct; the wrapped CEK adds 40 bytes, the nonce 12 and the GCM tag 16. Drawn to scale, in bytes:',
          x: 'The message is a few bytes. Almost everything on the wire is the KEM ciphertext ct: 768, 1088 or 1568 bytes for ML-KEM-512/768/1024 (FIPS 203 Table 3), the modulus size for RSA-OAEP, the ephemeral public key for DHKEM. The wrapped CEK adds 40 bytes (32 + the 8-byte AES-KW check), the nonce 12 and the GCM tag 16. Drawn to scale, in bytes:',
        },
      },
      exact: {
        // controls and actor cards (markup)
        'Alice\'s key': 'Bob\'s key',
        'Let the Cheshire Cat try to open it': 'Let Eve try to decapsulate with her own key',
        'The Duchess\'s Cook': 'Alice',
        'Sender · pepper-cook.wonderland': 'Sender · encapsulates to Bob\'s ek',
        'The Cheshire Cat': 'Eve',
        'Eavesdropper · sees everything': 'Eavesdropper · sees every byte',
        'Alice': 'Bob',
        'Recipient · alice.rabbit-hole.wonderland': 'Recipient · holds dk',
        // captions: the initial one and the fixed mains and subs
        'Something is brewing in the Duchess\'s kitchen.': 'Alice has a message for Bob.',
        'Press Play, or Step through one bottle at a time.': 'Press Play, or Step through one layer at a time.',
        'Alice makes a key before she is thirsty.': 'Bob generates a key pair ahead of time.',
        'ek is public; dk stays in her pinafore pocket.': {
          b: 'The encapsulation key ek is public; the decapsulation key dk never leaves Bob.',
          a: 'ek is public; dk stays with Bob and is never sent.',
        },
        'She leaves her recipe card in the kitchen.': 'Bob publishes ek.',
        'Publishing ek costs nothing. The Cat copies it too; that is fine.': 'Publishing ek costs nothing. Eve copies it too; that is fine: ek is public by design.',
        'The content-encryption key (CEK) is random and used once.': {
          b: 'The content-encryption key (CEK) is a fresh random key that will encrypt the message; it is used once.',
          a: 'The content-encryption key (CEK) is random and used once.',
          x: 'The content-encryption key (CEK): 32 random bytes for AES-256-GCM, generated per message and used once.',
        },
        'The outer bottle: a KEM envelope sealed with Alice\'s ek.': 'The outer layer: a KEM ciphertext made with Bob\'s ek.',
        'The Cook picks K and locks it under Alice\'s modulus with RSA-OAEP. Only Alice\'s primes recover K from ct.': 'Alice picks K and encrypts it under Bob\'s modulus with RSA-OAEP. Only Bob\'s primes recover K from ct.',
        'Encaps gives the Cook a secret K and a ciphertext ct. Only Alice\'s dk can recover K from ct.': {
          b: 'Encaps gives Alice a secret K and a ciphertext ct. Only Bob\'s dk can recover K from ct.',
          a: 'Encaps gives Alice a secret K and a ciphertext ct. Only Bob\'s dk can recover K from ct.',
          x: 'Encaps gives Alice a secret K and a ciphertext ct. Only Bob\'s dk recovers K from ct; anyone else gets nothing (IND-CCA2).',
        },
        'K is stirred into a key-encryption key.': 'K is derived into a key-encryption key.',
        'HKDF with info naming the wrap algorithm and key length, like RFC 9629\'s CMSORIforKEMOtherInfo.': {
          b: 'A key-derivation function (HKDF) turns K into a key for the wrap step; the derivation names the wrap algorithm, so the key fits nothing else.',
          a: 'HKDF with info naming the wrap algorithm and key length, like RFC 9629\'s CMSORIforKEMOtherInfo.',
          x: 'HKDF-SHA-256 with info = "pqc-wonderland/kem-wrap/v1" ‖ "AES-256-KW" ‖ 0x0020, the role RFC 9629\'s DER-encoded CMSORIforKEMOtherInfo plays in real CMS.',
        },
        'The middle bottle: the CEK, wrapped.': 'The middle layer: the CEK, wrapped.',
        'The inner bottle: the message itself.': 'The inner layer: the message itself.',
        'The bottle floats past the Cheshire Cat.': 'The whole envelope passes Eve on the wire.',
        'The Cat sees every byte. None of them is K, the KEK, the CEK or the message.': 'Eve sees every byte. None of them is K, the KEK, the CEK or the message.',
        'The Cat tries a key of his own on the outer bottle.': 'Eve tries a decapsulation key of her own on ct.',
        'Alice opens the outer bottle with dk.': 'Bob decapsulates ct with dk.',
        'The middle bottle will not open.': 'The wrapped CEK will not unwrap.',
        'AES-KW checks its 8-byte integrity value before returning anything. Wrong KEK, no CEK, no message.': {
          b: 'AES-KW checks an 8-byte integrity value before returning anything. Wrong KEK: no CEK, so no message.',
          a: 'AES-KW checks its 8-byte integrity value before returning anything. Wrong KEK, no CEK, no message.',
          x: 'AES-KW (RFC 3394) recovers the 8-byte integrity check value A6A6A6A6A6A6A6A6 and compares it before returning anything. Wrong KEK, no CEK, no message.',
        },
        'The middle bottle opens: out comes the CEK.': 'The CEK unwraps.',
        'The integrity check passed, so KEK′ is right, so K′ is K, so dk was the real one.': {
          b: 'The integrity check passed, so the derived key was right, so the shared secret was right, so dk was Bob\'s real key.',
          a: 'The integrity check passed, so KEK′ is right, so K′ is K, so dk was the real one.',
        },
        'The GCM tag verified, so the label is exactly what the Cook wrote. Alice drinks.': 'The GCM tag verified, so the message is exactly what Alice wrote.',
        // ledger: who labels, step headings, fixed whys
        'ek (recipe card)': 'ek',
        'Publishes ek': 'Publishes ek',
        'Innermost bottle\'s key. It never leaves the kitchen in the clear.': {
          b: 'The key that will encrypt the message. It never leaves Alice in the clear.',
          a: 'The key for the innermost layer, the message body. It never crosses the wire in the clear; it travels only wrapped.',
          x: 'The content-encryption key for AES-256-GCM: 32 random bytes, used once. It crosses the wire only as AES-KW-wrapped ciphertext.',
        },
        'This is the "unwrapping" everyone talks about. Unwrap with the wrong KEK and the check fails loudly.': {
          b: 'The CEK travels only in this wrapped form. Unwrapping with the wrong KEK fails, and says so.',
          a: 'This is the "key unwrapping" of the title. Unwrap with the wrong KEK and the integrity check fails loudly.',
          x: 'AES Key Wrap (RFC 3394): 32 bytes in, 40 out; the 8 extra bytes are the integrity check value, recovered and compared on unwrap. Unwrap under the wrong KEK fails loudly.',
        },
        'Observes the whole bottle on the wire': 'Observes the whole envelope on the wire',
        'Everything here is public. The only secret is the one thing that was never sent: K.': {
          b: 'Everything here is public. The only secret is the one thing that was never sent: the shared secret K.',
          a: 'Everything here is public. The only secret is the one thing that was never sent: K.',
          x: 'Everything here is public: ct, the wrapped CEK, the nonce and the body. The only secret is the one thing that was never sent: K, and with it the KEK and the CEK derived from it.',
        },
        'RSA-OAEP refused the ciphertext outright; the Cat invents a K′ and carries on, grinning.': 'RSA-OAEP refused the ciphertext outright; Eve invents a K′ and carries on.',
        'The integrity check value did not match. This is where an eavesdropper is stopped, before the content is ever touched.': {
          b: 'The integrity check value did not match. This is where an eavesdropper is stopped, before the message is ever touched.',
          a: 'The integrity check value did not match. This is where an eavesdropper is stopped, before the content is ever touched.',
          x: 'The recovered AES-KW integrity check value did not match A6A6A6A6A6A6A6A6, so unwrap returns an error and no key. This is where an eavesdropper is stopped, before the AES-GCM body is ever touched.',
        },
        'The Cat grins and fades. The bottle stays shut.': 'Eve is stopped. AES-KW rejected the wrapped key; the message was never reached.',
        'Three layers, one secret that never travelled. That is KEM encryption with key unwrapping.': {
          b: 'Three layers, one secret that never travelled. That is KEM encryption with key wrapping.',
          a: 'Three layers, one secret that never travelled. That is KEM encryption with key unwrapping.',
          x: 'Three layers (KEM ciphertext, AES-KW-wrapped CEK, AES-GCM body) and one secret, K, that never travelled. That is KEM encryption with key unwrapping, the KEMRecipientInfo of RFC 9629.',
        },
        // bar labels
        'wrapped CEK (middle bottle)': 'wrapped CEK (AES-KW)',
        'body: message + GCM tag (inner bottle)': 'body: message + GCM tag (AES-GCM)',
      },
      patterns: [
        // step 1 why, without and with the classical-key warning
        [/^(.+)\. The (encapsulation key|public key) is what everyone else needs to seal a bottle for her\.$/, {
          b: '$1. The $2 is what anyone needs to send Bob a sealed key.',
          a: '$1. The $2 is what any sender needs to encapsulate a secret to Bob.',
          x: '$1. The $2 is what any sender needs to encapsulate to Bob; dk stays with him and is never sent.',
        }],
        [/^(.+)\. The (encapsulation key|public key) is what everyone else needs to seal a bottle for her\. A classical key: a bottle sealed to it today can be opened by a quantum computer that recovers dk from ek later\.$/, {
          b: '$1. The $2 is what anyone needs to send Bob a sealed key. A classical key: anything sealed to it today can be opened by a quantum computer that recovers dk from ek later.',
          a: '$1. The $2 is what any sender needs to encapsulate a secret to Bob. A classical key: anything encapsulated to it today can be opened by a quantum computer that recovers dk from ek later (harvest now, decrypt later).',
          x: '$1. The $2 is what any sender needs to encapsulate to Bob. A classical key: Shor\'s algorithm recovers dk from ek (factoring the modulus, or the discrete log), so anything encapsulated to it today can be opened later. Harvest now, decrypt later.',
        }],
        // holds
        [/^Alice's ek (\d+) B$/, 'Bob\'s ek $1 B'],
        [/^Alice's ek \(copied\)$/, 'Bob\'s ek (copied)'],
        // step 3 caption
        [/^The Cook writes “(.*)” on a label and picks a key for the smallest bottle\.$/, 'Alice writes “$1” and draws a random content-encryption key.'],
        // step 4 why: the fixed sentence plus KEM_WORDS[kind].encaps (the script concatenates them, so a pattern, not an exact)
        [/^The KEM does not encrypt the message\. It agrees on K, which becomes the key that wraps the key\. Encaps enciphers a random 32-byte m under ek into ct, and hashes the secret out of m; the riddle is m, the answer is K\.$/, {
          b: 'The KEM does not encrypt the message. It produces a shared secret K, which becomes the key that wraps the key.',
          a: 'The KEM does not encrypt the message. It agrees on K, which becomes the key that wraps the key. Encaps encrypts a random 32-byte m under ek into ct and derives K from m.',
          x: 'The KEM does not encrypt the message. It agrees on K, which becomes the key that wraps the key. ML-KEM.Encaps (FIPS 203 §7.2): a random 32-byte m, (K, r) = G(m ‖ H(ek)), ct = K-PKE.Encrypt(ek, m, r); K is 32 bytes.',
        }],
        [/^The KEM does not encrypt the message\. It agrees on K, which becomes the key that wraps the key\. Key transport as a KEM: the sender picks the 32-byte K itself and encrypts it under the modulus with RSA-OAEP\(SHA-256\); the ciphertext is one number the size of the modulus\.$/, {
          b: 'The KEM does not encrypt the message. Here the sender simply picks K and encrypts it to Bob\'s RSA key; K becomes the key that wraps the key.',
          a: 'The KEM does not encrypt the message. It agrees on K, which becomes the key that wraps the key. Key transport as a KEM: Alice picks the 32-byte K herself and encrypts it under the modulus with RSA-OAEP(SHA-256); the ciphertext is one number the size of the modulus.',
        }],
        // step 8 why with the classical-key warning (concatenated by the script)
        [/^Everything here is public\. The only secret is the one thing that was never sent: K\. A Cat with a quantum computer would recover dk from the ek on the recipe card, and then K from ct: harvest now, decrypt later\.$/, {
          b: 'Everything here is public. The only secret is the one thing that was never sent: the shared secret K. But this is a classical key: Eve, with a quantum computer later, could recover dk from the published ek and then K from ct. Harvest now, decrypt later.',
          a: 'Everything here is public. The only secret is the one thing that was never sent: K. Eve with a quantum computer would recover dk from the published ek, and then K from ct: harvest now, decrypt later.',
          x: 'Everything here is public: ct, the wrapped CEK, the nonce and the body. The only secret is the one thing that was never sent: K. Eve records it all; a quantum computer running Shor\'s algorithm later recovers dk from the published ek (factoring or the discrete log), then K from ct, then the KEK, the CEK and the message: harvest now, decrypt later.',
        }],
        // step 5 why (the DHKEM length note, when present, has no lore and rides along in $1)
        [/^Binding the algorithm into the derivation stops a KEK being reused under a different wrap\.((?: K is \d+ bytes here \(DHKEM's Nsecret follows its hash\); HKDF takes any length\.)?)$/, {
          b: 'The derivation mixes in the name of the wrap algorithm, so this KEK fits AES-256-KW and nothing else.$1',
          a: 'Binding the algorithm into the derivation stops a KEK being reused under a different wrap.$1',
          x: 'HKDF-SHA-256(K, info = "pqc-wonderland/kem-wrap/v1" ‖ "AES-256-KW" ‖ 0x0020). Binding the wrap algorithm and key length into the derivation stops a KEK being reused under a different wrap; real CMS DER-encodes this as RFC 9629\'s CMSORIforKEMOtherInfo.$1',
        }],
        // step 7 why
        [/^(\d+) bytes of message become (\d+): ciphertext plus a 16-byte tag\.$/, {
          b: '$1 bytes of message become $2: the encrypted message plus a 16-byte tag that detects any change.',
          a: '$1 bytes of message become $2: ciphertext plus a 16-byte tag.',
          x: '$1 bytes of plaintext become $2: AES-256-GCM ciphertext plus the 16-byte authentication tag; ct is the associated data, so the body is bound to this KEM ciphertext.',
        }],
        // step 10 why, verdict
        [/^Unwrapped CEK (matches|does not match) the Cook's\.$/, 'Unwrapped CEK $1 Alice\'s.'],
        [/^Opened\. Alice reads “(.*)”\.$/, 'Decrypted. Bob reads “$1”.'],
        // bar label
        [/^ct: (.+) ciphertext \(outer bottle\)$/, 'ct: $1 ciphertext (KEM)'],
      ],
      names: [
        [/\bAlice\b/g, 'Bob'],
        [/\bThe Duchess's Cook\b/g, 'Alice'], [/\bthe Duchess's Cook\b/g, 'Alice'], [/\bThe Cook\b/g, 'Alice'], [/\bthe Cook\b/g, 'Alice'],
        [/\bThe Cheshire Cat\b/g, 'Eve'], [/\bthe Cheshire Cat\b/g, 'Eve'], [/\bThe Cat\b/g, 'Eve'], [/\bthe Cat\b/g, 'Eve'],
        [/\bouter bottle\b/g, 'KEM ciphertext'], [/\bmiddle bottle\b/g, 'wrapped CEK'], [/\binner bottle\b/g, 'AES-GCM body'], [/\bbottle\b/g, 'envelope'], [/\bbottles\b/g, 'layers'],
      ],
    },

    // ============================= WHO. ARE. YOU? =============================
    whoareyou: {
      actors: { 'wy-a-trent': 'control' },
      static: {
        '.tab-btn[data-tab="whoareyou"] .fun': 'Lattice signatures',
        '#tab-whoareyou > h2': 'ML-DSA signatures',
        '#tab-whoareyou > .lede': {
          b: 'ML-DSA is a digital signature: Trent signs a statement with his secret key, and anyone holding his public key can check that the statement is his and unchanged. Two couriers each hand Bob a copy, and one copy has a single bit changed. Bob cannot see the difference. The signature check can.',
          a: 'FIPS 204 ML-DSA, the lattice-based signature. Trent generates a key pair, writes a statement and signs it. Two couriers each deliver a copy to Bob, and Courier 2 has flipped one bit of the statement, the signature or the public key. Bob verifies both against Trent\'s public key: the intact copy verifies, the changed one does not. That is what a signature buys (EUF-CMA): without the secret key, no one can produce a signature that verifies on a changed message.',
          x: 'FIPS 204 ML-DSA (Module-Lattice-Based Digital Signature, from CRYSTALS-Dilithium): parameter sets ML-DSA-44, -65 and -87 at security categories 2, 3 and 5. Trent signs a statement; two couriers deliver copies to Bob, one with a single bit flipped in the statement, the signature or the public key. Verify recomputes μ = H(tr ‖ M′), rebuilds w₁′ from z, the hint h and the challenge c̃, checks ‖z‖∞ < γ₁ − β and that c̃ = H(μ ‖ w1Encode(w₁′)); any flipped bit breaks the equation, so the tampered copy fails. RSA-PSS, ECDSA and EdDSA are on the menu for size comparison; Shor\'s algorithm breaks their key pairs.',
        },
        '#tab-whoareyou .sizes > p': {
          b: 'ML-DSA public keys and signatures are much larger than the classical ones they replace. Drawn to scale, in bytes:',
          a: 'ML-DSA keys and signatures next to the classical ones they replace. Drawn to scale, in bytes:',
          x: 'ML-DSA-44/65/87: public keys of 1312/1952/2592 bytes and signatures of 2420/3309/4627 bytes (FIPS 204 Table 2), next to the RSA-PSS, ECDSA and EdDSA sizes they replace. Drawn to scale, in bytes:',
        },
      },
      exact: {
        // controls and actor cards (markup)
        'Tweedledee flips a bit in the': 'Courier 2 flips a bit in the',
        'Trent the Caterpillar': 'Trent',
        'Signer · Hookah Authority': 'Signer · root of trust',
        'Tweedledum & Tweedledee': 'Two couriers',
        'Couriers · nearly identical': 'Couriers · two copies, one bit apart',
        'Alice': 'Bob',
        'Tweedledum\'s copy': 'Courier 1\'s copy',
        'Tweedledee\'s copy': 'Courier 2\'s copy',
        // captions
        'The Caterpillar is not in a hurry.': 'Trent is ready to sign.',
        'The Caterpillar exhales a slow ring of smoke.': 'Trent generates a signing key pair.',
        'A lattice key pair. The secret key is expanded from a 32-byte seed.': {
          b: 'A lattice key pair: a public key anyone may hold and a secret key only Trent holds. The secret key is expanded from a 32-byte seed.',
          a: 'A lattice key pair. The secret key is expanded from a 32-byte seed.',
          x: 'A lattice key pair (FIPS 204 ML-DSA.KeyGen): a 32-byte seed ξ expands through H(ξ ‖ k ‖ ℓ) into ρ, ρ′ and K; pk = (ρ, t₁), sk = (ρ, K, tr, s₁, s₂, t₀).',
        },
        '“Who. Are. You?”': 'Bob asks Trent for a signed statement.',
        'Who. Are. You?': 'request for a signed statement',
        'Alice already holds Trent\'s public key. What she needs is a statement she can check against it.': {
          b: 'Bob already holds Trent\'s public key. What he needs is a statement he can check against it.',
          a: 'Bob already holds Trent\'s public key. What he needs is a statement he can check against it.',
          x: 'Bob already holds Trent\'s public key, obtained out of band (in practice from a certificate). What he needs is a statement he can verify against it.',
        },
        'Sign hashes the message with the public key\'s hash, then runs rejection sampling until a short-enough signature appears.': {
          b: 'Signing combines the message with Trent\'s secret key and fresh randomness; the process retries until a signature of the right shape appears.',
          a: 'Sign hashes the message with the public key\'s hash, then runs rejection sampling until a short-enough signature appears.',
          x: 'ML-DSA.Sign (FIPS 204): μ = H(tr ‖ M′) with tr the hash of the public key; a masking vector y from fresh randomness (hedged), w = Ay, c̃ = H(μ ‖ w1Encode(w₁)), z = y + c·s₁; rejection sampling repeats until ‖z‖∞ < γ₁ − β and the low-order check passes.',
        },
        'He signs the very same statement again.': 'Trent signs the same statement a second time.',
        'Tweedledum copies it exactly. Tweedledee changes one bit.': 'Courier 1 copies it exactly. Courier 2 changes one bit.',
        'Alice checks Tweedledum\'s copy.': 'Bob verifies Courier 1\'s copy.',
        'Alice checks Tweedledee\'s copy.': 'Bob verifies Courier 2\'s copy.',
        'The signature verifies against Trent\'s public key.': 'The signature verifies against Trent\'s public key.',
        // ledger: who labels, step headings, fixed whys, verdicts
        'Trent · Caterpillar': 'Trent',
        'Asks the question and holds up Trent\'s public key': 'Asks for a signed statement; holds Trent\'s public key',
        'Verification needs the message, the signature and the public key. Nothing secret.': {
          b: 'Checking a signature needs the message, the signature and the public key. Nothing secret is involved.',
          a: 'Verification needs the message, the signature and the public key. Nothing secret.',
          x: 'Verification needs the message, the signature and the public key. Nothing secret: Verify is a deterministic public computation anyone can repeat.',
        },
        'Alice can tell the Tweedles apart. Trent is who he says he is; Tweedledee is not to be trusted.': 'Bob can tell the two copies apart. Courier 1\'s copy is Trent\'s statement; Courier 2\'s is not.',
        'Something is wrong: a tampered copy verified.': 'Something is wrong: a tampered copy verified.',
      },
      patterns: [
        // step 1 why (the classical-key note, when present, has no lore and rides along in $2)
        [/^(.+)\. The public key is what Alice will use to check every statement he ever makes\.((?: A classical key: .*)?)$/, {
          b: '$1. The public key is what Bob will use to check every statement Trent signs.$2',
          a: '$1. The public key is what Bob will use to verify every statement Trent ever signs; the secret key never leaves Trent.$2',
          x: '$1. The public key is what Bob will use to verify every statement Trent ever signs; the secret key never leaves Trent. The security notion is EUF-CMA: no one without sk can forge a signature that verifies, even after seeing signatures on messages of their choosing.$2',
        }],
        // step 3 caption
        [/^He writes: “(.*)”, and signs it\.$/, 'Trent writes “$1” and signs it.'],
        // step 5: caption sub, heading, why, byte labels
        [/^In the (statement|signature|public key), byte (\d+), bit (\d+)\. “Contrariwise,” says Tweedledee\.$/, 'In the $1: byte $2, bit $3.'],
        [/^Two copies; Tweedledee flips one bit of the (statement|signature|public key)$/, 'Two copies; Courier 2 flips one bit of the $1'],
        [/^One bit in a (\d+)-byte object\. No human proofreader would catch it\.$/, {
          b: 'One bit in a $1-byte object. No one reading the two copies would spot it; the signature check will.',
          a: 'One bit in a $1-byte object. No human proofreader would catch it; verification will.',
        }],
        [/^Tweedledum (statement|signature|public key)$/, 'Courier 1 $1'],
        [/^Tweedledee (statement|signature|public key)$/, 'Courier 2 $1'],
        // step 7 heading
        [/^(.+) Verify on Tweedledee's copy → (true|false)$/, '$1 Verify on Courier 2\'s copy → $2'],
      ],
      names: [
        [/\bAlice\b/g, 'Bob'],
        [/\bTrent · Caterpillar\b/g, 'Trent'], [/\bTrent the Caterpillar\b/g, 'Trent'], [/\bThe Caterpillar\b/g, 'Trent'], [/\bthe Caterpillar\b/g, 'Trent'],
        [/\bTweedledum\b/g, 'Courier 1'], [/\bTweedledee\b/g, 'Courier 2'], [/\bthe Tweedles\b/g, 'the two couriers'], [/\bThe Tweedles\b/g, 'The two couriers'],
      ],
    },
  },
};
