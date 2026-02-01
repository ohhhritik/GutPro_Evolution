import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      duration: "1 Month",
      price: "$49",
      period: "/mo",
      features: ["Personalized Probiotics", "Basic App Access", "Email Support"],
      highlight: false
    },
    {
      duration: "3 Months",
      price: "$39",
      period: "/mo",
      features: ["Personalized Probiotics", "Full App Access", "Priority Support", "Diet Plan Included"],
      highlight: true,
      tag: "MOST POPULAR"
    },
    {
      duration: "6 Months",
      price: "$35",
      period: "/mo",
      features: ["Personalized Probiotics", "Full App Access", "24/7 Doctor Chat", "Advanced Analytics"],
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Special Banner */}
        <div className="bg-blue-600 text-white text-center py-3 rounded-lg mb-12 shadow-md transform hover:scale-[1.01] transition-transform cursor-pointer">
          <p className="font-semibold text-lg">
            🩺 Special Pricing Available for AI & Healthcare Workers - <span className="underline opacity-90 hover:opacity-100">Verify ID</span>
          </p>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the plan that fits your gut health journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-2xl shadow-xl flex flex-col ${
                plan.highlight ? 'border-2 border-teal-500 scale-105 z-10' : 'border border-gray-100'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-sm">
                    {plan.tag}
                  </span>
                </div>
              )}
              
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.duration} Supply</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0 mt-auto">
                <button 
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-200 ${
                    plan.highlight 
                      ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-200' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;