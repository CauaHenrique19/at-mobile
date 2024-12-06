import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GalleryScreen from "./src/screens/GalleryScreen.jsx";
import ImageDetailScreen from "./src/screens/ImageDetailScreen.jsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Gallery"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4f4f4",
          },
          headerTintColor: "#333",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{ title: "NASA Image Gallery" }}
        />
        <Stack.Screen
          name="ImageDetail"
          component={ImageDetailScreen}
          options={{ title: "Image Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
