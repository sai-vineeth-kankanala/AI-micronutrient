import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppProvider, useAppStore } from './lib/store';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { MobileLayout } from './components/MobileLayout';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Symptoms } from './pages/Symptoms';
import { Supplements } from './pages/Supplements';
import { Results } from './pages/Results';
import { Dashboard } from './pages/Dashboard';
import { Preferences } from './pages/Preferences';

function RootRedirect() {
  const { state: { isAuthenticated, profile } } = useAppStore();
  if (!isAuthenticated) return <Onboarding />;
  if (!profile.language || !profile.region) return <Navigate to="/preferences" replace />;
  if (!profile.age) return <Navigate to="/profile" replace />;
  return <Navigate to="/dashboard" replace />;
}

function AppRouter() {
  const { setAuth, state: { profile } } = useAppStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (profile.language) {
      let code = 'en';
      if (profile.language === 'Spanish') code = 'es';
      if (profile.language === 'Hindi') code = 'hi';
      if (i18n.language !== code) {
        i18n.changeLanguage(code);
      }
    }
  }, [profile.language, i18n]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(true, user.uid);
      } else {
        setAuth(false, null);
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/supplements" element={<Supplements />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
