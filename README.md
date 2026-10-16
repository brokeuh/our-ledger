# Our Ledger

A small household finance tracker: income and expenses, recurring bills,
per-person paycheck calculation (hours, wage, sick/vacation/ADV/unpaid/
special-leave/home-office days), and a 6-month savings trend.

Runs entirely as a static site + Firebase (Firestore + Anonymous Auth) —
no server of your own needed. Installable as a PWA on Android/iOS/desktop.

## Live app

https://brokeuh.github.io/our-ledger/

## Two versions in this one repo

- **`index.html`** — the shared household version, backed by Firebase/Firestore.
  This is for you and your wife: you both sign in anonymously into the same
  database, so entries made on either phone show up on both, live. Anyone
  with the link can read/write this data — it's meant for just the two of you.
- **`solo.html`** — a fully local, single-device version for anyone else you
  share the link with (friends, etc). It never talks to Firebase or any
  server — all data lives only in that person's own browser (`localStorage`),
  and nobody else can see it, including you. It has a "Backup" button in the
  header to download a JSON file of everything (for safekeeping or moving to
  a new phone) and restore from one.

## How it's wired up

- `manifest.json` / `solo-manifest.json` + `icon-*.png` — make each version
  installable ("Add to Home screen") as its own app.
- `service-worker.js` — shared by both pages; caches the app shell so either
  opens instantly / offline. For `index.html`, data itself still needs a
  connection to sync through Firestore; `solo.html` works fully offline.
- `firestore.rules` — the security rules published in the Firebase console
  for this project (anyone signed in, including anonymously, can read/write) —
  only relevant to `index.html`.

## Making changes

This is plain HTML/CSS/JS — edit `index.html` directly, commit, and push to
`main`. GitHub Pages redeploys automatically within a minute or two.
