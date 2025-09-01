import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPopularMovieState, PopularMovieState, Movie } from "../../models/movieModels";

const moviePopularSlice = createSlice({
    name: "moviePopular",
    initialState: initialPopularMovieState,
    reducers: {
        fetchPopularMoviesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPopularMoviesSuccess(state, action: PayloadAction<PopularMovieState>) {
            const { results, page } = action.payload;
            if (page === 1) {
                state.movies = results; // Replace for first page
            } else {
                state.movies = [...state.movies, ...results]; // Append for next pages
            }
            state.page = page;
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