// PQC Wonderland: texts for the Tea Party Door (tab teaparty, KEM-based authentication). See README.md.
// Cast: the White Rabbit (prover) is Alice, the Mad Hatter (verifier) is Bob, Trent the Caterpillar is Trent (Root CA),
// the Knave of Hearts (impostor with a stolen certificate) is Mallory.
export default {
  tabs: {
    teaparty: {
      actors: { 'tp-a-trent': 'control', 'tp-a-rabbit': 'crew', 'tp-a-hatter': 'crew' },

      static: {
        '.tab-btn[data-tab="teaparty"] .fun': 'KEM authentication',
        '#tab-teaparty > h2': 'KEM-based authentication',
        '#tab-teaparty > .lede': {
          b: 'KEM-based authentication. Alice wants to prove to Bob who she is. Nobody signs anything during the handshake: Bob seals a secret to Alice\'s certified public key (a KEM is a way to send a secret key sealed to someone\'s public key), and Alice proves she recovered it.',
          a: 'KEM-based authentication (KEMTLS-style). Alice, the prover, holds a KEM key pair whose encapsulation key Trent has certified. Bob, the verifier, encapsulates to that key; Alice decapsulates and proves it with an HMAC tag over the transcript. No signature is made during the handshake; the only signature is Trent\'s, on the certificate.',
          x: 'KEM-based authentication, as in KEMTLS and draft-wang-ipsecme-kem-auth-ikev2. The prover\'s certificate carries an ML-KEM (or RSA-OAEP, or DHKEM) SubjectPublicKeyInfo with keyUsage keyEncipherment (keyAgreement for DHKEM) and extendedKeyUsage clientAuth; the verifier runs Encaps to it and sends ct ‖ nonce; the prover answers with tag = HMAC-SHA-256(HKDF-SHA-256(ss, transcript), "prover" ‖ transcript), transcript = SHA-256(ek ‖ ct ‖ nonce). Authentication rests on the KEM\'s IND-CCA security and the HMAC; the only signature in the protocol is the CA\'s, over the TBSCertificate.',
        },
        '#tab-teaparty .sizes > h3': 'Why a KEM instead of a signature',
        '#tab-teaparty .sizes > p': {
          b: 'With a signature, Alice would send an ML-DSA signature to prove who she is. With a KEM she sends only a 32-byte MAC tag, and Bob sends one ciphertext. Drawn to scale, in bytes:',
          a: 'To authenticate with a signature, Alice would send an ML-DSA signature over a challenge. With a KEM she sends only an HMAC tag, and Bob sends one KEM ciphertext. Drawn to scale, in bytes:',
          x: 'A signature challenge-response costs one ML-DSA signature from the prover (3309 B for ML-DSA-65, 4627 B for ML-DSA-87). KEM-based authentication costs one KEM ciphertext from the verifier and a 32-byte HMAC-SHA-256 tag from the prover; mutual authentication doubles both. Drawn to scale, in bytes:',
        },
        '#tab-teaparty > p.foot': 'Construction (v1): transcript = SHA-256(ek ‖ ct ‖ nonce); K = HKDF-SHA-256(ss, info = "pqc-wonderland/kem-auth/v1" ‖ transcript); tag = HMAC-SHA-256(K, "prover" ‖ transcript). Mutual (v2): each side encapsulates to the other\'s certified ek; transcript = SHA-256(ek_I ‖ ek_R ‖ ct₁ ‖ ct₂ ‖ nonce_I ‖ nonce_R); key = HKDF(K₁ ‖ K₂, "pqc-wonderland/kem-auth/v2" ‖ transcript); tag_I and tag_R are HMACs under "initiator" and "responder". The certificate is real X.509 v3 DER, encoded by hand in this page in the LAMPS shape (an ML-KEM SubjectPublicKeyInfo with the CSOR OID and no parameters, keyUsage keyEncipherment, extendedKeyUsage clientAuth as the KEM-auth-only flag, an ML-DSA-65 signature over the TBSCertificate); the request is CRMF with proof of possession by challenge (RFC 4211 §4.2). Shape follows KEMTLS and <a href="https://datatracker.ietf.org/doc/draft-wang-ipsecme-kem-auth-ikev2/">draft-wang-ipsecme-kem-auth-ikev2</a>.',
      },

      exact: {
        // ---- markup: controls, actor cards, caption, ledger ----
        'Rabbit\'s key': 'Alice\'s key',
        'Send the Knave of Hearts with a stolen certificate': 'Send Mallory with a stolen certificate',
        'Mutual: the Hatter has a certificate too': 'Mutual: Bob has a certificate too',
        'Trent the Caterpillar': 'Trent',
        'Wonderland Root CA': 'Mission Control · Root CA',
        'The White Rabbit': 'Alice',
        'The Mad Hatter': 'Bob',
        'Verifier · at the door': 'Verifier',
        'The Knave of Hearts': 'Mallory',
        'Impostor · carrying a stolen certificate': 'Impostor · carrying a stolen certificate',
        'It is always six o\'clock here.': 'Ready.',
        'Press Play, or Step through one message at a time.': 'Press Play, or Step through one message at a time.',
        'step 1 is at the bottom, so the door stays in view.': 'step 1 is at the bottom, so the scene stays in view.',

        // ---- step labels ----
        'Trent · Caterpillar': 'Trent · Root CA',

        // ---- scene 1: the root ----
        'The Caterpillar exhales a slow ring of smoke.': 'Trent generates the root key and self-signs a root certificate.',
        'A root of trust has to exist before anyone can be vouched for. Each ring is a TLV; together they are a self-signed X.509 certificate.': {
          b: 'A root of trust has to exist before anyone can be vouched for. Trent makes a signing key and a certificate for it, signed by itself.',
          a: 'A root of trust has to exist before anyone can be vouched for. Trent generates an ML-DSA key pair and a self-signed X.509 v3 certificate: a sequence of DER TLVs, the TBSCertificate, the signature algorithm and the signature.',
          x: 'A root of trust has to exist before anyone can be vouched for. Trent generates an ML-DSA key pair (FIPS 204) and a self-signed X.509 v3 certificate (RFC 5280 §4.1): a DER SEQUENCE of TBSCertificate, AlgorithmIdentifier and BIT STRING signature, with basicConstraints cA=TRUE and keyUsage keyCertSign, both critical.',
        },

        // ---- scene 2: the prover's key ----
        'The Rabbit makes an encapsulation key (public) and a decapsulation key (kept in his waistcoat).': {
          b: 'Alice makes an encapsulation key (public: anyone may seal a secret to it) and a decapsulation key (private: only she can open what was sealed).',
          a: 'Alice makes an ML-KEM encapsulation key ek (public) and a decapsulation key dk (private).',
          x: 'Alice runs ML-KEM.KeyGen (FIPS 203 §7.1): a 64-byte seed (d, z) expands to the encapsulation key ek (public) and the decapsulation key dk, which keeps the seed, the key and the hash of ek for implicit rejection.',
        },
        'The Rabbit makes an RSA key pair: the modulus goes on his card, the primes stay in his waistcoat.': {
          b: 'Alice makes an RSA key pair: the modulus is public, the two primes stay private.',
          a: 'Alice makes an RSA key pair: the modulus and e = 65537 are the public key; the primes and the private exponent stay private.',
          x: 'Alice makes an RSA key pair (PKCS #1 v2.2, RFC 8017): the modulus n and e = 65537 are the public key; the primes p, q and the private exponent d stay private. Used as a KEM by RSA-OAEP key transport.',
        },

        // ---- scene 2b: the verifier's key (mutual) ----
        'The Hatter has a key of his own tonight.': 'Bob generates a key pair of his own.',
        'Mutual authentication: the door must prove itself too. A fake tea party is as bad as a fake guest.': {
          b: 'Mutual authentication: Bob must prove himself too. A fake server is as bad as a fake client.',
          a: 'Mutual authentication: the verifier must prove itself too, so Bob needs his own certified KEM key. An impostor server is as bad as an impostor client.',
          x: 'Mutual authentication (the v2 construction, as in draft-wang-ipsecme-kem-auth-ikev2): each side holds a certified KEM key and encapsulates to the other\'s; both shared secrets go into one session key and both sides confirm it.',
        },
        'The door\'s own encapsulation key. Trent will certify it with the server-side purpose, and the Rabbit will check that certificate before he answers anything.': {
          b: 'Bob\'s own encapsulation key. Trent will certify it for the server side, and Alice will check that certificate before she answers anything.',
          a: 'Bob\'s own encapsulation key. Trent will certify it with EKU serverAuth, and Alice will verify that certificate before she answers anything.',
          x: 'Bob\'s own encapsulation key ek_R. Trent will certify it with extendedKeyUsage serverAuth (the client\'s key gets clientAuth), and Alice will parse and verify that certificate, including the purpose, before she decapsulates or sends a tag.',
        },

        // ---- scene 3: the CRMF request ----
        '“Vouch for me, please. I am late.”': 'Alice asks Trent for a certificate.',
        'A PKCS#10 request is self-signed, and a KEM key cannot sign. RFC 4211 §4.2 lets the request say “prove it with a challenge” instead, and that is exactly what Trent does next.': {
          b: 'The usual certificate request is signed by the key it asks about, and a KEM key cannot sign. So the request asks the CA to prove possession with a challenge instead, which is what Trent does next.',
          a: 'A PKCS#10 request is self-signed, and a KEM key cannot sign. RFC 4211 §4.2 lets the request ask for proof of possession by challenge instead, and that is exactly what Trent does next.',
          x: 'A PKCS#10 request (RFC 2986) is self-signed, and a KEM key cannot sign. RFC 4211 §4.2 (POPOPrivKey, subsequentMessage challengeResp) lets the request ask for proof of possession by challenge instead, and that is exactly what Trent does next.',
        },

        // ---- scene 4: proof of possession ----
        '“Prove it is yours.” The Caterpillar seals a riddle to the key in the request.': 'Trent challenges the request: Encaps to the requested ek.',
        'Proof of possession for a KEM key is the door dance run by the CA: Encaps to the requested ek, and the requester must answer.': {
          b: 'To prove the key is hers, Alice must open a secret Trent seals to it. The CA runs the same challenge the verifier will run later.',
          a: 'Proof of possession for a KEM key is the authentication exchange run by the CA: Encaps to the requested ek, send ct and a nonce, and the requester must answer with the tag.',
          x: 'Proof of possession for a KEM key is the authentication exchange run by the CA: Encaps to the requested ek, send ct ‖ nonce, and the requester answers with HMAC(HKDF(ss, transcript), "prover" ‖ transcript). RFC 4211 §4.2 calls this the challenge-response POP for encryption keys.',
        },

        // ---- scene 5: issuing ----
        '“Who. Are. You?” The Caterpillar signs, eventually.': 'Trent issues the certificate.',

        // ---- scene 6: presenting the certificate ----
        'The Knave has stolen the tarts, and the certificate.': 'Mallory presents a stolen certificate.',
        'He has the ek and Trent\'s signature. He does not have the Rabbit\'s dk.': 'He has the ek and Trent\'s signature. He does not have Alice\'s dk.',
        '“No room! No room!”': 'Alice presents her certificate to Bob.',
        'The Rabbit presents his certificate at the door anyway.': {
          b: 'The certificate is public; sending it reveals nothing secret.',
          a: 'The certificate is public data; presenting it reveals nothing secret and proves nothing yet.',
        },
        'Presents the certificate at the door, with a fresh nonce': 'Presents the certificate, with a fresh nonce',
        'Presents the certificate at the door': 'Presents the certificate',
        'Certificates are public. Stealing one proves nothing by itself, as the next steps show.': {
          b: 'Certificates are public. Stealing one proves nothing by itself, as the next steps show.',
          a: 'Certificates are public. Stealing one proves nothing by itself: authentication rests on the decapsulation key, which the certificate does not contain.',
        },
        'The Hatter now knows a name and an ek that Trent vouched for.': {
          b: 'Bob now knows a name and a public key that Trent vouched for.',
          a: 'Bob now knows a name and an ek that Trent vouched for. He has not yet verified either.',
        },

        // ---- scene 7: verifying the certificate ----
        'The Hatter reads the certificate and checks the Caterpillar\'s mark. Genuine.': 'Bob parses the certificate and verifies Trent\'s signature. Valid.',
        'The Hatter squints. This is not the Caterpillar\'s mark.': 'Bob rejects the certificate: Trent\'s signature does not verify.',

        // ---- scene 8: Encaps ----
        'The Hatter seals a riddle in an envelope.': 'Bob encapsulates to the ek from the certificate.',
        'The Hatter picks the answer K himself and locks it under the modulus from the certificate. K is never sent in the clear.': {
          b: 'Bob picks the secret K himself and encrypts it under the public key from the certificate. K is never sent in the clear.',
          a: 'RSA key transport: Bob picks the 32-byte K himself and encrypts it with RSA-OAEP under the modulus from the certificate. K is never sent in the clear.',
          x: 'RSA key transport as a KEM: Bob picks the 32-byte K himself and encrypts it with RSA-OAEP(SHA-256) (RFC 8017 §7.1) under the modulus from the certificate; the ciphertext is one integer the size of the modulus. K is never sent in the clear.',
        },
        'Encaps needs only the ek from the certificate and fresh randomness. The answer K is never sent.': {
          b: 'Bob seals a fresh secret K to Alice\'s public key. Only K\'s sealed form, the ciphertext, is sent; K itself never is.',
          a: 'Encaps needs only the ek from the certificate and fresh randomness. It yields the shared secret K and a ciphertext; K is never sent.',
          x: 'Encaps needs only the ek from the certificate and fresh randomness: for ML-KEM a 32-byte m (FIPS 203 §7.2), for DHKEM an ephemeral key pair (RFC 9180 §4.1). It yields the shared secret K and a ciphertext; K is never sent.',
        },
        'm (the riddle)': 'm (the KEM randomness)',
        'ephemeral scalar (the riddle)': 'ephemeral scalar',
        'K (the answer, chosen)': 'K (chosen by Bob)',

        // ---- scene 9: the challenge crosses ----
        '“Open this, and there is room.”': 'Bob sends the challenge.',
        'The door sends its own certificate along with the envelope. Anyone may read all of it; nobody learns K₁.': {
          b: 'Bob sends his own certificate along with the ciphertext. Anyone may read all of it; nobody learns K₁.',
          a: 'Bob sends his own certificate along with ct₁ and his nonce. Anyone may read all of it; nobody learns K₁.',
        },
        'The ciphertext and nonce cross the table in the clear. Anyone may read them; nobody learns K.': {
          b: 'The ciphertext and nonce are sent in the clear. Anyone may read them; nobody learns K.',
          a: 'The ciphertext and nonce are sent in the clear. Anyone may read them; nobody without dk learns K.',
        },
        'Sends his certificate ‖ ct₁ ‖ nonce_R to the visitor': 'Sends his certificate ‖ ct₁ ‖ nonce_R to Alice',
        'Sends ciphertext ‖ nonce to the visitor': 'Sends ciphertext ‖ nonce to Alice',
        'Each side will now hold one envelope sealed to the other. draft-wang-ipsecme-kem-auth-ikev2 does this in both directions and folds both secrets into the session key.': {
          b: 'Each side now holds one ciphertext sealed to the other\'s key. Both secrets will go into one session key.',
          a: 'Each side will now hold one ciphertext sealed to the other\'s certified ek. draft-wang-ipsecme-kem-auth-ikev2 does this in both directions and folds both secrets into the session key.',
          x: 'Each side will now hold one ciphertext sealed to the other\'s certified ek. draft-wang-ipsecme-kem-auth-ikev2 does this in both directions and folds both shared secrets into the session key (SKEYSEED); here key = HKDF(K₁ ‖ K₂, "pqc-wonderland/kem-auth/v2" ‖ transcript).',
        },
        'This is the whole challenge. A signature challenge would be a nonce too, but the response would be a 3309-byte ML-DSA-65 signature.': {
          b: 'This is the whole challenge: a ciphertext and a nonce. Alice\'s answer will be a 32-byte tag, where a signature would be thousands of bytes.',
          a: 'This is the whole challenge. A signature challenge would be a nonce too, but the response would be a 3309-byte ML-DSA-65 signature instead of a 32-byte tag.',
          x: 'This is the whole challenge: ct ‖ nonce. A signature challenge would be a nonce too, but the response would be a 3309-byte ML-DSA-65 signature (4627 B for ML-DSA-87) instead of a 32-byte HMAC-SHA-256 tag; the cost moves to the verifier\'s ciphertext.',
        },
        'Hatter\'s certificate': 'Bob\'s certificate',
        'Hatter\'s certificate (DER)': 'Bob\'s certificate (DER)',

        // ---- scene 10 (mutual): the prover verifies the verifier's certificate ----
        'The visitor reads the door\'s certificate before answering anything.': 'Alice verifies Bob\'s certificate before answering.',

        // ---- scene 11: Decaps ----
        'The Knave tries his own key on the Rabbit\'s envelope.': 'Mallory tries his own dk on a ciphertext sealed to Alice\'s ek.',
        'The Rabbit opens the envelope with his waistcoat key.': 'Alice decapsulates with her dk.',
        'Decaps does not error. It hands back a confident, wrong answer: implicit rejection.': {
          b: 'Decaps does not fail. It returns a wrong K′ that looks like any other key: implicit rejection.',
          a: 'Decaps does not error. It returns a pseudorandom, wrong K′ instead of a failure: implicit rejection.',
          x: 'Decaps does not error. The re-encryption check fails and ML-KEM returns K′ = J(z ‖ ct), pseudorandom and wrong, instead of a failure: implicit rejection (FIPS 203 §7.3).',
        },
        'Only dk can do this. That is the possession proof; the next step makes it verifiable.': {
          b: 'Only the decapsulation key can recover K. That is the proof of possession; the next step lets Bob check it.',
          a: 'Only dk can do this. That is the possession proof; the next step makes it verifiable to Bob.',
          x: 'Only dk can do this: recovering K from ct without dk would break the KEM\'s IND-CCA security. That is the possession proof; the next step makes it verifiable with a tag bound to the transcript.',
        },

        // ---- scene 12 (mutual): the second Encaps ----
        'Now the visitor seals a riddle of his own, to the door\'s key.': 'Alice encapsulates to Bob\'s ek.',
        'Envelope 2. Only the real Hatter\'s dk can open it, so the door will have to prove itself too.': {
          b: 'The second ciphertext. Only the real Bob\'s dk can decapsulate it, so Bob will have to prove himself too.',
          a: 'Ciphertext 2, sealed to ek_R from Bob\'s certificate. Only the real Bob\'s dk_R can decapsulate it, so the verifier will have to prove itself too.',
        },
        'The second direction. Both secrets go into one key; both ciphertexts go into one transcript.': {
          b: 'The second direction. Both secrets go into one key; both ciphertexts go into one transcript.',
          a: 'The second direction. Both shared secrets go into one key; both ciphertexts, both ek and both nonces go into one transcript.',
        },

        // ---- scene 13: the tag ----
        'He writes the answer on a card and hands it back.': 'Alice derives the key and sends the tag.',
        'He writes his answer on a card and hands it back with his own envelope.': 'Alice derives the key and sends ct₂ with her tag.',
        'Derives a key from K′ and the transcript, sends a 32-byte tag': 'Derives a key from K′ and the transcript, sends a 32-byte tag',
        'Binding the tag to ek, ct and nonce stops replays and cut-and-paste across sessions.': {
          b: 'The tag depends on the key, the ciphertext and the nonce, so it cannot be replayed in another session.',
          a: 'Binding the tag to ek, ct and nonce stops replays and cut-and-paste across sessions.',
          x: 'Binding the tag to ek, ct and nonce (via transcript = SHA-256(ek ‖ ct ‖ nonce) in both the HKDF info and the HMAC input) stops replays and cut-and-paste across sessions; the role string "prover" separates the directions.',
        },
        'key = HKDF(K₁′ ‖ K₂, transcript over both envelopes); sends ct₂ ‖ tag_I': 'key = HKDF(K₁′ ‖ K₂, transcript over both ciphertexts); sends ct₂ ‖ tag_I',
        'Both secrets folded in, like SKEYSEED in the IKEv2 draft. The tag proves he opened envelope 1; ct₂ asks the door to open envelope 2.': {
          b: 'Both secrets go into one key. The tag proves Alice decapsulated ciphertext 1; ct₂ asks Bob to decapsulate ciphertext 2.',
          a: 'Both secrets folded in, like SKEYSEED in the IKEv2 draft. The tag proves she decapsulated ct₁; ct₂ asks Bob to decapsulate the second ciphertext.',
          x: 'Both secrets folded in, like SKEYSEED in draft-wang-ipsecme-kem-auth-ikev2: key = HKDF(K₁′ ‖ K₂, "pqc-wonderland/kem-auth/v2" ‖ transcript). tag_I = HMAC(key, "initiator" ‖ transcript) proves she decapsulated ct₁; ct₂ asks Bob to decapsulate the second ciphertext.',
        },

        // ---- scene 14: the verifier checks ----
        'Equal tags mean the visitor computed the same K, which means the visitor holds dk for the certified ek.': {
          b: 'Equal tags mean Alice recovered the same K, which means she holds the private key for the certified public key.',
          a: 'Equal tags mean the prover computed the same K, which means the prover holds dk for the certified ek.',
          x: 'Equal tags mean the prover computed the same K, which means the prover holds dk for the certified ek: with an IND-CCA KEM, K is unrecoverable from ct without dk, and HMAC is a PRF, so the tag is unforgeable without K.',
        },
        'Different tags mean the envelope was never really opened. The certificate was genuine; the visitor was not.': {
          b: 'Different tags mean the ciphertext was never really decapsulated. The certificate was genuine; the prover was not.',
          a: 'Different tags mean the prover did not recover K: the ciphertext was never really decapsulated. The certificate was genuine; the prover was not.',
        },
        '“There\'s plenty of room!”': 'Authenticated.',
        'The door opens. Six o\'clock, as always. Tea for the Rabbit.': {
          b: 'The tag matches: Alice holds the private key for the certified public key.',
          a: 'The tag matches: Alice holds dk for the certified ek. Authenticated without a single signature in the handshake.',
        },
        'Admitted. The White Rabbit is who Trent said he is.': 'Accepted. Alice is who Trent said she is.',
        '“Off with his head!”': 'Rejected.',
        'The Queen was listening. The Knave held a genuine certificate and still could not answer.': 'Mallory held a genuine certificate and still could not produce the tag.',
        'Refused. A stolen certificate cannot open a sealed envelope.': 'Refused. A stolen certificate does not come with the decapsulation key.',
        'The Hatter opens envelope 2 and checks the card. Then he writes one of his own.': 'Bob decapsulates ct₂, checks tag_I, and answers with tag_R.',
        'The Hatter opens envelope 2, checks the card, and frowns.': 'Bob decapsulates ct₂ and checks tag_I. It does not match.',
        'Decaps(dk_R, ct₂) → K₂′. key = HKDF(K₁ ‖ K₂′, transcript). Check tag_I; then tag_R = HMAC(key, "responder" ‖ transcript) goes back across the table.': 'Decaps(dk_R, ct₂) → K₂′. key = HKDF(K₁ ‖ K₂′, transcript). Check tag_I; then tag_R = HMAC(key, "responder" ‖ transcript) goes back to Alice.',
        'The visitor opened envelope 1. tag_R now proves the door opened envelope 2: key confirmation in both directions.': {
          b: 'Alice decapsulated ciphertext 1. tag_R now proves Bob decapsulated ciphertext 2: both sides have confirmed the key.',
          a: 'The prover decapsulated ct₁. tag_R now proves the verifier decapsulated ct₂: key confirmation in both directions.',
          x: 'The prover decapsulated ct₁. tag_R = HMAC(key, "responder" ‖ transcript) now proves the verifier decapsulated ct₂: explicit key confirmation in both directions, under distinct role labels.',
        },
        'The visitor never opened envelope 1, so his key is not this key. The Hatter still answers, with a tag computed from the key only the real parties could share.': {
          b: 'The prover never decapsulated ciphertext 1, so his key is not this key. Bob still answers, with a tag computed from the key only the real parties could share.',
          a: 'The prover never decapsulated ct₁, so his key is not this key. Bob still answers, with a tag computed from the key only the real parties could share.',
        },

        // ---- scene 15 (mutual): the prover checks tag_R ----
        'The door holds dk for the certified ek_R. This is the Hatter\'s tea party, not a painted one.': {
          b: 'Bob holds the private key for his certified public key. This is the real Bob, not an impostor server.',
          a: 'The verifier holds dk_R for the certified ek_R. This is the real Bob, not an impostor server.',
        },
        'The door\'s tag does not match. Either the door is fake, or the visitor\'s key was wrong from the start (a Knave computes tag_R from the wrong K₁′ and cannot tell which).': {
          b: 'Bob\'s tag does not match. Either Bob is an impostor, or the prover\'s own key was wrong from the start (Mallory computes tag_R from the wrong K₁′ and cannot tell which).',
          a: 'The verifier\'s tag does not match. Either the verifier is an impostor, or the prover\'s key was wrong from the start (Mallory computes tag_R from the wrong K₁′ and cannot tell which).',
        },
        '“There\'s plenty of room!” “And it is really you.”': 'Authenticated, both ways.',
        'Both envelopes opened, both cards checked. Two ciphertexts and two tags instead of two signatures.': {
          b: 'Both ciphertexts decapsulated, both tags checked. Two ciphertexts and two tags instead of two signatures.',
          a: 'Both ciphertexts decapsulated, both tags verified. Two KEM ciphertexts and two 32-byte tags instead of two signatures.',
        },
        'Admitted, both ways. The Rabbit is who Trent said, and so is the door.': 'Accepted, both ways. Alice is who Trent said, and so is Bob.',
        'The Knave held a genuine certificate and could open neither envelope.': 'Mallory held a genuine certificate and could decapsulate neither ciphertext.',
        'Refused. The Knave could not answer, and could not check the door either.': 'Refused. Mallory could not produce the tag, and could not check Bob\'s tag either.',

      },

      patterns: [
        // scene 1, root: why
        [/^FIPS 204\. The one signature key in the whole story, and it signs certificates, never challenges\. (ML-DSA-\d+) because the Rabbit's key is (.+?): (.+)\. The DER is built by hand in this page: (.+)$/, {
          b: 'FIPS 204. Trent\'s $1 key is the only signature key in the protocol, and it signs certificates only. $1 because Alice\'s key is $2: $3. The certificate is built byte by byte in this page: $4',
          a: 'FIPS 204. The one signature key in the whole protocol, and it signs certificates, never challenges. $1 because Alice\'s key is $2: $3. The DER is built by hand in this page: $4',
          x: 'FIPS 204, pure-mode signing. The one signature key in the whole protocol, and it signs certificates, never challenges. $1 because Alice\'s key is $2: $3. The DER is built by hand in this page (RFC 5280 §4.1): $4',
        }],
        // scene 2, prover's key: caption, DHKEM sub, why
        [/^(.+) keys, generated in a hurry\.$/, 'Alice generates her $1 key pair.'],
        [/^The Rabbit makes a (.+) key pair: a scalar in his waistcoat, a point on his card\.$/, {
          b: 'Alice makes a $1 key pair: a secret scalar, and a public point.',
          a: 'Alice makes a $1 key pair: a private scalar and the public point it produces. Used as a KEM by DHKEM.',
          x: 'Alice makes a $1 key pair: a private scalar d and the public point d × G. Used as a KEM by DHKEM (RFC 9180 §4.1).',
        }],
        [/^(.+)\. ek is the envelope-making key anyone may hold; dk is the only thing that opens envelopes made with it\.$/, {
          b: '$1. ek is the public key anyone may encapsulate to; dk is the only key that recovers what was encapsulated.',
          a: '$1. ek is the public encapsulation key anyone may hold; dk is the only key that decapsulates ciphertexts made with it.',
        }],
        [/^(.+)\. ek is the envelope-making key anyone may hold; dk is the only thing that opens envelopes made with it\. A classical key: Shor's algorithm would recover dk from ek, so envelopes sealed to it today can be opened by a quantum computer later\.$/, {
          b: '$1. ek is the public key anyone may encapsulate to; dk is the only key that recovers what was encapsulated. A classical key: a quantum computer running Shor\'s algorithm would recover dk from ek, so ciphertexts made to it today can be opened later.',
          a: '$1. ek is the public encapsulation key anyone may hold; dk is the only key that decapsulates ciphertexts made with it. A classical key: Shor\'s algorithm would recover dk from ek, so ciphertexts encapsulated to it today can be decapsulated by a quantum computer later.',
        }],
        // scene 3, the CRMF request: caption sub (the reason is one of two fixed strings, kept in $1)
        [/^A CRMF request: name, ek, and a proof-of-possession clause that says “challenge me”\. Nothing is signed by the Rabbit, because (.+)\.$/, {
          b: 'Alice sends Trent her name and her public key, and asks to be challenged to prove she owns it. She signs nothing, because $1.',
          a: 'A CRMF request: name, ek, and a proof-of-possession clause that asks for a challenge. Nothing is signed by Alice, because $1.',
          x: 'A CRMF CertReqMsg (RFC 4211): CertTemplate with subject and SubjectPublicKeyInfo, and ProofOfPossession keyEncipherment { subsequentMessage challengeResp }. Nothing is signed by Alice, because $1.',
        }],
        // scene 4, proof of possession: what, why
        [/^Proof of possession: (.+) Encaps\(ek from the request\) → ct; the Rabbit answers with a tag; matches → (true|false)$/, 'Proof of possession: $1 Encaps(ek from the request) → ct; Alice answers with a tag; matches → $2'],
        [/^Without this, anyone could have Trent bind their own name to someone else's ek\. The request parsed clean: popo (.+)\.$/, {
          b: 'Without this check, anyone could have Trent put their own name on someone else\'s public key. The request parsed clean: popo $1.',
          a: 'Without this, anyone could have Trent bind their own name to someone else\'s ek. The request parsed clean: popo $1.',
          x: 'Without this, anyone could have Trent bind their own name to someone else\'s ek (RFC 4211 §4: a CA must verify possession before issuing). The request parsed clean: popo $1.',
        }],
        // scene 5, issuing: caption sub, what (mutual), why
        [/^The only signature in the protocol: the CA binds the name to the ek with (ML-DSA-\d+), and says what the key is for\.$/, {
          b: 'The only signature in the protocol: Trent signs a certificate that ties Alice\'s name to her public key, and says what the key may be used for.',
          a: 'The only signature in the protocol: the CA binds the name to the ek with $1, and says what the key is for (keyUsage, extendedKeyUsage).',
          x: 'The only signature in the protocol: the CA binds the subject name and SAN to the ek with a pure-mode $1 signature over the TBSCertificate, and states the key\'s purposes in critical keyUsage and in extendedKeyUsage.',
        }],
        [/^(Issues an X\.509 certificate: .+, signed ML-DSA-\d+); and one for the Hatter with EKU serverAuth$/, '$1; and one for Bob with EKU serverAuth'],
        [/^(.+) extendedKeyUsage clientAuth and nothing else: this key opens doors and does not receive bottles; the KEM-auth-only flag\. The signature is pure-mode (ML-DSA-\d+) over the TBS bytes with an empty context\.$/, {
          b: '$1 extendedKeyUsage clientAuth and nothing else: this key is for authenticating, not for receiving encrypted data; the KEM-auth-only flag. Trent signs the whole TBSCertificate with $2.',
          a: '$1 extendedKeyUsage clientAuth and nothing else: this key authenticates and does not receive encrypted content; the KEM-auth-only flag. The signature is pure-mode $2 over the TBS bytes with an empty context.',
          x: '$1 extendedKeyUsage clientAuth (RFC 5280 §4.2.1.12) and nothing else: this key authenticates and does not receive encrypted content; the KEM-auth-only flag. The signature is pure-mode $2 (FIPS 204 §5.2, no pre-hash) over the TBS bytes with an empty context string.',
        }],
        // scene 6, the impostor's holdings
        [/^stolen cert (\d+) B\nown dk, not the Rabbit's$/, 'stolen cert $1 B\nown dk, not Alice\'s'],
        // scene 7, verifying: caption sub, why
        [/^Parse the DER, verify the (ML-DSA-\d+) signature over the TBS bytes with the root public key, check what the key is for, read the ek out of the SubjectPublicKeyInfo\. Passing this proves Trent vouched for the ek, not that the visitor holds dk\.$/, {
          b: 'Bob checks Trent\'s signature on the certificate, checks what the key is for, and reads the public key out of it. Passing this proves Trent vouched for the key, not that the visitor holds the private key.',
          a: 'Parse the DER, verify the $1 signature over the TBS bytes with the root public key, check what the key is for, read the ek out of the SubjectPublicKeyInfo. Passing this proves Trent vouched for the ek, not that the prover holds dk.',
          x: 'Parse the DER, verify the $1 signature over the TBS bytes with the root public key (pure mode, empty context), check keyUsage and extendedKeyUsage, read the ek out of the SubjectPublicKeyInfo BIT STRING. Passing this proves Trent vouched for the ek, not that the prover holds dk.',
        }],
        [/^([\s\S]+)\. The chain is one link long tonight; authenticating the visitor is still to come\.$/, '$1. The chain is one link long; authenticating the prover is still to come.'],
        // scene 8, Encaps why: the ML-KEM text first, then RSA-OAEP and DHKEM (their KEM_WORDS carry no lore)
        [/^“Why is a raven like a writing desk\?” has no answer\. This riddle has exactly one, and only dk can compute it\. Encaps enciphers a random 32-byte m under ek into ct, and hashes the secret out of m; the riddle is m, the answer is K\.$/, {
          b: 'Only the matching decapsulation key can recover K from the ciphertext. Encaps encrypts a random 32-byte value m under ek into ct, and derives the secret K from m.',
          a: 'The ciphertext has exactly one valid decapsulation, and only dk can compute it. Encaps enciphers a random 32-byte m under ek into ct, and hashes the secret K out of m.',
          x: 'The ciphertext has exactly one valid decapsulation, and only dk can compute it. ML-KEM.Encaps (FIPS 203 §7.2): (K, r) = G(m ‖ H(ek)), ct = K-PKE.Encrypt(ek, m, r); K is the 32-byte shared secret. IND-CCA security is what makes the tag a proof of possession.',
        }],
        [/^“Why is a raven like a writing desk\?” has no answer\. This riddle has exactly one, and only dk can compute it\. ([\s\S]+)$/, {
          b: 'Only the matching private key can recover K from the ciphertext. $1',
          a: 'The ciphertext has exactly one valid decapsulation, and only dk can compute it. $1',
        }],
        // scene 10 (mutual), the prover verifies Bob's certificate; and the error when it fails
        [/^Something went wrong in the protocol: the door's certificate did not verify$/, 'Something went wrong in the protocol: Bob\'s certificate did not verify'],
        [/^Same checks the Hatter made: Trent's mark over the TBS, (.+) SPKI, EKU serverAuth\. Now he knows which ek to seal his own riddle to\.$/, {
          b: 'The same checks Bob made: Trent\'s signature, $1 public key, the server purpose. Now Alice knows which key to encapsulate to.',
          a: 'The same checks Bob made: Trent\'s signature over the TBS, $1 SPKI, EKU serverAuth. Now she knows which ek to encapsulate to.',
        }],
        [/^Parses the door's certificate; (ML-DSA-\d+) Verify → (true|false); shape and purpose \(serverAuth\) → (true|false)$/, 'Parses Bob\'s certificate; $1 Verify → $2; shape and purpose (serverAuth) → $3'],
        [/^(subject CN=[\s\S]+)\. A certificate for the door means a fake tea party cannot pass as this one\.$/, {
          b: '$1. A certificate for Bob means an impostor server cannot pass as this one.',
          a: '$1. A certificate for the verifier means an impostor server cannot pass as this one.',
        }],
        // the bars
        [/^Hatter → Rabbit: (.+)$/, 'Bob → Alice: $1'],
        [/^Rabbit → Hatter: (.+)$/, 'Alice → Bob: $1'],
      ],

      names: [
        [/\bThe White Rabbit's\b/g, "Alice's"], [/\bthe White Rabbit's\b/g, "Alice's"], [/\bThe White Rabbit\b/g, 'Alice'], [/\bthe White Rabbit\b/g, 'Alice'],
        [/\bThe Rabbit's\b/g, "Alice's"], [/\bthe Rabbit's\b/g, "Alice's"], [/\bThe Rabbit\b/g, 'Alice'], [/\bthe Rabbit\b/g, 'Alice'],
        [/\bThe Mad Hatter\b/g, 'Bob'], [/\bthe Mad Hatter\b/g, 'Bob'], [/\bThe Hatter's\b/g, "Bob's"], [/\bthe Hatter's\b/g, "Bob's"], [/\bThe Hatter\b/g, 'Bob'], [/\bthe Hatter\b/g, 'Bob'], [/\bHatter's\b/g, "Bob's"],
        [/\bTrent the Caterpillar\b/g, 'Trent'], [/\bThe Caterpillar's\b/g, "Trent's"], [/\bthe Caterpillar's\b/g, "Trent's"], [/\bThe Caterpillar\b/g, 'Trent'], [/\bthe Caterpillar\b/g, 'Trent'],
        [/\bThe Knave of Hearts\b/g, 'Mallory'], [/\bthe Knave of Hearts\b/g, 'Mallory'], [/\bThe Knave's\b/g, "Mallory's"], [/\bthe Knave's\b/g, "Mallory's"], [/\bThe Knave\b/g, 'Mallory'], [/\bthe Knave\b/g, 'Mallory'], [/\ba Knave\b/g, 'an impostor'],
        [/\bthe door's\b/g, "the verifier's"], [/\bThe door's\b/g, "The verifier's"], [/\bthe door\b/g, 'the verifier'], [/\bThe door\b/g, 'The verifier'],
        [/\bthe visitor's\b/g, "the prover's"], [/\bthe visitor\b/g, 'the prover'], [/\bThe visitor\b/g, 'The prover'],
        [/\benvelopes\b/g, 'ciphertexts'], [/\benvelope\b/g, 'ciphertext'],
      ],
    },
  },
};
