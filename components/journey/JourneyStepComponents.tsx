// components/journey/JourneyStepComponents.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolWizard } from "@/components/tools/ToolWizard";
import { qualificationConfig } from "@/lib/tools/qualification";
import { regulatoryConfig } from "@/lib/tools/regulatory";
import { classificationConfig } from "@/lib/tools/classificationDm";
import { classificationDmdivConfig } from "@/lib/tools/classificationDmdiv";
import { safetyClassificationConfig } from "@/lib/tools/safetyClassification";

interface StepWrapperProps {
  tool: any;
  onComplete: (session: any, result: any) => void;
  title: string;
  description: string;
  icon: string;
  color: string;
  productName: string;
  intendedUse: string;
  config: any;
  wizardConfig: any;
}

function StepWrapper({ 
  tool, 
  onComplete, 
  title, 
  description, 
  icon, 
  color, 
  productName, 
  intendedUse, 
  config, 
  wizardConfig 
}: StepWrapperProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Démarrer automatiquement la session avec les informations du parcours
    if (!tool.session && productName && intendedUse && !isInitialized) {
      tool.startSession(productName, intendedUse);
      setIsInitialized(true);
    }
  }, [tool, productName, intendedUse, isInitialized]);

  // NE PAS appeler onComplete ici - laisser le JourneyWizard s'en charger
  // en surveillant directement tool.session?.status

  return (
    <div className="space-y-6">
      {/* En-tête de l'étape avec design amélioré */}
      <Card className="border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
              <span className="text-2xl text-white">{icon}</span>
            </div>
            <div className="flex-1">
              <CardTitle className={`text-${color}-900 text-2xl font-bold mb-2`}>
                {title}
              </CardTitle>
              <CardDescription className={`text-${color}-700 text-base leading-relaxed`}>
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Contenu de l'outil - toujours visible */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-0">
          <div className="min-h-[400px]">
            <ToolWizard
              config={config}
              wizardConfig={{
                ...wizardConfig,
                hideInitialForm: true,
                autoStart: true,
                initialProductName: productName,
                initialIntendedUse: intendedUse
              }}
              useTool={() => tool}
              onShowReport={() => {}} // Pas de rapport individuel dans le parcours
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function QualificationStepWrapper({ 
  tool, 
  onComplete, 
  productName, 
  intendedUse 
}: { 
  tool: any; 
  onComplete: any; 
  productName: string; 
  intendedUse: string; 
}) {
  const wizardConfig = {
    productLabel: "Nom du produit",
    productPlaceholder: "Ex: MonApp Diagnostic, Système de Monitoring, etc.",
    usageLabel: "Usage prévu",
    usagePlaceholder: "Décrivez précisément l'usage prévu de votre logiciel...",
    usageHint: "Plus votre description est précise, plus l'évaluation sera pertinente.",
    theme: {
      primary: "blue-600",
      primaryHover: "blue-700",
      accent: "cyan-600",
      gradient: "from-blue-600 to-cyan-600"
    },
    totalQuestions: 5
  };

  return (
    <StepWrapper
      tool={tool}
      onComplete={onComplete}
      title="Étape 1 : Qualification"
      description="Déterminons si votre produit est un dispositif médical selon le MDR"
      icon="🏥"
      color="blue"
      productName={productName}
      intendedUse={intendedUse}
      config={qualificationConfig}
      wizardConfig={wizardConfig}
    />
  );
}

export function RegulatoryStepWrapper({ 
  tool, 
  onComplete, 
  productName, 
  intendedUse 
}: { 
  tool: any; 
  onComplete: any; 
  productName: string; 
  intendedUse: string; 
}) {
  const wizardConfig = {
    productLabel: "Nom du dispositif",
    productPlaceholder: "Ex: Système DiagnoLab, Plateforme BioAnalyzer, etc.",
    usageLabel: "Usage prévu",
    usagePlaceholder: "Décrivez précisément l'usage prévu de votre dispositif...",
    usageHint: "Précisez notamment le type d'informations fournies (diagnostiques, préventives, etc.).",
    contextAlert: {
      title: "Contexte réglementaire",
      description: "Cet outil utilise la Figure 2 du MDCG 2019-11 rev.2.1 pour différencier les dispositifs relevant du MDR (dispositifs médicaux classiques) de ceux relevant de l'IVDR (dispositifs de diagnostic in vitro).",
      icon: "ℹ️"
    },
    theme: {
      primary: "indigo-600",
      primaryHover: "indigo-700",
      accent: "cyan-600",
      gradient: "from-indigo-600 to-cyan-600"
    },
    totalQuestions: 3
  };

  return (
    <StepWrapper
      tool={tool}
      onComplete={onComplete}
      title="Étape 2 : Réglementation applicable"
      description="Déterminons si votre dispositif relève du MDR ou de l'IVDR"
      icon="📋"
      color="indigo"
      productName={productName}
      intendedUse={intendedUse}
      config={regulatoryConfig}
      wizardConfig={wizardConfig}
    />
  );
}

export function ClassificationDmStepWrapper({ 
  tool, 
  onComplete, 
  productName, 
  intendedUse 
}: { 
  tool: any; 
  onComplete: any; 
  productName: string; 
  intendedUse: string; 
}) {
  const wizardConfig = {
    productLabel: "Nom du logiciel médical",
    productPlaceholder: "Ex: DiagnoSoft, CardioMonitor, TherapyAssist, etc.",
    usageLabel: "Usage prévu",
    usagePlaceholder: "Décrivez précisément l'usage prévu de votre logiciel médical...",
    usageHint: "Soyez précis sur le type d'informations traitées et leur utilisation clinique.",
    contextAlert: {
      title: "Prérequis important",
      description: "Cet outil s'applique uniquement aux logiciels déjà qualifiés comme dispositifs médicaux (MDSW). Il utilise la règle 11 du MDR 2017/745 selon le MDCG 2019-11 rev.2.1.",
      icon: "⚠️"
    },
    theme: {
      primary: "green-600",
      primaryHover: "green-700",
      accent: "emerald-600",
      gradient: "from-green-600 to-emerald-600"
    },
    totalQuestions: 5
  };

  return (
    <StepWrapper
      tool={tool}
      onComplete={onComplete}
      title="Étape 3 : Classification DM"
      description="Classification selon la règle 11 du MDR 2017/745"
      icon="📊"
      color="green"
      productName={productName}
      intendedUse={intendedUse}
      config={classificationConfig}
      wizardConfig={wizardConfig}
    />
  );
}

export function ClassificationDmdivStepWrapper({ 
  tool, 
  onComplete, 
  productName, 
  intendedUse 
}: { 
  tool: any; 
  onComplete: any; 
  productName: string; 
  intendedUse: string; 
}) {
  const wizardConfig = {
    productLabel: "Nom du logiciel DMDIV",
    productPlaceholder: "Ex: DiagnoLab, BioAnalyzer, PathogenDetect, etc.",
    usageLabel: "Usage prévu",
    usagePlaceholder: "Décrivez précisément l'usage prévu de votre logiciel DMDIV...",
    usageHint: "Précisez le type d'analyses IVD et leur finalité clinique.",
    contextAlert: {
      title: "Prérequis important",
      description: "Cet outil s'applique uniquement aux logiciels déjà qualifiés comme dispositifs médicaux de diagnostic in vitro (DMDIV). Il utilise les règles 1-7 de l'IVDR 2017/746.",
      icon: "⚠️"
    },
    theme: {
      primary: "cyan-600",
      primaryHover: "cyan-700",
      accent: "teal-600",
      gradient: "from-cyan-600 to-teal-600"
    },
    totalQuestions: 4
  };

  return (
    <StepWrapper
      tool={tool}
      onComplete={onComplete}
      title="Étape 3 : Classification DMDIV"
      description="Classification selon les règles 1-7 de l'IVDR 2017/746"
      icon="🧪"
      color="cyan"
      productName={productName}
      intendedUse={intendedUse}
      config={classificationDmdivConfig}
      wizardConfig={wizardConfig}
    />
  );
}

export function SafetyClassificationStepWrapper({ 
  tool, 
  onComplete, 
  productName, 
  intendedUse 
}: { 
  tool: any; 
  onComplete: any; 
  productName: string; 
  intendedUse: string; 
}) {
  const wizardConfig = {
    productLabel: "Nom du logiciel médical",
    productPlaceholder: "Ex: CardioMonitor, SurgeryAssist, PatientTracker, etc.",
    usageLabel: "Usage prévu",
    usagePlaceholder: "Décrivez précisément l'usage prévu de votre logiciel médical...",
    usageHint: "Précisez les fonctions critiques et l'impact sur la sécurité patient.",
    contextAlert: {
      title: "Classification de sécurité IEC 62304",
      description: "Cet outil détermine la classe de sécurité (A, B, C) de votre logiciel médical selon la norme IEC 62304 §4.3, en fonction des risques de préjudice en cas de défaillance.",
      icon: "🛡️"
    },
    theme: {
      primary: "purple-600",
      primaryHover: "purple-700",
      accent: "violet-600",
      gradient: "from-purple-600 to-violet-600"
    },
    totalQuestions: 2
  };

  return (
    <StepWrapper
      tool={tool}
      onComplete={onComplete}
      title="Étape 4 : Classification de Sécurité"
      description="Classification selon la norme IEC 62304 §4.3"
      icon="🛡️"
      color="purple"
      productName={productName}
      intendedUse={intendedUse}
      config={safetyClassificationConfig}
      wizardConfig={wizardConfig}
    />
  );
}