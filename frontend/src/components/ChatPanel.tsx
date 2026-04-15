import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  candidates: any[];
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ candidates }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await axios.post(`${apiUrl}/chat`, {
        query: userMsg,
        context: candidates
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not connect to the backend." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full glass-card rounded-2xl overflow-hidden border-indigo-500/20 shadow-2xl">
      <div className="bg-indigo-500/10 p-4 border-b border-indigo-500/20">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Bot size={20} className="text-indigo-400" />
          Candidate Assistant
        </h3>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Context: {candidates.length} Resumes</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px]">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <Bot size={40} className="mx-auto text-indigo-500/30 mb-2" />
            <p className="text-slate-500 text-sm">Ask me about the candidates!<br/>Example: "Who has the best AI experience?"</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm flex gap-2 ${
              msg.role === 'user' 
                ? 'bg-primary-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
            }`}>
              {msg.role === 'assistant' && <Bot size={16} className="shrink-0 mt-0.5 text-indigo-400" />}
              {msg.role === 'user' && <User size={16} className="shrink-0 mt-0.5" />}
              <span className="whitespace-pre-wrap">{msg.content}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 border border-slate-700 rounded-2xl rounded-tl-none p-3 text-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-indigo-400" />
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 bg-slate-900/50 border-t border-indigo-500/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about candidates..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            disabled={candidates.length === 0}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim() || candidates.length === 0}
            className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
