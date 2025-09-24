// app/map/page.tsx
import { Suspense } from "react";
import MapView from "@/components/map/map-view";
import { cls } from "@/lib/styles";

export const metadata = { 
  title: "Hành trình tư tưởng Hồ Chí Minh" 
};

export default function MapPage() {
  return (
    <main className={`${cls.container} py-10`}>
      <h1 className="text-3xl font-bold mb-4">
        Hành trình hình thành và phát triển tư tưởng Hồ Chí Minh
      </h1>
      <p className="text-foreground/80 mb-4">
        Khám phá các địa điểm, sự kiện và tư liệu lịch sử gắn liền với quá trình 
        hình thành, phát triển tư tưởng Hồ Chí Minh.
      </p>
      <Suspense fallback={<div className="p-6 border rounded">Đang tải bản đồ…</div>}>
        <MapView />
      </Suspense>
    </main>
  );
}
