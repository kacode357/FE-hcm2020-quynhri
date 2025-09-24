// components/values/ValuesContent.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ValuesContent() {
  return (
    <motion.section
      className="space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3 text-red-600">
          Đối với sự phát triển tiến bộ của nhân loại
        </h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Tư tưởng Hồ Chí Minh không chỉ soi đường cho cách mạng Việt Nam mà
          còn góp phần quan trọng vào phong trào giải phóng dân tộc và sự tiến
          bộ chung của nhân loại.
        </p>
      </div>

      {/* Section A */}
      <Card className="border-red-200 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">a</Badge>
            <CardTitle className="text-xl text-red-600">
              Góp phần mở ra con đường giải phóng dân tộc gắn với tiến bộ xã hội
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            Tư tưởng của Người đã cung cấp một hệ thống luận điểm và nền tảng
            tư tưởng quý giá.
          </p>
          <p className="font-medium">Biểu trưng:</p>
          <ul className="list-disc pl-5 space-y-1 text-foreground/80">
            <li>
              Bìa tác phẩm <em>“Đường Kách Mệnh” (1927)</em> – văn bản then chốt
              hệ thống hóa quan điểm về giải phóng dân tộc gắn với giải phóng
              giai cấp và con người.
            </li>
            <li>
              Hình ảnh cờ sao vàng, biển người – biểu trưng cho khí thế cách
              mạng, đường lối và phương pháp cách mạng giải phóng dân tộc.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Section B */}
      <Card className="border-red-200 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">b</Badge>
            <CardTitle className="text-xl text-red-600">
              Góp phần vào đấu tranh vì hòa bình, hợp tác và phát triển
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            Tầm vóc quốc tế của Hồ Chí Minh được thể hiện qua mối quan hệ với
            các nhà lãnh đạo thế giới và việc đóng góp vào các diễn đàn quốc tế.
          </p>
          <p className="font-medium">Minh chứng:</p>
          <ul className="list-disc pl-5 space-y-1 text-foreground/80">
            <li>
              Chủ tịch Trung Quốc Mao Trạch Đông đón Chủ tịch Hồ Chí Minh thăm
              hữu nghị Trung Quốc, ngày 25/6/1955.
            </li>
            <li>
              Toàn cảnh một phiên họp Hội nghị Bandung 1955 — cột mốc liên kết
              các dân tộc chống thực dân, vì hòa bình và phát triển.
            </li>
            <li>
              Diễn đàn Bandung với hàng chục quốc kỳ — biểu tượng cho nguyên tắc
              bình đẳng, cùng có lợi, và phương châm “làm bạn với tất cả các nước
              dân chủ”.
            </li>
            <li>
              Hình ảnh Bác Hồ, Võ Nguyên Giáp và Đội Hươu OSS (Mỹ) — minh chứng
              hợp tác quốc tế trong kháng chiến.
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  );
}
