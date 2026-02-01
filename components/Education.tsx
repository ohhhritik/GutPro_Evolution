import React from 'react';
import { GitBranch, UserCheck, Database, BrainCircuit } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our AI Model Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            GutPro Evolution isn't just a quiz. It's a clinical decision engine built on thousands of data points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-teal-100 rounded-lg p-3">
                <GitBranch className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Decision Tree Logic</h3>
                <p className="text-gray-600">
                  Our algorithm prioritizes acute conditions (like antibiotic usage) over systemic issues (stress) or dietary habits. This hierarchical processing ensures immediate health threats are addressed first.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-teal-100 rounded-lg p-3">
                <UserCheck className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">User Feedback Loop</h3>
                <p className="text-gray-600">
                  Every month, we analyze user progress. If a specific profile isn't responding to the recommended protocol, the weightings in our algorithm adjust automatically to improve future accuracy.
                </p>
              </div>
            </div>
             <div className="flex items-start">
              <div className="flex-shrink-0 bg-teal-100 rounded-lg p-3">
                <Database className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Clinical Data Mapping</h3>
                <p className="text-gray-600">
                  We don't guess products. We map specific probiotic strains (like <i>L. helveticus</i> for stress) directly to your symptom profile based on peer-reviewed gastroenterology research.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
              <BrainCircuit className="h-64 w-64 text-teal-900" />
            </div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-6">Algorithm Visualization</h4>
            
            {/* Simple Visual Representation of the Logic */}
            <div className="space-y-4 font-mono text-sm">
              <div className="bg-white p-3 rounded shadow-sm border-l-4 border-red-500">
                <span className="text-gray-400">01. INPUT:</span> Antibiotics = TRUE?
                <br/>
                <span className="text-red-600 font-bold">→ RETURN "Recovery Profile"</span>
              </div>
              <div className="flex justify-center h-4"><div className="w-0.5 bg-gray-300"></div></div>
              
              <div className="bg-white p-3 rounded shadow-sm border-l-4 border-orange-500">
                <span className="text-gray-400">02. ELSE:</span> Stress = HIGH?
                <br/>
                <span className="text-orange-600 font-bold">→ RETURN "Stress Profile"</span>
              </div>
              <div className="flex justify-center h-4"><div className="w-0.5 bg-gray-300"></div></div>
              
              <div className="bg-white p-3 rounded shadow-sm border-l-4 border-yellow-500">
                <span className="text-gray-400">03. ELSE:</span> Fiber = LOW?
                <br/>
                <span className="text-yellow-600 font-bold">→ RETURN "Fiber Profile"</span>
              </div>
               <div className="flex justify-center h-4"><div className="w-0.5 bg-gray-300"></div></div>
               
               <div className="bg-white p-3 rounded shadow-sm border-l-4 border-teal-500">
                <span className="text-gray-400">04. DEFAULT:</span>
                <br/>
                <span className="text-teal-600 font-bold">→ RETURN "Metabolic Support"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;