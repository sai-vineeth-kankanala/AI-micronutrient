import { useNavigate } from 'react-router-dom';
import { useAppStore, type Gender, type LifeStage, type DietType, type ActivityLevel, type Goal, type SunExposure } from '../lib/store';
import { Button } from '../components/Button';
import { SearchableSelect, type SelectOption } from '../components/SearchableSelect';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state: { profile }, updateProfile } = useAppStore();

  const handleNext = () => {
    navigate('/symptoms');
  };

  const isComplete = profile.age && profile.gender && profile.lifeStage && profile.dietType && profile.activityLevel && profile.goal && profile.sunExposure;

  const genderOptions: SelectOption[] = [
    { value: 'male', label: t('profile.options.gender.male') },
    { value: 'female', label: t('profile.options.gender.female') },
    { value: 'non-binary', label: t('profile.options.gender.non-binary') },
    { value: 'prefer-not-to-say', label: t('profile.options.gender.prefer-not-to-say') }
  ];

  const lifeStageOptions: SelectOption[] = [
    { value: 'general', label: t('profile.options.life_stage.general') },
    { value: 'pregnancy', label: t('profile.options.life_stage.pregnancy') },
    { value: 'breastfeeding', label: t('profile.options.life_stage.breastfeeding') },
    { value: 'postpartum', label: t('profile.options.life_stage.postpartum') },
    { value: 'menopause', label: t('profile.options.life_stage.menopause') },
    { value: 'post-surgery', label: t('profile.options.life_stage.post-surgery') },
    { value: 'athlete', label: t('profile.options.life_stage.athlete') },
    { value: 'senior', label: t('profile.options.life_stage.senior') },
    { value: 'teen', label: t('profile.options.life_stage.teen') },
    { value: 'child', label: t('profile.options.life_stage.child') }
  ];

  const dietOptions: SelectOption[] = [
    { value: 'vegan', label: t('profile.options.diet.vegan') },
    { value: 'vegetarian', label: t('profile.options.diet.vegetarian') },
    { value: 'pescatarian', label: t('profile.options.diet.pescatarian') },
    { value: 'omnivore', label: t('profile.options.diet.omnivore') },
    { value: 'keto', label: t('profile.options.diet.keto') },
    { value: 'paleo', label: t('profile.options.diet.paleo') },
    { value: 'mediterranean', label: t('profile.options.diet.mediterranean') },
    { value: 'carnivore', label: t('profile.options.diet.carnivore') },
    { value: 'flexitarian', label: t('profile.options.diet.flexitarian') },
    { value: 'plant-based', label: t('profile.options.diet.plant-based') },
    { value: 'dash', label: t('profile.options.diet.dash') },
    { value: 'low-fodmap', label: t('profile.options.diet.low-fodmap') }
  ];

  const activityOptions: SelectOption[] = [
    { value: 'sedentary', label: t('profile.options.activity.sedentary') },
    { value: 'lightly active', label: t('profile.options.activity.lightly active') },
    { value: 'moderately active', label: t('profile.options.activity.moderately active') },
    { value: 'very active', label: t('profile.options.activity.very active') },
    { value: 'extremely active', label: t('profile.options.activity.extremely active') }
  ];

  const goalOptions: SelectOption[] = [
    { value: 'maintain', label: t('profile.options.goal.maintain') },
    { value: 'lose weight', label: t('profile.options.goal.lose weight') },
    { value: 'gain muscle', label: t('profile.options.goal.gain muscle') },
    { value: 'improve energy', label: t('profile.options.goal.improve energy') },
    { value: 'general health', label: t('profile.options.goal.general health') },
    { value: 'improve immunity', label: t('profile.options.goal.improve immunity') },
    { value: 'gut health', label: t('profile.options.goal.gut health') },
    { value: 'better sleep', label: t('profile.options.goal.better sleep') },
    { value: 'mental clarity', label: t('profile.options.goal.mental clarity') },
    { value: 'sports performance', label: t('profile.options.goal.sports performance') },
    { value: 'skin health', label: t('profile.options.goal.skin health') },
    { value: 'reduce inflammation', label: t('profile.options.goal.reduce inflammation') },
    { value: 'longevity', label: t('profile.options.goal.longevity') },
    { value: 'heart health', label: t('profile.options.goal.heart health') },
    { value: 'bone health', label: t('profile.options.goal.bone health') }
  ];

  const sunOptions: SelectOption[] = [
    { value: 'high', label: t('profile.options.sun.high') },
    { value: 'moderate', label: t('profile.options.sun.moderate') },
    { value: 'low', label: t('profile.options.sun.low') },
    { value: 'very high', label: t('profile.options.sun.very high') },
    { value: 'none', label: t('profile.options.sun.none') }
  ];

  const conditionOptions: SelectOption[] = [
    { value: 'none', label: t('profile.options.conditions.none') },
    { value: 'diabetes-1', label: t('profile.options.conditions.diabetes-1') },
    { value: 'diabetes-2', label: t('profile.options.conditions.diabetes-2') },
    { value: 'hypertension', label: t('profile.options.conditions.hypertension') },
    { value: 'heart-disease', label: t('profile.options.conditions.heart-disease') },
    { value: 'celiac', label: t('profile.options.conditions.celiac') },
    { value: 'ibs', label: t('profile.options.conditions.ibs') },
    { value: 'pcos', label: t('profile.options.conditions.pcos') },
    { value: 'hypothyroid', label: t('profile.options.conditions.hypothyroid') },
    { value: 'hyperthyroid', label: t('profile.options.conditions.hyperthyroid') },
    { value: 'anemia', label: t('profile.options.conditions.anemia') },
    { value: 'osteoporosis', label: t('profile.options.conditions.osteoporosis') },
    { value: 'kidney', label: t('profile.options.conditions.kidney') },
    { value: 'liver', label: t('profile.options.conditions.liver') },
    { value: 'autoimmune', label: t('profile.options.conditions.autoimmune') },
    { value: 'fatigue', label: t('profile.options.conditions.fatigue') }
  ];

  const allergyOptions: SelectOption[] = [
    { value: 'none', label: t('profile.options.allergies.none') },
    { value: 'dairy', label: t('profile.options.allergies.dairy') },
    { value: 'gluten', label: t('profile.options.allergies.gluten') },
    { value: 'peanuts', label: t('profile.options.allergies.peanuts') },
    { value: 'tree-nuts', label: t('profile.options.allergies.tree-nuts') },
    { value: 'soy', label: t('profile.options.allergies.soy') },
    { value: 'shellfish', label: t('profile.options.allergies.shellfish') },
    { value: 'fish', label: t('profile.options.allergies.fish') },
    { value: 'eggs', label: t('profile.options.allergies.eggs') },
    { value: 'sesame', label: t('profile.options.allergies.sesame') }
  ];

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="p-6 pb-2">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-800">{t('profile.title')}</h1>
          <p className="text-slate-500 text-sm mt-1">{t('profile.subtitle')}</p>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Basic Info Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-brand border-b border-brand/20 pb-2">{t('profile.basic_info')}</h2>
          
          {/* Age */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('profile.age')}</label>
            <input
              type="number"
              placeholder="e.g. 28"
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-brand focus:ring-0 outline-none transition-colors"
              value={profile.age}
              onChange={(e) => updateProfile({ age: e.target.value })}
            />
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('profile.gender')}</label>
            <SearchableSelect 
              options={genderOptions}
              value={profile.gender}
              onChange={(v) => updateProfile({ gender: v as Gender })}
              placeholder={t('common.search')}
            />
          </div>

          {/* Life Stage */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('profile.life_stage')}</label>
            <SearchableSelect 
              options={lifeStageOptions}
              value={profile.lifeStage}
              onChange={(v) => updateProfile({ lifeStage: v as LifeStage })}
              placeholder={t('common.search')}
            />
          </div>
        </div>

        {/* Lifestyle & Goals Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-brand border-b border-brand/20 pb-2">{t('profile.lifestyle')}</h2>

          {/* Activity Level */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('profile.activity')}</label>
            <SearchableSelect 
              options={activityOptions}
              value={profile.activityLevel}
              onChange={(v) => updateProfile({ activityLevel: v as ActivityLevel })}
              placeholder={t('common.search')}
            />
          </div>

          {/* Goal */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('profile.goal')}</label>
            <SearchableSelect 
              options={goalOptions}
              value={profile.goal}
              onChange={(v) => updateProfile({ goal: v as Goal })}
              placeholder={t('common.search')}
            />
          </div>

          {/* Sun Exposure */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('profile.sun')}</label>
            <SearchableSelect 
              options={sunOptions}
              value={profile.sunExposure}
              onChange={(v) => updateProfile({ sunExposure: v as SunExposure })}
              placeholder={t('common.search')}
            />
          </div>
        </div>

        {/* Dietary & Health Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-brand border-b border-brand/20 pb-2">{t('profile.diet')}</h2>

          {/* Diet Type */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('profile.diet_type')}</label>
            <SearchableSelect 
              options={dietOptions}
              value={profile.dietType}
              onChange={(v) => updateProfile({ dietType: v as DietType })}
              placeholder={t('common.search')}
            />
          </div>

          {/* Allergies */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('profile.allergies')}</label>
            <SearchableSelect 
              options={allergyOptions}
              value={profile.allergies}
              onChange={(v) => updateProfile({ allergies: v as string[] })}
              multiple
              placeholder={t('common.search')}
            />
          </div>

          {/* Medical Conditions */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('profile.conditions')}</label>
            <SearchableSelect 
              options={conditionOptions}
              value={profile.medicalConditions}
              onChange={(v) => updateProfile({ medicalConditions: v as string[] })}
              multiple
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
          onClick={handleNext}
        >
          {t('common.continue')}
        </Button>
      </div>
    </div>
  );
}
