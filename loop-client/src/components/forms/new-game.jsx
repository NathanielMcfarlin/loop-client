import { useNavigate } from "react-router-dom";
import { createGame } from "../../services/gameServices";
import { useEffect, useState } from "react";
import { getPlatform } from "../../services/platformService";

export const NewGame = () => {
  const [game, setGame] = useState({
    title: "",
    game_image_url: "",
    platform: 0
  });
  const [platforms, setPlatforms] = useState([]);
  let navigate = useNavigate();

  const updateGame = (e) => {
    const copy = { ...game };
    copy[e.target.id] = e.target.value;
    setGame(copy);
  };

  const updatePlatform = (e) => {
    const copy = { ...game };
    copy.platform = e.target.value;
    setGame(copy);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newGame = {
      title: game.title,
      game_image_url: game.game_image_url,
      platform: parseInt(game.platform, 10)
    };

    createGame(newGame).then(() => {
      // Assuming the created game response has an ID
      // Use the created game's ID to navigate
      navigate(`/`);
    });
  };

  const getAndSetPlatforms = () => {
    getPlatform().then((platformArray) => {
      setPlatforms(platformArray);
    });
  };

  useEffect(() => {
    getAndSetPlatforms();
  }, []);

  return (
    <main>
      <form onSubmit={handleSave}>
        <div>
          <h1>NEW GAME FORM</h1>
        </div>
        <div>
          <fieldset>
            <div>
              <label>Title:</label>
              <input
                id="title"
                onChange={updateGame}
                type="text"
                value={game.title}
                required
              />
              <label>Image:</label>
              <input
                id="game_image_url"
                onChange={updateGame}
                type="text"
                value={game.game_image_url}
                required
              />
              <label>Platform:</label>
              <select
                id="platform"
                onChange={updatePlatform}
                value={game.platform}
                required
              >
                <option value="">Select a platform</option>
                {platforms.map((platform) => (
                  <option key={platform.platform} value={platform.id}>
                    {platform.platform}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </div>
        <button type="submit">Create Game</button>
      </form>
    </main>
  );
};
