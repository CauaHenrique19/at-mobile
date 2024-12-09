import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomNavigation = ({ state, descriptors, navigation }) => {
  const routesToIgnore = ["RepositoryDetails", "IssueDetails"];
  const routes = state.routes.filter(
    (route) => !routesToIgnore.includes(route.name)
  );

  return (
    <View style={styles.container}>
      {routes.map((route) => {
        const index = state.routes.findIndex((r) => r.name === route.name);
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIconName = (routeName) => {
          switch (routeName) {
            case "Repositories":
              return isFocused ? "code-slash" : "code-slash-outline";
            case "Profile":
              return isFocused ? "person" : "person-outline";
            case "CreateIssue":
              return isFocused ? "add-circle" : "add-circle-outline";
            case "Issues":
              return isFocused
                ? "information-circle"
                : "information-circle-outline";
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <Ionicons
              name={getIconName(route.name)}
              size={24}
              color={isFocused ? "#007AFF" : "#666666"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 60,
    borderTopWidth: 0.5,
    borderTopColor: "#E0E0E0",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomNavigation;
