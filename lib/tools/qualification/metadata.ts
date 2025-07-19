// lib/tools/qualification/metadata.ts
import { APP_NAME } from "@/lib/config";

export const qualificationMetadata = {
  id: "mdcg-2019-11-qualification",
  name: "Qualification Dispositif Médical Logiciel",
  description: "Déterminez si votre logiciel est considéré comme un dispositif médical selon le règlement européen MDR 2017/745",
  version: "2.1",
  category: "qualification" as const,
  regulation: "MDR 2017/745",
  guidance: "MDCG 2019-11 rev.1",
  lastUpdated: "2024-01-15",
  author: APP_NAME
};