import React, { useMemo, useState } from 'react';
import { Search, Sigma } from 'lucide-react';
import { View } from '../types';
import { COURSES } from '../data/curriculum';
import Markdown from './Markdown';

interface FormulaSheetProps {
  onNavigate: (view: View) => void;
}

const InlineMath: React.FC<{ expr: string }> = ({ expr }) => (
  <Markdown className="prose-p:my-0">{`$${expr}$`}</Markdown>
);

const FormulaSheet: React.FC<FormulaSheetProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [board, setBoard] = useState<'all' | 'IGCSE' | 'IB'>('all');

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COURSES.filter((c) => board === 'all' || c.board === board)
      .map((course) => ({
        course,
        topics: course.topics
          .map((topic) => ({
            topic,
            formulas: topic.formulas.filter(
              (f) =>
                !q ||
                f.name.toLowerCase().includes(q) ||
                topic.title.toLowerCase().includes(q) ||
                course.title.toLowerCase().includes(q),
            ),
          }))
          .filter((t) => t.formulas.length > 0),
      }))
      .filter((c) => c.topics.length > 0);
  }, [query, board]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
            <Sigma size={22} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-navy">Formula reference</h1>
            <p className="text-slate-500 text-sm">Every key formula from the IGCSE & IB Math courses, in one place.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 my-6">
          <div className="flex-1 flex items-center gap-2 bg-white border border-brand-beige rounded-xl px-4 focus-within:border-brand-gold/50 focus-within:ring-2 focus-within:ring-brand-gold/20 transition-all">
            <Search size={18} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search formulas or topics..."
              className="w-full bg-transparent py-3 outline-none text-brand-navy placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-1 bg-white border border-brand-beige rounded-xl p-1">
            {(['all', 'IGCSE', 'IB'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBoard(b)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  board === b ? 'bg-brand-navy text-white' : 'text-slate-500 hover:bg-brand-beige'
                }`}
              >
                {b === 'all' ? 'All' : b}
              </button>
            ))}
          </div>
        </div>

        {sections.length === 0 && (
          <div className="text-center py-16 text-slate-400">No formulas match “{query}”.</div>
        )}

        <div className="space-y-8">
          {sections.map(({ course, topics }) => (
            <div key={course.id}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-beige text-brand-navy">
                  {course.board}
                </span>
                <button
                  onClick={() => onNavigate({ name: 'course', courseId: course.id })}
                  className="font-bold text-brand-navy hover:text-brand-gold transition-colors"
                >
                  {course.title}
                </button>
              </div>
              <div className="space-y-4">
                {topics.map(({ topic, formulas }) => (
                  <div key={topic.id} className="rounded-2xl border border-brand-beige bg-white p-5">
                    <button
                      onClick={() => onNavigate({ name: 'topic', courseId: course.id, topicId: topic.id })}
                      className="text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors mb-3 block"
                    >
                      {topic.title}
                    </button>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {formulas.map((f) => (
                        <div key={f.name} className="rounded-xl bg-brand-beige/30 border border-brand-beige p-3">
                          <div className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                            {f.name}
                          </div>
                          <div className="overflow-x-auto">
                            <InlineMath expr={f.expr} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormulaSheet;
