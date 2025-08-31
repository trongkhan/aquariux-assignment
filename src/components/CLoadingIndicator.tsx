import { ActivityIndicator, StyleSheet, View } from "react-native";

const CLoadingIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007aff" />
        </View>
    );
};

export default CLoadingIndicator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});