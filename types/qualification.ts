import { ToolAnswer } from "./tool";

export type QuestionId = "Q1" | "Q2" | "Q3" | "Q4" | "Q5";
export type ResultId = "MEDICAL_DEVICE" | "NOT_MEDICAL_DEVICE";

export interface Question {
  id: QuestionId;
  text: string;
  hint?: string;
  yesTarget: QuestionId | ResultId;
  noTarget: QuestionId | ResultId;
}

export interface Result {
  id: ResultId;
  title: string;
  description: string;
  variant: "success" | "destructive" | "warning" | "info";
  recommendations?: string[];
  nextSteps?: string[];
  references?: string[];
}

export interface QuestionnaireStep {
  questionId: QuestionId;
  questionText: string;
  answer: ToolAnswer;
}

export interface QualificationSession {
  id: string;
  productName: string;
  intendedUse: string;
  startedAt: Date;
  completedAt?: Date;
  status: "in-progress" | "completed" | "abandoned";
  currentQuestionId: QuestionId;
  steps: QuestionnaireStep[];
  result?: Result;
  exportData?: QualificationReport;
}

export interface QualificationReport {
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
    steps: QuestionnaireStep[];
  };
  result: Result;
  conclusion: string;
  signature?: {
    evaluatorName?: string;
    evaluatorRole?: string;
    organization?: string;
    date: Date;
  };
}