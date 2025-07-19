// lib/tools/classificationDmdiv/metadata.ts
import { APP_NAME } from "@/lib/config";

export const classificationDmdivMetadata = {
  id: "ivdr-2017-746-classification",
  name: "Classification DMDIV",
  description: "Classifiez votre dispositif médical de diagnostic in vitro selon l'IVDR 2017/746",
  version: "2.1",
  category: "classification" as const,
  regulation: "IVDR 2017/746",
  guidance: "IVDR 2017/746 - Règles 1-7",
  lastUpdated: "2024-01-15",
  author: APP_NAME
};