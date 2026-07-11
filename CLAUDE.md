# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReanBotic ("Reanbotic") is a gamified robotics learning platform prototype (Duolingo-style: XP, gems, hearts, streaks, levels) featuring step-by-step Arduino/electronics lessons, a drag-and-drop circuit simulator, a virtual Arduino code editor, and projects. It was scaffolded from Google AI Studio (see `metadata.json`); `@google/genai` is a dependency and `GEMINI_API_KEY` is expected in `.env.local`, but no Gemini API calls exist in `src/` yet.

## Commands

- `npm run dev` — start Vite dev server on port 3000 (host 0.0.0.0)
- `npm run build` — production build
- `npm run lint` — type-check only (`tsc --noEmit`); there is no ESLint config
- `npm run preview` — preview the production build

There is no test suite.

## Architecture

React 19 + Vite + TypeScript + Tailwind CSS v4 (via `@tailwindcss/vite` plugin, styles in `src/index.css`). Animations use `motion/react` (Motion/Framer Motion); icons from `lucide-react`.

**No router and no backend.** The entire app is client-side state in `src/App.tsx`:

- **Navigation** is a `page` state of type `PageType` (`src/types.ts`); `App.tsx` conditionally renders one component per page inside an `AnimatePresence` transition wrapper. To add a page: extend `PageType`, add a branch in `App.tsx`, and add a nav entry in `Sidebar.tsx`.
- **User state** (`UserState`: xp, gems, hearts, streak, level, completed lessons/projects) lives in `App.tsx` and is persisted to `localStorage` under `reanbotic_user`; dark mode under `reanbotic_dark` (dark is the default). All mutations flow through handler callbacks defined in `App.tsx` (`handleGainXP`, `handleCompleteLesson`, etc.) and are passed down as props — there is no context or state library.
- **Game economy rules** live in those `App.tsx` handlers: level = `floor(xp / 400) + 1`, +100 gems on level-up, lesson completion = +50 XP / +10 gems (+30 gems if perfect; reduced rewards on repeat), hearts max 5, heart refill costs 50 gems.
- **All content is static data** in `src/data.ts`: course levels, modules, lessons (with embedded quizzes), projects, achievements, and a mock leaderboard. Lessons/quizzes conform to the interfaces in `src/types.ts`. Adding curriculum content means editing `data.ts`, not creating components.
- **Auth is mocked** — `Auth.tsx` just collects name/email and calls back into `App.tsx`; logout resets to `INITIAL_USER`.

Path alias `@` resolves to the repo root (see `vite.config.ts`). Do not modify the HMR/`DISABLE_HMR` handling in `vite.config.ts` — it's required by AI Studio.
