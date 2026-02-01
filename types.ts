export type StressLevel = 'low' | 'moderate' | 'high';
export type FiberIntake = 'low' | 'moderate' | 'high';
export type BooleanAnswer = boolean;

export interface UserState {
  age: string;
  gender: string;
  bloating: boolean;
  gas: boolean;
  fiber_intake: FiberIntake;
  stress: StressLevel;
  antibiotics: boolean;
}

export enum GutProfile {
  POST_ANTIBIOTIC = "Post-Antibiotic Recovery Gut",
  HIGH_STRESS = "High-Stress Gut",
  LOW_FIBER = "Low-Fiber Gut",
  METABOLIC = "Metabolic Support Gut"
}

export interface ProductRecommendation {
  name: string;
  description: string;
  image: string;
}

export interface QuestionStep {
  id: number;
  category: string;
  title: string;
  description: string;
  field: keyof UserState;
  type: 'select' | 'boolean' | 'input';
  options?: { label: string; value: string | boolean }[];
}