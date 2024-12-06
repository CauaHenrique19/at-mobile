import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";

const RepositoryItem = ({ repo, onPress }) => {
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
  }, []);

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
    <TouchableOpacity style={styles.repoItem} onPress={() => onPress(repo)}>
      <Text style={styles.repoName}>{repo.name}</Text>
      <Text style={styles.repoDescription} numberOfLines={2}>
        {repo.description || "Sem descrição"}
      </Text>
      <View style={styles.repoStats}>
        <Text>★ {repo.stargazers_count}</Text>
        <Text>🍴 {repo.forks_count}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RepositoryItem;
