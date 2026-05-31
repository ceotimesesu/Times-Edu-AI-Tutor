# Times Edu — IGCSE & IB Math Learning Hub

A website that helps students learn **IGCSE** and **IB Mathematics**. It combines
self-study course content with an AI tutor:

- **Course explorer** — Cambridge IGCSE (0580) plus IB Math *Analysis & Approaches*
  and *Applications & Interpretation* (SL/HL), each split into clear topic lessons.
- **Lessons** — concise, syllabus-aligned explanations rendered with proper maths
  (LaTeX via KaTeX), a key-formula panel, and collapsible worked examples.
- **Practice** — graded (Easy / Medium / Hard) exam-style questions with reveal-able
  answers and full worked solutions.
- **Formula reference** — every key formula across all courses, searchable and
  filterable by board.
- **AI tutor** — a Gemini-powered chat (and beta live-voice) tutor with Socratic
  "Guide me", "Explain simply" and "Exam" modes. Upload a photo of your working for
  feedback. *(Requires a Gemini API key; the rest of the site works without one.)*
- **Quiz mode** — pick a course and number of questions for a timed, self-marked quiz
  with a score summary.
- **Mock exam papers** — full practice papers per course with marks and detailed
  mark schemes.
- **Progress tracking** — mark topics complete, bookmark topics, log practice results
  and quiz scores. A **dashboard** shows per-course progress, bookmarks and quiz
  history. Everything persists in the browser (localStorage).
- **Polish** — global search (`⌘K` / `/`) across topics and formulas, a light/dark
  theme toggle, smooth animations and full keyboard navigation in search.

## Tech stack

React 19 + TypeScript + Vite, Tailwind CSS, `react-markdown` + `remark-math` +
`rehype-katex` for maths rendering, and `@google/genai` for the AI tutor.

## Project structure

```
App.tsx                  Top-level nav, theme toggle, search + view router
hooks/appState.tsx       Progress / bookmarks / quiz / theme (localStorage) context
data/curriculum.ts       All course / topic / formula / practice content + search
data/exams.ts            Mock exam papers + mark schemes
components/
  HomePage.tsx           Landing page
  CoursesIndex.tsx       Course grid (with progress)
  CoursePage.tsx         Topic list for a course (with progress bar)
  TopicPage.tsx          Lesson, formulas, examples, interactive practice
  FormulaSheet.tsx       Searchable formula reference
  Dashboard.tsx          Progress, bookmarks and quiz history
  QuizView.tsx           Timed, self-marked quiz mode
  Exams.tsx              Exam paper list + paper viewer
  SearchModal.tsx        Global ⌘K search
  TutorView.tsx          AI tutor (chat / live voice) + API-key gate
  ChatSession.tsx        Gemini text chat
  LiveSession.tsx        Gemini live voice
  Markdown.tsx           Shared markdown + LaTeX renderer
```

## Run locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. *(Optional, for the AI tutor)* set `GEMINI_API_KEY` in `.env.local`, or paste a
   key in the app's AI Tutor tab.
3. Start the dev server: `npm run dev`
4. Build for production: `npm run build` (output in `dist/`).

## Adding content

All lessons live in [`data/curriculum.ts`](data/curriculum.ts). Add a topic to a
course's `topics` array — write `content` as markdown (inline `$...$` and display
`$$...$$` LaTeX are supported), then list `formulas`, `examples` and `practice`.
