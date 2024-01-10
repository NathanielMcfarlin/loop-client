import { useState, useEffect } from "react";
import { createPlatformPost } from "../../services/postServices";
import { getPlatform } from "../../services/platformService";
import { useNavigate } from "react-router";

export const NewPlatformPost = ({ userId }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    link: "",
    post_image_url: "",
    platform: "", // Change 'platform' to a string as it stores ID, not a number
    user_id: userId
  });
  const [platforms, setPlatforms] = useState([]);
  let navigate = useNavigate();

  const updatePost = (e) => {
    const { id, value } = e.target;
    setPost({ ...post, [id]: value });
  };

  const updatePlatform = (e) => {
    setPost({ ...post, platform: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title: post.title,
      description: post.description,
      post_image_url: post.post_image_url,
      link: post.link,
      platform: parseInt(post.platform), // Convert 'platform' to a number
      reactions: [], // You might handle reactions differently
      is_staff: false
    };

    createPlatformPost(postData)
      .then(() => {
        navigate(`/`);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const getAndSetPlatforms = () => {
    getPlatform()
      .then((platformArray) => {
        setPlatforms(platformArray);
      })
      .catch((error) => {
        console.error("Error fetching platforms:", error);
      });
  };

  useEffect(() => {
    getAndSetPlatforms();
  }, []);

  return (
    <main>
      <form onSubmit={handleFormSubmit}>
        <div>
          <h1>NEW POST FORM</h1>
        </div>
        <div>
          <fieldset>
            <div>
              <label>Title:</label>
              <input
                id="title"
                onChange={updatePost}
                type="text"
                value={post.title}
                required
              />
              <label>Description:</label>
              <input
                id="description"
                onChange={updatePost}
                type="text"
                value={post.description}
                required
              />
              <label>Link:</label>
              <input
                id="link"
                onChange={updatePost}
                type="text"
                value={post.link}
                required
              />
              <label>Post Image URL:</label>
              <input
                id="post_image_url"
                onChange={updatePost}
                type="text"
                value={post.post_image_url}
                required
              />
              <label>Select Platform:</label>
              <select
                id="platform"
                onChange={updatePlatform}
                value={post.platform}
                required
              >
                <option value="">Select a platform</option>
                {platforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.platform}
                  </option>
                ))}
              </select>
              {/* Hidden input to store user ID */}
              <input
                type="hidden"
                id="user_id"
                value={post.user_id}
                readOnly
              />
            </div>
          </fieldset>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </main>
  );
};
