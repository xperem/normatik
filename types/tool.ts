// Types génériques pour les outils QARA
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

export interface ToolSession {
  id: string;
  toolId: string;
  productName: string;
  intendedUse: string;
  startedAt: Date;
  completedAt?: Date;
  status: "in-progress" | "completed" | "abandoned";
  currentStep: number;
  totalSteps: number;
  answers: Record<string, any>;
  result?: any;
}

export interface ToolConfig<TQuestion = any, TResult = any> {
  metadata: ToolMetadata;
  questions: Record<string, TQuestion>;
  results: Record<string, TResult>;
  totalQuestions: number;
  startQuestion: string;
}

export interface ToolAnswer {
  value: "yes" | "no" | string;
  justification?: string;
  timestamp: Date;
}