export const getGames = () => {
    return fetch(`http://localhost:8000/games`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }

export const createGame = (newGame) => {
  return fetch(`http://localhost:8000/games`,
  {
      method: "POST",
      headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json"
      },
          body: JSON.stringify(newGame)
      }).then((res) => res.json())
}

export const deleteGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, 
    {
        method: "DELETE",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
}

export const getGameById = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };
  
export const editGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
  };
  