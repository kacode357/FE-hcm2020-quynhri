"use client";

import { useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import EventCard from "./event-card";
import { EVENTS } from "@/data/events";
import { useUI } from "@/lib/store";

export default function TimelineTrack() {
  const { selectedEventId, setSelectedEvent } = useUI();
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div ref={containerRef} className="flex gap-4 p-4">
            {EVENTS.map((e) => (
              <EventCard
                key={e.id}
                item={e}
                active={selectedEventId === e.id}
                onSelect={setSelectedEvent}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden grid gap-4">
        {EVENTS.map((e) => (
          <EventCard
            key={e.id}
            item={e}
            active={selectedEventId === e.id}
            onSelect={setSelectedEvent}
          />
        ))}
      </div>
    </div>
  );
}
