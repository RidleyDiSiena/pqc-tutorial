# Backlog

Ideas and fixes not yet done, roughly in priority order.

## 1. Update to the final NIST IR 8547 (October 2026)

The page cites the November 2024 initial public draft. The final report changes some facts and adds guidance that
suits a general audience. Federal-only material (EO 14412, OMB M-26-15, PIV/FICAM, the 2030/2031 agency deadlines)
is left out on purpose.

- ~~**Correct the dates (Q-day lesson, `ir8547` source, credits link).**~~ Done 2026-10-31: all quantum-vulnerable
  public-key algorithms deprecated after 2030 and disallowed after 2035; credits point at the final report.
- **ML-KEM-768 is NIST's recommended default** ("a large security margin at a reasonable performance cost"). The
  page already defaults to 768; say why.
- **HQC becomes approved once its FIPS is published, and NIST plans no further KEMs.** Fits the HQC scene.
- **ML-DSA-44 is category 2, but drops to category 1 if the random bit generator has under 192 bits of security**
  (Table 3, note 2). A nuance for the security-levels lesson, which already discusses category 2.
- **Why signatures are urgent without "harvest now, decrypt later".** Recorded signatures can't be broken later, but
  the transition is long and needs many parties. Authentication can stay classical until a quantum computer exists,
  then must switch at once. A good point for the signature and Tea Party scenes.
- **Forward secrecy, and why key establishment goes first.** Short-lived key-exchange keys protect past sessions;
  TLS 1.3 with hybrid ML-KEM is the near-term path.
- **Code signing for devices that can't update their verifier**: they must require post-quantum signatures from day
  one. This is where stateful LMS/XMSS (SP 800-208) fit; the page mentions them only in passing.
- **NIST's view of hybrids**: a hedge against a flaw in either part, but extra complexity, usually temporary, and it
  means a second transition later. Combiners are in SP 800-227; the shared secrets may be concatenated in either
  order (Z‖T or T‖Z), fixed by the protocol. Complements the X-Wing scene.
- **Dual (composite) signatures**: two signatures on one message, both must verify. Not covered on the page at all.
- **Symmetric crypto needs no transition**: anything with at least 128-bit classical strength already meets category 1.
  112-bit symmetric options are disallowed after 2030, and SHA-1 leaves validated modules after 2030. **Ascon**
  (SP 800-232, lightweight authenticated encryption and hashing) is newly listed; the page doesn't mention it.
- **Pre-hash signing (HashML-DSA, HashSLH-DSA)**: the digest must be at least as strong as the parameter set.
- **Crypto-agility and a cryptographic inventory** as the first practical steps for any organisation. Not covered.

## 2. Mobile-friendly skin

At phone width (390 px) the scenes are hard to use. Found while testing on 2026-10-31:

- The side rail takes about 224 px, leaving the scene about 130 px. The rail should not be the layout on phones.
- Every scene's settings row overflows: the pickers are 231 px wide and their labels don't shrink. The panel scrolls
  sideways, so the controls can be reached, but only with a sideways swipe.
- In the dock, cards and HUD layouts only a few rows spill over (`tt-param`, `pw-cmp`, `bp-broken`).
- Intended clipping, not a bug: the animated hex strips (`.cipherstrip`) are cut off on purpose.

## 3. "Working…" note and a lesson on why some steps are slow

Show that the page is busy during long calculations, and explain why, as something to learn from (big numbers,
many hash calls, rejection loops).

- Measured: real HQC is fast (keygen about 1 ms, Encaps about 2 ms, Decaps 2 to 4 ms, even at HQC-KEM-5), so HQC is
  not the target.
- Still to measure: SLH-DSA "s" signing (lesson 9 already shows "signing…"), Falcon key generation, and the Expert
  benches. Move any slow step to a Web Worker, or yield between steps and show progress.

## 4. Content ideas

- Conservative alternatives on the Sizes Wall: FrodoKEM and Classic McEliece (very large public keys, tiny
  ciphertexts).
- Signatures from NIST's additional round (for example SQIsign, MAYO, HAWK) on the Sizes Wall, to show the size
  trade-offs being explored.
- A short "migration in practice" page: inventory, crypto-agility, Mosca's inequality (already in the Q-day lesson),
  and the 2030/2035 dates.
