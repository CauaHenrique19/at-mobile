import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/authContext";

const UserProfileScreen = () => {
  const { user, logout } = useAuth();
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
      padding: orientation === "landscape" ? 10 : 20,
      backgroundColor: "#f0f0f0",
      flexDirection: orientation === "landscape" ? "row" : "column",
      alignItems: "center",
      justifyContent: "center",
    },
    profileImage: {
      width: orientation === "landscape" ? 150 : 200,
      height: orientation === "landscape" ? 150 : 200,
      borderRadius: 100,
      marginBottom: 20,
    },
    infoContainer: {
      alignItems: "center",
      marginLeft: orientation === "landscape" ? 20 : 0,
    },
    name: {
      fontSize: orientation === "landscape" ? 20 : 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    username: {
      fontSize: orientation === "landscape" ? 16 : 18,
      color: "#666",
      marginBottom: 10,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: 20,
    },
    statItem: {
      alignItems: "center",
    },
    statValue: {
      fontSize: orientation === "landscape" ? 16 : 18,
      fontWeight: "bold",
    },
    statLabel: {
      fontSize: orientation === "landscape" ? 14 : 16,
      color: "#666",
    },
    logoutButton: {
      backgroundColor: "#dc3545",
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    logoutText: {
      color: "white",
      textAlign: "center",
      fontSize: orientation === "landscape" ? 14 : 16,
    },
  });

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatar_url }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name || user.login}</Text>
        <Text style={styles.username}>@{user.login}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.public_repos}</Text>
            <Text style={styles.statLabel}>Repositórios</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.followers}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.following}</Text>
            <Text style={styles.statLabel}>Seguindo</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;
