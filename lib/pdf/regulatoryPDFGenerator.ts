//lib/pdf/regulatoryPDFGenerator.ts

import { RegulatorySession } from "@/types/regulatory";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { APP_NAME } from "@/lib/config";

interface Signature {
  evaluatorName?: string;
  evaluatorRole?: string;
  organization?: string;
}

export class RegulatoryPDFGenerator {
  private stripHtml(html: string): string {
    return html.replace(/<[^>]+>/g, "").trim();
  }

  private formatDate(date: Date): string {
    return format(date, "PPP", { locale: fr });
  }

  async generatePDF(session: RegulatorySession, signature: Signature) {
    const htmlContent = this.generateHTMLContent(session, signature);
    this.downloadHTMLAsPDF(htmlContent, session.productName);
  }

  private downloadHTMLAsPDF(htmlContent: string, productName: string) {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `regulatory-${productName.replace(/[^a-zA-Z0-9]/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private generateHTMLContent(session: RegulatorySession, signature: Signature): string {
    const isMDR = session.result?.id === "MDR";
    const reportId = `QARA-REG-${Date.now().toString(36).toUpperCase()}`;
    
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport Réglementaire - ${session.productName}</title>
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
            border-bottom: 3px solid ${isMDR ? '#4f46e5' : '#0891b2'};
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
            background: linear-gradient(90deg, ${isMDR ? '#4f46e5, #3730a3' : '#0891b2, #0e7490'});
        }

        .logo {
            font-size: 28px;
            font-weight: 700;
            color: ${isMDR ? '#4338ca' : '#0284c7'};
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

        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        .info-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid ${isMDR ? '#4f46e5' : '#0891b2'};
        }

        .info-label {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
            margin-bottom: 5px;
        }

        .info-value {
            color: #1f2937;
            font-size: 16px;
        }

        .result-card {
            background: ${isMDR ? '#eef2ff' : '#ecfeff'};
            border: 2px solid ${isMDR ? '#4f46e5' : '#0891b2'};
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
            background: linear-gradient(90deg, ${isMDR ? '#4f46e5, #3730a3' : '#0891b2, #0e7490'});
        }

        .result-title {
            font-size: 20px;
            font-weight: 700;
            color: ${isMDR ? '#3730a3' : '#0e7490'};
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .result-description {
            font-size: 16px;
            color: #374151;
            line-height: 1.7;
        }

        .question-item {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .question-header {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 15px;
        }

        .question-number {
            background: ${isMDR ? '#4f46e5' : '#0891b2'};
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            flex-shrink: 0;
        }

        .question-content {
            flex: 1;
        }

        .question-text {
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
            margin-bottom: 10px;
        }

        .answer-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 6px 12px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .answer-yes {
            background: #dcfce7;
            color: #15803d;
        }

        .answer-no {
            background: #fee2e2;
            color: #dc2626;
        }

        .justification {
            background: #f8fafc;
            padding: 15px;
            border-radius: 6px;
            border-left: 3px solid ${isMDR ? '#4f46e5' : '#0891b2'};
            margin-top: 10px;
        }

        .justification-text {
            font-style: italic;
            color: #4b5563;
            font-size: 14px;
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
            color: ${isMDR ? '#4f46e5' : '#0891b2'};
        }

        .regulation-badge {
            background: ${isMDR ? '#eef2ff' : '#ecfeff'};
            color: ${isMDR ? '#3730a3' : '#0e7490'};
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
            margin-top: 10px;
        }

        @media print {
            .container {
                box-shadow: none;
                padding: 15mm;
            }
            
            .section {
                break-inside: avoid;
            }
            
            .question-item {
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
            <div class="logo">${isMDR ? '📋' : '🧪'} ${APP_NAME}</div>
            <div class="report-title">Rapport de Qualification Réglementaire</div>
            <div class="report-subtitle">Évaluation MDR vs IVDR</div>
            <div class="report-id">ID: ${reportId}</div>
        </div>

        <!-- Informations produit -->
        <div class="section">
            <div class="section-title">
                <span class="section-icon">📋</span>
                Informations du dispositif
            </div>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Nom du dispositif</div>
                    <div class="info-value">${session.productName}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Date d'évaluation</div>
                    <div class="info-value">${this.formatDate(new Date())}</div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-label">Usage prévu</div>
                <div class="info-value">${session.intendedUse}</div>
            </div>
            <div class="regulation-badge">${isMDR ? '📋 MDR 2017/745' : '🧪 IVDR 2017/746'} • MDCG 2019-11 Figure 2</div>
        </div>

        <!-- Résultat -->
        <div class="section">
            <div class="section-title">
                <span class="section-icon">🎯</span>
                Résultat de l'évaluation
            </div>
            <div class="result-card">
                <div class="result-title">
                    <span>${isMDR ? '📋' : '🧪'}</span>
                    ${this.stripHtml(session.result?.title || '')}
                </div>
                <div class="result-description">
                    ${this.stripHtml(session.result?.description || '')}
                </div>
            </div>
        </div>

        <!-- Questionnaire -->
        <div class="section">
            <div class="section-title">
                <span class="section-icon">📝</span>
                Questionnaire détaillé (${session.steps.length} questions)
            </div>
            ${session.steps.map((step, index) => `
                <div class="question-item">
                    <div class="question-header">
                        <div class="question-number">${index + 1}</div>
                        <div class="question-content">
                            <div class="question-text">${this.stripHtml(step.questionText)}</div>
                            <div class="answer-badge ${step.answer.value === 'yes' ? 'answer-yes' : 'answer-no'}">
                                ${step.answer.value === 'yes' ? '✓ OUI' : '✗ NON'}
                            </div>
                            ${step.answer.justification ? `
                                <div class="justification">
                                    <div class="justification-text">
                                        <strong>Justification :</strong> ${step.answer.justification}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Signature -->
        <div class="section">
            <div class="section-title">
                <span class="section-icon">✍️</span>
                Informations de l'évaluateur
            </div>
            <div class="signature-section">
                <div class="signature-grid">
                    ${signature.evaluatorName ? `
                        <div class="signature-item">
                            <div class="info-label">Nom complet</div>
                            <div class="info-value">${signature.evaluatorName}</div>
                        </div>
                    ` : ''}
                    ${signature.evaluatorRole ? `
                        <div class="signature-item">
                            <div class="info-label">Fonction</div>
                            <div class="info-value">${signature.evaluatorRole}</div>
                        </div>
                    ` : ''}
                    ${signature.organization ? `
                        <div class="signature-item">
                            <div class="info-label">Organisation</div>
                            <div class="info-value">${signature.organization}</div>
                        </div>
                    ` : ''}
                    <div class="signature-item">
                        <div class="info-label">Date de signature</div>
                        <div class="info-value">${this.formatDate(new Date())}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">${APP_NAME}</div>
            <div>Version 1 • Conforme aux guidelines MDCG 2019-11 rev.1 - Figure 2</div>
            <div>Généré le ${this.formatDate(new Date())}</div>
        </div>
    </div>
</body>
</html>
    `;
  }
}
