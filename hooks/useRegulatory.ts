import { useTool } from "./useTool";
import { regulatoryConfig } from "@/lib/tools/regulatory";
import { RegulatoryQuestion, RegulatoryResult, RegulatorySession } from "@/types/regulatory";

export function useRegulatory() {
  return useTool<RegulatoryQuestion, RegulatoryResult, RegulatorySession>(regulatoryConfig);
}