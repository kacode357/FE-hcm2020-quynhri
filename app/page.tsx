// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Map, ScrollText, Timer, Gamepad2 } from "lucide-react";
import { cls } from "@/lib/styles";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className={cls.hero}>
        <div className={cls.container}>
          <h1 className={cls.heroTitle}>
            Chương II: Cơ sở, quá trình hình thành và phát triển tư tưởng Hồ Chí Minh
          </h1>
          <p className={cls.heroSub}>
            Khám phá hành trình từ quê hương xứ Nghệ đến những bước ngoặt Paris – Liên Xô – Quảng Châu,
            dẫn tới Tuyên ngôn Độc lập 1945. Trải nghiệm dưới dạng timeline, bản đồ tương tác và mini game.
          </p>
          <div className={cls.heroCtas}>
            <Button className={cls.cta} asChild>
              <Link href="/timeline">
                Bắt đầu với Timeline <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/map">
                Xem bản đồ <Map className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/stories">
                Scroll-telling <ScrollText className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Lưu ý: có thể thêm thanh reading progress dọc top sau */}
        </div>
      </section>

      {/* Tính năng chính */}
      <section>
        <div className={`${cls.container} ${cls.grid}`}>
          <Card>
            <CardHeader>
              <CardTitle className={cls.cardTitle}>Timeline tương tác (1890–1945)</CardTitle>
            </CardHeader>
            <CardContent className={cls.cardDesc}>
              Cuộn ngang/dọc qua các mốc: 1911, 1919, 1920, 1930, 1945… Hover/click để xem ảnh, trích dẫn,
              video tư liệu. Hiệu ứng nhỏ: tàu thủy, dấu chân, pháo hoa 1945.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={cls.cardTitle}>Bản đồ hành trình</CardTitle>
            </CardHeader>
            <CardContent className={cls.cardDesc}>
              Mapbox/MapLibre: đánh dấu Paris, Moscow, Quảng Châu, Hương Cảng, Pác Bó…
              Click để bật popup chứa sự kiện, media, và quiz 1 câu. Fly-to giữa các điểm.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={cls.cardTitle}>Mini Game / Quiz</CardTitle>
            </CardHeader>
            <CardContent className={cls.cardDesc}>
              Trắc nghiệm nhanh, kéo–thả mảnh ghép bản đồ, “Ai là triệu phú” phiên bản Hành trình cứu nước.
              Lưu điểm local, chia sẻ mốc nổi bật.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={cls.cardTitle}>Storytelling đa phương tiện</CardTitle>
            </CardHeader>
            <CardContent className={cls.cardDesc}>
              Scroll-telling: ảnh mờ dần → chữ xuất hiện → bản đồ flyTo theo mốc (1911, 1920, 1945).
              Nút bật/tắt âm thanh nền. Tối ưu a11y & hiệu năng.
            </CardContent>
          </Card>
        </div>

        {/* Quick links dưới cùng */}
        <div className={`${cls.container} mt-10 mb-20 flex flex-wrap gap-3`}>
          <Button variant="outline" asChild>
            <Link href="/timeline">
              Đi tới Timeline <Timer className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/quiz">
              Vào Quiz <Gamepad2 className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
