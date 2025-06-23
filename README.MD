# Trivia App

An interactive quiz application built with React, TypeScript, Vite, and Tailwind CSS, fetching real‑time questions from the OpenTDB API and offering a fully customizable experience.

---

## 🚀 Features

- **Start Screen**: Welcome prompt with a “Start Quiz” button.
- **Settings Panel**: In‑app popup to choose:
  - **Interface Theme**: 7 visual themes with live preview.
  - **Gameplay Options**: Category, number of questions, difficulty.
- **Quiz Screen**: Presents one multiple‑choice question at a time, shuffling options.
- **Result Screen**: Displays final score and “Play Again” to restart.
- **Responsive Layout**: Tailwind CSS ensures mobile‑first design, with grid/flex layouts and internal scrolling if needed.
- **Type Safety**: Written in TypeScript with strict interfaces for API data and settings.
- **Fast Iteration**: Powered by Vite for instant reloads, plus Vitest for unit tests.

---

## 🌈 Themes

Seven built‑in themes, each defining CSS variables for:

- `--bg-color` (page background)
- `--content-bg` (panel/card background)
- `--title-color` (headings)
- `--text-color` (body and feedback text)
- `--accent-color` (buttons, highlights)
- `--hover-color` (interactive hover)
- `--border-color` (borders)
- `--bt-text-color` (button text)
- `--fb-correct` / `--fb-incorrect` (feedback)

Themes are selected by clicking a live preview card in the Settings panel.

---

## 📐 Layout Components

### Container Utilities

```html
<!-- full‑screen wrapper -->
<div class="body-background theme-<theme>">
  <!-- centered panel with max-width -->
  <div class="content-section">
    <!-- your screens (Start, Quiz, Result, Settings) -->
  </div>
</div>
```

- `.body-background`: `flex flex-col items-center justify-center h-screen p-4 overflow-y-auto` using `--bg-color`.
- `.content-section`: `w-full max-w-[700px] mx-auto p-6 mb-8 bg-[var(--content-bg)] border rounded shadow`.

### Answer Buttons Container

```html
<div class="answer-container">
  <!-- buttons -->
</div>
```

```css
@layer components {
  .answer-container {
    @apply grid grid-cols-1 md:grid-cols-2 gap-4;
  }
  .answer-container > button {
    @apply w-full text-right whitespace-normal;
  }
}
```

- 1 column on mobile, 2 on md+; buttons fill column width.

### Interactive Element Effects

All interactive components use a subtle hover/blow effect with:

```css
.group.relative {
  /* parent */ @apply group relative overflow-hidden;
}
.glow-overlay {
  /* child in .group */ @apply absolute inset-0 bg-[var(--accent-color)] opacity-0 blur-md group-hover:opacity-30 transition-opacity;
}
@layer components {
  .option-button, .start-button, .config-option {
    @apply group.relative transition-transform duration-300 hover:scale-110;
  }
}
```

Place `<span class="glow-overlay" />` as the first child inside each `option-button`, `start-button`, or `config-option` element.

---

## 📁 Project Structure

```
trivia-app/
├── public/
│   └── index.html            # HTML template
├── src/
│   ├── components/
│   │   ├── NavBar.tsx        # top settings cog / close X
│   │   ├── StartScreen.tsx   # welcome screen
│   │   ├── SetupScreen.tsx   # theme & gameplay configuration
│   │   ├── QuizScreen.tsx    # single‑question flow
│   │   ├── Question.tsx      # question+choices
│   │   └── ResultScreen.tsx  # final score
│   ├── hooks/
│   │   └── useQuestions.ts   # fetch logic for OpenTDB
│   ├── types.ts              # OpenTDBQuestion & Settings
│   ├── index.css             # Tailwind directives + @layer components
│   ├── App.tsx               # root component + stage management
│   └── main.tsx              # React entry point
├── tailwind.config.ts        # Tailwind setup
├── postcss.config.cjs        # PostCSS plugins
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
├── vitest.config.ts          # Vitest config
└── package.json              # scripts & dependencies
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
2. **Development**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173).
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

Follow GitHub Pages steps from earlier to add `gh-pages` and deploy the `dist/` folder.

---

## 🔮 Future Improvements

- Timer per question
- Progress bar
- Accessibility (ARIA)
- Additional themes & UI animations

---

Made with ❤️ and code reviews. Enjoy your Trivia App!
