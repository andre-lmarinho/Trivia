# 📚 Trivia Web App

A simple trivia app that started as a CS50 assignment and is evolving into a more interactive and user-friendly experience. Built with HTML, CSS, and JavaScript, this project explores clean UI, real-time feedback, and dynamic question navigation.

The goal was to build a small interactive quiz using HTML, CSS, and JavaScript — applying DOM manipulation and dynamic styling concepts.

---

## ✨ Features

### Multiple Choice
- User answers a question with 3 alternatives.
- Correct answer turns the button green.
- Incorrect answers turn red.
- Text feedback appears below the question.

### Free Response
- User types an answer and clicks “Check”.
- Input turns green if correct, red if incorrect.
- Text feedback appears below the question.

### Question Selector
- Navigation buttons let the user switch between questions.
- The active question’s button displays a visual indicator using `::after`:
  - **Blue** (selected)

---

## 🧠 Technologies Used

- **HTML5** for page structure  
- **CSS3** with `::after` pseudo-element for visual cues  
- **Vanilla JavaScript** for interactivity and logic  

---

## 🚀 How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git


## 🪵Changelog

### 2025-06-20 
- Moved `data-answer` and `data-type` into each `.section` container  
- Replaced per-question IDs (`feedback1`, `feedback2`) by a generic `<p class="feedback">`  
- Refactored JS:  
  - Added `setFeedback()` helper  
  - Handlers escaláveis para `[data-type="multiple"]` e `[data-type="free"]`  
  - Generic question navigation via `.selector[data-target]` 
  - Added auto-generated questions 
- Removed hard-coded IDs in HTML and JS  
- Added `.hidden` class para controlar visibilidade via CSS  
- Introduced CSS variables in `:root` e replaced hard-coded colors
- Created JSON for Trivia questions and answers

### 2025-06-20 
- Initial CS50 trivia app with two questions