export type Media =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "audio"; src: string };



export interface Quote {
text: string;
source?: string;
}


export interface EventItem {
  id: string;
  year: number;
  title: string;
  summary: string;
  location?: { name: string; lat: number; lng: number };
  media?: Media[];
  quotes?: Quote[];
  links?: { label: string; href: string }[];
  details?: string[]; // 👈 NEW: các đoạn nội dung chi tiết
}


export interface PlaceItem {
id: string;
title: string;
coords: [number, number]; // [lng, lat]
years?: string; // e.g., "1921–1923"
events?: string[]; // event ids
blurb: string;
thumb?: string;
quizId?: string;
}


export type QuizOption = string;


export interface QuizQuestion {
id: string;
type: "mcq";
question: string;
options: QuizOption[];
answer: number; // index
explain?: string;
linkTo?: string; // deep-link to timeline/map
}


export interface SceneStep {
type: "image" | "text" | "mapFlyTo";
src?: string;
content?: string;
coords?: [number, number];
zoom?: number;
}


export interface SceneItem {
id: string;
title: string;
pinEventId?: string;
steps: SceneStep[];
}