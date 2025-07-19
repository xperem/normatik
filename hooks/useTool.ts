// hooks/useTool.ts - Hook générique unifié

import { useState, useCallback } from "react";
import { BaseSession, BaseQuestion, BaseResult, ToolConfig, ToolAnswer } from "@/types/tool";
import { generateReportId } from "@/lib/utils";

export function useTool<
  TQuestion extends BaseQuestion,
  TResult extends BaseResult,
  TSession extends BaseSession<TResult> = BaseSession<TResult>
>(config: ToolConfig<TQuestion, TResult>) {
  
  const [session, setSession] = useState<TSession | null>(null);

  const startSession = useCallback((productName: string, intendedUse: string): TSession => {
    const newSession: BaseSession<TResult> = {
      id: generateReportId(),
      productName,
      intendedUse,
      startedAt: new Date(),
      status: "in-progress" as const,
      currentQuestionId: config.startQuestion,
      steps: [],
    };
    
    const typedSession = newSession as TSession;
    setSession(typedSession);
    return typedSession;
  }, [config.startQuestion]);

  const answerQuestion = useCallback((
    questionId: string,
    answer: "yes" | "no",
    justification?: string
  ) => {
    if (!session) return null;

    const question = config.questions[questionId];
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
    if (config.results[nextTarget]) {
      const result = config.results[nextTarget];
      const completedSession: BaseSession<TResult> = {
        ...session,
        steps: updatedSteps,
        result,
        status: "completed" as const,
        completedAt: new Date(),
        currentQuestionId: questionId,
      };
      
      const typedCompletedSession = completedSession as TSession;
      setSession(typedCompletedSession);
      return { session: typedCompletedSession, isComplete: true, result };
    }

    // Continue to next question
    const nextSession: BaseSession<TResult> = {
      ...session,
      steps: updatedSteps,
      currentQuestionId: nextTarget,
    };
    
    const typedNextSession = nextSession as TSession;
    setSession(typedNextSession);
    return { session: typedNextSession, isComplete: false };
  }, [session, config.questions, config.results]);

  const resetSession = useCallback(() => {
    setSession(null);
  }, []);

  const getCurrentQuestion = useCallback((): TQuestion | null => {
    if (!session || session.status === "completed") return null;
    return config.questions[session.currentQuestionId] || null;
  }, [session, config.questions]);

  const getProgress = useCallback((): number => {
    if (!session) return 0;
    return Math.round((session.steps.length / config.totalQuestions) * 100);
  }, [session, config.totalQuestions]);

  const canGoBack = useCallback((): boolean => {
    return Boolean(session && session.steps.length > 0);
  }, [session]);

  const goBack = useCallback(() => {
    if (!session || session.steps.length === 0) return null;

    const updatedSteps = session.steps.slice(0, -1);
    const previousQuestionId = updatedSteps.length > 0 
      ? updatedSteps[updatedSteps.length - 1].questionId 
      : config.startQuestion;

    const updatedSession: BaseSession<TResult> = {
      ...session,
      steps: updatedSteps,
      currentQuestionId: previousQuestionId,
      status: "in-progress" as const,
      result: undefined,
      completedAt: undefined,
    };

    const typedUpdatedSession = updatedSession as TSession;
    setSession(typedUpdatedSession);
    return typedUpdatedSession;
  }, [session, config.startQuestion]);

  return {
    session,
    startSession,
    answerQuestion,
    resetSession,
    getCurrentQuestion,
    getProgress,
    canGoBack,
    goBack,
    config,
  };
}