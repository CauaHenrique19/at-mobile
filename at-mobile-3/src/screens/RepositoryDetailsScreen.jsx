import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RepositoryDetailsScreen = ({ route }) => {
  const { repository } = route.params;
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
    return () => {};
  }, []);

  const openRepository = () => {
    Linking.openURL(repository.html_url);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: orientation === "landscape" ? 10 : 20,
      backgroundColor: "#f0f0f0",
    },
    header: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    repoName: {
      fontSize: orientation === "landscape" ? 20 : 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    description: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#666",
      marginBottom: 15,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    statBox: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      width: "30%",
    },
    statLabel: {
      fontSize: orientation === "landscape" ? 12 : 14,
      color: "#666",
    },
    statValue: {
      fontSize: orientation === "landscape" ? 16 : 18,
      fontWeight: "bold",
    },
    linkButton: {
      backgroundColor: "#4078c0",
      padding: 10,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    linkButtonText: {
      color: "white",
      marginLeft: 10,
      fontSize: orientation === "landscape" ? 14 : 16,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.repoName}>{repository.name}</Text>
        <Text style={styles.description}>
          {repository.description || "Sem descrição"}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Stars</Text>
          <Text style={styles.statValue}>{repository.stargazers_count}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Forks</Text>
          <Text style={styles.statValue}>{repository.forks_count}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Linguagem</Text>
          <Text style={styles.statValue}>{repository.language || "N/A"}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.linkButton} onPress={openRepository}>
        <Ionicons name="open-outline" size={24} color="white" />
        <Text style={styles.linkButtonText}>Abrir no GitHub</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RepositoryDetailsScreen;
