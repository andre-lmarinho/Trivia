# Trivia App

An interactive quiz application built with React, TypeScript, Vite, and Tailwind CSS, fetching real‑time questions from the OpenTDB API and offering a fully customizable, themeable experience.

🔗 [Live Demo](https://andre-lmarinho.github.io/Trivia/)
_or_ deploy easily to Vercel or Netlify with the same settings.

---

## 🚀 Key Features

- **In‑Game Menu Drawer**: Toggle a navigation drawer (gear icon) to access:
  - **Gameplay Settings** (Category, Number of Questions, Difficulty)
  - **Theme Selector** (7 live‑preview themes)
- **Start Screen**: Welcome prompt with a "Start Quiz" button.
- **Quiz Screen**:
  - Presents one multiple‑choice question at a time.
  - Options are shuffled.
  - Selected answer stays visually marked.
  - Feedback icons (✔️ / ✖️) indicate correct and incorrect answers.
  - Includes a timer displayed in the bottom-right corner:
    - Before answering: shows countdown to answer.
    - After answering: shows countdown to auto-advance with a skip button.
- **Result Screen**: Displays the final score and "Play Again" button.
- **Responsive Design**: Mobile drawer at the top and desktop sidebar on the right, with backdrop blur.
- **Type Safety**: Full TypeScript support for API responses and settings.
- **Lightning Fast**: Powered by Vite for instant HMR and Vitest for unit testing.
- **Persistent Settings**: Theme and gameplay options are saved to `localStorage`.

---

## 🌈 Themes

Seven built‑in themes define CSS variables for:

- `--bg-color`: page background
- `--content-bg`: panel/card background
- `--title-color`: headings
- `--text-color`: body and feedback text
- `--accent-color`: buttons/highlights
- `and much more...`

Select themes in the menu drawer and see live previews instantly.

---

## 🏗️ Tech Stack

- **Framework:** React 18 + TypeScript, Vite (JIT mode)
- **Styling:** Tailwind CSS (v3+) with `@apply`, custom keyframes, JIT
- **Animations:** Framer Motion, CSS keyframes
- **Icons:** lucide‑react
- **SEO:** react‑helmet‑async
- **Testing (boilerplate):** Vitest + Testing Library
- **Deployment Tools:** npm scripts, `gh-pages`

---

## 📁 Project Structure

- `/src`: Source code to be analyzed and maintained by AI agents
  - `/components`: React components that should follow the guidelines in this document

---

## 📖 How It Works

1. When the app loads, `useQuiz` restores settings from `localStorage` and fetches questions with `useQuestions`.
2. Open the gear icon to adjust category, number of questions, difficulty and visual theme.
3. Each question has a timer. After you answer, feedback is shown before moving to the next.
4. Once all questions are done, the result screen shows your score and you can play again.

---

## 💻 Getting Started

**Prerequisites**: Node.js v16+, npm

1. **Clone & install**

   ```bash
   git clone https://github.com/<user>/trivia-app.git
   cd trivia-app
   npm install
   ```

2. **Start development**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:5173](http://localhost:5173).

3. **Build**

   ```bash
   npm run build
   ```

4. **Preview**

   ```bash
   npm run preview
   ```

5. **Test**

   ```bash
   npm run test
   ```

6. **Type check**

   ```bash
   npm run typecheck
   ```

7. **Deploy (local check)**

   ```bash
   npm run deploy
   ```

---

## 📦 Scripts

- `npm run dev` — start development server
- `npm run build` — compile for production
- `npm run preview` — run the built app locally
- `npm run test` — run unit tests
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript type checks
- `npm run format` — run Prettier
- `npm run deploy` — build and simulate GitHub Pages deployment

_Add these lines to `package.json` if using `gh-pages`:_

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

---

## ☁️ Deployment

Deployments are automated through GitHub Actions. Pushing to `main` runs the
workflow in `.github/workflows/deploy.yml` which installs dependencies, checks
linting and tests, builds the app, and publishes the `dist` folder to GitHub
Pages.

---

## 🔮 Future Improvements

- Progress bar animations
- Background animations
- Enhanced accessibility (ARIA)
- Score ranking
- More themes & UI polish
- Sound effects (Big Maybe)

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
Feel free to reuse and adapt!

---

Made with ❤️ and code reviews. Have fun with your Quiz!
