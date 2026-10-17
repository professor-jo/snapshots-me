# Comprehensive QA Report: snapshots-me (2026-10-17)

## Summary

- **Verdict:** The final JavaScript QA run passed: **55 passed, 0 failed**. This establishes the recorded automated result, not full browser or production readiness.
- **Fix scope:** **15 source/configuration files changed across two fix rounds**, addressing Spotify lifecycle handling, theme persistence, navigation, accessibility, lint configuration, and iframe fallback behavior.
- **Initial findings:** Static analysis identified **15 issues: 8 Medium and 7 Low**. The application is a client-side portfolio; its “QA Agentic System” terminal is a scripted demonstration, not a working agent backend.
- **Regression cycle:** Round 1 produced **53 passes and 2 failures**. Follow-up fixes addressed lint errors and non-bubbling iframe error handling; the final run passed all 55 tests.
- **Top priorities:** Complete real-browser accessibility/media checks, verify root and subpath production builds, reconcile deployment/content drift, and modernize lint/dependency maintenance.

## Process

| Step | Agent | Outcome |
|---|---|---|
| Repository setup | QA team | Cloned `https://github.com/professor-jo/snapshots-me`, targeting `main`. JavaScript QA used Vitest/jsdom under `agentic test/javascript/`. |
| Static review | Code Analyst | Reviewed application sources, README, HTML entry points, configuration, and relevant lockfile metadata. Identified 15 issues and proposed regression coverage. |
| Initial fixes | Code Optimizer | Applied lifecycle, theme, navigation, accessibility, fallback, and lint-command changes. Verified by source inspection only. |
| Test round 1 | Test Engineer | Reported 53 passed and 2 failed; returned both failures for source/configuration fixes. |
| Follow-up fixes | Code Analyst / Code Optimizer | Added shared prop validators, a scoped Node lint environment, and a native iframe error listener. |
| Final testing | Test Engineer | Reported **55 passed**. Test report: `agentic test/2026-10-17-test-report.md`. |
| Delivery | QA workflow | Changes committed to `qa/agentic-20261017-102634`. No PR URL is recorded. |

**Execution boundaries:** The project’s pre-existing test scripts were skipped. The analyst and optimizer did not execute builds, lint, tests, or live-browser checks during their own review/fix work.

## 1. Code Analysis

### Application and architecture

Snapshots.Me is a notebook-styled React portfolio covering biography, technology stack, career history, projects, résumé links, and contact information.

| Area | Findings |
|---|---|
| Stack | React/React DOM 18.3.1, Vite 5.4.21, Tailwind CSS 3.4.19, Framer Motion 11.18.2, React Icons. |
| Startup | `index.html` → `src/main.jsx` → `src/App.jsx`; React mounts under `StrictMode`. |
| Navigation | Section anchors, not a router. `#root` is the scrolling element. |
| Theme | Time-based light/dark defaults with expiring manual overrides in `localStorage`. |
| External integrations | Spotify iframe API, embedded project website, and Google Fonts. |
| Application limits | No backend, authentication, application database, or implemented AI-agent service. |
| Packaging | No original test script or Vitest/jsdom dependencies declared in `package.json`. |

### Key findings and disposition

| Finding | Severity | Recorded response / remaining limitation |
|---|---|---|
| Spotify initialization could race and create duplicate controllers. | Medium | Coalesced initialization and disabled Play while loading. |
| Spotify loading lacked a usable failure/retry path. | Medium | Added failure handling, retry, and a direct Spotify link. Live failure behavior remains unverified. |
| Spotify timers, callbacks, and controller resources could outlive the component. | Medium | Added cleanup, late-callback guards, and controller disposal. |
| Hidden Spotify content could remain keyboard-focusable. | Medium | Closed panel made inert; actual focus traversal still needs browser testing. |
| Root lint could not use the nested ESLint configuration. | Medium | Lint now explicitly references it; follow-up fixes addressed exposed source/configuration errors. |
| Blocked storage caused manual theme choices to be overwritten. | Medium | Added an expiring in-memory override. |
| Iframe fallback relied on unreliable error reporting. | Medium | Added an unconditional external escape link and native error listener. Cross-origin blocking remains browser-dependent. |
| Reduced-motion support was incomplete. | Medium | Improved CSS, Framer Motion, and scrolling behavior. Opacity transitions remain. |
| Theme records accepted invalid values. | Low | Added theme and finite-expiry validation in both initialization paths. |
| Inactive constants module referenced undefined images. | Low | Replaced four undefined references with `null`. |
| Scroll components assumed `#root` existed and did not synchronize initial position. | Low | Added missing-root handling and immediate synchronization. |
| Heading hierarchy and landmarks were unclear. | Low | Added `main`; changed shared section headings to `h2`. |
| Deployment metadata, education dates, and unused dependencies/scaffolding had drifted. | Low | Left for follow-up rather than making unsupported content or dependency changes. |

The review also noted older frontend major versions and unsupported ESLint 8.57.1. Version age alone was **not** treated as evidence of a runtime defect; no vulnerability audit was performed.

## 2. Fixes & Optimizations

The change log records **15 distinct files** modified. No dependencies or lockfiles were changed by the optimizer.

| File | Change | Why |
|---|---|---|
| `src/components/Turntable.jsx` | Coalesced initialization; disabled Play during loading; added failure/retry handling, cleanup, callback guards, controller disposal, inert hidden state, error link, and `Vinyl` prop validation. | Prevent duplicate players, stale work, inaccessible hidden controls, and lint failures. |
| `src/theme.js` | Added expiring in-memory overrides and saved-record validation. | Preserve manual choices when storage fails and reject malformed preferences. |
| `index.html` | Applied matching saved-theme validation before first paint. | Keep startup and runtime theme selection consistent. |
| `src/components/Navbar.jsx` | Handled absent root, synchronized initial scroll state, and retained observed-section state when leaving the bottom. | Improve restored-position behavior and Contact highlighting. |
| `src/components/ScrollExtras.jsx` | Added missing-root fallback, initial synchronization, and reduced-motion-aware progress/scrolling. | Correct initial visibility and avoid forced smooth scrolling. |
| `src/App.jsx` | Added user-preference motion configuration and a `main` landmark. | Improve reduced-motion handling and page structure. |
| `src/index.css` | Disabled CSS animations and transitions under reduced motion. | Cover decorative effects previously left active. |
| `src/components/CellHeading.jsx` | Changed shared headings to `h2`; validated required props. | Improve heading hierarchy and satisfy lint requirements. |
| `src/components/FeaturedProject.jsx` | Added an always-visible external link and a native iframe error listener with cleanup. | Provide an escape route and handle directly dispatched, non-bubbling errors. |
| `src/constants/index.js` | Replaced undefined image references with `null`. | Prevent import-time `ReferenceError` in the inactive module. |
| `src/components/Contact.jsx` | Removed unused `motion` import. | Remove confirmed dead code. |
| `package.json` | Pointed lint at the existing configuration and excluded `agentic test/**`. | Make root lint use the checked-in rules without linting QA tests. |
| `src/utils/propTypes.js` | Added shared React-compatible validators without dependencies. | Support prop validation without manifest/lockfile changes. |
| `src/components/QAProject.jsx` | Validated `Panel` props and `StageRow` stage/time props. | Resolve missing-prop-validation lint errors. |
| `Snapshots.Me/.eslintrc.cjs` | Added a Node-environment override scoped to `vite.config.js`. | Recognize `process.env.BASE_PATH` without weakening application lint rules. |

## 3. Recommendations

### UI/UX

- **Verify in a real browser:** music-panel keyboard traversal, focus restoration, playback continuity, retry behavior, and iframe restrictions.
- Check narrow-screen navigation/music-control overlap, mobile overflow, and contrast in both themes.
- Clearly label the QA terminal as a **scripted demonstration**.
- Review remaining opacity transitions and consider reducing continuous decorative motion by default.
- Preserve the visible external project link; neither React nor native iframe error handling reliably detects every embedding restriction.

### Frameworks and libraries

- Upgrade to supported ESLint tooling with a root flat configuration; retain the current lint rules during migration.
- Upgrade React, Vite, Tailwind, and Framer Motion incrementally with regression coverage.
- Remove unused PDF-viewer dependencies in a separate manifest/lockfile change, then run a dependency audit.
- Document one deployment contract covering Netlify, GitHub Pages, and `BASE_PATH`.
- Reconcile stale homepage metadata and the Georgia Tech start-date mismatch: **April 2026** in the timeline versus **August 2026** in the résumé source.
- Establish authoritative profile content and clarify whether `resume/resume.html` should reproducibly generate the public PDF.

## 4. Testing

### Results

| Run | Environment | Passed | Failed | Result |
|---|---|---:|---:|---|
| Project’s original tests | Existing project scripts | — | — | Not run; skipped by setup policy. |
| QA round 1 | JavaScript, Vitest/jsdom | 53 | 2 | Failed; fixes requested. |
| QA final run | JavaScript, Vitest/jsdom | 55 | 0 | **PASS** |

### Round 1 failures and follow-up

| Failing test | Diagnosis | Applied fix |
|---|---|---|
| `integration/configuration.test.js > root lint succeeds with checked-in configuration` | Explicitly loading the configuration exposed **21 missing-prop-validation errors** and **1 undefined-`process` error** in Vite configuration. | Added shared validators and component declarations; added a scoped Node environment override. |
| `integration/portfolio.test.jsx > keeps an external escape link before errors and handles synthetic iframe failures` | React’s iframe `onError` did not receive the directly dispatched non-bubbling error, leaving the fallback inactive. | Attached a native error listener directly to the iframe, with cleanup; retained the unconditional escape link and secure external-link attributes. |

The initial lint diagnosis proposed adding `prop-types`; the implemented fix instead used dependency-free shared validators.

### Evidence and limits

- The supplied final Test Engineer result reports **all 55 tests passing**.
- During diagnosis, the two failing test files were unavailable to the inspecting agent. Its analysis used supplied failure output and source inspection, not a direct test-file review or rerun.
- The optimizer could not execute tests or lint locally. Its verification statements were source-inspection statements, separate from the Test Engineer’s final result.
- No production build, dependency audit, live external-service check, or real-browser accessibility/layout result is recorded.
- jsdom results do not establish actual media playback, cross-origin embedding behavior, visual layout, or keyboard traversal through embedded content.

**Test report:** `agentic test/2026-10-17-test-report.md`

## 5. Delivery & Next Steps

| Item | Status |
|---|---|
| Repository | `https://github.com/professor-jo/snapshots-me` |
| Target branch | `main` |
| Committed QA branch | `qa/agentic-20261017-102634` |
| Pull request | **Not confirmed.** No URL is supplied; PR creation depends on GitHub write access or a fork-based workflow. |
| Automated QA | Final JavaScript result: **55 passed, 0 failed**. |
| Remaining verification | Browser checks, root/subpath builds, deployment validation, and dependency audit. |

**Next steps, in priority order:**

1. Review the committed diff and final test report; confirm or create the PR into `main`.
2. Test Spotify loading, retries, unmount behavior, hidden-panel focus, and external iframe failures in browsers.
3. Build and validate both `/` and `/snapshots-me/` hosting, including asset and résumé URLs.
4. Complete mobile, contrast, keyboard, and reduced-motion checks.
5. Resolve deployment/content drift, then schedule lint modernization and unused-dependency cleanup.
