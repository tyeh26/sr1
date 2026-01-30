import { EvidenceFile } from '@/lib/types';

export const FocusView = ({ item, onUpdate }: { 
  item: EvidenceFile; 
  onUpdate: (id: string, updates: Partial<EvidenceFile>) => void 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="aspect-video bg-slate-100 relative group">
        <img src={item.preview} className="w-full h-full object-contain" alt="Focused evidence" />
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-md">
          {item.label.toUpperCase()}
        </div>
        {/* Viewport Overlay Placeholder */}
        <div className="absolute inset-0 border-2 border-dashed border-transparent hover:border-blue-400 cursor-crosshair transition-all">
          <span className="absolute bottom-2 right-2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100">
            Viewport tool coming soon
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Notes / Context
        </label>
        <textarea
          className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="e.g., 'This shows the leaking radiator on the white Nissan'"
          value={item.description}
          onChange={(e) => onUpdate(item.id, { description: e.target.value })}
        />
      </div>
    </div>
  );
};