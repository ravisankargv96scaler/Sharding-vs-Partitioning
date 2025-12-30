import React, { useState, useEffect } from 'react';
import { CoreConcept } from './components/Tab1_CoreConcept';
import { Partitioning } from './components/Tab2_Partitioning';
import { Sharding } from './components/Tab3_Sharding';
import { Comparison } from './components/Tab4_Comparison';
import { TradeOffs } from './components/Tab5_TradeOffs';
import { SummaryQuiz } from './components/Tab6_Quiz';
import { Tab } from './types';

const tabs: Tab[] = [
  { id: 'core', label: 'Core Concept', shortLabel: 'Concept' },
  { id: 'partitioning', label: 'Partitioning', shortLabel: 'Partitioning' },
  { id: 'sharding', label: 'Sharding', shortLabel: 'Sharding' },
  { id: 'compare', label: 'Comparison', shortLabel: 'Compare' },
  { id: 'tradeoffs', label: 'Trade-offs', shortLabel: 'Trade-offs' },
  { id: 'quiz', label: 'Summary & Quiz', shortLabel: 'Quiz' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'core': return <CoreConcept />;
      case 'partitioning': return <Partitioning />;
      case 'sharding': return <Sharding />;
      case 'compare': return <Comparison />;
      case 'tradeoffs': return <TradeOffs />;
      case 'quiz': return <SummaryQuiz />;
      default: return <CoreConcept />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blueprint-600 text-white p-2 rounded-lg font-bold text-xl hidden sm:block">SD</div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                System Design: <span className="text-blueprint-600 dark:text-blueprint-400">Partitioning vs Sharding</span>
              </h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-4 md:space-x-8 overflow-x-auto scrollbar-hide" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
                    ${activeTab === tab.id
                      ? 'border-blueprint-500 text-blueprint-600 dark:text-blueprint-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:border-slate-300'}
                  `}
                >
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              ))}
            </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>Interactive Educational Tool • Based on System Design Concepts</p>
        </div>
      </footer>
    </div>
  );
}
