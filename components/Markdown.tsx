import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownProps {
  children: string;
  /** Use the inverted (light-on-dark) palette, e.g. inside navy bubbles. */
  invert?: boolean;
  className?: string;
}

/**
 * Shared markdown + LaTeX renderer used across lessons, worked examples and
 * the AI tutor chat. Keeps the KaTeX / GFM configuration in one place.
 */
const Markdown: React.FC<MarkdownProps> = ({ children, invert = false, className = '' }) => {
  return (
    <div
      className={`prose prose-base max-w-none
        ${
          invert
            ? 'prose-invert prose-p:text-slate-100 prose-headings:text-white'
            : 'prose-slate prose-p:text-slate-700 prose-headings:text-brand-navy dark:prose-invert dark:prose-p:text-slate-300 dark:prose-headings:text-white dark:prose-strong:text-white'
        }
        prose-headings:font-bold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
        prose-p:leading-relaxed
        prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
        prose-strong:text-brand-navy
        prose-li:marker:text-brand-gold
        prose-img:rounded-xl prose-img:shadow-md
        ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4 rounded-xl border border-slate-200 dark:border-ink-600 shadow-sm">
              <table
                className="w-full text-sm text-left border-collapse bg-white dark:bg-ink-800 text-slate-700 dark:text-slate-300"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead
              className="bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-white uppercase text-xs font-bold tracking-wider"
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th className="px-5 py-3 border-b border-brand-gold/20" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-5 py-3 border-b border-slate-100 dark:border-ink-700 last:border-0" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-slate-50 dark:hover:bg-ink-700/50 transition-colors" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-brand-navy transition-colors font-medium underline decoration-brand-gold/30 underline-offset-2"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-brand-gold pl-4 py-1 my-4 bg-brand-beige/20 text-slate-700 italic rounded-r-lg"
              {...props}
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
