// Movie slice in Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPlayingMovieState, PlayingMovies, Movie } from "../../models/movieModels";

const moviePlayingSlice = createSlice({
    name: "moviePlaying",
    initialState: initialPlayingMovieState,
    reducers: {
        fetchPlayingMoviesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPlayingMoviesSuccess(state, action: PayloadAction<PlayingMovies>) {
            state.movies = action.payload.results as Movie[];
            state.loading = false;
        },
        fetchPlayingMoviesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchPlayingMoviesStart, fetchPlayingMoviesSuccess, fetchPlayingMoviesFailure } = moviePlayingSlice.actions;

export default moviePlayingSlice.reducer;