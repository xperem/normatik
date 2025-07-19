// lib/tools/qualification/questions.ts
import type { Question, QuestionId } from "@/types/qualification";

export const questionsData: Record<QuestionId, Omit<Question, 'hint'>> = {
  Q1: {
    id: "Q1",
    text: "Le produit est-il un <strong>logiciel</strong> ?",
    yesTarget: "Q2",
    noTarget: "NOT_MEDICAL_DEVICE",
  },

  Q2: {
    id: "Q2",
    text: `Le logiciel entre-t-il dans l'une de ces <strong>catégories spéciales</strong> ?
      <div class="mt-4 space-y-2">
        <div class="flex items-center p-2 bg-amber-50 rounded border-l-4 border-amber-400">
          <span class="mr-2">📋</span>
          <span>Logiciel visé à l'<strong>Annexe XVI</strong> du MDR</span>
        </div>
        <div class="flex items-center p-2 bg-amber-50 rounded border-l-4 border-amber-400">
          <span class="mr-2">🔧</span>
          <span><strong>Accessoire</strong> de dispositif médical</span>
        </div>
        <div class="flex items-center p-2 bg-amber-50 rounded border-l-4 border-amber-400">
          <span class="mr-2">⚡</span>
          <span>Logiciel <strong>influençant</strong> l'usage d'un DM physique</span>
        </div>
      </div>`,
    yesTarget: "MEDICAL_DEVICE",
    noTarget: "Q3",
  },

  Q3: {
    id: "Q3",
    text: "Le logiciel exécute-t-il une <strong>action sur les données</strong> différente du simple stockage, archivage, communication, compression ou recherche ?",
    yesTarget: "Q4",
    noTarget: "NOT_MEDICAL_DEVICE",
  },

  Q4: {
    id: "Q4",
    text: "L'action du logiciel est-elle destinée au <strong>bénéfice de patients individuels</strong> ?",
    yesTarget: "Q5",
    noTarget: "NOT_MEDICAL_DEVICE",
  },

  Q5: {
    id: "Q5",
    text: "Le logiciel répond-il à la <strong>définition officielle</strong> de « Dispositif Médical » selon l'Article 2(1) du MDR ?",
    yesTarget: "MEDICAL_DEVICE",
    noTarget: "NOT_MEDICAL_DEVICE",
  },
};