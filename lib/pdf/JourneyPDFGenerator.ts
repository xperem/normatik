// lib/pdf/JourneyPDFGenerator.ts
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { APP_NAME } from "@/lib/config";
import { JourneySession } from "@/types/journey";

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

  private formatQuestionResponse(question: any, response: any): string {
    if (!question || !response) return "";

    let formattedResponse = "";
    
    // Titre de la question
    formattedResponse += `<div class="question-block">
      <div class="question-title">❓ ${this.stripHtml(question.title)}</div>`;
    
    // Description si disponible
    if (question.description) {
      formattedResponse += `<div class="question-description">${this.stripHtml(question.description)}</div>`;
    }

    // Réponse selon le type
    switch (question.type) {
      case "boolean":
        formattedResponse += `<div class="response-value">
          <strong>Réponse :</strong> ${response.value ? "✅ Oui" : "❌ Non"}
        </div>`;
        break;
        
      case "single-choice":
        const selectedOption = question.options?.find((opt: any) => opt.id === response.value);
        formattedResponse += `<div class="response-value">
          <strong>Réponse :</strong> ${selectedOption ? this.stripHtml(selectedOption.label) : response.value}
        </div>`;
        break;
        
      case "multiple-choice":
        if (Array.isArray(response.value) && response.value.length > 0) {
          const selectedOptions = question.options?.filter((opt: any) => 
            response.value.includes(opt.id)
          ) || [];
          formattedResponse += `<div class="response-value">
            <strong>Réponses sélectionnées :</strong>
            <ul class="response-list">
              ${selectedOptions.map((opt: any) => 
                `<li>• ${this.stripHtml(opt.label)}</li>`
              ).join("")}
            </ul>
          </div>`;
        }
        break;
        
      case "text":
        formattedResponse += `<div class="response-value">
          <strong>Réponse :</strong> ${this.stripHtml(response.value || "")}
        </div>`;
        break;
        
      default:
        formattedResponse += `<div class="response-value">
          <strong>Réponse :</strong> ${this.stripHtml(String(response.value || ""))}
        </div>`;
    }

    // Justification si disponible
    if (response.justification && response.justification.trim()) {
      formattedResponse += `<div class="response-justification">
        <strong>Justification :</strong> ${this.stripHtml(response.justification)}
      </div>`;
    }

    formattedResponse += `</div>`;
    return formattedResponse;
  }

  private generateSessionDetail(session: any, toolName: string, toolIcon: string): string {
    if (!session) {
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
              <div class="summary-value">${session.productName || "Non spécifié"}</div>
            </div>
            <div class="summary-item-detail">
              <div class="summary-label">Date d'évaluation</div>
              <div class="summary-value">${session.completedAt ? this.formatDate(new Date(session.completedAt)) : "Non complété"}</div>
            </div>
          </div>
          
          ${session.intendedUse ? `
            <div class="intended-use-section">
              <div class="summary-label">Usage prévu</div>
              <div class="intended-use-text">${this.stripHtml(session.intendedUse)}</div>
            </div>
          ` : ""}
        </div>

        <div class="questions-responses-section">
          <h4 class="section-subtitle">📝 Questions et Réponses</h4>
          <div class="questions-container">`;

    // Debug plus spécifique des steps
    if (session.steps && Array.isArray(session.steps)) {
      if (session.steps.length === 0) {
        detailHtml += `<div class="info-message">Aucune étape trouvée dans cette session.</div>`;
      } else {
        let questionsFound = 0;
        session.steps.forEach((step: any, index: number) => {
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
                  <small class="text-gray-500">ID: ${step.questionId} • Répondu le ${new Date(step.answer.timestamp).toLocaleString('fr-FR')}</small>
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
            <div class="result-title">${this.stripHtml(session.result?.title || "Résultat non disponible")}</div>
            ${session.result?.description ? `
              <div class="result-description">${this.stripHtml(session.result.description)}</div>
            ` : ""}
          </div>
        </div>
      </div>`;

    return detailHtml;
  }

  private formatStepAnswer(answer: any): string {
    if (!answer || answer.value === undefined) return "Non répondu";

    switch (answer.value) {
      case "yes":
      case true:
        return "✅ Oui";
      case "no":
      case false:
        return "❌ Non";
      default:
        return String(answer.value);
    }
  }

  async generateJourneyPDF(
    journeySession: JourneySession,
    signature?: JourneySignature
  ) {
    const htmlContent = this.generateJourneyHTMLContent(journeySession, signature);
    this.downloadHTMLAsPDF(htmlContent, journeySession.productName);
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

  private generateJourneyHTMLContent(
    journeySession: JourneySession,
    signature?: JourneySignature
  ): string {
    const reportId = `PARCOURS-${journeySession.id}`;
    
    // Déterminer les résultats clés
    const isQualified = journeySession.qualificationSession?.result?.id === "MEDICAL_DEVICE";
    const regulatoryFramework = journeySession.regulatorySession?.result?.id;
    const deviceClass = journeySession.classificationDmSession?.result?.title || 
                       journeySession.classificationDmdivSession?.result?.title;
    const safetyClass = journeySession.safetyClassificationSession?.result?.title;

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Parcours Complet - ${journeySession.productName}</title>
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

        /* Styles pour le détail des outils */
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

        .question-description {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 12px;
            font-style: italic;
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

        .response-list {
            margin-top: 8px;
            margin-left: 0;
            list-style: none;
        }

        .response-list li {
            color: #374151;
            margin-bottom: 4px;
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

        .step-container {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .step-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }

        .step-icon {
            background: #3b82f6;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }

        .step-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
        }

        .step-result {
            background: #f0f9ff;
            padding: 15px;
            border-radius: 8px;
            border-left: 3px solid #3b82f6;
            margin-top: 10px;
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

        .debug-info {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            font-size: 12px;
            color: #856404;
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

        .question-meta {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #f3f4f6;
        }

        .question-meta small {
            color: #9ca3af;
            font-size: 11px;
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
                    ${journeySession.productName}
                </h3>
                <p style="color: #374151; margin-bottom: 20px;">
                    ${journeySession.intendedUse}
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
            
            ${journeySession.qualificationSession ? 
              this.generateSessionDetail(
                journeySession.qualificationSession, 
                "Qualification Dispositif Médical", 
                "🏥"
              ) : ''}

            ${journeySession.regulatorySession ? 
              this.generateSessionDetail(
                journeySession.regulatorySession, 
                "Qualification Réglementaire", 
                "📋"
              ) : ''}

            ${journeySession.classificationDmSession ? 
              this.generateSessionDetail(
                journeySession.classificationDmSession, 
                "Classification DM (MDR)", 
                "📊"
              ) : ''}

            ${journeySession.classificationDmdivSession ? 
              this.generateSessionDetail(
                journeySession.classificationDmdivSession, 
                "Classification DMDIV (IVDR)", 
                "🧪"
              ) : ''}

            ${journeySession.safetyClassificationSession ? 
              this.generateSessionDetail(
                journeySession.safetyClassificationSession, 
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