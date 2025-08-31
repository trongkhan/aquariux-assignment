import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPopularMovieState, PopularMovieState } from "../../models/movieModel";

const moviePopularSlice = createSlice({
    name: "moviePopular",
    initialState: initialPopularMovieState,
    reducers: {
        fetchPopularMoviesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPopularMoviesSuccess(state, action: PayloadAction<PopularMovieState>) {
            state.movies = action.payload.results;
            state.loading = false;
        },
        fetchPopularMoviesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchPopularMoviesStart, fetchPopularMoviesSuccess, fetchPopularMoviesFailure } = moviePopularSlice.actions;

export default moviePopularSlice.reducer;