import Api from "../../services/api";
import {routeApis} from "../../services/routeApis";
import { AppDispatch } from "../store";
import { fetchPlayingMoviesFailure, fetchPlayingMoviesStart, fetchPlayingMoviesSuccess } from "./moviePlayingSlice";
import { fetchUpcomingMoviesFailure, fetchUpcomingMoviesStart, fetchUpcomingMoviesSuccess } from "./movieUpcomingSlice";
import { fetchPopularMoviesFailure, fetchPopularMoviesStart, fetchPopularMoviesSuccess } from "./moviePopularSlice";
import { fetchMovieDetailFailure, fetchMovieDetailStart, fetchMovieDetailSuccess } from "./movieDetailSlice";
import { fetchMovieCreditFailure, fetchMovieCreditStart, fetchMovieCreditSuccess } from "./movieCreditSlice";

export const fetchPlayingMovies = (page: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchPlayingMoviesStart());
    try {
      const response = await Api.get(`${routeApis.nowPlaying}?language=en-US&page=${page}`);
      dispatch(fetchPlayingMoviesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchPlayingMoviesFailure(error?.message ?? ""));
  }
};

export const fetchUpcomingMovies = (page: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchUpcomingMoviesStart());
    try {
      const response = await Api.get(`${routeApis.upcoming}?language=en-US&page=${page}`);
      dispatch(fetchUpcomingMoviesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchUpcomingMoviesFailure(error?.message ?? ""));
  }
};

export const fetchPopularMovies = (page: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchPopularMoviesStart());
    try {
      const response = await Api.get(`${routeApis.popular}?language=en-US&page=${page}`);
      dispatch(fetchPopularMoviesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchPopularMoviesFailure(error?.message ?? ""));
  }
};

export const fetchMovieDetail = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchMovieDetailStart());
  try {
    const response = await Api.get(`${routeApis.detail}/${id}?language=en-US`);
    dispatch(fetchMovieDetailSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchMovieDetailFailure(error?.message ?? ""));
  }
};

export const fetchMovieCredit = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchMovieCreditStart());
  try {
    const response = await Api.get(`${routeApis.credit}/${id}/credits?language=en-US`);
    dispatch(fetchMovieCreditSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchMovieCreditFailure(error?.message ?? ""));
  }
};
