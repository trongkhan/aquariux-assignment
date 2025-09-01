import { createSlice } from "@reduxjs/toolkit";

const MovieSearchSlice = createSlice({
  name: "movieSearch",
  initialState: {
    loading: false,
    results: [],
    error: null,
  },
  reducers: {
    fetchSearchMovieStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSearchMovieSuccess: (state, action) => {
      state.loading = false;
      state.results = action.payload;
    },
    fetchSearchMovieFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSearchMovieStart,
  fetchSearchMovieSuccess,
  fetchSearchMovieFailure,
} = MovieSearchSlice.actions;

export default MovieSearchSlice.reducer;
