// hooks/useClassification.ts
import { useTool } from "./useTool";
import { classificationConfig } from "@/lib/tools/classificationDm";
import { ClassificationQuestion, ClassificationResult, ClassificationSession } from "@/types/classificationDm";

export function useClassification() {
  return useTool<ClassificationQuestion, ClassificationResult, ClassificationSession>(classificationConfig);
}