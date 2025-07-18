"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, FileText, BarChart3, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  title: string;
  description: string;
  category: string;
  status: "available" | "coming-soon" | "beta";
  icon: React.ReactNode;
  features: string[];
  onClick?: () => void;
  delay?: number;
}

function ToolCard({ title, description, category, status, icon, features, onClick, delay = 0 }: ToolCardProps) {
  const isAvailable = status === "available";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card 
        className={`h-full glass-effect transition-all duration-300 hover:shadow-xl group ${
          isAvailable ? "cursor-pointer hover:border-blue-300" : "opacity-75"
        }`}
        onClick={isAvailable ? onClick : undefined}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
            <Badge 
              variant={status === "available" ? "success" : status === "beta" ? "warning" : "secondary"}
              className="text-xs"
            >
              {status === "available" ? "Disponible" : status === "beta" ? "Bêta" : "Bientôt"}
            </Badge>
          </div>
          <CardTitle className={`text-xl mb-2 transition-colors ${
            isAvailable ? "group-hover:text-blue-600" : ""
          }`}>
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
          <Badge variant="outline" className="w-fit text-xs">
            {category}
          </Badge>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Fonctionnalités:</h4>
              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="mr-2 h-3 w-3 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <Button
              disabled={!isAvailable}
              variant={isAvailable ? "default" : "secondary"}
              className={`w-full mt-4 pointer-events-none ${
                isAvailable ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""
              }`}
            >
              {isAvailable ? "Utiliser l'outil" : "Bientôt disponible"}
              {isAvailable && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ToolsGridProps {
  onToolSelect: (toolId: string) => void;
}

export function ToolsGrid({ onToolSelect }: ToolsGridProps) {
  const tools = [
    {
      id: "qualification",
      title: "Qualification DM Logiciel",
      description: "Déterminez si votre logiciel est un dispositif médical selon le MDCG 2019-11",
      category: "Qualification",
      status: "available" as const,
      icon: <CheckCircle className="w-6 h-6" />,
      features: [
        "Questionnaire interactif MDCG 2019-11",
        "Aide contextuelle détaillée",
        "Rapport d'évaluation exportable",
        "Justifications documentées"
      ]
    },
    {
      id: "dm-dmdiv",
      title: "DM ou DMDIV ?",
      description: "Déterminez si votre dispositif relève du MDR (DM) ou IVDR (DMDIV)",
      category: "Qualification",
      status: "coming-soon" as const,
      icon: <BarChart3 className="w-6 h-6" />,
      features: [
        "Questionnaire de différenciation",
        "Critères MDR vs IVDR",
        "Aide à la décision",
        "Justifications documentées"
      ]
    },
    {
      id: "classification-dm",
      title: "Classification DM",
      description: "Classifiez votre dispositif médical selon les règles du MDR",
      category: "Classification",
      status: "coming-soon" as const,
      icon: <Shield className="w-6 h-6" />,
      features: [
        "Règles de classification MDR",
        "Assistant de décision",
        "Matrice de classification",
        "Documentation automatique"
      ]
    },
    {
      id: "classification-dmdiv",
      title: "Classification DMDIV",
      description: "Classifiez votre dispositif médical de diagnostic in vitro selon l'IVDR",
      category: "Classification",
      status: "coming-soon" as const,
      icon: <FileText className="w-6 h-6" />,
      features: [
        "Règles de classification IVDR",
        "Classes A, B, C et D",
        "Critères de performance",
        "Rapport de classification"
      ]
    },
    {
      id: "classification-62304",
      title: "Classification de Sécurité (62304)",
      description: "Classifiez votre logiciel médical selon la norme IEC 62304",
      category: "Classification",
      status: "coming-soon" as const,
      icon: <Users className="w-6 h-6" />,
      features: [
        "Classes A, B et C",
        "Analyse des risques logiciel",
        "Matrice de classification",
        "Documentation 62304"
      ]
    },
    {
      id: "substantial-change",
      title: "Changement Substantiel",
      description: "Évaluez si votre modification constitue un changement substantiel",
      category: "Gestion des changements",
      status: "coming-soon" as const,
      icon: <Clock className="w-6 h-6" />,
      features: [
        "NBOG",
        "Arbre de décision",
        "Impact réglementaire",
        "Plan d'action"
      ]
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Outils QARA Disponibles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une suite complète d&apos;outils pour vous accompagner dans vos démarches réglementaires
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              category={tool.category}
              status={tool.status}
              icon={tool.icon}
              features={tool.features}
              onClick={() => onToolSelect(tool.id)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}