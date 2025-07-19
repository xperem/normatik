"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { ToolsGrid } from "@/components/layout/ToolsGrid";
import { Footer } from "@/components/layout/Footer";
import { QualificationWizard } from "@/components/qualification/QualificationWizard";
import { RegulatoryWizard } from "@/components/regulatory/regulatoryWizard";
import { ClassificationDmWizard } from "@/components/classificationDm/ClassificationDmWizard";
import { ClassificationDmdivWizard } from "@/components/classificationDmdiv/ClassificationDmDivWizard";
import { APP_NAME } from "@/lib/config";

export default function HomePage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleBackToHome = () => {
    setSelectedTool(null);
  };

  const renderSelectedTool = () => {
    switch (selectedTool) {
      case "qualification":
        return <QualificationWizard />;
      case "dm-dmdiv":
        return <RegulatoryWizard />;
      case "classificationDm":
        return <ClassificationDmWizard />;
      case "classificationDmdiv":
        return <ClassificationDmdivWizard />;
      default:
        return null;
    }
  };

  const getToolTitle = () => {
    switch (selectedTool) {
      case "qualification":
        return {
          full: `Qualification - ${APP_NAME}`,
          short: "Qualification"
        };
      case "dm-dmdiv":
        return {
          full: `DM ou DMDIV - ${APP_NAME}`,
          short: "DM ou DMDIV"
        };
      case "classificationDm":
        return {
          full: `Classification DM - ${APP_NAME}`,
          short: "Classification DM"
        };
      case "classificationDmdiv":
        return {
          full: `Classification DMDIV - ${APP_NAME}`,
          short: "Classification DMDIV"
        };
      default:
        return {
          full: APP_NAME,
          short: APP_NAME
        };
    }
  };

  const getToolVersion = () => {
    switch (selectedTool) {
      case "qualification":
        return "MDCG 2019-11 rev.2.1";
      case "dm-dmdiv":
        return "MDCG 2019-11 rev.2.1 Figure 2";
      case "classificationDm":
        return "MDR 2017/745 Règle 11";
      case "classificationDmdiv":
        return "IVDR 2017/746 Règles 1-7";
      default:
        return "";
    }
  };

  const toolTitle = getToolTitle();
  const toolVersion = getToolVersion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Optional banner with app name */}
      <div className="bg-blue-100 text-center text-sm py-1 text-blue-900 font-medium">
        Bienvenue sur {APP_NAME} !
      </div>

      <AnimatePresence mode="wait">
        {!selectedTool ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Header />
            <ToolsGrid onToolSelect={handleToolSelect} />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="tool"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            {/* Tool Header - Responsive */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  {/* Left section - Back button and title */}
                  <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
                    <Button
                      variant="ghost"
                      onClick={handleBackToHome}
                      className="text-gray-600 hover:text-gray-900 shrink-0 text-sm sm:text-base px-2 sm:px-4"
                    >
                      <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden xs:inline">Retour aux outils</span>
                      <span className="xs:hidden">Retour</span>
                    </Button>
                    <div className="h-4 sm:h-6 w-px bg-gray-300 shrink-0" />
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                      <span className="hidden sm:inline">{toolTitle.full}</span>
                      <span className="sm:hidden">{toolTitle.short}</span>
                    </h1>
                  </div>
                  
                  {/* Right section - Version info */}
                  {toolVersion && (
                    <div className="text-xs sm:text-sm text-gray-500 shrink-0 self-start sm:self-center">
                      {toolVersion}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tool Content */}
            <div className="py-6 sm:py-8">
              {renderSelectedTool()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}