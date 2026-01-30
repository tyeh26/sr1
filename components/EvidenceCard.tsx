import { EvidenceFile } from '@/lib/types';

export const EvidenceCard = ({ item, onFocus }: { item: EvidenceFile; onFocus: () => void }) => {
  return (
    <div 
      onClick={onFocus}
      className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
        item.isFocused ? 'border-blue-500 scale-105 shadow-md z-10' : 'border-transparent opacity-70 hover:opacity-100'
      }`}
    >
      <img src={item.preview} className="h-20 w-full object-cover" alt="thumbnail" />
      
      {/* Simple Status Dot */}
      {item.label !== 'unlabeled' && (
        <div className="absolute top-2 right-2 bg-blue-500 p-0.5 rounded-full shadow-lg">
           <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
           </svg>
        </div>
      )}
    </div>
  );
};