"use client";

import type { games } from "../../types/games";

type ResumePageProps = {
	game: games | null;
};

const ResumePage = ({ game }: ResumePageProps) => {
	if (!game) {
		return <p>Aucun jeu sélectionné.</p>;
	}

	return (
		<div className="flex flex-col gap-3 md:gap-5">
			<div className="flex justify-between items-start">
				<div className="flex flex-wrap gap-2 md:gap-3">
					<div className="rounded-full border-2 px-2 md:px-4 py-1 md:py-1 flex items-center justify-center">
						<span className="text-sm md:text-base italic font-semibold mb-2 justify-center  flex items-center translate-y-1">
							{game.genre}
						</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="uppercase font-semibold italic">Résumé</h2>
				{/* 
				<p className="text-sm md:text-base">{game.description}</p> */}
				<p className="text-sm md:text-base">{game.storyline}</p>

				{/* <h2 className="uppercase font-semibold italic">Producteur</h2> */}

				{/* <p className="text-sm md:text-base">{game.producer}</p> */}

				{/* <p className="text-sm md:text-base">{game.description}</p> */}
			</div>
		</div>
	);
};

export default ResumePage;
