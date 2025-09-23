"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EventItem } from "@/lib/types";

export default function EventCard({
  item, active, onSelect,
}: { item: EventItem; active?: boolean; onSelect?: (id: string) => void }) {
  return (
    <button
      onClick={() => onSelect?.(item.id)}
      aria-pressed={!!active}
      className="text-left"
    >
      <Card
        className={cn(
          "min-w-[280px] max-w-[320px] cursor-pointer border-red-200 hover:border-red-400 transition-colors",
          active && "border-red-600 shadow"
        )}
        id={item.id}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
              {item.year}
            </Badge>
            <CardTitle className="text-base">{item.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/80">{item.summary}</p>
        </CardContent>
      </Card>
    </button>
  );
}
