"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { ToolWizard, ToolWizardConfig } from "../tools/ToolWizard";
import { ToolReport, ToolReportConfig } from "../tools/ToolReport";
import { useRegulatory } from "@/hooks/useRegulatory";
import { regulatoryConfig } from "@/lib/tools/regulatory";
import { REGULATORY_THEME } from "@/lib/pdf/PDFGenerator";
import { RegulatorySession } from "@/types/regulatory";

const wizardConfig: ToolWizardConfig = {
  productLabel: "Nom du dispositif",
  productPlaceholder: "Ex: Système DiagnoLab, Plateforme BioAnalyzer, etc.",
  usageLabel: "Usage prévu",
  usagePlaceholder: "Décrivez précisément l'usage prévu de votre dispositif, le type de données traitées, les informations fournies, et l'objectif médical visé...",
  usageHint: "Précisez notamment le type d'informations fournies (diagnostiques, préventives, etc.).",
  contextAlert: {
    title: "Contexte réglementaire",
    description: "Cet outil utilise la Figure 2 du MDCG 2019-11 rev.2.1 pour différencier les dispositifs relevant du MDR (dispositifs médicaux classiques) de ceux relevant de l'IVDR (dispositifs de diagnostic in vitro).",
    icon: <Info className="h-4 w-4 text-blue-600" />
  },
  theme: {
    primary: "indigo-600",
    primaryHover: "indigo-700",
    accent: "cyan-600",
    gradient: "from-indigo-600 to-cyan-600"
  },
  totalQuestions: 3
};

const reportConfig: ToolReportConfig = {
  productLabel: "Dispositif évalué",
  theme: {
    primary: "indigo",
    accent: "cyan",
    gradient: "from-indigo-600 to-cyan-600"
  },
  regulation: "MDR 2017/745 • IVDR 2017/746 • MDCG 2019-11 2.1 Figure 2",
  toolVersion: "2.1",
  positiveResultIds: ["MDR", "IVDR"] // Les deux sont des résultats "positifs"
};

export function RegulatoryWizard() {
  const [showReport, setShowReport] = useState(false);
  const [currentSession, setCurrentSession] = useState<RegulatorySession | null>(null);

  const handleShowReport = (session: RegulatorySession) => {
    setCurrentSession(session);
    setShowReport(true);
  };

  const handleBackToWizard = () => {
    setShowReport(false);
    setCurrentSession(null);
  };

  if (showReport && currentSession) {
    return (
      <ToolReport 
        session={currentSession}
        config={reportConfig}
        pdfTheme={REGULATORY_THEME}
        onBack={handleBackToWizard}
      />
    );
  }

  return (
    <ToolWizard
      config={regulatoryConfig}
      wizardConfig={wizardConfig}
      useTool={useRegulatory}
      onShowReport={handleShowReport}
    />
  );
}