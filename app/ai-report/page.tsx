// app/ai-report/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cls } from "@/lib/styles";
import { ArrowUp } from "lucide-react";

export default function AIReportPage() {
  return (
    <main className="overflow-hidden relative">
      {/* ============ HERO ============ */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background + overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 via-black/70 to-neutral-900/90 dark:from-neutral-900 dark:via-black dark:to-red-900/80" />
        </div>

        {/* Text */}
        <div className="relative z-10 px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent"
          >
            AI REPORT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-200 dark:text-gray-300"
          >
            Nhóm 6 – Storytelling & Minigame
          </motion.p>
        </div>
      </section>

      {/* ============ STORYTELLING ============ */}
      <section className="relative py-24 overflow-hidden bg-white dark:bg-neutral-900">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className={`${cls.container} relative z-10`}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-red-600 dark:text-red-400 mb-12 text-center"
          >
            Storytelling – Sử dụng giọng đọc AI
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex justify-center"
          >
            <img
              src="/report-ai-storytelling.jpg"
              alt="Storytelling Report"
              className="w-[75%] rounded-xl shadow-2xl border border-red-200 dark:border-red-900/40 hover:scale-105 hover:shadow-red-400/40 transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* ============ MINIGAME ============ */}
      <section className="relative py-24 overflow-hidden bg-red-50 dark:bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-transparent dark:from-neutral-900 dark:to-neutral-950" />
        <div className={`${cls.container} relative z-10`}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-red-600 dark:text-red-400 mb-12 text-center"
          >
            Minigame – Sử dụng ý tưởng ChatGPT
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex justify-center"
          >
            <img
              src="/report-ai-chatgpt.jpg"
              alt="Minigame Report"
              className="w-[75%] rounded-xl shadow-2xl border border-red-200 dark:border-red-900/40 hover:scale-105 hover:shadow-red-400/40 transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer + Back to Top */}
    

      {/* Waves decor */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[200%] h-20 animate-wave-slow"
          preserveAspectRatio="none"
          viewBox="0 0 1200 200"
        >
          <path
            d="M0,100 C150,200 350,0 600,100 C850,200 1050,0 1200,100 L1200,00 L0,0 Z"
            fill="rgba(239,68,68,0.20)"
          />
        </svg>
      </div>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-wave-slow {
          animation: wave 20s linear infinite;
        }
      `}</style>
    </main>
  );
}
