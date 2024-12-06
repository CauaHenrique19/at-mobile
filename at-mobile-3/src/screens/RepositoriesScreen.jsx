import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useAuth } from "../context/authContext";
import GitHubService from "../api/githubService";
import RepositoryItem from "../components/RepositoryItem";

const RepositoriesScreen = ({ navigation }) => {
  const { token } = useAuth();
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orientation, setOrientation] = useState("portrait");

  const githubService = new GitHubService(token);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
  }, []);

  const fetchRepositories = async (pageToFetch, isRefresh = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const { repositories } = await githubService.getRepositories(pageToFetch);

      setRepositories(prev =>
        isRefresh ? repositories : [...prev, ...repositories]
      );
      setPage(pageToFetch);
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRepositories(1);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRepositories(1, true);
  }, []);

  const handleLoadMore = () => {
    fetchRepositories(page + 1);
  };

  const navigateToRepoDetails = repo => {
    navigation.navigate("RepositoryDetails", { repository: repo });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: orientation === "landscape" ? 10 : 15,
      backgroundColor: "#f0f0f0",
    },
    repoItem: {
      backgroundColor: "white",
      padding: 15,
      marginVertical: 8,
      borderRadius: 5,
      elevation: 2,
    },
    repoName: {
      fontSize: orientation === "landscape" ? 16 : 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    repoDescription: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#666",
      marginBottom: 10,
    },
    repoStats: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <RepositoryItem repo={item} onPress={navigateToRepoDetails} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default RepositoriesScreen;
