# Our Ledger

A small household finance tracker: income and expenses, recurring bills,
per-person paycheck calculation (hours, wage, sick/vacation/ADV/unpaid/
special-leave/home-office days), and a 6-month savings trend.

Runs entirely as a static site + Firebase (Firestore + Anonymous Auth) —
no server of your own needed. Installable as a PWA on Android/iOS/desktop.

## Live app

https://brokeuh.github.io/our-ledger/

## How it's wired up

- `index.html` — the whole app (UI, styles, logic, Firebase hookup).
- `manifest.json` + `icon-*.png` — makes it installable ("Add to Home screen").
- `service-worker.js` — caches the app shell so it opens instantly / offline.
  Data itself still needs a connection to sync through Firestore.
- `firestore.rules` — the security rules published in the Firebase console
  for this project (anyone signed in, including anonymously, can read/write).

Both people using the app sign in anonymously and share the same Firestore
database, so entries made on either phone show up on both, live.

## Making changes

This is plain HTML/CSS/JS — edit `index.html` directly, commit, and push to
`main`. GitHub Pages redeploys automatically within a minute or two.
