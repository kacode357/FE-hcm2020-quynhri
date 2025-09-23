"use client";

import dynamic from "next/dynamic";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PLACES } from "@/data/places";
import { EVENTS } from "@/data/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { MapRef } from "react-map-gl";

// v7 exports
const Map = dynamic(() => import("react-map-gl").then((m) => m.Map), { ssr: false });
const Marker = dynamic(() => import("react-map-gl").then((m) => m.Marker), { ssr: false });

export default function MapView() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sp = useSearchParams();
  const mapRef = useRef<MapRef | null>(null);

  // Tìm place hiện hành
  const activePlace = useMemo(
    () => PLACES.find((p) => p.id === activeId) ?? null,
    [activeId]
  );

  // Các event thuộc place đó
  const activeEvents = useMemo(() => {
    if (!activePlace) return [];
    const ids = activePlace.events ?? [];
    return EVENTS.filter((e) => ids.includes(e.id));
  }, [activePlace]);

  // Helper: tìm place theo id (place id hoặc event id)
  function resolvePlaceId(id: string | null): string | null {
    if (!id) return null;
    // 1) khớp trực tiếp place id
    const direct = PLACES.find((p) => p.id === id);
    if (direct) return direct.id;
    // 2) thử như event id
    const viaEvent = PLACES.find((p) => (p.events ?? []).includes(id));
    return viaEvent ? viaEvent.id : null;
  }

  // Helper: focus bản đồ + set state + sync hash
  function focusById(id: string, pushHash = true) {
    const pid = resolvePlaceId(id);
    if (!pid) return;
    const place = PLACES.find((p) => p.id === pid)!;
    setActiveId(pid);
    // flyTo
    mapRef.current?.flyTo({
      center: place.coords, // [lng, lat]
      zoom: 6,
      speed: 1.2,
      curve: 1.4,
      essential: true,
    });
    if (pushHash) {
      const newHash = `#${pid}`;
      if (typeof window !== "undefined") {
        // Không reload trang
        window.history.replaceState({}, "", newHash);
      }
    }
  }

  // Đọc deep-link qua hash (#paris / #1911-nha-rong) hoặc query (?focus=paris)
  useEffect(() => {
    const q = sp.get("focus");
    const hashRaw = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const target = decodeURIComponent(q || hashRaw || "");
    if (target) focusById(target, false);

    // Lắng nghe hash-change khi người dùng đổi hash thủ công
    function onHash() {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (h) focusById(h, false);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]); // chạy lại nếu query param đổi

  // Khi click từ UI (marker/sidebar), cũng cập nhật hash & flyTo
  function handlePick(id: string) {
    focusById(id, true);
  }

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-4 min-h-[70vh]">
      <div className="relative rounded-md overflow-hidden border">
        <Map
          ref={mapRef}
          initialViewState={{ longitude: 105.8, latitude: 15.9, zoom: 3.8 }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          style={{ width: "100%", height: "100%" }}
        >
          {PLACES.map((p) => (
            <Marker
              key={p.id}
              longitude={p.coords[0]}
              latitude={p.coords[1]}
              anchor="bottom"
            >
              <button
                className={`w-6 h-6 rounded-full border-2 ${
                  activeId === p.id
                    ? "bg-red-600 border-red-800"
                    : "bg-red-400 border-red-600"
                } transition-transform hover:scale-125`}
                onClick={() => handlePick(p.id)}
                aria-label={p.title}
                title={p.title}
              />
            </Marker>
          ))}
        </Map>
      </div>

      <aside className="space-y-3">
        <Card>
          <CardHeader>
            <CardTitle>Điểm đến</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {PLACES.map((p) => (
              <Button
                key={p.id}
                variant={activeId === p.id ? "default" : "outline"}
                onClick={() => handlePick(p.id)}
              >
                {p.title} {p.years ? `(${p.years})` : ""}
              </Button>
            ))}
          </CardContent>
        </Card>

        {activePlace && (
          <Card>
            <CardHeader>
              <CardTitle>{activePlace.title}</CardTitle>
              <p className="text-sm text-foreground/60">{activePlace.blurb}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeEvents.map((e) => (
                <div key={e.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-700 text-white">{e.year}</Badge>
                    <p className="font-medium text-sm">{e.title}</p>
                  </div>
                  <p className="text-xs text-foreground/80">{e.summary}</p>
                </div>
              ))}
              {activePlace.quizId && (
                <Button asChild size="sm" variant="secondary">
                  <a href={`/quiz?start=${activePlace.quizId}`}>Làm câu hỏi nhanh</a>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </aside>
    </div>
  );
}
