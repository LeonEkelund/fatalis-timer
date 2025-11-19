import { useEffect, useRef, useState } from "react";

export default function Timerlogic({
  workMin = 25,
  breakMin = 5,
  autoSwitch = true,
  variant = "web",
}) {
  const [mode, setMode] = useState("work");
  const [remaining, setRemaining] = useState(workMin * 60);
  const [isRunning, setIsRunning] = useState(false);

  const isDesktop = variant === "desktop";
  const [pinned, setPinned] = useState(false);


  const runningRef = useRef(false);
  const endAtRef = useRef(null);
  const rafRef = useRef(0);

  const currentDuration = () =>
    (mode === "work" ? workMin : breakMin) * 60;

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
          if (Notification.permission === "default")
            Notification.requestPermission();
          if (Notification.permission === "granted")
            new Notification(
              next === "work" ? "Back to focus" : "Break time!"
            );
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

  useEffect(() => {
    if (!runningRef.current) setRemaining(currentDuration());
  }, [workMin, breakMin, mode]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      const isTyping =
        tag === "INPUT" || tag === "TEXTAREA" || e.isComposing;
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

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="grid place-items-center gap-4 text-[var(--text)]">
      {/* Timer card */}

      <div
        className={`
    relative grid place-items-center gap-5
    w-[300px] min-h-[180px] p-6
    rounded-2xl
    backdrop-blur-xl
    ${isDesktop
            ? "bg-[rgba(255,255,255,0.9)]"
            : "bg-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
          }
  `}
        style={{ WebkitAppRegion: "drag" }}
        aria-label={`Pomodoro ${mode} timer`}
      >


        {/* X for desktop */}
        {isDesktop && (
          <button
            onClick={() => window.close()}
            style={{ WebkitAppRegion: "no-drag" }}
            className="
              absolute top-2 right-2
              w-5 h-5
              flex items-center justify-center
              text-black
              text-lg
              font-bold
              leading-none
            "
          >
            ×
          </button>
        )}

        {/* pin button */}

        {isDesktop && (
          <button
            onClick={() => {
              window.electronAPI?.toggleAlwaysOnTop();
              setPinned((p) => !p);
            }}
            style={{ WebkitAppRegion: "no-drag" }}
            className={`
      absolute top-10 right-2
      w-5 h-5
      flex items-center justify-center
      text-xs
      rounded

      ${pinned
                ? "bg-transparent"
                : "bg-transparent"
              }
    `}
          >
            {pinned ? "🔒" : "🔓"}
          </button>
        )}


        {/* mode label */}
        <div
          className="absolute top-3 left-4 text-[12px] tracking-[0.2em] uppercase"
          style={{ WebkitAppRegion: "no-drag" }}
        >
          {mode}
        </div>

        {/* time */}
        <h2
          className="select-none font-black tabular-nums tracking-tight text-6xl"
          style={{ WebkitAppRegion: "no-drag" }}
        >
          {mm}:{ss}
        </h2>

        {/* controls */}
        <div
          className="flex items-center gap-2"
          style={{ WebkitAppRegion: "no-drag" }}
        >
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
            "
          >
            Reset
          </button>
        </div>
      </div>

      {/* Shortcuts legend – web only */}
      {!isDesktop && (
        <div
          className="
            hidden sm:flex
            rounded-2xl px-3 py-6 w-[300px]
            bg-[var(--surface)]
            shadow-[0_6px_20px_rgba(0,0,0,0.3)]
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
      )}
    </div>
  );
}
