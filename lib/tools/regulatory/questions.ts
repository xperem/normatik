//lib/tools/regulatory/questions.ts

import type { RegulatoryQuestion, RegulatoryQuestionId } from "@/types/regulatory";

export const questionsData: Record<RegulatoryQuestionId, Omit<RegulatoryQuestion, 'hint'>> = {
  Q1: {
    id: "Q1",
    text: "Le logiciel fournit-il des informations relevant de la <strong>définition IVD</strong> ?",
    yesTarget: "Q2",
    noTarget: "MDR",
  },

  Q2: {
    id: "Q2",
    text: "Ces informations reposent-elles <strong>uniquement</strong> sur des données issues de dispositifs médicaux in vitro ?",
    yesTarget: "Q3",
    noTarget: "MDR",
  },

  Q3: {
    id: "Q3",
    text: "La finalité est-elle principalement pilotée par des <strong>données IVD</strong> ?",
    yesTarget: "IVDR",
    noTarget: "MDR",
  },
};
