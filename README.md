# Yash Dolare: Cloud & DevOps Portfolio

A portfolio designed as a transit map. Each project is a line, shared tools are interchange
stations, and the deploy train ends at Production.

Built with React and Vite. Deployed to GitHub Pages with GitHub Actions.

## Run locally

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds `dist/` and publishes it.
In the repository, open Settings > Pages and set **Source** to **GitHub Actions** (one time only).

Live URL: https://yashdolare15.github.io/Portfolio-/

## Edit your content

All text lives in `src/data.js` (projects, skills, education, links, email).
To add the Jenkins project's repository, fill in `repo` for the `jenkins` entry.
