import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { Sparkles, Award, Send, X, RefreshCw, CheckCircle, HelpCircle, BookOpen, Compass } from 'lucide-react';

interface AiCulturalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'assistant' | 'quiz';
  initialQuery?: string;
}

export const AiCulturalGuideModal: React.FC<AiCulturalGuideModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'assistant',
  initialQuery = '',
}) => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'quiz'>(initialTab);

  // Assistant State
  const [question, setQuestion] = useState<string>(initialQuery);
  const [asking, setAsking] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Namaste! I am your AI Cultural Guide for Ek Bharat Shreshtha Bharat at IIT Indore. Ask me anything about Indian cultural traditions, state pairings (Madhya Pradesh, Manipur, Nagaland), folk dances, festivals, or regional cuisines!',
    },
  ]);

  // Quiz State
  const [quizTopic, setQuizTopic] = useState<string>('General Indian Culture & State Pairings');
  const [quizDifficulty, setQuizDifficulty] = useState<string>('Medium');
  const [generatingQuiz, setGeneratingQuiz] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<{ quizTitle?: string; questions?: QuizQuestion[] } | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Ask Assistant Handler
  const handleAskSubmit = async (e?: React.FormEvent, customQ?: string) => {
    if (e) e.preventDefault();
    const queryToUse = customQ || question;
    if (!queryToUse.trim()) return;

    setAsking(true);
    const newHistory = [...chatHistory, { role: 'user' as const, content: queryToUse }];
    setChatHistory(newHistory);
    setQuestion('');

    try {
      const res = await fetch('/api/ai/ask-cultural-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: queryToUse, stateContext: 'IIT Indore EBSB (MP, Manipur, Nagaland)' }),
      });
      const data = await res.json();
      setChatHistory([...newHistory, { role: 'assistant', content: data.answer || 'Sorry, I could not retrieve an answer.' }]);
    } catch (err) {
      console.error('AI Error:', err);
      setChatHistory([...newHistory, { role: 'assistant', content: 'Connection issue. Please verify process.env.GEMINI_API_KEY.' }]);
    } finally {
      setAsking(false);
    }
  };

  // Generate Quiz Handler
  const handleGenerateQuiz = async () => {
    setGeneratingQuiz(true);
    setQuizData(null);
    setUserAnswers({});
    setQuizSubmitted(false);

    try {
      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: quizTopic, difficulty: quizDifficulty }),
      });
      const data = await res.json();
      setQuizData(data);
    } catch (err) {
      console.error('Quiz Gen Error:', err);
    } finally {
      setGeneratingQuiz(false);
    }
  };

  // Score Calculation
  const calculateScore = () => {
    if (!quizData?.questions) return 0;
    let score = 0;
    quizData.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const samplePrompts = [
    'Tell me about Sanchi Stupa and Loktak Lake comparison',
    'How is Indori Bhutte Ka Kees prepared?',
    'What is Hornbill Festival in Nagaland?',
    'Greetings and basic etiquette in Manipuri (Meiteilon)',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] flex flex-col shadow-2xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">EBSB AI Cultural Guide & Quiz</h3>
              <p className="text-xs text-slate-400">Powered by Gemini AI • IIT Indore Portal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('assistant')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'assistant'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>AI Cultural Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Dynamic EBSB Quiz</span>
          </button>
        </div>

        {/* TAB 1: AI Assistant */}
        {activeTab === 'assistant' && (
          <div className="flex-1 flex flex-col min-h-0 space-y-4">
            
            {/* Chat History Box */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      AI
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none whitespace-pre-wrap'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {asking && (
                <div className="flex items-center gap-2 text-xs text-amber-400 animate-pulse pt-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>AI Cultural Guide is thinking...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Suggestions:</span>
              {samplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleAskSubmit(undefined, prompt)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] truncate max-w-[200px]"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleAskSubmit} className="flex gap-2 shrink-0">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about state pairings, food, folk dance, or dialects..."
                className="flex-1 bg-slate-950 text-white text-xs px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={asking || !question.trim()}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Ask</span>
              </button>
            </form>

          </div>
        )}

        {/* TAB 2: Dynamic Quiz */}
        {activeTab === 'quiz' && (
          <div className="flex-1 flex flex-col min-h-0 space-y-4 overflow-y-auto">
            
            {!quizData ? (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Generate National Integration Trivia Quiz</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Test your knowledge about state pairings, Indian monuments, food, and culture. Win a digital EBSB Badge!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-xs text-left pt-2">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Quiz Topic</label>
                    <select
                      value={quizTopic}
                      onChange={(e) => setQuizTopic(e.target.value)}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    >
                      <option value="General Indian Culture & State Pairings">General EBSB & State Pairings</option>
                      <option value="Madhya Pradesh vs Manipur Heritage">Madhya Pradesh ↔ Manipur</option>
                      <option value="Nagaland Hornbill & Tribal Traditions">Nagaland Tribal Heritage</option>
                      <option value="Indian Food & Gastronomy Quiz">Indian Regional Gastronomy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Difficulty</label>
                    <select
                      value={quizDifficulty}
                      onChange={(e) => setQuizDifficulty(e.target.value)}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-xl border border-slate-700"
                    >
                      <option value="Easy">Easy (Beginner)</option>
                      <option value="Medium">Medium (Student Level)</option>
                      <option value="Hard">Hard (Scholar Level)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerateQuiz}
                  disabled={generatingQuiz}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors"
                >
                  {generatingQuiz ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Generating AI Questions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Start Quiz Now</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Quiz Question List */
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-amber-300">{quizData.quizTitle || 'EBSB Integration Quiz'}</h4>
                    <p className="text-xs text-slate-400">Answer all 5 questions below:</p>
                  </div>

                  <button
                    onClick={handleGenerateQuiz}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>New Quiz</span>
                  </button>
                </div>

                {quizData.questions?.map((q, qIndex) => {
                  const selectedOpt = userAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                      <div className="font-bold text-white flex items-start gap-2">
                        <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px]">
                          Q{qIndex + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                          if (selectedOpt === optIdx) {
                            optStyle = 'bg-amber-500 text-slate-950 font-bold border-amber-400';
                          }

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optStyle = 'bg-emerald-950 text-emerald-200 border-emerald-500 font-bold';
                            } else if (selectedOpt === optIdx && selectedOpt !== q.correctIndex) {
                              optStyle = 'bg-rose-950 text-rose-200 border-rose-500 line-through';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => setUserAnswers({ ...userAnswers, [q.id]: optIdx })}
                              className={`p-3 rounded-xl border text-left transition-all ${optStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed space-y-1">
                          <div className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                            {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect (Correct: ${q.options[q.correctIndex]})`}
                          </div>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Submit / Score Summary */}
                {!quizSubmitted ? (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(userAnswers).length < (quizData.questions?.length || 0)}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
                  >
                    Submit Quiz & Get Badge
                  </button>
                ) : (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/40 text-center space-y-3">
                    <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
                    <h4 className="text-xl font-bold text-amber-200">
                      You Scored {calculateScore()} / {quizData.questions?.length}!
                    </h4>
                    <p className="text-xs text-slate-300">
                      {calculateScore() >= 4
                        ? '🌟 Outstanding! You are an EBSB National Integration Champion!'
                        : '👍 Great effort! Keep exploring Indian traditions with our AI Guide!'}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
