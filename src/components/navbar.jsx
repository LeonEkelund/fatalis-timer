import fatalisLogo from "../assets/fatalislogo.svg";

export default function Navbar() {
  return (
    <nav
      className="
        w-full flex flex-col items-center gap-4
        py-10
        bg-[#f5efe6] text-[#1a1a1a]
        border-b border-[#e2dbcd]
        shadow-[0_4px_12px_rgba(0,0,0,0.04)]
      "
    >
      {/* Logo */}
      <img
        src={fatalisLogo}
        alt="Fatalis Logo"
        className="w-32 h-15 transition-transform duration-300 hover:scale-[1.05]"
      />

      {/* Navigation links */}
      <div className="flex items-center gap-10 text-[15px] font-medium">
        <a
          href="#"
          className="transition-colors duration-300 hover:text-[#4b5563]"
        >
          Timer
        </a>
        <a
          href="#"
          className="transition-colors duration-300 hover:text-[#4b5563]"
        >
          Download
        </a>
      </div>


    </nav>
  );
}
