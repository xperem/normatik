// lib/tools/classificationDmdiv/results.ts
import type { ClassificationDmdivResult, ClassificationDmdivResultId } from "@/types/classificationDmdiv";

export const resultsData: Record<ClassificationDmdivResultId, ClassificationDmdivResult> = {
  CLASS_A: {
    id: "CLASS_A",
    title: "Classe A",
    description: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
          <p class="text-gray-800 leading-relaxed">
            Votre logiciel DMDIV est classé en <strong>Classe A</strong> selon la règle 5 de l'IVDR. Il se limite à des fonctions de support sans impact direct sur l'interprétation clinique.
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
    rule: "Règle 5 - IVDR",
    recommendations: [
      "📋 Procédure de conformité : Auto-déclaration (Annexe III)",
      "📄 Documentation technique simplifiée",
      "🏭 Système qualité ISO 13485 (version adaptée IVD)",
      "🔍 Pas d'intervention d'organisme notifié nécessaire",
      "📝 Déclaration de conformité UE obligatoire"
    ],
    nextSteps: [
      "Finaliser la documentation technique IVD",
      "Mettre en place le système qualité adapté",
      "Rédiger la déclaration de conformité UE",
      "Apposer le marquage CE",
      "Surveillance post-commercialisation de base"
    ],
    references: [
      "IVDR 2017/746 - Règle 5",
      "Annexe III - Procédure d'évaluation de la conformité",
      "ISO 13485 pour dispositifs IVD"
    ]
  },

  CLASS_B: {
    id: "CLASS_B",
    title: "Classe B",
    description: `
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <p class="text-blue-800 leading-relaxed">
            Votre logiciel DMDIV est classé en <strong>Classe B</strong> selon la règle 6 de l'IVDR (règle par défaut). Il s'agit de dispositifs d'usage courant sans impact clinique critique.
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
    rule: "Règle 6 - IVDR (par défaut)",
    recommendations: [
      "📋 Procédure de conformité : Annexe IV ou V avec organisme notifié",
      "📄 Documentation technique complète (Annexe II)",
      "🏭 Système qualité ISO 13485 adapté IVD",
      "🧪 Études de performance analytique",
      "📊 Surveillance post-commercialisation standard"
    ],
    nextSteps: [
      "Sélectionner un organisme notifié compétent en IVD",
      "Préparer le dossier technique complet",
      "Conduire les études de performance",
      "Audit du système qualité",
      "Obtenir le certificat CE"
    ],
    references: [
      "IVDR 2017/746 - Règle 6",
      "Annexe IV/V - Évaluation de la conformité",
      "ISO 13485 pour dispositifs IVD"
    ]
  },

  CLASS_C: {
    id: "CLASS_C",
    title: "Classe C",
    description: `
      <div class="space-y-4">
        <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
          <p class="text-orange-800 leading-relaxed">
            Votre logiciel DMDIV est classé en <strong>Classe C</strong> selon la règle 2 ou 3 de l'IVDR. Il détecte des agents infectieux ou a un impact clinique majeur sur le diagnostic/traitement.
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
    rule: "Règle 2 ou 3 - IVDR",
    recommendations: [
      "📋 Procédure de conformité : Annexe IV ou V avec organisme notifié",
      "📄 Documentation technique exhaustive (Annexe II)",
      "🏭 Système qualité ISO 13485 avec audits réguliers",
      "🧪 Études de performance analytique et clinique approfondies",
      "🔍 Surveillance post-commercialisation intensive",
      "📊 Rapports périodiques de sécurité et performance (PSUR)"
    ],
    nextSteps: [
      "Sélectionner un organisme notifié expérimenté en IVD",
      "Développer un plan d'études de performance robuste",
      "Mettre en place la surveillance post-commercialisation",
      "Préparer les études cliniques si nécessaires",
      "Audit complet du système qualité"
    ],
    references: [
      "IVDR 2017/746 - Règles 2 et 3",
      "Annexe IV/V - Évaluation de la conformité",
      "Annexe XIII - Études de performance clinique",
      "ISO 13485 pour dispositifs IVD"
    ]
  },

  CLASS_D: {
    id: "CLASS_D",
    title: "Classe D",
    description: `
      <div class="space-y-4">
        <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
          <p class="text-red-800 leading-relaxed">
            Votre logiciel DMDIV est classé en <strong>Classe D</strong> selon la règle 1 de l'IVDR. Il détecte des agents pathogènes transmissibles dans le sang ou les organes destinés aux dons.
          </p>
        </div>
        <div class="bg-red-100 p-4 rounded-lg border border-red-300">
          <p class="text-red-900 leading-relaxed">
            Cette classe présente le <strong>risque le plus élevé</strong> et nécessite les procédures de conformité les plus strictes, incluant souvent des études cliniques étendues.
          </p>
        </div>
      </div>
    `,
    variant: "destructive",
    rule: "Règle 1 - IVDR",
    recommendations: [
      "📋 Procédure de conformité : Annexe IV obligatoire avec organisme notifié",
      "📄 Documentation technique complète et détaillée (Annexe II)",
      "🏭 Système qualité ISO 13485 avec audits très fréquents",
      "🧪 Études de performance analytique et clinique obligatoires",
      "🔬 Études cliniques étendues souvent requises",
      "📊 Surveillance post-commercialisation très intensive",
      "📋 Rapports périodiques de sécurité très fréquents",
      "🏛️ Consultation des autorités de santé recommandée"
    ],
    nextSteps: [
      "Consultation réglementaire précoce fortement recommandée",
      "Sélection d'un organisme notifié spécialisé en IVD haute criticité",
      "Planification des études de performance étendues",
      "Développement d'un plan de gestion des risques très robuste",
      "Mise en place d'un système de vigilance complet",
      "Coordination avec les autorités compétentes"
    ],
    references: [
      "IVDR 2017/746 - Règle 1",
      "Annexe IV - Évaluation de la conformité",
      "Annexe XIII - Études de performance clinique",
      "ISO 13485 pour dispositifs IVD critiques",
      "Guidelines EMA pour dispositifs classe D"
    ]
  },
};