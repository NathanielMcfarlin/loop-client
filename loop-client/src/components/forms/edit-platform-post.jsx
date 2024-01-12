import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { editPlatformPost, getPlatformPostByPostId } from "../../services/postServices";
import { getPlatform } from "../../services/platformService";

export const EditPlatformPost = ({ userId }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    link: "",
    post_image_url: "",
    platform: "", // Change 'platform' to an object to match the structure
    user: userId,
    likes: [],
    is_staff: false,
  });
  const [platforms, setPlatforms] = useState([]);
  const { postId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    getPlatform().then((platformsData) => {
      setPlatforms(platformsData);
    });
  }, []);

  useEffect(() => {
    getPlatformPostByPostId(postId).then((postObj) => {
      setPost({
        ...postObj,
        platform: {
          id: postObj.platform.id,
          platform: postObj.platform.platform,
          platform_image: postObj.platform.platform_image,
        },
      });
    });
  }, [postId]);

  const updatePost = (e) => {
    const copy = { ...post };
    copy[e.target.id] = e.target.value;
    setPost(copy);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedItem = {
      id: parseInt(post.id),
      title: post.title,
      description: post.description,
      post_image_url: post.post_image_url,
      link: post.link,
      platform: parseInt(post.platform), // Convert 'platform' to a number
      reactions: [], // You might handle reactions differently
      is_staff: false
    };

    console.log(updatedItem);

    // Send updated item to server
    editPlatformPost(updatedItem).then(() => {
      navigate(`/`);
    });
  };


  // Assuming you have fetched the list of platforms and set it to 'platforms' state

  return (
    <main>
      <div>
        <h1>EDIT POST FORM</h1>
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
              onChange={updatePost}
              value={post.platform ? post.platform.id : ''}
              required
            >
              {/* Map through 'platforms' to render platform options */}
              {platforms.map((platform) => (
                <option key={platform.platform} value={platform.id}>
                  {platform.platform} {/* Replace with the actual platform property */}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </div>
      <button onClick={handleFormSubmit}>Update Post</button>
    </main>
  );
};
