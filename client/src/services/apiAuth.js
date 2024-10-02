import { API_URL } from "../helpers";

export async function signup(signupObj) {
  try {
    const res = await fetch(`/api/admin/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(signupObj),
    });
    if (!res.ok) throw new Error("email already exist");
    //console.log(res);
    const data = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function login(loginObj) {
  try {
    const res = await fetch(`/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginObj),
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
    throw new Error(err.message || "something went wrong");
  }
}
