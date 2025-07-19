// lib/tools/classification/config.ts
import type { ClassificationQuestion, ClassificationResult, ClassificationQuestionId, ClassificationResultId } from "@/types/classificationDm";
import type { ToolConfig } from "@/types/tool";

import { classificationMetadata } from "./metadata";
import { questionsData } from "./questions";
import { hintsContent } from "./hints";
import { resultsData } from "./results";

// Assemblage des questions avec leurs hints
const questions: Record<ClassificationQuestionId, ClassificationQuestion> = Object.fromEntries(
  Object.entries(questionsData).map(([id, questionData]) => [
    id,
    {
      ...questionData,
      hint: hintsContent[id as ClassificationQuestionId]
    }
  ])
) as Record<ClassificationQuestionId, ClassificationQuestion>;

// Export de la configuration finale
export const classificationConfig: ToolConfig<ClassificationQuestion, ClassificationResult> = {
  metadata: classificationMetadata,
  questions,
  results: resultsData,
  totalQuestions: 5,
  startQuestion: "Q1"
};

// Exports individuels
export { questionsData, hintsContent, resultsData, classificationMetadata };