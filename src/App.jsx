import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Nav";
import Home from "./Pages/Home";
import TimerPage from "./Pages/Timerpage";
import DesktopTimer from "./DesktopTimer";
import DownloadPage from "./Pages/DownloadPage";

export default function App() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const isDesktop = location.pathname === "/desktop-timer";

  useEffect(() => {
    if (progress >= 100) return;

    const id = setInterval(() => {
      setProgress((p) => {
        if (p < 60) return p + 2;
        if (p < 90) return p + 1;
        if (p < 97) return p + 0.5;
        return 100;
      });
    }, 20);

    return () => clearInterval(id);
  }, [progress]);

  const loading = progress < 100;

  if (isDesktop) {
    return <DesktopTimer />;
  }

  return (
    <>
      {loading && <LoadingScreen progress={Math.floor(progress)} />}

      <main
        className={`
          min-h-screen
          text-[var(--text)]
          overflow-x-hidden
          transition-opacity duration-700
          ${loading ? "opacity-0" : "opacity-100"}
          bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0)_40%),linear-gradient(to_top,rgba(0,0,0,0.08),rgba(0,0,0,0)_60%)]
        `}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/desktop-timer" element={<DesktopTimer />} />
          <Route path="/downloadpage" element={<DownloadPage />} />
        </Routes>
      </main>
    </>
  );
}
