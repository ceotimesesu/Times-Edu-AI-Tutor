import React from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Calculator,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Sigma,
} from 'lucide-react';
import { View } from '../types';
import { COURSES } from '../data/curriculum';

interface HomePageProps {
  onNavigate: (view: View) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const totalTopics = COURSES.reduce((n, c) => n + c.topics.length, 0);
  const totalPractice = COURSES.reduce(
    (n, c) => n + c.topics.reduce((m, t) => m + t.practice.length, 0),
    0,
  );

  return (
    <div className="h-full overflow-y-auto">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-brand-gold blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-brand-gold mb-6">
            <Sparkles size={14} />
            IGCSE & IB Mathematics, made clear
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Master <span className="text-brand-gold">IGCSE</span> &{' '}
            <span className="text-brand-gold">IB Math</span>
            <br className="hidden md:block" /> with a tutor that never sleeps.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Clear lessons, every key formula, worked examples and exam-style practice — plus an AI
            tutor that guides you step by step. Built for students chasing grades 7–9 and Level 6–7.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate({ name: 'courses' })}
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy px-6 py-3.5 rounded-xl font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-brand-gold/20"
            >
              <BookOpen size={20} /> Explore the courses
            </button>
            <button
              onClick={() => onNavigate({ name: 'tutor' })}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              <MessageSquare size={20} /> Ask the AI tutor
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg">
            {[
              { label: 'Courses', value: COURSES.length },
              { label: 'Lessons', value: totalTopics },
              { label: 'Practice Qs', value: `${totalPractice}+` },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-brand-gold">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course cards */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy dark:text-white">Choose your course</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Aligned to the official Cambridge & IB syllabuses.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <button
              key={course.id}
              onClick={() => onNavigate({ name: 'course', courseId: course.id })}
              className="text-left group bg-white dark:bg-ink-800 rounded-2xl border border-brand-beige dark:border-ink-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${course.accent}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-slate-200">
                    {course.board}
                  </span>
                  <Sigma className="text-brand-gold" size={22} />
                </div>
                <h3 className="font-bold text-lg text-brand-navy dark:text-white leading-tight mb-1">{course.title}</h3>
                <p className="text-xs text-brand-gold font-semibold mb-3">{course.level}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{course.tagline}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-brand-navy dark:text-white group-hover:text-brand-gold transition-colors">
                  {course.topics.length} topics
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-ink-800 border-y border-brand-beige dark:border-ink-700">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy dark:text-white text-center mb-10">
            Everything you need to revise smarter
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Syllabus-aligned lessons',
                body: 'Concise explanations for every strand, written the way examiners want to see it.',
              },
              {
                icon: Calculator,
                title: 'Worked examples & practice',
                body: 'See methods modelled, then test yourself with graded questions and full solutions.',
              },
              {
                icon: MessageSquare,
                title: 'Step-by-step AI tutor',
                body: 'Stuck on a problem? Get Socratic hints, marking and feedback — even from a photo.',
              },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-brand-beige/40 dark:bg-ink-700/50 border border-brand-beige dark:border-ink-700">
                <div className="w-11 h-11 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center mb-4">
                  <f.icon size={22} />
                </div>
                <h3 className="font-bold text-brand-navy dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-slate-800 p-8 md:p-10 text-white flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
              <GraduationCap size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Ready to level up your grade?</h3>
              <ul className="text-sm text-slate-300 space-y-0.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-gold" /> Pick a topic and read the lesson
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-gold" /> Try the practice, reveal solutions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-gold" /> Ask the AI tutor anything you miss
                </li>
              </ul>
            </div>
          </div>
          <button
            onClick={() => onNavigate({ name: 'courses' })}
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy px-6 py-3.5 rounded-xl font-bold hover:bg-amber-400 transition-colors whitespace-nowrap"
          >
            Start learning <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <footer className="text-center py-8 text-xs text-slate-400 border-t border-brand-beige dark:border-ink-700">
        Times Edu AI Tutor · Aligned to Cambridge IGCSE (0580) & IB Diploma Mathematics
      </footer>
    </div>
  );
};

export default HomePage;
