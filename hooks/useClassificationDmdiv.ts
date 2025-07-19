// hooks/useClassificationDmdiv.ts
import { useTool } from "./useTool";
import { classificationDmdivConfig } from "@/lib/tools/classificationDmdiv";
import { ClassificationDmdivQuestion, ClassificationDmdivResult, ClassificationDmdivSession } from "@/types/classificationDmdiv";

export function useClassificationDmdiv() {
  return useTool<ClassificationDmdivQuestion, ClassificationDmdivResult, ClassificationDmdivSession>(classificationDmdivConfig);
}