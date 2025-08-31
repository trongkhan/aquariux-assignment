import Api from "../../services/api";
import { AppDispatch } from "../store";
import { fetchPlayingMoviesFailure, fetchPlayingMoviesStart, fetchPlayingMoviesSuccess } from "./moviePlayingSlice";
import { fetchUpcomingMoviesFailure, fetchUpcomingMoviesStart, fetchUpcomingMoviesSuccess } from "./movieUpcomingSlice";
import { fetchPopularMoviesFailure, fetchPopularMoviesStart, fetchPopularMoviesSuccess } from "./moviePopularSlice";

export const fetchPlayingMovies = (page: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchPlayingMoviesStart());
    try {
      const response = await Api.get(`/movie/now_playing?language=en-US&page=${page}`);
      dispatch(fetchPlayingMoviesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchPlayingMoviesFailure(error?.message ?? ""));
  }
};

export const fetchUpcomingMovies = (page: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchUpcomingMoviesStart());
    try {
      const response = await Api.get(`/movie/upcoming?language=en-US&page=${page}`);
      dispatch(fetchUpcomingMoviesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchUpcomingMoviesFailure(error?.message ?? ""));
  }
};

export const fetchPopularMovies = (page: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchPopularMoviesStart());
    try {
      const response = await Api.get(`/movie/popular?language=en-US&page=${page}`);
      dispatch(fetchPopularMoviesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchPopularMoviesFailure(error?.message ?? ""));
  }
};
