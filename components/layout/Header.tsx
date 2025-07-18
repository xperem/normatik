"use client";

import { motion } from "framer-motion";
import { Stethoscope, Shield, FileCheck, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { APP_NAME, APP_TAGLINE } from "@/lib/config"; // ✅ import centralisé

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-5xl font-bold mb-4">
              {APP_NAME}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {APP_TAGLINE}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
              <Shield className="mr-2 h-4 w-4" />
              MDR 2017/745
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
              <FileCheck className="mr-2 h-4 w-4" />
              MDCG Guidelines
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
              <Settings className="mr-2 h-4 w-4" />
              ISO Standards
            </Badge>
          </motion.div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="rgb(248 250 252)"
          ></path>
        </svg>
      </div>
    </motion.header>
  );
}
