import React, { useState } from 'react';
import { DatabaseIcon } from './Icons';

export const CoreConcept: React.FC = () => {
  const [dataLevel, setDataLevel] = useState(1);

  const addData = () => {
    setDataLevel(prev => Math.min(prev + 1, 5));
  };

  const resetData = () => {
    setDataLevel(1);
  };

  const getColor = (level: number) => {
    if (level < 3) return 'text-emerald-500';
    if (level < 5) return 'text-yellow-500';
    return 'text-red-600';
  };

  const getStatusText = (level: number) => {
      if (level < 3) return "Optimal Performance";
      if (level < 5) return "Warning: Query Latency Increasing";
      return "Critical: Monolith Bloat Detected!";
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blueprint-800 dark:text-blueprint-100">The Problem: Monolith Bloat</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          Imagine a single textbook with 5,000 pages. It's too heavy to carry, hard to search through, and if you lose it, you lose everything. 
          Databases face the same issue. As data grows, a single instance struggles to handle storage, read/write throughput, and maintain performance.
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
          
          <div className="flex flex-col items-center w-full md:w-1/2">
             <div className="relative flex items-center justify-center h-64 w-full">
                <div 
                    className={`transition-all duration-700 ease-in-out flex flex-col items-center justify-center ${getColor(dataLevel)}`}
                    style={{ 
                        transform: `scale(${1 + (dataLevel - 1) * 0.2})`,
                    }}
                >
                    <DatabaseIcon className="w-24 h-24 md:w-32 md:h-32" />
                    <span className="mt-2 font-mono font-bold">DB Instance</span>
                </div>
             </div>
             <p className={`mt-4 font-bold transition-colors duration-500 ${getColor(dataLevel)}`}>
                 {getStatusText(dataLevel)}
             </p>
          </div>

          <div className="flex flex-col items-start space-y-4 w-full md:w-1/2">
             <h3 className="text-xl font-semibold">Simulation</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400">
                 Click "Add Data" to simulate growth. Watch the database struggle as it scales vertically.
             </p>
             <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-4 overflow-hidden">
                <div 
                    className={`h-4 rounded-full transition-all duration-500 ${dataLevel >= 5 ? 'bg-red-500' : dataLevel >= 3 ? 'bg-yellow-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${dataLevel * 20}%` }}
                ></div>
             </div>
             
             <div className="flex gap-4">
                 <button 
                    onClick={addData} 
                    disabled={dataLevel >= 5}
                    className="px-6 py-2 bg-blueprint-600 hover:bg-blueprint-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors shadow-lg shadow-blueprint-500/20"
                 >
                    Add Data (+1GB)
                 </button>
                 <button 
                    onClick={resetData} 
                    className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg font-semibold transition-colors"
                 >
                    Reset
                 </button>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center">
                  <span className="mr-2 text-xl">📚</span> The Partitioning Approach
              </h3>
              <p className="text-sm text-amber-900 dark:text-amber-100">
                  Like binding the book into "Part 1" and "Part 2" but keeping them in the same physical cover. Logical separation for better organization.
              </p>
          </div>
          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
              <h3 className="font-bold text-indigo-800 dark:text-indigo-200 mb-2 flex items-center">
                  <span className="mr-2 text-xl">📦</span> The Sharding Approach
              </h3>
              <p className="text-sm text-indigo-900 dark:text-indigo-100">
                  Like splitting the book into "Volume I" and "Volume II" and putting them on different shelves. Physical separation for infinite scaling.
              </p>
          </div>
      </div>
    </div>
  );
};
