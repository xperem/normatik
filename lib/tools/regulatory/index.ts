//lib/tools/regulatory/index.ts

export { regulatoryConfig } from "./config";
export { regulatoryMetadata } from "./metadata";
export { questionsData } from "./questions";
export { hintsContent } from "./hints";
export { resultsData } from "./results";

export type { RegulatoryQuestion, RegulatoryResult, RegulatoryQuestionId, RegulatoryResultId } from "@/types/regulatory";
export type { ToolConfig } from "@/types/tool";