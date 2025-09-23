import { SceneItem } from "@/lib/types";

export const SCENES: SceneItem[] = [
  {
    id: "scene-1911",
    title: "Hải trình 1911",
    pinEventId: "1911-nha-rong",
    steps: [
      { type: "image", src: "/media/ben-nha-rong.jpg" },
      { type: "text", content: "Ngày 5/6/1911, Bác rời Bến Nhà Rồng, mở đầu hành trình tìm đường cứu nước." },
      { type: "mapFlyTo", coords: [106.705, 10.766], zoom: 11 },
    ],
  },
  {
    id: "scene-1920",
    title: "Bước ngoặt 1920",
    pinEventId: "1920-lenin-tours",
    steps: [
      { type: "image", src: "/media/tours-1920.jpg" },
      { type: "text", content: "Đọc Luận cương Lênin; dự Đại hội Tours, chuyển từ chủ nghĩa yêu nước sang lập trường Mác–Lênin." },
      { type: "mapFlyTo", coords: [0.6848, 47.3941], zoom: 9 },
    ],
  },
  {
    id: "scene-1945",
    title: "Mùa Thu Độc Lập",
    pinEventId: "1945-doc-lap",
    steps: [
      { type: "image", src: "/media/ba-dinh.jpg" },
      { type: "text", content: "Tổng khởi nghĩa thành công; ngày 2/9/1945 đọc Tuyên ngôn Độc lập." },
      { type: "mapFlyTo", coords: [105.837, 21.034], zoom: 11 },
    ],
  },
];