import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const IssueItem = ({ issue, onPress }) => {
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions.addEventListener("change", updateOrientation);
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
    <TouchableOpacity style={styles.issueItem} onPress={() => onPress(issue)}>
      <Text style={styles.issueTitle} numberOfLines={2}>
        {issue.title}
      </Text>
      <Text style={styles.issueRepo}>
        {issue.repository_url.split("/").slice(-2).join("/")}
      </Text>
      <View style={styles.issueStats}>
        <Text
          style={[styles.issueStateText, { color: getStateColor(issue.state) }]}
        >
          {issue.state.toUpperCase()}
        </Text>
        <Text style={styles.issueDate}>
          Criada em: {new Date(issue.created_at).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default IssueItem;
