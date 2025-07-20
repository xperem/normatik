// lib/journey/config.ts
import { JourneyConfig, JourneyStepType, JourneySession } from "@/types/journey";
import { BaseResult } from "@/types/tool";

export const journeyConfig: JourneyConfig = {
  getNextStep: (currentStep: JourneyStepType, result?: BaseResult): JourneyStepType | null => {
    switch (currentStep) {
      case "qualification":
        if (result?.id === "MEDICAL_DEVICE") {
          return "regulatory";
        }
        return null; // Fin du parcours si pas un DM
      
      case "regulatory":
        if (result?.id === "MDR") {
          return "classificationDm";
        } else if (result?.id === "IVDR") {
          return "classificationDmdiv";
        }
        return null;
      
      case "classificationDm":
      case "classificationDmdiv":
        return "safetyClassification";
      
      case "safetyClassification":
        return "final";
      
      case "final":
        return null;
      
      default:
        return null;
    }
  },

  isStepRequired: (stepId: JourneyStepType, journeySession: JourneySession): boolean => {
    switch (stepId) {
      case "qualification":
        return true; // Toujours requis
      
      case "regulatory":
        return journeySession.qualificationSession?.result?.id === "MEDICAL_DEVICE";
      
      case "classificationDm":
        return journeySession.regulatorySession?.result?.id === "MDR";
      
      case "classificationDmdiv":
        return journeySession.regulatorySession?.result?.id === "IVDR";
      
      case "safetyClassification":
        return !!(journeySession.classificationDmSession?.result || journeySession.classificationDmdivSession?.result);
      
      case "final":
        return !!journeySession.safetyClassificationSession?.result;
      
      default:
        return false;
    }
  }
};

export const JOURNEY_STEPS_CONFIG = {
  qualification: {
    name: "Qualification",
    description: "Déterminer si le produit est un dispositif médical",
    icon: "🏥",
    color: "blue"
  },
  regulatory: {
    name: "Réglementation",
    description: "MDR ou IVDR ?",
    icon: "📋",
    color: "indigo"
  },
  classificationDm: {
    name: "Classification DM",
    description: "Classification selon le MDR",
    icon: "📊",
    color: "green"
  },
  classificationDmdiv: {
    name: "Classification DMDIV",
    description: "Classification selon l'IVDR",
    icon: "🧪",
    color: "cyan"
  },
  safetyClassification: {
    name: "Classification Sécurité",
    description: "Classification selon IEC 62304",
    icon: "🛡️",
    color: "purple"
  },
  final: {
    name: "Rapport Final",
    description: "Synthèse complète",
    icon: "📄",
    color: "gray"
  }
} as const;