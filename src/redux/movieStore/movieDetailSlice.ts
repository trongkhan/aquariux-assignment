import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialMovieDetail, MovieDetail } from "../../models/movieModels";

const movieDetailSlice = createSlice({
    name: "movieDetail",
    initialState: InitialMovieDetail,
    reducers: {
        fetchMovieDetailStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMovieDetailSuccess: (state, action: PayloadAction<MovieDetail>) => {
            state.loading = false;
            state.movie = action.payload;
        },
        fetchMovieDetailFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchMovieDetailStart,
    fetchMovieDetailSuccess,
    fetchMovieDetailFailure,
} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
