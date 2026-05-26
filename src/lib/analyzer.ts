import type { UserProfile } from './store';

// Symptom Mapping
const symptomMapping: Record<string, string[]> = {
  'Fatigue': ['Iron', 'Vitamin B12', 'Magnesium', 'Vitamin D'],
  'Brain Fog': ['Vitamin B12', 'Vitamin D', 'Omega-3'],
  'Muscle Cramps': ['Magnesium', 'Potassium', 'Calcium'],
  'Joint Pain': ['Vitamin D', 'Omega-3', 'Vitamin C'],
  'Hair Loss': ['Iron', 'Zinc', 'Biotin'],
  'Dry Skin': ['Vitamin A', 'Vitamin E', 'Omega-3'],
  'Brittle Nails': ['Biotin', 'Iron', 'Zinc'],
  'Poor Sleep': ['Magnesium', 'Vitamin D'],
  'Low Mood': ['Vitamin D', 'Magnesium', 'Vitamin B-Complex'],
  'Frequent Colds': ['Vitamin C', 'Zinc', 'Vitamin D'],
  'Digestive Issues': ['Zinc', 'Magnesium', 'Fiber'],
  'Numbness/Tingling': ['Vitamin B12', 'Vitamin B6', 'B-Complex'],
  'Bleeding Gums': ['Vitamin C'],
  'Pale Skin': ['Iron', 'Vitamin B12'],
  'Restless Legs': ['Iron', 'Magnesium'],
  'Slow Wound Healing': ['Zinc', 'Vitamin C', 'Protein'],
  'Bone Pain': ['Vitamin D', 'Calcium'],
  'Muscle Weakness': ['Potassium', 'Magnesium', 'Vitamin D'],
  'Cold Hands and Feet': ['Iron', 'Iodine'],
  'Irregular Heartbeat': ['Magnesium', 'Potassium'],
  'Mouth Ulcers': ['Iron', 'B-Complex'],
  'Night Blindness': ['Vitamin A']
};

// Diet Mapping
const dietRisks: Record<string, string[]> = {
  'vegan': ['Vitamin B12', 'Iron', 'Zinc', 'Omega-3', 'Calcium'],
  'vegetarian': ['Vitamin B12', 'Iron', 'Zinc', 'Omega-3'],
  'keto': ['Magnesium', 'Potassium', 'Vitamin C'],
  'pescatarian': ['Iron'],
  'omnivore': []
};

// Life Stage Risks
const lifeStageRisks: Record<string, string[]> = {
  'pregnancy': ['Folate / Folic Acid', 'Iron', 'Calcium', 'DHA/Omega-3', 'Iodine'],
  'post-surgery': ['Vitamin C', 'Zinc', 'Protein', 'Iron'],
  'athlete': ['Magnesium', 'Sodium', 'Potassium', 'Iron', 'B-Complex'],
  'general': []
};

export interface AnalysisPlan {
  identifiedDeficiencies: { 
    nutrient: string; 
    severity: 'High' | 'Moderate' | 'Low'; 
    reasons: string[] 
  }[];
  foodCorrectionPlan: { food: string; benefit: string; instruction: string }[];
  supplementPlan: { id: string; timing: string; supplement: string; instruction: string }[];
  lifestylePlan: { intervention: string; reason: string }[];
  bloodTestRecommendations: string[];
  redundancyWarnings: string[];
}

export function analyzeProfile(
  profile: UserProfile,
  symptoms: string[],
  currentSupplements: string[]
): AnalysisPlan {
  // Map nutrient to array of strings explaining why it was flagged
  const deficiencyReasons = new Map<string, string[]>();

  const addReason = (nutrient: string, reason: string) => {
    if (!deficiencyReasons.has(nutrient)) {
      deficiencyReasons.set(nutrient, []);
    }
    const reasons = deficiencyReasons.get(nutrient)!;
    if (!reasons.includes(reason)) reasons.push(reason);
  };

  // 1. Analyze Symptoms
  symptoms.forEach(symp => {
    const risks = symptomMapping[symp] || [];
    risks.forEach(r => addReason(r, `Symptom: ${symp}`));
  });

  // 2. Analyze Diet
  if (profile.dietType && dietRisks[profile.dietType]) {
    dietRisks[profile.dietType].forEach(r => addReason(r, `Diet: ${profile.dietType}`));
  }

  // 3. Analyze Life Stage
  if (profile.lifeStage && lifeStageRisks[profile.lifeStage]) {
    lifeStageRisks[profile.lifeStage].forEach(r => addReason(r, `Life Stage: ${profile.lifeStage}`));
  }

  // 4. Analyze New Profile Fields
  if (profile.sunExposure === 'low') {
    addReason('Vitamin D', 'Low sun exposure');
  }

  if (profile.activityLevel === 'very active') {
    ['Magnesium', 'Potassium', 'Sodium', 'Iron', 'B-Complex'].forEach(r => addReason(r, 'High activity level accelerates nutrient depletion'));
  } else if (profile.activityLevel === 'moderately active') {
    addReason('Magnesium', 'Moderate activity level increases magnesium needs');
  }

  if (profile.goal === 'lose weight') {
    ['Protein', 'Fiber', 'B-Complex'].forEach(r => addReason(r, 'Supports weight loss goals and metabolism'));
  } else if (profile.goal === 'gain muscle') {
    ['Protein', 'Magnesium', 'Zinc'].forEach(r => addReason(r, 'Supports muscle synthesis and recovery'));
  } else if (profile.goal === 'improve energy') {
    ['Vitamin B12', 'Iron', 'Magnesium'].forEach(r => addReason(r, 'Crucial for cellular energy production'));
  }

  if (profile.allergies && profile.allergies.length > 0) {
    if (profile.allergies.includes('Dairy')) {
      addReason('Calcium', 'Dairy allergy restricts primary calcium sources');
      addReason('Vitamin D', 'Dairy allergy restricts fortified sources');
    }
    if (profile.allergies.includes('Fish') || profile.allergies.includes('Shellfish')) {
      addReason('Omega-3', 'Seafood allergy restricts primary Omega-3 sources');
      addReason('Zinc', 'Seafood allergy restricts rich zinc sources');
    }
    if (profile.allergies.includes('Eggs')) {
      addReason('Biotin', 'Egg allergy restricts primary biotin sources');
    }
    if (profile.allergies.includes('Wheat/Gluten')) {
      addReason('B-Complex', 'Gluten avoidance restricts fortified grains');
      addReason('Iron', 'Gluten avoidance restricts fortified grains');
    }
  }

  // 4.5. Add Regional Food & Lifestyle Context
  if (profile.region) {
    if (profile.region === 'India') {
      addReason('Iron', 'Vegetarian-heavy diets common in India may require active iron management');
      addReason('Vitamin B12', 'Very high prevalence of B12 deficiency in Indian diets');
    }
    if (profile.region === 'United Kingdom' || profile.region === 'Canada' || profile.region === 'Sweden') {
      addReason('Vitamin D', `${profile.region} has low winter sunlight hours, increasing deficiency risk`);
    }
  }

  // Calculate severity and build deficiencies array
  const identifiedDeficiencies: AnalysisPlan['identifiedDeficiencies'] = [];
  deficiencyReasons.forEach((reasons, nutrient) => {
    let severity: 'High' | 'Moderate' | 'Low' = 'Low';
    if (reasons.length >= 3) severity = 'High';
    else if (reasons.length === 2) severity = 'Moderate';
    
    // Override severity for critical combinations
    if (nutrient === 'Vitamin B12' && profile.dietType === 'vegan') severity = 'High';
    if (nutrient === 'Vitamin D' && profile.sunExposure === 'low' && reasons.length >= 2) severity = 'High';

    identifiedDeficiencies.push({ nutrient, severity, reasons });
  });

  // Sort by severity (High -> Moderate -> Low)
  identifiedDeficiencies.sort((a, b) => {
    const scores = { 'High': 3, 'Moderate': 2, 'Low': 1 };
    return scores[b.severity] - scores[a.severity];
  });

  // 5. Map Deficiencies to Food, Supplements, and Lifestyle
  const foodCorrectionPlan: AnalysisPlan['foodCorrectionPlan'] = [];
  const supplementPlan: AnalysisPlan['supplementPlan'] = [];
  const lifestylePlan: AnalysisPlan['lifestylePlan'] = [];
  const bloodTestRecommendations = new Set<string>();

  const addFood = (food: string, benefit: string, inst: string) => {
    if (!foodCorrectionPlan.some(f => f.food === food)) {
      foodCorrectionPlan.push({ food, benefit, instruction: inst });
    }
  };

  const addSupp = (id: string, timing: string, supp: string, inst: string) => {
    if (!supplementPlan.some(s => s.supplement === supp)) {
      supplementPlan.push({ id, timing, supplement: supp, instruction: inst });
    }
  };

  const addLifestyle = (intervention: string, reason: string) => {
    if (!lifestylePlan.some(l => l.intervention === intervention)) {
      lifestylePlan.push({ intervention, reason });
    }
  };

  // Localized Food Names
  const getLocalFood = (defaultName: string, category: string) => {
    if (profile.region === 'India') {
      if (category === 'spinach') return 'Spinach (Palak) & Amaranth Leaves';
      if (category === 'lentils') return 'Lentils (Dal) & Chickpeas (Chole)';
      if (category === 'calcium') return 'Paneer & Ragi';
    }
    if (profile.region === 'Japan' || profile.region === 'South Korea') {
      if (category === 'spinach') return 'Seaweed (Wakame/Nori) & Spinach';
      if (category === 'lentils') return 'Edamame & Tofu';
      if (category === 'calcium') return 'Tofu & Fortified Soy Milk';
    }
    if (profile.region === 'Mexico' || profile.region === 'Brazil' || profile.region === 'Argentina') {
      if (category === 'lentils') return 'Black Beans & Pinto Beans';
      if (category === 'calcium') return 'Fortified Corn Tortillas & Cheeses';
    }
    return defaultName;
  };

  identifiedDeficiencies.forEach(defObj => {
    const def = defObj.nutrient;
    switch (def) {
      case 'Vitamin D':
        addFood('Fortified Milks & Mushrooms', 'Natural Vitamin D', 'Ensure 1 cup daily.');
        addFood('Fatty Fish (Salmon/Mackerel)', 'Rich in Vitamin D & Omega-3', 'Eat 2-3 times a week (if diet allows).');
        addSupp('vit-d3', 'Morning', 'Vitamin D3 (with K2)', 'Take with food containing fat for best absorption.');
        addLifestyle('Get 15-20 minutes of morning sunlight daily', 'Direct sunlight is the most effective way to produce Vitamin D naturally.');
        bloodTestRecommendations.add('25-Hydroxy Vitamin D');
        break;
      case 'Magnesium':
        addFood(getLocalFood('Spinach & Pumpkin Seeds', 'spinach'), 'Rich in Magnesium', 'Incorporate into meals daily.');
        addSupp('mag-gly', 'Evening', 'Magnesium Glycinate', 'Take 1 hour before bed to support relaxation and sleep.');
        addLifestyle('Epsom salt baths', 'Your skin can absorb magnesium sulfate directly to relieve muscle cramps.');
        bloodTestRecommendations.add('Magnesium RBC');
        break;
      case 'Vitamin B12':
        if (profile.dietType === 'vegan') {
          addFood('Nutritional Yeast', 'B12 fortification', 'Sprinkle on meals daily.');
        } else {
          addFood('Eggs & Lean Meats', 'Natural B12', 'Include in breakfast or lunch.');
        }
        addSupp('b12', 'Morning', 'Vitamin B12 (Methylcobalamin)', 'Take ideally on an empty stomach or with a light meal.');
        bloodTestRecommendations.add('Serum B12');
        bloodTestRecommendations.add('Homocysteine');
        break;
      case 'Iron':
        addFood(getLocalFood('Lentils & Red Meat', 'lentils'), 'High Iron Content', 'Pair with Vitamin C rich foods (like bell peppers) to boost absorption.');
        if (profile.gender === 'female' || profile.dietType === 'vegan') {
          addSupp('iron', 'Afternoon', 'Iron Bisglycinate', 'Take away from calcium or coffee to avoid blocking absorption.');
        }
        addLifestyle('Avoid coffee/tea with meals', 'Tannins in coffee and tea can block iron absorption by up to 60%.');
        bloodTestRecommendations.add('Ferritin');
        bloodTestRecommendations.add('Complete Blood Count (CBC)');
        bloodTestRecommendations.add('Iron Panel');
        break;
      case 'Zinc':
        addFood('Oysters & Hemp Seeds', 'Rich in Zinc', 'Incorporate into weekly meals.');
        addSupp('zinc', 'Evening', 'Zinc Picolinate', 'Take with a meal to avoid nausea.');
        bloodTestRecommendations.add('Serum Zinc');
        break;
      case 'Omega-3':
        addFood('Chia Seeds & Walnuts', 'ALA Omega-3s', 'Great for snacks or oatmeal toppings.');
        addSupp('omega3', 'With Meal', 'Omega-3 Fish/Algae Oil', 'Take with your largest meal of the day.');
        bloodTestRecommendations.add('Omega-3 Index');
        break;
      case 'Vitamin C':
        addFood('Citrus & Bell Peppers', 'Vitamin C', 'Eat fresh daily.');
        break;
      case 'Biotin':
        addFood('Sweet Potatoes & Almonds', 'Rich in Biotin', 'Great for hair and skin health.');
        break;
      case 'Calcium':
        addFood(getLocalFood('Broccoli & Dairy/Fortified Alternatives', 'calcium'), 'Calcium', 'Ensure daily intake.');
        break;
      case 'Protein':
        addFood(getLocalFood('Lean Meats, Lentils, or Tofu', 'lentils'), 'Protein', 'Crucial for muscle repair and satiety.');
        break;
      case 'B-Complex':
        addFood('Whole Grains & Leafy Greens', 'B Vitamins', 'Supports energy metabolism.');
        addSupp('b-complex', 'Morning', 'B-Complex Vitamin', 'Take with breakfast for sustained energy.');
        break;
      case 'Potassium':
        addFood('Bananas, Avocados, & Potatoes', 'Potassium', 'Daily staples for electrolyte balance.');
        break;
      case 'Sodium':
        addFood('Electrolyte-rich Beverages or Salt', 'Sodium', 'Replenish during or after heavy sweating.');
        break;
      case 'Fiber':
        addFood('Beans, Oats, & Berries', 'Fiber', 'Essential for digestion and sustained energy.');
        addLifestyle('Stay heavily hydrated', 'When increasing fiber intake, water is required to prevent digestive blockages.');
        break;
      case 'Vitamin A':
        addFood('Carrots & Sweet Potatoes', 'Beta-carotene', 'Pair with a healthy fat to absorb properly.');
        break;
      case 'Iodine':
        addFood('Seaweed & Iodized Salt', 'Iodine', 'Use iodized salt for cooking.');
        break;
    }
  });

  // Provide defaults if list is somehow empty
  if (foodCorrectionPlan.length === 0) {
    foodCorrectionPlan.push({ food: 'Mixed Greens', benefit: 'General health', instruction: '1 cup daily' });
  }

  // 6. Redundancy Warnings (cross reference identified supplements vs what they are taking)
  const redundancyWarnings: string[] = [];
  currentSupplements.forEach(supp => {
    const sLower = supp.toLowerCase();
    
    // Check against recommended
    if ((sLower.includes('d3') || sLower.includes('vitamin d')) && deficiencyReasons.has('Vitamin D')) {
      redundancyWarnings.push(`You are already taking Vitamin D (${supp}). Our plan includes it, so ensure you don't exceed safe daily limits.`);
    }
    if (sLower.includes('magnesium') && deficiencyReasons.has('Magnesium')) {
      redundancyWarnings.push(`You are already taking Magnesium (${supp}). Adjust the new evening routine if it overlaps.`);
    }
    if ((sLower.includes('b12') || sLower.includes('b-complex')) && deficiencyReasons.has('Vitamin B12')) {
      redundancyWarnings.push(`You have a B12 supplement (${supp}). Monitor your intake to avoid overlap.`);
    }
    if (sLower.includes('iron') && deficiencyReasons.has('Iron')) {
      redundancyWarnings.push(`You are already taking Iron (${supp}). Do not add more iron without consulting a doctor.`);
    }
  });

  return {
    identifiedDeficiencies,
    foodCorrectionPlan,
    supplementPlan,
    lifestylePlan,
    bloodTestRecommendations: Array.from(bloodTestRecommendations),
    redundancyWarnings
  };
}
