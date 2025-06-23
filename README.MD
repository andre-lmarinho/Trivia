# Trivia App

An interactive quiz application built with React, TypeScript, Vite, Tailwind CSS, and Vitest, fetching dynamic questions from the OpenTDB API.

---

## 🚀 Features

* **Start Screen**: Welcome prompt with a “Start Quiz” button.
* **Quiz Screen**: Presents one multiple-choice question at a time (10 questions by default), shuffling options.
* **Result Screen**: Displays the final score and a “Play Again” button to restart.
* **Data-Driven**: All questions are loaded in real time from the [OpenTDB API](https://opentdb.com/).
* **Responsive UI**: Styled with Tailwind CSS for rapid layout and design.
* **Type Safety**: Written in TypeScript with strict typings for API responses.
* **Fast Bundling**: Powered by Vite for instant hot-reload during development.
* **Testing**: Includes unit tests with Vitest for core logic and components.

---

## 🔧 Tech Stack

* **React 18** for component-based UI
* **TypeScript** for static typing and interfaces
* **Vite** as the build tool and development server
* **Tailwind CSS** for utility-first styling
* **Vitest** for unit testing
* **OpenTDB** as the question source

---

## 📁 Project Structure

```
trivia-app/
├── public/
│   └── index.html            # HTML template
├── src/
│   ├── components/           # UI components
│   │   ├── StartScreen.tsx   # Welcome screen
│   │   ├── QuizScreen.tsx    # Quiz flow
│   │   ├── Question.tsx      # Single question
│   │   └── ResultScreen.tsx  # Final score
│   ├── hooks/
│   │   └── useQuestions.ts   # Data fetching hook
│   ├── types.ts              # API and internal data interfaces
│   ├── index.css             # Tailwind base imports
│   ├── App.tsx               # Root component managing stages
│   └── main.tsx              # Entry point
├── tailwind.config.ts        # Tailwind configuration
├── postcss.config.cjs        # PostCSS plugins
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── vitest.config.ts          # Vitest setup
├── package.json              # NPM scripts & dependencies
└── README.md                 # Project overview (this file)
```

---

## 💻 Getting Started

### Prerequisites

* Node.js v16+ (or higher)
* npm (comes with Node.js)

### Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/<your-username>/trivia-app.git
   cd trivia-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

Generates optimized assets in `dist/`.

### Previewing Build

```bash
npm run preview
```

Serves the production build locally.

### Running Tests

```bash
npm run test
```

Runs Vitest in watch mode.

---

## 🌐 Deployment

For GitHub Pages:

1. Add `homepage` in `package.json`:

   ```json
   {
     "homepage": "https://<username>.github.io/<repo-name>"
   }
   ```
2. Install `gh-pages`:

   ```bash
   npm install --save-dev gh-pages
   ```
3. Add deploy scripts in `package.json`:

   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Deploy:

   ```bash
   npm run deploy
   ```

---

## 🔮 Future Improvements

* **Category & Difficulty Filter**: Let users choose question categories or difficulty levels.
* **Timer**: Add a countdown timer per question.
* **LocalStorage Persistence**: Save high scores or in-progress quizzes.
* **Dark Mode**: Toggle between light and dark themes.
* **Accessibility**: Enhance ARIA roles and keyboard navigation.

---

Made with ❤️ and lots of debugging. Good luck and have fun!
