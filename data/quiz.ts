import { QuizQuestion } from "@/lib/types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "quiz-1930-event",
    type: "mcq",
    question: "Sự kiện trọng đại tháng 2/1930 tại Hương Cảng là gì?",
    options: [
      "Thành lập Đảng Cộng sản Việt Nam",
      "Khởi nghĩa Bắc Sơn",
      "Thành lập Việt Minh",
      "Khởi nghĩa Nam Kỳ",
    ],
    answer: 0,
    explain: "Hợp nhất các tổ chức cộng sản thành ĐCSVN.",
    linkTo: "/timeline#1930-dang-csvn",
  },
  {
    id: "quiz-1941-vietminh",
    type: "mcq",
    question: "Mặt trận Việt Minh ra đời ngày nào?",
    options: ["2/9/1945", "3/2/1930", "19/5/1941", "19/12/1946"],
    answer: 2,
    explain: "Việt Minh thành lập 19/5/1941.",
    linkTo: "/timeline#1941-pac-bo-viet-minh",
  },
  {
    id: "quiz-1945-event",
    type: "mcq",
    question: "Ngày 2/9/1945 gắn với sự kiện nào?",
    options: [
      "Tổng khởi nghĩa Tháng Tám",
      "Tuyên ngôn Độc lập tại Ba Đình",
      "Thành lập Việt Minh",
      "Toàn quốc kháng chiến",
    ],
    answer: 1,
    explain: "Đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình.",
    linkTo: "/timeline#1945-doc-lap",
  },
  {
    id: "quiz-1919-petition",
    type: "mcq",
    question: "Năm 1919, Nguyễn Ái Quốc gửi văn kiện nào tới Hội nghị Versailles?",
    options: [
      "Tuyên ngôn độc lập",
      "Yêu sách của nhân dân An Nam",
      "Chánh cương vắn tắt",
      "Sách lược vắn tắt",
    ],
    answer: 1,
    explain: "\"Yêu sách của nhân dân An Nam\" (1919).",
    linkTo: "/timeline#1919-versailles",
  },
];
