import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editGame, getGameById } from "../../services/gameServices";
import { getPlatform } from "../../services/platformService";

export const EditGame = () => {
  let { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [platforms, setPlatforms] = useState([]);

  const fetchGame = () => {
    getGameById(gameId).then((fetchedGame) => {
      setGame(fetchedGame);
    });
  };

  const fetchPlatforms = () => {
    // Assuming you have a service function getAllPlatforms to fetch all platforms
    getPlatform().then((allPlatforms) => {
      setPlatforms(allPlatforms);
    });
  };

  useEffect(() => {
    fetchGame();
    fetchPlatforms(); // Fetch platforms when the component mounts
  }, [gameId]);

  const updateGameData = (e) => {
    const copy = { ...game };
    copy[e.target.id] = e.target.value;
    setGame(copy);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(game);
    editGame(game).then((updatedGame) => {
      // Assuming the updated game response includes the updated game details
      Navigate(`/game/${updatedGame.id}`);
    });
  };

  return (
    <main>
      {game !== null && (
        <form onSubmit={handleUpdate} className="edit-game-form">
          <div className="form-container">
            <h1>EDIT GAME FORM</h1>
            <fieldset>
              <div className="form-group">
                <label>Title:</label>
                <input
                  id="title"
                  onChange={updateGameData}
                  type="text"
                  value={game.title}
                  required
                  className="form-control"
                />
                <label>Image:</label>
                <input
                  id="game_image_url"
                  onChange={updateGameData}
                  type="text"
                  value={game.game_image_url}
                  required
                  className="form-control"
                />
                <label>Select Platform:</label>
                <select
                  id="platform"
                  onChange={updateGameData}
                  value={game.platform ? game.platform : ''}
                  required
                >
                  {/* Map through 'platforms' to render platform options */}
                  {platforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.platform}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <button type="submit" className="btn-update">
              Update Game
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { editGame, getGameById } from "../../services/gameServices";

// export const EditGame = () => {
//   const { gameId } = useParams();
//   const [game, setGame] = useState(null);
//   const [errorPopup, setErrorPopup] = useState(false);

//   const fetchGameData = async () => {
//     try {
//       const fetchedGame = await getGameById(gameId);
//       setGame(fetchedGame);
//     } catch (error) {
//       console.error("Error fetching game data: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchGameData();
//   }, [gameId]);

//   const updateGameData = (e) => {
//     const { id, value } = e.target;
//     setGame({ ...game, [id]: value });
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     editGame(game)
//       .then((updatedGame) => {
//         if (updatedGame && updatedGame.id) {
//           navigate(`/game/${updatedGame.id}`);
//         } else {
//           setErrorPopup(true);
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating game: ", error);
//         setErrorPopup(true); // Display pop-up for edit failure
//       });
//   };

//   const navigate = useNavigate();

//   return (
//     <main>
//       {game !== null && (
//         <form onSubmit={handleUpdate}>
//           <div>
//             <h1>EDIT GAME FORM</h1>
//           </div>
//           <div>
//             <label>Title:</label>
//             <input
//               id="title"
//               onChange={updateGameData}
//               type="text"
//               value={game.title}
//               required
//             />
//           </div>
//           <div>
//             <label>Image URL:</label>
//             <input
//               id="game_image_url"
//               onChange={updateGameData}
//               type="text"
//               value={game.game_image_url}
//               required
//             />
//           </div>
//           <div>
//             <label>Platform:</label>
//             <input
//               id="platform"
//               onChange={updateGameData}
//               type="text"
//               value={game.platform}
//               required
//             />
//           </div>
//           <button type="submit">Update Game</button>
//           {/* Popup for edit failure */}
//           {errorPopup && (
//             <div className="popup">
//               <p>Failed to edit game. You are not authorized to edit this game.</p>
//               <button onClick={() => setErrorPopup(false)}>Close</button>
//             </div>
//           )}
//         </form>
//       )}
//     </main>
//   );
// };




