//lib/tools/regulatory/metadata.ts

import { APP_NAME } from "@/lib/config";

export const regulatoryMetadata = {
  id: "mdcg-2019-11-regulatory",
  name: "DM ou DMDIV ?",
  description: "Déterminez si votre dispositif relève du MDR (DM) ou IVDR (DMDIV)",
  version: "2.1",
  category: "qualification" as const,
  regulation: "MDR 2017/745 • IVDR 2017/746",
  guidance: "MDCG 2019-11 rev.1 - Figure 2",
  lastUpdated: "2024-01-15",
  author: APP_NAME
};