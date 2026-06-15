import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="flex gap-4 p-4 bg-blue-950 text-white border-b border-blue-800">
      <button
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition"
        onClick={() => router.push("/homepage")}
      >
        Games
      </button>

      <button
        className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-600 transition"
        onClick={() => router.push("/discover/explore")}
      >
        Discover
      </button>
    </div>
  );
}
