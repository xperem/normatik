// lib/tools/classificationDmdiv/questions.ts
import type { ClassificationDmdivQuestion, ClassificationDmdivQuestionId } from "@/types/classificationDmdiv";

export const questionsData: Record<ClassificationDmdivQuestionId, Omit<ClassificationDmdivQuestion, 'hint'>> = {
  Q1: {
    id: "Q1",
    text: "Le logiciel est-il utilisé pour <strong>détecter des agents pathogènes transmissibles</strong> dans le sang, les tissus, les cellules ou organes destinés à la <strong>transfusion ou transplantation</strong> ?",
    yesTarget: "CLASS_D",
    noTarget: "Q2",
  },

  Q2: {
    id: "Q2",
    text: "Le logiciel est-il utilisé pour <strong>détecter des agents infectieux</strong> dans d'autres types d'échantillons humains (hors dons) ?",
    yesTarget: "CLASS_C",
    noTarget: "Q3",
  },

  Q3: {
    id: "Q3",
    text: "Le logiciel est-il utilisé pour <strong>établir un diagnostic ou une suspicion de maladie grave</strong> (cancer, maladie génétique, etc.), <strong>évaluer la compatibilité donneur/receveur</strong>, ou <strong>guider des décisions thérapeutiques</strong> ?",
    yesTarget: "CLASS_C",
    noTarget: "Q4",
  },

  Q4: {
    id: "Q4",
    text: "Le logiciel se limite-t-il à des <strong>fonctions de support</strong> (ex: gestion administrative de laboratoire, tri d'échantillons, affichage ou transfert de résultats sans interprétation) ?",
    yesTarget: "CLASS_A",
    noTarget: "CLASS_B",
  },
};