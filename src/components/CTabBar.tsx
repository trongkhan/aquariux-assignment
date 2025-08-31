import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface CTabBarProps {
    state: TabNavigationState<ParamListBase>;
    descriptors: any;
    navigation: any;
}

const CTabBar = (props: CTabBarProps) => {
  return (
    //Custom bottom tab bar
    <View style={{
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "#0A2342",
      position: 'absolute',
      height: 60,
    //   borderTopLeftRadius: 16,
    //   borderTopRightRadius: 16,
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      {props.state.routes.map((route: any, index: number) => {
        const { options } = props.descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = props.state.index === index;

        const iconName = route.name === "Home" ? "home" : "bookmark";

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => props.navigation.navigate(route.name)}
            style={{ flex: 1, alignItems: "center" }}
          >
            <MaterialIcons
              name={iconName}
              size={28}
              color={isFocused ? "#fff" : "#B0B0B0"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  )
};

export default CTabBar;