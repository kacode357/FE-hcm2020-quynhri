// components/map/map-view.tsx
"use client";

import dynamic from "next/dynamic";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { MapRef } from "react-map-gl";

import { PLACES } from "@/data/places";
import { EVENTS } from "@/data/events";
import { STAGES } from "@/data/stages";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// react-map-gl v7 dynamic exports (SSR-safe)
const Map = dynamic(() => import("react-map-gl").then((m) => m.Map), { ssr: false });
const Marker = dynamic(() => import("react-map-gl").then((m) => m.Marker), { ssr: false });
const Source = dynamic(() => import("react-map-gl").then((m) => m.Source), { ssr: false });
const Layer = dynamic(() => import("react-map-gl").then((m) => m.Layer), { ssr: false });
const AttributionControl = dynamic(
  () => import("react-map-gl").then((m) => m.AttributionControl),
  { ssr: false }
);

/* ================= Utils ================= */
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const placeById = (id: string) => PLACES.find((p) => p.id === id)!;

function lineFeature(coords: [number, number][]) {
  return { type: "Feature", geometry: { type: "LineString", coordinates: coords }, properties: {} } as const;
}
function fc(features: any[]) {
  return { type: "FeatureCollection", features } as const;
}

/** Chuyển markdown inline "[label](url)" -> JSX <a> để tránh URL dài tràn khung */
function renderInlineLinks(text: string) {
  const parts: Array<string | { label: string; href: string }> = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push({ label: m[1], href: m[2] });
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="text-red-600 hover:underline break-words"
          >
            {p.label} <span aria-hidden>↗</span>
          </a>
        )
      )}
    </>
  );
}

// CSS nhỏ cho map control + marker glow
const customStyles = `
  .mapboxgl-ctrl-bottom-left { display: none !important; }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0px rgba(239, 68, 68, 0.7); }
    50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
  }
  .animate-pulse-glow { animation: pulse-glow 2s cubic-bezier(0.4,0,0.6,1) infinite; }
`;

/** ---- NHẬN DIỆN LINK DẠNG /map#<id> hoặc #<id> ---- */
const getIdFromMapHref = (href: string): string | null => {
  if (!href) return null;
  if (href.startsWith("#")) return decodeURIComponent(href.slice(1));
  const m = href.match(/\/map#([^?#]+)/);
  return m ? decodeURIComponent(m[1]) : null;
};

export default function MapView() {
  const sp = useSearchParams();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [stageIdx, setStageIdx] = useState<number>(() => {
    const s = Number(sp.get("stage"));
    return Number.isFinite(s) ? clamp(s, 0, STAGES.length - 1) : 0;
  });
  const mapRef = useRef<MapRef | null>(null);

  /* ---------- Stage data ---------- */
  const stage = STAGES[stageIdx];
  const stagePlaceIds = useMemo(() => new Set(stage.placeIds), [stage]);
  const visiblePlaces = useMemo(() => PLACES.filter((p) => stagePlaceIds.has(p.id)), [stagePlaceIds]);

  // Route (đã đi + hiện tại)
  const edgesUpto = useMemo(() => {
    const seen = new Set<string>();
    const out: [string, string][] = [];
    STAGES.slice(0, stageIdx + 1).forEach((s) =>
      s.edges.forEach(([a, b]) => {
        const k = `${a}|${b}`;
        if (!seen.has(k)) {
          seen.add(k);
          out.push([a, b]);
        }
      })
    );
    return out;
  }, [stageIdx]);

  const routeAll = useMemo(
    () => fc(edgesUpto.map(([a, b]) => lineFeature([placeById(a).coords, placeById(b).coords]))),
    [edgesUpto]
  );
  const routeActive = useMemo(
    () => fc(stage.edges.map(([a, b]) => lineFeature([placeById(a).coords, placeById(b).coords]))),
    [stage.edges]
  );

  /* ---------- Modal data ---------- */
  const activePlace = useMemo(() => PLACES.find((p) => p.id === activeId) ?? null, [activeId]);
  const activeEvents = useMemo(() => {
    if (!activePlace) return [];
    const ids = activePlace.events ?? [];
    const raw = EVENTS.filter((e: any) => ids.includes(e.id)).sort((a: any, b: any) => a.year - b.year);
    const filterIds = stage.eventFilter?.[activePlace.id];
    return filterIds?.length ? raw.filter((e: any) => new Set(filterIds).has(e.id)) : raw;
  }, [activePlace, stage]);

  /* ---------- Deep-link & query ---------- */
  useEffect(() => {
    const focus = sp.get("focus");
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const target = decodeURIComponent(focus || hash || "");
    if (target) focusById(target, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  useEffect(() => {
    const s = Number(sp.get("stage"));
    if (Number.isFinite(s)) setStageIdx(clamp(s, 0, STAGES.length - 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  useEffect(() => {
    fitToStage();
    setActiveId(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("stage", String(stageIdx));
      window.history.replaceState({}, "", url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIdx]);

  // phím tắt ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setStageIdx((i) => clamp(i - 1, 0, STAGES.length - 1));
      if (e.key === "ArrowRight") setStageIdx((i) => clamp(i + 1, 0, STAGES.length - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- Map helpers ---------- */
  const flyToPlace = useCallback((placeId: string) => {
    const place = placeById(placeId);
    mapRef.current?.flyTo({ center: place.coords, zoom: 5.7, speed: 1.2, curve: 1.4, essential: true });
  }, []);

  const fitToStage = useCallback(() => {
    if (!mapRef.current) return;
    const pts = stage.placeIds.map((id) => placeById(id).coords);
    if (!pts.length) return;
    if (pts.length === 1) return flyToPlace(stage.placeIds[0]);
    const lngs = pts.map((p) => p[0]);
    const lats = pts.map((p) => p[1]);
    mapRef.current.fitBounds(
      [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ],
      { padding: 120, duration: 1200 }
    );
  }, [stage.placeIds, flyToPlace]);

  const resolvePlaceId = useCallback((id: string | null): string | null => {
    if (!id) return null;
    const direct = PLACES.find((p) => p.id === id);
    if (direct) return direct.id;
    const viaEvent = PLACES.find((p) => (p.events ?? []).includes(id));
    return viaEvent ? viaEvent.id : null;
  }, []);

  /** MỞ popup + flyTo */
  const focusById = useCallback(
    (id: string, pushHash = true) => {
      const pid = resolvePlaceId(id);
      if (!pid) return;
      setActiveId(pid);
      flyToPlace(pid);
      if (pushHash && typeof window !== "undefined") {
        window.history.replaceState({}, "", `#${pid}`);
      }
    },
    [flyToPlace, resolvePlaceId]
  );

  /** KHÔNG mở popup, chỉ flyTo + update hash (phục vụ "Xem trên bản đồ") */
  const goToIdNoPopup = useCallback(
    (id: string) => {
      const pid = resolvePlaceId(id);
      if (!pid) return;
      // đóng popup trước
      setActiveId(null);
      // bay tới vị trí
      flyToPlace(pid);
      // set hash
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", `#${pid}`);
      }
    },
    [flyToPlace, resolvePlaceId]
  );

  const closeModal = useCallback(() => {
    setActiveId(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.hash = "";
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  /* ================= View ================= */
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="relative min-h-[78vh] rounded-md overflow-hidden border">
        {/* Map */}
        <Map
          ref={mapRef}
          initialViewState={{ longitude: 105.8, latitude: 15.9, zoom: 3.8 }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          attributionControl={false}
          style={{ width: "100%", height: "72vh" }}
        >
          {/* Tuyến đã đi */}
          <Source id="route-all" type="geojson" data={routeAll}>
            <Layer
              id="route-all-line"
              type="line"
              layout={{ "line-join": "round", "line-cap": "round" }}
              paint={{
                "line-color": "#ef4444",
                "line-width": 2.5,
                "line-opacity": 0.18,
                "line-blur": 0.8,
              }}
            />
          </Source>

          {/* Tuyến hiện tại */}
          <Source id="route-active" type="geojson" data={routeActive}>
            <Layer
              id="route-active-line"
              type="line"
              layout={{ "line-join": "round", "line-cap": "round" }}
              paint={{
                "line-color": "#dc2626",
                "line-width": 6,
                "line-opacity": 0.98,
                "line-blur": 1.2,
              }}
            />
          </Source>

          {/* Markers */}
          {visiblePlaces.map((p) => (
            <Marker key={p.id} longitude={p.coords[0]} latitude={p.coords[1]} anchor="bottom">
              <div className="relative cursor-pointer" onClick={() => focusById(p.id, true)} title={p.title}>
                <div
                  className={`relative w-8 h-8 rounded-full border-2 shadow transition-transform hover:scale-125 ${
                    activeId === p.id ? "bg-red-600 border-red-800 animate-pulse-glow" : "bg-red-500 border-red-700"
                  }`}
                />
                <span className="absolute -inset-1 rounded-full border border-red-700/40" />
              </div>
            </Marker>
          ))}

          <AttributionControl compact position="top-right" style={{ opacity: 0.7 }} />
        </Map>

        {/* Progress dots */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-3 flex items-center gap-2 bg-background/85 backdrop-blur border rounded-full px-3 py-1 shadow-sm">
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStageIdx(i)}
              className={`pointer-events-auto rounded-full transition-all ${
                i === stageIdx ? "w-3.5 h-3.5 bg-red-600" : "w-2.5 h-2.5 bg-foreground/30 hover:bg-foreground/60"
              }`}
              title={s.title}
              aria-label={s.title}
            />
          ))}
        </div>

        {/* Dock bottom */}
        <div className="absolute inset-x-3 bottom-3">
          <div className="bg-background/95 backdrop-blur border rounded-xl p-3 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStageIdx((i) => clamp(i - 1, 0, STAGES.length - 1))}
                  disabled={stageIdx === 0}
                >
                  ← Trước
                </Button>
                <Button
                  size="sm"
                  onClick={() => setStageIdx((i) => clamp(i + 1, 0, STAGES.length - 1))}
                  disabled={stageIdx === STAGES.length - 1}
                >
                  Sau →
                </Button>
              </div>
              <div className="text-xs text-foreground/60 hidden md:block">Gợi ý: dùng phím ← → để chuyển giai đoạn</div>
            </div>

            <div className="mt-3">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 pr-2">
                  {visiblePlaces.map((p) => (
                    <Button
                      key={p.id}
                      size="sm"
                      onClick={() => focusById(p.id, true)}
                      className={`rounded-xl px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        activeId === p.id
                          ? "bg-red-600 text-white border border-red-700 hover:bg-red-700"
                          : "bg-red-100 text-red-600 border border-red-200 hover:bg-red-200"
                      }`}
                    >
                      {p.title} {p.years ? `(${p.years})` : ""}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Popup */}
        <Dialog open={!!activePlace} onOpenChange={(open) => (open ? null : closeModal())}>
          {/* Auto co/giãn theo nội dung; dài thì tối đa 92vh và phần thân tự cuộn */}
          <DialogContent className="w-[min(92vw,56rem)] max-w-none max-h-[92vh] p-0 overflow-hidden">
            {activePlace && (
              <>
                <DialogHeader className="px-6 pt-6 break-words [overflow-wrap:anywhere]">
                  <DialogTitle className="text-2xl text-balance break-words">{activePlace.title}</DialogTitle>
                  <DialogDescription className="break-words [overflow-wrap:anywhere]">
                    <span className="text-sm text-foreground/70">
                      {activePlace.years ? `${activePlace.years} · ` : ""}
                      {activePlace.blurb}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                {/* Thân: auto-height; chỉ cuộn khi vượt 70vh */}
                <div className="px-6 pb-6 max-h-[70vh] overflow-y-auto overflow-x-hidden">
                  <div className="space-y-5 break-words [overflow-wrap:anywhere]">
                    {activeEvents.map((e: any) => (
                      <div key={e.id} className="space-y-3 border-b pb-5 last:border-none">
                        {/* Header sự kiện */}
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-700 text-white">{e.year}</Badge>
                          <p className="font-medium break-words [overflow-wrap:anywhere]">{e.title}</p>
                        </div>

                        {/* Tóm tắt */}
                        {e.summary ? (
                          <p className="text-sm text-foreground/80 break-words [overflow-wrap:anywhere]">{e.summary}</p>
                        ) : null}

                        {/* MEDIA */}
                        {e.media?.length ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {e.media.map((m: any, i: number) =>
                              m?.type === "image" ? (
                                <img
                                  key={i}
                                  src={m.src}
                                  alt={m.alt || e.title}
                                  className="w-full h-40 object-cover rounded-lg border"
                                  loading="lazy"
                                />
                              ) : null
                            )}
                          </div>
                        ) : null}

                        {/* LINKS */}
                        {e.links?.length ? (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {e.links.map((l: any, i: number) => {
                              const mapId = getIdFromMapHref(l.href);
                              if (mapId) {
                                // NỘI BỘ: đóng popup + flyTo, KHÔNG mở tab mới
                                return (
                                  <button
                                    key={i}
                                    onClick={() => {
                                      closeModal();
                                      goToIdNoPopup(mapId);
                                    }}
                                    className="text-sm text-red-600 hover:underline break-words"
                                  >
                                    {l.label} <span aria-hidden>↗</span>
                                  </button>
                                );
                              }
                              // BÊN NGOÀI: mở tab mới như cũ
                              return (
                                <a
                                  key={i}
                                  href={l.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm text-red-600 hover:underline break-words"
                                >
                                  {l.label} <span aria-hidden>↗</span>
                                </a>
                              );
                            })}
                          </div>
                        ) : null}

                        {/* DETAILS (có inline links) */}
                        {e.details?.length ? (
                          <ul className="list-disc pl-5 text-sm space-y-1 pt-1">
                            {e.details.map((d: string, i: number) => (
                              <li key={i} className="break-words [overflow-wrap:anywhere]">
                                {renderInlineLinks(d)}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            <DialogClose className="absolute top-4 right-4 text-gray-500 hover:text-gray-900" />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
