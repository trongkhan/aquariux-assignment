import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./appNavigation";

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <AppNavigation />
        </NavigationContainer>
    )
}

export default RootNavigation;