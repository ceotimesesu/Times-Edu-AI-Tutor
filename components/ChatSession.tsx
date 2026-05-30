import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Send, Image as ImageIcon, Loader2, User, Bot, Download, Copy, Check, Volume2, Globe, RefreshCw, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Message, TutorMode } from '../types';
import { SYSTEM_INSTRUCTION, MATH_FOCUS } from '../constants';

interface ChatSessionProps {
  mode: TutorMode;
  apiKey: string;
}

const CodeBlock = ({ inline, className, children, ...props }: any) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const codeText = String(children).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
        return (
            <code className={`${className} px-1.5 py-0.5 rounded text-sm font-mono bg-brand-navy/5 text-brand-navy font-semibold border border-brand-navy/10`} {...props}>
                {children}
            </code>
        );
    }

    return (
        <div className="relative group my-4 rounded-xl overflow-hidden border border-brand-navy/10 shadow-sm bg-brand-navy">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-slate-300">
                <span className="font-mono font-semibold text-brand-gold">
                    {match?.[1] || 'code'}
                </span>
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1 hover:text-white transition-colors opacity-70 hover:opacity-100"
                >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <code className={`${className} text-sm font-mono text-brand-beige leading-relaxed`} {...props}>
                    {children}
                </code>
            </div>
        </div>
    );
};

const ThinkingIndicator = () => {
    const [step, setStep] = useState(0);
    const steps = [
        "Analyzing your request...",
        "Checking syllabus & resources...",
        "Formulating explanation...",
        "Finalizing response..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % steps.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-3 p-4 bg-white/50 border border-brand-gold/10 rounded-2xl w-fit animate-in fade-in duration-300">
             <div className="relative">
                <div className="w-8 h-8 rounded-full border-2 border-brand-gold/20 border-t-brand-gold animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Bot size={12} className="text-brand-gold" />
                </div>
             </div>
             <div className="flex flex-col">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-0.5">Times Edu Tutor</span>
                <span className="text-sm text-brand-navy/70 font-medium min-w-[180px] transition-all duration-300">
                    {steps[step]}
                </span>
             </div>
        </div>
    );
};

const ChatSession: React.FC<ChatSessionProps> = ({ mode, apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I'm your **Times Edu AI Math Tutor** for **IGCSE & IB Mathematics**. \n\nI'm ready to help you in **${
        mode === 'teacher' ? 'Teacher Copilot' :
        mode === 'guide' ? 'Student Guide' :
        mode === 'explain' ? 'Simplistic' : 'Exam'
      }** mode. \n\n### I can help you:\n\n*   $\\\sqrt{x^2+y^2}$ Solve & understand **Math problems** step by step\n*   📐 Master **algebra, calculus, trig, statistics** and more\n*   📷 Get feedback on a **photo** of your working\n*   🔎 Revise with **syllabus-aligned** explanations\n\nWhat topic shall we work on today?`,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) return;

    const ai = new GoogleGenAI({ apiKey });
    chatSessionRef.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + MATH_FOCUS + `\n\nCURRENT MODE: ${mode}`,
        tools: [{ googleSearch: {} }], // Enable Search Grounding
      },
    });

    if (messages.length > 1) {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'system',
            text: `Switched to **${
                mode === 'teacher' ? 'Teacher Copilot' : 
                mode === 'guide' ? 'Student (Guide Me)' : 
                mode === 'explain' ? 'Student (Explain like I\'m 12)' : 'Student (Exam Mode)'
            }**.`,
            timestamp: new Date()
        } as Message]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, apiKey]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming, isSending]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const speakMessage = (text: string, id: string) => {
      if (speakingId === id) {
          window.speechSynthesis.cancel();
          setSpeakingId(null);
          return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeakingId(null);
      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
  };

  const handleSendMessage = async () => {
    if ((!inputText.trim() && !selectedImage) || isSending || isStreaming || !chatSessionRef.current) return;

    const userMsgId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMsgId,
      role: 'user',
      text: inputText,
      image: selectedImage || undefined,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText('');
    setSelectedImage(null);
    setIsSending(true);

    try {
      const modelMsgId = (Date.now() + 1).toString();
      let streamResult;

      if (selectedImage) {
        const base64Data = selectedImage.split(',')[1];
        const mimeType = selectedImage.split(';')[0].split(':')[1];
        
        streamResult = await chatSessionRef.current.sendMessageStream({
            message: { 
                role: 'user', 
                parts: [
                    { text: newUserMessage.text },
                    { inlineData: { data: base64Data, mimeType } }
                ] 
            }
        });

      } else {
        streamResult = await chatSessionRef.current.sendMessageStream({ message: newUserMessage.text });
      }

      setIsSending(false);
      setIsStreaming(true);
      
      setMessages(prev => [
        ...prev,
        {
          id: modelMsgId,
          role: 'model',
          text: '',
          timestamp: new Date(),
        }
      ]);

      let fullText = '';
      let collectedMetadata: any = null;
      
      for await (const chunk of streamResult) {
          const chunkText = chunk.text;
          const metadata = chunk.candidates?.[0]?.groundingMetadata;
          
          if (metadata) {
              collectedMetadata = metadata;
          }

          if (chunkText) {
              fullText += chunkText;
              setMessages(prev => {
                  const newMsgs = [...prev];
                  const lastIndex = newMsgs.findIndex(m => m.id === modelMsgId);
                  if (lastIndex !== -1) {
                      newMsgs[lastIndex] = { 
                          ...newMsgs[lastIndex], 
                          text: fullText,
                          groundingMetadata: collectedMetadata 
                      };
                  }
                  return newMsgs;
              });
          }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setIsSending(false);
      setIsStreaming(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'system',
          text: "An error occurred while communicating with the tutor. Please check your connection or try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsSending(false);
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleExportChat = () => {
    const exportText = messages.map(msg => {
      const time = msg.timestamp instanceof Date ? msg.timestamp.toLocaleString() : new Date(msg.timestamp).toLocaleString();
      const role = msg.role === 'model' ? 'Times Edu Tutor' : msg.role === 'user' ? 'You' : 'System';
      const imageNote = msg.image ? '[Image Attached]\n' : '';
      return `[${time}] ${role}:\n${imageNote}${msg.text}\n`;
    }).join('\n----------------------------------------\n\n');

    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TimesEdu_Session_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-brand-beige overflow-hidden">
      {/* Header Area */}
      <div className="p-3 px-4 border-b border-brand-beige flex justify-between items-center bg-brand-beige/30">
        <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm ${mode === 'teacher' ? 'bg-purple-500' : 'bg-green-500'}`}></div>
            <div>
                <h2 className="font-bold text-brand-navy text-sm leading-none">
                    {mode === 'teacher' ? 'Teacher Copilot' : 
                    mode === 'guide' ? 'Student: Guide Me' : 
                    mode === 'explain' ? 'Student: Simplified' : 'Student: Exam Mode'}
                </h2>
                <span className="text-[10px] text-slate-500 font-medium">Always accurate. Always rigorous.</span>
            </div>
        </div>
        <button 
            onClick={handleExportChat} 
            className="text-slate-400 hover:text-brand-navy p-2 hover:bg-brand-beige rounded-lg transition-colors"
            title="Export Chat History"
        >
            <Download size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] md:max-w-[80%] rounded-2xl p-6 shadow-sm relative group ${
                msg.role === 'user'
                  ? 'bg-brand-navy text-white rounded-br-none'
                  : msg.role === 'system' 
                    ? 'bg-brand-beige text-slate-500 text-sm italic mx-auto border border-brand-gold/20 py-2 px-4'
                    : 'bg-white border border-brand-beige text-brand-navy rounded-bl-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]'
              }`}
            >
              {/* Message Header */}
              {msg.role !== 'system' && (
                  <div className={`flex items-center gap-2 mb-3 pb-3 border-b border-opacity-10 ${msg.role === 'user' ? 'border-white' : 'border-brand-navy'}`}>
                    {msg.role === 'model' ? (
                        <div className="w-6 h-6 rounded-lg bg-brand-navy flex items-center justify-center text-brand-gold shadow-sm">
                            <Bot size={14} />
                        </div>
                    ) : (
                        <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center text-white shadow-sm">
                            <User size={14} />
                        </div>
                    )}
                    <span className={`text-xs font-bold uppercase tracking-wider ${msg.role === 'user' ? 'text-brand-gold' : 'text-slate-400'}`}>
                      {msg.role === 'model' ? 'Times Edu Tutor' : 'You'}
                    </span>
                    <span className="text-[10px] text-opacity-50 ml-auto font-mono">
                         {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
              )}

              {msg.image && (
                <div className="mb-4">
                  <img src={msg.image} alt="User upload" className="max-w-full h-auto rounded-lg border border-white/20 shadow-sm" />
                </div>
              )}

              <div className={`prose prose-base max-w-none 
                ${msg.role === 'user' ? 'prose-invert prose-p:text-slate-100 prose-headings:text-white' : 'prose-slate prose-p:text-slate-700 prose-headings:text-brand-navy'}
                prose-headings:font-bold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                prose-p:leading-relaxed
                prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-brand-gold prose-blockquote:bg-brand-beige/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r prose-blockquote:italic
                prose-li:marker:text-brand-gold
                prose-img:rounded-xl prose-img:shadow-md
                `}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code: CodeBlock,
                        table: ({node, ...props}) => (
                            <div className="overflow-x-auto my-4 rounded-xl border border-slate-200 shadow-sm">
                                <table className="w-full text-sm text-left border-collapse bg-white text-slate-700" {...props} />
                            </div>
                        ),
                        thead: ({node, ...props}) => (
                            <thead className="bg-brand-beige text-brand-navy uppercase text-xs font-bold tracking-wider" {...props} />
                        ),
                        th: ({node, ...props}) => (
                            <th className="px-5 py-3 border-b border-brand-gold/20" {...props} />
                        ),
                        td: ({node, ...props}) => (
                            <td className="px-5 py-3 border-b border-slate-100 last:border-0" {...props} />
                        ),
                        tr: ({node, ...props}) => (
                            <tr className="hover:bg-slate-50 transition-colors" {...props} />
                        ),
                        a: ({node, ...props}) => (
                            <a target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-navy transition-colors font-medium underline decoration-brand-gold/30 underline-offset-2" {...props} />
                        ),
                        blockquote: ({node, ...props}) => (
                            <blockquote className="border-l-4 border-brand-gold pl-4 py-1 my-4 bg-brand-beige/20 text-slate-700 italic rounded-r-lg" {...props} />
                        )
                    }}
                >
                    {msg.text}
                </ReactMarkdown>
                
                {/* Streaming Cursor */}
                {msg.role === 'model' && isStreaming && messages[messages.length-1].id === msg.id && (
                     <span className="inline-block w-2 h-5 ml-1 bg-brand-gold animate-pulse align-middle rounded-sm"></span>
                )}
              </div>

              {/* Grounding Sources */}
              {msg.groundingMetadata?.groundingChunks && msg.groundingMetadata.groundingChunks.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <Globe size={12} />
                          <span>Sources</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                          {msg.groundingMetadata.groundingChunks.map((chunk, idx) => (
                              chunk.web?.uri && (
                                  <a 
                                      key={idx} 
                                      href={chunk.web.uri}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-beige/50 hover:bg-brand-beige text-brand-navy text-xs rounded-full border border-brand-gold/10 transition-colors truncate max-w-[200px]"
                                  >
                                      <BookOpen size={10} className="text-brand-gold" />
                                      <span className="truncate">{chunk.web.title || new URL(chunk.web.uri).hostname}</span>
                                  </a>
                              )
                          ))}
                      </div>
                  </div>
              )}

              {/* Action Toolbar (Model only) */}
              {msg.role === 'model' && !isStreaming && (
                  <div className="mt-4 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                          onClick={() => copyToClipboard(msg.text)}
                          className="p-1.5 text-slate-400 hover:text-brand-navy hover:bg-brand-beige rounded-lg transition-colors"
                          title="Copy text"
                      >
                          <Copy size={16} />
                      </button>
                      <button 
                          onClick={() => speakMessage(msg.text, msg.id)}
                          className={`p-1.5 hover:bg-brand-beige rounded-lg transition-colors ${speakingId === msg.id ? 'text-brand-gold animate-pulse' : 'text-slate-400 hover:text-brand-navy'}`}
                          title="Read aloud"
                      >
                          <Volume2 size={16} />
                      </button>
                  </div>
              )}
            </div>
          </div>
        ))}

        {isSending && (
            <div className="flex justify-start">
               <ThinkingIndicator />
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-brand-beige shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-10">
        {selectedImage && (
            <div className="flex items-center gap-2 mb-2 p-2 bg-brand-beige rounded-lg border border-brand-gold/20 w-fit animate-in slide-in-from-bottom-2">
                <ImageIcon size={14} className="text-brand-gold" />
                <span className="text-xs text-brand-navy font-medium">Image attached</span>
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="text-slate-400 hover:text-red-500 ml-2"
                >
                    &times;
                </button>
            </div>
        )}
        <div className="flex items-end gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-slate-400 hover:text-brand-navy hover:bg-brand-beige rounded-xl transition-colors"
            title="Upload image"
          >
            <ImageIcon size={20} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          
          <div className="flex-1 bg-brand-beige border border-transparent focus-within:border-brand-gold/50 rounded-xl focus-within:ring-2 focus-within:ring-brand-gold/20 transition-all">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="w-full bg-transparent p-3 max-h-32 min-h-[50px] resize-none focus:outline-none text-brand-navy placeholder:text-slate-400 leading-relaxed font-medium"
              rows={1}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={(!inputText.trim() && !selectedImage) || isSending || isStreaming}
            className={`p-3 rounded-xl flex items-center justify-center transition-all duration-200 ${
              (!inputText.trim() && !selectedImage) || isSending || isStreaming
                ? 'bg-brand-beige text-slate-300 cursor-not-allowed'
                : 'bg-brand-navy text-brand-gold hover:bg-brand-navy/90 shadow-md hover:shadow-lg transform active:scale-95'
            }`}
          >
            {isSending ? (
                <Loader2 size={20} className="animate-spin" />
            ) : isStreaming ? (
                <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce"></div>
                </div>
            ) : (
                <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSession;