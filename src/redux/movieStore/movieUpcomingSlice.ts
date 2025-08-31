import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpcomingMovies, initialUpcomingMovieState, Movie } from "../../models/movieModel";

const movieUpcomingSlice = createSlice({
    name: "movieUpcoming",
    initialState: initialUpcomingMovieState,
    reducers: {
        fetchUpcomingMoviesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUpcomingMoviesSuccess(state, action: PayloadAction<UpcomingMovies>) {
            state.movies = action.payload.results as Movie[];
            state.loading = false;
        },
        fetchUpcomingMoviesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchUpcomingMoviesStart, fetchUpcomingMoviesSuccess, fetchUpcomingMoviesFailure } = movieUpcomingSlice.actions;

export default movieUpcomingSlice.reducer;