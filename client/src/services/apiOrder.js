import { API_URL } from "../helpers";
export async function createOrder(orderObj) {
  try {
    const res = await fetch(`/api/orders/createorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(orderObj),
    });
    if (!res.ok) throw new Error("failed please try again");
    const { data } = await res.json();
    // console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function getAllOrders() {
  const jwtToken = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/orders/getallorders`, {
      method: "GET",
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
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    //console.log(err.message);
    throw new Error(err.message || "something went wrong");
  }
}
export async function getOrder({ ticketvervicationCode }) {
  //console.log(ticketvervicationCode.ticketvervicationCode);
  const jwtToken = localStorage.getItem("token");
  try {
    const res = await fetch(
      `/api/orders/${ticketvervicationCode.ticketvervicationCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.error || "Something went wrong");
    }
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    //console.log(err.message);
    throw new Error(err.message || "something went wrong");
  }
}
