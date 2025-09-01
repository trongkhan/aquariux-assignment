import { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Movie } from "../../models/movieModels";
import { formatDate } from "../../configs";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayingMovies, fetchPopularMovies, fetchUpcomingMovies, fetchSearchMovie } from "../../redux/movieStore/movieThunks";
import { AppDispatch, RootState } from "../../redux/store";
import CFilterList from '../../components/CFilterList';
import CHeader from "../../components/CHeader";
import CLoadingIndicator from "../../components/CLoadingIndicator";
import { RoutesName } from "../../const/enum/routeNames";
import { useNavigation } from "@react-navigation/native";

const CATEGORY_OPTIONS = [
    { label: "Now Playing", value: "now_playing" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Popular", value: "popular" },
];

const SORT_OPTIONS = [
    { label: "By alphabetical order", value: "alphabetical" },
    { label: "By rating", value: "rating" },
    { label: "By release date", value: "releaseDate" },
];


const HomeScreen = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState<string>("");
    // Remove local search state, use Redux search slice
    const [category, setCategory] = useState<string>("now_playing");
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false);
    const [sortOption, setSortOption] = useState<string>("alphabetical");
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const playingMovieState = useSelector((state: RootState) => state.moviePlayingReducer);
    const upcomingMovieState = useSelector((state: RootState) => state.movieUpcomingReducer);
    const popularMovieState = useSelector((state: RootState) => state.moviePopularReducer);

    useEffect(() => {
        // Reset to page 1 and clear search when category changes
        setPage(1);
        // Optionally, you can dispatch an action to clear search state here if needed
    }, [category]);

    useEffect(() => {
        // Only fetch category movies if not searching
        if (!search.trim()) {
            if (category === "now_playing") {
                dispatch(fetchPlayingMovies(page));
            } else if (category === "upcoming") {
                dispatch(fetchUpcomingMovies(page));
            } else if (category === "popular") {
                dispatch(fetchPopularMovies(page));
            }
        }
    }, [category, page, dispatch, search]);

    useEffect(() => {
        if (!playingMovieState.loading && !upcomingMovieState.loading && !popularMovieState.loading) {
            setRefreshing(false);
        }
    }, [playingMovieState.loading, upcomingMovieState.loading, popularMovieState.loading]);

    let movies: Movie[] = [];
    let isLoading = playingMovieState.loading || upcomingMovieState.loading || popularMovieState.loading;
    if (category === "now_playing") {
        movies = playingMovieState?.movies || [];
    } else if (category === "upcoming") {
        movies = upcomingMovieState?.movies || [];
    } else if (category === "popular") {
        movies = popularMovieState?.movies || [];
    }

    // Use search slice from Redux
    const searchState = useSelector((state: RootState) => state.movieSearchReducer);
    const isSearching = !!search.trim();
    const displayMovies = isSearching
        ? Array.isArray(searchState.results?.results)
            ? searchState.results.results
            : []
        : movies;
    console.log("Display Movies:", searchState);
    const isSearchLoading = searchState.loading;

    // Sort movies based on selected sort option
    const sortMovies = (movies: Movie[], sortOption: string): Movie[] => {
        switch (sortOption) {
            case "alphabetical":
                return [...movies].sort((a, b) => a.title.localeCompare(b.title));
            case "rating":
                return [...movies].sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
            case "releaseDate":
                return [...movies].sort((a, b) => {
                    const dateA = new Date(a.release_date).getTime();
                    const dateB = new Date(b.release_date).getTime();
                    return dateB - dateA;
                });
            default:
                return movies;
        }
    };

    const sortedMovies = sortMovies(displayMovies, sortOption);

    const handleRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        if (category === "now_playing") {
            await dispatch(fetchPlayingMovies(1));
        } else if (category === "upcoming") {
            await dispatch(fetchUpcomingMovies(1));
        } else if (category === "popular") {
            await dispatch(fetchPopularMovies(1));
        }
    };

    // Search handler using fetchSearchMovie thunk
    const handleSearch = () => {
        if (!search.trim()) return;
        dispatch(fetchSearchMovie(search, 1));
    };

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 48 }}
            data={(isLoading || isSearchLoading) ? [...sortedMovies, { id: 'loading-indicator' }] : sortedMovies}
            keyExtractor={(item) => typeof item.id === 'string' ? item.id : item.id.toString()}
            ListHeaderComponent={
                <>
                    {/* Header */}
                    <CHeader />
                    {/* Filters */}
                    <View style={styles.filters}>
                        {/* Category Dropdown */}
                        <CFilterList
                            options={CATEGORY_OPTIONS}
                            selectedValue={category}
                            dropdownOpen={dropdownOpen}
                            setDropdownOpen={setDropdownOpen}
                            onSelect={setCategory}
                        />
                        {/* Sort by Dropdown */}
                        <CFilterList
                            options={SORT_OPTIONS}
                            selectedValue={sortOption}
                            dropdownOpen={sortDropdownOpen}
                            setDropdownOpen={setSortDropdownOpen}
                            onSelect={setSortOption}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={search}
                            onChangeText={setSearch}
                        />
                        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                            <Text style={{ color: "#888" }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
            renderItem={({ item }) => {
                if (item.id === 'loading-indicator') {
                    return <CLoadingIndicator />;
                }
                // Type guard for Movie
                if (!('title' in item)) return null;
                return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate(RoutesName.Details, { movie: item })}
                        activeOpacity={0.8}
                    >
                        <View style={styles.movieCard}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}` }}
                                style={styles.poster}
                                resizeMode="cover"
                            />
                            <View style={{ flex: 1, paddingLeft: 12 }}>
                                <Text style={styles.movieTitle}>{item.title}</Text>
                                <Text style={styles.movieDate}>{formatDate(item.release_date)}</Text>
                                <Text style={styles.movieOverview} numberOfLines={3}>{item.overview}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
            ListFooterComponent={
                !isLoading && !isSearching ? (
                    <View style={{ padding: 16 }}>
                        <TouchableOpacity
                            style={styles.loadMoreButton}
                            onPress={() => setPage(prev => prev + 1)}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Load More</Text>
                        </TouchableOpacity>
                    </View>
                ) : null
            }
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={['#007aff']}
                    tintColor="#007aff"
                />
            }
            onRefresh={handleRefresh}
            refreshing={refreshing}
        />
    );
}

export default HomeScreen;