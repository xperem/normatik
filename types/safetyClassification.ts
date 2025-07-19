// types/safetyClassification.ts
import { ToolAnswer } from "./tool";

export type SafetyClassificationQuestionId = "Q1" | "Q2";
export type SafetyClassificationResultId = "SAFETY_CLASS_A" | "SAFETY_CLASS_B" | "SAFETY_CLASS_C";

export interface SafetyClassificationQuestion {
  id: SafetyClassificationQuestionId;
  text: string;
  hint?: string;
  yesTarget: SafetyClassificationQuestionId | SafetyClassificationResultId;
  noTarget: SafetyClassificationQuestionId | SafetyClassificationResultId;
}

export interface SafetyClassificationResult {
  id: SafetyClassificationResultId;
  title: string;
  description: string;
  variant: "success" | "destructive" | "warning" | "info";
  recommendations?: string[];
  nextSteps?: string[];
  references?: string[];
  rule?: string;
}

export interface SafetyClassificationQuestionnaireStep {
  questionId: SafetyClassificationQuestionId;
  questionText: string;
  answer: ToolAnswer;
}

export interface SafetyClassificationSession {
  id: string;
  productName: string;
  intendedUse: string;
  startedAt: Date;
  completedAt?: Date;
  status: "in-progress" | "completed" | "abandoned";
  currentQuestionId: SafetyClassificationQuestionId;
  steps: SafetyClassificationQuestionnaireStep[];
  result?: SafetyClassificationResult;
}

export interface SafetyClassificationReport {
  reportId: string;
  metadata: {
    productName: string;
    intendedUse: string;
    generatedAt: Date;
    toolVersion: string;
    regulation: string;
  };
  questionnaire: {
    totalQuestions: number;
    answeredQuestions: number;
    steps: SafetyClassificationQuestionnaireStep[];
  };
  result: SafetyClassificationResult;
  conclusion: string;
  signature?: {
    evaluatorName?: string;
    evaluatorRole?: string;
    organization?: string;
    date: Date;
  };
}