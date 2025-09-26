// components/stories/stories-client.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SCENES } from "@/data/scenes_2";
import type { Scene } from "@/data/scenes_2";
import { AnimatePresence, motion, type Variants } from "framer-motion";

// Chuyển đường dẫn kiểu Windows (public\...) hoặc (public/...) → URL tĩnh Next (/...)
function publicUrl(p: string) {
  const normalized = "/" + p.replace(/^public[\\/]/i, "").replace(/\\/g, "/");
  return encodeURI(normalized);
}

// Format mm:ss (hoặc h:mm:ss nếu > 1h)
function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec <= 0) return "00:00";
  const s = Math.floor(sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const two = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${two(m)}:${two(ss)}` : `${two(m)}:${two(ss)}`;
}

// Variants cho chuyển cảnh & phần tử (mượt, có stagger)
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier (easeOut)
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function StoriesClient() {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0); // giai đoạn hiện tại
  const [showImg, setShowImg] = useState<0 | 1>(0); // 0 → ảnh 1, 1 → ảnh 2
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [switched, setSwitched] = useState(false); // đã chuyển ảnh ở 50%
  const [endedAll, setEndedAll] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const scene: Scene | undefined = SCENES[idx];

  // Reset mỗi khi đổi giai đoạn
  useEffect(() => {
    setShowImg(0);
    setSwitched(false);
    setTime(0);
    setDuration(0); // clear để tránh hiển thị sai khi chuyển đoạn
  }, [idx]);

  // Preload ảnh của scene hiện tại và ảnh đầu của scene kế tiếp (mượt hơn)
  useEffect(() => {
    if (!scene) return;
    scene.images.forEach((src) => {
      const img = new Image();
      img.src = publicUrl(src);
    });
    const next = SCENES[idx + 1];
    if (next?.images?.[0]) {
      const img = new Image();
      img.src = publicUrl(next.images[0]);
    }
  }, [idx, scene]);

  // Cập nhật duration từ phần tử audio nếu metadata đã sẵn có (cache)
  useEffect(() => {
    const a = audioRef.current;
    if (a && a.readyState >= 1 && Number.isFinite(a.duration) && a.duration > 0) {
      setDuration(a.duration);
    }
  }, [scene?.audio]);

  // Tự play khi nhấn Bắt đầu (cần tương tác người dùng)
  useEffect(() => {
    if (!started) return;
    const a = audioRef.current;
    if (!a) return;
    const tryPlay = async () => {
      try {
        await a.play();
      } catch {
        // nếu bị chặn autoplay, user sẽ bấm nút Phát
      }
    };
    tryPlay();
  }, [started, scene?.audio]);

  const updateDurationFromEl = (el: HTMLAudioElement) => {
    const d = el.duration;
    if (Number.isFinite(d) && d > 0) setDuration(d);
  };

  const onLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    updateDurationFromEl(e.currentTarget);
  };

  const onDurationChange = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    updateDurationFromEl(e.currentTarget);
  };

  const onCanPlay = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    // một số trình duyệt chỉ có duration chính xác khi có thể play
    updateDurationFromEl(e.currentTarget);
  };

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (!a) return;
    setTime(a.currentTime);
    if (!switched && duration > 0 && a.currentTime >= duration / 2) {
      setShowImg(1);
      setSwitched(true);
    }
  };

  const onEnded = () => {
    if (idx < SCENES.length - 1) {
      setIdx((v) => v + 1);
    } else {
      setEndedAll(true);
    }
  };

  const progress = useMemo(() => {
    return duration > 0 ? Math.min(100, (time / duration) * 100) : 0;
  }, [time, duration]);

  return (
    <motion.div className="space-y-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      {/* Overlay chào mừng */}
      <AnimatePresence>
        {!started && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900"
            >
              <motion.h2 className="text-2xl font-bold" variants={itemVariants} initial="hidden" animate="show">
                Chào mừng đến với phần kể chuyện
              </motion.h2>
              <motion.p className="mt-2 text-foreground/80" variants={itemVariants} initial="hidden" animate="show">
                Bấm <strong>Bắt đầu</strong> để nghe chuỗi giai đoạn. Mỗi giai đoạn gồm
                <strong> 2 ảnh</strong> và <strong>1 bản ghi âm</strong>. Ảnh thứ hai sẽ xuất hiện khi bản ghi phát tới
                <strong> 50%</strong>.
              </motion.p>
              <div className="mt-4 flex gap-3">
                <motion.button
                  onClick={() => setStarted(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl px-4 py-2 font-medium shadow-sm bg-primary text-primary-foreground hover:opacity-90"
                >
                  Bắt đầu
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Khu vực nội dung của scene */}
      <AnimatePresence mode="wait">
        {scene && (
          <motion.section
            key={scene.id}
            className="grid items-start gap-6 md:grid-cols-2"
            variants={sectionVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {/* Cột trái: tiêu đề, tóm tắt, điều khiển */}
            <div className="space-y-4">
              <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
                {scene.title}
              </motion.h2>
              <motion.p className="text-sm text-foreground/80" variants={itemVariants}>
                {scene.summary}
              </motion.p>

              {/* Điều khiển phát */}
              <motion.div className="mt-4 flex flex-wrap items-center gap-3" variants={itemVariants}>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg px-3 py-1.5 border text-sm hover:bg-foreground/5"
                  onClick={() => {
                    const a = audioRef.current;
                    if (!a) return;
                    if (a.paused) a.play();
                    else a.pause();
                  }}
                >
                  Phát / Tạm dừng
                </motion.button>

                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg px-3 py-1.5 border text-sm hover:bg-foreground/5"
                  onClick={() => {
                    const a = audioRef.current;
                    if (!a) return;
                    a.pause();
                    a.currentTime = 0;
                    setShowImg(0);
                    setSwitched(false);
                    a.play();
                  }}
                >
                  Phát lại đoạn này
                </motion.button>

                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg px-3 py-1.5 border text-sm hover:bg-foreground/5"
                  onClick={() => {
                    const a = audioRef.current;
                    if (a) a.pause();
                    setIdx((v) => Math.max(0, Math.min(SCENES.length - 1, v - 1)));
                  }}
                >
                  Trước
                </motion.button>

                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg px-3 py-1.5 border text-sm hover:bg-foreground/5"
                  onClick={() => {
                    const a = audioRef.current;
                    if (a) a.pause();
                    setIdx((v) => Math.max(0, Math.min(SCENES.length - 1, v + 1)));
                  }}
                >
                  Tiếp theo
                </motion.button>
              </motion.div>

              {/* Tiến độ + tổng thời lượng */}
              <motion.div className="mt-2 space-y-1" variants={itemVariants}>
                <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    className="h-full bg-foreground/70"
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 160, damping: 18 }}
                  />
                </div>
                <div className="text-xs opacity-70">
                  {formatTime(time)} / {formatTime(duration)}
                  {duration > 0 && (
                    <span> — Tổng: {Math.round(duration)}s</span>
                  )}
                  {duration === 0 && <span> — đang lấy thời lượng…</span>}
                  {" "}• Giai đoạn {idx + 1} / {SCENES.length}
                </div>
              </motion.div>

              {/* Audio (ẩn) */}
              <audio
                ref={audioRef}
                src={publicUrl(scene.audio)}
                preload="metadata"
                onLoadedMetadata={onLoadedMetadata}
                onDurationChange={onDurationChange}
                onCanPlay={onCanPlay}
                onTimeUpdate={onTimeUpdate}
                onEnded={onEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>

            {/* Cột phải: hình ảnh + caption dưới ảnh */}
            <motion.div variants={itemVariants}>
              <motion.div
                className={
                  "relative aspect-[16/10] overflow-hidden rounded-xl bg-foreground/5 " +
                  (isPlaying ? " ring-2 ring-foreground/20" : "")
                }
                whileHover={{ scale: 1.005 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${scene.id}-${showImg}`}
                    src={publicUrl(scene.images[showImg])}
                    alt={`${scene.title} – ảnh ${showImg + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={
                      isPlaying
                        ? { opacity: 1, scale: [1.02, 1.06, 1.02], x: [0, -4, 0] }
                        : { opacity: 1, scale: 1.01 }
                    }
                    exit={{ opacity: 0 }}
                    transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Vignette & caption overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
                  <div className="font-medium">{scene.title}</div>
                  <div className="opacity-90">{scene.summary}</div>
                  <div className="mt-1 text-xs opacity-70">Ảnh {showImg + 1} / 2</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Kết thúc câu chuyện */}
      <AnimatePresence>
        {endedAll && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border p-6 text-center"
          >
            <h3 className="text-xl font-semibold">Hết câu chuyện 🎉</h3>
            <p className="mt-2 text-foreground/80">Bạn có thể phát lại từ đầu hoặc chọn từng giai đoạn để nghe lại.</p>
            <div className="mt-4 flex justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg px-4 py-2 border hover:bg-foreground/5"
                onClick={() => {
                  setEndedAll(false);
                  setIdx(0);
                  setShowImg(0);
                  setSwitched(false);
                  setTime(0);
                  const a = audioRef.current;
                  if (a) {
                    a.currentTime = 0;
                    a.play();
                  }
                }}
              >
                Phát lại từ đầu
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
