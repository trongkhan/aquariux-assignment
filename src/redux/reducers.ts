// Reducer declaration

import moviePlayingSlice from "./movieStore/moviePlayingSlice";
import moviePopularSlice from "./movieStore/moviePopularSlice";
import movieUpcomingSlice from "./movieStore/movieUpcomingSlice";

export const rootReducer = {
    // Add your reducers here
    moviePlayingReducer: moviePlayingSlice,
    moviePopularReducer: moviePopularSlice,
    movieUpcomingReducer: movieUpcomingSlice,
};