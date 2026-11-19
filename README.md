# Tangram Puzzles

**Made by Vikas C. Srivastava**

A tangram puzzle game for phones and computers. Fill the dark shadow with the pieces and find out which animal or object is hidden in it.

- **Two levels:** Easy (7 pieces) and Difficult (15 pieces)
- **Puzzle types:** Square, Animals, Objects, or a Surprise mix
- **100 hidden shapes** (50 animals, 50 objects), picked at random; the name is shown only after solving
- **Themed pieces:** animal skins (stripes, spots, scales, feathers, fur) and object materials (wood, metal, bricks, glass, gold)
- **Scoreboard** with separate scores for Easy and Difficult, and a collection of the shapes you have found
- Works **offline** and installs to the home screen like an app

© 2026 Vikas C. Srivastava. All rights reserved.

---

## Files

| File | What it is |
|---|---|
| `index.html` | The game |
| `counter.js` | Anonymous usage counter (see below) |
| `stats.html` | Page to see the usage numbers |
| `privacy.html` | Privacy policy (needed for the Google Play Store) |
| `manifest.webmanifest`, `sw.js` | Make the game installable and work offline |
| `icon-*.png`, `apple-touch-icon.png` | App icons |

## Put it on GitHub Pages

1. Create a new **public** repository on GitHub named exactly **`<your-github-username>.github.io`**. This puts the game at the root of your address, which the Play Store app needs (step 3 of the Play Store section).
2. Upload all the files in this folder to it (**Add file → Upload files**), including the hidden `.nojekyll` file, then commit.
3. Open **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After a minute the game is live at `https://<your-github-username>.github.io/`.

## Install on a phone

- **Android (Chrome):** open the game's address, tap the menu (⋮) → **Install app**.
- **iPhone (Safari):** open the address, tap **Share** → **Add to Home Screen**.

## Usage counter: how many people use it

The game counts usage **anonymously**. It sends no name, ID, device details or location. It only adds 1 to shared counters:

| Counter | Meaning |
|---|---|
| Players today / this week | Each phone is counted once per day and once per week |
| New phones per day | Phones opening the game for the first time |
| Phones in total | Every phone that has opened the game (website or app) |
| Installed as an app | Phones that opened it from the home-screen icon or the Play Store app |
| Puzzles solved | Total puzzles solved by all players |

**To see the numbers**, open `https://<your-github-username>.github.io/stats.html`. It shows today, this week, the totals, and charts for the last 14 days and 8 weeks. Days and weeks use India time (IST).

Notes:
- The counts are stored by the free service [Abacus](https://abacus.jasoncameron.dev). No account is needed. The counter name used is `tangram-vcs-7lava6iw` (set at the top of `counter.js` and `stats.html`).
- Abacus is a free community service with no guarantee; a counter that is not used for 6 months is deleted.
- The counter names are public, so the numbers are a good guide but not tamper-proof.
- If a phone is offline, its counts are sent the next time it is online.

## Publish on the Google Play Store

1. Put the game on GitHub Pages first (above).
2. Go to [pwabuilder.com](https://www.pwabuilder.com), paste your game's address and choose **Package for stores → Android**. Download the package; it includes instructions and an `assetlinks.json` file.
3. Upload `assetlinks.json` into a folder named `.well-known` at the top of your repository (so it is at `https://<your-github-username>.github.io/.well-known/assetlinks.json`), so the app opens full-screen without a browser bar. (GitHub Pages serves this folder because the repository contains a `.nojekyll` file.)
4. In the [Google Play Console](https://play.google.com/console) (one-time developer registration fee), create the app and upload the `.aab` file from PWABuilder.
5. For the store listing:
   - **Privacy policy URL:** `https://<your-github-username>.github.io/privacy.html`
   - **Data safety form:** the game collects no personal data. The only thing it sends is the anonymous usage counts described above.
   - **Developer / author:** Vikas C. Srivastava

## Privacy

See [privacy.html](privacy.html). Scores stay on each player's own phone and are never uploaded.
