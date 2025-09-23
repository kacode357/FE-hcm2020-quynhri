// components/stories/stories-client.tsx
"use client";

import { SCENES } from "@/data/scenes";
import { motion } from "framer-motion";

export default function StoriesClient() {
  return (
    <>
      {SCENES.map((scene) => (
        <section
          key={scene.id}
          className="grid md:grid-cols-2 gap-6 items-center"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{scene.title}</h2>
            {scene.steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-sm text-foreground/80"
              >
                {s.type === "text" && <p>{s.content}</p>}
                {s.type === "image" && (
                  <div className="aspect-[3/2] bg-red-100/40 dark:bg-red-900/30 rounded-md" />
                )}
                {s.type === "mapFlyTo" && (
                  <div className="text-xs opacity-70">
                    (Bản đồ sẽ flyTo {s.coords?.join(", ")})
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="aspect-[16/10] bg-red-50 dark:bg-red-900/20 rounded-md" />
        </section>
      ))}
    </>
  );
}
