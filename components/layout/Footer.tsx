"use client";

import { motion } from "framer-motion";
import { Heart, ExternalLink, Mail, FileText, Shield } from "lucide-react";
import { APP_NAME } from "@/lib/config"; // ✅ import du nom centralisé

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    {
      title: "Réglementations",
      items: [
        { name: "MDR 2017/745", href: "https://eur-lex.europa.eu/eli/reg/2017/745/oj", external: true },
        { name: "MDCG Guidelines", href: "https://health.ec.europa.eu/medical-devices-coordination-group-mdcg_en", external: true },
        { name: "ANSM", href: "https://ansm.sante.fr/", external: true },
        { name: "CE Marking", href: "https://europa.eu/youreurope/business/product-requirements/labels-markings/ce-marking/", external: true }
      ]
    },
    {
      title: "Normes",
      items: [
        { name: "ISO 13485", href: "https://www.iso.org/standard/59752.html", external: true },
        { name: "ISO 14971", href: "https://www.iso.org/standard/72704.html", external: true },
        { name: "IEC 62304", href: "https://www.iec.ch/dyn/www/f?p=103:38:0::::FSP_ORG_ID,FSP_APEX_PAGE,FSP_PROJECT_ID:1297,23,25725", external: true },
        { name: "IEC 62366-1", href: "https://www.iec.ch/dyn/www/f?p=103:38:0::::FSP_ORG_ID,FSP_APEX_PAGE,FSP_PROJECT_ID:1297,23,22794", external: true }
      ]
    },
    {
      title: "Ressources",
      items: [
        { name: "Documentation", href: "#", external: false },
        { name: "Guides pratiques", href: "#", external: false },
        { name: "FAQ", href: "#", external: false },
        { name: "Support", href: "#", external: false }
      ]
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                {APP_NAME}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Outils modernes pour simplifier la conformité réglementaire des dispositifs médicaux.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <span>Développé avec</span>
                <Heart className="w-4 h-4 text-red-500 mx-1" fill="currentColor" />
                <span>pour la communauté QARA</span>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {links.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="md:col-span-1"
            >
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      {item.name}
                      {item.external && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-yellow-200 font-medium mb-1">Avertissement Important</p>
                <p className="text-yellow-100/80 leading-relaxed">
                  Ces outils sont fournis à titre informatif et d'aide à la décision. Ils ne remplacent pas l'expertise 
                  d'un professionnel qualifié en affaires réglementaires. Toute décision réglementaire doit être validée 
                  par des experts compétents et les autorités appropriées.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p>© {currentYear} {APP_NAME}. Tous droits réservés.</p>
              <span className="hidden md:inline">•</span>
              <a href="#" className="hover:text-white transition-colors">
                Mentions légales
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Confidentialité
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs">Version 1.0.0</span>
              <a
                href="mailto:contact@qaratools.com"
                className="flex items-center hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mr-1" />
                Contact
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
