// lib/tools/qualification/config.ts
import type { Question, Result, QuestionId, ResultId } from "@/types/qualification";
import type { ToolConfig } from "@/types/tool";

// Imports des modules
import { qualificationMetadata } from "./metadata";
import { questionsData } from "./questions";
import { hintsContent } from "./hints";
import { resultsData } from "./results";

// Assemblage des questions avec leurs hints
const questions: Record<QuestionId, Question> = Object.fromEntries(
  Object.entries(questionsData).map(([id, questionData]) => [
    id,
    {
      ...questionData,
      hint: hintsContent[id as QuestionId]
    }
  ])
) as Record<QuestionId, Question>;

// Export de la configuration finale
export const qualificationConfig: ToolConfig<Question, Result> = {
  metadata: qualificationMetadata,
  questions,
  results: resultsData,
  totalQuestions: 5,
  startQuestion: "Q1"
};

// Exports individuels pour usage direct si besoin
export { questionsData, hintsContent, resultsData, qualificationMetadata };