"use client";

import type { games } from "../../types/games";

type InfoPageProps = {
	game: games | null;
};

const InfoPage = ({ game }: InfoPageProps) => {
	if (!game) return <p>Aucun jeu sélectionné.</p>;

	return (
		<div>
			<h2 className="uppercase font-semibold italic">Studio</h2>

			<p>{game.studio}</p>

			<img
				src={game.studiophoto}
				className="w-full h-auto rounded-lg img-fluid"
			/>
		</div>
	);
};

export default InfoPage;
