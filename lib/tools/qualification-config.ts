import type { Question, Result, QuestionId, ResultId } from "@/types/qualification";
import type { ToolConfig } from "@/types/tool";
import { APP_NAME } from "@/lib/config"; // ✅ import du nom centralisé

const questions: Record<QuestionId, Question> = {
  Q1: {
    id: "Q1",
    text: "Le produit est-il un <strong>logiciel</strong> ?",
    hint: `
<strong>Définition d'un logiciel (MDCG 2019-11, §1.1) :</strong><br />
Un logiciel est un "ensemble d'instructions pouvant être exécutées par un processeur".
<br /><br />
<strong>Inclut :</strong>
<ul>
  <li>Applications mobiles (iOS, Android)</li>
  <li>Applications web et SaaS</li>
  <li>Logiciels embarqués</li>
  <li>Applications de bureau</li>
  <li>Scripts et algorithmes</li>
</ul>
<strong>Exclut :</strong>
<ul>
  <li>Dispositifs physiques sans composant logiciel</li>
  <li>Données pures (bases de données, fichiers)</li>
  <li>Protocoles de communication</li>
</ul>
`,
    yesTarget: "Q2",
    noTarget: "NOT_MEDICAL_DEVICE",
  },
  Q2: {
    id: "Q2",
    text: `Le logiciel entre-t-il dans l'une de ces <strong>catégories spéciales</strong> ?<br /><br />
<ul>
  <li>Logiciel visé à l'<strong>Annexe XVI</strong> du MDR</li>
  <li><strong>Accessoire</strong> de dispositif médical</li>
  <li>Logiciel <strong>influençant</strong> l'usage d'un DM physique</li>
</ul>`,
    hint: `
<strong>🔍 Annexe XVI – Produits sans finalité médicale réglementés comme DM :</strong>
<ul>
  <li>Lentilles de contact ou similaires (sauf correctives)</li>
  <li>Produits pour introduction dans le corps à fins esthétiques</li>
  <li>Substances pour comblement facial ou implantation sous-cutanée</li>
  <li>Équipements de liposuccion, lipolyse, lipoplastie</li>
  <li>Appareils laser/lumière pour modification de la peau</li>
  <li>Équipements de stimulation cérébrale trans-crânienne</li>
</ul>
<strong>🔧 Accessoire (Art. 2(2) MDR) :</strong><br />
"Produit destiné par son fabricant à permettre à un DM d'être utilisé conformément à sa destination ou à assister spécifiquement et directement sa fonction médicale"
<br /><br />
<strong>⚡ Logiciel influençant un DM :</strong>
<ul>
  <li>Réglage automatique de paramètres thérapeutiques</li>
  <li>Déclenchement d'actions sur le dispositif</li>
  <li>Contrôle de fonctions critiques</li>
</ul>
<em>Si votre logiciel correspond à l'une de ces catégories, il est automatiquement considéré comme un dispositif médical.</em>
`,
    yesTarget: "MEDICAL_DEVICE",
    noTarget: "Q3",
  },
  Q3: {
    id: "Q3",
    text: "Le logiciel exécute-t-il une <strong>action sur les données</strong> différente du simple stockage, archivage, communication, compression ou recherche ?",
    hint: `
<strong>❌ Actions NON qualifiantes (MDCG 2019-11, §3.2) :</strong>
<ul>
  <li>Stockage : sauvegarde de données sans traitement</li>
  <li>Archivage : conservation à long terme</li>
  <li>Communication : transmission, transfert, routage</li>
  <li>Compression : réduction de taille sans interprétation</li>
  <li>Recherche simple : requêtes, indexation</li>
</ul>
<strong>✅ Actions qualifiantes (exemples) :</strong>
<ul>
  <li>Analyse : interprétation de données médicales</li>
  <li>Calcul : algorithmes de diagnostic ou traitement</li>
  <li>Traitement d'image : amélioration, reconstruction</li>
  <li>Aide à la décision : recommandations cliniques</li>
  <li>Monitoring : surveillance avec alertes</li>
  <li>Transformation : conversion avec valeur ajoutée médicale</li>
</ul>
<em>La question clé : votre logiciel fait-il plus que simplement gérer des données ?</em>
`,
    yesTarget: "Q4",
    noTarget: "NOT_MEDICAL_DEVICE",
  },
  Q4: {
    id: "Q4",
    text: "L'action du logiciel est-elle destinée au <strong>bénéfice de patients individuels</strong> ?",
    hint: `
<strong>✅ Bénéfice INDIVIDUEL (qualifiant) :</strong>
<ul>
  <li>Diagnostic pour un patient spécifique</li>
  <li>Traitement personnalisé</li>
  <li>Surveillance d'un patient donné</li>
  <li>Aide à la décision clinique individuelle</li>
  <li>Calculs de dosage personnalisés</li>
  <li>Planification thérapeutique individuelle</li>
</ul>
<strong>❌ Bénéfice POPULATIONNEL/ADMINISTRATIF (non qualifiant) :</strong>
<ul>
  <li>Statistiques de santé publique</li>
  <li>Gestion administrative hospitalière</li>
  <li>Études épidémiologiques</li>
  <li>Recherche clinique (sans bénéfice immédiat)</li>
  <li>Facturation et gestion</li>
  <li>Formation médicale générale</li>
</ul>
<em>Votre logiciel améliore-t-il directement la prise en charge d'un patient particulier ?</em>
`,
    yesTarget: "Q5",
    noTarget: "NOT_MEDICAL_DEVICE",
  },
  Q5: {
    id: "Q5",
    text: "Le logiciel répond-il à la <strong>définition officielle</strong> de « Dispositif Médical » selon l'Article 2(1) du MDR ?",
    hint: `
<strong>📋 Définition officielle – Article 2(1) du Règlement (UE) 2017/745 :</strong><br /><br />
On entend par <strong>« dispositif médical »</strong> tout instrument, appareil, équipement, <strong>logiciel</strong>, implant, réactif, matière ou autre article destiné par le fabricant à être utilisé, seul ou en association, chez l'homme pour l'une ou plusieurs des <strong>fins médicales précises suivantes</strong> :
<ul>
  <li>Diagnostic, prévention, contrôle, prédiction, pronostic, traitement ou atténuation d'une maladie</li>
  <li>Diagnostic, contrôle, traitement, atténuation d'une blessure ou d'un handicap ou compensation de ceux-ci</li>
  <li>Investigation, remplacement ou modification d'une structure/fonction anatomique ou d'un processus physiologique/pathologique</li>
  <li>Communication d'informations au moyen d'un examen in vitro d'échantillons du corps humain</li>
</ul>
<strong>⚕️ Condition importante :</strong><br />
L'action principale voulue dans ou sur le corps humain <strong>n'est PAS obtenue</strong> par des moyens pharmacologiques, immunologiques ou par métabolisme.
<br /><br />
<strong>➕ Sont également des DM :</strong>
<ul>
  <li>Dispositifs destinés à la maîtrise de la conception (contraception)</li>
  <li>Produits de nettoyage/désinfection/stérilisation des DM</li>
</ul>
<em>Votre logiciel a-t-il une de ces finalités médicales spécifiques ?</em>
`,
    yesTarget: "MEDICAL_DEVICE",
    noTarget: "NOT_MEDICAL_DEVICE",
  },
};

const results: Record<ResultId, Result> = {
  MEDICAL_DEVICE: {
    id: "MEDICAL_DEVICE",
    title: "✅ Dispositif Médical Logiciel",
    description: `Votre produit est qualifié comme un <strong>Dispositif Médical Logiciel (MDSW)</strong> selon la guidance MDCG 2019-11 v2.1.<br /><br />Cela signifie que votre logiciel est soumis aux exigences réglementaires du MDR ou de l'IVDR et doit suivre les procédures de conformité appropriées.`,
    variant: "success",
    recommendations: [
      "Définissez la réglementation applicable : MDR 2017/745 ou IVDR 2017/746",
      "Procéder à la classification du DM selon la règlementation applicable",
      "Établir un système de management de la qualité conforme à l'ISO 13485",
      "Mettre en place une documentation technique complète",
      "Planifier les essais cliniques si nécessaires selon la classe du dispositif"
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
    description: `Votre produit <strong>n'est pas qualifié</strong> comme un Dispositif Médical Logiciel selon les critères du MDR 2017/745 et de la guidance MDCG 2019-11 v2.1.<br /><br />Votre logiciel n'est donc pas soumis aux exigences du règlement sur les dispositifs médicaux, mais peut être soumis à d'autres réglementations selon sa nature et son usage.`,
    variant: "destructive",
    recommendations: [
      
    ],
    nextSteps: [
      
    ],
    references: [
      "MDCG 2019-11 rev.1 - Guidance on Qualification and Classification of Software",
     
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
    author: APP_NAME // ✅ ici
  },
  questions,
  results,
  totalQuestions: 5,
  startQuestion: "Q1"
};
