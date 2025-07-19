// lib/tools/safetyClassification/results.ts
import type { SafetyClassificationResult, SafetyClassificationResultId } from "@/types/safetyClassification";

export const resultsData: Record<SafetyClassificationResultId, SafetyClassificationResult> = {
  SAFETY_CLASS_A: {
    id: "SAFETY_CLASS_A",
    title: "Classe A (Sécurité)",
    description: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
          <p class="text-gray-800 leading-relaxed">
            Votre logiciel est classé en <strong>Classe A</strong> selon la norme IEC 62304 §4.3.a. Aucun préjudice n'est possible en cas de défaillance du logiciel.
          </p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p class="text-blue-800 leading-relaxed">
            Cette classe présente le <strong>risque le plus faible</strong> et bénéficie d'exigences de développement allégées selon IEC 62304.
          </p>
        </div>
      </div>
    `,
    variant: "info",
    rule: "IEC 62304 §4.3.a",
    recommendations: [
      "📋 Processus de développement : Exigences minimales IEC 62304",
      "📄 Documentation : Planification et architecture suffisantes",
      "🔧 Conception : Pas d'exigences spécifiques de séparation",
      "🧪 Tests : Tests d'intégration et système standards",
      "📝 Configuration : Gestion basique des configurations",
      "🔄 Maintenance : Processus de correction des anomalies"
    ],
    nextSteps: [
      "Documenter la justification de la classification Classe A",
      "Établir le plan de développement logiciel selon IEC 62304",
      "Mettre en place la gestion de configuration",
      "Définir les procédures de test adaptées",
      "Préparer la documentation pour audit/inspection"
    ],
    references: [
      "IEC 62304:2006+A1:2015 - §4.3.a",
      "IEC 62304 - Classe A software requirements",
      "FDA Guidance on Software Documentation",
      "ISO 13485 pour le système qualité"
    ]
  },

  SAFETY_CLASS_B: {
    id: "SAFETY_CLASS_B",
    title: "Classe B (Sécurité)",
    description: `
      <div class="space-y-4">
        <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
          <p class="text-orange-800 leading-relaxed">
            Votre logiciel est classé en <strong>Classe B</strong> selon la norme IEC 62304 §4.3.b. Une défaillance peut causer un préjudice, mais pas de blessure grave ou la mort.
          </p>
        </div>
        <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p class="text-amber-800 leading-relaxed">
            Cette classe présente un <strong>risque modéré</strong> et nécessite des mesures de développement renforcées selon IEC 62304.
          </p>
        </div>
      </div>
    `,
    variant: "warning",
    rule: "IEC 62304 §4.3.b",
    recommendations: [
      "📋 Processus de développement : Toutes exigences IEC 62304 sauf séparation",
      "📄 Documentation : Spécifications détaillées requises",
      "🏗️ Architecture : Documentation architecture complète",
      "🔧 Conception : Conception détaillée obligatoire",
      "🧪 Tests : Tests unitaires, d'intégration et système complets",
      "📊 Analyse des risques : ISO 14971 obligatoire",
      "🔄 Maintenance : Processus structuré de maintenance",
      "📝 Traçabilité : Traçabilité complète des exigences"
    ],
    nextSteps: [
      "Développer l'analyse des risques ISO 14971",
      "Établir les spécifications logicielles détaillées",
      "Concevoir l'architecture logicielle documentée",
      "Mettre en place les tests unitaires obligatoires",
      "Implémenter la traçabilité des exigences",
      "Définir les procédures de maintenance"
    ],
    references: [
      "IEC 62304:2006+A1:2015 - §4.3.b",
      "IEC 62304 - Classe B software requirements",
      "ISO 14971 - Gestion des risques",
      "IEC 62366-1 - Ingénierie de l'utilisabilité"
    ]
  },

  SAFETY_CLASS_C: {
    id: "SAFETY_CLASS_C",
    title: "Classe C (Sécurité)",
    description: `
      <div class="space-y-4">
        <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
          <p class="text-red-800 leading-relaxed">
            Votre logiciel est classé en <strong>Classe C</strong> selon la norme IEC 62304 §4.3.c. Une défaillance peut entraîner une blessure grave ou la mort.
          </p>
        </div>
        <div class="bg-red-100 p-4 rounded-lg border border-red-300">
          <p class="text-red-900 leading-relaxed">
            Cette classe présente le <strong>risque le plus élevé</strong> et nécessite les exigences de développement les plus strictes selon IEC 62304.
          </p>
        </div>
      </div>
    `,
    variant: "destructive",
    rule: "IEC 62304 §4.3.c",
    recommendations: [
      "📋 Processus de développement : TOUTES exigences IEC 62304 obligatoires",
      "📄 Documentation : Spécifications exhaustives et détaillées",
      "🏗️ Architecture : Architecture logicielle avec séparation obligatoire",
      "🔧 Conception : Conception détaillée avec séparation des éléments",
      "🧪 Tests : Tests unitaires, d'intégration, système et acceptation",
      "📊 Analyse des risques : ISO 14971 approfondie obligatoire",
      "🛡️ Séparation : Isolation des éléments critiques de sécurité",
      "🔄 Maintenance : Processus très rigoureux de maintenance",
      "📝 Traçabilité : Traçabilité complète et bidirectionnelle",
      "🏛️ Revues : Revues formelles à chaque étape",
      "📋 Validation : Validation clinique poussée"
    ],
    nextSteps: [
      "Consultation réglementaire précoce recommandée",
      "Développer une analyse de risques très détaillée",
      "Concevoir l'architecture avec séparation des éléments",
      "Implémenter tous les niveaux de tests obligatoires",
      "Mettre en place la séparation des éléments critiques",
      "Établir des procédures de revues formelles",
      "Planifier la validation clinique extensive"
    ],
    references: [
      "IEC 62304:2006+A1:2015 - §4.3.c",
      "IEC 62304 - Classe C software requirements",
      "IEC 62304 - Segregation of software items",
      "ISO 14971 - Risk management processes",
      "IEC 62366-1 - Usability engineering",
      "FDA Software Validation Guidance"
    ]
  },
};