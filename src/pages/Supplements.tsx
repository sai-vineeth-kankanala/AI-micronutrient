import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Pill } from 'lucide-react';

const COMMON_SUPPLEMENTS = [
  'Ashwagandha',
  'B-Complex',
  'Biotin 5000mcg',
  'Biotin 10000mcg',
  'Calcium 500mg',
  'Calcium 1000mg',
  'Creatine Monohydrate',
  'Iron 18mg',
  'Iron 65mg',
  'Magnesium Citrate',
  'Magnesium Glycinate',
  'Multivitamin',
  'Omega-3 Fish Oil',
  'Probiotics',
  'Vitamin A',
  'Vitamin B12',
  'Vitamin C 500mg',
  'Vitamin C 1000mg',
  'Vitamin D3 1000 IU',
  'Vitamin D3 2000 IU',
  'Vitamin D3 5000 IU',
  'Whey Protein',
  'Zinc 15mg',
  'Zinc 30mg'
];

export function Supplements() {
  const navigate = useNavigate();
  const { state: { supplements }, addSupplement, removeSupplement } = useAppStore();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      addSupplement(inputValue);
      setInputValue('');
      setIsFocused(false);
    }
  };

  const handleNext = () => {
    navigate('/results');
  };

  const suggestedSupplements = inputValue.trim().length > 0 
    ? COMMON_SUPPLEMENTS.filter(s => 
        s.toLowerCase().includes(inputValue.trim().toLowerCase()) && 
        !supplements.includes(s)
      )
    : [];

  return (
    <div className="flex flex-col h-full bg-transparent relative">
      <div className="p-6 pb-2 shrink-0">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-800">Current Supplements</h1>
          <p className="text-slate-500 text-sm mt-1">What are you already taking?</p>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-4 flex flex-col items-stretch relative">
        
        <div className="relative mb-6 shrink-0 z-20" ref={dropdownRef}>
          <form onSubmit={handleAdd} className="flex gap-2 relative">
              <input
              type="text"
              placeholder="e.g. Vitamin D3 5000 IU"
              className="flex-1 p-4 rounded-xl border-2 border-slate-200 focus:border-brand focus:ring-0 outline-none transition-colors"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsFocused(true);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)} // delay to allow click on suggestion
            />
            <Button 
              type="submit" 
              variant="primary" 
              className="w-14 shrink-0 rounded-xl bg-slate-800 hover:bg-slate-700 p-0 flex items-center justify-center"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </form>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {isFocused && suggestedSupplements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-[110%] left-0 right-16 bg-white border border-slate-200 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] max-h-48 overflow-y-auto overflow-x-hidden origin-top"
              >
                {suggestedSupplements.map(suggestion => (
                  <button
                    key={suggestion}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent input from losing focus immediately
                      addSupplement(suggestion);
                      setInputValue('');
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-brand/10 hover:text-brand focus:bg-brand/10 outline-none border-b border-slate-100 last:border-0 transition-colors pointer-events-auto"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 relative z-10">
          {supplements.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 pb-20">
              <Pill className="h-12 w-12 mb-3 opacity-20" />
              <p>No supplements added yet</p>
            </div>
          ) : (
            <ul className="space-y-3 pb-24">
              <AnimatePresence>
                {supplements.map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
                  >
                    <span className="font-medium text-slate-700">{item}</span>
                    <button 
                      onClick={() => removeSupplement(item)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

      </div>

      <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] absolute bottom-0 left-0 right-0 z-30">
        <Button 
          size="lg" 
          className="w-full shadow-brand/25 shadow-lg"
          onClick={handleNext}
        >
          {supplements.length > 0 ? "See Results" : "Skip for now"}
        </Button>
      </div>
    </div>
  );
}
