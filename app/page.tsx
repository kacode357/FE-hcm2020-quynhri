// app/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cls } from "@/lib/styles";

export default function Home() {
  return (
    <main className="overflow-hidden relative">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
        {/* background ảnh + overlay */}
        <div className="absolute inset-0">
          <img
            src="/bg-hero.png"
            alt="Hồ Chí Minh"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 to-black/80" />
        </div>

        {/* Text + CTA */}
        <div className="relative z-10 px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
          >
            Chương II: Hành trình tư tưởng Hồ Chí Minh
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-lg md:text-xl text-gray-200 mb-8"
          >
            Từ làng Sen đến Ba Đình lịch sử – một hành trình vượt thời gian,
            hun đúc khát vọng độc lập dân tộc và lý tưởng xã hội chủ nghĩa.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button asChild className="bg-red-600 text-white hover:bg-red-700">
              <Link href="/map">Khám phá Dấu chân</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="bg-transparent border border-white/60 text-white hover:bg-white/10"
            >
              <Link href="/values">Giá trị tư tưởng</Link>
            </Button>

            <Button asChild variant="ghost" className="text-white hover:bg-white/10">
              <Link href="/quiz">Trò chơi</Link>
            </Button>

            <Button asChild variant="ghost" className="text-white hover:bg-white/10">
              <Link href="/stories">Câu chuyện</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================= I. QUÁ TRÌNH ================= */}
      <section className="relative py-24 overflow-hidden">
        {/* Nền gradient động xoay */}
        <div className="absolute inset-0 bg-[conic-gradient(at_top_left,_#fee2e2,_#ffffff,_#fecaca,_#ffffff)] dark:bg-[conic-gradient(at_bottom_right,_#0b0b0b,_#1a1a1a,_#0b0b0b)] animate-spin-slow" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-15 mix-blend-overlay" />

        <div className={`${cls.container} relative z-10`}>
          <h2 className="text-3xl font-bold text-red-600 mb-12 text-center">
            I. Hành trình hình thành tư tưởng
          </h2>

          {/* Line timeline */}
          <div className="relative max-w-3xl mx-auto space-y-12">
            <div className="absolute left-2 md:left-3 top-0 bottom-0 w-[2px] bg-red-500/80" />

            {[
              {
                year: "Trước 1911",
                desc: "Nền tảng gia đình Nho học, quê hương xứ Nghệ hun đúc tình yêu nước và ý chí cứu dân.",
              },
              {
                year: "1911–1920",
                desc: "Ra đi tìm đường cứu nước; tiếp nhận Luận cương Lênin – bước ngoặt đến với CN Mác–Lênin.",
              },
              {
                year: "1920s–1945",
                desc: "Xây dựng tổ chức, Việt Minh; tổng khởi nghĩa và Tuyên ngôn Độc lập 1945.",
              },
              {
                year: "1945–1969",
                desc: "Hoàn thiện hệ thống tư tưởng trong xây dựng và bảo vệ Tổ quốc.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative pl-10 md:pl-12 ml-4 md:ml-6"
              >
                {/* Dot: đừng đè chữ -> đặt ngoài vùng text + pointer-events-none */}
                <div className="pointer-events-none absolute top-1 left-0 -translate-x-[1.05rem] md:-translate-x-[1.15rem] w-5 h-5 rounded-full bg-red-600 border-2 border-white dark:border-neutral-900 shadow-lg shadow-red-600/50" />
                <h3 className="text-xl font-semibold text-red-700">{step.year}</h3>
                <p className="text-foreground/80">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= II. GIÁ TRỊ ================= */}
      <section className="relative py-24 overflow-hidden">
        {/* Sóng động */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-100 via-white to-red-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-40 animate-wave"
            preserveAspectRatio="none"
            viewBox="0 0 1200 200"
          >
            <path
              d="M0,100 C150,200 350,0 600,100 C850,200 1050,0 1200,100 L1200,00 L0,0 Z"
              fill="rgba(239,68,68,0.30)"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-44 animate-wave-slow"
            preserveAspectRatio="none"
            viewBox="0 0 1200 200"
          >
            <path
              d="M0,120 C200,220 400,20 600,120 C800,220 1000,20 1200,120 L1200,00 L0,0 Z"
              fill="rgba(239,68,68,0.20)"
            />
          </svg>
        </div>

        <div className={`${cls.container} relative z-10`}>
          <h2 className="text-3xl font-bold text-red-600 mb-12 text-center">
            II. Giá trị trường tồn của tư tưởng
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Đối với cách mạng Việt Nam",
                text: "Soi đường cho các thắng lợi: Tháng Tám 1945, Tuyên ngôn Độc lập, thống nhất đất nước 1975.",
                items: ["Định hướng phát triển dân tộc", "Xây dựng Đảng cầm quyền", "Đại đoàn kết toàn dân"],
              },
              {
                title: "Đối với nhân loại",
                text: "Góp phần vào phong trào giải phóng dân tộc, bình đẳng, hòa bình và hợp tác quốc tế.",
                items: ["Đại hội Tours 1920", "Hội nghị Bandung 1955", "Tình hữu nghị quốc tế rộng rãi"],
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-6 border-l-4 border-red-500 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-red-400/40 transition"
              >
                <h3 className="text-xl font-semibold text-red-600 mb-3">{val.title}</h3>
                <p className="text-sm text-foreground/80 mb-3">{val.text}</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {val.items.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 text-center italic text-lg text-red-700 max-w-2xl mx-auto border-l-4 border-red-600 pl-4"
          >
            “Độc lập dân tộc gắn liền với chủ nghĩa xã hội”
          </motion.blockquote>
        </div>
      </section>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }

        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave { animation: wave 12s linear infinite; }
        .animate-wave-slow { animation: wave 20s linear infinite; }
      `}</style>
    </main>
  );
}
