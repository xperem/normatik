// components/safetyClassification/SafetyClassificationWizard.tsx
"use client";

import { useState } from "react";
import { ToolWizard, ToolWizardConfig } from "../tools/ToolWizard";
import { ToolReport, ToolReportConfig } from "../tools/ToolReport";
import { useSafetyClassification } from "@/hooks/useSafetyClassification";
import { safetyClassificationConfig } from "@/lib/tools/safetyClassification";
import { CLASSIFICATION_SAFETY_THEME } from "@/lib/pdf/PDFGenerator";
import { SafetyClassificationSession } from "@/types/safetyClassification";

const wizardConfig: ToolWizardConfig = {
  productLabel: "Nom du logiciel médical",
  productPlaceholder: "Ex: CardioMonitor, SurgeryAssist, PatientTracker, etc.",
  usageLabel: "Usage prévu",
  usagePlaceholder: "Décrivez précisément l'usage prévu de votre logiciel médical, ses fonctionnalités, les utilisateurs cibles, et l'environnement d'utilisation...",
  usageHint: "Précisez les fonctions critiques et l'impact sur la sécurité patient.",
  contextAlert: {
    title: "Classification de sécurité IEC 62304",
    description: "Cet outil détermine la classe de sécurité (A, B, C) de votre logiciel médical selon la norme IEC 62304 §4.3, en fonction des risques de préjudice en cas de défaillance.",
    icon: <span className="text-amber-600">🛡️</span>
  },
  theme: {
    primary: "purple-600",
    primaryHover: "purple-700",
    accent: "violet-600",
    gradient: "from-purple-600 to-violet-600"
  },
  totalQuestions: 2
};

const reportConfig: ToolReportConfig = {
  productLabel: "Logiciel médical évalué",
  theme: {
    primary: "purple",
    accent: "violet",
    gradient: "from-purple-600 to-violet-600"
  },
  regulation: "IEC 62304:2006+A1:2015 • §4.3",
  toolVersion: "2024.1",
  positiveResultIds: ["SAFETY_CLASS_A", "SAFETY_CLASS_B", "SAFETY_CLASS_C"] // Tous sont des résultats "positifs"
};

export function SafetyClassificationWizard() {
  const [showReport, setShowReport] = useState(false);
  const [currentSession, setCurrentSession] = useState<SafetyClassificationSession | null>(null);

  const handleShowReport = (session: SafetyClassificationSession) => {
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
        pdfTheme={CLASSIFICATION_SAFETY_THEME}
        onBack={handleBackToWizard}
      />
    );
  }

  return (
    <ToolWizard
      config={safetyClassificationConfig}
      wizardConfig={wizardConfig}
      useTool={useSafetyClassification}
      onShowReport={handleShowReport}
    />
  );

  
}


