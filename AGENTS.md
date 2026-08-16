# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code. Expo's APIs move fast between SDKs — do not rely on memorized/training-era Expo knowledge for anything beyond basic JS/React syntax.

## Project Overview

A legal-literacy app for Nigerians (plain-language Q&A grounded in Nigerian statutes, browse-by-topic, emergency/legal help). Expo + TypeScript, targeting iOS, Android, and web from one codebase. See the PRD for product requirements and design principles (radical simplicity, plain language, ≤2 taps to help, warm/calm/non-alarming tone).

**The two constraints below are non-negotiable product requirements, not preferences** — the primary audience is on low-end Android devices and slow/expensive Nigerian mobile data:

- **Offline-first.** Previously viewed content must work with no connection, and the app must say so honestly (never silently fail, never claim freshness it doesn't have).
- **Very light.** Every dependency, asset, and API choice is filtered through bundle size and runtime cost. When in doubt, choose the lighter option even at some convenience cost.

## Architecture / Folder Structure

```
app/                     # Expo Router route files — THIN. Import from src/screens; no business logic here.
src/
  screens/                # actual screen implementations, one folder per screen/flow
  components/ui/          # design-system primitives — screens compose only from these, no ad hoc styling
  components/navigation/  # nav-specific components (FAB, custom tab bar bits)
  theme/                  # design tokens: colors, typography, spacing, fonts — plain constants, no ThemeProvider
  db/                     # expo-sqlite: schema, seed data, typed query helpers
  storage/                # AsyncStorage wrapper — flat preference flags ONLY (see Offline-First Rules)
  context/                # React Context providers (Profile, app-ready gate)
  i18n/                   # en.ts / pcm.ts dictionaries + LanguageProvider
  utils/                  # small hand-rolled helpers (e.g. relativeTime) instead of pulling in a library
```

New code should slot into this structure. Don't invent a parallel structure for "just this one feature."

## Coding Standards

- **TypeScript strict mode is on — keep it clean.** `npx tsc --noEmit -p .` must report zero errors before any commit. This is the fastest, cheapest correctness check available in this project; never skip it.
- Components are function components with named exports (`export function ScreenName()`), not default-export-only files, except the thin `app/**` route files which re-export a screen as default (required by Expo Router).
- Every screen renders text through `AppText` (never raw RN `Text`) and composes only from `src/components/ui` primitives, so the Civic Green design system (colors, Zilla Slab/Work Sans typography, the dual-radius shape system) stays consistent without each screen reinventing styles.
- Style with `StyleSheet.create` co-located in the same file as the component. No inline style objects for anything beyond a one-off dynamic value.
- All user-facing copy goes through `t('key')` from `useTranslation()` — never a hardcoded English string in a screen. Add the key to both `src/i18n/en.ts` (required) and `pcm.ts` (best-effort; missing Pidgin keys fall back to English automatically, so partial coverage is fine, but never skip `en.ts`).
- Path alias `@/*` maps to `src/*` — use it instead of relative `../../../` chains.

## Offline-First Rules

- **SQLite (`expo-sqlite`, via `src/db`) is for structured/queryable content**: topics, Q&A entries, saved bookmarks, recently-viewed activity. This includes bundled seed content, not just user data — the point is that Home/Ask/Topic screens query it the same way real fetched content would be queried later, so a future real backend can slot in without changing the read path.
- **AsyncStorage (`src/storage`) is for flat preference flags only**: language, onboarding-seen, the mock profile blob. If you catch yourself storing a list you need to filter/sort/join, it belongs in SQLite, not AsyncStorage.
- Recently-viewed is a capped, recency-evicted table (see `RECENTLY_VIEWED_CAP` in `src/db/queries.ts`) — offline caching means "the last ~30 things the user actually opened," not an ever-growing store or a full pre-bundled library.
- Any screen showing possibly-stale content must distinguish **"offline, showing saved content"** from **"offline, never viewed before"** — these are different states with different copy (see `OfflineBanner`'s `variant` prop). Never show a "saved" claim for content that was never actually cached.
- Check connectivity via `@react-native-community/netinfo`, not by inferring it from a failed fetch (there are no live fetches yet, but this rule holds once a real API is added).

## Keeping It Very Light — Dependency & Bundle Rules

- **Package manager is pnpm, always.** Never `npm install` / `yarn add`. Use `npx expo install <pkg>` for anything touching native code (it pins SDK-compatible versions); use `pnpm add` only for pure-JS dev tooling. `.npmrc`'s `node-linker=hoisted` must stay — it's required for Metro to resolve pnpm's non-flat `node_modules` correctly.
- **Deep-import from icon/font packages — never import from a package's barrel `index.js`.** `@expo/vector-icons` and `@expo-google-fonts/*` barrels unconditionally `require()` every file they re-export at module-eval time; Metro does not tree-shake this. A single `import { Ionicons } from '@expo/vector-icons'` silently bundled ~4MB of unused icon fonts (all 15 icon families) until this was caught and fixed. Always write:
  ```ts
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { WorkSans_600SemiBold } from '@expo-google-fonts/work-sans/600SemiBold';
  ```
  When adding a new icon set or font weight, this rule still applies — check the package's actual export shape (default vs named) before importing.
- **Before adding any dependency, ask: does this need a whole library, or a ~15-line hand-rolled helper?** Precedent in this repo: relative-time formatting (`src/utils/relativeTime.ts`) instead of moment/date-fns; i18n is a hand-rolled `t()`/Context instead of i18next, since 2 languages with no plurals/RTL doesn't need it.
- **Explicitly avoid** unless a real requirement forces it and it's discussed first: Redux/MobX/Recoil (Context + hooks is the standard here), full UI kits (react-native-paper, NativeBase, gluestack — they fight the custom Civic Green theming), Lottie (Reanimated primitives cover our animation needs), MMKV (native-module friction with Expo Go; AsyncStorage/SQLite already cover the storage needs), any heavy date/state/network library.
- **No raster illustration assets.** Use `@expo/vector-icons` glyphs in tinted circular badges, or small hand-authored `react-native-svg` components, instead of PNG/JPEG illustrations.
- **Verify bundle-size-affecting changes** with `npx expo export --platform all` and compare `dist/` size before/after (then `rm -rf dist .expo` — export output is gitignored and shouldn't be committed). Do this whenever adding a dependency, a font, or an icon set — not just when asked.

## Accessibility

- Touch targets: minimum 44×44 — this is enforced centrally in `Button`, `IconButton`, and other interactive primitives. Don't add a bare `Pressable` around a small icon without checking it clears this.
- `accessibilityRole` / `accessibilityLabel` on every interactive element; trust/safety copy (`Disclaimer`, `OfflineBanner`) uses `accessibilityRole="text"` so screen readers always announce it rather than skip it as decorative.
- Never disable font scaling (`allowFontScaling={false}` is forbidden). Don't `numberOfLines`-truncate primary answer content — only card titles/previews.
- Color tokens: only use `colors.textPrimary`/`textSecondary`/`onPrimary` etc. for text; tint colors (`primaryTint`, `secondaryContainer`) are background-only — this is what keeps contrast WCAG-AA safe.

## Expo-Specific Standards

- Stay in the Expo-managed workflow. Don't add a package that forces `expo prebuild`/bare-workflow ejection, or a config plugin, without flagging it first — either usually means losing Expo Go for local dev and needing a custom dev client, which is a real workflow cost.
- Prefer Expo's own first-party modules (`expo-sqlite`, `expo-font`, `expo-localization`, `expo-image`, `expo-linking`, etc.) over community equivalents — better long-term SDK-upgrade compatibility and Expo Go support.
- Use Expo Router file-based routing conventions under `app/`; route files stay thin (see Architecture above). Respect `typedRoutes`/`reactCompiler` experiments already enabled in `app.json` — don't disable them to work around a type error, fix the actual typing.
- Platform-gate anything not supported on web (`Linking.openURL('tel:...')`, native `Share`) behind `Platform.OS !== 'web'` with a sensible fallback — web is a first-class target, not an afterthought.
- Before using any Expo API you're not 100% certain of, check the versioned docs (see top of this file) — SDK behavior changes across versions and training-data knowledge goes stale fast.

## Version Control

**Branching model** (lightweight Git Flow):

| Branch | Purpose | Branches from | Merges to |
|---|---|---|---|
| `main` | Always production-ready/releasable. Protected — no direct commits. | — | tagged on every merge |
| `develop` | Integration branch; default branch for day-to-day work | `main` | `main` (via release) |
| `feature/<short-name>` | New functionality | `develop` | `develop` |
| `fix/<short-name>` | Non-urgent bug fixes | `develop` | `develop` |
| `hotfix/<short-name>` | Urgent production fixes | `main` | `main` **and** `develop` |
| `release/<x.y.z>` | Stabilization before a release (bug fixes only, no new features) | `develop` | `main` **and** `develop` |
| `chore/<short-name>`, `docs/<short-name>` | Non-functional maintenance (deps, tooling, docs) | `develop` | `develop` |

Branch names are kebab-case and describe the change, e.g. `feature/voice-input`, `fix/offline-banner-flicker`.

**Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`, types `feat`, `fix`, `perf`, `refactor`, `chore`, `docs`, `test`, `style`, `build`. Body explains *why*, not just what, when the change isn't self-evident from the diff. This is already the convention used throughout this repo's history — keep following it.

**Versioning:** Semantic Versioning (`MAJOR.MINOR.PATCH`), kept in sync between `package.json`'s `version` and `app.json`'s `expo.version`. Tag every merge to `main` as `vX.Y.Z`. Bump `ios.buildNumber` / `android.versionCode` independently per store submission, per platform convention.

**Before opening a PR:**
- `npx tsc --noEmit -p .` is clean.
- If the change is observable in the app, it's been run (`expo start --web` at minimum) and walked through, not just typechecked.
- PR description covers what changed, why, and how it was verified — a reviewer shouldn't have to re-derive intent from the diff alone.
