export const getPlatform = () => {
  return fetch(`http://localhost:8000/platforms`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getPlatformById = (PlatformId) => {
  return fetch(`http://localhost:8000/platforms/${PlatformId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const createPlatform = (platform) => {
  return fetch(`http://localhost:8000/platforms`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(platform),
  }).then((res) => res.json());
};

export const deletePlatform = (platformId) => {
  return fetch(`http://localhost:8000/platforms/${platformId}`, 
  {
      method: "DELETE",
      headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
  })
}

