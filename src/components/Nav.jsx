import { Link } from "react-router-dom";
import fatalisLogo from "../assets/fatalislogo.svg";
import HamburgerMenu from "./hamburgermenu";

export default function Navbar() {
  return (
    <div className="fixed inset-x-0 top-6 z-50 flex justify-center pointer-events-none">
      <nav
        className="
          pointer-events-auto
          flex items-center justify-between gap-4
          px-4 sm:px-6 py-3
          rounded-2xl
          w-[min(92vw,960px)]
          bg-white/70
          border border-black/10
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          backdrop-blur-sm
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={fatalisLogo}
              alt="Fatalis Logo"
              className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-[1.05]"
            />
          </Link>
        </div>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-10">
          <Link
            to="/timer"
            className="
              text-sm font-medium tracking-wide
              text-[var(--text)]/75
              transition-all duration-200
              hover:text-[var(--text)] hover:opacity-90
            "
          >
            Timer
          </Link>

          <Link
            to="/DownloadPage"
            className="
              text-sm font-medium tracking-wide
              text-[var(--text)]/75
              transition-all duration-200
              hover:text-[var(--text)] hover:opacity-90
            "
          >
            Download
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="sm:hidden">
          <HamburgerMenu />
        </div>
      </nav>
    </div>
  );
}
