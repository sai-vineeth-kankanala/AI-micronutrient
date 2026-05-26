import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, Activity, Utensils, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ShaderPlane } from '../components/ui/background-paper-shaders';
import { Button } from '../components/Button';

export function Onboarding() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Snappy Material Design motion easing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 0.4 } }
  };

  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-white text-slate-900 antialiased font-sans z-0 overflow-hidden">
      
      {/* 3D Shader Background */}
      <div className="absolute inset-0 z-[-1] opacity-60">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ShaderPlane position={[0, 0, 0]} color1="#34d399" color2="#d1fae5" />
        </Canvas>
      </div>

      <motion.div 
        className="flex h-full flex-col p-6 max-w-md mx-auto w-full z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Top Spacer */}
        <div className="flex-1 min-h-[4vh]"></div>

        {/* Top Visual Section */}
        <div className="flex flex-col items-start justify-center">
          <motion.div variants={itemVariants} className="w-16 h-16 flex items-center justify-center bg-[#D1FAE5] rounded-2xl mb-6 shadow-sm">
            <Leaf className="h-8 w-8 text-[#059669]" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 text-left mb-10">
          <h1 className="text-[36px] font-bold tracking-tight leading-[1.1] text-slate-900 whitespace-pre-line">
            {t('onboarding.title')}
          </h1>
          <p className="text-slate-600 text-[16px] leading-relaxed mt-2 pr-4">
            {t('onboarding.subtitle')}
          </p>
        </motion.div>

        {/* Material 3 Surface Cards */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          {/* Card 1 */}
          <div className="rounded-[28px] p-5 flex items-center gap-4 bg-[#F8FAFC]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm text-[#059669]">
              <Activity className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="flex flex-col text-left flex-1">
              <p className="text-[16px] font-medium text-slate-900">{t('onboarding.health_scan')}</p>
              <p className="text-[13px] text-slate-500 mt-0.5">{t('onboarding.health_scan_desc')}</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[28px] p-5 flex items-center gap-4 bg-[#F8FAFC]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm text-[#059669]">
              <Utensils className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="flex flex-col text-left flex-1">
              <p className="text-[16px] font-medium text-slate-900">{t('onboarding.plan')}</p>
              <p className="text-[13px] text-slate-500 mt-0.5">{t('onboarding.plan_desc')}</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Spacer */}
        <div className="flex-1 min-h-[8vh]"></div>

        {/* Material Floating Action Button (Extended) */}
        <motion.div variants={itemVariants} className="pb-8">
          <Button 
            onClick={() => navigate('/login')}
            size="lg"
            className="w-full"
          >
            {t('onboarding.get_started')}
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          
          <div className="text-center mt-6">
            <Button 
              onClick={() => navigate('/login')}
              variant="ghost"
              size="sm"
              className="text-[#059669] hover:bg-[#ECFDF5]"
            >
              {t('onboarding.sign_in')}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
