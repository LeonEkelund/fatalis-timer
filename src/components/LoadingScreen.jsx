import { useEffect, useState } from "react";

export default function LoadingScreen({ progress, onFinish }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setDone(true);

      const timer = setTimeout(() => {
        onFinish?.();
      }, 700); // match duration-700

      return () => clearTimeout(timer);
    }
  }, [progress, onFinish]);

  return (
    <div
      className={`
        fixed inset-0 z-[999]
        flex flex-col items-center justify-center
        bg-white text-[#1a1a1a]
        backdrop-blur-md
        transition-all duration-700
        ${done ? "opacity-0 backdrop-blur-0" : "opacity-100 backdrop-blur-md"}
      `}
    >
      <h1 className="text-3xl font-extrabold mb-8">
        Loading {progress}%
      </h1>

      <div className="w-64 h-2 bg-[#1a1a1a]/10 rounded overflow-hidden">
        <div
          className="h-full bg-[#1a1a1a] transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
