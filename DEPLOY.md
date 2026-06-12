# Deploy & Rollback — The Somatic Face Map site

The site is the `site/` folder (plain HTML/CSS/JS, no build step). Netlify publishes
`site/` per `netlify.toml`. Live URL: **faceology.netlify.app**.

## Version control

This folder is a git repo. Key commits:

- `2d5c44b` — **Baseline**: the original "Faceology" site as it was live *before* the rebrand. This is the rollback point.
- `d49df2a` — **Rebrand** to The Somatic Face Map.

Run `git log --oneline` to see current history.

## Publishing a change

The live site only updates when `site/` is uploaded to Netlify. Two ways:

1. **Drag-and-drop (no tools needed).** A ready-to-upload `faceology-site.zip`
   sits in this folder (rebuilt from `site/`). In the Netlify dashboard, open the
   site → Deploys → drag the zip (or the `site/` folder) onto the deploy area.
   To rebuild the zip after editing `site/`:
   ```powershell
   Remove-Item faceology-site.zip -ErrorAction SilentlyContinue
   Compress-Archive -Path site\* -DestinationPath faceology-site.zip
   ```
2. **Connect the repo (set-and-forget).** Push this repo to GitHub and link it in
   Netlify (build command: none; publish directory: `site`). Then every `git push`
   auto-deploys. Requires `gh`/GitHub auth — a one-time human setup step.

## Rollback

### Fastest: Netlify deploy history (no local work)
Netlify keeps every past deploy. Dashboard → Deploys → pick the last known-good
deploy → **Publish deploy**. Live instantly. This is the recommended first move
if a bad deploy goes out.

### From git (restores the files, then re-deploy)
Restore the pre-rebrand baseline into `site/`:
```bash
git checkout 2d5c44b -- site
```
Or undo the rebrand commit entirely while keeping history:
```bash
git revert d49df2a
```
Then re-deploy `site/` (rebuild the zip and drag-drop, or push if the repo is linked).

To inspect the baseline without changing anything:
```bash
git show 2d5c44b:site/index.html
```
