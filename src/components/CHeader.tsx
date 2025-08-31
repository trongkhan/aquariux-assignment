import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CHeader = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <Image
                source={require("../../assets/images/movieLogo.png")}
                style={{ height: 80, width: 80, resizeMode: "contain" }}
            />
        </View>
    );
};

export default CHeader;

const styles = StyleSheet.create({
    header: {
        padding: 16,
        alignItems: "center",
        backgroundColor: '#fff',
        flex: 1,
    },
});
