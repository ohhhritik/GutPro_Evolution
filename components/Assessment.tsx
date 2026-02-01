import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, RefreshCw, Stethoscope } from 'lucide-react';
import { UserState, GutProfile, ProductRecommendation } from '../types';
import { questions, initialUserState, determineGutProfile, getProductForProfile } from '../utils/logic';

interface AssessmentProps {
  onComplete: () => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<UserState>(initialUserState);
  const [result, setResult] = useState<GutProfile | null>(null);
  const [product, setProduct] = useState<ProductRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Demographics special handling state
  const [demoAge, setDemoAge] = useState('');
  const [demoGender, setDemoGender] = useState('female');

  const currentQuestion = questions[currentStepIndex];
  const progress = ((currentStepIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < questions.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      finishAssessment();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleAnswer = (key: keyof UserState, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const finishAssessment = () => {
    setIsAnalyzing(true);
    // Simulate AI processing time
    setTimeout(() => {
      // 1. Update demographics in final state object
      const finalState = { ...answers, age: demoAge, gender: demoGender };
      
      // 2. Run Algorithm
      const profile = determineGutProfile(finalState);
      const recommendedProduct = getProductForProfile(profile);
      
      setResult(profile);
      setProduct(recommendedProduct);
      setIsAnalyzing(false);
      onComplete(); // Notify parent needed
    }, 1500);
  };

  const renderQuestionInput = () => {
    // Special Case: Demographics (Question 1)
    if (currentQuestion.id === 1) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              placeholder="e.g. 30"
              value={demoAge}
              onChange={(e) => setDemoAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
              value={demoGender}
              onChange={(e) => setDemoGender(e.target.value)}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      );
    }

    // Standard Choice Questions
    return (
      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.options?.map((option, idx) => {
          const isSelected = answers[currentQuestion.field] === option.value;
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(currentQuestion.field, option.value)}
              className={`p-4 rounded-xl text-left border-2 transition-all duration-200 flex items-center justify-between group ${
                isSelected
                  ? 'border-teal-500 bg-teal-50 text-teal-800'
                  : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">{option.label}</span>
              {isSelected && <CheckCircle className="h-5 w-5 text-teal-500" />}
            </button>
          );
        })}
      </div>
    );
  };

  // ------------------------------------------------------------------
  // RENDER: RESULTS VIEW
  // ------------------------------------------------------------------
  if (result && product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Your AI Gut Profile</h2>
            <p className="opacity-90">Based on your lifestyle and medical history</p>
          </div>

          <div className="p-8">
            {/* Profile Result */}
            <div className="flex flex-col md:flex-row gap-8 mb-12 items-center">
              <div className="w-full md:w-1/2">
                 <div className="inline-block px-4 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-bold mb-4">
                   ANALYSIS COMPLETE
                 </div>
                 <h3 className="text-3xl font-bold text-gray-900 mb-4">{result}</h3>
                 <p className="text-gray-600 leading-relaxed mb-6">
                   Our AI has identified this specific profile based on your input triggers. 
                   {result === GutProfile.POST_ANTIBIOTIC && " Your recent medication history suggests a need for intense microbiome replenishment."}
                   {result === GutProfile.HIGH_STRESS && " Elevated stress markers indicate your gut-brain axis needs targeted support to lower cortisol impact."}
                   {result === GutProfile.LOW_FIBER && " Dietary patterns suggest your microbiome needs prebiotic fuel to maintain diversity."}
                 </p>
                 
                 {/* Feature: Consult a Doctor */}
                 <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm">Uncertain about these results?</h4>
                      <p className="text-sm text-blue-700 mb-3">Our AI is 95% accurate, but nothing replaces professional medical advice.</p>
                      <button className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        <Stethoscope className="h-4 w-4" />
                        Consult a Doctor
                      </button>
                    </div>
                 </div>
              </div>

              {/* Product Card */}
              <div className="w-full md:w-1/2 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Recommended Protocol</h4>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4 bg-gray-200" />
                  <h4 className="text-xl font-bold text-gray-900">{product.name}</h4>
                  <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                  <button className="mt-4 w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-md">
                    Order Now - 20% Off
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-gray-100">
              <button 
                onClick={() => window.location.reload()} 
                className="text-gray-500 hover:text-teal-600 flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw className="h-4 w-4" /> Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // RENDER: LOADING STATE
  // ------------------------------------------------------------------
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
          <Activity className="absolute inset-0 m-auto text-teal-500 h-8 w-8 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Biomarkers...</h3>
        <p className="text-gray-500">Comparing your data against 50,000+ clinical profiles.</p>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // RENDER: FORM STEPS
  // ------------------------------------------------------------------
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
          <span>START</span>
          <span>STEP {currentStepIndex + 1} OF {questions.length}</span>
          <span>FINISH</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 min-h-[400px] flex flex-col">
        <div className="mb-6">
          <span className="text-teal-600 font-bold text-sm tracking-wider uppercase">{currentQuestion.category}</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-3">{currentQuestion.title}</h2>
          <p className="text-gray-600 text-lg">{currentQuestion.description}</p>
        </div>

        <div className="flex-grow">
          {renderQuestionInput()}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`flex items-center text-gray-600 hover:text-gray-900 font-medium ${currentStepIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <ChevronLeft className="h-5 w-5 mr-1" /> Previous
          </button>
          
          <button
            onClick={handleNext}
            className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-200 flex items-center"
          >
            {currentStepIndex === questions.length - 1 ? 'Analyze Results' : 'Next Step'}
            {currentStepIndex !== questions.length - 1 && <ChevronRight className="h-5 w-5 ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper for loading icon
const Activity = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

export default Assessment;