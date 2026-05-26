import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | '';
export type LifeStage = 'general' | 'pregnancy' | 'breastfeeding' | 'postpartum' | 'menopause' | 'post-surgery' | 'athlete' | 'senior' | 'teen' | 'child' | '';
export type DietType = 'vegan' | 'vegetarian' | 'pescatarian' | 'omnivore' | 'keto' | 'paleo' | 'mediterranean' | 'carnivore' | 'flexitarian' | 'plant-based' | 'dash' | 'low-fodmap' | '';
export type ActivityLevel = 'sedentary' | 'lightly active' | 'moderately active' | 'very active' | 'extremely active' | '';
export type Goal = 'maintain' | 'lose weight' | 'gain muscle' | 'improve energy' | 'general health' | 'improve immunity' | 'gut health' | 'better sleep' | 'mental clarity' | 'sports performance' | 'skin health' | 'reduce inflammation' | 'longevity' | 'heart health' | 'bone health' | '';
export type SunExposure = 'high' | 'moderate' | 'low' | 'very high' | 'none' | '';

export interface UserProfile {
  age: string;
  gender: Gender;
  lifeStage: LifeStage;
  medicalConditions: string[]; // Changed from string to string[] for multi-select
  dietType: DietType;
  activityLevel: ActivityLevel;
  goal: Goal;
  allergies: string[];
  sunExposure: SunExposure;
  language: string;
  region: string;
}

export interface AppState {
  profile: UserProfile;
  symptoms: string[];
  supplements: string[];
  hydration: number;
  completedSupplements: string[];
  isAuthenticated: boolean;
  userId: string | null;
}

interface AppContextType {
  state: AppState;
  updateProfile: (profile: Partial<UserProfile>) => void;
  toggleSymptom: (symptom: string) => void;
  setSymptoms: (symptoms: string[]) => void;
  addSupplement: (supplement: string) => void;
  removeSupplement: (supplement: string) => void;
  addWater: () => void;
  removeWater: () => void;
  toggleSupplementComplete: (supplement: string) => void;
  reset: () => void;
  setAuth: (isAuthenticated: boolean, userId: string | null) => void;
}

const defaultInitialState: AppState = {
  profile: {
    age: '',
    gender: '',
    lifeStage: '',
    medicalConditions: [],
    dietType: '',
    activityLevel: '',
    goal: '',
    allergies: [],
    sunExposure: '',
    language: '',
    region: '',
  },
  symptoms: [],
  supplements: [],
  hydration: 0,
  completedSupplements: [],
  isAuthenticated: false,
  userId: null,
};

const getInitialState = (): AppState => {
  const saved = localStorage.getItem('micronutrient_app_state');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultInitialState;
    }
  }
  return defaultInitialState;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(getInitialState);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('micronutrient_app_state', JSON.stringify(state));
  }, [state]);

  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate },
    }));
  };

  const toggleSymptom = (symptom: string) => {
    setState((prev) => {
      const exists = prev.symptoms.includes(symptom);
      if (exists) {
        return { ...prev, symptoms: prev.symptoms.filter((s) => s !== symptom) };
      }
      return { ...prev, symptoms: [...prev.symptoms, symptom] };
    });
  };

  const setSymptoms = (symptoms: string[]) => {
    setState((prev) => ({ ...prev, symptoms }));
  };

  const addSupplement = (supplement: string) => {
    if (!supplement.trim()) return;
    setState((prev) => {
      if (prev.supplements.includes(supplement.trim())) return prev;
      return { ...prev, supplements: [...prev.supplements, supplement.trim()] };
    });
  };

  const removeSupplement = (supplement: string) => {
    setState((prev) => ({
      ...prev,
      supplements: prev.supplements.filter((s) => s !== supplement),
    }));
  };

  const addWater = () => {
    setState((prev) => ({ ...prev, hydration: prev.hydration + 1 }));
  };

  const removeWater = () => {
    setState((prev) => ({ ...prev, hydration: Math.max(0, prev.hydration - 1) }));
  };

  const toggleSupplementComplete = (supplement: string) => {
    setState((prev) => {
      const exists = prev.completedSupplements.includes(supplement);
      if (exists) {
        return { ...prev, completedSupplements: prev.completedSupplements.filter((s) => s !== supplement) };
      }
      return { ...prev, completedSupplements: [...prev.completedSupplements, supplement] };
    });
  };

  const setAuth = (isAuthenticated: boolean, userId: string | null) => {
    setState((prev) => {
      if (prev.isAuthenticated === isAuthenticated && prev.userId === userId) {
        return prev;
      }
      return { ...prev, isAuthenticated, userId };
    });
  };

  const reset = () => {
    setState(defaultInitialState);
    localStorage.removeItem('micronutrient_app_state');
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateProfile,
        toggleSymptom,
        setSymptoms,
        addSupplement,
        removeSupplement,
        addWater,
        removeWater,
        toggleSupplementComplete,
        reset,
        setAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
