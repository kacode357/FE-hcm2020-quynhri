// components/timeline/event-details-below.tsx
"use client";

import Image from "next/image";
import { useMemo, useEffect, useRef } from "react";
import { EVENTS } from "@/data/events";
import { useUI } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventDetailsBelow({ autoOpenFirst = true }: { autoOpenFirst?: boolean }) {
  const { selectedEventId, setSelectedEvent } = useUI();
  const evt = useMemo(
    () => EVENTS.find((e) => e.id === selectedEventId) ?? (autoOpenFirst ? EVENTS[0] : undefined),
    [selectedEventId]
  );

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (evt && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [evt]);

  if (!evt) {
    return (
      <p className="mt-6 text-sm text-foreground/70">
        Hãy chọn một mốc trên timeline để xem chi tiết.
      </p>
    );
  }

  return (
    <div ref={ref} className="mt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-700 text-white">{evt.year}</Badge>
            <CardTitle className="text-lg">{evt.title}</CardTitle>
          </div>
          <p className="text-sm text-foreground/70 mt-2">{evt.summary}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {evt.location && (
            <p className="text-xs">
              Địa điểm: <span className="font-medium">{evt.location.name}</span>
            </p>
          )}

          {/* Media (ảnh) nếu có */}
          {evt.media?.map((m, i) =>
            m.type === "image" ? (
              <div key={i} className="relative w-full aspect-[3/2] overflow-hidden rounded-md">
                <Image src={m.src} alt={m.alt ?? "media"} fill className="object-cover" />
              </div>
            ) : null
          )}

          {/* Các ý chi tiết */}
          {evt.details?.length ? (
            <ul className="list-disc ml-5 text-sm space-y-1">
              {evt.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          ) : null}

          {/* Trích dẫn */}
          {evt.quotes?.[0] && (
            <blockquote className="border-l-4 border-red-600 pl-3 italic text-sm">
              “{evt.quotes[0].text}”
              {evt.quotes[0].source ? ` — ${evt.quotes[0].source}` : ""}
            </blockquote>
          )}

          {/* Link hành động */}
          <div className="flex flex-wrap gap-2">
            {evt.links?.map((l) => (
              <Button key={l.href} variant="outline" size="sm" asChild>
                <a href={l.href}>{l.label}</a>
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(undefined)}>
              Đóng
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
