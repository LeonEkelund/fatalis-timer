import fatalisLogo from "../assets/fatalislogo.svg";

export default function Navbar() {
  return (
    // Floating wrapper that centers the card at the top
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <nav
        className="
          pointer-events-auto
          flex items-center justify-between gap-6
          px-6 py-3
          rounded-2xl
          max-w-4xl w-[92vw]
          backdrop-blur-xl
          border border-black/10
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        "
      >
        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <img
            src={fatalisLogo}
            alt="Fatalis Logo"
            className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-[1.05]"
          />
          <h1
            className="
    relative text-lg tracking-widest text-[#1a1a1a] font font-extrabold font-sans"
          >
            FATALIS
          </h1>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-[15px] font-medium">
          <a href="#" className="transition-colors duration-300 hover:text-gray-700">
            Timer
          </a>
          <a href="#" className="transition-colors duration-300 hover:text-gray-700">
            Download
          </a>
        </div>
      </nav>
    </div>
  );
}
