import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Movie } from "../../models/movieModel";
import { formatDate } from "../../configs";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayingMovies, fetchPopularMovies, fetchUpcomingMovies } from "../../redux/movieStore/movieThunks";
import { AppDispatch, RootState } from "../../redux/store";
import IonIcon from 'react-native-vector-icons/Ionicons';

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
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("now_playing");
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false);
    const [sortOption, setSortOption] = useState<string>("alphabetical");
    const dispatch = useDispatch<AppDispatch>();
    const playingMovieState = useSelector((state: RootState) => state.moviePlayingReducer);
    const upcomingMovieState = useSelector((state: RootState) => state.movieUpcomingReducer);
    const popularMovieState = useSelector((state: RootState) => state.moviePopularReducer);

    console.log('upcoming: ', upcomingMovieState)

    useEffect(() => {
        // Only fetch the selected category
        if (category === "now_playing") {
            dispatch(fetchPlayingMovies(1));
        } else if (category === "upcoming") {
            dispatch(fetchUpcomingMovies(1));
        } else if (category === "popular") {
            dispatch(fetchPopularMovies(1));
        }
    }, [category, dispatch]);

    let movies: Movie[] = [];
    if (category === "now_playing") {
        movies = playingMovieState?.movies || [];
    } else if (category === "upcoming") {
        movies = upcomingMovieState?.movies || [];
    } else if (category === "popular") {
        movies = popularMovieState?.movies || [];
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("../../../assets/images/movieLogo.png")}
                    style={{ height: 40, width: 120, resizeMode: "contain" }}
                />
            </View>

            {/* Filters */}
            <View style={styles.filters}>
                {/* Category Dropdown */}
                <View style={{ marginBottom: 8 }}>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <Text style={styles.filterButtonText}>
                            {CATEGORY_OPTIONS.find(opt => opt.value === category)?.label || "Now Playing"}
                        </Text>
                        <IonIcon name={dropdownOpen ? "arrow-down-outline" : "arrow-forward-outline"} size={16} color="#222" />
                    </TouchableOpacity>
                    {dropdownOpen && (
                        <View style={{ backgroundColor: '#fff', borderRadius: 8, elevation: 2, marginTop: 4 }}>
                            {CATEGORY_OPTIONS.map(opt => (
                                <TouchableOpacity
                                    key={opt.value}
                                    style={{ padding: 12, backgroundColor: category === opt.value ? '#e0f0ff' : '#fff' }}
                                    onPress={() => {
                                        setCategory(opt.value);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    <Text style={{ color: category === opt.value ? '#007aff' : '#222' }}>{opt.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                {/* Sort by button is a dropdown like Category */}
                <View style={{ marginBottom: 8 }}>
                    <TouchableOpacity style={styles.filterButton} onPress={() => setSortDropdownOpen(!sortDropdownOpen)}>
                        <Text style={styles.filterButtonText}>
                            {SORT_OPTIONS.find(opt => opt.value === sortOption)?.label || "Sort by"}
                        </Text>
                        <IonIcon name={sortDropdownOpen ? "arrow-down-outline" : "arrow-forward-outline"} size={16} color="#222" />
                    </TouchableOpacity>
                    {sortDropdownOpen && (
                        <View style={{ backgroundColor: '#fff', borderRadius: 8, elevation: 2, marginTop: 4 }}>
                            {SORT_OPTIONS.map(opt => (
                                <TouchableOpacity
                                    key={opt.value}
                                    style={{ padding: 12, backgroundColor: sortOption === opt.value ? '#e0f0ff' : '#fff' }}
                                    onPress={() => {
                                        setSortOption(opt.value);
                                        setSortDropdownOpen(false);
                                    }}
                                >
                                    <Text style={{ color: sortOption === opt.value ? '#007aff' : '#222' }}>{opt.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={{ color: "#888" }}>Search</Text>
                </TouchableOpacity>
            </View>

            {/* Movie List */}
            <View style={styles.movieList}>
                {movies
                    .map((item) => (
                        <View key={item.id} style={styles.movieCard}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`}}
                                style={styles.poster}
                                resizeMode="cover"
                            />
                            <View style={{ flex: 1, paddingLeft: 12 }}>
                                <Text style={styles.movieTitle}>{item.title}</Text>
                                <Text style={styles.movieDate}>{formatDate(item.release_date)}</Text>
                                <Text style={styles.movieOverview}>{item.overview}</Text>
                            </View>
                        </View>
                    ))}
            </View>

            {/* Load More Button */}
            <View style={{ padding: 16 }}>
                <TouchableOpacity style={styles.loadMoreButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Load More</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;