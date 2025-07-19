// lib/tools/classification/questions.ts
import type { ClassificationQuestion, ClassificationQuestionId } from "@/types/classificationDm";

export const questionsData: Record<ClassificationQuestionId, Omit<ClassificationQuestion, 'hint'>> = {
  Q1: {
    id: "Q1",
    text: "Le logiciel fournit-il des informations utilisées pour prendre des <strong>décisions à des fins diagnostiques ou thérapeutiques</strong> ?",
    yesTarget: "Q2",
    noTarget: "Q4",
  },

  Q2: {
    id: "Q2",
    text: "Une mauvaise décision fondée sur ces informations pourrait-elle entraîner <strong>le décès ou une détérioration irréversible</strong> de l'état de santé ?",
    yesTarget: "CLASS_III",
    noTarget: "Q3",
  },

  Q3: {
    id: "Q3",
    text: "Une mauvaise décision pourrait-elle entraîner une <strong>détérioration grave</strong> de la santé ou <strong>nécessiter une intervention chirurgicale</strong> ?",
    yesTarget: "CLASS_IIB",
    noTarget: "CLASS_IIA",
  },

  Q4: {
    id: "Q4",
    text: "Le logiciel est-il destiné à <strong>surveiller des processus physiologiques</strong> ?",
    yesTarget: "Q5",
    noTarget: "CLASS_I",
  },

  Q5: {
    id: "Q5",
    text: "Surveille-t-il des <strong>paramètres physiologiques vitaux</strong> (ex. fréquence cardiaque, respiration, tension artérielle) dont les variations peuvent représenter un <strong>danger immédiat</strong> ?",
    yesTarget: "CLASS_IIB",
    noTarget: "CLASS_IIA",
  },
};