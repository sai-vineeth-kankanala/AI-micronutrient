import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../lib/store';
import { Button } from '../components/Button';
import { SearchableSelect } from '../components/SearchableSelect';
import { motion } from 'framer-motion';

const LANGUAGE_OPTIONS = [
  'English', 'Spanish', 'Hindi' // Keep it focused on the supported ones for now
];

const REGION_OPTIONS = [
  'Argentina', 'Australia', 'Brazil', 'Canada', 'China', 'Egypt', 'France', 'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Mexico', 'Nigeria', 'Russia', 'Saudi Arabia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States', 'Other'
];

export function Preferences() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { state: { profile }, updateProfile } = useAppStore();

  const handleLanguageChange = (lang: string) => {
    updateProfile({ language: lang });
    // Map human readable to code
    let code = 'en';
    if (lang === 'Spanish') code = 'es';
    if (lang === 'Hindi') code = 'hi';
    i18n.changeLanguage(code);
  };

  const handleContinue = () => {
    navigate('/profile');
  };

  const isComplete = profile.language && profile.region;

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="p-6 pb-2">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-800">{t('preferences.title')}</h1>
          <p className="text-slate-500 text-sm mt-1">{t('preferences.subtitle')}</p>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Language & Region */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('preferences.language')}</label>
            <SearchableSelect 
              options={LANGUAGE_OPTIONS} 
              value={profile.language} 
              onChange={(v) => handleLanguageChange(v as string)}
              placeholder={t('common.search')}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('preferences.country')}</label>
            <SearchableSelect 
              options={REGION_OPTIONS} 
              value={profile.region} 
              onChange={(v) => updateProfile({ region: v as string })}
              placeholder={t('common.search')}
            />
          </div>
        </div>

      </div>

      <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <Button 
          size="lg" 
          className="w-full shadow-brand/25 shadow-lg"
          disabled={!isComplete}
          onClick={handleContinue}
        >
          {t('preferences.continue')}
        </Button>
      </div>
    </div>
  );
}
