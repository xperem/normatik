import { useState, useCallback } from "react";
import { QualificationSession, QuestionId, ResultId } from "@/types/qualification";
import { ToolAnswer } from "@/types/tool";
import { qualificationConfig } from "@/lib/tools/qualification";
import { generateReportId } from "@/lib/utils";

export function useQualification() {
  const [session, setSession] = useState<QualificationSession | null>(null);

  const startSession = useCallback((productName: string, intendedUse: string) => {
    const newSession: QualificationSession = {
      id: generateReportId(),
      productName,
      intendedUse,
      startedAt: new Date(),
      status: "in-progress",
      currentQuestionId: qualificationConfig.startQuestion as QuestionId,
      steps: [],
    };
    setSession(newSession);
    return newSession;
  }, []);

  const answerQuestion = useCallback((
    questionId: QuestionId,
    answer: "yes" | "no",
    justification?: string
  ) => {
    if (!session) return null;

    const question = qualificationConfig.questions[questionId];
    if (!question) return null;

    const toolAnswer: ToolAnswer = {
      value: answer,
      justification,
      timestamp: new Date(),
    };

    const step = {
      questionId,
      questionText: question.text,
      answer: toolAnswer,
    };

    const updatedSteps = [...session.steps, step];
    const nextTarget = answer === "yes" ? question.yesTarget : question.noTarget;

    // Check if we reached a result
    if (qualificationConfig.results[nextTarget as ResultId]) {
      const result = qualificationConfig.results[nextTarget as ResultId];
      const completedSession: QualificationSession = {
        ...session,
        steps: updatedSteps,
        result,
        status: "completed",
        completedAt: new Date(),
        currentQuestionId: questionId, // Keep last question
      };
      setSession(completedSession);
      return { session: completedSession, isComplete: true, result };
    }

    // Continue to next question
    const nextSession: QualificationSession = {
      ...session,
      steps: updatedSteps,
      currentQuestionId: nextTarget as QuestionId,
    };
    setSession(nextSession);
    return { session: nextSession, isComplete: false };
  }, [session]);

  const resetSession = useCallback(() => {
    setSession(null);
  }, []);

  const getCurrentQuestion = useCallback(() => {
    if (!session || session.status === "completed") return null;
    return qualificationConfig.questions[session.currentQuestionId];
  }, [session]);

  const getProgress = useCallback(() => {
    if (!session) return 0;
    return Math.round((session.steps.length / qualificationConfig.totalQuestions) * 100);
  }, [session]);

  // Correction: retourner directement un boolean
  const canGoBack = useCallback((): boolean => {
    return Boolean(session && session.steps.length > 0);
  }, [session]);

  const goBack = useCallback(() => {
    if (!session || session.steps.length === 0) return null;

    const updatedSteps = session.steps.slice(0, -1);
    const previousQuestionId = updatedSteps.length > 0 
      ? updatedSteps[updatedSteps.length - 1].questionId 
      : qualificationConfig.startQuestion as QuestionId;

    const updatedSession: QualificationSession = {
      ...session,
      steps: updatedSteps,
      currentQuestionId: previousQuestionId,
      status: "in-progress",
      result: undefined,
      completedAt: undefined,
    };

    setSession(updatedSession);
    return updatedSession;
  }, [session]);

  return {
    session,
    startSession,
    answerQuestion,
    resetSession,
    getCurrentQuestion,
    getProgress,
    canGoBack, // Maintenant retourne directement boolean
    goBack,
    config: qualificationConfig,
  };
}