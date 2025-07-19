//lib/tools/regulatory/hints.ts

import type { RegulatoryQuestionId } from "@/types/regulatory";

export const hintsContent: Record<RegulatoryQuestionId, string> = {
  Q1: `
    <div class="space-y-6">
      <div class="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
        <h4 class="font-semibold text-blue-900 mb-4 flex items-center text-lg">
          <span class="mr-2">🧪</span> Définition IVD selon l'Article 2(2) IVDR
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-blue-300">
          <p class="text-blue-800 leading-relaxed">
            "Dispositif médical destiné par le fabricant à être utilisé <strong>in vitro</strong> pour l'examen d'échantillons provenant du corps humain, y compris les dons de sang et de tissus, uniquement ou principalement dans le but de fournir des informations sur [...]"
          </p>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">✅</span> Exemples d'informations IVD qualifiantes
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• État physiologique ou pathologique</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Anomalies congénitales</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Prédisposition à un état pathologique/maladie</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Détermination de la sécurité et compatibilité</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Prédiction du traitement ou réaction thérapeutique</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Définition/contrôle de mesures thérapeutiques</span>
          </div>
        </div>
      </div>

      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center">
          <span class="mr-2">❌</span> Non qualifiant pour IVD
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Informations administratives uniquement</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Données d'imagerie médicale</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Paramètres physiologiques en temps réel</span>
          </div>
        </div>
      </div>
    </div>
  `,

  Q2: `
    <div class="space-y-6">
      <div class="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-400">
        <h4 class="font-semibold text-amber-900 mb-4 flex items-center text-lg">
          <span class="mr-2">🔍</span> Critère clé : Source des données
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-amber-300">
          <p class="text-amber-800 leading-relaxed">
            Cette question détermine si les informations proviennent <strong>exclusivement</strong> de dispositifs IVD ou s'il y a d'autres sources de données.
          </p>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">✅</span> Données IVD uniquement (répondre OUI)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Résultats d'analyses de laboratoire</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Tests biologiques automatisés</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Données de séquençage génétique</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Mesures biochimiques</span>
          </div>
        </div>
      </div>

      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center">
          <span class="mr-2">❌</span> Sources mixtes (répondre NON)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Données IVD + imagerie médicale</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Données IVD + paramètres physiologiques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Données IVD + données cliniques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Données IVD + informations patient</span>
          </div>
        </div>
      </div>
    </div>
  `,

  Q3: `
    <div class="space-y-6">
      <div class="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-400">
        <h4 class="font-semibold text-purple-900 mb-4 flex items-center text-lg">
          <span class="mr-2">🎯</span> Finalité principale
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-purple-300">
          <p class="text-purple-800 leading-relaxed">
            Cette question détermine si l'objectif <strong>principal</strong> du logiciel est orienté par les données IVD ou par d'autres informations.
          </p>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">✅</span> Principalement pilotée par IVD (→ IVDR)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Diagnostic basé sur analyses de laboratoire</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Interprétation de résultats biologiques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Aide à la décision sur données IVD</span>
          </div>
        </div>
      </div>

      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center">
          <span class="mr-2">❌</span> Autres données prépondérantes (→ MDR)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Diagnostic principalement clinique</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Données IVD utilisées comme complément</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Priorité aux données d'imagerie</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p class="text-blue-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Quelle est la source d'information la plus importante pour la finalité de votre logiciel ?
        </p>
      </div>
    </div>
  `,
};
