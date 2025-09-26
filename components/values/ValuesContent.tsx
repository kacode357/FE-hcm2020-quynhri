// components/values/ValuesContent.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ============ Anim cho nội dung ============ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

/* ============ Nền FULL-BLEED (trải toàn trang) ============ */
function BackgroundFullBleed() {
  return (
    <div
      aria-hidden
      className="
        fixed inset-0 -z-10 pointer-events-none
        bg-gradient-to-b from-rose-50 via-amber-50/40 to-white
        dark:from-[#0b0a0a] dark:via-[#1a0f12] dark:to-[#0b0b0b]
      "
    >
      {/* highlight trên */}
      <div className="absolute inset-0 [background:radial-gradient(80%_50%_at_50%_0%,rgba(244,63,94,0.12),transparent_60%)]" />
      {/* lưới mờ */}
      <div
        className="
          absolute inset-0 opacity-40
          [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),
                             linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]
          [background-size:28px_28px]
          [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]
          dark:opacity-25
        "
      />
      {/* noise rất nhẹ */}
      <div
        className="
          absolute inset-0 opacity-10 mix-blend-overlay
          [background-image:url('data:image/svg+xml;utf8,\
            <svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22 viewBox=%220 0 48 48%22>\
              <filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%221%22 stitchTiles=%22stitch%22/></filter>\
              <rect width=%2248%22 height=%2248%22 filter=%22url(%23n)%22 opacity=%220.06%22/>\
            </svg>')]
        "
      />
      {/* blobs động */}
      <motion.div
        initial={{ x: -120, y: -80, opacity: 0.7, scale: 1 }}
        animate={{ x: [-120, -60, -120], y: [-80, -40, -80], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute -top-20 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl
                   bg-rose-400/25 dark:bg-rose-500/20"
      />
      <motion.div
        initial={{ x: 120, y: 80, opacity: 0.65, scale: 1 }}
        animate={{ x: [120, 70, 120], y: [80, 40, 80], scale: [1, 1.07, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] rounded-full blur-3xl
                   bg-amber-300/20 dark:bg-rose-400/15"
      />
    </div>
  );
}

export default function ValuesContent() {
  return (
    <>
      {/* Nền tràn toàn trang */}
      <BackgroundFullBleed />

      {/* Chỉ còn container nội dung, không còn khung nền có padding lớn */}
      <section className="relative z-0 max-w-5xl mx-auto space-y-16 px-4 md:px-6 py-16">
        {/* ================== PHẦN 1 ================== */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-left">
          <h1 className="text-4xl font-extrabold text-rose-700 dark:text-rose-400 mb-2">
            1. Đối với cách mạng Việt Nam
          </h1>
          <div className="w-20 h-1 bg-rose-500 rounded-full" />
        </motion.div>

        {/* 1a */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          <Card className="border border-rose-200/50 bg-white/70 dark:bg-neutral-900/60 backdrop-blur
                           shadow-lg hover:shadow-rose-300/40 transition-all hover:-translate-y-0.5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-rose-600 text-white">a</Badge>
                <CardTitle className="text-xl text-rose-700 dark:text-rose-300">
                  Tư tưởng Hồ Chí Minh đưa cách mạng giải phóng dân tộc đến thắng lợi
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700 dark:text-gray-200 leading-relaxed">
              <p>
                Chủ tịch Hồ Chí Minh – “ngọn cờ” tư tưởng & lãnh đạo. Người đã dẫn dắt cách mạng Việt Nam
                giành nhiều thắng lợi lịch sử; hiện nay tiếp tục soi đường cho mục tiêu “dân giàu, nước mạnh,
                dân chủ, công bằng, văn minh”.
              </p>
              <p>
                Trong bối cảnh thế giới phức tạp, tư tưởng của Người giúp nhận thức đúng về bảo vệ độc lập dân tộc,
                phát triển xã hội, bảo đảm quyền con người, và con đường độc lập dân tộc gắn với CNXH vì con người.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tổng khởi nghĩa Tháng Tám 1945 – quần chúng nổi dậy giành chính quyền.</li>
                <li>2/9/1945, Quảng trường Ba Đình – Hồ Chí Minh đọc Tuyên ngôn Độc lập.</li>
                <li>30/4/1975, Dinh Độc Lập – xe tăng giải phóng tiến vào, thống nhất đất nước.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* 1b */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          <Card className="border border-rose-200/50 bg-white/70 dark:bg-neutral-900/60 backdrop-blur
                           shadow-lg hover:shadow-rose-300/40 transition-all hover:-translate-y-0.5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-rose-600 text-white">b</Badge>
                <CardTitle className="text-xl text-rose-700 dark:text-rose-300">
                  Tư tưởng Hồ Chí Minh là nền tảng tư tưởng và kim chỉ nam
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700 dark:text-gray-200 leading-relaxed">
              <p>Hệ thống quan điểm toàn diện (đường lối, chiến lược, sách lược, phương pháp).</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hồ Chí Minh làm việc, họp bàn cùng đồng chí – biểu trưng vai trò sáng lập, lãnh đạo.</li>
                <li>Định hướng: “tư sản dân quyền và thổ địa cách mạng để đi tới xã hội cộng sản”.</li>
                <li>Cờ Đảng song hành cùng cờ Tổ quốc – ẩn dụ kim chỉ nam tư tưởng.</li>
                <li>“Ngày hội Đại đoàn kết toàn dân tộc” – hiện thân khối đoàn kết.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* ================== PHẦN 2 ================== */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="text-left">
          <h1 className="text-4xl font-extrabold text-rose-700 dark:text-rose-400 mb-2">
            2. Đối với sự phát triển tiến bộ của nhân loại
          </h1>
          <div className="w-20 h-1 bg-rose-500 rounded-full" />
        </motion.div>

        {/* 2a */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          <Card className="border border-rose-200/50 bg-white/70 dark:bg-neutral-900/60 backdrop-blur
                           shadow-lg hover:shadow-rose-300/40 transition-all hover:-translate-y-0.5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-rose-600 text-white">a</Badge>
                <CardTitle className="text-xl text-rose-700 dark:text-rose-300">
                  Góp phần mở ra con đường giải phóng dân tộc gắn với tiến bộ xã hội
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700 dark:text-gray-200 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Bìa tác phẩm <em>“Đường Kách Mệnh” (1927)</em> – hệ thống hóa tư tưởng giải phóng dân tộc.
                </li>
                <li>Hình ảnh cờ sao vàng, biển người – biểu trưng khí thế cách mạng.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* 2b */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
          <Card className="border border-rose-200/50 bg-white/70 dark:bg-neutral-900/60 backdrop-blur
                           shadow-lg hover:shadow-rose-300/40 transition-all hover:-translate-y-0.5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-rose-600 text-white">b</Badge>
                <CardTitle className="text-xl text-rose-700 dark:text-rose-300">
                  Góp phần vào đấu tranh vì độc lập, hòa bình, hợp tác và phát triển
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700 dark:text-gray-200 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1">
                <li>Mao Trạch Đông đón Hồ Chí Minh tại Bắc Kinh, 1955.</li>
                <li>Hội nghị Bandung 1955 — cột mốc liên kết các dân tộc chống thực dân.</li>
                <li>Diễn đàn Bandung — biểu tượng bình đẳng, “làm bạn với tất cả các nước dân chủ”.</li>
                <li>Hồ Chí Minh, Võ Nguyên Giáp và Đội Hươu OSS (Mỹ) — minh chứng hợp tác quốc tế.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </>
  );
}
