"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import API from "@/services/api";
import { games } from "@/types/games";
import Modals from "@/components/modals";

export default function Discover() {
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

  const handleSearch = () => {
    const results = selectedGames.filter((game) => {
      const matchesGenre = selectedGenre === "" || game.genre === selectedGenre;

      const matchesName =
        search === "" || game.name.toLowerCase().includes(search.toLowerCase());

      return matchesGenre && matchesName;
    });

    setSearchedGames(results);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  const platforms = [...new Set(selectedGames.map((game) => game.platform))];
  const genres = [...new Set(selectedGames.map((game) => game.genre))];
  const language = [...new Set(selectedGames.map((game) => game.language))];
  const releaseDates = [
    ...new Set(selectedGames.map((game) => game.releaseDate)),
  ];

  return (
    <div className="p-4">
      {/* Search by name */}
      <input
        type="text"
        placeholder="Game name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mr-2"
      />

      {/* Genre selection */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="border p-2 rounded mr-2"
      >
        <option value="">Select a genre</option>

        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Language selection */}
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="border p-2 rounded mr-2"
      >
        <option value="">Select a language</option>

        {language.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>

      {/* Platform selection */}
      <select
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
        className="border p-2 rounded mr-2"
      >
        <option value="">Select a platform</option>

        {platforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>

      {/* Filter by ranking */}
      <select
        value={classement}
        onChange={(e) => setClassement(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="dateRelease">filter by</option>
        <option value="dateRelease">Release Date</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="popularity-asc">Popularity (Low to High)</option>
        <option value="popularity-desc">Popularity (High to Low)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>

      {selectedGames
        .sort((a, b) => {
          if (classement === "dateRelease") {
            return (
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime()
            );
          }
          if (classement === "popularity-asc")
            return a.popularity - b.popularity;
          if (classement === "popularity-desc")
            return b.popularity - a.popularity;
          if (classement === "name-asc") return a.name.localeCompare(b.name);
          if (classement === "name-desc") return b.name.localeCompare(a.name);
          if (classement === "price-asc") return a.price - b.price;
          if (classement === "price-desc") return b.price - a.price;
          if (classement === "genre-asc") return a.genre.localeCompare(b.genre);
          if (classement === "genre-desc")
            return b.genre.localeCompare(a.genre);
          return 0;
        })
        .map((game) => (
          <div key={game.id} className="hidden" />
        ))}

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {searchedGames.map((game) => (
          <div key={game.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{game.name}</h2>

            <p>Genre: {game.genre}</p>

            <Image
              src={game.photoGame}
              alt={game.name}
              width={250}
              height={150}
              className="cursor-pointer mt-2"
              onClick={() => {
                setSelectedGame(game);
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
        }}
      >
        {selectedGame && (
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">{selectedGame.name}</h1>

            <Image
              alt={selectedGame.name}
              src={selectedGame.photoGame}
              width={300}
              height={200}
              className="w-full mt-2"
            />

            <p>
              <strong>Description:</strong> {selectedGame.description}
            </p>

            <p>
              <strong>Genre:</strong> {selectedGame.genre}
            </p>

            <p>
              <strong>Platform:</strong> {selectedGame.platform}
            </p>

            <p>
              <strong>Producer:</strong> {selectedGame.producer}
            </p>

            <p>
              <strong>Studio:</strong> {selectedGame.studio}
            </p>

            <p>
              <strong>Language:</strong> {selectedGame.language}
            </p>

            <p>
              <strong>Status:</strong> {selectedGame.status}
            </p>

            <p>
              <strong>Price:</strong> {selectedGame.price} €
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {selectedGame.rating}
            </p>

            <p>
              <strong>Popularity:</strong> {selectedGame.popularity}
            </p>

            <p>
              <strong>Release Date:</strong>{" "}
              {new Date(selectedGame.releaseDate).toLocaleDateString()}
            </p>

            {selectedGame.istrending && (
              <p className="text-green-500 font-bold">🔥 Trending</p>
            )}

            <a
              href={selectedGame.shopLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline block mt-2"
            >
              Buy / Store Link
            </a>

            <a
              href={selectedGame.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 underline block mt-2"
            >
              Watch Trailer
            </a>
          </div>
        )}
      </Modals>
    </div>
  );
}
