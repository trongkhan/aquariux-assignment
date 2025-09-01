import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Movie, MovieCredit, MovieDetail } from '../../models/movieModels';
import CHeader from '../../components/CHeader';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../../const/enum/color';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchMovieCredit, fetchMovieDetail } from '../../redux/movieStore/movieThunks';
import CLoadingIndicator from '../../components/CLoadingIndicator';
import { formatTime } from '../../configs';
type Props = {
    navigation: any;
    route: { params: { movie: Movie } };
};
const MovieDetailScreen = ({ navigation, route }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const movieDetail: MovieDetail | null = useSelector((state: RootState) => state.movieDetailReducer.movie);
    const movieCredit: MovieCredit | null = useSelector((state: RootState) => state.movieCreditReducer.credit);
    const { movie } = route.params;
    const score = Math.round((movie.vote_average || 0) * 10);
    const radius = 24;
    const strokeWidth = 6;
    const size = 2 * (radius + strokeWidth);
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;


    useEffect(() => {
        dispatch(fetchMovieDetail(movie.id));
        dispatch(fetchMovieCredit(movie.id));
    }, [dispatch, movie.id]);

    // Applying movie detail data
    if (!movieDetail) {
        return (
            <CLoadingIndicator />
        );
    }


    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <CHeader />

            {/* Movie Info */}
            <View style={styles.infoSection}>
                <View style={{ padding: 16, backgroundColor: "rgba(0, 0, 0, 0.15)" }}>
                    <View style={{ flexDirection: 'row', flex: 1, marginBottom: 16 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" size={24} color={Colors.white} />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={[styles.title, { flex: 1, textAlign: 'center' }]}>{movieDetail.title} <Text style={styles.year}>({movieDetail.release_date?.slice(0, 4)})</Text></Text>
                    </View>
                    <View style={styles.row}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path || movieDetail.backdrop_path}` }} style={styles.poster} />
                        <View style={styles.infoText}>
                            <View style={styles.badgeRow}>
                                <Text style={styles.badge}>{movieDetail.rating || 'PG13'}</Text>
                            </View>
                            <View style={{ marginBottom: 8 }} />
                            {/* Format runtime to hours and minutes */}
                            <Text style={styles.meta}>{movieDetail.release_date} • {formatTime(movieDetail.runtime) || '1h 54m'}</Text>
                            <View style={{ marginBottom: 8 }} />
                            {movieDetail.genres && movieDetail.genres.length > 0 && (
                                <Text style={styles.meta}>{movieDetail.genres.map(genre => genre.name).join(', ')}</Text>
                            )}
                            <View style={{ marginBottom: 8 }} />
                            <Text style={styles.meta}>Status: <Text style={styles.normalText}>{movieDetail.status}</Text></Text>
                            <View style={{ marginBottom: 8 }} />
                            <Text style={styles.meta}>Original Language: <Text style={styles.boldText}>{(movieDetail as any).original_language}</Text></Text>
                        </View>
                    </View>
                </View>
                {/* User Score  & Writer, Director */}
                <View style={{ paddingHorizontal: 16 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <View style={styles.userScoreRow}>
                            <View style={styles.scoreCircleBg}>
                                <Svg width={size} height={size}>
                                    {/* Background circle */}
                                    <Circle
                                        stroke="#2a3952"
                                        fill="#2a3952"
                                        cx={size / 2}
                                        cy={size / 2}
                                        r={radius}
                                        strokeWidth={strokeWidth}
                                    />
                                    {/* Progress circle */}
                                    <Circle
                                        stroke="#6fffb0"
                                        fill="none"
                                        cx={size / 2}
                                        cy={size / 2}
                                        r={radius}
                                        strokeWidth={strokeWidth}
                                        strokeDasharray={circumference}
                                        strokeDashoffset={circumference - progress}
                                        strokeLinecap="round"
                                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                                    />
                                </Svg>
                                <View style={styles.scoreTextContainer}>
                                    <Text style={styles.scoreText}>{score}<Text style={{ fontSize: 12, fontWeight: '400' }}>%</Text></Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.boldText, { fontSize: 16 }]}>User Score</Text>
                    </View>
                    {/* Tagline */}
                    {movieDetail.tagline ? (
                        <View style={{ paddingVertical: 16 }}>
                            <Text style={[styles.italicText, { fontSize: 20 }]}>{movieDetail.tagline}</Text>
                        </View>
                    ) : (
                        <View style={{paddingVertical: 8}}/>
                    )}
                    {/* Overview */}
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <View style={{ marginBottom: 8 }} />
                    <Text style={styles.normalText}>{movieDetail.overview}</Text>
                    {/* Add to Watchlist */}
                    <TouchableOpacity style={styles.watchlistBtn}>
                        <Text style={[styles.boldText]}>+ Add To Watchlist</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Top Billed Cast */}
            {movieCredit && movieCredit.length > 0 && (
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, {color: Colors.black, marginBottom: 8}]}>Top Billed Cast</Text>
                    <ScrollView horizontal>
                        {(movieCredit as any).slice(0, 10).map((actor: any, idx: number) => (
                            <View key={idx} style={styles.castCard}>
                                {actor.profile_path ? (
                                    <Image
                                        resizeMode='cover'
                                        source={{ uri: `https://image.tmdb.org/t/p/w185${actor.profile_path}` }}
                                        style={styles.castImage}
                                    />
                                ) : (
                                    <View style={styles.castImagePlaceholder} />
                                )}
                                <Text style={[styles.boldText, styles.textDark]} numberOfLines={1}>{actor.name}</Text>
                                <Text style={styles.textGray} numberOfLines={1}>{actor.character}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

            {/* Recommendations */}
            {/* {movie.recommendations && movie.recommendations.length > 0 && (
	<View style={styles.section}>
		  <Text style={styles.sectionTitle}>Recommendations</Text>
		  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{movie.recommendations.map((rec, idx) => (
			  <View key={idx} style={styles.recCard}>
				<View style={styles.recImagePlaceholder} />
				<Text style={styles.recTitle}>{rec.title}</Text>
				{rec.vote_average && <Text style={styles.recScore}>{Math.round(rec.vote_average * 10)}%</Text>}
			  </View>
			))}
		  </ScrollView>
	</View>
	)} */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primary },
    header: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, padding: 16 },
    logo: { width: 80, height: 24, marginLeft: 16, resizeMode: 'contain' },
    infoSection: { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
    row: { flexDirection: 'row' },
    poster: { width: 80, height: 120, borderRadius: 8, backgroundColor: Colors.dimGray },
    infoText: { flex: 1, marginLeft: 16 },
    // Common Text Styles
    normalText: { color: Colors.white },
    boldText: { fontWeight: 'bold', color: Colors.white },
    secondaryText: { color: Colors.white },
    textDark: { color: '#222' },
    textGray: { color: '#888' },
    italicText: { fontStyle: 'italic', color: Colors.white },
    // Title and Section
    title: { fontSize: 22, fontWeight: 'bold', color: Colors.white },
    year: { fontWeight: 'normal', color: Colors.white },
    sectionTitle: { fontWeight: 'bold', fontSize: 18, color: Colors.white },
    // Badge and Meta
    badgeRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
    badge: { backgroundColor: "rgba(217, 217, 217, 0)", color: Colors.white, borderRadius: 4, paddingHorizontal: 6, marginRight: 8, borderColor: "rgba(255, 255, 255, 0.7)", borderWidth: 1 },
    meta: { color: Colors.white, fontSize: 14, fontWeight: '600' },
    // User Score
    userScoreRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
    scoreCircleBg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#2a3952',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginRight: 8,
    },
    scoreTextContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // Crew
    crewRow: { marginTop: 12 },
    // Tagline
    watchlistBtn: { borderWidth: 1, borderColor: Colors.white, borderRadius: 6, padding: 8, alignItems: 'center', marginTop: 8 },
    // Section
    section: { marginTop: 16, padding: 16, backgroundColor: Colors.white },
    // Cast
    castCard: { width: 120, marginRight: 12, alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
    castImage: { width: 120, height: 120, marginBottom: 8, borderRadius: 8, backgroundColor: Colors.dimGray },
    castImagePlaceholder: { width: 120, height: 120, backgroundColor: Colors.dimGray, marginBottom: 8, borderRadius: 8 },
    // Recommendations
    recCard: { width: 140, marginRight: 12 },
    recImagePlaceholder: { width: 140, height: 80, borderRadius: 8, backgroundColor: Colors.dimGray, marginBottom: 8 },
    recTitle: { fontWeight: 'bold', color: '#333' },
    recScore: { color: Colors.primary, fontWeight: 'bold' },
});

export default MovieDetailScreen;
