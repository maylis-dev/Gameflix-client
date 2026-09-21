"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import API from "@/services/api";
import { games } from "@/types/games";
import Modals from "@/components/modals";
import ResumePage from "@/app/homepage/resumepage";
import InfoPage from "@/app/homepage/infopage";

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
					placeholder="Game name..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full h-9 px-4 rounded-xl  bg-neutral-900 text-white"
				/>

				<select
					value={selectedGenre}
					onChange={(e) => setSelectedGenre(e.target.value)}
					className="w-full h-9 px-4 rounded-xl  bg-neutral-900 text-white">
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
					className="w-full h-9 px-4 rounded-xl  bg-neutral-900 text-white">
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
					className="w-full h-9 px-4 rounded-xl   bg-neutral-900 text-white">
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
					className="w-full h-9 px-4 rounded-xl  bg-neutral-900 text-white">
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
					className="w-full h-9 bg-neutral-600 text-white rounded-xl">
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
							<button
								type="button"
								className="absolute right-10 top-10 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black text-xl font-bold text-white hover:bg-gray-800"
								onClick={() => {
									setOpen(false);
									setSelectedGame(null);
									setShowResume(false);
									setShowInfo(false);
								}}>
								✕
							</button>

							{/* First block in pictures */}

							<div
								className="bg-neutral-700 flex justify-center aspect-video relative
				px-8 md:px-15 md:pt-72 pb-4 bg-cover bg-center bg-no-repeat"
								style={{
									backgroundImage: `url(${selectedGame.headerImage})`,
								}}>
								{/* Gradient overlay in pictures */}
								<div className="absolute z-0 left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent from-50%  to-black to-100%">
									<div className="absolute md:px-10 bottom-0 md:bottom-5 left-0 right-0 flex z-10 flex-col md:flex-row items-center md:items-end bg-gradient-to-b from-transparent from-50% to-black to-100%">
										<div className="flex-1 flex flex-col items-center md:items-start text-white">
											<h1 className="text-lg sm:text-2xl md:text-3xl text-center md:text-left uppercase font-semibold italic text-white">
												{selectedGame.name}
											</h1>
											<p className="text-sm md:text-base text-center md:text-left text-white">
												{/* {new Date(selectedGame.releaseDate).toLocaleDateString()}. */}
												{new Date(selectedGame.releaseDate).getFullYear()} .
												{selectedGame.platform}
											</p>
										</div>

										<div className="flex-1 flex flex-col items-center md:items-end text-white">
											<div className="flex">
												{[1, 2, 3, 4, 5].map((star) => (
													<span
														key={star}
														className={
															star <= selectedGame.rating
																? "text-yellow-400 text-xl"
																: "text-gray-500 text-xl"
														}>
														★
													</span>
												))}
											</div>

											<p className="text-sm md:text-base text-center md:text-left text-white">
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
											className={`text-lg md:text-xl uppercase font-semibold italic px-2 py-1 ${
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
											className="text-lg md:text-xl uppercase font-semibold italic  focus:border-b-2 focus:border-white hover: text-white">
											Info
										</button>
									</nav>

									<div className="mt-5">
										{showResume && <ResumePage game={selectedGame} />}

										{showInfo && <InfoPage game={selectedGame} />}
									</div>
								</div>

								{/* {troissiemen blocks sur le cote} */}
								<div className="flex flex-col  gap-2 bg-neutral-800 p-4 rounded-lg shadow-md ">
									<h2 className="uppercase font-semibold italic">Language</h2>
									<p className="text-sm md:text-base">
										{selectedGame.language}
									</p>

									<h2 className="uppercase font-semibold italic">
										Date de sortie
									</h2>

									<p className="text-sm md:text-base">
										{new Date(selectedGame.releaseDate).toLocaleDateString()}
									</p>

									{/* <p>
									<strong>Status:</strong> {selectedGame.status}
								</p> */}
									<h2 className="uppercase font-semibold italic">Prix</h2>
									<p className="text-sm md:text-base">{selectedGame.price} €</p>

									<button>
										<a
											// href={selectedGame.link}
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
