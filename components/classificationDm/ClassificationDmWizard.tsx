// components/classification/ClassificationWizard.tsx
"use client";

import { useState } from "react";
import { ToolWizard, ToolWizardConfig } from "../tools/ToolWizard";
import { ToolReport, ToolReportConfig } from "../tools/ToolReport";
import { useClassification } from "@/hooks/useClassificationDm";
import { classificationConfig } from "@/lib/tools/classificationDm";
import { CLASSIFICATION_DM_THEME } from "@/lib/pdf/PDFGenerator";
import { ClassificationSession } from "@/types/classificationDm";

const wizardConfig: ToolWizardConfig = {
  productLabel: "Nom du logiciel médical",
  productPlaceholder: "Ex: DiagnoSoft, CardioMonitor, TherapyAssist, etc.",
  usageLabel: "Usage prévu",
  usagePlaceholder: "Décrivez précisément l'usage prévu de votre logiciel médical, ses fonctionnalités, les informations qu'il traite, les décisions qu'il aide à prendre, etc...",
  usageHint: "Soyez précis sur le type d'informations traitées et leur utilisation clinique.",
  contextAlert: {
    title: "Prérequis important",
    description: "Cet outil s'applique uniquement aux logiciels déjà qualifiés comme dispositifs médicaux (MDSW). Il utilise la règle 11 du MDR 2017/745 selon le MDCG 2019-11 rev.2.1.",
    icon: <span className="text-amber-600">⚠️</span>
  },
  theme: {
    primary: "green-600",
    primaryHover: "green-700",
    accent: "emerald-600",
    gradient: "from-green-600 to-emerald-600"
  },
  totalQuestions: 5
};

const reportConfig: ToolReportConfig = {
  productLabel: "Logiciel médical évalué",
  theme: {
    primary: "green",
    accent: "emerald",
    gradient: "from-green-600 to-emerald-600"
  },
  regulation: "MDR 2017/745 • MDCG 2019-11 rev.2.1",
  toolVersion: "2.1",
  positiveResultIds: ["CLASS_I", "CLASS_IIA", "CLASS_IIB", "CLASS_III"] // Tous sont des résultats "positifs"
};

export function ClassificationDmWizard() {
  const [showReport, setShowReport] = useState(false);
  const [currentSession, setCurrentSession] = useState<ClassificationSession | null>(null);

  const handleShowReport = (session: ClassificationSession) => {
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
        pdfTheme={CLASSIFICATION_DM_THEME}
        onBack={handleBackToWizard}
      />
    );
  }

  return (
    <ToolWizard
      config={classificationConfig}
      wizardConfig={wizardConfig}
      useTool={useClassification}
      onShowReport={handleShowReport}
    />
  );
}