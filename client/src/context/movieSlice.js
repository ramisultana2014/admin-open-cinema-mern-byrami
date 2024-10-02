import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  movieDetails: {},
  movieSeats: [],
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovieDetails(state, action) {
      state.movieDetails = action.payload;
      //console.log("movie", state.movieDetails);
    },
    addMovieSeats(state, action) {
      if (state.movieSeats.includes(action.payload)) {
        state.movieSeats = state.movieSeats.filter((s) => s !== action.payload);
      } else {
        state.movieSeats = [...state.movieSeats, action.payload];
      }
    },

    addToCart(state, action) {
      state.cart = [action.payload];
      // console.log(state.cart);
    },
    clearCart(state, action) {
      return initialState;
    },
  },
});
export const { addMovieDetails, addMovieSeats, clearCart, addToCart } =
  movieSlice.actions;
export default movieSlice.reducer;
