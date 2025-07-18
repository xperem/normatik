"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { ToolsGrid } from "@/components/layout/ToolsGrid";
import { Footer } from "@/components/layout/Footer";
import { QualificationWizard } from "@/components/qualification/QualificationWizard";
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
      default:
        return null;
    }
  };

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
            {/* Tool Header */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      onClick={handleBackToHome}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Retour aux outils
                    </Button>
                    <div className="h-6 w-px bg-gray-300" />
                    <h1 className="text-xl font-semibold text-gray-900">
                      {selectedTool === "qualification"
                        ? `Qualification - ${APP_NAME}`
                        : APP_NAME}
                    </h1>
                  </div>
                  <div className="text-sm text-gray-500">
                    MDCG 2019-11 v2.1
                  </div>
                </div>
              </div>
            </div>

            {/* Tool Content */}
            <div className="py-8">
              {renderSelectedTool()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
