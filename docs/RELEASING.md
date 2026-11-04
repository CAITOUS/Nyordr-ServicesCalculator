# Releasing & update checks

Every copy of Nyordr has a version number (footer → **About & license**). Downloaded copies check a small public file, `nyordr.json`, each time they open, and show a banner when a newer version exists. The hosted copy on GitHub Pages is always current, so it doesn't check. Copies opened offline skip the check. No login or credentials are involved.

## One-time setup

1. Publish this repository. The update file must be publicly readable.
2. In `nyordr.json`, set `download` to your releases page, e.g. `https://github.com/CAITOUS/Nyordr-ServicesCalculator/releases/latest`.
3. In `src/Nyordr.src.html`, in the `NYORDR` settings block in the script, set:

   ```js
   manifestUrl:"https://raw.githubusercontent.com/CAITOUS/Nyordr-ServicesCalculator/main/nyordr.json"
   ```

   Leave it as `""` to turn update checks off. Rebuild afterwards (`npm run build`).
4. Turn on GitHub Pages: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.

## Editing the app

Make changes in `src/Nyordr.src.html`, never in `Nyordr.html` directly. `Nyordr.html` is generated: the build embeds Chart.js, SheetJS, jsPDF and jsPDF-AutoTable into it so it runs fully offline.

```bash
npm ci             # once; installs the pinned library versions (package-lock.json)
npm run build      # writes Nyordr.html
```

Commit both `src/Nyordr.src.html` and the rebuilt `Nyordr.html`. To upgrade a library, change its version in `package.json` and the matching URL in both `src/Nyordr.src.html` and `tools/build.mjs`, then rebuild.

## Publishing a new version

1. In `src/Nyordr.src.html`, update `version` and `released` in the `NYORDR` settings block, then run `npm run build`.
2. Add an entry to `CHANGELOG.md`, headed `## <version> — <date>`.
3. Update `nyordr.json`:

   ```json
   { "latest": "1.1.0", "released": "2026-12-01", "download": "https://github.com/CAITOUS/Nyordr-ServicesCalculator/releases/latest", "notes": "One-line summary shown in the banner." }
   ```

4. Commit and push to `main`.
   - The hosted app on GitHub Pages updates within a minute or two.
   - The **Release** workflow sees a version that hasn't been released yet. It creates the `v1.1.0` tag and a GitHub Release with `Nyordr.html` and `nyordr-1.1.0.zip` (app, guides, license), using the CHANGELOG entry as the release notes.
   - Pushes that don't change the version don't create a release. To re-upload assets for the current version, run the workflow manually with **rebuild** ticked.

Copies with an older version show: *"Nyordr 1.1.0 is available. Get the update / Later"*.

## Moving the repository

Keep the old `nyordr.json` in place and replace its contents with:

```json
{ "moved_to": "https://raw.githubusercontent.com/NEW-OWNER/NEW-REPO/main/nyordr.json" }
```

Existing copies follow the pointer (up to three hops). New releases should use the new `manifestUrl`.
