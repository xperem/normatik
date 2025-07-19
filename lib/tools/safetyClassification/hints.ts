// lib/tools/safetyClassification/hints.ts
import type { SafetyClassificationQuestionId } from "@/types/safetyClassification";

export const hintsContent: Record<SafetyClassificationQuestionId, string> = {
  Q1: `
    <div class="space-y-6">
      <div class="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
        <h4 class="font-semibold text-blue-900 mb-4 flex items-center text-lg">
          <span class="mr-2">⚖️</span> IEC 62304 §4.3.a - Préjudice quelconque
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-blue-300">
          <p class="text-blue-800 leading-relaxed">
            Cette question évalue si <strong>toute défaillance</strong> du logiciel peut causer un dommage, même mineur, à quelqu'un.
          </p>
        </div>
      </div>

      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center">
          <span class="mr-2">⚠️</span> Exemples de préjudices possibles
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Dommage physique</strong> - blessure, brûlure, choc</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Retard de traitement</strong> - diagnostic manqué</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Traitement inapproprié</strong> - mauvais dosage</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Inconfort patient</strong> - douleur, anxiété</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Exposition de données</strong> - confidentialité</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Perte de temps</strong> - procédures supplémentaires</span>
          </div>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibent text-green-900 mb-4 flex items-center">
          <span class="mr-2">✅</span> Aucun préjudice possible (Classe A)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Logiciel purement administratif sans impact clinique</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Outils de formation sans interaction patient</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Systèmes de facturation médicale</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Logiciels de gestion documentaire</span>
          </div>
        </div>
      </div>

      <div class="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-400">
        <h4 class="font-semibold text-amber-900 mb-4 flex items-center">
          <span class="mr-2">🤔</span> Points d'attention
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Considérer <strong>tous les utilisateurs</strong> : patients, soignants, techniciens</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Évaluer <strong>toutes les défaillances</strong> possibles du logiciel</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Inclure les <strong>dommages indirects</strong> (stress, perte de confiance)</span>
          </div>
        </div>
      </div>

      <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <p class="text-purple-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Si le logiciel tombe en panne, quelqu'un peut-il en souffrir ?
        </p>
      </div>
    </div>
  `,

  Q2: `
    <div class="space-y-6">
      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center text-lg">
          <span class="mr-2">💀</span> IEC 62304 §4.3.c - Blessure grave ou mort
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-red-300">
          <p class="text-red-800 leading-relaxed">
            Cette question détermine si une défaillance peut causer des <strong>dommages irréversibles, graves ou la mort</strong>.
          </p>
        </div>
      </div>

      <div class="bg-red-100 p-5 rounded-lg border-l-4 border-red-500">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center">
          <span class="mr-2">🚨</span> Exemples de blessures graves/mort (Classe C)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-red-400">
            <span class="text-red-900">• <strong>Erreur de dosage</strong> - médicaments à marge thérapeutique étroite</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-400">
            <span class="text-red-900">• <strong>Défaillance monitoring vital</strong> - non-détection d'arrêt cardiaque</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-400">
            <span class="text-red-900">• <strong>Erreur chirurgicale</strong> - guidage robotique défaillant</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-400">
            <span class="text-red-900">• <strong>Radiothérapie</strong> - calcul de dose incorrect</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-400">
            <span class="text-red-900">• <strong>Ventilation artificielle</strong> - arrêt intempestif</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-400">
            <span class="text-red-900">• <strong>Diagnostic d'urgence</strong> - non-détection d'infarctus</span>
          </div>
        </div>
      </div>

      <div class="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
        <h4 class="font-semibold text-orange-900 mb-4 flex items-center">
          <span class="mr-2">⚠️</span> Dommages non graves (Classe B)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-orange-300">
            <span class="text-orange-800">• <strong>Inconfort temporaire</strong> - douleur passagère</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-orange-300">
            <span class="text-orange-800">• <strong>Retard de diagnostic</strong> - pour pathologie non urgente</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-orange-300">
            <span class="text-orange-800">• <strong>Arrêt temporaire</strong> - traitement non vital</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-orange-300">
            <span class="text-orange-800">• <strong>Examens supplémentaires</strong> - répétition d'analyses</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-orange-300">
            <span class="text-orange-800">• <strong>Anxiété patient</strong> - fausse alerte</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-orange-300">
            <span class="text-orange-800">• <strong>Prolongation hospitalisation</strong> - sans danger vital</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
        <h4 class="font-semibold text-blue-900 mb-4 flex items-center">
          <span class="mr-2">🔍</span> Critères d'évaluation
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-blue-300">
            <span class="text-blue-800">• <strong>Gravité</strong> : réversible vs irréversible</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-blue-300">
            <span class="text-blue-800">• <strong>Urgence</strong> : situation vitale vs non vitale</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-blue-300">
            <span class="text-blue-800">• <strong>Impact</strong> : fonctions critiques vs non critiques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-blue-300">
            <span class="text-blue-800">• <strong>Récupération</strong> : possibilité de correction rapide</span>
          </div>
        </div>
      </div>

      <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <p class="text-purple-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Une défaillance peut-elle causer des dommages permanents ou la mort ?
        </p>
      </div>
    </div>
  `,
};