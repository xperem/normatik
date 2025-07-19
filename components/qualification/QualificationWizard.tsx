"use client";

import { useState } from "react";
import { ToolWizard, ToolWizardConfig } from "../tools/ToolWizard";
import { ToolReport, ToolReportConfig } from "../tools/ToolReport";
import { useQualification } from "@/hooks/useQualification";
import { qualificationConfig } from "@/lib/tools/qualification";
import { QUALIFICATION_THEME } from "@/lib/pdf/PDFGenerator";
import { QualificationSession } from "@/types/qualification";

const wizardConfig: ToolWizardConfig = {
  productLabel: "Nom du produit",
  productPlaceholder: "Ex: MonApp Diagnostic, Système de Monitoring, etc.",
  usageLabel: "Usage prévu",
  usagePlaceholder: "Décrivez précisément l'usage prévu de votre logiciel, ses fonctionnalités principales, les utilisateurs cibles, et les objectifs médicaux ou non-médicaux qu'il vise...",
  usageHint: "Plus votre description est précise, plus l'évaluation sera pertinente.",
  theme: {
    primary: "blue-600",
    primaryHover: "blue-700",
    accent: "cyan-600",
    gradient: "from-blue-600 to-cyan-600"
  },
  totalQuestions: 5
};

const reportConfig: ToolReportConfig = {
  productLabel: "Produit évalué",
  theme: {
    primary: "blue",
    accent: "cyan",
    gradient: "from-blue-600 to-cyan-600"
  },
  regulation: "MDR 2017/745 • MDCG 2019-11 rev.2.1",
  toolVersion: "2.1",
  positiveResultIds: ["MEDICAL_DEVICE"]
};

export function QualificationWizard() {
  const [showReport, setShowReport] = useState(false);
  const [currentSession, setCurrentSession] = useState<QualificationSession | null>(null);

  const handleShowReport = (session: QualificationSession) => {
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
        pdfTheme={QUALIFICATION_THEME}
        onBack={handleBackToWizard}
      />
    );
  }

  return (
    <ToolWizard
      config={qualificationConfig}
      wizardConfig={wizardConfig}
      useTool={useQualification}
      onShowReport={handleShowReport}
    />
  );
}