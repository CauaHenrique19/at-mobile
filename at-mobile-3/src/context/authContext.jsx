import React, { createContext, useState, useContext } from "react";
import GitHubService from "../api/githubService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async githubToken => {
    try {
      const githubService = new GitHubService(githubToken);
      const userProfile = await githubService.getUserProfile();

      await AsyncStorage.setItem("githubToken", githubToken);
      setToken(githubToken);
      setUser(userProfile);
      setIsAuthenticated(true);

      return userProfile;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("githubToken");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const restoreToken = async () => {
    const storedToken = await AsyncStorage.getItem("githubToken");
    if (storedToken) {
      try {
        const githubService = new GitHubService(storedToken);
        const userProfile = await githubService.getUserProfile();
        setToken(storedToken);
        setUser(userProfile);
        setIsAuthenticated(true);
      } catch (error) {
        logout();
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        restoreToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
