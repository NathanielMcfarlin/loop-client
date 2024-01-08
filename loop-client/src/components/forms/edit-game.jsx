import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editGame, getGames } from "../../services/gameServices";


export const EditGame = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState({
    id: gameId,
    title: "",
    game_image_url: "",
    platform: "",
  });

  const fetchGame = () => {
    getGames(gameId).then((fetchedGame) => {
      setGame(fetchedGame);
    });
  };

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  const updateGameData = (e) => {
    setGame({ ...game, [e.target.id]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editGame(game).then((updatedGame) => {
      // Assuming the updated game response includes the updated game details
      Navigate(`/game/${updatedGame.id}`);
    });
  };

  return (
    <main>
      <form onSubmit={handleUpdate}>
        <div>
          <h1>EDIT GAME FORM</h1>
        </div>
        <div>
          <fieldset>
            <div>
              <label>Title:</label>
              <input
                id="title"
                onChange={updateGameData}
                type="text"
                value={game.title}
                required
              />
              <label>Image:</label>
              <input
                id="game_image_url"
                onChange={updateGameData}
                type="text"
                value={game.game_image_url}
                required
              />
              <label>Platform:</label>
              <input
                id="platform"
                onChange={updateGameData}
                type="text"
                value={game.platform}
                required
              />
            </div>
          </fieldset>
        </div>
        <button type="submit">Update Game</button>
      </form>
    </main>
  );
};
