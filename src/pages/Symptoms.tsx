import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import { Button } from '../components/Button';
import { SearchableSelect } from '../components/SearchableSelect';
import { motion } from 'framer-motion';

const ALL_SYMPTOMS = [
  'Bleeding Gums',
  'Bone Pain',
  'Brain Fog',
  'Brittle Nails',
  'Cold Hands and Feet',
  'Digestive Issues',
  'Dry Skin',
  'Fatigue',
  'Frequent Colds',
  'Hair Loss',
  'Irregular Heartbeat',
  'Joint Pain',
  'Low Mood',
  'Mouth Ulcers',
  'Muscle Cramps',
  'Muscle Weakness',
  'Night Blindness',
  'Numbness/Tingling',
  'Pale Skin',
  'Poor Sleep',
  'Restless Legs',
  'Slow Wound Healing'
];

export function Symptoms() {
  const navigate = useNavigate();
  const { state: { symptoms }, setSymptoms } = useAppStore();

  const handleNext = () => {
    navigate('/supplements');
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="p-6 pb-2 shrink-0">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-800">Your Symptoms</h1>
          <p className="text-slate-500 text-sm mt-1">Select any that apply to you currently</p>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-hidden p-6 pt-2 pb-24">
        <motion.div
          className="h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* We use max-h-[60vh] to allow the scrollable area to take up most of the screen */}
          <SearchableSelect 
            options={ALL_SYMPTOMS}
            value={symptoms}
            onChange={(v) => setSymptoms(v as string[])}
            multiple
            placeholder="Search all symptoms..."
            className="max-h-[60vh]"
          />
        </motion.div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] absolute bottom-0 left-0 right-0 z-10">
        <Button 
          size="lg" 
          className="w-full shadow-brand/25 shadow-lg"
          onClick={handleNext}
        >
          {symptoms.length > 0 ? "Continue" : "Skip for now"}
        </Button>
      </div>
    </div>
  );
}
