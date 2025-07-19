// hooks/useRegulatory.ts

import { useState, useCallback } from "react";
import { RegulatorySession, RegulatoryQuestionId, RegulatoryResultId } from "@/types/regulatory";
import { ToolAnswer } from "@/types/tool";
import { regulatoryConfig } from "@/lib/tools/regulatory";
import { generateReportId } from "@/lib/utils";

export function useRegulatory() {
  const [session, setSession] = useState<RegulatorySession | null>(null);

  const startSession = useCallback((productName: string, intendedUse: string) => {
    const newSession: RegulatorySession = {
      id: generateReportId(),
      productName,
      intendedUse,
      startedAt: new Date(),
      status: "in-progress",
      currentQuestionId: regulatoryConfig.startQuestion as RegulatoryQuestionId,
      steps: [],
    };
    setSession(newSession);
    return newSession;
  }, []);

  const answerQuestion = useCallback((
    questionId: RegulatoryQuestionId,
    answer: "yes" | "no",
    justification?: string
  ) => {
    if (!session) return null;

    const question = regulatoryConfig.questions[questionId];
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
    if (regulatoryConfig.results[nextTarget as RegulatoryResultId]) {
      const result = regulatoryConfig.results[nextTarget as RegulatoryResultId];
      const completedSession: RegulatorySession = {
        ...session,
        steps: updatedSteps,
        result,
        status: "completed",
        completedAt: new Date(),
        currentQuestionId: questionId,
      };
      setSession(completedSession);
      return { session: completedSession, isComplete: true, result };
    }

    // Continue to next question
    const nextSession: RegulatorySession = {
      ...session,
      steps: updatedSteps,
      currentQuestionId: nextTarget as RegulatoryQuestionId,
    };
    setSession(nextSession);
    return { session: nextSession, isComplete: false };
  }, [session]);

  const resetSession = useCallback(() => {
    setSession(null);
  }, []);

  const getCurrentQuestion = useCallback(() => {
    if (!session || session.status === "completed") return null;
    return regulatoryConfig.questions[session.currentQuestionId];
  }, [session]);

  const getProgress = useCallback(() => {
    if (!session) return 0;
    return Math.round((session.steps.length / regulatoryConfig.totalQuestions) * 100);
  }, [session]);

  const canGoBack = useCallback((): boolean => {
    return Boolean(session && session.steps.length > 0);
  }, [session]);

  const goBack = useCallback(() => {
    if (!session || session.steps.length === 0) return null;

    const updatedSteps = session.steps.slice(0, -1);
    const previousQuestionId = updatedSteps.length > 0 
      ? updatedSteps[updatedSteps.length - 1].questionId 
      : regulatoryConfig.startQuestion as RegulatoryQuestionId;

    const updatedSession: RegulatorySession = {
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
    canGoBack,
    goBack,
    config: regulatoryConfig,
  };
}
