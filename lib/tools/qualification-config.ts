import type { Question, Result, QuestionId, ResultId } from "@/types/qualification";
import type { ToolConfig } from "@/types/tool";
import { APP_NAME } from "@/lib/config";

const questions: Record<QuestionId, Question> = {
  Q1: {
    id: "Q1",
    text: "Le produit est-il un <strong>logiciel</strong> ?",
    hint: `
      <div style="margin-bottom: 24px;">
        <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <h4 style="font-weight: 600; color: #1e40af; margin-bottom: 8px;">📋 Définition officielle</h4>
          <p style="color: #1e40af; margin-bottom: 8px; line-height: 1.5;">
            <strong>Logiciel selon MDCG 2019-11, §1.1 :</strong><br>
            "Ensemble d'instructions pouvant être exécutées par un processeur"
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div style="background: #dcfce7; border-left: 4px solid #22c55e; padding: 16px; border-radius: 8px;">
            <h4 style="font-weight: 600; color: #15803d; margin-bottom: 12px;">
              ✅ Inclut
            </h4>
            <ul style="margin: 0; padding-left: 0; list-style: none;">
              <li style="color: #15803d; margin-bottom: 8px; display: flex; align-items: flex-start;">
                <span style="margin-right: 8px; margin-top: 2px;">•</span>
                <span>Applications mobiles (iOS, Android)</span>
              </li>
              <li style="color: #15803d; margin-bottom: 8px; display: flex; align-items: flex-start;">
                <span style="margin-right: 8px; margin-top: 2px;">•</span>
                <span>Applications web et SaaS</span>
              </li>
              <li style="color: #15803d; margin-bottom: 8px; display: flex; align-items: flex-start;">
                <span style="margin-right: 8px; margin-top: 2px;">•</span>
                <span>Logiciels embarqués</span>
              </li>
              <li style="color: #15803d; margin-bottom: 8px; display: flex; align-items: flex-start;">
                <span style="margin-right: 8px; margin-top: 2px;">•</span>
                <span>Applications de bureau</span>
              </li>
              <li style="color: #15803d; margin-bottom: 0; display: flex; align-items: flex-start;">
                <span style="margin-right: 8px; margin-top: 2px;">•</span>
                <span>Scripts et algorithmes</span>
              </li>
            </ul>
          </div>

          <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px;">
            <h4 style="font-weight: 600; color: #dc2626; margin-bottom: 12px;">
              ❌ Exclut
            </h4>
            <ul style="margin: 0; padding-left: 0; list-style: none;">
              <li style="color: #dc2626; margin-bottom: 8px; display: flex; align-items: flex-start;">
                <span style="margin-right: 8px; margin-top: 2px;">•</span>
                <span>Dispositifs physiques sans composant logiciel</span>
              </li>
              <li style="color: #dc2626; margin-bottom: 8px; display: flex; align-items: flex-start;">
                <span style="margin-right: 8px; margin-top: 2px;">•</span>
                <span>Données pures (bases de données, fichiers)</span>
              </li>
              <li style="color: #dc2626; margin-bottom: 0; display: flex; align-items: flex-start;">
                <span style="margin-right: 8px; margin-top: 2px;">•</span>
                <span>Protocoles de communication</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `,
    yesTarget: "Q2",
    noTarget: "NOT_MEDICAL_DEVICE",
  },

  Q2: {
    id: "Q2",
    text: `Le logiciel entre-t-il dans l'une de ces <strong>catégories spéciales</strong> ?
      <div class="mt-4 space-y-2">
        <div class="flex items-center p-2 bg-amber-50 rounded border-l-4 border-amber-400">
          <span class="mr-2">📋</span>
          <span>Logiciel visé à l'<strong>Annexe XVI</strong> du MDR</span>
        </div>
        <div class="flex items-center p-2 bg-amber-50 rounded border-l-4 border-amber-400">
          <span class="mr-2">🔧</span>
          <span><strong>Accessoire</strong> de dispositif médical</span>
        </div>
        <div class="flex items-center p-2 bg-amber-50 rounded border-l-4 border-amber-400">
          <span class="mr-2">⚡</span>
          <span>Logiciel <strong>influençant</strong> l'usage d'un DM physique</span>
        </div>
      </div>`,
    hint: `
      <div class="space-y-6">
        <div class="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-400">
          <h4 class="font-semibold text-amber-900 mb-4 flex items-center text-lg">
            <span class="mr-2">📋</span> Annexe XVI – Produits sans finalité médicale réglementés comme DM
          </h4>
          <div class="grid gap-3">
            <div class="bg-white p-3 rounded border-l-2 border-amber-300">
              <span class="text-amber-800">• Lentilles de contact ou similaires (sauf correctives)</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-amber-300">
              <span class="text-amber-800">• Produits pour introduction dans le corps à fins esthétiques</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-amber-300">
              <span class="text-amber-800">• Substances pour comblement facial ou implantation sous-cutanée</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-amber-300">
              <span class="text-amber-800">• Équipements de liposuccion, lipolyse, lipoplastie</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-amber-300">
              <span class="text-amber-800">• Appareils laser/lumière pour modification de la peau</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-amber-300">
              <span class="text-amber-800">• Équipements de stimulation cérébrale trans-crânienne</span>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
          <h4 class="font-semibold text-blue-900 mb-4 flex items-center text-lg">
            <span class="mr-2">🔧</span> Accessoire selon l'Art. 2(2) MDR
          </h4>
          <div class="bg-white p-4 rounded border-l-2 border-blue-300">
            <p class="text-blue-800 italic leading-relaxed">
              "Produit destiné par son fabricant à permettre à un DM d'être utilisé conformément à sa destination ou à assister spécifiquement et directement sa fonction médicale"
            </p>
          </div>
        </div>

        <div class="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-400">
          <h4 class="font-semibold text-purple-900 mb-4 flex items-center text-lg">
            <span class="mr-2">⚡</span> Logiciel influençant un DM
          </h4>
          <div class="space-y-3">
            <div class="bg-white p-3 rounded border-l-2 border-purple-300">
              <span class="text-purple-800">• Réglage automatique de paramètres thérapeutiques</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-purple-300">
              <span class="text-purple-800">• Déclenchement d'actions sur le dispositif</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-purple-300">
              <span class="text-purple-800">• Contrôle de fonctions critiques</span>
            </div>
          </div>
        </div>

        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <p class="text-green-800 text-center italic font-medium">
            ✅ Si votre logiciel correspond à l'une de ces catégories, il est automatiquement considéré comme un dispositif médical.
          </p>
        </div>
      </div>
    `,
    yesTarget: "MEDICAL_DEVICE",
    noTarget: "Q3",
  },

  Q3: {
    id: "Q3",
    text: "Le logiciel exécute-t-il une <strong>action sur les données</strong> différente du simple stockage, archivage, communication, compression ou recherche ?",
    hint: `
      <div style="margin-bottom: 24px;">
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <h4 style="font-weight: 600; color: #dc2626; margin-bottom: 16px; font-size: 18px;">
            ❌ Actions NON qualifiantes (MDCG 2019-11, §3.2)
          </h4>
          <div style="display: grid; gap: 12px;">
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #fca5a5; display: flex; align-items: center;">
              <span style="width: 120px; color: #dc2626; font-weight: 500; flex-shrink: 0;">Stockage :</span>
              <span style="color: #991b1b;">sauvegarde de données sans traitement</span>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #fca5a5; display: flex; align-items: center;">
              <span style="width: 120px; color: #dc2626; font-weight: 500; flex-shrink: 0;">Archivage :</span>
              <span style="color: #991b1b;">conservation à long terme</span>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #fca5a5; display: flex; align-items: center;">
              <span style="width: 120px; color: #dc2626; font-weight: 500; flex-shrink: 0;">Communication :</span>
              <span style="color: #991b1b;">transmission, transfert, routage</span>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #fca5a5; display: flex; align-items: center;">
              <span style="width: 120px; color: #dc2626; font-weight: 500; flex-shrink: 0;">Compression :</span>
              <span style="color: #991b1b;">réduction de taille sans interprétation</span>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #fca5a5; display: flex; align-items: center;">
              <span style="width: 120px; color: #dc2626; font-weight: 500; flex-shrink: 0;">Recherche :</span>
              <span style="color: #991b1b;">requêtes, indexation simple</span>
            </div>
          </div>
        </div>

        <div style="background: #dcfce7; border-left: 4px solid #22c55e; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
          <h4 style="font-weight: 600; color: #15803d; margin-bottom: 16px; font-size: 18px;">
            ✅ Actions qualifiantes (exemples)
          </h4>
          <div style="display: grid; gap: 12px;">
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #86efac; display: flex; align-items: center;">
              <span style="width: 120px; color: #15803d; font-weight: 500; flex-shrink: 0;">Analyse :</span>
              <span style="color: #166534;">interprétation de données médicales</span>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #86efac; display: flex; align-items: center;">
              <span style="width: 120px; color: #15803d; font-weight: 500; flex-shrink: 0;">Calcul :</span>
              <span style="color: #166534;">algorithmes de diagnostic ou traitement</span>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #86efac; display: flex; align-items: center;">
              <span style="width: 120px; color: #15803d; font-weight: 500; flex-shrink: 0;">Traitement :</span>
              <span style="color: #166534;">amélioration, reconstruction d'images</span>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #86efac; display: flex; align-items: center;">
              <span style="width: 120px; color: #15803d; font-weight: 500; flex-shrink: 0;">Aide :</span>
              <span style="color: #166534;">recommandations cliniques</span>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #86efac; display: flex; align-items: center;">
              <span style="width: 120px; color: #15803d; font-weight: 500; flex-shrink: 0;">Monitoring :</span>
              <span style="color: #166534;">surveillance avec alertes</span>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 2px solid #86efac; display: flex; align-items: center;">
              <span style="width: 120px; color: #15803d; font-weight: 500; flex-shrink: 0;">Transformation :</span>
              <span style="color: #166534;">conversion avec valeur ajoutée médicale</span>
            </div>
          </div>
        </div>

        <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border: 1px solid #93c5fd;">
          <p style="color: #1e40af; text-align: center; font-weight: 500; margin: 0; line-height: 1.5;">
            🔑 <strong>Question clé :</strong> Votre logiciel fait-il plus que simplement gérer des données ?
          </p>
        </div>
      </div>
    `,
    yesTarget: "Q4",
    noTarget: "NOT_MEDICAL_DEVICE",
  },

  Q4: {
    id: "Q4",
    text: "L'action du logiciel est-elle destinée au <strong>bénéfice de patients individuels</strong> ?",
    hint: `
      <div class="space-y-6">
        <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
          <h4 class="font-semibold text-green-900 mb-4 flex items-center text-lg">
            <span class="mr-2">✅</span> Bénéfice INDIVIDUEL (qualifiant)
          </h4>
          <div class="grid gap-3">
            <div class="bg-white p-3 rounded border-l-2 border-green-300">
              <span class="text-green-800">• Diagnostic pour un patient spécifique</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-green-300">
              <span class="text-green-800">• Traitement personnalisé</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-green-300">
              <span class="text-green-800">• Surveillance d'un patient donné</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-green-300">
              <span class="text-green-800">• Aide à la décision clinique individuelle</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-green-300">
              <span class="text-green-800">• Calculs de dosage personnalisés</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-green-300">
              <span class="text-green-800">• Planification thérapeutique individuelle</span>
            </div>
          </div>
        </div>

        <div class="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
          <h4 class="font-semibold text-red-900 mb-4 flex items-center text-lg">
            <span class="mr-2">❌</span> Bénéfice POPULATIONNEL/ADMINISTRATIF (non qualifiant)
          </h4>
          <div class="grid gap-3">
            <div class="bg-white p-3 rounded border-l-2 border-red-300">
              <span class="text-red-800">• Statistiques de santé publique</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-red-300">
              <span class="text-red-800">• Gestion administrative hospitalière</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-red-300">
              <span class="text-red-800">• Études épidémiologiques</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-red-300">
              <span class="text-red-800">• Recherche clinique (sans bénéfice immédiat)</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-red-300">
              <span class="text-red-800">• Facturation et gestion</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-red-300">
              <span class="text-red-800">• Formation médicale générale</span>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p class="text-blue-800 text-center font-medium">
            🎯 <strong>Question clé :</strong> Votre logiciel améliore-t-il directement la prise en charge d'un patient particulier ?
          </p>
        </div>
      </div>
    `,
    yesTarget: "Q5",
    noTarget: "NOT_MEDICAL_DEVICE",
  },

  Q5: {
    id: "Q5",
    text: "Le logiciel répond-il à la <strong>définition officielle</strong> de « Dispositif Médical » selon l'Article 2(1) du MDR ?",
    hint: `
      <div class="space-y-6">
        <div class="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
          <h4 class="font-semibold text-blue-900 mb-4 flex items-center text-lg">
            <span class="mr-2">📋</span> Définition officielle – Article 2(1) du Règlement (UE) 2017/745
          </h4>
          <div class="bg-white p-4 rounded border-l-2 border-blue-300">
            <p class="text-blue-800 leading-relaxed mb-4">
              On entend par <strong>« dispositif médical »</strong> tout instrument, appareil, équipement, <strong>logiciel</strong>, implant, réactif, matière ou autre article destiné par le fabricant à être utilisé, seul ou en association, chez l'homme pour l'une ou plusieurs des <strong>fins médicales précises suivantes</strong> :
            </p>
          </div>
        </div>

        <div class="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
          <h4 class="font-semibold text-green-900 mb-4 flex items-center">
            <span class="mr-2">⚕️</span> Fins médicales qualifiantes
          </h4>
          <div class="space-y-3">
            <div class="bg-white p-4 rounded border-l-2 border-green-300">
              <h5 class="font-medium text-green-800 mb-2">🔬 Diagnostic et prévention</h5>
              <p class="text-green-700 text-sm">Diagnostic, prévention, contrôle, prédiction, pronostic, traitement ou atténuation d'une maladie</p>
            </div>
            <div class="bg-white p-4 rounded border-l-2 border-green-300">
              <h5 class="font-medium text-green-800 mb-2">🩹 Blessures et handicaps</h5>
              <p class="text-green-700 text-sm">Diagnostic, contrôle, traitement, atténuation d'une blessure ou d'un handicap ou compensation de ceux-ci</p>
            </div>
            <div class="bg-white p-4 rounded border-l-2 border-green-300">
              <h5 class="font-medium text-green-800 mb-2">🧬 Structure anatomique</h5>
              <p class="text-green-700 text-sm">Investigation, remplacement ou modification d'une structure/fonction anatomique ou d'un processus physiologique/pathologique</p>
            </div>
            <div class="bg-white p-4 rounded border-l-2 border-green-300">
              <h5 class="font-medium text-green-800 mb-2">🧪 Examens in vitro</h5>
              <p class="text-green-700 text-sm">Communication d'informations au moyen d'un examen in vitro d'échantillons du corps humain</p>
            </div>
          </div>
        </div>

        <div class="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-400">
          <h4 class="font-semibold text-amber-900 mb-4 flex items-center">
            <span class="mr-2">⚠️</span> Condition importante
          </h4>
          <div class="bg-white p-4 rounded border-l-2 border-amber-300">
            <p class="text-amber-800 leading-relaxed">
              L'action principale voulue dans ou sur le corps humain <strong>n'est PAS obtenue</strong> par des moyens pharmacologiques, immunologiques ou par métabolisme.
            </p>
          </div>
        </div>

        <div class="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-400">
          <h4 class="font-semibold text-purple-900 mb-4 flex items-center">
            <span class="mr-2">➕</span> Sont également des DM
          </h4>
          <div class="space-y-3">
            <div class="bg-white p-3 rounded border-l-2 border-purple-300">
              <span class="text-purple-800">• Dispositifs destinés à la maîtrise de la conception (contraception)</span>
            </div>
            <div class="bg-white p-3 rounded border-l-2 border-purple-300">
              <span class="text-purple-800">• Produits de nettoyage/désinfection/stérilisation des DM</span>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p class="text-blue-800 text-center font-medium">
            🎯 <strong>Question clé :</strong> Votre logiciel a-t-il une de ces finalités médicales spécifiques ?
          </p>
        </div>
      </div>
    `,
    yesTarget: "MEDICAL_DEVICE",
    noTarget: "NOT_MEDICAL_DEVICE",
  },
};

const results: Record<ResultId, Result> = {
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
      "MDCG 2019-11 rev.2.1 - Guidance on Qualification and Classification of Software",
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
      "MDCG 2019-11 rev.2.1 - Guidance on Qualification and Classification of Software",
    ]
  },
};

export const qualificationConfig: ToolConfig<Question, Result> = {
  metadata: {
    id: "mdcg-2019-11-qualification",
    name: "Qualification Dispositif Médical Logiciel",
    description: "Déterminez si votre logiciel est considéré comme un dispositif médical selon le règlement européen MDR 2017/745",
    version: "2.1",
    category: "qualification",
    regulation: "MDR 2017/745",
    guidance: "MDCG 2019-11 rev.1",
    lastUpdated: "2024-01-15",
    author: APP_NAME
  },
  questions,
  results,
  totalQuestions: 5,
  startQuestion: "Q1"
};