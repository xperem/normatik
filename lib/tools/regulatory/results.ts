//lib/tools/regulatory/results.ts

import type { RegulatoryResult, RegulatoryResultId } from "@/types/regulatory";

export const resultsData: Record<RegulatoryResultId, RegulatoryResult> = {
  MDR: {
    id: "MDR",
    title: "📋 Dispositif Médical (MDR)",
    description: `
      <div class="space-y-4">
        <div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
          <p class="text-indigo-800 leading-relaxed">
            Votre logiciel est qualifié comme un <strong>Dispositif Médical</strong> et relève du règlement <strong>MDR 2017/745</strong>.
          </p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p class="text-blue-800 leading-relaxed">
            Votre dispositif doit suivre les procédures de conformité du MDR, incluant le marquage CE selon la classification appropriée.
          </p>
        </div>
      </div>
    `,
    variant: "info",
    recommendations: [
      "📊 Procéder à la classification selon les règles 1-22 du MDR",
      "🏭 Mettre en place un système qualité ISO 13485",
      "📋 Constituer la documentation technique (Annexe II/III)",
      "🔍 Évaluation clinique selon MDR Annexe XIV",
      "🧪 Essais cliniques si requis selon la classe"
    ],
    nextSteps: [
      "Classification MDR (règles 1-22)",
      "Analyse des risques ISO 14971",
      "Développement logiciel IEC 62304",
      "Évaluation utilisabilité IEC 62366-1",
      "Dossier technique pour marquage CE"
    ],
    references: [
      "MDR 2017/745 - Règlement dispositifs médicaux",
      "MDCG 2019-11 rev.1 - Figure 2"
    ]
  },
  
  IVDR: {
    id: "IVDR",
    title: "🧪 Dispositif Médical IVD (IVDR)",
    description: `
      <div class="space-y-4">
        <div class="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-400">
          <p class="text-cyan-800 leading-relaxed">
            Votre logiciel est qualifié comme un <strong>Dispositif Médical de Diagnostic In Vitro</strong> et relève du règlement <strong>IVDR 2017/746</strong>.
          </p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p class="text-blue-800 leading-relaxed">
            Votre dispositif doit suivre les procédures de conformité de l'IVDR, avec des exigences spécifiques aux dispositifs de diagnostic.
          </p>
        </div>
      </div>
    `,
    variant: "success",
    recommendations: [
      "📊 Classification selon les règles 1-7 de l'IVDR",
      "🏭 Système qualité ISO 13485 adapté IVD",
      "📋 Documentation technique IVDR (Annexe III)",
      "🔬 Études de performance selon IVDR",
      "📊 Évaluation des performances cliniques"
    ],
    nextSteps: [
      "Classification IVDR (classes A, B, C, D)",
      "Analyse des risques ISO 14971",
      "Développement logiciel IEC 62304",
      "Études de performance analytique",
      "Validation clinique selon classe"
    ],
    references: [
      "IVDR 2017/746 - Règlement dispositifs IVD",
      "MDCG 2019-11 rev.1 - Figure 2"
    ]
  },
};
