import React, { useState } from 'react';
import { ServerIcon } from './Icons';

type PartitionMode = 'none' | 'vertical' | 'horizontal';

export const Partitioning: React.FC = () => {
  const [mode, setMode] = useState<PartitionMode>('none');

  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blueprint-800 dark:text-blueprint-100">Partitioning: Inside the Box</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          Partitioning splits tables into smaller chunks to improve query performance and manageability. Crucially, this usually happens 
          <span className="font-bold text-blueprint-600 dark:text-blueprint-400"> within a single database instance</span>.
        </p>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => setMode('none')}
            className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all ${
              mode === 'none' 
                ? 'border-blueprint-500 bg-blueprint-50 text-blueprint-700 dark:bg-blueprint-900/30 dark:text-blueprint-300' 
                : 'border-slate-200 dark:border-slate-700 hover:border-blueprint-300 text-slate-600 dark:text-slate-400'
            }`}
          >
            No Partitioning
          </button>
          <button
            onClick={() => setMode('vertical')}
            className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all ${
              mode === 'vertical' 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' 
                : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 text-slate-600 dark:text-slate-400'
            }`}
          >
            Vertical Partitioning
          </button>
          <button
            onClick={() => setMode('horizontal')}
            className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all ${
              mode === 'horizontal' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 text-slate-600 dark:text-slate-400'
            }`}
          >
            Horizontal Partitioning
          </button>
        </div>

        {/* Visualization Area */}
        <div className="relative flex justify-center py-12 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden">
            
            {/* Server Frame */}
            <div className="relative w-full max-w-2xl border-4 border-slate-400 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 p-8 min-h-[300px] flex flex-col items-center shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 dark:bg-slate-700 px-4 py-1 rounded-full text-xs font-mono font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <ServerIcon className="w-4 h-4" /> Single Physical Server
                </div>

                <div className="w-full h-full flex items-center justify-center flex-1 mt-4 transition-all duration-700">
                    
                    {/* Mode: None */}
                    {mode === 'none' && (
                        <div className="w-full max-w-md bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-400 rounded-lg p-4 animate-in fade-in zoom-in duration-300">
                            <div className="text-center font-bold mb-2 text-blue-800 dark:text-blue-200">Users Table (Original)</div>
                            <div className="grid grid-cols-4 gap-2 text-xs font-mono border-b border-blue-300 pb-2 mb-2 font-bold opacity-70">
                                <div>ID</div><div>Name</div><div>Bio (Heavy)</div><div>LastLogin</div>
                            </div>
                            <div className="space-y-1 opacity-50">
                                <div className="h-2 bg-blue-300 rounded w-full"></div>
                                <div className="h-2 bg-blue-300 rounded w-full"></div>
                                <div className="h-2 bg-blue-300 rounded w-full"></div>
                                <div className="h-2 bg-blue-300 rounded w-full"></div>
                            </div>
                        </div>
                    )}

                    {/* Mode: Vertical */}
                    {mode === 'vertical' && (
                        <div className="flex gap-4 w-full animate-in slide-in-from-bottom-4 duration-500">
                            <div className="flex-1 bg-emerald-100 dark:bg-emerald-900/40 border-2 border-emerald-400 rounded-lg p-4">
                                <div className="text-center font-bold mb-2 text-emerald-800 dark:text-emerald-200 text-sm">Light Data</div>
                                <div className="grid grid-cols-3 gap-1 text-[10px] font-mono border-b border-emerald-300 pb-2 mb-2 font-bold opacity-70">
                                    <div>ID</div><div>Name</div><div>LastLogin</div>
                                </div>
                                <div className="space-y-1 opacity-50">
                                    <div className="h-2 bg-emerald-300 rounded w-full"></div>
                                    <div className="h-2 bg-emerald-300 rounded w-full"></div>
                                </div>
                                <div className="mt-4 text-[10px] text-center text-emerald-700 italic">Fast Access</div>
                            </div>
                            <div className="w-8 flex items-center justify-center text-slate-400 font-bold text-xl">
                                ✂️
                            </div>
                            <div className="flex-1 bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400 rounded-lg p-4">
                                <div className="text-center font-bold mb-2 text-amber-800 dark:text-amber-200 text-sm">Heavy Data</div>
                                <div className="grid grid-cols-2 gap-1 text-[10px] font-mono border-b border-amber-300 pb-2 mb-2 font-bold opacity-70">
                                    <div>ID</div><div>Bio (CLOB/Text)</div>
                                </div>
                                <div className="space-y-1 opacity-50">
                                    <div className="h-2 bg-amber-300 rounded w-full"></div>
                                    <div className="h-2 bg-amber-300 rounded w-full"></div>
                                </div>
                                <div className="mt-4 text-[10px] text-center text-amber-700 italic">Infrequent Access</div>
                            </div>
                        </div>
                    )}

                    {/* Mode: Horizontal */}
                    {mode === 'horizontal' && (
                        <div className="flex flex-col gap-4 w-full max-w-md animate-in slide-in-from-right-4 duration-500">
                             <div className="w-full bg-indigo-100 dark:bg-indigo-900/40 border-2 border-indigo-400 rounded-lg p-3">
                                <div className="text-center font-bold mb-1 text-indigo-800 dark:text-indigo-200 text-sm">Partition 1 (IDs 1-500)</div>
                                <div className="space-y-1 opacity-50">
                                    <div className="h-2 bg-indigo-300 rounded w-3/4"></div>
                                    <div className="h-2 bg-indigo-300 rounded w-full"></div>
                                </div>
                            </div>
                            <div className="h-2 flex items-center justify-center">
                                <div className="w-full border-t-2 border-dashed border-slate-400"></div>
                            </div>
                            <div className="w-full bg-indigo-100 dark:bg-indigo-900/40 border-2 border-indigo-400 rounded-lg p-3">
                                <div className="text-center font-bold mb-1 text-indigo-800 dark:text-indigo-200 text-sm">Partition 2 (IDs 501-1000)</div>
                                <div className="space-y-1 opacity-50">
                                    <div className="h-2 bg-indigo-300 rounded w-full"></div>
                                    <div className="h-2 bg-indigo-300 rounded w-2/3"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
      
      {/* Explanation Box */}
      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border-l-4 border-blueprint-500 text-sm md:text-base">
          {mode === 'none' && <p>Currently, the entire dataset resides in one large table. Queries scanning this table must search through everything, and fetching heavy columns (like Bio) slows down simple lookups.</p>}
          {mode === 'vertical' && <p><span className="font-bold">Vertical Partitioning (Normalization):</span> We split columns. Frequent, lightweight queries hit the left table fast. Heavy, rare queries hit the right table. CPU usage is optimized, but we are still on one machine.</p>}
          {mode === 'horizontal' && <p><span className="font-bold">Horizontal Partitioning:</span> We split rows by range (or hash). Queries for User ID 100 only check the top table. This makes indexes smaller and maintenance easier, but we are still limited by the hardware of this one server.</p>}
      </div>
    </div>
  );
};
