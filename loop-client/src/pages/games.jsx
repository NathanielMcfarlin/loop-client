import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllGamePosts } from "../services/postServices";
import { getGames } from "../services/gameServices";

export const Game = () => {
  const [gamePost, setGamePost] = useState([]);
  const [game, setGame] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { gameId } = useParams(); // Assuming you're using React Router's useParams to get the gameId

  const getAndSetPosts = () => {
    getAllGamePosts().then((postArray) => {
      setGamePost(postArray.filter((post) => post.game.id == gameId));

    });
  };

  const getAndSetGames = () => {
    getGames().then((gamesArray) => {
      setGame(gamesArray.find((game) => game.id === parseInt(gameId)));
    });
  };

  useEffect(() => {
    // Simulating user authentication. Replace this with your actual user authentication logic.
    const authenticatedUser = {
      is_staff: true, // Assuming the user is staff for demonstration purposes
    };
    setUser(authenticatedUser);

    getAndSetPosts();
    getAndSetGames();
  }, [gameId]);

  const handleEditGame = () => {
    navigate(`/edit-game/${game.id}`);
  };

  return (
    <div id="root">
      <div className="game-component">
        {user.is_staff && <button onClick={handleEditGame}>EDIT GAME</button>}
        {/* Assuming 'gamePost' is an array of objects with specific properties */}
        {gamePost.map((post, index) => (
          <div key={index} className="game-post">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.link}</p>
            <img src={post.post_image_url} alt={post.title} />
            {/* Add other properties as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};
