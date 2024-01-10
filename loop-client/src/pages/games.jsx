import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllGamePosts } from "../services/postServices";
import { getGames, deleteGame } from "../services/gameServices";

export const Game = () => {
  const [gamePost, setGamePost] = useState([]);
  const [game, setGame] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { gameId } = useParams();

  const getAndSetPosts = () => {
    getAllGamePosts().then((postArray) => {
      setGamePost(postArray.filter((post) => post.game.id === gameId));
    });
  };

  useEffect(() => {
    const getAndSetGames = () => {
      getGames().then((gamesArray) => {
        const foundGame = gamesArray.find((g) => g.id === parseInt(gameId));
        setGame(foundGame);

        // Assuming the backend includes information about the game creator's user ID
        const authenticatedUser = {
          is_staff: true, // Assuming the user is staff for demonstration purposes
          is_creator: foundGame && foundGame.user_id === user.id, // Check if the user is the creator of the game
        };
        setUser(authenticatedUser);
      });
    };

    // Fetch game details and set user information
    getAndSetPosts();
    getAndSetGames();
  }, [gameId, user.id]);

  const handleEditGame = () => {
    navigate(`/edit-game/${game.id}`);
  };

  const handleDeleteGame = () => {
    if (user.id !== game.userId) {
      window.alert("You cannot delete a game you didn't create.");
    } else {
      if (window.confirm("Are you sure you want to delete this game?")) {
        deleteGame(game.id)
          .then(() => {
            navigate(`/`);
          })
          .catch((error) => {
            console.error("Error deleting game:", error);
          });
      }
    }
  };

  return (

    <div className="btn-container">
      <div className="game-component">
        {user.is_staff && user.is_creator && (
          <>
            <button className="edit-game-btn" onClick={handleEditGame}>EDIT GAME</button>
            <button className="edit-game-btn" onClick={handleDeleteGame}>DELETE GAME</button>
          </>
        )}
      </div>
    </div>
  );
};



