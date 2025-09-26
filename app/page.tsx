// app/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cls } from "@/lib/styles";
// Thêm Icon từ lucide-react (hoặc Heroicons/react nếu mày dùng)
import { Home as HomeIcon, Flag, Globe, Lightbulb } from "lucide-react"; 

export default function Home() {

  // Dữ liệu cho phần I: Hành trình hình thành tư tưởng
  const timelineSteps = [
    {
      year: "Trước 1911",
      title: "Làng Sen & Nền tảng Nho học Yêu nước",
      desc: "Gia đình, quê hương xứ Nghệ hun đúc lòng nhân nghĩa, hiếu học, hình thành ý chí cứu nước ban đầu.",
      icon: HomeIcon,
    },
    {
      year: "1911–1920",
      title: "Hành trình vạn dặm & Luận cương Lênin",
      desc: "Bôn ba tìm đường, khảo sát cách mạng tư sản, đến với chủ nghĩa Mác–Lênin tại Đại hội Tours (1920).",
      icon: Flag,
    },
    {
      year: "1920s–1945",
      title: "Tổ chức lực lượng & Tuyên ngôn Độc lập",
      desc: "Ra đời 'Đường Kách mệnh', thành lập Đảng, Mặt trận Việt Minh, hiện thực hóa chân lý: Độc lập Dân tộc.",
      icon: Lightbulb,
    },
    {
      year: "1945–1969",
      title: "Đảng cầm quyền & Hoàn thiện Di chúc",
      desc: "Xây dựng Nhà nước của dân, chiến tranh nhân dân, phát triển tư tưởng về đạo đức cách mạng và CNXH.",
      icon: Globe,
    },
  ];

  // Dữ liệu cho phần II: Giá trị trường tồn
  const valueCards = [
    {
      title: "Kim chỉ nam Cách mạng Việt Nam",
      text: "Đưa dân tộc Việt Nam vượt qua mọi khó khăn, giành độc lập, thống nhất và đi lên Xã hội Chủ nghĩa.",
      items: ["Thắng lợi Lịch sử 1945 & 1975", "Nền tảng tư tưởng Đảng", "Mục tiêu Dân giàu, Nước mạnh"],
      icon: Flag,
    },
    {
      title: "Ngọn cờ Giải phóng Nhân loại",
      text: "Mở ra con đường cho các dân tộc thuộc địa, góp phần tích cực vào phong trào Hòa bình, Dân chủ thế giới.",
      items: ["Tư tưởng 'Độc lập gắn với CNXH'", "Đoàn kết Á – Phi (Bandung 1955)", "Hợp tác quốc tế bình đẳng"],
      icon: Globe,
    },
  ];

  return (
    <main className="overflow-hidden relative">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
        {/* background ảnh + overlay (Giữ nguyên) */}
        <div className="absolute inset-0">
          <img
            src="/bg-hero.png"
            alt="Hồ Chí Minh"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 to-black/80" />
        </div>

        {/* Text + CTA (Giữ nguyên) */}
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

      {/* ================= I. QUÁ TRÌNH (Timeline chi tiết hơn) ================= */}
      <section className="relative py-24 overflow-hidden bg-white dark:bg-neutral-900">
        {/* Nền gradient động xoay (Tao đổi màu để tránh bị lẫn, giờ dùng nền trắng/tối) */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        {/* Dùng một gradient cố định nhẹ nhàng hơn */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-white dark:from-neutral-900 dark:to-neutral-950" />


        <div className={`${cls.container} relative z-10`}>
          <h2 className="text-3xl font-bold text-red-600 mb-12 text-center">
            I. Hành trình hình thành tư tưởng
          </h2>

          {/* Line timeline - Dùng dữ liệu mới */}
          <div className="relative max-w-4xl mx-auto space-y-16">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-red-500/80 -translate-x-1/2" /> 
            
            {timelineSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                // Đặt các item timeline xen kẽ trái-phải
                className={[
                    "relative flex",
                    i % 2 === 0 ? "justify-start md:justify-start" : "justify-start md:justify-end"
                ].join(" ")}
              >
                <div 
                    className={[
                        "w-full md:w-1/2 p-6 rounded-xl shadow-xl bg-white dark:bg-neutral-800 border border-red-100 dark:border-red-900/40",
                        i % 2 === 0 ? "md:mr-10" : "md:ml-10"
                    ].join(" ")}
                >
                    {/* Icon và Dot */}
                    <div className="pointer-events-none absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 border-4 border-white dark:border-neutral-900 shadow-lg shadow-red-600/50 flex items-center justify-center">
                        <step.icon className="w-3 h-3 text-white" />
                    </div>
                    
                    <span className="text-sm font-medium text-red-500 block mb-1">{step.year}</span>
                    <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">{step.title}</h3>
                    <p className="text-foreground/90">{step.desc}</p>
                    <Link href="/map" className="mt-3 inline-block text-sm font-semibold text-red-600 hover:text-red-800 transition">
                        Xem chi tiết →
                    </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= II. GIÁ TRỊ (Dùng card + icon) ================= */}
      <section className="relative py-24 overflow-hidden">
        {/* Sóng động (Giữ nguyên) */}
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
            {valueCards.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 border-t-8 border-red-500 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm rounded-lg shadow-2xl hover:shadow-red-400/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                    <val.icon className="w-8 h-8 text-red-600 mr-3 p-1 border border-red-200 rounded-full" />
                    <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">{val.title}</h3>
                </div>
                
                <p className="text-base text-foreground/90 mb-4">{val.text}</p>
                
                <h4 className="font-semibold text-red-600 mt-4 mb-2">Điểm cốt lõi:</h4>
                <ul className="list-disc pl-5 text-sm space-y-1 text-foreground/80">
                  {val.items.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
                <Link href="/values" className="mt-4 inline-block text-sm font-semibold text-red-600 hover:text-red-800 transition">
                    Tìm hiểu sâu hơn →
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center italic text-xl font-medium text-red-700 dark:text-red-500 max-w-3xl mx-auto border-y-2 border-red-600 py-4"
          >
            <span className="text-red-500 text-3xl mr-2">“</span>
            Độc lập dân tộc gắn liền với Chủ nghĩa Xã hội
            <span className="text-red-500 text-3xl ml-2">”</span>
          </motion.blockquote>
        </div>
      </section>

      {/* Keyframes (Giữ nguyên) */}
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