import { useRouter } from "next/router"; // ✅ Pages Router

export default function Navbar() {
  const router = useRouter();
  return (
    <div>
      <button className="menuButtons" onClick={() => router.push("/homepage")}>
        Games
      </button>
      <button
        className="menuButtons"
        onClick={() => router.push("/discover/explore")}
      >
        Discover
      </button>
    </div>
  );
}
