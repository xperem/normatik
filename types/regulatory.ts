//types/regulatory.ts
import { ToolAnswer } from "./tool";

export type RegulatoryQuestionId = "Q1" | "Q2" | "Q3";
export type RegulatoryResultId = "MDR" | "IVDR";

export interface RegulatoryQuestion {
  id: RegulatoryQuestionId;
  text: string;
  hint?: string;
  yesTarget: RegulatoryQuestionId | RegulatoryResultId;
  noTarget: RegulatoryQuestionId | RegulatoryResultId;
}

export interface RegulatoryResult {
  id: RegulatoryResultId;
  title: string;
  description: string;
  variant: "success" | "destructive" | "warning" | "info";
  recommendations?: string[];
  nextSteps?: string[];
  references?: string[];
}

export interface RegulatoryQuestionnaireStep {
  questionId: RegulatoryQuestionId;
  questionText: string;
  answer: ToolAnswer;
}

export interface RegulatorySession {
  id: string;
  productName: string;
  intendedUse: string;
  startedAt: Date;
  completedAt?: Date;
  status: "in-progress" | "completed" | "abandoned";
  currentQuestionId: RegulatoryQuestionId;
  steps: RegulatoryQuestionnaireStep[];
  result?: RegulatoryResult;
}

export interface RegulatoryReport {
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
    steps: RegulatoryQuestionnaireStep[];
  };
  result: RegulatoryResult;
  conclusion: string;
  signature?: {
    evaluatorName?: string;
    evaluatorRole?: string;
    organization?: string;
    date: Date;
  };
}