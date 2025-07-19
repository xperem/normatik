// lib/tools/classification/metadata.ts
import { APP_NAME } from "@/lib/config";

export const classificationMetadata = {
  id: "mdr-2017-745-rule-11-classification",
  name: "Classification selon la règle 11",
  description: "Classifiez votre logiciel médical selon la règle 11 du règlement MDR 2017/745",
  version: "2.1",
  category: "classification" as const,
  regulation: "MDR 2017/745",
  guidance: "MDCG 2019-11 rev.2.1",
  lastUpdated: "2024-01-15",
  author: APP_NAME
};