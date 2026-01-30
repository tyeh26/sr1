import { EvidenceFile, PrimaryLabel } from '@/lib/types';

const SCHEMA = [
  {
    value: 'me',
    label: 'Me',
    icon: '🚗',
    subLabels: ['Damage', 'License Plate', 'VIN Sticker', "Driver's License", 'Insurance Card', 'Registration']
  },
  {
    value: 'other_party',
    label: 'Other Party',
    icon: '👤',
    subLabels: ['Damage', 'License Plate', 'VIN Sticker', "Driver's License", 'Insurance Card', 'Registration']
  },
  {
    value: 'scene',
    label: 'The Scene',
    icon: '🛣️',
    subLabels: ['Street Signs', 'Traffic Lights', 'Full View']
  }
];

export const FocusView = ({ item, onUpdate }: { 
  item: EvidenceFile; 
  onUpdate: (id: string, updates: Partial<EvidenceFile>) => void 
}) => {
  const activeSchema = SCHEMA.find(s => s.value === item.primaryLabel);

  const toggleSecondaryLabel = (label: string) => {
    const currentLabels = item.secondaryLabels || [];
    const newLabels = currentLabels.includes(label)
      ? currentLabels.filter(l => l !== label) // Remove if exists
      : [...currentLabels, label];            // Add if new
    
    onUpdate(item.id, { secondaryLabels: newLabels });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* 1. IMAGE DISPLAY */}
      <div className="aspect-[16/10] bg-slate-900 flex items-center justify-center p-2">
        <img src={item.preview} className="max-h-full rounded-lg object-contain shadow-2xl" alt="Evidence" />
      </div>

      <div className="p-6 space-y-6 bg-white">
        {/* PRIMARY LABELS */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Primary Category</h3>
          <div className="flex flex-wrap gap-2">
            {SCHEMA.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onUpdate(item.id, { 
                  primaryLabel: cat.value as PrimaryLabel, 
                  secondaryLabels: [] // Reset to empty array on primary change
                })}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                  item.primaryLabel === cat.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                }`}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECONDARY MULTI-SELECT LABELS */}
        {activeSchema && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                Refine Details (Select Multiple)
              </h3>
              {item.secondaryLabels?.length > 0 && (
                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                  {item.secondaryLabels.length} Selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {activeSchema.subLabels.map((sub) => {
                const isSelected = item.secondaryLabels?.includes(sub);
                return (
                  <button
                    key={sub}
                    onClick={() => toggleSecondaryLabel(sub)}
                    className={`px-3 py-1.5 rounded-lg border-2 text-xs font-bold transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                        : 'border-blue-100 bg-blue-50/30 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* DESCRIPTION */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Additional Notes</h3>
          <textarea
            className="w-full p-4 bg-slate-50 rounded-xl text-sm border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-[80px] resize-none"
            placeholder="Help the AI understand this photo..."
            value={item.description}
            onChange={(e) => onUpdate(item.id, { description: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};