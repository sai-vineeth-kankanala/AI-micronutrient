import { useAppStore } from '../lib/store';
// Button import removed
import { Card } from '../components/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, CheckCircle2, Circle, ArrowRight, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { analyzeProfile } from '../lib/analyzer';

export function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    state: { profile, symptoms, supplements, hydration, completedSupplements }, 
    addWater, 
    removeWater, 
    toggleSupplementComplete 
  } = useAppStore();

  const { supplementPlan } = analyzeProfile(profile, symptoms, supplements);

  const totalGlasses = 8;
  const glasses = Array.from({ length: totalGlasses }, (_, i) => i);

  return (
    <div className="flex flex-col h-full bg-transparent relative">
      <div className="p-6 pb-2 shrink-0">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-800">{t('dashboard.hello')} Friend!</h1>
          <p className="text-slate-500 text-sm mt-1">{t('dashboard.subtitle')}</p>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-6 pb-24">
        
        {/* Daily Supplement Checklist */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-semibold text-slate-800 mb-3">{t('dashboard.daily_supplements')}</h2>
          <Card className="p-0 border-slate-100 shadow-sm overflow-hidden bg-white">
            {supplementPlan.length === 0 ? (
              <div className="p-6 text-center text-slate-500 bg-slate-50/50 flex flex-col items-center">
                <ClipboardList className="h-8 w-8 text-slate-300 mb-2" />
                <p className="text-sm">{t('dashboard.no_supplements')}</p>
                <p className="text-xs mt-1 text-slate-400">{t('dashboard.complete_profile')}</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {supplementPlan.map((s) => {
                  const isComplete = completedSupplements.includes(s.id);
                  return (
                    <motion.li 
                      key={s.id} 
                      className={`p-4 transition-colors cursor-pointer ${isComplete ? 'bg-slate-50' : ''}`}
                      onClick={() => toggleSupplementComplete(s.id)}
                      initial={false}
                      animate={{ backgroundColor: isComplete ? '#f8fafc' : '#ffffff' }}
                    >
                      <div className="flex items-center space-x-4">
                        <button className={`shrink-0 transition-colors ${isComplete ? 'text-brand' : 'text-slate-300 hover:text-brand/50'}`}>
                          {isComplete ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                        </button>
                        <div className={`flex-1 transition-opacity ${isComplete ? 'opacity-50' : 'opacity-100'}`}>
                          <p className="font-medium text-slate-800 text-sm">{s.timing}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{s.supplement}</p>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </Card>
        </motion.div>

        {/* Hydration Tracker */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex justify-between items-end mb-3">
            <h2 className="font-semibold text-slate-800">{t('dashboard.hydration')}</h2>
            <span className="text-xs font-medium text-brand">{hydration} / {totalGlasses} {t('dashboard.glasses')}</span>
          </div>
          <Card className="p-4 border-slate-100 shadow-sm bg-blue-50/30">
            <div className="flex items-center justify-between space-x-1">
              {glasses.map((g) => {
                const isFilled = g < hydration;
                return (
                  <button 
                    key={g} 
                    onClick={isFilled ? removeWater : addWater}
                    className="p-1 focus:outline-none focus:scale-110 transition-transform active:scale-90"
                  >
                    <AnimatePresence mode="wait">
                      {isFilled ? (
                        <motion.div
                          key="filled"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Droplet className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 fill-blue-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Droplet className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* View Action Plan Link */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <button 
            onClick={() => navigate('/results')}
            className="w-full flex items-center justify-between p-4 bg-brand/5 border border-brand/20 rounded-xl hover:bg-brand/10 transition-colors group"
          >
            <span className="font-medium text-brand text-sm">View your full Action Plan</span>
            <ArrowRight className="h-5 w-5 text-brand group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
