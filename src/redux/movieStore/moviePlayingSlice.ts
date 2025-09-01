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
            const { results, page } = action.payload;
            if (page === 1) {
                state.movies = results; // Replace for first page
            } else {
                state.movies = [...state.movies, ...results]; // Append for next pages
            }
            state.page = page;
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