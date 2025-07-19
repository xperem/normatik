// lib/tools/qualification/results.ts
import type { Result, ResultId } from "@/types/qualification";

export const resultsData: Record<ResultId, Result> = {
  MEDICAL_DEVICE: {
    id: "MEDICAL_DEVICE",
    title: "✅ Dispositif Médical Logiciel",
    description: `
      <div class="space-y-4">
        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <p class="text-green-800 leading-relaxed">
            Votre produit est qualifié comme un <strong>Dispositif Médical Logiciel (MDSW)</strong> selon la guidance MDCG 2019-11 v2.1.
          </p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p class="text-blue-800 leading-relaxed">
            Cela signifie que votre logiciel est soumis aux exigences réglementaires du MDR ou de l'IVDR et doit suivre les procédures de conformité appropriées.
          </p>
        </div>
      </div>
    `,
    variant: "success",
    recommendations: [
      "🎯 Définissez la réglementation applicable : MDR 2017/745 ou IVDR 2017/746",
      "📊 Procéder à la classification du DM selon la règlementation applicable",
      "🏭 Établir un système de management de la qualité conforme à l'ISO 13485",
      "📋 Mettre en place une documentation technique complète",
      "🧪 Planifier les essais cliniques si nécessaires selon la classe du dispositif"
    ],
    nextSteps: [
      "Classification du dispositif médical logiciel",
      "Analyse des risques selon ISO 14971",
      "Développement selon IEC 62304",
      "Évaluation de l'utilisabilité selon IEC 62366-1",
      "Préparation du dossier technique pour le marquage CE"
    ],
    references: [
      "MDCG 2019-11 rev.1 - Guidance on Qualification and Classification of Software",
    ]
  },
  
  NOT_MEDICAL_DEVICE: {
    id: "NOT_MEDICAL_DEVICE",
    title: "❌ Non-Dispositif Médical",
    description: `
      <div class="space-y-4">
        <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
          <p class="text-red-800 leading-relaxed">
            Votre produit <strong>n'est pas qualifié</strong> comme un Dispositif Médical Logiciel selon les critères du MDR 2017/745 et de la guidance MDCG 2019-11 v2.1.
          </p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p class="text-blue-800 leading-relaxed">
            Votre logiciel n'est donc pas soumis aux exigences du règlement sur les dispositifs médicaux, mais peut être soumis à d'autres réglementations selon sa nature et son usage.
          </p>
        </div>
      </div>
    `,
    variant: "destructive",
    recommendations: [
      "🔍 Si votre produit n'est pas un logiciel, il peut tout de même être un dispositif médical",
      "📋 Regardez si la définition de votre produit se rapproche de la définition d'un dispositif médical",
      "👨‍💼 Consultez un consultant QARA pour être sûr du résultat"
    ],
    nextSteps: [],
    references: [
      "MDCG 2019-11 rev.1 - Guidance on Qualification and Classification of Software",
    ]
  },
};