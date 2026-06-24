"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import type { games } from "../../types/games";
import API from "../../services/api";
import Modals from "../../components/modals/index";

const Homepage = () => {
  const [allGames, setAllGames] = useState<games[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<games | null>(null);

  const getGames = async () => {
    setLoading(true);
    try {
      const response = await API.get(`${process.env.NEXT_PUBLIC_API_URL}`);
      setAllGames(response.data);
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
    <div className="bg-red-500">
      {allGames.map((game) => (
        <div key={game.id}>
          <p>{game.name}</p>
          <Image
            alt={"logo"}
            src={game.photoGame}
            width={150}
            height={150}
            onClick={() => {
              console.log("clicked", game.name);
              setSelectedGame(game);
              setOpen(true);
            }}
          />
        </div>
      ))}

      {/*trendy games*/}
      <div className="bg-blue-500">
        <h2 className="text-2xl font-bold mb-4">Trending Games</h2>
        {allGames
          .filter((game) => game.istrending)
          .map((trendyGame) => (
            <div key={trendyGame.id}>
              <p>{trendyGame.name}</p>
              <Image
                alt={"logo"}
                src={trendyGame.photoGame}
                width={150}
                height={150}
                onClick={() => {
                  console.log("clicked", trendyGame.name);
                  setSelectedGame(trendyGame);
                  setOpen(true);
                }}
              />
            </div>
          ))}
      </div>

      {/* new games */}
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
      </div>

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

            <img src={selectedGame.photoGame} className="w-80 mt-2" />

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
};

export default Homepage;
