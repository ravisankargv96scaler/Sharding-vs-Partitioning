import React, { useState } from 'react';
import { DatabaseIcon, ServerIcon, AlertTriangleIcon } from './Icons';

export const Comparison: React.FC = () => {
  const [cpuOverload, setCpuOverload] = useState(false);

  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blueprint-800 dark:text-blueprint-100">The Crucial Difference: Isolation</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          Partitioning is a <span className="italic">logical</span> split. Sharding is a <span className="italic">physical</span> split. 
          See what happens when one partition/shard hogs all the CPU.
        </p>

        <div className="flex justify-center mb-8">
            <button
                onMouseDown={() => setCpuOverload(true)}
                onMouseUp={() => setCpuOverload(false)}
                onTouchStart={() => setCpuOverload(true)}
                onTouchEnd={() => setCpuOverload(false)}
                className={`
                    px-8 py-3 rounded-lg font-bold text-white shadow-xl transition-all transform
                    ${cpuOverload ? 'bg-red-600 scale-95 ring-4 ring-red-300' : 'bg-red-500 hover:bg-red-600'}
                `}
            >
               {cpuOverload ? 'RELEASE TO COOL DOWN' : 'HOLD TO MAX OUT CPU (Part A)'}
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Panel: Partitioning */}
            <div className="relative border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-900">
                <div className="absolute top-0 left-0 bg-blue-100 text-blue-800 px-3 py-1 rounded-br-lg text-xs font-bold border-b border-r border-blue-200">
                    Partitioning
                </div>
                <p className="mt-6 mb-4 text-sm text-center text-slate-500">
                    Two logical partitions share <span className="font-bold text-slate-800 dark:text-slate-200">Shared Resources</span>.
                </p>

                {/* Single Server Container */}
                <div className={`
                    border-4 rounded-xl p-6 flex flex-col items-center transition-colors duration-300
                    ${cpuOverload ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800'}
                `}>
                    <div className="flex items-center gap-2 mb-4 text-slate-600 dark:text-slate-300 font-bold">
                        <ServerIcon className="w-6 h-6" /> Physical Server
                    </div>
                    
                    {/* Resource Meter */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
                        <div className={`h-full transition-all duration-300 ${cpuOverload ? 'w-full bg-red-500' : 'w-1/4 bg-blue-500'}`}></div>
                    </div>

                    <div className="flex justify-around w-full gap-4">
                         {/* Partition A */}
                         <div className={`p-4 border-2 rounded-lg flex flex-col items-center w-1/2 transition-all ${cpuOverload ? 'border-red-500 bg-red-100 dark:bg-red-900/50' : 'border-blue-200 bg-blue-50 dark:bg-blue-900/20'}`}>
                            <DatabaseIcon className={`w-8 h-8 ${cpuOverload ? 'text-red-600 animate-pulse' : 'text-blue-600'}`} />
                            <span className="text-xs font-bold mt-2">Part A</span>
                            {cpuOverload && <span className="text-[10px] text-red-600 font-bold mt-1">CPU HOG!</span>}
                         </div>

                         {/* Partition B */}
                         <div className={`p-4 border-2 rounded-lg flex flex-col items-center w-1/2 transition-all ${cpuOverload ? 'border-red-400 opacity-50' : 'border-blue-200 bg-blue-50 dark:bg-blue-900/20'}`}>
                            <DatabaseIcon className={`w-8 h-8 ${cpuOverload ? 'text-red-400' : 'text-blue-600'}`} />
                            <span className="text-xs font-bold mt-2">Part B</span>
                            {cpuOverload && <span className="text-[10px] text-red-600 font-bold mt-1">STARVED!</span>}
                         </div>
                    </div>
                </div>
                <div className="mt-4 text-center text-xs text-red-500 font-semibold h-4">
                    {cpuOverload ? '⚠ Failure in Part A affects Part B (Noisy Neighbor)' : ''}
                </div>
            </div>


            {/* Right Panel: Sharding */}
            <div className="relative border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-900">
                <div className="absolute top-0 left-0 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-br-lg text-xs font-bold border-b border-r border-indigo-200">
                    Sharding
                </div>
                <p className="mt-6 mb-4 text-sm text-center text-slate-500">
                    Two shards have <span className="font-bold text-slate-800 dark:text-slate-200">Independent Resources</span>.
                </p>

                <div className="flex gap-4">
                     {/* Server 1 */}
                    <div className={`
                        flex-1 border-4 rounded-xl p-4 flex flex-col items-center transition-colors duration-300
                        ${cpuOverload ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800'}
                    `}>
                        <div className="flex items-center gap-1 mb-2 text-slate-600 dark:text-slate-300 text-xs font-bold">
                            <ServerIcon className="w-4 h-4" /> Server 1
                        </div>
                         {/* Resource Meter 1 */}
                         <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
                            <div className={`h-full transition-all duration-300 ${cpuOverload ? 'w-full bg-red-500' : 'w-1/4 bg-indigo-500'}`}></div>
                        </div>

                        <div className="p-2 w-full border border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 rounded flex flex-col items-center">
                            <DatabaseIcon className={`w-6 h-6 ${cpuOverload ? 'text-red-600 animate-pulse' : 'text-indigo-600'}`} />
                            <span className="text-xs font-bold mt-1">Shard 1</span>
                        </div>
                    </div>

                     {/* Server 2 */}
                     <div className="flex-1 border-4 border-slate-400 dark:border-slate-600 rounded-xl p-4 flex flex-col items-center bg-white dark:bg-slate-800">
                        <div className="flex items-center gap-1 mb-2 text-slate-600 dark:text-slate-300 text-xs font-bold">
                            <ServerIcon className="w-4 h-4" /> Server 2
                        </div>
                         {/* Resource Meter 2 - UNAFFECTED */}
                         <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
                            <div className="h-full w-1/4 bg-indigo-500 transition-all duration-300"></div>
                        </div>

                        <div className="p-2 w-full border border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 rounded flex flex-col items-center">
                            <DatabaseIcon className="w-6 h-6 text-indigo-600" />
                            <span className="text-xs font-bold mt-1">Shard 2</span>
                        </div>
                    </div>
                </div>
                 <div className="mt-4 text-center text-xs text-emerald-600 font-semibold h-4">
                    {cpuOverload ? '✔ Shard 2 is completely unaffected (Fault Isolation)' : ''}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
