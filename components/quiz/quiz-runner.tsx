"use client";

import { useState, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type FormValues = {
  option: string;
};

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();

  const list = useMemo(() => QUIZ_QUESTIONS, []);
  const q = list[index];
  const progress = ((index + 1) / list.length) * 100;
  const selectedOption = watch("option");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (parseInt(data.option) === q.answer) {
      setScore(score + 1);
    }
    if (index < list.length - 1) {
      setIndex(index + 1);
      reset();
    } else {
      setIndex(-1); // End of quiz
    }
  };

  if (index === -1) {
    // Show score screen
    return (
      <Card>
        <CardHeader>
          <CardTitle>Kết quả</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Điểm: <b>{score}</b> / {list.length}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            onClick={() => {
              setIndex(0);
              setScore(0);
              reset();
            }}
          >
            Làm lại
          </Button>
          <Button variant="outline" asChild>
            <a href="/timeline">Ôn lại Timeline</a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{q.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <RadioGroup value={selectedOption}>
            {q.options.map((opt, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={String(i)}
                  id={`opt-${i}`}
                  {...register("option")}
                />
                <Label htmlFor={`opt-${i}`}>{opt}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex gap-2">
            <Button type="submit">Trả lời</Button>
            {q.linkTo && (
              <Button type="button" variant="outline" asChild>
                <a href={q.linkTo}>Gợi ý</a>
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}