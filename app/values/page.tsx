import { cls } from "@/lib/styles";
import ValuesContent from "@/components/values/ValuesContent";

export const metadata = {
  title: "Tư tưởng Hồ Chí Minh – Giá trị quốc tế",
};

export default function ValuesPage() {
  return (
    <main className={`${cls.container} py-10`}>
      <ValuesContent />
    </main>
  );
}
