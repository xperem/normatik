//components/regulatory/RegulatoryWizard.tsx

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
import { useRegulatory } from "@/hooks/useRegulatory";
import { RegulatoryReport } from "./regulatoryReport";

export function RegulatoryWizard() {
  const {
    session,
    startSession,
    getCurrentQuestion,
    answerQuestion,
    resetSession,
    getProgress,
    canGoBack,
    goBack,
  } = useRegulatory();

  const [productName, setProductName] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [justification, setJustification] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(null);
  const [showReport, setShowReport] = useState(false);

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
    setShowReport(false);
    setProductName("");
    setIntendedUse("");
    setJustification("");
    setSelectedAnswer(null);
    setShowHint(false);
  };

  const handleExport = () => {
    setShowReport(true);
  };

  if (showReport && session) {
    return (
      <RegulatoryReport 
        session={session} 
        onBack={() => setShowReport(false)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Formulaire initial */}
      {!session && (
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Informations sur le dispositif
            </CardTitle>
            <CardDescription>
              Évaluons si votre dispositif relève du MDR ou de l&apos;IVDR
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStartSession} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="productName" className="text-sm font-medium">
                  Nom du dispositif *
                </label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ex: Système DiagnoLab, Plateforme BioAnalyzer, etc."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="intendedUse" className="text-sm font-medium">
                  Usage prévu *
                </label>
                <Textarea
                  id="intendedUse"
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  placeholder="Décrivez précisément l'usage prévu de votre dispositif, le type de données traitées, les informations fournies, et l'objectif médical visé..."
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Précisez notamment le type d&apos;informations fournies (diagnostiques, préventives, etc.).
                </p>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900">Contexte réglementaire</AlertTitle>
                <AlertDescription className="text-blue-800">
                  Cet outil utilise la Figure 2 du MDCG 2019-11 pour différencier les dispositifs relevant du MDR (dispositifs médicaux classiques) de ceux relevant de l'IVDR (dispositifs de diagnostic in vitro).
                </AlertDescription>
              </Alert>

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
              Question {session.steps.length + 1} / 3
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
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md" 
                        : "border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50"
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
                  <Alert className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <Info className="h-4 w-4 text-indigo-600" />
                      </div>
                      <AlertTitle className="text-indigo-900 font-semibold text-base">
                        Aide à la décision
                      </AlertTitle>
                    </div>
                    <AlertDescription className="text-indigo-800 leading-relaxed ml-11">
                      <div 
                        className="prose prose-sm max-w-none
                          prose-strong:text-indigo-900 prose-strong:font-semibold
                          prose-ul:space-y-1 prose-li:text-indigo-800
                          prose-em:text-indigo-700 prose-em:italic"
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
                    className="resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  onClick={goBack}
                  disabled={!canGoBack}
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
              session.result.id === "MDR" 
                ? "bg-indigo-100 text-indigo-600" 
                : "bg-cyan-100 text-cyan-600"
            }`}>
              {session.result.id === "MDR" ? (
                <FileText className="w-10 h-10" />
              ) : (
                <CheckCircle className="w-10 h-10" />
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
