import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { Sparkles, Award, Send, X, RefreshCw, CheckCircle, Compass, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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
  const { user, signingIn, quizAttempts, signInWithGoogle, recordQuizAttempt } = useAuth();

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
  const [quizTopic, setQuizTopic] = useState<string>('Bhasha Sangam: Hindi, Manipuri & Sanskrit');
  const [quizDifficulty, setQuizDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [generatingQuiz, setGeneratingQuiz] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<{ quizTitle?: string; questions?: QuizQuestion[] } | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [savingQuiz, setSavingQuiz] = useState<boolean>(false);
  const [quizSaved, setQuizSaved] = useState<boolean>(false);
  const [quizSaveError, setQuizSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      if (initialQuery) {
        setQuestion(initialQuery);
      }
    }
  }, [isOpen, initialTab, initialQuery]);

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
    setQuizSaved(false);
    setQuizSaveError(null);

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

  const persistCurrentQuizScore = async () => {
    const totalQuestions = quizData?.questions?.length || 0;
    if (totalQuestions < 1) return;
    setSavingQuiz(true);
    setQuizSaveError(null);
    try {
      await recordQuizAttempt({
        topic: quizTopic,
        difficulty: quizDifficulty,
        score: calculateScore(),
        totalQuestions,
      });
      setQuizSaved(true);
    } catch (err) {
      console.error('Failed to save quiz score:', err);
      setQuizSaveError('Could not save your quiz attempt right now. Please try again.');
    } finally {
      setSavingQuiz(false);
    }
  };

  const handleSubmitQuiz = async () => {
    setQuizSubmitted(true);
    if (user) {
      await persistCurrentQuizScore();
    }
  };

  const handleSignInAndSaveQuiz = async () => {
    const signedInUser = await signInWithGoogle();
    if (signedInUser) {
      await persistCurrentQuizScore();
    }
  };

  const samplePrompts = [
    'Tell me about Sanchi Stupa and Loktak Lake comparison',
    'How is Indori Bhutte Ka Kees prepared?',
    'What is Hornbill Festival in Nagaland?',
    'Greetings and basic etiquette in Manipuri (Meiteilon)',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0c1f38]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#163c6b] border border-white/20 rounded-2xl max-w-3xl w-full overflow-hidden relative max-h-[90vh] flex flex-col shadow-2xl">
        <div className="h-1.5 w-full ebsb-tricolor-bar shrink-0" />
        <div className="p-6 sm:p-8 space-y-6 flex flex-col flex-1 min-h-0">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#f26522] to-[#dc4f12] text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">EBSB AI Cultural Guide & Quiz</h3>
              <p className="text-xs text-slate-200">Powered by Gemini AI • IIT Indore Portal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#102847] text-slate-200 hover:text-white hover:bg-[#0c1f38] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-[#102847] p-1.5 rounded-2xl border border-white/15 shrink-0">
          <button
            onClick={() => setActiveTab('assistant')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'assistant'
                ? 'bg-[#f26522] text-white shadow-md'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>AI Cultural Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'quiz'
                ? 'bg-[#138808] text-white shadow-md'
                : 'text-slate-200 hover:text-white'
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
            <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-[#102847] border border-white/15 text-xs">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-[#f26522] text-white font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      AI
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#f26522] text-white font-medium rounded-tr-none'
                        : 'bg-[#163c6b] text-slate-100 border border-white/15 rounded-tl-none whitespace-pre-wrap'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {asking && (
                <div className="flex items-center gap-2 text-xs text-orange-300 animate-pulse pt-2">
                  <div className="w-2 h-2 rounded-full bg-[#ff9933] animate-ping" />
                  <span>AI Cultural Guide is thinking...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-slate-200 font-bold uppercase mr-1">Suggestions:</span>
              {samplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleAskSubmit(undefined, prompt)}
                  className="px-2.5 py-1 rounded-lg bg-[#102847] hover:bg-[#f26522] text-orange-200 hover:text-white border border-white/15 text-[11px] truncate max-w-[200px] transition-colors"
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
                className="flex-1 bg-[#102847] text-white placeholder:text-slate-300/70 text-xs px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#f26522]"
              />
              <button
                type="submit"
                disabled={asking || !question.trim()}
                className="px-5 py-3 rounded-xl bg-[#f26522] hover:bg-[#dc4f12] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
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
              <div className="p-6 rounded-2xl bg-[#102847] border border-white/15 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#f26522]/20 text-[#ff9933] flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Generate National Integration Trivia Quiz</h4>
                  <p className="text-xs text-slate-200 mt-1 max-w-md mx-auto">
                    Test your knowledge about state pairings, Indian monuments, food, and culture. Win a digital EBSB Badge!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-xs text-left pt-2">
                  <div>
                    <label className="block text-slate-100 font-medium mb-1">Quiz Topic</label>
                    <select
                      value={quizTopic}
                      onChange={(e) => setQuizTopic(e.target.value)}
                      className="w-full bg-[#163c6b] text-white p-2.5 rounded-xl border border-white/20"
                    >
                      <option value="Bhasha Sangam: Hindi, Manipuri & Sanskrit">Bhasha Sangam (Hindi, Manipuri & Sanskrit)</option>
                      <option value="General Indian Culture & State Pairings">General EBSB & State Pairings</option>
                      <option value="Madhya Pradesh vs Manipur Heritage">Madhya Pradesh ↔ Manipur</option>
                      <option value="Nagaland Hornbill & Tribal Traditions">Nagaland Tribal Heritage</option>
                      <option value="Indian Food & Gastronomy Quiz">Indian Regional Gastronomy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-100 font-medium mb-1">Difficulty</label>
                    <select
                      value={quizDifficulty}
                      onChange={(e) => setQuizDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
                      className="w-full bg-[#163c6b] text-white p-2.5 rounded-xl border border-white/20"
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
                  className="px-6 py-3 rounded-xl bg-[#f26522] hover:bg-[#dc4f12] text-white font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-lg"
                >
                  {generatingQuiz ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating AI Questions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Start Quiz Now</span>
                    </>
                  )}
                </button>

                {/* Recent Saved Attempts (when signed in) */}
                {user && quizAttempts.length > 0 && (
                  <div className="pt-4 mt-2 border-t border-white/15 text-left space-y-2 max-w-md mx-auto">
                    <div className="flex items-center justify-between text-[11px] font-bold text-orange-200 uppercase tracking-wider">
                      <span>Your Saved Attempts</span>
                      <span>{quizAttempts.length} total</span>
                    </div>
                    <div className="space-y-1.5">
                      {quizAttempts.slice(0, 3).map((attempt) => (
                        <div
                          key={attempt.id}
                          className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#163c6b] border border-white/10 text-[11px]"
                        >
                          <div className="min-w-0">
                            <div className="font-semibold text-white truncate">{attempt.topic}</div>
                            <div className="text-[10px] text-slate-300">{attempt.difficulty}</div>
                          </div>
                          <span className="shrink-0 font-extrabold text-[#4ad178] bg-[#138808]/30 px-2 py-0.5 rounded">
                            {attempt.score}/{attempt.totalQuestions}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Question List */
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-[#ff9933]">{quizData.quizTitle || 'EBSB Integration Quiz'}</h4>
                    <p className="text-xs text-slate-200">Answer all 5 questions below:</p>
                  </div>

                  <button
                    onClick={handleGenerateQuiz}
                    className="p-2 rounded-lg bg-[#102847] text-slate-100 hover:text-white text-xs flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>New Quiz</span>
                  </button>
                </div>

                {quizData.questions?.map((q, qIndex) => {
                  const selectedOpt = userAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div key={q.id} className="p-4 rounded-2xl bg-[#102847] border border-white/15 space-y-3 text-xs">
                      <div className="font-bold text-white flex items-start gap-2">
                        <span className="bg-[#f26522]/25 text-orange-200 px-2 py-0.5 rounded text-[10px]">
                          Q{qIndex + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = 'bg-[#163c6b] border-white/15 text-slate-100 hover:bg-[#1e4d87]';
                          if (selectedOpt === optIdx) {
                            optStyle = 'bg-[#f26522] text-white font-bold border-orange-300';
                          }

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optStyle = 'bg-[#138808] text-white border-emerald-400 font-bold';
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
                        <div className="p-3 rounded-xl bg-[#163c6b] border border-white/15 text-[11px] text-slate-100 leading-relaxed space-y-1">
                          <div className={isCorrect ? 'text-[#4ad178] font-bold' : 'text-[#ff9933] font-bold'}>
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
                    onClick={() => void handleSubmitQuiz()}
                    disabled={Object.keys(userAnswers).length < (quizData.questions?.length || 0)}
                    className="w-full py-3 rounded-xl bg-[#138808] hover:bg-[#0f7506] disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-lg"
                  >
                    Submit Quiz & Get Badge
                  </button>
                ) : (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#102847] via-[#163c6b] to-[#138808] border border-[#ff9933]/40 text-center space-y-3">
                    <Award className="w-12 h-12 text-[#ff9933] mx-auto" />
                    <h4 className="text-xl font-bold text-white">
                      You Scored {calculateScore()} / {quizData.questions?.length}!
                    </h4>
                    <p className="text-xs text-slate-100">
                      {calculateScore() >= 4
                        ? 'Outstanding! You are an EBSB National Integration Champion!'
                        : 'Great effort! Keep exploring Indian traditions with our AI Guide!'}
                    </p>

                    {/* Firestore Persistence Status */}
                    <div className="pt-2">
                      {savingQuiz ? (
                        <div className="inline-flex items-center gap-1.5 text-xs text-orange-200 font-semibold">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving score to your EBSB profile...</span>
                        </div>
                      ) : quizSaved ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-emerald-200 text-xs font-bold border border-emerald-300/30">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Score saved to your account</span>
                        </div>
                      ) : !user ? (
                        <button
                          type="button"
                          disabled={signingIn}
                          onClick={() => void handleSignInAndSaveQuiz()}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f26522] hover:bg-[#dc4f12] disabled:opacity-60 text-white text-xs font-bold shadow-md transition-colors"
                        >
                          {signingIn ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <LogIn className="w-3.5 h-3.5" />
                          )}
                          <span>{signingIn ? 'Signing in...' : 'Sign in with Google to Save Score'}</span>
                        </button>
                      ) : null}

                      {quizSaveError && (
                        <p className="text-[11px] text-rose-200 mt-2">{quizSaveError}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        </div>
      </div>
    </div>
  );
};
