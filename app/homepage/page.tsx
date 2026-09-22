"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import globals from "../globals.css";
import ResumePage from "./resumepage";
import Footer from "../../components/footer/footer";
import type { games } from "../../types/games";
import API from "../../services/api";
import Modals from "../../components/modals/index";
import InfoPage from "./infopage";
import futura from "../font";

type InfoPageProps = {
	game: games | null;
};

const Homepage = () => {
	const [allGames, setAllGames] = useState<games[]>([]);
	const [showResume, setShowResume] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedGame, setSelectedGame] = useState<games | null>(null);

	const getGames = async () => {
		setLoading(true);
		try {
			//const response = await API.get(`${process.env.NEXT_PUBLIC_API_URL}`);
			//setAllGames(response.data);
			const response = await API.get(`${process.env.NEXT_PUBLIC_API_URL}`);

			console.log(response.data);

			setAllGames(response.data);
			return;
		} catch (error) {
			console.log("failed to fetch games: ", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getGames();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="">
			{/* All Games */}
			{/* <div className="bg-gray-800 flex flex-col  justify-start p-4  shadow-md gap-4 overflow-x-auto">
				<h2 className="text-2xl font-bold uppercase italic justify-start">
					All Games
				</h2>
				<div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
					{allGames.map((game) => (
						<div
							key={game.id}
							className="flex-shrink-0">
							
							<Image
								className="object-cover w-50 h-80 border rounded-lg shadow-md cursor-pointer hover:scale-102 transition-transform duration-300"
								alt={"logo"}
								src={game.photoGame}
								width={150}
								height={150}
								onClick={() => {
									console.log("clicked", game.name);
									setSelectedGame(game);
									setShowResume(true);
									setShowInfo(false);
									setOpen(true);
								}}
							/>
						</div>
					))}
				</div>
			</div> */}

			{/*trendy games*/}
			<div className="bg-gray-800  flex flex-col  justify-start p-4  shadow-md gap-4 overflow-x-auto ">
				<div>
					<h2 className="text-2xl font-bold uppercase italic  mb-3">
						Trendy Games
					</h2>
					<div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
						{allGames
							.filter((game) => game.istrending)
							.map((trendyGame) => (
								<div
									key={trendyGame.id}
									className="flex-shrink-0">
									{/* <p>{trendyGame.name}</p> */}
									<Image
										className="object-cover w-50 h-80 border rounded-lg shadow-md cursor-pointer hover:scale-102 transition-transform duration-300"
										alt={"logo"}
										src={trendyGame.photoGame}
										width={150}
										height={150}
										onClick={() => {
											console.log("clicked", trendyGame.name);
											setSelectedGame(trendyGame);
											setShowResume(true);
											setShowInfo(false);
											setOpen(true);
										}}
									/>
								</div>
							))}
					</div>
				</div>
			</div>

			{/* Most Recent Games */}
			<div className="bg-gray-800 flex flex-col justify-start p-4  shadow-md gap-4 overflow-x-auto">
				<h2 className="text-2xl font-bold uppercase italic mb-3">
					Most Recent Games
				</h2>

				<div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
					{[...allGames]
						.sort(
							(a, b) =>
								new Date(b.releaseDate).getTime() -
								new Date(a.releaseDate).getTime(),
						)
						.slice(0, 6)
						.map((newGame) => (
							<div
								key={newGame.id}
								className="flex-shrink-0">
								<Image
									className="object-cover w-50 h-80 border rounded-lg shadow-md cursor-pointer hover:scale-102 transition-transform duration-300"
									alt={newGame.name}
									src={newGame.photoGame}
									width={150}
									height={150}
									onClick={() => {
										console.log("clicked", newGame.name);
										setSelectedGame(newGame);
										setShowResume(true);
										setShowInfo(false);
										setOpen(true);
									}}
								/>
							</div>
						))}
				</div>
			</div>

			{/* new games
			<div>
				<h2 className="text-2xl font-bold mb-4">New Games</h2>

				{allGames
					.filter((game) => {
						const releaseDate = new Date(game.releaseDate);
						const currentDate = new Date();
						const oneMonthAgo = new Date();
						oneMonthAgo.setMonth(currentDate.getMonth() - 1);
						return releaseDate >= oneMonthAgo && releaseDate <= currentDate;
					})
					.map((newGame) => (
						<div key={newGame.id}>
							<p>{newGame.name}</p>
							<Image
								className="object-cover w-50 h-80 border rounded-lg shadow-md cursor-pointer hover:scale-102 transition-transform duration-300"
								alt={"logo"}
								src={newGame.photoGame}
								width={150}
								height={150}
								onClick={() => {
									console.log("clicked", newGame.name);
									setSelectedGame(newGame);
									setOpen(true);
								}}
							/>
						</div>
					))}
			</div> */}

			{/* Modal */}
			{/* Modal */}
			<Modals
				isOpen={open}
				onClose={() => {
					setOpen(false);
					setSelectedGame(null);
					setShowResume(false);
					setShowInfo(false);
				}}>
				{selectedGame && (
					<div className="relative w-full">
						{/* Croix rouge */}
						<div className="absolute left-10 right-10 top-4 z-50 flex items-start">
							<p
								className=" mt-2 max-w-[70%] w-fit rounded-lg bg-black/70 px-2 py-1 text-xs text-white md:text-sm futura normal"
								style={futura.style}>
								{selectedGame.description}
							</p>

							<button
								type="button"
								className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xl font-bold text-white hover:bg-gray-800"
								onClick={() => {
									setOpen(false);
									setSelectedGame(null);
									setShowResume(false);
									setShowInfo(false);
								}}>
								✕
							</button>
						</div>

						{/* First block in pictures */}

						{/* <div
								className="relative h-[250px] w-full bg-cover bg-center bg-no-repeat sm:h-[300px] md:h-[400px] lg:h-[450px]"
								style={{
									backgroundImage: `url(${selectedGame.headerImage})`,
								}}>
								
								<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black">
									<div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-4 pb-4 md:flex-row md:items-end md:px-10">
										<div className="flex-1 text-center text-white md:text-left">
											<h1 className="text-lg font-semibold italic uppercase sm:text-2xl md:text-3xl">
												{selectedGame.name}
											</h1>

											<p className="text-sm text-white md:text-base">
												{new Date(selectedGame.releaseDate).getFullYear()} ·{" "}
												{selectedGame.platform}
											</p>
										</div>

										<div className="flex-1 text-center text-white md:text-right">
											<div className="flex justify-center md:justify-end">
												{[1, 2, 3, 4, 5].map((star) => (
													<span
														key={star}
														className={
															star <= selectedGame.rating
																? "text-xl text-yellow-400"
																: "text-xl text-gray-500"
														}>
														★
													</span>
												))}
											</div>

											<p className="text-sm md:text-base">
												{selectedGame.rating} ★ votes
											</p>
										</div>
									</div>
								</div>
							</div> */}
						<div
							className="relative h-[250px] w-full bg-cover bg-center bg-no-repeat sm:h-[300px] md:h-[350px] lg:h-[400px]"
							style={{
								backgroundImage: `url(${selectedGame.headerImage})`,
							}}>
							<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black">
								<div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-4 pb-3 md:flex-row md:items-end md:px-8">
									<div className="flex-1 text-center text-white md:text-left">
										<h1
											className="text-base font-semibold italic uppercase sm:text-xl md:text-2xl futura italic"
											style={futura.style}>
											{selectedGame.name}
										</h1>

										<p
											className="text-xs text-white/90 sm:text-sm md:text-sm futura normal"
											style={futura.style}>
											{new Date(selectedGame.releaseDate).getFullYear()} ·{" "}
											{selectedGame.platform?.replace(/,\s*/g, " · ")}
										</p>
									</div>

									<div className="mt-2 flex-1 text-center text-white md:mt-0 md:text-right">
										<div className="flex justify-center md:justify-end">
											{[1, 2, 3, 4, 5].map((star) => (
												<span
													key={star}
													className={
														star <= selectedGame.rating
															? "text-base text-yellow-400 sm:text-lg"
															: "text-base text-gray-500 sm:text-lg"
													}>
													★
												</span>
											))}
										</div>

										<p
											className="text-xs sm:text-sm md:text-sm futura normal"
											style={futura.style}>
											{selectedGame.rating} ★ votes
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-black flex flex-col md:flex-row justify-between gap-4 md:gap-10 p-8 text-white">
							{/* Second block */}
							<div>
								<nav className="flex flex-col md:flex-row items-center md:items-start md:justify-start gap-2 md:gap-10 text-gray-300">
									<button
										type="button"
										onClick={() => {
											setShowResume(true);
											setShowInfo(false);
										}}
										className={`text-lg md:text-xl uppercase font-semibold italic futura italic px-2 py-1 ${
											showResume
												? "border-b-2 border-white text-white"
												: "text-gray-300"
										}`}>
										En résumé
									</button>

									<button
										type="button"
										onClick={() => {
											setShowResume(false);
											setShowInfo(true);
										}}
										className="text-lg md:text-xl uppercase font-semibold italic   futura italic focus:border-b-2 focus:border-white hover: text-white">
										Info
									</button>
								</nav>

								<div className="mt-5">
									{showResume && <ResumePage game={selectedGame} />}

									{showInfo && <InfoPage game={selectedGame} />}
								</div>
							</div>

							{/* {troissiemen blocks sur le cote} */}
							<div
								className="flex flex-col  gap-2 bg-neutral-800 p-4 rounded-lg shadow-md  futura italic"
								style={futura.style}>
								<h2
									className="uppercase font-semibold futura italic"
									style={futura.style}>
									Language
								</h2>
								<p
									className="text-sm md:text-base futura normal"
									style={futura.style}>
									{selectedGame.language}
								</p>

								<h2
									className="uppercase font-semibold futura italic"
									style={futura.style}>
									Date de sortie
								</h2>

								<p
									className="text-sm md:text-base futura normal"
									style={futura.style}>
									{new Date(selectedGame.releaseDate).toLocaleDateString()}
								</p>

								{/* <p>
									<strong>Status:</strong> {selectedGame.status}
								</p> */}
								<h2 className="uppercase font-semibold italic">Prix</h2>
								<p className="text-sm md:text-base">{selectedGame.price} €</p>

								<button>
									<a
										href={selectedGame.shopLink}
										target="_blank"
										rel="noopener noreferrer"
										className="bg-white hover:bg-blue-700 py-1 px-10 mt-4 text-black font-bold rounded-md md:px-4 md:py-1 text-sm md:text-base w-full text-center whitespace-nowrap">
										Voir le jeu
									</a>
								</button>
							</div>
						</div>
					</div>
				)}
			</Modals>
		</div>
	);
};

export default Homepage;
