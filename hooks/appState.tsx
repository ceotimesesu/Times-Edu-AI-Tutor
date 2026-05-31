import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { COURSES } from '../data/curriculum';

/**
 * App-wide learning state (progress, bookmarks, quiz history) and theme,
 * persisted to localStorage so a student's progress survives reloads.
 */

export interface QuizResult {
  id: string;
  courseId: string;
  scope: string; // human label, e.g. "IGCSE Mathematics · Algebra"
  total: number;
  correct: number;
  date: number; // epoch ms
}

interface PersistedState {
  completed: Record<string, true>; // key: `${courseId}::${topicId}`
  bookmarks: Record<string, true>;
  practice: Record<string, 'correct' | 'wrong'>; // key: problem id
  quizzes: QuizResult[];
}

const STORAGE_KEY = 'timesedu.learning.v1';
const THEME_KEY = 'timesedu.theme';

const empty: PersistedState = { completed: {}, bookmarks: {}, practice: {}, quizzes: [] };

function load(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export const topicKey = (courseId: string, topicId: string) => `${courseId}::${topicId}`;

export interface CourseStats {
  topicsDone: number;
  topicsTotal: number;
  topicsPct: number;
  practiceCorrect: number;
  practiceAttempted: number;
  practiceTotal: number;
}

interface AppStateValue {
  // progress
  isComplete: (courseId: string, topicId: string) => boolean;
  toggleComplete: (courseId: string, topicId: string) => void;
  // bookmarks
  isBookmarked: (courseId: string, topicId: string) => boolean;
  toggleBookmark: (courseId: string, topicId: string) => void;
  bookmarkKeys: string[];
  // practice
  practiceResult: (problemId: string) => 'correct' | 'wrong' | undefined;
  recordPractice: (problemId: string, correct: boolean) => void;
  // quiz
  quizzes: QuizResult[];
  addQuiz: (r: Omit<QuizResult, 'id' | 'date'>) => void;
  // stats
  courseStats: (courseId: string) => CourseStats;
  overallPct: number;
  resetAll: () => void;
  // theme
  dark: boolean;
  toggleDark: () => void;
}

const Ctx = createContext<AppStateValue | null>(null);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PersistedState>(() =>
    typeof window === 'undefined' ? empty : load(),
  );
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  }, [dark]);

  const isComplete = useCallback(
    (c: string, t: string) => !!state.completed[topicKey(c, t)],
    [state.completed],
  );
  const toggleComplete = useCallback((c: string, t: string) => {
    const k = topicKey(c, t);
    setState((s) => {
      const completed = { ...s.completed };
      if (completed[k]) delete completed[k];
      else completed[k] = true;
      return { ...s, completed };
    });
  }, []);

  const isBookmarked = useCallback(
    (c: string, t: string) => !!state.bookmarks[topicKey(c, t)],
    [state.bookmarks],
  );
  const toggleBookmark = useCallback((c: string, t: string) => {
    const k = topicKey(c, t);
    setState((s) => {
      const bookmarks = { ...s.bookmarks };
      if (bookmarks[k]) delete bookmarks[k];
      else bookmarks[k] = true;
      return { ...s, bookmarks };
    });
  }, []);

  const recordPractice = useCallback((id: string, correct: boolean) => {
    setState((s) => ({ ...s, practice: { ...s.practice, [id]: correct ? 'correct' : 'wrong' } }));
  }, []);
  const practiceResult = useCallback((id: string) => state.practice[id], [state.practice]);

  const addQuiz = useCallback((r: Omit<QuizResult, 'id' | 'date'>) => {
    setState((s) => ({
      ...s,
      quizzes: [{ ...r, id: `${Date.now()}`, date: Date.now() }, ...s.quizzes].slice(0, 50),
    }));
  }, []);

  const courseStats = useCallback(
    (courseId: string): CourseStats => {
      const course = COURSES.find((c) => c.id === courseId);
      if (!course)
        return { topicsDone: 0, topicsTotal: 0, topicsPct: 0, practiceCorrect: 0, practiceAttempted: 0, practiceTotal: 0 };
      const topicsTotal = course.topics.length;
      const topicsDone = course.topics.filter((t) => state.completed[topicKey(courseId, t.id)]).length;
      let practiceTotal = 0;
      let practiceAttempted = 0;
      let practiceCorrect = 0;
      for (const t of course.topics) {
        for (const p of t.practice) {
          practiceTotal++;
          const r = state.practice[p.id];
          if (r) practiceAttempted++;
          if (r === 'correct') practiceCorrect++;
        }
      }
      return {
        topicsDone,
        topicsTotal,
        topicsPct: topicsTotal ? Math.round((topicsDone / topicsTotal) * 100) : 0,
        practiceCorrect,
        practiceAttempted,
        practiceTotal,
      };
    },
    [state.completed, state.practice],
  );

  const overallPct = useMemo(() => {
    const total = COURSES.reduce((n, c) => n + c.topics.length, 0);
    const done = Object.keys(state.completed).length;
    return total ? Math.round((Math.min(done, total) / total) * 100) : 0;
  }, [state.completed]);

  const resetAll = useCallback(() => setState(empty), []);

  const value: AppStateValue = {
    isComplete,
    toggleComplete,
    isBookmarked,
    toggleBookmark,
    bookmarkKeys: Object.keys(state.bookmarks),
    practiceResult,
    recordPractice,
    quizzes: state.quizzes,
    addQuiz,
    courseStats,
    overallPct,
    resetAll,
    dark,
    toggleDark: () => setDark((d) => !d),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useAppState(): AppStateValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
