// app/stories/page.tsx
import { cls } from "@/lib/styles";
import StoriesClient from "@/components/stories/stories-client";

export const metadata = { title: "Scroll-telling" };

export default function StoriesPage() {
  return (
    <main className={`${cls.container} py-10 space-y-16`}>
      <header>
        <h1 className="text-3xl font-bold">Storytelling đa phương tiện</h1>
        <p className="text-foreground/80">
          Cuộn để khám phá các cảnh: 1911 – 1920 – 1945.
        </p>
      </header>
      <StoriesClient />
    </main>
  );
}
