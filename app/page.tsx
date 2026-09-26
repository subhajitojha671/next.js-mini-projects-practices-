"use client";

import { useState } from "react";
import { generateTextAction } from "@/app/actions/aiActions";
import ReactMarkdown from "react-markdown"

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendPrompt = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    try {
      setLoading(true);
      setOutput(""); // Clear previous output or keep it based on preference
      const response = await generateTextAction(prompt);
      setOutput(response);
    } catch (error) {
      console.error(error);
      setOutput("Something went wrong while generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex w-screen h-screen flex-col items-center justify-between bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="w-full py-4 px-8 border-b border-slate-200 bg-white shadow-sm text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Gemini AI Assistant</h1>
      </header>

      {/* Content / Output Area */}
      <div className="flex-1 w-full max-w-3xl p-6 overflow-y-auto flex flex-col justify-center items-center">
        {loading && (
          <div className="flex items-center space-x-2 text-slate-500 animate-pulse">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:-.2s]"></div>
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:-.4s]"></div>
            <span className="font-medium">Thinking...</span>
          </div>
        )}

        {!loading && output && (
          <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">AI Response</h2>
            {/* Changed outer <p> to a <div> to fix the hydration/HTML nesting error */}
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          </div>
        )}

        {!loading && !output && (
          <div className="text-center text-slate-400">
            <p className="text-lg font-medium">How can I help you today?</p>
            <p className="text-sm">Type a message below to start chatting with Gemini.</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="w-full bg-white border-t border-slate-200 py-4 px-6 shadow-lg flex justify-center">
        <form onSubmit={handleSendPrompt} className="flex items-center w-full max-w-3xl gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 transition-all shadow-sm"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </main>
  );
}