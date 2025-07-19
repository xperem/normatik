// hooks/useSafetyClassification.ts
import { useTool } from "./useTool";
import { safetyClassificationConfig } from "@/lib/tools/safetyClassification";
import { SafetyClassificationQuestion, SafetyClassificationResult, SafetyClassificationSession } from "@/types/safetyClassification";

export function useSafetyClassification() {
  return useTool<SafetyClassificationQuestion, SafetyClassificationResult, SafetyClassificationSession>(safetyClassificationConfig);
}