"use client";

import type { games } from "../../types/games";
import futura from "../font";

type InfoPageProps = {
	game: games | null;
};

const InfoPage = ({ game }: InfoPageProps) => {
	if (!game) return <p>Aucun jeu sélectionné.</p>;

	return (
		<div className="flex flex-col items-center justify-start gap-2 rounded-lg bg-gray-900 transition-colors duration-300 p-4 text-white shadow-md md:p-6">
			<h2
				className="text-center text-lg font-semibold md:text-lg italic uppercase futura italic"
				style={futura.style}>
				Studio
			</h2>

			{/* <p className="text-center text-sm">{game.studio}</p> */}

			<img
				src={game.studiophoto}
				alt={`Studio ${game.studio}`}
				className="mt-3 h-30 w-32 rounded-md object-cover md:h-40 md:w-42"
			/>
		</div>
	);
};

export default InfoPage;
