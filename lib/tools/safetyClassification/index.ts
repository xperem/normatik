// lib/tools/safetyClassification/index.ts

export { safetyClassificationConfig } from "./config";
export { safetyClassificationMetadata } from "./metadata";
export { questionsData } from "./questions";
export { hintsContent } from "./hints";
export { resultsData } from "./results";

export type { SafetyClassificationQuestion, SafetyClassificationResult, SafetyClassificationQuestionId, SafetyClassificationResultId } from "@/types/safetyClassification";
export type { ToolConfig } from "@/types/tool";