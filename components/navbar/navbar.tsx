import Link from "next/link";

const Navbar = () => (
  <div className="flex gap-4 p-4 bg-blue-950 text-white border-b border-blue-800">
    <Link
      href={"/homepage"}
      className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition"
    >
      Games
    </Link>
    <Link
      href={"/discover/explore"}
      className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-600 transition"
    >
      Discover
    </Link>
  </div>
);

export default Navbar;
