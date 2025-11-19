export default function DownloadPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.15] text-[var(--text)] text-center">Download fatalis timer</h1>

      <a
        href="https://github.com/LeonEkelund/fatalis-timer/releases/download/v1.0.0/Fatalis.Timer.Setup.1.0.0.exe"
        download
        className="mt-10 inline-flex justify-center
            px-6 py-3 rounded-full
            bg-[var(--text)] text-[#ffffff]
            text-sm font-medium
            shadow-[0_6px_18px_rgba(0,0,0,0.16)]
            transition-all duration-150
            hover:scale-110"
      >
        Download for Windows
      </a>

      <p className="text-xs py-1.5 text-gray-400 mt-2">
        Version 1.0.0 — Windows Installer — ~5 MB
      </p>
    </div>
  );
}
