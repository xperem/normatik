// hooks/useJourney.ts
import { useState, useCallback } from "react";
import { JourneySession, JourneyStepType, JourneyStep } from "@/types/journey";
import { BaseSession, BaseResult } from "@/types/tool";
import { QualificationSession } from "@/types/qualification";
import { RegulatorySession } from "@/types/regulatory";
import { ClassificationSession } from "@/types/classificationDm";
import { ClassificationDmdivSession } from "@/types/classificationDmdiv";
import { SafetyClassificationSession } from "@/types/safetyClassification";
import { journeyConfig, JOURNEY_STEPS_CONFIG } from "@/lib/journey/config";
import { generateReportId } from "@/lib/utils";

export function useJourney() {
  const [journeySession, setJourneySession] = useState<JourneySession | null>(null);

  const startJourney = useCallback((productName: string, intendedUse: string): JourneySession => {
    const initialSteps: Record<JourneyStepType, JourneyStep> = {
      qualification: {
        id: "qualification",
        name: JOURNEY_STEPS_CONFIG.qualification.name,
        description: JOURNEY_STEPS_CONFIG.qualification.description,
        status: "in-progress"
      },
      regulatory: {
        id: "regulatory",
        name: JOURNEY_STEPS_CONFIG.regulatory.name,
        description: JOURNEY_STEPS_CONFIG.regulatory.description,
        status: "pending"
      },
      classificationDm: {
        id: "classificationDm",
        name: JOURNEY_STEPS_CONFIG.classificationDm.name,
        description: JOURNEY_STEPS_CONFIG.classificationDm.description,
        status: "pending"
      },
      classificationDmdiv: {
        id: "classificationDmdiv",
        name: JOURNEY_STEPS_CONFIG.classificationDmdiv.name,
        description: JOURNEY_STEPS_CONFIG.classificationDmdiv.description,
        status: "pending"
      },
      safetyClassification: {
        id: "safetyClassification",
        name: JOURNEY_STEPS_CONFIG.safetyClassification.name,
        description: JOURNEY_STEPS_CONFIG.safetyClassification.description,
        status: "pending"
      },
      final: {
        id: "final",
        name: JOURNEY_STEPS_CONFIG.final.name,
        description: JOURNEY_STEPS_CONFIG.final.description,
        status: "pending"
      }
    };

    const newSession: JourneySession = {
      id: generateReportId(),
      productName,
      intendedUse,
      startedAt: new Date(),
      status: "in-progress",
      currentStepId: "qualification",
      steps: initialSteps
    };

    setJourneySession(newSession);
    return newSession;
  }, []);

  const completeStep = useCallback((
    stepId: JourneyStepType, 
    session: BaseSession<BaseResult>, 
    result: BaseResult
  ) => {
    if (!journeySession) return;

    const updatedSession = { ...journeySession };
    
    // Marquer l'étape comme complétée
    updatedSession.steps[stepId] = {
      ...updatedSession.steps[stepId],
      status: "completed",
      session,
      result
    };

    // Sauvegarder la session spécifique
    switch (stepId) {
      case "qualification":
        updatedSession.qualificationSession = session as QualificationSession;
        break;
      case "regulatory":
        updatedSession.regulatorySession = session as RegulatorySession;
        break;
      case "classificationDm":
        updatedSession.classificationDmSession = session as ClassificationSession;
        break;
      case "classificationDmdiv":
        updatedSession.classificationDmdivSession = session as ClassificationDmdivSession;
        break;
      case "safetyClassification":
        updatedSession.safetyClassificationSession = session as SafetyClassificationSession;
        break;
    }

    // Déterminer la prochaine étape
    const nextStepId = journeyConfig.getNextStep(stepId, result);
    
    if (nextStepId) {
      // Activer la prochaine étape si elle est requise
      if (journeyConfig.isStepRequired(nextStepId, updatedSession)) {
        updatedSession.steps[nextStepId].status = "in-progress";
        updatedSession.currentStepId = nextStepId;
      } else {
        // Marquer comme ignorée et passer à la suivante
        updatedSession.steps[nextStepId].status = "skipped";
        const nextNext = journeyConfig.getNextStep(nextStepId);
        if (nextNext && journeyConfig.isStepRequired(nextNext, updatedSession)) {
          updatedSession.steps[nextNext].status = "in-progress";
          updatedSession.currentStepId = nextNext;
        }
      }
    } else {
      // Fin du parcours
      updatedSession.status = "completed";
      updatedSession.completedAt = new Date();
      updatedSession.currentStepId = "final";
      updatedSession.steps.final.status = "in-progress";
    }

    // Marquer les étapes non pertinentes comme ignorées
    Object.entries(updatedSession.steps).forEach(([key, step]) => {
      const stepKey = key as JourneyStepType;
      if (step.status === "pending" && !journeyConfig.isStepRequired(stepKey, updatedSession)) {
        updatedSession.steps[stepKey].status = "skipped";
      }
    });

    setJourneySession(updatedSession);
  }, [journeySession]);

  const goToStep = useCallback((stepId: JourneyStepType) => {
    if (!journeySession) return;

    const updatedSession = { ...journeySession };
    
    // Réinitialiser le statut de l'étape courante si pas complétée
    if (updatedSession.steps[updatedSession.currentStepId].status === "in-progress") {
      updatedSession.steps[updatedSession.currentStepId].status = "pending";
    }

    // Activer la nouvelle étape
    updatedSession.currentStepId = stepId;
    updatedSession.steps[stepId].status = "in-progress";

    setJourneySession(updatedSession);
  }, [journeySession]);

  const resetJourney = useCallback(() => {
    setJourneySession(null);
  }, []);

  const getCompletedSteps = useCallback((): JourneyStepType[] => {
    if (!journeySession) return [];
    
    return Object.entries(journeySession.steps)
      .filter(([_, step]) => step.status === "completed")
      .map(([key]) => key as JourneyStepType);
  }, [journeySession]);

  const getProgress = useCallback((): number => {
    if (!journeySession) return 0;
    
    const relevantSteps = Object.values(journeySession.steps).filter(step => 
      step.status !== "skipped"
    );
    
    const completedSteps = relevantSteps.filter(step => 
      step.status === "completed"
    );
    
    return relevantSteps.length > 0 ? Math.round((completedSteps.length / relevantSteps.length) * 100) : 0;
  }, [journeySession]);

  return {
    journeySession,
    startJourney,
    completeStep,
    goToStep,
    resetJourney,
    getCompletedSteps,
    getProgress
  };
}