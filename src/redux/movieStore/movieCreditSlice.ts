import { createSlice } from "@reduxjs/toolkit";
import { InitialMovieCredit } from "../../models/movieModels";

const MovieCreditSlice = createSlice({
  name: "movieCredit",
  initialState: InitialMovieCredit,
  reducers: {
    fetchMovieCreditStart: (state) => {
      state.loading = true;
    },
    fetchMovieCreditSuccess: (state, action) => {
      state.loading = false;
      state.credit = action.payload.cast;
    },
    fetchMovieCreditFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMovieCreditStart,
  fetchMovieCreditSuccess,
  fetchMovieCreditFailure,
} = MovieCreditSlice.actions;

export default MovieCreditSlice.reducer;
