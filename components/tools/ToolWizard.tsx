"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, FileText, HelpCircle, CheckCircle, XCircle, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ToolReport } from "./ToolReport";
import { BaseSession, BaseResult, BaseQuestion, ToolConfig } from "@/types/tool";

export interface ToolWizardConfig {
  productLabel: string;
  productPlaceholder: string;
  usageLabel: string;
  usagePlaceholder: string;
  usageHint: string;
  contextAlert?: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  theme: {
    primary: string;
    primaryHover: string;
    accent: string;
    gradient: string;
  };
  totalQuestions: number;
}

interface ToolWizardProps<
  TQuestion extends BaseQuestion,
  TResult extends BaseResult,
  TSession extends BaseSession<TResult> = BaseSession<TResult>
> {
  config: ToolConfig<TQuestion, TResult>;
  wizardConfig: ToolWizardConfig;
  useTool: () => {
    session: TSession | null;
    startSession: (productName: string, intendedUse: string) => TSession;
    getCurrentQuestion: () => TQuestion | null;
    answerQuestion: (questionId: string, answer: "yes" | "no", justification?: string) => any;
    resetSession: () => void;
    getProgress: () => number;
    canGoBack: () => boolean;
    goBack: () => any;
  };
  onShowReport: (session: TSession) => void;
}

export function ToolWizard<
  TQuestion extends BaseQuestion,
  TResult extends BaseResult,
  TSession extends BaseSession<TResult> = BaseSession<TResult>
>({
  config,
  wizardConfig,
  useTool,
  onShowReport
}: ToolWizardProps<TQuestion, TResult, TSession>) {
  
  const {
    session,
    startSession,
    getCurrentQuestion,
    answerQuestion,
    resetSession,
    getProgress,
    canGoBack,
    goBack,
  } = useTool();

  const [productName, setProductName] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [justification, setJustification] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(null);

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim() && intendedUse.trim()) {
      startSession(productName.trim(), intendedUse.trim());
    }
  };

  const handleAnswer = () => {
    if (selectedAnswer && session && currentQuestion) {
      answerQuestion(session.currentQuestionId, selectedAnswer, justification.trim() || undefined);
      setJustification("");
      setSelectedAnswer(null);
      setShowHint(false);
    }
  };

  const handleRestart = () => {
    resetSession();
    setProductName("");
    setIntendedUse("");
    setJustification("");
    setSelectedAnswer(null);
    setShowHint(false);
  };

  const handleExport = () => {
    if (session) {
      onShowReport(session);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Formulaire initial */}
      {!session && (
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className={`text-2xl bg-gradient-to-r ${wizardConfig.theme.gradient} bg-clip-text text-transparent`}>
              Informations sur le produit
            </CardTitle>
            <CardDescription>
              {wizardConfig.contextAlert?.description || "Commençons par quelques informations de base"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStartSession} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="productName" className="text-sm font-medium">
                  {wizardConfig.productLabel} *
                </label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={wizardConfig.productPlaceholder}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="intendedUse" className="text-sm font-medium">
                  {wizardConfig.usageLabel} *
                </label>
                <Textarea
                  id="intendedUse"
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  placeholder={wizardConfig.usagePlaceholder}
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {wizardConfig.usageHint}
                </p>
              </div>

              {wizardConfig.contextAlert && (
                <Alert className="border-blue-200 bg-blue-50">
                  {wizardConfig.contextAlert.icon}
                  <AlertTitle className="text-blue-900">{wizardConfig.contextAlert.title}</AlertTitle>
                  <AlertDescription className="text-blue-800">
                    {wizardConfig.contextAlert.description}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                variant="medical"
                disabled={!productName.trim() || !intendedUse.trim()}
              >
                Démarrer l&apos;évaluation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Questions */}
      {session && session.status === "in-progress" && currentQuestion && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge variant="info" className="text-sm">
              Question {session.steps.length + 1} / {wizardConfig.totalQuestions}
            </Badge>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Progression</span>
              <div className="w-24">
                <Progress value={progress} />
              </div>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
              </CardTitle>
              
              {/* Bouton d'aide */}
              {currentQuestion.hint && (
                <div className="mt-6">
                  <Button
                    variant={showHint ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    className={`
                      transition-all duration-200 font-medium
                      ${showHint 
                        ? `bg-${wizardConfig.theme.primary} hover:bg-${wizardConfig.theme.primaryHover} text-white shadow-md` 
                        : `border-${wizardConfig.theme.primary}-200 text-${wizardConfig.theme.primary}-700 hover:border-${wizardConfig.theme.primary}-300 hover:bg-${wizardConfig.theme.primary}-50`
                      }
                    `}
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    {showHint ? "Masquer l'aide" : "Besoin d'aide ?"}
                  </Button>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Zone d'aide */}
              {showHint && currentQuestion.hint && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <Alert className={`border-2 border-${wizardConfig.theme.primary}-200 bg-gradient-to-r from-${wizardConfig.theme.primary}-50 to-${wizardConfig.theme.accent}-50 shadow-sm`}>
                    <div className="flex items-center mb-2">
                      <div className={`flex-shrink-0 w-8 h-8 bg-${wizardConfig.theme.primary}-100 rounded-full flex items-center justify-center mr-3`}>
                        <Info className={`h-4 w-4 text-${wizardConfig.theme.primary}-600`} />
                      </div>
                      <AlertTitle className={`text-${wizardConfig.theme.primary}-900 font-semibold text-base`}>
                        Aide à la décision
                      </AlertTitle>
                    </div>
                    <AlertDescription className={`text-${wizardConfig.theme.primary}-800 leading-relaxed ml-11`}>
                      <div 
                        className={`prose prose-sm max-w-none
                          prose-strong:text-${wizardConfig.theme.primary}-900 prose-strong:font-semibold
                          prose-ul:space-y-1 prose-li:text-${wizardConfig.theme.primary}-800
                          prose-em:text-${wizardConfig.theme.primary}-700 prose-em:italic`}
                        dangerouslySetInnerHTML={{ __html: currentQuestion.hint }} 
                      />
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="space-y-6">
                {/* Boutons de réponse */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    variant={selectedAnswer === "yes" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setSelectedAnswer("yes")}
                    className={`
                      h-16 text-lg font-medium transition-all duration-200 group
                      ${selectedAnswer === "yes" 
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-lg scale-105" 
                        : "border-2 border-green-200 text-green-700 hover:border-green-300 hover:bg-green-50"
                      }
                    `}
                  >
                    <CheckCircle className={`mr-3 h-5 w-5 transition-transform group-hover:scale-110 ${
                      selectedAnswer === "yes" ? "text-white" : "text-green-600"
                    }`} />
                    Oui
                  </Button>
                  <Button
                    variant={selectedAnswer === "no" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setSelectedAnswer("no")}
                    className={`
                      h-16 text-lg font-medium transition-all duration-200 group
                      ${selectedAnswer === "no" 
                        ? "bg-red-600 hover:bg-red-700 text-white shadow-lg scale-105" 
                        : "border-2 border-red-200 text-red-700 hover:border-red-300 hover:bg-red-50"
                      }
                    `}
                  >
                    <XCircle className={`mr-3 h-5 w-5 transition-transform group-hover:scale-110 ${
                      selectedAnswer === "no" ? "text-white" : "text-red-600"
                    }`} />
                    Non
                  </Button>
                </div>

                {/* Zone de justification */}
                <div className="space-y-3">
                  <label htmlFor="justification" className="text-sm font-medium flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-gray-500" />
                    Justification (optionnelle)
                  </label>
                  <Textarea
                    id="justification"
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    placeholder="Expliquez votre réponse pour documenter votre évaluation..."
                    rows={3}
                    className={`resize-none focus:ring-2 focus:ring-${wizardConfig.theme.primary}-500 focus:border-transparent`}
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  onClick={goBack}
                  disabled={!canGoBack()}
                  className="sm:w-auto w-full"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
                
                <Button
                  onClick={handleAnswer}
                  disabled={!selectedAnswer}
                  variant="medical"
                  className="sm:w-auto w-full"
                >
                  Continuer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Résultat */}
      {session && session.status === "completed" && session.result && (
        <div className="space-y-6">
          <div className="text-center">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
              session.result.variant === "success" || session.result.id === "MEDICAL_DEVICE"
                ? "bg-green-100 text-green-600" 
                : session.result.variant === "info"
                ? `bg-${wizardConfig.theme.primary}-100 text-${wizardConfig.theme.primary}-600`
                : "bg-red-100 text-red-600"
            }`}>
              {session.result.variant === "success" || session.result.id === "MEDICAL_DEVICE" ? (
                <CheckCircle className="w-10 h-10" />
              ) : session.result.variant === "info" ? (
                <FileText className="w-10 h-10" />
              ) : (
                <XCircle className="w-10 h-10" />
              )}
            </div>
            <Badge variant={session.result.variant} className="text-lg px-4 py-2">
              Évaluation terminée
            </Badge>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle 
                className="text-2xl"
                dangerouslySetInnerHTML={{ __html: session.result.title }}
              />
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className="text-center text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: session.result.description }}
              />

              {session.result.recommendations && (
                <Alert variant={session.result.variant}>
                  <FileText className="h-4 w-4" />
                  <AlertTitle>Recommandations</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {session.result.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleExport} variant="medical" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter le rapport
                </Button>
                <Button onClick={handleRestart} variant="outline" className="flex-1">
                  Nouvelle évaluation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}