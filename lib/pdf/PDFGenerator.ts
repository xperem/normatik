import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { APP_NAME } from "@/lib/config";
import { BaseSession, BaseResult } from "@/types/tool";

export interface Signature {
  evaluatorName?: string;
  evaluatorRole?: string;
  organization?: string;
}

export interface PDFTheme {
  primaryColor: string;
  secondaryColor: string;
  icon: string;
  resultIcon: (isPositive: boolean) => string;
  reportTitle: string;
  reportSubtitle: string;
  productLabel: string;
  regulationBadge: string;
  footerText: string;
  getResultColors: (result: BaseResult) => {
    background: string;
    border: string;
    text: string;
    gradient: string;
  };
}

export const QUALIFICATION_THEME: PDFTheme = {
  primaryColor: '#3b82f6',
  secondaryColor: '#22c55e',
  icon: '🏥',
  resultIcon: (isPositive) => isPositive ? '✅' : '❌',
  reportTitle: 'Rapport de Qualification',
  reportSubtitle: 'Évaluation de dispositif médical logiciel',
  productLabel: 'Nom du produit',
  regulationBadge: '📜 MDR 2017/745 • MDCG 2019-11 rev.2.1',
  footerText: 'Conforme aux guidelines MDCG 2019-11 rev.2.1',
  getResultColors: (result) => result.id === "MEDICAL_DEVICE" ? {
    background: '#f0fdf4',
    border: '#22c55e',
    text: '#15803d',
    gradient: 'linear-gradient(90deg, #22c55e, #16a34a)'
  } : {
    background: '#fef2f2',
    border: '#ef4444',
    text: '#dc2626',
    gradient: 'linear-gradient(90deg, #ef4444, #dc2626)'
  }
};

export const REGULATORY_THEME: PDFTheme = {
  primaryColor: '#4f46e5',
  secondaryColor: '#0891b2',
  icon: '📋',
  resultIcon: (isPositive) => isPositive ? '📋' : '🧪',
  reportTitle: 'Rapport de Qualification Réglementaire',
  reportSubtitle: 'Évaluation MDR vs IVDR',
  productLabel: 'Nom du dispositif',
  regulationBadge: '📋 MDR 2017/745 • 🧪 IVDR 2017/746 • MDCG 2019-11 rev.2.1 Figure 2',
  footerText: 'Conforme aux guidelines MDCG 2019-11 rev.2.1 - Figure 2',
  getResultColors: (result) => result.id === "MDR" ? {
    background: '#eef2ff',
    border: '#4f46e5',
    text: '#3730a3',
    gradient: 'linear-gradient(90deg, #4f46e5, #3730a3)'
  } : {
    background: '#ecfeff',
    border: '#0891b2',
    text: '#0e7490',
    gradient: 'linear-gradient(90deg, #0891b2, #0e7490)'
  }
};

export class PDFGenerator {
  private stripHtml(html: string): string {
    return html.replace(/<[^>]+>/g, "").trim();
  }

  private formatDate(date: Date): string {
    return format(date, "PPP", { locale: fr });
  }

  async generatePDF<TSession extends BaseSession<BaseResult>>(
    session: TSession,
    theme: PDFTheme,
    signature?: Signature
  ) {
    const htmlContent = this.generateHTMLContent(session, theme, signature);
    this.downloadHTMLAsPDF(htmlContent, session.productName, theme.reportTitle);
  }

  private downloadHTMLAsPDF(htmlContent: string, productName: string, reportType: string) {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportType.toLowerCase().replace(/\s+/g, '-')}-${productName.replace(/[^a-zA-Z0-9]/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private generateHTMLContent<TSession extends BaseSession<BaseResult>>(
    session: TSession,
    theme: PDFTheme,
    signature?: Signature
  ): string {
    const reportId = `QARA-${session.id}`;
    const resultColors = theme.getResultColors(session.result!);
    const isPositiveResult = session.result?.variant === "success" || session.result?.id === "MEDICAL_DEVICE";
    
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${theme.reportTitle} - ${session.productName}</title>
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
            border-bottom: 3px solid ${theme.primaryColor};
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
            background: ${resultColors.gradient};
        }

        .logo {
            font-size: 28px;
            font-weight: 700;
            color: ${theme.primaryColor};
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
            border-left: 4px solid ${theme.primaryColor};
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
            background: ${resultColors.background};
            border: 2px solid ${resultColors.border};
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
            background: ${resultColors.gradient};
        }

        .result-title {
            font-size: 20px;
            font-weight: 700;
            color: ${resultColors.text};
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
            background: ${theme.primaryColor};
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
            border-left: 3px solid ${theme.primaryColor};
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
            color: ${theme.primaryColor};
        }

        .regulation-badge {
            background: ${resultColors.background};
            color: ${resultColors.text};
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
            <div class="logo">${theme.icon} ${APP_NAME}</div>
            <div class="report-title">${theme.reportTitle}</div>
            <div class="report-subtitle">${theme.reportSubtitle}</div>
            <div class="report-id">ID: ${reportId}</div>
        </div>

        <!-- Informations produit -->
        <div class="section">
            <div class="section-title">
                <span class="section-icon">📋</span>
                Informations du ${theme.productLabel.toLowerCase()}
            </div>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">${theme.productLabel}</div>
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
            <div class="regulation-badge">${theme.regulationBadge}</div>
        </div>

        <!-- Résultat -->
        <div class="section">
            <div class="section-title">
                <span class="section-icon">🎯</span>
                Résultat de l'évaluation
            </div>
            <div class="result-card">
                <div class="result-title">
                    <span>${theme.resultIcon(isPositiveResult)}</span>
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
                    ${signature?.evaluatorName ? `
                        <div class="signature-item">
                            <div class="info-label">Nom complet</div>
                            <div class="info-value">${signature.evaluatorName}</div>
                        </div>
                    ` : ''}
                    ${signature?.evaluatorRole ? `
                        <div class="signature-item">
                            <div class="info-label">Fonction</div>
                            <div class="info-value">${signature.evaluatorRole}</div>
                        </div>
                    ` : ''}
                    ${signature?.organization ? `
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
            <div>Version 1 • ${theme.footerText}</div>
            <div>Généré le ${this.formatDate(new Date())}</div>
        </div>
    </div>
</body>
</html>
    `;
  }
}


export const CLASSIFICATION_THEME: PDFTheme = {
  primaryColor: '#059669',
  secondaryColor: '#10b981',
  icon: '📊',
  resultIcon: (isPositive) => {
    // Pour la classification, on utilise des icônes spécifiques par classe
    return '📊';
  },
  reportTitle: 'Rapport de Classification',
  reportSubtitle: 'Classification selon la règle 11 du MDR',
  productLabel: 'Logiciel médical',
  regulationBadge: '📊 MDR 2017/745 • MDCG 2019-11 rev.2.1 - Règle 11',
  footerText: 'Conforme à la règle 11 du MDR 2017/745',
  getResultColors: (result) => {
    switch (result.id) {
      case "CLASS_I":
        return {
          background: '#f3f4f6',
          border: '#6b7280',
          text: '#374151',
          gradient: 'linear-gradient(90deg, #6b7280, #4b5563)'
        };
      case "CLASS_IIA":
        return {
          background: '#dbeafe',
          border: '#3b82f6',
          text: '#1e40af',
          gradient: 'linear-gradient(90deg, #3b82f6, #1e40af)'
        };
      case "CLASS_IIB":
        return {
          background: '#fed7aa',
          border: '#f97316',
          text: '#c2410c',
          gradient: 'linear-gradient(90deg, #f97316, #c2410c)'
        };
      case "CLASS_III":
        return {
          background: '#fee2e2',
          border: '#ef4444',
          text: '#dc2626',
          gradient: 'linear-gradient(90deg, #ef4444, #dc2626)'
        };
      default:
        return {
          background: '#f0fdf4',
          border: '#22c55e',
          text: '#15803d',
          gradient: 'linear-gradient(90deg, #22c55e, #16a34a)'
        };
    }
  }
};

export const CLASSIFICATION_DM_THEME: PDFTheme = {
  primaryColor: '#059669',
  secondaryColor: '#10b981',
  icon: '📊',
  resultIcon: (isPositive) => {
    // Pour la classification, on utilise des icônes spécifiques par classe
    return '📊';
  },
  reportTitle: 'Rapport de Classification',
  reportSubtitle: 'Classification selon la règle 11 du MDR',
  productLabel: 'Logiciel médical',
  regulationBadge: '📊 MDR 2017/745 • MDCG 2019-11 rev.2.1 - Règle 11',
  footerText: 'Conforme à la règle 11 du MDR 2017/745',
  getResultColors: (result) => {
    switch (result.id) {
      case "CLASS_I":
        return {
          background: '#f3f4f6',
          border: '#6b7280',
          text: '#374151',
          gradient: 'linear-gradient(90deg, #6b7280, #4b5563)'
        };
      case "CLASS_IIA":
        return {
          background: '#dbeafe',
          border: '#3b82f6',
          text: '#1e40af',
          gradient: 'linear-gradient(90deg, #3b82f6, #1e40af)'
        };
      case "CLASS_IIB":
        return {
          background: '#fed7aa',
          border: '#f97316',
          text: '#c2410c',
          gradient: 'linear-gradient(90deg, #f97316, #c2410c)'
        };
      case "CLASS_III":
        return {
          background: '#fee2e2',
          border: '#ef4444',
          text: '#dc2626',
          gradient: 'linear-gradient(90deg, #ef4444, #dc2626)'
        };
      default:
        return {
          background: '#f0fdf4',
          border: '#22c55e',
          text: '#15803d',
          gradient: 'linear-gradient(90deg, #22c55e, #16a34a)'
        };
    }
  }
};

export const CLASSIFICATION_DMDIV_THEME: PDFTheme = {
  primaryColor: '#0891b2',
  secondaryColor: '#0d9488',
  icon: '🧪',
  resultIcon: (isPositive) => {
    // Pour la classification DMDIV, on utilise des icônes spécifiques par classe
    return '🧪';
  },
  reportTitle: 'Rapport de Classification DMDIV',
  reportSubtitle: 'Classification selon les règles 1-7 de l\'IVDR',
  productLabel: 'Logiciel DMDIV',
  regulationBadge: '🧪 IVDR 2017/746 • Règles 1-7',
  footerText: 'Conforme aux règles de classification de l\'IVDR 2017/746',
  getResultColors: (result) => {
    switch (result.id) {
      case "CLASS_A":
        return {
          background: '#f3f4f6',
          border: '#6b7280',
          text: '#374151',
          gradient: 'linear-gradient(90deg, #6b7280, #4b5563)'
        };
      case "CLASS_B":
        return {
          background: '#dbeafe',
          border: '#3b82f6',
          text: '#1e40af',
          gradient: 'linear-gradient(90deg, #3b82f6, #1e40af)'
        };
      case "CLASS_C":
        return {
          background: '#fed7aa',
          border: '#f97316',
          text: '#c2410c',
          gradient: 'linear-gradient(90deg, #f97316, #c2410c)'
        };
      case "CLASS_D":
        return {
          background: '#fee2e2',
          border: '#ef4444',
          text: '#dc2626',
          gradient: 'linear-gradient(90deg, #ef4444, #dc2626)'
        };
      default:
        return {
          background: '#ecfeff',
          border: '#0891b2',
          text: '#0e7490',
          gradient: 'linear-gradient(90deg, #0891b2, #0e7490)'
        };
    }
  }
};