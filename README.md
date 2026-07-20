# Basic template

A starter template for vanilla JavaScript projects, with Webpack, ESLint and Prettier.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script             | What it does                                             |
| ------------------ | -------------------------------------------------------- |
| `npm run dev`      | Start the dev server on http://localhost:8080            |
| `npm run build`    | Production build into `dist/` (minified, content-hashed) |
| `npm run deploy`   | Build and publish `dist/` to GitHub Pages                |
| `npm run lint`     | Lint with ESLint (formatting checked via Prettier)       |
| `npm run lint:fix` | Lint and auto-fix                                        |
| `npm run format`   | Format all files with Prettier                           |

## Deploying to GitHub Pages

```bash
npm run deploy
```

This builds and force-pushes `dist/` to a `gh-pages` branch. After the first
deploy, go to **Settings → Pages** and set the source to the `gh-pages` branch,
folder `/ (root)`. The site lands at `https://<user>.github.io/<repo>/`.

`output.publicPath` is `"./"` so assets resolve correctly from that
subdirectory — with the default `"/"` you get a blank page and a 404.

Note that `deploy` publishes your working tree, not `main`. Commit first.

## What's included

- **Webpack 5** — bundles JS, CSS and images. `mode` comes from the CLI flag, so
  one config serves both dev and prod.
- **ESLint 10** — flat config, `js/recommended`, browser globals. `dist/` is ignored.
- **Prettier** — run through `eslint-plugin-prettier`, so formatting problems show
  up as lint errors. Rules live in `.prettierrc`.

## Structure

```
src/
  index.js       entry point
  styles.css     imported by index.js
  template.html  HtmlWebpackPlugin template
```
