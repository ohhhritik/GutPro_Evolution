import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Assessment from './components/Assessment';
import Pricing from './components/Pricing';
import Education from './components/Education';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';

// Simple Hero Component internal to App for simplicity
const Hero = ({ onStart }: { onStart: () => void }) => (
  <div className="relative bg-gradient-to-b from-teal-50 to-white pt-10 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
        Decode Your <span className="text-teal-600">Microbiome</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10">
        GutPro Evolution uses advanced AI to analyze your lifestyle, diet, and medical history to prescribe the exact probiotic strains your body needs.
      </p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={onStart}
          className="bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-teal-700 transition shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          Take Free Assessment
        </button>
        <a href="#pricing" className="bg-white text-teal-700 border border-teal-100 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition shadow-sm">
          View Plans
        </a>
      </div>
    </div>
    
    {/* Decorative background blobs */}
    <div className="absolute top-0 left-0 -ml-20 -mt-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h4 className="text-white text-lg font-bold mb-4">GutPro Evolution</h4>
        <p className="text-sm">Revolutionizing gut health through artificial intelligence and clinical precision.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Product</h4>
        <ul className="space-y-2 text-sm">
          <li>Assessment</li>
          <li>Our Science</li>
          <li>Reviews</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Support</h4>
        <ul className="space-y-2 text-sm">
          <li>FAQ</li>
          <li>Contact Doctors</li>
          <li>Shipping</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
    </div>
  </footer>
);

// Wrapper for the Landing Page flow
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Hero onStart={() => navigate('/assessment')} />
      <Education />
      <Pricing />
      <div className="py-20 bg-teal-900 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Doctors Trust Data. We Provide It.</h2>
        <button onClick={() => navigate('/doctors')} className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-teal-900 transition font-bold">
          Partner Portal for Clinicians
        </button>
      </div>
    </>
  );
};

// Wrapper for Assessment Page
const AssessmentPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Assessment onComplete={() => console.log("Assessment completed")} />
    </div>
  );
};

const DoctorPage = () => (
    <div className="min-h-screen bg-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">For Healthcare Professionals</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Access clinical dashboards, patient adherence tracking, and bulk pricing for your practice.</p>
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 inline-block rounded-lg">
            <p className="font-bold text-yellow-800">Portal currently in closed beta.</p>
        </div>
    </div>
)

const App: React.FC = () => {
  // Using HashRouter because we don't have server-side routing config
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  // Simple check for active tab highlighting
  const [currentTab, setCurrentTab] = useState('home');

  const handleNav = (page: string) => {
    setCurrentTab(page);
    if (page === 'home') navigate('/');
    else if (page === 'assessment') navigate('/assessment');
    else if (page === 'pricing') {
        navigate('/');
        setTimeout(() => {
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
    else if (page === 'doctors') navigate('/doctors');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar currentPage={currentTab} onNavigate={handleNav} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/doctors" element={<DoctorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;