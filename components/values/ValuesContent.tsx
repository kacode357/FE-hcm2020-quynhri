// components/values/ValuesContent.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ValuesContent() {
  return (
    <motion.section
      className="space-y-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ================== PHẦN 1 ================== */}
      <div className="text-left">
        <h1 className="text-3xl font-bold mb-3 text-red-600">
          1. Đối với cách mạng Việt Nam
        </h1>
      </div>

      {/* 1a */}
      <Card className="border-red-200 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">a</Badge>
            <CardTitle className="text-xl text-red-600">
              Tư tưởng Hồ Chí Minh đưa cách mạng giải phóng dân tộc đến thắng lợi
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-foreground/80">
          <p>
            Chủ tịch Hồ Chí Minh – “ngọn cờ” tư tưởng & lãnh đạo. Người đã dẫn
            dắt cách mạng Việt Nam giành nhiều thắng lợi lịch sử; hiện nay tiếp
            tục soi đường cho mục tiêu “dân giàu, nước mạnh, dân chủ, công
            bằng, văn minh”.
          </p>
          <p>
            Trong bối cảnh thế giới phức tạp, tư tưởng của Người giúp nhận thức
            đúng về bảo vệ độc lập dân tộc, phát triển xã hội, bảo đảm quyền con
            người, và con đường độc lập dân tộc gắn với CNXH vì con người.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Tổng khởi nghĩa Tháng Tám 1945 – quần chúng nổi dậy giành chính
              quyền.
            </li>
            <li>
              2/9/1945, Quảng trường Ba Đình – Hồ Chí Minh đọc Tuyên ngôn Độc
              lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.
            </li>
            <li>
              30/4/1975, Dinh Độc Lập – xe tăng giải phóng tiến vào, thống nhất
              đất nước, mở toàn cục xây dựng CNXH.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 1b */}
      <Card className="border-red-200 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">b</Badge>
            <CardTitle className="text-xl text-red-600">
              Tư tưởng Hồ Chí Minh là nền tảng tư tưởng và kim chỉ nam
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-foreground/80">
          <p>
            Hệ thống quan điểm toàn diện (đường lối, chiến lược, sách lược,
            phương pháp).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Hồ Chí Minh làm việc, họp bàn cùng đồng chí – biểu trưng vai trò
              sáng lập, lãnh đạo và hoạch định đường lối.
            </li>
            <li>
              Định hướng phát triển dân tộc: chiến lược “tư sản dân quyền và thổ
              địa cách mạng để đi tới xã hội cộng sản”; mục tiêu Việt Nam hòa
              bình, thống nhất, độc lập, dân chủ, giàu mạnh.
            </li>
            <li>
              Cờ Đảng song hành cùng cờ Tổ quốc – ẩn dụ kim chỉ nam tư tưởng.
            </li>
            <li>
              “Ngày hội Đại đoàn kết toàn dân tộc” – hiện thân khối đại đoàn kết
              trong xây dựng & bảo vệ Tổ quốc.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* ================== PHẦN 2 ================== */}
      <div className="text-left">
        <h1 className="text-3xl font-bold mb-3 text-red-600">
          2. Đối với sự phát triển tiến bộ của nhân loại
        </h1>
      </div>

      {/* 2a */}
      <Card className="border-red-200 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">a</Badge>
            <CardTitle className="text-xl text-red-600">
              Góp phần mở ra con đường giải phóng dân tộc gắn với tiến bộ xã hội
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-foreground/80">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Bìa tác phẩm <em>“Đường Kách Mệnh” (1927)</em> – hệ thống hóa
              quan điểm về giải phóng dân tộc gắn với giải phóng giai cấp và con
              người.
            </li>
            <li>
              Hình ảnh cờ sao vàng, biển người – biểu trưng khí thế cách mạng,
              đường lối và phương pháp giải phóng dân tộc.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 2b */}
      <Card className="border-red-200 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white">b</Badge>
            <CardTitle className="text-xl text-red-600">
              Góp phần vào đấu tranh vì độc lập, hòa bình, hợp tác và phát triển
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-foreground/80">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Mao Trạch Đông đón Hồ Chí Minh thăm hữu nghị Trung Quốc, Bắc Kinh
              25/6/1955.
            </li>
            <li>
              Hội nghị Bandung 1955 — cột mốc liên kết các dân tộc chống thực
              dân, vì hòa bình và phát triển.
            </li>
            <li>
              Diễn đàn Bandung với hàng chục quốc kỳ — biểu tượng bình đẳng,
              cùng có lợi, “làm bạn với tất cả các nước dân chủ”.
            </li>
            <li>
              Hồ Chí Minh, Võ Nguyên Giáp và Đội Hươu OSS (Mỹ) — minh chứng hợp
              tác quốc tế trong kháng chiến.
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  );
}
