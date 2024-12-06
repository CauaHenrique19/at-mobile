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

const IssueDetailsScreen = ({ route }) => {
  const { issue } = route.params;
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
    return () => {};
  }, []);

  const getStateColor = state => {
    switch (state) {
      case "open":
        return "#28a745";
      case "closed":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const openIssueOnGitHub = () => {
    Linking.openURL(issue.html_url);
  };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: orientation === "landscape" ? 10 : 20,
      backgroundColor: "#f0f0f0",
    },
    header: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    issueTitle: {
      fontSize: orientation === "landscape" ? 20 : 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    issueState: {
      fontSize: orientation === "landscape" ? 14 : 16,
      fontWeight: "bold",
      marginBottom: 10,
    },
    issueBody: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#666",
      marginBottom: 15,
    },
    metadataContainer: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
    },
    metadataItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    metadataLabel: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#666",
    },
    metadataValue: {
      fontSize: orientation === "landscape" ? 14 : 16,
      fontWeight: "bold",
    },
    linkButton: {
      backgroundColor: "#4078c0",
      padding: 10,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
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
        <Text style={styles.issueTitle}>{issue.title}</Text>
        <Text
          style={[styles.issueState, { color: getStateColor(issue.state) }]}
        >
          Status: {issue.state.toUpperCase()}
        </Text>
      </View>

      <View style={styles.metadataContainer}>
        <View style={styles.metadataItem}>
          <Text style={styles.metadataLabel}>Repositório</Text>
          <Text style={styles.metadataValue}>
            {issue.repository_url.split("/").slice(-2).join("/")}
          </Text>
        </View>
        <View style={styles.metadataItem}>
          <Text style={styles.metadataLabel}>Criada em</Text>
          <Text style={styles.metadataValue}>
            {new Date(issue.created_at).toLocaleString()}
          </Text>
        </View>
        {issue.closed_at && (
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Fechada em</Text>
            <Text style={styles.metadataValue}>
              {new Date(issue.closed_at).toLocaleString()}
            </Text>
          </View>
        )}
      </View>

      {issue.body && (
        <View style={[styles.header, { marginTop: 15 }]}>
          <Text style={styles.issueBody}>{issue.body}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.linkButton} onPress={openIssueOnGitHub}>
        <Ionicons name="open-outline" size={24} color="white" />
        <Text style={styles.linkButtonText}>Abrir no GitHub</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default IssueDetailsScreen;
