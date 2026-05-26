import { useEffect, useState } from 'react';
import { useAppStore } from '../lib/store';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Apple, Pill, CalendarCheck, Droplet, Download, CheckCircle2 } from 'lucide-react';
import { analyzeProfile } from '../lib/analyzer';

export function Results() {
  const { state: { profile, symptoms, supplements }, reset } = useAppStore();
  const [analyzing, setAnalyzing] = useState(true);

  // Mock analysis logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (analyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-6 text-center">
        <Loader2 className="h-12 w-12 text-brand animate-spin mb-6" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Analyzing your profile...</h2>
        <p className="text-slate-500 text-sm">Reviewing your {symptoms.length} symptoms and diet type ({profile.dietType || 'Not specified'}) against {supplements.length} current supplements...</p>
      </div>
    );
  }

  // Use real analysis logic based on what they gave
  const analysisResult = analyzeProfile(profile, symptoms, supplements);

  const planData = {
    profile,
    symptoms,
    currentSupplements: supplements,
    identifiedDeficiencies: analysisResult.identifiedDeficiencies,
    foodCorrectionPlan: analysisResult.foodCorrectionPlan,
    supplementPlan: analysisResult.supplementPlan,
    lifestylePlan: analysisResult.lifestylePlan,
    bloodTestRecommendations: analysisResult.bloodTestRecommendations,
    redundancyWarnings: analysisResult.redundancyWarnings
  };

  const { deficiencies, bloodTests, redundancies } = { // Just for naming compatibility in the UI variables below
    deficiencies: analysisResult.identifiedDeficiencies,
    bloodTests: analysisResult.bloodTestRecommendations,
    redundancies: analysisResult.redundancyWarnings
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(planData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "micronutrient_plan.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex flex-col h-full bg-transparent relative">
      <div className="p-6 pb-2 shrink-0 flex justify-between items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-800">Your Action Plan</h1>
          <p className="text-slate-500 text-sm mt-1">Based on your unique profile</p>
        </motion.div>
        <Button size="sm" variant="outline" onClick={handleDownloadJson} className="flex-shrink-0">
          <Download className="h-4 w-4 mr-2" />
          JSON
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-6 pb-24">
        
        {/* Render Redundancies if any */}
        {redundancies.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start text-amber-800">
              <AlertCircle className="h-5 w-5 mr-3 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm">Supplement Redundancy Notice</h3>
                <p className="text-xs mt-1">You are currently taking <strong>{redundancies.join(', ')}</strong> which overlaps with our recommendations. Consider removing the overlap to prevent over-supplementation.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Identified Deficiencies with Context & Severity */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center space-x-2 mb-3 text-red-500">
            <AlertCircle className="h-5 w-5" />
            <h2 className="font-semibold text-slate-800">Identified Deficiencies</h2>
          </div>
          <Card className="p-0 border-none shadow-sm overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {deficiencies.map((d) => (
                <li key={d.nutrient} className="p-4 flex flex-col bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-3 ${d.severity === 'High' ? 'bg-red-500' : d.severity === 'Moderate' ? 'bg-orange-400' : 'bg-yellow-400'}`} />
                      <span className="font-semibold text-slate-800">{d.nutrient}</span>
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${d.severity === 'High' ? 'bg-red-100 text-red-700' : d.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {d.severity} Risk
                    </span>
                  </div>
                  {d.reasons.length > 0 && (
                    <div className="ml-5 mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-md">
                      <span className="font-medium text-slate-600 block mb-1">Flagged due to:</span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {d.reasons.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Food Correction Plan */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center space-x-2 mb-3 text-green-600">
            <Apple className="h-5 w-5" />
            <h2 className="font-semibold text-slate-800">Food Prescriptions</h2>
          </div>
          <Card className="p-4 shadow-sm border-slate-100">
            <ul className="space-y-4">
              {planData.foodCorrectionPlan.map((item, idx) => (
                <li key={idx}>
                  <p className="font-medium text-slate-800 text-sm">{item.food}</p>
                  <p className="text-xs text-slate-500 mt-1"><span className="font-medium text-green-600">{item.benefit}:</span> {item.instruction}</p>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Lifestyle Interventions */}
        {planData.lifestylePlan.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <div className="flex items-center space-x-2 mb-3 text-orange-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h2 className="font-semibold text-slate-800">Lifestyle Habits</h2>
            </div>
            <Card className="p-4 shadow-sm border-slate-100 bg-orange-50/30">
              <ul className="space-y-4">
                {planData.lifestylePlan.map((item, idx) => (
                  <li key={idx}>
                    <p className="font-medium text-slate-800 text-sm">{item.intervention}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.reason}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}

        {/* Supplementation Plan */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center space-x-2 mb-3 text-blue-500">
            <Pill className="h-5 w-5" />
            <h2 className="font-semibold text-slate-800">Supplement Plan</h2>
          </div>
          <Card className="p-4 shadow-sm border-slate-100 bg-blue-50/30">
            {planData.supplementPlan.length === 0 ? (
              <p className="text-sm text-slate-500">No additional supplements required based on your profile.</p>
            ) : (
              <div className="space-y-4">
                {planData.supplementPlan.map((item, idx) => (
                  <div key={idx} className={`flex items-start ${idx > 0 ? 'pt-3 border-t border-blue-100' : ''}`}>
                    <CalendarCheck className={`h-5 w-5 ${idx % 2 === 0 ? 'text-blue-400' : 'text-indigo-400'} mr-3 shrink-0 mt-0.5`} />
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{item.timing}: <span className="font-medium">{item.supplement}</span></p>
                      <p className="text-xs text-slate-500 mt-1">{item.instruction}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Blood Test Recommendations */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center space-x-2 mb-3 text-purple-600">
            <Droplet className="h-5 w-5" />
            <h2 className="font-semibold text-slate-800">Recommended Blood Tests</h2>
          </div>
          <Card className="p-4 shadow-sm border-slate-100">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bloodTests.map(test => (
                <li key={test} className="flex items-center text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 mr-2" />
                  {test}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

      </div>

      <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] absolute bottom-0 left-0 right-0">
        <Button 
          variant="outline"
          className="w-full"
          onClick={() => {
            reset();
            window.location.href = '/'; 
          }}
        >
          Start Over
        </Button>
      </div>
    </div>
  );
}
