import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/navbar";
import Timer from "./components/timer";

export default function App() {
  const [progress, setProgress] = useState(0);

  // Control the loading progress animation
  useEffect(() => {
    if (progress >= 100) return;

    const id = setInterval(() => {
      setProgress((p) => {
        if (p < 60) return p + 2;      // ⚡ fast at the start
        if (p < 90) return p + 1;      // steady in the middle
        if (p < 97) return p + 0.5;    // slow near the end
        return 100;                    // snap to 100
      });
    }, 20); // smaller = faster overall

    return () => clearInterval(id);
  }, [progress]);

  const loading = progress < 100;

  return (
    <>
      {loading && <LoadingScreen progress={Math.floor(progress)} />}

      <main
        className={`
          min-h-screen
          bg-[#f5efe6]
          text-[var(--text)]
          overflow-x-hidden
          transition-opacity duration-700
          ${loading ? "opacity-0" : "opacity-100"}
        `}
      >
        <Navbar />

        <section
          id="timer"
          className="pt-32 flex justify-center px-4"
        >
          <Timer />
        </section>
      </main>
    </>
  );
}
