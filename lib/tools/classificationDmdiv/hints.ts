// lib/tools/classificationDmdiv/hints.ts
import type { ClassificationDmdivQuestionId } from "@/types/classificationDmdiv";

export const hintsContent: Record<ClassificationDmdivQuestionId, string> = {
  Q1: `
    <div class="space-y-6">
      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center text-lg">
          <span class="mr-2">🩸</span> Règle 1 - Classe D (Risque critique)
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-red-300">
          <p class="text-red-800 leading-relaxed">
            Cette règle concerne la <strong>sécurité des dons de sang et d'organes</strong> pour éviter la transmission d'agents pathogènes aux receveurs.
          </p>
        </div>
      </div>

      <div class="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-400">
        <h4 class="font-semibold text-amber-900 mb-4 flex items-center">
          <span class="mr-2">⚠️</span> Agents pathogènes transmissibles ciblés
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• <strong>VIH</strong> (Virus de l'immunodéficience humaine)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• <strong>Hépatites B et C</strong></span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• <strong>Virus T-lymphotropes humains (HTLV)</strong></span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• <strong>Treponema pallidum</strong> (syphilis)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• <strong>Virus West Nile</strong></span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• <strong>Cytomégalovirus (CMV)</strong></span>
          </div>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">✅</span> Types d'échantillons concernés
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Sang total et composants sanguins</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Tissus pour transplantation</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Cellules souches</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Organes pour transplantation</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p class="text-blue-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Votre logiciel sert-il à sécuriser les dons de sang ou d'organes ?
        </p>
      </div>
    </div>
  `,

  Q2: `
    <div class="space-y-6">
      <div class="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
        <h4 class="font-semibold text-orange-900 mb-4 flex items-center text-lg">
          <span class="mr-2">🦠</span> Règle 2 - Classe C (Détection infectieuse)
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-orange-300">
          <p class="text-orange-800 leading-relaxed">
            Cette règle concerne la <strong>détection d'agents infectieux</strong> dans des échantillons diagnostiques (non destinés aux dons).
          </p>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">🔬</span> Exemples d'agents infectieux détectés
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Bactéries pathogènes (E. coli, Salmonella, etc.)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Virus (grippe, COVID-19, herpès, etc.)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Parasites (Plasmodium, Toxoplasma, etc.)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Champignons pathogènes (Candida, Aspergillus, etc.)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Mycobactéries (tuberculose, etc.)</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
        <h4 class="font-semibold text-blue-900 mb-4 flex items-center">
          <span class="mr-2">🧪</span> Types d'échantillons diagnostiques
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-blue-300">
            <span class="text-blue-800">• Prélèvements sanguins pour diagnostic</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-blue-300">
            <span class="text-blue-800">• Urines</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-blue-300">
            <span class="text-blue-800">• Prélèvements respiratoires (crachats, LBA)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-blue-300">
            <span class="text-blue-800">• Prélèvements génitaux</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-blue-300">
            <span class="text-blue-800">• Liquides biologiques (LCR, liquide articulaire)</span>
          </div>
        </div>
      </div>

      <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <p class="text-purple-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Votre logiciel détecte-t-il des infections dans des échantillons de patients ?
        </p>
      </div>
    </div>
  `,

  Q3: `
    <div class="space-y-6">
      <div class="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
        <h4 class="font-semibold text-orange-900 mb-4 flex items-center text-lg">
          <span class="mr-2">🏥</span> Règle 3 - Classe C (Impact clinique majeur)
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-orange-300">
          <p class="text-orange-800 leading-relaxed">
            Cette règle concerne les dispositifs ayant un <strong>impact clinique majeur</strong> sur les décisions de diagnostic ou de traitement.
          </p>
        </div>
      </div>

      <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-900 mb-4 flex items-center">
          <span class="mr-2">⚕️</span> Diagnostics de maladies graves
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Cancers</strong> - détection de cellules tumorales, marqueurs</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Maladies génétiques</strong> - mutations, aberrations chromosomiques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Maladies cardiovasculaires</strong> - marqueurs d'infarctus (troponines)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Maladies auto-immunes</strong> - auto-anticorps spécifiques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-red-300">
            <span class="text-red-800">• <strong>Diabète</strong> - HbA1c pour surveillance long terme</span>
          </div>
        </div>
      </div>

      <div class="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-400">
        <h4 class="font-semibold text-purple-900 mb-4 flex items-center">
          <span class="mr-2">🔄</span> Compatibilité donneur/receveur
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-purple-300">
            <span class="text-purple-800">• Typage HLA pour transplantation d'organes</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-purple-300">
            <span class="text-purple-800">• Cross-match avant transplantation</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-purple-300">
            <span class="text-purple-800">• Compatibilité ABO et Rhésus</span>
          </div>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">💊</span> Guidance thérapeutique
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Tests pharmacogénomiques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Dosage de médicaments thérapeutiques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Tests de résistance aux antibiotiques</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• Biomarqueurs prédictifs de réponse</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p class="text-blue-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Votre logiciel influence-t-il des décisions médicales importantes ?
        </p>
      </div>
    </div>
  `,

  Q4: `
    <div class="space-y-6">
      <div class="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-400">
        <h4 class="font-semibold text-gray-900 mb-4 flex items-center text-lg">
          <span class="mr-2">📋</span> Règle 5 - Classe A (Fonctions de support)
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-gray-300">
          <p class="text-gray-800 leading-relaxed">
            Cette règle concerne les logiciels ayant des <strong>fonctions de support</strong> sans impact direct sur l'interprétation clinique.
          </p>
        </div>
      </div>

      <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-900 mb-4 flex items-center">
          <span class="mr-2">✅</span> Exemples de fonctions de support (Classe A)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Gestion administrative</strong> - planification, facturation</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Tri d'échantillons</strong> - organisation automatisée</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Stockage de données</strong> - archivage sans traitement</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Transfert de résultats</strong> - communication pure</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-green-300">
            <span class="text-green-800">• <strong>Affichage brut</strong> - présentation sans interprétation</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
        <h4 class="font-semibold text-blue-900 mb-4 flex items-center">
          <span class="mr-2">📊</span> Règle 6 par défaut - Classe B
        </h4>
        <div class="bg-white p-4 rounded border-l-2 border-blue-300">
          <p class="text-blue-800 leading-relaxed">
            Si aucune des règles précédentes ne s'applique, la <strong>règle 6</strong> s'applique par défaut et le dispositif est classé <strong>Classe B</strong>.
          </p>
        </div>
      </div>

      <div class="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-400">
        <h4 class="font-semibent text-amber-900 mb-4 flex items-center">
          <span class="mr-2">⚠️</span> Exemples Classe B (par défaut)
        </h4>
        <div class="space-y-3">
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Analyses de routine (glycémie, cholestérol)</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Tests de grossesse</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Paramètres nutritionnels</span>
          </div>
          <div class="bg-white p-3 rounded border-l-2 border-amber-300">
            <span class="text-amber-800">• Tests non critiques pour diagnostic</span>
          </div>
        </div>
      </div>

      <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <p class="text-purple-800 text-center font-medium">
          🎯 <strong>Question clé :</strong> Votre logiciel se contente-t-il de gérer des données sans les interpréter ?
        </p>
      </div>
    </div>
  `,
};