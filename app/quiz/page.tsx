// app/quiz/page.tsx
import QuizRunner from "@/components/quiz/quiz-runner";
import { cls } from "@/lib/styles";

export const metadata = { title: "Word Search – Hành trình cứu nước" };

export default function QuizPage() {
  return (
    <main className={`${cls.container} py-10`}>
      <h1 className="text-3xl font-bold mb-2">Word Search / Tìm chữ</h1>
      <p className="text-foreground/80 mb-6">
        Tìm 10 từ khóa liên quan đến tư tưởng & hành trình cứu nước của Hồ Chí Minh.
        Mẹo: bấm ô bắt đầu → ô kết thúc theo hàng, cột hoặc đường chéo.
      </p>
      <div className="max-w-4xl">
        <QuizRunner />
      </div>
    </main>
  );
}
