# AI Micronutrient App

This project implements an interactive mobile-first React application designed to analyze your micronutrient needs and provide personalized recommendations based on symptoms, diet, lifestyle, and goals.

## How to run
1. Clone the repository and install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Run the development server locally:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.
4. Configure setup preferences and complete your profile to explore recommendations.

## Features
- **WebGL Shader Background**: Premium animated background using Three.js fragment/vertex shaders.
- **Multilingual Support**: Fully localized in English, Spanish, and Hindi via i18next.
- **Personalized Analyzer Engine**: Country-specific diet adjustments and daylight-calculated Vitamin D logic.
- **Dynamic Symptom Tracker**: Comprehensive checks to identify potential vitamin and mineral deficiencies.

## Project Outputs
- **Onboarding Page**: Premium interactive WebGL animated landing sequence.
  ![Onboarding Screen](screenshots/onboarding.png)
- **Login / Auth**: Secure authentication forms powered by Firebase.
  ![Login Screen](screenshots/login.png)
- **Setup Preferences**: Language and country region selectors.
  ![Preferences](screenshots/preferences.png)
- **Profile Setup**: Basic demographics, life stage, activity, and dietary profiling.
  ![Profile](screenshots/profile.png)
- **Symptom Checklist**: Dynamic check selection interface.
  ![Symptoms](screenshots/symptoms.png)
- **Current Supplements**: Form to log active daily supplements.
  ![Supplements](screenshots/supplements.png)
- **Interactive Dashboard**: Nutrient status tracking and animated water droplet tracker.
  ![Dashboard](screenshots/dashboard.png)
