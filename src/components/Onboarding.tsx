import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Sun, ArrowRight, CheckCircle2, Award, Target, DollarSign, 
  User, Settings, Sparkles, Loader2, ChevronRight, ChevronLeft
} from 'lucide-react';
import { INITIAL_CERTIFICATIONS } from '../constants';
import { UserRole } from '../types';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
}

export const Onboarding: React.FC = () => {
  const { currentUser } = useAuth();
  const { updateData } = useData();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    role: UserRole.ADMIN,
    goals: [] as string[],
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    primaryGoal: 'certification' as 'certification' | 'career' | 'business',
  });

  const goalOptions = [
    { id: 'nabcep', label: 'NABCEP Certification', icon: Award },
    { id: 'career', label: 'Career Advancement', icon: Target },
    { id: 'business', label: 'Start Solar Business', icon: DollarSign },
    { id: 'skills', label: 'Learn Technical Skills', icon: Sparkles },
  ];

  useEffect(() => {
    // Load existing onboarding state
    if (currentUser) {
      loadOnboardingState();
    }
  }, [currentUser]);

  const loadOnboardingState = async () => {
    if (!currentUser) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.onboarding?.currentStep !== undefined) {
          setCurrentStep(data.onboarding.currentStep);
        }
        if (data.profile?.displayName) {
          setFormData(prev => ({ ...prev, displayName: data.profile.displayName }));
        }
      }
    } catch (error) {
      console.error('Error loading onboarding state:', error);
    }
  };

  const updateOnboardingState = async (step: number, completed: boolean = false) => {
    if (!currentUser) return;
    
    const userId = currentUser.uid;
    const userRef = doc(db, 'users', userId);
    
    const updateData: any = {
      'onboarding.currentStep': step,
      'onboarding.completedSteps': completed ? [0, 1, 2, 3, 4] : Array.from({ length: step + 1 }, (_, i) => i),
      updatedAt: new Date().toISOString(),
    };

    if (completed) {
      updateData['onboarding.completed'] = true;
      updateData['onboarding.completedAt'] = new Date().toISOString();
    }

    if (!completed && step === 0) {
      updateData['onboarding.startedAt'] = new Date().toISOString();
    }

    await updateDoc(userRef, updateData);
  };

  const initializeUserData = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const userId = currentUser.uid;
      const userRef = doc(db, 'users', userId);

      // Initialize user document with profile and settings
      await setDoc(userRef, {
        profile: {
          displayName: formData.displayName || currentUser.displayName || 'User',
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || null,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        },
        settings: {
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            weeklyRecap: true,
          },
          defaultView: 'dashboard',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        userRole: formData.role,
        syncSettings: {
          externalAppUrl: '',
          isConnected: false,
          lastSync: null,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      }, { merge: true });

      // Initialize default certifications
      for (const cert of INITIAL_CERTIFICATIONS) {
        await setDoc(doc(db, 'users', userId, 'certifications', cert.id), {
          ...cert,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      // Mark onboarding as complete
      await updateOnboardingState(4, true);

      // Reload page to show dashboard
      window.location.reload();
    } catch (error) {
      console.error('Error initializing user data:', error);
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      await updateOnboardingState(nextStep);
    } else {
      await initializeUserData();
    }
  };

  const handleBack = async () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      await updateOnboardingState(prevStep);
    }
  };

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const steps: OnboardingStep[] = [
    {
      id: 0,
      title: 'Welcome to SolarCareer.Pro',
      description: 'Let\'s get you set up in just a few steps',
      component: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-solar-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
            <Sun className="w-12 h-12 text-white fill-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Welcome to Your Solar Career Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-md mx-auto">
              We'll help you track certifications, manage finances, and accelerate your growth with AI-powered insights.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: 'Tell us about yourself',
      description: 'Help us personalize your experience',
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
              placeholder={currentUser?.displayName || 'Enter your name'}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-electric-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Experience Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level }))}
                  className={`px-4 py-3 rounded-xl border-2 transition-all ${
                    formData.experienceLevel === level
                      ? 'border-electric-500 bg-electric-50 text-electric-700 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'What are your goals?',
      description: 'Select all that apply',
      component: (
        <div className="space-y-4">
          {goalOptions.map((goal) => {
            const Icon = goal.icon;
            const isSelected = formData.goals.includes(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-electric-500 bg-electric-50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-electric-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-slate-900">{goal.label}</span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-electric-500 ml-auto" />}
                </div>
              </button>
            );
          })}
        </div>
      ),
    },
    {
      id: 3,
      title: 'Primary Focus',
      description: 'What\'s your main objective?',
      component: (
        <div className="space-y-4">
          {([
            { id: 'certification', label: 'Get Certified', desc: 'Earn NABCEP certifications' },
            { id: 'career', label: 'Advance Career', desc: 'Grow in the solar industry' },
            { id: 'business', label: 'Start Business', desc: 'Launch your solar company' },
          ] as const).map((option) => (
            <button
              key={option.id}
              onClick={() => setFormData(prev => ({ ...prev, primaryGoal: option.id }))}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                formData.primaryGoal === option.id
                  ? 'border-electric-500 bg-electric-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="font-semibold text-slate-900 text-lg mb-1">{option.label}</div>
              <div className="text-sm text-slate-600">{option.desc}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: 4,
      title: 'You\'re all set!',
      description: 'Let\'s get started',
      component: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Ready to Transform Your Career
            </h2>
            <p className="text-lg text-slate-600 max-w-md mx-auto">
              We've set up your account with default certifications and are ready to help you achieve your goals.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-slate-900 mb-3">What's next:</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Explore your dashboard</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Review your certification goals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Set up your financial tracking</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-semibold text-slate-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-electric-500 to-electric-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-lg text-slate-600">
              {currentStepData.description}
            </p>
          </div>

          <div className="min-h-[300px] mb-8">
            {currentStepData.component}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || loading}
              className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={loading || (currentStep === 1 && !formData.displayName)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-electric-500 to-electric-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Setting up...</span>
                </>
              ) : currentStep === 4 ? (
                <>
                  <span>Get Started</span>
                  <Sparkles className="w-5 h-5" />
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

