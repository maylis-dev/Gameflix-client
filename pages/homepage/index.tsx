"use client";

import { useEffect, useState } from "react";
import type { games } from "../../types/games";
import API from "../../services/api";
import Modals from "../../components/modals/index";
import Navbar from "@/components/navbar/navbar";
import index from "../discover/explore/index";

type Props = {
  games: games[];
};

export default function Homepage({ games }: Props) {
  const [allGames, setAllGames] = useState<games[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<games | null>(null);

  const getGames = async () => {
    try {
      const response = await API.get(`${process.env.NEXT_PUBLIC_API_URL}`);

      setAllGames(response.data);
    } catch (error) {
      console.log("failed to fetch games");
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
    <div>
      <Navbar />
      {allGames.map((game) => (
        <div key={game.id}>
          <p>{game.name}</p>

          <img
            src={game.photoGame}
            style={{
              width: "150px",
              cursor: "pointer",
            }}
            onClick={() => {
              console.log("clicked", game.name);
              setSelectedGame(game);
              setOpen(true);
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
}
