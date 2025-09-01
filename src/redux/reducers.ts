// Reducer declaration

import movieCreditSlice from "./movieStore/movieCreditSlice";
import movieDetailSlice from "./movieStore/movieDetailSlice";
import moviePlayingSlice from "./movieStore/moviePlayingSlice";
import moviePopularSlice from "./movieStore/moviePopularSlice";
import movieUpcomingSlice from "./movieStore/movieUpcomingSlice";

export const rootReducer = {
    // Add your reducers here
    moviePlayingReducer: moviePlayingSlice,
    moviePopularReducer: moviePopularSlice,
    movieUpcomingReducer: movieUpcomingSlice,
    movieDetailReducer: movieDetailSlice,
    movieCreditReducer: movieCreditSlice,
};