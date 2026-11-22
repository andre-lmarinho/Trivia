# Trivia App

A timed, multiple-choice quiz app. It fetches questions from the [Open Trivia Database](https://opentdb.com/) and lets players choose a category, difficulty, question count, and theme.

[Play the live demo](https://andre-lmarinho.github.io/Trivia/).

## Stack

- React 18 and TypeScript
- Vite 7
- Tailwind CSS 3
- Headless UI and Framer Motion
- Vitest

## Setup

Use Node.js 20.19+ or 22.12+ with npm. These versions meet Vite 7's Node.js requirement.

```bash
git clone https://github.com/andre-lmarinho/Trivia.git
cd Trivia
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command                 | Purpose                                                                |
| ----------------------- | ---------------------------------------------------------------------- |
| `npm run dev`           | Start the development server.                                          |
| `npm run build`         | Build the app into `dist`.                                             |
| `npm run preview`       | Preview the production build locally.                                  |
| `npm run test -- --run` | Run tests once.                                                        |
| `npm run lint`          | Run ESLint.                                                            |
| `npm run typecheck`     | Check TypeScript types.                                                |
| `npm run format`        | Format files with Prettier.                                            |
| `npm run deploy`        | Build, then print a simulation message. This does not publish the app. |

## Deployment

GitHub Actions deploys `dist` to GitHub Pages after a push to `main`. The workflow runs lint, tests, and a production build before deployment. The local `npm run deploy` script only simulates deployment. It does not publish the site.

## License

[MIT](LICENSE)
