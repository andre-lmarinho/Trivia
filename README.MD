# Trivia App

#### Video Demo:  https://youtu.be/YZ65p7ZkycY
#### Description:
An interactive quiz application built with React, TypeScript, Vite, and Tailwind CSS, fetching real‑time questions from the OpenTDB API and offering a fully customizable, themeable experience.

---

🔗 Live Demo

[View on GitHub Pages](https://andre-lmarinho.github.io/Trivia/)
*or* deploy easily to Vercel or Netlify with the same settings.

---

## 🚀 Features

* **In‑Game Menu Drawer**: Toggle a unified navigation drawer (gear icon) to access:

  * **Gameplay Settings** (Category, Number of Questions, Difficulty)
  * **Theme Selector** (7 live‑preview themes)
* **Start Screen**: Welcome prompt with a “Start Quiz” button.
* **Quiz Screen**: Presents one multiple‑choice question at a time, with a progress bar and shuffled options.
* **Result Screen**: Displays the final score and “Play Again” button.
* **Responsive Design**: Mobile‑first drawer at top and desktop sidebar on the right, with backdrop blur.
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
* `and much more...

Select themes in the in‑game menu drawer and see live previews instantly.

---

## 🎯 Design Decisions

- **Vite over CRA**: selected for its super-fast HMR and minimal config, making o setup mais ágil.
- **TypeScript for type safety**: garante contratos claros entre API (OpenTDB) e componentes, reduzindo bugs em produção.
- **CSS variables for themes**: permite trocar esquemas de cores em tempo real sem rebuild, em vez de gerar classes Tailwind dinamicamente.
- **Folder structure**: separei Layout, Quiz e Settings para isolar responsabilidades e facilitar a manutenção/testes unitários via Vitest.

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
|   |   ├── Layout/
│   │   │   ├── NavBar.tsx        # gear/X toggle
│   │   │   ├── MenuScreen.tsx    # in-game drawer
│   │   │   └── ProgressBar       # progress bar
|   |   ├── Quiz/
│   │   │   ├── StartScreen.tsx   # welcome screen
│   │   │   ├── Question.tsx      # question
│   │   │   ├── QuizScreen.tsx    # quiz flow
│   │   │   └── ResultScreen.tsx  # final score
|   |   └── Settings/
│   │       ├── SetupScreen.tsx   # gameplay settings
│   │       └── ThemeScreen.tsx   # theme selection
│   ├── hooks/
│   │   └── useQuestions.ts   # OpenTDB fetch hook
│   ├── types.ts              # interfaces for API & settings
│   ├── index.css             # Tailwind directives + @layer components
│   ├── App.tsx               # root flow + menu integration
│   └── main.tsx              # React entry
└── index.html                # HTML template
├── tailwind.config.ts        # Tailwind setup
├── vite.config.ts            # Vite config
├── tsconfig.json             # TS config
├── vitest.config.ts          # Vitest setup
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

* Timer per question
* Progress bar animations
* Background animations
* Enhanced accessibility (ARIA)
* Score ranking
* More themes & UI polish

---

Made with ❤️ and code reviews. Have fun with your Quiz!
