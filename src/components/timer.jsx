import { useEffect, useRef, useState } from "react";

export default function Timer({ workMin = 25, breakMin = 5, autoSwitch = true }) {
  const [mode, setMode] = useState("work");                 // "work" | "break"
  const [remaining, setRemaining] = useState(workMin * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Refs for accurate timing inside rAF loop
  const runningRef = useRef(false);
  const endAtRef = useRef(null);
  const rafRef = useRef(0);

  const currentDuration = () => (mode === "work" ? workMin : breakMin) * 60;

  const computeRemaining = () => {
    if (!endAtRef.current) return remaining;
    const now = performance.now();
    return Math.max(0, Math.round((endAtRef.current - now) / 1000));
  };

  const loop = () => {
    if (!runningRef.current) return;
    const secs = computeRemaining();
    setRemaining(secs);
    if (secs > 0) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      runningRef.current = false;
      setIsRunning(false);
      if (autoSwitch) {
        const next = mode === "work" ? "break" : "work";
        setMode(next);
        endAtRef.current = null;
        setRemaining((next === "work" ? workMin : breakMin) * 60);
        if ("Notification" in window) {
          if (Notification.permission === "default") Notification.requestPermission();
          if (Notification.permission === "granted") {
            new Notification(next === "work" ? "Back to focus" : "Break time!");
          }
        }
      }
    }
  };

  const start = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setIsRunning(true);
    endAtRef.current = performance.now() + remaining * 1000;
    setRemaining(computeRemaining());
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  };

  const pause = () => {
    if (!runningRef.current) return;
    const secs = computeRemaining();
    setRemaining(secs);
    runningRef.current = false;
    setIsRunning(false);
    endAtRef.current = null;
    cancelAnimationFrame(rafRef.current);
  };

  const reset = () => {
    runningRef.current = false;
    setIsRunning(false);
    endAtRef.current = null;
    cancelAnimationFrame(rafRef.current);
    setRemaining(currentDuration());
  };

  // Sync when props/mode change while idle
  useEffect(() => {
    if (!runningRef.current) setRemaining(currentDuration());
  }, [workMin, breakMin, mode]);

  // Keyboard shortcuts: Space (start/pause), R (reset)
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || e.isComposing;
      if (isTyping || e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.code === "Space") {
        e.preventDefault();
        runningRef.current ? pause() : start();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Cleanup
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="grid place-items-center gap-4 text-[var(--text)]">
      {/* Timer card */}
      <div
        className="
          relative grid place-items-center gap-5
          w-[340px] min-h-[180px] p-6
          rounded-2xl
          bg-[var(--surface)]
          border border-[var(--border)]
          shadow-[0_6px_20px_rgba(0,0,0,0.06)]
          backdrop-blur-xl
        "
        aria-label={`Pomodoro ${mode} timer`}
      >
        {/* subtle inner ring */}
        <div className="pointer-events-none absolute inset-2 rounded-xl border border-white/60 opacity-40" />

        {/* mode label */}
        <div className="absolute top-3 left-4 text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">
          {mode}
        </div>

        {/* time */}
        <h2 className="select-none font-black tabular-nums tracking-tight text-5xl">
          {mm}:{ss}
        </h2>

        {/* controls */}
        <div className="flex items-center gap-2">
          {!isRunning ? (
            <button
              onClick={start}
              className="
                px-4 py-2 rounded-lg
                bg-[var(--button)] hover:bg-[var(--button-hover)]
                text-[var(--button-text)] font-semibold
                border border-[var(--border)]
                shadow-[0_1px_0_rgba(0,0,0,0.04)]
                transition
                focus:outline-none focus:ring-2 focus:ring-[var(--border)]/70
              "
            >
              Start
            </button>
          ) : (
            <button
              onClick={pause}
              className="
                px-4 py-2 rounded-lg
                bg-[var(--button)] hover:bg-[var(--button-hover)]
                text-[var(--button-text)] font-semibold
                border border-[var(--border)]
                shadow-[0_1px_0_rgba(0,0,0,0.04)]
                transition
                focus:outline-none focus:ring-2 focus:ring-[var(--border)]/70
              "
            >
              Pause
            </button>
          )}

          <button
            onClick={reset}
            className="
                px-4 py-2 rounded-lg
                bg-[var(--button)] hover:bg-[var(--button-hover)]
                text-[var(--button-text)] font-semibold
                border border-[var(--border)]
                shadow-[0_1px_0_rgba(0,0,0,0.04)]
                transition
                focus:outline-none focus:ring-2 focus:ring-[var(--border)]/70
            "
          >
            Reset
          </button>
        </div>
      </div>

      {/* Shortcuts legend */}
      <div
        className="
         hidden sm:flex
          rounded-2xl px-3 py-3 w-[340px]
          bg-[var(--surface)]
          border border-[var(--border)]
          shadow-[0_6px_20px_rgba(0,0,0,0.06)]
          backdrop-blur-xl
          text-xs text-[var(--text)]
          flex flex-col items-center gap-1.5
        "
      >
        <div className="flex gap-3">
          <kbd className="px-3 py-1 rounded border border-[var(--border)] bg-[var(--button)] text-[var(--text)] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            Space
          </kbd>
          <kbd className="px-3 py-1 rounded border border-[var(--border)] bg-[var(--button)] text-[var(--text)] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            R
          </kbd>
        </div>
        <p className="text-[11px] text-[var(--muted)] tracking-wide">
          Start / Pause • Reset
        </p>
      </div>
    </div>
  );
}
