import Navbar from "./components/Navbar";
import Timer from "./components/Timer";

export default function App() {
  return (
    <main className="min-h-screen bg-[#f5efe6] text-[#1a1a1a] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center">
        <Timer />
      </div>
    </main>
  );
}
