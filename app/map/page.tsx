// app/map/page.tsx
import dynamic from "next/dynamic";
import MapView from "@/components/map/map-view";
import { cls } from "@/lib/styles";


export const metadata = { title: "Bản đồ hành trình" };


export default function MapPage() {
return (
<main className={`${cls.container} py-10`}>
<h1 className="text-3xl font-bold mb-4">Bản đồ hành trình</h1>
<p className="text-foreground/80 mb-4">
Chọn địa điểm để xem sự kiện liên quan, ảnh/clip tư liệu và làm quiz nhanh.
</p>
<MapView />
</main>
);
}