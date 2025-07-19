// lib/tools/safetyClassification/metadata.ts
import { APP_NAME } from "@/lib/config";

export const safetyClassificationMetadata = {
  id: "iec-62304-safety-classification",
  name: "Classification de Sécurité IEC 62304",
  description: "Classifiez votre logiciel médical selon les classes de sécurité A, B, C de la norme IEC 62304",
  version: "2024.1",
  category: "classification" as const,
  regulation: "IEC 62304:2006+A1:2015",
  guidance: "IEC 62304 §4.3 - Classification de sécurité logicielle",
  lastUpdated: "2024-01-15",
  author: APP_NAME
};