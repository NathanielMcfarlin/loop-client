import { useEffect, useState } from "react";
import { getGames } from "../services/gameServices";
import { deletePlatformPost, getAllPlatformPosts, likePost } from "../services/postServices";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { createPostReaction } from "../services/reactionServices";



export const Platform = () => {
  // const [likeActive, setLikeActive] = useState(false);
  // const [dislikeActive, setDislikeActive] = useState(false);
  const [likeState, setLikeState] = useState({});
  const [games, setGames] = useState([]);
  const [platformPost, setPlatformPost] = useState([]);
  const { platformId } = useParams();
  const navigate = useNavigate();

  // const getAndSetPosts = async () => {
  //   try {
  //     const postArray = await getAllPlatformPosts();
  //     console.log("postArray:", postArray);
  //     setPlatformPost(postArray);
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }
  // };

  const getAndSetPosts = async () => {
    try {
      const postArray = await getAllPlatformPosts();
      console.log("postArray:", postArray);

      // Initialize like state for new posts
      const newLikeState = postArray.reduce((state, post) => {
        state[post.id] = likeState[post.id] || false;
        return state;
      }, {});

      setPlatformPost(postArray);
      setLikeState(newLikeState);
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
      await likePost(postId);
      await getAndSetPosts(); // Wait for posts to be updated
      setLikeState((prevLikeState) => ({
        ...prevLikeState,
        [postId]: !prevLikeState[postId], // Toggle like state for the specific post
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };


  // const handleLikeButton = async (postId) => {
  //   try {
  //     await likePost(postId);
  //     getAndSetPosts();
  //     setLikeActive(!likeActive);
  //     setDislikeActive(false);
  //   } catch (error) {
  //     console.error("Error liking post:", error);
  //   }
  // };

  // const handleDislikeButton = async (postId) => {
  //   try {
  //     await createPostReaction(postId, 2);
  //     getAndSetPosts();
  //     setDislikeActive(!dislikeActive);
  //     setLikeActive(false);
  //   } catch (error) {
  //     console.error("Error disliking post:", error);
  //   }
  // };


  const handleNewGame = () => {
    navigate('/new-game'); // Replace '/new-game' with the route for your new-game form
  };

  // const handleDelete = async (post) => { // Change the argument name to 'post'
  //   const confirmDelete = window.confirm("Are you sure you want to delete this post?");
  //   if (confirmDelete) {
  //     try {
  //       await deletePlatformPost(post.id);
  //       getAndSetPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost.id !== post.id));
  //     } catch (error) {
  //       console.error("Error deleting post:", error);
  //     }
  //   }
  // };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await deletePlatformPost(postId);
        getAndSetPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleNewPost = () => {
    navigate(`/new-post`);
  };

  const handleEdit = (postId) => {
    navigate(`/${postId}/edit-platform-post`);
  };

  return (
    <div className="platform-container">
      <div className="games-container">
        <h2 className="games-header">Games</h2>
        {/* Render game cards */}
        {games.map((game) => (
          // Check if the game's platform_id matches the platformId
          platformId == game.platform && (
            <div className="game-card" key={game.id} onClick={() => navigate(`/games/${game.id}`)}>
              <Link to={`/games/${game.id}`}>
                {/* Display game details */}
                <div className="image-container" style={{ width: '250px', height: '250px' }}>
                  <img
                    src={game.game_image_url}
                    alt={game.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      borderRadius: '10px',
                      border: '2px solid black',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
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
              <div>
                <button
                  onClick={() => {
                    handleLikeButton(post.id);
                  }}
                  className={`fa fa-thumbs-up ${likeState[post.id] ? 'active-like' : ''}`}
                >
                  Like
                </button>
                {/* <button
                  onClick={() => {
                    handleDislikeButton(post.id);
                  }}
                  className={`fa fa-thumbs-down ${dislikeActive ? 'active-dislike' : ''}`}
                >
                  Dislike
                </button> */}
              </div>
              <div>
                {post?.is_owner ? (
                  <div className="mt-4">
                    <button onClick={() => handleDelete(post.id)}>DELETE</button>
                    <button onClick={() => handleEdit(post.id)}>EDIT</button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )
        ))}
        <button onClick={handleNewPost}>New Post</button>
      </div>
    </div>
  );
};


