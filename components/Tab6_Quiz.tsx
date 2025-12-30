import React, { useState } from 'react';
import { CheckCircleIcon, AlertTriangleIcon } from './Icons';
import { QuizQuestion } from '../types';

const questions: QuizQuestion[] = [
    {
        id: 1,
        question: "Is Sharding a specific type of Partitioning?",
        options: ["No, they are completely different.", "Yes, Sharding is Horizontal Partitioning across multiple nodes.", "Yes, Sharding is Vertical Partitioning on one node.", "No, Partitioning is for NoSQL only."],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "Which technique is primarily used for massive horizontal scaling?",
        options: ["Vertical Partitioning", "Normalization", "Sharding", "Indexing"],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "If you split a table into two smaller tables on the same hard drive, is that sharding?",
        options: ["Yes, absolutely.", "Only if you use a router.", "No, that is just Partitioning.", "Yes, because it improves speed."],
        correctAnswer: 2
    }
];

export const SummaryQuiz: React.FC = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (qId: number, optionIdx: number) => {
        if (submitted) return;
        setSelectedAnswers(prev => ({...prev, [qId]: optionIdx}));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const getScore = () => {
        let score = 0;
        questions.forEach(q => {
            if (selectedAnswers[q.id] === q.correctAnswer) score++;
        });
        return score;
    };

    return (
        <div className="flex flex-col space-y-8">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blueprint-600 to-blueprint-800 dark:from-slate-800 dark:to-slate-900 text-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-6 h-6 text-blueprint-200 mt-1 flex-shrink-0" />
                        <span><strong>Partitioning</strong> usually happens on one server to organize data and optimize local queries.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-6 h-6 text-blueprint-200 mt-1 flex-shrink-0" />
                        <span><strong>Sharding</strong> distributes data across multiple servers (nodes) to scale beyond the limits of a single machine.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <AlertTriangleIcon className="w-6 h-6 text-yellow-300 mt-1 flex-shrink-0" />
                        <span>Sharding introduces <strong>significant complexity</strong> (routing, latency, consistency) and should only be used when necessary.</span>
                    </li>
                </ul>
            </div>

            {/* Quiz Section */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">Knowledge Check</h2>
                
                <div className="space-y-8">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="pb-6 border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <p className="font-semibold text-lg mb-4 text-slate-700 dark:text-slate-200">{idx + 1}. {q.question}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {q.options.map((opt, optIdx) => {
                                    const isSelected = selectedAnswers[q.id] === optIdx;
                                    const isCorrect = q.correctAnswer === optIdx;
                                    let btnClass = "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400";
                                    
                                    if (submitted) {
                                        if (isCorrect) btnClass = "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300 font-bold";
                                        else if (isSelected) btnClass = "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300";
                                    } else {
                                        if (isSelected) btnClass = "bg-blueprint-50 dark:bg-blueprint-900/30 border-blueprint-500 text-blueprint-700 dark:text-blueprint-300 font-semibold ring-1 ring-blueprint-500";
                                    }

                                    return (
                                        <button
                                            key={optIdx}
                                            onClick={() => handleSelect(q.id, optIdx)}
                                            disabled={submitted}
                                            className={`p-3 text-left rounded-lg border-2 transition-all ${btnClass}`}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {!submitted ? (
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={Object.keys(selectedAnswers).length < questions.length}
                            className="bg-blueprint-600 hover:bg-blueprint-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold shadow transition-transform active:scale-95"
                        >
                            Submit Answers
                        </button>
                    </div>
                ) : (
                    <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl text-center animate-in zoom-in duration-300">
                        <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                            You scored {getScore()} / {questions.length}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            {getScore() === 3 ? "Perfect! You're a System Design Pro." : "Good effort! Review the sections to master the concepts."}
                        </p>
                        <button 
                            onClick={() => { setSubmitted(false); setSelectedAnswers({}); }}
                            className="mt-4 text-blueprint-600 hover:underline"
                        >
                            Retake Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
