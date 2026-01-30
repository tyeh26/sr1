"use client"
import React, { useCallback } from 'react';

import { EvidenceFile } from '@/lib/types';
import { EvidenceCard } from './EvidenceCard';
import { FocusView } from './FocusView';

interface MediaGalleryProps {
  isGlobalDragging: boolean;
  evidence: EvidenceFile[];
  setEvidence: React.Dispatch<React.SetStateAction<EvidenceFile[]>>;
}

export const MediaGallery = ({ isGlobalDragging, evidence, setEvidence }: MediaGalleryProps) => {

  // Function to handle the actual file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Helper to process files into our state format
  const processFiles = useCallback(async (files: File[]) => {
    // Dynamically import heic2any only when this function runs (client-side)
    const heic2any = (await import("heic2any")).default;

    const processedItems: EvidenceFile[] = await Promise.all(
        files.map(async (file) => {
        let fileToProcess = file;
        const isHeic = file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif");

        if (isHeic) {
            try {
            const convertedBlob = await heic2any({
                blob: file,
                toType: "image/jpeg",
                quality: 0.8,
            });
            
            fileToProcess = new File(
                [Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
                file.name.replace(/\.(heic|heif)$/i, ".jpg"),
                { type: "image/jpeg" }
            );
            } catch (error) {
            console.error("HEIC Conversion failed:", error);
            }
        }

        return {
            id: Math.random().toString(36).substring(2, 9),
            file: fileToProcess,
            preview: URL.createObjectURL(fileToProcess),
            primaryLabel: 'unlabeled',
            secondaryLabels: [],
            description: '',
            isFocused: false,
        };
        })
    );

    setEvidence(prev => {
        const unfocusedPrev = prev.map(item => ({ ...item, isFocused: false }));
        if (processedItems.length > 0) processedItems[0].isFocused = true;
        return [...unfocusedPrev, ...processedItems];
    });
    }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const updateItem = (id: string, updates: Partial<EvidenceFile>) => {
    setEvidence(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const setFocus = (id: string) => {
    setEvidence(prev => prev.map(item => ({ ...item, isFocused: item.id === id })));
  };

  const activeItem = evidence.find(e => e.isFocused);

  return (
    <div
        onDrop={handleDrop} // This catches the drop when the page-wide drag finishes
        className="space-y-6"
    >
      {/* 1. DROP ZONE / ACTIVE STAGE */}
      {!activeItem ? (
        <label
          className={`flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            isGlobalDragging 
              ? 'border-blue-500 bg-blue-50 scale-[1.01]' 
              : 'border-gray-300 bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            <div className={`p-4 rounded-full mb-4 transition-colors 'bg-gray-100'}`}>
               <svg className={`w-8 h-8 ${'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Vector diagram of an image upload icon" />
               </svg>
            </div>
            <p className="mb-2 text-sm text-gray-500 font-semibold tracking-tight">
              Drag & Drop accident photos
            </p>
            <p className="text-xs text-gray-400">Support for JPEGs and PNGs (IDs, scene photos, etc.)</p>
          </div>
          <input type="file" className="hidden" multiple onChange={handleFileInput} />
        </label>
      ) : (
        <FocusView item={activeItem} onUpdate={updateItem} />
      )}

      {/* 2. THUMBNAIL TRACK */}
      {evidence.length > 0 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {evidence.map(item => (
            <EvidenceCard 
              key={item.id} 
              item={item} 
              onFocus={() => setFocus(item.id)} 
              onUpdate={updateItem}
            />
          ))}
          {/* Smaller 'Add More' drop target */}
          <label 
            className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-24 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <span className="text-2xl text-gray-300 font-light">+</span>
            <input type="file" className="hidden" multiple onChange={handleFileInput} />
          </label>
        </div>
      )}
    </div>
  );
};