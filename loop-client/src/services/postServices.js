export const getAllPlatformPosts = () => {
  return fetch(`http://localhost:8000/platform_posts`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getPlatformPostById = (id) => {
  return fetch(`http://localhost:8000/platform_posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getPlatformPostByPostId = (postId) => {
  return fetch(`http://localhost:8000/platform_posts/${postId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deletePlatformPost = (postId) => {
  return fetch(`http://localhost:8000/platform_posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  })
};

export const editPlatformPost = (updatedPost) => {
  return fetch(`http://localhost:8000/platform_posts/${updatedPost.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),})
}

// ! -------------------------------------------------------END OF PLATFORM POST SERVICE-------------------------------------------------------------------------------


export const getAllGamePosts = () => {
  return fetch(`http://localhost:8000/game_posts`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getGamePostById = (id) => {
  return fetch(`http://localhost:8000/game_posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getGamePostByPostId = (GamePostId) => {
  return fetch(`http://localhost:8000/game_posts/${GamePostId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deleteGamePost = (GamePostId) => {
  return fetch(`http://localhost:8000/game_posts/${GamePostId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  })
};

export const editGamePost = (updatedGamePost) => {
  return fetch(`http://localhost:8000/game_posts/${updatedGamePost.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedGamePost),})
}