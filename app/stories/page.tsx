// app/stories/page.tsx
import { cls } from "@/lib/styles";
import StoriesClient from "@/components/stories/stories-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storytelling đa phương tiện",
  description:
    "Chuỗi giai đoạn kể chuyện với 2 ảnh + 1 audio mỗi đoạn, đổi ảnh ở 50% và tự chuyển tiếp.",
};

export default function StoriesPage() {
  return (
    <main className={`${cls.container} py-10 space-y-12`}>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Storytelling đa phương tiện</h1>
        <p className="text-foreground/80">
          Bấm <span className="font-medium">Bắt đầu</span> trong hộp thoại để nghe chuỗi các giai đoạn. Mỗi giai đoạn có
          <span className="font-medium"> 2 ảnh</span> và <span className="font-medium">1 bản ghi âm</span>; ảnh thứ hai sẽ xuất hiện khi bản ghi phát tới
          <span className="font-medium"> 50%</span>.
        </p>
      </header>

      <StoriesClient />
    </main>
  );
}
