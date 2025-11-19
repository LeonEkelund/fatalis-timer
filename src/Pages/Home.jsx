import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <section
        className="
          pt-40 pb-20 px-6
          flex flex-col items-center text-center gap-8
          relative z-10 max-w-2xl
        "
      >
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
          Minimal Pomodoro
        </p>

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.15] text-[var(--text)]">
          Stay focused with a clean, distraction-free timer.
        </h1>

        <p className="text-base text-[var(--muted)] max-w-md leading-relaxed">
          Fatalis is a simple pomodoro timer designed to stay out of your way —
          just focus, break, repeat.
        </p>

        <Link
          to="/timer"
          className="
            mt-4 inline-flex items-center justify-center
            px-6 py-3 rounded-full
            bg-[var(--text)] text-[#ffffff]
            text-sm font-medium
            shadow-[0_6px_18px_rgba(0,0,0,0.16)]
            transition-all duration-150
            hover:scale-110
          "
        >
          Go to timer
        </Link>
      </section>
    </div>
  );
}
