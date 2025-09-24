"use client";

import dynamic from "next/dynamic";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PLACES } from "@/data/places";
import { EVENTS } from "@/data/events";
import { STAGES } from "@/data/stages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MapRef } from "react-map-gl";

// v7 exports
const Map = dynamic(() => import("react-map-gl").then((m) => m.Map), { ssr: false });
const Marker = dynamic(() => import("react-map-gl").then((m) => m.Marker), { ssr: false });
const Source = dynamic(() => import("react-map-gl").then((m) => m.Source), { ssr: false });
const Layer = dynamic(() => import("react-map-gl").then((m) => m.Layer), { ssr: false });

/* ================== Utils ================== */
const placeById = (id: string) => PLACES.find((p) => p.id === id)!;

/** GeoJSON helpers */
function lineFeature(coords: [number, number][]) {
  return {
    type: "Feature",
    geometry: { type: "LineString", coordinates: coords },
    properties: {},
  } as const;
}
function fc(features: any[]) {
  return { type: "FeatureCollection", features } as const;
}
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function MapView() {
  const sp = useSearchParams();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [stageIdx, setStageIdx] = useState<number>(() => {
    const s = Number(sp.get("stage"));
    return Number.isFinite(s) ? clamp(s, 0, STAGES.length - 1) : 0;
  });

  const mapRef = useRef<MapRef | null>(null);

  /* ---------- Derive stage data ---------- */
  const stage = STAGES[stageIdx];

  // markers chỉ cho giai đoạn hiện tại
  const stagePlaceIds = useMemo(() => new Set(stage.placeIds), [stage]);
  const visiblePlaces = useMemo(
    () => PLACES.filter((p) => stagePlaceIds.has(p.id)),
    [stagePlaceIds]
  );

  // route: cộng dồn đến hiện tại (mờ) + route của stage hiện tại (đậm) — DEDUPE
  const edgesUpto = useMemo(() => {
    const seen = new Set<string>();
    const unique: [string, string][] = [];
    STAGES.slice(0, stageIdx + 1).forEach((s) => {
      s.edges.forEach(([a, b]) => {
        const key = `${a}|${b}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push([a, b]);
        }
      });
    });
    return unique;
  }, [stageIdx]);

  const currentEdges = stage.edges;

  const routeAll = useMemo(() => {
    const feats = edgesUpto
      .map(([a, b]) => [placeById(a).coords, placeById(b).coords] as [number, number][])
      .map((coords) => lineFeature(coords));
    return fc(feats);
  }, [edgesUpto]);

  const routeActive = useMemo(() => {
    const feats = currentEdges
      .map(([a, b]) => [placeById(a).coords, placeById(b).coords] as [number, number][])
      .map((coords) => lineFeature(coords));
    return fc(feats);
  }, [currentEdges]);

  /* ---------- Events of selected place (modal) ---------- */
  const activePlace = useMemo(
    () => PLACES.find((p) => p.id === activeId) ?? null,
    [activeId]
  );

  const activeEvents = useMemo(() => {
    if (!activePlace) return [];
    const ids = activePlace.events ?? [];
    const raw = EVENTS.filter((e) => ids.includes(e.id)).sort((a, b) => a.year - b.year);

    // Lọc theo giai đoạn nếu có eventFilter
    const filterIds = stage.eventFilter?.[activePlace.id];
    if (filterIds?.length) {
      const set = new Set(filterIds);
      return raw.filter((e) => set.has(e.id));
    }
    return raw;
  }, [activePlace, stage]);

  /* ---------- Deep link: stage & focus ---------- */
  useEffect(() => {
    const focus = sp.get("focus");
    const hashRaw = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const target = decodeURIComponent(focus || hashRaw || "");
    if (target) focusById(target, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  useEffect(() => {
    const s = Number(sp.get("stage"));
    if (Number.isFinite(s)) {
      setStageIdx(clamp(s, 0, STAGES.length - 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  // khi đổi stage: fit view theo các điểm của stage; clear modal; sync URL (?stage=)
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

  /* ---------- Map helpers ---------- */
  function flyToPlace(placeId: string) {
    const place = placeById(placeId);
    mapRef.current?.flyTo({
      center: place.coords,
      zoom: 5.5,
      speed: 1.2,
      curve: 1.4,
      essential: true,
    });
  }

  function fitToStage() {
    if (!mapRef.current) return;
    const pts = stage.placeIds.map((id) => placeById(id).coords);
    if (pts.length === 0) return;
    if (pts.length === 1) {
      flyToPlace(stage.placeIds[0]);
      return;
    }
    const lngs = pts.map((p) => p[0]);
    const lats = pts.map((p) => p[1]);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 80, duration: 1200 }
    );
  }

  function resolvePlaceId(id: string | null): string | null {
    if (!id) return null;
    const direct = PLACES.find((p) => p.id === id);
    if (direct) return direct.id;
    const viaEvent = PLACES.find((p) => (p.events ?? []).includes(id));
    return viaEvent ? viaEvent.id : null;
  }

  function focusById(id: string, pushHash = true) {
    const pid = resolvePlaceId(id);
    if (!pid) return;
    setActiveId(pid);
    flyToPlace(pid);
    if (pushHash && typeof window !== "undefined") {
      window.history.replaceState({}, "", `#${pid}`);
    }
  }

  function handlePick(id: string) {
    focusById(id, true);
  }

  function closeModal() {
    setActiveId(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.hash = "";
      window.history.replaceState({}, "", url.toString());
    }
  }

  /* ---------- Stage controls ---------- */
  function prevStage() {
    setStageIdx((i) => clamp(i - 1, 0, STAGES.length - 1));
  }
  function nextStage() {
    setStageIdx((i) => clamp(i + 1, 0, STAGES.length - 1));
  }

  /* ================== VIEW ================== */
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-4 min-h-[70vh]">
      {/* Header stage controls */}
      <div className="lg:col-span-2 flex items-center justify-between bg-muted/40 border rounded p-3">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={prevStage} disabled={stageIdx === 0}>
            ← Trước
          </Button>
          <Button size="sm" onClick={nextStage} disabled={stageIdx === STAGES.length - 1}>
            Sau →
          </Button>
        </div>
        <div className="text-center">
          <div className="text-base font-semibold">{stage.title}</div>
          <div className="text-xs text-foreground/60">{stage.years}</div>
        </div>
        {/* progress dots (clickable) */}
        <div className="flex items-center gap-1">
          {STAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setStageIdx(i)}
              className={`inline-block rounded-full ${i === stageIdx ? "w-3 h-3 bg-red-600" : "w-2 h-2 bg-foreground/30"}`}
              title={`Giai đoạn ${i + 1}`}
              aria-label={`Giai đoạn ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* MAP */}
      <div className="relative rounded-md overflow-hidden border">
        <Map
          ref={mapRef}
          initialViewState={{ longitude: 105.8, latitude: 15.9, zoom: 3.8 }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          style={{ width: "100%", height: "100%" }}
        >
          {/* ROUTE: completed (mờ) */}
          <Source id="route-all" type="geojson" data={routeAll}>
            <Layer
              id="route-all-line"
              type="line"
              layout={{ "line-join": "round", "line-cap": "round" }}
              paint={{
                "line-color": "#ef4444", // red-500
                "line-width": 3,
                "line-opacity": 0.35,
              }}
            />
          </Source>

          {/* ROUTE: current (đậm) */}
          <Source id="route-active" type="geojson" data={routeActive}>
            <Layer
              id="route-active-line"
              type="line"
              layout={{ "line-join": "round", "line-cap": "round" }}
              paint={{
                "line-color": "#b91c1c", // red-700
                "line-width": 5,
                "line-opacity": 0.95,
              }}
            />
          </Source>

          {/* Markers: chỉ giai đoạn hiện tại */}
          {visiblePlaces.map((p) => (
            <Marker key={p.id} longitude={p.coords[0]} latitude={p.coords[1]} anchor="bottom">
              <button
                className={`w-7 h-7 rounded-full border-2 shadow ${
                  activeId === p.id ? "bg-red-600 border-red-800" : "bg-red-500 border-red-700"
                } transition-transform hover:scale-125`}
                onClick={() => handlePick(p.id)}
                aria-label={p.title}
                title={p.title}
              />
            </Marker>
          ))}
        </Map>
      </div>

      {/* Sidebar: chỉ danh sách điểm của giai đoạn hiện tại */}
      <aside className="space-y-3">
        <Card>
          <CardHeader>
            <CardTitle>Điểm trong giai đoạn</CardTitle>
            <p className="text-sm text-foreground/60">{stage.desc}</p>
          </CardHeader>
          <CardContent className="grid gap-2">
            {visiblePlaces.map((p) => (
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
      </aside>

      {/* Popup giữa màn hình (chi tiết place) */}
      <Dialog open={!!activePlace} onOpenChange={(open) => (open ? null : closeModal())}>
        <DialogContent className="max-w-3xl p-0">
          {activePlace && (
            <>
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-2xl">{activePlace.title}</DialogTitle>
                <DialogDescription>
                  <span className="text-sm text-foreground/70">
                    {activePlace.years ? `${activePlace.years} · ` : ""}
                    {activePlace.blurb}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[70vh] px-6 pb-6">
                <div className="space-y-4">
                  {activeEvents.map((e) => (
                    <div key={e.id} className="space-y-2 border-b pb-4 last:border-none">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-700 text-white">{e.year}</Badge>
                        <p className="font-medium">{e.title}</p>
                      </div>
                      <p className="text-sm text-foreground/80">{e.summary}</p>

                      {e.details?.length ? (
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {e.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      ) : null}

                      {e.media?.length ? (
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          {e.media.map((m, i) => {
                            if (m.type === "image") {
                              return (
                                <a
                                  key={i}
                                  href={m.src}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block rounded overflow-hidden border"
                                  title={m.alt ?? "Xem ảnh"}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={m.src}
                                    alt={m.alt ?? "Tư liệu hình ảnh"}
                                    className="w-full h-32 object-cover"
                                  />
                                </a>
                              );
                            }
                            if (m.type === "video") {
                              return (
                                <div key={i} className="rounded overflow-hidden border">
                                  <video controls poster={m.poster} className="w-full h-32 object-cover" title="Tư liệu video">
                                    <source src={m.src} />
                                  </video>
                                </div>
                              );
                            }
                            // audio
                            return (
                              <div key={i} className="rounded overflow-hidden border p-2">
                                <audio controls className="w-full" title="Tư liệu audio">
                                  <source src={m.src} />
                                </audio>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}

                      {e.links?.length ? (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {e.links.map((l, i) => (
                            <a
                              key={i}
                              href={l.href}
                              target={l.href.startsWith("http") ? "_blank" : undefined}
                              rel="noreferrer"
                              className="text-sm underline underline-offset-2"
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
