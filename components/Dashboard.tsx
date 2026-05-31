import React from 'react';
import {
  Trophy,
  BookmarkCheck,
  Target,
  Flame,
  ArrowRight,
  Bookmark,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { View } from '../types';
import { COURSES } from '../data/curriculum';
import { useAppState, topicKey } from '../hooks/appState';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const ProgressRing: React.FC<{ pct: number; size?: number }> = ({ pct, size = 64 }) => {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={6} className="stroke-brand-beige dark:stroke-ink-700" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={6}
        strokeLinecap="round"
        className="stroke-brand-gold transition-all duration-700"
        strokeDasharray={c}
        strokeDashoffset={c - (pct / 100) * c}
      />
    </svg>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { courseStats, overallPct, bookmarkKeys, quizzes, resetAll } = useAppState();

  const bookmarks = bookmarkKeys
    .map((k) => {
      const [courseId, topicId] = k.split('::');
      const course = COURSES.find((c) => c.id === courseId);
      const topic = course?.topics.find((t) => t.id === topicId);
      return course && topic ? { course, topic } : null;
    })
    .filter(Boolean) as { course: (typeof COURSES)[number]; topic: (typeof COURSES)[number]['topics'][number] }[];

  const totalCorrect = COURSES.reduce((n, c) => n + courseStats(c.id).practiceCorrect, 0);
  const totalAttempted = COURSES.reduce((n, c) => n + courseStats(c.id).practiceAttempted, 0);
  const bestQuiz = quizzes.reduce(
    (best, q) => Math.max(best, q.total ? Math.round((q.correct / q.total) * 100) : 0),
    0,
  );

  const stats = [
    { icon: Target, label: 'Overall progress', value: `${overallPct}%` },
    { icon: CheckCircle2, label: 'Practice correct', value: `${totalCorrect}/${totalAttempted || 0}` },
    { icon: Flame, label: 'Quizzes taken', value: quizzes.length },
    { icon: Trophy, label: 'Best quiz score', value: `${bestQuiz}%` },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mb-1">My progress</h1>
            <p className="text-slate-500 dark:text-slate-400">Everything is saved in your browser.</p>
          </div>
          <button
            onClick={() => onNavigate({ name: 'quiz' })}
            className="inline-flex items-center gap-2 bg-brand-navy text-white px-5 py-3 rounded-xl font-semibold hover:bg-brand-navy/90 transition-colors"
          >
            <Flame size={18} className="text-brand-gold" /> Start a quiz
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white dark:bg-ink-800 rounded-2xl border border-brand-beige dark:border-ink-700 p-5">
              <s.icon size={20} className="text-brand-gold mb-3" />
              <div className="text-2xl font-bold text-brand-navy dark:text-white">{s.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Per-course progress */}
        <h2 className="text-xl font-bold text-brand-navy dark:text-white mb-4">Courses</h2>
        <div className="space-y-3 mb-10">
          {COURSES.map((course) => {
            const st = courseStats(course.id);
            return (
              <button
                key={course.id}
                onClick={() => onNavigate({ name: 'course', courseId: course.id })}
                className="w-full text-left flex items-center gap-4 bg-white dark:bg-ink-800 rounded-2xl border border-brand-beige dark:border-ink-700 p-4 hover:shadow-md transition-all"
              >
                <ProgressRing pct={st.topicsPct} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-slate-200">
                      {course.board}
                    </span>
                    <h3 className="font-bold text-brand-navy dark:text-white truncate">{course.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {st.topicsDone}/{st.topicsTotal} topics complete · {st.practiceCorrect} practice correct
                  </p>
                </div>
                <ArrowRight size={18} className="text-slate-300 shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Bookmarks */}
        <div className="flex items-center gap-2 mb-4">
          <BookmarkCheck size={20} className="text-brand-gold" />
          <h2 className="text-xl font-bold text-brand-navy dark:text-white">Bookmarked topics</h2>
        </div>
        {bookmarks.length === 0 ? (
          <div className="bg-white dark:bg-ink-800 rounded-2xl border border-dashed border-brand-beige dark:border-ink-700 p-8 text-center text-slate-400 mb-10">
            <Bookmark size={24} className="mx-auto mb-2 opacity-50" />
            No bookmarks yet — tap the bookmark icon on any topic to save it here.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {bookmarks.map(({ course, topic }) => (
              <button
                key={topicKey(course.id, topic.id)}
                onClick={() => onNavigate({ name: 'topic', courseId: course.id, topicId: topic.id })}
                className="text-left bg-white dark:bg-ink-800 rounded-xl border border-brand-beige dark:border-ink-700 p-4 hover:border-brand-gold/40 transition-colors"
              >
                <div className="text-xs text-brand-gold font-semibold mb-0.5">{course.title}</div>
                <div className="font-semibold text-brand-navy dark:text-white">{topic.title}</div>
              </button>
            ))}
          </div>
        )}

        {/* Recent quizzes */}
        {quizzes.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-brand-navy dark:text-white mb-4">Recent quizzes</h2>
            <div className="space-y-2 mb-10">
              {quizzes.slice(0, 6).map((q) => {
                const pct = q.total ? Math.round((q.correct / q.total) * 100) : 0;
                return (
                  <div
                    key={q.id}
                    className="flex items-center justify-between bg-white dark:bg-ink-800 rounded-xl border border-brand-beige dark:border-ink-700 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-brand-navy dark:text-white text-sm truncate">{q.scope}</div>
                      <div className="text-xs text-slate-400">{new Date(q.date).toLocaleString()}</div>
                    </div>
                    <div
                      className={`font-bold text-sm px-3 py-1 rounded-full ${
                        pct >= 70
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                          : pct >= 40
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                      }`}
                    >
                      {q.correct}/{q.total} · {pct}%
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <button
          onClick={() => {
            if (confirm('Reset all progress, bookmarks and quiz history? This cannot be undone.')) resetAll();
          }}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-rose-500 transition-colors"
        >
          <RotateCcw size={15} /> Reset all progress
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
