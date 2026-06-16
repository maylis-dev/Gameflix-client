"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import API from "@/services/api";
import { games } from "@/types/games";
import Modals from "@/components/modals";

export default function Discover() {
  const [selectedGames, setSelectedGames] = useState<games[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  // NEW: stores the chosen genre
  const [selectedGenre, setSelectedGenre] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<games | null>(null);
  const [classement, setClassement] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const router = useRouter();

  const getGames = async () => {
    try {
      const response = await API.get(`${process.env.NEXT_PUBLIC_API_URL}`);

      setSelectedGames(response.data);
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

  const genres = [...new Set(selectedGames.map((game) => game.genre))];

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a game..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => router.push(`/discover/search?query=${search}`)}>
        Search
      </button>

      {/* NEW: Genre dropdown */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>

        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* NEW: Classement dropdown */}
      {selectedGames
        .filter((game) => (selectedGenre ? game.genre === selectedGenre : true))
        .map((game) => (
          <div key={game.id}>
            <p>{game.name}</p>

            <p>Genre: {game.genre}</p>

            <Image
              alt="image"
              src={game.photoGame}
              style={{
                width: "150px",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`/discover/${game.id}`);
              }}
            />
          </div>
        ))}

      {
        <select
          value={classement}
          onChange={(e) => setClassement(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="popularity-asc">Popularity (Low to High)</option>
          <option value="popularity-desc">Popularity (High to Low)</option>
          <option value="dateRelease">Release Date</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      }

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
          <div key={game.id}>
            <p>{game.name}</p>
            <p>Genre: {game.genre}</p>
            <Image
              alt=""
              src={game.photoGame}
              style={{
                width: "150px",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`/discover/${game.id}`);
              }}
            />
          </div>
        ))}

      <select
        value={classement}
        onChange={(e) => setClassement(e.target.value)}
      >
        <option value="">all</option>
        {genres.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {selectedGames
        .filter((game) =>
          selectedLanguage ? game.language === selectedLanguage : true,
        )
        .map((game) => (
          <div key={game.id}>
            <p>{game.name}</p>
            <p>Language: {game.language}</p>
            <Image
              alt=""
              src={game.photoGame}
              style={{
                width: "150px",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`/discover/${game.id}`);
              }}
            />
          </div>
        ))}
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

            <Image alt="" src={selectedGame.photoGame} className="w-80 mt-2" />

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
              className="text-blue-500 underline"
            >
              Buy / Store Link
            </a>

            <br />

            <a
              href={selectedGame.trailerUrl}
              target="_blank"
              className="text-red-500 underline"
            >
              Watch Trailer
            </a>
          </div>
        )}
      </Modals>
    </div>
  );
}
