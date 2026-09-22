"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import API from "@/services/api";
import { games } from "@/types/games";
import Modals from "@/components/modals";
import ResumePage from "@/app/homepage/resumepage";
import InfoPage from "@/app/homepage/infopage";
import futura from "@/app/font";

export default function Discover() {
	const [searchLoading, setSearchLoading] = useState(false);
	const [showResume, setShowResume] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [selectedGames, setSelectedGames] = useState<games[]>([]);
	const [searchedGames, setSearchedGames] = useState<games[]>([]);
	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [loading, setLoading] = useState(true);
	const [classement, setClassement] = useState("");
	const [selectedPlatform, setSelectedPlatform] = useState("");
	const [selectedGenre, setSelectedGenre] = useState("");
	const [search, setSearch] = useState("");

	const [open, setOpen] = useState(false);
	const [selectedGame, setSelectedGame] = useState<games | null>(null);
	const [releaseDate, setReleaseDate] = useState("");

	const getGames = async () => {
		try {
			const response = await API.get(`${process.env.NEXT_PUBLIC_API_URL}`);

			setSelectedGames(response.data);
		} catch (error) {
			console.log("Failed to fetch games:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getGames();
	}, []);

	// const handleSearch = () => {
	// 	const results = selectedGames.filter((game) => {
	// 		const matchesGenre = selectedGenre === "" || game.genre === selectedGenre;

	// 		const matchesName =
	// 			search === "" || game.name.toLowerCase().includes(search.toLowerCase());

	// 		return matchesGenre && matchesName;
	// 	});

	// 	setSearchedGames(results);
	// };

	const handleSearch = () => {
		const results = selectedGames.filter((game) => {
			const matchesGenre = selectedGenre === "" || game.genre === selectedGenre;

			const matchesName =
				search === "" || game.name.toLowerCase().includes(search.toLowerCase());

			const matchesLanguage =
				selectedLanguage === "" || game.language === selectedLanguage;

			const matchesPlatform =
				selectedPlatform === "" ||
				game.platform
					.split(",")
					.map((platform) => platform.trim())
					.includes(selectedPlatform);

			return matchesGenre && matchesName && matchesLanguage && matchesPlatform;
		});

		setSearchedGames(results);
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	const genres = [...new Set(selectedGames.map((game) => game.genre))];
	const language = [...new Set(selectedGames.map((game) => game.language))];
	const platforms = [
		...new Set(
			selectedGames.flatMap((game) =>
				game.platform.split(",").map((platform) => platform.trim()),
			),
		),
	];
	const releaseDates = [
		...new Set(selectedGames.map((game) => game.releaseDate)),
	];

	return (
		<div className="p-4">
			{/* block search */}

			<div className="bg-black p-4 rounded-lg   pyshadow-md flex flex-col gap-6 py-8 items-center justify-center md:flex-row md:py-5 md:w-full md:justify-center md:items-center md:gap-4">
				<input
					type="text"
					placeholder="name..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full h-9 px-4 rounded-xl  bg-neutral-900 text-white futura normal text-sm"
				/>

				<select
					value={selectedGenre}
					onChange={(e) => setSelectedGenre(e.target.value)}
					className="w-full h-9 px-4 rounded-xl  bg-neutral-900 text-white futura normal text-sm ">
					<option value="">Genre</option>

					{genres.map((genre) => (
						<option
							key={genre}
							value={genre}>
							{genre}
						</option>
					))}
				</select>

				<select
					value={selectedLanguage}
					onChange={(e) => setSelectedLanguage(e.target.value)}
					className="w-full h-9 px-4 rounded-xl  bg-neutral-900 text-white futura normal text-sm">
					<option value="">Language</option>

					{language.map((language) => (
						<option
							key={language}
							value={language}>
							{language}
						</option>
					))}
				</select>

				<select
					value={selectedPlatform}
					onChange={(e) => setSelectedPlatform(e.target.value)}
					className="w-full h-9 px-4 rounded-xl   bg-neutral-900 text-white futura normal text-sm">
					<option value="">Platform</option>

					{platforms.map((platform) => (
						<option
							key={platform}
							value={platform}>
							{platform}
						</option>
					))}
				</select>

				<select
					value={classement}
					onChange={(e) => setClassement(e.target.value)}
					className="w-full h-9 px-4 rounded-xl  bg-neutral-900 text-white futura normal text-sm ">
					<option value="">Filter by</option>
					<option value="dateRelease">Release Date</option>
					<option value="name-asc">Name (A-Z)</option>
					<option value="name-desc">Name (Z-A)</option>
					<option value="popularity-asc">Popularity (Low to High)</option>
					<option value="popularity-desc">Popularity (High to Low)</option>
					<option value="price-asc">Price (Low to High)</option>
					<option value="price-desc">Price (High to Low)</option>
				</select>

				<button
					onClick={handleSearch}
					className="w-full h-9 bg-neutral-600 text-white rounded-xl futura normal text-sm hover:bg-neutral-700 transition-colors duration-300 md:w-auto md:px-4">
					Search
				</button>
			</div>

			{/* Results */}
			<div className=" p-4 rounded-lg flex   mt-4">
				<div className=" flex flex-wrap gap-4 mt-6  justify-center items-center">
					{searchedGames.map((game) => (
						<div
							key={game.id}
							className="">
							<Image
								src={game.photoGame}
								alt={game.name}
								width={250}
								height={150}
								className="cursor-pointer mt-2 hover:scale-105 transition-transform duration-300 rounded-xl w-50 h-70 object-cover"
								onClick={() => {
									setSelectedGame(game);
									setShowResume(true);
									setShowInfo(false);
									setOpen(true);
								}}
							/>
						</div>
					))}
				</div>

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
		</div>
	);
}
