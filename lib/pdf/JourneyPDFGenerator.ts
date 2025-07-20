// lib/pdf/JourneyPDFGenerator.ts
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { APP_NAME } from "@/lib/config";

export interface JourneySignature {
  evaluatorName?: string;
  evaluatorRole?: string;
  organization?: string;
}

export class JourneyPDFGenerator {
  private formatDate(date: Date): string {
    return format(date, "PPP", { locale: fr });
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]+>/g, "").trim();
  }

  private formatStepAnswer(answer: unknown): string {
    const answerData = answer as { value?: string | boolean; justification?: string };
    if (!answerData || answerData.value === undefined) return "Non répondu";

    switch (answerData.value) {
      case "yes":
      case true:
        return "✅ Oui";
      case "no":
      case false:
        return "❌ Non";
      default:
        return String(answerData.value);
    }
  }

  async generateJourneyPDF(
    journeySession: unknown,
    signature?: JourneySignature
  ) {
    const htmlContent = this.generateJourneyHTMLContent(journeySession, signature);
    const sessionData = journeySession as { productName?: string };
    this.downloadHTMLAsPDF(htmlContent, sessionData.productName || "rapport");
  }

  private downloadHTMLAsPDF(htmlContent: string, productName: string) {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `parcours-complet-${productName.replace(/[^a-zA-Z0-9]/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private generateSessionDetail(session: unknown, toolName: string, toolIcon: string): string {
    const sessionData = session as {
      productName?: string;
      intendedUse?: string;
      completedAt?: string;
      steps?: Array<{
        questionId?: string;
        questionText?: string;
        answer?: {
          value?: string | boolean;
          timestamp?: string;
          justification?: string;
        };
      }>;
      result?: {
        title?: string;
        description?: string;
      };
    };

    if (!sessionData) {
      return `<div class="tool-detail-section">
        <p>❌ Session non trouvée pour ${toolName}</p>
      </div>`;
    }

    let detailHtml = `
      <div class="tool-detail-section">
        <div class="tool-detail-header">
          <div class="tool-detail-icon">${toolIcon}</div>
          <div class="tool-detail-title">${toolName}</div>
        </div>
        
        <div class="tool-detail-summary">
          <div class="summary-grid-detail">
            <div class="summary-item-detail">
              <div class="summary-label">Produit évalué</div>
              <div class="summary-value">${sessionData.productName || "Non spécifié"}</div>
            </div>
            <div class="summary-item-detail">
              <div class="summary-label">Date d'évaluation</div>
              <div class="summary-value">${sessionData.completedAt ? this.formatDate(new Date(sessionData.completedAt)) : "Non complété"}</div>
            </div>
          </div>
          
          ${sessionData.intendedUse ? `
            <div class="intended-use-section">
              <div class="summary-label">Usage prévu</div>
              <div class="intended-use-text">${this.stripHtml(sessionData.intendedUse)}</div>
            </div>
          ` : ""}
        </div>

        <div class="questions-responses-section">
          <h4 class="section-subtitle">📝 Questions et Réponses</h4>
          <div class="questions-container">`;

    // Parcourir les steps qui contiennent les questions et réponses
    if (sessionData.steps && Array.isArray(sessionData.steps)) {
      if (sessionData.steps.length === 0) {
        detailHtml += `<div class="info-message">Aucune étape trouvée dans cette session.</div>`;
      } else {
        let questionsFound = 0;
        sessionData.steps.forEach((step, index) => {
          // Structure réelle : { questionId, questionText, answer }
          if (step.questionId && step.questionText && step.answer) {
            questionsFound++;
            detailHtml += `
              <div class="question-block">
                <div class="question-title">❓ Question ${index + 1}</div>
                
                <div class="question-content">
                  ${this.stripHtml(step.questionText)}
                </div>
                
                <div class="response-value">
                  <strong>Réponse :</strong> ${this.formatStepAnswer(step.answer)}
                </div>
                
                ${step.answer.justification ? `
                  <div class="response-justification">
                    <strong>Justification :</strong> ${this.stripHtml(step.answer.justification)}
                  </div>
                ` : ""}
                
                <div class="question-meta">
                  <small class="text-gray-500">ID: ${step.questionId} • Répondu le ${step.answer.timestamp ? new Date(step.answer.timestamp).toLocaleString('fr-FR') : 'Date inconnue'}</small>
                </div>
              </div>`;
          }
        });
        
        if (questionsFound === 0) {
          detailHtml += `<div class="info-message">Structure des steps non reconnue pour cet outil.</div>`;
        }
      }
    } else {
      detailHtml += `<div class="info-message">Aucune étape (steps) trouvée pour cet outil.</div>`;
    }

    detailHtml += `
          </div>
        </div>

        <div class="tool-result-section">
          <h4 class="section-subtitle">🎯 Résultat Final</h4>
          <div class="final-result-card">
            <div class="result-title">${this.stripHtml(sessionData.result?.title || "Résultat non disponible")}</div>
            ${sessionData.result?.description ? `
              <div class="result-description">${this.stripHtml(sessionData.result.description)}</div>
            ` : ""}
          </div>
        </div>
      </div>`;

    return detailHtml;
  }

  private generateJourneyHTMLContent(
    journeySession: unknown,
    signature?: JourneySignature
  ): string {
    const sessionData = journeySession as {
      id?: string;
      productName?: string;
      intendedUse?: string;
      qualificationSession?: { result?: { id?: string; title?: string; description?: string } };
      regulatorySession?: { result?: { id?: string; title?: string; description?: string } };
      classificationDmSession?: { result?: { title?: string; description?: string } };
      classificationDmdivSession?: { result?: { title?: string; description?: string } };
      safetyClassificationSession?: { result?: { title?: string; description?: string } };
    };
    
    const reportId = `PARCOURS-${sessionData.id}`;
    
    // Déterminer les résultats clés
    const isQualified = sessionData.qualificationSession?.result?.id === "MEDICAL_DEVICE";
    const regulatoryFramework = sessionData.regulatorySession?.result?.id;
    const deviceClass = sessionData.classificationDmSession?.result?.title || 
                       sessionData.classificationDmdivSession?.result?.title;
    const safetyClass = sessionData.safetyClassificationSession?.result?.title;

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Parcours Complet - ${sessionData.productName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #ffffff;
        }

        .container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 3px solid #3b82f6;
            position: relative;
        }

        .header::before {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #06b6d4);
        }

        .logo {
            font-size: 28px;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 10px;
        }

        .report-title {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 8px;
        }

        .report-subtitle {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 15px;
        }

        .report-id {
            font-size: 12px;
            color: #9ca3af;
            font-family: 'Courier New', monospace;
            background: #f3f4f6;
            padding: 5px 10px;
            border-radius: 4px;
            display: inline-block;
        }

        .section {
            margin-bottom: 35px;
            break-inside: avoid;
        }

        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-icon {
            font-size: 20px;
        }

        .section-subtitle {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 12px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }

        .summary-card {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
        }

        .summary-label {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
            margin-bottom: 5px;
        }

        .summary-value {
            color: #1f2937;
            font-size: 16px;
            font-weight: 500;
        }

        .result-card {
            background: #f0f9ff;
            border: 2px solid #3b82f6;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            position: relative;
            overflow: hidden;
        }

        .result-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #06b6d4);
        }

        .tool-detail-section {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
            page-break-inside: avoid;
        }

        .tool-detail-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f3f4f6;
        }

        .tool-detail-icon {
            background: #3b82f6;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .tool-detail-title {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
        }

        .tool-detail-summary {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
        }

        .summary-grid-detail {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }

        .summary-item-detail {
            background: white;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }

        .intended-use-section {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }

        .intended-use-text {
            color: #374151;
            font-style: italic;
            margin-top: 5px;
        }

        .questions-responses-section {
            margin-bottom: 25px;
        }

        .questions-container {
            space-y: 20px;
        }

        .question-block {
            background: #fafafa;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            page-break-inside: avoid;
        }

        .question-title {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 8px;
        }

        .question-content {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            margin-bottom: 15px;
            color: #374151;
            line-height: 1.6;
        }

        .response-value {
            background: #f0f9ff;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #3b82f6;
            margin-bottom: 10px;
        }

        .response-value strong {
            color: #1e40af;
        }

        .response-justification {
            background: #f0fdf4;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #10b981;
            font-size: 14px;
        }

        .response-justification strong {
            color: #065f46;
        }

        .question-meta {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #f3f4f6;
        }

        .question-meta small {
            color: #9ca3af;
            font-size: 11px;
        }

        .tool-result-section {
            border-top: 2px solid #f3f4f6;
            padding-top: 20px;
        }

        .final-result-card {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #3b82f6;
            border-radius: 10px;
            padding: 20px;
        }

        .result-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 8px;
        }

        .result-description {
            color: #1e40af;
            font-size: 14px;
        }

        .info-message {
            background: #e3f2fd;
            border: 1px solid #2196f3;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            color: #1565c0;
            text-align: center;
            font-style: italic;
        }

        .recommendations-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
        }

        .recommendation-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 3px solid #10b981;
        }

        .signature-section {
            background: #f8fafc;
            padding: 25px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }

        .signature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        .signature-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
        }

        .footer-logo {
            font-weight: 600;
            color: #3b82f6;
        }

        @media print {
            .container {
                box-shadow: none;
                padding: 15mm;
            }
            
            .section {
                break-inside: avoid;
            }
            
            .tool-detail-section {
                break-inside: avoid;
            }
            
            .question-block {
                break-inside: avoid;
            }
        }

        @page {
            size: A4;
            margin: 15mm;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">🧭 ${APP_NAME}</div>
            <div class="report-title">Rapport de Parcours Complet</div>
            <div class="report-subtitle">Qualification et Classification Complète</div>
            <div class="report-id">ID: ${reportId}</div>
        </div>

        <!-- Résumé exécutif -->
        <div class="section">
            <div class="section-title">
                <span class="section-icon">📋</span>
                Résumé Exécutif
            </div>
            
            <div class="result-card">
                <h3 style="font-size: 20px; font-weight: 700; color: #1e40af; margin-bottom: 15px;">
                    ${sessionData.productName}
                </h3>
                <p style="color: #374151; margin-bottom: 20px;">
                    ${sessionData.intendedUse}
                </p>
                
                <div class="summary-grid">
                    <div class="summary-card">
                        <div class="summary-label">Statut Réglementaire</div>
                        <div class="summary-value">
                            ${isQualified ? "✅ Dispositif Médical" : "❌ Non-Dispositif Médical"}
                        </div>
                    </div>
                    
                    ${regulatoryFramework ? `
                    <div class="summary-card">
                        <div class="summary-label">Réglementation</div>
                        <div class="summary-value">${regulatoryFramework}</div>
                    </div>
                    ` : ''}
                    
                    ${deviceClass ? `
                    <div class="summary-card">
                        <div class="summary-label">Classe de Risque</div>
                        <div class="summary-value">${this.stripHtml(deviceClass)}</div>
                    </div>
                    ` : ''}
                    
                    ${safetyClass ? `
                    <div class="summary-card">
                        <div class="summary-label">Classe de Sécurité</div>
                        <div class="summary-value">${this.stripHtml(safetyClass)}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>

        <!-- Détail complet du parcours avec questions/réponses -->
        <div class="section">
            <div class="section-title">
                <span class="section-icon">🔍</span>
                Détail Complet du Parcours
            </div>
            
            ${sessionData.qualificationSession ? 
              this.generateSessionDetail(
                sessionData.qualificationSession, 
                "Qualification Dispositif Médical", 
                "🏥"
              ) : ''}

            ${sessionData.regulatorySession ? 
              this.generateSessionDetail(
                sessionData.regulatorySession, 
                "Qualification Réglementaire", 
                "📋"
              ) : ''}

            ${sessionData.classificationDmSession ? 
              this.generateSessionDetail(
                sessionData.classificationDmSession, 
                "Classification DM (MDR)", 
                "📊"
              ) : ''}

            ${sessionData.classificationDmdivSession ? 
              this.generateSessionDetail(
                sessionData.classificationDmdivSession, 
                "Classification DMDIV (IVDR)", 
                "🧪"
              ) : ''}

            ${sessionData.safetyClassificationSession ? 
              this.generateSessionDetail(
                sessionData.safetyClassificationSession, 
                "Classification Sécurité (IEC 62304)", 
                "🛡️"
              ) : ''}
        </div>

        <!-- Recommandations consolidées -->
        <div class="section">
            <div class="section-title">
                <span class="section-icon">💡</span>
                Recommandations Consolidées
            </div>
            
            <div class="recommendations-grid">
                <div class="recommendation-item">
                    <strong>Conformité Réglementaire</strong><br>
                    Suivre les exigences ${regulatoryFramework || 'applicables'} pour ${deviceClass || 'votre classe'}
                </div>
                
                <div class="recommendation-item">
                    <strong>Développement Logiciel</strong><br>
                    Appliquer IEC 62304 selon ${safetyClass || 'la classification de sécurité'}
                </div>
                
                <div class="recommendation-item">
                    <strong>Système Qualité</strong><br>
                    Mettre en place ISO 13485 adapté à votre classe de risque
                </div>
                
                <div class="recommendation-item">
                    <strong>Gestion des Risques</strong><br>
                    Implémenter ISO 14971 avec focus sur les risques logiciels
                </div>
            </div>
        </div>

        <!-- Signature -->
        ${signature ? `
        <div class="section">
            <div class="section-title">
                <span class="section-icon">✍️</span>
                Informations de l'évaluateur
            </div>
            <div class="signature-section">
                <div class="signature-grid">
                    ${signature.evaluatorName ? `
                        <div class="signature-item">
                            <div class="summary-label">Nom complet</div>
                            <div class="summary-value">${signature.evaluatorName}</div>
                        </div>
                    ` : ''}
                    ${signature.evaluatorRole ? `
                        <div class="signature-item">
                            <div class="summary-label">Fonction</div>
                            <div class="summary-value">${signature.evaluatorRole}</div>
                        </div>
                    ` : ''}
                    ${signature.organization ? `
                        <div class="signature-item">
                            <div class="summary-label">Organisation</div>
                            <div class="summary-value">${signature.organization}</div>
                        </div>
                    ` : ''}
                    <div class="signature-item">
                        <div class="summary-label">Date de signature</div>
                        <div class="summary-value">${this.formatDate(new Date())}</div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">${APP_NAME}</div>
            <div>Parcours Complet • Généré le ${this.formatDate(new Date())}</div>
        </div>
    </div>
</body>
</html>
    `;
  }
}