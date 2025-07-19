// types/tool.ts - Types génériques de base uniquement

export interface ToolMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  category: "qualification" | "classification" | "risk-analysis" | "compliance";
  regulation: string;
  guidance?: string;
  lastUpdated: string;
  author: string;
}

export interface ToolAnswer {
  value: "yes" | "no" | string;
  justification?: string;
  timestamp: Date;
}

export interface BaseQuestion {
  id: string;
  text: string;
  hint?: string;
  yesTarget: string;
  noTarget: string;
}

export interface BaseResult {
  id: string;
  title: string;
  description: string;
  variant: "success" | "destructive" | "warning" | "info";
  recommendations?: string[];
  nextSteps?: string[];
  references?: string[];
}

export interface QuestionnaireStep<TQuestionId = string> {
  questionId: TQuestionId;
  questionText: string;
  answer: ToolAnswer;
}

export interface BaseSession<TResult = BaseResult, TQuestionId = string> {
  id: string;
  productName: string;
  intendedUse: string;
  startedAt: Date;
  completedAt?: Date;
  status: "in-progress" | "completed" | "abandoned";
  currentQuestionId: TQuestionId;
  steps: QuestionnaireStep<TQuestionId>[];
  result?: TResult;
}

export interface BaseReport<TResult = BaseResult, TQuestionId = string> {
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
    steps: QuestionnaireStep<TQuestionId>[];
  };
  result: TResult;
  conclusion: string;
  signature?: {
    evaluatorName?: string;
    evaluatorRole?: string;
    organization?: string;
    date: Date;
  };
}

export interface ToolConfig<TQuestion extends BaseQuestion = BaseQuestion, TResult extends BaseResult = BaseResult> {
  metadata: ToolMetadata;
  questions: Record<string, TQuestion>;
  results: Record<string, TResult>;
  totalQuestions: number;
  startQuestion: string;
}