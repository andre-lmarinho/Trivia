# Changelog

## Current
- 🎨 Moved `data-answer` and `data-type` into each `.section` container  
- 🆕 Replaced per-question IDs (`feedback1`, `feedback2`) by a generic `<p class="feedback">`  
- 🔄 Refactored JS:  
  - Added `setFeedback()` helper  
  - Handlers escaláveis para `[data-type="multiple"]` e `[data-type="free"]`  
  - Generic question navigation via `.selector[data-target]`  
- ✂️ Removed hard-coded IDs in HTML and JS  
- 🆕 Added `.hidden` class para controlar visibilidade via CSS  
- 🎨 Introduced CSS variables in `:root` e replaced hard-coded colors  

## 2025-06-20
### Added 
- Initial CS50 trivia app with two questions
