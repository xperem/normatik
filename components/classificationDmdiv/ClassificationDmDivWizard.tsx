// components/classificationDmdiv/ClassificationDmdivWizard.tsx
"use client";

import { useState } from "react";
import { ToolWizard, ToolWizardConfig } from "../tools/ToolWizard";
import { ToolReport, ToolReportConfig } from "../tools/ToolReport";
import { useClassificationDmdiv } from "@/hooks/useClassificationDmdiv";
import { classificationDmdivConfig } from "@/lib/tools/classificationDmdiv";
import { CLASSIFICATION_DMDIV_THEME } from "@/lib/pdf/PDFGenerator";
import { ClassificationDmdivSession } from "@/types/classificationDmdiv";

const wizardConfig: ToolWizardConfig = {
  productLabel: "Nom du logiciel DMDIV",
  productPlaceholder: "Ex: DiagnoLab, BioAnalyzer, PathogenDetect, etc.",
  usageLabel: "Usage prévu",
  usagePlaceholder: "Décrivez précisément l'usage prévu de votre logiciel DMDIV, les types d'échantillons analysés, les informations fournies, et leur utilisation diagnostique...",
  usageHint: "Précisez le type d'analyses IVD et leur finalité clinique.",
  contextAlert: {
    title: "Prérequis important",
    description: "Cet outil s'applique uniquement aux logiciels déjà qualifiés comme dispositifs médicaux de diagnostic in vitro (DMDIV). Il utilise les règles 1-7 de l'IVDR 2017/746.",
    icon: <span className="text-amber-600">⚠️</span>
  },
  theme: {
    primary: "cyan-600",
    primaryHover: "cyan-700",
    accent: "teal-600",
    gradient: "from-cyan-600 to-teal-600"
  },
  totalQuestions: 4
};

const reportConfig: ToolReportConfig = {
  productLabel: "Logiciel DMDIV évalué",
  theme: {
    primary: "cyan",
    accent: "teal",
    gradient: "from-cyan-600 to-teal-600"
  },
  regulation: "IVDR 2017/746 • Règles 1-7",
  toolVersion: "2.1",
  positiveResultIds: ["CLASS_A", "CLASS_B", "CLASS_C", "CLASS_D"] // Tous sont des résultats "positifs"
};

export function ClassificationDmdivWizard() {
  const [showReport, setShowReport] = useState(false);
  const [currentSession, setCurrentSession] = useState<ClassificationDmdivSession | null>(null);

  const handleShowReport = (session: ClassificationDmdivSession) => {
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
        pdfTheme={CLASSIFICATION_DMDIV_THEME}
        onBack={handleBackToWizard}
      />
    );
  }

  return (
    <ToolWizard
      config={classificationDmdivConfig}
      wizardConfig={wizardConfig}
      useTool={useClassificationDmdiv}
      onShowReport={handleShowReport}
    />
  );
}