"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { EVENTS } from "@/data/events";
import { useUI } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

function PanelBody() {
  const { selectedEventId, setSelectedEvent } = useUI();
  const evt = useMemo(
    () => EVENTS.find((e) => e.id === selectedEventId) ?? EVENTS[0],
    [selectedEventId]
  );

  return (
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
        {evt.media?.map((m, i) =>
          m.type === "image" ? (
            <div key={i} className="relative w-full aspect-[3/2] overflow-hidden rounded-md">
              <Image src={m.src} alt={m.alt ?? "media"} fill className="object-cover" />
            </div>
          ) : null
        )}
        {evt.details?.length ? (
          <ul className="list-disc ml-5 text-sm space-y-1">
            {evt.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        ) : null}
        {evt.quotes?.[0] && (
          <blockquote className="border-l-4 border-red-600 pl-3 italic text-sm">
            “{evt.quotes[0].text}”{evt.quotes[0].source ? ` — ${evt.quotes[0].source}` : ""}
          </blockquote>
        )}
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
  );
}

export default function EventPanel() {
  const { selectedEventId, setSelectedEvent } = useUI();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // Desktop panel
  return (
    <>
      <aside className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-auto p-4 border-l">
        <PanelBody />
      </aside>

      {/* Mobile/Tablet: mở Sheet khi có lựa chọn */}
      {isClient && (
        <Sheet open={!!selectedEventId} onOpenChange={(o) => !o && setSelectedEvent(undefined)}>
          <SheetContent side="bottom" className="lg:hidden h-[85vh] overflow-auto">
            <SheetHeader>
              <SheetTitle className="text-red-700 dark:text-red-300">Chi tiết mốc</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <PanelBody />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
