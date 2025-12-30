import React, { useState } from 'react';
import { DatabaseIcon, RouterIcon, ServerIcon } from './Icons';

export const Sharding: React.FC = () => {
  const [sharded, setSharded] = useState(false);

  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blueprint-800 dark:text-blueprint-100">Sharding: Outside the Box</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
          Sharding is simply horizontal partitioning applied across <span className="font-bold text-red-500">distinct physical servers</span>.
          This introduces the network into the equation.
        </p>

        <div className="flex justify-center mb-8">
            <button
                onClick={() => setSharded(!sharded)}
                className="bg-blueprint-600 hover:bg-blueprint-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blueprint-500/30 transition-all active:scale-95"
            >
                {sharded ? 'Reset to Single Node' : 'Apply Sharding'}
            </button>
        </div>

        <div className="relative min-h-[400px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 flex items-center justify-center overflow-hidden">
            
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative w-full max-w-4xl flex justify-center items-center transition-all duration-1000">
                
                {/* Router (Only visible when sharded) */}
                <div className={`absolute top-0 transition-all duration-700 z-10 ${sharded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-col items-center">
                        <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full border-2 border-purple-500 shadow-xl">
                            <RouterIcon className="w-10 h-10 text-purple-600 dark:text-purple-300" />
                        </div>
                        <span className="bg-white dark:bg-slate-800 px-2 py-1 text-xs font-mono font-bold mt-2 rounded shadow border border-slate-200 dark:border-slate-700">Routing Layer</span>
                    </div>
                </div>

                {/* Connection Lines (SVG) */}
                <svg className={`absolute top-12 w-full h-32 pointer-events-none transition-opacity duration-700 ${sharded ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Left Line */}
                    <path 
                        d="M50% 20 C 50% 50, 30% 50, 30% 80" 
                        fill="none" 
                        stroke="#94a3b8" 
                        strokeWidth="2" 
                        strokeDasharray="5,5"
                        className="animate-pulse"
                    />
                    {/* Right Line */}
                    <path 
                        d="M50% 20 C 50% 50, 70% 50, 70% 80" 
                        fill="none" 
                        stroke="#94a3b8" 
                        strokeWidth="2" 
                        strokeDasharray="5,5"
                        className="animate-pulse"
                    />
                </svg>

                {/* Servers Container */}
                <div className="flex items-center justify-center w-full pt-20 gap-4 md:gap-20 transition-all duration-1000">
                    
                    {/* Server 1 */}
                    <div className={`flex flex-col items-center transition-all duration-1000 ${sharded ? '-translate-x-0' : 'translate-x-[50%] md:translate-x-[60%]'}`}>
                         <div className={`transition-all duration-1000 border-4 border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg p-6 flex flex-col items-center shadow-xl ${sharded ? 'w-48 h-48' : 'w-64 h-64'}`}>
                            <div className="text-xs font-bold text-slate-500 mb-2 whitespace-nowrap">
                                {sharded ? 'Node 1 (US-East)' : 'Primary Server'}
                            </div>
                            <ServerIcon className={`transition-all duration-1000 text-slate-700 dark:text-slate-300 ${sharded ? 'w-16 h-16' : 'w-24 h-24'}`} />
                            <div className="mt-4 w-full bg-blue-100 dark:bg-blue-900/50 border border-blue-300 rounded p-2">
                                <DatabaseIcon className="w-6 h-6 mx-auto text-blue-600" />
                                <div className="text-[10px] text-center mt-1 font-mono text-blue-800 dark:text-blue-200">
                                    {sharded ? 'IDs 1-500' : 'IDs 1-1000'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Server 2 (Only visible when sharded) */}
                    <div className={`flex flex-col items-center transition-all duration-1000 ${sharded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-20 scale-50'}`}>
                         <div className="w-48 h-48 border-4 border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg p-6 flex flex-col items-center shadow-xl">
                            <div className="text-xs font-bold text-slate-500 mb-2 whitespace-nowrap">
                                Node 2 (US-West)
                            </div>
                            <ServerIcon className="w-16 h-16 text-slate-700 dark:text-slate-300" />
                            <div className="mt-4 w-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-300 rounded p-2">
                                <DatabaseIcon className="w-6 h-6 mx-auto text-indigo-600" />
                                <div className="text-[10px] text-center mt-1 font-mono text-indigo-800 dark:text-indigo-200">
                                    IDs 501-1000
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
