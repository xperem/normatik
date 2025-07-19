// lib/tools/classification/index.ts

export { classificationConfig } from "./config";
export { classificationMetadata } from "./metadata";
export { questionsData } from "./questions";
export { hintsContent } from "./hints";
export { resultsData } from "./results";

export type { ClassificationQuestion, ClassificationResult, ClassificationQuestionId, ClassificationResultId } from "@/types/classificationDm";
export type { ToolConfig } from "@/types/tool";