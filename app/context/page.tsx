// app/context/page.tsx
"use client";

import { motion } from "framer-motion";
import { Book, Globe, Lightbulb } from "lucide-react";
import { cls } from "@/lib/styles";

export default function ContextPage() {
  const sections = [
    {
      title: "Môi trường thực tiễn",
      icon: Globe,
      content: [
        "Việt Nam đầu thế kỷ XX: thuộc địa nửa phong kiến, nhân dân lầm than, phong trào yêu nước (Cần Vương, Đông Du, Duy Tân…) lần lượt thất bại.",
        "Thế giới: Chủ nghĩa tư bản chuyển sang đế quốc; phong trào công nhân, phong trào giải phóng dân tộc, đặc biệt là Cách mạng Tháng Mười Nga 1917 làm bùng nổ làn sóng cách mạng vô sản.",
      ],
    },
    {
      title: "Môi trường lý luận",
      icon: Book,
      content: [
        "Nguyễn Ái Quốc tiếp xúc với các tư tưởng dân chủ tư sản (Mỹ, Pháp), rồi tìm thấy ở chủ nghĩa Mác – Lênin lời giải khoa học cho con đường giải phóng dân tộc.",
        "Tác phẩm *Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và thuộc địa* (1920) của Lênin có ảnh hưởng quyết định.",
      ],
    },
    {
      title: "Sự sáng tạo của Nguyễn Ái Quốc so với tiền bối",
      icon: Lightbulb,
      content: [
        "Phan Bội Châu: dựa vào Nhật để cứu nước → thất bại vì ảo tưởng ngoại bang.",
        "Phan Chu Trinh: chủ trương cải cách, dựa vào Pháp → không khả thi vì thực dân không trao độc lập.",
        "Nguyễn Ái Quốc – Hồ Chí Minh: Đi ra thế giới khảo nghiệm thực tiễn nhiều nước.",
        "Lựa chọn con đường cách mạng vô sản, gắn độc lập dân tộc với CNXH.",
        "Xác định lực lượng cách mạng là toàn dân, nòng cốt công – nông; Đảng Cộng sản là lực lượng lãnh đạo.",
      ],
    },
  ];

  return (
    <main className="relative py-24 bg-white dark:bg-neutral-900">
      <div className={`${cls.container} relative z-10`}>
        {/* Câu hỏi CQ */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-bold text-center text-red-700 mb-12 leading-relaxed"
        >
          CÂU HỎI CQ: MÔI TRƯỜNG THỰC TIỄN NÀO VÀ MÔI TRƯỜNG LÝ LUẬN NÀO ĐÃ LÀM
          XUẤT HIỆN NGUYỄN ÁI QUỐC – HỒ CHÍ MINH? SỰ SÁNG TẠO CỦA NGUYỄN ÁI
          QUỐC TRONG HÀNH TRÌNH TÌM ĐƯỜNG CỨU NƯỚC ĐẦU THẾ KỶ XX SO VỚI NHỮNG
          BẬC TIỀN BỐI ĐI TRƯỚC NHƯ PHAN BỘI CHÂU, PHAN CHU TRINH LÀ GÌ?
        </motion.h1>

        {/* Các box nội dung */}
        <div className="grid md:grid-cols-3 gap-10">
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-xl shadow-lg border-t-8 border-red-500 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <sec.icon className="w-8 h-8 text-red-600 mr-3 p-1 border border-red-200 rounded-full" />
                <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
                  {sec.title}
                </h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                {sec.content.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
