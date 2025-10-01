// app/ai-report/page.tsx
"use client";

import { motion } from "framer-motion";

export default function AIReportPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#e7e3dc] text-black">
      <div className="max-w-6xl w-full px-8 flex flex-col items-center md:items-start">
        {/* Header nhỏ góc phải */}
        <div className="absolute top-6 right-10 text-sm font-semibold tracking-wide">
          NHÓM 6
        </div>

        {/* Nội dung chính */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10">
          {/* Khối vuông bên trái */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-56 h-56 bg-black relative grid grid-cols-3 grid-rows-3"
          >
            {/* Khối mô phỏng ô vuông */}
            <div className="col-span-2 row-span-2 bg-black" />
            <div className="col-start-3 row-span-1 bg-[#e7e3dc] border border-black" />
            <div className="col-start-3 row-start-2 bg-[#e7e3dc] border border-black" />
            <div className="col-start-2 row-start-3 bg-[#e7e3dc] border border-black" />
            <div className="col-start-3 row-start-3 bg-[#e7e3dc] border border-black" />

            {/* Tam giác trắng */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-white" />
            <div className="absolute top-0 left-0 w-1/2 h-1/2 border-l-4 border-b-4 border-black rotate-45 origin-bottom-left" />
          </motion.div>

          {/* Text bên phải */}
          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-extrabold"
          >
            AI REPORT
          </motion.h1>
        </div>

        {/* Hai mục nhỏ bên dưới */}
        <div className="flex gap-12 mt-16 text-lg font-semibold">
          <span>01. STORY TELLING</span>
          <span>02. Ý TƯỞNG TRÒ CHƠI</span>
        </div>

        {/* Họa tiết góc phải dưới */}
        <div className="absolute bottom-6 right-8 w-20 h-10 border-t-2 border-black rounded-full" />
      </div>
    </main>
  );
}
