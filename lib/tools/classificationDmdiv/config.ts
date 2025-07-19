// lib/tools/classificationDmdiv/config.ts
import type { ClassificationDmdivQuestion, ClassificationDmdivResult, ClassificationDmdivQuestionId, ClassificationDmdivResultId } from "@/types/classificationDmdiv";
import type { ToolConfig } from "@/types/tool";

import { classificationDmdivMetadata } from "./metadata";
import { questionsData } from "./questions";
import { hintsContent } from "./hints";
import { resultsData } from "./results";

// Assemblage des questions avec leurs hints
const questions: Record<ClassificationDmdivQuestionId, ClassificationDmdivQuestion> = Object.fromEntries(
  Object.entries(questionsData).map(([id, questionData]) => [
    id,
    {
      ...questionData,
      hint: hintsContent[id as ClassificationDmdivQuestionId]
    }
  ])
) as Record<ClassificationDmdivQuestionId, ClassificationDmdivQuestion>;

// Export de la configuration finale
export const classificationDmdivConfig: ToolConfig<ClassificationDmdivQuestion, ClassificationDmdivResult> = {
  metadata: classificationDmdivMetadata,
  questions,
  results: resultsData,
  totalQuestions: 4,
  startQuestion: "Q1"
};

// Exports individuels
export { questionsData, hintsContent, resultsData, classificationDmdivMetadata };