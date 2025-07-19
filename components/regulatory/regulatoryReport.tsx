// components/regulatory/RegulatoryReport.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText, Calendar, User, Building, Award, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RegulatorySession, RegulatoryReport as RegulatoryReportType } from "@/types/regulatory";
import { formatDate, stripHtml } from "@/lib/utils";
import { RegulatoryPDFGenerator } from "@/lib/pdf/regulatoryPDFGenerator";
import { APP_NAME } from "@/lib/config";

interface RegulatoryReportProps {
  session: RegulatorySession;
  onBack: () => void;
}

export function RegulatoryReport({ session, onBack }: RegulatoryReportProps) {
  const [evaluatorName, setEvaluatorName] = useState("");
  const [evaluatorRole, setEvaluatorRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generateReport = (): RegulatoryReportType => {
    const reportId = `QARA-REG-${Date.now().toString(36).toUpperCase()}`;
    
    return {
      reportId,
      metadata: {
        productName: session.productName,
        intendedUse: session.intendedUse,
        generatedAt: new Date(),
        toolVersion: "2.1",
        regulation: "MDR 2017/745 • IVDR 2017/746",
      },
      questionnaire: {
        totalQuestions: 3,
        answeredQuestions: session.steps.length,
        steps: session.steps,
      },
      result: session.result!,
      conclusion: session.result?.id === "MDR" 
        ? `Le dispositif "${session.productName}" relève du règlement MDR 2017/745 (dispositifs médicaux).`
        : `Le dispositif "${session.productName}" relève du règlement IVDR 2017/746 (dispositifs de diagnostic in vitro).`,
      signature: {
        evaluatorName: evaluatorName.trim() || undefined,
        evaluatorRole: evaluatorRole.trim() || undefined,
        organization: organization.trim() || undefined,
        date: new Date(),
      },
    };
  };

  const handleDownloadJSON = () => {
    try {
      const report = generateReport();
      const dataStr = JSON.stringify(report, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `regulatory-${session.productName.replace(/[^a-zA-Z0-9]/g, '-')}-${report.reportId}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de la génération du JSON:', error);
      alert('Erreur lors de la génération du fichier JSON. Veuillez réessayer.');
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const generator = new RegulatoryPDFGenerator();
      await generator.generatePDF(session, {
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

  const isMDR = session.result?.id === "MDR";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8"
    >
      {/* Header avec actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-900 self-start">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l&apos;évaluation
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={handleDownloadJSON} 
            className="shadow-sm w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="sm:hidden">Télécharger JSON</span>
            <span className="hidden sm:inline">Export JSON</span>
          </Button>
          <Button 
            variant="medical" 
            onClick={handleDownloadPDF} 
            disabled={isGeneratingPDF}
            className="shadow-sm w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGeneratingPDF ? (
              <span>Génération...</span>
            ) : (
              <>
                <span className="sm:hidden">Télécharger PDF</span>
                <span className="hidden sm:inline">Export PDF</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Informations évaluateur */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-cyan-50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">Informations de l&apos;évaluateur</CardTitle>
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

      {/* Résumé exécutif */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${isMDR ? 'bg-indigo-100' : 'bg-cyan-100'}`}>
                {isMDR ? (
                  <FileText className="h-6 w-6 text-indigo-600" />
                ) : (
                  <CheckCircle2 className="h-6 w-6 text-cyan-600" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Résultat de l&apos;évaluation</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{formatDate(new Date())}</span>
                </div>
              </div>
            </div>
            <Badge 
              variant={isMDR ? "info" : "success"} 
              className="text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 font-medium self-start sm:self-center"
            >
              {isMDR ? "MDR 2017/745" : "IVDR 2017/746"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Dispositif évalué</h3>
                <p className="text-lg font-medium text-indigo-600 break-words">{session.productName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Usage prévu</h3>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {session.intendedUse}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Alert variant={session.result?.variant} className="border-l-4">
                <FileText className="h-4 w-4" />
                <AlertTitle className="text-base">
                  {stripHtml(session.result?.title || '')}
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <div dangerouslySetInnerHTML={{ __html: session.result?.description || '' }} />
                </AlertDescription>
              </Alert>
              
              <div className={`p-4 rounded-lg border-l-4 ${
                isMDR ? 'bg-indigo-50 border-indigo-400' : 'bg-cyan-50 border-cyan-400'
              }`}>
                <h4 className={`font-medium mb-2 ${
                  isMDR ? 'text-indigo-900' : 'text-cyan-900'
                }`}>
                  Réglementation applicable
                </h4>
                <p className={`text-sm ${
                  isMDR ? 'text-indigo-800' : 'text-cyan-800'
                }`}>
                  {isMDR ? 'MDR 2017/745 • MDCG 2019-11 Figure 2' : 'IVDR 2017/746 • MDCG 2019-11 Figure 2'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Détail du questionnaire */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            Détail de l&apos;évaluation
          </CardTitle>
          <CardDescription>
            Questionnaire MDCG 2019-11 Figure 2 - {session.steps.length} questions répondues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {session.steps.map((step, index) => (
              <div key={step.questionId} className="border-l-4 border-gray-200 pl-4 sm:pl-6 py-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 min-w-0">
                    <div>
                      <h4 className="font-medium text-gray-900 break-words">
                        <div dangerouslySetInnerHTML={{ __html: step.questionText }} />
                      </h4>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <Badge 
                        variant={step.answer.value === "yes" ? "success" : "destructive"}
                        className="font-medium self-start"
                      >
                        {step.answer.value === "yes" ? "✓ OUI" : "✗ NON"}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDate(step.answer.timestamp)}
                      </span>
                    </div>
                    {step.answer.justification && (
                      <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                        <p className="text-sm text-gray-700 italic break-words">
                          <strong>Justification :</strong> {step.answer.justification}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Rapport généré par {APP_NAME} • Version 1 • {formatDate(new Date())}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Conforme aux guidelines MDCG 2019-11 rev.1 - Figure 2
        </p>
      </div>
    </motion.div>
  );
}