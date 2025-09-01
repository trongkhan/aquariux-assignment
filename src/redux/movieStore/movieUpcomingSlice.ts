import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpcomingMovies, initialUpcomingMovieState, Movie } from "../../models/movieModels";

const movieUpcomingSlice = createSlice({
    name: "movieUpcoming",
    initialState: initialUpcomingMovieState,
    reducers: {
        fetchUpcomingMoviesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUpcomingMoviesSuccess(state, action: PayloadAction<UpcomingMovies>) {
            const { results, page } = action.payload;
            if (page === 1) {
                state.movies = results; // Replace for first page
            } else {
                state.movies = [...state.movies, ...results]; // Append for next pages
            }
            state.page = page;
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