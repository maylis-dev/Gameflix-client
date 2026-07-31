import Link from "next/link";

const Navbar = () => (
  <div className="grid grid-cols-1 justify-items-center
  md:flex md:flex-row gap-5 items-center
  px-5 py-4 bg-black text-white">
  <h1>Gameflix</h1>


    

    <div>
    <Link
      href={"/homepage"}
      className="px-4 py-2 rounded text-gray-400 hover:text-white transition focus:text-white focus:outline-violet-500"
    >
      Games
    </Link>
    <Link
      href={"/discover/explore"}
      className="px-4 py-2 rounded text-gray-400 hover:text-white transition focus:text-white focus:outline-violet-500"
    >
      Discover
    </Link>
    </div>

  </div>
);

export default Navbar;
