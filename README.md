# Content v2 Minimal Starter

Look at the [Content documentation](https://content-v2.nuxtjs.org/) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.

## Troubleshooting

### `yarn install` fails with `https://pkg.pr.new/nuxt-component-meta@...` 404

`@nuxt/content` sometimes pins its `nuxt-component-meta` dependency to a temporary preview build hosted on `pkg.pr.new` (a commit-based preview registry). These preview builds expire/get removed, so a fresh `yarn install` (e.g. on Netlify, or a new clone) can fail with a `404 Not Found` for that URL.

This repo works around it with a `resolutions` entry in `package.json`, forcing a real published version from npm instead of the dead preview URL:

```json
"resolutions": {
  "nuxt-component-meta": "^0.18.0"
}
```

If this error reappears after bumping `@nuxt/content` (it may pin a different/newer `pkg.pr.new` commit each time):

1. Check what version it expects: `grep nuxt-component-meta node_modules/@nuxt/content/package.json`
2. Check the latest stable release on npm: `npm view nuxt-component-meta versions`
3. Update the `resolutions` version in `package.json` to a stable release, then run `yarn install` to regenerate `yarn.lock`.
4. Confirm `yarn.lock`'s `nuxt-component-meta` entry resolves to `registry.yarnpkg.com`, not `pkg.pr.new`, before committing.

### Netlify build fails with `[vite:asset] Could not load ... ENOENT` for a file that "exists"

Windows (and macOS by default) filesystems are case-insensitive, so `okayama.jpg` and `okayama.JPG` are treated as the same file locally — an import with the "wrong" case still resolves fine and `git status` shows no diff. Netlify builds on Linux, which is case-sensitive, so the same import fails with `ENOENT` there even though the file is clearly present when you look locally.

This has already bitten a few files under `assets/images/landscapes/prefectures/` (some were committed as `.JPG` while the code imports `.jpg`).

If this happens again:

1. Find the exact case git has on record: `git ls-files | grep -i <filename>`
2. Compare it against the import statement's case in the `.vue`/`.ts` file.
3. If they differ only in case, rename the tracked file via a two-step `git mv` (a direct case-only rename is a no-op on Windows/macOS):
   ```bash
   git mv Foo.JPG foo_tmp.JPG
   git mv foo_tmp.JPG foo.jpg
   ```
4. To check the whole repo at once instead of waiting for the next failed build, compare every `@/assets/...` import against `git ls-files` for an exact case match.