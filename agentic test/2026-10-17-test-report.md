# Test Report: snapshots-me (2026-10-17)

**Verdict:** All 55 tests pass after fixes to lint configuration, prop validation, and iframe error handling.

## Results

| Component | Runner | Passed | Notes |
|---|---|---:|---|
| javascript (repo root) | Vitest (jsdom) | 55/55 | Final: PASS. Initial round: 2 failed, 53 passed. |

## What's Covered

All suite files are under `agentic test/javascript/`.

- **`unit/`** — 23 theme tests: clock boundaries, override validation and expiry, startup-script agreement, blocked storage, toggles, polling, and cleanup.
- **`components/`** — 22 tests: turntable initialization, playback, retries and disposal; navigation, scrolling, mobile menus and résumé URLs; QA animation stages, replay, reduced motion and cleanup.
- **`integration/`** — 10 tests: portfolio composition, content, links and iframe fallback; constants imports, root lint, root/subpath production builds, résumé assets and reduced-motion CSS.
- **`helpers/`** — Deterministic browser/motion/observer mocks, scroll geometry, media preferences and a Storage-compatible mock.

## Bugs Caught and Fixed

Round 1 exposed two code bugs, sent back to the Code Analyst and Optimizer for fix round 2:

1. **Root lint failed with 22 errors.** Missing prop validation caused 21 errors; browser-only ESLint globals caused the remaining undefined-`process` error in `vite.config.js`. Shared React-compatible validators and component prop declarations were added, along with a Node-environment override scoped to the Vite configuration. Existing lint rules were preserved; no dependencies or lockfiles were changed.
2. **Synthetic iframe errors did not show the fallback.** React’s iframe `onError` handler missed directly dispatched, non-bubbling errors. It was replaced with a native listener and cleanup. The unconditional external escape link, fallback and secure external-link attributes were preserved.

**Limits:** jsdom does not verify actual browser layout, focus traversal, cross-origin embedding restrictions or media playback. Browsers do not reliably emit iframe errors for embedding restrictions, so the always-visible escape link remains essential.
