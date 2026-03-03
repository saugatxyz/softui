# Soft UI Publishing TODO

Use this checklist when you are ready to publish `@soft-ui/*` publicly.

## Current Status
- Monorepo and package split are in place (`@soft-ui/tokens`, `@soft-ui/icons`, `@soft-ui/react`).
- CI/release workflows exist.
- Local workspace checks pass (`typecheck`, `lint`, `build`, `test:smoke`).
- First public release is intentionally deferred.

## Pre-Release Local Testing (No Public Publish)

### 1) Validate the monorepo
```bash
pnpm verify:ci
```

### 2) Package like npm (tarball simulation)
```bash
pnpm pack --pack-destination /tmp
# run in each package dir:
# packages/tokens
# packages/icons
# packages/react
```

Expected tarballs:
- `/tmp/soft-ui-tokens-<version>.tgz`
- `/tmp/soft-ui-icons-<version>.tgz`
- `/tmp/soft-ui-react-<version>.tgz`

### 3) Test in a fresh consumer app
```bash
cd /tmp
npx create-next-app@latest soft-ui-consumer --ts --eslint --app
cd soft-ui-consumer
npm i /tmp/soft-ui-tokens-<version>.tgz /tmp/soft-ui-icons-<version>.tgz /tmp/soft-ui-react-<version>.tgz
```

Required setup in consumer:
1. Import tokens once in root CSS/entry:
   - `@import "@soft-ui/tokens/styles.css";`
2. Add Tailwind v4 source scan:
   - `@source "../node_modules/@soft-ui/react/dist/**/*.{js,mjs}";`
3. Use subpath import:
   - `import { Button } from "@soft-ui/react/button"`
4. Optional theme script:
   - `createThemeInitScript()` from `@soft-ui/tokens`

### 4) Consumer verification
- `npm run build` succeeds.
- Components render correctly in light/dark mode.
- Custom token weights (`480`, `550`) render correctly with Inter variable font.
- Icon overrides work via `SoftUIIconProvider`.

## Publishing Prep (Do Later)
- [ ] In Vercel project settings, set **Root Directory** to `apps/docs`.
- [ ] Add GitHub secrets for preflight validation:
  - `VERCEL_TOKEN`
  - `VERCEL_PROJECT_ID`
  - `VERCEL_ORG_ID` (or `VERCEL_TEAM_ID`)
- [ ] Create/verify npm org scope: `@soft-ui`.
- [ ] Ensure package publish rights for all 3 packages.
- [ ] Add `NPM_TOKEN` in GitHub repository secrets.
- [ ] Confirm release workflow permissions on `main`.
- [ ] Confirm package metadata (`name`, `version`, `license`, `exports`, `files`) is correct.
- [ ] Confirm README install + setup snippets are accurate.

## First Release Steps (When Ready)
1. Create a changeset:
   ```bash
   pnpm dlx @changesets/cli add
   ```
2. Select:
   - `@soft-ui/tokens`
   - `@soft-ui/icons`
   - `@soft-ui/react`
3. Choose bump type (`minor` recommended for first public publish if APIs are still settling).
4. Merge to `main`.
5. Merge the version PR created by Changesets action.
6. Verify packages are published on npm and installable in a clean project.

## Post-Publish Verification
- [ ] `npm view @soft-ui/tokens version`
- [ ] `npm view @soft-ui/icons version`
- [ ] `npm view @soft-ui/react version`
- [ ] Install from npm in a fresh Next app (not tarballs) and build successfully.
