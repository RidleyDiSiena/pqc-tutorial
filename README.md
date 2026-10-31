# PQC Wonderland

A post-quantum cryptography tutorial and classroom that runs entirely in the browser.

**Try it live: https://ridleydisiena.github.io/pqc-tutorial/**

- **The Tutorial:** eight scenes, each running a real algorithm: ML-KEM (FIPS 203), ML-DSA (FIPS 204), SLH-DSA (FIPS 205),
  Falcon (the FIPS 206 draft), HQC-KEM (the FIPS 207 to come), the X-Wing and QSF hybrids, KEM-based authentication, and the
  sizes of all of them side by side.
- **The Classroom:** thirteen lessons on the mathematics underneath (lattices, LWE, the NTT, the Fujisaki–Okamoto transform,
  rejection sampling, hash-based signatures, Merkle trees, Falcon's trapdoor, security levels, codes and HQC, and Q-day),
  in four depths, with animated demos and an exam.

It is a static site: `index.html`, `credits.html` and `vendor/`. There is no server code, no build step and no analytics, and
the page loads nothing from any other site.

## Run it locally

Any static file server works; ES modules need http, not `file://`:

```sh
python3 -m http.server 8000
# then open http://127.0.0.1:8000/
```

## Credits

The standards, papers, software, fonts and story the page is built on are listed in [credits.html](credits.html).
Third-party licences are in [LICENSES/](LICENSES/): the noble libraries (MIT) and the four fonts (SIL OFL 1.1).

## Licence

- **Code** (the JavaScript, HTML and CSS): MIT, see [LICENSE](LICENSE).
- **Content** (the lesson and scene text, explanations, exam questions, demo narration and diagrams): Creative Commons
  Attribution 4.0 International, see [LICENSE-CONTENT](LICENSE-CONTENT). Credit "PQC Wonderland by Ridley DiSiena".
- **Third-party** software and fonts keep their own licences: the noble libraries in `vendor/pq.js` (MIT, Paul Miller) and
  the fonts in `vendor/fonts/` (SIL OFL 1.1), see [LICENSES/](LICENSES/).

## Not for real data

The toy schemes are for teaching, the page's own code (including its HQC) is not constant time, and nothing here should
protect real data.

Created by Ridley DiSiena.
