import { StyleSheet } from "react-native";
import { Colors } from "../../const/enum/color";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
  },
  filters: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  filterButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  filterButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  searchInput: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: Colors.lightGray,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  searchButton: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    marginBottom: 16,
  },
  movieList: {
    paddingHorizontal: 16,
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    padding: 8,
  },
  poster: {
    width: 80,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  movieTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  movieDate: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  movieOverview: {
    fontSize: 13,
    color: "#444",
  },
  loadMoreButton: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#3bb3e5",
    alignItems: "center",
  },
});

export default styles;