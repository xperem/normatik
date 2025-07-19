// lib/tools/safetyClassification/questions.ts
import type { SafetyClassificationQuestion, SafetyClassificationQuestionId } from "@/types/safetyClassification";

export const questionsData: Record<SafetyClassificationQuestionId, Omit<SafetyClassificationQuestion, 'hint'>> = {
  Q1: {
    id: "Q1",
    text: "Une défaillance du logiciel peut-elle entraîner un <strong>préjudice quelconque</strong> au patient, à l'utilisateur ou à une autre personne ?",
    yesTarget: "Q2",
    noTarget: "SAFETY_CLASS_A",
  },

  Q2: {
    id: "Q2",
    text: "Une défaillance du logiciel peut-elle entraîner une <strong>blessure grave ou la mort</strong> ?",
    yesTarget: "SAFETY_CLASS_C",
    noTarget: "SAFETY_CLASS_B",
  },
};