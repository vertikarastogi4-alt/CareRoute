import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Referral, PatientConstraints, MatchedFacility } from '@/types';
import { sampleReferrals, demoReferral, demoConstraints } from '@/data/mockData';
import { matchFacilities } from '@/utils/matching';

interface AppContextValue {
  referrals: Referral[];
  activeReferral: Referral | null;
  constraints: PatientConstraints | null;
  matches: MatchedFacility[];
  selectedFacilityId: string | null;
  createReferral: (referral: Omit<Referral, 'id' | 'createdAt' | 'expiresAt' | 'status' | 'secureLink' | 'doctorName' | 'doctorId' | 'clinic'>) => Referral;
  setActiveReferral: (referral: Referral | null) => void;
  setConstraints: (constraints: PatientConstraints) => void;
  runMatching: (referral: Referral, constraints: PatientConstraints) => void;
  setSelectedFacilityId: (id: string | null) => void;
  loadDemo: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [referrals, setReferrals] = useState<Referral[]>(sampleReferrals);
  const [activeReferral, setActiveReferralState] = useState<Referral | null>(null);
  const [constraints, setConstraintsState] = useState<PatientConstraints | null>(null);
  const [matches, setMatches] = useState<MatchedFacility[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  const createReferral = useCallback(
    (data: Omit<Referral, 'id' | 'createdAt' | 'expiresAt' | 'status' | 'secureLink' | 'doctorName' | 'doctorId' | 'clinic'>) => {
      const id = `REF-CR-2024-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      const now = new Date();
      const expires = new Date(now);
      expires.setDate(expires.getDate() + 15);

      const referral: Referral = {
        ...data,
        id,
        doctorName: 'Dr. Anjali Verma',
        doctorId: 'DOC-2024-001',
        clinic: 'Wellness Neurology Clinic',
        createdAt: now.toISOString().split('T')[0],
        expiresAt: expires.toISOString().split('T')[0],
        status: 'active',
        secureLink: `/patient/ref/${id}`,
      };

      setReferrals((prev) => [referral, ...prev]);
      return referral;
    },
    []
  );

  const setActiveReferral = useCallback((referral: Referral | null) => {
    setActiveReferralState(referral);
  }, []);

  const setConstraints = useCallback((c: PatientConstraints) => {
    setConstraintsState(c);
  }, []);

  const runMatching = useCallback((referral: Referral, c: PatientConstraints) => {
    setConstraintsState(c);
    const results = matchFacilities(referral, c);
    setMatches(results);
  }, []);

  const loadDemo = useCallback(() => {
    setActiveReferralState(demoReferral);
    setConstraintsState(demoConstraints);
    const results = matchFacilities(demoReferral, demoConstraints);
    setMatches(results);
  }, []);

  return (
    <AppContext.Provider
      value={{
        referrals,
        activeReferral,
        constraints,
        matches,
        selectedFacilityId,
        createReferral,
        setActiveReferral,
        setConstraints,
        runMatching,
        setSelectedFacilityId,
        loadDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
