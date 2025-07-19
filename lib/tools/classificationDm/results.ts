// lib/tools/classification/results.ts
import type { ClassificationResult, ClassificationResultId } from "@/types/classificationDm";

export const resultsData: Record<ClassificationResultId, ClassificationResult> = {
  CLASS_I: {
    id: "CLASS_I",
    title: "Classe I",
    description: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
          <p class="text-gray-800 leading-relaxed">
            Votre logiciel est classé en <strong>Classe I</strong> selon la règle 11c du MDR. Il ne relève ni des décisions médicales (11a) ni de la surveillance de processus physiologiques (11b).
          </p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p class="text-blue-800 leading-relaxed">
            Cette classe présente le <strong>risque le plus faible</strong> et bénéficie de procédures de conformité simplifiées.
          </p>
        </div>
      </div>
    `,
    variant: "info",
    recommendations: [
      "📋 Procédure de conformité : Auto-déclaration (Annexe IV)",
      "📄 Documentation technique minimale requise",
      "🏭 Système qualité ISO 13485 (version allégée possible)",
      "🔍 Pas d'intervention d'organisme notifié nécessaire",
      "📝 Déclaration de conformité UE obligatoire"
    ],
    nextSteps: [
      "Finaliser la documentation technique",
      "Mettre en place le système qualité",
      "Rédiger la déclaration de conformité UE",
      "Apposer le marquage CE",
      "Surveillance post-commercialisation"
    ],
    references: [
      "MDR 2017/745 - Règle 11c",
      "MDCG 2019-11 rev.2.1",
      "Annexe IV - Procédure d'évaluation de la conformité"
    ]
  },

  CLASS_IIA: {
    id: "CLASS_IIA",
    title: "Classe IIa",
    description: `
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <p class="text-blue-800 leading-relaxed">
            Votre logiciel est classé en <strong>Classe IIa</strong> selon la règle 11. Il fournit des informations pour des décisions médicales ou surveille des processus physiologiques sans impact critique immédiat.
          </p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <p class="text-green-800 leading-relaxed">
            Cette classe présente un <strong>risque modéré</strong> et nécessite l'intervention d'un organisme notifié.
          </p>
        </div>
      </div>
    `,
    variant: "info",
    recommendations: [
      "📋 Procédure de conformité : Annexe IX ou X avec organisme notifié",
      "📄 Documentation technique complète (Annexe II)",
      "🏭 Système qualité ISO 13485 complet",
      "🧪 Évaluation clinique selon Annexe XIV",
      "📊 Surveillance post-commercialisation renforcée"
    ],
    nextSteps: [
      "Sélectionner un organisme notifié compétent",
      "Préparer le dossier technique complet",
      "Conduire l'évaluation clinique",
      "Audit du système qualité",
      "Obtenir le certificat CE"
    ],
    references: [
      "MDR 2017/745 - Règle 11a-ii et 11b",
      "MDCG 2019-11 rev.2.1",
      "Annexe IX/X - Évaluation de la conformité"
    ]
  },

  CLASS_IIB: {
    id: "CLASS_IIB",
    title: "Classe IIb",
    description: `
      <div class="space-y-4">
        <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
          <p class="text-orange-800 leading-relaxed">
            Votre logiciel est classé en <strong>Classe IIb</strong> selon la règle 11. Il fournit des informations pouvant conduire à une détérioration grave/chirurgie, ou surveille des paramètres vitaux critiques.
          </p>
        </div>
        <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p class="text-amber-800 leading-relaxed">
            Cette classe présente un <strong>risque élevé</strong> et nécessite des procédures de conformité strictes avec organisme notifié.
          </p>
        </div>
      </div>
    `,
    variant: "warning",
    recommendations: [
      "📋 Procédure de conformité : Annexe IX ou X avec organisme notifié",
      "📄 Documentation technique exhaustive (Annexe II)",
      "🏭 Système qualité ISO 13485 avec audits réguliers",
      "🧪 Évaluation clinique approfondie obligatoire",
      "🔍 Surveillance post-commercialisation intensive",
      "📊 Rapports périodiques de sécurité (PSUR)"
    ],
    nextSteps: [
      "Sélectionner un organisme notifié expérimenté",
      "Développer un plan d'évaluation clinique robuste",
      "Mettre en place la surveillance post-commercialisation",
      "Préparer les études cliniques si nécessaires",
      "Audit complet du système qualité"
    ],
    references: [
      "MDR 2017/745 - Règle 11a-ii et 11b",
      "MDCG 2019-11 rev.2.1",
      "Annexe IX/X - Évaluation de la conformité",
      "Annexe XIV - Évaluation clinique"
    ]
  },

  CLASS_III: {
    id: "CLASS_III",
    title: "Classe III",
    description: `
      <div class="space-y-4">
        <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
          <p class="text-red-800 leading-relaxed">
            Votre logiciel est classé en <strong>Classe III</strong> selon la règle 11a-i. Une erreur pourrait entraîner le décès ou une détérioration irréversible de l'état de santé.
          </p>
        </div>
        <div class="bg-red-100 p-4 rounded-lg border border-red-300">
          <p class="text-red-900 leading-relaxed">
            Cette classe présente le <strong>risque le plus élevé</strong> et nécessite les procédures de conformité les plus strictes, incluant souvent des essais cliniques.
          </p>
        </div>
      </div>
    `,
    variant: "destructive",
    recommendations: [
      "📋 Procédure de conformité : Annexe IX obligatoire avec organisme notifié",
      "📄 Documentation technique complète et détaillée (Annexe II)",
      "🏭 Système qualité ISO 13485 avec audits fréquents",
      "🧪 Évaluation clinique obligatoire avec études cliniques",
      "🔬 Essais cliniques souvent requis",
      "📊 Surveillance post-commercialisation très intensive",
      "📋 Rapports périodiques de sécurité (PSUR) fréquents"
    ],
    nextSteps: [
      "Consultation réglementaire précoce recommandée",
      "Sélection d'un organisme notifié spécialisé",
      "Planification des études cliniques",
      "Développement d'un plan de gestion des risques robuste",
      "Mise en place d'un système de vigilance complet"
    ],
    references: [
      "MDR 2017/745 - Règle 11a-i",
      "MDCG 2019-11 rev.2.1",
      "Annexe IX - Évaluation de la conformité",
      "Annexe XIV - Évaluation clinique",
      "MDCG 2020-1 - Guidance on clinical evaluation"
    ]
  },
};