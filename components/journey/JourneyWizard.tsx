// components/journey/JourneyWizard.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Minus, Download, User, Award, Building, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  QualificationStepWrapper,
  RegulatoryStepWrapper,
  ClassificationDmStepWrapper,
  ClassificationDmdivStepWrapper,
  SafetyClassificationStepWrapper
} from "@/components/journey/JourneyStepComponents";

import { useJourney } from "@/hooks/useJourney";
import { useQualification } from "@/hooks/useQualification";
import { useRegulatory } from "@/hooks/useRegulatory";
import { useClassification } from "@/hooks/useClassificationDm";
import { useClassificationDmdiv } from "@/hooks/useClassificationDmdiv";
import { useSafetyClassification } from "@/hooks/useSafetyClassification";

import { JourneyStepType } from "@/types/journey";
import { JOURNEY_STEPS_CONFIG } from "@/lib/journey/config";
import { JourneyPDFGenerator } from "@/lib/pdf/JourneyPDFGenerator";
import { APP_NAME } from "@/lib/config";

interface JourneyWizardProps {
  onBack: () => void;
}

export function JourneyWizard({ onBack }: JourneyWizardProps) {
  const [productName, setProductName] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [lastCompletedStep, setLastCompletedStep] = useState<{
    stepId: JourneyStepType;
    session: any;
    result: any;
  } | null>(null);

  const {
    journeySession,
    startJourney,
    completeStep,
    goToStep,
    resetJourney,
    getProgress
  } = useJourney();

  // Hooks pour chaque outil
  const qualificationTool = useQualification();
  const regulatoryTool = useRegulatory();
  const classificationDmTool = useClassification();
  const classificationDmdivTool = useClassificationDmdiv();
  const safetyClassificationTool = useSafetyClassification();

  const handleStartJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim() && intendedUse.trim()) {
      startJourney(productName.trim(), intendedUse.trim());
      // Démarrer le premier outil
      qualificationTool.startSession(productName.trim(), intendedUse.trim());
    }
  };

  const handleStepComplete = (stepId: JourneyStepType, session: any, result: any) => {
    completeStep(stepId, session, result);
    
    // Stocker les informations de l'étape terminée
    setLastCompletedStep({ stepId, session, result });
    
    // Déterminer s'il y a une étape suivante
    const hasNextStep = determineHasNextStep(stepId, result);
    
    if (hasNextStep) {
      // Afficher le bouton continuer au lieu de passer automatiquement
      setShowContinueButton(true);
    }
  };

  const determineHasNextStep = (stepId: JourneyStepType, result: any): boolean => {
    switch (stepId) {
      case "qualification":
        return result?.id === "MEDICAL_DEVICE";
      case "regulatory":
        return result?.id === "MDR" || result?.id === "IVDR";
      case "classificationDm":
      case "classificationDmdiv":
        return true; // Toujours aller vers safety classification
      case "safetyClassification":
        return false; // Dernière étape
      default:
        return false;
    }
  };

  const handleContinueToNextStep = () => {
    if (!lastCompletedStep || !journeySession) return;
    
    const { stepId, result } = lastCompletedStep;
    
    // Déterminer et démarrer la prochaine étape
    if (stepId === "qualification" && result?.id === "MEDICAL_DEVICE") {
      regulatoryTool.startSession(journeySession.productName, journeySession.intendedUse);
    } else if (stepId === "regulatory") {
      if (result?.id === "MDR") {
        classificationDmTool.startSession(journeySession.productName, journeySession.intendedUse);
      } else if (result?.id === "IVDR") {
        classificationDmdivTool.startSession(journeySession.productName, journeySession.intendedUse);
      }
    } else if ((stepId === "classificationDm" || stepId === "classificationDmdiv") && result) {
      safetyClassificationTool.startSession(journeySession.productName, journeySession.intendedUse);
    }
    
    // Cacher le bouton continuer
    setShowContinueButton(false);
    setLastCompletedStep(null);
  };

  const getStepIcon = (stepId: JourneyStepType) => {
    const config = JOURNEY_STEPS_CONFIG[stepId];
    return config.icon;
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100 border-green-300";
      case "in-progress": return "text-blue-600 bg-blue-100 border-blue-300";
      case "skipped": return "text-gray-400 bg-gray-100 border-gray-300";
      default: return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  const renderStepContent = () => {
    if (!journeySession) return null;

    const currentStep = journeySession.currentStepId;

    // Vérifier si l'outil actuel est terminé et afficher le bouton continuer
    const currentTool = getCurrentTool(currentStep);
    if (currentTool?.session?.status === "completed" && 
        currentTool?.session?.result && 
        !showContinueButton &&
        currentTool.session && 
        currentTool.session.result) {
      // Déclencher l'affichage du bouton automatiquement
      setTimeout(() => {
        handleStepComplete(currentStep, currentTool.session!, currentTool.session!.result);
      }, 100);
    }

    // Afficher le bouton continuer si une étape vient d'être terminée
    if (showContinueButton && lastCompletedStep) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative min-h-[600px] flex items-center justify-center"
        >
          {/* Fond avec dégradé et formes organiques */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />
            
            {/* Formes décoratives */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-xl" />
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-teal-200/20 to-emerald-300/30 rounded-full blur-2xl" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-8 py-16 text-center space-y-12">
            {/* Icône de succès avec animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.3 }}
              className="mx-auto relative"
            >
              <div className="w-28 h-28 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-2xl animate-pulse opacity-75" />
                <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle className="w-14 h-14 text-white drop-shadow-lg" />
                </div>
              </div>
            </motion.div>
            
            {/* Titre et badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full border border-emerald-200/50 shadow-lg">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-semibold text-emerald-800">Étape Terminée</span>
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                Excellent travail !
              </h1>
              
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                L'outil <span className="font-bold text-emerald-700">{JOURNEY_STEPS_CONFIG[lastCompletedStep.stepId]?.name}</span> a été complété avec succès.
              </p>
            </motion.div>

            {/* Résultat - Design épuré sans rectangles emboîtés */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-8"
            >
              {/* Header du résultat */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                  <span className="text-white font-bold text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Résultat obtenu</h2>
              </div>
              
              {/* Contenu du résultat - style organique */}
              <div className="relative max-w-3xl mx-auto">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full mt-2 flex-shrink-0 shadow-lg" />
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold text-emerald-900 leading-relaxed">
                        {lastCompletedStep.result?.title}
                      </h3>
                      {lastCompletedStep.result?.description && (
                        <div 
                          className="text-slate-700 text-lg leading-relaxed prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{ 
                            __html: lastCompletedStep.result.description 
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Ligne décorative */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
              </div>
            </motion.div>
            
            {/* Bouton d'action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-8"
            >
              <Button 
                variant="medical" 
                size="lg"
                onClick={handleContinueToNextStep}
                className="group relative overflow-hidden h-16 px-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0 text-lg font-bold rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-4">
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>Continuer vers l'étape suivante</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-200" />
                </div>
              </Button>
            </motion.div>

            {/* Message encourageant - style minimaliste */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="pt-4"
            >
              <p className="text-blue-600 font-medium flex items-center justify-center gap-3">
                <span className="text-2xl">🎉</span>
                <span>Prêt à passer à l'étape suivante ?</span>
                <span className="text-2xl">🚀</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    switch (currentStep) {
      case "qualification":
        return (
          <QualificationStepWrapper
            tool={qualificationTool}
            onComplete={(session: any, result: any) => handleStepComplete("qualification", session, result)}
            productName={journeySession.productName}
            intendedUse={journeySession.intendedUse}
          />
        );
      case "regulatory":
        return (
          <RegulatoryStepWrapper
            tool={regulatoryTool}
            onComplete={(session: any, result: any) => handleStepComplete("regulatory", session, result)}
            productName={journeySession.productName}
            intendedUse={journeySession.intendedUse}
          />
        );
      case "classificationDm":
        return (
          <ClassificationDmStepWrapper
            tool={classificationDmTool}
            onComplete={(session: any, result: any) => handleStepComplete("classificationDm", session, result)}
            productName={journeySession.productName}
            intendedUse={journeySession.intendedUse}
          />
        );
      case "classificationDmdiv":
        return (
          <ClassificationDmdivStepWrapper
            tool={classificationDmdivTool}
            onComplete={(session: any, result: any) => handleStepComplete("classificationDmdiv", session, result)}
            productName={journeySession.productName}
            intendedUse={journeySession.intendedUse}
          />
        );
      case "safetyClassification":
        return (
          <SafetyClassificationStepWrapper
            tool={safetyClassificationTool}
            onComplete={(session: any, result: any) => handleStepComplete("safetyClassification", session, result)}
            productName={journeySession.productName}
            intendedUse={journeySession.intendedUse}
          />
        );
      case "final":
        return <JourneyFinalReport journeySession={journeySession} />;
      default:
        return null;
    }
  };

  const getCurrentTool = (stepId: JourneyStepType) => {
    switch (stepId) {
      case "qualification": return qualificationTool;
      case "regulatory": return regulatoryTool;
      case "classificationDm": return classificationDmTool;
      case "classificationDmdiv": return classificationDmdivTool;
      case "safetyClassification": return safetyClassificationTool;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">
                🧭 Parcours Guidé - {APP_NAME}
              </h1>
            </div>
            {journeySession && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Progression</span>
                <div className="w-32">
                  <Progress value={getProgress()} />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {getProgress()}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {!journeySession ? (
          // Formulaire de démarrage
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  🧭 Parcours Guidé Complet
                </CardTitle>
                <CardDescription>
                  Un parcours étape par étape pour qualifier et classifier votre dispositif médical
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6 border-blue-200 bg-blue-50">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-900">Parcours contrôlé</AlertTitle>
                  <AlertDescription className="text-blue-800">
                    Vous aurez la possibilité de valider chaque résultat avant de passer à l'étape suivante.
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleStartJourney} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nom du produit *
                    </label>
                    <Input
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Ex: MonApp Diagnostic, Système CardioMonitor, etc."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Usage prévu *
                    </label>
                    <Textarea
                      value={intendedUse}
                      onChange={(e) => setIntendedUse(e.target.value)}
                      placeholder="Décrivez précisément l'usage prévu de votre produit..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Aperçu du parcours */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Étapes du parcours :</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(JOURNEY_STEPS_CONFIG).map(([key, config]) => (
                        <div key={key} className="flex items-center space-x-2 text-sm">
                          <span>{config.icon}</span>
                          <span className="text-gray-700">{config.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" variant="medical">
                    Démarrer le parcours
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          // Interface du parcours
          <div className="space-y-8">
            {/* Barre de progression des étapes */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {journeySession.productName}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetJourney}
                  >
                    Recommencer
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 overflow-x-auto pb-4">
                  {Object.entries(journeySession.steps).map(([stepId, step], index) => (
                    <div key={stepId} className="flex items-center space-x-2 flex-shrink-0">
                      <motion.div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium
                          cursor-pointer transition-all duration-200 border-2
                          ${getStepColor(step.status)}
                          ${step.status === "in-progress" ? "ring-2 ring-blue-500 ring-offset-2" : ""}
                        `}
                        onClick={() => step.status === "completed" && goToStep(stepId as JourneyStepType)}
                        whileHover={step.status === "completed" ? { scale: 1.05 } : undefined}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : step.status === "in-progress" ? (
                          <Clock className="w-6 h-6" />
                        ) : step.status === "skipped" ? (
                          <Minus className="w-6 h-6" />
                        ) : (
                          <span className="text-lg">{getStepIcon(stepId as JourneyStepType)}</span>
                        )}
                      </motion.div>
                      <div className="text-left min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{step.name}</div>
                        <Badge
                          variant={
                            step.status === "completed" ? "success" :
                            step.status === "in-progress" ? "info" :
                            step.status === "skipped" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {step.status === "completed" ? "Terminé" :
                           step.status === "in-progress" ? "En cours" :
                           step.status === "skipped" ? "Ignoré" : "En attente"}
                        </Badge>
                      </div>
                      {index < Object.keys(journeySession.steps).length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-400 ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contenu de l'étape actuelle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={showContinueButton ? "continue" : journeySession.currentStepId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function JourneyFinalReport({ journeySession }: { journeySession: any }) {
  const [evaluatorName, setEvaluatorName] = useState("");
  const [evaluatorRole, setEvaluatorRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleGeneratePDF = async () => {
    if (!journeySession) return;
    
    setIsGeneratingPDF(true);
    try {
      const generator = new JourneyPDFGenerator();
      await generator.generateJourneyPDF(journeySession, {
        evaluatorName: evaluatorName.trim() || undefined,
        evaluatorRole: evaluatorRole.trim() || undefined,
        organization: organization.trim() || undefined,
      });
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadJSON = () => {
    if (!journeySession) return;
    
    try {
      const journeyData = {
        reportId: `PARCOURS-${journeySession.id}`,
        productName: journeySession.productName,
        intendedUse: journeySession.intendedUse,
        generatedAt: new Date(),
        completedSteps: Object.entries(journeySession.steps)
          .filter(([_, step]: [string, any]) => step.status === "completed")
          .map(([key, _]: [string, any]) => key),
        results: {
          qualification: journeySession.qualificationSession?.result,
          regulatory: journeySession.regulatorySession?.result,
          classificationDm: journeySession.classificationDmSession?.result,
          classificationDmdiv: journeySession.classificationDmdivSession?.result,
          safetyClassification: journeySession.safetyClassificationSession?.result,
        },
        sessions: {
          qualification: journeySession.qualificationSession,
          regulatory: journeySession.regulatorySession,
          classificationDm: journeySession.classificationDmSession,
          classificationDmdiv: journeySession.classificationDmdivSession,
          safetyClassification: journeySession.safetyClassificationSession,
        },
        signature: {
          evaluatorName: evaluatorName.trim() || undefined,
          evaluatorRole: evaluatorRole.trim() || undefined,
          organization: organization.trim() || undefined,
          date: new Date(),
        }
      };
      
      const dataStr = JSON.stringify(journeyData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `parcours-${journeySession.productName.replace(/[^a-zA-Z0-9]/g, '-')}-${journeyData.reportId}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de la génération du JSON:', error);
      alert('Erreur lors de la génération du fichier JSON. Veuillez réessayer.');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-200 bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            📄 Rapport Final du Parcours
          </CardTitle>
          <CardDescription className="text-gray-800">
            Synthèse complète de votre évaluation
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Informations évaluateur */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">Informations de l'évaluateur</CardTitle>
              <CardDescription className="text-sm">Ces informations apparaîtront sur le rapport PDF</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4" />
                Nom complet
              </label>
              <Input
                value={evaluatorName}
                onChange={(e) => setEvaluatorName(e.target.value)}
                placeholder="Ex: Dr. Marie Dupont"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Fonction
              </label>
              <Input
                value={evaluatorRole}
                onChange={(e) => setEvaluatorRole(e.target.value)}
                placeholder="Ex: QARA Manager"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Organisation
              </label>
              <Input
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Ex: MedTech Solutions"
                className="bg-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Résultats pour : {journeySession.productName}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Résultats de qualification */}
            {journeySession.qualificationSession?.result && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Qualification</h3>
                <Badge variant="success" className="mb-2">
                  {journeySession.qualificationSession.result.title}
                </Badge>
                <p className="text-sm text-blue-800">
                  Votre produit est qualifié comme dispositif médical
                </p>
              </div>
            )}

            {/* Résultats réglementaires */}
            {journeySession.regulatorySession?.result && (
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-medium text-indigo-900 mb-2">Réglementation</h3>
                <Badge variant="info" className="mb-2">
                  {journeySession.regulatorySession.result.title}
                </Badge>
                <p className="text-sm text-indigo-800">
                  {journeySession.regulatorySession.result.id === "MDR" 
                    ? "Relève du règlement MDR 2017/745"
                    : "Relève du règlement IVDR 2017/746"
                  }
                </p>
              </div>
            )}

            {/* Classification DM */}
            {journeySession.classificationDmSession?.result && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Classification DM</h3>
                <Badge variant="warning" className="mb-2">
                  {journeySession.classificationDmSession.result.title}
                </Badge>
                <p className="text-sm text-green-800">
                  Classification selon la règle 11 du MDR
                </p>
              </div>
            )}

            {/* Classification DMDIV */}
            {journeySession.classificationDmdivSession?.result && (
              <div className="bg-cyan-50 p-4 rounded-lg">
                <h3 className="font-medium text-cyan-900 mb-2">Classification DMDIV</h3>
                <Badge variant="warning" className="mb-2">
                  {journeySession.classificationDmdivSession.result.title}
                </Badge>
                <p className="text-sm text-cyan-800">
                  Classification selon les règles IVDR
                </p>
              </div>
            )}

            {/* Classification sécurité */}
            {journeySession.safetyClassificationSession?.result && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">Classification Sécurité</h3>
                <Badge variant="destructive" className="mb-2">
                  {journeySession.safetyClassificationSession.result.title}
                </Badge>
                <p className="text-sm text-purple-800">
                  Classification selon IEC 62304 §4.3
                </p>
              </div>
            )}
          </div>

          {/* Résumé final */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Résumé Exécutif</h3>
            <div className="space-y-2 text-blue-800">
              <p>
                <strong>Produit :</strong> {journeySession.productName}
              </p>
              <p>
                <strong>Statut réglementaire :</strong> 
                {journeySession.qualificationSession?.result?.id === "MEDICAL_DEVICE" 
                  ? " Dispositif médical qualifié"
                  : " Non-dispositif médical"
                }
              </p>
              {journeySession.regulatorySession?.result && (
                <p>
                  <strong>Réglementation applicable :</strong> {journeySession.regulatorySession.result.id}
                </p>
              )}
              {(journeySession.classificationDmSession?.result || journeySession.classificationDmdivSession?.result) && (
                <p>
                  <strong>Classe de risque :</strong> 
                  {journeySession.classificationDmSession?.result?.title || 
                   journeySession.classificationDmdivSession?.result?.title}
                </p>
              )}
              {journeySession.safetyClassificationSession?.result && (
                <p>
                  <strong>Classe de sécurité logicielle :</strong> {journeySession.safetyClassificationSession.result.title}
                </p>
              )}
            </div>
          </div>

          {/* Recommandations consolidées */}
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4">💡 Prochaines Étapes Recommandées</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Conformité Réglementaire</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Mettre en place un système qualité ISO 13485</li>
                  <li>• Constituer la documentation technique</li>
                  <li>• Planifier l'évaluation clinique si nécessaire</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Développement Logiciel</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Appliquer la norme IEC 62304</li>
                  <li>• Conduire l'analyse des risques ISO 14971</li>
                  <li>• Évaluer l'utilisabilité IEC 62366-1</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button 
              variant="medical" 
              className="flex-1"
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
            >
              <Download className="mr-2 h-4 w-4" />
              {isGeneratingPDF ? "Génération..." : "📄 Télécharger rapport PDF complet"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleDownloadJSON}>
              📊 Exporter données JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}