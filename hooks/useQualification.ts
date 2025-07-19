import { useTool } from "./useTool";
import { qualificationConfig } from "@/lib/tools/qualification";
import { Question, Result, QualificationSession } from "@/types/qualification";

export function useQualification() {
  return useTool<Question, Result, QualificationSession>(qualificationConfig);
}