import { UserState, GutProfile, ProductRecommendation, QuestionStep } from '../types';

export const initialUserState: UserState = {
  age: '',
  gender: '',
  bloating: false,
  gas: false,
  fiber_intake: 'moderate',
  stress: 'moderate',
  antibiotics: false,
};

/**
 * THE AI ALGORITHM
 * Determines the gut profile based on specific hierarchical rules.
 */
export const determineGutProfile = (state: UserState): GutProfile => {
  // Priority 1: Antibiotic usage (Acute issue)
  if (state.antibiotics === true) {
    return GutProfile.POST_ANTIBIOTIC;
  }

  // Priority 2: High Stress (Systemic issue)
  if (state.stress === 'high') {
    return GutProfile.HIGH_STRESS;
  }

  // Priority 3: Low Fiber (Dietary issue)
  if (state.fiber_intake === 'low') {
    return GutProfile.LOW_FIBER;
  }

  // Default: Metabolic Support
  return GutProfile.METABOLIC;
};

/**
 * RECOMMENDATION ENGINE
 * Maps profiles to specific products.
 */
export const getProductForProfile = (profile: GutProfile): ProductRecommendation => {
  switch (profile) {
    case GutProfile.POST_ANTIBIOTIC:
      return {
        name: "Tata Probiotics 30 Billion CFU",
        description: "High-potency multi-strain formula specifically designed to replenish the microbiome after antibiotic treatment.",
        image: "https://picsum.photos/400/300?grayscale"
      };
    case GutProfile.HIGH_STRESS:
      return {
        name: "The Good Bug 'Gut Balance'",
        description: "Contains psychobiotics (L. helveticus & B. longum) clinically shown to reduce cortisol and support the gut-brain axis.",
        image: "https://picsum.photos/400/301?grayscale"
      };
    case GutProfile.LOW_FIBER:
      return {
        name: "Himalaya Healthy Gut",
        description: "A blend of Triphala and prebiotics to support motility and feed beneficial bacteria in the absence of dietary fiber.",
        image: "https://picsum.photos/400/302?grayscale"
      };
    default:
      return {
        name: "Metabolic Daily Support",
        description: "Optimized for glucose control and weight management by enhancing Akkermansia muciniphila levels.",
        image: "https://picsum.photos/400/303?grayscale"
      };
  }
};

export const questions: QuestionStep[] = [
  {
    id: 1,
    category: "Demographics",
    title: "Tell us about yourself",
    description: "Basic information helps us benchmark your data.",
    field: "age", // Simplified for this demo to just ask simple generic inputs, usually would be multi-field
    type: "input", // We will handle demographics specifically in the UI for better UX
    options: []
  },
  {
    id: 2,
    category: "Digestion",
    title: "Digestive Symptoms",
    description: "Do you frequently experience bloating or gas after meals?",
    field: "bloating", // Mapping this question specifically to the 'bloating' state for simplicity, logic checks others
    type: "boolean",
    options: [
      { label: "Yes, frequently", value: true },
      { label: "No, rarely", value: false }
    ]
  },
  {
    id: 3,
    category: "Diet",
    title: "Fiber Intake",
    description: "How would you describe your daily consumption of fruits, vegetables, and whole grains?",
    field: "fiber_intake",
    type: "select",
    options: [
      { label: "Low (I rarely eat veggies)", value: "low" },
      { label: "Moderate (I try my best)", value: "moderate" },
      { label: "High (Plant-based/Whole foods)", value: "high" }
    ]
  },
  {
    id: 4,
    category: "Lifestyle",
    title: "Stress Levels",
    description: "How would you rate your average daily stress levels?",
    field: "stress",
    type: "select",
    options: [
      { label: "Low (Relaxed)", value: "low" },
      { label: "Moderate (Manageable)", value: "moderate" },
      { label: "High (Overwhelmed)", value: "high" }
    ]
  },
  {
    id: 5,
    category: "Medical History",
    title: "Medication History",
    description: "Have you taken a course of antibiotics in the last 6 months?",
    field: "antibiotics",
    type: "boolean",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  }
];