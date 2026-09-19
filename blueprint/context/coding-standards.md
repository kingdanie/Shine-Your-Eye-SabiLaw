# Coding Standards

## TypeScript and React Native

- Keep TypeScript strict. Do not introduce `any`; use narrow types or `unknown` when an input is genuinely unknown.
- Use function components and hooks. Keep screen-specific state in its screen unless multiple consumers require a context or service boundary.
- Use React Native `StyleSheet.create` and the shared tokens from `@/theme`; do not add a UI kit or styling system for one feature.
- Keep interactions accessible: use the shared UI primitives, clear accessibility labels, `MIN_TOUCH_TARGET`, readable copy, and safe-area handling where appropriate.

## Project structure and naming

- Keep Expo Router files in `src/app/` thin. They select a layout or re-export a screen from `src/screens/`.
- Put flow-specific screen implementations in `src/screens/<flow>/`; shared controls belong in `src/components/ui/` and shared navigation controls in `src/components/navigation/`.
- Put platform/data access in focused modules: `src/db/` for SQLite, `src/storage/` for AsyncStorage, `src/services/` for capability providers, `src/i18n/` for dictionaries and translation context, and `src/theme/` for tokens.
- Use PascalCase for React components, camelCase for values and functions, SCREAMING_SNAKE_CASE for stable constants, and exported PascalCase types.
- Prefer the configured `@/` import alias for application modules.

## Data, content, and errors

- Keep bundled legal content and user activity in SQLite. Use parameterized queries and typed row-to-domain mapping in `src/db/`.
- Keep simple preferences in AsyncStorage behind `src/storage/`; recover safely from malformed persisted JSON by returning the documented default.
- Keep i18n text in dictionary files and resolve it through `useTranslation`; do not hardcode new user-facing English strings in screens when a translation key is appropriate.
- Make offline and capability limits explicit in the UI. Never simulate speech capture, AI freshness, contact verification, or legal certainty that the app does not have.
- Legal content and emergency contact changes need source attribution and an honest verification status. Preserve the general-information, not-legal-advice boundary.

## Performance and scope

- Preserve the offline-first, lightweight approach. Prefer existing Expo and React Native APIs and installed dependencies before adding packages.
- Avoid large assets, heavy state libraries, unnecessary abstraction, and unrelated refactors.
- Use the existing speech-provider capability and registry boundary for voice work; do not bind screens directly to a vendor implementation.

## Testing and verification

- No test runner is configured. Tests are not currently an automated gate.
- Run the documented TypeScript type-check and lint commands for relevant changes. For user-visible behavior, gather proportionate app or browser evidence rather than claiming a flow works from code inspection.
- Add a test runner only through an explicit testing setup decision, not as a side effect of an unrelated feature.

## Comments and writing

- Comment non-obvious decisions, safety constraints, workarounds, and source rationale. Do not narrate obvious code.
- Keep user-facing language plain, calm, and direct. Avoid legal jargon where a simpler phrase works.
- Do not use em dashes, en dashes, or ellipsis characters in generated documentation, comments, commit messages, or specs.
