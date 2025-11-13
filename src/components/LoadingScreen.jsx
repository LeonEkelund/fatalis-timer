// src/components/LoadingScreen.jsx
export default function LoadingScreen({ progress }) {
  return (
    <div
      className="
        fixed inset-0 z-[999]
        bg-[#f5efe6] text-[#1a1a1a]
        flex flex-col items-center justify-center
        font-sans
        transition-opacity duration-700
      "
    >
      <h1 className="text-3xl font-extrabold mb-8">
        Loading {progress}%
      </h1>

      {/* Loading bar */}
      <div className="w-64 h-2 bg-[#1a1a1a]/10 rounded overflow-hidden">
        <div
          className="h-full bg-[#1a1a1a] transition-[width] duration-80"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
