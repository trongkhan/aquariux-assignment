export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface PlayingMovies {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface UpcomingMovies {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface PopularMovies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface PlayingMovieState {
    movies: Movie[];
    loading: boolean;
    page: number;
    error: string | null;
}

export interface UpcomingMovieState {
    movies: Movie[];
    loading: boolean;
    page: number;
    error: string | null;
}

export interface PopularMovieState {
    movies: Movie[];
    loading: boolean;
    page: number;
    error: string | null;
}

export const initialPlayingMovieState: PlayingMovieState = {
    movies: [],
    loading: false,
    page: 0,
    error: null,
};

export const initialUpcomingMovieState: UpcomingMovieState = {
    movies: [],
    loading: false,
    page: 0,
    error: null,
};

export const initialPopularMovieState: PopularMovieState = {
    movies: [],
    loading: false,
    page: 0,
    error: null,
};