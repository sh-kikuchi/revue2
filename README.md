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

## How markdown under `content/` is rendered

`content/` is processed by [Ox Content](https://github.com/ubugeeei-prod/ox-content) (`@ox-content/napi`) through the local module `modules/ox-content.ts` (auto-registered by Nuxt).

- `content/` holds only `documents/` (project docs for revuekitz / ghostphp). The old blog articles and drafts were removed; they remain in git history.
- At build time every `.md` file is converted to HTML and embedded into the server bundle as `#ox-content`. Nothing is cached on disk, so there is no `.data` folder anymore.
- `pages/[...slug].vue` reads one document by `path` through `server/api/content/page`.
- A document's URL is its frontmatter `path`, falling back to the file path. Keep `path` in sync with the filename — two files with the same `path` make one of them unreachable.
- During `npm run dev`, editing a file under `content/` rebuilds the server bundle within a few seconds.
- Code block colors are the Dracula palette defined as CSS variables in `assets/css/ox-content-dracula.css`.

## Troubleshooting

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
