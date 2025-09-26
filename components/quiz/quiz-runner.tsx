// app/quiz/page.tsx (hoặc component của mày)
// "use client" bắt buộc vì có state/interval
"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/** ========= CẤU HÌNH GỢI Ý ========= */
const REVEAL_DELAY_MS = 60_000; // 60s đầu không hiện
const REVEAL_STEP_MS = 30_000;  // sau đó mỗi 30s hiện thêm 1 từ

/** ========= TỪ KHÓA ========= */
type Word = { label: string; clean: string };

const RAW_WORDS: string[] = [
  "Lênin",
  "Versailles",
  "Tours",
  "Le Paria",
  "Pác Bó",
  "Việt Minh",
  "Đường Kách mệnh",
  "Vô sản hóa",
  "Độc lập",
  "Hàm Long",
];

function normalizeVN(input: string) {
  let s = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  s = s.replace(/đ/g, "d").replace(/Đ/g, "D");
  s = s.replace(/[^A-Za-z]/g, "");
  return s.toUpperCase();
}
const WORDS: Word[] = RAW_WORDS.map((label) => ({ label, clean: normalizeVN(label) }));

/** ========= SINH LƯỚI ========= */
type Pos = { x: number; y: number };
type Puzzle = { size: number; grid: string[][]; placements: Record<string, Pos[]> };

const DIRS: Pos[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
];
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randInt = (n: number) => Math.floor(Math.random() * n);

function createEmptyGrid(size: number) {
  return Array.from({ length: size }, () => Array<string>(size).fill(""));
}
function linePlace(grid: string[][], word: string): Pos[] | null {
  const size = grid.length;
  const L = word.length;

  for (let attempt = 0; attempt < 250; attempt++) {
    const d = DIRS[randInt(DIRS.length)];
    const maxX = d.x === 1 ? size - L : d.x === -1 ? L - 1 : size - 1;
    const minX = d.x === -1 ? L - 1 : 0;
    const maxY = d.y === 1 ? size - L : d.y === -1 ? L - 1 : size - 1;
    const minY = d.y === -1 ? L - 1 : 0;

    const sx = randInt(maxX - minX + 1) + minX;
    const sy = randInt(maxY - minY + 1) + minY;

    const path: Pos[] = [];
    let ok = true;
    for (let i = 0; i < L; i++) {
      const x = sx + d.x * i;
      const y = sy + d.y * i;
      const cell = grid[y][x];
      if (cell !== "" && cell !== word[i]) { ok = false; break; }
      path.push({ x, y });
    }
    if (!ok) continue;
    path.forEach((p, i) => (grid[p.y][p.x] = word[i]));
    return path;
  }
  return null;
}
function fillRandom(grid: string[][]) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) if (!grid[y][x]) grid[y][x] = ABC[randInt(ABC.length)];
  }
}
function generatePuzzle(size = 14, words = WORDS): Puzzle {
  const grid = createEmptyGrid(size);
  const placements: Record<string, Pos[]> = {};
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  for (const w of shuffled) {
    const path = linePlace(grid, w.clean);
    if (path) placements[w.clean] = path;
  }
  fillRandom(grid);
  return { size, grid, placements };
}

/** ========= COUNTDOWN: FIX HYDRATION ========= */
function Countdown({
  targetMs,
  stepMs,
  revealedCount,
  totalWords,
}: {
  targetMs: number;
  stepMs: number;
  revealedCount: number;
  totalWords: number;
}) {
  const [isClient, setIsClient] = useState(false);
  const [remaining, setRemaining] = useState(targetMs > 0 ? targetMs : stepMs);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient) return;

    if (revealedCount >= totalWords) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRemaining(0);
      return;
    }

    const endTime = Date.now() + remaining;
    const tick = () => {
      const left = endTime - Date.now();
      if (left <= 0) setRemaining(0);
      else setRemaining(left);
    };

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(tick, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isClient, remaining, revealedCount, totalWords]);

  useEffect(() => {
    if (revealedCount > 0 && revealedCount < totalWords) setRemaining(REVEAL_STEP_MS);
    else if (revealedCount === 0) setRemaining(REVEAL_DELAY_MS);
  }, [revealedCount, totalWords]);

  if (!isClient) {
    const s = Math.ceil(REVEAL_DELAY_MS / 1000);
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return (
      <div className="text-sm font-medium text-red-600">
        Thời gian chờ… <span className="font-bold">{String(mm).padStart(2,"0")}:{String(ss).padStart(2,"0")}</span>
      </div>
    );
  }

  if (revealedCount >= totalWords) return <div className="text-sm text-foreground/70">Đã mở hết gợi ý.</div>;

  const secs = Math.ceil(remaining / 1000);
  const mm = Math.floor(secs / 60);
  const ss = secs % 60;
  const isInitialDelay = revealedCount === 0 && secs > REVEAL_STEP_MS / 1000;

  return (
    <div className="text-sm font-medium text-red-600">
      {isInitialDelay ? "Thời gian chờ..." : "Gợi ý tiếp theo:"}{" "}
      <span className="font-bold">{String(mm).padStart(2,"0")}:{String(ss).padStart(2,"0")}</span>
    </div>
  );
}

/** ========= COMPONENT CHÍNH ========= */
export default function QuizRunner() {
  // tạo bàn ở client -> tránh hydration mismatch
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);

  const [found, setFound] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set()); // "x,y"
  const [start, setStart] = useState<Pos | null>(null);
  const [preview, setPreview] = useState<Pos[] | null>(null);

  const [isSolvedByKaLuu, setIsSolvedByKaLuu] = useState(false);

  // Reveal list (gợi ý bên phải)
  const [revealCount, setRevealCount] = useState(0);
  const revealTimeoutRef = useRef<number | null>(null);
  const revealIntervalRef = useRef<number | null>(null);

  useEffect(() => { setPuzzle(generatePuzzle()); }, []);

  // lịch reveal
  useEffect(() => {
    if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
    setRevealCount(0);
    setIsSolvedByKaLuu(false);

    if (!puzzle) return;

    revealTimeoutRef.current = window.setTimeout(() => {
      setRevealCount(1);
      revealIntervalRef.current = window.setInterval(() => {
        setRevealCount((c) => {
          const next = c + 1;
          if (next >= WORDS.length) {
            if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
            return c;
          }
          return next;
        });
      }, REVEAL_STEP_MS);
    }, REVEAL_DELAY_MS);

    return () => {
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
      if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
    };
  }, [puzzle]);

  const keyCell = (x: number, y: number) => `${x},${y}`;
  const isFoundCell = (x: number, y: number) => foundCells.has(keyCell(x, y));
  const wordsWithState = useMemo(
    () => WORDS.map((w, i) => ({ ...w, order: i + 1, done: found.has(w.clean) })),
    [found]
  );
  const progress = Math.round((found.size / WORDS.length) * 100);

  function rebuild() {
    setPuzzle(null);
    setTimeout(() => {
      setPuzzle(generatePuzzle());
      setFound(new Set());
      setFoundCells(new Set());
      setStart(null);
      setPreview(null);
      setIsSolvedByKaLuu(false);
    }, 0);
  }

  const size = puzzle?.size ?? 14;

  function inBounds(x: number, y: number) {
    if (!puzzle) return false;
    return x >= 0 && y >= 0 && x < puzzle.size && y < puzzle.size;
  }
  function computeLine(a: Pos, b: Pos): Pos[] | null {
    const dx = Math.sign(b.x - a.x);
    const dy = Math.sign(b.y - a.y);
    if (dx === 0 && dy === 0) return null;
    if (!(dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy))) return null;
    const len = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y)) + 1;
    const path: Pos[] = [];
    for (let i = 0; i < len; i++) {
      const x = a.x + dx * i;
      const y = a.y + dy * i;
      if (!inBounds(x, y)) return null;
      path.push({ x, y });
    }
    return path;
  }
  function getString(path: Pos[]) {
    if (!puzzle) return "";
    return path.map((p) => puzzle.grid[p.y][p.x]).join("");
  }
  function tryCheck(path: Pos[]) {
    const s = getString(path);
    const rev = s.split("").reverse().join("");
    const hit = WORDS.find((w) => w.clean === s || w.clean === rev);
    if (!hit) return false;
    if (found.has(hit.clean)) return true;

    const nf = new Set(found); nf.add(hit.clean); setFound(nf);
    const nc = new Set(foundCells); path.forEach((p) => nc.add(keyCell(p.x, p.y))); setFoundCells(nc);
    return true;
  }
  function onCellClick(x: number, y: number) {
    if (!puzzle) return;
    if (!start) { setStart({ x, y }); setPreview([{ x, y }]); return; }
    const path = computeLine(start, { x, y });
    if (!path) { setStart({ x, y }); setPreview([{ x, y }]); return; }
    tryCheck(path);
    setStart(null); setPreview(null);
  }
  function onCellEnter(x: number, y: number) {
    if (!start) return;
    const path = computeLine(start, { x, y });
    setPreview(path);
  }

  /** ======= KaLuu auto-solver ======= */
  const solvePuzzle = useCallback(() => {
    if (!puzzle) return "❌ Lưới chưa sẵn sàng!";
    const placements = puzzle.placements;

    const newFound = new Set(found);
    const newFoundCells = new Set(foundCells);
    let gained = 0;

    for (const [cleanWord, path] of Object.entries(placements)) {
      if (!newFound.has(cleanWord)) {
        newFound.add(cleanWord);
        gained++;
        path.forEach((p) => newFoundCells.add(keyCell(p.x, p.y)));
      }
    }

    if (gained > 0) {
      setFound(newFound);
      setFoundCells(newFoundCells);
      setStart(null);
      setPreview(null);
      setIsSolvedByKaLuu(true);
      return `✅ KaLuu đã giải ${gained} từ!`;
    }
    return "Đã giải hết hoặc không còn từ mới.";
  }, [puzzle, found, foundCells]);

  useEffect(() => {
    // @ts-ignore
    window.KaLuu = solvePuzzle;
    return () => { // @ts-ignore
      delete window.KaLuu;
    };
  }, [solvePuzzle]);

  /** ======== UI (CĂN GIỮA CHUẨN) ======== */
  return (
    // not-prose: thoát ảnh hưởng của Typography; grid+place-items-center: căn giữa theo viewport
    <section className="not-prose min-h-[70vh] py-10 px-4 grid place-items-center">
      {/* max-w-6xl để content tổng không bị dạt trái nếu trang có container hẹp */}
      <div className="w-full max-w-6xl">
        {/* Card tự căn giữa theo chiều ngang nhờ mx-auto */}
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Tìm Chữ: 10 Từ Khóa</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Progress + nút */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground/70">
                Đã tìm: <b>{found.size}</b> / {WORDS.length} ({progress}%)
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { setStart(null); setPreview(null); }}>
                  Xoá chọn
                </Button>
                <Button size="sm" onClick={rebuild}>Tạo bàn mới</Button>
              </div>
            </div>

            {/* Lưới + cột gợi ý bên phải */}
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_260px] items-start">
              {/* GRID LEFT */}
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
                {Array.from({ length: size * size }).map((_, i) => {
                  const x = i % size;
                  const y = Math.floor(i / size);
                  const ch = puzzle ? puzzle.grid[y][x] : "·";
                  const isPreview =
                    !!preview?.some((p) => p.x === x && p.y === y) && !isFoundCell(x, y);
                  return (
                    <button
                      key={i}
                      onClick={() => onCellClick(x, y)}
                      onMouseEnter={() => onCellEnter(x, y)}
                      className={[
                        "aspect-square text-sm sm:text-base font-semibold rounded-md border",
                        "flex items-center justify-center select-none",
                        "transition-colors",
                        isFoundCell(x, y)
                          ? "bg-green-500 text-white border-green-600"
                          : isPreview
                          ? "bg-red-100 border-red-300"
                          : "hover:bg-muted",
                      ].join(" ")}
                      aria-label={`${x},${y}`}
                      disabled={!puzzle}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>

              {/* RIGHT HINT COLUMN */}
              <aside className="md:sticky md:top-4 self-start space-y-3">
                <div className="text-sm font-medium flex justify-between items-baseline">
                  <span>Gợi ý:</span>
                  {found.size < WORDS.length && (
                    <Countdown
                      targetMs={revealCount === 0 ? REVEAL_DELAY_MS : REVEAL_STEP_MS}
                      stepMs={REVEAL_STEP_MS}
                      revealedCount={revealCount}
                      totalWords={WORDS.length}
                    />
                  )}
                </div>
                <div className="grid gap-2">
                  {wordsWithState.slice(0, revealCount).map((w) => (
                    <div key={w.clean} className="flex items-center gap-2">
                      <Badge className={w.done ? "bg-green-600" : "bg-red-600"}>
                        {String(w.order).padStart(2, "0")}
                      </Badge>
                      <span className={w.done ? "line-through opacity-60" : ""}>{w.label}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </CardContent>

          <CardFooter className="justify-between">
            {found.size === WORDS.length ? (
              <div className={isSolvedByKaLuu ? "text-yellow-600 font-medium" : "text-green-600 font-medium"}>
                {isSolvedByKaLuu
                  ? "Ka Lưu đã làm xong, quá dễ! 😉"
                  : "Quá đỉnh! Mày đã tìm hết tất cả từ khóa 🎉"}
              </div>
            ) : (
              <div className="text-foreground/70 text-sm">
                Bấm ô bắt đầu → ô kết thúc theo hàng/cột/chéo. Có thể chọn ngược lại.
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
