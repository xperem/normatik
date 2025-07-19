//lib/tools/regulatory/config.ts

import type { RegulatoryQuestion, RegulatoryResult, RegulatoryQuestionId, RegulatoryResultId } from "@/types/regulatory";
import type { ToolConfig } from "@/types/tool";

import { regulatoryMetadata } from "./metadata";
import { questionsData } from "./questions";
import { hintsContent } from "./hints";
import { resultsData } from "./results";

// Assemblage des questions avec leurs hints
const questions: Record<RegulatoryQuestionId, RegulatoryQuestion> = Object.fromEntries(
  Object.entries(questionsData).map(([id, questionData]) => [
    id,
    {
      ...questionData,
      hint: hintsContent[id as RegulatoryQuestionId]
    }
  ])
) as Record<RegulatoryQuestionId, RegulatoryQuestion>;

// Export de la configuration finale
export const regulatoryConfig: ToolConfig<RegulatoryQuestion, RegulatoryResult> = {
  metadata: regulatoryMetadata,
  questions,
  results: resultsData,
  totalQuestions: 3,
  startQuestion: "Q1"
};

// Exports individuels
export { questionsData, hintsContent, resultsData, regulatoryMetadata };
