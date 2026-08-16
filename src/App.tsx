import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { ToastContainer } from '@/components/Toast';
import { PublicLayout } from '@/components/PublicLayout';
import { LandingPage } from '@/pages/LandingPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { AboutPage } from '@/pages/AboutPage';
import { DoctorDashboard } from '@/pages/doctor/DoctorDashboard';
import { CreateReferralPage } from '@/pages/doctor/CreateReferralPage';
import { ReferralsListPage } from '@/pages/doctor/ReferralsListPage';
import { PatientsPage } from '@/pages/doctor/PatientsPage';
import { DoctorProfilePage } from '@/pages/doctor/DoctorProfilePage';
import { PatientPortalPage } from '@/pages/patient/PatientPortalPage';
import { ResultsPage } from '@/pages/patient/ResultsPage';
import { FacilityDetailsPage } from '@/pages/patient/FacilityDetailsPage';
import { AlternativePathwayPage } from '@/pages/patient/AlternativePathwayPage';
import {
  FacilityPortalPage,
  FacilityProfilePage,
  FacilityServicesPage,
  FacilityPricingPage,
  FacilityAvailabilityPage,
  FacilityVerificationPage,
  FacilityReferralsPage,
} from '@/pages/facility/FacilityPortalPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public pages with navbar + footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Doctor Portal */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/create-referral" element={<CreateReferralPage />} />
          <Route path="/doctor/referrals" element={<ReferralsListPage />} />
          <Route path="/doctor/patients" element={<PatientsPage />} />
          <Route path="/doctor/profile" element={<DoctorProfilePage />} />

          {/* Patient Portal */}
          <Route path="/patient" element={<PatientPortalPage />} />
          <Route path="/patient/ref/:refId" element={<PatientPortalPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/facility-details" element={<FacilityDetailsPage />} />
          <Route path="/alternative-pathway" element={<AlternativePathwayPage />} />

          {/* Facility Portal */}
          <Route path="/facility" element={<FacilityPortalPage />} />
          <Route path="/facility/profile" element={<FacilityProfilePage />} />
          <Route path="/facility/services" element={<FacilityServicesPage />} />
          <Route path="/facility/pricing" element={<FacilityPricingPage />} />
          <Route path="/facility/availability" element={<FacilityAvailabilityPage />} />
          <Route path="/facility/verification" element={<FacilityVerificationPage />} />
          <Route path="/facility/referrals" element={<FacilityReferralsPage />} />

          {/* Admin / Public Health Dashboard */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/analytics" element={<AdminDashboardPage />} />
          <Route path="/admin/coverage" element={<AdminDashboardPage />} />
        </Routes>
        <ToastContainer />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
