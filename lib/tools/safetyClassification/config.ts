// lib/tools/safetyClassification/config.ts
import type { SafetyClassificationQuestion, SafetyClassificationResult, SafetyClassificationQuestionId, SafetyClassificationResultId } from "@/types/safetyClassification";
import type { ToolConfig } from "@/types/tool";

import { safetyClassificationMetadata } from "./metadata";
import { questionsData } from "./questions";
import { hintsContent } from "./hints";
import { resultsData } from "./results";

// Assemblage des questions avec leurs hints
const questions: Record<SafetyClassificationQuestionId, SafetyClassificationQuestion> = Object.fromEntries(
  Object.entries(questionsData).map(([id, questionData]) => [
    id,
    {
      ...questionData,
      hint: hintsContent[id as SafetyClassificationQuestionId]
    }
  ])
) as Record<SafetyClassificationQuestionId, SafetyClassificationQuestion>;

// Export de la configuration finale
export const safetyClassificationConfig: ToolConfig<SafetyClassificationQuestion, SafetyClassificationResult> = {
  metadata: safetyClassificationMetadata,
  questions,
  results: resultsData,
  totalQuestions: 2,
  startQuestion: "Q1"
};

// Exports individuels
export { questionsData, hintsContent, resultsData, safetyClassificationMetadata };