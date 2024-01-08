import { useEffect, useState } from "react";
import { getGames } from "../services/gameServices";
import { getAllPlatformPosts } from "../services/postServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createPostReaction } from "../services/reactionServices";

export const Platform = () => {
  const [games, setGames] = useState([]);
  const [platformPost, setPlatformPost] = useState([]);
  const { platformId } = useParams();
  const [reactions, setReactions] = useState([]);
  const navigate = useNavigate();

  const getAndSetPosts = async () => {
    try {
      const postArray = await getAllPlatformPosts();
      console.log("postArray:", postArray);
      setPlatformPost(postArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const getAndSetGames = async () => {
    try {
      const gamesArray = await getGames();
      console.log("platformId:", platformId);
      console.log("gamesArray:", gamesArray);
      setGames(gamesArray);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };


  useEffect(() => {

    getAndSetGames();
    getAndSetPosts();
  }, [platformId]);


  const handleLikeButton = async (postId) => {
    try {
      await createPostReaction(postId, 1);
      getAndSetPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  const handleNewGame = () => {
    navigate('/new-game'); // Replace '/new-game' with the route for your new-game form
  };

  return (
    <div className="platform-container">
      <div className="games-container">
        <h2>Games</h2>
        {/* Render game cards */}
        {games.map((game) => (
          // Check if the game's platform_id matches the platformId
          platformId == game.platform && (
            <div className="game-card" key={game.id} onClick={() => navigate(`/games/${game.id}`)}>
              <Link to={`/games/${game.id}`}>
                {/* Display game details */}
                <img src={game.game_img_url} alt={game.title} />
                {/* Add more game details */}
                <h3>{game.title}</h3>
              </Link>
            </div>
          )
        ))}
        <button onClick={handleNewGame}>New Game</button>
      </div>

      <div className="platform-posts-container">
        <h2>Platform Posts</h2>
        {/* Render platform posts */}
        {platformPost.map((post) => (
          // Check if the post's platform ID matches the platformId
          platformId == post.platform.id && (
            <div className="platform-post" key={post.id}>
              <p>{post.description}</p>
              <p>{post.link}</p>
              <img src={post.post_image_url} alt={post.description} />
              {/* Add more post details */}
              <button onClick={() => { handleLikeButton(post.id) }} className="fa fa-thumbs-up">Like
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
