// app/quiz/page.tsx
import QuizRunner from "@/components/quiz/quiz-runner";
import { cls } from "@/lib/styles";

export const metadata = { title: "Quiz – Hành trình cứu nước" };

export default function QuizPage() {
  return (
    <main className={`${cls.container} py-10`}>
      <h1 className="text-3xl font-bold mb-4">Mini Game / Quiz</h1>
      <p className="text-foreground/80 mb-4">
        Trắc nghiệm nhanh dựa trên các mốc lịch sử trong timeline.
      </p>
      <div className="max-w-2xl">
        <QuizRunner />
      </div>
    </main>
  );
}
