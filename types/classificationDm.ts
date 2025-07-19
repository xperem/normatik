// types/classification.ts
import { ToolAnswer } from "./tool";

export type ClassificationQuestionId = "Q1" | "Q2" | "Q3" | "Q4" | "Q5";
export type ClassificationResultId = "CLASS_I" | "CLASS_IIA" | "CLASS_IIB" | "CLASS_III";

export interface ClassificationQuestion {
  id: ClassificationQuestionId;
  text: string;
  hint?: string;
  yesTarget: ClassificationQuestionId | ClassificationResultId;
  noTarget: ClassificationQuestionId | ClassificationResultId;
}

export interface ClassificationResult {
  id: ClassificationResultId;
  title: string;
  description: string;
  variant: "success" | "destructive" | "warning" | "info";
  recommendations?: string[];
  nextSteps?: string[];
  references?: string[];
}

export interface ClassificationQuestionnaireStep {
  questionId: ClassificationQuestionId;
  questionText: string;
  answer: ToolAnswer;
}

export interface ClassificationSession {
  id: string;
  productName: string;
  intendedUse: string;
  startedAt: Date;
  completedAt?: Date;
  status: "in-progress" | "completed" | "abandoned";
  currentQuestionId: ClassificationQuestionId;
  steps: ClassificationQuestionnaireStep[];
  result?: ClassificationResult;
}

export interface ClassificationReport {
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
    steps: ClassificationQuestionnaireStep[];
  };
  result: ClassificationResult;
  conclusion: string;
  signature?: {
    evaluatorName?: string;
    evaluatorRole?: string;
    organization?: string;
    date: Date;
  };
}