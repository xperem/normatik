// lib/tools/qualification/hints.ts
import type { QuestionId } from "@/types/qualification";

export const hintsContent: Record<QuestionId, string> = {
  Q1: `
    <style>
      .hint-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 768px) { 
        .hint-grid { grid-template-columns: 1fr; gap: 12px; }
      }
      .hint-card { border-radius: 8px; padding: 16px; }
      @media (max-width: 768px) { 
        .hint-card { padding: 12px; }
      }
      .hint-list { margin: 0; padding-left: 0; list-style: none; }
      .hint-list-item { display: flex; align-items: flex-start; margin-bottom: 8px; }
      .hint-list-item:last-child { margin-bottom: 0; }
      .hint-bullet { margin-right: 8px; margin-top: 2px; flex-shrink: 0; }
    </style>
    
    <div style="margin-bottom: 24px;">
      <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <h4 style="font-weight: 600; color: #1e40af; margin-bottom: 8px;">📋 Définition officielle</h4>
        <p style="color: #1e40af; margin-bottom: 8px; line-height: 1.5;">
          <strong>Logiciel selon MDCG 2019-11, §1.1 :</strong><br>
          "Ensemble d'instructions pouvant être exécutées par un processeur"
        </p>
      </div>

      <div class="hint-grid">
        <div class="hint-card" style="background: #dcfce7; border-left: 4px solid #22c55e;">
          <h4 style="font-weight: 600; color: #15803d; margin-bottom: 12px;">
            ✅ Inclut
          </h4>
          <ul class="hint-list">
            <li class="hint-list-item" style="color: #15803d;">
              <span class="hint-bullet">•</span>
              <span>Applications mobiles (iOS, Android)</span>
            </li>
            <li class="hint-list-item" style="color: #15803d;">
              <span class="hint-bullet">•</span>
              <span>Applications web et SaaS</span>
            </li>
            <li class="hint-list-item" style="color: #15803d;">
              <span class="hint-bullet">•</span>
              <span>Logiciels embarqués</span>
            </li>
            <li class="hint-list-item" style="color: #15803d;">
              <span class="hint-bullet">•</span>
              <span>Applications de bureau</span>
            </li>
            <li class="hint-list-item" style="color: #15803d;">
              <span class="hint-bullet">•</span>
              <span>Scripts et algorithmes</span>
            </li>
          </ul>
        </div>

        <div class="hint-card" style="background: #fef2f2; border-left: 4px solid #ef4444;">
          <h4 style="font-weight: 600; color: #dc2626; margin-bottom: 12px;">
            ❌ Exclut
          </h4>
          <ul class="hint-list">
            <li class="hint-list-item" style="color: #dc2626;">
              <span class="hint-bullet">•</span>
              <span>Dispositifs physiques sans composant logiciel</span>
            </li>
            <li class="hint-list-item" style="color: #dc2626;">
              <span class="hint-bullet">•</span>
              <span>Données pures (bases de données, fichiers)</span>
            </li>
            <li class="hint-list-item" style="color: #dc2626;">
              <span class="hint-bullet">•</span>
              <span>Protocoles de communication</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,

  Q2: `
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

  Q3: `
    <style>
      .action-item { 
        background: white; 
        padding: 12px; 
        border-radius: 6px; 
        display: flex; 
        align-items: center; 
        margin-bottom: 12px; 
      }
      .action-item:last-child { margin-bottom: 0; }
      .action-label { 
        width: 120px; 
        font-weight: 500; 
        flex-shrink: 0; 
      }
      @media (max-width: 768px) { 
        .action-item { 
          flex-direction: column; 
          align-items: flex-start; 
          padding: 16px; 
        }
        .action-label { 
          width: auto; 
          margin-bottom: 4px; 
        }
      }
      .hint-section { 
        border-radius: 8px; 
        padding: 20px; 
        margin-bottom: 24px; 
      }
      @media (max-width: 768px) { 
        .hint-section { 
          padding: 16px; 
          margin-bottom: 16px; 
        }
      }
    </style>
    
    <div style="margin-bottom: 24px;">
      <div class="hint-section" style="background: #fef2f2; border-left: 4px solid #ef4444;">
        <h4 style="font-weight: 600; color: #dc2626; margin-bottom: 16px; font-size: 18px;">
          ❌ Actions NON qualifiantes (MDCG 2019-11, §3.2)
        </h4>
        <div>
          <div class="action-item" style="border-left: 2px solid #fca5a5;">
            <span class="action-label" style="color: #dc2626;">Stockage :</span>
            <span style="color: #991b1b;">sauvegarde de données sans traitement</span>
          </div>
          <div class="action-item" style="border-left: 2px solid #fca5a5;">
            <span class="action-label" style="color: #dc2626;">Archivage :</span>
            <span style="color: #991b1b;">conservation à long terme</span>
          </div>
          <div class="action-item" style="border-left: 2px solid #fca5a5;">
            <span class="action-label" style="color: #dc2626;">Communication :</span>
            <span style="color: #991b1b;">transmission, transfert, routage</span>
          </div>
          <div class="action-item" style="border-left: 2px solid #fca5a5;">
            <span class="action-label" style="color: #dc2626;">Compression :</span>
            <span style="color: #991b1b;">réduction de taille sans interprétation</span>
          </div>
          <div class="action-item" style="border-left: 2px solid #fca5a5;">
            <span class="action-label" style="color: #dc2626;">Recherche :</span>
            <span style="color: #991b1b;">requêtes, indexation simple</span>
          </div>
        </div>
      </div>

      <div class="hint-section" style="background: #dcfce7; border-left: 4px solid #22c55e;">
        <h4 style="font-weight: 600; color: #15803d; margin-bottom: 16px; font-size: 18px;">
          ✅ Actions qualifiantes (exemples)
        </h4>
        <div>
          <div class="action-item" style="border-left: 2px solid #86efac;">
            <span class="action-label" style="color: #15803d;">Analyse :</span>
            <span style="color: #166534;">interprétation de données médicales</span>
          </div>
          <div class="action-item" style="border-left: 2px solid #86efac;">
            <span class="action-label" style="color: #15803d;">Calcul :</span>
            <span style="color: #166534;">algorithmes de diagnostic ou traitement</span>
          </div>
          <div class="action-item" style="border-left: 2px solid #86efac;">
            <span class="action-label" style="color: #15803d;">Traitement :</span>
            <span style="color: #166534;">amélioration, reconstruction d'images</span>
          </div>
          <div class="action-item" style="border-left: 2px solid #86efac;">
            <span class="action-label" style="color: #15803d;">Aide :</span>
            <span style="color: #166534;">recommandations cliniques</span>
          </div>
          <div class="action-item" style="border-left: 2px solid #86efac;">
            <span class="action-label" style="color: #15803d;">Monitoring :</span>
            <span style="color: #166534;">surveillance avec alertes</span>
          </div>
          <div class="action-item" style="border-left: 2px solid #86efac;">
            <span class="action-label" style="color: #15803d;">Transformation :</span>
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

  Q4: `
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

  Q5: `
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
};