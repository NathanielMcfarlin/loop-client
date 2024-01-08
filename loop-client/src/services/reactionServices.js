export const getReactions = () => {
    return fetch(`http://localhost:8000/reactions`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }

export const getReactionsByID = (reactionId) => {
    return fetch(`http://localhost:8000/reactions/${reactionId}`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
        }).then((res) => res.json())
}

  export const createReaction = (reaction) => {
    return fetch(`http://localhost:8000/reactions`,
    {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
            body: JSON.stringify(reaction)
        }).then((res) => res.json())
    }

  export const editReaction = (reaction) => {
    return fetch(`http://localhost:8000/reactions/${reaction.id}`,
    {
        method: "PUT",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
            body: JSON.stringify(reaction)
        })
    }

    export const deleteReaction = (reactionId) => {
        return fetch(`http://localhost:8000/reactions/${reactionId}`, 
        {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
    }