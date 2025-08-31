import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RoutesName } from "../const/enum/routeNames";
import CTabBar from "../components/CTabBar";
import HomeScreen from "../screens/home";
import WatchListScreen from "../screens/watchlist";

const Tab = createBottomTabNavigator();

interface AppNavigationProps {
    initialRouteName: RoutesName;
}

const AppNavigation = (props: AppNavigationProps) => {
  return (
    //Bottom tab navigator
    <Tab.Navigator tabBar={tabBarProps => <CTabBar {...tabBarProps} />} initialRouteName={props.initialRouteName}>
        <Tab.Screen name={RoutesName.Home} component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name={RoutesName.WatchList} component={WatchListScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

export default AppNavigation;