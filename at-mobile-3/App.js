import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/context/authContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StatusBar, Platform } from "react-native";

import AuthScreen from "./src/screens/AuthScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import RepositoriesScreen from "./src/screens/RepositoriesScreen";
import IssuesScreen from "./src/screens/IssuesScreen";
import RepositoryDetailsScreen from "./src/screens/RepositoryDetailsScreen";
import IssueDetailsScreen from "./src/screens/IssuesDetailsScreen";
import BottomNavigation from "./src/components/BottomNavigation";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { isAuthenticated, restoreToken } = useAuth();

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4078c0",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      tabBar={props => <BottomNavigation {...props} />}
    >
      {!isAuthenticated ? (
        <Tab.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Autenticação GitHub" }}
        />
      ) : (
        <>
          <Tab.Screen
            name="Profile"
            component={UserProfileScreen}
            options={{ title: "Perfil do Usuário" }}
          />
          <Tab.Screen
            name="Repositories"
            component={RepositoriesScreen}
            options={{ title: "Meus Repositórios" }}
          />
          <Tab.Screen
            name="Issues"
            component={IssuesScreen}
            options={{ title: "Minhas Issues" }}
          />
          <Tab.Screen
            name="RepositoryDetails"
            component={RepositoryDetailsScreen}
            options={{ title: "Detalhes do Repositório" }}
          />
          <Tab.Screen
            name="IssueDetails"
            component={IssueDetailsScreen}
            options={{ title: "Detalhes da Issue" }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="#4078c0" />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}
