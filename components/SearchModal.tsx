import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, BookOpen, Sigma, CornerDownLeft } from 'lucide-react';
import { View } from '../types';
import { searchContent } from '../data/curriculum';

interface SearchModalProps {
  onClose: () => void;
  onNavigate: (view: View) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchContent(query), [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const go = (i: number) => {
    const r = results[i];
    if (!r) return;
    onNavigate(
      r.type === 'formula'
        ? { name: 'topic', courseId: r.courseId, topicId: r.topicId }
        : { name: 'topic', courseId: r.courseId, topicId: r.topicId },
    );
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(active);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-brand-navy/50 dark:bg-black/70 backdrop-blur-sm p-4 pt-[12vh] animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-ink-800 rounded-2xl shadow-2xl border border-brand-beige dark:border-ink-600 overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-brand-beige dark:border-ink-700">
          <Search size={20} className="text-brand-gold shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search topics and formulas..."
            className="flex-1 bg-transparent py-4 outline-none text-brand-navy dark:text-white placeholder:text-slate-400"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-brand-navy dark:hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">No results for “{query}”.</div>
          )}
          {!query && (
            <div className="text-center py-10 text-slate-400 text-sm">
              Type to search across all lessons and formulas.
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.type}-${r.topicId}-${r.label}-${i}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(i)}
              className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                active === i ? 'bg-brand-beige dark:bg-ink-700' : 'hover:bg-brand-beige/50 dark:hover:bg-ink-700/50'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  r.type === 'formula' ? 'bg-brand-gold/15 text-brand-gold' : 'bg-brand-navy text-brand-gold'
                }`}
              >
                {r.type === 'formula' ? <Sigma size={16} /> : <BookOpen size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-brand-navy dark:text-white truncate">
                    {r.type === 'formula' ? r.label : r.topicTitle}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-beige dark:bg-ink-600 text-slate-500 dark:text-slate-300">
                    {r.board}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {r.type === 'formula' ? `${r.topicTitle} · ${r.courseTitle}` : r.label}
                </div>
              </div>
              {active === i && <CornerDownLeft size={15} className="text-slate-400 shrink-0" />}
            </button>
          ))}
        </div>

        <div className="px-4 py-2.5 border-t border-brand-beige dark:border-ink-700 flex items-center gap-4 text-[11px] text-slate-400">
          <span><kbd className="font-sans font-semibold">↑↓</kbd> navigate</span>
          <span><kbd className="font-sans font-semibold">↵</kbd> open</span>
          <span><kbd className="font-sans font-semibold">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
