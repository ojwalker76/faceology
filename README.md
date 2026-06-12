# Faceology

An interactive **Facial Muscle Clinical Map** for estheticians and facial massage
practitioners, plus a marketing landing site that wraps it. Created by **Dani**;
mock website built around her tool.

> **Brand name note:** "Faceology" is a **placeholder** name chosen for the mock site.
> Replace it with Dani's real product/business name throughout `site/index.html` when known.

---

## How to open it (either machine)

No build step, no install. Just double-click:

```
Faceology/site/index.html
```

It opens in any browser. The landing page embeds the live clinical map
(`Facial_Muscle_Map.html`) in an iframe — both files live in `site/`, so keep
them together.

To open just the tool by itself: `Faceology/site/Facial_Muscle_Map.html`

---

## Folder structure

```
Faceology/
├── README.md                  ← you are here
├── site/                      ← THE WEBSITE (this is what to open / deploy)
│   ├── index.html             ← landing page + embedded tool  ← START HERE
│   └── Facial_Muscle_Map.html ← the standalone interactive map (self-contained)
├── source/                    ← Dani's original React component versions
│   ├── FacialMuscleMap.jsx        (richer copy; exports FacialMuscleMap)
│   └── FacialMassageDetailedMap.jsx (mobile-first 500px; exports App)
└── docs/                      ← printable companion cheat sheets
    ├── Facial_Massage_Cheat_Sheet.docx
    └── Facial_Massage_Clinical_Cheat_Sheet.docx
```

`site/` is the only folder needed to run or deploy the website. `source/` and
`docs/` are reference/raw materials.

---

## What the tool does

Three tabs, all driven from one shared muscle dataset:

1. **Muscle Diagram** — clickable SVG face (Front + Neck/Jaw side views). Tap a
   muscle for origin, insertion, action, nerve, aging role, tension signs, and
   recommended techniques.
2. **Aging Area Map** — concern → primary/supporting muscles → techniques lookup.
3. **Treatment Sequences** — 11 filterable Open→Work→Close protocols.

---

## Cross-machine notes

- This folder lives under **OneDrive** (`OneDrive/ClaudeProjects/Faceology/`), so it
  syncs between the laptop and the desktop automatically. Wait for OneDrive to finish
  syncing before opening on the other machine.
- Everything is plain HTML/CSS/JS + `.jsx` + `.docx` — no node_modules, no build
  artifacts, nothing machine-specific. Fully portable.

---

## Open items / next steps (for later)

- [ ] Replace placeholder brand name "Faceology" with Dani's real name
- [ ] Pricing, testimonial, and stats on the landing page are **mock content** — confirm or replace
- [ ] Decide source of truth between the two `.jsx` versions (or keep the HTML as canonical)
- [ ] `source/` JSX side-view makes `occipitalis` & `digastric` clickable but they have
      no data entry — would error if clicked. (The standalone HTML map is fine; it has both cards.)
- [ ] Optional: deploy to Netlify alongside the other Walker Advisory sites
- [ ] Add a real logo (current is a simple "F" mark placeholder)
