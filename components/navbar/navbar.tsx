import Link from "next/link";
import futura from "@/app/font";
const Navbar = () => (
	<div
		className="grid grid-cols-1 justify-items-center
 md:flex md:flex-row items-center relative gap-5
  px-5 py-4 bg-black text-white">
		<h2
			className={
				" font-bold italic font  uppercase + futura.className text-2xl md:text-3xl text-center md:text-left"
			}>
			Gameflix
		</h2>

		<div className="flex flex-row gap-5 translate-y-1 items-center justify-center ">
			<Link
				href={"/homepage"}
				className={
					futura.className +
					" duration-100 italic uppercase font-semibold text-base md:text-lg rounded text-gray-400 hover:text-white transition focus:text-white focus:outline-violet-500"
				}>
				Games
			</Link>
			<Link
				href={"/discover/explore"}
				className={
					futura.className +
					" duration-100 italic uppercase font-semibold text-base md:text-lg rounded text-gray-400 hover:text-white transition focus:text-white focus:outline-violet-500"
				}>
				Discover
			</Link>
		</div>
	</div>
);

export default Navbar;
