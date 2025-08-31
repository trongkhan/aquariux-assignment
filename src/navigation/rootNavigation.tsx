import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./appNavigation";
import { RoutesName } from "../const/enum/routeNames";

const RootNavigation = () => {
    const initialRouteName = RoutesName.Home;
    return (
        <NavigationContainer>
            <AppNavigation initialRouteName={initialRouteName} />
        </NavigationContainer>
    )
}

export default RootNavigation;