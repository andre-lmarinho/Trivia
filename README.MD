# Trivia App

An interactive quiz application built with React, TypeScript, Vite, and Tailwind CSS, fetching real‑time questions from the OpenTDB API and offering a fully customizable, themeable experience.

---

🔗 Live Demo

[View on GitHub Pages](https://andre-lmarinho.github.io/Trivia/)
*or* deploy easily to Vercel or Netlify with the same settings.

---

## 🚀 Features

* **In‑Game Menu Drawer**: Toggle a navigation drawer (gear icon) to access:
  * **Gameplay Settings** (Category, Number of Questions, Difficulty)
  * **Theme Selector** (7 live‑preview themes)
* **Start Screen**: Welcome prompt with a "Start Quiz" button.
* **Quiz Screen**: 
  * Presents one multiple‑choice question at a time.
  * Options are shuffled.
  * Selected answer stays visually marked.
  * Feedback icons (✔️ / ✖️) indicate correct and incorrect answers.
  * Includes a timer displayed in the bottom-right corner:
    * Before answering: shows countdown to answer.
    * After answering: shows countdown to auto-advance with a skip button.
* **Result Screen**: Displays the final score and "Play Again" button.
* **Responsive Design**: Mobile drawer at the top and desktop sidebar on the right, with backdrop blur.
* **Type Safety**: Full TypeScript support for API responses and settings.
* **Lightning Fast**: Powered by Vite for instant HMR and Vitest for unit testing.
* **Persistent Settings**: Theme and gameplay options are saved to `localStorage`.

---

## 🌈 Themes

Seven built‑in themes define CSS variables for:

* `--bg-color`: page background
* `--content-bg`: panel/card background
* `--title-color`: headings
* `--text-color`: body and feedback text
* `--accent-color`: buttons/highlights
* `and much more...`

Select themes in the menu drawer and see live previews instantly.

---

## 🎯 Design Decisions

- **Vite over CRA**: chosen for its fast HMR and minimal configuration, speeding up development.
- **TypeScript for type safety**: ensures clear contracts between the OpenTDB API and components, reducing bugs in production.
- **CSS variables for themes**: allow changing color schemes in real time without rebuilding, instead of generating Tailwind classes dynamically.
- **Button states with CSS variables**: buttons visually persist their selected state and maintain hover consistency through custom variables.
- **Folder structure**: Layout, Quiz and Settings components are separated to isolate responsibilities and simplify maintenance and unit testing with Vitest.

---

## 📐 Layout Components

### Container Utilities

```html
<!-- full-screen wrapper -->
<div class="body-background theme-<theme>">
  <NavBar />
  <!-- content or drawer overlay -->
  <div class="content-section">…</div>
</div>
```

* **`.body-background`**: `flex flex-col items-center justify-center h-screen p-4 overflow-y-auto` using `--bg-color`.
* **`.content-section`**: `w-full max-w-[700px] mx-auto p-6 mb-8 bg-[var(--content-bg)] border rounded shadow`.

### In‑Game Menu Drawer

```html
<!-- Drawer Panel -->
<div class="inset-x-0 top-0 md:inset-y-0 md:right-0 z-20">
  <!-- MenuScreen content -->
</div>
```

```css
@layer components {
  .menu-panel {
    @apply flex flex-col bg-[var(--content-bg)] shadow-lg
           inset-x-0 top-0 border-b border-[var(--border-color)]
           md:inset-y-0 md:right-0 md:left-auto md:w-80 md:border-b-0 md:border-r;
  }
}
```

---

## 📁 Project Structure

```
trivia-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Layouts/
│   │   │   ├── NavBar.tsx          # gear/X toggle
│   │   │   ├── MenuScreen.tsx      # in-game drawer
│   │   │   └── ProgressBar.tsx     # progress bar
│   │   ├── Quiz/
│   │   │   ├── StartScreen.tsx     # welcome screen
│   │   │   ├── Question.tsx        # question
│   │   │   ├── QuizScreen.tsx      # quiz flow
│   │   │   └── ResultScreen.tsx    # final score
│   │   └── Settings/
│   │       ├── SetupScreen.tsx     # gameplay settings
│   │       ├── ThemeScreen.tsx     # theme selection
│   │       ├── AmountSlider.tsx    # number-of-questions slider
│   │       ├── CategorySelector.tsx# category dropdown
│   │       └── DifficultySelector.tsx # difficulty dropdown
│   ├── hooks/
│   │   ├── useCategories.ts        # fetch categories list
│   │   ├── useQuestions.ts         # OpenTDB fetch hook
│   │   └── useQuiz.ts              # quiz state machine
│   ├── types.ts                    # interfaces for API & settings
│   ├── index.css                   # Tailwind directives + @layer components
│   ├── App.tsx                     # root flow + menu integration
│   └── main.tsx                    # React entry
├── index.html                      # HTML template
├── tailwind.config.ts              # Tailwind setup
├── vite.config.ts                  # Vite config
├── tsconfig.json                   # TS config
├── vitest.config.ts                # Vitest setup
└── package.json                    # scripts & dependencies
```

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

---

## 🌐 Deployment

Deploy via GitHub Pages by adding `gh-pages` and running:

```bash
npm run build
npm run deploy
```

---

## 🔮 Future Improvements


* Progress bar animations
* Background animations
* Enhanced accessibility (ARIA)
* Score ranking
* More themes & UI polish
* Sound effects (Big Maybe)

---

Made with ❤️ and code reviews. Have fun with your Quiz!
