// lib/tools/classification/hints.ts
import type { ClassificationQuestionId } from "@/types/classificationDm";

export const hintsContent: Record<ClassificationQuestionId, string> = {
  Q1: `
    <div class="space-y-6">
      <div class="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
        <h4 class="font-semibold text-blue-900 mb-4 flex items-center text-lg">
          <span class="mr-2">📋</span> Sous-règle 11a - Décisions diagnostiques/thérapeutiques
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-blue-300">
          <p class="text-blue-800 leading-relaxed">
            Cette sous-règle concerne <strong>tout logiciel dont les données influencent directement un diagnostic ou un traitement</strong>.
          </p>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">✅</span> Exemples de décisions diagnostiques/thérapeutiques
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Aide au diagnostic médical basé sur des données patient</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Recommandations de traitement personnalisées</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Calculs de dosage médicamenteux</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Interprétation d'images médicales avec aide au diagnostic</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Algorithmes de prédiction de risque médical</span>
          </div>
        </div>
      </div>

      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center">
          <span class="mr-2">❌</span> Non qualifiant pour cette sous-règle
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Simple stockage ou archivage de données</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Gestion administrative pure</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Communication de données sans interprétation</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Surveillance passive sans aide à la décision</span>
          </div>
        </div>
      </div>
    </div>
  `,

  Q2: `
    <div class="space-y-6">
      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center text-lg">
          <span class="mr-2">⚠️</span> Règle 11a-i : Impact létal ou irréversible → Classe III
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-red-300">
          <p class="text-red-800 leading-relaxed">
            Si une mauvaise décision basée sur les informations du logiciel peut entraîner <strong>le décès ou une détérioration irréversible</strong>, le logiciel est automatiquement <strong>Classe III</strong>.
          </p>
        </div>
      </div>

      <div class="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-400">
        <h4 class="font-semibold text-amber-900 mb-4 flex items-center">
          <span class="mr-2">💀</span> Exemples d'impacts létaux/irréversibles
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Erreur de dosage pour médicaments à marge thérapeutique étroite</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Manque de détection d'une condition critique (infarctus, AVC)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Mauvaise interprétation d'examens vitaux (scanner, IRM)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Erreur dans la planification radiothérapie</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Défaillance dans le diagnostic d'urgence vitale</span>
          </div>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">✅</span> Impacts moins graves (continuer questionnaire)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Retard de diagnostic pour pathologie non urgente</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Erreur dans le choix d'un traitement de confort</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Mauvaise interprétation d'examens de routine</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p class="text-blue-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Dans le pire des cas, une erreur de votre logiciel peut-elle causer la mort ou des dommages permanents ?
        </p>
      </div>
    </div>
  `,

  Q3: `
    <div class="space-y-6">
      <div class="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
        <h4 class="font-semibold text-orange-900 mb-4 flex items-center text-lg">
          <span class="mr-2">⚠️</span> Règle 11a-ii : Impact grave ou chirurgie → Classe IIb
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-orange-300">
          <p class="text-orange-800 leading-relaxed">
            Si une mauvaise décision peut entraîner une <strong>détérioration grave</strong> ou <strong>nécessiter une intervention chirurgicale</strong>, le logiciel est <strong>Classe IIb</strong>. Sinon, il est <strong>Classe IIa</strong>.
          </p>
        </div>
      </div>

      <div class="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-400">
        <h4 class="font-semibold text-amber-900 mb-4 flex items-center">
          <span class="mr-2">🏥</span> Exemples d'impacts graves/chirurgicaux (Classe IIb)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Retard de diagnostic menant à une chirurgie d'urgence</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Erreur causant une hospitalisation prolongée</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Mauvaise planification chirurgicale non vitale</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Détérioration significative mais réversible</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Complication médicale majeure évitable</span>
          </div>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">✅</span> Impacts modérés (Classe IIa)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Inconfort temporaire pour le patient</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Traitement sous-optimal mais sans gravité</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Retard mineur dans le diagnostic</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Anxiété ou stress patient évitable</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p class="text-blue-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Une erreur pourrait-elle causer des dommages graves ou nécessiter une chirurgie ?
        </p>
      </div>
    </div>
  `,

  Q4: `
    <div class="space-y-6">
      <div class="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-400">
        <h4 class="font-semibold text-purple-900 mb-4 flex items-center text-lg">
          <span class="mr-2">📊</span> Sous-règle 11b - Surveillance de processus physiologiques
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-purple-300">
          <p class="text-purple-800 leading-relaxed">
            Cette sous-règle concerne le <strong>monitoring de paramètres physiologiques</strong>, qu'ils soient vitaux ou non vitaux.
          </p>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">📈</span> Exemples de surveillance physiologique
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Monitoring des signes vitaux (pouls, TA, respiration)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Surveillance de la glycémie</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Monitoring cardiaque (ECG, rythme)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Surveillance de l'oxygénation (SpO2)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Monitoring de la température corporelle</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Surveillance de paramètres neurologiques</span>
          </div>
        </div>
      </div>

      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center">
          <span class="mr-2">❌</span> Non qualifiant pour la surveillance
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Données administratives (identité, facturation)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Informations non physiologiques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Stockage passif sans monitoring actif</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• Communication simple de données</span>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p class="text-gray-800 text-center font-medium">
          📝 <strong>Note :</strong> Si non → Classe I (sous-règle 11c)
        </p>
      </div>
    </div>
  `,

  Q5: `
    <div class="space-y-6">
      <div class="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
        <h4 class="font-semibold text-orange-900 mb-4 flex items-center text-lg">
          <span class="mr-2">⚡</span> Paramètres vitaux critiques
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-orange-300">
          <p class="text-orange-800 leading-relaxed">
            Cette distinction détermine si la surveillance concerne des <strong>paramètres vitaux critiques</strong> (Classe IIb) ou des paramètres moins critiques (Classe IIa).
          </p>
        </div>
      </div>

      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center">
          <span class="mr-2">🚨</span> Paramètres vitaux critiques (Classe IIb)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Fréquence cardiaque</strong> - rythme et fréquence</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Respiration</strong> - fréquence et pattern respiratoire</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Tension artérielle</strong> - systolique et diastolique</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Saturation en oxygène (SpO2)</strong> - oxygénation sanguine</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Activité cérébrale</strong> - monitoring neurologique critique</span>
          </div>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">📊</span> Paramètres moins critiques (Classe IIa)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Température corporelle</strong> - monitoring de la fièvre</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Poids et taille</strong> - paramètres anthropométriques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Activité physique</strong> - pas, mouvement</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Sommeil</strong> - qualité et durée</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Paramètres métaboliques</strong> - non critiques</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p class="text-blue-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Une variation rapide des paramètres surveillés représente-t-elle un danger immédiat pour la vie ?
        </p>
      </div>
    </div>
  `,
};