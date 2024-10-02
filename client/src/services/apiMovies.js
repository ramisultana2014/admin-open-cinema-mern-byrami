import { API_URL } from "../helpers";

export async function getAllMovies() {
  const res = await fetch(`/api/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("failed getting data");
  const { data } = await res.json();

  return data;
}
export async function updateMovie({ movieObj, id }) {
  //console.log(id);
  //console.log(movieObj.updatedData);
  const jwtToken = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/movies/${id.movieID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      credentials: "include",
      body: JSON.stringify(movieObj.updatedData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      //console.log("errorData", errorData.status);
      throw new Error(errorData.status || "Something went wrong");
    }
    const { data } = await res.json();
    return data;
  } catch (err) {
    //console.log(err);
    throw new Error(err.message || "something went wrong");
  }
}
export async function deleteMovie(id) {
  //console.log(id);
  //console.log(movieObj.updatedData);
  const jwtToken = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.error || "Something went wrong");
    }
  } catch (err) {
    // console.log("err", err);
    throw new Error(err.message || "something went wrong");
  }
}
export async function createMovie(movieObj) {
  //console.log(movieObj);
  const jwtToken = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/movies/creatmovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      credentials: "include",
      body: JSON.stringify(movieObj),
    });
    if (!res.ok) {
      const errorData = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.error || "Something went wrong");
    }
    const data = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    // console.log("err", err);
    throw new Error(err.message || "something went wrong");
  }
}
export async function getAllNewMovies() {
  const jwtToken = localStorage.getItem("token");
  const res = await fetch(`/api/movies/creatmovie`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("failed getting new movies");
  const { data } = await res.json();
  //console.log("api", data.newRealeses);
  return data;
}
