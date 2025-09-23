// app/timeline/page.tsx
import TimelineTrack from "@/components/timeline/timeline-track";
import EventDetailsBelow from "@/components/timeline/event-details-below";
import { cls } from "@/lib/styles";

export const metadata = { title: "Timeline – 1890–1945" };

export default function TimelinePage() {
  return (
    <main className={`${cls.container} py-10`}>
      <section>
        <h1 className="text-3xl font-bold mb-4">Timeline tương tác (1890–1945)</h1>
        <p className="text-foreground/80 mb-4">
          Di chuyển qua các mốc từ Kim Liên (1890), Bến Nhà Rồng (1911), Versailles (1919),
          Đại hội Tours (1920), Quảng Châu (1925–1927), Hương Cảng (1930), Pác Bó (1941) tới Ba Đình (1945).
        </p>

        {/* Dải timeline */}
        <TimelineTrack />

        {/* Chi tiết hiện BÊN DƯỚI */}
        <EventDetailsBelow autoOpenFirst />
      </section>
    </main>
  );
}
