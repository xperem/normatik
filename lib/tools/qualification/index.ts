// lib/tools/qualification/index.ts

// Export principal
export { qualificationConfig } from "./config";

// Exports individuels pour usage avancé
export { qualificationMetadata } from "./metadata";
export { questionsData } from "./questions";
export { hintsContent } from "./hints";
export { resultsData } from "./results";

// Re-export des types si besoin
export type { Question, Result, QuestionId, ResultId } from "@/types/qualification";
export type { ToolConfig } from "@/types/tool";