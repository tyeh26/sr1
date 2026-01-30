"use client"
import { useState } from 'react';
import { SR1Data } from '@/lib/types';

import { MediaGallery } from '@/components/MediaGallery';

export default function Home() {
  const [isGlobalDragging, setIsGlobalDragging] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<SR1Data | null>(null);

  // Prevent browser default behavior for the whole page
  const handleGlobalDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsGlobalDragging(true);
  };

  const handleGlobalDragLeave = (e: React.DragEvent) => {
    // Only stop dragging if we leave the window, not just a child element
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsGlobalDragging(false);
    }
  }

  const handleGlobalDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsGlobalDragging(false);
    // Note: The actual file processing will still happen in MediaGallery 
    // because that's where the state lives, but we'll trigger it via the overlay.
  };

  return (
    <main
      onDragOver={handleGlobalDragOver}
      onDragLeave={handleGlobalDragLeave}
      onDrop={handleGlobalDrop}
      className="min-h-screen bg-gray-50 p-8"
    >
      {/* Global Whole-Page Drag & Drop Overlay */}
      {isGlobalDragging && (
        <div className="fixed inset-0 z-50 bg-blue-500/20 backdrop-blur-sm border-4 border-dashed border-blue-500 flex items-center justify-center pointer-events-none">
          <div className="bg-white p-6 rounded-2xl shadow-2xl scale-110 transition-transform">
            <p className="text-blue-600 font-bold text-xl">Drop images anywhere to add evidence</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SR-1 AI Assistant</h1>
          <p className="text-gray-600">Upload accident photos to generate your DMV report.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: INPUT */}
          <section className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <MediaGallery isGlobalDragging={isGlobalDragging} />
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
