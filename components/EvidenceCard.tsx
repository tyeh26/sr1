import { EvidenceFile, EvidenceLabel } from '@/lib/types';

const LABELS: EvidenceLabel[] = ['me', 'other_party', 'scene', 'document'];

export const EvidenceCard = ({ 
  item, 
  onFocus, 
  onUpdate 
}: { 
  item: EvidenceFile; 
  onFocus: () => void;
  onUpdate: (id: string, updates: Partial<EvidenceFile>) => void;
}) => {
  return (
    <div 
      onClick={onFocus}
      className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
        item.isFocused ? 'border-blue-500 ring-2 ring-blue-100' : 'border-transparent hover:border-gray-300'
      }`}
    >
      <img src={item.preview} className="h-24 w-full object-cover" alt="thumbnail" />
      
      {/* Label Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap gap-1 p-1 items-center justify-center">
        {LABELS.map((l) => (
          <button
            key={l}
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(item.id, { label: l });
            }}
            className={`text-[10px] px-1.5 py-0.5 rounded shadow-sm transition-transform active:scale-95 ${
              item.label === l ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      
      {/* Indicator Dot */}
      {item.label !== 'unlabeled' && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border border-white" />
      )}
    </div>
  );
};