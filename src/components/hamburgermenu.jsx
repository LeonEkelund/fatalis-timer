import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      {/* Icon */}
      <button
        type="button"
        onClick={toggle}
        className="
          relative z-[60]
          flex items-center justify-center
          h-8 w-8
          focus:outline-none
        "
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="relative block h-5 w-6">
          {/* Top line */}
          <span
            className={`
              absolute left-0
              h-[2px] w-full rounded-full bg-[#1a1a1a]
              transition-all duration-300 ease-out
              ${open
                ? "top-1/2 -translate-y-1/2 rotate-45"
                : "top-0 translate-y-0 rotate-0"}
            `}
          />

          {/* Middle line */}
          <span
            className={`
              absolute left-0
              h-[2px] w-full rounded-full bg-[#1a1a1a]
              transition-all duration-200 ease-out
              ${open
                ? "top-1/2 -translate-y-1/2 opacity-0"
                : "top-1/2 -translate-y-1/2 opacity-100"}
            `}
          />

          {/* Bottom line */}
          <span
            className={`
              absolute left-0
              h-[2px] w-full rounded-full bg-[#1a1a1a]
              transition-all duration-300 ease-out
              ${open
                ? "top-1/2 -translate-y-1/2 -rotate-45"
                : "bottom-0 translate-y-0 rotate-0"}
            `}
          />
        </span>
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div
          className="
            fixed inset-0 z-[40]
          "
          onClick={close}
        >
          {/* Centered menu card, pushed down slightly */}
          <div className="flex w-full justify-center items-start pt-20">
            <div
              className="
                w-[90vw] max-w-sm
                rounded-3xl
                bg-[var(--surface)]
                border border-[var(--border)]
                shadow-[0_18px_60px_rgba(0,0,0,0.25)]
                px-6 py-8
                flex flex-col items-center gap-6
                text-center
              "
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
                Menu
              </h2>

              <nav className="flex flex-col gap-4 text-[17px] font-medium">
                <Link
                  to="/timer"
                  className="hover:text-[var(--muted)] transition-colors"
                  onClick={close}
                >
                  Timer
                </Link>

                <Link
                  to="/downloadPage"
                  className="hover:text-[var(--muted)] transition-colors"
                  onClick={close}
                >
                  Download
                </Link>
              </nav>

              <p className="text-[11px] text-[var(--muted)] mt-2">
                Tap outside to close.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
