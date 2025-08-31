import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpcomingMovies, initialUpcomingMovieState } from "../../models/movieModel";

const movieUpcomingSlice = createSlice({
    name: "movieUpcoming",
    initialState: initialUpcomingMovieState,
    reducers: {
        fetchUpcomingMoviesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUpcomingMoviesSuccess(state, action: PayloadAction<UpcomingMovies>) {
            console.log('UPCOMING MOVIES:', action.payload.results);
            state.movies = action.payload.results;
            state.loading = false;
        },
        fetchUpcomingMoviesFailure(state, action: PayloadAction<string>) {
            console.log('UPCOMING MOVIES ERROR:', action.payload);
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchUpcomingMoviesStart, fetchUpcomingMoviesSuccess, fetchUpcomingMoviesFailure } = movieUpcomingSlice.actions;

export default movieUpcomingSlice.reducer;