import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutesName } from "../const/enum/routeNames";
import CTabBar from "../components/CTabBar";
import HomeScreen from "../screens/home";
import WatchListScreen from "../screens/watchlist";
import MovieDetailScreen from "../screens/detail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={tabBarProps => <CTabBar {...tabBarProps} />}>
    <Tab.Screen name={RoutesName.Home} component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name={RoutesName.WatchList} component={WatchListScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const AppNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name={RoutesName.Details} component={MovieDetailScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AppNavigation;