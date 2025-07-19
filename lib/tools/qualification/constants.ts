// lib/tools/qualification/constants.ts

/**
 * Constantes pour l'outil de qualification MDCG 2019-11
 */

// Configuration du flow
export const QUALIFICATION_FLOW = {
  TOTAL_QUESTIONS: 5,
  START_QUESTION: "Q1" as const,
} as const;

// IDs des questions
export const QUESTION_IDS = {
  Q1: "Q1",
  Q2: "Q2", 
  Q3: "Q3",
  Q4: "Q4",
  Q5: "Q5",
} as const;

// IDs des résultats
export const RESULT_IDS = {
  MEDICAL_DEVICE: "MEDICAL_DEVICE",
  NOT_MEDICAL_DEVICE: "NOT_MEDICAL_DEVICE",
} as const;

// Références réglementaires
export const REGULATORY_REFERENCES = {
  MDR: "MDR 2017/745",
  IVDR: "IVDR 2017/746", 
  MDCG_GUIDANCE: "MDCG 2019-11 rev.1",
  ISO_13485: "ISO 13485",
  ISO_14971: "ISO 14971",
  IEC_62304: "IEC 62304",
  IEC_62366: "IEC 62366-1",
} as const;

// Niveaux de classification (pour usage futur)
export const DEVICE_CLASSES = {
  CLASS_I: "Class I",
  CLASS_IIA: "Class IIa", 
  CLASS_IIB: "Class IIb",
  CLASS_III: "Class III",
} as const;

// Messages d'aide courts
export const HELP_MESSAGES = {
  SOFTWARE_DEFINITION: "Ensemble d'instructions pouvant être exécutées par un processeur",
  INDIVIDUAL_BENEFIT: "Bénéfice direct pour un patient spécifique",
  DATA_PROCESSING: "Action différente du simple stockage, archivage, communication, compression ou recherche",
} as const;