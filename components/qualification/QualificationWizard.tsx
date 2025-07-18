"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, FileText, HelpCircle, CheckCircle, XCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useQualification } from "@/hooks/useQualification";
import { QualificationReport } from "./QualificationReport";

export function QualificationWizard() {
  const {
    session,
    startSession,
    getCurrentQuestion,
    answerQuestion,
    resetSession,
    getProgress,
    canGoBack,
    goBack,
  } = useQualification();

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
      <QualificationReport 
        session={session} 
        onBack={() => setShowReport(false)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Formulaire initial */}
      {!session && (
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Informations sur le produit
            </CardTitle>
            <CardDescription>
              Commençons par quelques informations de base sur votre logiciel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStartSession} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="productName" className="text-sm font-medium">
                  Nom du produit *
                </label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ex: MonApp Diagnostic, Système de Monitoring, etc."
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
                  placeholder="Décrivez précisément l'usage prévu de votre logiciel, ses fonctionnalités principales, les utilisateurs cibles, et les objectifs médicaux ou non-médicaux qu'il vise..."
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Plus votre description est précise, plus l'évaluation sera pertinente.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="medical"
                disabled={!productName.trim() || !intendedUse.trim()}
              >
                Démarrer l'évaluation
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
              Question {session.steps.length + 1} / 5
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
              <CardTitle className="text-xl">
                <div dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
              </CardTitle>
              {currentQuestion.hint && (
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    {showHint ? "Masquer l'aide" : "Afficher l'aide"}
                  </Button>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {showHint && currentQuestion.hint && (
                <Alert variant="info">
                  <HelpCircle className="h-4 w-4" />
                  <AlertTitle>Aide à la décision</AlertTitle>
                  <AlertDescription>
                    <div dangerouslySetInnerHTML={{ __html: currentQuestion.hint }} />
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={selectedAnswer === "yes" ? "success" : "outline"}
                    size="lg"
                    onClick={() => setSelectedAnswer("yes")}
                    className="h-16 text-lg"
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Oui
                  </Button>
                  <Button
                    variant={selectedAnswer === "no" ? "destructive" : "outline"}
                    size="lg"
                    onClick={() => setSelectedAnswer("no")}
                    className="h-16 text-lg"
                  >
                    <XCircle className="mr-2 h-5 w-5" />
                    Non
                  </Button>
                </div>

                <div className="space-y-2">
                  <label htmlFor="justification" className="text-sm font-medium">
                    Justification (optionnelle)
                  </label>
                  <Textarea
                    id="justification"
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    placeholder="Expliquez votre réponse pour documenter votre évaluation..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="ghost"
                  onClick={goBack}
                  disabled={!canGoBack}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
                
                <Button
                  onClick={handleAnswer}
                  disabled={!selectedAnswer}
                  variant="medical"
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
              session.result.id === "MEDICAL_DEVICE" 
                ? "bg-green-100 text-green-600" 
                : "bg-red-100 text-red-600"
            }`}>
              {session.result.id === "MEDICAL_DEVICE" ? (
                <CheckCircle className="w-10 h-10" />
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