"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

type Vec3 = [number, number, number];

type ModelItem = {
  id: number;
  name: string;
  path: string;
  rotation?: Vec3;
  description?: string; // có mới bật popup
};

const models: ModelItem[] = [
  {
    id: 1,
    name: "Áo lụa nâu của Chủ tịch Hồ Chí Minh",
    path: "/model_3d/ao_lua_nau_cua_chu_tich_ho_chi_minh_thuong_dung.glb",
    rotation: [0, Math.PI / 2, 0], // xoay 90 độ quanh Y
    description: `Trong suốt cuộc đời, Bác luôn chọn lối sống giản dị, gần gũi với nhân dân. Bên cạnh bộ kaki bạc màu thường thấy, Bác còn hay mặc áo bà ba lụa nâu – một loại trang phục quen thuộc của người nông dân Nam Bộ.

Ý nghĩa chiếc áo lụa nâu của Bác Hồ:

Biểu tượng của sự giản dị: Bác không chọn quần áo sang trọng mà chọn trang phục dân dã, gần gũi với nhân dân lao động.

Sự hòa mình với nhân dân: Áo bà ba nâu là trang phục của người nông dân, thể hiện tinh thần “ở cùng dân, vì dân”.

Tấm gương về cần kiệm: Bác luôn mặc những bộ quần áo giản đơn, nhiều khi vá lại để dùng tiếp, thể hiện phong cách sống thanh bạch, tiết kiệm.

Biểu tượng văn hóa: Chiếc áo nâu giản dị đã trở thành một phần trong hình ảnh Hồ Chí Minh – vị lãnh tụ vĩ đại nhưng rất gần gũi.`,
  },
  {
    id: 2,
    name: "Bản sao 3 sắc lệnh",
    path: "/model_3d/ban_sao_ttltqg_3_sac_lenh_thu_gui_hoi_nghi.glb",
    rotation: [-Math.PI / 2, -Math.PI / 2, Math.PI / 2],
    description: `Ngay sau Cách mạng Tháng Tám năm 1945, nước Việt Nam Dân chủ Cộng hòa vừa ra đời đã đứng trước vô vàn khó khăn: thù trong giặc ngoài, nạn đói, nạn dốt, bộ máy nhà nước còn sơ khai. Để củng cố chính quyền cách mạng non trẻ, Chủ tịch Hồ Chí Minh thay mặt Chính phủ đã ký nhiều sắc lệnh quan trọng. Trong đó, có ba sắc lệnh tiêu biểu, thường được gọi là “bản sao 3 sắc lệnh”, gắn với việc xây dựng nền móng cho nhà nước cách mạng và thể hiện rõ tư tưởng Hồ Chí Minh về dân chủ và pháp quyền.

Nội dung chính của 3 sắc lệnh:
Sắc lệnh số 14 (ngày 8/9/1945): Quy định việc tổ chức Tổng tuyển cử để bầu ra Quốc hội khóa I. Đây là cơ sở pháp lý để nhân dân trực tiếp tham gia quyết định vận mệnh đất nước.
Sắc lệnh số 34 (ngày 20/9/1945): Thành lập Ủy ban dự thảo Hiến pháp. Mục đích: soạn thảo bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa, xây dựng nhà nước hợp hiến, hợp pháp.
Sắc lệnh số 22 (ngày 18/9/1945): Về việc thành lập Tòa án quân sự để trừng trị những kẻ phản cách mạng, phá hoại chính quyền mới. Thể hiện sự kiên quyết bảo vệ thành quả cách mạng.`,
  },
  {
    id: 3,
    name: "Bộ quần áo kaki của Chủ tịch Hồ Chí Minh",
    path: "/model_3d/bo_quan_ao_kaki_cua_chu_tich_ho_chi_minh.glb",
    rotation: [0, Math.PI / 2, 0],
    description: `Bộ quần áo kaki với chiếc áo được may bốn túi, đã bạc màu, sờn cổ 
Phó trưởng phòng Trưng bày Bảo tàng Lịch sử Quốc gia Trần Thu Hà cho biết, Bảo tàng tiếp nhận bộ quần áo kaki của Chủ tịch Hồ Chí Minh từ năm 1958. Khi đó, bộ quần áo kaki màu kem, có 4 túi, ve áo hơi tù, cổ áo có chỗ bị sờn vì gắn bó với Bác trong suốt thời gian dài.`,
  },
  {
    id: 4,
    name: "Tượng Chủ tịch Hồ Chí Minh",
    path: "/model_3d/president_ho_chi_minh_statue.glb",
    rotation: [0, 0, 0],
    // không description => không mở popup
  },
  {
    id: 5,
    name: "Bộ sưu tập Bác Hồ",
    path: "/model_3d/bst_bac_ho.glb",
    rotation: [0, 0, 0],
    // chưa có description
  },
  {
    id: 6,
    name: "Nhà máy Duyên Hải - Bác Hồ trên ghế máy",
    path: "/model_3d/nha_may_duyen_hai_bac_ho_tren_ghe_may.glb",
    rotation: [0, Math.PI, 0],
    description: `Hình ảnh Bác Hồ trên ghế mây ở Nhà máy Nhiệt điện Duyên Hải (Hải Phòng, 1957) đã trở thành một đề tài quen thuộc trong hội họa, nhiếp ảnh và cả văn học.

Trong nhiếp ảnh: bức ảnh Bác ngồi ghế mây, mặc áo nâu, nụ cười hiền hậu, xung quanh là công nhân vây quần, được lưu giữ như một báu vật lịch sử.
Trong hội họa: nhiều họa sĩ đã tái hiện lại khung cảnh này bằng sơn dầu, lụa, ký họa… nhằm khắc sâu thông điệp về một lãnh tụ giản dị, gần gũi, chan hòa cùng nhân dân.
Về giá trị: hình ảnh không chỉ ghi lại khoảnh khắc một chuyến thăm mà còn khẳng định tinh thần “lấy dân làm gốc”, quan điểm coi trọng giai cấp công nhân trong sự nghiệp xây dựng chủ nghĩa xã hội.`,
  },
  {
    id: 7,
    name: "Thư của Chủ tịch HCM và tuyên cáo",
    path: "/model_3d/thu_cua_chu_tich_hcm_va_tuyen_cao.glb",
    rotation: [0, 0, 0],
    description: `Sau Cách mạng Tháng Tám 1945, chính quyền non trẻ vừa thành lập, Hồ Chí Minh gửi thư tuyên cáo để kêu gọi toàn dân đoàn kết giữ vững độc lập. Nội dung: Khẳng định nền độc lập: Nước Việt Nam Dân chủ Cộng hòa đã ra đời, toàn dân phải giữ gìn thành quả cách mạng. Kêu gọi đoàn kết toàn dân: Không phân biệt giàu nghèo, tôn giáo, đảng phái, mọi người đều là con dân nước Việt, cần đoàn kết chống thù trong giặc ngoài. Nêu rõ trách nhiệm: Mỗi người dân đều có nghĩa vụ đóng góp (tinh thần, sức lực, vật chất) để xây dựng và bảo vệ Tổ quốc. Trấn an dư luận quốc tế: Thể hiện mong muốn Việt Nam là quốc gia độc lập, yêu chuộng hòa bình, sẵn sàng hợp tác hữu nghị với các nước.`,
  },
];

function ModelViewer({
  path,
  rotation = [0, 0, 0],
}: {
  path: string;
  rotation?: Vec3;
}) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} rotation={rotation} />;
}

export default function ExhibitPage() {
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-8 text-center">Exhibit 3D Models</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {models.map((model) => {
          const card = (
            <div
              className={`flex flex-col items-center justify-center border rounded-xl bg-white shadow p-2 ${
                model.id === 4 ? "col-span-1 md:col-span-3" : ""
              }`}
            >
              <div
                className={`w-full ${
                  model.id === 4 ? "h-96" : "h-64"
                } bg-gray-200 rounded`}
              >
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[3, 3, 3]} intensity={1} />
                  <Suspense fallback={null}>
                    <Bounds fit clip observe margin={1.2}>
                      <ModelViewer
                        path={model.path}
                        rotation={model.rotation as Vec3}
                      />
                    </Bounds>
                  </Suspense>
                  <OrbitControls makeDefault />
                </Canvas>
              </div>
              <p className="mt-2 text-center font-semibold">{model.name}</p>
            </div>
          );

          // Nếu có description -> bấm vào mở popup; nếu không -> chỉ hiển thị thẻ
          return model.description ? (
            <Dialog key={model.id}>
              <DialogTrigger asChild>{card}</DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogTitle>{model.name}</DialogTitle>
                <DialogDescription asChild>
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {model.description}
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          ) : (
            <div key={model.id}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
