// types/classificationDmdiv.ts
import { ToolAnswer } from "./tool";

export type ClassificationDmdivQuestionId = "Q1" | "Q2" | "Q3" | "Q4";
export type ClassificationDmdivResultId = "CLASS_A" | "CLASS_B" | "CLASS_C" | "CLASS_D";

export interface ClassificationDmdivQuestion {
  id: ClassificationDmdivQuestionId;
  text: string;
  hint?: string;
  yesTarget: ClassificationDmdivQuestionId | ClassificationDmdivResultId;
  noTarget: ClassificationDmdivQuestionId | ClassificationDmdivResultId;
}

export interface ClassificationDmdivResult {
  id: ClassificationDmdivResultId;
  title: string;
  description: string;
  variant: "success" | "destructive" | "warning" | "info";
  recommendations?: string[];
  nextSteps?: string[];
  references?: string[];
  rule?: string;
}

export interface ClassificationDmdivQuestionnaireStep {
  questionId: ClassificationDmdivQuestionId;
  questionText: string;
  answer: ToolAnswer;
}

export interface ClassificationDmdivSession {
  id: string;
  productName: string;
  intendedUse: string;
  startedAt: Date;
  completedAt?: Date;
  status: "in-progress" | "completed" | "abandoned";
  currentQuestionId: ClassificationDmdivQuestionId;
  steps: ClassificationDmdivQuestionnaireStep[];
  result?: ClassificationDmdivResult;
}

export interface ClassificationDmdivReport {
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
    steps: ClassificationDmdivQuestionnaireStep[];
  };
  result: ClassificationDmdivResult;
  conclusion: string;
  signature?: {
    evaluatorName?: string;
    evaluatorRole?: string;
    organization?: string;
    date: Date;
  };
}