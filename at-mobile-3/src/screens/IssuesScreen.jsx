import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/authContext";
import GitHubService from "../api/githubService";
import IssueItem from "../components/IssueItem";

const IssuesScreen = ({ navigation }) => {
  const { token } = useAuth();
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMoreIssues, setHasMoreIssues] = useState(true);
  const [orientation, setOrientation] = useState("portrait");

  const githubService = new GitHubService(token);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
  }, []);

  const fetchIssues = async (pageToFetch, isRefresh = false) => {
    if (loading || (!isRefresh && !hasMoreIssues)) return;

    setLoading(true);
    try {
      const { issues } = await githubService.getUserIssues(pageToFetch, 10);

      if (issues.length === 0) {
        setHasMoreIssues(false);
        setLoading(false);
        return;
      }

      setIssues((prev) => (isRefresh ? issues : [...prev, ...issues]));
      setPage(pageToFetch);
    } catch (error) {
      console.error("Erro ao buscar issues:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchIssues(1);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setHasMoreIssues(true);
    fetchIssues(1, true);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMoreIssues) {
      fetchIssues(page + 1);
    }
  };

  const navigateToIssueDetails = (issue) => {
    navigation.navigate("IssueDetails", { issue });
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#4078c0" />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: orientation === "landscape" ? 10 : 15,
      backgroundColor: "#f0f0f0",
    },
    issueItem: {
      backgroundColor: "white",
      padding: 15,
      marginVertical: 8,
      borderRadius: 5,
      elevation: 2,
    },
    issueTitle: {
      fontSize: orientation === "landscape" ? 16 : 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    issueRepo: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#666",
      marginBottom: 10,
    },
    issueStats: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    issueStateText: {
      fontWeight: "bold",
      fontSize: orientation === "landscape" ? 12 : 14,
    },
    issueDate: {
      fontSize: orientation === "landscape" ? 12 : 14,
      color: "#666",
    },
    footer: {
      paddingVertical: 20,
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={issues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <IssueItem issue={item} onPress={navigateToIssueDetails} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={{
          display: hasMoreIssues ? "flex" : "none",
        }}
      />
    </View>
  );
};

export default IssuesScreen;
