import { useState, useMemo } from 'react';
import { Search, Check } from 'lucide-react';

export type SelectOption = { value: string; label: string };

interface SearchableSelectProps {
  options: (string | SelectOption)[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchableSelect({ options, value, onChange, multiple = false, placeholder = "Search...", className = "max-h-48" }: SearchableSelectProps) {
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter(opt => {
      const searchTarget = typeof opt === 'string' ? opt : opt.label;
      return searchTarget.toLowerCase().includes(query.toLowerCase());
    });
  }, [options, query]);

  const handleSelect = (option: string | SelectOption) => {
    const val = typeof option === 'string' ? option : option.value;
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      if (current.includes(val)) {
        onChange(current.filter(i => i !== val));
      } else {
        onChange([...current, val]);
      }
    } else {
      onChange(val);
    }
  };

  const isSelected = (option: string | SelectOption) => {
    const val = typeof option === 'string' ? option : option.value;
    if (multiple) {
      return Array.isArray(value) && value.includes(val);
    }
    return value === val;
  };

  return (
    <div className="flex flex-col border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="flex items-center px-4 py-3 border-b border-slate-100 bg-slate-50">
        <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent w-full outline-none text-sm text-slate-700"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={`${className} overflow-y-auto p-2 space-y-1`}>
        {filteredOptions.length === 0 ? (
          <div className="p-3 text-center text-sm text-slate-500">No results found</div>
        ) : (
          filteredOptions.map((option, idx) => {
            const val = typeof option === 'string' ? option : option.value;
            const label = typeof option === 'string' ? option : option.label;
            return (
              <button
                key={val || idx}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                  isSelected(option) 
                    ? 'bg-brand/10 text-brand font-medium' 
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>{label}</span>
                {isSelected(option) && <Check className="w-4 h-4 text-brand" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
