import React, { useState, useEffect } from 'react';
import { DatabaseIcon, RouterIcon, ServerIcon, UserIcon, ArrowRightIcon } from './Icons';

export const TradeOffs: React.FC = () => {
  const [mode, setMode] = useState<'partitioned' | 'sharded'>('partitioned');
  const [queryState, setQueryState] = useState<'idle' | 'sending' | 'processing' | 'returning' | 'done'>('idle');

  const runQuery = () => {
    if (queryState !== 'idle' && queryState !== 'done') return;
    setQueryState('sending');
    
    // Simulate query timeline
    setTimeout(() => setQueryState('processing'), 800);
    setTimeout(() => setQueryState('returning'), 2000);
    setTimeout(() => setQueryState('done'), 3000);
    setTimeout(() => setQueryState('idle'), 4500);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blueprint-800 dark:text-blueprint-100">Trade-offs: The Complexity Cost</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          Sharding enables massive scale but adds <span className="font-bold text-red-500">Distributed System Complexity</span>. 
          A simple query like "Find all users active yesterday" becomes a scatter-gather nightmare.
        </p>

        {/* Controls */}
        <div className="flex gap-4 mb-8 justify-center bg-slate-50 dark:bg-slate-900 p-2 rounded-lg inline-flex mx-auto">
             <button
                onClick={() => { setMode('partitioned'); setQueryState('idle'); }}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${mode === 'partitioned' ? 'bg-white dark:bg-slate-700 shadow text-blueprint-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
                Partitioned (Single Node)
             </button>
             <button
                onClick={() => { setMode('sharded'); setQueryState('idle'); }}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${mode === 'sharded' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
                Sharded (Distributed)
             </button>
        </div>

        {/* Interactive Diagram */}
        <div className="relative h-[400px] border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 overflow-hidden flex flex-col items-center justify-between p-8">
            
            {/* Client Layer */}
            <div className="z-10 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 flex flex-col items-center">
                <UserIcon className="w-8 h-8 text-slate-700 dark:text-slate-200" />
                <span className="text-[10px] font-bold mt-1">App Server</span>
            </div>

            {/* Middle Logic */}
            <div className="flex-1 w-full relative flex justify-center">
                
                {/* PARTITIONED LOGIC */}
                {mode === 'partitioned' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {/* Connecting Line */}
                        <div className="h-full w-0.5 bg-slate-300 dark:bg-slate-600 absolute top-0"></div>
                        
                        {/* Animated Packet */}
                        {(queryState === 'sending' || queryState === 'returning') && (
                            <div className={`absolute w-3 h-3 bg-blue-500 rounded-full shadow-md z-20 transition-all duration-[1200ms] ease-linear`}
                                style={{ top: queryState === 'sending' ? '80%' : '10%' }}
                            ></div>
                        )}

                        <div className="bg-white dark:bg-slate-800 z-10 p-4 border-2 border-slate-400 rounded-lg flex flex-col items-center mt-auto mb-8 shadow-xl">
                            <ServerIcon className="w-12 h-12 text-slate-700 dark:text-slate-300" />
                            <div className="flex mt-2 gap-1">
                                <div className="w-4 h-6 border border-blue-400 bg-blue-100 dark:bg-blue-900/50 rounded-sm"></div>
                                <div className="w-4 h-6 border border-blue-400 bg-blue-100 dark:bg-blue-900/50 rounded-sm"></div>
                            </div>
                            <span className="text-xs font-bold mt-1">Single DB</span>
                        </div>
                    </div>
                )}

                {/* SHARDED LOGIC */}
                {mode === 'sharded' && (
                    <div className="absolute inset-0 flex flex-col items-center">
                        
                        {/* Router */}
                        <div className="mt-8 z-20 bg-purple-100 dark:bg-purple-900 p-2 rounded-lg border border-purple-400 shadow-lg flex flex-col items-center">
                            <RouterIcon className="w-8 h-8 text-purple-700 dark:text-purple-300" />
                            <span className="text-[10px] font-bold">Query Router</span>
                        </div>

                        {/* Lines to Shards */}
                        <div className="relative w-full max-w-lg h-full flex justify-between px-8 pt-4">
                            {/* Line Left */}
                            <div className="absolute top-4 left-[20%] right-[50%] h-[120px] border-l-2 border-t-2 border-slate-300 rounded-tl-xl"></div>
                            {/* Line Right */}
                            <div className="absolute top-4 left-[50%] right-[20%] h-[120px] border-r-2 border-t-2 border-slate-300 rounded-tr-xl"></div>
                            {/* Line Middle */}
                            <div className="absolute top-4 left-[50%] h-[120px] border-l-2 border-slate-300"></div>

                            {/* Animated Packets Out (Scatter) */}
                            {queryState === 'processing' && (
                                <>
                                    <div className="absolute top-4 left-[50%] w-2 h-2 bg-indigo-500 rounded-full animate-[ping_1s_infinite]"></div>
                                    <div className="absolute top-[80px] left-[20%] w-2 h-2 bg-indigo-500 rounded-full transition-all duration-500"></div>
                                    <div className="absolute top-[80px] right-[20%] w-2 h-2 bg-indigo-500 rounded-full transition-all duration-500"></div>
                                    <div className="absolute top-[80px] left-[50%] w-2 h-2 bg-indigo-500 rounded-full transition-all duration-500"></div>
                                </>
                            )}
                             {/* Animated Packets In (Gather) */}
                            {queryState === 'returning' && (
                                <div className="absolute top-4 left-[50%] w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                            )}

                            {/* Shards */}
                            <div className="mt-auto mb-4 flex flex-col items-center z-10">
                                <div className="bg-white dark:bg-slate-800 p-2 border border-slate-300 rounded shadow">
                                    <DatabaseIcon className="w-6 h-6 text-indigo-500" />
                                </div>
                                <span className="text-[9px] mt-1 font-mono">Shard 1</span>
                            </div>
                            <div className="mt-auto mb-4 flex flex-col items-center z-10">
                                <div className="bg-white dark:bg-slate-800 p-2 border border-slate-300 rounded shadow">
                                    <DatabaseIcon className="w-6 h-6 text-indigo-500" />
                                </div>
                                <span className="text-[9px] mt-1 font-mono">Shard 2</span>
                            </div>
                            <div className="mt-auto mb-4 flex flex-col items-center z-10">
                                <div className="bg-white dark:bg-slate-800 p-2 border border-slate-300 rounded shadow">
                                    <DatabaseIcon className="w-6 h-6 text-indigo-500" />
                                </div>
                                <span className="text-[9px] mt-1 font-mono">Shard 3</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Run Button */}
            <div className="absolute bottom-4 right-4 z-30">
                <button 
                    onClick={runQuery}
                    disabled={queryState !== 'idle' && queryState !== 'done'}
                    className="flex items-center gap-2 bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                >
                    {queryState === 'idle' || queryState === 'done' ? 'Run Query' : 'Executing...'}
                    <ArrowRightIcon className="w-4 h-4" />
                </button>
            </div>

             {/* Status Badge */}
            <div className="absolute top-4 right-4 z-30">
                {queryState === 'done' && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                        Result Received {mode === 'sharded' ? '(Slow due to merge)' : '(Fast)'}
                    </span>
                )}
                 {queryState === 'processing' && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200 animate-pulse">
                        {mode === 'sharded' ? 'Scatter-Gather Waiting...' : 'Reading Index...'}
                    </span>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
