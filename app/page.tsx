"use client"
import { useState } from 'react';
import { SR1Data } from '@/lib/types';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<SR1Data | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SR-1 AI Assistant</h1>
          <p className="text-gray-600">Upload accident photos to generate your DMV report.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: INPUT */}
          <section className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">1. Upload Evidence</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <p className="text-gray-500">Drop photos or click to upload</p>
                <span className="text-xs text-gray-400 font-mono">IMG_0111.png, etc.</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">2. Accident Description</h2>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md h-32 text-gray-700"
                placeholder="Describe what happened in your own words..."
              />
              <button 
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                onClick={() => setIsProcessing(true)}
              >
                {isProcessing ? "Analyzing with AI..." : "Generate SR-1 Data"}
              </button>
            </div>
          </section>

          {/* RIGHT COLUMN: AI OUTPUT */}
          <section className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">AI Interpretation (Structured)</h2>
                {isProcessing && <div className="animate-pulse text-blue-400 text-sm">Processing...</div>}
              </div>

              {!data && !isProcessing && (
                <div className="text-gray-500 italic text-center mt-20">
                  Waiting for data analysis...
                </div>
              )}

              {/* Data Display Placeholder */}
              {isProcessing && (
                 <div className="space-y-4 font-mono text-sm">
                   <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse" />
                   <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse" />
                   <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse" />
                 </div>
              )}
              
              {/* This is where your SR1Data component will render */}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
