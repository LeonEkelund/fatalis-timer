import { useEffect, useState } from "react";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <>
      {/* Simple hamburger icon */}
      <button
        type="button"
        onClick={toggle}
        className="
          relative z-[60]
          flex h-8 w-8 flex-col items-center justify-center
          gap-1.5
          transition
          focus:outline-none
        "
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span
          className={`
            h-[2px] w-6 rounded-full bg-[#1a1a1a]
            transition-transform duration-300
            ${open ? "translate-y-[5px] rotate-45" : ""}
          `}
        />
        <span
          className={`
            h-[2px] w-6 rounded-full bg-[#1a1a1a]
            transition-all duration-200
            ${open ? "opacity-0" : "opacity-100"}
          `}
        />
        <span
          className={`
            h-[2px] w-6 rounded-full bg-[#1a1a1a]
            transition-transform duration-300
            ${open ? "-translate-y-[5px] -rotate-45" : ""}
          `}
        />
      </button>

      {/* Full-screen overlay BELOW the navbar */}
      {open && (
        <div
          className="
            fixed inset-0 z-[40]
            transition-opacity
          "
          onClick={close}
        >
          {/* Push content down so it's clearly visible */}
          <div className="flex w-full justify-center items-start pt-25">
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
                <a
                  href="#timer"
                  className="hover:text-[var(--muted)] transition-colors"
                  onClick={close}
                >
                  Timer
                </a>
                <a
                  href="#download"
                  className="hover:text-[var(--muted)] transition-colors"
                  onClick={close}
                >
                  Download
                </a>
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
