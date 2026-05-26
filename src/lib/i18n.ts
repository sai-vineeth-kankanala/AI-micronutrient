import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "onboarding": {
        "title": "Check Your \n Nutrient Status",
        "subtitle": "Discover what your body needs based on your unique symptoms, diet, and biological profile.",
        "health_scan": "Health Scan",
        "health_scan_desc": "AI-powered symptom analysis",
        "plan": "Personalized Plan",
        "plan_desc": "Food & supplement roadmap",
        "get_started": "Get started",
        "sign_in": "Sign in to your account"
      },
      "login": {
        "title": "Welcome Back",
        "subtitle": "Sign in to continue your nutrient journey",
        "email": "Email Address",
        "password": "Password",
        "sign_in": "Sign In",
        "signing_in": "Signing In...",
        "create_account": "Create Account",
        "creating": "Creating Account...",
        "need_account": "Don't have an account? Sign up",
        "have_account": "Already have an account? Sign in",
        "continue_guest": "Continue as Guest"
      },
      "preferences": {
        "title": "Setup Preferences",
        "subtitle": "Choose your language and region to personalize your experience",
        "language": "Language",
        "country": "Country",
        "continue": "Continue"
      },
      "dashboard": {
        "hello": "Hello,",
        "subtitle": "Here is your daily action plan",
        "daily_supplements": "Daily Supplements",
        "no_supplements": "No supplements recommended yet.",
        "complete_profile": "Complete your profile and run the analyzer!",
        "hydration": "Hydration Tracker",
        "glasses": "glasses"
      },
      "profile": {
        "title": "About You",
        "subtitle": "Help us personalize your analysis",
        "basic_info": "1. Basic Info",
        "age": "Age",
        "gender": "Gender",
        "life_stage": "Current Life Stage",
        "lifestyle": "2. Lifestyle & Goals",
        "activity": "Activity Level",
        "goal": "Primary Goal",
        "sun": "Daily Sun Exposure",
        "diet": "3. Dietary & Health",
        "diet_type": "Diet Type",
        "allergies": "Allergies / Intolerances",
        "conditions": "Medical Conditions",
        "options": {
          "gender": {
            "male": "Male",
            "female": "Female",
            "non-binary": "Non-binary",
            "prefer-not-to-say": "Prefer not to say"
          },
          "life_stage": {
            "general": "General Adult",
            "pregnancy": "Pregnancy",
            "breastfeeding": "Breastfeeding",
            "postpartum": "Postpartum",
            "menopause": "Menopause",
            "post-surgery": "Post Surgery",
            "athlete": "Athlete",
            "senior": "Senior (65+)",
            "teen": "Teenager (13-19)",
            "child": "Child (under 13)"
          },
          "diet": {
            "vegan": "Vegan",
            "vegetarian": "Vegetarian",
            "pescatarian": "Pescatarian",
            "omnivore": "Omnivore",
            "keto": "Keto",
            "paleo": "Paleo",
            "mediterranean": "Mediterranean",
            "carnivore": "Carnivore",
            "flexitarian": "Flexitarian",
            "plant-based": "Whole Food Plant-Based",
            "dash": "DASH Diet",
            "low-fodmap": "Low FODMAP"
          },
          "activity": {
            "sedentary": "Sedentary (Little to no exercise)",
            "lightly active": "Lightly Active (1-3 days/week)",
            "moderately active": "Moderately Active (3-5 days/week)",
            "very active": "Very Active (6-7 days/week)",
            "extremely active": "Extremely Active (Physical job/2x day)"
          },
          "goal": {
            "maintain": "Maintain Health",
            "lose weight": "Lose Weight",
            "gain muscle": "Gain Muscle",
            "improve energy": "Improve Energy",
            "general health": "General Health",
            "improve immunity": "Improve Immunity",
            "gut health": "Gut Health / Digestion",
            "better sleep": "Better Sleep",
            "mental clarity": "Mental Clarity / Focus",
            "sports performance": "Sports Performance",
            "skin health": "Skin, Hair & Nails",
            "reduce inflammation": "Reduce Inflammation",
            "longevity": "Longevity / Anti-aging",
            "heart health": "Heart Health",
            "bone health": "Bone Health"
          },
          "sun": {
            "high": "High (Frequently outdoors)",
            "moderate": "Moderate (Some daily sun)",
            "low": "Low (Mostly indoors)",
            "very high": "Very High (Outdoor worker)",
            "none": "None (Always covered/no sun)"
          },
          "conditions": {
            "none": "None",
            "diabetes-1": "Diabetes Type 1",
            "diabetes-2": "Diabetes Type 2",
            "hypertension": "Hypertension (High Blood Pressure)",
            "heart-disease": "Heart Disease",
            "celiac": "Celiac Disease",
            "ibs": "Irritable Bowel Syndrome (IBS)",
            "pcos": "Polycystic Ovary Syndrome (PCOS)",
            "hypothyroid": "Hypothyroidism",
            "hyperthyroid": "Hyperthyroidism",
            "anemia": "Anemia",
            "osteoporosis": "Osteoporosis",
            "kidney": "Kidney Disease",
            "liver": "Liver Disease",
            "autoimmune": "Autoimmune Condition",
            "fatigue": "Chronic Fatigue Syndrome"
          },
          "allergies": {
            "none": "None",
            "dairy": "Dairy / Lactose",
            "gluten": "Gluten / Wheat",
            "peanuts": "Peanuts",
            "tree-nuts": "Tree Nuts",
            "soy": "Soy",
            "shellfish": "Shellfish",
            "fish": "Fish",
            "eggs": "Eggs",
            "sesame": "Sesame"
          }
        }
      },
      "common": {
        "search": "Search...",
        "select": "Select an option",
        "continue": "Continue"
      }
    }
  },
  es: {
    translation: {
      "onboarding": {
        "title": "Verifique su \n Estado Nutricional",
        "subtitle": "Descubra lo que su cuerpo necesita en función de sus síntomas únicos, dieta y perfil biológico.",
        "health_scan": "Escaneo de Salud",
        "health_scan_desc": "Análisis de síntomas por IA",
        "plan": "Plan Personalizado",
        "plan_desc": "Hoja de ruta de alimentos y suplementos",
        "get_started": "Empezar",
        "sign_in": "Inicie sesión en su cuenta"
      },
      "login": {
        "title": "Bienvenido de Nuevo",
        "subtitle": "Inicie sesión para continuar su viaje nutricional",
        "email": "Correo Electrónico",
        "password": "Contraseña",
        "sign_in": "Iniciar Sesión",
        "signing_in": "Iniciando Sesión...",
        "create_account": "Crear Cuenta",
        "creating": "Creando Cuenta...",
        "need_account": "¿No tiene una cuenta? Regístrese",
        "have_account": "¿Ya tiene una cuenta? Iniciar Sesión",
        "continue_guest": "Continuar como Invitado"
      },
      "preferences": {
        "title": "Configurar Preferencias",
        "subtitle": "Elija su idioma y región para personalizar su experiencia",
        "language": "Idioma",
        "country": "País",
        "continue": "Continuar"
      },
      "dashboard": {
        "hello": "Hola,",
        "subtitle": "Aquí está tu plan de acción diario",
        "daily_supplements": "Suplementos Diarios",
        "no_supplements": "No se recomiendan suplementos aún.",
        "complete_profile": "¡Complete su perfil y ejecute el analizador!",
        "hydration": "Seguimiento de Hidratación",
        "glasses": "vasos"
      },
      "profile": {
        "title": "Sobre ti",
        "subtitle": "Ayúdanos a personalizar tu análisis",
        "basic_info": "1. Información Básica",
        "age": "Edad",
        "gender": "Género",
        "life_stage": "Etapa de Vida",
        "lifestyle": "2. Estilo de vida y metas",
        "activity": "Nivel de Actividad",
        "goal": "Meta Principal",
        "sun": "Exposición Solar",
        "diet": "3. Dieta y Salud",
        "diet_type": "Tipo de Dieta",
        "allergies": "Alergias / Intolerancias",
        "conditions": "Condiciones Médicas",
        "options": {
          "gender": {
            "male": "Hombre",
            "female": "Mujer",
            "non-binary": "No binario",
            "prefer-not-to-say": "Prefiero no decirlo"
          },
          "life_stage": {
            "general": "Adulto General",
            "pregnancy": "Embarazo",
            "breastfeeding": "Lactancia",
            "postpartum": "Posparto",
            "menopause": "Menopausia",
            "post-surgery": "Postoperatorio",
            "athlete": "Atleta",
            "senior": "Adulto Mayor (65+)",
            "teen": "Adolescente (13-19)",
            "child": "Niño (menor de 13)"
          },
          "diet": {
            "vegan": "Vegano",
            "vegetarian": "Vegetariano",
            "pescatarian": "Pescatariano",
            "omnivore": "Omnívoro",
            "keto": "Ceto",
            "paleo": "Paleo",
            "mediterranean": "Mediterránea",
            "carnivore": "Carnívoro",
            "flexitarian": "Flexitariano",
            "plant-based": "Basado en plantas orgánicas",
            "dash": "Dieta DASH",
            "low-fodmap": "Baja en FODMAP"
          },
          "activity": {
            "sedentary": "Sedentario (Poco o ningún ejercicio)",
            "lightly active": "Ligeramente Activo (1-3 días/semana)",
            "moderately active": "Moderadamente Activo (3-5 días/semana)",
            "very active": "Muy Activo (6-7 días/semana)",
            "extremely active": "Extremadamente Activo (Trabajo físico/entrenamiento)"
          },
          "goal": {
            "maintain": "Mantener Salud",
            "lose weight": "Perder Peso",
            "gain muscle": "Ganar Músculo",
            "improve energy": "Mejorar la Energía",
            "general health": "Salud General",
            "improve immunity": "Mejorar la Inmunidad",
            "gut health": "Salud Intestinal / Digestión",
            "better sleep": "Mejorar el Sueño",
            "mental clarity": "Claridad Mental / Enfoque",
            "sports performance": "Rendimiento Deportivo",
            "skin health": "Piel, Cabello y Uñas",
            "reduce inflammation": "Reducir la Inflamación",
            "longevity": "Longevidad / Antienvejecimiento",
            "heart health": "Salud del Corazón",
            "bone health": "Salud Ósea"
          },
          "sun": {
            "high": "Alta (Frecuentemente al aire libre)",
            "moderate": "Moderada (Poco sol diario)",
            "low": "Baja (Mayormente en interiores)",
            "very high": "Muy Alta (Trabajador al aire libre)",
            "none": "Ninguna (Siempre cubierto/sin sol)"
          },
          "conditions": {
            "none": "Ninguna",
            "diabetes-1": "Diabetes Tipo 1",
            "diabetes-2": "Diabetes Tipo 2",
            "hypertension": "Hipertensión (Presión Arterial Alta)",
            "heart-disease": "Enfermedad Cardíaca",
            "celiac": "Enfermedad Celíaca",
            "ibs": "Síndrome del Intestino Irritable (SII)",
            "pcos": "Síndrome de Ovario Poliquístico (SOP)",
            "hypothyroid": "Hipotiroidismo",
            "hyperthyroid": "Hipertiroidismo",
            "anemia": "Anemia",
            "osteoporosis": "Osteoporosis",
            "kidney": "Enfermedad Renal",
            "liver": "Enfermedad Hepática",
            "autoimmune": "Condición Autoinmune",
            "fatigue": "Síndrome de Fatiga Crónica"
          },
          "allergies": {
            "none": "Ninguna",
            "dairy": "Lácteos / Lactosa",
            "gluten": "Gluten / Trigo",
            "peanuts": "Maní / Cacahuetes",
            "tree-nuts": "Nueces de árbol",
            "soy": "Soya",
            "shellfish": "Mariscos",
            "fish": "Pescado",
            "eggs": "Huevos",
            "sesame": "Sésamo"
          }
        }
      },
      "common": {
        "search": "Buscar...",
        "select": "Seleccione una opción",
        "continue": "Continuar"
      }
    }
  },
  hi: {
    translation: {
      "onboarding": {
        "title": "अपनी पोषण स्थिति \n की जाँच करें",
        "subtitle": "पता लगाएँ कि आपके शरीर को आपके अद्वितीय लक्षणों, आहार और जैविक प्रोफ़ाइल के आधार पर क्या चाहिए।",
        "health_scan": "स्वास्थ्य स्कैन",
        "health_scan_desc": "एआई-संचालित लक्षण विश्लेषण",
        "plan": "व्यक्तिगत योजना",
        "plan_desc": "भोजन और पूरक रोडमैप",
        "get_started": "शुरू करें",
        "sign_in": "अपने खाते में साइन इन करें"
      },
      "login": {
        "title": "वापसी पर स्वागत है",
        "subtitle": "अपनी पोषण यात्रा जारी रखने के लिए साइन इन करें",
        "email": "ईमेल पता",
        "password": "पासवर्ड",
        "sign_in": "साइन इन करें",
        "signing_in": "साइन कर रहा है...",
        "create_account": "खाता बनाएं",
        "creating": "खाता बना रहा है...",
        "need_account": "खाता नहीं है? साइन अप करें",
        "have_account": "पहले से खाता है? साइन इन करें",
        "continue_guest": "अतिथि के रूप में जारी रखें"
      },
      "preferences": {
        "title": "प्राथमिकताएं सेट करें",
        "subtitle": "अपने अनुभव को व्यक्तिगत बनाने के लिए अपनी भाषा और क्षेत्र चुनें",
        "language": "भाषा",
        "country": "देश",
        "continue": "जारी रखें"
      },
      "dashboard": {
        "hello": "नमस्ते,",
        "subtitle": "यह आपकी दैनिक कार्य योजना है",
        "daily_supplements": "दैनिक पूरक",
        "no_supplements": "अभी कोई पूरक अनुशंसित नहीं है।",
        "complete_profile": "अपनी प्रोफ़ाइल पूरी करें और विश्लेषक चलाएं!",
        "hydration": "जलयोजन ट्रैकर",
        "glasses": "ग्लास"
      },
      "profile": {
        "title": "आपके बारे में",
        "subtitle": "अपने विश्लेषण को व्यक्तिगत बनाने में हमारी मदद करें",
        "basic_info": "1. मूल जानकारी",
        "age": "आयु",
        "gender": "लिंग",
        "life_stage": "वर्तमान जीवन चरण",
        "lifestyle": "2. जीवन शैली और लक्ष्य",
        "activity": "गतिविधि स्तर",
        "goal": "प्राथमिक लक्ष्य",
        "sun": "दैनिक धूप",
        "diet": "3. आहार और स्वास्थ्य",
        "diet_type": "आहार प्रकार",
        "allergies": "एलर्जी / असहिष्णुता",
        "conditions": "चिकित्सा स्थितियां",
        "options": {
          "gender": {
            "male": "नर",
            "female": "महिला",
            "non-binary": "गैर-बाइनरी",
            "prefer-not-to-say": "कहना नहीं चाहता"
          },
          "life_stage": {
            "general": "सामान्य वयस्क",
            "pregnancy": "गर्भावस्था",
            "breastfeeding": "स्तनपान",
            "postpartum": "प्रसवोत्तर",
            "menopause": "रजोनिवृत्ति",
            "post-surgery": "सर्जरी के बाद",
            "athlete": "व्यायाम करनेवाला",
            "senior": "वरिष्ठ नागरिक (65+)",
            "teen": "किशोरी (13-19)",
            "child": "बच्चा (13 से कम)"
          },
          "diet": {
            "vegan": "शाकाहारी (वीगन)",
            "vegetarian": "शाकाहारी",
            "pescatarian": "पेसिटेरियन",
            "omnivore": "सर्वाहारी",
            "keto": "कीटो",
            "paleo": "पैलियो",
            "mediterranean": "भूमध्य",
            "carnivore": "मांसाहारी",
            "flexitarian": "सुविधाजनक शाकाहारी",
            "plant-based": "संयंत्र आधारित",
            "dash": "डैश आहार",
            "low-fodmap": "कम FODMAP"
          },
          "activity": {
            "sedentary": "आसीन (व्यायाम नहीं)",
            "lightly active": "थोड़ा सक्रिय (सप्ताह में 1-3 दिन)",
            "moderately active": "मध्यम सक्रिय (सप्ताह में 3-5 दिन)",
            "very active": "बहुत सक्रिय (सप्ताह में 6-7 दिन)",
            "extremely active": "अत्यंत सक्रिय (दैनिक श्रम)"
          },
          "goal": {
            "maintain": "स्वास्थ्य बनाए रखें",
            "lose weight": "वजन घटाएं",
            "gain muscle": "मांसपेशी बढ़ाएं",
            "improve energy": "ऊर्जा बढ़ाएं",
            "general health": "सामान्य स्वास्थ्य",
            "improve immunity": "प्रतिरक्षा में सुधार",
            "gut health": "पाचन स्वास्थ्य",
            "better sleep": "बेहतर नींद",
            "mental clarity": "मानसिक स्पष्टता",
            "sports performance": "खेल प्रदर्शन",
            "skin health": "त्वचा, बाल और नाखून",
            "reduce inflammation": "सूजन कम करें",
            "longevity": "दीर्घायु",
            "heart health": "हृदय स्वास्थ्य",
            "bone health": "हड्डी का स्वास्थ्य"
          },
          "sun": {
            "high": "उच्च (अक्सर बाहर)",
            "moderate": "मध्यम (दैनिक धूप)",
            "low": "कम (ज्यादातर घर के अंदर)",
            "very high": "बहुत उच्च (कार्यकर्ता)",
            "none": "कुछ नहीं (हमेशा ढके हुए)"
          },
          "conditions": {
            "none": "कोई नहीं",
            "diabetes-1": "मधुमेह प्रकार 1",
            "diabetes-2": "मधुमेह प्रकार 2",
            "hypertension": "उच्च रक्तचाप",
            "heart-disease": "हृदय रोग",
            "celiac": "सीलिएक रोग",
            "ibs": "आईबीएस",
            "pcos": "पीसीओएस",
            "hypothyroid": "हाइपोथायरायडिज्म",
            "hyperthyroid": "हाइपरथायरायडिज्म",
            "anemia": "रक्त की कमी",
            "osteoporosis": "ऑस्टियोपोरोसिस",
            "kidney": "गुर्दे की बीमारी",
            "liver": "जिगर की बीमारी",
            "autoimmune": "स्व - प्रतिरक्षित रोग",
            "fatigue": "पुरानी थकान"
          },
          "allergies": {
            "none": "कोई नहीं",
            "dairy": "डेयरी उत्पाद",
            "gluten": "ग्लूटेन / गेहूं",
            "peanuts": "मूंगफली",
            "tree-nuts": "पेड़ के नट्स",
            "soy": "सोया",
            "shellfish": "कस्तूरा",
            "fish": "मछली",
            "eggs": "अंडे",
            "sesame": "तिल"
          }
        }
      },
      "common": {
        "search": "खोजें...",
        "select": "एक विकल्प चुनें",
        "continue": "जारी रखें"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
