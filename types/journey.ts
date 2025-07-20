// types/journey.ts
import { BaseSession, BaseResult } from "./tool";
import { QualificationSession, Result as QualificationResult } from "./qualification";
import { RegulatorySession, RegulatoryResult } from "./regulatory";
import { ClassificationSession, ClassificationResult } from "./classificationDm";
import { ClassificationDmdivSession, ClassificationDmdivResult } from "./classificationDmdiv";
import { SafetyClassificationSession, SafetyClassificationResult } from "./safetyClassification";

export type JourneyStepType = 
  | "qualification"
  | "regulatory" 
  | "classificationDm"
  | "classificationDmdiv"
  | "safetyClassification"
  | "final";

export interface JourneyStep {
  id: JourneyStepType;
  name: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "skipped";
  session?: BaseSession<BaseResult>;
  result?: BaseResult;
}

export interface JourneySession {
  id: string;
  productName: string;
  intendedUse: string;
  startedAt: Date;
  completedAt?: Date;
  status: "in-progress" | "completed" | "abandoned";
  currentStepId: JourneyStepType;
  steps: Record<JourneyStepType, JourneyStep>;
  // Sessions individuelles pour chaque outil
  qualificationSession?: QualificationSession;
  regulatorySession?: RegulatorySession;
  classificationDmSession?: ClassificationSession;
  classificationDmdivSession?: ClassificationDmdivSession;
  safetyClassificationSession?: SafetyClassificationSession;
}

export interface JourneyConfig {
  getNextStep: (currentStep: JourneyStepType, result?: BaseResult) => JourneyStepType | null;
  isStepRequired: (stepId: JourneyStepType, journeySession: JourneySession) => boolean;
}

export interface JourneyReport {
  reportId: string;
  productName: string;
  intendedUse: string;
  generatedAt: Date;
  completedSteps: JourneyStepType[];
  results: {
    qualification?: QualificationResult;
    regulatory?: RegulatoryResult;
    classificationDm?: ClassificationResult;
    classificationDmdiv?: ClassificationDmdivResult;
    safetyClassification?: SafetyClassificationResult;
  };
  finalClassification: {
    regulatoryFramework: "MDR" | "IVDR";
    deviceClass: string;
    safetyClass: string;
  };
  summary: string;
  recommendations: string[];
  signature?: {
    evaluatorName?: string;
    evaluatorRole?: string;
    organization?: string;
    date: Date;
  };
}