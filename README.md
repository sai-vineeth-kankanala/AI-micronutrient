# AI Micronutrient App

A premium, interactive mobile-first React application designed to analyze your micronutrient needs and provide personalized recommendations based on symptoms, diet, lifestyle, and goals.

## ✨ Features

- 🌌 **Premium 3D Shader Background**: Built with Three.js/React Three Fiber utilizing custom procedural fragment/vertex shaders for an organic, responsive visual flow.
- 📱 **Mobile-First Layout**: Fits perfectly into a premium device frame with smooth animations and transitions powered by Framer Motion.
- 🌐 **Multilingual Support**: Fully localized in English, Spanish, and Hindi with immediate translations via i18next.
- 📋 **Detailed Personal Profiling**: Dynamically captures user details including age, gender, life stage, activity levels, diet types, allergies, and pre-existing medical conditions.
- 🩺 **Intelligent Symptom Checker**: Select from a comprehensive list of symptoms to evaluate potential vitamin and mineral deficiencies.
- 💊 **Supplement & Hydration Trackers**: Track daily intake and manage hydration goals dynamically with clean, modern micro-interactions.

---

## 📸 Screenshots

### 1. Onboarding Screen
Features our premium interactive 3D WebGL background shader and clean Material 3 design elements.
![Onboarding Screen](screenshots/onboarding.png)

### 2. Welcome & Authentication
Secure login and sign-up pages using Firebase authentication.
![Login & Authentication](screenshots/login.png)

### 3. Setup Preferences
Select your preferred language (English, Spanish, Hindi) and country.
![Setup Preferences](screenshots/preferences.png)

### 4. Basic Info & Profiling
Provide age, gender, and current life stage to calibrate the analysis.
![Basic Info & Profiling](screenshots/profile.png)

### 5. Symptom Checker
A comprehensive interface to select any symptoms currently being experienced.
![Symptom Checker](screenshots/symptoms.png)

### 6. Current Supplement Logging
Log supplements you are already taking to ensure precise recommendations.
![Current Supplements](screenshots/supplements.png)

### 7. Interactive Dashboard
Track your daily supplements and log hydration with an interactive animated droplet counter.
![Interactive Dashboard](screenshots/dashboard.png)

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Localization**: i18next
- **Database / Auth**: Firebase

---

## 🚀 Setup & Execution

### Prerequisites
Make sure you have Node.js installed.

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Running Locally
To launch the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
To compile a optimized production bundle:
```bash
npm run build
```
