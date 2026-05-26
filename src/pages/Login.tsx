import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: `${firstName} ${lastName}` });
        
        // Temporarily bypassing email verification
        // await sendEmailVerification(userCred.user);
        // await signOut(auth); // Force log out until verified
        // setMessage('Account created! Please check your email inbox (and Spam folder) for the verification link to activate your account.');
        // setIsSignUp(false);
        navigate('/'); // Use RootRedirect to handle initial preferences gate
        
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        
        // Temporarily bypassing email verification
        // if (!userCred.user.emailVerified) {
        //   await signOut(auth);
        //   setError("Please verify your email address before logging in. Be sure to check your Spam folder if you don't see it in your inbox.");
        // } else {
          navigate('/'); // Use RootRedirect to handle initial preferences gate
        // }
      }
    } catch (err) {
      console.error("Auth Error:", err);
      // Clean up Firebase error messages for display
      const msg = err instanceof Error ? err.message : "An error occurred";
      setError(msg.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      console.error("Google Auth Error:", err);
      const msg = err instanceof Error ? err.message : "An error occurred with Google Sign-In";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent relative">
      <div className="p-6 pb-2 shrink-0">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-800">
            {isSignUp ? t('login.create_account') : t('login.title')}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {t('login.subtitle')}
          </p>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start text-red-800">
              <AlertCircle className="h-5 w-5 mr-3 shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          </motion.div>
        )}

        {message && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start text-emerald-800">
              <CheckCircle2 className="h-5 w-5 mr-3 shrink-0 mt-0.5" />
              <p className="text-sm">{message}</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignUp && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">First Name</label>
                  <input
                    type="text"
                    required={isSignUp}
                    disabled={loading}
                    placeholder="John"
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-brand focus:ring-0 outline-none transition-colors"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Last Name</label>
                  <input
                    type="text"
                    required={isSignUp}
                    disabled={loading}
                    placeholder="Doe"
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-brand focus:ring-0 outline-none transition-colors"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  required={isSignUp}
                  disabled={loading}
                  placeholder="+1 (555) 000-0000"
                  className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-brand focus:ring-0 outline-none transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">{t('login.email')}</label>
            <input
              type="email"
              required
              disabled={loading}
              placeholder="you@example.com"
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-brand focus:ring-0 outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">{t('login.password')}</label>
            <input
              type="password"
              required
              disabled={loading}
              placeholder="••••••••"
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-brand focus:ring-0 outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isSignUp && (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Verify Password</label>
              <input
                type="password"
                required={isSignUp}
                disabled={loading}
                placeholder="••••••••"
                className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-brand focus:ring-0 outline-none transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full shadow-brand/25 shadow-lg flex justify-center items-center mt-2"
            disabled={loading || !email || !password || (isSignUp && (!firstName || !lastName || !phone || !confirmPassword))}
          >
            {isSignUp ? (
              <><UserPlus className="w-5 h-5 mr-2" /> {loading ? t('login.creating') : t('login.create_account')}</>
            ) : (
              <><LogIn className="w-5 h-5 mr-2" /> {loading ? t('login.signing_in') : t('login.sign_in')}</>
            )}
          </Button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">Or continue with</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full p-4 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-xl flex items-center justify-center space-x-3 transition-colors disabled:opacity-50"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google Logic" 
            className="w-5 h-5" 
          />
          <span className="font-semibold text-slate-700">Google</span>
        </button>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setMessage(null);
            }}
            className="text-sm text-brand font-medium hover:underline"
          >
            {isSignUp 
              ? t('login.have_account') 
              : t('login.need_account')}
          </button>
        </div>
      </div>
    </div>
  );
}
